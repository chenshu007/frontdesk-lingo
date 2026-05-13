const STORAGE_KEY = "frontdesk_velvet_options";
const ARCANA = [
  ["The Fool", "Begin where certainty ends."],
  ["The Magician", "Skill turns impulse into fire."],
  ["The Priestess", "The answer waits below thought."],
  ["The Empress", "Creation asks for command."],
  ["The Emperor", "Choose structure, then break it."],
  ["The Hierophant", "Tradition is a key, not a cage."],
  ["The Lovers", "The heart has already voted."],
  ["The Chariot", "Move before fear organizes."],
  ["Justice", "Balance is a blade."],
  ["The Hermit", "Silence is also data."],
  ["Fortune", "The wheel turns because you touch it."],
  ["Strength", "Soft hands can hold hard truths."],
  ["The Hanged Man", "Invert the problem."],
  ["Death", "Endings are efficient."],
  ["Temperance", "Mix what refuses to meet."],
  ["The Devil", "Name the attachment."],
  ["The Tower", "Collapse is sometimes clarity."],
  ["The Star", "Hope is a navigation system."],
  ["The Moon", "Beware the beautiful fog."],
  ["The Sun", "Make it visible."],
  ["Judgement", "The file is ready to close."],
  ["The World", "Everything belongs to the result."]
];

export function render(container) {
  const saved = localStorage.getItem(STORAGE_KEY) || "准点下班\n继续摸鱼\n喝咖啡\n假装开会\n写日报";
  let options = saved.split("\n").map((item) => item.trim()).filter(Boolean);
  let drawCount = 1;
  let wheelAngle = 0;
  let spinning = false;

  container.innerHTML = `
    <section class="tool-screen velvet-screen">
      <header class="velvet-quote">
        <p>"Welcome to the Velvet Room.<br>This place exists between dream and reality,<br>mind and matter."</p>
        <span>— Igor</span>
      </header>
      <div class="velvet-layout">
        <aside class="panel velvet-input">
          <textarea class="p3-textarea" data-options aria-label="每行输入一个选项">${saved}</textarea>
          <button class="p3-button gold" data-load>载入选项</button>
          <div class="button-row mode-row">
            <button class="p3-button gold active" data-tab="draw">ARCANA DRAW</button>
            <button class="p3-button gold" data-tab="wheel">WHEEL OF FORTUNE</button>
          </div>
        </aside>
        <main class="panel velvet-stage">
          <section data-draw>
            <div class="button-row">
              <select class="p3-select" data-count><option>1</option><option>3</option><option>5</option></select>
              <button class="p3-button gold" data-draw-button>DRAW</button>
            </div>
            <div class="cards" data-cards></div>
            <div class="oracle" data-oracle></div>
          </section>
          <section data-wheel hidden>
            <canvas width="520" height="520" data-wheel-canvas></canvas>
            <button class="p3-button gold spin-button" data-spin>SPIN</button>
            <div class="oracle" data-wheel-result></div>
          </section>
        </main>
      </div>
    </section>
  `;

  const cards = container.querySelector("[data-cards]");
  const oracle = container.querySelector("[data-oracle]");
  const wheelResult = container.querySelector("[data-wheel-result]");
  const canvas = container.querySelector("[data-wheel-canvas]");
  const ctx = canvas.getContext("2d");

  function loadOptions() {
    options = container.querySelector("[data-options]").value.split("\n").map((item) => item.trim()).filter(Boolean);
    if (!options.length) options = ["沉默"];
    localStorage.setItem(STORAGE_KEY, options.join("\n"));
    renderCards();
    drawWheel();
  }

  function pick() {
    const option = options[Math.floor(Math.random() * options.length)];
    const arcana = ARCANA[Math.floor(Math.random() * ARCANA.length)];
    return { option, arcana };
  }

  function renderCards(results = []) {
    cards.innerHTML = Array.from({ length: Math.max(drawCount, 5) }, (_, index) => {
      const result = results[index];
      return `<div class="tarot ${result ? "flipped" : ""}">
        <div class="tarot-inner">
          <div class="tarot-face tarot-back">?</div>
          <div class="tarot-face tarot-front">${result ? `<strong>${result.option}</strong><span>${result.arcana[0]}</span>` : ""}</div>
        </div>
      </div>`;
    }).join("");
  }

  function doDraw() {
    const results = Array.from({ length: drawCount }, pick);
    renderCards(results);
    oracle.innerHTML = results.map((result) => `<p><strong>${result.option}</strong> / ${result.arcana[0]}<br>${result.arcana[1]}</p>`).join("");
  }

  function drawWheel(highlight = -1) {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = 220;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const slice = (Math.PI * 2) / options.length;
    options.forEach((option, index) => {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, wheelAngle + index * slice, wheelAngle + (index + 1) * slice);
      ctx.closePath();
      ctx.fillStyle = index === highlight ? "#c9a84c" : index % 2 ? "#071154" : "#0076ff";
      ctx.fill();
      ctx.strokeStyle = "#c9a84c";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(wheelAngle + index * slice + slice / 2);
      ctx.fillStyle = "#fff";
      ctx.font = "700 20px system-ui";
      ctx.fillText(option.slice(0, 14), 72, 7);
      ctx.restore();
    });
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(cx, 24);
    ctx.lineTo(cx - 16, 64);
    ctx.lineTo(cx + 16, 64);
    ctx.closePath();
    ctx.fill();
  }

  function spin() {
    if (spinning) return;
    spinning = true;
    const duration = 4000 + Math.random() * 2000;
    const target = wheelAngle + Math.PI * 8 + Math.random() * Math.PI * 4;
    const start = performance.now();
    const initial = wheelAngle;
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      wheelAngle = initial + (target - initial) * eased;
      drawWheel();
      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        const slice = (Math.PI * 2) / options.length;
        const normalized = ((Math.PI * 1.5 - wheelAngle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const index = Math.floor(normalized / slice) % options.length;
        drawWheel(index);
        wheelResult.textContent = `RESULT / ${options[index]}`;
        spinning = false;
      }
    }
    requestAnimationFrame(frame);
  }

  container.querySelector("[data-load]").addEventListener("click", loadOptions);
  container.querySelector("[data-draw-button]").addEventListener("click", doDraw);
  container.querySelector("[data-count]").addEventListener("change", (event) => {
    drawCount = Number(event.target.value);
    renderCards();
  });
  container.querySelector("[data-spin]").addEventListener("click", spin);
  container.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const draw = button.dataset.tab === "draw";
      container.querySelector("[data-draw]").hidden = !draw;
      container.querySelector("[data-wheel]").hidden = draw;
      container.querySelectorAll("[data-tab]").forEach((item) => item.classList.toggle("active", item === button));
      drawWheel();
    });
  });
  renderCards();
  drawWheel();
  return () => {};
}
