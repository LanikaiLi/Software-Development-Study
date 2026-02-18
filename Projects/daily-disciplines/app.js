/* ============================================
   Daily Disciplines — App Logic
   ============================================ */

(function () {
  'use strict';

  // ── Storage Layer ──────────────────────────

  const STORAGE_KEYS = {
    disciplines: 'dd_disciplines',
    records: 'dd_records',
  };

  function loadDisciplines() {
    const raw = localStorage.getItem(STORAGE_KEYS.disciplines);
    if (!raw) return [];
    const list = JSON.parse(raw);
    list.forEach(function (d) {
      if (d.active === undefined) d.active = true;
    });
    return list;
  }

  function saveDisciplines(list) {
    localStorage.setItem(STORAGE_KEYS.disciplines, JSON.stringify(list));
  }

  function loadRecords() {
    const raw = localStorage.getItem(STORAGE_KEYS.records);
    return raw ? JSON.parse(raw) : {};
  }

  function saveRecords(records) {
    localStorage.setItem(STORAGE_KEYS.records, JSON.stringify(records));
  }

  function getTodayKey() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function getActiveDisciplines() {
    return disciplines.filter(function (d) { return d.active; });
  }

  // ── State ──────────────────────────────────

  let disciplines = loadDisciplines();
  let records = loadRecords();
  let currentRange = 7;

  // ── DOM References ─────────────────────────

  const $todayDate = document.getElementById('todayDate');
  const $checklist = document.getElementById('checklist');
  const $addForm = document.getElementById('addForm');
  const $addInput = document.getElementById('addInput');
  const $progressDone = document.getElementById('progressDone');
  const $progressTotal = document.getElementById('progressTotal');
  const $progressCircle = document.getElementById('progressCircle');
  const $manageList = document.getElementById('manageList');

  const $statStreak = document.getElementById('statStreak');
  const $statAvg = document.getElementById('statAvg');
  const $statPerfect = document.getElementById('statPerfect');
  const $disciplineRates = document.getElementById('disciplineRates');
  const $ratesEmpty = document.getElementById('ratesEmpty');
  const $heatmap = document.getElementById('heatmap');

  // ── Tab Navigation ─────────────────────────

  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.tab-content').forEach(function (c) { c.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');

      if (btn.dataset.tab === 'today') renderToday();
      if (btn.dataset.tab === 'manage') renderManage();
      if (btn.dataset.tab === 'analysis') renderAnalysis();
    });
  });

  // ── Range Filter ───────────────────────────

  document.querySelectorAll('.range-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.range-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentRange = btn.dataset.range === 'all' ? 'all' : parseInt(btn.dataset.range);
      renderAnalysis();
    });
  });

  // ── Display Today's Date ───────────────────

  function formatDisplayDate(dateKey) {
    const parts = dateKey.split('-');
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  $todayDate.textContent = formatDisplayDate(getTodayKey());

  // ── Render Today Tab ───────────────────────

  function renderToday() {
    const today = getTodayKey();
    if (!records[today]) records[today] = {};
    const active = getActiveDisciplines();

    $checklist.innerHTML = '';

    if (active.length === 0) {
      $checklist.innerHTML =
        '<div class="empty-checklist"><span>🌱</span>No active disciplines yet.<br>Go to the <strong>Manage</strong> tab to add some!</div>';
    }

    active.forEach(function (disc) {
      const isChecked = !!records[today][disc.id];

      const card = document.createElement('div');
      card.className = 'discipline-card' + (isChecked ? ' checked' : '');
      card.innerHTML =
        '<label class="checkbox">' +
          '<input type="checkbox"' + (isChecked ? ' checked' : '') + ' data-id="' + disc.id + '">' +
          '<div class="checkmark"></div>' +
        '</label>' +
        '<span class="discipline-name">' + escapeHtml(disc.name) + '</span>';

      $checklist.appendChild(card);
    });

    updateProgress();
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ── Checkbox Toggle (Event Delegation) ─────

  $checklist.addEventListener('change', function (e) {
    if (e.target.type !== 'checkbox') return;
    const id = e.target.dataset.id;
    const today = getTodayKey();

    if (!records[today]) records[today] = {};
    records[today][id] = e.target.checked;
    saveRecords(records);

    const card = e.target.closest('.discipline-card');
    if (e.target.checked) {
      card.classList.add('checked');
    } else {
      card.classList.remove('checked');
    }

    updateProgress();
  });

  // ── Render Manage Tab ──────────────────────

  function renderManage() {
    $manageList.innerHTML = '';

    if (disciplines.length === 0) {
      $manageList.innerHTML =
        '<div class="empty-manage">No disciplines yet. Add one above!</div>';
      return;
    }

    disciplines.forEach(function (disc) {
      const card = document.createElement('div');
      card.className = 'manage-card' + (disc.active ? '' : ' inactive');
      card.innerHTML =
        '<label class="toggle">' +
          '<input type="checkbox"' + (disc.active ? ' checked' : '') + ' data-id="' + disc.id + '">' +
          '<div class="toggle-track"></div>' +
        '</label>' +
        '<span class="manage-card-name">' + escapeHtml(disc.name) + '</span>' +
        '<button class="manage-delete-btn" data-id="' + disc.id + '" title="Delete permanently">✕</button>';

      $manageList.appendChild(card);
    });
  }

  // ── Manage: Toggle Active ──────────────────

  $manageList.addEventListener('change', function (e) {
    if (e.target.type !== 'checkbox') return;
    const id = e.target.dataset.id;
    var disc = disciplines.find(function (d) { return d.id === id; });
    if (!disc) return;

    disc.active = e.target.checked;
    saveDisciplines(disciplines);

    const card = e.target.closest('.manage-card');
    if (disc.active) {
      card.classList.remove('inactive');
    } else {
      card.classList.add('inactive');
    }
  });

  // ── Manage: Delete Discipline ──────────────

  $manageList.addEventListener('click', function (e) {
    const btn = e.target.closest('.manage-delete-btn');
    if (!btn) return;

    const id = btn.dataset.id;
    const disc = disciplines.find(function (d) { return d.id === id; });
    if (!disc) return;

    if (!confirm('Permanently delete "' + disc.name + '"?\nThis will also remove its history.')) return;

    disciplines = disciplines.filter(function (d) { return d.id !== id; });
    saveDisciplines(disciplines);

    Object.keys(records).forEach(function (dateKey) {
      delete records[dateKey][id];
    });
    saveRecords(records);

    renderManage();
  });

  // ── Add Discipline ─────────────────────────

  $addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = $addInput.value.trim();
    if (!name) return;

    disciplines.push({
      id: generateId(),
      name: name,
      active: true,
      createdAt: getTodayKey(),
    });
    saveDisciplines(disciplines);
    $addInput.value = '';
    renderManage();
    $addInput.focus();
  });

  // ── Progress Ring ──────────────────────────

  const CIRCUMFERENCE = 2 * Math.PI * 52;

  function updateProgress() {
    const today = getTodayKey();
    const todayRecord = records[today] || {};
    const active = getActiveDisciplines();
    const total = active.length;
    let done = 0;

    active.forEach(function (d) {
      if (todayRecord[d.id]) done++;
    });

    $progressDone.textContent = done;
    $progressTotal.textContent = total;

    const pct = total === 0 ? 0 : done / total;
    const offset = CIRCUMFERENCE * (1 - pct);
    $progressCircle.style.strokeDashoffset = offset;
  }

  // ── Analysis Tab ───────────────────────────

  function getDateRange(range) {
    const dates = [];
    if (range === 'all') {
      const allDates = Object.keys(records).sort();
      if (allDates.length === 0) return [];
      const start = allDates[0];
      let current = start;
      while (current <= getTodayKey()) {
        dates.push(current);
        current = nextDay(current);
      }
      return dates;
    }
    const today = new Date();
    for (let i = range - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      dates.push(formatDateKey(d));
    }
    return dates;
  }

  function formatDateKey(d) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  function nextDay(dateKey) {
    const parts = dateKey.split('-');
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    d.setDate(d.getDate() + 1);
    return formatDateKey(d);
  }

  function renderAnalysis() {
    const dates = getDateRange(currentRange);
    const active = getActiveDisciplines();
    renderStats(dates, active);
    renderDisciplineRates(dates, active);
    renderHeatmap(dates, active);
  }

  // ── Stats Cards ────────────────────────────

  function renderStats(dates, active) {
    if (active.length === 0 || dates.length === 0) {
      $statStreak.textContent = '0';
      $statAvg.textContent = '0%';
      $statPerfect.textContent = '0';
      return;
    }

    let streak = 0;
    const today = getTodayKey();
    let checkDate = today;
    while (true) {
      const dayRecord = records[checkDate] || {};
      const allDone = active.every(function (d) { return !!dayRecord[d.id]; });
      if (!allDone) break;
      streak++;
      checkDate = prevDay(checkDate);
    }

    let totalPct = 0;
    let countedDays = 0;
    let perfectDays = 0;

    dates.forEach(function (dateKey) {
      const dayRecord = records[dateKey] || {};
      let done = 0;
      active.forEach(function (d) {
        if (dayRecord[d.id]) done++;
      });
      const pct = done / active.length;
      totalPct += pct;
      countedDays++;
      if (pct === 1) perfectDays++;
    });

    const avg = countedDays > 0 ? Math.round((totalPct / countedDays) * 100) : 0;

    $statStreak.textContent = streak;
    $statAvg.textContent = avg + '%';
    $statPerfect.textContent = perfectDays;
  }

  function prevDay(dateKey) {
    const parts = dateKey.split('-');
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    d.setDate(d.getDate() - 1);
    return formatDateKey(d);
  }

  // ── Per-Discipline Rates ───────────────────

  function renderDisciplineRates(dates, active) {
    $disciplineRates.innerHTML = '';

    if (active.length === 0 || dates.length === 0) {
      $ratesEmpty.style.display = 'block';
      return;
    }
    $ratesEmpty.style.display = 'none';

    active.forEach(function (disc) {
      let done = 0;
      dates.forEach(function (dateKey) {
        const dayRecord = records[dateKey] || {};
        if (dayRecord[disc.id]) done++;
      });
      const pct = Math.round((done / dates.length) * 100);

      const row = document.createElement('div');
      row.className = 'rate-row';
      row.innerHTML =
        '<div class="rate-header">' +
          '<span class="rate-name">' + escapeHtml(disc.name) + '</span>' +
          '<span class="rate-pct">' + pct + '%</span>' +
        '</div>' +
        '<div class="rate-bar-bg">' +
          '<div class="rate-bar-fill" style="width:' + pct + '%"></div>' +
        '</div>';
      $disciplineRates.appendChild(row);
    });
  }

  // ── Heatmap ────────────────────────────────

  function renderHeatmap(dates, active) {
    $heatmap.innerHTML = '';

    if (active.length === 0 || dates.length === 0) return;

    dates.forEach(function (dateKey) {
      const dayRecord = records[dateKey] || {};
      let done = 0;
      active.forEach(function (d) {
        if (dayRecord[d.id]) done++;
      });
      const pct = done / active.length;
      const opacity = pct === 0 ? 0.08 : 0.15 + pct * 0.85;

      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';
      cell.style.opacity = opacity;

      const shortDate = formatShortDate(dateKey);
      cell.innerHTML = '<span class="tooltip">' + shortDate + ': ' + Math.round(pct * 100) + '%</span>';

      $heatmap.appendChild(cell);
    });
  }

  function formatShortDate(dateKey) {
    const parts = dateKey.split('-');
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  // ── Initialize ─────────────────────────────

  renderToday();

})();
