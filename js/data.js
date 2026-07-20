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

const BASE_URL    = 'https://raw.githubusercontent.com/BSData/wh40k-11e-mfm/main/data/';
const STORAGE_KEY = 'w40k-tracker-rosters-v1';
const COLL_KEY    = 'w40k-tracker-collapsed-v1';
