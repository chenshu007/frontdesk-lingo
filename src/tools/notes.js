import { marked } from "marked";

const DATA_KEY = "frontdesk_journal_data";
const SALT_KEY = "frontdesk_journal_salt";
const enc = new TextEncoder();
const dec = new TextDecoder();

export function render(container) {
  const hasVault = Boolean(localStorage.getItem(DATA_KEY));
  let unlockedKey = null;
  let mode = "edit";

  container.innerHTML = `
    <section class="tool-screen journal-screen">
      <header class="tool-title hero-title">
        <div>
          <span class="eyebrow">03 / MEMORY VAULT</span>
          <h1>JOURNAL</h1>
          <p>本地 AES-GCM 加密 Markdown 便签。</p>
        </div>
      </header>
      <div class="panel journal-lock" data-lock>
        <h2>${hasVault ? "UNLOCK JOURNAL" : "SET PASSWORD"}</h2>
        <input class="p3-input" type="password" data-password aria-label="Password">
        <div class="button-row">
          <button class="p3-button" data-unlock>${hasVault ? "UNLOCK" : "CREATE"}</button>
          <button class="p3-button danger" data-clear>清除所有数据</button>
        </div>
        <p class="muted" data-message></p>
      </div>
      <div class="journal-editor" data-editor hidden>
        <div class="button-row">
          <button class="p3-button active" data-mode="edit">EDIT</button>
          <button class="p3-button" data-mode="preview">PREVIEW</button>
          <button class="p3-button" data-save>SAVE</button>
          <button class="p3-button danger" data-clear-open>清除所有数据</button>
        </div>
        <div class="panel">
          <textarea class="p3-textarea journal-text" data-text spellcheck="false"># Secret Notes</textarea>
          <article class="markdown-preview" data-preview hidden></article>
        </div>
      </div>
    </section>
  `;

  const lock = container.querySelector("[data-lock]");
  const editor = container.querySelector("[data-editor]");
  const password = container.querySelector("[data-password]");
  const message = container.querySelector("[data-message]");
  const text = container.querySelector("[data-text]");
  const preview = container.querySelector("[data-preview]");

  async function deriveKey(pass, salt) {
    const material = await crypto.subtle.importKey("raw", enc.encode(pass), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey(
      { name: "PBKDF2", salt, iterations: 180000, hash: "SHA-256" },
      material,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  function b64(bytes) {
    return btoa(String.fromCharCode(...new Uint8Array(bytes)));
  }

  function unb64(value) {
    return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
  }

  async function encrypt(raw) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, unlockedKey, enc.encode(raw));
    localStorage.setItem(DATA_KEY, JSON.stringify({ iv: b64(iv), cipher: b64(cipher) }));
  }

  async function decrypt(key) {
    const payload = JSON.parse(localStorage.getItem(DATA_KEY));
    const clear = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(payload.iv) }, key, unb64(payload.cipher));
    return dec.decode(clear);
  }

  async function unlock() {
    try {
      if (!password.value) return;
      let salt = localStorage.getItem(SALT_KEY);
      if (!salt) {
        const saltBytes = crypto.getRandomValues(new Uint8Array(16));
        salt = b64(saltBytes);
        localStorage.setItem(SALT_KEY, salt);
      }
      const key = await deriveKey(password.value, unb64(salt));
      unlockedKey = key;
      if (localStorage.getItem(DATA_KEY)) {
        text.value = await decrypt(key);
      } else {
        await encrypt(text.value);
      }
      lock.hidden = true;
      editor.hidden = false;
    } catch {
      message.textContent = "密码不正确，或数据已损坏。";
    }
  }

  function clearAll() {
    localStorage.removeItem(DATA_KEY);
    localStorage.removeItem(SALT_KEY);
    location.reload();
  }

  container.querySelector("[data-unlock]").addEventListener("click", unlock);
  password.addEventListener("keydown", (event) => {
    if (event.key === "Enter") unlock();
  });
  container.querySelector("[data-save]").addEventListener("click", () => encrypt(text.value));
  container.querySelector("[data-clear]").addEventListener("click", clearAll);
  container.querySelector("[data-clear-open]").addEventListener("click", clearAll);
  container.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      mode = button.dataset.mode;
      preview.innerHTML = marked.parse(text.value);
      text.hidden = mode !== "edit";
      preview.hidden = mode !== "preview";
      container.querySelectorAll("[data-mode]").forEach((item) => item.classList.toggle("active", item === button));
    });
  });

  return () => {};
}
