// ═══════════════════════════════════════════════════
// MFM.JS — Munitorum Field Manual data fetch & parse
// ═══════════════════════════════════════════════════

const BASE_URL = 'https://raw.githubusercontent.com/BSData/wh40k-11e-mfm/main/data/';
let mfmCache   = {};
let mfmVersion = '';

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

async function fetchYaml(slug) {
  if (mfmCache[slug]) return;
  try {
    const r = await fetch(BASE_URL + slug + '.yaml', { cache: 'no-cache' });
    if (r.ok) { mfmCache[slug] = parseYaml(await r.text()); }
    else { mfmCache[slug] = {}; }
  } catch(e) { mfmCache[slug] = {}; }
}

async function fetchAllMfmData() {
  const allSlugs = [...new Set(FACTIONS.flatMap(f => f.yaml))];
  let done = 0;
  await Promise.all(allSlugs.map(async slug => {
    await fetchYaml(slug);
    done++;
  }));
  const totalUnits = Object.values(mfmCache).reduce((a,c) => a + Object.keys(c).length, 0);
  return { totalUnits, slugCount: allSlugs.length };
}

function lookupMfm(factionIdx, unitName) {
  const slugs = FACTIONS[factionIdx].yaml;
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

function getMfmUnitsForFaction(fi) {
  const slugs = FACTIONS[fi].yaml;
  const units = [];
  for (const slug of slugs) {
    const cache = mfmCache[slug] || {};
    for (const [name, pts] of Object.entries(cache)) {
      if (!units.find(u => u.name === name)) units.push({ name, pts });
    }
  }
  return units.sort((a,b) => a.name.localeCompare(b.name));
}
