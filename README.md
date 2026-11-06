# Pystache

Une application web pour apprendre Python pas à pas sur son téléphone, du niveau débutant au niveau avancé.

- 3 niveaux, 16 modules, 80 leçons ;
- dans chaque leçon : un cours court, du code à essayer, un quiz et un exercice corrigé automatiquement ;
- des points, une série de jours et un suivi de la progression, enregistrés sur l'appareil ;
- un bac à sable pour écrire du Python librement ;
- installable sur l'écran d'accueil, et utilisable hors connexion après la première visite.

Le code Python s'exécute directement dans le navigateur grâce à [Pyodide](https://pyodide.org) (version 0.26.4, licence MPL-2.0), livré dans le dossier `pyodide/`. Il n'y a ni serveur ni compte.

## Organisation

- `index.html`, `css/`, `js/app.js` : l'interface ;
- `js/content.js` : le programme (niveaux, modules, titres des leçons) ;
- `js/lecons/<module>.js` : le contenu des leçons (cours, quiz, exercices et leurs corrections) ;
- `js/progress.js` : la progression et les points ;
- `js/runner.js`, `js/py-worker.js` : l'exécution du code Python ;
- `sw.js`, `manifest.webmanifest` : l'installation et le mode hors connexion.

## Lancer en local

```
python3 -m http.server
```

puis ouvrir http://localhost:8000.
