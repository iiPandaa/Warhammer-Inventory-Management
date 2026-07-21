
// ════════════════════════════════════════
// data.js
// ════════════════════════════════════════

// Default faction roster data — edit unit entries here

const FACTIONS = [
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



// ════════════════════════════════════════
// mfm.js
// ════════════════════════════════════════

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


// ════════════════════════════════════════
// supabase.js
// ════════════════════════════════════════

// ═══════════════════════════════════════════════════
// SUPABASE CLIENT
// ═══════════════════════════════════════════════════
const SUPABASE_URL = 'https://hvukiwyggawhyvpqmnrm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2dWtpd3lnZ2F3aHl2cHFtbnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NzM4ODksImV4cCI6MjEwMDE0OTg4OX0.UGVDsfHEI5F4xRZ5jkPsi8uZYch__0uXya45FCfx5qo';

// db is initialised in the DOMContentLoaded block at the bottom of this file
let db;

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
  if (!db) return null;
  const { data: { session } } = await db.auth.getSession();
  return session;
}

// onAuthChange handled directly in DOMContentLoaded init block

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


// ════════════════════════════════════════
// app.js
// ════════════════════════════════════════

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


// ════════════════════════════════════════
// ui.js
// ════════════════════════════════════════

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

// Auth listener moved to bottom init block

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



// ════════════════════════════════════════
// INIT — runs after ALL code is defined
// ════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Now safe to initialise Supabase — all functions are defined above
  const { createClient } = supabase;
  db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Wire auth state changes
  db.auth.onAuthStateChange(async (_event, session) => {
    if (session) {
      currentUser = session.user;
      const authScreen = document.getElementById('auth-screen');
      if (authScreen) authScreen.classList.add('hidden');
      await bootApp();
    } else {
      currentUser = null;
      const authScreen = document.getElementById('auth-screen');
      if (authScreen) authScreen.classList.remove('hidden');
    }
  });

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
  }
});
