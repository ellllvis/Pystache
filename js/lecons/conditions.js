// Niveau 1 · Module « Prendre des décisions »
(window.LECONS = window.LECONS || {})["conditions"] = {
  comparaisons: {
    body: `
<p>Pour prendre une décision, un programme doit d'abord <b>comparer</b>. Une comparaison donne toujours l'une de ces deux valeurs : <code>True</code> (vrai) ou <code>False</code> (faux). C'est le type <code>bool</code>, pour « booléen ».</p>
<div class="table-wrap"><table>
<tr><th>Signe</th><th>Sens</th><th>Exemple</th><th>Résultat</th></tr>
<tr><td><code>==</code></td><td>égal à</td><td><code>3 == 3</code></td><td>True</td></tr>
<tr><td><code>!=</code></td><td>différent de</td><td><code>3 != 4</code></td><td>True</td></tr>
<tr><td><code>&lt;</code> <code>&gt;</code></td><td>plus petit, plus grand</td><td><code>5 &gt; 8</code></td><td>False</td></tr>
<tr><td><code>&lt;=</code> <code>&gt;=</code></td><td>plus petit ou égal, plus grand ou égal</td><td><code>5 &lt;= 5</code></td><td>True</td></tr>
</table></div>
<p class="note">Ne confonds pas <code>=</code> (ranger une valeur) et <code>==</code> (comparer deux valeurs).</p>
<p>On peut aussi comparer du texte : <code>"chat" == "chat"</code> vaut <code>True</code>, mais <code>"Chat" == "chat"</code> vaut <code>False</code>, car les majuscules comptent.</p>`,
    starter: `age = 17
print(age >= 18)
print(age == 17)
print(age != 17)
print("Chat" == "chat")
majeur = age >= 18
print(type(majeur))`,
    quiz: [
      { q: "Que vaut <code>7 &lt;= 7</code> ?", choices: ["True", "False"], answer: 0,
        explain: "<= signifie « plus petit ou égal » : 7 est égal à 7." },
      { q: "Quel signe sert à <b>comparer</b> deux valeurs ?", choices: ["<code>=</code>", "<code>==</code>", "<code>===</code>"], answer: 1,
        explain: "= range une valeur dans une variable. == compare." },
    ],
    exercise: {
      task: `<p>Crée une variable <code>peut_entrer</code> qui vaut <code>True</code> si <code>taille</code> est d'au moins 120 cm, et <code>False</code> sinon. Utilise une comparaison, pas <code>True</code> ou <code>False</code> écrit à la main. Affiche-la.</p>`,
      starter: `taille = 132

`,
      check: `
assert peut_entrer == (taille >= 120), "peut_entrer doit valoir le résultat de la comparaison taille >= 120."
assert ">=" in code_eleve or ">" in code_eleve, "Utilise une comparaison comme taille >= 120."
assert str(peut_entrer) in sortie, "Affiche peut_entrer."
`,
      solution: `taille = 132

peut_entrer = taille >= 120
print(peut_entrer)`,
    },
  },

  if: {
    body: `
<p>Avec <code>if</code> (« si »), un bloc de code ne s'exécute que si une condition est vraie. Avec <code>else</code> (« sinon »), on prévoit l'autre cas.</p>
<pre>temperature = 28
if temperature > 25:
    print("Il fait chaud")
    print("Pense à boire de l'eau")
else:
    print("Température agréable")
print("Fin")</pre>
<h2>Les deux règles d'or</h2>
<ul>
  <li>La ligne du <code>if</code> et celle du <code>else</code> finissent par deux-points <code>:</code>.</li>
  <li>Le bloc qui dépend de la condition est <b>décalé de 4 espaces</b>. C'est ce décalage, l'<b>indentation</b>, qui dit à Python où le bloc commence et finit.</li>
</ul>
<p>Dans l'exemple, <code>print("Fin")</code> n'est pas décalé : il s'exécute dans tous les cas.</p>
<p class="note">Dans l'éditeur, la touche Tab insère 4 espaces. Sur téléphone, tape 4 espaces.</p>`,
    starter: `temperature = 28
if temperature > 25:
    print("Il fait chaud")
    print("Pense à boire de l'eau")
else:
    print("Température agréable")
print("Fin")`,
    quiz: [
      { q: "Qu'est-ce qui manque ?<br><code>if x > 3</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print(x)</code>", choices: ["Des parenthèses", "Les deux-points à la fin du if", "Rien"], answer: 1,
        explain: "La ligne du if se termine toujours par :" },
      { q: "Comment Python sait-il quelles lignes font partie du bloc <code>if</code> ?", choices: ["Grâce aux accolades", "Grâce au décalage (indentation)", "Il prend la ligne suivante seulement"], answer: 1,
        explain: "En Python, l'indentation fait partie de la syntaxe." },
    ],
    exercise: {
      task: `<p>Le programme lit une note sur 20. Affiche <code>Reçu</code> si la note est d'au moins 10, et <code>Ajourné</code> sinon.</p>
<p class="note">Change la note dans « Entrées du programme » pour tester les deux cas.</p>`,
      starter: `note = float(input("Note ? "))

`,
      stdin: "12.5",
      check: `
assert "if" in code_eleve and "else" in code_eleve, "Utilise if et else."
attendu = "Reçu" if note >= 10 else "Ajourné"
autre = "Ajourné" if note >= 10 else "Reçu"
assert attendu in sortie, f"Avec la note {note}, le programme doit afficher {attendu}."
assert autre not in sortie, f"Avec la note {note}, le programme ne doit pas afficher {autre}."
`,
      solution: `note = float(input("Note ? "))

if note >= 10:
    print("Reçu")
else:
    print("Ajourné")`,
    },
  },

  elif: {
    body: `
<p>Quand il y a plus de deux cas, on ajoute des <code>elif</code> (contraction de « else if », « sinon si »). Python teste les conditions <b>dans l'ordre</b> et exécute seulement le premier bloc dont la condition est vraie.</p>
<pre>heure = 15
if heure < 12:
    print("Bonjour")
elif heure < 18:
    print("Bon après-midi")
else:
    print("Bonsoir")</pre>
<p>Avec <code>heure = 15</code>, la première condition est fausse, la deuxième est vraie : Python affiche « Bon après-midi » et ignore le reste.</p>
<h2>L'ordre compte</h2>
<p>Comme Python s'arrête au premier cas vrai, on range les conditions de la plus précise à la plus large. Si on testait <code>heure < 18</code> en premier, « Bonjour » ne s'afficherait jamais.</p>`,
    starter: `heure = 15
if heure < 12:
    print("Bonjour")
elif heure < 18:
    print("Bon après-midi")
else:
    print("Bonsoir")`,
    quiz: [
      { q: "Avec <code>x = 5</code>, qu'affiche ce code ?<br><code>if x > 0:</code> print(\"A\")<br><code>elif x > 3:</code> print(\"B\")", choices: ["A", "B", "A puis B"], answer: 0,
        explain: "La première condition est vraie, donc Python ignore les elif suivants." },
      { q: "Combien de <code>elif</code> peut-on mettre ?", choices: ["Un seul", "Deux au maximum", "Autant qu'on veut"], answer: 2,
        explain: "On peut enchaîner autant de elif que nécessaire." },
    ],
    exercise: {
      task: `<p>Le programme lit une vitesse en km/h. Affiche :</p>
<ul><li><code>Lent</code> en dessous de 30 ;</li><li><code>Normal</code> de 30 à 90 inclus ;</li><li><code>Rapide</code> au-dessus de 90.</li></ul>`,
      starter: `vitesse = int(input("Vitesse ? "))

`,
      stdin: "50",
      check: `
assert "elif" in code_eleve, "Utilise if, elif et else."
attendu = "Lent" if vitesse < 30 else ("Normal" if vitesse <= 90 else "Rapide")
assert attendu in sortie, f"Avec {vitesse} km/h, le programme doit afficher {attendu}."
for mot in ["Lent", "Normal", "Rapide"]:
    if mot != attendu:
        assert mot not in sortie, f"Avec {vitesse} km/h, le programme ne doit pas afficher {mot}."
`,
      solution: `vitesse = int(input("Vitesse ? "))

if vitesse < 30:
    print("Lent")
elif vitesse <= 90:
    print("Normal")
else:
    print("Rapide")`,
    },
  },

  logique: {
    body: `
<p>Pour combiner plusieurs conditions, Python a trois mots :</p>
<ul>
  <li><code>and</code> (et) : vrai si les <b>deux</b> conditions sont vraies.</li>
  <li><code>or</code> (ou) : vrai si <b>au moins une</b> des deux est vraie.</li>
  <li><code>not</code> (non) : inverse une condition.</li>
</ul>
<pre>age = 25
a_le_permis = True

if age >= 18 and a_le_permis:
    print("Peut conduire")

jour = "dimanche"
if jour == "samedi" or jour == "dimanche":
    print("C'est le week-end")

if not a_le_permis:
    print("Prends le bus")</pre>
<p class="note">Piège classique : <code>jour == "samedi" or "dimanche"</code> ne marche pas comme on croit. Il faut répéter la comparaison des deux côtés du <code>or</code>.</p>
<p>Pour tester un intervalle, Python accepte une écriture très lisible : <code>0 &lt;= note &lt;= 20</code>.</p>`,
    starter: `age = 25
a_le_permis = True
if age >= 18 and a_le_permis:
    print("Peut conduire")

jour = "dimanche"
if jour == "samedi" or jour == "dimanche":
    print("C'est le week-end")

note = 14
print(0 <= note <= 20)`,
    quiz: [
      { q: "Que vaut <code>True and False</code> ?", choices: ["True", "False"], answer: 1,
        explain: "and n'est vrai que si les deux côtés sont vrais." },
      { q: "Que vaut <code>True or False</code> ?", choices: ["True", "False"], answer: 0,
        explain: "or est vrai dès qu'un des côtés est vrai." },
      { q: "Que vaut <code>not (3 > 5)</code> ?", choices: ["True", "False"], answer: 0,
        explain: "3 > 5 est faux, et not inverse : vrai." },
    ],
    exercise: {
      task: `<p>Une année est <b>bissextile</b> si elle est divisible par 4 mais pas par 100, <b>ou</b> si elle est divisible par 400.</p>
<p>Crée la variable <code>bissextile</code> (True ou False) pour l'année lue, puis affiche-la.</p>
<p class="note">Rappel : « divisible par 4 » s'écrit <code>annee % 4 == 0</code>.</p>`,
      starter: `annee = int(input("Année ? "))

`,
      stdin: "2024",
      check: `
assert ("and" in code_eleve or "or" in code_eleve), "Combine tes conditions avec and / or."
attendu = (annee % 4 == 0 and annee % 100 != 0) or annee % 400 == 0
assert bissextile == attendu, f"Pour {annee}, bissextile devrait valoir {attendu}."
assert str(bissextile) in sortie, "Affiche bissextile."
`,
      solution: `annee = int(input("Année ? "))

bissextile = (annee % 4 == 0 and annee % 100 != 0) or annee % 400 == 0
print(bissextile)`,
    },
  },

  "projet-quiz": {
    body: `
<p>On construit un petit quiz de culture générale qui pose trois questions et compte les points.</p>
<p>Idée : une variable <code>score</code> part de 0, et on lui ajoute 1 à chaque bonne réponse.</p>
<pre>score = 0
reponse = input("Capitale de l'Italie ? ")
if reponse == "Rome":
    score = score + 1
    print("Bravo !")
else:
    print("Non, c'était Rome")</pre>
<p>Pour être plus tolérant avec les majuscules, on peut comparer en minuscules grâce à <code>.lower()</code> : <code>reponse.lower() == "rome"</code>. On verra ces outils plus en détail au niveau 2.</p>
<p class="note">L'astuce <code>score += 1</code> est une façon courte d'écrire <code>score = score + 1</code>.</p>`,
    quiz: [
      { q: "Que vaut <code>score</code> après <code>score = 2</code> puis <code>score += 1</code> ?", choices: ["1", "3", "21"], answer: 1,
        explain: "score += 1 ajoute 1 à la valeur actuelle." },
      { q: 'Que donne <code>"ROME".lower()</code> ?', choices: ['"ROME"', '"rome"', '"Rome"'], answer: 1,
        explain: ".lower() met tout en minuscules." },
    ],
    exercise: {
      task: `<p>Complète le quiz :</p>
<ul><li>3 questions : capitale de l'Italie (<code>Rome</code>), nombre de pattes d'une araignée (<code>8</code>), planète la plus proche du Soleil (<code>Mercure</code>).</li>
<li>Chaque bonne réponse ajoute 1 à <code>score</code>. Les majuscules ne doivent pas compter.</li>
<li>À la fin, affiche <code>Score : 2/3</code> (avec le vrai score).</li>
<li>Si le score est de 3, affiche aussi <code>Parfait !</code></li></ul>`,
      starter: `score = 0

r1 = input("Capitale de l'Italie ? ")
# À FAIRE : vérifier r1

# À FAIRE : questions 2 et 3

# À FAIRE : afficher le score
`,
      stdin: "rome\n6\nMercure",
      check: `
assert score == 2, "Avec les réponses rome, 6 et Mercure, score devrait valoir 2. Les majuscules ne doivent pas compter : compare avec .lower()."
assert "Score : 2/3" in sortie, "Affiche le score sous la forme : Score : 2/3"
assert "Parfait" not in sortie, "Parfait ! ne doit s'afficher que si le score vaut 3."
assert code_eleve.count("input") >= 3, "Pose les trois questions avec input()."
`,
      solution: `score = 0

r1 = input("Capitale de l'Italie ? ")
if r1.lower() == "rome":
    score += 1

r2 = input("Combien de pattes a une araignée ? ")
if r2 == "8":
    score += 1

r3 = input("Planète la plus proche du Soleil ? ")
if r3.lower() == "mercure":
    score += 1

print(f"Score : {score}/3")
if score == 3:
    print("Parfait !")`,
    },
  },
};
