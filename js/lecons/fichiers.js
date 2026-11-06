// Niveau 2 · Module « Lire et écrire des fichiers »
(window.LECONS = window.LECONS || {})["fichiers"] = {
  ecrire: {
    body: `
<p>Les variables disparaissent quand le programme s'arrête. Pour garder des données, on les écrit dans un <b>fichier</b>.</p>
<pre>f = open("journal.txt", "w", encoding="utf-8")
f.write("Première ligne\\n")
f.write("Deuxième ligne\\n")
f.close()</pre>
<ul>
  <li><code>open(nom, mode)</code> ouvre le fichier. Le mode <code>"w"</code> (write) crée le fichier, ou l'<b>écrase</b> s'il existe déjà.</li>
  <li>Le mode <code>"a"</code> (append) ajoute à la fin sans effacer.</li>
  <li><code>write()</code> n'ajoute pas de retour à la ligne : on écrit <code>\\n</code> nous-mêmes.</li>
  <li><code>close()</code> ferme le fichier et s'assure que tout est bien enregistré.</li>
</ul>
<p class="note">Dans cette appli, les fichiers sont créés dans un petit disque virtuel propre à ton navigateur. Ils disparaissent quand tu recharges la page.</p>`,
    starter: `f = open("journal.txt", "w", encoding="utf-8")
f.write("Première ligne\\n")
f.write("Deuxième ligne\\n")
f.close()

f = open("journal.txt", "a", encoding="utf-8")
f.write("Ligne ajoutée\\n")
f.close()

print(open("journal.txt", encoding="utf-8").read())`,
    quiz: [
      { q: 'Que fait <code>open("data.txt", "w")</code> si le fichier existe déjà ?', choices: ["Il ajoute à la fin", "Il efface son contenu", "Il provoque une erreur"], answer: 1,
        explain: "Le mode w repart d'un fichier vide. Pour ajouter, on utilise a." },
      { q: "Que signifie <code>\\n</code> dans une chaîne ?", choices: ["La lettre n", "Un retour à la ligne", "Une tabulation"], answer: 1,
        explain: "\\n est le caractère de fin de ligne." },
    ],
    exercise: {
      task: `<p>Écris dans le fichier <code>table.txt</code> la table de 9, de 1 à 10, une ligne par opération, sous la forme <code>9 x 3 = 27</code>.</p>
<p>N'oublie pas de fermer le fichier.</p>`,
      starter: `# Écris la table de 9 dans table.txt
`,
      check: `
import os
assert os.path.exists("table.txt"), "Le fichier table.txt n'a pas été créé."
contenu = open("table.txt", encoding="utf-8").read().strip().split("\\n")
assert contenu == [f"9 x {k} = {9*k}" for k in range(1, 11)], "Le fichier doit contenir 10 lignes, de « 9 x 1 = 9 » à « 9 x 10 = 90 ». As-tu ajouté \\\\n à chaque ligne ?"
assert "close" in code_eleve or "with" in code_eleve, "Pense à fermer le fichier avec close()."
`,
      solution: `f = open("table.txt", "w", encoding="utf-8")
for k in range(1, 11):
    f.write(f"9 x {k} = {9 * k}\\n")
f.close()`,
    },
  },

  lire: {
    body: `
<p>Pour lire un fichier, on l'ouvre en mode <code>"r"</code> (read), le mode par défaut. Trois façons de lire :</p>
<pre>f = open("poeme.txt", encoding="utf-8")
tout = f.read()          # tout le contenu en une seule chaîne
f.close()</pre>
<pre>f = open("poeme.txt", encoding="utf-8")
lignes = f.readlines()   # une liste de lignes (avec leur \\n)
f.close()</pre>
<p>La plus courante : parcourir le fichier ligne par ligne avec <code>for</code>. C'est aussi la plus économe en mémoire pour les gros fichiers.</p>
<pre>f = open("poeme.txt", encoding="utf-8")
for ligne in f:
    print(ligne.strip())   # strip enlève le \\n final
f.close()</pre>
<p class="note">Ouvrir en lecture un fichier qui n'existe pas provoque une <code>FileNotFoundError</code>.</p>`,
    starter: `f = open("poeme.txt", "w", encoding="utf-8")
f.write("Le vent se lève\\nil faut tenter de vivre\\n")
f.close()

f = open("poeme.txt", encoding="utf-8")
for numero, ligne in enumerate(f, start=1):
    print(numero, ligne.strip())
f.close()`,
    quiz: [
      { q: "Que renvoie <code>f.read()</code> ?", choices: ["Une liste de lignes", "Tout le contenu dans une seule chaîne", "La première ligne"], answer: 1,
        explain: "read() lit tout d'un coup. readlines() donne une liste." },
      { q: "Pourquoi utilise-t-on souvent <code>ligne.strip()</code> en lisant un fichier ?", choices: ["Pour enlever le \\n de fin de ligne", "Pour mettre en minuscules", "C'est obligatoire"], answer: 0,
        explain: "Chaque ligne lue se termine par \\n, sauf parfois la dernière." },
    ],
    exercise: {
      task: `<p>Le fichier <code>notes.txt</code> contient une note par ligne. Écris <code>moyenne_fichier(nom)</code> qui lit le fichier, ignore les lignes vides, et renvoie la moyenne arrondie à 2 chiffres.</p>`,
      starter: `f = open("notes.txt", "w", encoding="utf-8")
f.write("12\\n15.5\\n\\n9\\n18\\n")
f.close()

def moyenne_fichier(nom):
    pass

print(moyenne_fichier("notes.txt"))
`,
      check: `
assert moyenne_fichier("notes.txt") == 13.62, "Pour notes.txt, la moyenne doit être 13.62 (la ligne vide est ignorée)."
with open("autre.txt", "w", encoding="utf-8") as g:
    g.write("10\\n20\\n")
assert moyenne_fichier("autre.txt") == 15, "La fonction doit marcher pour n'importe quel fichier passé en paramètre."
`,
      solution: `f = open("notes.txt", "w", encoding="utf-8")
f.write("12\\n15.5\\n\\n9\\n18\\n")
f.close()

def moyenne_fichier(nom):
    notes = []
    f = open(nom, encoding="utf-8")
    for ligne in f:
        ligne = ligne.strip()
        if ligne:
            notes.append(float(ligne))
    f.close()
    return round(sum(notes) / len(notes), 2)

print(moyenne_fichier("notes.txt"))`,
    },
  },

  with: {
    body: `
<p>Oublier <code>close()</code>, ou planter avant de l'atteindre, peut laisser un fichier mal enregistré. Le bloc <code>with</code> règle le problème : il ferme le fichier <b>automatiquement</b> à la fin du bloc, même en cas d'erreur.</p>
<pre>with open("courses.txt", "w", encoding="utf-8") as f:
    f.write("pommes\\n")
    f.write("riz\\n")
# ici, le fichier est déjà fermé

with open("courses.txt", encoding="utf-8") as f:
    for ligne in f:
        print(ligne.strip())</pre>
<p>C'est la façon recommandée de travailler avec des fichiers en Python. À partir de maintenant, utilise toujours <code>with</code>.</p>
<p class="note">Pour gérer un fichier absent, on combine <code>try</code> et <code>with</code> : <code>except FileNotFoundError:</code>.</p>`,
    starter: `with open("courses.txt", "w", encoding="utf-8") as f:
    f.write("pommes\\n")
    f.write("riz\\n")

with open("courses.txt", encoding="utf-8") as f:
    for ligne in f:
        print(ligne.strip())

try:
    with open("absent.txt", encoding="utf-8") as f:
        print(f.read())
except FileNotFoundError:
    print("Le fichier absent.txt n'existe pas")`,
    quiz: [
      { q: "Quel est le principal avantage de <code>with open(...) as f:</code> ?", choices: ["Le fichier se lit plus vite", "Le fichier est fermé automatiquement", "On peut ouvrir plusieurs fichiers"], answer: 1,
        explain: "with garantit la fermeture, même si une erreur survient dans le bloc." },
    ],
    exercise: {
      task: `<p>Écris deux fonctions, en utilisant <code>with</code> :</p>
<ul><li><code>sauver_liste(nom, elements)</code> écrit chaque élément de la liste sur sa propre ligne ;</li>
<li><code>charger_liste(nom)</code> renvoie la liste des lignes (sans les <code>\\n</code>), ou une liste vide si le fichier n'existe pas.</li></ul>`,
      starter: `def sauver_liste(nom, elements):
    pass

def charger_liste(nom):
    pass

sauver_liste("films.txt", ["Dune", "Coco", "Up"])
print(charger_liste("films.txt"))
print(charger_liste("inexistant.txt"))
`,
      check: `
assert code_eleve.count("with") >= 2, "Utilise with dans les deux fonctions."
sauver_liste("t1.txt", ["a", "b c", "d"])
assert open("t1.txt", encoding="utf-8").read().split("\\n")[:3] == ["a", "b c", "d"], "sauver_liste doit écrire un élément par ligne."
assert charger_liste("t1.txt") == ["a", "b c", "d"], "charger_liste doit renvoyer les lignes sans \\\\n."
assert charger_liste("nexistepas.txt") == [], "charger_liste doit renvoyer [] si le fichier n'existe pas (FileNotFoundError)."
`,
      solution: `def sauver_liste(nom, elements):
    with open(nom, "w", encoding="utf-8") as f:
        for e in elements:
            f.write(e + "\\n")

def charger_liste(nom):
    try:
        with open(nom, encoding="utf-8") as f:
            return [ligne.strip() for ligne in f]
    except FileNotFoundError:
        return []

sauver_liste("films.txt", ["Dune", "Coco", "Up"])
print(charger_liste("films.txt"))
print(charger_liste("inexistant.txt"))`,
    },
  },

  csv: {
    body: `
<p>Le format <b>CSV</b> (valeurs séparées par des virgules) est le format universel des tableaux : tous les tableurs savent l'ouvrir et l'enregistrer.</p>
<pre>nom,ville,age
Lina,Lyon,27
Karim,Nantes,34</pre>
<p>Le module <code>csv</code> s'occupe des détails (virgules dans les valeurs, guillemets…). Le plus pratique est <code>DictReader</code>, qui donne chaque ligne sous forme de dictionnaire, avec les noms de colonnes comme clés :</p>
<pre>import csv
with open("amis.csv", encoding="utf-8") as f:
    for ligne in csv.DictReader(f):
        print(ligne["nom"], "a", ligne["age"], "ans")</pre>
<p class="note">Toutes les valeurs lues sont des chaînes. Pour calculer, il faut convertir : <code>int(ligne["age"])</code>.</p>
<p>Pour écrire, <code>csv.writer(f).writerow([...])</code> écrit une ligne à partir d'une liste.</p>`,
    starter: `import csv

with open("amis.csv", "w", encoding="utf-8", newline="") as f:
    w = csv.writer(f)
    w.writerow(["nom", "ville", "age"])
    w.writerow(["Lina", "Lyon", 27])
    w.writerow(["Karim", "Nantes", 34])

with open("amis.csv", encoding="utf-8") as f:
    for ligne in csv.DictReader(f):
        print(ligne["nom"], "a", ligne["age"], "ans")`,
    quiz: [
      { q: "Avec <code>csv.DictReader</code>, chaque ligne est…", choices: ["une liste", "un dictionnaire colonne → valeur", "une chaîne"], answer: 1,
        explain: "Les clés sont les noms de colonnes de la première ligne." },
      { q: 'Que vaut <code>type(ligne["age"])</code> pour une valeur lue dans un CSV ?', choices: ["int", "str", "float"], answer: 1,
        explain: "Un CSV ne contient que du texte : il faut convertir soi-même." },
    ],
    exercise: {
      task: `<p>Le fichier <code>ventes.csv</code> contient des colonnes <code>produit</code>, <code>quantite</code> et <code>prix</code>. Écris <code>chiffre_affaires(nom)</code> qui renvoie le total des quantite × prix, arrondi à 2 chiffres.</p>`,
      starter: `import csv

with open("ventes.csv", "w", encoding="utf-8") as f:
    f.write("produit,quantite,prix\\n")
    f.write("café,120,2.5\\n")
    f.write("thé,45,2.2\\n")
    f.write("cookie,80,1.75\\n")

def chiffre_affaires(nom):
    pass

print(chiffre_affaires("ventes.csv"))
`,
      check: `
assert chiffre_affaires("ventes.csv") == 539.0, "Pour ventes.csv, le total doit être 539.0 (120 × 2.5 + 45 × 2.2 + 80 × 1.75)."
with open("v2.csv", "w", encoding="utf-8") as g:
    g.write("produit,quantite,prix\\nx,3,1.1\\n")
assert chiffre_affaires("v2.csv") == 3.3, "La fonction doit marcher pour n'importe quel fichier."
assert "csv." in code_eleve, "Utilise le module csv (csv.DictReader)."
`,
      solution: `import csv

with open("ventes.csv", "w", encoding="utf-8") as f:
    f.write("produit,quantite,prix\\n")
    f.write("café,120,2.5\\n")
    f.write("thé,45,2.2\\n")
    f.write("cookie,80,1.75\\n")

def chiffre_affaires(nom):
    total = 0
    with open(nom, encoding="utf-8") as f:
        for ligne in csv.DictReader(f):
            total += int(ligne["quantite"]) * float(ligne["prix"])
    return round(total, 2)

print(chiffre_affaires("ventes.csv"))`,
    },
  },
};
