// Navigation de l'appli (routage par #) : accueil → niveau → module → leçon.
(function () {
  const view = document.getElementById("view");
  const backBtn = document.getElementById("back");
  const scoreEl = document.getElementById("score");
  const C = window.COURSE;

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const lessonKey = (lv, mo, le) => `${lv.id}/${mo.id}/${le.id}`;

  function find(lvId, moId, leId) {
    const lv = C.levels.find((l) => l.id === lvId);
    const mo = lv && moId ? lv.modules.find((m) => m.id === moId) : null;
    const le = mo && leId ? mo.lessons.find((l) => l.id === leId) : null;
    return { lv, mo, le };
  }

  function stats(lessons) {
    const total = lessons.length;
    const done = lessons.filter((x) => Progress.isDone(x.key)).length;
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }
  const moduleLessons = (lv, mo) => mo.lessons.map((le) => ({ key: lessonKey(lv, mo, le) }));
  const levelLessons = (lv) => lv.modules.flatMap((mo) => moduleLessons(lv, mo));
  const allLessons = () => C.levels.flatMap(levelLessons);

  const bar = (pct) => `<div class="bar"><i style="width:${pct}%"></i></div>`;

  // ---------- Écrans ----------

  function home() {
    const s = stats(allLessons());
    return `
      <h1>Apprends Python pas à pas</h1>
      <p class="lead">Trois niveaux, des leçons courtes et un éditeur pour tester ton code tout de suite. ${s.done}/${s.total} leçons terminées.</p>
      ${C.levels.map((lv) => {
        const ls = stats(levelLessons(lv));
        return `<a class="card lvl-${lv.num}" href="#/${lv.id}">
          <span class="badge">Niveau ${lv.num}</span>
          <h3>${esc(lv.title)}</h3>
          <p>${esc(lv.intro)}</p>
          ${bar(ls.pct)}
        </a>`;
      }).join("")}`;
  }

  function level(lv) {
    return `
      <span class="badge">Niveau ${lv.num}</span>
      <h1>${esc(lv.title)}</h1>
      <p class="lead">${esc(lv.intro)}</p>
      ${lv.modules.map((mo, i) => {
        const ms = stats(moduleLessons(lv, mo));
        return `<a class="card lvl-${lv.num}" href="#/${lv.id}/${mo.id}">
          <p>Module ${i + 1} · ${mo.lessons.length} leçons</p>
          <h3>${esc(mo.title)}</h3>
          <p>${esc(mo.intro)}</p>
          ${bar(ms.pct)}
        </a>`;
      }).join("")}`;
  }

  function moduleView(lv, mo) {
    return `
      <span class="badge">${esc(lv.title)}</span>
      <h1>${esc(mo.title)}</h1>
      <p class="lead">${esc(mo.intro)}</p>
      ${mo.lessons.map((le, i) => {
        const done = Progress.isDone(lessonKey(lv, mo, le));
        return `<a class="card" href="#/${lv.id}/${mo.id}/${le.id}">
          <div class="row">
            <span class="check ${done ? "done" : ""}">✓</span>
            <div class="grow">
              <p>Leçon ${i + 1}${le.body ? "" : " · à venir"}</p>
              <h3>${esc(le.title)}</h3>
            </div>
          </div>
        </a>`;
      }).join("")}`;
  }

  function runnerHTML(id, code, stdin, title, exercise) {
    const solved = exercise && Progress.isExerciseDone(id);
    return `
      <div class="runner ${exercise ? "exercise" : ""}" data-runner="${esc(id)}" ${exercise ? 'data-check="1"' : ""}>
        <div class="runner-title">${esc(title || "À toi de jouer")}${solved ? ' <span class="badge ok">Réussi</span>' : ""}</div>
        ${exercise ? `<div class="task">${exercise.task}</div>` : ""}
        <textarea class="code" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Code Python">${esc(code)}</textarea>
        <details class="stdin-box" ${stdin ? "open" : ""}>
          <summary>Entrées du programme (pour input)</summary>
          <textarea class="stdin" spellcheck="false" autocapitalize="off" aria-label="Entrées, une par ligne">${esc(stdin || "")}</textarea>
        </details>
        <div class="actions">
          ${exercise ? '<button class="btn ok" data-act="check">✓ Vérifier</button>' : ""}
          <button class="btn ${exercise ? "ghost" : ""}" data-act="run">▶ Exécuter</button>
          <button class="btn ghost" data-act="reset">Rétablir</button>
        </div>
        <div class="output" aria-live="polite"><span class="info">Le résultat s'affichera ici.</span></div>
        ${exercise ? '<div class="verdict" hidden></div>' : ""}
        ${exercise && exercise.solution ? `<details class="solution"><summary>Voir une solution</summary><p>Essaie d'abord par toi-même : c'est en cherchant qu'on apprend. Il existe souvent plusieurs bonnes solutions.</p><pre>${esc(exercise.solution)}</pre></details>` : ""}
      </div>`;
  }

  function lesson(lv, mo, le) {
    const key = lessonKey(lv, mo, le);
    const idx = mo.lessons.indexOf(le);
    const prev = mo.lessons[idx - 1], next = mo.lessons[idx + 1];
    const done = Progress.isDone(key);
    const ex = le.exercise;
    const exKey = key + "#ex";
    const body = le.body
      ? `<div class="lesson">${le.body}</div>
         ${le.starter !== undefined ? runnerHTML(key, Progress.getCode(key) ?? le.starter, le.stdin, "Essaie") : ""}
         ${le.quiz ? quizHTML(key, le.quiz) : ""}
         ${ex ? `<h2>Exercice <span class="pts">+${Progress.POINTS.exercise} pts</span></h2>
                 ${runnerHTML(exKey, Progress.getCode(exKey) ?? ex.starter, ex.stdin, "À toi de jouer", ex)}` : ""}`
      : `<p class="soon">Cette leçon arrive bientôt. En attendant, tu peux t'entraîner dans le bac à sable.</p>`;
    return `
      <span class="badge">${esc(mo.title)} · leçon ${idx + 1}/${mo.lessons.length}</span>
      <h1>${esc(le.title)}</h1>
      ${body}
      ${le.body ? `<div class="done-box">
        <button class="btn ${done ? "ghost" : "ok"}" id="mark">${done ? "Marquer comme non terminée" : "✓ J'ai compris, leçon terminée"}</button>
      </div>` : ""}
      <div class="nav-lessons">
        ${prev ? `<a class="btn ghost" href="#/${lv.id}/${mo.id}/${prev.id}">← Précédente</a>` : "<span></span>"}
        ${next ? `<a class="btn ghost" href="#/${lv.id}/${mo.id}/${next.id}">Suivante →</a>` : `<a class="btn ghost" href="#/${lv.id}/${mo.id}">Retour au module</a>`}
      </div>`;
  }

  function quizHTML(key, quiz) {
    return `<h2>Quiz <span class="pts">+${Progress.POINTS.quiz} pts par bonne réponse du premier coup</span></h2>
      ${quiz.map((q, i) => {
        const qid = `${key}#q${i}`;
        const st = Progress.quizState(qid);
        const solved = st === "ok" || st === "late";
        return `<div class="quiz ${solved ? "solved" : ""}" data-qid="${esc(qid)}" data-answer="${q.answer}">
          <p class="q">${q.q}</p>
          <div class="choices">
            ${q.choices.map((c, j) => `<button class="choice ${solved && j === q.answer ? "right" : ""}" data-i="${j}" ${solved ? "disabled" : ""}>${c}</button>`).join("")}
          </div>
          <p class="explain" ${solved ? "" : "hidden"}>${q.explain || ""}</p>
        </div>`;
      }).join("")}`;
  }

  function wireQuizzes() {
    view.querySelectorAll(".quiz").forEach((box) => {
      const qid = box.dataset.qid, answer = Number(box.dataset.answer);
      const explain = box.querySelector(".explain");
      box.querySelectorAll(".choice").forEach((btn) => {
        btn.onclick = () => {
          const i = Number(btn.dataset.i);
          const won = Progress.answerQuiz(qid, i === answer);
          if (i === answer) {
            btn.classList.add("right");
            box.classList.add("solved");
            box.querySelectorAll(".choice").forEach((b) => (b.disabled = true));
            explain.hidden = false;
            if (won) toast(`+${won} pts`);
          } else {
            btn.classList.add("wrong");
            btn.disabled = true;
            toast("Pas tout à fait, réessaie !", true);
          }
          updateScore();
        };
      });
    });
  }

  let toastTimer;
  function toast(text, muted) {
    let t = document.getElementById("toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = text;
    t.className = muted ? "muted show" : "show";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (t.className = t.className.replace("show", "")), 1800);
  }

  function updateScore() {
    const st = Progress.streak();
    scoreEl.textContent = `★ ${Progress.xp()}` + (st ? `  ·  🔥 ${st}` : "");
    scoreEl.title = `${Progress.xp()} points` + (st ? `, ${st} jour(s) d'affilée` : "");
  }

  function sandbox() {
    return `
      <h1>Bac à sable</h1>
      <p class="lead">Un espace libre pour écrire et tester n'importe quel code Python. Ton code est gardé sur cet appareil.</p>
      ${runnerHTML("sandbox", Progress.getCode("sandbox") ?? 'for i in range(1, 6):\n    print(i, "×", i, "=", i * i)', "", "Ton code")}`;
  }

  function profile() {
    const all = stats(allLessons());
    return `
      <h1>Ma progression</h1>
      <div class="stats">
        <div class="stat"><b>${Progress.xp()}</b><span>points</span></div>
        <div class="stat"><b>${Progress.streak()}</b><span>jour(s) d'affilée</span></div>
        <div class="stat"><b>${all.done}</b><span>leçons terminées (${all.pct}%)</span></div>
        <div class="stat"><b>${Progress.exerciseCount()}</b><span>exercices réussis</span></div>
        <div class="stat"><b>${Progress.quizCounts().first}</b><span>quiz justes du premier coup</span></div>
      </div>
      <p class="lead">Barème : ${Progress.POINTS.quiz} pts par bonne réponse au quiz du premier coup, ${Progress.POINTS.exercise} pts par exercice réussi, ${Progress.POINTS.lesson} pts par leçon terminée.</p>
      ${C.levels.map((lv) => {
        const s = stats(levelLessons(lv));
        return `<div class="card lvl-${lv.num}"><h3>${esc(lv.title)}</h3><p>${s.done}/${s.total} leçons</p>${bar(s.pct)}</div>`;
      }).join("")}
      <p class="lead">La progression est enregistrée uniquement sur cet appareil.</p>
      <button class="btn ghost" id="reset-all">Tout remettre à zéro</button>`;
  }

  // ---------- Exécuteur ----------

  function wireRunners(defaults, checks) {
    view.querySelectorAll("[data-runner]").forEach((box) => {
      const id = box.dataset.runner;
      const ta = box.querySelector("textarea.code");
      const stdin = box.querySelector("textarea.stdin");
      const out = box.querySelector(".output");
      const runBtn = box.querySelector('[data-act="run"]');

      // La touche Tab insère 4 espaces au lieu de quitter l'éditeur.
      ta.addEventListener("keydown", (e) => {
        if (e.key === "Tab" && !e.shiftKey) {
          e.preventDefault();
          const s = ta.selectionStart;
          ta.setRangeText("    ", s, ta.selectionEnd, "end");
        }
      });
      ta.addEventListener("input", () => Progress.setCode(id, ta.value));

      box.querySelector('[data-act="reset"]').onclick = () => {
        ta.value = defaults[id] ?? "";
        Progress.setCode(id, ta.value);
      };

      const checkBtn = box.querySelector('[data-act="check"]');
      const verdictEl = box.querySelector(".verdict");

      const go = async (withCheck) => {
        const btns = [runBtn, checkBtn].filter(Boolean);
        btns.forEach((b) => (b.disabled = true));
        if (verdictEl) verdictEl.hidden = true;
        out.innerHTML = Runner.isLoaded() ? "" : '<span class="info">Chargement de Python (la première fois peut prendre quelques secondes)…</span>\n';
        let cleared = false;
        const write = (kind, text) => {
          if (!cleared) { out.innerHTML = ""; cleared = true; }
          const span = document.createElement("span");
          if (kind === "err") span.className = "err";
          span.textContent = text;
          out.appendChild(span);
          out.scrollTop = out.scrollHeight;
        };
        try {
          const r = await Runner.run(ta.value, stdin.value, write, withCheck ? checks[id] : null);
          if (!cleared) out.innerHTML = r.ok ? '<span class="info">(Le programme n\'a rien affiché.)</span>' : "";
          if (withCheck && r.checked) showVerdict(r.verdict);
          else if (withCheck && r.timeout) showVerdict("Ton programme ne s'arrête pas. Vérifie tes boucles.");
        } catch (e) {
          out.innerHTML = "";
          write("err", "Python n'a pas pu se charger. Vérifie ta connexion internet puis appuie à nouveau sur Exécuter.\nDétail : " + e.message);
        }
        btns.forEach((b) => (b.disabled = false));
      };

      function showVerdict(msg) {
        verdictEl.hidden = false;
        if (msg === "") {
          verdictEl.className = "verdict good";
          verdictEl.textContent = "Bravo, exercice réussi !";
          const won = Progress.exerciseDone(id);
          // Réussir l'exercice termine aussi la leçon.
          const lessonId = id.replace(/#ex$/, "");
          const wonLesson = Progress.setDone(lessonId, true);
          if (won + wonLesson) toast(`+${won + wonLesson} pts`);
          updateScore();
          const mark = document.getElementById("mark");
          if (mark) { mark.className = "btn ghost"; mark.textContent = "Marquer comme non terminée"; }
        } else {
          verdictEl.className = "verdict bad";
          verdictEl.textContent = msg;
        }
      }

      runBtn.onclick = () => go(false);
      if (checkBtn) checkBtn.onclick = () => go(true);
    });
  }

  // ---------- Routeur ----------

  function render() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
    let html, tab = "home", defaults = {}, checks = {};
    if (parts[0] === "bac-a-sable") {
      html = sandbox(); tab = "sandbox";
      defaults.sandbox = 'for i in range(1, 6):\n    print(i, "×", i, "=", i * i)';
    } else if (parts[0] === "profil") {
      html = profile(); tab = "profile";
    } else {
      const { lv, mo, le } = find(parts[0], parts[1], parts[2]);
      if (le) {
        const key = lessonKey(lv, mo, le);
        html = lesson(lv, mo, le);
        defaults[key] = le.starter;
        if (le.exercise) { defaults[key + "#ex"] = le.exercise.starter; checks[key + "#ex"] = le.exercise.check; }
      }
      else if (mo) html = moduleView(lv, mo);
      else if (lv) html = level(lv);
      else html = home();
    }

    view.innerHTML = html;
    backBtn.hidden = parts.length === 0;
    document.querySelectorAll(".tabbar a").forEach((a) => a.classList.toggle("active", a.dataset.tab === tab));
    updateScore();
    window.scrollTo(0, 0);
    wireRunners(defaults, checks);
    wireQuizzes();

    const mark = document.getElementById("mark");
    if (mark) mark.onclick = () => {
      const key = parts.join("/");
      const now = !Progress.isDone(key);
      const won = Progress.setDone(key, now);
      if (won) toast(`+${won} pts`);
      mark.className = now ? "btn ghost" : "btn ok";
      mark.textContent = now ? "Marquer comme non terminée" : "✓ J'ai compris, leçon terminée";
      updateScore();
    };
    const resetAll = document.getElementById("reset-all");
    if (resetAll) resetAll.onclick = () => {
      if (resetAll.dataset.armed) { Progress.reset(); render(); return; }
      resetAll.dataset.armed = "1";
      resetAll.textContent = "Appuie encore pour tout effacer";
      setTimeout(() => { if (resetAll.isConnected) { delete resetAll.dataset.armed; resetAll.textContent = "Tout remettre à zéro"; } }, 4000);
    };

    // Python se charge en arrière-plan dès qu'un éditeur est affiché.
    if (view.querySelector("[data-runner]")) Runner.preload();
  }

  backBtn.onclick = () => {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    if (["bac-a-sable", "profil"].includes(parts[0])) parts.length = 0; else parts.pop();
    location.hash = "#/" + parts.join("/");
  };

  window.addEventListener("hashchange", render);
  render();

  // Mode hors ligne / installation (PWA)
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
})();
