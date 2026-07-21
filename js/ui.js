// ═══════════════════════════════════════════════════
// UI.JS — Auth, rendering, events
// ═══════════════════════════════════════════════════

// ── AUTH UI ──
let authMode = 'signin';

function showAuthError(msg) {
  const el = document.getElementById('auth-error');
  el.textContent = msg;
  el.classList.add('show');
}

function clearAuthError() {
  document.getElementById('auth-error').classList.remove('show');
}

document.getElementById('tab-signin').addEventListener('click', () => {
  authMode = 'signin';
  document.getElementById('tab-signin').classList.add('active');
  document.getElementById('tab-signup').classList.remove('active');
  document.getElementById('field-name').style.display = 'none';
  document.getElementById('auth-submit').textContent = 'Sign In';
  clearAuthError();
});

document.getElementById('tab-signup').addEventListener('click', () => {
  authMode = 'signup';
  document.getElementById('tab-signup').classList.add('active');
  document.getElementById('tab-signin').classList.remove('active');
  document.getElementById('field-name').style.display = 'flex';
  document.getElementById('auth-submit').textContent = 'Create Account';
  clearAuthError();
});

document.getElementById('auth-submit').addEventListener('click', async () => {
  const email    = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  const name     = document.getElementById('auth-name').value.trim();
  clearAuthError();

  if (!email || !password) { showAuthError('Please enter your email and password.'); return; }

  const btn = document.getElementById('auth-submit');
  btn.textContent = 'Please wait…';
  btn.disabled = true;

  if (authMode === 'signup') {
    const { error } = await signUp(email, password, name || email.split('@')[0]);
    if (error) { showAuthError(error.message); }
    else { showAuthError('Check your email to confirm your account, then sign in.'); }
  } else {
    const { error } = await signIn(email, password);
    if (error) { showAuthError(error.message); }
  }

  btn.textContent = authMode === 'signup' ? 'Create Account' : 'Sign In';
  btn.disabled = false;
});

// Enter key in auth form
['auth-email','auth-password','auth-name'].forEach(id => {
  document.getElementById(id)?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('auth-submit').click();
  });
});

// ── AUTH STATE LISTENER ──
// Wrapped in DOMContentLoaded to ensure all modules are loaded first
document.addEventListener('DOMContentLoaded', () => {
  onAuthChange(async (session) => {
    if (session) {
      currentUser = session.user;
      document.getElementById('auth-screen').classList.add('hidden');
      await bootApp();
    } else {
      currentUser = null;
      document.getElementById('auth-screen').classList.remove('hidden');
    }
  });
});

// ── BOOT ──
async function bootApp() {
  // Show loading overlay
  document.getElementById('loading-overlay').classList.remove('hidden');
  setLoaderFill(10);
  setLoaderSub('Loading your roster…');

  // Load roster from Supabase (or seed defaults)
  await initRosters();
  setLoaderFill(40);
  setLoaderSub('Fetching MFM data…');

  // Fetch MFM points data
  const { totalUnits, slugCount } = await fetchAllMfmData();
  setLoaderFill(90);

  // Update header status
  document.getElementById('status-dot').className = 'status-dot ok';
  document.getElementById('status-text').textContent = `Live — ${totalUnits} units across ${slugCount} factions`;
  document.getElementById('last-updated').textContent = 'Updated ' + new Date().toLocaleTimeString();

  // Build user menu button in header
  const displayName = currentUser.user_metadata?.display_name ||
                      currentUser.email.split('@')[0];
  const initials = displayName.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
  const headerRight = document.querySelector('.header-right');
  if (!document.getElementById('user-menu-btn')) {
    const userBtn = document.createElement('button');
    userBtn.className = 'user-menu-btn';
    userBtn.id = 'user-menu-btn';
    userBtn.innerHTML = `<div class="user-avatar">${initials}</div><span>${displayName}</span>`;
    userBtn.addEventListener('click', async () => {
      if (confirm(`Sign out of ${currentUser.email}?`)) {
        await signOut();
      }
    });
    headerRight.prepend(userBtn);
  }

  setLoaderFill(100);
  setTimeout(() => {
    document.getElementById('loading-overlay').classList.add('hidden');
    buildSidebar();
    buildMobileNav();
    showDashboard();
  }, 250);
}

