import Chart from "chart.js/auto";

const labels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export function render(container) {
  container.innerHTML = `
    <section class="tool-screen dashboard-screen">
      <header class="tool-title hero-title">
        <div>
          <span class="eyebrow">04 / STATUS BOARD</span>
          <h1>STATUS</h1>
          <p>假装一切都在被认真监控。</p>
        </div>
        <button class="p3-button" data-refresh>刷新数据</button>
      </header>
      <div class="status-grid" data-metrics></div>
      <div class="grid-2">
        <div class="panel chart-panel"><canvas data-line></canvas></div>
        <div class="panel chart-panel"><canvas data-pie></canvas></div>
      </div>
    </section>
  `;

  const metricsNode = container.querySelector("[data-metrics]");
  const metricDefs = [
    ["访问量", 12840, ""],
    ["完成率", 86, "%"],
    ["响应时长", 214, "ms"],
    ["在线人数", 42, ""]
  ];
  let metrics = metricDefs.map(([label, value, unit]) => ({ label, value, unit }));

  const makeLineData = () => labels.map(() => Math.round(40 + Math.random() * 58));
  const line = new Chart(container.querySelector("[data-line]"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "7D Trend",
        data: makeLineData(),
        borderColor: "#ffffff",
        backgroundColor: "rgba(22, 207, 251, .22)",
        pointBackgroundColor: "#77fefc",
        pointBorderColor: "#001dff",
        fill: true,
        tension: 0.36
      }]
    },
    options: chartOptions()
  });
  const pie = new Chart(container.querySelector("[data-pie]"), {
    type: "doughnut",
    data: {
      labels: ["Focus", "Meetings", "Reports", "Waiting"],
      datasets: [{
        data: [35, 22, 28, 15],
        backgroundColor: ["#001dff", "#16cffb", "#77fefc", "#ffffff"],
        borderColor: "#071154",
        borderWidth: 4
      }]
    },
    options: chartOptions(false)
  });

  function chartOptions(showScales = true) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: "#fff", font: { weight: "bold" } } }
      },
      scales: showScales ? {
        x: { ticks: { color: "#dffaff" }, grid: { color: "rgba(255,255,255,.12)" } },
        y: { ticks: { color: "#dffaff" }, grid: { color: "rgba(255,255,255,.12)" } }
      } : {}
    };
  }

  function renderMetrics() {
    metricsNode.innerHTML = metrics.map((item, index) => `
      <article class="status-card" style="--w:${Math.max(12, Math.min(100, item.value % 120))}%">
        <span>${item.label}</span>
        <strong>${item.value}${item.unit}</strong>
        <div><i></i></div>
      </article>
    `).join("");
  }

  function randomizeCharts() {
    line.data.datasets[0].data = makeLineData();
    pie.data.datasets[0].data = pie.data.datasets[0].data.map(() => Math.round(12 + Math.random() * 38));
    line.update();
    pie.update();
  }

  function wobble() {
    metrics = metrics.map((item) => {
      const delta = Math.round((Math.random() - 0.5) * (item.unit === "%" ? 4 : 18));
      return { ...item, value: Math.max(1, item.value + delta) };
    });
    renderMetrics();
  }

  container.querySelector("[data-refresh]").addEventListener("click", () => {
    wobble();
    randomizeCharts();
  });
  renderMetrics();
  const interval = window.setInterval(wobble, 3000);
  return () => {
    window.clearInterval(interval);
    line.destroy();
    pie.destroy();
  };
}
