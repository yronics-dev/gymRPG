import { MUSCLE_TO_STAT, MUSCLE_GROUPS, WEAKNESS_BONUS_MULTIPLIER, MUSCLE_RANKS, SKILLS } from '../constants';

export const INITIAL_MUSCLE_XP = Object.fromEntries(MUSCLE_GROUPS.map(m => [m, 0]));

export function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function isCardioExercise(muscleGroup) {
  return muscleGroup === 'Cardio';
}

export function getVolumeByMuscle(exercises) {
  const vol = {};
  for (const ex of exercises) {
    let v;
    if (isCardioExercise(ex.muscleGroup)) {
      // Cardio: duration (minutes) * distance (km) * 60  → seconds * km approximation
      v = ex.sets.reduce((s, set) => {
        const secs = (set.duration || 0) * 60;
        const dist = set.distance || 0;
        return s + secs * dist;
      }, 0);
    } else {
      v = ex.sets.reduce((s, set) => s + (set.weight || 0) * (set.reps || 0), 0);
    }
    vol[ex.muscleGroup] = (vol[ex.muscleGroup] || 0) + v;
  }
  return vol;
}

export function xpFromVolume(volume) {
  return volume / 10;
}

// ─── 7% per-level XP scaling ──────────────────────────────────────────────────
// Level n requires: round(1000 * 1.07^n / 100) * 100 XP to advance
export function xpForLevel(n) {
  return Math.round(1000 * Math.pow(1.07, n) / 100) * 100;
}

// Cumulative XP needed to REACH level n (i.e., sum of xpForLevel(0..n-1))
export function totalXpForLevel(n) {
  let total = 0;
  for (let i = 0; i < n; i++) total += xpForLevel(i);
  return total;
}

export function getLevel(muscleXP) {
  const totalXP = getTotalXP(muscleXP);
  let level = 0;
  let accumulated = 0;
  while (totalXP >= accumulated + xpForLevel(level)) {
    accumulated += xpForLevel(level);
    level++;
    if (level > 999) break; // safety cap
  }
  return level;
}

// XP progress within the current level (0..xpForLevel(level))
export function getXPInCurrentLevel(muscleXP) {
  const totalXP = getTotalXP(muscleXP);
  const level = getLevel(muscleXP);
  const base = totalXpForLevel(level);
  return totalXP - base;
}

export function statFromXP(xp) {
  return Math.floor(Math.log(1 + xp / 50) * 8);
}

export function getStatXP(muscleXP) {
  const statXP = { ATK: 0, VIT: 0, DEF: 0, AGI: 0, STA: 0 };
  for (const [muscle, xp] of Object.entries(muscleXP)) {
    const stat = MUSCLE_TO_STAT[muscle];
    if (stat) statXP[stat] += xp;
  }
  return statXP;
}

export function getStats(muscleXP) {
  const statXP = getStatXP(muscleXP);
  return Object.fromEntries(
    Object.entries(statXP).map(([s, xp]) => [s, statFromXP(xp)])
  );
}

export function getTotalXP(muscleXP) {
  return Object.values(muscleXP).reduce((a, b) => a + b, 0);
}

export function getSpriteStage(level) {
  if (level >= 200) return 6;
  if (level >= 150) return 5;
  if (level >= 100) return 4;
  if (level >= 50)  return 3;
  if (level >= 25)  return 2;
  return 1;
}

// ─── Muscle rank helpers ───────────────────────────────────────────────────────
export function getMuscleRank(xp) {
  let rank = MUSCLE_RANKS[0];
  for (const r of MUSCLE_RANKS) {
    if (xp >= r.min) rank = r;
    else break;
  }
  return rank;
}

export function getMuscleRankIndex(xp) {
  let idx = 0;
  for (let i = 0; i < MUSCLE_RANKS.length; i++) {
    if (xp >= MUSCLE_RANKS[i].min) idx = i;
    else break;
  }
  return idx;
}

export function getMuscleRankProgress(xp) {
  const idx = getMuscleRankIndex(xp);
  const current = MUSCLE_RANKS[idx];
  const next    = MUSCLE_RANKS[idx + 1];
  if (!next) return 1; // max rank
  return (xp - current.min) / (next.min - current.min);
}