// ── SAVE INDICATOR ──
function flashSaved() {
  const el = document.getElementById('save-indicator');
  if (!el) return;
  el.textContent = '✓ Saved'; el.classList.add('saved');
  setTimeout(() => { el.textContent = 'Auto-save on'; el.classList.remove('saved'); }, 1800);
}

// ── STATUS HELPERS ──
function setLoaderFill(p) { document.getElementById('loader-fill').style.width = p + '%'; }
function setLoaderSub(m)  { document.getElementById('loader-sub').textContent = m; }

// ── MOBILE NAV ──
function buildMobileNav() {
  const inner = document.getElementById('mobile-nav-inner');
  const listBtn = document.getElementById('mob-list');

  FACTIONS.forEach(f => {
    const btn = document.createElement('button');
    btn.className = 'mobile-nav-btn';
    btn.dataset.fid = f.id;
    btn.innerHTML = `<span class="nav-icon" style="color:${f.color}">●</span>${f.label.split(' ').slice(-1)[0]}`;
    btn.addEventListener('click', () => showFaction(f.id));
    inner.insertBefore(btn, listBtn);
  });

  document.getElementById('mob-dash').addEventListener('click', showDashboard);
  listBtn.addEventListener('click', showListChecker);
}

function setMobileNav(target, fid) {
  document.querySelectorAll('.mobile-nav-btn').forEach(b => {
    if (target === 'faction') {
      b.classList.toggle('active', b.dataset.fid === fid);
    } else {
      b.classList.toggle('active', b.dataset.target === target || b.id === 'mob-' + target);
    }
  });
}

// DASHBOARD
// ═══════════════════════════════════════════════════
function showDashboard() {
  activeFactionId = null;
  document.getElementById('listcheck-panel').classList.remove('active');
  document.getElementById('dashboard-panel').classList.add('active');
  document.getElementById('main-panel').classList.add('hidden');
  document.getElementById('dash-btn').classList.add('active');
  document.getElementById('listcheck-btn').classList.remove('active');
  document.querySelectorAll('.faction-btn:not(#dash-btn):not(#listcheck-btn)').forEach(b => b.classList.remove('active'));
  setMobileNav('dashboard');
  renderDashboard();
}

function showFaction(fid) {
  document.getElementById('listcheck-panel').classList.remove('active');
  document.getElementById('listcheck-btn').classList.remove('active');
  document.getElementById('dashboard-panel').classList.remove('active');
  document.getElementById('main-panel').classList.remove('hidden');
  document.getElementById('dash-btn').classList.remove('active');
  activeFactionId = fid;
  document.querySelectorAll('.faction-btn:not(#dash-btn):not(#listcheck-btn)').forEach(b =>
    b.classList.toggle('active', b.dataset.fid === fid));
  setMobileNav('faction', fid);
  renderFaction(fid);
}

