import {
  BOSS_PREFIXES, BOSS_SUFFIXES, ELEMENTS, MUSCLE_GROUPS, BOSS_EMOJIS, BOSS_CONFIG,
} from '../constants';

// Map every element to one of the 7 hand-crafted boss names
const ELEMENT_TO_BOSS_NAME = {
  Fire:    'Fire Demon',
  Lava:    'Fire Demon',
  Ice:     'Ice Golem',
  Crystal: 'Ice Golem',
  Shadow:  'Shadow Wraith',
  Void:    'Shadow Wraith',
  Blood:   'Vampire Lord',
  Thunder: 'Thunder Titan',
  Storm:   'Thunder Titan',
  Earth:   'Earth Colossus',
  Poison:  'Earth Colossus',
  Wind:    'Zombie Brute',
};
function bossName(element) {
  return ELEMENT_TO_BOSS_NAME[element] || 'Dark Titan';
}

function lcg(seed) {
  return ((seed * 1664525 + 1013904223) >>> 0);
}
function makeRng(seed) {
  let s = (seed >>> 0) || 1;
  return () => { s = lcg(s); return (s >>> 0) / 0x100000000; };
}
function stringHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  return hash >>> 0;
}
function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }

function createBossPrototype(seed) {
  const rng     = makeRng(stringHash(String(seed)));
  const element = pick(rng, ELEMENTS);
  const prefix  = pick(rng, BOSS_PREFIXES);
  const suffix  = pick(rng, BOSS_SUFFIXES);
  const weakness = pick(rng, MUSCLE_GROUPS);
  const emoji   = pick(rng, BOSS_EMOJIS);

  const bHP    = Math.floor(BOSS_CONFIG.baseHP    * (0.75 + rng() * 0.5));
  const bATK   = Math.floor(BOSS_CONFIG.baseATK   * (0.75 + rng() * 0.5));
  const bSpeed = Math.max(1, Math.floor(BOSS_CONFIG.baseSpeed * (0.75 + rng() * 0.5)));

  return {
    id: `boss-${seed}`,
    name: bossName(element),
    element, weakness, emoji,
    baseHP: bHP, baseAtk: bATK, baseSpeed: bSpeed,
  };
}

export function generateBossPool(size = 25) {
  return Array.from({ length: size }, (_, i) => createBossPrototype(i));
}

export function generateTrainingBoss(playerLevel = 1, rngSeed = Date.now()) {
  const pool  = generateBossPool(40);
  const index = Math.floor(makeRng(rngSeed >>> 0)() * pool.length);
  const base  = pool[index];
  const lvl   = Math.max(1, playerLevel);
  const rng   = makeRng((rngSeed * 31) >>> 0);
  const maxHP = Math.max(100, Math.floor(base.baseHP + lvl * BOSS_CONFIG.levelHPScale + rng() * lvl * BOSS_CONFIG.hpVariance));
  const atk   = Math.max(3,  Math.floor(base.baseAtk + lvl * BOSS_CONFIG.levelATKScale + rng() * lvl * BOSS_CONFIG.atkVariance));
  const speed = Math.floor(base.baseSpeed + lvl * BOSS_CONFIG.levelSpeedScale + rng() * 5);
  return { ...base, maxHP, atk, speed, level: lvl, diffMult: 1, diffLabel: 'NORMAL' };
}

// Daily boss: generated directly from the date string so every day is unique
export function generateDailyBoss(dateStr, playerLevel = 1) {
  const rng      = makeRng(stringHash(dateStr));
  // Use a separate seed per property so nearby dates don't cluster on the same element
  const element  = pick(makeRng(stringHash(dateStr + '_el')),  ELEMENTS);
  const prefix   = pick(makeRng(stringHash(dateStr + '_pfx')), BOSS_PREFIXES);
  const suffix   = pick(makeRng(stringHash(dateStr + '_sfx')), BOSS_SUFFIXES);
  const weakness = pick(makeRng(stringHash(dateStr + '_wk')),  MUSCLE_GROUPS);
  const emoji    = pick(makeRng(stringHash(dateStr + '_em')),  BOSS_EMOJIS);

  const diffRng  = makeRng(stringHash(dateStr + '_diff'));
  const diffMult = 1 + (diffRng() * 2 - 1) * BOSS_CONFIG.diffVariance;

  const lvl  = Math.max(1, playerLevel);
  const bHP  = Math.floor(BOSS_CONFIG.baseHP   * (0.75 + rng() * 0.5));
  const bATK = Math.floor(BOSS_CONFIG.baseATK  * (0.75 + rng() * 0.5));
  const bSpd = Math.max(1, Math.floor(BOSS_CONFIG.baseSpeed * (0.75 + rng() * 0.5)));

  const maxHP = Math.max(100, Math.floor((bHP  + lvl * BOSS_CONFIG.levelHPScale  + rng() * lvl * BOSS_CONFIG.hpVariance)  * diffMult));
  const atk   = Math.max(3,   Math.floor((bATK + lvl * BOSS_CONFIG.levelATKScale + rng() * lvl * BOSS_CONFIG.atkVariance) * diffMult));
  const speed = Math.floor(bSpd + lvl * BOSS_CONFIG.levelSpeedScale + rng() * 5);

  const diffLabel = diffMult >= 1.10 ? 'HARD' : diffMult <= 0.90 ? 'EASY' : 'NORMAL';

  return {
    id: `boss-daily-${dateStr}`,
    name: bossName(element),
    element, weakness, emoji,
    baseHP: bHP, baseAtk: bATK, baseSpeed: bSpd,
    maxHP, atk, speed, level: lvl, diffMult, diffLabel,
  };
}

// League boss: scales +12% per kill, unique boss per kill count
export function generateLeagueBoss(playerLevel = 1, killCount = 0) {
  const rng      = makeRng(stringHash(`league_boss_${killCount}`));
  const element  = pick(rng, ELEMENTS);
  const prefix   = pick(rng, BOSS_PREFIXES);
  const suffix   = pick(rng, BOSS_SUFFIXES);
  const weakness = pick(rng, MUSCLE_GROUPS);
  const emoji    = pick(rng, BOSS_EMOJIS);

  const lvl       = Math.max(1, playerLevel);
  const scaleMult = 1 + killCount * 0.22;   // +22% per kill: boss #10 = ×3.2, boss #25 = ×6.5
  const tier      = Math.floor(killCount / 5) + 1;

  const maxHP = Math.max(100, Math.floor((BOSS_CONFIG.baseHP  + lvl * BOSS_CONFIG.levelHPScale  * 1.5) * scaleMult));
  const atk   = Math.max(3,   Math.floor((BOSS_CONFIG.baseATK + lvl * BOSS_CONFIG.levelATKScale * 1.5) * scaleMult));
  const speed = Math.max(1,   Math.floor((BOSS_CONFIG.baseSpeed + lvl * BOSS_CONFIG.levelSpeedScale) * (1 + killCount * 0.05)));

  const diffLabel = killCount < 3 ? 'NORMAL' : killCount < 10 ? 'HARD' : killCount < 20 ? 'ELITE' : 'LEGENDARY';

  return {
    id: `boss-league-${killCount}`,
    name: bossName(element),
    element, weakness, emoji,
    baseHP: BOSS_CONFIG.baseHP, baseAtk: BOSS_CONFIG.baseATK, baseSpeed: BOSS_CONFIG.baseSpeed,
    maxHP, atk, speed, level: lvl, diffMult: scaleMult, diffLabel, scaleMult, tier,
  };
}
