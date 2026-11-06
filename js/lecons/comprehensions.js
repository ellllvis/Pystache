// Niveau 3 · Module « Compréhensions et générateurs »
(window.LECONS = window.LECONS || {})["comprehensions"] = {
  listes: {
    body: `
<p>Construire une liste avec une boucle et <code>append</code> est si courant que Python a une écriture compacte pour ça : la <b>compréhension de liste</b>.</p>
<pre># Version boucle
carres = []
for n in range(1, 6):
    carres.append(n * n)

# Version compréhension
carres = [n * n for n in range(1, 6)]   # [1, 4, 9, 16, 25]</pre>
<p>Ça se lit presque comme une phrase : « n × n, pour chaque n de 1 à 5 ».</p>
<h2>Avec un filtre</h2>
<p>On peut ajouter un <code>if</code> à la fin pour ne garder que certains éléments :</p>
<pre>prix = [12, 45, 8, 30]
chers = [p for p in prix if p > 20]          # [45, 30]
noms = ["ana", "BOB", "Cy"]
propres = [n.capitalize() for n in noms]     # ['Ana', 'Bob', 'Cy']</pre>
<p class="note">Une compréhension doit rester lisible. Si elle tient sur plusieurs lignes ou devient difficile à comprendre, une boucle classique est souvent meilleure.</p>`,
    starter: `carres = [n * n for n in range(1, 6)]
print(carres)

prix = [12, 45, 8, 30]
print([p for p in prix if p > 20])

noms = ["ana", "BOB", "Cy"]
print([n.capitalize() for n in noms])

print([len(m) for m in "le chat dort".split()])`,
    quiz: [
      { q: "Que vaut <code>[x * 2 for x in [1, 2, 3]]</code> ?", choices: ["[1, 2, 3, 1, 2, 3]", "[2, 4, 6]", "[1, 2, 3, 2]"], answer: 1,
        explain: "Chaque élément est multiplié par 2." },
      { q: "Que vaut <code>[x for x in range(10) if x % 3 == 0]</code> ?", choices: ["[0, 3, 6, 9]", "[3, 6, 9]", "[1, 4, 7]"], answer: 0,
        explain: "On garde les multiples de 3, et 0 en est un." },
    ],
    exercise: {
      task: `<p>Avec des <b>compréhensions de liste</b> (pas de boucle <code>for</code> classique) :</p>
<ul><li><code>positifs</code> : les nombres strictement positifs de <code>mesures</code> ;</li>
<li><code>arrondis</code> : toutes les mesures arrondies à l'entier ;</li>
<li><code>courts</code> : les mots de <code>mots</code> de 4 lettres ou moins, en majuscules.</li></ul>`,
      starter: `mesures = [3.7, -1.2, 0, 8.5, -4.9, 2.1]
mots = ["chat", "éléphant", "rat", "girafe", "ours"]

`,
      check: `
assert positifs == [3.7, 8.5, 2.1], "positifs doit valoir [3.7, 8.5, 2.1] (0 n'est pas strictement positif)."
assert arrondis == [round(m) for m in mesures], "arrondis doit contenir round(m) pour chaque mesure."
assert courts == ["CHAT", "RAT", "OURS"], 'courts doit valoir ["CHAT", "RAT", "OURS"].'
lignes_for = [l for l in code_eleve.split("\\n") if l.strip().startswith("for ")]
assert not lignes_for, "Utilise uniquement des compréhensions de liste, sans boucle for classique."
`,
      solution: `mesures = [3.7, -1.2, 0, 8.5, -4.9, 2.1]
mots = ["chat", "éléphant", "rat", "girafe", "ours"]

positifs = [m for m in mesures if m > 0]
arrondis = [round(m) for m in mesures]
courts = [m.upper() for m in mots if len(m) <= 4]
print(positifs, arrondis, courts)`,
    },
  },

  "dicos-ensembles": {
    body: `
<p>La même écriture existe pour les dictionnaires et les ensembles, avec des accolades.</p>
<h2>Compréhension de dictionnaire</h2>
<pre>noms = ["ana", "bob", "cyrielle"]
longueurs = {n: len(n) for n in noms}
# {'ana': 3, 'bob': 3, 'cyrielle': 8}

prix = {"café": 2.5, "thé": 2.2, "jus": 4}
soldes = {produit: round(p * 0.9, 2) for produit, p in prix.items()}</pre>
<p>On écrit <code>clé: valeur</code>, puis la boucle.</p>
<h2>Compréhension d'ensemble</h2>
<pre>mots = ["Chat", "chat", "CHIEN", "chien", "lapin"]
uniques = {m.lower() for m in mots}   # {'chat', 'chien', 'lapin'}</pre>
<p class="note">Une astuce fréquente : inverser un dictionnaire avec <code>{v: k for k, v in d.items()}</code>.</p>`,
    starter: `noms = ["ana", "bob", "cyrielle"]
print({n: len(n) for n in noms})

prix = {"café": 2.5, "thé": 2.2, "jus": 4}
print({produit: round(p * 0.9, 2) for produit, p in prix.items()})

mots = ["Chat", "chat", "CHIEN", "chien", "lapin"]
print(sorted({m.lower() for m in mots}))

codes = {"FR": "France", "JP": "Japon"}
print({v: k for k, v in codes.items()})`,
    quiz: [
      { q: "Que vaut <code>{x: x * x for x in range(3)}</code> ?", choices: ["{0: 0, 1: 1, 2: 4}", "[0, 1, 4]", "{0, 1, 4}"], answer: 0,
        explain: "Les deux-points indiquent un dictionnaire clé: valeur." },
      { q: "Que vaut <code>{c for c in \"banane\"}</code> ?", choices: ["Un ensemble de 3 lettres", "Une liste de 6 lettres", "Un dictionnaire"], answer: 0,
        explain: "Sans deux-points, c'est un ensemble : b, a et n, sans doublons." },
    ],
    exercise: {
      task: `<p>Avec des compréhensions :</p>
<ul><li><code>notes_sur_100</code> : un dictionnaire élève → note convertie sur 100 (note × 5), à partir de <code>notes</code> ;</li>
<li><code>admis</code> : un <b>ensemble</b> des élèves qui ont au moins 10/20 ;</li>
<li><code>par_note</code> : le dictionnaire inversé, note → élève.</li></ul>`,
      starter: `notes = {"Aya": 14, "Ben": 9, "Cléo": 17, "Dan": 10}

`,
      check: `
assert notes_sur_100 == {"Aya": 70, "Ben": 45, "Cléo": 85, "Dan": 50}, "notes_sur_100 doit valoir {élève: note * 5}."
assert admis == {"Aya", "Cléo", "Dan"} and isinstance(admis, set), "admis doit être un ensemble des élèves avec note >= 10."
assert par_note == {14: "Aya", 9: "Ben", 17: "Cléo", 10: "Dan"}, "par_note doit inverser clés et valeurs."
assert code_eleve.count(" for ") >= 3, "Utilise une compréhension pour chacune des trois variables."
`,
      solution: `notes = {"Aya": 14, "Ben": 9, "Cléo": 17, "Dan": 10}

notes_sur_100 = {eleve: n * 5 for eleve, n in notes.items()}
admis = {eleve for eleve, n in notes.items() if n >= 10}
par_note = {n: eleve for eleve, n in notes.items()}
print(notes_sur_100, admis, par_note)`,
    },
  },

  generateurs: {
    body: `
<p>Une liste garde tous ses éléments en mémoire. Pour une suite très longue, voire infinie, c'est impossible. Un <b>générateur</b> produit ses valeurs <b>une à une</b>, seulement quand on les demande.</p>
<h2>yield</h2>
<p>Une fonction qui contient <code>yield</code> devient un générateur. À chaque <code>yield</code>, elle donne une valeur et se met en pause, jusqu'à ce qu'on demande la suivante :</p>
<pre>def compte_a_rebours(n):
    while n > 0:
        yield n
        n -= 1

for x in compte_a_rebours(3):
    print(x)          # 3, 2, 1</pre>
<h2>Expression génératrice</h2>
<p>Avec des parenthèses au lieu de crochets, une compréhension devient un générateur. Parfait pour <code>sum</code>, <code>max</code>, <code>any</code>… qui n'ont pas besoin de la liste entière :</p>
<pre>total = sum(n * n for n in range(1_000_000))</pre>
<p class="note">Un générateur ne se parcourt qu'<b>une seule fois</b>. Pour le réutiliser, il faut en créer un nouveau.</p>`,
    starter: `def compte_a_rebours(n):
    while n > 0:
        yield n
        n -= 1

for x in compte_a_rebours(3):
    print(x)

gen = compte_a_rebours(2)
print(next(gen), next(gen))

print(sum(n * n for n in range(1_000_000)))

g = (x for x in [1, 2])
print(list(g), list(g))  # la deuxième fois, il est vide`,
    quiz: [
      { q: "Qu'est-ce qui fait d'une fonction un générateur ?", choices: ["Le mot return", "La présence de yield", "Le nom gen"], answer: 1,
        explain: "Dès qu'une fonction contient yield, l'appeler renvoie un générateur." },
      { q: "Quel est le principal avantage d'un générateur sur une liste ?", choices: ["Il est trié", "Il ne garde pas toutes les valeurs en mémoire", "On peut le parcourir plusieurs fois"], answer: 1,
        explain: "Les valeurs sont produites à la demande." },
    ],
    exercise: {
      task: `<p>Écris un générateur <code>fibonacci()</code> <b>infini</b> qui produit la suite 0, 1, 1, 2, 3, 5, 8… (chaque nombre est la somme des deux précédents).</p>
<p>Puis écris <code>premiers_termes(n)</code> qui renvoie la liste des <code>n</code> premiers termes en utilisant ce générateur.</p>
<p class="note">Attention : ne fais pas <code>list(fibonacci())</code>, la boucle ne s'arrêterait jamais. Utilise <code>next()</code> ou une boucle avec <code>break</code>.</p>`,
      starter: `def fibonacci():
    pass

def premiers_termes(n):
    pass

print(premiers_termes(10))
`,
      check: `
import types
assert isinstance(fibonacci(), types.GeneratorType), "fibonacci doit être un générateur : utilise yield."
assert "yield" in code_eleve, "Utilise yield."
g = fibonacci()
assert [next(g) for _ in range(12)] == [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89], "La suite doit commencer par 0, 1, 1, 2, 3, 5, 8…"
assert premiers_termes(10) == [0, 1, 1, 2, 3, 5, 8, 13, 21, 34], "premiers_termes(10) doit renvoyer les 10 premiers termes."
assert premiers_termes(0) == [], "premiers_termes(0) doit renvoyer une liste vide."
`,
      solution: `def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

def premiers_termes(n):
    g = fibonacci()
    return [next(g) for _ in range(n)]

print(premiers_termes(10))`,
    },
  },

  iterateurs: {
    body: `
<p>Comment <code>for</code> sait-il parcourir aussi bien une liste, une chaîne, un dictionnaire, un fichier ou un générateur ? Grâce au <b>protocole d'itération</b>.</p>
<ol>
  <li><code>for</code> appelle <code>iter(objet)</code>, qui renvoie un <b>itérateur</b>.</li>
  <li>À chaque tour, il appelle <code>next(iterateur)</code> pour obtenir l'élément suivant.</li>
  <li>Quand il n'y a plus rien, <code>next</code> lève <code>StopIteration</code>, et la boucle s'arrête.</li>
</ol>
<pre>it = iter(["a", "b"])
print(next(it))   # a
print(next(it))   # b
next(it)          # StopIteration</pre>
<h2>Rendre sa classe itérable</h2>
<p>Une classe devient itérable si elle définit <code>__iter__</code>. Le plus simple est d'en faire un générateur :</p>
<pre>class Playlist:
    def __init__(self, titres):
        self.titres = titres
    def __iter__(self):
        for t in self.titres:
            yield t

for titre in Playlist(["Intro", "Final"]):
    print(titre)</pre>`,
    starter: `it = iter(["a", "b"])
print(next(it))
print(next(it))
print(next(it, "fin"))  # valeur par défaut au lieu de StopIteration

class Playlist:
    def __init__(self, titres):
        self.titres = titres
    def __iter__(self):
        for t in self.titres:
            yield t

p = Playlist(["Intro", "Soleil", "Final"])
for titre in p:
    print(titre)
print(list(p), "Soleil" in p)`,
    quiz: [
      { q: "Quelle erreur indique qu'un itérateur est épuisé ?", choices: ["IndexError", "StopIteration", "EOFError"], answer: 1,
        explain: "for attrape StopIteration pour savoir quand s'arrêter." },
      { q: "Quelle méthode rend une classe parcourable avec <code>for</code> ?", choices: ["<code>__for__</code>", "<code>__iter__</code>", "<code>__loop__</code>"], answer: 1,
        explain: "for appelle iter(obj), qui appelle __iter__." },
    ],
    exercise: {
      task: `<p>Crée une classe <code>Intervalle(debut, fin, pas=1)</code> qui se parcourt comme <code>range</code>, mais <b>en incluant</b> la fin et en acceptant les décimaux.</p>
<p>Par exemple <code>list(Intervalle(0, 1, 0.25))</code> donne <code>[0, 0.25, 0.5, 0.75, 1.0]</code>. Définis aussi <code>__len__</code>, qui renvoie le nombre de valeurs.</p>`,
      starter: `class Intervalle:
    pass

print(list(Intervalle(1, 5)))
print(list(Intervalle(0, 1, 0.25)))
`,
      check: `
assert list(Intervalle(1, 5)) == [1, 2, 3, 4, 5], "Intervalle(1, 5) doit donner [1, 2, 3, 4, 5] (fin incluse)."
assert list(Intervalle(0, 1, 0.25)) == [0, 0.25, 0.5, 0.75, 1.0], "Intervalle(0, 1, 0.25) doit donner [0, 0.25, 0.5, 0.75, 1.0]."
i = Intervalle(2, 4)
assert list(i) == list(i) == [2, 3, 4], "On doit pouvoir parcourir le même Intervalle plusieurs fois (__iter__ doit créer un nouveau parcours)."
assert len(Intervalle(1, 5)) == 5 and len(Intervalle(0, 1, 0.25)) == 5, "len() doit renvoyer le nombre de valeurs."
`,
      solution: `class Intervalle:
    def __init__(self, debut, fin, pas=1):
        self.debut = debut
        self.fin = fin
        self.pas = pas

    def __iter__(self):
        x = self.debut
        while x <= self.fin:
            yield x
            x += self.pas

    def __len__(self):
        return sum(1 for _ in self)

print(list(Intervalle(1, 5)))
print(list(Intervalle(0, 1, 0.25)))`,
    },
  },
};
