// Niveau 2 · Module « Modules »
(window.LECONS = window.LECONS || {})["modules"] = {
  import: {
    body: `
<p>Un <b>module</b> est un fichier de code Python qu'on peut réutiliser. Python en fournit des centaines, c'est sa « bibliothèque standard ». Pour s'en servir, on l'importe :</p>
<pre>import math
print(math.sqrt(16))   # 4.0
print(math.pi)         # 3.141592653589793</pre>
<p>On écrit alors le nom du module, un point, puis ce qu'on veut utiliser.</p>
<h2>Les autres formes</h2>
<pre>from math import sqrt, pi     # importer seulement certains noms
print(sqrt(25))               # plus besoin de "math."

import statistics as st       # donner un surnom au module
print(st.mean([4, 8, 9]))</pre>
<p class="note">Évite <code>from module import *</code> : on ne sait plus d'où viennent les noms, et ils peuvent écraser les tiens.</p>
<p>Pour explorer un module, <code>dir(math)</code> liste ce qu'il contient, et <code>help(math.sqrt)</code> affiche la documentation.</p>`,
    starter: `import math
print(math.sqrt(16))
print(math.pi)

from math import sqrt, floor
print(sqrt(25), floor(3.7))

import statistics as st
print(st.mean([4, 8, 9]), st.median([4, 8, 9]))`,
    quiz: [
      { q: "Après <code>import math</code>, comment calcule-t-on la racine de 9 ?", choices: ["<code>sqrt(9)</code>", "<code>math.sqrt(9)</code>", "<code>math(sqrt(9))</code>"], answer: 1,
        explain: "Avec import math, on préfixe par math." },
      { q: "Après <code>from math import sqrt</code>, comment calcule-t-on la racine de 9 ?", choices: ["<code>sqrt(9)</code>", "<code>math.sqrt(9)</code>"], answer: 0,
        explain: "from ... import met le nom directement à disposition." },
    ],
    exercise: {
      task: `<p>Avec le module <code>math</code>, écris <code>distance(x1, y1, x2, y2)</code> qui renvoie la distance entre deux points, arrondie à 2 chiffres : √((x2 − x1)² + (y2 − y1)²).</p>`,
      starter: `def distance(x1, y1, x2, y2):
    pass

print(distance(0, 0, 3, 4))
`,
      check: `
assert "import math" in code_eleve or "from math" in code_eleve, "Importe le module math."
assert distance(0, 0, 3, 4) == 5.0, "distance(0, 0, 3, 4) doit renvoyer 5.0."
assert distance(1, 1, 2, 2) == 1.41, "distance(1, 1, 2, 2) doit renvoyer 1.41 (arrondi à 2 chiffres)."
`,
      solution: `import math

def distance(x1, y1, x2, y2):
    return round(math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2), 2)

print(distance(0, 0, 3, 4))`,
    },
  },

  "math-random": {
    body: `
<p>Deux modules reviennent sans cesse.</p>
<h2>math</h2>
<ul>
  <li><code>math.sqrt(x)</code> : racine carrée ;</li>
  <li><code>math.floor(x)</code> / <code>math.ceil(x)</code> : arrondi vers le bas / vers le haut ;</li>
  <li><code>math.pi</code>, <code>math.cos</code>, <code>math.sin</code>… pour la géométrie.</li>
</ul>
<h2>random</h2>
<ul>
  <li><code>random.randint(a, b)</code> : entier entre a et b <b>inclus</b> ;</li>
  <li><code>random.random()</code> : décimal entre 0 et 1 ;</li>
  <li><code>random.choice(liste)</code> : un élément au hasard ;</li>
  <li><code>random.shuffle(liste)</code> : mélange la liste sur place ;</li>
  <li><code>random.sample(liste, k)</code> : k éléments différents au hasard.</li>
</ul>
<p class="note"><code>random.seed(42)</code> rend le hasard reproductible : avec la même graine, on obtient toujours la même suite. Très pratique pour tester.</p>`,
    starter: `import math, random

print(math.floor(7.9), math.ceil(7.1))
print(round(math.pi * 3 ** 2, 2))

print(random.randint(1, 6))
print(random.choice(["pile", "face"]))
cartes = ["As", "Roi", "Dame", "Valet"]
random.shuffle(cartes)
print(cartes)
print(random.sample(range(1, 50), 5))`,
    quiz: [
      { q: "Que vaut <code>math.ceil(2.1)</code> ?", choices: ["2", "3", "2.1"], answer: 1,
        explain: "ceil arrondit vers le haut." },
      { q: "Quelle fonction tire 3 éléments <b>différents</b> d'une liste ?", choices: ["<code>random.choice</code>", "<code>random.sample</code>", "<code>random.shuffle</code>"], answer: 1,
        explain: "sample tire sans remise." },
    ],
    exercise: {
      task: `<p>Écris <code>mot_de_passe(longueur)</code> qui renvoie un mot de passe aléatoire de la longueur demandée, composé de lettres minuscules et de chiffres.</p>
<p class="note">Astuce : <code>"abcdefghijklmnopqrstuvwxyz0123456789"</code> contient tous les caractères autorisés, et <code>random.choice</code> en tire un.</p>`,
      starter: `import random

def mot_de_passe(longueur):
    pass

print(mot_de_passe(12))
`,
      check: `
import string
ok = set(string.ascii_lowercase + string.digits)
m1 = mot_de_passe(12)
assert isinstance(m1, str) and len(m1) == 12, "mot_de_passe(12) doit renvoyer une chaîne de 12 caractères."
assert set(m1) <= ok, "Seuls les lettres minuscules et les chiffres sont autorisés."
assert len(mot_de_passe(30)) == 30, "La longueur doit suivre le paramètre."
assert len({mot_de_passe(10) for _ in range(5)}) > 1, "Le mot de passe doit être différent à chaque appel (utilise random)."
`,
      solution: `import random

def mot_de_passe(longueur):
    caracteres = "abcdefghijklmnopqrstuvwxyz0123456789"
    return "".join(random.choice(caracteres) for _ in range(longueur))

print(mot_de_passe(12))`,
    },
  },

  "propre-module": {
    body: `
<p>Sur ton ordinateur, chaque fichier <code>.py</code> est un module. Si tu écris <code>outils.py</code> :</p>
<pre># outils.py
def tva(prix, taux=0.2):
    return round(prix * (1 + taux), 2)

def euros(montant):
    return f"{montant:.2f} €"</pre>
<p>alors un autre fichier du même dossier peut faire :</p>
<pre># main.py
from outils import tva, euros
print(euros(tva(10)))</pre>
<h2>Le test <code>if __name__ == "__main__":</code></h2>
<p>Quand on importe un module, tout son code s'exécute. Pour qu'un fichier puisse à la fois servir de module et se lancer tout seul (pour des essais, par exemple), on protège le code « principal » :</p>
<pre>def tva(prix, taux=0.2):
    return round(prix * (1 + taux), 2)

if __name__ == "__main__":
    # exécuté seulement quand on lance ce fichier directement,
    # pas quand un autre fichier fait "import outils"
    print(tva(10))</pre>
<p><code>__name__</code> vaut <code>"__main__"</code> pour le fichier lancé, et le nom du module pour un fichier importé.</p>
<p class="note">L'appli ne gère qu'un fichier à la fois, alors on s'entraîne ici à bien organiser un fichier qui pourrait devenir un module.</p>`,
    starter: `def tva(prix, taux=0.2):
    return round(prix * (1 + taux), 2)

def euros(montant):
    return f"{montant:.2f} €"

print("__name__ vaut :", __name__)

if __name__ == "__main__":
    print(euros(tva(10)))`,
    quiz: [
      { q: "Que vaut <code>__name__</code> dans le fichier qu'on lance directement ?", choices: ['"__main__"', "Le nom du fichier", "None"], answer: 0,
        explain: "C'est ce qui permet de distinguer « lancé » et « importé »." },
      { q: "Pour importer <code>tva</code> depuis le fichier <code>outils.py</code>, on écrit…", choices: ["<code>import tva from outils</code>", "<code>from outils import tva</code>", "<code>from outils.py import tva</code>"], answer: 1,
        explain: "On donne le nom du module, sans .py." },
    ],
    exercise: {
      task: `<p>Organise ce fichier comme un module propre :</p>
<ul><li>une fonction <code>est_premier(n)</code> qui renvoie <code>True</code> si n est un nombre premier (divisible seulement par 1 et par lui-même, et plus grand que 1) ;</li>
<li>une fonction <code>premiers_jusqua(n)</code> qui renvoie la liste des nombres premiers de 2 à n ;</li>
<li>un bloc <code>if __name__ == "__main__":</code> qui affiche <code>premiers_jusqua(30)</code>.</li></ul>`,
      starter: `# Tes fonctions ici

`,
      check: `
assert '__name__ == "__main__"' in code_eleve or "__name__ == '__main__'" in code_eleve, 'Ajoute le bloc if __name__ == "__main__":'
assert [n for n in range(-2, 20) if est_premier(n)] == [2, 3, 5, 7, 11, 13, 17, 19], "est_premier ne donne pas les bons résultats (attention à 0, 1 et 2)."
assert premiers_jusqua(30) == [2, 3, 5, 7, 11, 13, 17, 19, 23, 29], "premiers_jusqua(30) doit renvoyer [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]."
assert "29" in sortie, "Le bloc principal doit afficher premiers_jusqua(30)."
`,
      solution: `def est_premier(n):
    if n < 2:
        return False
    for d in range(2, int(n ** 0.5) + 1):
        if n % d == 0:
            return False
    return True

def premiers_jusqua(n):
    return [k for k in range(2, n + 1) if est_premier(k)]

if __name__ == "__main__":
    print(premiers_jusqua(30))`,
    },
  },

  "projet-des": {
    body: `
<p>Dernier projet du niveau Intermédiaire : un lanceur de dés pour jeux de rôle. On utilise la notation des joueurs, <code>3d6</code>, qui veut dire « lancer 3 dés à 6 faces ».</p>
<p>Le programme doit :</p>
<ul>
  <li>analyser une notation comme <code>2d20</code> avec <code>split("d")</code> ;</li>
  <li>lancer les dés avec <code>random.randint</code> ;</li>
  <li>signaler une notation invalide avec <code>raise ValueError</code> ;</li>
  <li>faire des statistiques sur beaucoup de lancers.</li>
</ul>
<p>C'est l'occasion de réutiliser fonctions, listes, dictionnaires, erreurs et modules.</p>`,
    quiz: [
      { q: 'Que donne <code>"3d6".split("d")</code> ?', choices: ["['3', '6']", "[3, 6]", "['3d6']"], answer: 0,
        explain: "On obtient deux chaînes, qu'il faudra convertir avec int()." },
    ],
    exercise: {
      task: `<p>Écris :</p>
<ul><li><code>lire_notation(texte)</code> qui renvoie un tuple <code>(nombre, faces)</code> à partir de <code>"3d6"</code>, et lève <code>ValueError</code> si la notation est invalide (pas de <code>d</code>, pas des nombres, ou des valeurs inférieures à 1) ;</li>
<li><code>lancer(texte)</code> qui renvoie la liste des résultats de chaque dé ;</li>
<li><code>frequences(texte, n)</code> qui lance <code>n</code> fois et renvoie un dictionnaire total → nombre de fois obtenu.</li></ul>`,
      starter: `import random

def lire_notation(texte):
    pass

def lancer(texte):
    pass

def frequences(texte, n):
    pass

print(lancer("3d6"))
`,
      check: `
assert lire_notation("3d6") == (3, 6) and lire_notation("1d20") == (1, 20), 'lire_notation("3d6") doit renvoyer (3, 6).'
for mauvais in ["3x6", "ad6", "0d6", "2d0", "d6"]:
    try:
        lire_notation(mauvais)
    except ValueError:
        pass
    else:
        assert False, f'lire_notation("{mauvais}") doit lever ValueError.'
r = lancer("4d6")
assert isinstance(r, list) and len(r) == 4 and all(1 <= x <= 6 for x in r), 'lancer("4d6") doit renvoyer 4 nombres entre 1 et 6.'
f = frequences("2d6", 2000)
assert sum(f.values()) == 2000, "frequences doit compter n lancers au total."
assert set(f) <= set(range(2, 13)) and f.get(7, 0) > f.get(2, 0), "Avec 2d6, les totaux vont de 2 à 12, et 7 sort plus souvent que 2."
`,
      solution: `import random

def lire_notation(texte):
    morceaux = texte.lower().split("d")
    if len(morceaux) != 2:
        raise ValueError("notation invalide")
    nombre, faces = int(morceaux[0]), int(morceaux[1])
    if nombre < 1 or faces < 1:
        raise ValueError("valeurs trop petites")
    return nombre, faces

def lancer(texte):
    nombre, faces = lire_notation(texte)
    return [random.randint(1, faces) for _ in range(nombre)]

def frequences(texte, n):
    compte = {}
    for _ in range(n):
        total = sum(lancer(texte))
        compte[total] = compte.get(total, 0) + 1
    return compte

print(lancer("3d6"))`,
    },
  },
};
