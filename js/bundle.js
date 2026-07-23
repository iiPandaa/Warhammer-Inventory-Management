
// ════════════════════════════════════════════════════
// SUPABASE CONFIG
// ════════════════════════════════════════════════════
const SUPABASE_URL     = 'https://hvukiwyggawhyvpqmnrm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2dWtpd3lnZ2F3aHl2cHFtbnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NzM4ODksImV4cCI6MjEwMDE0OTg4OX0.UGVDsfHEI5F4xRZ5jkPsi8uZYch__0uXya45FCfx5qo';
let db; // initialised in DOMContentLoaded

async function getSession() {
  if (!db) return null;
  const { data: { session } } = await db.auth.getSession();
  return session;
}
async function signUp(email, password, displayName) {
  return db.auth.signUp({ email, password, options: { data: { display_name: displayName } } });
}
async function signIn(email, password) {
  return db.auth.signInWithPassword({ email, password });
}
async function signOut() {
  return db.auth.signOut();
}

// ── Cloud roster helpers ──
async function loadRosterFromCloud() {
  if (!db) return null;
  const { data, error } = await db.from('roster_units').select('*').order('faction_id, sort_order');
  if (error) { console.error('loadRoster:', error); return null; }
  return data;
}
async function hasExistingRoster() {
  if (!db) return false;
  const { count, error } = await db.from('roster_units').select('id', { count: 'exact', head: true });
  return !error && count > 0;
}
async function upsertUnit(unitRow) {
  if (!db) return;
  const session = await getSession();
  if (!session) return;
  const { error } = await db.from('roster_units').upsert({ ...unitRow, user_id: session.user.id }, { onConflict: 'id' });
  if (error) console.error('upsertUnit:', error);
}
async function deleteUnitFromCloud(id) {
  if (!db || !id) return;
  await db.from('roster_units').delete().eq('id', id);
}
async function seedFactionToCloud(factionId, units, userId) {
  if (!db) return;
  const rows = units.map((u, i) => ({
    user_id: userId, faction_id: factionId,
    unit: u.unit, cat: u.cat,
    qty: u.qty ?? 0, bought: u.bought ?? 'N',
    model_built: u.modelBuilt ?? 0, units_built: u.unitsBuilt ?? 0,
    units_owned: u.unitsOwned ?? 1, painted: u.painted ?? 0,
    stored_pts: u.storedPts ?? null, note: u.note ?? null, sort_order: i,
  }));
  const { error } = await db.from('roster_units').insert(rows);
  if (error) console.error('seed:', error);
}
function dbRowToRoster(row) {
  return {
    _id: row.id, unit: row.unit, cat: row.cat,
    qty: row.qty, bought: row.bought,
    modelBuilt: row.model_built, unitsBuilt: row.units_built,
    unitsOwned: row.units_owned, painted: row.painted,
    storedPts: row.stored_pts, note: row.note,
  };
}


