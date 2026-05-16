import { getConfig, setConfig } from "../config.js";

export function render(container) {
  let config = getConfig();
  let draft = { ...config };

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

        <section class="config-section config-actions">
          <button class="p3-button primary" type="button" data-save-config>SAVE SETTINGS</button>
          <span class="config-save-state muted" data-config-save-state></span>
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
  const saveButton = container.querySelector("[data-save-config]");
  const saveState = container.querySelector("[data-config-save-state]");

  function syncControls(next = getConfig()) {
    config = next;
    draft = { ...next };
    container.querySelectorAll("[data-language]").forEach((button) => {
      button.classList.toggle("active", button.dataset.language === draft.displayLanguage);
    });
    if (document.activeElement !== unitInput) unitInput.value = draft.unitName;
    if (document.activeElement !== startInput) startInput.value = draft.darkHourStart;
    if (document.activeElement !== endInput) endInput.value = draft.darkHourEnd;
    updateSaveState("SAVED", false);
  }

  function updateSaveState(label, dirty = true) {
    saveState.textContent = label;
    saveButton.disabled = !dirty;
  }

  function markDirty() {
    updateSaveState("UNSAVED CHANGES");
  }

  unitInput.addEventListener("input", () => {
    draft.unitName = unitInput.value;
    markDirty();
  });
  startInput.addEventListener("input", () => {
    draft.darkHourStart = startInput.value;
    markDirty();
  });
  endInput.addEventListener("input", () => {
    draft.darkHourEnd = endInput.value;
    markDirty();
  });
  container.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      draft.displayLanguage = button.dataset.language;
      container.querySelectorAll("[data-language]").forEach((item) => {
        item.classList.toggle("active", item.dataset.language === draft.displayLanguage);
      });
      markDirty();
    });
  });
  saveButton.addEventListener("click", () => {
    const saved = setConfig({
      unitName: unitInput.value,
      displayLanguage: draft.displayLanguage,
      darkHourStart: startInput.value,
      darkHourEnd: endInput.value
    });
    syncControls(saved);
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
