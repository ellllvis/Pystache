// Exécuteur Python : Pyodide tourne dans un Web Worker pour ne pas bloquer l'écran.
// Si un programme tourne trop longtemps (boucle infinie), on arrête le worker et on en relance un.
window.Runner = (function () {
  const TIMEOUT_MS = 10000;
  let worker = null;
  let ready = null; // promesse résolue quand Python est chargé
  let pending = null;

  const LOAD_TIMEOUT_MS = 90000;

  function start() {
    ready = new Promise((resolve, reject) => {
      try { worker = new Worker("js/py-worker.js"); }
      catch (e) { return reject(new Error("Le navigateur refuse de démarrer Python (" + e.message + ")")); }
      const t = setTimeout(() => reject(new Error("Python met trop de temps à se charger")), LOAD_TIMEOUT_MS);
      worker.onmessage = (ev) => {
        const m = ev.data;
        if (m.type === "ready") { clearTimeout(t); resolve(); }
        else if (m.type === "load-error") { clearTimeout(t); reject(new Error(m.message)); }
        else if (pending) {
          if (m.type === "out" || m.type === "err") pending.onOutput(m.type, m.text);
          else if (m.type === "done") finish({ ok: m.ok, checked: m.checked, verdict: m.verdict });
        }
      };
      worker.onerror = (e) => { clearTimeout(t); reject(new Error(e.message || "Erreur au démarrage de Python")); };
    });
    // En cas d'échec, on repartira de zéro au prochain essai.
    ready.catch(() => { if (worker) worker.terminate(); worker = null; });
  }

  function finish(result) {
    if (!pending) return;
    clearTimeout(pending.timer);
    const p = pending; pending = null;
    p.resolve(result);
  }

  function ensure() {
    if (!worker) start();
    return ready;
  }

  // check : code Python de correction (facultatif). Le résultat contient alors verdict ("" = réussi).
  async function run(code, stdin, onOutput, check) {
    if (pending) return { ok: false, busy: true };
    await ensure();
    return new Promise((resolve) => {
      pending = { resolve, onOutput };
      pending.timer = setTimeout(() => {
        // Boucle infinie probable : on coupe tout.
        worker.terminate(); worker = null;
        onOutput("err", `\n⏱ Programme arrêté : il tournait depuis plus de ${TIMEOUT_MS / 1000} secondes (boucle infinie ?).`);
        finish({ ok: false, timeout: true });
      }, TIMEOUT_MS);
      worker.postMessage({ type: "run", code, stdin: stdin || "", check: check || null });
    });
  }

  return { preload: () => ensure().catch(() => {}), run, isLoaded: () => !!worker };
})();
