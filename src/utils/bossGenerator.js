import {
  BOSS_PREFIXES, BOSS_SUFFIXES, ELEMENTS, MUSCLE_GROUPS, BOSS_EMOJIS, BOSS_CONFIG,
} from '../constants';

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

  const { baseHP, baseATK, baseSpeed } = BOSS_CONFIG;
  const bHP    = Math.floor(baseHP.min  + rng() * (baseHP.max  - baseHP.min));
  const bATK   = Math.floor(baseATK.min + rng() * (baseATK.max - baseATK.min));
  const bSpeed = Math.max(1, Math.floor(baseSpeed.min + rng() * (baseSpeed.max - baseSpeed.min)));

  return {
    id: `boss-${seed}`,
    name: `${prefix} ${suffix}`,
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
  const maxHP = Math.max(30, Math.floor(base.baseHP + lvl * BOSS_CONFIG.levelHPScale + rng() * lvl * BOSS_CONFIG.hpVariance));
  const atk   = Math.max(3,  Math.floor(base.baseAtk + lvl * BOSS_CONFIG.levelATKScale + rng() * lvl * BOSS_CONFIG.atkVariance));
  const speed = Math.floor(base.baseSpeed + lvl * BOSS_CONFIG.levelSpeedScale + rng() * 5);
  return { ...base, maxHP, atk, speed, level: lvl, diffMult: 1, diffLabel: 'NORMAL' };
}

function getBossIndexForKey(key, poolSize) {
  return stringHash(String(key)) % poolSize;
}

export function generateDailyBoss(dateStr, playerLevel = 1) {
  const pool  = generateBossPool();
  const index = getBossIndexForKey(dateStr, pool.length);
  const base  = pool[index];

  // Seeded daily difficulty modifier (±BOSS_CONFIG.diffVariance)
  const diffRng  = makeRng(stringHash(dateStr + '_diff'));
  const diffMult = 1 + (diffRng() * 2 - 1) * BOSS_CONFIG.diffVariance;

  const lvl   = Math.max(1, playerLevel);
  const rng   = makeRng(stringHash(String(dateStr)));
  const maxHP = Math.floor((base.baseHP + lvl * BOSS_CONFIG.levelHPScale  + rng() * lvl * BOSS_CONFIG.hpVariance)  * diffMult);
  const atk   = Math.floor((base.baseAtk + lvl * BOSS_CONFIG.levelATKScale + rng() * lvl * BOSS_CONFIG.atkVariance) * diffMult);
  const speed = Math.floor(base.baseSpeed + lvl * BOSS_CONFIG.levelSpeedScale + rng() * 5);

  // diffLabel: show player a hint
  const diffLabel = diffMult >= 1.10 ? 'HARD' : diffMult <= 0.90 ? 'EASY' : 'NORMAL';

  return { ...base, maxHP, atk, speed, level: lvl, diffMult, diffLabel };
}
