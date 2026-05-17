import { useState, useCallback, useMemo } from 'react';
import { SKILL_TREES, getNodeById } from '../../data/skilltrees';

// ── localStorage helpers ─────────────────────────────────────────────────────
function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch { return fallback; }
}
function writeJSON(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useSkillTree(userPrefix = '_guest_') {
  const STP_KEY   = `${userPrefix}gymrpg_stp`;
  const NODES_KEY = `${userPrefix}gymrpg_skill_nodes`;

  // Seed new players with 3 STP so they can unlock tier-1 nodes immediately
  const [stp, _setSTP] = useState(() => readJSON(STP_KEY, 3));
  const [unlockedSkills, _setUnlocked] = useState(() => readJSON(NODES_KEY, []));

  // ── Writes ────────────────────────────────────────────────────────────────
  const awardSTP = useCallback((amount) => {
    _setSTP(prev => {
      const next = prev + amount;
      writeJSON(STP_KEY, next);
      return next;
    });
  }, [STP_KEY]);

  // ── Queries ───────────────────────────────────────────────────────────────
  const getNodeState = useCallback((nodeId) => {
    if (unlockedSkills.includes(nodeId)) return 'unlocked';
    const hit = getNodeById(nodeId);
    if (!hit) return 'locked';
    const prereqsMet = hit.node.requires.every(r => unlockedSkills.includes(r));
    return prereqsMet ? 'available' : 'locked';
  }, [unlockedSkills]);

  const canUnlock = useCallback((nodeId) => {
    if (getNodeState(nodeId) !== 'available') return false;
    const hit = getNodeById(nodeId);
    return hit ? stp >= hit.node.cost : false;
  }, [getNodeState, stp]);

  // ── Unlock action ─────────────────────────────────────────────────────────
  const unlock = useCallback((nodeId) => {
    if (!canUnlock(nodeId)) return false;
    const hit = getNodeById(nodeId);
    if (!hit) return false;

    const nextSTP     = stp - hit.node.cost;
    const nextUnlocked = [...unlockedSkills, nodeId];

    writeJSON(STP_KEY, nextSTP);
    writeJSON(NODES_KEY, nextUnlocked);
    _setSTP(nextSTP);
    _setUnlocked(nextUnlocked);
    return true;
  }, [canUnlock, stp, unlockedSkills, STP_KEY, NODES_KEY]);

  // ── Derived data ──────────────────────────────────────────────────────────
  const getActiveAbilities = useCallback(() =>
    SKILL_TREES.flatMap(t => t.nodes)
      .filter(n => n.abilityUnlock && unlockedSkills.includes(n.id))
      .map(n => n.abilityUnlock),
    [unlockedSkills],
  );

  // Aggregate all stat bonuses from unlocked nodes
  const derivedStats = useMemo(() => {
    const s = {
      atkBonus: 0, atkMult: 0,
      critBonus: 0, critMult: 0,
      dodgeBonus: 0, defBonus: 0,
      hpBonus: 0, lifeSteal: 0,
      furyAtk: 0, rampageAtk: 0,
    };
    for (const nodeId of unlockedSkills) {
      const hit = getNodeById(nodeId);
      if (!hit) continue;
      const fx = hit.node.effects;
      if (fx.atkBonus)   s.atkBonus   += fx.atkBonus;
      if (fx.atkMult)    s.atkMult    += fx.atkMult;
      if (fx.critBonus)  s.critBonus  += fx.critBonus;
      if (fx.critMult)   s.critMult   += fx.critMult;
      if (fx.dodgeBonus) s.dodgeBonus += fx.dodgeBonus;
      if (fx.defBonus)   s.defBonus   += fx.defBonus;
      if (fx.hpBonus)    s.hpBonus    += fx.hpBonus;
      if (fx.lifeSteal)  s.lifeSteal  += fx.lifeSteal;
      if (fx.furyAtk)    s.furyAtk    += fx.furyAtk;
      if (fx.rampageAtk) s.rampageAtk += fx.rampageAtk;
    }
    s.abilities = getActiveAbilities();
    return s;
  }, [unlockedSkills, getActiveAbilities]);

  return {
    stp, awardSTP,
    unlockedSkills,
    getNodeState, canUnlock, unlock,
    getActiveAbilities,
    derivedStats,
  };
}
