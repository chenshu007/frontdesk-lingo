const SAMPLE = `# 操作手册\n\n把长文粘贴进来，按标题自动切章节。\n\n## 第一章\n\n阅读进度会根据右侧正文滚动更新。\n\n## 第二章\n\n这里适合塞规范、小说、会议纪要，或者你不想在公司浏览器历史里出现的长文。`;

export function render(container) {
  container.innerHTML = `
    <section class="tool-screen reader-screen">
      <header class="tool-title hero-title">
        <div>
          <span class="eyebrow">05 / GEKKOUKAN LIBRARY</span>
          <h1>GEKKOUKAN</h1>
          <p>离线章节阅读器。</p>
        </div>
        <div class="reader-progress mono"><span data-progress>0</span>%</div>
      </header>
      <div class="panel reader-loader">
        <textarea class="p3-textarea" data-source aria-label="粘贴内容后点击 LOAD">${SAMPLE}</textarea>
        <div class="button-row">
          <button class="p3-button" data-load>LOAD</button>
          <select class="p3-select" data-size><option value="reader-small">SMALL</option><option value="reader-medium" selected>MEDIUM</option><option value="reader-large">LARGE</option></select>
          <select class="p3-select" data-leading><option value="leading-tight">TIGHT</option><option value="leading-normal" selected>NORMAL</option><option value="leading-loose">LOOSE</option></select>
          <button class="p3-button active" data-dark>DARK</button>
        </div>
      </div>
      <div class="reader-layout">
        <aside class="panel toc" data-toc></aside>
        <article class="panel reader-body reader-medium leading-normal" data-body></article>
      </div>
    </section>
  `;

  const source = container.querySelector("[data-source]");
  const body = container.querySelector("[data-body]");
  const toc = container.querySelector("[data-toc]");
  const progress = container.querySelector("[data-progress]");

  function load() {
    const lines = source.value.split(/\n/);
    const sections = [];
    let current = { title: "START", content: [] };
    lines.forEach((line) => {
      const match = line.match(/^(#{1,2})\s+(.+)/);
      if (match) {
        sections.push(current);
        current = { title: match[2], content: [] };
      } else {
        current.content.push(line);
      }
    });
    sections.push(current);
    body.innerHTML = sections.map((section, index) => `
      <section id="chapter-${index}">
        <h2>${section.title}</h2>
        ${section.content.map((line) => line.trim() ? `<p>${escapeHtml(line)}</p>` : "").join("")}
      </section>
    `).join("");
    toc.innerHTML = `<h2>INDEX</h2>${sections.map((section, index) => `<a href="#chapter-${index}">${section.title}</a>`).join("")}`;
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
  }

  function updateProgress() {
    const max = body.scrollHeight - body.clientHeight;
    progress.textContent = max <= 0 ? 100 : Math.round((body.scrollTop / max) * 100);
  }

  container.querySelector("[data-load]").addEventListener("click", load);
  container.querySelector("[data-size]").addEventListener("change", (event) => {
    body.classList.remove("reader-small", "reader-medium", "reader-large");
    body.classList.add(event.target.value);
  });
  container.querySelector("[data-leading]").addEventListener("change", (event) => {
    body.classList.remove("leading-tight", "leading-normal", "leading-loose");
    body.classList.add(event.target.value);
  });
  container.querySelector("[data-dark]").addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("active");
    body.classList.toggle("reader-light");
  });
  body.addEventListener("scroll", updateProgress);
  load();
  updateProgress();
  return () => {};
}
