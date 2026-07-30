const STORAGE_KEY = "kumanomae-training-v1";

const weeks = {
  1: { label: "フォーム習得", note: "全種目2セット・8回中心・RPE 6。重量よりフォームと腰の反応を確認。", sets: 2 },
  2: { label: "回数を増やす", note: "同じ重量で9～10回へ。RPE 6～7。まだ急いで重量を増やさない。", sets: 2 },
  3: { label: "少しだけ強く", note: "主要5動作は3セット・RPE 7。条件を満たした種目だけ最小単位で増量。", sets: 3 },
  4: { label: "疲労を抜く", note: "全種目2セット、重量を約10%軽くしてRPE 5～6。有酸素も楽に。", sets: 2 },
};

const days = {
  mon: {
    code: "MONDAY / FULL BODY A",
    title: "全身A：マシン中心",
    description: "掲載設備だけで完結する、最も再現しやすい基本日です。",
    time: "45–60 MIN",
    focus: "FULL BODY",
    warmup: "準備：トレッドミル5分 → 自重スクワット10回 → バードドッグ左右5回 → 軽い準備セット",
    exercises: [
      ["linear-leg-press", "リニアレッグプレス", "スクワット", "8–10", "6", 120, "リニアレッグプレス"],
      ["chest-press", "チェストプレス", "水平プレス", "8–10", "6", 120, "チェストプレス"],
      ["lat-pull", "ラットプル", "垂直プル", "8–10", "6", 120, "ラットプル"],
      ["glute-drive", "グルートドライブ", "股関節伸展", "10", "6", 90, "グルートドライブ"],
      ["shoulder-press", "ショルダープレス", "垂直プレス", "8–10", "6", 90, "ショルダープレス"],
      ["pallof-press", "ケーブル・パロフプレス", "体幹", "左右10", "軽め", 60, "ケーブル"],
    ],
  },
  tue: {
    code: "TUESDAY / CARDIO + CORE A",
    title: "有酸素＋体幹A",
    description: "最初の1か月は走るより速歩き。腰の反応を確かめながら活動量を確保します。",
    time: "35–45 MIN",
    focus: "CARDIO",
    warmup: "トレッドミルは傾斜1～3%。呼吸は増えるが会話できる速さに調整。",
    exercises: [
      ["treadmill-a", "トレッドミル速歩き", "有酸素", "25–30分", "4–5", 0, "トレッドミル", 1],
      ["bird-dog", "バードドッグ", "体幹", "左右6", "丁寧に", 45, "ヨガマット"],
      ["side-plank-knee", "膝付きサイドプランク", "体幹", "左右15–20秒", "余裕あり", 45, "ヨガマット"],
      ["recovery-a", "フォームローラー／軽いストレッチ", "回復", "5分", "痛みなし", 0, "フォームローラー", 1],
    ],
  },
  wed: {
    code: "WEDNESDAY / FULL BODY B",
    title: "全身B：基本動作の習得",
    description: "ケーブルと補助付きマシンを使い、ヒップヒンジと懸垂動作を安全に練習します。",
    time: "45–60 MIN",
    focus: "TECHNIQUE",
    warmup: "準備：トレッドミル5分 → ボックスへの自重スクワット → 棒を使ったヒップヒンジ練習8回",
    exercises: [
      ["smith-box-squat", "スミス・ボックススクワット", "スクワット", "8", "6", 120, "スミスマシン"],
      ["cable-pull-through", "ケーブル・プルスルー", "ヒップヒンジ", "10", "6", 90, "ケーブル"],
      ["incline-press", "インクラインプレス", "水平プレス", "8–10", "6", 120, "インクラインプレス"],
      ["assist-chin", "アシストチンニング", "垂直プル", "8", "6", 120, "アシストチンニング"],
      ["shoulder-press-b", "ショルダープレス", "垂直プレス", "8", "6", 90, "ショルダープレス"],
      ["seated-row", "シーテッドロー", "背中補助", "10", "6", 90, "シーテッドロー"],
      ["dead-bug", "デッドバグ", "体幹", "左右8", "丁寧に", 45, "ヨガマット"],
    ],
  },
  thu: {
    code: "THURSDAY / CARDIO + RECOVERY",
    title: "有酸素＋回復",
    description: "水曜日の疲労を残さず、無理のない範囲で活動量を確保します。",
    time: "35–45 MIN",
    focus: "RECOVERY",
    warmup: "痛みが出ない範囲でゆっくり開始。疲労が強い日は時間を短縮して構いません。",
    exercises: [
      ["treadmill-b", "トレッドミル速歩き", "有酸素", "25–30分", "4–5", 0, "トレッドミル", 1],
      ["glute-bridge", "グルートブリッジ", "臀部", "10", "軽め", 60, "ヨガマット"],
      ["dead-bug-b", "デッドバグ", "体幹", "左右8", "丁寧に", 45, "ヨガマット"],
      ["recovery-b", "フォームローラー／ストレッチ", "回復", "5分", "痛みなし", 0, "フォームローラー", 1],
    ],
  },
  fri: {
    code: "FRIDAY / FULL BODY C",
    title: "全身C：週の仕上げ",
    description: "週前半で覚えた動作を反復。重量より同じフォームを再現することを優先します。",
    time: "45–60 MIN",
    focus: "REPEAT",
    warmup: "準備：トレッドミル5分 → 自重スクワット10回 → ヒップヒンジ練習8回 → 軽い準備セット",
    exercises: [
      ["leg-press", "レッグプレス", "スクワット", "8–10", "6–7", 120, "レッグプレス"],
      ["db-bench", "ダンベルベンチプレス", "水平プレス", "8–10", "6–7", 120, "ダンベル＋ベンチ"],
      ["lat-pull-c", "ラットプル", "垂直プル", "8–10", "6–7", 120, "ラットプル"],
      ["pull-through-c", "ケーブル・プルスルー", "ヒップヒンジ", "10", "6", 90, "ケーブル"],
      ["shoulder-press-c", "ショルダープレス", "垂直プレス", "8–10", "6–7", 90, "ショルダープレス"],
      ["rear-delt", "リアデルトフライ", "肩後部補助", "10–12", "6", 60, "リアデルトフライ"],
      ["side-plank", "サイドプランク", "体幹", "左右15–25秒", "余裕あり", 45, "ヨガマット"],
    ],
  },
};

