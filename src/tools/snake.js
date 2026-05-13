const BEST_KEY = "frontdesk_tartarus_best";
const CELL = 18;

export function render(container) {
  container.innerHTML = `
    <section class="tool-screen snake-screen">
      <header class="tool-title hero-title">
        <div>
          <span class="eyebrow">02 / TARTARUS BLOCK</span>
          <h1>TARTARUS</h1>
          <p>方向键移动，B 键切换绩效伪装层。</p>
        </div>
        <div class="score-stack">
          <span>SCORE <strong data-score>0</strong></span>
          <span>BEST <strong data-best>0</strong></span>
        </div>
      </header>
      <div class="grid-2">
        <div class="panel game-panel">
          <canvas width="540" height="360" data-board></canvas>
        </div>
        <aside class="panel p3-menu-card">
          <h2>COMMAND</h2>
          <button class="p3-button" data-start>START / RESET</button>
          <p class="muted">食物是红色菱形。分数越高，Dark Hour 越快。</p>
          <div class="mini-help">BOSS KEY: <strong>B</strong></div>
        </aside>
      </div>
      <div class="boss-layer" data-boss hidden>
        <div class="boss-sheet">
          <h1>Q3 PERFORMANCE MATRIX</h1>
          <table>
            <thead><tr><th>Dept</th><th>Owner</th><th>Revenue</th><th>Risk</th><th>Forecast</th></tr></thead>
            <tbody>
              <tr><td>Ops</td><td>Y. Takeba</td><td>128%</td><td>Low</td><td>+14.2%</td></tr>
              <tr><td>Sales</td><td>J. Iori</td><td>93%</td><td>Medium</td><td>+3.7%</td></tr>
              <tr><td>BI</td><td>M. Kirijo</td><td>141%</td><td>Low</td><td>+18.9%</td></tr>
              <tr><td>Infra</td><td>A. Sanada</td><td>112%</td><td>Low</td><td>+8.1%</td></tr>
              <tr><td>HR</td><td>F. Yamagishi</td><td>87%</td><td>Watch</td><td>-1.4%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;

  const canvas = container.querySelector("[data-board]");
  const ctx = canvas.getContext("2d");
  const scoreNode = container.querySelector("[data-score]");
  const bestNode = container.querySelector("[data-best]");
  const boss = container.querySelector("[data-boss]");
  const cols = canvas.width / CELL;
  const rows = canvas.height / CELL;
  let snake;
  let food;
  let dir;
  let nextDir;
  let score;
  let loop = 0;
  let last = 0;
  let best = Number(localStorage.getItem(BEST_KEY) || 0);
  bestNode.textContent = best;

  function reset() {
    snake = [{ x: 7, y: 8 }, { x: 6, y: 8 }, { x: 5, y: 8 }];
    dir = { x: 1, y: 0 };
    nextDir = dir;
    score = 0;
    placeFood();
    updateScore();
    last = 0;
    cancelAnimationFrame(loop);
    loop = requestAnimationFrame(tick);
  }

  function placeFood() {
    food = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows)
    };
    if (snake.some((part) => part.x === food.x && part.y === food.y)) placeFood();
  }

  function updateScore() {
    scoreNode.textContent = score;
    if (score > best) {
      best = score;
      localStorage.setItem(BEST_KEY, String(best));
      bestNode.textContent = best;
    }
  }

  function tick(time) {
    const speed = Math.max(70, 150 - score * 5);
    if (time - last >= speed) {
      last = time;
      step();
      draw();
    }
    loop = requestAnimationFrame(tick);
  }

  function step() {
    dir = nextDir;
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
    const dead = head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows || snake.some((part) => part.x === head.x && part.y === head.y);
    if (dead) {
      reset();
      return;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score += 1;
      updateScore();
      placeFood();
    } else {
      snake.pop();
    }
  }

  function drawGrid() {
    ctx.fillStyle = "#0a0a2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(113, 254, 252, .16)";
    for (let x = 0; x <= canvas.width; x += CELL) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += CELL) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  function draw() {
    drawGrid();
    ctx.shadowBlur = 14;
    ctx.shadowColor = "#00d4e8";
    ctx.fillStyle = "#00d4e8";
    snake.forEach((part, index) => {
      ctx.fillStyle = index === 0 ? "#ffffff" : "#00d4e8";
      ctx.fillRect(part.x * CELL + 2, part.y * CELL + 2, CELL - 4, CELL - 4);
    });
    ctx.shadowColor = "#ff1749";
    ctx.fillStyle = "#ff1749";
    const cx = food.x * CELL + CELL / 2;
    const cy = food.y * CELL + CELL / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 8);
    ctx.lineTo(cx + 8, cy);
    ctx.lineTo(cx, cy + 8);
    ctx.lineTo(cx - 8, cy);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function onKey(event) {
    const map = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 }
    };
    if (event.key.toLowerCase() === "b") {
      boss.hidden = !boss.hidden;
      return;
    }
    if (!map[event.key]) return;
    event.preventDefault();
    const chosen = map[event.key];
    if (chosen.x + dir.x !== 0 || chosen.y + dir.y !== 0) nextDir = chosen;
  }

  container.querySelector("[data-start]").addEventListener("click", reset);
  window.addEventListener("keydown", onKey);
  reset();
  return () => {
    cancelAnimationFrame(loop);
    window.removeEventListener("keydown", onKey);
  };
}