function renderDashboard() {
  // ── Compute per-faction stats ──
  const stats = FACTIONS.map((f, fi) => {
    let modelsOwned=0, modelsBuilt=0, modelsPainted=0, ptsOwned=0, ptsBuilt=0, mfmChanges=0;
    rosters[fi].forEach(row => {
      const live = lookupMfm(fi, row.unit);
      const pts  = live !== null ? live : (row.storedPts || 0);
      const uo   = row.unitsOwned ?? 1;
      const ub   = row.unitsBuilt ?? 0;
      modelsOwned   += row.qty || 0;
      modelsBuilt   += row.modelBuilt || 0;
      modelsPainted += row.painted || 0;
      ptsOwned  += pts * uo;
      ptsBuilt  += pts * ub;
      if (live !== null && row.storedPts !== null && live !== row.storedPts) mfmChanges++;
    });
    return { f, fi, modelsOwned, modelsBuilt, modelsPainted, ptsOwned, ptsBuilt, mfmChanges };
  });

  // ── Grand totals ──
  const grand = stats.reduce((a, s) => ({
    modelsOwned:   a.modelsOwned   + s.modelsOwned,
    modelsBuilt:   a.modelsBuilt   + s.modelsBuilt,
    modelsPainted: a.modelsPainted + s.modelsPainted,
    ptsOwned:      a.ptsOwned      + s.ptsOwned,
    ptsBuilt:      a.ptsBuilt      + s.ptsBuilt,
  }), { modelsOwned:0, modelsBuilt:0, modelsPainted:0, ptsOwned:0, ptsBuilt:0 });

  const grandEl = document.getElementById('dash-grand');
  const builtPct   = grand.modelsOwned ? Math.round(grand.modelsBuilt   / grand.modelsOwned * 100) : 0;
  const paintedPct = grand.modelsOwned ? Math.round(grand.modelsPainted / grand.modelsOwned * 100) : 0;
  const ptsPct     = grand.ptsOwned    ? Math.round(grand.ptsBuilt      / grand.ptsOwned   * 100) : 0;

  grandEl.innerHTML = `
    <div class="dash-grand">
      <div class="dash-grand-cell">
        <div class="dgc-label">Total Factions</div>
        <div class="dgc-value gold">${FACTIONS.length}</div>
        <div class="dgc-sub">armies tracked</div>
      </div>
      <div class="dash-grand-cell">
        <div class="dgc-label">Models Owned</div>
        <div class="dgc-value gold">${grand.modelsOwned.toLocaleString()}</div>
        <div class="dgc-sub">${grand.modelsBuilt.toLocaleString()} built · ${builtPct}%</div>
      </div>
      <div class="dash-grand-cell">
        <div class="dgc-label">Models Painted</div>
        <div class="dgc-value gold">${grand.modelsPainted.toLocaleString()}</div>
        <div class="dgc-sub">${paintedPct}% of owned</div>
      </div>
      <div class="dash-grand-cell">
        <div class="dgc-label">Points Owned</div>
        <div class="dgc-value">${grand.ptsOwned.toLocaleString()}</div>
        <div class="dgc-sub">across all armies</div>
      </div>
      <div class="dash-grand-cell">
        <div class="dgc-label">Points Built</div>
        <div class="dgc-value">${grand.ptsBuilt.toLocaleString()}</div>
        <div class="dgc-sub">${ptsPct}% of owned pts</div>
      </div>
    </div>
  `;

  // ── Army cards ──
  const maxPts    = Math.max(...stats.map(s => s.ptsOwned), 1);
  const maxModels = Math.max(...stats.map(s => s.modelsOwned), 1);

  const grid = document.getElementById('dash-grid');
  grid.innerHTML = '';

  stats.forEach(({ f, fi, modelsOwned, modelsBuilt, modelsPainted, ptsOwned, ptsBuilt, mfmChanges }) => {
    const builtPct   = modelsOwned ? Math.round(modelsBuilt   / modelsOwned * 100) : 0;
    const paintedPct = modelsOwned ? Math.round(modelsPainted / modelsOwned * 100) : 0;
    const ptsPct     = ptsOwned    ? Math.round(ptsBuilt      / ptsOwned   * 100) : 0;
    const ptsUnbuilt = ptsOwned - ptsBuilt;

    const card = document.createElement('div');
    card.className = 'army-card';
    card.innerHTML = `
      <div class="army-card-header">
        <div class="army-card-dot" style="background:${f.color}"></div>
        <div class="army-card-name">${f.label}</div>
        <div class="army-card-total">${ptsOwned.toLocaleString()}<span>pts</span></div>
      </div>
      <div class="army-card-stats">
        <div class="stat-row">
          <div class="stat-label">Models Owned</div>
          <div class="stat-bar-wrap"><div class="stat-bar bar-owned" style="width:${Math.round(modelsOwned/maxModels*100)}%"></div></div>
          <div class="stat-val">${modelsOwned}</div>
          <div class="stat-pct"></div>
        </div>
        <div class="stat-row">
          <div class="stat-label">Built</div>
          <div class="stat-bar-wrap"><div class="stat-bar bar-built" style="width:${builtPct}%"></div></div>
          <div class="stat-val">${modelsBuilt}</div>
          <div class="stat-pct">${builtPct}%</div>
        </div>
        <div class="stat-row">
          <div class="stat-label">Painted</div>
          <div class="stat-bar-wrap"><div class="stat-bar bar-painted" style="width:${paintedPct}%"></div></div>
          <div class="stat-val">${modelsPainted}</div>
          <div class="stat-pct">${paintedPct}%</div>
        </div>
      </div>
      <div class="pts-compare">
        <div class="pts-compare-label">Points — Built vs Owned</div>
        <div class="pts-track">
          <div class="pts-track-built" style="width:${ptsPct}%"></div>
          <div class="pts-track-unblt" style="width:${100-ptsPct}%"></div>
        </div>
        <div class="pts-compare-legend">
          <div class="pcl-item"><div class="pcl-dot pcl-dot-built"></div>${ptsBuilt.toLocaleString()} pts built</div>
          <div class="pcl-item"><div class="pcl-dot pcl-dot-owned"></div>${ptsOwned.toLocaleString()} pts owned</div>
          ${mfmChanges > 0 ? `<div class="pcl-item" style="margin-left:auto;color:var(--changed-text)">⚑ ${mfmChanges} changed</div>` : ''}
        </div>
      </div>
    `;
    card.addEventListener('click', () => showFaction(f.id));
    grid.appendChild(card);
  });
}


