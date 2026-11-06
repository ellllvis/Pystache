// Niveau 2 · Module « Listes, tuples, dictionnaires, ensembles »
(window.LECONS = window.LECONS || {})["collections"] = {
  tranches: {
    body: `
<p>Une <b>tranche</b> (en anglais <i>slice</i>) extrait un morceau d'une liste ou d'une chaîne avec la syntaxe <code>[debut:fin]</code>. Comme <code>range</code>, on s'arrête <b>avant</b> l'indice de fin.</p>
<pre>lettres = ["a", "b", "c", "d", "e", "f"]
print(lettres[1:4])   # ['b', 'c', 'd']
print(lettres[:3])    # ['a', 'b', 'c']  (depuis le début)
print(lettres[3:])    # ['d', 'e', 'f']  (jusqu'à la fin)
print(lettres[-2:])   # ['e', 'f']       (les deux derniers)</pre>
<h2>Le pas</h2>
<p>Un troisième nombre donne le pas : <code>[::2]</code> prend un élément sur deux, et <code>[::-1]</code> parcourt à l'envers.</p>
<pre>print(lettres[::2])     # ['a', 'c', 'e']
print("Python"[::-1])   # nohtyP</pre>
<p class="note">Une tranche crée une <b>nouvelle</b> liste : la liste d'origine n'est pas modifiée.</p>`,
    starter: `lettres = ["a", "b", "c", "d", "e", "f"]
print(lettres[1:4])
print(lettres[:3])
print(lettres[3:])
print(lettres[-2:])
print(lettres[::2])
print("Python"[::-1])`,
    quiz: [
      { q: "Avec <code>n = [10, 20, 30, 40, 50]</code>, que vaut <code>n[1:3]</code> ?", choices: ["[10, 20, 30]", "[20, 30]", "[20, 30, 40]"], answer: 1,
        explain: "On prend les indices 1 et 2, et on s'arrête avant 3." },
      { q: 'Que vaut <code>"radar"[::-1]</code> ?', choices: ['"radar"', '"r"', "Une erreur"], answer: 0,
        explain: "[::-1] inverse la chaîne, et radar se lit pareil dans les deux sens." },
    ],
    exercise: {
      task: `<p>Écris une fonction <code>est_palindrome(mot)</code> qui renvoie <code>True</code> si le mot se lit pareil dans les deux sens, sans tenir compte des majuscules.</p>
<p>Par exemple <code>est_palindrome("Kayak")</code> renvoie <code>True</code> et <code>est_palindrome("Python")</code> renvoie <code>False</code>.</p>`,
      starter: `def est_palindrome(mot):
    pass  # remplace cette ligne

print(est_palindrome("Kayak"))
`,
      check: `
assert est_palindrome("kayak") is True, 'est_palindrome("kayak") doit renvoyer True.'
assert est_palindrome("Kayak") is True, 'est_palindrome("Kayak") doit renvoyer True : passe le mot en minuscules avec .lower().'
assert est_palindrome("Python") is False, 'est_palindrome("Python") doit renvoyer False.'
assert est_palindrome("a") is True, "Un mot d'une lettre est un palindrome."
`,
      solution: `def est_palindrome(mot):
    mot = mot.lower()
    return mot == mot[::-1]

print(est_palindrome("Kayak"))
print(est_palindrome("Python"))`,
    },
  },

  tri: {
    body: `
<p>Deux façons de trier :</p>
<ul>
  <li><code>liste.sort()</code> trie la liste <b>sur place</b> (elle est modifiée) ;</li>
  <li><code>sorted(liste)</code> renvoie une <b>nouvelle</b> liste triée, sans toucher l'originale.</li>
</ul>
<pre>scores = [42, 7, 19, 88]
print(sorted(scores))                 # [7, 19, 42, 88]
print(sorted(scores, reverse=True))   # [88, 42, 19, 7]
scores.sort()
print(scores)                         # [7, 19, 42, 88]</pre>
<h2>Trier selon un critère</h2>
<p>Le paramètre <code>key</code> indique une fonction qui donne la valeur à comparer :</p>
<pre>mots = ["kiwi", "ananas", "fig"]
print(sorted(mots, key=len))   # ['fig', 'kiwi', 'ananas']</pre>
<h2>Chercher</h2>
<ul>
  <li><code>liste.index(x)</code> : la position de x (erreur s'il n'y est pas) ;</li>
  <li><code>liste.count(x)</code> : le nombre de fois où x apparaît.</li>
</ul>`,
    starter: `scores = [42, 7, 19, 88]
print(sorted(scores))
print(sorted(scores, reverse=True))
print(scores)  # inchangée

mots = ["kiwi", "ananas", "fig"]
print(sorted(mots))
print(sorted(mots, key=len))

des = [3, 6, 1, 6, 2, 6]
print(des.count(6), des.index(1))`,
    quiz: [
      { q: "Que vaut <code>x</code> après <code>x = [3, 1, 2].sort()</code> ?", choices: ["[1, 2, 3]", "None", "[3, 1, 2]"], answer: 1,
        explain: "sort() trie sur place et ne renvoie rien. Pour obtenir une liste triée, on utilise sorted()." },
      { q: 'Que donne <code>sorted(["bb", "a", "ccc"], key=len, reverse=True)</code> ?', choices: ["['a', 'bb', 'ccc']", "['ccc', 'bb', 'a']", "['ccc', 'a', 'bb']"], answer: 1,
        explain: "On trie par longueur, de la plus grande à la plus petite." },
    ],
    exercise: {
      task: `<p>Écris <code>podium(temps)</code> qui reçoit une liste de temps de course (en secondes) et <b>renvoie</b> la liste des 3 meilleurs, du plus rapide au plus lent. La liste d'origine ne doit pas être modifiée.</p>`,
      starter: `def podium(temps):
    pass  # remplace cette ligne

course = [58.2, 61.0, 55.9, 57.4, 63.1]
print(podium(course))
print(course)
`,
      check: `
t = [58.2, 61.0, 55.9, 57.4, 63.1]
copie = list(t)
assert podium(t) == [55.9, 57.4, 58.2], "podium doit renvoyer les 3 plus petits temps, triés : [55.9, 57.4, 58.2]."
assert t == copie, "La liste d'origine a été modifiée. Utilise sorted() plutôt que sort()."
assert podium([3, 1, 2, 9]) == [1, 2, 3], "podium([3, 1, 2, 9]) doit renvoyer [1, 2, 3]."
`,
      solution: `def podium(temps):
    return sorted(temps)[:3]

course = [58.2, 61.0, 55.9, 57.4, 63.1]
print(podium(course))
print(course)`,
    },
  },

  tuples: {
    body: `
<p>Un <b>tuple</b> ressemble à une liste, mais il s'écrit entre parenthèses et il est <b>non modifiable</b> : une fois créé, on ne peut ni ajouter, ni retirer, ni remplacer d'élément.</p>
<pre>point = (3, 7)
print(point[0])     # 3
point[0] = 5        # TypeError : un tuple ne se modifie pas</pre>
<p>On l'utilise pour des valeurs qui vont ensemble et ne doivent pas changer : des coordonnées, une date, une couleur RVB…</p>
<h2>Le déballage</h2>
<p>On peut répartir les éléments d'un tuple dans plusieurs variables d'un coup :</p>
<pre>x, y = point          # x = 3, y = 7
a, b = 1, 2
a, b = b, a           # échange les deux valeurs !</pre>
<p>Une fonction peut aussi renvoyer plusieurs valeurs : en fait, elle renvoie un tuple.</p>
<pre>def min_max(liste):
    return min(liste), max(liste)

bas, haut = min_max([4, 9, 1])</pre>`,
    starter: `point = (3, 7)
x, y = point
print(x, y)

a, b = 1, 2
a, b = b, a
print(a, b)

def min_max(liste):
    return min(liste), max(liste)

bas, haut = min_max([4, 9, 1])
print(bas, haut)
print(type(min_max([1, 2])))`,
    quiz: [
      { q: "Que se passe-t-il avec <code>t = (1, 2)</code> puis <code>t.append(3)</code> ?", choices: ["t devient (1, 2, 3)", "Une erreur : un tuple n'a pas d'append", "t devient [1, 2, 3]"], answer: 1,
        explain: "Un tuple est non modifiable, il n'a pas de méthode append." },
      { q: "Après <code>a, b = 5, 9</code> puis <code>a, b = b, a</code>, que vaut <code>a</code> ?", choices: ["5", "9", "(9, 5)"], answer: 1,
        explain: "Les deux valeurs ont été échangées en une ligne." },
    ],
    exercise: {
      task: `<p>Écris <code>stats(notes)</code> qui renvoie un <b>tuple</b> de trois valeurs : la plus basse, la plus haute et la moyenne (arrondie à 1 chiffre).</p>
<p>Puis déballe le résultat dans trois variables <code>bas</code>, <code>haut</code>, <code>moy</code> et affiche-les.</p>`,
      starter: `def stats(notes):
    pass  # remplace cette ligne

notes = [12, 8, 15, 17, 10]
`,
      check: `
r = stats([12, 8, 15, 17, 10])
assert isinstance(r, tuple), "stats doit renvoyer un tuple : return a, b, c"
assert r == (8, 17, 12.4), "stats([12, 8, 15, 17, 10]) doit renvoyer (8, 17, 12.4)."
assert (bas, haut, moy) == (8, 17, 12.4), "Déballe le résultat : bas, haut, moy = stats(notes)"
assert "12.4" in sortie, "Affiche les trois valeurs."
`,
      solution: `def stats(notes):
    return min(notes), max(notes), round(sum(notes) / len(notes), 1)

notes = [12, 8, 15, 17, 10]
bas, haut, moy = stats(notes)
print(bas, haut, moy)`,
    },
  },

  dicos: {
    body: `
<p>Un <b>dictionnaire</b> associe des <b>clés</b> à des <b>valeurs</b>, comme un vrai dictionnaire associe un mot à sa définition. On l'écrit entre accolades :</p>
<pre>capitales = {"France": "Paris", "Japon": "Tokyo", "Pérou": "Lima"}
print(capitales["Japon"])           # Tokyo
capitales["Kenya"] = "Nairobi"      # ajouter ou modifier
del capitales["Pérou"]              # supprimer</pre>
<p>On accède à une valeur par sa clé, pas par une position. Une clé absente provoque une <code>KeyError</code>. Pour l'éviter, <code>.get()</code> renvoie une valeur par défaut :</p>
<pre>print(capitales.get("Italie", "inconnue"))   # inconnue</pre>
<h2>Parcourir un dictionnaire</h2>
<pre>for pays, ville in capitales.items():
    print(f"{ville} est la capitale de {pays}")</pre>
<p><code>.keys()</code> donne les clés, <code>.values()</code> les valeurs, <code>.items()</code> les paires.</p>`,
    starter: `capitales = {"France": "Paris", "Japon": "Tokyo", "Pérou": "Lima"}
print(capitales["Japon"])
capitales["Kenya"] = "Nairobi"
del capitales["Pérou"]
print(capitales.get("Italie", "inconnue"))

for pays, ville in capitales.items():
    print(f"{ville} est la capitale de {pays}")

print(len(capitales), "Japon" in capitales)`,
    quiz: [
      { q: 'Avec <code>d = {"a": 1, "b": 2}</code>, que vaut <code>d["b"]</code> ?', choices: ["1", "2", '"b"'], answer: 1,
        explain: "On obtient la valeur associée à la clé b." },
      { q: 'Que renvoie <code>d.get("z", 0)</code> ?', choices: ["0", "None", "Une KeyError"], answer: 0,
        explain: "La clé z n'existe pas, get renvoie la valeur par défaut donnée." },
      { q: 'Que teste <code>"a" in d</code> ?', choices: ["Si a est une valeur", "Si a est une clé", "Si d est vide"], answer: 1,
        explain: "in vérifie les clés d'un dictionnaire." },
    ],
    exercise: {
      task: `<p>Écris <code>compter_votes(votes)</code> qui reçoit une liste de noms et renvoie un dictionnaire qui associe chaque nom à son nombre de voix.</p>
<p>Par exemple <code>compter_votes(["Léa", "Sam", "Léa"])</code> renvoie <code>{"Léa": 2, "Sam": 1}</code>.</p>`,
      starter: `def compter_votes(votes):
    resultats = {}
    # À FAIRE
    return resultats

print(compter_votes(["Léa", "Sam", "Léa", "Nour", "Léa", "Sam"]))
`,
      check: `
assert compter_votes(["Léa", "Sam", "Léa"]) == {"Léa": 2, "Sam": 1}, 'compter_votes(["Léa", "Sam", "Léa"]) doit renvoyer {"Léa": 2, "Sam": 1}.'
assert compter_votes([]) == {}, "Avec une liste vide, le résultat est un dictionnaire vide."
assert compter_votes(["A"] * 5 + ["B"]) == {"A": 5, "B": 1}, "Le comptage n'est pas bon pour une liste plus longue."
`,
      solution: `def compter_votes(votes):
    resultats = {}
    for nom in votes:
        resultats[nom] = resultats.get(nom, 0) + 1
    return resultats

print(compter_votes(["Léa", "Sam", "Léa", "Nour", "Léa", "Sam"]))`,
    },
  },

  ensembles: {
    body: `
<p>Un <b>ensemble</b> (<code>set</code>) est une collection <b>sans doublons</b> et <b>sans ordre</b>. On l'écrit entre accolades, ou on le crée à partir d'une liste avec <code>set()</code> :</p>
<pre>couleurs = {"rouge", "vert", "rouge", "bleu"}
print(len(couleurs))           # 3 : le doublon a disparu

visiteurs = ["ali", "bea", "ali", "chloé"]
uniques = set(visiteurs)       # {'ali', 'bea', 'chloé'}</pre>
<p>Tester si un élément est dans un ensemble avec <code>in</code> est très rapide, même avec des millions d'éléments.</p>
<h2>Les opérations d'ensembles</h2>
<pre>a = {"python", "js", "sql"}
b = {"python", "rust"}
print(a & b)   # {'python'}             : dans les deux (intersection)
print(a | b)   # tous, sans doublon     : union
print(a - b)   # {'js', 'sql'}          : dans a mais pas dans b</pre>
<p class="note">Attention : <code>{}</code> crée un dictionnaire vide. Un ensemble vide s'écrit <code>set()</code>.</p>`,
    starter: `couleurs = {"rouge", "vert", "rouge", "bleu"}
print(len(couleurs))

visiteurs = ["ali", "bea", "ali", "chloé"]
print(set(visiteurs))

a = {"python", "js", "sql"}
b = {"python", "rust"}
print(a & b)
print(sorted(a | b))
print(a - b)`,
    quiz: [
      { q: "Que vaut <code>len(set([1, 1, 2, 2, 2, 3]))</code> ?", choices: ["6", "3", "1"], answer: 1,
        explain: "Il reste 1, 2 et 3 : les doublons disparaissent." },
      { q: "Comment crée-t-on un ensemble vide ?", choices: ["<code>{}</code>", "<code>set()</code>", "<code>[]</code>"], answer: 1,
        explain: "{} est un dictionnaire vide." },
    ],
    exercise: {
      task: `<p>Deux amis listent les films qu'ils ont vus. Avec des ensembles :</p>
<ul><li>mets dans <code>communs</code> les films vus par les deux ;</li>
<li>mets dans <code>a_conseiller</code> les films vus par Inès mais pas par Marc ;</li>
<li>affiche les deux, triés avec <code>sorted()</code>.</li></ul>`,
      starter: `ines = ["Dune", "Coco", "Up", "Alien", "Coco"]
marc = ["Alien", "Matrix", "Dune"]

`,
      check: `
assert set(communs) == {"Dune", "Alien"}, "communs doit contenir les films présents dans les deux listes : set(ines) & set(marc)."
assert set(a_conseiller) == {"Coco", "Up"}, "a_conseiller doit contenir les films d'Inès absents chez Marc : set(ines) - set(marc)."
assert "set(" in code_eleve, "Utilise set() pour transformer les listes en ensembles."
assert "Alien" in sortie and "Up" in sortie, "Affiche les deux résultats."
`,
      solution: `ines = ["Dune", "Coco", "Up", "Alien", "Coco"]
marc = ["Alien", "Matrix", "Dune"]

communs = set(ines) & set(marc)
a_conseiller = set(ines) - set(marc)
print("En commun :", sorted(communs))
print("À conseiller à Marc :", sorted(a_conseiller))`,
    },
  },

  "projet-repertoire": {
    body: `
<p>Un répertoire téléphonique est l'exemple parfait du dictionnaire : le nom est la clé, le numéro est la valeur.</p>
<pre>repertoire = {}
repertoire["Maya"] = "06 12 34 56 78"</pre>
<p>On va écrire quatre fonctions qui travaillent toutes sur le même dictionnaire, passé en paramètre :</p>
<ul>
  <li><code>ajouter(rep, nom, numero)</code></li>
  <li><code>chercher(rep, nom)</code> qui renvoie le numéro ou <code>None</code></li>
  <li><code>supprimer(rep, nom)</code> qui renvoie <code>True</code> si le contact existait</li>
  <li><code>lister(rep)</code> qui renvoie la liste des noms triés</li>
</ul>
<p class="note">Un dictionnaire passé à une fonction n'est pas copié : si la fonction le modifie, le programme principal voit la modification.</p>`,
    quiz: [
      { q: "Si une fonction fait <code>rep[nom] = numero</code> sur un dictionnaire reçu en paramètre…", choices: ["seule la copie locale est modifiée", "le dictionnaire d'origine est modifié", "Python affiche une erreur"], answer: 1,
        explain: "Les listes et dictionnaires ne sont pas copiés quand on les passe à une fonction." },
    ],
    exercise: {
      task: `<p>Écris les quatre fonctions décrites ci-dessus. Les noms doivent être enregistrés avec une majuscule au début (utilise <code>nom.capitalize()</code>), pour que <code>chercher(rep, "maya")</code> trouve <code>Maya</code>.</p>`,
      starter: `def ajouter(rep, nom, numero):
    pass

def chercher(rep, nom):
    pass

def supprimer(rep, nom):
    pass

def lister(rep):
    pass

rep = {}
ajouter(rep, "maya", "06 12 34 56 78")
ajouter(rep, "Bilal", "07 98 76 54 32")
print(chercher(rep, "MAYA"))
print(lister(rep))
`,
      check: `
r = {}
ajouter(r, "maya", "0611")
ajouter(r, "bilal", "0722")
ajouter(r, "Anna", "0633")
assert r == {"Maya": "0611", "Bilal": "0722", "Anna": "0633"}, "ajouter doit enregistrer le nom avec capitalize() comme clé."
assert chercher(r, "MAYA") == "0611", 'chercher(rep, "MAYA") doit trouver Maya.'
assert chercher(r, "zoé") is None, "chercher doit renvoyer None si le contact n'existe pas."
assert lister(r) == ["Anna", "Bilal", "Maya"], "lister doit renvoyer les noms triés."
assert supprimer(r, "bilal") is True and "Bilal" not in r, "supprimer doit retirer le contact et renvoyer True."
assert supprimer(r, "bilal") is False, "supprimer doit renvoyer False si le contact n'existe pas."
`,
      solution: `def ajouter(rep, nom, numero):
    rep[nom.capitalize()] = numero

def chercher(rep, nom):
    return rep.get(nom.capitalize())

def supprimer(rep, nom):
    nom = nom.capitalize()
    if nom in rep:
        del rep[nom]
        return True
    return False

def lister(rep):
    return sorted(rep)

rep = {}
ajouter(rep, "maya", "06 12 34 56 78")
ajouter(rep, "Bilal", "07 98 76 54 32")
print(chercher(rep, "MAYA"))
print(lister(rep))`,
    },
  },
};