// ═══════════════════════════════════════════════════════════════════
// FACTION DEFINITIONS
// yaml: BSData slug  |  extraYaml: additional slugs for cross-faction units
// color: sidebar dot color
// ═══════════════════════════════════════════════════════════════════
const FACTION_CATALOGUE = [
  {
    id: 'csm', label: 'Chaos Space Marines', color: '#c04a4a',
    yaml: ['chaos-space-marines', 'thousand-sons', 'death-guard', 'emperors-children'],
    roster: [
      // Characters
      { unit:"Dark Apostle",            cat:"Character",           qty:1,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:65,  unitsOwned:1 },
      { unit:"Vashtorr the Arkifane",   cat:"Character",           qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:175, unitsOwned:1 },
      { unit:"Lord Discordant",         cat:"Character",           qty:1,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:160, unitsOwned:1 },
      { unit:"Warpsmith",               cat:"Character",           qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:70,  unitsOwned:1 },
      { unit:"Haarken Worldclaimer",    cat:"Character",           qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:90,  unitsOwned:1 },
      { unit:"Huron Blackheart",        cat:"Character",           qty:1,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:120, unitsOwned:1 },
      { unit:"Cypher",                  cat:"Character",           qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:90,  unitsOwned:1 },
      // Battleline
      { unit:"Legionaries",             cat:"Battleline",          qty:40, bought:"Y", modelBuilt:20, unitsBuilt:2, painted:0, storedPts:90,  unitsOwned:3 },
      { unit:"Legionaries",             cat:"Battleline",          qty:10, bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:90,  unitsOwned:1, note:"Shield loadout" },
      { unit:"Traitor Guardsmen Squad", cat:"Battleline",          qty:10, bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:70,  unitsOwned:1 },
      // Infantry
      { unit:"Havocs",                  cat:"Infantry",            qty:10, bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:125, unitsOwned:1 },
      { unit:"Chaos Terminator Squad",  cat:"Infantry",            qty:15, bought:"Y", modelBuilt:5,  unitsBuilt:1, painted:0, storedPts:180, unitsOwned:3 },
      { unit:"Rubric Marines",          cat:"Infantry",            qty:9,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:100, unitsOwned:1 },
      { unit:"Noise Marines",           cat:"Infantry",            qty:12, bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:145, unitsOwned:2 },
      { unit:"Chosen",                  cat:"Infantry",            qty:10, bought:"Y", modelBuilt:10, unitsBuilt:1, painted:0, storedPts:125, unitsOwned:1 },
      { unit:"Possessed",               cat:"Infantry",            qty:5,  bought:"Y", modelBuilt:5,  unitsBuilt:1, painted:0, storedPts:null,unitsOwned:1 },
      { unit:"Obliterators",            cat:"Infantry",            qty:6,  bought:"Y", modelBuilt:4,  unitsBuilt:2, painted:0, storedPts:160, unitsOwned:3 },
      { unit:"Raptors",                 cat:"Infantry",            qty:5,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:110, unitsOwned:1 },
      { unit:"Warp Talons",             cat:"Infantry",            qty:6,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:125, unitsOwned:1 },
      { unit:"Plague Marines",          cat:"Infantry",            qty:7,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:130, unitsOwned:1 },
      { unit:"Nemesis Claw",            cat:"Infantry",            qty:10, bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:190, unitsOwned:1 },
      { unit:"Masters of the Maelstrom",cat:"Infantry",            qty:5,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:115, unitsOwned:1 },
      { unit:"Red Corsairs Raiders",    cat:"Infantry",            qty:10, bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:220, unitsOwned:1 },
      // Monster
      { unit:"Venomcrawler",            cat:"Monster",             qty:2,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:110, unitsOwned:2 },
      { unit:"Helbrute",                cat:"Monster",             qty:2,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:130, unitsOwned:1 },
      // Vehicle
      { unit:"Chaos Land Raider",       cat:"Vehicle",             qty:1,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:220, unitsOwned:1 },
      { unit:"Chaos Predator",          cat:"Vehicle",             qty:1,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:140, unitsOwned:1 },
      { unit:"Chaos Vindicator",        cat:"Vehicle",             qty:2,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:185, unitsOwned:2 },
      // Transport
      { unit:"Chaos Rhino",             cat:"Dedicated Transport",  qty:2,  bought:"Y", modelBuilt:0,  unitsBuilt:1, painted:0, storedPts:75,  unitsOwned:2 },
    ]
  },
  {
    id: 'tau', label: "T'au Empire", color: '#4a90d0',
    yaml: ['tau-empire'],
    roster: [
      { unit:"Broadside Battlesuit",              cat:"Infantry",  qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:90,  unitsOwned:1 },
      { unit:"Stealth Battlesuits",               cat:"Infantry",  qty:3,  bought:"Y", modelBuilt:3,  unitsBuilt:1, painted:0, storedPts:60,  unitsOwned:1 },
      { unit:"Commander in Coldstar Battlesuit",  cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:95,  unitsOwned:1 },
      { unit:"Strike Team",                       cat:"Battleline",qty:10, bought:"Y", modelBuilt:10, unitsBuilt:1, painted:0, storedPts:75,  unitsOwned:1 },
      { unit:"Pathfinder Team",                   cat:"Infantry",  qty:10, bought:"Y", modelBuilt:10, unitsBuilt:1, painted:0, storedPts:90,  unitsOwned:1 },
      { unit:"Devilfish",                         cat:"Dedicated Transport", qty:1, bought:"Y", modelBuilt:1, unitsBuilt:1, painted:0, storedPts:85, unitsOwned:1 },
    ]
  },
  {
    id: 'votann', label: 'Leagues of Votann', color: '#b0a040',
    yaml: ['leagues-of-votann'],
    roster: [
      { unit:"Uthar The Destined",      cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:95,  unitsOwned:1 },
      { unit:"Cthonian Berserkers",     cat:"Infantry",  qty:5,  bought:"Y", modelBuilt:5,  unitsBuilt:1, painted:0, storedPts:100, unitsOwned:1 },
      { unit:"Hernkyn Pioneers",        cat:"Mounted",   qty:6,  bought:"Y", modelBuilt:6,  unitsBuilt:2, painted:3, storedPts:80,  unitsOwned:2 },
      { unit:"Hearthkyn Warriors",      cat:"Battleline",qty:10, bought:"Y", modelBuilt:10, unitsBuilt:1, painted:0, storedPts:100, unitsOwned:1 },
      { unit:"Brôkhyr Thunderkyn",      cat:"Infantry",  qty:6,  bought:"Y", modelBuilt:6,  unitsBuilt:2, painted:3, storedPts:80,  unitsOwned:2 },
      { unit:"Einhyr Hearthguard",      cat:"Infantry",  qty:15, bought:"Y", modelBuilt:10, unitsBuilt:3, painted:0, storedPts:135, unitsOwned:3 },
      { unit:"Hekaton Land Fortress",   cat:"Vehicle",   qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:240, unitsOwned:1 },
      { unit:"Einhyr Champion",         cat:"Character", qty:3,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:70,  unitsOwned:3 },
      { unit:"Kahl",                    cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:70,  unitsOwned:1 },
      { unit:"Yaegirs",                 cat:"Infantry",  qty:10, bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:90,  unitsOwned:1 },
      { unit:"Buri Aegnirsson",         cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:110, unitsOwned:1 },
      { unit:"Sagitaur",                cat:"Vehicle",   qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:95,  unitsOwned:1 },
      { unit:"Arkaynst Evaluator",      cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:75,  unitsOwned:1 },
      { unit:"Memnyr Strategist",       cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:45,  unitsOwned:1 },
      { unit:"Ironkin Steeljacks",      cat:"Infantry",  qty:6,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:90,  unitsOwned:2 },
      { unit:"Cthonian Earthshakers",   cat:"Infantry",  qty:2,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:110, unitsOwned:1 },
    ]
  },
  {
    id: 'worldeaters', label: 'World Eaters', color: '#c03030',
    yaml: ['world-eaters'],
    roster: [
      { unit:"Lord Invocatus",          cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:110, unitsOwned:1 },
      { unit:"Jakhals",                 cat:"Battleline",qty:10, bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:65,  unitsOwned:1 },
      { unit:"Khorne Berzerkers",       cat:"Infantry",  qty:40, bought:"Y", modelBuilt:30, unitsBuilt:4, painted:0, storedPts:180, unitsOwned:4 },
      { unit:"Master of Executions",    cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:110, unitsOwned:3 },
      { unit:"Daemon Prince",           cat:"Monster",   qty:2,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:180, unitsOwned:2 },
      { unit:"Angron",                  cat:"Monster",   qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:360, unitsOwned:1 },
      { unit:"Kharn The Betrayer",      cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:100, unitsOwned:1 },
      { unit:"Exalted Eightbound",      cat:"Infantry",  qty:3,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:140, unitsOwned:1 },
      { unit:"Forgefiend",              cat:"Monster",   qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:170, unitsOwned:1 },
      { unit:"Khorne Lord of Skulls",   cat:"Vehicle",   qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:505, unitsOwned:1 },
      { unit:"Slaughterbound",          cat:"Monster",   qty:1,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:85,  unitsOwned:1 },
      { unit:"Red Butchers",            cat:"Infantry",  qty:5,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:175, unitsOwned:1 },
      { unit:"Goremongers",             cat:"Infantry",  qty:10, bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:75,  unitsOwned:1 },
    ]
  },
  {
    id: 'custodes', label: 'Adeptus Custodes', color: '#c89a50',
    yaml: ['adeptus-custodes'],
    roster: [
      { unit:"Blade Champion",                      cat:"Character", qty:2, bought:"Y", modelBuilt:2, unitsBuilt:1, painted:0, storedPts:120, unitsOwned:1 },
      { unit:"Shield-Captain",                      cat:"Character", qty:1, bought:"Y", modelBuilt:1, unitsBuilt:1, painted:0, storedPts:130, unitsOwned:1 },
      { unit:"Shield-Captain in Allarus Terminator Armour", cat:"Character", qty:1, bought:"Y", modelBuilt:1, unitsBuilt:1, painted:0, storedPts:130, unitsOwned:1 },
      { unit:"Allarus Custodians",                  cat:"Infantry",  qty:5, bought:"Y", modelBuilt:2, unitsBuilt:1, painted:0, storedPts:325, unitsOwned:1 },
      { unit:"Custodian Wardens",                   cat:"Battleline",qty:5, bought:"Y", modelBuilt:5, unitsBuilt:1, painted:0, storedPts:260, unitsOwned:1 },
      { unit:"Venatari Custodians",                 cat:"Infantry",  qty:6, bought:"Y", modelBuilt:0, unitsBuilt:0, painted:0, storedPts:450, unitsOwned:1 },
      { unit:"Trajann Valoris",                     cat:"Character", qty:1, bought:"Y", modelBuilt:1, unitsBuilt:1, painted:0, storedPts:140, unitsOwned:1 },
    ]
  },
  {
    id: 'chaosknights', label: 'Chaos Knights', color: '#8a3a8a',
    yaml: ['chaos-knights'],
    roster: [
      { unit:"War Dog",                    cat:"Vehicle", qty:4, bought:"Y", modelBuilt:4, unitsBuilt:4, painted:0, storedPts:140, unitsOwned:4 },
      { unit:"Knight Abominant",           cat:"Vehicle", qty:1, bought:"Y", modelBuilt:1, unitsBuilt:1, painted:0, storedPts:355, unitsOwned:1 },
      { unit:"Knight Despoiler",           cat:"Vehicle", qty:1, bought:"Y", modelBuilt:1, unitsBuilt:1, painted:0, storedPts:390, unitsOwned:1 },
      { unit:"Knight Ruinator",            cat:"Vehicle", qty:1, bought:"Y", modelBuilt:0, unitsBuilt:0, painted:0, storedPts:355, unitsOwned:1 },
      { unit:"Chaos Knight Cerastus Lancer",cat:"Vehicle",qty:1, bought:"Y", modelBuilt:0, unitsBuilt:0, painted:0, storedPts:385, unitsOwned:1 },
    ]
  },
  {
    id: 'imperialknights', label: 'Imperial Knights', color: '#5a80c0',
    yaml: ['imperial-knights'],
    roster: [
      { unit:"Armiger Warglaive",  cat:"Vehicle", qty:4, bought:"Y", modelBuilt:0, unitsBuilt:0, painted:0, storedPts:140, unitsOwned:4 },
      { unit:"Knight Paladin",     cat:"Vehicle", qty:1, bought:"Y", modelBuilt:0, unitsBuilt:0, painted:0, storedPts:375, unitsOwned:1 },
      { unit:"Knight Gallant",     cat:"Vehicle", qty:1, bought:"Y", modelBuilt:1, unitsBuilt:1, painted:0, storedPts:365, unitsOwned:1 },
    ]
  },
  {
    id: 'drukhari', label: 'Drukhari', color: '#7a40a0',
    yaml: ['drukhari'],
    roster: [
      { unit:"Wracks", cat:"Infantry", qty:5, bought:"Y", modelBuilt:0, unitsBuilt:0, painted:0, storedPts:55, unitsOwned:1 },
    ]
  },
  {
    id: 'spacewolves', label: 'Space Wolves', color: '#6080b0',
    yaml: ['space-wolves'],
    roster: [
      { unit:"Wolf Guard Terminators",         cat:"Infantry",  qty:10, bought:"Y", modelBuilt:5,  unitsBuilt:2, painted:5, storedPts:170, unitsOwned:2 },
      { unit:"Primaris Lieutenant",            cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:1, storedPts:70,  unitsOwned:1 },
      { unit:"Wolf Priest",                    cat:"Character", qty:1,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:70,  unitsOwned:1 },
      { unit:"Wolf Guard Battle Leader",       cat:"Character", qty:1,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:65,  unitsOwned:1 },
      { unit:"Blood Claws",                    cat:"Battleline",qty:10, bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:135, unitsOwned:1 },
      { unit:"Grey Hunters",                   cat:"Battleline",qty:20, bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:165, unitsOwned:2 },
      { unit:"Arjac Rockfist",                 cat:"Character", qty:1,  bought:"N", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:105, unitsOwned:1 },
      { unit:"Logan Grimnar",                  cat:"Character", qty:1,  bought:"N", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:110, unitsOwned:1 },
      { unit:"Bjorn the Fell-Handed",          cat:"Monster",   qty:1,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:160, unitsOwned:1 },
      { unit:"Eliminators",                    cat:"Infantry",  qty:3,  bought:"Y", modelBuilt:3,  unitsBuilt:1, painted:0, storedPts:85,  unitsOwned:1 },
      { unit:"Repulsor",                       cat:"Vehicle",   qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:1, storedPts:180, unitsOwned:1 },
      { unit:"Repulsor Executioner",           cat:"Vehicle",   qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:1, storedPts:220, unitsOwned:1 },
      { unit:"Land Raider Redeemer",           cat:"Vehicle",   qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:270, unitsOwned:1 },
      { unit:"Eradicators",                    cat:"Infantry",  qty:3,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:90,  unitsOwned:1 },
      { unit:"Bladeguard Veterans",            cat:"Infantry",  qty:6,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:80,  unitsOwned:2 },
      { unit:"Bladeguard Ancient",             cat:"Character", qty:1,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:45,  unitsOwned:1 },
      { unit:"Infernus Marines",               cat:"Infantry",  qty:5,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:null,unitsOwned:1 },
      { unit:"Chaplain",                       cat:"Character", qty:1,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:60,  unitsOwned:1 },
      { unit:"Iron Priest",                    cat:"Character", qty:1,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:55,  unitsOwned:1 },
      { unit:"Librarian in Phobos Armour",     cat:"Character", qty:1,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:70,  unitsOwned:1 },
      { unit:"Librarian in Terminator Armour", cat:"Character", qty:1,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:75,  unitsOwned:1 },
      { unit:"Terminators",                    cat:"Infantry",  qty:5,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:170, unitsOwned:1 },
      { unit:"Chaplain on Bike",               cat:"Character", qty:1,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:75,  unitsOwned:1 },
      { unit:"Brutalis Dreadnought",           cat:"Monster",   qty:1,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:160, unitsOwned:1 },
      { unit:"Ragnar Blackmane",               cat:"Character", qty:1,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:100, unitsOwned:1 },
      { unit:"Ballistus Dreadnought",          cat:"Monster",   qty:1,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:150, unitsOwned:1 },
      { unit:"Wolf Guard Headtakers",          cat:"Infantry",  qty:6,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:85,  unitsOwned:1 },
    ]
  },
  {
    id: 'salamanders', label: 'Salamanders', color: '#2a6a2a',
    yaml: ['space-marines'],
    roster: [
      { unit:"Intercessor Squad",          cat:"Battleline",qty:10, bought:"Y", modelBuilt:10, unitsBuilt:2, painted:5, storedPts:null,unitsOwned:2 },
      { unit:"Vulkan He'stan",             cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:null,unitsOwned:1 },
      { unit:"Adrax Agatone",              cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:1, storedPts:null,unitsOwned:1 },
      { unit:"Eradicators",                cat:"Infantry",  qty:3,  bought:"Y", modelBuilt:3,  unitsBuilt:1, painted:0, storedPts:90,  unitsOwned:1 },
      { unit:"Invictor Tactical Warsuit",  cat:"Monster",   qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:null,unitsOwned:1 },
      { unit:"Captain in Gravis Armour",   cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:1, storedPts:null,unitsOwned:1 },
      { unit:"Apothecary",                 cat:"Character", qty:1,  bought:"N", modelBuilt:1,  unitsBuilt:1, painted:1, storedPts:null,unitsOwned:1 },
      { unit:"Redemptor Dreadnought",      cat:"Monster",   qty:1,  bought:"N", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:null,unitsOwned:1 },
    ]
  },
  {
    id: 'astramil', label: 'Astra Militarum', color: '#7a7a40',
    yaml: ['astra-militarum'],
    roster: [
      { unit:"Cadian Command Squad",  cat:"Character", qty:5,  bought:"Y", modelBuilt:0, unitsBuilt:0, painted:0, storedPts:60,  unitsOwned:1 },
      { unit:"Cadian Shock Troops",   cat:"Battleline",qty:20, bought:"Y", modelBuilt:0, unitsBuilt:0, painted:0, storedPts:65,  unitsOwned:2 },
      { unit:"Armoured Sentinel",     cat:"Vehicle",   qty:1,  bought:"Y", modelBuilt:0, unitsBuilt:0, painted:0, storedPts:65,  unitsOwned:1 },
      { unit:"Ordnance Teams",        cat:"Infantry",  qty:4,  bought:"Y", modelBuilt:0, unitsBuilt:0, painted:0, storedPts:110, unitsOwned:2 },
      { unit:"Heavy Weapons Squad",   cat:"Infantry",  qty:3,  bought:"Y", modelBuilt:0, unitsBuilt:0, painted:0, storedPts:65,  unitsOwned:1 },
    ]
  },
  {
    id: 'sisters', label: 'Adepta Sororitas', color: '#c04080',
    yaml: ['adepta-sororitas'],
    roster: [
      { unit:"Morvenn Vahl", cat:"Character", qty:1, bought:"Y", modelBuilt:0, unitsBuilt:0, painted:0, storedPts:185, unitsOwned:1 },
    ]
  },
  {
    id: 'necrons', label: 'Necrons', color: '#40c080',
    yaml: ['necrons'],
    roster: [
      { unit:"Canoptek Reanimator",             cat:"Monster",   qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:75,  unitsOwned:1 },
      { unit:"Chronomancer",                    cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:65,  unitsOwned:1 },
      { unit:"C'tan Shard of the Void Dragon",  cat:"Monster",   qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:310, unitsOwned:1 },
      { unit:"Imotekh the Stormlord",           cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:100, unitsOwned:1 },
      { unit:"Plasmancer",                      cat:"Character", qty:2,  bought:"Y", modelBuilt:2,  unitsBuilt:2, painted:0, storedPts:55,  unitsOwned:2 },
      { unit:"Royal Warden",                    cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:50,  unitsOwned:1 },
      { unit:"Skorpekh Lord",                   cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:90,  unitsOwned:1 },
      { unit:"Technomancer",                    cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:80,  unitsOwned:1 },
      { unit:"Immortals",                       cat:"Battleline",qty:20, bought:"Y", modelBuilt:20, unitsBuilt:4, painted:0, storedPts:70,  unitsOwned:4 },
      { unit:"Necron Warriors",                 cat:"Battleline",qty:40, bought:"Y", modelBuilt:40, unitsBuilt:4, painted:0, storedPts:90,  unitsOwned:4 },
      { unit:"Canoptek Scarab Swarms",          cat:"Infantry",  qty:15, bought:"Y", modelBuilt:15, unitsBuilt:5, painted:0, storedPts:40,  unitsOwned:5 },
      { unit:"Deathmarks",                      cat:"Infantry",  qty:5,  bought:"Y", modelBuilt:5,  unitsBuilt:1, painted:0, storedPts:60,  unitsOwned:1 },
      { unit:"Skorpekh Destroyers",             cat:"Infantry",  qty:6,  bought:"Y", modelBuilt:3,  unitsBuilt:2, painted:0, storedPts:90,  unitsOwned:2 },
      { unit:"Lokhust Heavy Destroyer",         cat:"Infantry",  qty:5,  bought:"Y", modelBuilt:1,  unitsBuilt:4, painted:0, storedPts:40,  unitsOwned:4 },
      { unit:"C'tan Shard of the Nightbringer", cat:"Monster",   qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:315, unitsOwned:1 },
      { unit:"Anrakyr the Traveller",           cat:"Character", qty:1,  bought:"Y", modelBuilt:1,  unitsBuilt:1, painted:0, storedPts:165, unitsOwned:1 },
      { unit:"Hexmark Destroyer",               cat:"Character", qty:2,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:75,  unitsOwned:2 },
      { unit:"Ophydian Destroyers",             cat:"Infantry",  qty:3,  bought:"Y", modelBuilt:0,  unitsBuilt:0, painted:0, storedPts:80,  unitsOwned:1 },
    ]
  },
];