export function getPlayerBattleStats(muscleXP, statUpgrades = {}, equippedItems = {}, purchasedSkills = [], classBonuses = {}) {
  const stats   = getStats(muscleXP);
  const atkUp   = statUpgrades.ATK   || 0;
  const defUp   = statUpgrades.DEF   || 0;
  const hpUp    = statUpgrades.HP    || 0;
  const lckUp   = statUpgrades.LCK   || 0;
  const dodgeUp = statUpgrades.DODGE || 0;

  // Loot bonuses from equipped items
  const items = Object.values(equippedItems).filter(Boolean);
  const lootATK   = items.reduce((s, it) => s + (it.atk   || 0), 0);
  const lootDEF   = items.reduce((s, it) => s + (it.def   || 0), 0);
  const lootHP    = items.reduce((s, it) => s + (it.hp    || 0), 0);
  const lootCrit  = items.reduce((s, it) => s + (it.crit  || 0), 0);
  const lootDodge = items.reduce((s, it) => s + (it.dodge || 0), 0);

  // Skill tree bonuses
  const skillDefs = SKILLS.filter(s => purchasedSkills.includes(s.id));
  const skillHP    = skillDefs.filter(s => s.effect === 'hp').reduce((a, s) => a + s.val, 0);
  const skillATK   = (classBonuses.atk || 0);
  const skillDEF   = skillDefs.filter(s => s.effect === 'def').reduce((a, s) => a + s.val, 0) + (classBonuses.def || 0);
  const skillCrit  = skillDefs.filter(s => s.effect === 'crit').reduce((a, s) => a + s.val, 0) + (classBonuses.crit || 0);
  const skillDodge = skillDefs.filter(s => s.effect === 'dodge').reduce((a, s) => a + s.val, 0) + (classBonuses.dodge || 0);
  const classHP    = classBonuses.hp || 0;

  return {
    maxHP:    Math.max(100, 85 + stats.VIT * 6 + hpUp * 15 + lootHP + skillHP + classHP),
    atk:      Math.floor(8 + stats.ATK * 1.0) + atkUp * 3 + lootATK + skillATK,
    defPct:   Math.min(60, stats.DEF * 0.7 + defUp * 2 + lootDEF + skillDEF),
    dodgePct: Math.min(40, stats.AGI * 0.5 + dodgeUp + lootDodge + skillDodge),
    staPct:   Math.min(30, stats.STA * 0.5),
    speed:    stats.AGI,
    critPct:  Math.min(50, 10 + lckUp * 2 + lootCrit + skillCrit),
    luckPct:  lckUp * 2,
  };
}

// Total XP multiplier from skills (stacks additively)
export function getSkillXPMultiplier(purchasedSkills = []) {
  const skillDefs = SKILLS.filter(s => purchasedSkills.includes(s.id) && s.effect === 'xpMult');
  return 1 + skillDefs.reduce((a, s) => a + s.val, 0);
}

