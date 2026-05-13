const ARCANA = [
  "The Fool",
  "The Magician",
  "The High Priestess",
  "The Empress",
  "The Emperor",
  "The Hierophant",
  "The Lovers",
  "The Chariot",
  "Strength",
  "The Hermit",
  "Wheel of Fortune",
  "Justice",
  "The Hanged Man",
  "Death",
  "Temperance",
  "The Devil",
  "The Tower",
  "The Star",
  "The Moon",
  "The Sun",
  "Judgement",
  "The World"
];

const MODES = {
  easy: { label: "Easy", cols: 4, count: 12, pairs: 6 },
  normal: { label: "Normal", cols: 4, count: 16, pairs: 8 },
  hard: { label: "Hard", cols: 4, count: 24, pairs: 12 }
};

export function render(container) {
  let mode = localStorage.getItem("frontdesk_arcana_match_mode") || "normal";
  let deck = [];
  let first = null;
  let second = null;
  let lock = false;
  let turns = 0;
  let matched = 0;
  let startedAt = 0;
  let elapsed = 0;
  let timer = 0;
  let pendingFlip = 0;

  container.innerHTML = `
    <section class="tool-screen match-screen">
      <header class="tool-title hero-title">
        <div>
          <span class="eyebrow">08 / ARCANA MEMORY TEST</span>
          <h1>ARCANA MATCH</h1>
          <p>翻开两张牌，配对 Major Arcana。</p>
        </div>
        <div class="score-stack">
          <span>TURNS <strong data-turns>0</strong></span>
          <span>TIME <strong data-time>0</strong></span>
          <span>BEST <strong data-best>--</strong></span>
        </div>
      </header>
      <div class="panel match-toolbar">
        <div class="button-row" data-modes>
          <button class="p3-button" data-mode="easy">EASY</button>
          <button class="p3-button" data-mode="normal">NORMAL</button>
          <button class="p3-button" data-mode="hard">HARD</button>
          <button class="p3-button" data-reset>RESET</button>
        </div>
      </div>
      <div class="match-grid" data-grid></div>
    </section>
  `;

  const grid = container.querySelector("[data-grid]");
  const turnsNode = container.querySelector("[data-turns]");
  const timeNode = container.querySelector("[data-time]");
  const bestNode = container.querySelector("[data-best]");

  function bestKey() {
    return `frontdesk_arcana_match_best_${mode}`;
  }

  function shuffle(items) {
    return items
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  function newGame() {
    window.clearInterval(timer);
    window.clearTimeout(pendingFlip);
    first = null;
    second = null;
    lock = false;
    turns = 0;
    matched = 0;
    elapsed = 0;
    startedAt = performance.now();
    const config = MODES[mode];
    const names = shuffle(ARCANA).slice(0, config.pairs);
    deck = shuffle([...names, ...names]).map((name, index) => ({ id: `${name}-${index}`, name, revealed: false, matched: false }));
    grid.style.setProperty("--match-cols", config.cols);
    renderCards();
    updateHud();
    timer = window.setInterval(() => {
      elapsed = Math.floor((performance.now() - startedAt) / 1000);
      timeNode.textContent = elapsed;
    }, 1000);
  }

  function updateHud() {
    turnsNode.textContent = turns;
    timeNode.textContent = elapsed;
    const best = JSON.parse(localStorage.getItem(bestKey()) || "null");
    bestNode.textContent = best ? `${best.turns}T/${best.time}S` : "--";
    container.querySelectorAll("[data-mode]").forEach((button) => button.classList.toggle("active", button.dataset.mode === mode));
  }

  function renderCards() {
    grid.innerHTML = deck.map((card, index) => `
      <button class="match-card tarot ${card.revealed || card.matched ? "flipped" : ""} ${card.matched ? "matched" : ""}" data-index="${index}" type="button">
        <span class="tarot-inner">
          <span class="tarot-face tarot-back">?</span>
          <span class="tarot-face tarot-front"><strong>${card.name}</strong><span>ARCANA</span></span>
        </span>
      </button>
    `).join("");
  }

  function scoreValue(value) {
    return value.turns * 1000 + value.time;
  }

  function finishIfDone() {
    if (matched !== deck.length) return;
    window.clearInterval(timer);
    const result = { turns, time: elapsed };
    const previous = JSON.parse(localStorage.getItem(bestKey()) || "null");
    if (!previous || scoreValue(result) < scoreValue(previous)) {
      localStorage.setItem(bestKey(), JSON.stringify(result));
    }
    updateHud();
  }

  function selectCard(index) {
    if (lock) return;
    const card = deck[index];
    if (!card || card.revealed || card.matched) return;
    card.revealed = true;
    if (!first) {
      first = index;
      renderCards();
      return;
    }
    second = index;
    turns += 1;
    const firstCard = deck[first];
    if (firstCard.name === card.name) {
      firstCard.matched = true;
      card.matched = true;
      matched += 2;
      first = null;
      second = null;
      renderCards();
      updateHud();
      finishIfDone();
      return;
    }
    lock = true;
    renderCards();
    updateHud();
    pendingFlip = window.setTimeout(() => {
      deck[first].revealed = false;
      deck[second].revealed = false;
      first = null;
      second = null;
      lock = false;
      renderCards();
    }, 760);
  }

  function onGridClick(event) {
    const card = event.target.closest("[data-index]");
    if (!card) return;
    selectCard(Number(card.dataset.index));
  }

  function onModeClick(event) {
    mode = event.currentTarget.dataset.mode;
    localStorage.setItem("frontdesk_arcana_match_mode", mode);
    newGame();
  }

  const modeButtons = [...container.querySelectorAll("[data-mode]")];
  const resetButton = container.querySelector("[data-reset]");
  modeButtons.forEach((button) => button.addEventListener("click", onModeClick));
  resetButton.addEventListener("click", newGame);
  grid.addEventListener("click", onGridClick);
  newGame();

  return () => {
    window.clearInterval(timer);
    window.clearTimeout(pendingFlip);
    modeButtons.forEach((button) => button.removeEventListener("click", onModeClick));
    resetButton.removeEventListener("click", newGame);
    grid.removeEventListener("click", onGridClick);
  };
}
