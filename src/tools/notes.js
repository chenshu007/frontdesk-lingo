import { marked } from "marked";

const INDEX_KEY = "moyu_journal_index";
const NOTE_PREFIX = "moyu_journal_note_";
const LEGACY_DATA_KEY = "frontdesk_journal_data";
const SALT_KEY = "frontdesk_journal_salt";
const enc = new TextEncoder();
const dec = new TextDecoder();

let sessionKey = null;

export function render(container) {
  let unlockedKey = sessionKey;
  let mode = "edit";
  let selectedId = null;
  let saveTimer = null;
  const hasVault = hasJournalVault();

  container.innerHTML = `
    <section class="tool-screen journal-screen">
      <header class="tool-title hero-title">
        <div>
          <span class="eyebrow">03 / MEMORY VAULT</span>
          <h1>JOURNAL</h1>
          <p>本地 AES-GCM 加密 Markdown 便签。</p>
        </div>
      </header>
      <div class="panel journal-lock" data-lock ${unlockedKey ? "hidden" : ""}>
        <h2>${hasVault ? "UNLOCK JOURNAL" : "SET PASSWORD"}</h2>
        <input class="p3-input" type="password" data-password aria-label="Password">
        <div class="button-row">
          <button class="p3-button" data-unlock>${hasVault ? "UNLOCK" : "CREATE"}</button>
          <button class="p3-button danger" data-clear>清除所有数据</button>
        </div>
        <p class="muted" data-message></p>
      </div>
      <div class="journal-editor" data-editor ${unlockedKey ? "" : "hidden"}>
        <aside class="journal-list-panel">
          <div class="journal-list-head">
            <h2>NOTES</h2>
            <button class="p3-button" data-new-note>NEW NOTE</button>
          </div>
          <div class="journal-list" data-note-list></div>
        </aside>
        <section class="journal-detail-panel">
          <div class="journal-empty" data-empty hidden>
            <h2>NO NOTE SELECTED</h2>
            <p class="muted">Create a note to open the editor.</p>
          </div>
          <div class="journal-detail" data-detail hidden>
            <div class="journal-detail-head">
              <input class="journal-title-input" data-title aria-label="Note title">
              <span class="muted" data-created></span>
            </div>
            <div class="button-row">
              <button class="p3-button active" data-mode="edit">EDIT</button>
              <button class="p3-button" data-mode="preview">PREVIEW</button>
              <button class="p3-button" data-save>SAVE</button>
              <button class="p3-button danger" data-clear-open>清除所有数据</button>
              <span class="journal-save-state muted" data-save-state></span>
            </div>
            <div class="panel journal-content-panel">
              <textarea class="p3-textarea journal-text" data-text spellcheck="false"></textarea>
              <article class="markdown-preview" data-preview hidden></article>
            </div>
          </div>
        </section>
      </div>
    </section>
  `;

  const lock = container.querySelector("[data-lock]");
  const editor = container.querySelector("[data-editor]");
  const password = container.querySelector("[data-password]");
  const message = container.querySelector("[data-message]");
  const noteList = container.querySelector("[data-note-list]");
  const empty = container.querySelector("[data-empty]");
  const detail = container.querySelector("[data-detail]");
  const titleInput = container.querySelector("[data-title]");
  const created = container.querySelector("[data-created]");
  const text = container.querySelector("[data-text]");
  const preview = container.querySelector("[data-preview]");
  const saveState = container.querySelector("[data-save-state]");

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
    return { iv: b64(iv), cipher: b64(cipher) };
  }

  async function decrypt(payload, key = unlockedKey) {
    const clear = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(payload.iv) }, key, unb64(payload.cipher));
    return dec.decode(clear);
  }

  function noteKey(id) {
    return `${NOTE_PREFIX}${id}`;
  }

  function readIndex() {
    try {
      const parsed = JSON.parse(localStorage.getItem(INDEX_KEY) || "{}");
      const notes = Array.isArray(parsed.notes) ? parsed.notes : [];
      return {
        notes: notes
          .filter((note) => note && note.id)
          .map((note) => ({
            id: String(note.id),
            title: note.title || "Untitled note",
            createdAt: note.createdAt || new Date().toISOString(),
            updatedAt: note.updatedAt || note.createdAt || new Date().toISOString()
          }))
      };
    } catch {
      return { notes: [] };
    }
  }

  function writeIndex(index) {
    localStorage.setItem(INDEX_KEY, JSON.stringify(index));
  }

  function hasJournalVault() {
    return Boolean(localStorage.getItem(INDEX_KEY) || localStorage.getItem(LEGACY_DATA_KEY));
  }

  function relativeDate(value) {
    const createdDate = new Date(value);
    const diff = Date.now() - createdDate.getTime();
    const abs = Math.abs(diff);
    const units = [
      ["year", 31536000000],
      ["month", 2592000000],
      ["day", 86400000],
      ["hour", 3600000],
      ["minute", 60000]
    ];
    for (const [unit, ms] of units) {
      if (abs >= ms) {
        const amount = Math.max(1, Math.floor(abs / ms));
        return `${amount} ${unit}${amount === 1 ? "" : "s"} ago`;
      }
    }
    return "just now";
  }

  function formatCreated(value) {
    return `CREATED ${new Date(value).toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    })}`;
  }

  function updateSaveState(label) {
    saveState.textContent = label;
    if (label) {
      window.setTimeout(() => {
        if (saveState.textContent === label) saveState.textContent = "";
      }, 1600);
    }
  }

  async function persistSelectedContent() {
    if (!selectedId || !unlockedKey) return;
    const payload = await encrypt(text.value);
    localStorage.setItem(noteKey(selectedId), JSON.stringify(payload));
    const index = readIndex();
    const current = index.notes.find((note) => note.id === selectedId);
    if (current) {
      current.updatedAt = new Date().toISOString();
      writeIndex(index);
    }
  }

  async function saveSelectedContent(label = "SAVED") {
    await persistSelectedContent();
    updateSaveState(label);
  }

  function scheduleSave() {
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      saveSelectedContent("AUTO SAVED").catch(() => updateSaveState("SAVE FAILED"));
    }, 450);
  }

  function renderList() {
    const index = readIndex();
    noteList.replaceChildren();
    index.notes.forEach((note) => {
      const item = document.createElement("button");
      const row = document.createElement("div");
      row.className = "journal-note-item";
      row.dataset.noteId = note.id;
      row.classList.toggle("active", note.id === selectedId);
      item.type = "button";
      item.className = "journal-note-main";
      item.dataset.noteId = note.id;
      item.innerHTML = `
        <span>${escapeHtml(note.title || "Untitled note")}</span>
        <small>${relativeDate(note.createdAt)}</small>
      `;
      item.addEventListener("click", () => selectNote(note.id));
      const deleteButton = document.createElement("button");
      deleteButton.className = "journal-delete";
      deleteButton.type = "button";
      deleteButton.textContent = "DELETE";
      deleteButton.setAttribute("aria-label", `Delete ${note.title || "note"}`);
      deleteButton.addEventListener("click", () => {
        deleteNote(note.id);
      });
      row.append(item, deleteButton);
      noteList.append(row);
    });
  }

  async function selectNote(id) {
    await saveSelectedContent("");
    const index = readIndex();
    const note = index.notes.find((item) => item.id === id);
    if (!note) {
      selectedId = null;
      renderEditorState();
      return;
    }
    const payload = JSON.parse(localStorage.getItem(noteKey(id)) || "null");
    selectedId = id;
    titleInput.value = note.title || "Untitled note";
    created.textContent = formatCreated(note.createdAt);
    text.value = payload ? await decrypt(payload) : "";
    preview.innerHTML = marked.parse(text.value);
    mode = "edit";
    text.hidden = false;
    preview.hidden = true;
    container.querySelectorAll("[data-mode]").forEach((button) => {
      button.classList.toggle("active", button.dataset.mode === mode);
    });
    renderEditorState();
    renderList();
  }

  function renderEditorState() {
    const hasSelection = Boolean(selectedId);
    empty.hidden = hasSelection;
    detail.hidden = !hasSelection;
  }

  async function createNote(focusTitle = true, content = "") {
    const now = new Date().toISOString();
    const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    const index = readIndex();
    index.notes.unshift({ id, title: "Untitled note", createdAt: now, updatedAt: now });
    writeIndex(index);
    localStorage.setItem(noteKey(id), JSON.stringify(await encrypt(content)));
    await selectNote(id);
    if (focusTitle) {
      titleInput.focus();
      titleInput.select();
    }
  }

  async function migrateLegacyNote(key) {
    if (localStorage.getItem(INDEX_KEY) || !localStorage.getItem(LEGACY_DATA_KEY)) return;
    const payload = JSON.parse(localStorage.getItem(LEGACY_DATA_KEY));
    const legacyContent = await decrypt(payload, key);
    unlockedKey = key;
    await createNote(false, legacyContent);
    const index = readIndex();
    const migrated = index.notes.find((note) => note.id === selectedId);
    if (migrated) {
      migrated.title = "Secret Notes";
      writeIndex(index);
    }
    localStorage.removeItem(LEGACY_DATA_KEY);
  }

  async function showEditor() {
    lock.hidden = true;
    editor.hidden = false;
    renderList();
    const index = readIndex();
    if (!index.notes.length) {
      await createNote(true);
      return;
    }
    await selectNote(selectedId || index.notes[0].id);
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
      await migrateLegacyNote(key);
      unlockedKey = key;
      sessionKey = key;
      if (!readIndex().notes.length) {
        writeIndex({ notes: [] });
      } else {
        const firstNote = readIndex().notes[0];
        const payload = JSON.parse(localStorage.getItem(noteKey(firstNote.id)) || "null");
        if (payload) await decrypt(payload, key);
      }
      await showEditor();
    } catch {
      message.textContent = "密码不正确，或数据已损坏。";
    }
  }

  function deleteNote(id) {
    const index = readIndex();
    const note = index.notes.find((item) => item.id === id);
    const title = note?.title || "this note";
    if (!window.confirm(`Delete "${title}"?`)) return;
    localStorage.removeItem(noteKey(id));
    writeIndex({ notes: index.notes.filter((item) => item.id !== id) });
    if (selectedId === id) {
      selectedId = null;
      const next = readIndex().notes[0];
      if (next) {
        selectNote(next.id);
      } else {
        renderEditorState();
        renderList();
      }
    } else {
      renderList();
    }
  }

  function clearAll() {
    readIndex().notes.forEach((note) => localStorage.removeItem(noteKey(note.id)));
    localStorage.removeItem(INDEX_KEY);
    localStorage.removeItem(LEGACY_DATA_KEY);
    localStorage.removeItem(SALT_KEY);
    sessionKey = null;
    location.reload();
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

  container.querySelector("[data-unlock]").addEventListener("click", unlock);
  password?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") unlock();
  });
  container.querySelector("[data-new-note]").addEventListener("click", () => createNote(true));
  container.querySelector("[data-save]").addEventListener("click", () => {
    saveSelectedContent().catch(() => updateSaveState("SAVE FAILED"));
  });
  container.querySelector("[data-clear]").addEventListener("click", clearAll);
  container.querySelector("[data-clear-open]").addEventListener("click", clearAll);
  titleInput.addEventListener("input", () => {
    if (!selectedId) return;
    const index = readIndex();
    const current = index.notes.find((note) => note.id === selectedId);
    if (!current) return;
    current.title = titleInput.value.trim() || "Untitled note";
    current.updatedAt = new Date().toISOString();
    writeIndex(index);
    const activeRow = noteList.querySelector(`.journal-note-item[data-note-id="${CSS.escape(selectedId)}"]`);
    const activeTitle = activeRow?.querySelector("span");
    const activeDelete = activeRow?.querySelector(".journal-delete");
    if (activeTitle) activeTitle.textContent = current.title;
    if (activeDelete) activeDelete.setAttribute("aria-label", `Delete ${current.title}`);
  });
  text.addEventListener("input", () => {
    if (mode === "preview") preview.innerHTML = marked.parse(text.value);
    scheduleSave();
  });
  container.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      mode = button.dataset.mode;
      preview.innerHTML = marked.parse(text.value);
      text.hidden = mode !== "edit";
      preview.hidden = mode !== "preview";
      container.querySelectorAll("[data-mode]").forEach((item) => item.classList.toggle("active", item === button));
    });
  });

  if (unlockedKey) {
    showEditor();
  }

  return () => {
    window.clearTimeout(saveTimer);
    persistSelectedContent().catch(() => {});
  };
}
