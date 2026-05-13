const BEST_KEY = "frontdesk_shadow_strike_best";
const ROUND_MS = 60000;
const GRID = 3;

export function render(container) {
  let score = 0;
  let misses = 0;
  let best = Number(localStorage.getItem(BEST_KEY) || 0);
  let active = [];
  let effects = [];
  let raf = 0;
  let lastSpawn = 0;
  let startTime = 0;
  let running = false;

  container.innerHTML = `
    <section class="tool-screen shadow-screen">
      <header class="tool-title hero-title">
        <div>
          <span class="eyebrow">07 / DARK HOUR TARGETING</span>
          <h1>SHADOW STRIKE</h1>
          <p>60 秒内点击弹出的 Shadow。越往后，错失窗口越短。</p>
        </div>
        <div class="score-stack">
          <span>SCORE <strong data-score>0</strong></span>
          <span>BEST <strong data-best>${best}</strong></span>
          <span>TIME <strong data-time>60</strong></span>
        </div>
      </header>
      <div class="grid-2">
        <div class="panel game-panel shadow-panel">
          <canvas width="540" height="540" data-shadow-board></canvas>
        </div>
        <aside class="panel p3-menu-card">
          <h2>COMMAND</h2>
          <button class="p3-button" data-start>START ROUND</button>
          <div class="shadow-stats">
            <span>MISS RATE</span>
            <strong data-miss>0%</strong>
          </div>
          <p class="muted">红色闪烁和 DEFEATED 表示命中。空点不会扣分，但错过 Shadow 会提高 miss rate。</p>
        </aside>
      </div>
    </section>
  `;

  const canvas = container.querySelector("[data-shadow-board]");
  const ctx = canvas.getContext("2d");
  const scoreNode = container.querySelector("[data-score]");
  const bestNode = container.querySelector("[data-best]");
  const timeNode = container.querySelector("[data-time]");
  const missNode = container.querySelector("[data-miss]");
  const startButton = container.querySelector("[data-start]");
  const cell = canvas.width / GRID;

  function reset() {
    score = 0;
    misses = 0;
    active = [];
    effects = [];
    lastSpawn = 0;
    startTime = performance.now();
    running = true;
    updateHud();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(frame);
  }

  function updateHud() {
    scoreNode.textContent = score;
    bestNode.textContent = best;
    const attempts = score + misses;
    missNode.textContent = attempts ? `${Math.round((misses / attempts) * 100)}%` : "0%";
  }

  function spawn(now) {
    const elapsed = now - startTime;
    const occupied = new Set(active.map((shadow) => shadow.index));
    const open = Array.from({ length: GRID * GRID }, (_, index) => index).filter((index) => !occupied.has(index));
    if (!open.length) return;
    const index = open[Math.floor(Math.random() * open.length)];
    const lifetime = Math.max(520, 1450 - elapsed / 70);
    active.push({ index, born: now, lifetime });
  }

  function frame(now) {
    const elapsed = now - startTime;
    const remaining = Math.max(0, ROUND_MS - elapsed);
    timeNode.textContent = Math.ceil(remaining / 1000);

    if (running && remaining <= 0) {
      running = false;
      active = [];
      effects.push({ text: "ROUND END", color: "#00d4e8", born: now, index: 4 });
      if (score > best) {
        best = score;
        localStorage.setItem(BEST_KEY, String(best));
      }
      updateHud();
    }

    const spawnGap = Math.max(360, 920 - elapsed / 85);
    if (running && now - lastSpawn > spawnGap) {
      lastSpawn = now;
      spawn(now);
      if (elapsed > 24000 && Math.random() > 0.45) spawn(now);
    }

    const before = active.length;
    active = active.filter((shadow) => now - shadow.born < shadow.lifetime);
    if (running && active.length < before) {
      misses += before - active.length;
      updateHud();
    }
    effects = effects.filter((effect) => now - effect.born < 520);
    draw(now);
    raf = requestAnimationFrame(frame);
  }

  function draw(now) {
    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(0, 212, 232, 0.22)";
    ctx.lineWidth = 2;
    for (let i = 1; i < GRID; i += 1) {
      ctx.beginPath();
      ctx.moveTo(i * cell, 0);
      ctx.lineTo(i * cell, canvas.height);
      ctx.moveTo(0, i * cell);
      ctx.lineTo(canvas.width, i * cell);
      ctx.stroke();
    }
    for (let index = 0; index < GRID * GRID; index += 1) {
      const { x, y } = centerFor(index);
      ctx.fillStyle = "rgba(0, 0, 0, 0.72)";
      ctx.strokeStyle = "rgba(0, 212, 232, 0.32)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.ellipse(x, y + 38, 62, 22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    active.forEach((shadow) => drawShadow(shadow, now));
    effects.forEach((effect) => drawEffect(effect, now));
  }

  function centerFor(index) {
    return {
      x: (index % GRID) * cell + cell / 2,
      y: Math.floor(index / GRID) * cell + cell / 2
    };
  }

  function drawShadow(shadow, now) {
    const { x, y } = centerFor(shadow.index);
    const age = now - shadow.born;
    const rise = Math.min(1, age / 180);
    const fall = Math.min(1, (shadow.lifetime - age) / 180);
    const scale = Math.max(0.2, Math.min(rise, fall));
    const radius = 45 * scale;
    ctx.save();
    ctx.translate(x, y + 28 - 30 * scale);
    ctx.shadowColor = "#00d4e8";
    ctx.shadowBlur = 18;
    ctx.fillStyle = "#050510";
    ctx.strokeStyle = "#00d4e8";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#e8f8ff";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.ellipse(-14 * scale, -6 * scale, 8 * scale, 4 * scale, -0.15, 0, Math.PI * 2);
    ctx.ellipse(14 * scale, -6 * scale, 8 * scale, 4 * scale, 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawEffect(effect, now) {
    const { x, y } = centerFor(effect.index);
    const age = now - effect.born;
    const alpha = 1 - age / 520;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = effect.color;
    ctx.shadowColor = effect.color;
    ctx.shadowBlur = 24;
    ctx.font = "700 26px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(effect.text, x, y);
    ctx.restore();
  }

  function onPointer(event) {
    if (!running) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((event.clientY - rect.top) / rect.height) * canvas.height;
    const index = Math.floor(x / cell) + Math.floor(y / cell) * GRID;
    const hit = active.find((shadow) => shadow.index === index);
    if (!hit) return;
    active = active.filter((shadow) => shadow !== hit);
    score += 1;
    effects.push({ text: "DEFEATED", color: "#ff3d5a", born: performance.now(), index });
    if (score > best) {
      best = score;
      localStorage.setItem(BEST_KEY, String(best));
    }
    updateHud();
  }

  startButton.addEventListener("click", reset);
  canvas.addEventListener("pointerdown", onPointer);
  draw(performance.now());

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    startButton.removeEventListener("click", reset);
    canvas.removeEventListener("pointerdown", onPointer);
  };
}
