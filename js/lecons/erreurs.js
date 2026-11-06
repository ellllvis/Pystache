// Niveau 2 · Module « Gérer les erreurs »
(window.LECONS = window.LECONS || {})["erreurs"] = {
  traceback: {
    body: `
<p>Quand une erreur se produit dans une fonction appelée par une autre fonction, Python affiche un <b>traceback</b> : la pile des appels qui ont mené à l'erreur.</p>
<pre>Traceback (most recent call last):
  Ton code, line 7, in &lt;module&gt;
    afficher_moyenne([])
  Ton code, line 5, in afficher_moyenne
    print(moyenne(notes))
  Ton code, line 2, in moyenne
    return sum(notes) / len(notes)
ZeroDivisionError: division by zero</pre>
<p>Lis-le comme une histoire : le programme principal (ligne 7) a appelé <code>afficher_moyenne</code>, qui a appelé <code>moyenne</code>, qui a planté ligne 2. La <b>dernière ligne</b> dit pourquoi.</p>
<h2>Les erreurs à connaître</h2>
<ul>
  <li><code>ZeroDivisionError</code> : division par zéro.</li>
  <li><code>ValueError</code> : bon type, mauvaise valeur, comme <code>int("abc")</code>.</li>
  <li><code>IndexError</code> : indice hors de la liste.</li>
  <li><code>KeyError</code> : clé absente d'un dictionnaire.</li>
  <li><code>TypeError</code> : opération impossible entre ces types.</li>
  <li><code>AttributeError</code> : méthode inexistante, comme <code>"abc".push()</code>.</li>
</ul>`,
    starter: `def moyenne(notes):
    return sum(notes) / len(notes)

def afficher_moyenne(notes):
    print(moyenne(notes))

afficher_moyenne([12, 14])
afficher_moyenne([])`,
    demoError: true,
    quiz: [
      { q: 'Quelle erreur provoque <code>{"a": 1}["b"]</code> ?', choices: ["IndexError", "KeyError", "ValueError"], answer: 1,
        explain: "La clé b n'existe pas dans le dictionnaire." },
      { q: 'Quelle erreur provoque <code>int("douze")</code> ?', choices: ["TypeError", "ValueError", "NameError"], answer: 1,
        explain: "int accepte bien du texte, mais pas cette valeur-là." },
      { q: "Dans un traceback, l'appel le plus récent est…", choices: ["en haut", "en bas, juste avant le type d'erreur"], answer: 1,
        explain: "« most recent call last » : le dernier appel est en bas." },
    ],
    exercise: {
      task: `<p>Ce programme a deux problèmes. Il plante à la fin : lis le traceback pour trouver la ligne fautive, et corrige-la (par exemple avec <code>.get()</code>). Et le prix moyen affiché est faux : trouve la fonction responsable, pour que le programme affiche <code>Prix moyen : 7.5</code>.</p>`,
      starter: `def total(prix):
    somme = 0
    for p in prix:
        somme += p
    return somme

def moyenne(prix):
    return total(prix) / len(prix) - 1

def rapport(catalogue):
    prix = list(catalogue.values())
    print("Prix moyen :", moyenne(prix))

catalogue = {"stylo": 2, "cahier": 5, "sac": 15.5}
rapport(catalogue)
print(catalogue["règle"])`,
      check: `
assert moyenne([2, 4]) == 3, "La fonction moyenne contient une erreur de calcul : il ne faut pas soustraire 1."
assert "Prix moyen : 7.5" in sortie, "Le programme doit afficher Prix moyen : 7.5"
`,
      solution: `def total(prix):
    somme = 0
    for p in prix:
        somme += p
    return somme

def moyenne(prix):
    return total(prix) / len(prix)

def rapport(catalogue):
    prix = list(catalogue.values())
    print("Prix moyen :", moyenne(prix))

catalogue = {"stylo": 2, "cahier": 5, "sac": 15.5}
rapport(catalogue)
print(catalogue.get("règle", "pas de règle"))`,
    },
  },

  try: {
    body: `
<p>Certaines erreurs sont prévisibles : un utilisateur qui tape « douze » au lieu de 12, un fichier absent… Plutôt que de laisser le programme planter, on peut les <b>attraper</b> avec <code>try</code> / <code>except</code> :</p>
<pre>texte = "douze"
try:
    nombre = int(texte)
    print("Merci !")
except ValueError:
    print("Ce n'est pas un nombre.")</pre>
<p>Python essaie le bloc <code>try</code>. Si une <code>ValueError</code> survient, il saute directement au bloc <code>except</code> au lieu de s'arrêter.</p>
<h2>Les blocs facultatifs</h2>
<pre>try:
    resultat = 10 / diviseur
except ZeroDivisionError:
    print("Division par zéro")
else:
    print("Résultat :", resultat)   # seulement si tout s'est bien passé
finally:
    print("Fin du calcul")          # dans tous les cas</pre>
<p class="note">Attrape toujours une erreur <b>précise</b>. Un <code>except:</code> tout seul cacherait aussi les vraies erreurs de programmation, ce qui rend les bugs très difficiles à trouver.</p>`,
    starter: `for texte in ["12", "douze", "7"]:
    try:
        nombre = int(texte)
    except ValueError:
        print(f"'{texte}' n'est pas un nombre")
    else:
        print("Le double est", nombre * 2)`,
    quiz: [
      { q: "Quand le bloc <code>else</code> d'un try s'exécute-t-il ?", choices: ["Toujours", "Seulement s'il n'y a pas eu d'erreur", "Seulement s'il y a eu une erreur"], answer: 1,
        explain: "else s'exécute quand le try s'est déroulé sans erreur." },
      { q: "Pourquoi éviter <code>except:</code> sans type d'erreur ?", choices: ["C'est plus lent", "Il cacherait aussi les erreurs qu'on n'avait pas prévues", "Ce n'est pas autorisé"], answer: 1,
        explain: "Il vaut mieux attraper seulement les erreurs qu'on sait gérer." },
    ],
    exercise: {
      task: `<p>Écris <code>division_sure(a, b)</code> qui renvoie <code>a / b</code>, ou <code>None</code> si <code>b</code> vaut zéro. Utilise <code>try</code> / <code>except</code>, sans <code>if</code>.</p>
<p>Puis écris <code>en_nombre(texte)</code> qui renvoie le texte converti en <code>float</code>, ou <code>None</code> si la conversion est impossible.</p>`,
      starter: `def division_sure(a, b):
    pass

def en_nombre(texte):
    pass

print(division_sure(10, 4), division_sure(1, 0))
print(en_nombre("3.5"), en_nombre("trois"))
`,
      check: `
assert "try" in code_eleve and "except" in code_eleve, "Utilise try / except."
assert division_sure(10, 4) == 2.5, "division_sure(10, 4) doit renvoyer 2.5."
assert division_sure(1, 0) is None, "division_sure(1, 0) doit renvoyer None."
assert en_nombre("3.5") == 3.5, 'en_nombre("3.5") doit renvoyer 3.5.'
assert en_nombre("trois") is None, 'en_nombre("trois") doit renvoyer None (attrape ValueError).'
`,
      solution: `def division_sure(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None

def en_nombre(texte):
    try:
        return float(texte)
    except ValueError:
        return None

print(division_sure(10, 4), division_sure(1, 0))
print(en_nombre("3.5"), en_nombre("trois"))`,
    },
  },

  raise: {
    body: `
<p>Tes propres fonctions peuvent aussi <b>signaler</b> une erreur avec <code>raise</code>, quand on leur donne une valeur qui n'a pas de sens :</p>
<pre>def retirer(solde, montant):
    if montant <= 0:
        raise ValueError("Le montant doit être positif")
    if montant > solde:
        raise ValueError("Solde insuffisant")
    return solde - montant</pre>
<p>C'est mieux que de renvoyer une valeur bizarre ou d'afficher un message : le code qui appelle la fonction peut décider quoi faire grâce à <code>try</code>.</p>
<pre>try:
    solde = retirer(50, 80)
except ValueError as e:
    print("Opération refusée :", e)</pre>
<p><code>as e</code> récupère l'erreur elle-même. L'afficher donne le message passé à <code>raise</code>.</p>`,
    starter: `def retirer(solde, montant):
    if montant <= 0:
        raise ValueError("Le montant doit être positif")
    if montant > solde:
        raise ValueError("Solde insuffisant")
    return solde - montant

print(retirer(100, 30))
for m in [80, -5]:
    try:
        retirer(50, m)
    except ValueError as e:
        print("Opération refusée :", e)`,
    quiz: [
      { q: "Que fait <code>raise ValueError(\"...\")</code> ?", choices: ["Affiche un avertissement et continue", "Déclenche une erreur qui arrête la fonction", "Ignore la ligne"], answer: 1,
        explain: "raise déclenche l'erreur. Elle remonte jusqu'à un try qui l'attrape, ou arrête le programme." },
      { q: "Dans <code>except ValueError as e:</code>, que contient <code>e</code> ?", choices: ["Le numéro de ligne", "L'erreur, avec son message", "True"], answer: 1,
        explain: "str(e) donne le message passé à raise." },
    ],
    exercise: {
      task: `<p>Écris <code>creer_age(valeur)</code> qui convertit <code>valeur</code> en entier et le renvoie, mais :</p>
<ul><li>lève <code>ValueError("âge négatif")</code> si l'âge est négatif ;</li>
<li>lève <code>ValueError("âge irréaliste")</code> s'il dépasse 130.</li></ul>
<p>Si la valeur n'est pas un nombre, laisse <code>int()</code> lever sa propre <code>ValueError</code>.</p>`,
      starter: `def creer_age(valeur):
    pass

print(creer_age("42"))
`,
      check: `
assert creer_age("42") == 42 and creer_age(0) == 0, 'creer_age("42") doit renvoyer 42.'
def erreur(v):
    try:
        creer_age(v)
    except ValueError as e:
        return str(e)
    return None
assert erreur("-3") == "âge négatif", 'creer_age("-3") doit lever ValueError("âge négatif").'
assert erreur(200) == "âge irréaliste", 'creer_age(200) doit lever ValueError("âge irréaliste").'
assert erreur("abc") is not None, 'creer_age("abc") doit lever une ValueError.'
assert "raise" in code_eleve, "Utilise raise."
`,
      solution: `def creer_age(valeur):
    age = int(valeur)
    if age < 0:
        raise ValueError("âge négatif")
    if age > 130:
        raise ValueError("âge irréaliste")
    return age

print(creer_age("42"))`,
    },
  },

  "projet-saisie": {
    body: `
<p>Un programme sérieux ne plante pas quand l'utilisateur se trompe : il explique le problème et redemande. On combine pour ça une boucle <code>while True</code> et un <code>try</code> :</p>
<pre>while True:
    texte = input("Ton âge ? ")
    try:
        age = int(texte)
    except ValueError:
        print("Merci d'écrire un nombre entier.")
        continue
    if age < 0:
        print("L'âge ne peut pas être négatif.")
        continue
    break
print("Âge enregistré :", age)</pre>
<p>On peut en faire une fonction réutilisable, avec des bornes en paramètres. Elle servira dans tous tes futurs programmes.</p>`,
    quiz: [
      { q: "Dans la boucle ci-dessus, à quoi sert <code>continue</code> après un message d'erreur ?", choices: ["À sortir de la boucle", "À reposer la question", "À ignorer l'erreur et garder la valeur"], answer: 1,
        explain: "continue revient au début de la boucle, donc au input." },
    ],
    exercise: {
      task: `<p>Écris <code>demander_entier(question, minimum, maximum)</code> qui repose la question jusqu'à obtenir un entier entre <code>minimum</code> et <code>maximum</code> inclus, puis le <b>renvoie</b>.</p>
<ul><li>Si ce n'est pas un nombre, affiche <code>Ce n'est pas un nombre entier.</code></li>
<li>S'il est hors limites, affiche <code>Entre 1 et 10, s'il te plaît.</code> (avec les vraies bornes).</li></ul>
<p>Le programme appelle ensuite <code>note = demander_entier("Note sur 10 ? ", 1, 10)</code> et affiche la note.</p>`,
      starter: `def demander_entier(question, minimum, maximum):
    pass

note = demander_entier("Note sur 10 ? ", 1, 10)
print("Note :", note)
`,
      stdin: "huit\n15\n0\n8",
      check: `
assert note == 8, "Avec les entrées huit, 15, 0 puis 8, la fonction doit renvoyer 8."
assert "Ce n'est pas un nombre entier." in sortie, "Après « huit », affiche : Ce n'est pas un nombre entier."
assert sortie.count("Entre 1 et 10, s'il te plaît.") == 2, "Après 15 et après 0, affiche : Entre 1 et 10, s'il te plaît."
assert "try" in code_eleve, "Utilise try / except pour la conversion."
`,
      solution: `def demander_entier(question, minimum, maximum):
    while True:
        texte = input(question)
        try:
            n = int(texte)
        except ValueError:
            print("Ce n'est pas un nombre entier.")
            continue
        if minimum <= n <= maximum:
            return n
        print(f"Entre {minimum} et {maximum}, s'il te plaît.")

note = demander_entier("Note sur 10 ? ", 1, 10)
print("Note :", note)`,
    },
  },
};
