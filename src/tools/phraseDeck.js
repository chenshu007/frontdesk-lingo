import { CATEGORIES as COMMS_CATEGORIES, LANGUAGES as COMMS_LANGUAGES } from "./comms-data.js";

const FAVORITES_KEY = "frontdesk_phrase_favorites";
const RECENT_KEY = "frontdesk_phrase_recent";
const SETTINGS_KEY = "frontdesk_phrase_settings";
const PRON_NOTE = "普通话音译仅供应急，不代表标准发音。";

const languages = [
  ["all", "全部语言"],
  ...COMMS_LANGUAGES.map(({ key, label }) => [key, label])
];

const languageDetails = Object.fromEntries(
  COMMS_LANGUAGES.map(({ key, label }) => [
    key,
    { translationLabel: label, showRomanization: key !== "en" }
  ])
);

const categories = COMMS_CATEGORIES.map(({ label }) => label);

function makeCommsEntry(category, phrase, index) {
  const entry = {
    id: `${category.id}-${String(index + 1).padStart(3, "0")}`,
    category: category.label,
    categoryCode: category.sublabel,
    tags: [
      category.label,
      category.sublabel,
      phrase.zh,
      ...COMMS_LANGUAGES.map(({ key }) => phrase[key]?.text).filter(Boolean)
    ],
    zh: phrase.zh,
    note: `${category.sublabel} · ${category.label}`
  };

  COMMS_LANGUAGES.forEach(({ key }) => {
    const item = phrase[key];
    entry[key] = {
      text: item.text,
      romanization: item.rom || item.text,
      cnPron: item.pin
    };
  });

  return entry;
}

export const phraseData = COMMS_CATEGORIES.flatMap((category) =>
  category.phrases.map((phrase, index) => makeCommsEntry(category, phrase, index))
);

export function validatePhraseData(data = phraseData, debug = null) {
  const shouldWarn = debug ?? Boolean(import.meta.env?.DEV || globalThis.localStorage?.getItem("frontdesk_phrase_debug") === "1");
  if (!shouldWarn) return [];
  const requiredLangs = languages.slice(1).map(([code]) => code);
  const phrase = (parts, separator = " ") => parts.join(separator);
  const banned = [
    phrase(["check", "advised"]),
    phrase(["polite", "phrase"]),
    phrase(["place", "holder"], ""),
    phrase(["T", "O", "D", "O"], ""),
    phrase(["T", "B", "D"], ""),
    phrase(["please", "check"]),
    phrase(["romaji", "check"]),
    phrase(["revised", "romanization", "check"]),
    phrase(["Japanese", "polite", "phrase"]),
    phrase(["Korean", "polite", "phrase"]),
    phrase(["Roman", "ization:"], "")
  ];
  const issues = [];
  data.forEach((phrase, index) => {
    ["id", "category", "zh"].forEach((field) => {
      if (!phrase[field]) issues.push({ id: phrase.id || `index-${index}`, field, problem: "missing" });
    });
    requiredLangs.forEach((lang) => {
      if (!phrase[lang]) {
        issues.push({ id: phrase.id, lang, problem: "missing language" });
        return;
      }
      ["text", "romanization", "cnPron"].forEach((field) => {
        const value = String(phrase[lang][field] || "").trim();
        if (!value) issues.push({ id: phrase.id, lang, field, problem: "empty" });
        if (banned.some((word) => value.includes(word))) issues.push({ id: phrase.id, lang, field, problem: "banned term" });
      });
      const cnPron = String(phrase[lang].cnPron || "").trim();
      if (cnPron === PRON_NOTE || cnPron.replace(/[^\u4e00-\u9fa5]/g, "").length < 2) {
        issues.push({ id: phrase.id, lang, field: "cnPron", problem: "not enough emergency reading" });
      }
    });
  });
  if (issues.length) console.warn("Phrase data validation issues:", issues);
  return issues;
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function phraseMatches(phrase, query) {
  if (!query) return true;
  const haystack = [
    phrase.zh,
    phrase.category,
    phrase.note,
    ...phrase.tags,
    ...languages.slice(1).flatMap(([code]) => [
      phrase[code].text,
      phrase[code].romanization,
      phrase[code].cnPron
    ])
  ].join(" ").toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function copyText(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).then(() => "clipboard").catch(() => fallbackCopy(text));
  }
  return fallbackCopy(text);
}

function fallbackCopy(text) {
  const node = document.createElement("textarea");
  node.value = text;
  node.style.position = "fixed";
  node.style.left = "-9999px";
  node.style.top = "0";
  document.body.append(node);
  node.focus();
  node.select();
  const copied = document.execCommand("copy");
  node.remove();
  if (copied) return Promise.resolve("execCommand");
  showManualCopy(text);
  return Promise.resolve("manual");
}

