// Niveau 3 · Module « Écrire du code de qualité »
(window.LECONS = window.LECONS || {})["qualite"] = {
  style: {
    body: `
<p>Un programme est lu bien plus souvent qu'il n'est écrit. La communauté Python s'est donc mise d'accord sur un guide de style, la <b>PEP 8</b>. Les règles essentielles :</p>
<ul>
  <li><b>Indentation</b> de 4 espaces.</li>
  <li><b>Noms</b> : <code>snake_case</code> pour les variables et fonctions (<code>prix_total</code>), <code>CamelCase</code> pour les classes (<code>CompteBancaire</code>), <code>MAJUSCULES</code> pour les constantes (<code>TAUX_TVA = 0.2</code>).</li>
  <li><b>Espaces</b> autour des opérateurs (<code>a = b + 1</code>) et après les virgules, mais pas à l'intérieur des parenthèses.</li>
  <li><b>Lignes</b> courtes, environ 80 caractères maximum.</li>
  <li><b>Lignes vides</b> : deux entre les fonctions et classes de premier niveau.</li>
  <li><b>Imports</b> en haut du fichier, un par ligne.</li>
</ul>
<pre># Avant
def CalculPrix(P,q,Remise=0) :
  return P*q*(1-Remise)

# Après
TAUX_TVA = 0.2


def calculer_prix(prix, quantite, remise=0):
    return prix * quantite * (1 - remise)</pre>
<p class="note">Des outils comme <code>black</code> ou <code>ruff</code> appliquent ces règles automatiquement sur ton ordinateur.</p>`,
    starter: `import this`,
    quiz: [
      { q: "Selon la PEP 8, quel nom convient à une fonction ?", choices: ["<code>CalculerTotal</code>", "<code>calculer_total</code>", "<code>calculerTotal</code>"], answer: 1,
        explain: "Les fonctions et variables s'écrivent en snake_case." },
      { q: "Et pour une constante ?", choices: ["<code>vitesse_max</code>", "<code>VitesseMax</code>", "<code>VITESSE_MAX</code>"], answer: 2,
        explain: "Les constantes s'écrivent en majuscules." },
    ],
    exercise: {
      task: `<p>Ce code fonctionne, mais il est difficile à lire. Réécris-le en respectant la PEP 8 :</p>
<ul><li>la fonction s'appelle <code>calculer_moyenne</code> et son paramètre <code>notes</code> ;</li>
<li>la constante s'appelle <code>NOTE_MAX</code> ;</li>
<li>indentation de 4 espaces, espaces autour des opérateurs ;</li>
<li>le résultat affiché reste le même.</li></ul>`,
      starter: `notemax=20
def CalculMoyenne(L):
  s=0
  for x in L:s=s+x
  return round(s/len(L)/notemax*20,2)
print(CalculMoyenne([12,15,9]))`,
      check: `
import ast
assert calculer_moyenne([12, 15, 9]) == 12.0, "calculer_moyenne([12, 15, 9]) doit toujours renvoyer 12.0."
assert NOTE_MAX == 20, "Renomme la constante en NOTE_MAX."
assert "CalculMoyenne" not in code_eleve and "notemax" not in code_eleve, "Il reste d'anciens noms (CalculMoyenne, notemax)."
arbre = ast.parse(code_eleve)
f = [n for n in arbre.body if isinstance(n, ast.FunctionDef)][0]
assert [a.arg for a in f.args.args] == ["notes"], "Le paramètre doit s'appeler notes."
for l in code_eleve.split("\\n"):
    retrait = len(l) - len(l.lstrip(" "))
    assert retrait % 4 == 0, f"Indentation incorrecte sur la ligne : {l.strip()} (utilise des multiples de 4 espaces)."
    assert not (l.strip().startswith("for ") and ":" in l and not l.rstrip().endswith(":")), "Mets le corps de la boucle for sur sa propre ligne."
assert "s=s" not in code_eleve.replace(" = ", "=") or " = " in code_eleve, "Mets des espaces autour de =."
assert "12.0" in sortie, "Le programme doit toujours afficher 12.0."
`,
      solution: `NOTE_MAX = 20


def calculer_moyenne(notes):
    somme = 0
    for note in notes:
        somme = somme + note
    return round(somme / len(notes) / NOTE_MAX * 20, 2)


print(calculer_moyenne([12, 15, 9]))`,
    },
  },

  docstrings: {
    body: `
<p>Une <b>docstring</b> est une chaîne placée juste sous la ligne <code>def</code> (ou <code>class</code>), entre triples guillemets. Elle explique ce que fait la fonction, ce qu'elle attend et ce qu'elle renvoie.</p>
<pre>def convertir(montant, taux):
    """Convertit un montant d'une devise vers une autre.

    montant : la somme à convertir.
    taux : la valeur d'une unité de départ dans la devise d'arrivée.
    Renvoie le montant converti, arrondi au centime.
    """
    return round(montant * taux, 2)</pre>
<p>Contrairement à un commentaire, une docstring est conservée par Python : <code>help(convertir)</code> l'affiche, tout comme les éditeurs de code au survol de la fonction.</p>
<h2>Bonnes pratiques</h2>
<ul>
  <li>Une première ligne courte qui résume, à l'impératif ou au présent.</li>
  <li>Ensuite, si utile : les paramètres, la valeur renvoyée, les erreurs levées.</li>
  <li>On documente <b>quoi</b> et <b>pourquoi</b>, pas <b>comment</b> : le code le montre déjà.</li>
</ul>`,
    starter: `def convertir(montant, taux):
    """Convertit un montant d'une devise vers une autre.

    montant : la somme à convertir.
    taux : la valeur d'une unité de départ dans la devise d'arrivée.
    Renvoie le montant converti, arrondi au centime.
    """
    return round(montant * taux, 2)

print(convertir.__doc__)
help(convertir)`,
    quiz: [
      { q: "Où place-t-on la docstring d'une fonction ?", choices: ["Juste au-dessus du def", "Juste sous la ligne def", "À la fin de la fonction"], answer: 1,
        explain: "C'est la première instruction du corps de la fonction." },
      { q: "Quelle différence avec un commentaire <code>#</code> ?", choices: ["Aucune", "La docstring est conservée et consultable avec help()", "Le commentaire est plus rapide"], answer: 1,
        explain: "Python garde la docstring dans l'attribut __doc__." },
    ],
    exercise: {
      task: `<p>Ajoute une docstring à chacune des deux fonctions et à la classe. Chaque docstring doit faire au moins une phrase (une vingtaine de caractères). Ne change pas le code.</p>`,
      starter: `class Thermostat:
    def __init__(self, consigne=20):
        self.consigne = consigne

    def ajuster(self, delta):
        self.consigne = max(5, min(30, self.consigne + delta))
        return self.consigne


def en_fahrenheit(celsius):
    return celsius * 9 / 5 + 32`,
      check: `
for nom, obj in [("Thermostat", Thermostat), ("ajuster", Thermostat.ajuster), ("en_fahrenheit", en_fahrenheit)]:
    assert obj.__doc__ and len(obj.__doc__.strip()) >= 20, f"Ajoute une docstring d'au moins une phrase à {nom}."
t = Thermostat()
assert t.ajuster(15) == 30 and t.ajuster(-40) == 5 and en_fahrenheit(100) == 212, "Le comportement du code ne doit pas changer."
`,
      solution: `class Thermostat:
    """Garde une température de consigne entre 5 et 30 °C."""

    def __init__(self, consigne=20):
        self.consigne = consigne

    def ajuster(self, delta):
        """Modifie la consigne de delta degrés et renvoie la nouvelle valeur.

        La consigne reste toujours entre 5 et 30 °C.
        """
        self.consigne = max(5, min(30, self.consigne + delta))
        return self.consigne


def en_fahrenheit(celsius):
    """Convertit une température de degrés Celsius en degrés Fahrenheit."""
    return celsius * 9 / 5 + 32`,
    },
  },

  typage: {
    body: `
<p>Python ne t'oblige pas à déclarer les types. Mais tu peux les <b>annoter</b>, pour documenter ce qu'une fonction attend et renvoie :</p>
<pre>def prix_ttc(prix_ht: float, taux: float = 0.2) -> float:
    return round(prix_ht * (1 + taux), 2)

noms: list[str] = ["Ana", "Bo"]
stock: dict[str, int] = {"stylo": 12}</pre>
<ul>
  <li><code>param: type</code> annote un paramètre, <code>-> type</code> la valeur renvoyée ;</li>
  <li><code>list[str]</code>, <code>dict[str, int]</code>, <code>tuple[int, int]</code> précisent le contenu ;</li>
  <li><code>str | None</code> : une chaîne ou <code>None</code> ;</li>
</ul>
<h2>Python ne vérifie pas</h2>
<p>À l'exécution, les annotations sont ignorées : <code>prix_ttc("dix")</code> plantera dans le calcul, pas à cause de l'annotation. Ce sont des outils comme <code>mypy</code> ou ton éditeur qui les vérifient et signalent les erreurs <b>avant</b> que tu lances le programme.</p>
<p class="note">Les annotations rendent le code plus clair et permettent à l'éditeur de mieux te proposer des complétions.</p>`,
    starter: `def prix_ttc(prix_ht: float, taux: float = 0.2) -> float:
    return round(prix_ht * (1 + taux), 2)

def trouver(noms: list[str], cible: str) -> int | None:
    for i, n in enumerate(noms):
        if n == cible:
            return i
    return None

print(prix_ttc(10))
print(trouver(["Ana", "Bo"], "Bo"), trouver(["Ana"], "Zed"))
print(prix_ttc.__annotations__)`,
    quiz: [
      { q: "Que se passe-t-il si on passe une chaîne à un paramètre annoté <code>int</code> ?", choices: ["Python lève une erreur de type immédiatement", "Rien de spécial : Python n'utilise pas les annotations à l'exécution", "La chaîne est convertie en int"], answer: 1,
        explain: "Les annotations servent aux outils de vérification et aux humains." },
      { q: "Comment annoter « une liste d'entiers » ?", choices: ["<code>list(int)</code>", "<code>list[int]</code>", "<code>[int]</code>"], answer: 1,
        explain: "On utilise des crochets après le type du conteneur." },
    ],
    exercise: {
      task: `<p>Ajoute des annotations de type complètes (tous les paramètres <b>et</b> la valeur de retour) aux trois fonctions :</p>
<ul><li><code>moyenne</code> reçoit une liste de nombres décimaux et renvoie un décimal ;</li>
<li><code>initiales</code> reçoit une chaîne et renvoie une chaîne ;</li>
<li><code>chercher_age</code> reçoit un dictionnaire nom → âge et un nom, et renvoie un entier ou <code>None</code>.</li></ul>`,
      starter: `def moyenne(valeurs):
    return sum(valeurs) / len(valeurs)


def initiales(nom_complet):
    return "".join(m[0].upper() for m in nom_complet.split())


def chercher_age(ages, nom):
    return ages.get(nom)`,
      check: `
import typing
def ok(f, attendu):
    a = typing.get_type_hints(f)
    return {k: str(v).replace("typing.", "") for k, v in a.items()} == attendu
assert ok(moyenne, {"valeurs": "list[float]", "return": "<class 'float'>"}), "Annote moyenne : valeurs: list[float] et -> float"
assert ok(initiales, {"nom_complet": "<class 'str'>", "return": "<class 'str'>"}), "Annote initiales : nom_complet: str et -> str"
h = typing.get_type_hints(chercher_age)
assert str(h.get("ages")) == "dict[str, int]" and h.get("nom") is str, "Annote chercher_age : ages: dict[str, int], nom: str"
assert set(typing.get_args(h.get("return"))) == {int, type(None)}, "chercher_age renvoie int | None"
`,
      solution: `def moyenne(valeurs: list[float]) -> float:
    return sum(valeurs) / len(valeurs)


def initiales(nom_complet: str) -> str:
    return "".join(m[0].upper() for m in nom_complet.split())


def chercher_age(ages: dict[str, int], nom: str) -> int | None:
    return ages.get(nom)`,
    },
  },

  dataclasses: {
    body: `
<p>Beaucoup de classes servent surtout à <b>regrouper des données</b>. Écrire leur <code>__init__</code>, leur <code>__repr__</code> et leur <code>__eq__</code> à la main est répétitif. Le décorateur <code>@dataclass</code> les génère pour toi à partir des annotations :</p>
<pre>from dataclasses import dataclass, field

@dataclass
class Livre:
    titre: str
    auteur: str
    pages: int = 0
    tags: list[str] = field(default_factory=list)

l = Livre("Dune", "Herbert", 600)
print(l)                    # Livre(titre='Dune', auteur='Herbert', pages=600, tags=[])
print(l == Livre("Dune", "Herbert", 600))   # True</pre>
<ul>
  <li>Chaque attribut annoté devient un paramètre du constructeur, dans l'ordre.</li>
  <li>Une valeur par défaut s'écrit avec <code>=</code>. Pour une liste ou un dictionnaire, on utilise <code>field(default_factory=list)</code>, sinon tous les objets partageraient la même liste.</li>
  <li>On peut ajouter des méthodes normalement.</li>
  <li><code>@dataclass(order=True)</code> rend les objets comparables et triables ; <code>frozen=True</code> les rend non modifiables.</li>
</ul>`,
    starter: `from dataclasses import dataclass, field

@dataclass
class Livre:
    titre: str
    auteur: str
    pages: int = 0
    tags: list[str] = field(default_factory=list)

    def est_long(self) -> bool:
        return self.pages > 400

l = Livre("Dune", "Herbert", 600)
print(l)
print(l == Livre("Dune", "Herbert", 600), l.est_long())
l.tags.append("SF")
print(Livre("Coco", "Pixar").tags)`,
    quiz: [
      { q: "Que génère <code>@dataclass</code> automatiquement ?", choices: ["Seulement __init__", "__init__, __repr__ et __eq__", "Rien, c'est un commentaire"], answer: 1,
        explain: "Ce sont les trois méthodes générées par défaut." },
      { q: "Pourquoi écrire <code>field(default_factory=list)</code> plutôt que <code>= []</code> ?", choices: ["C'est plus court", "Pour que chaque objet ait sa propre liste", "Pour trier la liste"], answer: 1,
        explain: "Une liste unique partagée entre tous les objets serait un bug sournois." },
    ],
    exercise: {
      task: `<p>Crée une dataclass <code>Tache</code> avec :</p>
<ul><li><code>titre: str</code>, <code>priorite: int = 2</code>, <code>faite: bool = False</code> ;</li>
<li>une méthode <code>terminer()</code> qui passe <code>faite</code> à <code>True</code>.</li></ul>
<p>Puis crée la liste <code>taches</code> de trois tâches, et <code>urgentes</code> : les titres des tâches de priorité 1 non faites.</p>`,
      starter: `from dataclasses import dataclass

`,
      check: `
from dataclasses import is_dataclass
assert is_dataclass(Tache), "Tache doit être décorée avec @dataclass."
t = Tache("Test")
assert (t.titre, t.priorite, t.faite) == ("Test", 2, False), "Les valeurs par défaut doivent être priorite=2 et faite=False."
assert Tache("A", 1) == Tache("A", 1), "Deux tâches identiques doivent être égales (c'est automatique avec @dataclass)."
t.terminer()
assert t.faite is True, "terminer() doit passer faite à True."
assert isinstance(taches, list) and len(taches) == 3 and all(isinstance(x, Tache) for x in taches), "taches doit contenir trois objets Tache."
assert urgentes == [x.titre for x in taches if x.priorite == 1 and not x.faite], "urgentes doit contenir les titres des tâches de priorité 1 non faites."
`,
      solution: `from dataclasses import dataclass


@dataclass
class Tache:
    titre: str
    priorite: int = 2
    faite: bool = False

    def terminer(self):
        self.faite = True


taches = [Tache("Réviser", 1), Tache("Courses"), Tache("Rapport", 1)]
taches[0].terminer()
urgentes = [t.titre for t in taches if t.priorite == 1 and not t.faite]
print(urgentes)`,
    },
  },

  tests: {
    body: `
<p>Comment être sûr qu'un programme marche, et qu'il marche toujours après une modification ? En écrivant des <b>tests</b> : du code qui vérifie ton code.</p>
<p>La brique de base est <code>assert</code> : si la condition est fausse, Python lève une <code>AssertionError</code>.</p>
<pre>def est_pair(n):
    return n % 2 == 0

assert est_pair(4)
assert not est_pair(7)
assert est_pair(0), "0 est pair"</pre>
<h2>Bien tester</h2>
<ul>
  <li>Un cas normal, puis les <b>cas limites</b> : 0, liste vide, valeur négative, très grande valeur…</li>
  <li>Les cas d'<b>erreur</b> : la fonction lève-t-elle bien l'exception prévue ?</li>
  <li>Une fonction de test par comportement, avec un nom clair : <code>test_moyenne_liste_vide</code>.</li>
</ul>
<p>Sur ton ordinateur, l'outil <code>pytest</code> trouve et lance automatiquement toutes les fonctions dont le nom commence par <code>test_</code>.</p>
<p class="note">Les exercices de cette appli sont corrigés exactement comme ça : par une série d'<code>assert</code> sur ton code.</p>`,
    starter: `def est_pair(n):
    return n % 2 == 0

def test_est_pair():
    assert est_pair(4)
    assert not est_pair(7)
    assert est_pair(0)
    assert est_pair(-2)

test_est_pair()
print("Tous les tests passent")

assert est_pair(3), "3 devrait être pair ?"`,
    demoError: true,
    quiz: [
      { q: "Que se passe-t-il quand la condition d'un <code>assert</code> est vraie ?", choices: ["Rien, le programme continue", "Il affiche OK", "Il lève une erreur"], answer: 0,
        explain: "assert ne fait rien quand tout va bien." },
      { q: "Pour <code>moyenne(liste)</code>, quel cas limite faut-il absolument tester ?", choices: ["Une liste de 3 nombres", "La liste vide", "Une liste triée"], answer: 1,
        explain: "La liste vide provoque une division par zéro si on ne l'a pas prévue." },
    ],
    exercise: {
      task: `<p>On te donne une fonction <code>remise(total, code)</code>. Écris une fonction <code>test_remise()</code> qui la vérifie avec au moins <b>5 assert</b>, couvrant :</p>
<ul><li>le code <code>"BIENVENUE"</code> (−10 %) ;</li>
<li>le code <code>"VIP"</code> (−20 %, seulement si le total dépasse 100) ;</li>
<li>un code inconnu (pas de remise) ;</li>
<li>un total négatif, qui doit lever <code>ValueError</code>.</li></ul>
<p>Appelle ensuite <code>test_remise()</code>. La correction lancera aussi ton test sur des versions buguées de <code>remise</code> : il doit les détecter.</p>`,
      starter: `def remise(total, code):
    if total < 0:
        raise ValueError("total négatif")
    if code == "BIENVENUE":
        return round(total * 0.9, 2)
    if code == "VIP" and total > 100:
        return round(total * 0.8, 2)
    return total


def test_remise():
    pass


test_remise()
print("Tests réussis")
`,
      check: `
import ast
f = [n for n in ast.walk(ast.parse(code_eleve)) if isinstance(n, ast.FunctionDef) and n.name == "test_remise"]
assert f and sum(isinstance(n, ast.Assert) for n in ast.walk(f[0])) >= 5, "test_remise doit contenir au moins 5 assert."
bonne = remise
def bug1(total, code):
    if total < 0: raise ValueError()
    if code == "BIENVENUE": return round(total * 0.9, 2)
    if code == "VIP": return round(total * 0.8, 2)
    return total
def bug2(total, code):
    if code == "BIENVENUE": return round(total * 0.9, 2)
    if code == "VIP" and total > 100: return round(total * 0.8, 2)
    return total
def bug3(total, code):
    if total < 0: raise ValueError()
    if code == "BIENVENUE": return round(total * 0.95, 2)
    if code == "VIP" and total > 100: return round(total * 0.8, 2)
    return total
def bug4(total, code):
    if total < 0: raise ValueError()
    if code == "BIENVENUE": return round(total * 0.9, 2)
    if code == "VIP" and total > 100: return round(total * 0.8, 2)
    return 0
detecte = []
for nom_bug, b in [("le code VIP accepté sous 100 €", bug1), ("l'oubli du total négatif", bug2), ("une mauvaise remise BIENVENUE", bug3), ("un code inconnu qui met le total à 0", bug4)]:
    test_remise.__globals__["remise"] = b
    try:
        test_remise()
    except Exception:
        detecte.append(nom_bug)
    else:
        test_remise.__globals__["remise"] = bonne
        assert False, f"Ton test ne détecte pas ce bug : {nom_bug}."
test_remise.__globals__["remise"] = bonne
test_remise()
`,
      solution: `def remise(total, code):
    if total < 0:
        raise ValueError("total négatif")
    if code == "BIENVENUE":
        return round(total * 0.9, 2)
    if code == "VIP" and total > 100:
        return round(total * 0.8, 2)
    return total


def test_remise():
    assert remise(50, "BIENVENUE") == 45
    assert remise(200, "VIP") == 160
    assert remise(80, "VIP") == 80
    assert remise(50, "PROMO") == 50
    try:
        remise(-1, "VIP")
    except ValueError:
        pass
    else:
        assert False, "un total négatif doit lever ValueError"


test_remise()
print("Tests réussis")`,
    },
  },

  "projet-final": {
    body: `
<p>Bravo, tu es arrivé au dernier projet ! On rassemble tout ce que tu as appris dans un vrai petit programme : un <b>gestionnaire de tâches</b>.</p>
<ul>
  <li>une <b>dataclass</b> <code>Tache</code> ;</li>
  <li>une <b>classe</b> <code>Gestionnaire</code> qui contient les tâches et les méthodes pour les manipuler ;</li>
  <li>des <b>exceptions</b> pour les cas invalides ;</li>
  <li>une sauvegarde en <b>JSON</b> ;</li>
  <li>des <b>annotations de type</b> et des <b>docstrings</b>.</li>
</ul>
<p>Pour transformer une dataclass en dictionnaire (et donc en JSON), <code>dataclasses.asdict(objet)</code> fait le travail. Dans l'autre sens, <code>Tache(**dictionnaire)</code> recrée l'objet.</p>
<p class="note">Une fois l'exercice réussi, tu as écrit un programme complet et bien organisé. Copie-le dans le bac à sable pour l'enrichir : dates d'échéance, catégories, recherche…</p>`,
    quiz: [
      { q: 'Avec <code>d = {"titre": "A", "priorite": 1}</code>, que fait <code>Tache(**d)</code> ?', choices: ["Tache(titre=\"A\", priorite=1)", "Tache(d)", "Une erreur"], answer: 0,
        explain: "** étale le dictionnaire en arguments nommés." },
    ],
    exercise: {
      task: `<p>Complète le gestionnaire :</p>
<ul><li><code>ajouter(titre, priorite=2)</code> : crée et renvoie la tâche ; lève <code>ValueError</code> si le titre est vide ou si la priorité n'est pas 1, 2 ou 3 ;</li>
<li><code>terminer(titre)</code> : marque la tâche comme faite ; lève <code>KeyError</code> si elle n'existe pas ;</li>
<li><code>a_faire()</code> : renvoie les tâches non faites, triées par priorité puis par titre ;</li>
<li><code>sauver(nom)</code> et <code>charger(nom)</code> : enregistrent et rechargent toutes les tâches en JSON.</li></ul>`,
      starter: `import json
from dataclasses import dataclass, asdict


@dataclass
class Tache:
    titre: str
    priorite: int = 2
    faite: bool = False


class Gestionnaire:
    """Garde une liste de tâches et permet de les gérer."""

    def __init__(self) -> None:
        self.taches: list[Tache] = []

    def ajouter(self, titre: str, priorite: int = 2) -> Tache:
        pass

    def terminer(self, titre: str) -> None:
        pass

    def a_faire(self) -> list[Tache]:
        pass

    def sauver(self, nom: str) -> None:
        pass

    def charger(self, nom: str) -> None:
        pass


g = Gestionnaire()
g.ajouter("Réviser Python", 1)
g.ajouter("Faire les courses", 3)
g.ajouter("Appeler Sam")
g.terminer("Faire les courses")
for t in g.a_faire():
    print(t.priorite, t.titre)
`,
      check: `
g1 = Gestionnaire()
t = g1.ajouter("B", 1)
assert isinstance(t, Tache) and t.titre == "B" and t.priorite == 1, "ajouter doit créer et renvoyer une Tache."
g1.ajouter("C")
g1.ajouter("A", 1)
g1.ajouter("D", 3)
for args in [("", 1), ("X", 0), ("X", 4)]:
    try:
        g1.ajouter(*args)
    except ValueError:
        pass
    else:
        assert False, f"ajouter{args} doit lever ValueError."
assert len(g1.taches) == 4, "Une tâche refusée ne doit pas être ajoutée."
g1.terminer("C")
try:
    g1.terminer("Inconnue")
except KeyError:
    pass
else:
    assert False, "terminer d'une tâche inconnue doit lever KeyError."
assert [x.titre for x in g1.a_faire()] == ["A", "B", "D"], "a_faire doit renvoyer les tâches non faites, triées par priorité puis par titre."
g1.sauver("taches.json")
assert isinstance(json.load(open("taches.json", encoding="utf-8")), list), "sauver doit écrire une liste JSON."
g2 = Gestionnaire()
g2.charger("taches.json")
assert g2.taches == g1.taches, "charger doit retrouver exactement les mêmes tâches que celles sauvées."
`,
      solution: `import json
from dataclasses import dataclass, asdict


@dataclass
class Tache:
    titre: str
    priorite: int = 2
    faite: bool = False


class Gestionnaire:
    """Garde une liste de tâches et permet de les gérer."""

    def __init__(self) -> None:
        self.taches: list[Tache] = []

    def ajouter(self, titre: str, priorite: int = 2) -> Tache:
        """Crée une tâche et l'ajoute à la liste."""
        if not titre.strip():
            raise ValueError("titre vide")
        if priorite not in (1, 2, 3):
            raise ValueError("priorité invalide")
        tache = Tache(titre, priorite)
        self.taches.append(tache)
        return tache

    def terminer(self, titre: str) -> None:
        """Marque la tâche comme faite."""
        for t in self.taches:
            if t.titre == titre:
                t.faite = True
                return
        raise KeyError(titre)

    def a_faire(self) -> list[Tache]:
        """Renvoie les tâches restantes, les plus prioritaires d'abord."""
        restantes = [t for t in self.taches if not t.faite]
        return sorted(restantes, key=lambda t: (t.priorite, t.titre))

    def sauver(self, nom: str) -> None:
        """Enregistre toutes les tâches dans un fichier JSON."""
        with open(nom, "w", encoding="utf-8") as f:
            json.dump([asdict(t) for t in self.taches], f, ensure_ascii=False)

    def charger(self, nom: str) -> None:
        """Remplace les tâches par celles du fichier JSON."""
        with open(nom, encoding="utf-8") as f:
            self.taches = [Tache(**d) for d in json.load(f)]


g = Gestionnaire()
g.ajouter("Réviser Python", 1)
g.ajouter("Faire les courses", 3)
g.ajouter("Appeler Sam")
g.terminer("Faire les courses")
for t in g.a_faire():
    print(t.priorite, t.titre)`,
    },
  },
};
