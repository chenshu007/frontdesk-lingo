import "./style.css";

import { render as renderTimer } from "./tools/timer.js";
import { render as renderSnake } from "./tools/snake.js";
import { render as renderNotes } from "./tools/notes.js";
import { render as renderDashboard } from "./tools/dashboard.js";
import { render as renderReader } from "./tools/reader.js";
import { render as renderVelvet } from "./tools/velvet.js";
import { render as renderShadowStrike } from "./tools/shadowStrike.js";
import { render as renderArcanaMatch } from "./tools/arcanaMatch.js";
import { render as renderTerminalInput } from "./tools/terminalInput.js";
import { render as renderPhraseDeck } from "./tools/phraseDeck.js";

const tools = [
  { id: "timer", label: "DARK HOUR", sub: "下班倒计时", render: renderTimer },
  { id: "snake", label: "TARTARUS", sub: "贪吃蛇", render: renderSnake },
  { id: "notes", label: "JOURNAL", sub: "加密便签", render: renderNotes },
  { id: "dashboard", label: "STATUS BOARD", sub: "假仪表盘", render: renderDashboard },
  { id: "reader", label: "GEKKOUKAN", sub: "离线阅读器", render: renderReader },
  { id: "velvet", label: "VELVET ROOM", sub: "抽卡 / 决策轮盘", render: renderVelvet },
  { id: "shadow-strike", label: "SHADOW STRIKE", sub: "打Shadow", render: renderShadowStrike },
  { id: "arcana-match", label: "ARCANA MATCH", sub: "记忆翻牌", render: renderArcanaMatch },
  { id: "terminal-input", label: "TERMINAL INPUT", sub: "输入训练", render: renderTerminalInput },
  { id: "phrase-deck", label: "FRONTDESK PHRASE DECK", sub: "酒店话术", render: renderPhraseDeck }
];

const app = document.querySelector("#app");
let cleanup = null;

app.innerHTML = `
  <aside class="sidebar">
    <div class="sidebar-header">
      <span>FRONTDESK PHRASE DECK</span>
      <strong>OFFLINE HOTEL TOOLKIT</strong>
    </div>
    <nav class="nav-list" aria-label="工具导航"></nav>
    <div class="sidebar-footer">
      <span>LOCAL ONLY</span>
      <span>NO NETWORK REQUESTS</span>
    </div>
  </aside>
  <main class="workspace">
    <div class="scanline"></div>
    <section id="tool-root" class="tool-root"></section>
  </main>
`;

const nav = app.querySelector(".nav-list");
const root = app.querySelector("#tool-root");

tools.forEach((tool, index) => {
  const button = document.createElement("button");
  button.className = "nav-item";
  button.type = "button";
  button.dataset.tool = tool.id;
  button.innerHTML = `
    <span class="nav-index">${String(index + 1).padStart(2, "0")}</span>
    <span class="nav-copy">
      <span class="nav-label">${tool.label}</span>
      <small>${tool.sub}</small>
    </span>
  `;
  button.addEventListener("click", () => activate(tool.id));
  nav.append(button);
});

function activate(id) {
  const selected = tools.find((tool) => tool.id === id) || tools[0];
  cleanup?.();
  cleanup = null;
  document.body.dataset.tool = selected.id;
  nav.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.tool === selected.id);
  });
  root.replaceChildren();
  cleanup = selected.render(root) || null;
  localStorage.setItem("frontdesk_active_tool", selected.id);
}

activate(localStorage.getItem("frontdesk_active_tool") || "phrase-deck");