function showManualCopy(text) {
  document.querySelector("[data-copy-fallback]")?.remove();
  const overlay = document.createElement("div");
  overlay.className = "copy-fallback";
  overlay.dataset.copyFallback = "true";
  overlay.innerHTML = `
    <div class="copy-fallback-box">
      <h2>Manual Copy</h2>
      <p>当前浏览器限制了自动复制。请手动复制下面内容。</p>
      <textarea class="p3-textarea" readonly></textarea>
      <button class="p3-button" type="button">关闭</button>
    </div>
  `;
  const textarea = overlay.querySelector("textarea");
  textarea.value = text;
  overlay.querySelector("button").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) overlay.remove();
  });
  document.body.append(overlay);
  textarea.focus();
  textarea.select();
}

export function render(container) {
  let favorites = readJson(FAVORITES_KEY, []);
  let recent = readJson(RECENT_KEY, []);
  let settings = readJson(SETTINGS_KEY, { showPron: true, big: false, lang: "all", category: "all" });
  let query = "";

  container.innerHTML = `
    <section class="tool-screen phrase-screen">
      <header class="tool-title hero-title">
        <div>
          <span class="eyebrow">FRONT DESK COMMS</span>
          <h1>Frontdesk Phrase Deck</h1>
          <p>Offline multilingual phrase cheatsheet for hotel front desk teams.</p>
        </div>
        <div class="score-stack">
          <span>PHRASES <strong data-total>${phraseData.length}</strong></span>
          <span>FOUND <strong data-found>${phraseData.length}</strong></span>
        </div>
      </header>

      <div class="panel rate-card">
        <div class="rate-card-head">
          <div>
            <span class="eyebrow">FRONT DESK QUICK TOOL</span>
            <h2>Room Rate +15% Calculator</h2>
            <p>通用 service charge / tax calculator，输入房价后自动计算 +15%。</p>
          </div>
          <div class="button-row">
            <button class="p3-button" data-rate-copy type="button">COPY TOTAL</button>
            <button class="p3-button" data-rate-clear type="button">清空</button>
          </div>
        </div>
        <div class="rate-layout">
          <label class="field-group rate-input-wrap">BASE RATE
            <span class="rate-input-line">
              <b>HKD</b>
            <input class="p3-input" data-rate-input inputmode="decimal" autocomplete="off" aria-label="例如 1000">
            </span>
          </label>
          <div class="rate-presets" aria-label="常用金额">
            ${[500, 800, 1000, 1200, 1500, 2000].map((value) => `<button class="p3-button" data-rate-preset="${value}" type="button">${value}</button>`).join("")}
          </div>
        </div>
        <div class="rate-result" data-rate-result>
          <p class="muted">请输入有效金额，结果会实时显示。</p>
        </div>
      </div>

      <div class="panel phrase-controls">
        <label class="field-group">SEARCH
          <input class="p3-input" data-search aria-label="输入中文、英文、分类、标签或任意外语">
        </label>
        <label class="field-group">CATEGORY
          <select class="p3-select" data-category>
            <option value="all">全部分类</option>
            ${categories.map((item) => `<option value="${item}">${item}</option>`).join("")}
          </select>
        </label>
        <label class="field-group">LANGUAGE
          <select class="p3-select" data-lang>
            ${languages.map(([code, label]) => `<option value="${code}">${label}</option>`).join("")}
          </select>
        </label>
        <div class="button-row phrase-toggles">
          <button class="p3-button" data-toggle-pron type="button">显示发音</button>
          <button class="p3-button" data-toggle-big type="button">大字模式</button>
        </div>
        <p class="phrase-pron-note">${PRON_NOTE}</p>
      </div>

      <div class="grid-2 phrase-sidebars">
        <aside class="panel phrase-rail">
          <h2>FAVORITES</h2>
          <div data-favorites></div>
        </aside>
        <aside class="panel phrase-rail">
          <h2>RECENT</h2>
          <div data-recent></div>
        </aside>
      </div>

      <div class="phrase-list" data-list></div>
    </section>
  `;

  const searchInput = container.querySelector("[data-search]");
  const categorySelect = container.querySelector("[data-category]");
  const langSelect = container.querySelector("[data-lang]");
  const pronButton = container.querySelector("[data-toggle-pron]");
  const bigButton = container.querySelector("[data-toggle-big]");
  const screen = container.querySelector(".phrase-screen");
  const rateInput = container.querySelector("[data-rate-input]");
  const rateResult = container.querySelector("[data-rate-result]");
  const rateCopyButton = container.querySelector("[data-rate-copy]");
  const rateClearButton = container.querySelector("[data-rate-clear]");
  const list = container.querySelector("[data-list]");
  const foundNode = container.querySelector("[data-found]");
  const favoritesNode = container.querySelector("[data-favorites]");
  const recentNode = container.querySelector("[data-recent]");
  validatePhraseData();

  categorySelect.value = settings.category;
  langSelect.value = settings.lang;

  function persistSettings() {
    writeJson(SETTINGS_KEY, settings);
  }

  function money(value) {
    return new Intl.NumberFormat("en-HK", {
      style: "currency",
      currency: "HKD",
      currencyDisplay: "code",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  function parseRateInput() {
    const raw = rateInput.value.trim().replace(/,/g, "");
    if (!raw) return null;
    const value = Number(raw);
    return Number.isFinite(value) && value >= 0 ? value : NaN;
  }

  function rateValues() {
    const baseRate = parseRateInput();
    if (baseRate === null || Number.isNaN(baseRate)) return { baseRate };
    const serviceCharge = baseRate * 0.15;
    const totalRate = baseRate * 1.15;
    return { baseRate, serviceCharge, totalRate };
  }

  function renderRate() {
    const values = rateValues();
    rateCopyButton.disabled = values.baseRate === null || Number.isNaN(values.baseRate);
    if (values.baseRate === null) {
      rateResult.innerHTML = `<p class="muted">请输入有效金额，结果会实时显示。</p>`;
      return;
    }
    if (Number.isNaN(values.baseRate)) {
      rateResult.innerHTML = `<p class="rate-error">请输入有效数字，例如 1000 或 888.50。</p>`;
      return;
    }
    rateResult.innerHTML = `
      <div><span>Base Rate</span><strong>${money(values.baseRate)}</strong></div>
      <div><span>+15%</span><strong>${money(values.serviceCharge)}</strong></div>
      <div class="rate-total"><span>Total</span><strong>${money(values.totalRate)}</strong></div>
    `;
  }

  function flashRateCopy() {
    rateCopyButton.textContent = "已复制";
    window.setTimeout(() => {
      rateCopyButton.textContent = "COPY TOTAL";
    }, 900);
  }

  function copyRateTotal() {
    const values = rateValues();
    if (values.baseRate === null || Number.isNaN(values.baseRate)) return;
    copyText(`Total: ${money(values.totalRate)}`).then(flashRateCopy);
  }

  function remember(id) {
    recent = [id, ...recent.filter((item) => item !== id)].slice(0, 10);
    writeJson(RECENT_KEY, recent);
    renderRails();
  }

  function visibleLanguages() {
    return settings.lang === "all" ? languages.slice(1).map(([code]) => code) : [settings.lang];
  }

  function pronunciationHtml(code, item) {
    if (!settings.showPron) return "";
    const detail = languageDetails[code];
    const rows = [];
    if (detail.showRomanization) {
      rows.push(`<div><span>罗马音</span><b>${item.romanization}</b></div>`);
    }
    rows.push(`<div><span>普通话音译</span><b>${item.cnPron}</b></div>`);
    return `<div class="phrase-pron">${rows.join("")}</div>`;
  }

  function languageText(phrase, code) {
    const label = languageDetails[code].translationLabel;
    const item = phrase[code];
    const lines = [`${label}: ${item.text}`];
    if (languageDetails[code].showRomanization) lines.push(`罗马音: ${item.romanization}`);
    lines.push(`普通话音译: ${item.cnPron}`);
    return lines.join("\n");
  }

  function fullCardText(phrase) {
    return [
      `中文原文: ${phrase.zh}`,
      `分类：${phrase.category}`,
      `标签：${phrase.tags.join(" / ")}`,
      ...languages.slice(1).map(([code]) => languageText(phrase, code)),
      `备注：${phrase.note}`
    ].join("\n\n");
  }

  function renderRails() {
    const railItem = (id) => {
      const phrase = phraseData.find((item) => item.id === id);
      return phrase ? `<button class="phrase-mini" data-jump="${phrase.id}" type="button">${phrase.zh}<span>${phrase.category}</span></button>` : "";
    };
    favoritesNode.innerHTML = favorites.length ? favorites.map(railItem).join("") : `<p class="muted">暂无收藏。</p>`;
    recentNode.innerHTML = recent.length ? recent.map(railItem).join("") : `<p class="muted">暂无最近使用。</p>`;
  }

  function renderList() {
    settings.category = categorySelect.value;
    settings.lang = langSelect.value;
    screen.classList.toggle("phrase-big", settings.big);
    pronButton.classList.toggle("active", settings.showPron);
    pronButton.textContent = settings.showPron ? "隐藏发音" : "显示发音";
    bigButton.classList.toggle("active", settings.big);
    const filtered = phraseData.filter((phrase) =>
      phraseMatches(phrase, query) &&
      (settings.category === "all" || phrase.category === settings.category)
    );
    foundNode.textContent = filtered.length;
    list.innerHTML = filtered.map((phrase) => {
      const languageBlocks = visibleLanguages().map((code) => {
        const label = languages.find(([item]) => item === code)[1];
        const item = phrase[code];
        return `
          <section class="phrase-lang">
            <div class="phrase-lang-head">
              <strong>${label}</strong>
              <button class="p3-button phrase-copy" data-copy-lang="${phrase.id}:${code}" type="button">COPY</button>
            </div>
            <span class="phrase-field-label">${languageDetails[code].translationLabel}</span>
            <p>${item.text}</p>
            ${pronunciationHtml(code, item)}
          </section>
        `;
      }).join("");
      const favorite = favorites.includes(phrase.id);
      return `
        <article class="panel phrase-card" id="phrase-${phrase.id}">
          <div class="phrase-card-head">
            <div>
              <span class="eyebrow">中文原文 · ${phrase.category}</span>
              <h2>${phrase.zh}</h2>
            </div>
            <div class="button-row">
              <button class="p3-button ${favorite ? "active" : ""}" data-fav="${phrase.id}" type="button">${favorite ? "已收藏" : "收藏"}</button>
              <button class="p3-button" data-copy-card="${phrase.id}" type="button">COPY CARD</button>
            </div>
          </div>
          <div class="phrase-tags">${phrase.tags.slice(0, 6).map((tag) => `<span>${tag}</span>`).join("")}</div>
          <div class="phrase-langs">${languageBlocks}</div>
          <p class="muted phrase-note">${phrase.note}</p>
        </article>
      `;
    }).join("");
    renderRails();
    persistSettings();
  }

  function flashButton(button) {
    const old = button.textContent;
    button.textContent = "已复制";
    window.setTimeout(() => {
      button.textContent = old;
    }, 900);
  }

  function onClick(event) {
    const copyLang = event.target.closest("[data-copy-lang]");
    const copyCard = event.target.closest("[data-copy-card]");
    const fav = event.target.closest("[data-fav]");
    const jump = event.target.closest("[data-jump]");
    if (copyLang) {
      const [id, code] = copyLang.dataset.copyLang.split(":");
      const phrase = phraseData.find((item) => item.id === id);
      remember(id);
      copyText(languageText(phrase, code)).then(() => flashButton(copyLang));
    } else if (copyCard) {
      const phrase = phraseData.find((item) => item.id === copyCard.dataset.copyCard);
      remember(phrase.id);
      copyText(fullCardText(phrase)).then(() => flashButton(copyCard));
    } else if (fav) {
      const id = fav.dataset.fav;
      favorites = favorites.includes(id) ? favorites.filter((item) => item !== id) : [id, ...favorites];
      writeJson(FAVORITES_KEY, favorites);
      renderList();
    } else if (jump) {
      const target = container.querySelector(`#phrase-${jump.dataset.jump}`);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function onKeydown(event) {
    if (event.key === "/" && document.activeElement !== searchInput) {
      event.preventDefault();
      searchInput.focus();
    }
    if (event.key === "Escape") {
      query = "";
      searchInput.value = "";
      renderList();
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "b") {
      event.preventDefault();
      settings.big = !settings.big;
      renderList();
    }
  }

  searchInput.addEventListener("input", () => {
    query = searchInput.value.trim();
    renderList();
  });
  categorySelect.addEventListener("change", renderList);
  langSelect.addEventListener("change", renderList);
  rateInput.addEventListener("input", renderRate);
  rateCopyButton.addEventListener("click", copyRateTotal);
  rateClearButton.addEventListener("click", () => {
    rateInput.value = "";
    rateInput.focus();
    renderRate();
  });
  container.querySelectorAll("[data-rate-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      rateInput.value = button.dataset.ratePreset;
      renderRate();
      rateInput.focus();
    });
  });
  pronButton.addEventListener("click", () => {
    settings.showPron = !settings.showPron;
    renderList();
  });
  bigButton.addEventListener("click", () => {
    settings.big = !settings.big;
    renderList();
  });
  container.addEventListener("click", onClick);
  window.addEventListener("keydown", onKeydown);
  renderRate();
  renderList();

  return () => {
    container.removeEventListener("click", onClick);
    window.removeEventListener("keydown", onKeydown);
  };
}
