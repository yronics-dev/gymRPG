import { useState, useCallback, useMemo } from 'react';
import { ALL_NODES, NODE_MAP } from '../../data/skilltreeData';

// ── localStorage helpers ─────────────────────────────────────────
function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch { return fallback; }
}
function writeJSON(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// ══════════════════════════════════════════════════════════════════
//  useSkillTree
//
//  STP (Skill Tree Points) rules:
//    +1  on every player level-up       → call awardLevelUpSTP()
//    +2  first time a unique boss name  → call awardBossKillSTP(bossName)
//    ✗   NOT awarded for workouts
// ══════════════════════════════════════════════════════════════════
export function useSkillTree(userPrefix = '_guest_') {
  const STP_KEY    = `${userPrefix}gymrpg_stp`;
  const NODES_KEY  = `${userPrefix}gymrpg_skill_nodes`;
  const BOSSES_KEY = `${userPrefix}gymrpg_boss_first_kills`;

  const [stp, _setSTP]                    = useState(() => readJSON(STP_KEY, 0));
  const [unlockedSkills, _setUnlocked]    = useState(() => readJSON(NODES_KEY, ['start']));
  const [firstKillBosses, _setFirstKills] = useState(() => readJSON(BOSSES_KEY, []));

  // ── Internal STP writer ───────────────────────────────────────
  const _addSTP = useCallback((amount) => {
    _setSTP(prev => {
      const next = prev + amount;
      writeJSON(STP_KEY, next);
      return next;
    });
  }, [STP_KEY]);

  // ── Public STP earners ────────────────────────────────────────

  /** Call when the player gains a level. Awards +1 STP. */
  const awardLevelUpSTP = useCallback(() => {
    _addSTP(1);
  }, [_addSTP]);

  /**
   * Call when a boss is defeated. Awards +2 STP the FIRST time
   * that specific boss name is defeated; nothing on repeats.
   */
  const awardBossKillSTP = useCallback((bossName) => {
    if (!bossName) return;
    _setFirstKills(prev => {
      if (prev.includes(bossName)) return prev;          // already claimed — skip
      const next = [...prev, bossName];
      writeJSON(BOSSES_KEY, next);
      _addSTP(2);
      return next;
    });
  }, [BOSSES_KEY, _addSTP]);

  /** Generic STP award — kept for admin/debug use, not called by gameplay */
  const awardSTP = useCallback((amount) => {
    _addSTP(amount);
  }, [_addSTP]);

  // ── Node state queries ────────────────────────────────────────
  const getNodeState = useCallback((nodeId) => {
    if (unlockedSkills.includes(nodeId)) return 'unlocked';
    const node = NODE_MAP[nodeId];
    if (!node) return 'locked';
    const prereqsMet = node.requires.every(r => unlockedSkills.includes(r));
    return prereqsMet ? 'available' : 'locked';
  }, [unlockedSkills]);

  const canUnlock = useCallback((nodeId) => {
    if (getNodeState(nodeId) !== 'available') return false;
    const node = NODE_MAP[nodeId];
    return node ? stp >= node.cost : false;
  }, [getNodeState, stp]);

  // ── Unlock action ─────────────────────────────────────────────
  const unlock = useCallback((nodeId) => {
    if (!canUnlock(nodeId)) return false;
    const node = NODE_MAP[nodeId];
    if (!node) return false;

    const nextSTP      = stp - node.cost;
    const nextUnlocked = [...unlockedSkills, nodeId];

    writeJSON(STP_KEY, nextSTP);
    writeJSON(NODES_KEY, nextUnlocked);
    _setSTP(nextSTP);
    _setUnlocked(nextUnlocked);
    return true;
  }, [canUnlock, stp, unlockedSkills, STP_KEY, NODES_KEY]);

  // ── Derived combat stats from all unlocked nodes ──────────────
  const derivedStats = useMemo(() => {
    const s = {
      // numeric accumulators
      atkMult:       0,
      critBonus:     0,
      dodgeBonus:    0,
      defBonus:      0,
      hpBonus:       0,
      hpMult:        0,
      lifeSteal:     0,
      elemDmg:       0,
      reflect:       0,
      hpRegen:       0,
      poisonDmg:     0,
      counterBonus:  0,
      agiBonus:      0,
      spellDmg:      0,
      lowHpDmg:      0,
      executioner:   0,
      weakDmg:       0,
      poisonChance:  0,
      debuffChance:  0,
      critDefPen:    0,
      // boolean flags
      furyProc:        false,
      godOfWar:        false,
      stoneWall:       false,
      unbreakable:     false,
      lastStand:       false,
      ghostStep:       false,
      deathMark:       false,
      phantomKiller:   false,
      venomStrike:     false,
      arcaneSurge:     false,
      arcaneAscendant: false,
      // ability list
      abilities: [],
    };

    for (const nodeId of unlockedSkills) {
      const node = NODE_MAP[nodeId];
      if (!node) continue;
      const fx = node.effects || {};

      // numeric
      if (fx.atkMult)       s.atkMult       += fx.atkMult;
      if (fx.critBonus)     s.critBonus     += fx.critBonus;
      if (fx.critDefPen)    s.critDefPen    += fx.critDefPen;
      if (fx.dodgeBonus)    s.dodgeBonus    += fx.dodgeBonus;
      if (fx.defBonus)      s.defBonus      += fx.defBonus;
      if (fx.hpBonus)       s.hpBonus       += fx.hpBonus;
      if (fx.hpMult)        s.hpMult        += fx.hpMult;
      if (fx.lifeSteal)     s.lifeSteal     += fx.lifeSteal;
      if (fx.elemDmg)       s.elemDmg       += fx.elemDmg;
      if (fx.reflect)       s.reflect       += fx.reflect;
      if (fx.hpRegen)       s.hpRegen       += fx.hpRegen;
      if (fx.poisonDmg)     s.poisonDmg     += fx.poisonDmg;
      if (fx.counterBonus)  s.counterBonus  += fx.counterBonus;
      if (fx.agiBonus)      s.agiBonus      += fx.agiBonus;
      if (fx.spellDmg)      s.spellDmg      += fx.spellDmg;
      if (fx.lowHpDmg)      s.lowHpDmg      += fx.lowHpDmg;
      if (fx.executioner)   s.executioner   += fx.executioner;
      if (fx.weakDmg)       s.weakDmg       += fx.weakDmg;
      if (fx.poisonChance)  s.poisonChance  += fx.poisonChance;
      if (fx.debuffChance)  s.debuffChance  += fx.debuffChance;

      // boolean
      if (fx.furyProc)        s.furyProc        = true;
      if (fx.godOfWar)        s.godOfWar        = true;
      if (fx.stoneWall)       s.stoneWall       = true;
      if (fx.unbreakable)     s.unbreakable     = true;
      if (fx.lastStand)       s.lastStand       = true;
      if (fx.ghostStep)       s.ghostStep       = true;
      if (fx.deathMark)       s.deathMark       = true;
      if (fx.phantomKiller)   s.phantomKiller   = true;
      if (fx.venomStrike)     s.venomStrike     = true;
      if (fx.arcaneSurge)     s.arcaneSurge     = true;
      if (fx.arcaneAscendant) s.arcaneAscendant = true;

      // abilities
      if (fx.ability) s.abilities.push(fx.ability);
    }

    return s;
  }, [unlockedSkills]);

  return {
    stp,
    awardSTP,
    awardLevelUpSTP,
    awardBossKillSTP,
    unlockedSkills,
    getNodeState,
    canUnlock,
    unlock,
    derivedStats,
    firstKillBosses,
  };
}
