// Contenu du parcours Pystache.
// Chaque leçon a un id unique (dans son module), un titre et, une fois rédigée :
//   body    : le texte de la leçon (HTML)
//   starter : le code de départ de l'éditeur (facultatif)
//   stdin   : les réponses pré-remplies pour input() (facultatif)
// Une leçon sans "body" s'affiche comme « à venir ».

(function () {
  // Raccourci pour une leçon pas encore rédigée.
  const L = (id, title) => ({ id, title });

  // ============================================================
  // NIVEAU 1 · MODULE 1 · PREMIERS PAS (rédigé en entier)
  // ============================================================
  const premiersPas = {
    id: "premiers-pas",
    title: "Premiers pas",
    intro: "Écrire, lancer et comprendre ses toutes premières lignes de Python.",
    lessons: [
      {
        id: "afficher",
        title: "Faire parler Python",
        body: `
<p>Un programme Python est une suite d'instructions que l'ordinateur lit <b>de haut en bas</b>, une ligne après l'autre.</p>
<p>La première instruction à connaître est <code>print()</code>. Elle affiche à l'écran ce qu'on met entre ses parenthèses.</p>
<pre>print("Bonjour !")
print(7 * 6)</pre>
<p>Résultat :</p>
<pre>Bonjour !
42</pre>
<h2>Texte ou calcul ?</h2>
<ul>
  <li>Entre guillemets, c'est du <b>texte</b> : Python l'affiche tel quel.</li>
  <li>Sans guillemets, c'est une <b>expression</b> : Python la calcule, puis affiche le résultat.</li>
</ul>
<p>Donc <code>print("7 * 6")</code> affiche <code>7 * 6</code>, alors que <code>print(7 * 6)</code> affiche <code>42</code>.</p>
<h2>Afficher plusieurs choses</h2>
<p>On peut donner plusieurs valeurs à <code>print()</code> en les séparant par des virgules. Python met un espace entre chacune :</p>
<pre>print("J'ai", 3, "chats")</pre>
<p class="note">Lance le code ci-dessous, puis change les textes et les calculs. Tu ne peux rien casser.</p>`,
        starter: `print("Bonjour, je m'appelle Python")\nprint(7 * 6)\nprint("7 * 6")\nprint("Dans une heure il y a", 60 * 60, "secondes")`,
        quiz: [
          { q: 'Qu\'affiche <code>print("3 + 4")</code> ?', choices: ["7", "3 + 4", "Une erreur"], answer: 1,
            explain: "Entre guillemets, c'est du texte : Python l'affiche tel quel, sans calculer." },
          { q: "Qu'affiche <code>print(2 * 5)</code> ?", choices: ["2 * 5", "10", "25"], answer: 1,
            explain: "Sans guillemets, Python calcule d'abord : 2 × 5 = 10." },
          { q: 'Qu\'affiche <code>print("J\'ai", 2, "chats")</code> ?', choices: ["J'ai2chats", "J'ai 2 chats", "J'ai, 2, chats"], answer: 1,
            explain: "Les virgules séparent les valeurs, et Python met un espace entre chacune à l'affichage." },
        ],
        exercise: {
          task: `<p>Écris un programme qui affiche :</p>
<ul><li>sur la première ligne, exactement <code>Python, c'est parti !</code></li>
<li>sur la deuxième ligne, le nombre d'heures dans une année de 365 jours, <b>calculé par Python</b> (ne l'écris pas toi-même).</li></ul>`,
          starter: `# Écris ton code ici\n`,
          check: `
assert len(lignes) >= 1, "Ton programme n'affiche rien. Utilise print()."
assert lignes[0] == "Python, c'est parti !", "La première ligne doit être exactement : Python, c'est parti ! (attention à l'espace avant le point d'exclamation)."
assert len(lignes) >= 2 and "8760" in lignes[1], "La deuxième ligne doit afficher le nombre d'heures dans une année : 365 jours × 24 heures."
assert "8760" not in code_eleve, "Bien vu, mais laisse Python faire le calcul : écris 365 * 24 au lieu de 8760."
`,
          solution: `print("Python, c\'est parti !")\nprint(365 * 24)`,
        },
      },
      {
        id: "commentaires",
        title: "Laisser des notes dans son code",
        body: `
<p>Tout ce qui suit le caractère <code>#</code> sur une ligne est un <b>commentaire</b>. Python l'ignore complètement : c'est une note pour les humains qui lisent le code (y compris toi dans trois semaines).</p>
<pre># Ce programme calcule le prix d'une pizza à partager
prix = 18          # en euros
print(prix / 3)    # chacun paie sa part</pre>
<h2>À quoi ça sert ?</h2>
<ul>
  <li>Expliquer <b>pourquoi</b> on fait quelque chose, quand ce n'est pas évident.</li>
  <li>Désactiver une ligne sans l'effacer, le temps d'un essai : il suffit de mettre <code>#</code> devant.</li>
</ul>
<p>Un bon commentaire ne répète pas le code. <code>x = 5  # met 5 dans x</code> n'apprend rien à personne.</p>
<p class="note">Dans l'éditeur, une ligne est désactivée par un <code>#</code>. Enlève-le pour qu'elle s'exécute à nouveau.</p>`,
        starter: `# Mon premier programme commenté\nprint("Cette ligne s'affiche")\n# print("Celle-ci est désactivée")\nprint("Fin du programme")  # un commentaire en bout de ligne`,
        quiz: [
          { q: "Que fait Python d'une ligne qui commence par <code>#</code> ?", choices: ["Il l'affiche", "Il l'ignore", "Il s'arrête avec une erreur"], answer: 1,
            explain: "Un commentaire est réservé aux humains. Python passe à la ligne suivante." },
          { q: "Lequel de ces commentaires est le plus utile ?", choices: ["<code>part = prix / 3  # divise par 3</code>", "<code>part = prix / 3  # on est trois à payer</code>"], answer: 1,
            explain: "Le premier répète le code. Le second explique pourquoi on divise par 3." },
        ],
        exercise: {
          task: `<p>Ce programme affiche une ligne de trop. <b>Désactive</b> la ligne qui affiche <code>Mot de passe : 1234</code> avec un commentaire, sans l'effacer. Les deux autres lignes doivent toujours s'afficher.</p>`,
          starter: `print("Connexion au compte de Sam")\nprint("Mot de passe : 1234")\nprint("Bienvenue !")`,
          check: `
assert "Mot de passe" not in sortie, "Le mot de passe s'affiche encore. Mets un # au début de cette ligne."
assert "1234" in code_eleve, "Il ne fallait pas effacer la ligne, seulement la transformer en commentaire avec #."
assert "Connexion au compte de Sam" in sortie and "Bienvenue !" in sortie, "Les deux autres lignes doivent toujours s'afficher."
`,
          solution: `print("Connexion au compte de Sam")\n# print("Mot de passe : 1234")\nprint("Bienvenue !")`,
        },
      },
      {
        id: "variables",
        title: "Ranger des valeurs dans des variables",
        body: `
<p>Une <b>variable</b> est une étiquette posée sur une valeur, pour la retrouver plus tard.
On la crée avec le signe <code>=</code>, qui ne veut pas dire « égal » mais « range ceci sous ce nom ».</p>
<pre>prix = 4
quantite = 3
total = prix * quantite
print(total)</pre>
<p>Python calcule d'abord ce qui est à <b>droite</b> du <code>=</code>, puis colle l'étiquette de <b>gauche</b> sur le résultat.</p>
<h2>Changer la valeur</h2>
<p>On peut redonner une valeur à une variable à tout moment : la nouvelle remplace l'ancienne.</p>
<pre>score = 10
score = score + 5   # on part de l'ancienne valeur
print(score)        # 15</pre>
<h2>Choisir un bon nom</h2>
<ul>
  <li>Il commence par une lettre ou <code>_</code>, jamais par un chiffre.</li>
  <li>Pas d'espace : on écrit <code>prix_total</code>. Évite aussi les accents.</li>
  <li>Majuscules et minuscules comptent : <code>Age</code> et <code>age</code> sont deux variables différentes.</li>
  <li>Un nom parlant (<code>nb_eleves</code>) vaut mieux qu'un nom court (<code>n</code>).</li>
</ul>`,
        starter: `prix = 4\nquantite = 3\ntotal = prix * quantite\nprint("Total :", total)\n\nquantite = 10\nprint("Nouveau total :", prix * quantite)\n\nscore = 10\nscore = score + 5\nprint("Score :", score)`,
        quiz: [
          { q: "Que vaut <code>a</code> après ces deux lignes ?<br><code>a = 3</code><br><code>a = a + 2</code>", choices: ["3", "5", "a + 2"], answer: 1,
            explain: "Python calcule d'abord la droite (3 + 2 = 5), puis range le résultat dans a." },
          { q: "Lequel de ces noms de variable est valide ?", choices: ["<code>2prix</code>", "<code>prix total</code>", "<code>prix_total</code>"], answer: 2,
            explain: "Un nom ne commence pas par un chiffre et ne contient pas d'espace. On les remplace par _." },
          { q: "Dans <code>age = 30</code>, que signifie le signe <code>=</code> ?", choices: ["« age est égal à 30 », comme en maths", "« range 30 sous le nom age »"], answer: 1,
            explain: "En Python, = range une valeur dans une variable. Pour comparer, on utilisera == plus tard." },
        ],
        exercise: {
          task: `<p>Une place de cinéma coûte <code>prix_place</code> euros et vous êtes <code>nb_amis</code> amis.</p>
<ul><li>Crée une variable <code>total</code> qui contient le prix à payer pour tout le groupe, <b>en utilisant les deux variables</b>.</li>
<li>Affiche ce total.</li></ul>`,
          starter: `prix_place = 9\nnb_amis = 4\n\n# Crée la variable total, puis affiche-la\n`,
          check: `
assert total == prix_place * nb_amis, "total ne contient pas le bon montant. Il faut multiplier le prix d'une place par le nombre d'amis."
assert "36" not in code_eleve, "Calcule total à partir des variables prix_place et nb_amis, sans écrire 36 toi-même."
assert str(total) in sortie, "Le calcul est bon, mais il faut aussi afficher total avec print()."
`,
          solution: `prix_place = 9\nnb_amis = 4\n\ntotal = prix_place * nb_amis\nprint(total)`,
        },
      },
      {
        id: "saisie",
        title: "Demander quelque chose à l'utilisateur",
        body: `
<p><code>input()</code> affiche une question, attend une réponse au clavier, puis la renvoie. On range en général cette réponse dans une variable.</p>
<pre>prenom = input("Ton prénom ? ")
print("Salut", prenom)</pre>
<h2>Attention : la réponse est toujours du texte</h2>
<p>Même si l'utilisateur tape <code>25</code>, <code>input()</code> renvoie le <b>texte</b> <code>"25"</code>. Pour calculer avec, il faut le convertir en nombre entier avec <code>int()</code> :</p>
<pre>age = int(input("Ton âge ? "))
print("L'an prochain tu auras", age + 1, "ans")</pre>
<p>Sans <code>int()</code>, <code>age + 1</code> provoquerait une erreur : Python refuse d'additionner du texte et un nombre.</p>
<p class="note">Dans cette appli, le programme ne peut pas t'interrompre pour poser la question. Écris tes réponses à l'avance dans la case <b>Entrées du programme</b>, une réponse par ligne, dans l'ordre des questions.</p>`,
        starter: `prenom = input("Ton prénom ? ")\nannee = int(input("Ton année de naissance ? "))\nprint("Salut", prenom, "! En 2030 tu auras", 2030 - annee, "ans.")`,
        stdin: "Alex\n1995",
        quiz: [
          { q: "L'utilisateur tape <code>8</code>. Que renvoie <code>input()</code> ?", choices: ["Le nombre 8", 'Le texte <code>"8"</code>', "Rien"], answer: 1,
            explain: "input() renvoie toujours du texte, même quand on tape des chiffres." },
          { q: 'Que donne <code>int("8") + 2</code> ?', choices: ["10", '"82"', "Une erreur"], answer: 0,
            explain: "int() transforme le texte \"8\" en nombre 8, et 8 + 2 = 10." },
          { q: 'Et <code>"8" + 2</code> ?', choices: ["10", '"82"', "Une erreur"], answer: 2,
            explain: "Python refuse d'additionner du texte et un nombre : c'est une TypeError." },
        ],
        exercise: {
          task: `<p>Écris un programme qui demande un nombre entier avec <code>input()</code>, puis affiche son <b>double</b>.</p>
<p>Avec l'entrée <code>21</code> déjà remplie, il doit afficher <code>42</code>.</p>`,
          starter: `# Demande un nombre, puis affiche son double\n`,
          stdin: "21",
          check: `
assert "input" in code_eleve, "Utilise input() pour demander le nombre."
assert "int(" in code_eleve, "N'oublie pas int() : la réponse d'input() est du texte."
assert "42" in lignes[-1] if lignes else False, "La dernière ligne affichée doit contenir le double de 21, donc 42."
assert "42" not in code_eleve, "Laisse Python calculer le double au lieu d'écrire 42."
`,
          solution: `nombre = int(input("Un nombre ? "))\nprint(nombre * 2)`,
        },
      },
      {
        id: "erreurs",
        title: "Quand Python n'est pas d'accord",
        body: `
<p>Faire des erreurs fait partie du métier, même pour les pros. Quand Python ne comprend pas, il s'arrête et affiche un message. Ce message est ton meilleur allié : il dit <b>où</b> et <b>quoi</b>.</p>
<pre>Traceback (most recent call last):
  Ton code, line 2, in &lt;module&gt;
NameError: name 'prnt' is not defined</pre>
<p>Lis-le de bas en haut : la <b>dernière ligne</b> donne le type d'erreur, la ligne au-dessus donne le numéro de la ligne fautive.</p>
<h2>Les trois erreurs du débutant</h2>
<ul>
  <li><code>SyntaxError</code> : la phrase est mal construite. Souvent une parenthèse ou un guillemet oublié.</li>
  <li><code>NameError</code> : un nom inconnu. Faute de frappe (<code>prnt</code>), ou variable utilisée avant d'être créée.</li>
  <li><code>TypeError</code> : on mélange des choses incompatibles, comme <code>"5" + 3</code>.</li>
</ul>
<p class="note">Petite astuce : Python lit tout le programme avant de le lancer. Une <code>SyntaxError</code> s\'affiche donc toujours en premier, même si elle est plus bas que les autres erreurs.</p>`,
        quiz: [
          { q: "Dans un message d'erreur, où trouve-t-on le <b>type</b> d'erreur ?", choices: ["Sur la première ligne", "Sur la dernière ligne", "Il n'est pas indiqué"], answer: 1,
            explain: "Lis le message de bas en haut : la dernière ligne dit quoi, celle du dessus dit où." },
          { q: 'Quelle erreur provoque <code>print("Salut)</code> ?', choices: ["SyntaxError", "NameError", "TypeError"], answer: 0,
            explain: "Le guillemet fermant manque : la phrase est mal construite." },
          { q: 'Et <code>prnt("Salut")</code> ?', choices: ["SyntaxError", "NameError", "TypeError"], answer: 1,
            explain: "prnt n'existe pas : Python ne connaît pas ce nom." },
        ],
        exercise: {
          task: `<p>Corrige les <b>deux erreurs</b> de ce programme, pour qu'il affiche :</p>
<pre>J'habite à Lyon
Nombre d'habitants : 520000</pre>`,
          starter: `ville = "Lyon"\nprint("J'habite à", vile)\nprint("Nombre d'habitants :" 520000)`,
          check: `
assert "J'habite à Lyon" in sortie, "La première ligne doit afficher : J'habite à Lyon"
assert "Nombre d'habitants : 520000" in sortie, "La deuxième ligne doit afficher : Nombre d'habitants : 520000"
`,
          solution: `ville = "Lyon"\nprint("J\'habite à", ville)\nprint("Nombre d\'habitants :", 520000)`,
        },
      },
      {
        id: "projet-recu",
        title: "Mini-projet : le ticket de caisse",
        body: `
<p>On met tout ensemble ! Le but : un petit programme de caisse qui demande un article, son prix et la quantité, puis affiche un ticket.</p>
<p>Le code de départ fonctionne déjà pour l'article. À toi de le compléter :</p>
<ul>
  <li>Demande le <b>prix</b> (un nombre entier en euros) et la <b>quantité</b> avec <code>input()</code> et <code>int()</code>.</li>
  <li>Calcule le total dans une variable <code>total</code>.</li>
  <li>Affiche une ligne <code>Total : ... euros</code>.</li>
</ul>
<p>Le ticket attendu, avec les entrées pré-remplies (sous les questions) :</p>
<pre>==== TICKET ====
Article : croissant
Prix : 2 euros
Quantité : 6
Total : 12 euros
================</pre>
<p class="note">Bloqué ? Relis la leçon « Demander quelque chose à l'utilisateur ». Les commentaires <code># À FAIRE</code> te montrent où écrire.</p>`,
        quiz: [
          { q: "Pourquoi écrit-on <code>int(input(...))</code> pour le prix ?", choices: ["Pour arrondir le prix", "Parce qu'input() renvoie du texte et qu'on veut calculer", "C'est obligatoire pour toute question"], answer: 1,
            explain: "Sans int(), prix * quantite multiplierait du texte, ce qui ne donne pas le bon résultat." },
        ],
        exercise: {
          task: `<p>Complète le programme pour qu'il affiche le ticket ci-dessus. Le total doit être <b>calculé</b> dans une variable <code>total</code>.</p>`,
          starter: `article = input("Article ? ")\n# À FAIRE : demander le prix\n# À FAIRE : demander la quantité\n# À FAIRE : calculer le total\n\nprint("==== TICKET ====")\nprint("Article :", article)\n# À FAIRE : afficher le prix, la quantité et le total\nprint("================")`,
          stdin: "croissant\n2\n6",
          check: `
assert "Article : croissant" in sortie, "Le ticket doit afficher la ligne : Article : croissant"
assert "Prix : 2 euros" in sortie, "Il manque la ligne : Prix : 2 euros"
assert "Quantité : 6" in sortie, "Il manque la ligne : Quantité : 6"
assert total == 12, "La variable total doit contenir prix × quantité."
assert "Total : 12 euros" in sortie, "Il manque la ligne : Total : 12 euros"
assert "12" not in code_eleve, "Laisse Python calculer le total au lieu d'écrire 12."
`,
          solution: `article = input("Article ? ")\nprix = int(input("Prix ? "))\nquantite = int(input("Quantité ? "))\ntotal = prix * quantite\n\nprint("==== TICKET ====")\nprint("Article :", article)\nprint("Prix :", prix, "euros")\nprint("Quantité :", quantite)\nprint("Total :", total, "euros")\nprint("================")`,
        },
      },
    ],
  };

  // ============================================================
  // PROGRAMME COMPLET
  // ============================================================
  window.COURSE = {
    levels: [
      {
        id: "debutant",
        num: 1,
        title: "Débutant",
        intro: "Les bases : afficher, calculer, décider et répéter.",
        modules: [
          premiersPas,
          {
            id: "types",
            title: "Nombres et textes",
            intro: "Calculer, manipuler du texte et passer de l'un à l'autre.",
            lessons: [
              L("operations", "Les opérations de base"),
              L("division", "Division entière et reste"),
              L("decimaux", "Les nombres décimaux"),
              L("chaines", "Le texte en Python"),
              L("fstrings", "Assembler du texte avec les f-strings"),
              L("conversions", "Passer d'un type à l'autre"),
            ],
          },
          {
            id: "conditions",
            title: "Prendre des décisions",
            intro: "Faire réagir son programme selon la situation.",
            lessons: [
              L("comparaisons", "Comparer deux valeurs"),
              L("if", "Si… sinon…"),
              L("elif", "Plusieurs cas avec elif"),
              L("logique", "Combiner avec and, or, not"),
              L("projet-quiz", "Mini-projet : un quiz de culture générale"),
            ],
          },
          {
            id: "boucles",
            title: "Répéter des actions",
            intro: "Laisser l'ordinateur faire le travail répétitif.",
            lessons: [
              L("while", "Tant que… : la boucle while"),
              L("for-range", "Compter avec for et range"),
              L("break-continue", "Sortir ou sauter un tour"),
              L("imbriquees", "Des boucles dans des boucles"),
              L("projet-devine", "Mini-projet : deviner le nombre"),
            ],
          },
          {
            id: "listes-intro",
            title: "Premières listes",
            intro: "Garder plusieurs valeurs sous un seul nom.",
            lessons: [
              L("creer", "Créer une liste"),
              L("indices", "Accéder à un élément"),
              L("modifier", "Ajouter, retirer, modifier"),
              L("parcourir", "Parcourir une liste"),
              L("projet-courses", "Mini-projet : la liste de courses"),
            ],
          },
        ],
      },
      {
        id: "intermediaire",
        num: 2,
        title: "Intermédiaire",
        intro: "Organiser son code et manipuler des données plus riches.",
        modules: [
          {
            id: "fonctions",
            title: "Fonctions",
            intro: "Découper un programme en blocs réutilisables.",
            lessons: [
              L("def", "Créer sa première fonction"),
              L("parametres", "Donner des informations à une fonction"),
              L("return", "Renvoyer un résultat"),
              L("defauts", "Valeurs par défaut et arguments nommés"),
              L("portee", "Variables locales et globales"),
              L("projet-convertisseur", "Mini-projet : un convertisseur d'unités"),
            ],
          },
          {
            id: "collections",
            title: "Listes, tuples, dictionnaires, ensembles",
            intro: "Choisir la bonne structure pour ranger ses données.",
            lessons: [
              L("tranches", "Découper une liste en tranches"),
              L("tri", "Trier et chercher"),
              L("tuples", "Les tuples"),
              L("dicos", "Les dictionnaires"),
              L("ensembles", "Les ensembles"),
              L("projet-repertoire", "Mini-projet : un répertoire téléphonique"),
            ],
          },
          {
            id: "texte",
            title: "Travailler le texte",
            intro: "Découper, nettoyer et mettre en forme des chaînes.",
            lessons: [
              L("methodes", "Les méthodes utiles des chaînes"),
              L("split-join", "Couper et recoller avec split et join"),
              L("formatage", "Mettre en forme nombres et colonnes"),
              L("projet-mots", "Mini-projet : compter les mots d'un texte"),
            ],
          },
          {
            id: "erreurs",
            title: "Gérer les erreurs",
            intro: "Prévoir l'imprévu au lieu de planter.",
            lessons: [
              L("traceback", "Lire un message d'erreur en détail"),
              L("try", "Attraper une erreur avec try / except"),
              L("raise", "Signaler une erreur avec raise"),
              L("projet-saisie", "Mini-projet : une saisie à toute épreuve"),
            ],
          },
          {
            id: "fichiers",
            title: "Lire et écrire des fichiers",
            intro: "Garder des données d'une exécution à l'autre.",
            lessons: [
              L("ecrire", "Écrire dans un fichier"),
              L("lire", "Lire un fichier"),
              L("with", "Le bloc with"),
              L("csv", "Les fichiers CSV"),
            ],
          },
          {
            id: "modules",
            title: "Modules",
            intro: "Utiliser le code des autres et partager le sien.",
            lessons: [
              L("import", "Importer un module"),
              L("math-random", "math et random"),
              L("propre-module", "Créer son propre module"),
              L("projet-des", "Mini-projet : un lanceur de dés"),
            ],
          },
        ],
      },
      {
        id: "avance",
        num: 3,
        title: "Avancé",
        intro: "Programmation objet, techniques puissantes et code de qualité.",
        modules: [
          {
            id: "objets",
            title: "Classes et objets",
            intro: "Créer ses propres types de données.",
            lessons: [
              L("classes", "Créer une classe"),
              L("init", "Le constructeur __init__"),
              L("methodes", "Les méthodes"),
              L("heritage", "L'héritage"),
              L("speciales", "Les méthodes spéciales"),
              L("projet-banque", "Mini-projet : un compte bancaire"),
            ],
          },
          {
            id: "comprehensions",
            title: "Compréhensions et générateurs",
            intro: "Transformer des données en une ligne, sans gaspiller la mémoire.",
            lessons: [
              L("listes", "Les compréhensions de liste"),
              L("dicos-ensembles", "Compréhensions de dictionnaire et d'ensemble"),
              L("generateurs", "Les générateurs et yield"),
              L("iterateurs", "Comment marche une boucle for"),
            ],
          },
          {
            id: "fonctions-avancees",
            title: "Fonctions avancées",
            intro: "Les fonctions comme des valeurs à part entière.",
            lessons: [
              L("lambda", "Les fonctions lambda"),
              L("args-kwargs", "*args et **kwargs"),
              L("closures", "Les fonctions dans des fonctions"),
              L("decorateurs", "Les décorateurs"),
            ],
          },
          {
            id: "stdlib",
            title: "La bibliothèque standard",
            intro: "Les outils fournis avec Python.",
            lessons: [
              L("collections", "Counter, defaultdict et compagnie"),
              L("itertools", "enumerate, zip et itertools"),
              L("datetime", "Dates et heures"),
              L("json", "Le format JSON"),
              L("regex", "Les expressions régulières"),
            ],
          },
          {
            id: "qualite",
            title: "Écrire du code de qualité",
            intro: "Un code lisible, documenté et testé.",
            lessons: [
              L("style", "Le style Python (PEP 8)"),
              L("docstrings", "Documenter avec les docstrings"),
              L("typage", "Les annotations de type"),
              L("dataclasses", "Les dataclasses"),
              L("tests", "Tester son code avec assert"),
              L("projet-final", "Projet final : un gestionnaire de tâches"),
            ],
          },
        ],
      },
    ],
  };

  // Les leçons rédigées des autres modules sont dans js/lecons/<module>.js
  // (chargés avant ce fichier). On les fusionne ici avec le programme.
  const extra = window.LECONS || {};
  for (const lv of window.COURSE.levels) {
    for (const mo of lv.modules) {
      const src = extra[mo.id];
      if (!src) continue;
      mo.lessons = mo.lessons.map((le) => (src[le.id] ? Object.assign({}, le, src[le.id]) : le));
    }
  }
})();
