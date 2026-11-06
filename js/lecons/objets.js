// Niveau 3 · Module « Classes et objets »
(window.LECONS = window.LECONS || {})["objets"] = {
  classes: {
    body: `
<p>Jusqu'ici, tu as utilisé des types fournis par Python : <code>int</code>, <code>str</code>, <code>list</code>, <code>dict</code>… Une <b>classe</b> permet de créer <b>ton propre type</b>.</p>
<p>La classe est le plan de construction. Chaque <b>objet</b> (on dit aussi une <b>instance</b>) est une chose construite à partir de ce plan.</p>
<pre>class Chien:
    pass

rex = Chien()        # un premier objet
medor = Chien()      # un deuxième, indépendant
rex.nom = "Rex"      # on lui attache une donnée : un attribut
print(rex.nom)</pre>
<ul>
  <li>Par convention, un nom de classe commence par une majuscule : <code>Chien</code>, <code>CompteBancaire</code>.</li>
  <li>On crée un objet en appelant la classe comme une fonction : <code>Chien()</code>.</li>
  <li>Un objet porte des <b>attributs</b> (ses données), auxquels on accède avec un point.</li>
</ul>
<p>En fait, tout est objet en Python : <code>"abc".upper()</code> appelle une méthode de l'objet <code>"abc"</code>, de classe <code>str</code>.</p>`,
    starter: `class Chien:
    pass

rex = Chien()
medor = Chien()
rex.nom = "Rex"
medor.nom = "Médor"
print(rex.nom, medor.nom)
print(type(rex))
print(isinstance(rex, Chien))
print(type("abc"), type([1, 2]))`,
    quiz: [
      { q: "Quelle est la différence entre une classe et un objet ?", choices: ["Aucune", "La classe est le plan, l'objet est une chose construite selon ce plan", "L'objet est le plan, la classe est la chose construite"], answer: 1,
        explain: "On peut construire autant d'objets qu'on veut à partir d'une classe." },
      { q: "Comment crée-t-on un objet de la classe <code>Voiture</code> ?", choices: ["<code>Voiture</code>", "<code>new Voiture</code>", "<code>Voiture()</code>"], answer: 2,
        explain: "On appelle la classe avec des parenthèses." },
    ],
    exercise: {
      task: `<p>Crée une classe <code>Livre</code> (vide pour l'instant). Crée ensuite un objet <code>livre1</code> de cette classe, avec les attributs <code>titre</code> valant <code>"Le Petit Prince"</code> et <code>pages</code> valant <code>96</code>. Affiche <code>Le Petit Prince (96 pages)</code> à partir des attributs.</p>`,
      starter: `# Crée la classe Livre

`,
      check: `
assert isinstance(Livre, type), "Crée la classe avec class Livre:"
assert isinstance(livre1, Livre), "livre1 doit être un objet de la classe Livre : livre1 = Livre()"
assert livre1.titre == "Le Petit Prince" and livre1.pages == 96, "livre1 doit avoir les attributs titre et pages."
assert "Le Petit Prince (96 pages)" in sortie, "Affiche : Le Petit Prince (96 pages)"
`,
      solution: `class Livre:
    pass

livre1 = Livre()
livre1.titre = "Le Petit Prince"
livre1.pages = 96
print(f"{livre1.titre} ({livre1.pages} pages)")`,
    },
  },

  init: {
    body: `
<p>Ajouter les attributs un par un après la création est fastidieux, et on risque d'en oublier. La méthode spéciale <code>__init__</code>, le <b>constructeur</b>, est appelée automatiquement à la création de l'objet :</p>
<pre>class Chien:
    def __init__(self, nom, age):
        self.nom = nom
        self.age = age

rex = Chien("Rex", 3)
print(rex.nom, rex.age)</pre>
<h2>Qui est self ?</h2>
<p><code>self</code> désigne l'objet en train d'être construit. <code>self.nom = nom</code> veut dire « range la valeur du paramètre <code>nom</code> dans l'attribut <code>nom</code> de cet objet ».</p>
<p>À l'appel, on ne passe pas <code>self</code> : Python le fournit tout seul. <code>Chien("Rex", 3)</code> remplit donc <code>nom</code> et <code>age</code>.</p>
<p class="note"><code>__init__</code> s'écrit avec deux tirets bas de chaque côté. Avec un seul, Python ne l'appellera pas.</p>`,
    starter: `class Chien:
    def __init__(self, nom, age=1):
        self.nom = nom
        self.age = age
        self.tours = []

rex = Chien("Rex", 3)
chiot = Chien("Pixel")
print(rex.nom, rex.age)
print(chiot.nom, chiot.age, chiot.tours)`,
    quiz: [
      { q: "Quand <code>__init__</code> est-elle appelée ?", choices: ["Quand on définit la classe", "Automatiquement, à chaque création d'objet", "Seulement si on l'appelle soi-même"], answer: 1,
        explain: "Écrire Chien(...) appelle __init__ en coulisses." },
      { q: "Avec <code>def __init__(self, x, y):</code>, comment crée-t-on un objet ?", choices: ["<code>Point(self, 1, 2)</code>", "<code>Point(1, 2)</code>", "<code>Point.__init__(1, 2)</code>"], answer: 1,
        explain: "self est fourni automatiquement par Python." },
    ],
    exercise: {
      task: `<p>Crée une classe <code>Produit</code> dont le constructeur reçoit <code>nom</code>, <code>prix</code> et <code>stock</code> (avec <code>0</code> comme valeur par défaut pour le stock), et les range dans des attributs du même nom.</p>
<p>Crée ensuite <code>p = Produit("Cahier", 2.5, 40)</code> et affiche son nom et son prix.</p>`,
      starter: `class Produit:
    pass

`,
      check: `
a = Produit("Stylo", 1.2, 10)
assert (a.nom, a.prix, a.stock) == ("Stylo", 1.2, 10), "Le constructeur doit ranger nom, prix et stock dans self.nom, self.prix et self.stock."
b = Produit("Gomme", 0.8)
assert b.stock == 0, "Le stock doit valoir 0 par défaut."
assert p.nom == "Cahier" and p.stock == 40, 'Crée p = Produit("Cahier", 2.5, 40).'
assert "Cahier" in sortie and "2.5" in sortie, "Affiche le nom et le prix de p."
`,
      solution: `class Produit:
    def __init__(self, nom, prix, stock=0):
        self.nom = nom
        self.prix = prix
        self.stock = stock

p = Produit("Cahier", 2.5, 40)
print(p.nom, p.prix)`,
    },
  },

  methodes: {
    body: `
<p>Une <b>méthode</b> est une fonction définie dans une classe. Elle décrit ce qu'un objet sait <b>faire</b>. Comme <code>__init__</code>, elle reçoit <code>self</code> en premier paramètre, ce qui lui donne accès aux attributs de l'objet :</p>
<pre>class Compteur:
    def __init__(self):
        self.valeur = 0

    def incrementer(self, pas=1):
        self.valeur += pas

    def est_pair(self):
        return self.valeur % 2 == 0

c = Compteur()
c.incrementer()
c.incrementer(5)
print(c.valeur, c.est_pair())   # 6 True</pre>
<p>Les données (attributs) et les actions sur ces données (méthodes) sont rangées ensemble : c'est l'idée centrale de la <b>programmation orientée objet</b>.</p>`,
    starter: `class Compteur:
    def __init__(self):
        self.valeur = 0

    def incrementer(self, pas=1):
        self.valeur += pas

    def est_pair(self):
        return self.valeur % 2 == 0

c = Compteur()
c.incrementer()
c.incrementer(5)
print(c.valeur, c.est_pair())

autre = Compteur()
print(autre.valeur)  # chaque objet a ses propres attributs`,
    quiz: [
      { q: "Dans une méthode, comment accède-t-on à l'attribut <code>valeur</code> de l'objet ?", choices: ["<code>valeur</code>", "<code>self.valeur</code>", "<code>Compteur.valeur</code>"], answer: 1,
        explain: "self est l'objet sur lequel la méthode a été appelée." },
      { q: "Pour <code>c.incrementer(5)</code>, que reçoit le paramètre <code>self</code> ?", choices: ["5", "L'objet c", "Rien"], answer: 1,
        explain: "c.incrementer(5) revient à Compteur.incrementer(c, 5)." },
    ],
    exercise: {
      task: `<p>Crée une classe <code>Rectangle</code> avec :</p>
<ul><li>un constructeur qui reçoit <code>largeur</code> et <code>hauteur</code> ;</li>
<li>une méthode <code>aire()</code> qui renvoie l'aire ;</li>
<li>une méthode <code>perimetre()</code> qui renvoie le périmètre ;</li>
<li>une méthode <code>est_carre()</code> qui renvoie <code>True</code> si les deux côtés sont égaux ;</li>
<li>une méthode <code>agrandir(facteur)</code> qui multiplie les deux côtés par <code>facteur</code>.</li></ul>`,
      starter: `class Rectangle:
    pass

r = Rectangle(3, 5)
`,
      check: `
r1 = Rectangle(3, 5)
assert r1.aire() == 15 and r1.perimetre() == 16, "Pour un rectangle 3 × 5, aire() doit renvoyer 15 et perimetre() 16."
assert r1.est_carre() is False and Rectangle(4, 4).est_carre() is True, "est_carre() doit comparer largeur et hauteur."
r1.agrandir(2)
assert (r1.largeur, r1.hauteur) == (6, 10) and r1.aire() == 60, "agrandir(2) doit doubler la largeur et la hauteur."
`,
      solution: `class Rectangle:
    def __init__(self, largeur, hauteur):
        self.largeur = largeur
        self.hauteur = hauteur

    def aire(self):
        return self.largeur * self.hauteur

    def perimetre(self):
        return 2 * (self.largeur + self.hauteur)

    def est_carre(self):
        return self.largeur == self.hauteur

    def agrandir(self, facteur):
        self.largeur *= facteur
        self.hauteur *= facteur

r = Rectangle(3, 5)
print(r.aire(), r.perimetre(), r.est_carre())`,
    },
  },

  heritage: {
    body: `
<p>L'<b>héritage</b> permet de créer une classe à partir d'une autre. La classe <b>enfant</b> récupère tous les attributs et méthodes de la classe <b>parente</b>, et peut en ajouter ou en modifier.</p>
<pre>class Animal:
    def __init__(self, nom):
        self.nom = nom

    def parler(self):
        return "..."

    def presenter(self):
        return f"{self.nom} dit {self.parler()}"

class Chat(Animal):           # Chat hérite d'Animal
    def parler(self):         # on redéfinit parler
        return "miaou"

class Vache(Animal):
    def parler(self):
        return "meuh"

for a in [Chat("Félix"), Vache("Marguerite")]:
    print(a.presenter())</pre>
<p><code>presenter</code> est écrite une seule fois, dans <code>Animal</code>, mais chaque animal répond avec sa propre version de <code>parler</code>.</p>
<h2>super()</h2>
<p>Pour compléter le constructeur du parent au lieu de le remplacer, on l'appelle avec <code>super()</code> :</p>
<pre>class Chien(Animal):
    def __init__(self, nom, race):
        super().__init__(nom)    # le parent range le nom
        self.race = race</pre>`,
    starter: `class Animal:
    def __init__(self, nom):
        self.nom = nom
    def parler(self):
        return "..."
    def presenter(self):
        return f"{self.nom} dit {self.parler()}"

class Chat(Animal):
    def parler(self):
        return "miaou"

class Chien(Animal):
    def __init__(self, nom, race):
        super().__init__(nom)
        self.race = race
    def parler(self):
        return "ouaf"

for a in [Chat("Félix"), Chien("Rex", "berger"), Animal("Bidule")]:
    print(a.presenter())
print(isinstance(Chat("x"), Animal))`,
    quiz: [
      { q: "Avec <code>class B(A):</code>, quelle phrase est vraie ?", choices: ["A hérite de B", "B hérite de A", "A et B sont identiques"], answer: 1,
        explain: "La classe entre parenthèses est la classe parente." },
      { q: "À quoi sert <code>super().__init__(nom)</code> ?", choices: ["À créer un deuxième objet", "À exécuter le constructeur de la classe parente", "À supprimer l'objet parent"], answer: 1,
        explain: "On réutilise le travail du parent, puis on ajoute ce qui est propre à l'enfant." },
    ],
    exercise: {
      task: `<p>À partir de la classe <code>Vehicule</code> fournie, crée :</p>
<ul><li><code>Velo(Vehicule)</code> dont <code>description()</code> renvoie <code>"Vélo à 2 roues"</code> ;</li>
<li><code>Voiture(Vehicule)</code> dont le constructeur reçoit aussi <code>places</code> (utilise <code>super()</code>), et dont <code>description()</code> renvoie <code>"Voiture à 4 roues, 5 places"</code> (avec les vraies valeurs).</li></ul>`,
      starter: `class Vehicule:
    def __init__(self, roues):
        self.roues = roues

    def description(self):
        return f"Véhicule à {self.roues} roues"

`,
      check: `
v = Velo()
assert isinstance(v, Vehicule), "Velo doit hériter de Vehicule : class Velo(Vehicule):"
assert v.roues == 2 and v.description() == "Vélo à 2 roues", 'Velo().description() doit renvoyer "Vélo à 2 roues".'
c = Voiture(7)
assert isinstance(c, Vehicule) and c.roues == 4 and c.places == 7, "Voiture(7) doit avoir 4 roues et 7 places."
assert c.description() == "Voiture à 4 roues, 7 places", 'Voiture(7).description() doit renvoyer "Voiture à 4 roues, 7 places".'
assert "super()" in code_eleve, "Utilise super().__init__(...) dans les constructeurs."
`,
      solution: `class Vehicule:
    def __init__(self, roues):
        self.roues = roues

    def description(self):
        return f"Véhicule à {self.roues} roues"

class Velo(Vehicule):
    def __init__(self):
        super().__init__(2)

    def description(self):
        return f"Vélo à {self.roues} roues"

class Voiture(Vehicule):
    def __init__(self, places):
        super().__init__(4)
        self.places = places

    def description(self):
        return f"Voiture à {self.roues} roues, {self.places} places"

print(Velo().description())
print(Voiture(5).description())`,
    },
  },

  speciales: {
    body: `
<p>Les méthodes entourées de doubles tirets bas, comme <code>__init__</code>, sont des <b>méthodes spéciales</b>. Python les appelle tout seul dans certaines situations. Elles permettent à tes objets de se comporter comme les types intégrés.</p>
<div class="table-wrap"><table>
<tr><th>Méthode</th><th>Appelée par</th></tr>
<tr><td><code>__str__</code></td><td><code>print(obj)</code>, <code>str(obj)</code></td></tr>
<tr><td><code>__repr__</code></td><td>l'affichage « technique », dans une liste par exemple</td></tr>
<tr><td><code>__eq__</code></td><td><code>a == b</code></td></tr>
<tr><td><code>__lt__</code></td><td><code>a &lt; b</code> (et donc <code>sorted</code>)</td></tr>
<tr><td><code>__add__</code></td><td><code>a + b</code></td></tr>
<tr><td><code>__len__</code></td><td><code>len(obj)</code></td></tr>
</table></div>
<pre>class Duree:
    def __init__(self, minutes):
        self.minutes = minutes
    def __str__(self):
        return f"{self.minutes // 60}h{self.minutes % 60:02}"
    def __add__(self, autre):
        return Duree(self.minutes + autre.minutes)

print(Duree(90) + Duree(45))   # 2h15</pre>`,
    starter: `class Duree:
    def __init__(self, minutes):
        self.minutes = minutes
    def __str__(self):
        return f"{self.minutes // 60}h{self.minutes % 60:02}"
    def __add__(self, autre):
        return Duree(self.minutes + autre.minutes)
    def __eq__(self, autre):
        return self.minutes == autre.minutes
    def __lt__(self, autre):
        return self.minutes < autre.minutes

print(Duree(90) + Duree(45))
print(Duree(60) == Duree(60))
films = [Duree(142), Duree(95), Duree(118)]
print([str(d) for d in sorted(films)])`,
    quiz: [
      { q: "Quelle méthode définit ce qu'affiche <code>print(obj)</code> ?", choices: ["<code>__print__</code>", "<code>__str__</code>", "<code>__init__</code>"], answer: 1,
        explain: "print appelle str(obj), qui appelle __str__." },
      { q: "Quelle méthode faut-il pour que <code>sorted()</code> sache trier tes objets ?", choices: ["<code>__lt__</code>", "<code>__sort__</code>", "<code>__len__</code>"], answer: 0,
        explain: "sorted compare les objets avec <, donc __lt__ (less than)." },
    ],
    exercise: {
      task: `<p>Crée une classe <code>Vecteur</code> avec deux attributs <code>x</code> et <code>y</code>, et les méthodes spéciales pour que :</p>
<ul><li><code>print(Vecteur(1, 2))</code> affiche <code>Vecteur(1, 2)</code> ;</li>
<li><code>Vecteur(1, 2) + Vecteur(3, 4)</code> donne un <code>Vecteur(4, 6)</code> ;</li>
<li><code>Vecteur(1, 2) == Vecteur(1, 2)</code> vaut <code>True</code> ;</li>
<li><code>Vecteur(2, 3) * 2</code> donne un <code>Vecteur(4, 6)</code> (méthode <code>__mul__</code>).</li></ul>`,
      starter: `class Vecteur:
    pass

print(Vecteur(1, 2) + Vecteur(3, 4))
`,
      check: `
a, b = Vecteur(1, 2), Vecteur(3, 4)
assert str(a) == "Vecteur(1, 2)", 'str(Vecteur(1, 2)) doit donner "Vecteur(1, 2)" : définis __str__.'
assert a == Vecteur(1, 2) and not (a == b), "Définis __eq__ pour comparer x et y."
s = a + b
assert isinstance(s, Vecteur) and (s.x, s.y) == (4, 6), "a + b doit renvoyer un nouveau Vecteur(4, 6) : définis __add__."
m = Vecteur(2, 3) * 2
assert isinstance(m, Vecteur) and (m.x, m.y) == (4, 6), "Vecteur(2, 3) * 2 doit renvoyer Vecteur(4, 6) : définis __mul__."
assert (a.x, a.y) == (1, 2), "Les opérations ne doivent pas modifier les vecteurs d'origine."
`,
      solution: `class Vecteur:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Vecteur({self.x}, {self.y})"

    def __add__(self, autre):
        return Vecteur(self.x + autre.x, self.y + autre.y)

    def __eq__(self, autre):
        return self.x == autre.x and self.y == autre.y

    def __mul__(self, k):
        return Vecteur(self.x * k, self.y * k)

print(Vecteur(1, 2) + Vecteur(3, 4))`,
    },
  },

  "projet-banque": {
    body: `
<p>On modélise un compte bancaire, un exemple classique qui montre bien l'intérêt des objets : le solde ne doit changer qu'à travers des opérations contrôlées.</p>
<ul>
  <li>Un dépôt doit être positif.</li>
  <li>Un retrait ne doit pas dépasser le solde.</li>
  <li>Chaque opération est notée dans un historique.</li>
</ul>
<p>Les règles sont écrites une seule fois, dans les méthodes, et le reste du programme ne peut pas les contourner par erreur.</p>
<p class="note">Par convention, un attribut dont le nom commence par <code>_</code> (comme <code>_historique</code>) est « privé » : il est réservé à la classe, et le reste du code ne devrait pas y toucher directement.</p>`,
    quiz: [
      { q: "Pourquoi passer par des méthodes <code>deposer</code> / <code>retirer</code> plutôt que modifier <code>solde</code> directement ?", choices: ["C'est plus rapide", "Pour appliquer les règles (montant positif, solde suffisant) à chaque fois", "Python l'exige"], answer: 1,
        explain: "Les méthodes garantissent que les règles sont toujours respectées." },
    ],
    exercise: {
      task: `<p>Crée une classe <code>Compte</code> :</p>
<ul><li><code>Compte(titulaire, solde=0)</code> ;</li>
<li><code>deposer(montant)</code> : lève <code>ValueError</code> si le montant n'est pas positif ;</li>
<li><code>retirer(montant)</code> : lève <code>ValueError</code> si le montant n'est pas positif ou dépasse le solde ;</li>
<li>chaque opération réussie ajoute un tuple <code>("dépôt", montant)</code> ou <code>("retrait", montant)</code> à l'attribut <code>historique</code> (une liste) ;</li>
<li><code>__str__</code> renvoie <code>Compte de Zoé : 120.00 €</code>.</li></ul>`,
      starter: `class Compte:
    pass

c = Compte("Zoé", 100)
c.deposer(50)
c.retirer(30)
print(c)
print(c.historique)
`,
      check: `
c1 = Compte("Zoé", 100)
c1.deposer(50)
c1.retirer(30)
assert c1.solde == 120, "Après un dépôt de 50 et un retrait de 30 sur 100, le solde doit être 120."
assert c1.historique == [("dépôt", 50), ("retrait", 30)], 'historique doit valoir [("dépôt", 50), ("retrait", 30)].'
assert str(c1) == "Compte de Zoé : 120.00 €", 'str(compte) doit donner "Compte de Zoé : 120.00 €".'
assert Compte("Al").solde == 0, "Le solde doit valoir 0 par défaut."
for action, montant in [("deposer", -5), ("retirer", 0), ("retirer", 500)]:
    try:
        getattr(c1, action)(montant)
    except ValueError:
        pass
    else:
        assert False, f"{action}({montant}) doit lever ValueError."
assert c1.solde == 120 and len(c1.historique) == 2, "Une opération refusée ne doit modifier ni le solde ni l'historique."
assert Compte("B").historique is not Compte("C").historique, "Chaque compte doit avoir sa propre liste historique (crée-la dans __init__)."
`,
      solution: `class Compte:
    def __init__(self, titulaire, solde=0):
        self.titulaire = titulaire
        self.solde = solde
        self.historique = []

    def deposer(self, montant):
        if montant <= 0:
            raise ValueError("Le dépôt doit être positif")
        self.solde += montant
        self.historique.append(("dépôt", montant))

    def retirer(self, montant):
        if montant <= 0:
            raise ValueError("Le retrait doit être positif")
        if montant > self.solde:
            raise ValueError("Solde insuffisant")
        self.solde -= montant
        self.historique.append(("retrait", montant))

    def __str__(self):
        return f"Compte de {self.titulaire} : {self.solde:.2f} €"

c = Compte("Zoé", 100)
c.deposer(50)
c.retirer(30)
print(c)
print(c.historique)`,
    },
  },
};
