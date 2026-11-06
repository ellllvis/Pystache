// Web Worker qui charge Pyodide (Python compilé pour le navigateur) et exécute le code.
// Pyodide est livré avec l'appli (dossier pyodide/) : ça marche hors ligne et sur les hébergeurs
// qui bloquent les téléchargements depuis un CDN.
const PYODIDE_URL = new URL("../pyodide/", self.location.href).href;

let pyodide = null;

async function load() {
  try {
    importScripts(PYODIDE_URL + "pyodide.js");
    // La bibliothèque standard est une archive zip renommée en .wasm : certains hébergeurs
    // refusent de servir les .zip.
    pyodide = await loadPyodide({ indexURL: PYODIDE_URL, stdLibURL: PYODIDE_URL + "python_stdlib.wasm" });
    postMessage({ type: "ready" });
  } catch (e) {
    postMessage({ type: "load-error", message: String(e && e.message || e) });
  }
}
const loading = load();

self.onmessage = async (ev) => {
  const m = ev.data;
  if (m.type !== "run") return;
  await loading;
  if (!pyodide) return;

  const lines = m.stdin.split("\n");
  if (lines.length && lines[lines.length - 1] === "") lines.pop();
  let i = 0;
  const captured = []; // tout ce que le programme affiche, pour la correction
  pyodide.setStdin({ stdin: () => (i < lines.length ? lines[i++] : undefined), autoEOF: true });
  pyodide.setStdout({ batched: (t) => { captured.push(t); postMessage({ type: "out", text: t + "\n" }); } });
  pyodide.setStderr({ batched: (t) => postMessage({ type: "err", text: t + "\n" }) });
  installHelpers();
  // Chaque exécution travaille dans un dossier vide : les fichiers d'un essai précédent
  // ne faussent pas la correction.
  pyodide.runPython("import os, tempfile; os.chdir(tempfile.mkdtemp())");

  // Chaque exécution repart d'un espace de noms propre.
  const globals = pyodide.toPy({ __name__: "__main__" });
  let ok = true;
  try {
    await pyodide.runPythonAsync(m.code, { globals });
  } catch (e) {
    ok = false;
    postMessage({ type: "err", text: cleanTraceback(String(e.message || e)) });
  }

  // Correction automatique d'un exercice : le code de vérification lit le code de l'élève,
  // ce qu'il a affiché (sortie, lignes) et ses variables.
  let verdict = null;
  if (m.check) {
    if (!ok) verdict = "Ton code s'arrête sur une erreur. Corrige-la d'abord (le message en rouge t'aide).";
    else {
      try {
        verdict = pyodide.globals.get("_pyetapes_check")(m.check, globals, m.code, captured.join("\n"));
      } catch (e) {
        verdict = "La vérification a échoué : " + String(e.message || e).split("\n").filter(Boolean).pop();
      }
    }
  }
  globals.destroy();
  postMessage({ type: "done", ok, checked: !!m.check, verdict });
};

let helpersReady = false;
function installHelpers() {
  if (helpersReady) return;
  helpersReady = true;
  pyodide.runPython(`
import builtins, sys

# input() affiche la question puis la réponse lue, comme dans un vrai terminal.
def _input(prompt=""):
    sys.stdout.write(str(prompt))
    try:
        line = sys.stdin.readline()
    except Exception:
        line = ""
    if line == "":
        print()
        raise EOFError("input() n'a plus de réponse : ajoute une ligne dans « Entrées du programme ».")
    line = line.rstrip("\\n")
    print(line)
    return line
builtins.input = _input

def _pyetapes_check(check_code, g, code_eleve, sortie):
    """Renvoie "" si l'exercice est réussi, sinon un conseil pour l'élève."""
    env = dict(g)
    env["code_eleve"] = code_eleve
    env["sortie"] = sortie
    env["lignes"] = [l.strip() for l in sortie.split("\\n") if l.strip()]
    try:
        exec(check_code, env)
        return ""
    except AssertionError as e:
        return str(e) or "Pas encore tout à fait. Relis la consigne."
    except NameError as e:
        return f"Je ne trouve pas « {e.name} » dans ton code. Vérifie le nom (majuscules, accents, fautes de frappe)."
    except Exception as e:
        return f"En testant ton code, j'ai obtenu une erreur : {type(e).__name__}: {e}"
`);
}

// Garde seulement la partie du traceback qui concerne le code de l'élève.
function cleanTraceback(msg) {
  const lines = msg.split("\n");
  const start = lines.findIndex((l) => l.includes('File "<exec>"'));
  const kept = start >= 0 ? ["Traceback (most recent call last):", ...lines.slice(start)] : lines;
  return kept.join("\n").replace(/File "<exec>"/g, "Ton code").trim() + "\n";
}
