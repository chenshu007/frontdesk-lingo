export const CONFIG_KEY = "moyu_config";

export const DEFAULT_CONFIG = {
  unitName: "MAVERICK",
  displayLanguage: "zh",
  darkHourStart: "09:00",
  darkHourEnd: "18:00"
};

export function getConfig() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONFIG_KEY) || "{}");
    return normalizeConfig(saved);
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

export function setConfig(patch) {
  const next = normalizeConfig({ ...getConfig(), ...patch });
  localStorage.setItem(CONFIG_KEY, JSON.stringify(next));
  applyConfig(next);
  window.dispatchEvent(new CustomEvent("moyu-config-change", { detail: next }));
  return next;
}

export function applyConfig(config = getConfig()) {
  document.documentElement.dataset.unit = config.unitName;
}

function normalizeConfig(value) {
  const config = { ...DEFAULT_CONFIG, ...value };
  return {
    unitName: String(config.unitName || DEFAULT_CONFIG.unitName).trim() || DEFAULT_CONFIG.unitName,
    displayLanguage: config.displayLanguage === "en" ? "en" : "zh",
    darkHourStart: isTime(config.darkHourStart) ? config.darkHourStart : DEFAULT_CONFIG.darkHourStart,
    darkHourEnd: isTime(config.darkHourEnd) ? config.darkHourEnd : DEFAULT_CONFIG.darkHourEnd
  };
}

function isTime(value) {
  return typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}
