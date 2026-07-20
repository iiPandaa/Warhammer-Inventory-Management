// ═══════════════════════════════════════════════════
// SUPABASE CLIENT
// ═══════════════════════════════════════════════════
const SUPABASE_URL = 'https://hvukiwyggawhyvpqmnrm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2dWtpd3lnZ2F3aHl2cHFtbnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NzM4ODksImV4cCI6MjEwMDE0OTg4OX0.UGVDsfHEI5F4xRZ5jkPsi8uZYch__0uXya45FCfx5qo';

// Load Supabase from CDN (set in index.html)
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ═══════════════════════════════════════════════════
// AUTH HELPERS
// ═══════════════════════════════════════════════════
async function signUp(email, password, displayName) {
  const { data, error } = await db.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName } }
  });
  return { data, error };
}

async function signIn(email, password) {
  const { data, error } = await db.auth.signInWithPassword({ email, password });
  return { data, error };
}

async function signOut() {
  const { error } = await db.auth.signOut();
  return { error };
}

async function getSession() {
  const { data: { session } } = await db.auth.getSession();
  return session;
}

function onAuthChange(callback) {
  return db.auth.onAuthStateChange((_event, session) => callback(session));
}

// ═══════════════════════════════════════════════════
// ROSTER DATA HELPERS
// ═══════════════════════════════════════════════════

// Load all roster rows for the current user
async function loadRosterFromCloud() {
  const { data, error } = await db
    .from('roster_units')
    .select('*')
    .order('faction_id, sort_order');
  if (error) { console.error('loadRoster error:', error); return null; }
  return data;
}

// Save a single unit row (upsert by id)
async function saveUnit(unit) {
  const session = await getSession();
  if (!session) return { error: 'Not logged in' };
  const { data, error } = await db
    .from('roster_units')
    .upsert({ ...unit, user_id: session.user.id }, { onConflict: 'id' })
    .select();
  return { data, error };
}

// Delete a unit by id
async function deleteUnit(id) {
  const { error } = await db
    .from('roster_units')
    .delete()
    .eq('id', id);
  return { error };
}

// Bulk upsert all units for a faction (used on first login to seed defaults)
async function seedFactionRoster(factionId, units) {
  const session = await getSession();
  if (!session) return { error: 'Not logged in' };
  const rows = units.map((u, i) => ({
    user_id:     session.user.id,
    faction_id:  factionId,
    unit:        u.unit,
    cat:         u.cat,
    qty:         u.qty ?? 0,
    bought:      u.bought ?? 'N',
    model_built: u.modelBuilt ?? 0,
    units_built: u.unitsBuilt ?? 0,
    units_owned: u.unitsOwned ?? 1,
    painted:     u.painted ?? 0,
    stored_pts:  u.storedPts ?? null,
    note:        u.note ?? null,
    sort_order:  i,
  }));
  const { error } = await db.from('roster_units').insert(rows);
  return { error };
}

// Check if user has any roster data yet
async function hasExistingRoster() {
  const { count, error } = await db
    .from('roster_units')
    .select('id', { count: 'exact', head: true });
  if (error) return false;
  return count > 0;
}

// ═══════════════════════════════════════════════════
// SAVED LISTS HELPERS
// ═══════════════════════════════════════════════════
async function getSavedLists() {
  const { data, error } = await db
    .from('saved_lists')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
}

async function saveList(name, rawText, faction) {
  const session = await getSession();
  if (!session) return { error: 'Not logged in' };
  const { data, error } = await db
    .from('saved_lists')
    .insert({ user_id: session.user.id, name, raw_text: rawText, faction })
    .select();
  return { data, error };
}

async function deleteList(id) {
  const { error } = await db.from('saved_lists').delete().eq('id', id);
  return { error };
}
