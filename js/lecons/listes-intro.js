// Niveau 1 · Module « Premières listes »
(window.LECONS = window.LECONS || {})["listes-intro"] = {
  creer: {
    body: `
<p>Une <b>liste</b> range plusieurs valeurs, dans l'ordre, sous un seul nom. On l'écrit entre crochets <code>[ ]</code>, avec des virgules entre les éléments :</p>
<pre>fruits = ["pomme", "kiwi", "banane"]
notes = [12, 15.5, 9]
vide = []</pre>
<p>Une liste peut contenir n'importe quel type de valeur, et même des types mélangés.</p>
<h2>Quelques outils de base</h2>
<ul>
  <li><code>len(fruits)</code> : le nombre d'éléments (3).</li>
  <li><code>"kiwi" in fruits</code> : <code>True</code> si l'élément est dans la liste.</li>
  <li><code>sum(notes)</code>, <code>min(notes)</code>, <code>max(notes)</code> : somme, plus petit, plus grand (pour des nombres).</li>
</ul>
<pre>notes = [12, 15.5, 9]
moyenne = sum(notes) / len(notes)
print(round(moyenne, 2))   # 12.17</pre>`,
    starter: `fruits = ["pomme", "kiwi", "banane"]
print(fruits)
print(len(fruits))
print("kiwi" in fruits, "fraise" in fruits)

notes = [12, 15.5, 9]
print(sum(notes), min(notes), max(notes))
print(round(sum(notes) / len(notes), 2))`,
    quiz: [
      { q: "Que vaut <code>len([4, 8, 15, 16])</code> ?", choices: ["4", "16", "43"], answer: 0,
        explain: "len compte les éléments : il y en a 4." },
      { q: 'Que vaut <code>"lion" in ["tigre", "lion"]</code> ?', choices: ["True", "False", "1"], answer: 0,
        explain: "in vérifie si l'élément est présent." },
    ],
    exercise: {
      task: `<p>Voici les températures d'une semaine.</p>
<ul><li>Calcule la moyenne dans <code>moyenne</code>, arrondie à 1 chiffre après la virgule.</li>
<li>Calcule dans <code>ecart</code> la différence entre la plus haute et la plus basse.</li>
<li>Affiche les deux.</li></ul>`,
      starter: `temperatures = [14, 17, 19, 16, 21, 23, 18]

`,
      check: `
assert moyenne == round(sum(temperatures) / len(temperatures), 1), "moyenne doit valoir sum(...) / len(...), arrondie avec round(..., 1)."
assert ecart == max(temperatures) - min(temperatures), "ecart doit valoir max(...) - min(...)."
assert str(moyenne) in sortie and str(ecart) in sortie, "Affiche moyenne et ecart."
`,
      solution: `temperatures = [14, 17, 19, 16, 21, 23, 18]

moyenne = round(sum(temperatures) / len(temperatures), 1)
ecart = max(temperatures) - min(temperatures)
print("Moyenne :", moyenne)
print("Écart :", ecart)`,
    },
  },

  indices: {
    body: `
<p>Chaque élément d'une liste a une position, son <b>indice</b>. Comme pour les chaînes, on commence à <b>0</b> :</p>
<pre>jours = ["lundi", "mardi", "mercredi", "jeudi"]
print(jours[0])    # lundi
print(jours[2])    # mercredi
print(jours[-1])   # jeudi (le dernier)</pre>
<p>Les indices négatifs comptent depuis la fin : <code>-1</code> est le dernier, <code>-2</code> l'avant-dernier.</p>
<h2>Sortir de la liste</h2>
<p>Demander un indice qui n'existe pas provoque une <code>IndexError</code>. Dans une liste de 4 éléments, le dernier indice est 3, donc <code>jours[4]</code> est une erreur.</p>
<p class="note">Retiens : le dernier indice vaut toujours <code>len(liste) - 1</code>.</p>`,
    starter: `jours = ["lundi", "mardi", "mercredi", "jeudi"]
print(jours[0])
print(jours[2])
print(jours[-1])
print("Dernier indice :", len(jours) - 1)`,
    quiz: [
      { q: 'Avec <code>l = ["a", "b", "c"]</code>, que vaut <code>l[1]</code> ?', choices: ['"a"', '"b"', '"c"'], answer: 1,
        explain: "Les indices commencent à 0." },
      { q: 'Et <code>l[-2]</code> ?', choices: ['"a"', '"b"', '"c"'], answer: 1,
        explain: "-1 est le dernier (c), -2 l'avant-dernier (b)." },
      { q: "Et <code>l[3]</code> ?", choices: ['"c"', "None", "Une IndexError"], answer: 2,
        explain: "Les indices valides vont de 0 à 2." },
    ],
    exercise: {
      task: `<p>À partir de la liste <code>podium</code> :</p>
<ul><li>mets le premier élément dans <code>gagnant</code> ;</li>
<li>mets le dernier élément dans <code>dernier</code>, <b>avec un indice négatif</b> ;</li>
<li>affiche <code>Gagnant : Nora</code> puis <code>Dernier : Hugo</code> (avec les valeurs des variables).</li></ul>`,
      starter: `podium = ["Nora", "Malik", "Zoé", "Hugo"]

`,
      check: `
assert gagnant == podium[0], "gagnant doit contenir podium[0]."
assert dernier == podium[-1], "dernier doit contenir le dernier élément."
assert "[-1]" in code_eleve, "Utilise l'indice -1 pour le dernier élément."
assert "Gagnant : Nora" in sortie and "Dernier : Hugo" in sortie, "Affiche Gagnant : Nora puis Dernier : Hugo."
`,
      solution: `podium = ["Nora", "Malik", "Zoé", "Hugo"]

gagnant = podium[0]
dernier = podium[-1]
print("Gagnant :", gagnant)
print("Dernier :", dernier)`,
    },
  },

  modifier: {
    body: `
<p>Une liste se modifie après sa création. Les outils principaux :</p>
<div class="table-wrap"><table>
<tr><th>Code</th><th>Effet</th></tr>
<tr><td><code>l.append(x)</code></td><td>ajoute x à la fin</td></tr>
<tr><td><code>l.insert(i, x)</code></td><td>insère x à l'indice i</td></tr>
<tr><td><code>l.remove(x)</code></td><td>retire la première occurrence de x</td></tr>
<tr><td><code>l.pop()</code></td><td>retire et renvoie le dernier élément</td></tr>
<tr><td><code>l[i] = x</code></td><td>remplace l'élément d'indice i</td></tr>
</table></div>
<pre>playlist = ["Intro", "Soleil"]
playlist.append("Final")       # ["Intro", "Soleil", "Final"]
playlist.insert(1, "Pluie")    # ["Intro", "Pluie", "Soleil", "Final"]
playlist[0] = "Ouverture"      # remplace "Intro"
playlist.remove("Soleil")
print(playlist)                # ['Ouverture', 'Pluie', 'Final']</pre>
<p class="note">Ces méthodes modifient la liste directement. Il ne faut pas écrire <code>playlist = playlist.append(...)</code> : <code>append</code> ne renvoie rien.</p>`,
    starter: `playlist = ["Intro", "Soleil"]
playlist.append("Final")
playlist.insert(1, "Pluie")
playlist[0] = "Ouverture"
playlist.remove("Soleil")
print(playlist)
derniere = playlist.pop()
print(derniere, playlist)`,
    quiz: [
      { q: "Après <code>l = [1, 2]</code> puis <code>l.append(3)</code>, que vaut <code>l</code> ?", choices: ["[1, 2]", "[1, 2, 3]", "[3, 1, 2]"], answer: 1,
        explain: "append ajoute à la fin." },
      { q: "Que vaut <code>x</code> après <code>x = [1, 2].append(3)</code> ?", choices: ["[1, 2, 3]", "None", "3"], answer: 1,
        explain: "append modifie la liste et ne renvoie rien (None)." },
    ],
    exercise: {
      task: `<p>Mets à jour la liste <code>courses</code> :</p>
<ul><li>ajoute <code>"pain"</code> à la fin ;</li>
<li>retire <code>"bonbons"</code> ;</li>
<li>remplace le premier élément par <code>"lait demi-écrémé"</code> ;</li>
<li>affiche la liste.</li></ul>`,
      starter: `courses = ["lait", "bonbons", "œufs"]

`,
      check: `
assert courses == ["lait demi-écrémé", "œufs", "pain"], "La liste finale doit être : ['lait demi-écrémé', 'œufs', 'pain']. Vérifie l'ordre de tes opérations."
assert "append" in code_eleve and "remove" in code_eleve, "Utilise append et remove."
assert "pain" in sortie, "Affiche la liste."
`,
      solution: `courses = ["lait", "bonbons", "œufs"]

courses.append("pain")
courses.remove("bonbons")
courses[0] = "lait demi-écrémé"
print(courses)`,
    },
  },

  parcourir: {
    body: `
<p>La boucle <code>for</code> sait parcourir directement une liste : à chaque tour, la variable prend l'élément suivant.</p>
<pre>animaux = ["chat", "chien", "lapin"]
for animal in animaux:
    print("J'aime le", animal)</pre>
<h2>Construire une nouvelle liste</h2>
<p>On part souvent d'une liste vide qu'on remplit dans la boucle :</p>
<pre>prix = [12, 45, 8, 30]
chers = []
for p in prix:
    if p > 20:
        chers.append(p)
print(chers)   # [45, 30]</pre>
<p>Ça marche aussi avec les chaînes : <code>for lettre in "abc":</code> parcourt les lettres une par une.</p>`,
    starter: `animaux = ["chat", "chien", "lapin"]
for animal in animaux:
    print("J'aime le", animal)

prix = [12, 45, 8, 30]
chers = []
for p in prix:
    if p > 20:
        chers.append(p)
print(chers)

for lettre in "abc":
    print(lettre.upper())`,
    quiz: [
      { q: "Dans <code>for x in [5, 6, 7]:</code>, quelle valeur a <code>x</code> au deuxième tour ?", choices: ["1", "6", "[5, 6, 7]"], answer: 1,
        explain: "x prend directement les éléments : 5, puis 6, puis 7." },
      { q: 'Combien de tours fait <code>for c in "bonjour":</code> ?', choices: ["1", "7", "Une erreur"], answer: 1,
        explain: "Une chaîne se parcourt caractère par caractère : 7 lettres." },
    ],
    exercise: {
      task: `<p>À partir de <code>notes</code>, crée une nouvelle liste <code>reussies</code> qui contient seulement les notes d'au moins 10, <b>avec une boucle for</b>. Puis affiche combien il y en a.</p>`,
      starter: `notes = [8, 14, 10, 6, 17, 9.5, 12]

`,
      check: `
assert "for" in code_eleve, "Utilise une boucle for."
assert reussies == [n for n in notes if n >= 10], "reussies doit contenir, dans l'ordre, les notes >= 10 : [14, 10, 17, 12]."
assert str(len(reussies)) in sortie, "Affiche le nombre de notes réussies avec len(reussies)."
`,
      solution: `notes = [8, 14, 10, 6, 17, 9.5, 12]

reussies = []
for n in notes:
    if n >= 10:
        reussies.append(n)
print(len(reussies), "notes réussies")`,
    },
  },

  "projet-courses": {
    body: `
<p>Pour finir le niveau Débutant, on combine tout : variables, conditions, boucles et listes. Le but est un petit gestionnaire de liste de courses qui répond à des commandes.</p>
<ul>
  <li><code>ajouter</code> : demande un article et l'ajoute (s'il n'y est pas déjà) ;</li>
  <li><code>retirer</code> : demande un article et le retire (s'il y est) ;</li>
  <li><code>voir</code> : affiche les articles numérotés ;</li>
  <li><code>fin</code> : arrête le programme.</li>
</ul>
<p>Pour numéroter, une astuce : <code>enumerate</code> donne à la fois la position et l'élément.</p>
<pre>for i, article in enumerate(courses, start=1):
    print(f"{i}. {article}")</pre>`,
    quiz: [
      { q: 'Que donne <code>list(enumerate(["a", "b"], start=1))</code> ?', choices: ["[(1, 'a'), (2, 'b')]", "['1a', '2b']", "[1, 2]"], answer: 0,
        explain: "enumerate associe un numéro à chaque élément." },
      { q: "Pourquoi tester <code>if article in courses</code> avant <code>remove</code> ?", choices: ["Pour aller plus vite", "Parce que remove provoque une erreur si l'élément est absent", "Ce n'est pas utile"], answer: 1,
        explain: "remove lève une ValueError si l'élément n'existe pas." },
    ],
    exercise: {
      task: `<p>Écris la boucle principale du gestionnaire décrit ci-dessus. Avec les entrées pré-remplies, la liste finale doit être <code>["pommes", "riz"]</code>, et la commande <code>voir</code> doit afficher :</p>
<pre>1. pommes
2. riz</pre>
<p>Quand on ajoute un article déjà présent, affiche <code>Déjà dans la liste</code>.</p>`,
      starter: `courses = []

while True:
    commande = input("Commande ? ")
    # À FAIRE : traiter ajouter, retirer, voir et fin
`,
      stdin: "ajouter\npommes\najouter\npâtes\najouter\npommes\najouter\nriz\nretirer\npâtes\nvoir\nfin",
      check: `
assert courses == ["pommes", "riz"], "À la fin, courses doit valoir ['pommes', 'riz']."
assert "Déjà dans la liste" in sortie, "Quand on ajoute pommes une deuxième fois, affiche : Déjà dans la liste"
assert "1. pommes" in lignes and "2. riz" in lignes, "La commande voir doit afficher 1. pommes puis 2. riz"
`,
      solution: `courses = []

while True:
    commande = input("Commande ? ")
    if commande == "ajouter":
        article = input("Article ? ")
        if article in courses:
            print("Déjà dans la liste")
        else:
            courses.append(article)
    elif commande == "retirer":
        article = input("Article ? ")
        if article in courses:
            courses.remove(article)
    elif commande == "voir":
        for i, article in enumerate(courses, start=1):
            print(f"{i}. {article}")
    elif commande == "fin":
        break`,
    },
  },
};
