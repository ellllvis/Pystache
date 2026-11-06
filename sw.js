// Service worker : garde l'appli et Python en cache pour qu'elle marche hors ligne
// après une première visite. Change VERSION à chaque mise à jour de l'appli.
const VERSION = "v8";
const APP_CACHE = "pyetapes-app-" + VERSION;
const PY_CACHE = "pyetapes-pyodide-0.26.4";

const APP_FILES = [
  "./",
  "index.html",
  "css/style.css",
  "js/content.js",
  "js/lecons/types.js",
  "js/lecons/conditions.js",
  "js/lecons/boucles.js",
  "js/lecons/listes-intro.js",
  "js/lecons/fonctions.js",
  "js/lecons/collections.js",
  "js/lecons/texte.js",
  "js/lecons/erreurs.js",
  "js/lecons/fichiers.js",
  "js/lecons/modules.js",
  "js/lecons/objets.js",
  "js/lecons/comprehensions.js",
  "js/lecons/fonctions-avancees.js",
  "js/lecons/stdlib.js",
  "js/lecons/qualite.js",
  "js/progress.js",
  "js/runner.js",
  "js/py-worker.js",
  "js/app.js",
  "manifest.webmanifest",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(APP_CACHE).then((c) => Promise.all(APP_FILES.map((f) => c.add(f).catch(() => {})))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== APP_CACHE && k !== PY_CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;

  // Fichiers Pyodide : ils ne changent jamais pour une version donnée → cache d'abord.
  if (url.origin === location.origin && url.pathname.includes("/pyodide/")) {
    e.respondWith(
      caches.open(PY_CACHE).then(async (c) => {
        const hit = await c.match(e.request);
        if (hit) return hit;
        const res = await fetch(e.request);
        if (res.ok) c.put(e.request, res.clone());
        return res;
      })
    );
    return;
  }

  // Fichiers de l'appli : réseau d'abord (pour avoir les mises à jour), cache si hors ligne.
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res.ok) caches.open(APP_CACHE).then((c) => c.put(e.request, res.clone()));
          return res;
        })
        .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match("index.html")))
    );
  }
});
