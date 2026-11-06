// Niveau 1 · Module « Répéter des actions »
(window.LECONS = window.LECONS || {})["boucles"] = {
  while: {
    body: `
<p>Une <b>boucle</b> répète un bloc de code. La boucle <code>while</code> (« tant que ») le répète <b>tant qu'une condition est vraie</b>.</p>
<pre>compte = 3
while compte > 0:
    print(compte)
    compte = compte - 1
print("Décollage !")</pre>
<p>À chaque tour, Python vérifie la condition. Ici <code>compte</code> diminue de 1 à chaque tour, et quand il atteint 0, la condition devient fausse : la boucle s'arrête.</p>
<h2>Attention à la boucle infinie</h2>
<p>Si la condition ne devient jamais fausse, la boucle ne s'arrête jamais. Oublier <code>compte = compte - 1</code> dans l'exemple produirait une boucle infinie.</p>
<p class="note">Pas de panique : dans cette appli, un programme qui tourne plus de 10 secondes est arrêté automatiquement.</p>`,
    starter: `compte = 3
while compte > 0:
    print(compte)
    compte = compte - 1
print("Décollage !")`,
    quiz: [
      { q: "Combien de fois s'affiche « Coucou » ?<br><code>n = 0</code><br><code>while n &lt; 4:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print(\"Coucou\")</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;n += 1</code>", choices: ["3", "4", "5"], answer: 1,
        explain: "n vaut 0, 1, 2 puis 3 : quatre tours. Quand n vaut 4, la condition est fausse." },
      { q: "Que se passe-t-il si la condition d'un while reste toujours vraie ?", choices: ["Python l'arrête après 100 tours", "La boucle tourne sans fin", "Une erreur s'affiche tout de suite"], answer: 1,
        explain: "C'est une boucle infinie : il faut qu'une variable change pour que la condition devienne fausse." },
    ],
    exercise: {
      task: `<p>Une épargne commence à 100 € et augmente de 10 % chaque année (on la multiplie par 1.1).</p>
<p>Avec une boucle <code>while</code>, calcule dans <code>annees</code> le nombre d'années qu'il faut pour que l'épargne <b>dépasse 200 €</b>. Affiche ce nombre.</p>`,
      starter: `epargne = 100
annees = 0

`,
      check: `
assert "while" in code_eleve, "Utilise une boucle while."
assert annees == 8, "annees n'a pas la bonne valeur. Tant que epargne <= 200, multiplie epargne par 1.1 et ajoute 1 à annees."
assert "8" in sortie, "Affiche annees à la fin."
`,
      solution: `epargne = 100
annees = 0

while epargne <= 200:
    epargne = epargne * 1.1
    annees += 1

print("Il faut", annees, "ans")`,
    },
  },

  "for-range": {
    body: `
<p>Quand on sait combien de fois répéter, la boucle <code>for</code> est plus simple. Avec <code>range()</code>, elle compte toute seule :</p>
<pre>for i in range(5):
    print("Tour", i)</pre>
<p>Ce code affiche les tours 0, 1, 2, 3 et 4. À chaque tour, la variable <code>i</code> prend la valeur suivante.</p>
<h2>Les trois formes de range</h2>
<ul>
  <li><code>range(5)</code> : 0, 1, 2, 3, 4 (on s'arrête <b>avant</b> 5).</li>
  <li><code>range(2, 6)</code> : 2, 3, 4, 5.</li>
  <li><code>range(0, 20, 5)</code> : 0, 5, 10, 15 (de 5 en 5).</li>
</ul>
<h2>Accumuler</h2>
<p>Un usage très courant : additionner des valeurs dans une variable qui part de 0.</p>
<pre>somme = 0
for n in range(1, 11):
    somme += n
print(somme)   # 55</pre>`,
    starter: `for i in range(5):
    print("Tour", i)

print(list(range(2, 6)))
print(list(range(0, 20, 5)))

somme = 0
for n in range(1, 11):
    somme += n
print("Somme de 1 à 10 :", somme)`,
    quiz: [
      { q: "Quels nombres donne <code>range(3)</code> ?", choices: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3"], answer: 1,
        explain: "range commence à 0 et s'arrête avant le nombre donné." },
      { q: "Quels nombres donne <code>range(1, 10, 3)</code> ?", choices: ["1, 4, 7", "1, 4, 7, 10", "3, 6, 9"], answer: 0,
        explain: "On part de 1, on avance de 3, et on s'arrête avant 10." },
    ],
    exercise: {
      task: `<p>Avec une boucle <code>for</code>, affiche la table de multiplication de <code>n</code>, de 1 à 10, sous la forme :</p>
<pre>7 x 1 = 7
7 x 2 = 14
...
7 x 10 = 70</pre>`,
      starter: `n = 7

`,
      check: `
assert "for" in code_eleve, "Utilise une boucle for."
for k in range(1, 11):
    assert f"{n} x {k} = {n*k}" in lignes, f"Il manque la ligne : {n} x {k} = {n*k}"
assert len([l for l in lignes if " x " in l]) == 10, "La table doit avoir exactement 10 lignes, de 1 à 10."
`,
      solution: `n = 7

for k in range(1, 11):
    print(f"{n} x {k} = {n * k}")`,
    },
  },

  "break-continue": {
    body: `
<p>Deux mots permettent de contrôler une boucle de l'intérieur :</p>
<ul>
  <li><code>break</code> : sort immédiatement de la boucle.</li>
  <li><code>continue</code> : saute la fin du tour en cours et passe au suivant.</li>
</ul>
<pre>for n in range(1, 10):
    if n == 6:
        break          # on s'arrête à 6
    if n % 2 == 0:
        continue       # on saute les nombres pairs
    print(n)           # affiche 1, 3, 5</pre>
<h2>La boucle « jusqu'à ce que »</h2>
<p><code>while True</code> crée une boucle sans fin dont on sort avec <code>break</code>. C'est pratique pour redemander une saisie jusqu'à obtenir une bonne réponse :</p>
<pre>while True:
    mdp = input("Mot de passe ? ")
    if mdp == "python":
        break
    print("Incorrect")
print("Accès autorisé")</pre>`,
    starter: `for n in range(1, 10):
    if n == 6:
        break
    if n % 2 == 0:
        continue
    print(n)

while True:
    mdp = input("Mot de passe ? ")
    if mdp == "python":
        break
    print("Incorrect")
print("Accès autorisé")`,
    stdin: "1234\nazerty\npython",
    quiz: [
      { q: "Que fait <code>continue</code> ?", choices: ["Arrête la boucle", "Passe directement au tour suivant", "Recommence la boucle depuis le début"], answer: 1,
        explain: "continue saute le reste du tour en cours." },
      { q: "Comment sortir d'une boucle <code>while True</code> ?", choices: ["Avec break", "Ce n'est pas possible", "Avec continue"], answer: 0,
        explain: "break sort de la boucle, même si sa condition est toujours vraie." },
    ],
    exercise: {
      task: `<p>Le programme lit des nombres un par un. Additionne-les dans <code>total</code> jusqu'à ce que l'utilisateur tape <code>0</code>, puis affiche <code>Total : ...</code>.</p>
<p>Les nombres négatifs doivent être ignorés (utilise <code>continue</code>).</p>`,
      starter: `total = 0

`,
      stdin: "5\n-3\n10\n2\n0",
      check: `
assert "while" in code_eleve and "break" in code_eleve, "Utilise une boucle while True avec break."
assert "continue" in code_eleve, "Utilise continue pour ignorer les nombres négatifs."
assert total == 17, "Avec 5, -3, 10, 2 puis 0, total doit valoir 17 (le -3 est ignoré)."
assert "Total : 17" in sortie, "Affiche : Total : 17"
`,
      solution: `total = 0

while True:
    n = int(input("Nombre (0 pour finir) ? "))
    if n == 0:
        break
    if n < 0:
        continue
    total += n

print("Total :", total)`,
    },
  },

  imbriquees: {
    body: `
<p>On peut mettre une boucle à l'intérieur d'une autre. Pour chaque tour de la boucle extérieure, la boucle intérieure fait <b>tous</b> ses tours.</p>
<pre>for ligne in range(1, 4):
    for colonne in range(1, 4):
        print(ligne * colonne, end=" ")
    print()</pre>
<p>Résultat :</p>
<pre>1 2 3
2 4 6
3 6 9</pre>
<h2>Le paramètre end</h2>
<p>Par défaut, <code>print()</code> passe à la ligne. Avec <code>end=" "</code>, il met un espace à la place, ce qui permet d'écrire plusieurs valeurs sur la même ligne. Un <code>print()</code> vide passe ensuite à la ligne.</p>
<p class="note">Indentation : le <code>print()</code> final est aligné sur la boucle intérieure, pas dedans. Il s'exécute donc une fois par ligne.</p>`,
    starter: `for ligne in range(1, 4):
    for colonne in range(1, 4):
        print(ligne * colonne, end=" ")
    print()

for i in range(1, 5):
    print("*" * i)`,
    quiz: [
      { q: "Combien de fois s'exécute <code>print</code> ?<br><code>for a in range(3):</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;for b in range(4):</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(a, b)</code>", choices: ["7", "12", "4"], answer: 1,
        explain: "3 tours extérieurs × 4 tours intérieurs = 12." },
      { q: 'Que fait <code>print("A", end="")</code> ?', choices: ["Affiche A sans passer à la ligne", "Affiche A puis une ligne vide", "Provoque une erreur"], answer: 0,
        explain: "end remplace le retour à la ligne final." },
    ],
    exercise: {
      task: `<p>Avec deux boucles <code>for</code> imbriquées, dessine un rectangle de <code>hauteur</code> lignes et <code>largeur</code> colonnes avec le caractère <code>#</code> :</p>
<pre>#####
#####
#####</pre>
<p class="note">Interdit d'utiliser <code>"#" * largeur</code> : le but est de pratiquer les boucles imbriquées.</p>`,
      starter: `hauteur = 3
largeur = 5

`,
      check: `
assert code_eleve.count("for") >= 2, "Utilise deux boucles for imbriquées."
assert '"#" *' not in code_eleve and "'#' *" not in code_eleve, "N'utilise pas la multiplication de chaîne ici."
assert lignes == ["#" * largeur] * hauteur, f"Le dessin doit faire {hauteur} lignes de {largeur} caractères #."
`,
      solution: `hauteur = 3
largeur = 5

for i in range(hauteur):
    for j in range(largeur):
        print("#", end="")
    print()`,
    },
  },

  "projet-devine": {
    body: `
<p>Classique des débuts en programmation : l'ordinateur choisit un nombre secret, et le joueur doit le deviner. À chaque essai, le programme répond « Plus grand » ou « Plus petit ».</p>
<p>Pour choisir un nombre au hasard, on utilise le module <code>random</code> :</p>
<pre>import random
secret = random.randint(1, 100)   # entier entre 1 et 100 inclus</pre>
<p>Le squelette du jeu :</p>
<pre>essais = 0
while True:
    proposition = int(input("Ton nombre ? "))
    essais += 1
    if proposition == secret:
        break
    # sinon : dire plus grand ou plus petit</pre>
<p class="note">Dans l'exercice, le nombre secret est fixé pour que la correction automatique fonctionne. Une fois réussi, remplace-le par <code>random.randint(1, 100)</code> dans le bac à sable pour jouer pour de vrai.</p>`,
    quiz: [
      { q: "Que peut renvoyer <code>random.randint(1, 3)</code> ?", choices: ["1 ou 2", "1, 2 ou 3", "Un nombre décimal entre 1 et 3"], answer: 1,
        explain: "randint inclut les deux bornes." },
      { q: "Avec la méthode « couper en deux », combien d'essais faut-il au maximum pour trouver un nombre entre 1 et 100 ?", choices: ["7", "50", "100"], answer: 0,
        explain: "À chaque essai on élimine la moitié des possibilités : 100, 50, 25, 13, 7, 4, 2, 1. Sept essais suffisent." },
    ],
    exercise: {
      task: `<p>Écris le jeu complet :</p>
<ul><li>tant que le joueur n'a pas trouvé <code>secret</code>, lis une proposition ;</li>
<li>affiche <code>Plus grand</code> ou <code>Plus petit</code> selon le cas ;</li>
<li>compte les essais dans <code>essais</code> ;</li>
<li>quand c'est trouvé, affiche <code>Gagné en 4 essais</code> (avec le vrai nombre).</li></ul>`,
      starter: `secret = 42
essais = 0

`,
      stdin: "50\n25\n40\n42",
      check: `
assert "while" in code_eleve, "Utilise une boucle while."
assert essais == 4, "Avec les propositions 50, 25, 40 puis 42, essais doit valoir 4."
assert any("Plus petit" in l for l in lignes), "Après 50, le programme doit afficher Plus petit."
assert sum("Plus grand" in l for l in lignes) >= 2, "Après 25 et 40, le programme doit afficher Plus grand."
assert "Gagné en 4 essais" in sortie, "À la fin, affiche : Gagné en 4 essais"
`,
      solution: `secret = 42
essais = 0

while True:
    proposition = int(input("Ton nombre ? "))
    essais += 1
    if proposition == secret:
        break
    elif proposition < secret:
        print("Plus grand")
    else:
        print("Plus petit")

print(f"Gagné en {essais} essais")`,
    },
  },
};
