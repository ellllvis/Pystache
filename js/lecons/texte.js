// Niveau 2 · Module « Travailler le texte »
(window.LECONS = window.LECONS || {})["texte"] = {
  methodes: {
    body: `
<p>Les chaînes ont de nombreuses <b>méthodes</b>, des fonctions qu'on appelle avec un point après la chaîne. Les plus utiles :</p>
<div class="table-wrap"><table>
<tr><th>Méthode</th><th>Exemple</th><th>Résultat</th></tr>
<tr><td><code>upper()</code> / <code>lower()</code></td><td><code>"Salut".upper()</code></td><td><code>"SALUT"</code></td></tr>
<tr><td><code>capitalize()</code></td><td><code>"paris".capitalize()</code></td><td><code>"Paris"</code></td></tr>
<tr><td><code>strip()</code></td><td><code>"  oui  ".strip()</code></td><td><code>"oui"</code></td></tr>
<tr><td><code>replace(a, b)</code></td><td><code>"2-1-0".replace("-", "/")</code></td><td><code>"2/1/0"</code></td></tr>
<tr><td><code>startswith()</code> / <code>endswith()</code></td><td><code>"photo.png".endswith(".png")</code></td><td><code>True</code></td></tr>
<tr><td><code>find(x)</code></td><td><code>"banane".find("n")</code></td><td><code>2</code> (ou -1 si absent)</td></tr>
<tr><td><code>count(x)</code></td><td><code>"banane".count("a")</code></td><td><code>2</code></td></tr>
</table></div>
<p class="note">Une chaîne est <b>non modifiable</b>. Ces méthodes renvoient une nouvelle chaîne : il faut la ranger quelque part, par exemple <code>nom = nom.strip()</code>.</p>
<p>On peut enchaîner les méthodes : <code>saisie.strip().lower()</code> enlève les espaces, puis met en minuscules.</p>`,
    starter: `saisie = "   Bonjour LE Monde  "
print(f"[{saisie.strip()}]")
print(saisie.strip().lower())
print(saisie.strip().capitalize())
print("2026-11-06".replace("-", "/"))
print("photo.png".endswith(".png"))
print("banane".find("n"), "banane".count("a"))`,
    quiz: [
      { q: 'Après <code>s = " Oui "</code> puis <code>s.strip()</code>, que vaut <code>s</code> ?', choices: ['"Oui"', '" Oui "', "None"], answer: 1,
        explain: "strip renvoie une nouvelle chaîne, mais on ne l'a rangée nulle part : s n'a pas changé." },
      { q: 'Que vaut <code>"abc".find("z")</code> ?', choices: ["0", "-1", "Une erreur"], answer: 1,
        explain: "find renvoie -1 quand le texte cherché est absent." },
    ],
    exercise: {
      task: `<p>Écris <code>nettoyer_email(email)</code> qui renvoie l'adresse sans espaces autour et tout en minuscules, et <code>est_valide(email)</code> qui renvoie <code>True</code> si l'adresse nettoyée contient <b>exactement un</b> <code>@</code> et se termine par <code>.fr</code> ou <code>.com</code>.</p>`,
      starter: `def nettoyer_email(email):
    pass

def est_valide(email):
    pass

print(nettoyer_email("  Sami.K@Mail.FR "))
print(est_valide("  Sami.K@Mail.FR "))
`,
      check: `
assert nettoyer_email("  Sami.K@Mail.FR ") == "sami.k@mail.fr", 'nettoyer_email("  Sami.K@Mail.FR ") doit renvoyer "sami.k@mail.fr".'
assert est_valide("  Sami.K@Mail.FR ") is True, "Cette adresse est valide une fois nettoyée."
assert est_valide("a@b.com") is True, "a@b.com est valide."
assert est_valide("sans-arobase.fr") is False, "Une adresse sans @ n'est pas valide."
assert est_valide("a@@b.fr") is False, "Une adresse avec deux @ n'est pas valide (utilise count)."
assert est_valide("a@b.org") is False, "Seules les adresses en .fr ou .com sont acceptées."
`,
      solution: `def nettoyer_email(email):
    return email.strip().lower()

def est_valide(email):
    e = nettoyer_email(email)
    return e.count("@") == 1 and (e.endswith(".fr") or e.endswith(".com"))

print(nettoyer_email("  Sami.K@Mail.FR "))
print(est_valide("  Sami.K@Mail.FR "))`,
    },
  },

  "split-join": {
    body: `
<p><code>split()</code> découpe une chaîne en liste. Sans argument, il coupe sur les espaces ; avec un argument, sur le séparateur donné :</p>
<pre>phrase = "le chat dort"
print(phrase.split())          # ['le', 'chat', 'dort']

ligne = "Lina;27;Lyon"
print(ligne.split(";"))        # ['Lina', '27', 'Lyon']</pre>
<p><code>join()</code> fait l'inverse : il recolle une liste de chaînes, avec le séparateur placé <b>avant</b> le point :</p>
<pre>mots = ["un", "deux", "trois"]
print(" - ".join(mots))        # un - deux - trois
print("".join(mots))           # undeuxtrois</pre>
<p class="note"><code>join</code> n'accepte que des chaînes. Pour des nombres, il faut d'abord les convertir : <code>", ".join(str(n) for n in nombres)</code>.</p>`,
    starter: `phrase = "le chat dort"
print(phrase.split())

ligne = "Lina;27;Lyon"
nom, age, ville = ligne.split(";")
print(nom, int(age) + 1, ville)

mots = ["un", "deux", "trois"]
print(" - ".join(mots))
print(", ".join(str(n) for n in [1, 2, 3]))`,
    quiz: [
      { q: 'Que donne <code>"a,b,,c".split(",")</code> ?', choices: ["['a', 'b', 'c']", "['a', 'b', '', 'c']", "['a,b,,c']"], answer: 1,
        explain: "Entre les deux virgules, il y a une chaîne vide." },
      { q: 'Que donne <code>"-".join(["2026", "11", "06"])</code> ?', choices: ['"2026-11-06"', '"-2026-11-06"', "['2026-11-06']"], answer: 0,
        explain: "Le séparateur est placé entre les éléments." },
    ],
    exercise: {
      task: `<p>Écris <code>initiales(nom_complet)</code> qui renvoie les initiales en majuscules, séparées par des points.</p>
<p>Par exemple <code>initiales("ada lovelace")</code> renvoie <code>"A.L."</code> et <code>initiales("Jean Paul Sartre")</code> renvoie <code>"J.P.S."</code>.</p>`,
      starter: `def initiales(nom_complet):
    pass  # remplace cette ligne

print(initiales("ada lovelace"))
`,
      check: `
assert initiales("ada lovelace") == "A.L.", 'initiales("ada lovelace") doit renvoyer "A.L."'
assert initiales("Jean Paul Sartre") == "J.P.S.", 'initiales("Jean Paul Sartre") doit renvoyer "J.P.S."'
assert initiales("  grace   hopper ") == "G.H.", 'Les espaces en trop doivent être ignorés : split() sans argument le fait tout seul.'
assert "split" in code_eleve, "Utilise split()."
`,
      solution: `def initiales(nom_complet):
    mots = nom_complet.split()
    return "".join(m[0].upper() + "." for m in mots)

print(initiales("ada lovelace"))`,
    },
  },

  formatage: {
    body: `
<p>Les f-strings savent bien plus qu'insérer une valeur. Après <code>:</code>, on décrit la mise en forme :</p>
<div class="table-wrap"><table>
<tr><th>Format</th><th>Exemple</th><th>Résultat</th></tr>
<tr><td><code>.2f</code></td><td><code>f"{3.14159:.2f}"</code></td><td><code>3.14</code></td></tr>
<tr><td><code>,</code></td><td><code>f"{1234567:,}"</code></td><td><code>1,234,567</code></td></tr>
<tr><td><code>%</code></td><td><code>f"{0.256:.1%}"</code></td><td><code>25.6%</code></td></tr>
<tr><td><code>&lt;10</code></td><td><code>f"[{'ab':&lt;6}]"</code></td><td><code>[ab    ]</code></td></tr>
<tr><td><code>&gt;10</code></td><td><code>f"[{'ab':&gt;6}]"</code></td><td><code>[    ab]</code></td></tr>
<tr><td><code>^10</code></td><td><code>f"[{'ab':^6}]"</code></td><td><code>[  ab  ]</code></td></tr>
<tr><td><code>03</code></td><td><code>f"{7:03}"</code></td><td><code>007</code></td></tr>
</table></div>
<p>L'alignement sert à faire des tableaux bien rangés :</p>
<pre>print(f"{'Article':<10}{'Prix':>8}")
print(f"{'Café':<10}{2.5:>8.2f}")
print(f"{'Croissant':<10}{1.2:>8.2f}")</pre>`,
    starter: `print(f"{3.14159:.2f}")
print(f"{1234567:,}")
print(f"{0.256:.1%}")
print(f"{7:03}")

print(f"{'Article':<10}{'Prix':>8}")
print(f"{'Café':<10}{2.5:>8.2f}")
print(f"{'Croissant':<10}{1.2:>8.2f}")`,
    quiz: [
      { q: "Que donne <code>f\"{5:03}\"</code> ?", choices: ["5", "005", "500"], answer: 1,
        explain: "03 complète avec des zéros jusqu'à 3 caractères." },
      { q: "Que donne <code>f\"{0.5:.0%}\"</code> ?", choices: ["0.5%", "50%", "5%"], answer: 1,
        explain: "% multiplie par 100 et ajoute le signe %." },
    ],
    exercise: {
      task: `<p>Affiche le tableau des scores ci-dessous, avec le nom aligné à gauche sur 8 caractères et le score aligné à droite sur 5 caractères :</p>
<pre>Nina       120
Omar        95
Jo        1040</pre>
<p>Utilise une boucle sur le dictionnaire <code>scores</code>.</p>`,
      starter: `scores = {"Nina": 120, "Omar": 95, "Jo": 1040}

`,
      check: `
attendu = [f"{n:<8}{s:>5}" for n, s in scores.items()]
vraies = [l for l in sortie.split("\\n") if l.strip()]
assert "for" in code_eleve, "Utilise une boucle for sur scores.items()."
assert vraies == attendu, "Le tableau n'est pas bien aligné. Utilise f\\"{nom:<8}{score:>5}\\"."
`,
      solution: `scores = {"Nina": 120, "Omar": 95, "Jo": 1040}

for nom, score in scores.items():
    print(f"{nom:<8}{score:>5}")`,
    },
  },

  "projet-mots": {
    body: `
<p>Compter les mots d'un texte est un grand classique de l'analyse de texte. Il faut :</p>
<ol>
  <li>mettre le texte en minuscules, pour que « Le » et « le » comptent comme le même mot ;</li>
  <li>enlever la ponctuation ;</li>
  <li>découper en mots avec <code>split()</code> ;</li>
  <li>compter avec un dictionnaire.</li>
</ol>
<p>Pour enlever la ponctuation, une boucle sur les signes avec <code>replace</code> suffit :</p>
<pre>for signe in ".,;:!?'":
    texte = texte.replace(signe, " ")</pre>
<p>Pour trouver les mots les plus fréquents, on trie les paires (mot, nombre) selon le nombre :</p>
<pre>sorted(compte.items(), key=lambda p: p[1], reverse=True)</pre>
<p class="note"><code>lambda p: p[1]</code> est une mini-fonction qui renvoie le deuxième élément de la paire. On l'étudiera au niveau Avancé.</p>`,
    quiz: [
      { q: "Pourquoi mettre le texte en minuscules avant de compter ?", choices: ["Pour aller plus vite", "Pour que « Chat » et « chat » soient le même mot", "split() ne marche qu'en minuscules"], answer: 1,
        explain: "Sinon, les majuscules en début de phrase créeraient des mots différents." },
    ],
    exercise: {
      task: `<p>Écris <code>compter_mots(texte)</code> qui renvoie un dictionnaire mot → nombre d'apparitions, en ignorant les majuscules et la ponctuation <code>. , ; : ! ? '</code>.</p>
<p>Puis affiche les 3 mots les plus fréquents du texte, un par ligne, sous la forme <code>le : 4</code>.</p>`,
      starter: `texte = """Le chat dort. Le chien joue avec le chat !
Le soir, le chien dort aussi."""

def compter_mots(texte):
    pass

`,
      check: `
c = compter_mots("Le chat, le CHAT ! Un chien.")
assert c == {"le": 2, "chat": 2, "un": 1, "chien": 1}, 'compter_mots("Le chat, le CHAT ! Un chien.") doit renvoyer {"le": 2, "chat": 2, "un": 1, "chien": 1}.'
assert compter_mots("l'arbre")["arbre"] == 1, "L'apostrophe doit aussi être traitée comme une séparation."
assert "le : 5" in lignes, "Le mot le plus fréquent est « le » (5 fois) : affiche le : 5"
assert len([l for l in lignes if " : " in l]) == 3, "Affiche exactement les 3 mots les plus fréquents."
`,
      solution: `texte = """Le chat dort. Le chien joue avec le chat !
Le soir, le chien dort aussi."""

def compter_mots(texte):
    texte = texte.lower()
    for signe in ".,;:!?'":
        texte = texte.replace(signe, " ")
    compte = {}
    for mot in texte.split():
        compte[mot] = compte.get(mot, 0) + 1
    return compte

compte = compter_mots(texte)
top = sorted(compte.items(), key=lambda p: p[1], reverse=True)[:3]
for mot, n in top:
    print(f"{mot} : {n}")`,
    },
  },
};