let userFactions = []; // user's active armies — populated after login

const CAT_ORDER = ['Character','Battleline','Infantry','Monster','Mounted','Vehicle','Dedicated Transport'];
const CAT_META  = {
  'Character':          {key:'character', dot:'dot-character'},
  'Battleline':         {key:'battleline',dot:'dot-battleline'},
  'Infantry':           {key:'infantry',  dot:'dot-infantry'},
  'Monster':            {key:'monster',   dot:'dot-monster'},
  'Mounted':            {key:'mounted',   dot:'dot-mounted'},
  'Vehicle':            {key:'vehicle',   dot:'dot-vehicle'},
  'Dedicated Transport':{key:'transport', dot:'dot-transport'},
};

const BASE_URL    = 'https://raw.githubusercontent.com/BSData/wh40k-11e-mfm/main/data/';
const STORAGE_KEY_BASE = 'w40k-tracker-rosters-v2';
let STORAGE_KEY = STORAGE_KEY_BASE; // updated to user-scoped after login
const COLL_KEY    = 'w40k-tracker-collapsed-v1';

// ═══════════════ STATE ═══════════════
let mfmCache    = {};   // slug -> { unitName -> pts }
let rosters       = [];  // populated after auth in bootApp
let collapsedCats = new Set();
let activeFactionId = null;
let mfmVersion  = '';

function loadRosters() {
  // Try localStorage for offline/fast load
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      if (saved && typeof saved === 'object') {
        const result = userFactions.map(f => {
          const sf = saved[f.id];
          return sf && Array.isArray(sf) && sf.length > 0 ? sf.map(r=>({...r})) : f.roster.map(r=>({...r}));
        });
        return result;
      }
    }
  } catch(e) {}
  return userFactions.map(f => f.roster.map(r => ({...r})));
}

async function initRosters() {
  // Try cloud first
  try {
    const hasCloud = await hasExistingRoster();
    if (hasCloud) {
      const rows = await loadRosterFromCloud();
      if (rows && rows.length > 0) {
        // Build userFactions from the distinct faction_ids in the DB
        const factionIds = [...new Set(rows.map(r => r.faction_id))];
        userFactions = factionIds
          .map(id => FACTION_CATALOGUE.find(f => f.id === id))
          .filter(Boolean);

        // Also check localStorage for any custom factions not in catalogue
        try {
          const customKey = 'wh40k-custom-factions-' + STORAGE_KEY.split('-').pop();
          const customRaw = localStorage.getItem(customKey);
          if (customRaw) {
            const customs = JSON.parse(customRaw);
            customs.forEach(cf => {
              if (!userFactions.find(f => f.id === cf.id)) {
                userFactions.push(cf);
              }
            });
          }
        } catch(e) {}

        // Build rosters indexed by userFactions
        rosters = userFactions.map(f => {
          const fr = rows.filter(r => r.faction_id === f.id)
                        .sort((a,b) => a.sort_order - b.sort_order);
          return fr.map(dbRowToRoster);
        });
        saveRosters();
        return;
      }
    }
    // No cloud data — brand new user, start completely empty
    userFactions = [];
    rosters = [];
    console.log('New user — no armies yet');
  } catch(e) {
    console.warn('Cloud load failed, using local:', e);
    // Fall back to localStorage
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved && saved.factions) {
          userFactions = saved.factions
            .map(id => FACTION_CATALOGUE.find(f => f.id === id) || saved.customFactions?.find(f => f.id === id))
            .filter(Boolean);
          rosters = userFactions.map(f => saved.rosters?.[f.id] || []);
          return;
        }
      }
    } catch(e2) {}
    userFactions = [];
    rosters = [];
  }
}

