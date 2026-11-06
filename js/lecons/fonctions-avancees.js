// Niveau 3 · Module « Fonctions avancées »
(window.LECONS = window.LECONS || {})["fonctions-avancees"] = {
  lambda: {
    body: `
<p>En Python, une fonction est une valeur comme une autre : on peut la ranger dans une variable, la mettre dans une liste ou la passer à une autre fonction.</p>
<pre>def double(x):
    return x * 2

f = double          # pas de parenthèses : on ne l'appelle pas, on la désigne
print(f(5))         # 10</pre>
<h2>lambda</h2>
<p>Pour une fonction très courte, utilisée une seule fois, on peut l'écrire en une ligne avec <code>lambda</code> :</p>
<pre>double = lambda x: x * 2</pre>
<p>Son usage principal est le paramètre <code>key</code> de <code>sorted</code>, <code>min</code> et <code>max</code> :</p>
<pre>eleves = [("Aya", 14), ("Ben", 9), ("Cléo", 17)]
print(sorted(eleves, key=lambda e: e[1]))       # tri par note
print(max(eleves, key=lambda e: e[1])[0])       # Cléo</pre>
<p><code>map</code> et <code>filter</code> appliquent aussi une fonction à chaque élément, mais une compréhension est en général plus lisible.</p>
<p class="note">Une lambda ne contient qu'une expression, sans <code>return</code>. Dès que c'est plus compliqué, écris une vraie fonction avec <code>def</code>.</p>`,
    starter: `eleves = [("Aya", 14), ("Ben", 9), ("Cléo", 17)]
print(sorted(eleves, key=lambda e: e[1]))
print(sorted(eleves, key=lambda e: e[1], reverse=True))
print(max(eleves, key=lambda e: e[1])[0])

operations = {"+": lambda a, b: a + b, "*": lambda a, b: a * b}
print(operations["*"](6, 7))

print(list(map(str.upper, ["a", "b"])))
print(list(filter(lambda n: n % 2, range(10))))`,
    quiz: [
      { q: "Que vaut <code>(lambda x, y: x - y)(10, 4)</code> ?", choices: ["6", "-6", "14"], answer: 0,
        explain: "La lambda reçoit x = 10, y = 4 et renvoie 10 − 4." },
      { q: 'Que donne <code>sorted(["bb", "a", "ccc"], key=lambda m: -len(m))</code> ?', choices: ["['a', 'bb', 'ccc']", "['ccc', 'bb', 'a']"], answer: 1,
        explain: "On trie selon l'opposé de la longueur : les plus longs d'abord." },
    ],
    exercise: {
      task: `<p>Avec <code>sorted</code>, <code>min</code> ou <code>max</code> et des <b>lambdas</b> :</p>
<ul><li><code>par_prix</code> : les produits triés du moins cher au plus cher ;</li>
<li><code>par_nom</code> : les produits triés par nom, sans tenir compte des majuscules ;</li>
<li><code>plus_gros_stock</code> : le <b>nom</b> du produit qui a le plus grand stock.</li></ul>`,
      starter: `produits = [
    {"nom": "stylo", "prix": 1.5, "stock": 120},
    {"nom": "Cahier", "prix": 3.2, "stock": 40},
    {"nom": "agenda", "prix": 12.0, "stock": 15},
    {"nom": "Gomme", "prix": 0.9, "stock": 200},
]

`,
      check: `
assert [p["nom"] for p in par_prix] == ["Gomme", "stylo", "Cahier", "agenda"], "par_prix doit trier selon p['prix']."
assert [p["nom"] for p in par_nom] == ["agenda", "Cahier", "Gomme", "stylo"], "par_nom doit trier selon p['nom'].lower()."
assert plus_gros_stock == "Gomme", "plus_gros_stock doit valoir le nom du produit au plus grand stock (Gomme)."
assert code_eleve.count("lambda") >= 3, "Utilise une lambda pour chacun des trois calculs."
`,
      solution: `produits = [
    {"nom": "stylo", "prix": 1.5, "stock": 120},
    {"nom": "Cahier", "prix": 3.2, "stock": 40},
    {"nom": "agenda", "prix": 12.0, "stock": 15},
    {"nom": "Gomme", "prix": 0.9, "stock": 200},
]

par_prix = sorted(produits, key=lambda p: p["prix"])
par_nom = sorted(produits, key=lambda p: p["nom"].lower())
plus_gros_stock = max(produits, key=lambda p: p["stock"])["nom"]
print(plus_gros_stock)`,
    },
  },

  "args-kwargs": {
    body: `
<p>Comment <code>print</code> accepte-t-il autant d'arguments qu'on veut ? Grâce à <code>*args</code>.</p>
<pre>def somme(*nombres):
    total = 0
    for n in nombres:
        total += n
    return total

print(somme(1, 2), somme(4, 5, 6, 7))</pre>
<p>Le paramètre précédé d'une <b>étoile</b> reçoit tous les arguments positionnels en trop, sous forme de <b>tuple</b>.</p>
<h2>**kwargs</h2>
<p>Avec <b>deux étoiles</b>, le paramètre reçoit les arguments <b>nommés</b> en trop, sous forme de <b>dictionnaire</b> :</p>
<pre>def fiche(nom, **infos):
    print(nom)
    for cle, valeur in infos.items():
        print(f"  {cle} : {valeur}")

fiche("Lina", ville="Lyon", metier="architecte")</pre>
<h2>Déballer à l'appel</h2>
<p>Les étoiles servent aussi dans l'autre sens, pour étaler une liste ou un dictionnaire en arguments :</p>
<pre>coords = [3, 4]
point(*coords)            # comme point(3, 4)
options = {"sep": " | "}
print("a", "b", **options)</pre>`,
    starter: `def somme(*nombres):
    print("reçu :", nombres)
    return sum(nombres)

print(somme(1, 2), somme(4, 5, 6, 7))

def fiche(nom, **infos):
    print(nom)
    for cle, valeur in infos.items():
        print(f"  {cle} : {valeur}")

fiche("Lina", ville="Lyon", metier="architecte")

options = {"sep": " | "}
print("a", "b", "c", **options)`,
    quiz: [
      { q: "Dans <code>def f(*args):</code>, quel est le type de <code>args</code> ?", choices: ["list", "tuple", "dict"], answer: 1,
        explain: "*args regroupe les arguments positionnels dans un tuple." },
      { q: "Dans <code>def f(**kwargs):</code>, que donne <code>f(a=1)</code> pour <code>kwargs</code> ?", choices: ["(1,)", "{'a': 1}", "['a', 1]"], answer: 1,
        explain: "**kwargs regroupe les arguments nommés dans un dictionnaire." },
    ],
    exercise: {
      task: `<p>Écris deux fonctions :</p>
<ul><li><code>plus_grand(*valeurs)</code> renvoie la plus grande valeur, ou <code>None</code> si on n'en donne aucune (sans utiliser <code>max</code>) ;</li>
<li><code>balise(nom, contenu, **attributs)</code> renvoie une balise HTML. Par exemple <code>balise("a", "Accueil", href="/", title="home")</code> renvoie <code>&lt;a href="/" title="home"&gt;Accueil&lt;/a&gt;</code>.</li></ul>`,
      starter: `def plus_grand(*valeurs):
    pass

def balise(nom, contenu, **attributs):
    pass

print(plus_grand(4, 9, 2))
print(balise("a", "Accueil", href="/", title="home"))
`,
      check: `
assert plus_grand(4, 9, 2) == 9 and plus_grand(-3) == -3, "plus_grand(4, 9, 2) doit renvoyer 9."
assert plus_grand() is None, "plus_grand() sans argument doit renvoyer None."
assert "max(" not in code_eleve, "N'utilise pas max() : parcours les valeurs toi-même."
assert balise("p", "Salut") == "<p>Salut</p>", 'balise("p", "Salut") doit renvoyer "<p>Salut</p>".'
assert balise("a", "Accueil", href="/", title="home") == '<a href="/" title="home">Accueil</a>', 'balise("a", "Accueil", href="/", title="home") doit renvoyer <a href="/" title="home">Accueil</a>'
`,
      solution: `def plus_grand(*valeurs):
    if not valeurs:
        return None
    meilleur = valeurs[0]
    for v in valeurs[1:]:
        if v > meilleur:
            meilleur = v
    return meilleur

def balise(nom, contenu, **attributs):
    attrs = "".join(f' {cle}="{valeur}"' for cle, valeur in attributs.items())
    return f"<{nom}{attrs}>{contenu}</{nom}>"

print(plus_grand(4, 9, 2))
print(balise("a", "Accueil", href="/", title="home"))`,
    },
  },

  closures: {
    body: `
<p>On peut définir une fonction <b>à l'intérieur</b> d'une autre, et même la renvoyer. La fonction intérieure se souvient des variables de la fonction qui l'a créée, même après la fin de celle-ci. C'est ce qu'on appelle une <b>fermeture</b> (<i>closure</i>).</p>
<pre>def multiplicateur(facteur):
    def multiplier(x):
        return x * facteur      # facteur vient de la fonction extérieure
    return multiplier

double = multiplicateur(2)
triple = multiplicateur(3)
print(double(10), triple(10))   # 20 30</pre>
<p><code>multiplicateur</code> est une « usine à fonctions » : chaque appel fabrique une nouvelle fonction avec son propre <code>facteur</code>.</p>
<h2>Modifier une variable capturée</h2>
<p>Pour modifier (et pas seulement lire) une variable de la fonction extérieure, on la déclare <code>nonlocal</code> :</p>
<pre>def creer_compteur():
    n = 0
    def suivant():
        nonlocal n
        n += 1
        return n
    return suivant</pre>`,
    starter: `def multiplicateur(facteur):
    def multiplier(x):
        return x * facteur
    return multiplier

double = multiplicateur(2)
triple = multiplicateur(3)
print(double(10), triple(10))

def creer_compteur():
    n = 0
    def suivant():
        nonlocal n
        n += 1
        return n
    return suivant

c1, c2 = creer_compteur(), creer_compteur()
print(c1(), c1(), c1(), c2())`,
    quiz: [
      { q: "Que renvoie <code>multiplicateur(5)</code> ?", choices: ["5", "Une fonction", "None"], answer: 1,
        explain: "Elle renvoie la fonction multiplier, qui se souvient que facteur vaut 5." },
      { q: "À quoi sert <code>nonlocal</code> ?", choices: ["À créer une variable globale", "À modifier une variable de la fonction englobante", "À supprimer une variable"], answer: 1,
        explain: "Sans nonlocal, n += 1 créerait une nouvelle variable locale et provoquerait une erreur." },
    ],
    exercise: {
      task: `<p>Écris <code>creer_remise(pourcentage)</code> qui renvoie une fonction. Cette fonction reçoit un prix et renvoie le prix remisé, arrondi à 2 chiffres.</p>
<p>Puis écris <code>creer_historique()</code> qui renvoie une fonction <code>noter(valeur)</code> : chaque appel ajoute la valeur à une liste cachée et renvoie toute la liste.</p>`,
      starter: `def creer_remise(pourcentage):
    pass

def creer_historique():
    pass

soldes = creer_remise(30)
print(soldes(50))
`,
      check: `
r30, r10 = creer_remise(30), creer_remise(10)
assert callable(r30), "creer_remise doit renvoyer une fonction."
assert r30(50) == 35 and r10(19.99) == 17.99, "creer_remise(30)(50) doit renvoyer 35.0, et creer_remise(10)(19.99) 17.99."
n1, n2 = creer_historique(), creer_historique()
assert n1("a") == ["a"] and n1("b") == ["a", "b"], "Chaque appel doit ajouter la valeur et renvoyer toute la liste."
assert n2("x") == ["x"], "Deux historiques doivent être indépendants."
`,
      solution: `def creer_remise(pourcentage):
    def appliquer(prix):
        return round(prix * (1 - pourcentage / 100), 2)
    return appliquer

def creer_historique():
    valeurs = []
    def noter(valeur):
        valeurs.append(valeur)
        return list(valeurs)
    return noter

soldes = creer_remise(30)
print(soldes(50))`,
    },
  },

  decorateurs: {
    body: `
<p>Un <b>décorateur</b> est une fonction qui reçoit une fonction et en renvoie une version améliorée. Il permet d'ajouter un comportement (mesurer le temps, journaliser, vérifier des droits…) sans toucher au code d'origine.</p>
<pre>def annoncer(fonction):
    def enveloppe(*args, **kwargs):
        print(f"→ appel de {fonction.__name__}{args}")
        resultat = fonction(*args, **kwargs)
        print(f"← résultat : {resultat}")
        return resultat
    return enveloppe

@annoncer
def addition(a, b):
    return a + b

addition(2, 3)</pre>
<p>La ligne <code>@annoncer</code> au-dessus de <code>def</code> est un raccourci pour <code>addition = annoncer(addition)</code>.</p>
<p>L'enveloppe utilise <code>*args, **kwargs</code> pour accepter n'importe quels arguments et les transmettre tels quels : le décorateur marche ainsi sur toutes les fonctions.</p>
<p class="note">Python fournit des décorateurs prêts à l'emploi, comme <code>@functools.lru_cache</code>, qui mémorise les résultats d'une fonction pour ne pas les recalculer.</p>`,
    starter: `def annoncer(fonction):
    def enveloppe(*args, **kwargs):
        print(f"→ appel de {fonction.__name__}{args}")
        resultat = fonction(*args, **kwargs)
        print(f"← résultat : {resultat}")
        return resultat
    return enveloppe

@annoncer
def addition(a, b):
    return a + b

addition(2, 3)

from functools import lru_cache

@lru_cache
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

print(fib(80))`,
    quiz: [
      { q: "<code>@deco</code> placé au-dessus de <code>def f():</code> équivaut à…", choices: ["<code>deco = f(deco)</code>", "<code>f = deco(f)</code>", "<code>f()</code> puis <code>deco()</code>"], answer: 1,
        explain: "La fonction est remplacée par ce que renvoie le décorateur." },
      { q: "Pourquoi l'enveloppe prend-elle <code>*args, **kwargs</code> ?", choices: ["Pour aller plus vite", "Pour accepter et transmettre n'importe quels arguments", "C'est obligatoire pour toute fonction"], answer: 1,
        explain: "Ainsi le décorateur fonctionne quelle que soit la signature de la fonction décorée." },
    ],
    exercise: {
      task: `<p>Écris un décorateur <code>compter_appels</code> qui ajoute à la fonction décorée un attribut <code>appels</code> comptant combien de fois elle a été appelée, sans changer son résultat.</p>
<p>Puis écris un décorateur <code>positifs</code> qui lève <code>ValueError</code> si l'un des arguments positionnels est négatif, et sinon appelle la fonction normalement.</p>`,
      starter: `def compter_appels(fonction):
    pass

def positifs(fonction):
    pass

@compter_appels
def saluer(nom):
    return f"Salut {nom}"

saluer("Ana")
saluer("Bo")
print(saluer.appels)
`,
      check: `
@compter_appels
def carre(x):
    return x * x
assert carre.appels == 0, "Avant tout appel, appels doit valoir 0."
assert carre(3) == 9 and carre(4) == 16, "Le décorateur ne doit pas changer le résultat."
assert carre.appels == 2, "Après deux appels, appels doit valoir 2."
@positifs
def aire(l, h):
    return l * h
assert aire(2, 3) == 6, "positifs ne doit pas gêner les arguments positifs."
try:
    aire(2, -3)
except ValueError:
    pass
else:
    assert False, "aire(2, -3) doit lever ValueError avec le décorateur positifs."
assert saluer.appels == 2, "Dans ton programme, saluer est appelée deux fois."
`,
      solution: `def compter_appels(fonction):
    def enveloppe(*args, **kwargs):
        enveloppe.appels += 1
        return fonction(*args, **kwargs)
    enveloppe.appels = 0
    return enveloppe

def positifs(fonction):
    def enveloppe(*args, **kwargs):
        for a in args:
            if a < 0:
                raise ValueError("argument négatif")
        return fonction(*args, **kwargs)
    return enveloppe

@compter_appels
def saluer(nom):
    return f"Salut {nom}"

saluer("Ana")
saluer("Bo")
print(saluer.appels)`,
    },
  },
};