const normalizeExercise = ([id, name, type, reps, rpe, rest, machine, fixedSets]) =>
  ({ id, name, type, reps, rpe, rest, machine, fixedSets });
Object.values(days).forEach((day) => { day.exercises = day.exercises.map(normalizeExercise); });

const defaultState = { week: 1, day: "mon", workouts: {}, weekly: {} };
let state = loadState();
let timerId = null;
let remainingSeconds = 0;

const elements = {
  weekNote: document.querySelector("#weekNote"),
  dayCode: document.querySelector("#dayCode"),
  dayTitle: document.querySelector("#dayTitle"),
  dayDescription: document.querySelector("#dayDescription"),
  sessionTime: document.querySelector("#sessionTime"),
  sessionFocus: document.querySelector("#sessionFocus"),
  warmupBox: document.querySelector("#warmupBox"),
  exerciseList: document.querySelector("#exerciseList"),
  completionText: document.querySelector("#completionText"),
  completionBar: document.querySelector("#completionBar"),
  bodyWeight: document.querySelector("#bodyWeight"),
  painLevel: document.querySelector("#painLevel"),
  painOutput: document.querySelector("#painOutput"),
  weeklyNote: document.querySelector("#weeklyNote"),
  restTimer: document.querySelector("#restTimer"),
  timerDisplay: document.querySelector("#timerDisplay"),
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? { ...defaultState, ...saved } : { ...defaultState };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function workoutKey(exerciseId) {
  return `${state.week}:${state.day}:${exerciseId}`;
}

function getRecord(exerciseId) {
  return state.workouts[workoutKey(exerciseId)] || {};
}

function setRecord(exerciseId, patch) {
  const key = workoutKey(exerciseId);
  state.workouts[key] = { ...state.workouts[key], ...patch };
  saveState();
  updateCompletion();
}

function effectiveSets(exercise) {
  if (exercise.fixedSets) return exercise.fixedSets;
  const assistance = ["体幹", "背中補助", "肩後部補助", "回復", "有酸素"];
  return state.week === 3 && assistance.includes(exercise.type) ? 2 : weeks[state.week].sets;
}

function render() {
  renderWeek();
  renderDay();
  renderWeeklyLog();
}

function renderWeek() {
  document.querySelectorAll("[data-week]").forEach((button) => {
    button.setAttribute("aria-pressed", String(Number(button.dataset.week) === state.week));
  });
  elements.weekNote.textContent = `Week ${state.week}｜${weeks[state.week].label}：${weeks[state.week].note}`;
}

function renderDay() {
  const day = days[state.day];
  document.querySelectorAll("[data-day]").forEach((button) => {
    const selected = button.dataset.day === state.day;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  elements.dayCode.textContent = day.code;
  elements.dayTitle.textContent = day.title;
  elements.dayDescription.textContent = day.description;
  elements.sessionTime.textContent = day.time;
  elements.sessionFocus.textContent = day.focus;
  elements.warmupBox.textContent = day.warmup;
  elements.exerciseList.replaceChildren();

  day.exercises.forEach((exercise, index) => {
    const record = getRecord(exercise.id);
    const card = document.createElement("div");
    card.className = "exercise-card";
    card.innerHTML = `
      <label class="exercise-check" title="完了">
        <span class="sr-only">完了</span>
        <input type="checkbox" ${record.done ? "checked" : ""} aria-label="${exercise.name}を完了" />
      </label>
      <div class="exercise-name">
        <span>${String(index + 1).padStart(2, "0")} / ${exercise.machine}</span>
        <strong>${exercise.name}</strong>
      </div>
      <div class="exercise-stat"><span>SETS × REPS</span><strong>${effectiveSets(exercise)} × ${exercise.reps}</strong></div>
      <div class="exercise-stat"><span>INTENSITY</span><strong>RPE ${exercise.rpe}</strong></div>
      <div class="exercise-stat"><span>REST</span><strong>${exercise.rest ? `${exercise.rest}秒` : "—"}</strong></div>
      <div class="exercise-inputs">
        <label>重量<input type="number" min="0" step="0.5" inputmode="decimal" value="${record.weight ?? ""}" placeholder="kg" /></label>
        <label>実績回数<input type="text" value="${record.reps ?? ""}" placeholder="例 10,10" /></label>
        ${exercise.rest ? `<button class="rest-button" type="button">休憩タイマー ${exercise.rest}秒</button>` : ""}
      </div>`;

    const checkbox = card.querySelector('input[type="checkbox"]');
    const weightInput = card.querySelector('input[type="number"]');
    const repsInput = card.querySelector('input[type="text"]');
    checkbox.addEventListener("change", () => setRecord(exercise.id, { done: checkbox.checked }));
    weightInput.addEventListener("change", () => setRecord(exercise.id, { weight: weightInput.value }));
    repsInput.addEventListener("change", () => setRecord(exercise.id, { reps: repsInput.value }));
    card.querySelector(".rest-button")?.addEventListener("click", () => startTimer(exercise.rest));
    elements.exerciseList.append(card);
  });
  updateCompletion();
}

function updateCompletion() {
  const day = days[state.day];
  const completed = day.exercises.filter((exercise) => getRecord(exercise.id).done).length;
  elements.completionText.textContent = `${completed} / ${day.exercises.length} 完了`;
  elements.completionBar.style.width = `${(completed / day.exercises.length) * 100}%`;
}

function weeklyKey() {
  return `week-${state.week}`;
}

function renderWeeklyLog() {
  const weekly = state.weekly[weeklyKey()] || {};
  elements.bodyWeight.value = weekly.bodyWeight ?? "";
  elements.painLevel.value = weekly.painLevel ?? 0;
  elements.painOutput.value = weekly.painLevel ?? 0;
  elements.weeklyNote.value = weekly.note ?? "";
}

function updateWeekly(patch) {
  const key = weeklyKey();
  state.weekly[key] = { ...state.weekly[key], ...patch };
  saveState();
}

function startTimer(seconds) {
  clearInterval(timerId);
  remainingSeconds = seconds;
  elements.restTimer.hidden = false;
  updateTimerDisplay();
  timerId = setInterval(() => {
    remainingSeconds -= 1;
    updateTimerDisplay();
    if (remainingSeconds <= 0) {
      clearInterval(timerId);
      elements.timerDisplay.textContent = "READY";
      if ("vibrate" in navigator) navigator.vibrate([150, 80, 150]);
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(Math.max(remainingSeconds, 0) / 60);
  const seconds = Math.max(remainingSeconds, 0) % 60;
  elements.timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function cancelTimer() {
  clearInterval(timerId);
  timerId = null;
  elements.restTimer.hidden = true;
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `kumanomae-training-week${state.week}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function resetData() {
  if (!window.confirm("この端末に保存したトレーニング記録をすべて削除します。よろしいですか？")) return;
  state = { ...defaultState, workouts: {}, weekly: {} };
  saveState();
  render();
}

function chooseInitialDay() {
  if (localStorage.getItem(STORAGE_KEY)) return;
  const mapping = { 1: "mon", 2: "tue", 3: "wed", 4: "thu", 5: "fri" };
  state.day = mapping[new Date().getDay()] || "mon";
}

document.querySelectorAll("[data-week]").forEach((button) => {
  button.addEventListener("click", () => {
    state.week = Number(button.dataset.week);
    saveState();
    render();
  });
});

document.querySelectorAll("[data-day]").forEach((button) => {
  button.addEventListener("click", () => {
    state.day = button.dataset.day;
    saveState();
    renderDay();
  });
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    const buttons = [...document.querySelectorAll("[data-day]")];
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = buttons[(buttons.indexOf(event.currentTarget) + direction + buttons.length) % buttons.length];
    next.focus();
    next.click();
  });
});

elements.bodyWeight.addEventListener("change", () => updateWeekly({ bodyWeight: elements.bodyWeight.value }));
elements.painLevel.addEventListener("input", () => {
  elements.painOutput.value = elements.painLevel.value;
  updateWeekly({ painLevel: elements.painLevel.value });
});
elements.weeklyNote.addEventListener("change", () => updateWeekly({ note: elements.weeklyNote.value }));
document.querySelector("#cancelTimer").addEventListener("click", cancelTimer);
document.querySelector("#exportButton").addEventListener("click", exportData);
document.querySelector("#resetButton").addEventListener("click", resetData);
document.querySelector("#printButton").addEventListener("click", () => window.print());

chooseInitialDay();
render();