// ═══════════════════════════════════════════════════
// LIST CHECKER
// ═══════════════════════════════════════════════════

// ── BCP/TTB List Parser ──
// Extracts { name, qty, pts } from raw BCP export text.
// Handles markdown links [Name](url), duplicate entries = multiple copies needed.
function parseBcpList(text) {
  const units = [];
  const lines = text.split('\n');

  // Detect faction: 2nd non-empty line after the list name/title line
  // List title line looks like "Name (NNNN points)" — skip it
  let faction = null;
  let nonEmptyCount = 0;
  const titleRe = /^.+\(\d+\s*points?\)\s*$/i;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    nonEmptyCount++;
    if (nonEmptyCount === 1) continue; // skip list name line
    if (nonEmptyCount === 2) {
      // This should be the faction line (e.g. "Necrons", "Chaos Space Marines")
      // Make sure it's not itself a unit line
      if (!titleRe.test(trimmed)) { faction = trimmed; }
      break;
    }
  }

  // Section headers and non-unit lines to skip
  const skipRe = /^(CHARACTERS|BATTLELINE|OTHER DATASHEETS|ATTACHED UNITS?|FORCE DISPOSITIONS|WARLORD|Exported with|Strike Force|Detachment Points|Force Dispositions|\• |•)/i;

  // Unit line: optional "[Name](url)" then "(N points)"
  // The name part may contain markdown links inline e.g. "Red Corsairs [Raider](url) Champion"
  const unitRe = /^(.+?)\((\d+)\s*points?\)\s*$/i;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (skipRe.test(line)) continue;

    const m = line.match(unitRe);
    if (!m) continue;

    // Clean the name: strip markdown links [text](url) → text
    let name = m[1].trim();
    name = name.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1'); // [text](url) → text
    name = name.replace(/\[|\]/g, '').trim();               // stray brackets
    // Skip if name looks like a list header (contains "Strike Force", detachment names etc)
    if (/strike force|detachment|dynasty|warpack|disposition|\d{4}\s*pts/i.test(name)) continue;
    // Skip the list title line itself (e.g. "crons" from "crons (1985 points)")
    if (nonEmptyCount > 0 && units.length === 0 && titleRe.test(line)) {
      // This might be the list title — only skip if it's the very first matched line
      // and looks short/non-unit-like
      const pts = parseInt(m[2], 10);
      if (pts > 1500) continue; // list total points, not a unit
    }

    const pts = parseInt(m[2], 10);
    if (pts === 0) continue;

    // Group by name only — same unit with different pts (e.g. upgraded Defilers) merges into one entry
    const existing = units.find(u => u.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      existing.qty++;
    } else {
      units.push({ name, pts, qty: 1 });
    }
  }

  return { units, faction };
}

