// Niveau 3 · Module « La bibliothèque standard »
(window.LECONS = window.LECONS || {})["stdlib"] = {
  collections: {
    body: `
<p>Le module <code>collections</code> propose des versions améliorées des structures de base.</p>
<h2>Counter</h2>
<p>Compte les éléments en une ligne :</p>
<pre>from collections import Counter
c = Counter("abracadabra")
print(c["a"])              # 5
print(c.most_common(2))    # [('a', 5), ('b', 2)]</pre>
<h2>defaultdict</h2>
<p>Un dictionnaire qui crée automatiquement une valeur par défaut pour une clé absente. Idéal pour regrouper :</p>
<pre>from collections import defaultdict
par_initiale = defaultdict(list)
for nom in ["Ana", "Alex", "Bob"]:
    par_initiale[nom[0]].append(nom)
# {'A': ['Ana', 'Alex'], 'B': ['Bob']}</pre>
<h2>namedtuple et deque</h2>
<ul>
  <li><code>namedtuple</code> : un tuple dont les éléments ont un nom, <code>p.x</code> au lieu de <code>p[0]</code>.</li>
  <li><code>deque</code> : une file où ajouter et retirer aux deux bouts est rapide (<code>appendleft</code>, <code>popleft</code>).</li>
</ul>`,
    starter: `from collections import Counter, defaultdict, namedtuple, deque

c = Counter("abracadabra")
print(c["a"], c.most_common(2))

par_initiale = defaultdict(list)
for nom in ["Ana", "Alex", "Bob"]:
    par_initiale[nom[0]].append(nom)
print(dict(par_initiale))

Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y, p)

file = deque(["a", "b"])
file.appendleft("z")
print(file.popleft(), list(file))`,
    quiz: [
      { q: "Que renvoie <code>Counter([1, 1, 2]).most_common(1)</code> ?", choices: ["[(1, 2)]", "[1]", "{1: 2}"], answer: 0,
        explain: "most_common renvoie des paires (élément, nombre), les plus fréquentes d'abord." },
      { q: "Avec <code>d = defaultdict(int)</code>, que vaut <code>d[\"x\"]</code> si la clé n'existe pas ?", choices: ["Une KeyError", "0", "None"], answer: 1,
        explain: "int() vaut 0 : c'est la valeur par défaut créée." },
    ],
    exercise: {
      task: `<p>À partir de la liste <code>commandes</code> (paires client, plat) :</p>
<ul><li><code>top_plats</code> : les 2 plats les plus commandés, avec <code>Counter.most_common</code> ;</li>
<li><code>par_client</code> : un <code>defaultdict(list)</code> qui associe chaque client à la liste de ses plats.</li></ul>`,
      starter: `from collections import Counter, defaultdict

commandes = [("Ana", "pizza"), ("Bob", "salade"), ("Ana", "tiramisu"),
             ("Cy", "pizza"), ("Bob", "pizza"), ("Cy", "salade")]

`,
      check: `
assert top_plats == [("pizza", 3), ("salade", 2)], "top_plats doit valoir [('pizza', 3), ('salade', 2)]."
assert isinstance(par_client, defaultdict), "par_client doit être un defaultdict(list)."
assert dict(par_client) == {"Ana": ["pizza", "tiramisu"], "Bob": ["salade", "pizza"], "Cy": ["pizza", "salade"]}, "par_client doit regrouper les plats par client, dans l'ordre des commandes."
`,
      solution: `from collections import Counter, defaultdict

commandes = [("Ana", "pizza"), ("Bob", "salade"), ("Ana", "tiramisu"),
             ("Cy", "pizza"), ("Bob", "pizza"), ("Cy", "salade")]

top_plats = Counter(plat for _, plat in commandes).most_common(2)
par_client = defaultdict(list)
for client, plat in commandes:
    par_client[client].append(plat)
print(top_plats, dict(par_client))`,
    },
  },

  itertools: {
    body: `
<p>Quelques outils rendent les boucles beaucoup plus élégantes.</p>
<h2>enumerate et zip</h2>
<pre>for i, fruit in enumerate(["pomme", "kiwi"], start=1):
    print(i, fruit)

noms = ["Aya", "Ben"]
scores = [12, 18]
for nom, score in zip(noms, scores):
    print(nom, score)
print(dict(zip(noms, scores)))   # {'Aya': 12, 'Ben': 18}</pre>
<p><code>zip</code> avance dans plusieurs listes en même temps, et s'arrête à la plus courte.</p>
<h2>any et all</h2>
<pre>notes = [12, 8, 15]
print(any(n < 10 for n in notes))   # True : au moins une
print(all(n >= 5 for n in notes))   # True : toutes</pre>
<h2>itertools</h2>
<ul>
  <li><code>product("AB", repeat=2)</code> : toutes les combinaisons avec répétition (AA, AB, BA, BB) ;</li>
  <li><code>combinations([1, 2, 3], 2)</code> : les paires sans ordre ;</li>
  <li><code>permutations("abc")</code> : tous les ordres possibles ;</li>
  <li><code>accumulate([1, 2, 3])</code> : les sommes cumulées 1, 3, 6.</li>
</ul>`,
    starter: `from itertools import product, combinations, permutations, accumulate

noms = ["Aya", "Ben", "Cléo"]
scores = [12, 18, 15]
for nom, score in zip(noms, scores):
    print(nom, score)
print(dict(zip(noms, scores)))

print(any(s < 13 for s in scores), all(s >= 10 for s in scores))
print(list(combinations(noms, 2)))
print(["".join(p) for p in product("PF", repeat=2)])
print(list(accumulate([1, 2, 3, 4])))`,
    quiz: [
      { q: 'Que donne <code>list(zip([1, 2, 3], "ab"))</code> ?', choices: ["[(1, 'a'), (2, 'b')]", "[(1, 'a'), (2, 'b'), (3, None)]", "Une erreur"], answer: 0,
        explain: "zip s'arrête à la séquence la plus courte." },
      { q: "Combien de paires donne <code>combinations(range(4), 2)</code> ?", choices: ["4", "6", "16"], answer: 1,
        explain: "Il y a 6 façons de choisir 2 éléments parmi 4." },
    ],
    exercise: {
      task: `<p>Une équipe de 4 joueurs doit former des binômes.</p>
<ul><li><code>binomes</code> : la liste de tous les binômes possibles (tuples), avec <code>itertools.combinations</code> ;</li>
<li><code>niveaux</code> : un dictionnaire joueur → niveau, construit avec <code>zip</code> ;</li>
<li><code>equilibres</code> : les binômes dont la somme des niveaux vaut exactement 10.</li></ul>`,
      starter: `from itertools import combinations

joueurs = ["Ana", "Bo", "Cy", "Dé"]
notes = [3, 7, 6, 4]

`,
      check: `
assert binomes == list(combinations(joueurs, 2)), "binomes doit valoir list(combinations(joueurs, 2))."
assert niveaux == {"Ana": 3, "Bo": 7, "Cy": 6, "Dé": 4}, "niveaux doit valoir dict(zip(joueurs, notes))."
assert sorted(equilibres) == [("Ana", "Bo"), ("Cy", "Dé")], "equilibres doit contenir les binômes dont les niveaux font 10 au total."
assert "zip" in code_eleve, "Utilise zip pour construire niveaux."
`,
      solution: `from itertools import combinations

joueurs = ["Ana", "Bo", "Cy", "Dé"]
notes = [3, 7, 6, 4]

binomes = list(combinations(joueurs, 2))
niveaux = dict(zip(joueurs, notes))
equilibres = [(a, b) for a, b in binomes if niveaux[a] + niveaux[b] == 10]
print(equilibres)`,
    },
  },

  datetime: {
    body: `
<p>Le module <code>datetime</code> gère les dates, les heures et les durées.</p>
<pre>from datetime import date, datetime, timedelta

anniv = date(2026, 12, 25)
print(anniv.year, anniv.month, anniv.day)
print(anniv.weekday())        # 0 = lundi … 6 = dimanche

maintenant = datetime.now()   # date et heure actuelles</pre>
<h2>Calculer avec des dates</h2>
<p>Soustraire deux dates donne une durée (<code>timedelta</code>). Ajouter une durée à une date donne une nouvelle date :</p>
<pre>ecart = date(2026, 12, 25) - date(2026, 11, 6)
print(ecart.days)                            # 49
print(date(2026, 11, 6) + timedelta(days=30))  # 2026-12-06</pre>
<h2>Texte ↔ date</h2>
<ul>
  <li><code>d.strftime("%d/%m/%Y")</code> transforme une date en texte : <code>25/12/2026</code> ;</li>
  <li><code>datetime.strptime("25/12/2026", "%d/%m/%Y")</code> fait l'inverse.</li>
</ul>
<p class="note">Codes utiles : <code>%d</code> jour, <code>%m</code> mois, <code>%Y</code> année, <code>%H</code> heure, <code>%M</code> minutes.</p>`,
    starter: `from datetime import date, datetime, timedelta

anniv = date(2026, 12, 25)
print(anniv, anniv.weekday())
ecart = anniv - date(2026, 11, 6)
print(ecart.days, "jours")
print(date(2026, 11, 6) + timedelta(days=30))
print(anniv.strftime("%d/%m/%Y"))
d = datetime.strptime("14/07/2027 21:30", "%d/%m/%Y %H:%M")
print(d.hour, d.minute)`,
    quiz: [
      { q: "Que donne la soustraction de deux dates ?", choices: ["Un nombre de jours (int)", "Un objet timedelta", "Une nouvelle date"], answer: 1,
        explain: "On obtient une durée, dont .days donne le nombre de jours." },
      { q: "Quel format donne <code>2026-11-06</code> → <code>06/11/2026</code> ?", choices: ['<code>"%d/%m/%Y"</code>', '<code>"%Y/%m/%d"</code>', '<code>"%m/%d/%Y"</code>'], answer: 0,
        explain: "%d jour, %m mois, %Y année sur 4 chiffres." },
    ],
    exercise: {
      task: `<p>Écris :</p>
<ul><li><code>age(naissance, aujourd_hui)</code> qui reçoit deux <code>date</code> et renvoie l'âge en années révolues (attention : l'anniversaire de l'année n'est peut-être pas encore passé) ;</li>
<li><code>echeance(texte, jours)</code> qui reçoit une date au format <code>"jj/mm/aaaa"</code> et renvoie, au même format, la date <code>jours</code> jours plus tard.</li></ul>`,
      starter: `from datetime import date, datetime, timedelta

def age(naissance, aujourd_hui):
    pass

def echeance(texte, jours):
    pass

print(age(date(1995, 12, 1), date(2026, 11, 6)))
print(echeance("06/11/2026", 30))
`,
      check: `
assert age(date(1995, 12, 1), date(2026, 11, 6)) == 30, "Né le 1/12/1995, on a 30 ans le 6/11/2026 (anniversaire pas encore passé)."
assert age(date(1995, 3, 1), date(2026, 11, 6)) == 31, "Né le 1/3/1995, on a 31 ans le 6/11/2026."
assert age(date(2000, 11, 6), date(2026, 11, 6)) == 26, "Le jour de l'anniversaire, l'âge augmente."
assert echeance("06/11/2026", 30) == "06/12/2026", 'echeance("06/11/2026", 30) doit renvoyer "06/12/2026".'
assert echeance("28/02/2027", 1) == "01/03/2027", 'echeance("28/02/2027", 1) doit renvoyer "01/03/2027".'
`,
      solution: `from datetime import date, datetime, timedelta

def age(naissance, aujourd_hui):
    ans = aujourd_hui.year - naissance.year
    if (aujourd_hui.month, aujourd_hui.day) < (naissance.month, naissance.day):
        ans -= 1
    return ans

def echeance(texte, jours):
    d = datetime.strptime(texte, "%d/%m/%Y")
    return (d + timedelta(days=jours)).strftime("%d/%m/%Y")

print(age(date(1995, 12, 1), date(2026, 11, 6)))
print(echeance("06/11/2026", 30))`,
    },
  },

  json: {
    body: `
<p><b>JSON</b> est le format d'échange de données le plus répandu : les sites web, les API et de nombreux fichiers de configuration l'utilisent. Il ressemble beaucoup aux dictionnaires et listes de Python :</p>
<pre>{"nom": "Lina", "age": 27, "langages": ["python", "sql"], "admin": false}</pre>
<p>Le module <code>json</code> convertit dans les deux sens :</p>
<ul>
  <li><code>json.dumps(objet)</code> : Python → texte JSON ;</li>
  <li><code>json.loads(texte)</code> : texte JSON → Python ;</li>
  <li><code>json.dump(objet, fichier)</code> et <code>json.load(fichier)</code> : pareil, avec un fichier.</li>
</ul>
<pre>import json
profil = {"nom": "Lina", "age": 27}
texte = json.dumps(profil, ensure_ascii=False, indent=2)
retour = json.loads(texte)
print(retour["age"] + 1)</pre>
<p class="note">Différences à connaître : JSON écrit <code>true</code>, <code>false</code>, <code>null</code> au lieu de <code>True</code>, <code>False</code>, <code>None</code>, et les clés sont toujours des chaînes. <code>ensure_ascii=False</code> garde les accents lisibles.</p>`,
    starter: `import json

profil = {"nom": "Léa", "age": 27, "langages": ["python", "sql"], "admin": False, "chef": None}
texte = json.dumps(profil, ensure_ascii=False, indent=2)
print(texte)

retour = json.loads(texte)
print(retour["age"] + 1, retour["admin"])

with open("profil.json", "w", encoding="utf-8") as f:
    json.dump(profil, f, ensure_ascii=False)
with open("profil.json", encoding="utf-8") as f:
    print(json.load(f)["langages"])`,
    quiz: [
      { q: "Comment s'écrit <code>None</code> en JSON ?", choices: ["None", "null", "nil"], answer: 1,
        explain: "JSON utilise null." },
      { q: "Que renvoie <code>json.loads('[1, 2]')</code> ?", choices: ["La chaîne '[1, 2]'", "La liste [1, 2]", "Un tuple"], answer: 1,
        explain: "loads transforme le texte JSON en objet Python." },
    ],
    exercise: {
      task: `<p>Une application sauvegarde ses réglages en JSON. Écris :</p>
<ul><li><code>sauver(reglages, nom)</code> qui écrit le dictionnaire dans le fichier ;</li>
<li><code>charger(nom, defaut)</code> qui lit le fichier et renvoie les réglages, complétés par les valeurs de <code>defaut</code> pour les clés manquantes. Si le fichier n'existe pas, renvoie une copie de <code>defaut</code>.</li></ul>`,
      starter: `import json

DEFAUT = {"theme": "clair", "taille": 16, "sons": True}

def sauver(reglages, nom):
    pass

def charger(nom, defaut):
    pass

sauver({"theme": "sombre"}, "reglages.json")
print(charger("reglages.json", DEFAUT))
`,
      check: `
sauver({"theme": "sombre", "taille": 20}, "r1.json")
assert json.load(open("r1.json", encoding="utf-8")) == {"theme": "sombre", "taille": 20}, "sauver doit écrire le dictionnaire en JSON dans le fichier."
assert charger("r1.json", DEFAUT) == {"theme": "sombre", "taille": 20, "sons": True}, "charger doit compléter avec les valeurs par défaut manquantes."
r = charger("absent.json", DEFAUT)
assert r == DEFAUT, "Si le fichier n'existe pas, charger doit renvoyer les valeurs par défaut."
r["theme"] = "x"
assert DEFAUT["theme"] == "clair", "charger doit renvoyer une copie : modifier le résultat ne doit pas changer DEFAUT."
`,
      solution: `import json

DEFAUT = {"theme": "clair", "taille": 16, "sons": True}

def sauver(reglages, nom):
    with open(nom, "w", encoding="utf-8") as f:
        json.dump(reglages, f, ensure_ascii=False)

def charger(nom, defaut):
    resultat = dict(defaut)
    try:
        with open(nom, encoding="utf-8") as f:
            resultat.update(json.load(f))
    except FileNotFoundError:
        pass
    return resultat

sauver({"theme": "sombre"}, "reglages.json")
print(charger("reglages.json", DEFAUT))`,
    },
  },

  regex: {
    body: `
<p>Les <b>expressions régulières</b> (module <code>re</code>) décrivent des <b>motifs</b> de texte : « un nombre », « une adresse e-mail », « un code postal »… Elles servent à chercher, vérifier et extraire.</p>
<div class="table-wrap"><table>
<tr><th>Motif</th><th>Signification</th></tr>
<tr><td><code>\\d</code></td><td>un chiffre</td></tr>
<tr><td><code>\\w</code></td><td>une lettre, un chiffre ou _</td></tr>
<tr><td><code>\\s</code></td><td>un espace</td></tr>
<tr><td><code>.</code></td><td>n'importe quel caractère</td></tr>
<tr><td><code>+</code> / <code>*</code> / <code>?</code></td><td>1 fois ou plus / 0 fois ou plus / 0 ou 1 fois</td></tr>
<tr><td><code>{5}</code></td><td>exactement 5 fois</td></tr>
<tr><td><code>[a-z]</code></td><td>un caractère de cette liste</td></tr>
<tr><td><code>^</code> / <code>$</code></td><td>début / fin du texte</td></tr>
</table></div>
<pre>import re
texte = "Commande 128 livrée le 06/11, commande 42 en attente"
print(re.findall(r"\\d+", texte))                  # ['128', '06', '11', '42']
print(bool(re.fullmatch(r"\\d{5}", "69003")))      # True : un code postal
print(re.sub(r"\\s+", " ", "trop    d'espaces"))   # trop d'espaces</pre>
<p class="note">On écrit les motifs avec un <code>r</code> devant (<code>r"\\d+"</code>) : une chaîne « brute » où les barres obliques inversées ne sont pas interprétées par Python.</p>`,
    starter: `import re

texte = "Commande 128 livrée le 06/11, commande 42 en attente"
print(re.findall(r"\\d+", texte))
print(bool(re.fullmatch(r"\\d{5}", "69003")))
print(re.sub(r"\\s+", " ", "trop    d'espaces"))

m = re.search(r"(\\d{2})/(\\d{2})", texte)
print(m.group(0), m.group(1), m.group(2))`,
    quiz: [
      { q: "Quel motif correspond à « un ou plusieurs chiffres » ?", choices: ["<code>\\d</code>", "<code>\\d+</code>", "<code>\\d?</code>"], answer: 1,
        explain: "+ signifie « une fois ou plus »." },
      { q: 'Que renvoie <code>re.findall(r"[A-Z]", "Bonjour Paris")</code> ?', choices: ["['B', 'P']", "['Bonjour', 'Paris']", "2"], answer: 0,
        explain: "findall renvoie la liste de toutes les correspondances : ici les majuscules." },
    ],
    exercise: {
      task: `<p>Avec le module <code>re</code> :</p>
<ul><li><code>extraire_prix(texte)</code> renvoie la liste des prix en euros trouvés dans le texte, en <code>float</code>. Un prix s'écrit comme <code>12€</code>, <code>4.50€</code> ou <code>4,50 €</code> ;</li>
<li><code>est_telephone(texte)</code> renvoie <code>True</code> si le texte est un numéro français à 10 chiffres commençant par 0, éventuellement par paires séparées par des espaces : <code>0612345678</code> ou <code>06 12 34 56 78</code>.</li></ul>`,
      starter: `import re

def extraire_prix(texte):
    pass

def est_telephone(texte):
    pass

print(extraire_prix("Café 2,50 €, croissant 1.20€ et jus 4€"))
print(est_telephone("06 12 34 56 78"))
`,
      check: `
assert extraire_prix("Café 2,50 €, croissant 1.20€ et jus 4€") == [2.5, 1.2, 4.0], "extraire_prix doit trouver [2.5, 1.2, 4.0]. Pense à remplacer la virgule par un point avant float()."
assert extraire_prix("rien ici, 12 pommes") == [], "Un nombre sans € n'est pas un prix."
assert est_telephone("0612345678") and est_telephone("06 12 34 56 78"), "Les deux écritures d'un numéro doivent être acceptées."
assert not est_telephone("612345678") and not est_telephone("06123456789") and not est_telephone("06-12-34-56-78"), "Les numéros trop courts, trop longs ou avec des tirets doivent être refusés."
assert est_telephone("16 12 34 56 78") is False, "Le numéro doit commencer par 0."
assert "re." in code_eleve, "Utilise le module re."
`,
      solution: `import re

def extraire_prix(texte):
    trouves = re.findall(r"(\\d+(?:[.,]\\d+)?)\\s?€", texte)
    return [float(p.replace(",", ".")) for p in trouves]

def est_telephone(texte):
    return bool(re.fullmatch(r"0\\d( ?\\d{2}){4}", texte))

print(extraire_prix("Café 2,50 €, croissant 1.20€ et jus 4€"))
print(est_telephone("06 12 34 56 78"))`,
    },
  },
};
