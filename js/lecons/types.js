// Niveau 1 · Module « Nombres et textes »
(window.LECONS = window.LECONS || {})["types"] = {
  operations: {
    body: `
<p>Python est une excellente calculatrice. Voici les opérations de base :</p>
<div class="table-wrap"><table>
<tr><th>Signe</th><th>Opération</th><th>Exemple</th><th>Résultat</th></tr>
<tr><td><code>+</code></td><td>addition</td><td><code>7 + 3</code></td><td>10</td></tr>
<tr><td><code>-</code></td><td>soustraction</td><td><code>7 - 3</code></td><td>4</td></tr>
<tr><td><code>*</code></td><td>multiplication</td><td><code>7 * 3</code></td><td>21</td></tr>
<tr><td><code>/</code></td><td>division</td><td><code>7 / 2</code></td><td>3.5</td></tr>
<tr><td><code>**</code></td><td>puissance</td><td><code>2 ** 3</code></td><td>8</td></tr>
</table></div>
<h2>L'ordre des opérations</h2>
<p>Comme en maths, la puissance passe en premier, puis <code>*</code> et <code>/</code>, puis <code>+</code> et <code>-</code>. Les parenthèses permettent de choisir l'ordre :</p>
<pre>print(2 + 3 * 4)     # 14
print((2 + 3) * 4)   # 20</pre>
<p class="note">Dans le doute, mets des parenthèses : elles rendent aussi le calcul plus lisible.</p>`,
    starter: `print(7 + 3)
print(7 / 2)
print(2 ** 10)
print(2 + 3 * 4)
print((2 + 3) * 4)`,
    quiz: [
      { q: "Que vaut <code>10 - 2 * 3</code> ?", choices: ["24", "4", "12"], answer: 1,
        explain: "La multiplication passe avant la soustraction : 2 × 3 = 6, puis 10 − 6 = 4." },
      { q: "Comment écrit-on « 3 au carré » en Python ?", choices: ["<code>3 ^ 2</code>", "<code>3 ** 2</code>", "<code>3²</code>"], answer: 1,
        explain: "La puissance s'écrit avec deux étoiles. Le signe ^ existe mais fait tout autre chose." },
    ],
    exercise: {
      task: `<p>Un rectangle mesure <code>largeur</code> sur <code>longueur</code> mètres.</p>
<ul><li>Calcule son aire dans une variable <code>aire</code> (largeur × longueur).</li>
<li>Calcule son périmètre dans une variable <code>perimetre</code> (2 × (largeur + longueur)).</li>
<li>Affiche les deux.</li></ul>`,
      starter: `largeur = 4
longueur = 7

# Calcule aire et perimetre, puis affiche-les
`,
      check: `
assert aire == largeur * longueur, "aire n'a pas la bonne valeur : c'est largeur × longueur."
assert perimetre == 2 * (largeur + longueur), "perimetre n'a pas la bonne valeur. Pense aux parenthèses : 2 * (largeur + longueur)."
assert str(aire) in sortie and str(perimetre) in sortie, "Les calculs sont bons, il reste à afficher aire et perimetre."
`,
      solution: `largeur = 4
longueur = 7

aire = largeur * longueur
perimetre = 2 * (largeur + longueur)
print("Aire :", aire)
print("Périmètre :", perimetre)`,
    },
  },

  division: {
    body: `
<p>Python a trois façons de diviser :</p>
<ul>
  <li><code>/</code> : la division « normale », qui donne un nombre à virgule. <code>17 / 5</code> donne <code>3.4</code>.</li>
  <li><code>//</code> : la <b>division entière</b>, qui garde seulement la partie entière. <code>17 // 5</code> donne <code>3</code>.</li>
  <li><code>%</code> : le <b>reste</b> (on dit « modulo »). <code>17 % 5</code> donne <code>2</code>, car 17 = 3 × 5 + 2.</li>
</ul>
<h2>À quoi ça sert ?</h2>
<p>Ces deux opérations servent tout le temps :</p>
<pre>minutes = 135
print(minutes // 60, "h", minutes % 60, "min")   # 2 h 15 min

print(14 % 2)   # 0 : 14 est pair
print(15 % 2)   # 1 : 15 est impair</pre>
<p class="note">Un nombre est divisible par un autre quand le reste vaut 0.</p>`,
    starter: `print(17 / 5)
print(17 // 5)
print(17 % 5)

minutes = 135
print(minutes // 60, "h", minutes % 60, "min")`,
    quiz: [
      { q: "Que vaut <code>20 // 6</code> ?", choices: ["3", "3.33", "2"], answer: 0,
        explain: "6 rentre 3 fois dans 20 (3 × 6 = 18). La division entière garde 3." },
      { q: "Que vaut <code>20 % 6</code> ?", choices: ["3", "2", "0"], answer: 1,
        explain: "20 = 3 × 6 + 2 : le reste est 2." },
      { q: "Si <code>n % 2</code> vaut 0, alors <code>n</code> est…", choices: ["pair", "impair", "négatif"], answer: 0,
        explain: "Un nombre pair se divise par 2 sans reste." },
    ],
    exercise: {
      task: `<p>On a 100 œufs à ranger dans des boîtes de 6.</p>
<ul><li>Calcule dans <code>boites</code> le nombre de boîtes <b>pleines</b>.</li>
<li>Calcule dans <code>restants</code> le nombre d'œufs qui restent hors des boîtes.</li>
<li>Affiche les deux.</li></ul>`,
      starter: `oeufs = 100
par_boite = 6

`,
      check: `
assert boites == oeufs // par_boite, "boites n'est pas bon. Utilise la division entière //."
assert restants == oeufs % par_boite, "restants n'est pas bon. Le reste s'obtient avec %."
assert str(boites) in sortie and str(restants) in sortie, "Pense à afficher boites et restants."
assert "16" not in code_eleve, "Laisse Python calculer au lieu d'écrire le résultat."
`,
      solution: `oeufs = 100
par_boite = 6

boites = oeufs // par_boite
restants = oeufs % par_boite
print(boites, "boîtes pleines,", restants, "œufs restants")`,
    },
  },

  decimaux: {
    body: `
<p>Python distingue deux sortes de nombres :</p>
<ul>
  <li>les <b>entiers</b> (type <code>int</code>) : <code>3</code>, <code>-12</code>, <code>2026</code> ;</li>
  <li>les <b>décimaux</b> (type <code>float</code>) : <code>3.5</code>, <code>-0.25</code>, <code>2.0</code>.</li>
</ul>
<p>Attention : en Python, la virgule s'écrit avec un <b>point</b>. <code>3,5</code> ne veut pas dire « trois et demi ».</p>
<h2>Arrondir</h2>
<p><code>round(x, n)</code> arrondit <code>x</code> avec <code>n</code> chiffres après la virgule :</p>
<pre>prix = 19.987
print(round(prix, 2))   # 19.99
print(round(prix))      # 20</pre>
<h2>Une petite surprise</h2>
<p>L'ordinateur stocke les décimaux en binaire, ce qui crée parfois de minuscules écarts :</p>
<pre>print(0.1 + 0.2)   # 0.30000000000000004</pre>
<p class="note">Ce n'est pas un bug de Python : presque tous les langages font pareil. Pour afficher un résultat propre, on arrondit.</p>`,
    starter: `print(7 / 2)
print(type(7), type(3.5))
print(0.1 + 0.2)
print(round(0.1 + 0.2, 2))
print(round(19.987, 2))`,
    quiz: [
      { q: "Comment écrit-on « deux virgule cinq » en Python ?", choices: ["<code>2,5</code>", "<code>2.5</code>", "<code>2 5</code>"], answer: 1,
        explain: "Python utilise le point, comme en anglais." },
      { q: "Que donne <code>round(3.14159, 2)</code> ?", choices: ["3.14", "3.1", "3"], answer: 0,
        explain: "On garde 2 chiffres après la virgule." },
    ],
    exercise: {
      task: `<p>Un article coûte <code>prix_ht</code> euros hors taxes. La TVA est de 20 %.</p>
<ul><li>Calcule le prix TTC dans <code>prix_ttc</code> (prix HT × 1.2), <b>arrondi à 2 chiffres</b> après la virgule.</li>
<li>Affiche-le.</li></ul>`,
      starter: `prix_ht = 15.99

`,
      check: `
assert abs(prix_ttc - prix_ht * 1.2) < 0.01, "prix_ttc doit valoir prix_ht × 1.2."
assert prix_ttc == round(prix_ttc, 2), "Arrondis prix_ttc à 2 chiffres avec round(..., 2)."
assert str(prix_ttc) in sortie, "Affiche prix_ttc avec print()."
`,
      solution: `prix_ht = 15.99

prix_ttc = round(prix_ht * 1.2, 2)
print("Prix TTC :", prix_ttc, "€")`,
    },
  },

  chaines: {
    body: `
<p>Le texte s'appelle une <b>chaîne de caractères</b> (type <code>str</code>). On l'écrit entre guillemets doubles <code>"…"</code> ou simples <code>'…'</code>.</p>
<pre>salut = "Bonjour"
phrase = 'Il a dit "oui"'   # guillemets simples autour, doubles dedans</pre>
<h2>Coller et répéter</h2>
<ul>
  <li><code>+</code> colle deux chaînes : <code>"Py" + "thon"</code> donne <code>"Python"</code>.</li>
  <li><code>*</code> répète : <code>"ha" * 3</code> donne <code>"hahaha"</code>.</li>
</ul>
<h2>Longueur et caractères</h2>
<p><code>len()</code> donne le nombre de caractères. On accède à un caractère par sa position, en commençant à <b>0</b> :</p>
<pre>mot = "Python"
print(len(mot))   # 6
print(mot[0])     # P
print(mot[-1])    # n  (les positions négatives partent de la fin)</pre>`,
    starter: `mot = "Python"
print(len(mot))
print(mot[0], mot[1], mot[-1])
print("Py" + "thon")
print("ha" * 3)
print("-" * 20)`,
    quiz: [
      { q: 'Que vaut <code>"abc"[1]</code> ?', choices: ['"a"', '"b"', '"c"'], answer: 1,
        explain: "Les positions commencent à 0 : a est en 0, b en 1." },
      { q: 'Que vaut <code>len("salut !")</code> ?', choices: ["5", "6", "7"], answer: 2,
        explain: "L'espace et le point d'exclamation comptent aussi : 7 caractères." },
      { q: 'Que donne <code>"=" * 4</code> ?', choices: ['"===="', "Une erreur", '"=4"'], answer: 0,
        explain: "Multiplier une chaîne par un entier la répète." },
    ],
    exercise: {
      task: `<p>À partir de la variable <code>prenom</code> :</p>
<ul><li>crée <code>initiale</code> qui contient la première lettre ;</li>
<li>crée <code>longueur</code> qui contient le nombre de lettres ;</li>
<li>affiche <code>Ton prénom commence par C et compte 7 lettres</code> (avec les bonnes valeurs, calculées).</li></ul>`,
      starter: `prenom = "Camille"

`,
      check: `
assert initiale == prenom[0], "initiale doit contenir la première lettre : prenom[0]."
assert longueur == len(prenom), "longueur doit contenir len(prenom)."
assert "commence par C" in sortie and "7 lettres" in sortie, "Affiche la phrase : Ton prénom commence par C et compte 7 lettres"
`,
      solution: `prenom = "Camille"

initiale = prenom[0]
longueur = len(prenom)
print("Ton prénom commence par", initiale, "et compte", longueur, "lettres")`,
    },
  },

  fstrings: {
    body: `
<p>Pour fabriquer une phrase avec des valeurs dedans, la façon la plus pratique est la <b>f-string</b> : on met un <code>f</code> devant les guillemets, et des variables entre accolades <code>{ }</code>.</p>
<pre>nom = "Inès"
age = 28
print(f"{nom} a {age} ans")      # Inès a 28 ans
print(f"Dans 10 ans : {age + 10}")  # on peut calculer dedans</pre>
<h2>Formater les nombres</h2>
<p>Après <code>:</code>, on précise la forme. Le plus utile : <code>.2f</code> pour 2 chiffres après la virgule.</p>
<pre>prix = 3.5
print(f"Prix : {prix:.2f} €")   # Prix : 3.50 €</pre>
<p class="note">Sans le <code>f</code> devant, Python affiche les accolades telles quelles. C'est l'oubli le plus fréquent.</p>`,
    starter: `nom = "Inès"
age = 28
print(f"{nom} a {age} ans")
print(f"Dans 10 ans : {age + 10}")
print("{nom} sans le f")

prix = 3.5
print(f"Prix : {prix:.2f} €")`,
    quiz: [
      { q: 'Avec <code>x = 4</code>, qu\'affiche <code>print(f"x vaut {x * 2}")</code> ?', choices: ["x vaut {x * 2}", "x vaut 8", "x vaut x * 2"], answer: 1,
        explain: "Dans une f-string, ce qui est entre accolades est calculé." },
      { q: 'Avec <code>p = 2.5</code>, qu\'affiche <code>f"{p:.2f}"</code> ?', choices: ["2.5", "2.50", "2"], answer: 1,
        explain: ".2f force 2 chiffres après la virgule." },
    ],
    exercise: {
      task: `<p>Avec une f-string, affiche exactement :</p>
<pre>Léo a fait 3 tours en 12.40 minutes</pre>
<p>en utilisant les variables <code>nom</code>, <code>tours</code> et <code>temps</code> (le temps avec 2 chiffres après la virgule).</p>`,
      starter: `nom = "Léo"
tours = 3
temps = 12.4

`,
      check: `
assert 'f"' in code_eleve or "f'" in code_eleve, "Utilise une f-string : f\\"...\\""
assert "Léo a fait 3 tours en 12.40 minutes" in sortie, "La phrase affichée doit être exactement : Léo a fait 3 tours en 12.40 minutes. Pour le temps, utilise {temps:.2f}."
`,
      solution: `nom = "Léo"
tours = 3
temps = 12.4

print(f"{nom} a fait {tours} tours en {temps:.2f} minutes")`,
    },
  },

  conversions: {
    body: `
<p>Chaque valeur a un <b>type</b>, que <code>type()</code> révèle. Pour passer d'un type à l'autre, on utilise le nom du type comme une fonction :</p>
<div class="table-wrap"><table>
<tr><th>Fonction</th><th>Exemple</th><th>Résultat</th></tr>
<tr><td><code>int()</code></td><td><code>int("42")</code></td><td><code>42</code></td></tr>
<tr><td><code>float()</code></td><td><code>float("3.5")</code></td><td><code>3.5</code></td></tr>
<tr><td><code>str()</code></td><td><code>str(42)</code></td><td><code>"42"</code></td></tr>
</table></div>
<p><code>int()</code> sur un décimal coupe la partie après la virgule, sans arrondir : <code>int(3.9)</code> donne <code>3</code>.</p>
<h2>Quand ça coince</h2>
<p>Python ne peut convertir que ce qui a du sens. <code>int("bonjour")</code> provoque une <code>ValueError</code>. Et pour coller un nombre à du texte avec <code>+</code>, il faut d'abord le convertir :</p>
<pre>age = 30
print("J'ai " + str(age) + " ans")</pre>`,
    starter: `print(type(42), type(3.5), type("42"))
print(int("42") + 1)
print(float("3.5") * 2)
print(int(3.9))
print("J'ai " + str(30) + " ans")`,
    quiz: [
      { q: "Que donne <code>int(7.8)</code> ?", choices: ["8", "7", "Une erreur"], answer: 1,
        explain: "int() coupe la partie décimale sans arrondir." },
      { q: 'Que donne <code>str(5) + "5"</code> ?', choices: ["10", '"55"', "Une erreur"], answer: 1,
        explain: 'str(5) donne le texte "5", et coller "5" et "5" donne "55".' },
    ],
    exercise: {
      task: `<p>Le programme lit un prix décimal avec <code>input()</code> (par exemple <code>4.5</code>) et une quantité entière (par exemple <code>3</code>).</p>
<ul><li>Convertis chaque réponse dans le bon type.</li>
<li>Calcule et affiche le total avec 2 chiffres après la virgule : <code>Total : 13.50 €</code></li></ul>`,
      starter: `prix = input("Prix ? ")
quantite = input("Quantité ? ")

`,
      stdin: "4.5\n3",
      check: `
assert isinstance(prix, float), "prix doit être converti en nombre décimal avec float()."
assert isinstance(quantite, int), "quantite doit être convertie en entier avec int()."
assert "Total : 13.50 €" in sortie, "Affiche : Total : 13.50 € (utilise {total:.2f} dans une f-string)."
`,
      solution: `prix = float(input("Prix ? "))
quantite = int(input("Quantité ? "))

total = prix * quantite
print(f"Total : {total:.2f} €")`,
    },
  },
};
