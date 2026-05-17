import { MOB_TYPES, MUSCLE_GROUPS, LOOT_RARITIES, LOOT_BASE } from '../constants';

function seededRng(seed) {
  let s = (seed ^ 0xdeadbeef) >>> 0;
  return function () {
    s = Math.imul(s ^ (s >>> 15), s | 1);
    s ^= s + Math.imul(s ^ (s >>> 7), s | 61);
    return ((s ^ (s >>> 14)) >>> 0) / 0x100000000;
  };
}

// ─── Generate a single mob enemy ─────────────────────────────────────────────
// Mob stats scale off the final boss (not player stats), so difficulty always
// feels proportional. Later waves get a +15%/wave bonus on top.
export function generateMob(playerLevel, boss, waveIdx, mobIdx, dungeonSeed) {
  const rng = seededRng(dungeonSeed * 31 + waveIdx * 997 + mobIdx * 113);
  const mobType = MOB_TYPES[Math.floor(rng() * MOB_TYPES.length)];
  const weakness = MUSCLE_GROUPS[Math.floor(rng() * MUSCLE_GROUPS.length)];

  // Use the mob type's canonical weapon element directly.
  // ELEMENT_THEMES now includes Water/Electric/Grass/None entries.
  const weaponElement = mobType.weaponElement || 'None';
  const element       = weaponElement;

  // Each successive wave is 15% harder
  const waveScale = 1 + waveIdx * 0.15;
  const scaledHP  = Math.max(30, Math.floor(boss.maxHP * mobType.hpMult * waveScale));
  const scaledATK = Math.max(3,  Math.floor(boss.atk  * mobType.atkMult * waveScale));

  return {
    id:            mobType.id,
    name:          mobType.name,
    element,               // ELEMENT_THEMES display key (Fire/Ice/Shadow/Thunder/Earth)
    weaponElement,         // weapon combat element (Fire/Water/Shadow/Electric/Earth/None)
    weakness,
    maxHP:  scaledHP,
    atk:    scaledATK,
    speed:  mobType.speed,
    level:  playerLevel,
  };
}

// ─── Generate the full dungeon enemy list ────────────────────────────────────
// Returns flat array: [mob, mob, mob, mob, mob, boss]
// Waves: 1 mob → 2 mobs → 2 mobs → final boss
export function generateDungeonEnemies(playerLevel, boss, dungeonSeed) {
  const rng = seededRng(dungeonSeed);
  const enemies = [];
  const waveSizes = [1, 2, 2];

  waveSizes.forEach((count, waveIdx) => {
    for (let mobIdx = 0; mobIdx < count; mobIdx++) {
      enemies.push({
        ...generateMob(playerLevel, boss, waveIdx, mobIdx, dungeonSeed + Math.floor(rng() * 9999)),
        waveIdx,
        isMob: true,
      });
    }
  });

  enemies.push({ ...boss, isMob: false, isBoss: true });
  return enemies;
}

// ── Armor set rarity constraints ─────────────────────────────────────────────
// Maps item name prefix → allowed rarity names + weights override (null = all)
const SET_RARITY_RULES = {
  'Iron Scraps':    { allowed: ['Common'],               weights: [1] },
  'Forest Ranger':  { allowed: ['Common', 'Rare'],       weights: [70, 30] },
  'Steel Knight':   { allowed: ['Rare', 'Epic'],         weights: [60, 40] },
  'Void Reaper':    { allowed: ['Epic', 'Legendary'],    weights: [65, 35] },
  'Solar Titan':    { allowed: ['Legendary'],            weights: [1] },
};

function getSetKey(baseName) {
  for (const key of Object.keys(SET_RARITY_RULES)) {
    if (baseName.startsWith(key)) return key;
  }
  return null;
}

function pickRarity(rng, rarityPool) {
  const totalWeight = rarityPool.reduce((s, r) => s + r.weight, 0);
  let roll = rng() * totalWeight;
  for (const r of rarityPool) {
    if (roll < r.weight) return r;
    roll -= r.weight;
  }
  return rarityPool[rarityPool.length - 1];
}

// ─── Generate a loot item ────────────────────────────────────────────────────
export function generateLootItem(seed) {
  const rng = seededRng(seed ^ 0xc0ffee);

  // Random slot
  const slots = Object.keys(LOOT_BASE);
  const slot = slots[Math.floor(rng() * slots.length)];

  // Random base item
  const baseItems = LOOT_BASE[slot];
  const base = baseItems[Math.floor(rng() * baseItems.length)];

  // Rarity — restricted per armor set if applicable
  const setKey = getSetKey(base.name);
  let rarity;
  if (setKey) {
    const rules = SET_RARITY_RULES[setKey];
    const rarityPool = LOOT_RARITIES
      .filter(r => rules.allowed.includes(r.name))
      .map((r, i) => ({ ...r, weight: rules.weights[i] ?? r.weight }));
    rarity = pickRarity(rng, rarityPool);
  } else {
    rarity = pickRarity(rng, LOOT_RARITIES);
  }

  const m = rarity.mult;
  return {
    id: `loot_${seed}_${Date.now()}`,
    name: rarity.name === 'Common' ? base.name : `${rarity.name} ${base.name}`,
    slot,
    icon: base.icon,
    rarity: rarity.name,
    rarityColor: rarity.color,
    rarityGlow: rarity.glow,
    atk:   Math.round((base.atk   || 0) * m),
    def:   Math.round((base.def   || 0) * m),
    hp:    Math.round((base.hp    || 0) * m),
    crit:  Math.round((base.crit  || 0) * m),
    dodge: Math.round((base.dodge || 0) * m),
  };
}

// ─── Generate chest loot (1-2 items) ─────────────────────────────────────────
export function generateChestLoot(dungeonSeed, doubleLoot = false) {
  const item1 = generateLootItem(dungeonSeed);
  if (doubleLoot || item1.rarity === 'Legendary' || item1.rarity === 'Epic') {
    const item2 = generateLootItem(dungeonSeed + 88888);
    return [item1, item2];
  }
  return [item1];
}

// ─── Post-workout loot roll ────────────────────────────────────────────────────
// ~25% chance of dropping an item after a workout
export function rollWorkoutLoot(seed) {
  const rng = seededRng(seed ^ 0xabcdef);
  if (rng() > 0.25) return null;
  return generateLootItem(seed + 11111);
}
