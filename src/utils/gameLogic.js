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

export function getPlayerBattleStats(muscleXP, statUpgrades = {}, equippedItems = {}, purchasedSkills = [], classBonuses = {}, skillTreeStats = {}) {
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

  // Class bonuses
  const classATK   = classBonuses.atk   || 0;
  const classDEF   = classBonuses.def   || 0;
  const classCrit  = classBonuses.crit  || 0;
  const classDodge = classBonuses.dodge || 0;
  const classHP    = classBonuses.hp    || 0;

  // Skill tree numeric bonuses applied to base stats
  const treeATKMult  = skillTreeStats.atkMult    || 0;
  const treeCrit     = skillTreeStats.critBonus  || 0;
  const treeDodge    = skillTreeStats.dodgeBonus || 0;
  const treeDEF      = skillTreeStats.defBonus   || 0;
  const treeHP       = skillTreeStats.hpBonus    || 0;
  const treeHpMult   = skillTreeStats.hpMult     || 0;
  const treeAgiBonus = skillTreeStats.agiBonus   || 0;

  const baseATK  = Math.floor(6 + stats.ATK * 0.55) + atkUp * 3 + lootATK + classATK;
  const baseMaxHP = Math.max(100, 85 + stats.VIT * 6 + hpUp * 15 + lootHP + classHP + treeHP);

  return {
    // ── Base combat stats ──────────────────────────────────────────
    maxHP:    Math.floor(baseMaxHP * (1 + treeHpMult)),
    atk:      Math.floor(baseATK * (1 + treeATKMult)),
    defPct:   Math.min(60, stats.DEF * 0.7 + defUp * 2 + lootDEF + classDEF + treeDEF),
    dodgePct: Math.min(40, stats.AGI * 0.5 + dodgeUp + lootDodge + classDodge + treeDodge),
    staPct:   Math.min(30, stats.STA * 0.5),
    speed:    Math.floor(stats.AGI * (1 + treeAgiBonus)),
    critPct:  Math.min(50, 10 + lckUp * 2 + lootCrit + classCrit + treeCrit),
    luckPct:  lckUp * 2,
    // ── Skill tree flags bundled for runBattleTurn ─────────────────
    treeLifeSteal:      skillTreeStats.lifeSteal     || 0,
    treeReflect:        skillTreeStats.reflect        || 0,
    treeHpRegen:        skillTreeStats.hpRegen        || 0,
    treeElemDmg:        skillTreeStats.elemDmg        || 0,
    treeWeakDmg:        skillTreeStats.weakDmg        || 0,
    treeCounterBonus:   skillTreeStats.counterBonus   || 0,
    treeLowHpDmg:       skillTreeStats.lowHpDmg       || 0,
    treeExecutioner:    skillTreeStats.executioner    || 0,
    treeCritDefPen:     skillTreeStats.critDefPen     || 0,
    treePoisonDmg:      skillTreeStats.poisonDmg      || 0,
    treePoisonChance:   skillTreeStats.poisonChance   || 0,
    treeLastStand:      !!skillTreeStats.lastStand,
    treeGhostStep:      !!skillTreeStats.ghostStep,
    treeVenomStrike:    !!skillTreeStats.venomStrike,
    treeFuryProc:       !!skillTreeStats.furyProc,
    treeGodOfWar:       !!skillTreeStats.godOfWar,
    treeStoneWall:      !!skillTreeStats.stoneWall,
    treeUnbreakable:    !!skillTreeStats.unbreakable,
    treePhantomKiller:  !!skillTreeStats.phantomKiller,
    treeArcaneSurge:    !!skillTreeStats.arcaneSurge,
    treeArcaneAscendant:!!skillTreeStats.arcaneAscendant,
    treeDeathMark:      !!skillTreeStats.deathMark,
  };
}

// Total XP multiplier from skills (stacks additively)
export function getSkillXPMultiplier(purchasedSkills = []) {
  const skillDefs = SKILLS.filter(s => purchasedSkills.includes(s.id) && s.effect === 'xpMult');
  return 1 + skillDefs.reduce((a, s) => a + s.val, 0);
}

/*
  runBattleTurn — returns split phase data for visual display.
  fightState is a mutable ref object persisted across turns by the caller.
  It must be initialized with initFightState() at the start of each fight.
*/
export function initFightState() {
  return {
    stoneWallUsed:       false,
    unbreakableUsed:     false,
    unbreakableBuffTurns:0,
    furyProcActive:      false,
    godOfWarCount:       0,
    phantomCount:        0,
    arcaneSurgeCount:    0,
    poisonActive:        false,
    poisonDmgPct:        0,
    poisonTurns:         0,
  };
}

