import "./style.css";

import { applyConfig, getConfig } from "./config.js";
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
import { render as renderSystemConfig } from "./tools/systemConfig.js";

const tools = [
  { id: "timer", label: "DARK HOUR", subZh: "下班倒计时", subEn: "Workday countdown", render: renderTimer },
  { id: "snake", label: "TARTARUS", subZh: "贪吃蛇", subEn: "Snake protocol", render: renderSnake },
  { id: "notes", label: "JOURNAL", subZh: "加密便签", subEn: "Encrypted notes", render: renderNotes },
  { id: "dashboard", label: "STATUS BOARD", subZh: "假仪表盘", subEn: "Mock telemetry", render: renderDashboard },
  { id: "reader", label: "GEKKOUKAN", subZh: "离线阅读器", subEn: "Offline reader", render: renderReader },
  { id: "velvet", label: "VELVET ROOM", subZh: "抽卡 / 决策轮盘", subEn: "Cards / decision wheel", render: renderVelvet },
  { id: "shadow-strike", label: "SHADOW STRIKE", subZh: "打Shadow", subEn: "Shadow training", render: renderShadowStrike },
  { id: "arcana-match", label: "ARCANA MATCH", subZh: "记忆翻牌", subEn: "Memory cards", render: renderArcanaMatch },
  { id: "terminal-input", label: "TERMINAL INPUT", subZh: "输入训练", subEn: "Typing drill", render: renderTerminalInput },
  { id: "phrase-deck", label: "FRONTDESK PHRASE DECK", subZh: "酒店话术", subEn: "Hotel phrases", render: renderPhraseDeck },
  {
    id: "system-config",
    label: "SYSTEM CONFIG",
    subZh: "系统设置",
    subEn: "System settings",
    render: renderSystemConfig,
    separated: true,
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 7h10" />
        <path d="M18 7h2" />
        <path d="M4 17h3" />
        <path d="M11 17h9" />
        <circle cx="16" cy="7" r="2" />
        <circle cx="9" cy="17" r="2" />
      </svg>
    `
  }
];

const app = document.querySelector("#app");
const BOOT_SESSION_KEY = "moyu_boot_intro_seen";
let cleanup = null;

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function typeBootLine(line, text, speed = 8) {
  const output = line.querySelector("[data-boot-text]");
  line.classList.add("active");
  for (const char of text) {
    output.textContent += char;
    await wait(speed);
  }
  line.classList.remove("active");
}

async function runBootIntro() {
  const config = getConfig();
  const overlay = document.createElement("div");
  overlay.className = "boot-intro";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `
    <div class="boot-terminal">
      <div class="boot-line"><span data-boot-text></span><span class="boot-cursor" aria-hidden="true">|</span></div>
      <div class="boot-line"><span data-boot-text></span><span class="boot-cursor" aria-hidden="true">|</span></div>
      <div class="boot-line"><span data-boot-text></span><span class="boot-cursor" aria-hidden="true">|</span></div>
      <div class="boot-sweep" aria-hidden="true"></div>
    </div>
  `;
  document.body.prepend(overlay);
  const lines = [...overlay.querySelectorAll(".boot-line")];

  await typeBootLine(lines[0], "S.E.E.S. SYSTEM ONLINE");
  await wait(80);
  await typeBootLine(lines[1], "DARK HOUR PROTOCOL INITIALIZING...");
  await wait(80);
  await typeBootLine(lines[2], `UNIT: ${config.unitName.toUpperCase()} — AUTHENTICATED`);
  await wait(120);
  overlay.classList.add("sweeping");
  await wait(220);
  overlay.classList.add("fade-out");
  await wait(220);
  overlay.remove();
}

function shouldRunBootIntro() {
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  return !reducedMotion && sessionStorage.getItem(BOOT_SESSION_KEY) !== "1";
}

function scheduleBootIntro() {
  if (!shouldRunBootIntro()) return;
  sessionStorage.setItem(BOOT_SESSION_KEY, "1");
  window.setTimeout(() => {
    runBootIntro().catch(() => {});
  }, 250);
}

function renderApp() {
  const config = getConfig();
  app.classList.add("app-enter");
  app.innerHTML = `
    <aside class="sidebar">
      <div class="sidebar-header">
        <span>S.E.E.S. SYSTEM</span>
        <strong data-unit-name>UNIT: ${config.unitName.toUpperCase()}</strong>
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
    button.className = `nav-item${tool.separated ? " nav-item-separated" : ""}`;
    button.type = "button";
    button.dataset.tool = tool.id;
    button.innerHTML = `
      <span class="nav-index">
        ${tool.icon ? `<span class="nav-icon">${tool.icon}</span>` : String(index + 1).padStart(2, "0")}
      </span>
      <span class="nav-copy">
        <span class="nav-label">${tool.label}</span>
        <small data-sub-label>${config.displayLanguage === "en" ? tool.subEn : tool.subZh}</small>
      </span>
    `;
    button.addEventListener("click", () => activate(tool.id, nav, root));
    nav.append(button);
  });

  activate(localStorage.getItem("frontdesk_active_tool") || "phrase-deck", nav, root);
  updateShellConfig(config);
  requestAnimationFrame(() => app.classList.add("app-enter-active"));
}

function activate(id, nav, root) {
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

function start() {
  applyConfig();
  renderApp();
  scheduleBootIntro();
}

function updateShellConfig(config = getConfig()) {
  const unit = app.querySelector("[data-unit-name]");
  if (unit) unit.textContent = `UNIT: ${config.unitName.toUpperCase()}`;
  app.querySelectorAll(".nav-item").forEach((item) => {
    const tool = tools.find((entry) => entry.id === item.dataset.tool);
    const label = item.querySelector("[data-sub-label]");
    if (tool && label) label.textContent = config.displayLanguage === "en" ? tool.subEn : tool.subZh;
  });
}

window.addEventListener("moyu-config-change", (event) => {
  updateShellConfig(event.detail);
});

start();
