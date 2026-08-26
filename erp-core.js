/* =====================================================================
   LoomLine Textile ERP — core
   Storage · permissions · page shell · tables · CRUD · forms · charts
   Load AFTER erp-data.js and BEFORE the page script on every page.
   ===================================================================== */
(function () {
  "use strict";

  const KEY = "loomline.db.v3";
  const SESSION = "loomline.user";
  const THEME = "loomline.theme";
  let memory = null;

  /* ============================ storage ============================ */
  function load() {
    try { const raw = localStorage.getItem(KEY); if (raw) return JSON.parse(raw); } catch (e) {}
    if (memory) return memory;
    const fresh = JSON.parse(JSON.stringify(window.ERP_SEED));
    memory = fresh;
    try { localStorage.setItem(KEY, JSON.stringify(fresh)); } catch (e) {}
    return fresh;
  }
  function save() {
    memory = ERP.db;
    try { localStorage.setItem(KEY, JSON.stringify(ERP.db)); } catch (e) {}
  }
  function reset() { try { localStorage.removeItem(KEY); } catch (e) {} memory = null; ERP.db = load(); }

  /* ============================ helpers ============================ */
  const pad = (n, w) => String(n).padStart(w, "0");
  const num = n => (Number(n) || 0).toLocaleString("en-IN");
  const dec = (n, d = 1) => (Number(n) || 0).toFixed(d);
  const money = n => "₹" + (Number(n) || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 });
  function crore(n) {
    const v = Number(n) || 0;
    if (Math.abs(v) >= 1e7) return "₹" + (v / 1e7).toFixed(2) + " Cr";
    if (Math.abs(v) >= 1e5) return "₹" + (v / 1e5).toFixed(2) + " L";
    return money(v);
  }
  function date(s) {
    if (!s) return "—";
    const d = new Date(s);
    return isNaN(d) ? s : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }
  const today = () => new Date().toISOString().slice(0, 10);
  function nextId(list, prefix, width) {
    let max = 0;
    (list || []).forEach(r => { const m = String(r.id).match(/(\d+)\s*$/); if (m) max = Math.max(max, +m[1]); });
    return prefix + pad(max + 1, width);
  }
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const by = (list, id) => (list || []).find(r => r.id === id) || null;
  const nameOf = (list, id) => (by(list, id) || {}).name || id || "—";
  const initials = n => String(n || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const param = k => new URLSearchParams(location.search).get(k);

  /* ============================ session & rights ============================ */
  function user() { try { return JSON.parse(sessionStorage.getItem(SESSION) || "null"); } catch (e) { return null; } }
  function signIn(u) { try { sessionStorage.setItem(SESSION, JSON.stringify(u)); } catch (e) {} }
  function signOut() { try { sessionStorage.removeItem(SESSION); } catch (e) {} location.href = "index.html"; }

  function myRole() {
    const u = user(); if (!u) return null;
    return by(ERP.db.roles, u.roleId) || ERP.db.roles[0];
  }
  function can(moduleKey) {
    const r = myRole();
    return !!r && r.perms.indexOf(moduleKey) !== -1;
  }

  /* ============================ theme ============================ */
  function theme(next) {
    let t = next;
    if (!t) { try { t = localStorage.getItem(THEME); } catch (e) {} t = t || "light"; }
    document.documentElement.setAttribute("data-theme", t);
    if (next) { try { localStorage.setItem(THEME, next); } catch (e) {} }
    return t;
  }

  /* ============================ icons ============================ */
  const I = {
    dashboard:'<path d="M3 3h7v7H3zM14 3h7v4h-7zM14 10h7v11h-7zM3 13h7v8H3z"/>',
    sales:'<path d="M3 6h18M6 6l1.5 11h9L18 6M9 20h.01M16 20h.01"/>',
    dispatch:'<path d="M1 6h13v10H1zM14 9h4l3 3v4h-7M5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>',
    quotations:'<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M9 13h6M9 17h4"/>',
    invoices:'<path d="M5 2h14v20l-3-2-2 2-2-2-2 2-2-2-3 2zM9 8h6M9 12h6M9 16h3"/>',
    finance:'<path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
    production:'<path d="M2 20h20V9l-6 4V9l-6 4V4H2z"/>',
    looms:'<path d="M4 3v18M10 3v18M14 3v18M20 3v18M3 7h18M3 12h18M3 17h18"/>',
    dyeing:'<path d="M12 2s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z"/>',
    printing:'<path d="M6 9V3h12v6M6 18H4v-6h16v6h-2M8 14h8v7H8z"/>',
    garment:'<path d="M8 3l4 3 4-3 5 4-3 4v9H6v-9L3 7z"/>',
    quality:'<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/>',
    jobwork:'<path d="M3 8h18v12H3zM8 8V5h8v3M3 13h18"/>',
    maintenance:'<path d="M14.7 6.3a4 4 0 01-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 015.4-5.4l-2.6 2.6 2 2z"/>',
    inventory:'<path d="M3 8l9-5 9 5-9 5zM3 8v8l9 5 9-5V8"/>',
    traceability:'<path d="M6 3v6a6 6 0 006 6 6 6 0 016 6v0M6 3h12M6 21h12M6 21v-4M18 3v4"/>',
    purchase:'<path d="M6 2L3 7v13h18V7l-3-5zM3 7h18M16 11a4 4 0 01-8 0"/>',
    hr:'<path d="M16 20v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 9a3 3 0 100-6 3 3 0 000 6zM22 20v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8"/>',
    masters:'<path d="M4 6h16M4 12h16M4 18h10"/><circle cx="19" cy="18" r="2"/>',
    reports:'<path d="M5 21V9M12 21V3M19 21v-7"/>',
    users:'<path d="M12 11a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-2.7 1.1V21a2 2 0 11-4 0v-.1A1.6 1.6 0 006.7 19.4l-.1.1a2 2 0 11-2.8-2.8l.1-.1A1.6 1.6 0 003 15a2 2 0 010-4 1.6 1.6 0 001.1-2.7l-.1-.1a2 2 0 112.8-2.8l.1.1A1.6 1.6 0 009 3.6V3a2 2 0 114 0v.1A1.6 1.6 0 0017.3 4.6l.1-.1a2 2 0 112.8 2.8l-.1.1A1.6 1.6 0 0021 11a2 2 0 010 4z"/>'
  };
  const icon = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
    stroke-linecap="round" stroke-linejoin="round">${I[k] || I.dashboard}</svg>`;

  /* ============================ navigation ============================ */
  const NAV = [
    ["Overview", [["dashboard", "dashboard.html", "Dashboard"]]],
    ["Sell", [
      ["sales", "sales.html", "Sales orders"],
      ["quotations", "quotations.html", "Quotations"],
      ["invoices", "invoices.html", "Invoices"],
      ["dispatch", "dispatch.html", "Dispatch challans"],
      ["finance", "finance.html", "Finance"]
    ]],
    ["Make", [
      ["production", "production.html", "Production"],
      ["looms", "looms.html", "Loom board"],
      ["dyeing", "dyeing.html", "Dyeing"],
      ["printing", "printing.html", "Printing"],
      ["garment", "garment.html", "Garment"],
      ["quality", "quality.html", "Quality control"],
      ["jobwork", "jobwork.html", "Job work"],
      ["maintenance", "maintenance.html", "Maintenance"]
    ]],
    ["Stock", [
      ["inventory", "inventory.html", "Inventory & rolls"],
      ["traceability", "traceability.html", "Traceability"],
      ["purchase", "purchase.html", "Purchase & GRN"]
    ]],
    ["Manage", [
      ["hr", "hr.html", "People & payroll"],
      ["masters", "masters.html", "Masters"],
      ["reports", "reports.html", "Reports"],
      ["users", "users.html", "Users & permissions"],
      ["settings", "settings.html", "Settings"]
    ]]
  ];

  function shell(opts) {
    theme();
    const u = user();
    if (!u) { location.href = "index.html"; return null; }
    if (opts.module && !can(opts.module)) {
      document.body.innerHTML = `<div class="empty" style="padding:80px 20px">
        <b>Your role cannot open this screen</b>
        <p>${esc(u.name)} is signed in as ${esc((myRole() || {}).name || "—")}.
        Ask a director to change your permissions.</p>
        <a class="btn btn-primary" href="dashboard.html">Back to the dashboard</a></div>`;
      return null;
    }
    const page = opts.page || location.pathname.split("/").pop();

    const nav = NAV.map(([group, items]) => {
      const visible = items.filter(([key]) => can(key));
      if (!visible.length) return "";
      return `<div class="side-group">${esc(group)}</div>` + visible.map(([key, href, label]) =>
        `<a class="nav-item ${href === page ? "is-on" : ""}" href="${href}">${icon(key)}${esc(label)}</a>`).join("");
    }).join("");

    const alerts = alertList();

    document.body.insertAdjacentHTML("afterbegin", `
      <div class="shell">
        <aside class="side" id="side">
          <div class="side-brand">
            <span class="side-mark">${weaveMark()}</span>
            <span class="side-name">LoomLine<span>Textile ERP</span></span>
          </div>
          <nav class="side-scroll" aria-label="Modules">${nav}</nav>
          <div class="side-foot"><b>${esc(ERP.db.company.name)}</b>${esc(u.branch || ERP.db.company.branches[0])} · FY 2026–27</div>
        </aside>
        <div class="main">
          <header class="topbar">
            <button class="icon-btn burger" id="burger" aria-label="Menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>
            <div>
              <div class="crumb">${esc(opts.crumb || "Module")}</div>
              <h1>${esc(opts.title || "")}</h1>
            </div>
            <div class="top-right">
              <div class="search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
                <input id="globalSearch" type="search" placeholder="Roll, order, lot…" aria-label="Search">
              </div>
              <button class="icon-btn" id="bell" aria-label="Alerts">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M18 8a6 6 0 10-12 0c0 7-3 8-3 8h18s-3-1-3-8M13.7 21a2 2 0 01-3.4 0"/></svg>
                ${alerts.length ? '<span class="dot"></span>' : ""}</button>
              <button class="icon-btn" id="themeBtn" aria-label="Switch theme"></button>
              <button class="who" id="whoBtn">
                <span class="avatar">${initials(u.name)}</span>
                <span class="who-txt"><b>${esc(u.name)}</b><span>${esc((myRole() || {}).name || u.role)}</span></span>
              </button>
            </div>
          </header>
          <div class="page" id="page"></div>
        </div>
      </div>
      <div class="toasts" id="toasts"></div>`);

    paintThemeBtn();
    document.getElementById("themeBtn").onclick = () => {
      theme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
      paintThemeBtn();
    };
    document.getElementById("bell").onclick = () => alertPanel(alerts);
    document.getElementById("whoBtn").onclick = whoPanel;
    const b = document.getElementById("burger");
    b.onclick = () => document.getElementById("side").classList.toggle("open");
    const gs = document.getElementById("globalSearch");
    gs.addEventListener("keydown", e => { if (e.key === "Enter") globalSearch(gs.value.trim()); });
    return document.getElementById("page");
  }

  function weaveMark() {
    return `<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round">
      <path d="M5 3v18M12 3v18M19 3v18M3 7h18M3 12h18M3 17h18"/></svg>`;
  }
  function paintThemeBtn() {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    document.getElementById("themeBtn").innerHTML = dark
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>`;
  }

  function whoPanel() {
    const u = user(), r = myRole();
    modal({
      title: u.name, sub: (r || {}).name + " · " + esc(u.branch || ""),
      body: `<dl class="def">
          <div><dt>Role</dt><dd>${esc((r || {}).name || "—")}</dd></div>
          <div><dt>Branch</dt><dd>${esc(u.branch || "—")}</dd></div>
          <div><dt>Screens open to you</dt><dd>${(r || { perms: [] }).perms.length} of ${ERP.db.modulesList.length}</dd></div>
        </dl>
        <p style="margin-top:14px;font-size:.85rem;color:var(--muted)">${esc((r || {}).note || "")}</p>`,
      okText: "Sign out", cancelText: "Close", onOk() { signOut(); }
    });
  }

  function alertList() {
    const db = ERP.db, out = [];
    db.rolls.filter(r => r.status === "On hold" || r.status === "Rejected")
      .forEach(r => out.push({ tone: "red", text: "Roll " + r.id + " is " + r.status.toLowerCase() + " at grade " + r.grade, href: "traceability.html?roll=" + r.id }));
    db.stores.filter(s => s.qty <= s.reorder)
      .forEach(s => out.push({ tone: "amber", text: s.name + " is below reorder level", href: "purchase.html" }));
    db.machines.filter(m => m.status === "Breakdown")
      .forEach(m => out.push({ tone: "red", text: m.name + " is down", href: "maintenance.html" }));
    db.jobWorks.filter(j => j.status === "Sent" && new Date(j.due) < new Date(today()))
      .forEach(j => out.push({ tone: "amber", text: "Job work " + j.id + " is past its return date", href: "jobwork.html" }));
    db.invoices.filter(i => i.status === "Unpaid")
      .forEach(i => out.push({ tone: "violet", text: "Invoice " + i.id + " is unpaid", href: "dispatch.html" }));
    return out;
  }
  function alertPanel(list) {
    modal({
      title: "Alerts", sub: list.length + " things want a look",
      body: list.length ? `<div style="display:grid;gap:9px">${list.map(a => `
        <a class="switch" href="${a.href}" style="text-decoration:none">
          <span class="badge ${a.tone}"></span><span><b>${esc(a.text)}</b></span></a>`).join("")}</div>`
        : `<div class="empty"><b>Nothing needs you</b>Every machine, roll and payment is where it should be.</div>`,
      cancelText: "Close"
    });
  }

  function globalSearch(q) {
    if (!q) return;
    const s = q.toUpperCase();
    const go = (p) => location.href = p;
    if (/^R-?\d+/.test(s)) return go("traceability.html?roll=" + encodeURIComponent(s));
    if (/^SO-?\d+/.test(s)) return go("sales.html?q=" + encodeURIComponent(s));
    if (/^PO-?\d+/.test(s)) return go("production.html?q=" + encodeURIComponent(s));
    if (/^Y-?\d+/.test(s)) return go("inventory.html?tab=yarn&q=" + encodeURIComponent(s));
    if (/^DB-?\d+/.test(s)) return go("dyeing.html");
    if (/^JW-?\d+/.test(s)) return go("jobwork.html");
    const c = ERP.db.customers.find(x => x.name.toUpperCase().includes(s));
    if (c) return go("sales.html?q=" + encodeURIComponent(c.name));
    toast("Nothing matches “" + q + "”. Try a roll (R-00251), an order (SO-1025) or a customer name.", true);
  }

  /* ============================ components ============================ */
  function kpis(list) {
    return `<div class="kpis">${list.map(k => `
      <div class="kpi ${k.tone || ""}">
        <div class="k">${esc(k.label)}${k.trend ? `<span class="trend ${k.trendDir || "up"}">${esc(k.trend)}</span>` : ""}</div>
        <div class="v">${k.value}</div>
        ${k.note ? `<div class="d">${k.note}</div>` : ""}
      </div>`).join("")}</div>`;
  }

  function table(cols, rows, opts) {
    opts = opts || {};
    if (!rows.length) return `<div class="empty"><b>${esc(opts.emptyTitle || "Nothing here yet")}</b>${esc(opts.emptyText || "")}</div>`;
    const head = cols.map(c => `<th class="${c.cls || ""}">${esc(c.h)}</th>`).join("");
    const body = rows.map((r, i) => {
      const tds = cols.map(c => `<td class="${c.cls || ""}">${c.render ? c.render(r, i) : esc(r[c.key])}</td>`).join("");
      return `<tr class="${opts.onRow ? "row-click" : ""}" ${opts.rowAttr ? opts.rowAttr(r) : ""}>${tds}</tr>`;
    }).join("");
    const foot = opts.foot ? `<tfoot><tr>${cols.map(c =>
      `<td class="${c.cls || ""}">${opts.foot[c.key] != null ? opts.foot[c.key] : ""}</td>`).join("")}</tr></tfoot>` : "";
    return `<div class="tbl-wrap"><table class="tbl"><thead><tr>${head}</tr></thead><tbody>${body}</tbody>${foot}</table></div>`;
  }

  const badge = (t, tone) => `<span class="badge ${tone || ""}">${esc(t)}</span>`;
  function statusBadge(s) {
    const map = {
      "Running": "blue", "In production": "blue", "Loading": "blue", "In transit": "blue", "Sent": "blue", "In progress": "blue",
      "Completed": "green", "Delivered": "green", "Received": "green", "Paid": "green", "In stock": "green",
      "Confirmed": "green", "Approved": "green", "Closed": "green", "Active": "green",
      "Planned": "grey", "Draft": "grey", "Ordered": "grey", "Idle": "grey", "Under discussion": "grey", "—": "grey",
      "On hold": "amber", "Part paid": "amber", "Maintenance": "amber", "At job work": "amber", "Watch": "amber",
      "Sample sent": "amber", "Awaiting approval": "amber", "In development": "amber", "Open": "amber",
      "Breakdown": "red", "Rejected": "red", "Unpaid": "red", "Overdue": "red", "Reprocess": "red", "Suspended": "red"
    };
    return badge(s, map[s] || "grey");
  }
  function bar(pct, tone) {
    const p = Math.max(0, Math.min(100, pct || 0));
    return `<div class="bar ${tone || ""}"><i style="width:${p}%"></i></div><span class="meter-lbl">${dec(p, 0)}%</span>`;
  }

  /* modal ---------------------------------------------------------- */
  function modal(opts) {
    const bg = document.createElement("div");
    bg.className = "modal-bg";
    bg.innerHTML = `
      <div class="modal ${opts.wide ? "wide" : ""}" role="dialog" aria-modal="true">
        <div class="modal-head"><div><h3>${esc(opts.title || "")}</h3>
          ${opts.sub ? `<p>${opts.sub}</p>` : ""}</div>
          <button class="modal-x" aria-label="Close">&times;</button></div>
        <div class="modal-body">${opts.body || ""}</div>
        <div class="modal-foot">
          ${opts.extra || ""}
          <button class="btn" data-x>${esc(opts.cancelText || "Close")}</button>
          ${opts.okText ? `<button class="btn ${opts.danger ? "btn-danger" : "btn-primary"}" data-ok>${esc(opts.okText)}</button>` : ""}
        </div>
      </div>`;
    document.body.appendChild(bg);
    const close = () => bg.remove();
    bg.querySelector(".modal-x").onclick = close;
    bg.querySelectorAll("[data-x]").forEach(x => x.onclick = close);
    bg.addEventListener("mousedown", e => { if (e.target === bg) close(); });
    document.addEventListener("keydown", function k(e) { if (e.key === "Escape") { close(); document.removeEventListener("keydown", k); } });
    const ok = bg.querySelector("[data-ok]");
    if (ok && opts.onOk) ok.onclick = () => { if (opts.onOk(bg) !== false) close(); };
    const first = bg.querySelector("input,select,textarea");
    if (first) first.focus();
    return { el: bg, close };
  }
  function confirm(opts) {
    return modal({
      title: opts.title, body: `<p>${opts.body}</p>`, okText: opts.okText || "Yes, do it",
      cancelText: "Cancel", danger: true, onOk: opts.onOk
    });
  }

  /* forms ---------------------------------------------------------- */
  function form(fields, values) {
    values = values || {};
    return `<div class="form-grid">${fields.map(f => {
      const id = "f_" + f.name;
      const val = values[f.name] != null ? values[f.name] : (f.value != null ? f.value : "");
      let input;
      if (f.type === "select") {
        input = `<select id="${id}" name="${f.name}">${(f.options || []).map(o => {
          const v = typeof o === "string" ? o : o.value, l = typeof o === "string" ? o : o.label;
          return `<option value="${esc(v)}" ${String(val) === String(v) ? "selected" : ""}>${esc(l)}</option>`;
        }).join("")}</select>`;
      } else if (f.type === "textarea") {
        input = `<textarea id="${id}" name="${f.name}" rows="${f.rows || 3}">${esc(val)}</textarea>`;
      } else if (f.type === "checkbox") {
        return `<label class="switch field ${f.full ? "full" : ""}" data-field="${f.name}">
          <input type="checkbox" name="${f.name}" ${val ? "checked" : ""}>
          <span><b>${esc(f.label)}</b>${f.hint ? `<span>${esc(f.hint)}</span>` : ""}</span></label>`;
      } else {
        input = `<input id="${id}" name="${f.name}" type="${f.type || "text"}" value="${esc(val)}"
          ${f.step ? `step="${f.step}"` : ""} ${f.min != null ? `min="${f.min}"` : ""} ${f.readonly ? "readonly" : ""}>`;
      }
      return `<div class="field ${f.full ? "full" : ""}" data-field="${f.name}">
        <label for="${id}">${esc(f.label)}${f.required ? " *" : ""}</label>${input}
        ${f.hint ? `<span class="hint">${esc(f.hint)}</span>` : ""}</div>`;
    }).join("")}</div>`;
  }

  function readForm(scope, fields) {
    const out = {}; let ok = true;
    scope.querySelectorAll(".field").forEach(f => { f.classList.remove("bad"); const e = f.querySelector(".err"); if (e) e.remove(); });
    fields.forEach(f => {
      const el = scope.querySelector(`[name="${f.name}"]`);
      if (!el) return;
      if (f.type === "checkbox") { out[f.name] = el.checked; return; }
      let v = el.value.trim();
      if (f.required && !v) {
        ok = false;
        const w = el.closest(".field");
        w.classList.add("bad");
        w.insertAdjacentHTML("beforeend", `<span class="err">${esc(f.label)} is needed</span>`);
      }
      if (f.type === "number") v = v === "" ? 0 : Number(v);
      out[f.name] = v;
    });
    return ok ? out : null;
  }

  /* generic CRUD ---------------------------------------------------- */
  /* cfg: { list, prefix, width, title, fields, cols, extra, onSave, onDelete, canDelete } */
  function crud(cfg) {
    const list = () => ERP.db[cfg.list];
    function editor(rec) {
      const isNew = !rec;
      modal({
        title: (isNew ? "New " : "Edit ") + cfg.title.toLowerCase(),
        sub: isNew ? "" : `<span class="mono">${esc(rec.id)}</span>`,
        wide: cfg.fields.length > 5, okText: isNew ? "Create" : "Save changes",
        body: form(cfg.fields, rec || {}),
        onOk(scope) {
          const v = readForm(scope, cfg.fields);
          if (!v) return false;
          if (isNew) {
            const r = Object.assign({ id: nextId(list(), cfg.prefix, cfg.width) }, cfg.extra || {}, v);
            list().push(r);
            save(); toast(cfg.title + " " + r.id + " created."); if (cfg.onSave) cfg.onSave(r, true);
          } else {
            Object.assign(rec, v);
            save(); toast(cfg.title + " " + rec.id + " updated."); if (cfg.onSave) cfg.onSave(rec, false);
          }
          if (cfg.after) cfg.after();
        }
      });
    }
    function remove(rec) {
      const block = cfg.canDelete ? cfg.canDelete(rec) : null;
      if (block) { toast(block, true); return; }
      confirm({
        title: "Delete " + rec.id + "?",
        body: `${esc(rec.name || rec.id)} will be removed. Records already pointing at it keep their own copy of the details.`,
        okText: "Delete",
        onOk() {
          const l = list(); l.splice(l.indexOf(rec), 1);
          save(); toast(cfg.title + " deleted."); if (cfg.after) cfg.after();
        }
      });
    }
    const cols = cfg.cols.concat([{
      h: "", cls: "num", render: r => `<span class="row-act">
        <button class="btn btn-sm" data-edit="${esc(r.id)}">Edit</button>
        <button class="btn btn-sm btn-danger" data-del="${esc(r.id)}">Delete</button></span>`
    }]);
    return {
      editor, remove,
      html(rows) { return table(cols, rows || list()); },
      wire(scope) {
        scope.querySelectorAll("[data-edit]").forEach(b => b.onclick = e => { e.stopPropagation(); editor(by(list(), b.dataset.edit)); });
        scope.querySelectorAll("[data-del]").forEach(b => b.onclick = e => { e.stopPropagation(); remove(by(list(), b.dataset.del)); });
      }
    };
  }

  /* toast ---------------------------------------------------------- */
  function toast(msg, isErr) {
    let box = document.getElementById("toasts");
    if (!box) { box = document.createElement("div"); box.className = "toasts"; box.id = "toasts"; document.body.appendChild(box); }
    const t = document.createElement("div");
    t.className = "toast" + (isErr ? " err" : "");
    t.textContent = msg;
    box.appendChild(t);
    setTimeout(() => t.remove(), 3800);
  }

  /* charts --------------------------------------------------------- */
  function barChart(data, opts) {
    opts = opts || {};
    const w = 100, h = opts.height || 120, max = Math.max(...data.map(d => d.v), 1), bw = w / data.length;
    return `<svg viewBox="0 0 ${w} ${h + 14}" preserveAspectRatio="none" style="width:100%;height:${h + 14}px">
      <defs><linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#7A6BFF"/><stop offset="100%" stop-color="#5B4BF5"/></linearGradient></defs>
      ${data.map((d, i) => {
        const bh = (d.v / max) * h;
        return `<rect x="${i * bw + bw * .18}" y="${h - bh}" width="${bw * .64}" height="${Math.max(bh, .6)}"
          fill="${d.tone || "url(#bg1)"}" rx=".8"><title>${esc(d.l)}: ${num(d.v)}</title></rect>`;
      }).join("")}</svg>
      <div class="legend" style="justify-content:space-between;margin-top:6px">
        <span>${esc(data[0] ? data[0].l : "")}</span><span>${esc(data.length ? data[data.length - 1].l : "")}</span></div>`;
  }
  function lineChart(data, opts) {
    opts = opts || {};
    const w = 320, h = opts.height || 120, max = Math.max(...data.map(d => d.v), 1);
    const pts = data.map((d, i) => [(i / Math.max(data.length - 1, 1)) * w, h - (d.v / max) * (h - 10) - 5]);
    const path = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="width:100%;height:${h}px">
      <defs><linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(91,75,245,.35)"/><stop offset="100%" stop-color="rgba(91,75,245,0)"/></linearGradient></defs>
      <path d="${path} L${w} ${h} L0 ${h} Z" fill="url(#lg1)"/>
      <path d="${path}" fill="none" stroke="#5B4BF5" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    </svg>`;
  }
  function donut(parts, opts) {
    opts = opts || {};
    const total = parts.reduce((s, p) => s + p.v, 0) || 1;
    let acc = 0; const R = 15.5, C = 2 * Math.PI * R;
    return `<div class="split" style="align-items:center;gap:22px">
      <svg viewBox="0 0 44 44" width="128" height="128" style="flex:0 0 128px">
        <circle cx="22" cy="22" r="${R}" fill="none" stroke="var(--sunken)" stroke-width="6.5"/>
        ${parts.map(p => {
          const len = (p.v / total) * C, off = -acc; acc += len;
          return `<circle cx="22" cy="22" r="${R}" fill="none" stroke="${p.color}" stroke-width="6.5"
            stroke-linecap="round" stroke-dasharray="${len.toFixed(2)} ${(C - len).toFixed(2)}"
            stroke-dashoffset="${off.toFixed(2)}" transform="rotate(-90 22 22)">
            <title>${esc(p.l)}: ${num(p.v)}</title></circle>`;
        }).join("")}</svg>
      <div class="legend" style="flex-direction:column;gap:9px">
        ${parts.map(p => `<span><i style="background:${p.color}"></i>${esc(p.l)} — <b style="color:var(--ink)">${opts.money ? crore(p.v) : num(p.v)}</b></span>`).join("")}
      </div></div>`;
  }
  function qrTag(text) {
    let seed = 0; for (const ch of String(text)) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
    const n = 21, cells = [];
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      seed = (seed * 1103515245 + 12345) >>> 0;
      const finder = (x < 7 && y < 7) || (x > n - 8 && y < 7) || (x < 7 && y > n - 8);
      const edge = finder && (x === 0 || y === 0 || x === 6 || y === 6 || x === n - 1 || y === n - 1 ||
        (x >= 2 && x <= 4 && y >= 2 && y <= 4) || (x >= n - 5 && x <= n - 3 && y >= 2 && y <= 4) ||
        (x >= 2 && x <= 4 && y >= n - 5 && y <= n - 3));
      if (finder ? edge : (seed >>> 16) % 2 === 0) cells.push(`<rect x="${x}" y="${y}" width="1" height="1"/>`);
    }
    return `<svg class="qr" viewBox="0 0 ${n} ${n}" role="img" aria-label="Tag ${esc(text)}"><g fill="#141733">${cells.join("")}</g></svg>`;
  }

  /* derived -------------------------------------------------------- */
  function derive() {
    const db = ERP.db;
    const openOrders = db.salesOrders.filter(s => s.status !== "Completed" && s.status !== "Draft");
    const orderValue = openOrders.reduce((s, o) => s + (o.qty - o.dispatched) * o.rate, 0);
    const lastDate = db.prodEntries.length ? db.prodEntries[0].date : today();
    const todayEntries = db.prodEntries.filter(e => e.date === lastDate);
    const producedToday = todayEntries.reduce((s, e) => s + e.metres, 0);
    const looms = db.machines.filter(m => m.id.startsWith("L"));
    const targetToday = looms.reduce((s, m) => s + m.target, 0);
    const efficiency = targetToday ? (producedToday / targetToday) * 100 : 0;
    const inspected = db.inspections.length;
    const failed = db.inspections.filter(i => i.grade !== "A").length;
    const rejection = inspected ? (failed / inspected) * 100 : 0;
    const yarnValue = db.yarn.reduce((s, y) => s + (y.kgIn - y.kgUsed) * y.rate, 0);
    const rollStock = db.rolls.filter(r => r.status === "In stock");
    const fabricValue = rollStock.reduce((s, r) => { const f = by(db.fabrics, r.fabric); return s + r.metres * (f ? f.rate : 0); }, 0);
    const storeValue = db.stores.reduce((s, i) => s + i.qty * i.rate, 0);
    const receivable = db.customers.reduce((s, c) => s + c.outstanding, 0);
    const payable = db.suppliers.reduce((s, x) => s + x.payable, 0);
    const running = db.machines.filter(m => m.status === "Running").length;
    const utilisation = (running / db.machines.length) * 100;
    const invoiced = db.invoices.reduce((s, i) => s + docTotals(i).grand, 0);
    const spend = db.expenses.reduce((s, e) => s + e.amount, 0);
    return { openOrders, orderValue, producedToday, targetToday, efficiency, rejection, yarnValue,
             fabricValue, storeValue, receivable, payable, rollStock, running, utilisation, invoiced, spend };
  }


  /* ============================ documents: GST maths ============================ */
  /* Works for both a quotation and an invoice — same shape. */
  function docTotals(doc) {
    const items = doc.items || [];
    const sub = items.reduce((s, it) => s + (Number(it.qty) || 0) * (Number(it.rate) || 0), 0);
    const discount = Number(doc.discount) || 0;
    const freight = Number(doc.freight) || 0;
    const taxable = Math.max(0, sub - discount) + freight;
    const withTax = doc.gstMode === "gst";
    const rate = withTax ? (Number(doc.gstRate) || 0) : 0;
    const tax = taxable * rate / 100;
    const cust = by(ERP.db.customers, doc.customer);
    const interState = !!(cust && cust.stateCode && cust.stateCode !== ERP.db.company.stateCode);
    const gross = taxable + tax;
    const grand = Math.round(gross);
    return {
      sub, discount, freight, taxable, rate, tax, withTax, interState,
      cgst: interState ? 0 : tax / 2, sgst: interState ? 0 : tax / 2, igst: interState ? tax : 0,
      roundOff: grand - gross, grand,
      due: Math.max(0, grand - (Number(doc.paid) || 0))
    };
  }
  const invTotal = doc => docTotals(doc).grand;

  /* amount in words, Indian system */
  function words(n) {
    n = Math.round(Number(n) || 0);
    if (!n) return "Zero rupees only";
    const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
      "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const two = x => x < 20 ? ones[x] : tens[Math.floor(x / 10)] + (x % 10 ? " " + ones[x % 10] : "");
    const three = x => (x >= 100 ? ones[Math.floor(x / 100)] + " hundred" + (x % 100 ? " " + two(x % 100) : "") : two(x));
    const parts = [];
    const crore = Math.floor(n / 1e7); n %= 1e7;
    const lakh = Math.floor(n / 1e5); n %= 1e5;
    const thousand = Math.floor(n / 1e3); n %= 1e3;
    if (crore) parts.push(three(crore) + " crore");
    if (lakh) parts.push(three(lakh) + " lakh");
    if (thousand) parts.push(three(thousand) + " thousand");
    if (n) parts.push(three(n));
    const out = parts.join(" ");
    return out.charAt(0).toUpperCase() + out.slice(1) + " rupees only";
  }

  /* ============================ line-item editor ============================ */
  /* Renders an editable item grid into `mount`; read back with lineItems.read(mount) */
  const lineItems = {
    html(items) {
      const rows = (items && items.length ? items : [{ desc: "", hsn: "", qty: "", unit: "m", rate: "" }]);
      return `<div class="items" data-items>
        <div class="items-head">
          <span>Description</span><span>HSN</span><span>Qty</span><span>Unit</span><span>Rate</span><span>Amount</span><span></span>
        </div>
        <div data-rows>${rows.map(r => lineItems.row(r)).join("")}</div>
        <button type="button" class="btn btn-sm" data-add-row>+ Add line</button>
      </div>`;
    },
    row(r) {
      r = r || {};
      const amt = (Number(r.qty) || 0) * (Number(r.rate) || 0);
      return `<div class="items-row">
        <input name="desc" value="${esc(r.desc || "")}" placeholder="Fabric, construction, width">
        <input name="hsn" value="${esc(r.hsn || "")}" placeholder="5208">
        <input name="qty" type="number" step="0.01" value="${esc(r.qty == null ? "" : r.qty)}">
        <input name="unit" value="${esc(r.unit || "m")}">
        <input name="rate" type="number" step="0.01" value="${esc(r.rate == null ? "" : r.rate)}">
        <span class="amt mono">${amt ? money(amt) : "—"}</span>
        <button type="button" class="btn btn-sm btn-danger" data-drop-row>&times;</button>
      </div>`;
    },
    wire(scope, onChange) {
      const box = scope.querySelector("[data-items]");
      if (!box) return;
      const rows = box.querySelector("[data-rows]");
      const refresh = () => {
        box.querySelectorAll(".items-row").forEach(r => {
          const q = Number(r.querySelector('[name="qty"]').value) || 0;
          const rt = Number(r.querySelector('[name="rate"]').value) || 0;
          r.querySelector(".amt").textContent = q * rt ? money(q * rt) : "—";
        });
        if (onChange) onChange();
      };
      box.addEventListener("input", refresh);
      box.addEventListener("click", e => {
        if (e.target.closest("[data-add-row]")) {
          rows.insertAdjacentHTML("beforeend", lineItems.row());
          refresh();
        }
        if (e.target.closest("[data-drop-row]")) {
          if (box.querySelectorAll(".items-row").length > 1) e.target.closest(".items-row").remove();
          else toast("A document needs at least one line.", true);
          refresh();
        }
      });
      refresh();
    },
    read(scope) {
      return [...scope.querySelectorAll(".items-row")].map(r => ({
        desc: r.querySelector('[name="desc"]').value.trim(),
        hsn: r.querySelector('[name="hsn"]').value.trim(),
        qty: Number(r.querySelector('[name="qty"]').value) || 0,
        unit: r.querySelector('[name="unit"]').value.trim() || "m",
        rate: Number(r.querySelector('[name="rate"]').value) || 0
      })).filter(i => i.desc && i.qty > 0);
    }
  };

  /* live totals block used inside the editors */
  function totalsBlock(doc) {
    const t = docTotals(doc);
    const line = (l, v, cls) => `<div class="tot-line ${cls || ""}"><span>${l}</span><b>${v}</b></div>`;
    return `<div class="totals">
      ${line("Sub-total", money(t.sub))}
      ${t.discount ? line("Less discount", "− " + money(t.discount)) : ""}
      ${t.freight ? line("Freight / packing", money(t.freight)) : ""}
      ${line("Taxable value", money(t.taxable))}
      ${t.withTax ? (t.interState
        ? line(`IGST ${dec(t.rate, 0)}%`, money(t.igst))
        : line(`CGST ${dec(t.rate / 2, 2)}%`, money(t.cgst)) + line(`SGST ${dec(t.rate / 2, 2)}%`, money(t.sgst)))
        : line("Tax", "Not charged")}
      ${Math.abs(t.roundOff) > 0.004 ? line("Rounded off", (t.roundOff > 0 ? "+" : "−") + money(Math.abs(t.roundOff))) : ""}
      ${line("Total", money(t.grand), "grand")}
      <p class="tot-words">${esc(words(t.grand))}</p>
    </div>`;
  }

  /* ============================ printable document ============================ */
  function printDoc(kind, doc) {
    const db = ERP.db, co = db.company;
    const cust = by(db.customers, doc.customer) || {};
    const t = docTotals(doc);
    const isInv = kind === "invoice";
    const heading = isInv ? (doc.type || (t.withTax ? "Tax invoice" : "Bill of supply")) : "Quotation";
    const html = `
      <div class="doc" id="printDoc">
        <div class="doc-top">
          <div>
            <h2>${esc(co.name)}</h2>
            <p>${esc(co.address)}<br>
               ${t.withTax || co.gstin ? "GSTIN " + esc(co.gstin) + " · " : ""}${esc(co.phone)} · ${esc(co.email)}</p>
          </div>
          <div class="doc-kind">
            <span>${esc(heading)}</span>
            <b>${esc(doc.id)}</b>
            <p>${date(doc.date)}</p>
          </div>
        </div>
        <div class="doc-parties">
          <div><h4>${isInv ? "Billed to" : "Quotation for"}</h4>
            <b>${esc(cust.name || "—")}</b><br>${esc(cust.city || "")}${cust.state ? ", " + esc(cust.state) : ""}
            ${cust.gstin ? "<br>GSTIN " + esc(cust.gstin) : ""}
            ${cust.contact ? "<br>Attn: " + esc(cust.contact) : ""}</div>
          <div><h4>Details</h4>
            ${doc.so ? "Order " + esc(doc.so) + "<br>" : ""}
            ${doc.dc ? "Challan " + esc(doc.dc) + "<br>" : ""}
            ${doc.validity ? "Valid till " + date(doc.validity) + "<br>" : ""}
            ${doc.delivery ? "Delivery: " + esc(doc.delivery) + "<br>" : ""}
            ${doc.transport ? "Transport: " + esc(doc.transport) + "<br>" : ""}
            Place of supply: ${esc(cust.state || co.state)} (${esc(cust.stateCode || co.stateCode)})<br>
            ${t.withTax ? "Tax: " + (t.interState ? "IGST" : "CGST + SGST") + " at " + dec(t.rate, 0) + "%" : "Supplied without tax"}
          </div>
        </div>
        <table class="doc-tbl">
          <thead><tr><th>#</th><th>Description</th><th>HSN</th><th class="r">Qty</th><th>Unit</th>
            <th class="r">Rate</th><th class="r">Amount</th></tr></thead>
          <tbody>${(doc.items || []).map((i, n) => `<tr>
            <td>${n + 1}</td><td>${esc(i.desc)}</td><td>${esc(i.hsn || "—")}</td>
            <td class="r">${num(i.qty)}</td><td>${esc(i.unit)}</td>
            <td class="r">${dec(i.rate, 2)}</td><td class="r">${money(i.qty * i.rate)}</td></tr>`).join("")}
          </tbody>
        </table>
        <div class="doc-bottom">
          <div class="doc-terms">
            ${t.withTax ? `<h4>Tax summary</h4>
              <table class="doc-tbl small"><thead><tr><th>Taxable</th>
              ${t.interState ? `<th class="r">IGST ${dec(t.rate, 0)}%</th>` :
                `<th class="r">CGST ${dec(t.rate / 2, 2)}%</th><th class="r">SGST ${dec(t.rate / 2, 2)}%</th>`}
              <th class="r">Total tax</th></tr></thead>
              <tbody><tr><td>${money(t.taxable)}</td>
              ${t.interState ? `<td class="r">${money(t.igst)}</td>` :
                `<td class="r">${money(t.cgst)}</td><td class="r">${money(t.sgst)}</td>`}
              <td class="r">${money(t.tax)}</td></tr></tbody></table>` : ""}
            ${isInv ? `<h4>Bank</h4><p>${esc(co.bank.name)} · A/c ${esc(co.bank.ac)} · IFSC ${esc(co.bank.ifsc)}</p>` : ""}
            <h4>Terms</h4><p>${esc(doc.notes ? doc.notes + "\n" : "")}${esc(co.terms)}</p>
          </div>
          <div class="doc-tot">
            ${totalsBlock(doc)}
            ${isInv && doc.paid ? `<p class="mono" style="text-align:right">Received ${money(doc.paid)} · due ${money(t.due)}</p>` : ""}
            <div class="doc-sign">For ${esc(co.name)}<span>Authorised signatory</span></div>
          </div>
        </div>
        ${!t.withTax && isInv ? `<p class="doc-note">Bill of supply — tax not collected on this document.</p>` : ""}
      </div>`;

    modal({
      title: heading + " " + doc.id, wide: true, cancelText: "Close",
      body: html,
      extra: `<button class="btn" data-copy>Copy as text</button>`,
      okText: "Print / save as PDF",
      onOk(scope) {
        const w = window.open("", "_blank", "width=900,height=1000");
        if (!w) { toast("Allow pop-ups to print this document.", true); return false; }
        const css = [...document.querySelectorAll('link[rel="stylesheet"]')]
          .map(l => `<link rel="stylesheet" href="${l.href}">`).join("");
        w.document.write(`<!DOCTYPE html><html><head><title>${esc(doc.id)}</title>${css}
          <style>body{background:#fff;padding:26px}.doc{max-width:820px;margin:auto}</style></head>
          <body data-theme="light">${scope.querySelector("#printDoc").outerHTML}</body></html>`);
        w.document.close();
        setTimeout(() => { w.focus(); w.print(); }, 400);
        return false;
      }
    }).el.querySelector("[data-copy]").onclick = function () {
      const txt = document.getElementById("printDoc").innerText;
      if (navigator.clipboard) navigator.clipboard.writeText(txt);
      toast("Document copied — paste it into WhatsApp or an email.");
    };
  }

  /* ============================ row actions for custom tables ============================ */
  /* cfg: { list, title, fields, canDelete, onSave, after, beforeEdit } */
  function actions(cfg) {
    const list = () => ERP.db[cfg.list];
    function editor(rec) {
      const fields = typeof cfg.fields === "function" ? cfg.fields(rec) : cfg.fields;
      modal({
        title: "Edit " + cfg.title.toLowerCase(), sub: `<span class="mono">${esc(rec.id)}</span>`,
        wide: fields.length > 5, okText: "Save changes", body: form(fields, rec),
        onOk(scope) {
          const v = readForm(scope, fields);
          if (!v) return false;
          if (cfg.validate) { const msg = cfg.validate(rec, v); if (msg) { toast(msg, true); return false; } }
          Object.assign(rec, v);
          save(); toast(cfg.title + " " + rec.id + " updated.");
          if (cfg.onSave) cfg.onSave(rec);
          if (cfg.after) cfg.after();
        }
      });
    }
    function remove(rec) {
      const block = cfg.canDelete ? cfg.canDelete(rec) : null;
      if (block) { toast(block, true); return; }
      confirm({
        title: "Delete " + rec.id + "?",
        body: cfg.deleteNote || "This record will be removed.",
        okText: "Delete",
        onOk() {
          const l = list(); l.splice(l.indexOf(rec), 1);
          save(); toast(cfg.title + " deleted."); if (cfg.after) cfg.after();
        }
      });
    }
    const openEditor = rec => (cfg.editor || editor)(rec);
    return {
      editor: openEditor, remove,
      col: {
        h: "", cls: "num", render: r => `<span class="row-act">
          <button class="btn btn-sm" data-edit="${esc(r.id)}">Edit</button>
          <button class="btn btn-sm btn-danger" data-del="${esc(r.id)}">Delete</button></span>`
      },
      wire(scope) {
        scope.querySelectorAll("[data-edit]").forEach(b => b.onclick = e => {
          e.stopPropagation(); openEditor(by(list(), b.dataset.edit)); });
        scope.querySelectorAll("[data-del]").forEach(b => b.onclick = e => {
          e.stopPropagation(); remove(by(list(), b.dataset.del)); });
      }
    };
  }

  /* expose --------------------------------------------------------- */
  const ERP = {
    db: null, save, reset, load,
    user, signIn, signOut, myRole, can, theme,
    shell, kpis, table, badge, statusBadge, bar, modal, confirm, form, readForm, crud, actions, toast,
    docTotals, invTotal, words, lineItems, totalsBlock, printDoc,
    barChart, lineChart, donut, qrTag, icon, alertList,
    num, dec, money, crore, date, today, nextId, esc, by, nameOf, initials, param, derive, NAV
  };
  ERP.db = load();
  window.ERP = ERP;
})();
