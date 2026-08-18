import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [html, app, css, readme] = await Promise.all([
  readFile(resolve(root, "index.html"), "utf8"),
  readFile(resolve(root, "app.js"), "utf8"),
  readFile(resolve(root, "styles.css"), "utf8"),
  readFile(resolve(root, "README.md"), "utf8"),
]);

test("personal baseline and transparent goal are shown", () => {
  for (const value of ["175cm", "85.5", "80.5", "BMI 27.9", "ストレッチ目標", "週0.5～0.9kg"]) {
    assert.ok(html.includes(value), `index.html should contain ${value}`);
  }
  assert.match(app, /START_WEIGHT = 85\.5/);
  assert.match(app, /TARGET_WEIGHT = 80\.5/);
});

test("four-week activity targets progress and deload safely", () => {
  const expected = [
    /1: \{ steps: 7000, cardio: 175, finisher: 15, main: 35/,
    /2: \{ steps: 7500, cardio: 200, finisher: 20, main: 40/,
    /3: \{ steps: 8000, cardio: 225, finisher: 20, main: 45/,
    /4: \{ steps: 8000, cardio: 200, finisher: 15, main: 40/,
  ];
  expected.forEach((pattern) => assert.match(app, pattern));
  assert.equal((app.match(/"finisher"\]/g) || []).length, 3);
  assert.equal((app.match(/"main"\]/g) || []).length, 2);
});

test("ab roller remains a separate 20-day weekday plan", () => {
  assert.equal((app.match(/mode: "/g) || []).length, 20);
  assert.ok(html.includes("別枠：アブローラー（膝コロ）"));
  assert.ok(app.includes("abRollerKey"));
});

test("weight-loss adherence fields persist and progress is rendered", () => {
  for (const id of ["averageSteps", "cardioMinutes", "nutritionDays", "goalProgressBar"]) {
    assert.ok(html.includes(`id="${id}"`), `missing #${id}`);
    assert.ok(app.includes(`#${id}`), `app.js should bind #${id}`);
  }
  assert.ok(app.includes("renderGoalProgress"));
  assert.ok(app.includes("saveState()"));
});

test("all JavaScript id selectors exist in HTML", () => {
  const ids = [...app.matchAll(/querySelector\("#([A-Za-z][\w-]*)"\)/g)].map((match) => match[1]);
  assert.ok(ids.length > 10);
  ids.forEach((id) => assert.ok(html.includes(`id="${id}"`), `missing HTML element #${id}`));
});

test("official safety sources and responsive styles ship with the page", () => {
  for (const source of ["cdc.gov/healthy-weight-growth/losing-weight", "niddk.nih.gov", "kennet.mhlw.go.jp", "odphp.health.gov"]) {
    assert.ok(html.includes(source), `missing source ${source}`);
  }
  assert.ok(html.includes("5kg減を保証するものではありません"));
  assert.ok(css.includes(".goal-summary"));
  assert.ok(css.includes("@media (max-width: 640px)"));
  assert.ok(readme.includes("安全運用の目安は週0.5～0.9kg"));
});
