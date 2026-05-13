const QUOTES = [
  "Memento Mori.",
  "你无法逃脱上班这件事。",
  "The bell has not saved you yet.",
  "今日份勇气：准点下班。",
  "Dark Hour begins after Outlook stops moving.",
  "你听见了电梯的召唤。",
  "All-Out Attack: 关闭电脑。",
  "命运不会改变你，但打卡机会。",
  "One more meeting? Resist.",
  "下班前一小时，世界开始发蓝。"
];

const KEY = "frontdesk_dark_hour_settings";

export function render(container) {
  const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
  const state = {
    start: saved.start || "09:00",
    end: saved.end || "18:00"
  };

  container.innerHTML = `
    <section class="tool-screen timer-screen">
      <header class="tool-title hero-title">
        <div>
          <span class="eyebrow">01 / PRODUCTIVITY EXECUTION</span>
          <h1>DARK HOUR</h1>
          <p>倒数到今日从公司迷宫撤离。</p>
        </div>
        <div class="timer-settings panel skew-panel">
          <label>START <input class="p3-input" type="time" value="${state.start}" data-time="start"></label>
          <label>END <input class="p3-input" type="time" value="${state.end}" data-time="end"></label>
        </div>
      </header>
      <div class="countdown-wrap panel p3-menu-card">
        <div class="date-strip"><span class="mono" data-work-state>LOADING</span><span data-now></span></div>
        <div class="countdown mono" data-countdown>00:00:00</div>
        <div class="progress-shell"><div class="progress-fill" data-progress></div></div>
        <div class="market-status" aria-label="Market status">
          <div class="market-row" data-market="hkex">
            <span class="market-name">HKEX</span>
            <strong class="market-state" data-market-state>LOADING</strong>
            <span class="market-countdown" data-market-countdown>--:--:--</span>
          </div>
          <div class="market-row" data-market="nyse">
            <span class="market-name">NYSE/NASDAQ</span>
            <strong class="market-state" data-market-state>LOADING</strong>
            <span class="market-countdown" data-market-countdown>--:--:--</span>
          </div>
        </div>
        <blockquote data-quote></blockquote>
      </div>
    </section>
  `;

  const countdown = container.querySelector("[data-countdown]");
  const progress = container.querySelector("[data-progress]");
  const quote = container.querySelector("[data-quote]");
  const workState = container.querySelector("[data-work-state]");
  const nowNode = container.querySelector("[data-now]");
  const marketRows = [...container.querySelectorAll("[data-market]")];

  container.querySelectorAll("[data-time]").forEach((input) => {
    input.addEventListener("change", () => {
      state[input.dataset.time] = input.value;
      localStorage.setItem(KEY, JSON.stringify(state));
      update();
    });
  });

  let lastMinute = -1;
  function parseToday(value) {
    const [hours, minutes] = value.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  function formatDuration(ms) {
    const safe = Math.max(0, ms);
    const hours = Math.floor(safe / 3600000);
    const minutes = Math.floor((safe % 3600000) / 60000);
    const seconds = Math.floor((safe % 60000) / 1000);
    return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
  }

  function dayInZone(now, utcOffsetHours) {
    const shifted = new Date(now.getTime() + utcOffsetHours * 3600000);
    return {
      year: shifted.getUTCFullYear(),
      month: shifted.getUTCMonth(),
      date: shifted.getUTCDate()
    };
  }

  function localSlotToUtcDate(day, hour, minute, utcOffsetHours) {
    return new Date(Date.UTC(day.year, day.month, day.date, hour - utcOffsetHours, minute, 0, 0));
  }

  function nthSundayOfMonthUtc(year, month, nth, utcHour) {
    const first = new Date(Date.UTC(year, month, 1));
    const firstSundayDate = 1 + ((7 - first.getUTCDay()) % 7);
    return new Date(Date.UTC(year, month, firstSundayDate + (nth - 1) * 7, utcHour, 0, 0, 0));
  }

  function isEdtActive(now) {
    const year = now.getUTCFullYear();
    const edtStart = nthSundayOfMonthUtc(year, 2, 2, 7);
    const edtEnd = nthSundayOfMonthUtc(year, 10, 1, 6);
    return now >= edtStart && now < edtEnd;
  }

  function calculateMarket(now, utcOffsetHours, slots) {
    const today = dayInZone(now, utcOffsetHours);
    const tomorrow = new Date(Date.UTC(today.year, today.month, today.date + 1));
    const tomorrowDay = { year: tomorrow.getUTCFullYear(), month: tomorrow.getUTCMonth(), date: tomorrow.getUTCDate() };
    const todaysSlots = slots.map((slot) => ({
      ...slot,
      start: localSlotToUtcDate(today, slot.start[0], slot.start[1], utcOffsetHours),
      end: localSlotToUtcDate(today, slot.end[0], slot.end[1], utcOffsetHours)
    }));
    const active = todaysSlots.find((slot) => now >= slot.start && now < slot.end);
    if (active) return { status: active.status, next: active.end };
    const nextToday = todaysSlots.find((slot) => now < slot.start);
    if (nextToday) return { status: "CLOSED", next: nextToday.start };
    const firstTomorrow = slots[0];
    return {
      status: "CLOSED",
      next: localSlotToUtcDate(tomorrowDay, firstTomorrow.start[0], firstTomorrow.start[1], utcOffsetHours)
    };
  }

  function marketStatus(now) {
    return {
      hkex: calculateMarket(now, 8, [
        { status: "PRE-MARKET", start: [9, 0], end: [9, 30] },
        { status: "OPEN", start: [9, 30], end: [12, 0] },
        { status: "OPEN", start: [13, 0], end: [16, 0] }
      ]),
      nyse: calculateMarket(now, isEdtActive(now) ? -4 : -5, [
        { status: "PRE-MARKET", start: [9, 0], end: [9, 30] },
        { status: "OPEN", start: [9, 30], end: [16, 0] }
      ])
    };
  }

  function updateMarkets(now) {
    const statuses = marketStatus(now);
    marketRows.forEach((row) => {
      const data = statuses[row.dataset.market];
      const stateNode = row.querySelector("[data-market-state]");
      const countdownNode = row.querySelector("[data-market-countdown]");
      const nextMs = data.next - now;
      row.dataset.status = data.status.toLowerCase();
      row.classList.toggle("market-soon", data.status === "CLOSED" && nextMs > 0 && nextMs <= 1800000);
      stateNode.textContent = data.status;
      countdownNode.textContent = formatDuration(nextMs);
    });
  }

  function update() {
    const now = new Date();
    let start = parseToday(state.start);
    let end = parseToday(state.end);
    if (end <= start) end = new Date(end.getTime() + 86400000);
    const total = end - start;
    const elapsed = now - start;
    const remaining = end - now;
    const percent = Math.min(100, Math.max(0, (elapsed / total) * 100));

    countdown.textContent = remaining <= 0 ? "CLEARED" : formatDuration(remaining);
    countdown.classList.toggle("danger-time", remaining > 0 && remaining <= 3600000);
    progress.style.width = `${percent}%`;
    workState.textContent = remaining <= 0 ? "FREE PERIOD" : now < start ? "WAITING ROOM" : "DARK HOUR ACTIVE";
    nowNode.textContent = now.toLocaleTimeString("zh-CN", { hour12: false });
    updateMarkets(now);

    if (now.getMinutes() !== lastMinute) {
      lastMinute = now.getMinutes();
      quote.textContent = `"${QUOTES[lastMinute % QUOTES.length]}"`;
      progress.classList.add("minute-pulse");
      window.setTimeout(() => progress.classList.remove("minute-pulse"), 180);
    }
  }

  update();
  const timer = window.setInterval(update, 1000);
  return () => window.clearInterval(timer);
}