export function runBattleTurn(playerHP, bossHP, pStats, boss, hasWeaknessBonus, bossHPPercent = 100, fightState = {}) {
  const events = [];
  let ph = playerHP, bh = bossHP;

  const {
    atk: baseATK, defPct: baseDefPct, dodgePct: baseDodgePct, staPct,
    speed, critPct = 10, luckPct = 0, maxHP,
    // Tree flags
    treeLifeSteal = 0, treeReflect = 0, treeHpRegen = 0,
    treeElemDmg = 0, treeWeakDmg = 0, treeCounterBonus = 0,
    treeLowHpDmg = 0, treeExecutioner = 0, treeCritDefPen = 0,
    treePoisonDmg = 0, treePoisonChance = 0,
    treeLastStand = false, treeGhostStep = false, treeVenomStrike = false,
    treeFuryProc = false, treeGodOfWar = false, treeStoneWall = false,
    treeUnbreakable = false, treePhantomKiller = false, treeArcaneSurge = false,
    treeArcaneAscendant = false, treeDeathMark = false,
  } = pStats;

  const hpPct           = (ph / maxHP) * 100;
  const adrenalineActive = hpPct <= 20;
  const lastStandActive  = treeLastStand && hpPct <= 20;

  // ── Effective per-turn ATK (includes unbreakable buff) ──────────────────
  let pATK = baseATK;
  if (lastStandActive)                          pATK = Math.floor(pATK * 1.20);
  if ((fightState.unbreakableBuffTurns || 0) > 0) {
    pATK = Math.floor(pATK * 1.50);
    fightState.unbreakableBuffTurns--;
  }

  // ── Effective DEF / dodge with tree buffs ────────────────────────────────
  const defPct   = Math.min(75, baseDefPct + (lastStandActive ? 30 : 0));
  const dodgePct = baseDodgePct;   // ghost step handled per-attack below

  // arcane ascendant: always counts as weakness bonus
  const effectiveWeakness = hasWeaknessBonus || treeArcaneAscendant;

  const bossRageActive = bossHPPercent <= 50;
  const bossATK        = bossRageActive ? Math.floor(boss.atk * 1.35) : boss.atk;
  const lockedInChance = 12 + luckPct;

  // ── HP Regen (start of player turn) ─────────────────────────────────────
  if (treeHpRegen > 0 && ph < maxHP) {
    const regen = Math.min(Math.floor(maxHP * treeHpRegen), maxHP - ph);
    if (regen > 0) {
      ph += regen;
      events.push({ type: 'stamina', text: `HP REGEN +${regen}!`, val: regen, effect: 'stamina' });
    }
  }

  // ── Poison tick ──────────────────────────────────────────────────────────
  if (fightState.poisonActive && (fightState.poisonTurns || 0) > 0) {
    const ptick = Math.max(1, Math.floor(boss.maxHP * (fightState.poisonDmgPct || 0.06)));
    bh = Math.max(0, bh - ptick);
    fightState.poisonTurns--;
    if (fightState.poisonTurns <= 0) fightState.poisonActive = false;
    events.push({ type: 'stamina', text: `☠ POISON! ${ptick} toxic damage!`, val: ptick, effect: 'stamina' });
  }

  const playerFirst = speed >= boss.speed;

  // ════════════════════════════════════════════════
  //  PLAYER ATTACKS BOSS
  // ════════════════════════════════════════════════
  function playerAttack() {
    // Per-attack counters
    if (treeGodOfWar)      fightState.godOfWarCount    = ((fightState.godOfWarCount    || 0) + 1);
    if (treePhantomKiller) fightState.phantomCount     = ((fightState.phantomCount     || 0) + 1);
    if (treeArcaneSurge)   fightState.arcaneSurgeCount = ((fightState.arcaneSurgeCount || 0) + 1);

    // ── PHANTOM KILLER: every 4th attack deals 400% dmg ─────────────────
    if (treePhantomKiller && fightState.phantomCount % 4 === 0) {
      const pdmg = Math.floor(pATK * 4.0);
      bh = Math.max(0, bh - pdmg);
      events.push({ type: 'crit', text: `⚡ PHANTOM KILLER! ${pdmg} damage!`, val: pdmg, effect: 'crit' });
      if (treeVenomStrike) {
        fightState.poisonActive = true;
        fightState.poisonDmgPct = (treePoisonDmg || 0.06) * 3;
        fightState.poisonTurns  = 3;
        events.push({ type: 'info', text: '☠ PHANTOM VENOM! Triple poison stacked!', effect: 'weakness' });
      }
      return;
    }

    // ── Base damage ──────────────────────────────────────────────────────
    let dmg = Math.floor(pATK * (0.85 + Math.random() * 0.30));

    // Boss HP threshold bonuses
    const bossHPNow = (bh / boss.maxHP) * 100;
    if (treeLowHpDmg  > 0 && bossHPNow < 50) dmg = Math.floor(dmg * (1 + treeLowHpDmg));
    if (treeExecutioner > 0 && bossHPNow < 25) dmg = Math.floor(dmg * (1 + treeExecutioner));

    // Death Mark: +20% to marked target
    if (treeDeathMark) dmg = Math.floor(dmg * 1.20);

    // ── Crit determination ────────────────────────────────────────────────
    let isCrit = false;
    if      (fightState.furyProcActive)                                  { isCrit = true; fightState.furyProcActive = false; }
    else if (treeGodOfWar && fightState.godOfWarCount % 3 === 0)         { isCrit = true; }
    else                                                                   { isCrit = Math.random() * 100 < critPct; }

    let eventEffect = 'hit';
    if (adrenalineActive) { dmg = Math.floor(dmg * 1.25); eventEffect = 'adrenaline'; }
    if (isCrit) {
      let critMult = 1.5;
      if (treeGodOfWar && fightState.godOfWarCount % 3 === 0) critMult += 0.30; // god of war crit = ignore 30% DEF
      if (treeCritDefPen > 0) critMult += treeCritDefPen;
      dmg = Math.floor(dmg * critMult);
      eventEffect = 'crit';
      if (treeFuryProc) fightState.furyProcActive = true; // next attack auto-crits
    }

    // ── Weakness / elemental bonus ─────────────────────────────────────────
    if (effectiveWeakness) {
      const weakTotal = WEAKNESS_BONUS_MULTIPLIER - 1 + treeWeakDmg
        + (treeArcaneAscendant ? treeElemDmg : 0);
      dmg = Math.floor(dmg * (1 + weakTotal));
      events.push({ type: 'weakness', text: `WEAKNESS! +${Math.round(weakTotal * 100)}%!`, effect: 'weakness' });
    } else if (treeElemDmg > 0) {
      dmg = Math.floor(dmg * (1 + treeElemDmg));
    }

    // ── Confusion self-hit (4% chance) ────────────────────────────────────
    if (Math.random() < 0.04) {
      const selfDmg = Math.max(1, Math.floor(pATK * 0.25));
      ph = Math.max(0, ph - selfDmg);
      events.push({ type: 'selfhit', text: `CONFUSED! Hit yourself for ${selfDmg}!`, val: selfDmg, effect: 'selfhit' });
      return;
    }

    bh = Math.max(0, bh - dmg);

    if      (eventEffect === 'crit')       events.push({ type: 'crit',       text: `CRITICAL HIT! ${dmg} damage!`,    val: dmg, effect: 'crit' });
    else if (eventEffect === 'adrenaline') events.push({ type: 'adrenaline', text: `ADRENALINE RUSH! ${dmg} damage!`, val: dmg, effect: 'adrenaline' });
    else                                   events.push({ type: 'player',     text: `You strike for ${dmg} damage!`,   val: dmg, effect: 'hit' });

    // ── Life steal ────────────────────────────────────────────────────────
    if (treeLifeSteal > 0) {
      const healed = Math.max(1, Math.floor(dmg * treeLifeSteal));
      ph = Math.min(maxHP, ph + healed);
      if (healed >= 2) events.push({ type: 'stamina', text: `Life drain +${healed} HP!`, val: healed, effect: 'stamina' });
    }

    // ── Arcane surge: every 5th hit = free elemental explosion ────────────
    if (treeArcaneSurge && fightState.arcaneSurgeCount % 5 === 0) {
      const surge = Math.max(1, Math.floor(pATK * (0.80 + treeElemDmg)));
      bh = Math.max(0, bh - surge);
      events.push({ type: 'weakness', text: `✦ ARCANE SURGE! +${surge} elemental!`, val: surge, effect: 'weakness' });
    }

    // ── Venom strike / poison proc ────────────────────────────────────────
    if (treeVenomStrike && !fightState.poisonActive && Math.random() < 0.85) {
      fightState.poisonActive = true;
      fightState.poisonDmgPct = treePoisonDmg || 0.06;
      fightState.poisonTurns  = 3;
      events.push({ type: 'info', text: '☠ VENOM STRIKE! Boss poisoned for 3 turns!', effect: 'weakness' });
    } else if (treePoisonChance > 0 && !fightState.poisonActive && Math.random() < treePoisonChance) {
      fightState.poisonActive = true;
      fightState.poisonDmgPct = treePoisonDmg || 0.03;
      fightState.poisonTurns  = 2;
      events.push({ type: 'info', text: '☠ POISON applied!', effect: 'weakness' });
    }

    // ── Stamina extra strike ───────────────────────────────────────────────
    if (Math.random() * 100 < staPct) {
      const bonus = Math.floor(pATK * 0.55 * (0.85 + Math.random() * 0.30));
      bh = Math.max(0, bh - bonus);
      events.push({ type: 'stamina', text: `Stamina surge! +${bonus}!`, val: bonus, effect: 'stamina' });
    }
  }

  // ════════════════════════════════════════════════
  //  BOSS ATTACKS PLAYER
  // ════════════════════════════════════════════════
  function bossAttack() {
    const rawDmg     = Math.floor(bossATK * (0.85 + Math.random() * 0.30));
    const totalDodge = dodgePct + luckPct * 0.5;

    // ── Ghost Step: 25% chance to phase through + backstab ───────────────
    if (treeGhostStep && Math.random() < 0.25) {
      events.push({ type: 'dodge', text: '👻 GHOST STEP! Phased through the strike!', effect: 'dodge' });
      const backstab = Math.max(1, Math.floor(pATK * 0.60));
      bh = Math.max(0, bh - backstab);
      events.push({ type: 'player', text: `Ghost backstab! ${backstab} damage!`, val: backstab, effect: 'hit' });
      return;
    }

    // ── Regular dodge ────────────────────────────────────────────────────
    if (Math.random() * 100 < totalDodge) {
      events.push({ type: 'dodge', text: 'DODGED! Nimble as lightning!', effect: 'dodge' });
      if (treeCounterBonus > 0) {
        const counter = Math.max(1, Math.floor(pATK * (0.30 + treeCounterBonus)));
        bh = Math.max(0, bh - counter);
        events.push({ type: 'stamina', text: `Counter strike! ${counter} damage!`, val: counter, effect: 'stamina' });
      }
      return;
    }

    // ── Stone Wall: negate one hit per fight ─────────────────────────────
    if (treeStoneWall && !fightState.stoneWallUsed) {
      fightState.stoneWallUsed = true;
      events.push({ type: 'block', text: '🪨 STONE WALL! Attack completely negated!', val: 0, effect: 'block' });
      if (treeReflect > 0) {
        const ref = Math.max(1, Math.floor(rawDmg * treeReflect));
        bh = Math.max(0, bh - ref);
        events.push({ type: 'stamina', text: `REFLECT! ${ref} back at them!`, val: ref, effect: 'stamina' });
      }
      return;
    }

    // ── Block chance ─────────────────────────────────────────────────────
    const blockChance = defPct > 10 ? 20 + luckPct * 0.5 : 0;
    if (Math.random() * 100 < blockChance) {
      const blockDmg = Math.max(1, Math.floor(rawDmg * 0.25));
      ph = Math.max(0, ph - blockDmg);
      events.push({ type: 'block', text: `BLOCKED! Only ${blockDmg} chip damage!`, val: blockDmg, effect: 'block' });
      if (treeReflect > 0) {
        const ref = Math.max(1, Math.floor(rawDmg * treeReflect));
        bh = Math.max(0, bh - ref);
        events.push({ type: 'stamina', text: `REFLECT! ${ref} back!`, val: ref, effect: 'stamina' });
      }
      return;
    }

    // ── Full hit ──────────────────────────────────────────────────────────
    const dmg = Math.max(1, Math.floor(rawDmg * (1 - defPct / 100)));

    // Unbreakable: survive one killing blow
    if (treeUnbreakable && !fightState.unbreakableUsed && ph - dmg <= 0 && ph > 1) {
      fightState.unbreakableUsed     = true;
      fightState.unbreakableBuffTurns = 2;
      ph = 1;
      events.push({ type: 'block',     text: '💎 UNBREAKABLE! Survived a killing blow at 1 HP!', val: 0, effect: 'block' });
      events.push({ type: 'adrenaline',text: 'FURY IGNITED! +50% ATK for 2 turns!',              val: 0, effect: 'adrenaline' });
      return;
    }

    ph = Math.max(0, ph - dmg);

    // Reflect on full hit
    if (treeReflect > 0) {
      const ref = Math.max(1, Math.floor(rawDmg * treeReflect));
      bh = Math.max(0, bh - ref);
      events.push({ type: 'stamina', text: `REFLECT! ${ref} damage reflected!`, val: ref, effect: 'stamina' });
    }

    if (bossRageActive)
      events.push({ type: 'boss_rage', text: `RAGE! ${boss.name} slams for ${dmg}!`, val: dmg, effect: 'rage' });
    else
      events.push({ type: 'boss',      text: `${boss.name} hits for ${dmg}!`,        val: dmg, effect: 'hit' });

    if (dmg > maxHP * 0.25)
      events.push({ type: 'injury', text: 'INJURED! Took a massive hit!', effect: 'injury' });
  }

  // ── Turn structure (split into two phases for animation) ────────────────
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
