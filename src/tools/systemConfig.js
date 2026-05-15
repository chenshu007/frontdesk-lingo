import { getConfig, setConfig } from "../config.js";

export function render(container) {
  let config = getConfig();

  container.innerHTML = `
    <section class="tool-screen system-config-screen">
      <header class="tool-title hero-title">
        <div>
          <span class="eyebrow">10 / CONTROL PANEL</span>
          <h1>SYSTEM CONFIG</h1>
          <p>本地系统偏好设置。</p>
        </div>
      </header>
      <div class="system-config-panel">
        <section class="config-section">
          <h2 class="nav-section-label">IDENTITY</h2>
          <label class="config-field">
            <span>Unit Name</span>
            <input class="p3-input" data-config="unitName" type="text" value="${escapeHtml(config.unitName)}">
          </label>
          <div class="config-field">
            <span>Display Language</span>
            <div class="segmented-control" role="group" aria-label="Display Language">
              <button class="p3-button" type="button" data-language="zh">ZH</button>
              <button class="p3-button" type="button" data-language="en">EN</button>
            </div>
          </div>
        </section>

        <section class="config-section">
          <h2 class="nav-section-label">DARK HOUR DEFAULTS</h2>
          <label class="config-field">
            <span>Default start time</span>
            <input class="p3-input" data-config="darkHourStart" type="time" value="${config.darkHourStart}">
          </label>
          <label class="config-field">
            <span>Default end time</span>
            <input class="p3-input" data-config="darkHourEnd" type="time" value="${config.darkHourEnd}">
          </label>
        </section>

        <section class="config-section danger-zone">
          <h2 class="nav-section-label">DANGER ZONE</h2>
          <button class="p3-button danger" type="button" data-clear-moyu>Clear all data</button>
        </section>
      </div>
    </section>
  `;

  const unitInput = container.querySelector('[data-config="unitName"]');
  const startInput = container.querySelector('[data-config="darkHourStart"]');
  const endInput = container.querySelector('[data-config="darkHourEnd"]');

  function syncControls(next = getConfig()) {
    config = next;
    container.querySelectorAll("[data-language]").forEach((button) => {
      button.classList.toggle("active", button.dataset.language === config.displayLanguage);
    });
    if (document.activeElement !== unitInput) unitInput.value = config.unitName;
    if (document.activeElement !== startInput) startInput.value = config.darkHourStart;
    if (document.activeElement !== endInput) endInput.value = config.darkHourEnd;
  }

  unitInput.addEventListener("input", () => setConfig({ unitName: unitInput.value }));
  startInput.addEventListener("change", () => setConfig({ darkHourStart: startInput.value }));
  endInput.addEventListener("change", () => setConfig({ darkHourEnd: endInput.value }));
  container.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => setConfig({ displayLanguage: button.dataset.language }));
  });
  container.querySelector("[data-clear-moyu]").addEventListener("click", () => {
    if (!window.confirm("Clear all moyu_ data?")) return;
    if (!window.confirm("This cannot be undone. Clear all moyu_ data now?")) return;
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("moyu_")) localStorage.removeItem(key);
    });
    location.reload();
  });

  syncControls(config);

  const handleConfigChange = (event) => syncControls(event.detail);
  window.addEventListener("moyu-config-change", handleConfigChange);

  return () => {
    window.removeEventListener("moyu-config-change", handleConfigChange);
  };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}
