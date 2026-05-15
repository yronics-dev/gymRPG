import { MOB_TYPES, ELEMENTS, MUSCLE_GROUPS, LOOT_RARITIES, LOOT_BASE } from '../constants';

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
  const element = ELEMENTS[Math.floor(rng() * ELEMENTS.length)];
  const weakness = MUSCLE_GROUPS[Math.floor(rng() * MUSCLE_GROUPS.length)];

  // Each successive wave is 15% harder
  const waveScale = 1 + waveIdx * 0.15;
  const scaledHP  = Math.max(30, Math.floor(boss.maxHP * mobType.hpMult * waveScale));
  const scaledATK = Math.max(3,  Math.floor(boss.atk  * mobType.atkMult * waveScale));

  return {
    id: mobType.id,
    name: mobType.name,
    emoji: mobType.emoji,
    element,
    weakness,
    maxHP: scaledHP,
    atk:   scaledATK,
    speed: mobType.speed,
    level: playerLevel,
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

// ─── Generate a loot item ────────────────────────────────────────────────────
export function generateLootItem(seed) {
  const rng = seededRng(seed ^ 0xc0ffee);

  // Weighted rarity roll
  const totalWeight = LOOT_RARITIES.reduce((s, r) => s + r.weight, 0);
  let roll = rng() * totalWeight;
  let rarity = LOOT_RARITIES[0];
  for (const r of LOOT_RARITIES) {
    if (roll < r.weight) { rarity = r; break; }
    roll -= r.weight;
  }

  // Random slot
  const slots = Object.keys(LOOT_BASE);
  const slot = slots[Math.floor(rng() * slots.length)];

  // Random base item
  const baseItems = LOOT_BASE[slot];
  const base = baseItems[Math.floor(rng() * baseItems.length)];

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