// ── Inventory Lookup ──
// Given a unit name and faction hint, find how many we own and how many are built.
function checkInventory(unitName, factionHint) {
  const lower = unitName.toLowerCase();

  // Try to find matching faction(s) to search
  let factionIdxs = [];

  // Match by faction hint first (from list header)
  if (factionHint) {
    const hintLower = factionHint.toLowerCase();
    FACTIONS.forEach((f, fi) => {
      if (f.label.toLowerCase().includes(hintLower) ||
          hintLower.includes(f.label.toLowerCase().split(' ').slice(-1)[0].toLowerCase())) {
        factionIdxs.push(fi);
      }
    });
  }

  // If no faction match, search all factions
  if (factionIdxs.length === 0) {
    factionIdxs = FACTIONS.map((_, fi) => fi);
  }

  let totalOwned = 0;
  let totalBuilt = 0;
  let matchedFaction = null;

  for (const fi of factionIdxs) {
    for (const row of rosters[fi]) {
      const rowLower = row.unit.toLowerCase();
      // Exact match or close substring match
      const isMatch = rowLower === lower ||
        rowLower.includes(lower) ||
        lower.includes(rowLower) ||
        fuzzyMatch(lower, rowLower);
      if (isMatch) {
        totalOwned += row.unitsOwned ?? 1;
        totalBuilt += row.unitsBuilt ?? 0;
        if (!matchedFaction) matchedFaction = FACTIONS[fi].label;
      }
    }
  }

  return { owned: totalOwned, built: totalBuilt, faction: matchedFaction };
}

// Simple fuzzy match — checks if all words in query appear in target
function fuzzyMatch(query, target) {
  const qWords = query.split(/\s+/).filter(w => w.length > 3);
  if (qWords.length === 0) return false;
  return qWords.every(w => target.includes(w));
}

// ── Show / Hide panel ──
function showListChecker() {
  activeFactionId = null;
  document.getElementById('listcheck-panel').classList.add('active');
  document.getElementById('dashboard-panel').classList.remove('active');
  document.getElementById('main-panel').classList.add('hidden');
  document.getElementById('dash-btn').classList.remove('active');
  document.getElementById('listcheck-btn').classList.add('active');
  document.querySelectorAll('.faction-btn:not(#dash-btn):not(#listcheck-btn)').forEach(b => b.classList.remove('active'));
}

// showDashboard and showFaction handle list checker cleanup directly

