// ═══════════════════════════════════════════════════
// APP.JS — State management + Supabase sync
// ═══════════════════════════════════════════════════

let rosters       = [];   // array of arrays, indexed by FACTIONS index
let collapsedCats = new Set();
let activeFactionId = null;
let currentUser     = null;

// ── Convert DB row → roster row format ──
function dbRowToRosterRow(row) {
  return {
    _id:        row.id,           // supabase UUID, used for updates
    unit:       row.unit,
    cat:        row.cat,
    qty:        row.qty,
    bought:     row.bought,
    modelBuilt: row.model_built,
    unitsBuilt: row.units_built,
    unitsOwned: row.units_owned,
    painted:    row.painted,
    storedPts:  row.stored_pts,
    note:       row.note,
  };
}

// ── Convert roster row → DB row format ──
function rosterRowToDbRow(row, factionId, userId, sortOrder) {
  return {
    id:          row._id || undefined,   // undefined = let Supabase generate
    user_id:     userId,
    faction_id:  factionId,
    unit:        row.unit,
    cat:         row.cat,
    qty:         row.qty ?? 0,
    bought:      row.bought ?? 'N',
    model_built: row.modelBuilt ?? 0,
    units_built: row.unitsBuilt ?? 0,
    units_owned: row.unitsOwned ?? 1,
    painted:     row.painted ?? 0,
    stored_pts:  row.storedPts ?? null,
    note:        row.note ?? null,
    sort_order:  sortOrder ?? 0,
  };
}

// ── Initialise rosters (called after login) ──
async function initRosters() {
  const hasData = await hasExistingRoster();

  if (hasData) {
    // Load from cloud
    const rows = await loadRosterFromCloud();
    if (rows) {
      // Build rosters array indexed by faction
      rosters = FACTIONS.map(f => {
        const factionRows = rows.filter(r => r.faction_id === f.id);
        factionRows.sort((a,b) => a.sort_order - b.sort_order);
        return factionRows.map(dbRowToRosterRow);
      });
      console.log('Loaded roster from Supabase:', rows.length, 'units');
      return;
    }
  }

  // No cloud data — seed from defaults
  console.log('No existing roster, seeding defaults...');
  rosters = FACTIONS.map(f => f.roster.map(r => ({...r})));
  await seedAllFactions();
}

// ── Seed all default faction rosters to Supabase ──
async function seedAllFactions() {
  const session = await getSession();
  if (!session) return;

  for (let fi = 0; fi < FACTIONS.length; fi++) {
    const f = FACTIONS[fi];
    const { error } = await seedFactionRoster(f.id, f.roster);
    if (error) console.error(`Seed error for ${f.id}:`, error);
  }

  // Reload from cloud to get generated IDs
  const rows = await loadRosterFromCloud();
  if (rows) {
    rosters = FACTIONS.map(f => {
      const factionRows = rows.filter(r => r.faction_id === f.id);
      factionRows.sort((a,b) => a.sort_order - b.sort_order);
      return factionRows.map(dbRowToRosterRow);
    });
  }
  console.log('Seeded and loaded defaults');
}

// ── Save a single unit change ──
async function saveUnitChange(fi, rowIdx) {
  const session = await getSession();
  if (!session) { saveLocally(); return; }

  const row = rosters[fi][rowIdx];
  const dbRow = rosterRowToDbRow(row, FACTIONS[fi].id, session.user.id, rowIdx);

  const { data, error } = await saveUnit(dbRow);
  if (error) {
    console.error('Save error:', error);
  } else if (data && data[0] && !row._id) {
    // Store the generated ID back on the row
    rosters[fi][rowIdx]._id = data[0].id;
  }

  // Also update localStorage as offline fallback
  saveLocally();
}

// ── Add a new unit ──
async function addUnit(fi, unitData) {
  const session = await getSession();
  const sortOrder = rosters[fi].length;
  const newRow = { ...unitData };
  rosters[fi].push(newRow);

  if (session) {
    const dbRow = rosterRowToDbRow(newRow, FACTIONS[fi].id, session.user.id, sortOrder);
    const { data, error } = await saveUnit(dbRow);
    if (error) { console.error('Add unit error:', error); }
    else if (data && data[0]) { rosters[fi][rosters[fi].length - 1]._id = data[0].id; }
  }
  saveLocally();
}

// ── Delete a unit ──
async function removeUnit(fi, rowIdx) {
  const row = rosters[fi][rowIdx];
  rosters[fi].splice(rowIdx, 1);

  if (row._id) {
    const { error } = await deleteUnit(row._id);
    if (error) console.error('Delete error:', error);
  }
  saveLocally();
}

// ── localStorage fallback (for offline) ──
const LOCAL_KEY = 'wh40k-tracker-offline-v2';

function saveLocally() {
  try {
    const data = {};
    FACTIONS.forEach((f, fi) => { data[f.id] = rosters[fi]; });
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  } catch(e) {}
}

function loadLocally() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return false;
    const saved = JSON.parse(raw);
    if (saved && typeof saved === 'object') {
      rosters = FACTIONS.map(f => {
        const savedFaction = saved[f.id];
        if (savedFaction && Array.isArray(savedFaction)) return savedFaction;
        return f.roster.map(r => ({...r}));
      });
      return true;
    }
  } catch(e) {}
  return false;
}

// ── Collapsed category state ──
const COLL_KEY = 'wh40k-tracker-collapsed-v1';

function loadCollapsedState() {
  try {
    const raw = localStorage.getItem(COLL_KEY);
    if (raw) collapsedCats = new Set(JSON.parse(raw));
  } catch(e) {}
}

function saveCollapsedState() {
  try { localStorage.setItem(COLL_KEY, JSON.stringify([...collapsedCats])); } catch(e) {}
}