function saveRosters() {
  try {
    const data = {
      factions: userFactions.map(f => f.id),
      rosters: {},
      customFactions: userFactions.filter(f => !FACTION_CATALOGUE.find(c => c.id === f.id)),
    };
    userFactions.forEach((f, fi) => { data.rosters[f.id] = rosters[fi] || []; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch(e) {}
  flashSaved();
}

function loadCollapsed() {
  try {
    const raw = localStorage.getItem(COLL_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch(e) {}
  return new Set();
}

function saveCollapsed() {
  try { localStorage.setItem(COLL_KEY, JSON.stringify([...collapsedCats])); } catch(e) {}
}

function flashSaved() {
  const el = document.getElementById('save-indicator');
  el.textContent = '✓ Saved'; el.classList.add('saved');
  setTimeout(() => { el.textContent = 'Auto-save on'; el.classList.remove('saved'); }, 1800);
}

// ═══════════════ YAML PARSER ═══════════════
function parseYaml(text) {
  const result = {};
  const lines = text.replace(/\r\n/g,'\n').replace(/\r/g,'\n').split('\n');
  const verMatch = text.match(/version:\s*["']?([^"'\n]+)/);
  if (verMatch && !mfmVersion) mfmVersion = verMatch[1].trim().replace(/"/g,'');
  let inUnits = false, currentUnit = null, gotPoints = false;
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line === 'units:') { inUnits = true; currentUnit = null; gotPoints = false; continue; }
    if (!inUnits) continue;
    if (line.length > 0 && line[0] !== ' ' && line !== 'units:') { inUnits = false; continue; }
    if (line.startsWith('  - name:')) {
      currentUnit = line.substring(10).trim().replace(/^["']|["']$/g,'');
      gotPoints = false; continue;
    }
    if (currentUnit && !gotPoints && line.includes('points:')) {
      const m = line.match(/points:\s*(\d+)/);
      if (m) { result[currentUnit] = parseInt(m[1],10); gotPoints = true; }
    }
  }
  return result;
}

function lookupMfm(factionIdx, unitName) {
  const slugs = userFactions[factionIdx].yaml;
  for (const slug of slugs) {
    const cache = mfmCache[slug] || {};
    if (cache[unitName] !== undefined) return cache[unitName];
    const lower = unitName.toLowerCase();
    for (const key of Object.keys(cache)) {
      if (key.toLowerCase() === lower) return cache[key];
    }
    for (const key of Object.keys(cache)) {
      if (key.toLowerCase().includes(lower) || lower.includes(key.toLowerCase())) return cache[key];
    }
  }
  return null;
}

// ═══════════════ FETCH ═══════════════
async function fetchYaml(slug) {
  if (mfmCache[slug]) return;
  try {
    const r = await fetch(BASE_URL + slug + '.yaml', {cache:'no-cache'});
    if (r.ok) { mfmCache[slug] = parseYaml(await r.text()); }
    else { mfmCache[slug] = {}; }
  } catch(e) { mfmCache[slug] = {}; }
}

async function fetchAllMfmData() {
  setStatus('loading','Fetching MFM data…');
  const allSlugs = [...new Set(FACTION_CATALOGUE.flatMap(f => f.yaml))];
  let done = 0;
  await Promise.all(allSlugs.map(async slug => {
    await fetchYaml(slug);
    done++;
    setLoaderFill(Math.round((done / allSlugs.length) * 90));
    setLoaderSub(`Loaded ${done}/${allSlugs.length} faction files…`);
  }));
  const totalUnits = Object.values(mfmCache).reduce((a,c) => a + Object.keys(c).length, 0);
  setStatus('ok', `Live — ${totalUnits} units across ${allSlugs.length} factions`);
  document.getElementById('last-updated').textContent = 'Updated ' + new Date().toLocaleTimeString();
  if (mfmVersion) document.getElementById('footer-version').textContent = 'MFM ' + mfmVersion;
  setLoaderFill(100);
  setTimeout(() => {
    document.getElementById('loading-overlay').classList.add('hidden');
    buildSidebar();
    showDashboard();
  }, 250);
}

function setStatus(t,m){ document.getElementById('status-dot').className='status-dot '+t; document.getElementById('status-text').textContent=m; }
function setLoaderFill(p){ document.getElementById('loader-fill').style.width=p+'%'; }
function setLoaderSub(m){ document.getElementById('loader-sub').textContent=m; }

// ═══════════════ SIDEBAR ═══════════════
function factionTotals(fi) {
  const faction = userFactions[fi];
  let ptsOwned = 0, models = 0;
  rosters[fi].forEach(row => {
    const live = lookupMfm(fi, row.unit);
    const pts  = live !== null ? live : (row.storedPts || 0);
    ptsOwned += pts * (row.unitsOwned ?? 1);
    models   += row.qty || 0;
  });
  return {ptsOwned, models};
}

function buildSidebar() {
  const container = document.getElementById('sidebar-40k');
  container.innerHTML = '<div class="sidebar-section-label">Warhammer 40,000</div>';
  let grandPts = 0, grandModels = 0;
  userFactions.forEach((f, fi) => {
    const {ptsOwned, models} = factionTotals(fi);
    grandPts    += ptsOwned;
    grandModels += models;
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;align-items:center;position:relative;';
    const btn = document.createElement('button');
    btn.className = 'faction-btn' + (f.id === activeFactionId ? ' active' : '');
    btn.dataset.fid = f.id;
    btn.style.flex = '1';
    btn.innerHTML = `<span class="faction-dot" style="background:${f.color}"></span>${f.label}<span class="faction-pts">${ptsOwned.toLocaleString()}</span>`;
    btn.addEventListener('click', () => showFaction(f.id));
    const delBtn = document.createElement('button');
    delBtn.title = 'Remove army';
    delBtn.style.cssText = 'background:none;border:none;color:var(--text-faint);padding:4px 8px;cursor:pointer;font-size:12px;flex-shrink:0;';
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', e => { e.stopPropagation(); removeArmy(f.id); });
    delBtn.addEventListener('mouseenter', () => delBtn.style.color = 'var(--danger-lit)');
    delBtn.addEventListener('mouseleave', () => delBtn.style.color = 'var(--text-faint)');
    wrap.appendChild(btn);
    wrap.appendChild(delBtn);
    container.appendChild(wrap);
  });
  document.getElementById('grand-pts-owned').textContent  = grandPts.toLocaleString() + ' pts';
  document.getElementById('grand-models').textContent     = grandModels.toLocaleString() + ' models';

  // Add New Army button at bottom of faction list
  const addBtn = document.createElement('button');
  addBtn.className = 'faction-btn';
  addBtn.style.cssText = 'color:var(--text-faint);border-top:1px solid var(--border);margin-top:4px;font-style:italic;';
  addBtn.innerHTML = '<span style="font-size:14px">+</span> Add New Army';
  addBtn.addEventListener('click', openNewArmyModal);
  container.appendChild(addBtn);
}

// ═══════════════ RENDER FACTION ═══════════════
function renderFaction(fid) {
  const fi     = userFactions.findIndex(f => f.id === fid);
  const faction = userFactions[fi];
  const roster  = rosters[fi];

  document.getElementById('faction-title').textContent = faction.label;
  const slugList = faction.yaml.join(', ');
  document.getElementById('faction-meta').textContent = `Source: ${slugList}`;

  const searchVal      = (document.getElementById('search-box').value || '').toLowerCase();
  const filterChanged  = document.getElementById('filter-changed').checked;
  const filterMissing  = document.getElementById('filter-missing').checked;

  const tbody = document.getElementById('tracker-body');
  tbody.innerHTML = '';

  let totOwned=0, totBuilt=0, totPainted=0, totPtsOwned=0, totPtsBuilt=0, changed=0;

  // Group by category
  const groups = {};
  CAT_ORDER.forEach(c => { groups[c] = []; });
  roster.forEach((row,idx) => {
    const cat = row.cat || 'Infantry';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push({row,idx});
  });

  for (const cat of CAT_ORDER) {
    const entries = groups[cat];
    if (!entries || entries.length === 0) continue;

    const visible = entries.filter(({row}) => {
      const live = lookupMfm(fi, row.unit);
      const ptsChanged = live !== null && row.storedPts !== null && live !== row.storedPts;
      const ptsMissing = live === null;
      if (searchVal && !row.unit.toLowerCase().includes(searchVal)) return false;
      if (filterChanged && !ptsChanged) return false;
      if (filterMissing && !ptsMissing) return false;
      return true;
    });
    if ((filterChanged || filterMissing || searchVal) && visible.length === 0) continue;

    // Category subtotals
    let catPtsO=0, catPtsB=0, catMod=0;
    entries.forEach(({row}) => {
      const live = lookupMfm(fi, row.unit);
      const pts  = live !== null ? live : (row.storedPts || 0);
      catPtsO += pts * (row.unitsOwned ?? 1);
      catPtsB += pts * (row.unitsBuilt ?? 0);
      catMod  += row.qty || 0;
    });

    const meta = CAT_META[cat] || CAT_META['Infantry'];
    const colKey = faction.id + ':' + cat;
    const isCollapsed = collapsedCats.has(colKey);

    const catTr = document.createElement('tr');
    catTr.className = `cat-header cat-${meta.key}${isCollapsed?' collapsed':''}`;
    catTr.dataset.cat = colKey;
    catTr.innerHTML = `<td colspan="11"><span class="cat-chevron">▾</span>${cat}<span class="cat-sub">${catMod} models · ${catPtsO.toLocaleString()} pts owned · ${catPtsB.toLocaleString()} pts built</span></td>`;
    catTr.addEventListener('click', () => {
      if (collapsedCats.has(colKey)) collapsedCats.delete(colKey);
      else collapsedCats.add(colKey);
      saveCollapsed();
      renderFaction(fid);
    });
    tbody.appendChild(catTr);

    const rows = (searchVal || filterChanged || filterMissing) ? visible : entries;
    rows.forEach(({row, idx}) => {
      const live       = lookupMfm(fi, row.unit);
      const unitsOwned = row.unitsOwned ?? 1;
      const effPts     = live !== null ? live : row.storedPts;
      const ptsChanged = live !== null && row.storedPts !== null && live !== row.storedPts;
      const ptsMissing = live === null;

      if (ptsChanged) changed++;
      const totalO = effPts !== null ? effPts * unitsOwned : null;
      const totalB = effPts !== null ? effPts * (row.unitsBuilt ?? 0) : null;
      totOwned   += row.qty || 0;
      totBuilt   += row.modelBuilt || 0;
      totPainted += row.painted || 0;
      if (totalO !== null) totPtsOwned += totalO;
      if (totalB !== null) totPtsBuilt += totalB;

      const delta = ptsChanged ? live - row.storedPts : 0;
      const badge = ptsChanged ? `<span class="change-badge ${delta>0?'up':'down'}">${delta>0?'+':''}${delta}</span>` : '';
      const dot   = `<span class="cat-dot ${meta.dot}"></span>`;
      const note  = row.note ? ` <span style="color:var(--text-faint);font-size:10px">(${row.note})</span>` : '';

      const tr = document.createElement('tr');
      tr.className = 'data-row' + (ptsChanged?' row-changed':'') + (isCollapsed?' cat-hidden':'');
      tr.dataset.cat = colKey;

      tr.innerHTML = `
        <td class="unit-name">${dot}${row.unit}${note}</td>
        <td class="numeric editable" data-field="qty">${row.qty}</td>
        <td class="${row.bought==='Y'?'bought-y':'bought-n'}">${row.bought==='Y'?'✓':'—'}</td>
        <td class="numeric editable" data-field="modelBuilt">${row.modelBuilt}</td>
        <td class="numeric editable" data-field="unitsBuilt">${row.unitsBuilt}</td>
        <td class="numeric editable" data-field="painted">${row.painted}</td>
        ${live!==null ? `<td class="pts-live${ptsChanged?' pts-changed':''}">${live}${badge}</td>` : `<td class="pts-missing">Not in MFM</td>`}
        <td class="pts-stored">${row.storedPts!==null&&row.storedPts!==undefined ? row.storedPts : '<span style="color:var(--text-faint)">—</span>'}</td>
        ${totalB!==null&&totalB>0 ? `<td class="pts-total-built">${totalB.toLocaleString()}</td>` : `<td class="pts-total-built" style="color:var(--text-faint)">—</td>`}
        ${totalO!==null ? `<td class="pts-total">${totalO.toLocaleString()}</td>` : `<td class="pts-total" style="color:var(--text-faint)">—</td>`}
        <td class="numeric editable" data-field="unitsOwned">${unitsOwned}</td>
        <td><div class="row-actions"><button class="row-btn edit-btn" data-fi="${fi}" data-idx="${idx}" title="Edit">✎</button><button class="row-btn del-btn" data-fi="${fi}" data-idx="${idx}" title="Delete">✕</button></div></td>
      `;

      // Wire edit/delete buttons
      tr.querySelector('.edit-btn').addEventListener('click', e => {
        e.stopPropagation();
        openModal('edit', parseInt(e.currentTarget.dataset.fi), parseInt(e.currentTarget.dataset.idx));
      });
      tr.querySelector('.del-btn').addEventListener('click', e => {
        e.stopPropagation();
        modalFi  = parseInt(e.currentTarget.dataset.fi);
        modalIdx = parseInt(e.currentTarget.dataset.idx);
        deleteUnit();
      });

      tr.querySelectorAll('td[data-field]').forEach(td => {
        td.classList.add('editable');
        td.addEventListener('click', () => {
          if (td.querySelector('input')) return;
          const field = td.dataset.field;
          const cur   = rosters[fi][idx][field] ?? 0;
          const input = document.createElement('input');
          input.type='number'; input.min='0'; input.value=cur;
          td.textContent=''; td.appendChild(input);
          input.focus(); input.select();
          const commit = () => {
            rosters[fi][idx][field] = Math.max(0, parseInt(input.value,10)||0);
            saveRosters();
            buildSidebar();
            renderFaction(fid);
          };
          input.addEventListener('blur', commit);
          input.addEventListener('keydown', e => { if(e.key==='Enter') input.blur(); if(e.key==='Escape') renderFaction(fid); });
        });
      });

      tbody.appendChild(tr);
    });

    // "Add unit" row at bottom of each category
    if (!searchVal && !filterChanged && !filterMissing) {
      const addTr = document.createElement('tr');
      addTr.className = 'add-row' + (isCollapsed ? ' cat-hidden' : '');
      addTr.dataset.cat = colKey;
      addTr.innerHTML = `<td colspan="12"><button class="add-unit-btn" data-fi="${fi}" data-cat="${cat}">+ Add unit to ${cat}</button></td>`;
      addTr.querySelector('.add-unit-btn').addEventListener('click', e => {
        e.stopPropagation();
        modalFi = parseInt(e.currentTarget.dataset.fi);
        openModal('add', modalFi, -1);
        setTimeout(() => { document.getElementById('modal-cat').value = e.currentTarget.dataset.cat; }, 0);
      });
      tbody.appendChild(addTr);
    }
  }

  document.getElementById('tot-owned').textContent     = totOwned.toLocaleString();
  document.getElementById('tot-built').textContent     = totBuilt.toLocaleString();
  document.getElementById('tot-painted').textContent   = totPainted.toLocaleString();
  document.getElementById('tot-pts-owned').textContent = totPtsOwned.toLocaleString();
  document.getElementById('tot-pts-built').textContent = totPtsBuilt.toLocaleString();
  document.getElementById('tot-changed').textContent   = changed > 0 ? changed+' ⚑' : '0';
}

// ═══════════════ EVENTS ═══════════════
// listener for search-box in DOMContentLoaded belowList
// listener for filter-changed in DOMContentLoaded below
// listener for filter-missing in DOMContentLoaded below
document.getElementById('btn-refresh').addEventListener('click', async () => {
  mfmCache = {};
  document.getElementById('loading-overlay').classList.remove('hidden');
  setLoaderFill(0);
  await fetchAllMfmData();
  buildSidebar();
  if (activeFactionId === null) showDashboard();
  else renderFaction(activeFactionId);
});


// ═══════════════════════════════════════════════════
// MODAL — Add / Edit / Delete units
// ═══════════════════════════════════════════════════
let modalMode   = 'add';   // 'add' | 'edit'
let modalFi     = 0;
let modalIdx    = -1;
let acSelected  = -1;

function getMfmUnitsForFaction(fi) {
  const slugs = userFactions[fi].yaml;
  const units = [];
  for (const slug of slugs) {
    const cache = mfmCache[slug] || {};
    for (const [name, pts] of Object.entries(cache)) {
      if (!units.find(u => u.name === name)) units.push({name, pts});
    }
  }
  return units.sort((a,b) => a.name.localeCompare(b.name));
}

function openModal(mode, fi, idx) {
  modalMode = mode;
  modalFi   = fi;
  modalIdx  = idx;

  document.getElementById('modal-title').textContent = mode === 'add' ? 'Add Unit' : 'Edit Unit';
  document.getElementById('modal-delete').classList.toggle('hidden', mode === 'add');

  // Populate fields
  if (mode === 'edit') {
    const row = rosters[fi][idx];
    document.getElementById('modal-unit-name').value    = row.unit;
    document.getElementById('modal-cat').value          = row.cat || 'Infantry';
    document.getElementById('modal-qty').value          = row.qty ?? 1;
    document.getElementById('modal-bought').value       = row.bought ?? 'Y';
    document.getElementById('modal-model-built').value  = row.modelBuilt ?? 0;
    document.getElementById('modal-units-built').value  = row.unitsBuilt ?? 0;
    document.getElementById('modal-units-owned').value  = row.unitsOwned ?? 1;
    document.getElementById('modal-painted').value      = row.painted ?? 0;
    document.getElementById('modal-stored-pts').value   = row.storedPts ?? '';
    document.getElementById('modal-note').value         = row.note ?? '';
  } else {
    document.getElementById('modal-unit-name').value    = '';
    document.getElementById('modal-cat').value          = 'Infantry';
    document.getElementById('modal-qty').value          = 1;
    document.getElementById('modal-bought').value       = 'Y';
    document.getElementById('modal-model-built').value  = 0;
    document.getElementById('modal-units-built').value  = 0;
    document.getElementById('modal-units-owned').value  = 1;
    document.getElementById('modal-painted').value      = 0;
    document.getElementById('modal-stored-pts').value   = '';
    document.getElementById('modal-note').value         = '';
  }

  document.getElementById('unit-modal').classList.remove('hidden');
  setTimeout(() => document.getElementById('modal-unit-name').focus(), 50);
  updateAcList('');
}

function closeModal() {
  document.getElementById('unit-modal').classList.add('hidden');
  document.getElementById('ac-list').classList.remove('open');
}

function saveModal() {
  const name = document.getElementById('modal-unit-name').value.trim();
  if (!name) { document.getElementById('modal-unit-name').focus(); return; }

  const storedRaw = document.getElementById('modal-stored-pts').value;
  // If no stored pts entered, try to auto-fill from MFM
  let storedPts = storedRaw !== '' ? parseInt(storedRaw, 10) : null;
  if (storedPts === null) {
    const live = lookupMfm(modalFi, name);
    if (live !== null) storedPts = live;
  }

  const row = {
    unit:        name,
    cat:         document.getElementById('modal-cat').value,
    qty:         parseInt(document.getElementById('modal-qty').value, 10) || 0,
    bought:      document.getElementById('modal-bought').value,
    modelBuilt:  parseInt(document.getElementById('modal-model-built').value, 10) || 0,
    unitsBuilt:  parseInt(document.getElementById('modal-units-built').value, 10) || 0,
    unitsOwned:  parseInt(document.getElementById('modal-units-owned').value, 10) || 1,
    painted:     parseInt(document.getElementById('modal-painted').value, 10) || 0,
    storedPts:   storedPts,
    note:        document.getElementById('modal-note').value.trim() || undefined,
  };

  if (modalMode === 'add') {
    rosters[modalFi].push(row);
    saveRosters();
    getSession().then(s => {
      if (s) upsertUnit({
        user_id: s.user.id, faction_id: userFactions[modalFi].id,
        unit: row.unit, cat: row.cat, qty: row.qty, bought: row.bought,
        model_built: row.modelBuilt||0, units_built: row.unitsBuilt||0,
        units_owned: row.unitsOwned||1, painted: row.painted||0,
        stored_pts: row.storedPts||null, note: row.note||null,
        sort_order: rosters[modalFi].length - 1,
      });
    });
  } else {
    rosters[modalFi][modalIdx] = row;
    saveRosters();
    getSession().then(s => {
      if (s && row._id) upsertUnit({
        id: row._id, user_id: s.user.id, faction_id: userFactions[modalFi].id,
        unit: row.unit, cat: row.cat, qty: row.qty, bought: row.bought,
        model_built: row.modelBuilt||0, units_built: row.unitsBuilt||0,
        units_owned: row.unitsOwned||1, painted: row.painted||0,
        stored_pts: row.storedPts||null, note: row.note||null,
        sort_order: modalIdx,
      });
    });
  }

  closeModal();
  buildSidebar();
  renderFaction(activeFactionId);
}

async function deleteUnit() {
  if (!confirm('Delete this unit from your roster? This cannot be undone.')) return;
  const row = rosters[modalFi][modalIdx];
  rosters[modalFi].splice(modalIdx, 1);
  saveRosters();
  if (row && row._id) await deleteUnitFromCloud(row._id);
  closeModal();
  buildSidebar();
  renderFaction(activeFactionId);
}

// ── Autocomplete ──
function updateAcList(query) {
  const list  = document.getElementById('ac-list');
  const units = getMfmUnitsForFaction(modalFi);
  const q     = query.toLowerCase().trim();
  const matches = q === ''
    ? units.slice(0, 40)
    : units.filter(u => u.name.toLowerCase().includes(q)).slice(0, 40);

  list.innerHTML = '';
  if (matches.length === 0) { list.classList.remove('open'); return; }

  matches.forEach((u, i) => {
    const div = document.createElement('div');
    div.className = 'ac-item';
    div.dataset.idx = i;
    div.innerHTML = `${u.name}<span class="ac-pts">${u.pts} pts</span>`;
    div.addEventListener('mousedown', e => {
      e.preventDefault();
      selectAcItem(u);
    });
    list.appendChild(div);
  });
  acSelected = -1;
  list.classList.add('open');
}

function selectAcItem(u) {
  document.getElementById('modal-unit-name').value = u.name;
  // Auto-fill stored pts if blank
  if (!document.getElementById('modal-stored-pts').value) {
    document.getElementById('modal-stored-pts').value = u.pts;
  }
  document.getElementById('ac-list').classList.remove('open');
}

// Keyboard nav in autocomplete
document.getElementById('modal-unit-name').addEventListener('input', e => {
  updateAcList(e.target.value);
});
document.getElementById('modal-unit-name').addEventListener('focus', e => {
  updateAcList(e.target.value);
});
document.getElementById('modal-unit-name').addEventListener('blur', () => {
  setTimeout(() => document.getElementById('ac-list').classList.remove('open'), 150);
});
document.getElementById('modal-unit-name').addEventListener('keydown', e => {
  const list  = document.getElementById('ac-list');
  const items = list.querySelectorAll('.ac-item');
  if (!items.length) return;
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    acSelected = Math.min(acSelected + 1, items.length - 1);
    items.forEach((el,i) => el.classList.toggle('active', i === acSelected));
    items[acSelected]?.scrollIntoView({block:'nearest'});
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    acSelected = Math.max(acSelected - 1, 0);
    items.forEach((el,i) => el.classList.toggle('active', i === acSelected));
    items[acSelected]?.scrollIntoView({block:'nearest'});
  } else if (e.key === 'Enter' && acSelected >= 0) {
    e.preventDefault();
    const units = getMfmUnitsForFaction(modalFi);
    const q = document.getElementById('modal-unit-name').value.toLowerCase();
    const matches = q === '' ? units.slice(0,40) : units.filter(u => u.name.toLowerCase().includes(q)).slice(0,40);
    if (matches[acSelected]) selectAcItem(matches[acSelected]);
  } else if (e.key === 'Escape') {
    list.classList.remove('open');
  }
});

// Modal button wiring
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-cancel').addEventListener('click', closeModal);
document.getElementById('modal-save').addEventListener('click', saveModal);
document.getElementById('modal-delete').addEventListener('click', deleteUnit);
document.getElementById('unit-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('unit-modal')) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});


// ═══════════════════════════════════════════════════
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
  if (!userFactions || userFactions.length === 0) {
    renderWelcome();
  } else {
    renderDashboard();
  }
}

function renderWelcome() {
  const wrap = document.getElementById('dash-wrap');
  if (!wrap) return;
  wrap.innerHTML = `
    <div style="max-width:480px;margin:40px auto;text-align:center;padding:0 20px;">
      <div style="font-family:'Cinzel',serif;font-size:24px;font-weight:700;color:var(--rust-glow);letter-spacing:.1em;text-transform:uppercase;text-shadow:0 0 30px rgba(200,80,40,.4);margin-bottom:8px;">
        Welcome, Commander
      </div>
      <div style="font-size:13px;color:var(--text-dim);margin-bottom:32px;line-height:1.7;">
        Your collection tracker is ready. Add your first army to get started —
        track your models, monitor live MFM points, and check lists against your inventory.
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:32px;text-align:center;">
        <div style="background:var(--surface);border:1px solid var(--border2);border-radius:5px;padding:14px 10px;">
          <div style="font-size:22px;margin-bottom:6px;">⚔️</div>
          <div style="font-size:11px;color:var(--text-dim);line-height:1.4;">Track models owned, built &amp; painted</div>
        </div>
        <div style="background:var(--surface);border:1px solid var(--border2);border-radius:5px;padding:14px 10px;">
          <div style="font-size:22px;margin-bottom:6px;">📋</div>
          <div style="font-size:11px;color:var(--text-dim);line-height:1.4;">Live MFM points updated automatically</div>
        </div>
        <div style="background:var(--surface);border:1px solid var(--border2);border-radius:5px;padding:14px 10px;">
          <div style="font-size:22px;margin-bottom:6px;">🎯</div>
          <div style="font-size:11px;color:var(--text-dim);line-height:1.4;">Check army lists vs your collection</div>
        </div>
      </div>
      <button onclick="openNewArmyModal()" style="background:var(--rust);border:1px solid var(--rust-lit);border-radius:5px;color:#f0ddd0;font-family:'Cinzel',serif;font-size:13px;letter-spacing:.08em;text-transform:uppercase;padding:12px 28px;cursor:pointer;">
        + Add Your First Army
      </button>
    </div>
  `;
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
  if (isMobile()) renderFactionMobile(fid);
}

function renderDashboard() {
  // ── Compute per-faction stats ──
  const stats = userFactions.map((f, fi) => {
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
        <div class="dgc-value gold">${userFactions.length}</div>
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
    userFactions.forEach((f, fi) => {
      if (f.label.toLowerCase().includes(hintLower) ||
          hintLower.includes(f.label.toLowerCase().split(' ').slice(-1)[0].toLowerCase())) {
        factionIdxs.push(fi);
      }
    });
  }

  // If no faction match, search all factions
  if (factionIdxs.length === 0) {
    factionIdxs = userFactions.map((_, fi) => fi);
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
        if (!matchedFaction) matchedFaction = userFactions[fi].label;
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
// moved to DOMContentLoaded: document.getElementById('listcheck-btn').addEventL
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



// ════════════════════════════════════════════════════
// AUTH UI
// ════════════════════════════════════════════════════
let authMode = 'signin';

function showAuthError(msg) {
  const el = document.getElementById('auth-error');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}
function clearAuthError() {
  const el = document.getElementById('auth-error');
  if (el) el.style.display = 'none';
}


async function bootApp() {
  document.getElementById('loading-overlay').classList.remove('hidden');
  setLoaderFill(10);
  setLoaderSub('Loading your roster…');

  // Scope localStorage to this user so accounts never share cached data
  const session0 = await getSession();
  if (session0) {
    STORAGE_KEY = STORAGE_KEY_BASE + '-' + session0.user.id.slice(0, 8);
  }

  // Run roster load and MFM fetch in parallel for speed
  setLoaderSub('Loading roster & MFM data…');
  await Promise.all([
    initRosters().then(() => setLoaderFill(60)),
    fetchAllMfmData().then(() => setLoaderFill(80)),
  ]);
  setLoaderFill(90);

  setStatus('ok', 'Live data loaded');
  document.getElementById('last-updated').textContent = 'Updated ' + new Date().toLocaleTimeString();

  // User display name in header
  const session = await getSession();
  if (session) {
    const displayName = session.user.user_metadata?.display_name || session.user.email.split('@')[0];
    const initials = displayName.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
    if (!document.getElementById('user-menu-btn')) {
      const headerRight = document.querySelector('.header-right');
      const userBtn = document.createElement('button');
      userBtn.id = 'user-menu-btn';
      userBtn.className = 'user-menu-btn';
      userBtn.innerHTML = `<div class="user-avatar">${initials}</div><span>${displayName}</span>`;
      userBtn.addEventListener('click', async () => {
        if (confirm('Sign out?')) {
          // Clear this user's local cache so next user starts clean
          try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
          STORAGE_KEY = STORAGE_KEY_BASE;
          rosters = [];
          await signOut();
        }
      });
      if (headerRight) headerRight.prepend(userBtn);
    }
  }

  setLoaderFill(100);
  setTimeout(() => {
    document.getElementById('loading-overlay').classList.add('hidden');
    buildSidebar();
    buildMobileNav();
    showDashboard();
  }, 200);
}


function setMobileNav(target, fid) {
  document.querySelectorAll('.mobile-nav-btn').forEach(b => {
    if (target === 'faction') {
      b.classList.toggle('active', b.dataset.fid === fid);
    } else {
      b.classList.toggle('active',
        b.dataset.target === target ||
        b.id === 'mob-' + target ||
        (target === 'dashboard' && b.id === 'mob-dash') ||
        (target === 'listcheck' && b.id === 'mob-list'));
    }
  });
}

function buildMobileNav() {
  const inner = document.getElementById('mobile-nav-inner');
  if (!inner) return;
  const listBtn = document.getElementById('mob-list');
  document.querySelectorAll('.mobile-nav-btn[data-fid]').forEach(b => b.remove());
  userFactions.forEach(f => {
    const btn = document.createElement('button');
    btn.className = 'mobile-nav-btn';
    btn.dataset.fid = f.id;
    btn.innerHTML = `<span class="nav-icon" style="color:${f.color}">●</span>${f.label.split(' ').slice(-1)[0]}`;
    btn.addEventListener('click', () => showFaction(f.id));
    inner.insertBefore(btn, listBtn);
  });
}


// ════════════════════════════════════════════════════
// INIT — safe to run after all functions defined
// ════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════
// MOBILE CARD RENDERER
// Called instead of table rendering when on mobile
// ═══════════════════════════════════════════════════
function isMobile() { return window.innerWidth <= 768; }

function renderFactionMobile(fid) {
  const fi      = userFactions.findIndex(f => f.id === fid);
  const faction = userFactions[fi];
  const roster  = rosters[fi];
  const tableWrap = document.querySelector('.table-wrap');
  if (!tableWrap) return;

  // Remove existing mobile list
  document.querySelector('.mobile-unit-list')?.remove();

  const container = document.createElement('div');
  container.className = 'mobile-unit-list';

  // Group by category
  const groups = {};
  const CAT_ORDER_LOCAL = ['Character','Battleline','Infantry','Monster','Mounted','Vehicle','Dedicated Transport'];
  CAT_ORDER_LOCAL.forEach(c => { groups[c] = []; });
  roster.forEach((row, idx) => {
    const cat = row.cat || 'Infantry';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push({ row, idx });
  });

  let totOwned=0, totBuilt=0, totPainted=0, totPtsOwned=0, totPtsBuilt=0;

  for (const cat of CAT_ORDER_LOCAL) {
    const entries = groups[cat];
    if (!entries || entries.length === 0) continue;

    const catMeta  = CAT_META[cat] || CAT_META['Infantry'];
    const colKey   = fid + ':' + cat;
    const isCollapsed = collapsedCats.has(colKey);

    // Category bar
    const catEl = document.createElement('div');
    let catPts = 0, catModels = 0;
    entries.forEach(({row}) => {
      const live = lookupMfm(fi, row.unit);
      const pts  = live !== null ? live : (row.storedPts || 0);
      catPts   += pts * (row.unitsOwned ?? 1);
      catModels += row.qty || 0;
    });
    catEl.className = 'mobile-cat-header' + (isCollapsed ? ' collapsed' : '');
    catEl.innerHTML = `
      <span class="mobile-cat-chevron">▾</span>
      <span style="color:var(--cat-${catMeta.key}-lit)">${cat}</span>
      <span class="mobile-cat-sub">${catModels} models · ${catPts.toLocaleString()} pts</span>
    `;
    catEl.addEventListener('click', () => {
      if (collapsedCats.has(colKey)) collapsedCats.delete(colKey);
      else collapsedCats.add(colKey);
      saveCollapsed();
      renderFactionMobile(fid);
    });
    container.appendChild(catEl);

    const unitsEl = document.createElement('div');
    unitsEl.className = 'mobile-cat-units';

    entries.forEach(({ row, idx }) => {
      const live       = lookupMfm(fi, row.unit);
      const effPts     = live !== null ? live : (row.storedPts || 0);
      const unitsOwned = row.unitsOwned ?? 1;
      const ptsChanged = live !== null && row.storedPts !== null && live !== row.storedPts;
      const totalO     = effPts * unitsOwned;
      const totalB     = effPts * (row.unitsBuilt ?? 0);

      totOwned    += row.qty || 0;
      totBuilt    += row.modelBuilt || 0;
      totPainted  += row.painted || 0;
      totPtsOwned += totalO;
      totPtsBuilt += totalB;

      const card = document.createElement('div');
      card.className = 'unit-card' + (ptsChanged ? ' row-changed' : '');

      const ptsDisplay = live !== null
        ? `<span class="unit-card-pts${ptsChanged?' changed':''}">${live} pts${ptsChanged ? ' ⚑' : ''}</span>`
        : `<span class="unit-card-pts" style="color:var(--text-faint);font-size:11px">No MFM data</span>`;

      const noteHtml = row.note ? `<div class="unit-card-note">(${row.note})</div>` : '';

      card.innerHTML = `
        <div class="unit-card-header">
          <span class="unit-card-dot" style="background:var(--cat-${catMeta.key}-lit)"></span>
          <div style="flex:1;min-width:0">
            <div class="unit-card-name">${row.unit}</div>
            ${noteHtml}
          </div>
          ${ptsDisplay}
        </div>
        <div class="unit-card-stats">
          <div class="unit-stat" data-field="qty">
            <div class="unit-stat-label">Models</div>
            <div class="unit-stat-value">${row.qty}</div>
            <div class="unit-stat-hint">tap to edit</div>
          </div>
          <div class="unit-stat" data-field="modelBuilt">
            <div class="unit-stat-label">Built</div>
            <div class="unit-stat-value">${row.modelBuilt}</div>
            <div class="unit-stat-hint">tap to edit</div>
          </div>
          <div class="unit-stat" data-field="painted">
            <div class="unit-stat-label">Painted</div>
            <div class="unit-stat-value">${row.painted}</div>
            <div class="unit-stat-hint">tap to edit</div>
          </div>
        </div>
        <div class="unit-card-footer">
          <div class="unit-card-total">${totalO.toLocaleString()} pts owned · ${totalB.toLocaleString()} pts built</div>
          <div class="unit-card-actions">
            <button class="unit-card-btn edit-btn">Edit</button>
          </div>
        </div>
      `;

      // Tap to edit stat fields
      card.querySelectorAll('.unit-stat').forEach(stat => {
        stat.addEventListener('click', () => {
          const field = stat.dataset.field;
          const cur   = rosters[fi][idx][field] ?? 0;
          const val   = prompt(`${row.unit} — ${field.replace(/([A-Z])/g,' $1')}:`, cur);
          if (val === null) return;
          const newVal = Math.max(0, parseInt(val, 10) || 0);
          rosters[fi][idx][field] = newVal;
          saveRosters();
          const r = rosters[fi][idx];
          getSession().then(s => {
            if (s && r._id) upsertUnit({
              id: r._id, user_id: s.user.id, faction_id: userFactions[fi].id,
              unit: r.unit, cat: r.cat, qty: r.qty, bought: r.bought,
              model_built: r.modelBuilt||0, units_built: r.unitsBuilt||0,
              units_owned: r.unitsOwned||1, painted: r.painted||0,
              stored_pts: r.storedPts||null, note: r.note||null, sort_order: idx,
            });
          });
          buildSidebar();
          renderFactionMobile(fid);
        });
      });

      // Edit button
      card.querySelector('.edit-btn').addEventListener('click', e => {
        e.stopPropagation();
        openModal('edit', fi, idx);
      });

      unitsEl.appendChild(card);
    });

    container.appendChild(unitsEl);

    // Add unit button at bottom of each category
    const addRowEl = document.createElement('div');
    addRowEl.style.cssText = 'padding:4px 0;';
    const addBtn2 = document.createElement('button');
    addBtn2.className = 'add-unit-btn';
    addBtn2.style.cssText = 'width:100%;margin:2px 0;';
    addBtn2.textContent = `+ Add unit to ${cat}`;
    addBtn2.addEventListener('click', () => {
      openModal('add', fi, -1);
      setTimeout(() => { document.getElementById('modal-cat').value = cat; }, 0);
    });
    addRowEl.appendChild(addBtn2);
    container.appendChild(addRowEl);
  }

  tableWrap.appendChild(container);

  // Update totals bar
  document.getElementById('tot-owned').textContent     = totOwned.toLocaleString();
  document.getElementById('tot-built').textContent     = totBuilt.toLocaleString();
  document.getElementById('tot-painted').textContent   = totPainted.toLocaleString();
  document.getElementById('tot-pts-owned').textContent = totPtsOwned.toLocaleString();
  document.getElementById('tot-pts-built').textContent = totPtsBuilt.toLocaleString();
}

// ═══════════════════════════════════════════════════
// NEW ARMY MODAL
// ═══════════════════════════════════════════════════

// Available BSData slugs for common factions not yet in the tracker
const ALL_FACTIONS_AVAILABLE = [
  { id: 'space-marines',       label: 'Space Marines',          color: '#4060a0', yaml: ['space-marines'] },
  { id: 'blood-angels',        label: 'Blood Angels',           color: '#a02020', yaml: ['blood-angels'] },
  { id: 'dark-angels',         label: 'Dark Angels',            color: '#204020', yaml: ['dark-angels'] },
  { id: 'grey-knights',        label: 'Grey Knights',           color: '#8090a0', yaml: ['grey-knights'] },
  { id: 'black-templars',      label: 'Black Templars',         color: '#202020', yaml: ['black-templars'] },
  { id: 'deathwatch',          label: 'Deathwatch',             color: '#303030', yaml: ['deathwatch'] },
  { id: 'thousand-sons',       label: 'Thousand Sons',          color: '#1040a0', yaml: ['thousand-sons'] },
  { id: 'death-guard',         label: 'Death Guard',            color: '#505030', yaml: ['death-guard'] },
  { id: 'emperors-children',   label: "Emperor's Children",     color: '#8030a0', yaml: ['emperors-children'] },
  { id: 'tyranids',            label: 'Tyranids',               color: '#806020', yaml: ['tyranids'] },
  { id: 'genestealer-cults',   label: 'Genestealer Cults',      color: '#604080', yaml: ['genestealer-cults'] },
  { id: 'orks',                label: 'Orks',                   color: '#406020', yaml: ['orks'] },
  { id: 'tau-empire',          label: "T'au Empire",            color: '#4090c0', yaml: ['tau-empire'] },
  { id: 'eldar',               label: 'Aeldari',                color: '#30a060', yaml: ['aeldari'] },
  { id: 'dark-eldar',          label: 'Drukhari',               color: '#502070', yaml: ['drukhari'] },
  { id: 'harlequins',          label: 'Harlequins',             color: '#a06030', yaml: ['harlequins'] },
  { id: 'leagues-of-votann',   label: 'Leagues of Votann',      color: '#b0a040', yaml: ['leagues-of-votann'] },
  { id: 'chaos-space-marines', label: 'Chaos Space Marines',    color: '#c04a4a', yaml: ['chaos-space-marines'] },
  { id: 'world-eaters',        label: 'World Eaters',           color: '#c03030', yaml: ['world-eaters'] },
  { id: 'chaos-knights',       label: 'Chaos Knights',          color: '#8a3a8a', yaml: ['chaos-knights'] },
  { id: 'imperial-knights',    label: 'Imperial Knights',       color: '#5a80c0', yaml: ['imperial-knights'] },
  { id: 'adeptus-custodes',    label: 'Adeptus Custodes',       color: '#c89a50', yaml: ['adeptus-custodes'] },
  { id: 'adepta-sororitas',    label: 'Adepta Sororitas',       color: '#c04080', yaml: ['adepta-sororitas'] },
  { id: 'astra-militarum',     label: 'Astra Militarum',        color: '#7a7a40', yaml: ['astra-militarum'] },
  { id: 'adeptus-mechanicus',  label: 'Adeptus Mechanicus',     color: '#a03020', yaml: ['adeptus-mechanicus'] },
  { id: 'necrons',             label: 'Necrons',                color: '#40c080', yaml: ['necrons'] },
];

function openNewArmyModal() {
  // Build list of factions not already tracked
  const existingIds = userFactions.map(f => f.id);
  const available = ALL_FACTIONS_AVAILABLE.filter(f => !existingIds.includes(f.id));

  // Create modal HTML
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.id = 'new-army-modal';
  backdrop.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3>Add New Army</h3>
        <button class="modal-close" id="new-army-close">✕</button>
      </div>
      <div class="modal-body" style="gap:8px">
        <div class="field-group">
          <label>Select Faction</label>
          <input class="field-input" id="new-army-search" placeholder="Type to search factions…" autocomplete="off">
        </div>
        <div id="new-army-list" style="max-height:280px;overflow-y:auto;border:1px solid var(--border2);border-radius:4px;"></div>
        <div style="font-size:10px;color:var(--text-faint)">
          Can't find your faction? Use Custom below to add any army manually.
        </div>
        <details style="border:1px solid var(--border2);border-radius:4px;padding:10px">
          <summary style="font-size:11px;color:var(--text-dim);cursor:pointer;letter-spacing:.04em">Custom faction</summary>
          <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px">
            <div class="field-group"><label>Army Name</label><input class="field-input" id="new-army-custom-name" placeholder="e.g. Space Wolves"></div>
            <div class="field-row">
              <div class="field-group"><label>BSData Slug</label><input class="field-input" id="new-army-custom-slug" placeholder="e.g. space-wolves"></div>
              <div class="field-group"><label>Color</label><input class="field-input" type="color" id="new-army-custom-color" value="#c04a4a"></div>
            </div>
            <button class="btn-primary" id="new-army-custom-add">Add Custom Army</button>
          </div>
        </details>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  function renderArmyList(filter) {
    const list = document.getElementById('new-army-list');
    const filtered = filter
      ? available.filter(f => f.label.toLowerCase().includes(filter.toLowerCase()))
      : available;
    if (filtered.length === 0) {
      list.innerHTML = '<div style="padding:12px;color:var(--text-faint);font-size:12px;text-align:center">No factions found</div>';
      return;
    }
    list.innerHTML = filtered.map(f => `
      <div class="ac-item" data-fid="${f.id}" style="display:flex;align-items:center;gap:8px;padding:8px 10px">
        <span style="width:10px;height:10px;border-radius:50%;background:${f.color};flex-shrink:0;display:inline-block"></span>
        ${f.label}
      </div>
    `).join('');
    list.querySelectorAll('.ac-item').forEach(item => {
      item.addEventListener('click', () => {
        const fid = item.dataset.fid;
        const faction = ALL_FACTIONS_AVAILABLE.find(f => f.id === fid);
        if (faction) addNewArmy(faction);
        closeNewArmyModal();
      });
    });
  }

  renderArmyList('');
  document.getElementById('new-army-search').addEventListener('input', e => renderArmyList(e.target.value));
  document.getElementById('new-army-close').addEventListener('click', closeNewArmyModal);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeNewArmyModal(); });

  document.getElementById('new-army-custom-add').addEventListener('click', () => {
    const name  = document.getElementById('new-army-custom-name').value.trim();
    const slug  = document.getElementById('new-army-custom-slug').value.trim();
    const color = document.getElementById('new-army-custom-color').value;
    if (!name || !slug) { alert('Please enter both a name and BSData slug.'); return; }
    addNewArmy({ id: slug, label: name, color, yaml: [slug] });
    closeNewArmyModal();
  });
}

function closeNewArmyModal() {
  document.getElementById('new-army-modal')?.remove();
}

async function addNewArmy(factionDef) {
  // Don't add if already in user's list
  if (userFactions.find(f => f.id === factionDef.id)) {
    showFaction(factionDef.id);
    return;
  }
  userFactions.push({ ...factionDef, roster: [] });
  rosters.push([]);
  for (const slug of factionDef.yaml) { await fetchYaml(slug); }
  saveRosters();
  buildSidebar();
  buildMobileNav();
  showFaction(factionDef.id);
}



async function removeArmy(fid) {
  const fi = userFactions.findIndex(f => f.id === fid);
  if (fi === -1) return;
  const faction = userFactions[fi];

  if (!confirm(`Remove ${faction.label} from your tracker? Your unit data will be deleted from the cloud. This cannot be undone.`)) return;

  // Delete all units for this faction from Supabase
  if (db) {
    const session = await getSession();
    if (session) {
      await db.from('roster_units').delete()
        .eq('user_id', session.user.id)
        .eq('faction_id', fid);
    }
  }

  // Remove from local arrays
  userFactions.splice(fi, 1);
  rosters.splice(fi, 1);
  saveRosters();

  buildSidebar();
  buildMobileNav();
  showDashboard();
}

document.addEventListener('DOMContentLoaded', () => {

  // Init Supabase
  const { createClient } = supabase;
  db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Auth tab switching
  document.getElementById('tab-signin')?.addEventListener('click', () => {
    authMode = 'signin';
    document.getElementById('tab-signin').classList.add('active');
    document.getElementById('tab-signup').classList.remove('active');
    document.getElementById('field-name').style.display = 'none';
    document.getElementById('auth-submit').textContent = 'Sign In';
    clearAuthError();
  });
  document.getElementById('tab-signup')?.addEventListener('click', () => {
    authMode = 'signup';
    document.getElementById('tab-signup').classList.add('active');
    document.getElementById('tab-signin').classList.remove('active');
    document.getElementById('field-name').style.display = 'flex';
    document.getElementById('auth-submit').textContent = 'Create Account';
    clearAuthError();
  });
  document.getElementById('auth-submit')?.addEventListener('click', async () => {
    const email    = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    const name     = document.getElementById('auth-name')?.value.trim() || '';
    clearAuthError();
    if (!email || !password) { showAuthError('Please enter email and password.'); return; }
    const btn = document.getElementById('auth-submit');
    btn.textContent = 'Please wait…'; btn.disabled = true;
    if (authMode === 'signup') {
      const { error } = await signUp(email, password, name || email.split('@')[0]);
      if (error) showAuthError(error.message);
      else showAuthError('Check your email to confirm, then sign in.');
    } else {
      const { error } = await signIn(email, password);
      if (error) showAuthError(error.message);
    }
    btn.textContent = authMode === 'signup' ? 'Create Account' : 'Sign In';
    btn.disabled = false;
  });
  ['auth-email','auth-password','auth-name'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('auth-submit')?.click();
    });
  });

  // Dashboard button
  document.getElementById('dash-btn')?.addEventListener('click', showDashboard);
  document.getElementById('mob-dash')?.addEventListener('click', showDashboard);
  document.getElementById('listcheck-btn')?.addEventListener('click', showListChecker);
  document.getElementById('mob-list')?.addEventListener('click', showListChecker);

  // Auth state listener
  db.auth.onAuthStateChange(async (_event, session) => {
    if (session) {
      document.getElementById('auth-screen')?.classList.add('hidden');
      if (!document.getElementById('loading-overlay').classList.contains('hidden') ||
          !rosters.length) {
        await bootApp();
      }
    } else {
      document.getElementById('auth-screen')?.classList.remove('hidden');
      document.getElementById('loading-overlay')?.classList.add('hidden');
    }
  });

  // Service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
  }
});