// ── Render Results ──
function renderListResults(parsed) {
  const { units, faction } = parsed;
  const resultsEl  = document.getElementById('lc-results');
  const summaryEl  = document.getElementById('lc-summary');
  const factionTag = document.getElementById('lc-faction-tag');

  if (units.length === 0) {
    resultsEl.innerHTML = '<div class="lc-empty">No units found — make sure you pasted the full list text</div>';
    summaryEl.classList.add('hidden');
    factionTag.textContent = 'Could not detect faction';
    factionTag.classList.remove('detected');
    return;
  }

  factionTag.textContent = faction || 'Unknown faction';
  factionTag.classList.toggle('detected', !!faction);

  // Categorise each unit
  const have    = [];
  const build   = [];
  const buy     = [];
  const unknown = [];
  let totalPts  = 0;

  units.forEach(u => {
    totalPts += u.pts * u.qty;
    const inv = checkInventory(u.name, faction);

    // Work out exactly how many fall into each bucket:
    // need = how many the list wants
    // owned = how many we have (may be less than need)
    // built = how many of the owned are assembled
    const need   = u.qty;
    const owned  = inv.owned;
    const built  = inv.built;
    const unbuilt = Math.max(0, owned - built);  // owned but not assembled

    // How many to buy (don't own at all)
    const toBuy = Math.max(0, need - owned);

    // Of the ones we do own, how many are ready (built)?
    // Can only be "ready" up to the number needed
    const ownedUsable  = Math.min(owned, need);
    const toHave  = Math.min(built, ownedUsable);
    const toBuild = ownedUsable - toHave;

    if (toHave  > 0) have.push({  ...u, qty: toHave,  inv });
    if (toBuild > 0) build.push({ ...u, qty: toBuild, inv, note: toBuild === 1 ? 'not built' : `${toBuild} unbuilt` });
    if (toBuy   > 0) buy.push({   ...u, qty: toBuy,   inv, note: toBuy === 1 ? 'not owned' : `need ${toBuy}` });
  });

  // Update summary bar
  summaryEl.classList.remove('hidden');
  document.getElementById('lcs-pts').textContent   = totalPts.toLocaleString() + ' pts';
  document.getElementById('lcs-units').textContent = units.reduce((a,u) => a + u.qty, 0);
  document.getElementById('lcs-have').textContent  = have.reduce((a,u)  => a + u.qty, 0);
  document.getElementById('lcs-build').textContent = build.reduce((a,u) => a + u.qty, 0);
  document.getElementById('lcs-buy').textContent   = buy.reduce((a,u)   => a + u.qty, 0);

  // Build HTML
  resultsEl.innerHTML = '';

  function makeSection(title, cssClass, icon, items) {
    if (items.length === 0) return;
    const sec = document.createElement('div');
    sec.className = 'lc-section';
    sec.innerHTML = `
      <div class="lc-section-header">
        <div class="lc-section-title ${cssClass}">${icon} ${title}</div>
        <div class="lc-section-count">${items.reduce((a,u) => a+u.qty,0)} unit${items.reduce((a,u)=>a+u.qty,0)!==1?'s':''}</div>
      </div>
    `;
    items.forEach(u => {
      const row = document.createElement('div');
      row.className = `lc-unit-row ${cssClass}`;
      const noteHtml = u.note ? `<div class="lc-unit-note ${cssClass}">${u.note}</div>` : '';
      const qtyLabel = u.qty > 1 ? `${u.qty}×` : '1×';
      row.innerHTML = `
        <div class="lc-status-icon">${icon}</div>
        <div class="lc-unit-qty" style="min-width:28px;text-align:right;font-variant-numeric:tabular-nums;color:var(--text-dim);font-size:11px;">${qtyLabel}</div>
        <div class="lc-unit-name">${u.name}</div>
        ${noteHtml}
      `;
      sec.appendChild(row);
    });
    resultsEl.appendChild(sec);
  }

  makeSection('Ready to Run',   'have',    '✓', have);
  makeSection('Need to Build',  'build',   '⚒', build);
  makeSection('Need to Buy',    'buy',     '✕', buy);
  makeSection('Not in Tracker', 'unknown', '?', unknown);
}

// ── Wire buttons ──
document.getElementById('listcheck-btn').addEventListener('click', showListChecker);
document.getElementById('lc-parse-btn').addEventListener('click', () => {
  const text = document.getElementById('lc-textarea').value.trim();
  if (!text) return;
  const parsed = parseBcpList(text);
  renderListResults(parsed);
});
// Also parse on Ctrl+Enter in textarea
document.getElementById('lc-textarea').addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    document.getElementById('lc-parse-btn').click();
  }
});


// ═══════════════════════════════════════════════════
// INIT — Auth state change triggers bootApp()
// ═══════════════════════════════════════════════════
// Check for existing session on page load
// Session check and service worker registration handled in DOMContentLoaded above
// Register service worker separately
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
  });
}
