const LINES = [
  "Memento Mori.",
  "不想上班是人类的本能。",
  "The Dark Hour hides between one meeting and the next.",
  "你无法逃脱上班这件事。",
  "Burn your dread, then close the spreadsheet.",
  "今日任务：优雅地活到下班。",
  "I am thou, thou art avoiding Jira.",
  "咖啡不是药，但像一个小型存档点。",
  "Time never waits, especially near deadline.",
  "老板靠近时，呼吸要像在分析数据。",
  "The arcana is the means by which all is revealed.",
  "准点下班也是一种勇气。",
  "A new shadow appeared in the calendar.",
  "不要和周报进行眼神交流。",
  "Check your equipment before entering Tartarus.",
  "摸鱼不是逃避，是 SP 管理。",
  "This place exists between dream and reality.",
  "会议纪要会记住你的沉默。",
  "Shuffle the deck and choose your task.",
  "下班铃声是今日最强神谕。",
  "All-Out Attack: inbox zero.",
  "不加班的人，灵魂会发光。",
  "The moon is full and the sprint is not.",
  "把需求拆小，像拆 Shadow 一样。",
  "Welcome to the Velvet Room.",
  "今天也要假装很懂 OKR。",
  "Your keyboard is your evoker.",
  "日报写得短，人生走得远。",
  "One more line, one more level.",
  "输入正确，命运前进一格。"
];

export function render(container) {
  let queue = [];
  let lineIndex = 0;
  let startedAt = 0;
  let totalTyped = 0;
  let correctTyped = 0;
  let completedChars = 0;
  let isComposing = false;
  let acceptedValue = "";

  container.innerHTML = `
    <section class="tool-screen terminal-screen">
      <header class="tool-title hero-title">
        <div>
          <span class="eyebrow">09 / KEYBOARD CALIBRATION</span>
          <h1>TERMINAL INPUT</h1>
          <p>10 行输入训练，外观就是正经 typing tutor。</p>
        </div>
        <div class="score-stack">
          <span>WPM <strong data-wpm>0</strong></span>
          <span>ACC <strong data-accuracy>100%</strong></span>
          <span>LINE <strong data-line>1/10</strong></span>
        </div>
      </header>
      <div class="panel terminal-panel">
        <div class="terminal-line" data-target></div>
        <label class="terminal-prompt">
          <span>&gt;</span>
          <input data-input autocomplete="off" spellcheck="false" aria-label="Typing input">
        </label>
        <div class="terminal-summary" data-summary hidden></div>
        <div class="button-row">
          <button class="p3-button" data-reset>RESET SESSION</button>
        </div>
      </div>
    </section>
  `;

  const target = container.querySelector("[data-target]");
  const input = container.querySelector("[data-input]");
  const wpmNode = container.querySelector("[data-wpm]");
  const accuracyNode = container.querySelector("[data-accuracy]");
  const lineNode = container.querySelector("[data-line]");
  const summary = container.querySelector("[data-summary]");

  function shuffle(items) {
    return items
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  function reset() {
    queue = shuffle(LINES).slice(0, 10);
    lineIndex = 0;
    startedAt = performance.now();
    totalTyped = 0;
    correctTyped = 0;
    completedChars = 0;
    isComposing = false;
    acceptedValue = "";
    summary.hidden = true;
    input.disabled = false;
    input.value = "";
    renderLine();
    updateStats();
    input.focus();
  }

  function currentLine() {
    return queue[lineIndex] || "";
  }

  function renderLine() {
    target.textContent = currentLine();
    lineNode.textContent = `${Math.min(lineIndex + 1, 10)}/10`;
  }

  function updateStats() {
    const minutes = Math.max((performance.now() - startedAt) / 60000, 1 / 60);
    const wpm = Math.round((completedChars / 5) / minutes);
    const accuracy = totalTyped ? Math.round((correctTyped / totalTyped) * 100) : 100;
    wpmNode.textContent = wpm;
    accuracyNode.textContent = `${accuracy}%`;
    return { wpm, accuracy };
  }

  function flashWrong() {
    input.classList.remove("wrong");
    void input.offsetWidth;
    input.classList.add("wrong");
  }

  function countNewCharacters(previous, value, expected) {
    if (value.length <= previous.length || !value.startsWith(previous)) return;
    const added = value.slice(previous.length);
    totalTyped += added.length;
    for (let index = 0; index < added.length; index += 1) {
      if (added[index] === expected[previous.length + index]) {
        correctTyped += 1;
      }
    }
  }

  function validateInput(value) {
    const expected = currentLine();
    countNewCharacters(acceptedValue, value, expected);
    if (!expected.startsWith(value)) {
      input.value = acceptedValue;
      flashWrong();
      updateStats();
      return;
    }
    acceptedValue = value;
    if (value === expected) {
      completedChars += expected.length;
      lineIndex += 1;
      input.value = "";
      acceptedValue = "";
      if (lineIndex >= 10) {
        const result = updateStats();
        input.disabled = true;
        summary.hidden = false;
        summary.innerHTML = `<strong>SESSION COMPLETE</strong><span>AVG WPM ${result.wpm}</span><span>ACCURACY ${result.accuracy}%</span>`;
      } else {
        renderLine();
      }
    }
    updateStats();
  }

  function onInput(event) {
    if (isComposing || event.isComposing) return;
    validateInput(input.value);
  }

  function onCompositionStart() {
    isComposing = true;
  }

  function onCompositionEnd() {
    isComposing = false;
    validateInput(input.value);
  }

  const resetButton = container.querySelector("[data-reset]");
  input.addEventListener("input", onInput);
  input.addEventListener("compositionstart", onCompositionStart);
  input.addEventListener("compositionend", onCompositionEnd);
  resetButton.addEventListener("click", reset);
  reset();

  return () => {
    input.removeEventListener("input", onInput);
    input.removeEventListener("compositionstart", onCompositionStart);
    input.removeEventListener("compositionend", onCompositionEnd);
    resetButton.removeEventListener("click", reset);
  };
}
