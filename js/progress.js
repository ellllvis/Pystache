// Progression sauvegardée dans le navigateur (localStorage).
// Si le stockage est indisponible (navigation privée...), l'appli marche quand même, sans mémoire.
window.Progress = (function () {
  const KEY = "pyetapes.progress.v1";

  // Barème des points
  const POINTS = { quiz: 10, exercise: 20, lesson: 5 };

  const fresh = () => ({ done: {}, code: {}, quiz: {}, ex: {}, xp: 0, streak: 0, lastDay: null });
  let state = fresh();

  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = Object.assign(fresh(), JSON.parse(raw));
  } catch (e) { /* stockage indisponible */ }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignoré */ }
  }

  // Date du jour en heure locale, au format AAAA-MM-JJ.
  const dayStr = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  // Série de jours : +1 si on apprend un jour qui suit le précédent, repart à 1 après un trou.
  function touchDay() {
    const today = dayStr(new Date());
    if (state.lastDay === today) return;
    const y = new Date(); y.setDate(y.getDate() - 1);
    state.streak = state.lastDay === dayStr(y) ? state.streak + 1 : 1;
    state.lastDay = today;
  }

  // Ajoute des points et renvoie le nombre gagné (0 si déjà gagné avant).
  function gain(n) {
    touchDay();
    state.xp += n;
    return n;
  }

  return {
    POINTS,
    isDone: (id) => !!state.done[id],
    setDone(id, value) {
      let won = 0;
      if (value && !state.done[id]) {
        state.done[id] = Date.now();
        // Les points d'une leçon ne se gagnent qu'une fois, même si on la décoche puis la recoche.
        if (!state.done["pts:" + id]) { state.done["pts:" + id] = 1; won = gain(POINTS.lesson); }
      } else if (!value) delete state.done[id];
      save();
      return won;
    },
    doneCount: () => Object.keys(state.done).filter((k) => !k.startsWith("pts:")).length,

    // Quiz : "ok" = juste du premier coup (points), "tried" = trouvé après une erreur.
    quizState: (qid) => state.quiz[qid],
    answerQuiz(qid, correct) {
      let won = 0;
      if (state.quiz[qid] === "ok" || state.quiz[qid] === "late") return 0;
      if (correct) {
        if (state.quiz[qid] === "tried") state.quiz[qid] = "late";
        else { state.quiz[qid] = "ok"; won = gain(POINTS.quiz); }
      } else state.quiz[qid] = "tried";
      save();
      return won;
    },
    quizCounts() {
      const v = Object.values(state.quiz);
      return { first: v.filter((x) => x === "ok").length, answered: v.filter((x) => x !== "tried").length };
    },

    isExerciseDone: (id) => !!state.ex[id],
    exerciseDone(id) {
      if (state.ex[id]) return 0;
      state.ex[id] = Date.now();
      const won = gain(POINTS.exercise);
      save();
      return won;
    },
    exerciseCount: () => Object.keys(state.ex).length,

    xp: () => state.xp,
    streak() {
      // La série est perdue si le dernier jour d'apprentissage date d'avant-hier ou plus.
      if (!state.lastDay) return 0;
      const y = new Date(); y.setDate(y.getDate() - 1);
      return state.lastDay === dayStr(new Date()) || state.lastDay === dayStr(y) ? state.streak : 0;
    },

    getCode: (id) => state.code[id],
    setCode(id, code) { state.code[id] = code; save(); },
    reset() { state = fresh(); save(); },
  };
})();