/*
  runBattleTurn — returns split phase data for visual display
*/
export function runBattleTurn(playerHP, bossHP, pStats, boss, hasWeaknessBonus, bossHPPercent = 100) {
  const events = [];
  let ph = playerHP, bh = bossHP;

  const { atk: pATK, defPct, dodgePct, staPct, speed, critPct = 10, luckPct = 0 } = pStats;
  const playerFirst = speed >= boss.speed;

  const maxHP = pStats.maxHP;
  const hpPct = (ph / maxHP) * 100;
  const adrenalineActive = hpPct <= 20;
  const bossRageActive   = bossHPPercent <= 50;
  const bossATK = bossRageActive ? Math.floor(boss.atk * 1.35) : boss.atk;
  const lockedInChance = 12 + luckPct;

  function playerAttack() {
    let dmg = Math.floor(pATK * (0.85 + Math.random() * 0.30));
    const isCrit = Math.random() * 100 < critPct;
    let eventEffect = 'hit';

    if (adrenalineActive) { dmg = Math.floor(dmg * 1.5); eventEffect = 'adrenaline'; }
    if (isCrit)           { dmg = Math.floor(dmg * 2);   eventEffect = 'crit'; }

    if (hasWeaknessBonus) {
      dmg = Math.floor(dmg * WEAKNESS_BONUS_MULTIPLIER);
      events.push({ type: 'weakness', text: 'WEAKNESS BONUS! +25%!', effect: 'weakness' });
    }

    if (Math.random() < 0.04) {
      const selfDmg = Math.max(1, Math.floor(pATK * 0.25));
      ph = Math.max(0, ph - selfDmg);
      events.push({ type: 'selfhit', text: `CONFUSED! Hit yourself for ${selfDmg}!`, val: selfDmg, effect: 'selfhit' });
      return;
    }

    bh = Math.max(0, bh - dmg);

    if (eventEffect === 'crit')
      events.push({ type: 'crit',       text: `CRITICAL HIT! ${dmg} damage!`,       val: dmg, effect: 'crit' });
    else if (eventEffect === 'adrenaline')
      events.push({ type: 'adrenaline', text: `ADRENALINE RUSH! ${dmg} damage!`,    val: dmg, effect: 'adrenaline' });
    else
      events.push({ type: 'player',     text: `You strike for ${dmg} damage!`,          val: dmg, effect: 'hit' });

    if (Math.random() * 100 < staPct) {
      const bonus = Math.floor(pATK * 0.55 * (0.85 + Math.random() * 0.30));
      bh = Math.max(0, bh - bonus);
      events.push({ type: 'stamina', text: `Stamina surge! +${bonus}!`, val: bonus, effect: 'stamina' });
    }
  }

  function bossAttack() {
    const rawDmg = Math.floor(bossATK * (0.85 + Math.random() * 0.30));
    const totalDodge = dodgePct + luckPct * 0.5;

    if (Math.random() * 100 < totalDodge) {
      events.push({ type: 'dodge', text: 'DODGED! Nimble as lightning!', effect: 'dodge' });
      return;
    }

    const blockChance = defPct > 10 ? 20 + luckPct * 0.5 : 0;
    if (Math.random() * 100 < blockChance) {
      const blockDmg = Math.max(1, Math.floor(rawDmg * 0.25));
      ph = Math.max(0, ph - blockDmg);
      events.push({ type: 'block', text: `BLOCKED! Only ${blockDmg} chip damage!`, val: blockDmg, effect: 'block' });
      return;
    }

    const dmg = Math.max(1, Math.floor(rawDmg * (1 - defPct / 100)));
    ph = Math.max(0, ph - dmg);

    if (bossRageActive)
      events.push({ type: 'boss_rage', text: `RAGE! ${boss.name} slams for ${dmg}!`, val: dmg, effect: 'rage' });
    else
      events.push({ type: 'boss',      text: `${boss.name} hits for ${dmg}!`,            val: dmg, effect: 'hit' });

    if (dmg > maxHP * 0.25)
      events.push({ type: 'injury', text: 'INJURED! Took a massive hit!', effect: 'injury' });
  }

  let phase1PlayerHP, phase1BossHP;

  if (playerFirst) {
    playerAttack();
    phase1PlayerHP = ph; phase1BossHP = bh;
    const splitAt = events.length;
    if (bh > 0) bossAttack();
    const tookBossDmg = events.slice(splitAt).some(ev => ev.type === 'boss' || ev.type === 'boss_rage');
    if (!tookBossDmg && Math.random() * 100 < lockedInChance)
      events.push({ type: 'lockedin', text: 'LOCKED IN! Momentum rising!', effect: 'lockedin' });
    const status = bh <= 0 ? 'victory' : ph <= 0 ? 'defeat' : 'ongoing';
    return { playerHP: ph, bossHP: bh, events, status, bossRageActive,
      phase1Events: events.slice(0, splitAt), phase2Events: events.slice(splitAt),
      phase1PlayerHP, phase1BossHP, playerFirst };
  } else {
    bossAttack();
    phase1PlayerHP = ph; phase1BossHP = bh;
    const splitAt = events.length;
    if (ph > 0) playerAttack();
    const tookBossDmg = events.slice(0, splitAt).some(ev => ev.type === 'boss' || ev.type === 'boss_rage');
    if (!tookBossDmg && Math.random() * 100 < lockedInChance)
      events.push({ type: 'lockedin', text: 'LOCKED IN! Momentum rising!', effect: 'lockedin' });
    const status = bh <= 0 ? 'victory' : ph <= 0 ? 'defeat' : 'ongoing';
    return { playerHP: ph, bossHP: bh, events, status, bossRageActive,
      phase1Events: events.slice(0, splitAt), phase2Events: events.slice(splitAt),
      phase1PlayerHP, phase1BossHP, playerFirst };
  }
}

export function getWeaknessWarnings(muscleXP) {
  const warnings = [];
  for (const [muscle, xp] of Object.entries(muscleXP)) {
    if (xp < 200) warnings.push(muscle);
  }
  return warnings;
}

export function playBeep(freq = 880, duration = 0.5) {
  try {
    const ctx  = new (window.AudioContext || window.webkitAudioContext)();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch (_) {}
}
