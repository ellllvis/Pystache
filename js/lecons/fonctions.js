// Niveau 2 · Module « Fonctions »
(window.LECONS = window.LECONS || {})["fonctions"] = {
  def: {
    body: `
<p>Une <b>fonction</b> est un bloc de code auquel on donne un nom, pour pouvoir le lancer autant de fois qu'on veut. Tu en utilises déjà : <code>print()</code>, <code>len()</code>, <code>input()</code>… Maintenant, tu vas créer les tiennes.</p>
<pre>def saluer():
    print("Bonjour !")
    print("Bienvenue dans le programme.")

saluer()
saluer()</pre>
<ul>
  <li><code>def</code> annonce une définition de fonction, suivie du nom, de parenthèses et de deux-points.</li>
  <li>Le corps de la fonction est indenté, comme pour un <code>if</code>.</li>
  <li><b>Définir</b> une fonction ne l'exécute pas. Il faut l'<b>appeler</b> en écrivant son nom suivi de parenthèses.</li>
</ul>
<h2>Pourquoi c'est utile</h2>
<p>Une fonction évite de copier-coller du code. Si on doit changer quelque chose, on le change à un seul endroit. Et un bon nom de fonction rend le programme plus facile à lire.</p>`,
    starter: `def saluer():
    print("Bonjour !")
    print("Bienvenue dans le programme.")

saluer()
print("---")
saluer()`,
    quiz: [
      { q: "Que se passe-t-il quand Python lit <code>def f():</code> suivi de son bloc ?", choices: ["Il exécute le bloc", "Il mémorise la fonction sans l'exécuter", "Il affiche le nom de la fonction"], answer: 1,
        explain: "Le bloc ne s'exécute qu'au moment où on appelle f()." },
      { q: "Comment appelle-t-on la fonction <code>dessiner</code> ?", choices: ["<code>dessiner</code>", "<code>dessiner()</code>", "<code>def dessiner()</code>"], answer: 1,
        explain: "Les parenthèses déclenchent l'appel." },
    ],
    exercise: {
      task: `<p>Crée une fonction <code>separateur()</code> qui affiche une ligne de 20 tirets <code>--------------------</code>.</p>
<p>Puis appelle-la <b>deux fois</b> : avant et après la ligne <code>Menu du jour</code>.</p>`,
      starter: `# Définis la fonction separateur ici

print("Menu du jour")
`,
      check: `
assert "def separateur" in code_eleve, "Définis la fonction avec def separateur():"
assert callable(separateur), "separateur doit être une fonction."
assert lignes == ["-" * 20, "Menu du jour", "-" * 20], "Le programme doit afficher : 20 tirets, Menu du jour, puis 20 tirets."
assert code_eleve.count("separateur()") >= 2, "Appelle separateur() deux fois."
`,
      solution: `def separateur():
    print("-" * 20)

separateur()
print("Menu du jour")
separateur()`,
    },
  },

  parametres: {
    body: `
<p>Une fonction devient beaucoup plus utile quand on peut lui donner des informations. Ce sont ses <b>paramètres</b>, écrits entre les parenthèses de <code>def</code> :</p>
<pre>def saluer(prenom):
    print(f"Bonjour {prenom} !")

saluer("Awa")     # Bonjour Awa !
saluer("Tom")     # Bonjour Tom !</pre>
<p>Au moment de l'appel, la valeur donnée (on l'appelle l'<b>argument</b>) est rangée dans le paramètre <code>prenom</code>, qui s'utilise comme une variable dans le corps de la fonction.</p>
<h2>Plusieurs paramètres</h2>
<p>On les sépare par des virgules. Les arguments sont associés dans l'ordre :</p>
<pre>def presenter(prenom, ville):
    print(f"{prenom} habite à {ville}")

presenter("Awa", "Dakar")</pre>`,
    starter: `def saluer(prenom):
    print(f"Bonjour {prenom} !")

saluer("Awa")
saluer("Tom")

def presenter(prenom, ville):
    print(f"{prenom} habite à {ville}")

presenter("Awa", "Dakar")
presenter("Dakar", "Awa")  # l'ordre compte !`,
    quiz: [
      { q: "Dans <code>def aire(l, h):</code>, que sont <code>l</code> et <code>h</code> ?", choices: ["Des paramètres", "Des fonctions", "Des modules"], answer: 0,
        explain: "Ce sont les paramètres : ils recevront les valeurs données à l'appel." },
      { q: "Avec <code>def f(a, b): print(a - b)</code>, qu'affiche <code>f(10, 3)</code> ?", choices: ["7", "-7", "13"], answer: 0,
        explain: "Les arguments sont associés dans l'ordre : a = 10, b = 3." },
    ],
    exercise: {
      task: `<p>Crée une fonction <code>cadre(texte)</code> qui affiche le texte encadré d'étoiles, comme ceci pour <code>cadre("Salut")</code> :</p>
<pre>*********
* Salut *
*********</pre>
<p>La largeur doit s'adapter au texte (longueur du texte + 4). Appelle-la avec <code>"Salut"</code>.</p>`,
      starter: `# Définis cadre(texte)

`,
      check: `
import io, contextlib
assert "def cadre" in code_eleve, "Définis la fonction cadre(texte)."
for mot in ["Salut", "Python est génial"]:
    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        cadre(mot)
    l = buf.getvalue().strip().split("\\n")
    assert l == ["*" * (len(mot) + 4), f"* {mot} *", "*" * (len(mot) + 4)], f"cadre({mot!r}) ne donne pas le bon dessin. La ligne d'étoiles doit faire len(texte) + 4 caractères."
`,
      solution: `def cadre(texte):
    bord = "*" * (len(texte) + 4)
    print(bord)
    print(f"* {texte} *")
    print(bord)

cadre("Salut")`,
    },
  },

  return: {
    body: `
<p>Jusqu'ici, nos fonctions affichaient. Mais souvent, on veut qu'une fonction <b>calcule</b> un résultat et le donne au reste du programme. C'est le rôle de <code>return</code> :</p>
<pre>def carre(n):
    return n * n

x = carre(5)           # x vaut 25
print(carre(3) + 1)    # 10</pre>
<p>L'appel <code>carre(5)</code> est remplacé par la valeur renvoyée. On peut la ranger dans une variable, l'afficher ou l'utiliser dans un calcul.</p>
<h2>return arrête la fonction</h2>
<p>Dès que Python rencontre <code>return</code>, il sort de la fonction. Ça permet d'écrire des fonctions avec plusieurs cas :</p>
<pre>def signe(n):
    if n > 0:
        return "positif"
    if n < 0:
        return "négatif"
    return "nul"</pre>
<p class="note">print affiche pour l'humain, return renvoie pour le programme. Une fonction sans return renvoie <code>None</code>.</p>`,
    starter: `def carre(n):
    return n * n

x = carre(5)
print(x)
print(carre(3) + 1)

def signe(n):
    if n > 0:
        return "positif"
    if n < 0:
        return "négatif"
    return "nul"

print(signe(-4), signe(0), signe(7))`,
    quiz: [
      { q: "Avec <code>def f(x): return x + 1</code>, que vaut <code>f(f(1))</code> ?", choices: ["2", "3", "Une erreur"], answer: 1,
        explain: "f(1) vaut 2, puis f(2) vaut 3." },
      { q: "Que renvoie une fonction qui n'a pas de <code>return</code> ?", choices: ["0", "Une chaîne vide", "None"], answer: 2,
        explain: "None représente l'absence de valeur." },
    ],
    exercise: {
      task: `<p>Écris une fonction <code>prix_solde(prix, remise)</code> qui <b>renvoie</b> le prix après une remise en pourcentage, arrondi à 2 chiffres. Par exemple <code>prix_solde(80, 25)</code> renvoie <code>60.0</code>.</p>
<p>La fonction ne doit rien afficher elle-même.</p>`,
      starter: `def prix_solde(prix, remise):
    pass  # remplace cette ligne

print(prix_solde(80, 25))
`,
      check: `
assert prix_solde(80, 25) == 60, "prix_solde(80, 25) doit renvoyer 60.0. Formule : prix * (1 - remise / 100)."
assert prix_solde(19.99, 10) == 17.99, "prix_solde(19.99, 10) doit renvoyer 17.99 (pense à arrondir avec round(..., 2))."
assert prix_solde(50, 0) == 50, "Sans remise, le prix ne change pas."
assert "return" in code_eleve, "Utilise return pour renvoyer le résultat."
`,
      solution: `def prix_solde(prix, remise):
    return round(prix * (1 - remise / 100), 2)

print(prix_solde(80, 25))`,
    },
  },

  defauts: {
    body: `
<p>Un paramètre peut avoir une <b>valeur par défaut</b>, utilisée quand on ne donne pas d'argument :</p>
<pre>def saluer(prenom, salutation="Bonjour"):
    print(f"{salutation} {prenom} !")

saluer("Lina")              # Bonjour Lina !
saluer("Lina", "Coucou")    # Coucou Lina !</pre>
<p>Les paramètres avec une valeur par défaut se placent toujours <b>après</b> ceux qui n'en ont pas.</p>
<h2>Les arguments nommés</h2>
<p>À l'appel, on peut préciser le nom du paramètre. L'ordre n'a alors plus d'importance, et le code devient plus lisible :</p>
<pre>def commande(plat, quantite=1, a_emporter=False):
    ...

commande("pizza", a_emporter=True)
commande(quantite=3, plat="tacos")</pre>
<p>Tu l'as déjà vu : dans <code>print("a", end="")</code>, <code>end</code> est un argument nommé.</p>`,
    starter: `def saluer(prenom, salutation="Bonjour"):
    print(f"{salutation} {prenom} !")

saluer("Lina")
saluer("Lina", "Coucou")
saluer(salutation="Salut", prenom="Yanis")`,
    quiz: [
      { q: "Avec <code>def f(a, b=2): return a * b</code>, que vaut <code>f(5)</code> ?", choices: ["5", "10", "Une erreur"], answer: 1,
        explain: "b prend sa valeur par défaut, 2." },
      { q: "Quelle définition est <b>invalide</b> ?", choices: ["<code>def f(a, b=1):</code>", "<code>def f(a=1, b):</code>", "<code>def f(a=1, b=2):</code>"], answer: 1,
        explain: "Un paramètre sans valeur par défaut ne peut pas venir après un paramètre qui en a une." },
    ],
    exercise: {
      task: `<p>Écris <code>formater_prix(montant, devise="€", decimales=2)</code> qui <b>renvoie</b> une chaîne comme <code>"12.50 €"</code>.</p>
<ul><li><code>formater_prix(12.5)</code> renvoie <code>"12.50 €"</code></li>
<li><code>formater_prix(12.5, "$")</code> renvoie <code>"12.50 $"</code></li>
<li><code>formater_prix(1999, decimales=0)</code> renvoie <code>"1999 €"</code></li></ul>
<p class="note">Astuce : dans une f-string, on peut écrire <code>{montant:.{decimales}f}</code>.</p>`,
      starter: `def formater_prix(montant, devise="€", decimales=2):
    pass  # remplace cette ligne

print(formater_prix(12.5))
`,
      check: `
assert formater_prix(12.5) == "12.50 €", 'formater_prix(12.5) doit renvoyer "12.50 €".'
assert formater_prix(12.5, "$") == "12.50 $", 'formater_prix(12.5, "$") doit renvoyer "12.50 $".'
assert formater_prix(1999, decimales=0) == "1999 €", 'formater_prix(1999, decimales=0) doit renvoyer "1999 €".'
assert formater_prix(3.14159, decimales=3) == "3.142 €", 'formater_prix(3.14159, decimales=3) doit renvoyer "3.142 €".'
`,
      solution: `def formater_prix(montant, devise="€", decimales=2):
    return f"{montant:.{decimales}f} {devise}"

print(formater_prix(12.5))
print(formater_prix(12.5, "$"))
print(formater_prix(1999, decimales=0))`,
    },
  },

  portee: {
    body: `
<p>Une variable créée <b>dans</b> une fonction est <b>locale</b> : elle n'existe que pendant l'exécution de la fonction, et le reste du programme ne la voit pas.</p>
<pre>def calcul():
    resultat = 42      # variable locale
    return resultat

calcul()
print(resultat)        # NameError : resultat n'existe pas ici</pre>
<p>À l'inverse, une variable créée en dehors de toute fonction est <b>globale</b> : les fonctions peuvent la lire.</p>
<pre>taux = 0.2
def tva(prix):
    return prix * taux    # lit la variable globale</pre>
<h2>La bonne pratique</h2>
<p>Pour qu'une fonction fasse sortir une valeur, on utilise <code>return</code>. Pour qu'elle reçoive une valeur, on utilise un paramètre. Une fonction qui ne dépend que de ses paramètres est plus facile à comprendre et à tester.</p>
<p class="note">Le mot-clé <code>global</code> permet de modifier une variable globale depuis une fonction, mais on l'évite : il rend le code difficile à suivre.</p>`,
    starter: `taux = 0.2

def tva(prix):
    montant = prix * taux
    return montant

print(tva(50))
print(taux)
# print(montant)  # enlève le # pour voir l'erreur`,
    quiz: [
      { q: "Une variable créée dans une fonction est-elle visible après l'appel ?", choices: ["Oui, toujours", "Non, elle est locale à la fonction", "Seulement si on l'affiche"], answer: 1,
        explain: "Les variables locales disparaissent à la fin de l'appel." },
      { q: "Quelle est la meilleure façon de récupérer un résultat calculé dans une fonction ?", choices: ["Utiliser global", "Utiliser return", "L'afficher avec print"], answer: 1,
        explain: "return renvoie la valeur au code qui a appelé la fonction." },
    ],
    exercise: {
      task: `<p>Ce programme utilise <code>global</code> pour compter des points. Réécris <code>ajouter_points</code> pour qu'elle <b>n'utilise plus global</b> : elle reçoit le score actuel et les points en paramètres, et renvoie le nouveau score.</p>
<p>Le programme doit toujours afficher <code>Score final : 35</code>.</p>`,
      starter: `score = 0

def ajouter_points(points):
    global score
    score = score + points

ajouter_points(10)
ajouter_points(25)
print("Score final :", score)`,
      check: `
assert "global" not in code_eleve, "Supprime le mot-clé global."
assert ajouter_points(5, 3) == 8, "ajouter_points(score, points) doit renvoyer score + points."
assert "Score final : 35" in sortie, "Le programme doit toujours afficher Score final : 35."
`,
      solution: `score = 0

def ajouter_points(score, points):
    return score + points

score = ajouter_points(score, 10)
score = ajouter_points(score, 25)
print("Score final :", score)`,
    },
  },

  "projet-convertisseur": {
    body: `
<p>On construit un convertisseur d'unités bien organisé : une petite fonction par conversion, et un programme principal qui pose les questions.</p>
<pre>def celsius_vers_fahrenheit(c):
    return c * 9 / 5 + 32

def km_vers_miles(km):
    return km / 1.609</pre>
<p>Chaque fonction fait <b>une seule chose</b> et la fait bien. Elle renvoie un nombre au lieu de l'afficher. Le programme principal s'occupe de l'affichage. Ce découpage rend chaque morceau facile à tester séparément.</p>`,
    quiz: [
      { q: "Pourquoi les fonctions de conversion renvoient-elles un nombre au lieu de l'afficher ?", choices: ["C'est plus rapide", "Pour pouvoir réutiliser le résultat (calculs, tests, autre affichage)", "print ne marche pas dans une fonction"], answer: 1,
        explain: "Une valeur renvoyée peut servir à n'importe quoi, un affichage non." },
    ],
    exercise: {
      task: `<p>Écris trois fonctions qui renvoient le résultat <b>arrondi à 1 chiffre</b> :</p>
<ul><li><code>c_vers_f(c)</code> : Celsius vers Fahrenheit (c × 9 / 5 + 32) ;</li>
<li><code>f_vers_c(f)</code> : Fahrenheit vers Celsius ((f − 32) × 5 / 9) ;</li>
<li><code>km_vers_miles(km)</code> : km / 1.609.</li></ul>
<p>Puis un programme principal qui lit un choix (<code>1</code>, <code>2</code> ou <code>3</code>) et une valeur, et affiche le résultat, par exemple <code>Résultat : 77.0</code>.</p>`,
      starter: `# Tes trois fonctions ici


choix = input("1: °C→°F  2: °F→°C  3: km→miles ? ")
valeur = float(input("Valeur ? "))
# À FAIRE : appeler la bonne fonction et afficher le résultat
`,
      stdin: "1\n25",
      check: `
assert c_vers_f(25) == 77.0 and c_vers_f(-40) == -40.0, "c_vers_f est incorrecte (25 °C = 77.0 °F)."
assert f_vers_c(212) == 100.0 and f_vers_c(50) == 10.0, "f_vers_c est incorrecte (212 °F = 100.0 °C)."
assert km_vers_miles(42.195) == 26.2, "km_vers_miles(42.195) doit renvoyer 26.2."
assert "Résultat : 77.0" in sortie, "Avec le choix 1 et la valeur 25, affiche : Résultat : 77.0"
`,
      solution: `def c_vers_f(c):
    return round(c * 9 / 5 + 32, 1)

def f_vers_c(f):
    return round((f - 32) * 5 / 9, 1)

def km_vers_miles(km):
    return round(km / 1.609, 1)


choix = input("1: °C→°F  2: °F→°C  3: km→miles ? ")
valeur = float(input("Valeur ? "))
if choix == "1":
    print("Résultat :", c_vers_f(valeur))
elif choix == "2":
    print("Résultat :", f_vers_c(valeur))
elif choix == "3":
    print("Résultat :", km_vers_miles(valeur))
else:
    print("Choix inconnu")`,
    },
  },
};
