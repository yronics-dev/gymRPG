import { PLAYER_CLASSES, LEVEL_TITLES } from '../constants';
import { getStats } from './gameLogic';

// Returns the highest class the player qualifies for
export function getPlayerClass(muscleXP, level = 0) {
  const stats = getStats(muscleXP);

  for (const cls of PLAYER_CLASSES) {
    // LEGEND: level gate
    if (cls.id === 'LEGEND' && level >= (cls.levelReq || 100)) return cls;
    // BERSERKER: ATK + AGI
    if (cls.id === 'BERSERKER' && stats.ATK >= (cls.atkReq || 50) && stats.AGI >= (cls.agiReq || 20)) return cls;
    // WARRIOR: ATK
    if (cls.id === 'WARRIOR' && stats.ATK >= (cls.atkReq || 25)) return cls;
    // TANK: DEF + VIT
    if (cls.id === 'TANK' && stats.DEF >= (cls.defReq || 15) && stats.VIT >= (cls.vitReq || 15)) return cls;
    // ROGUE: AGI
    if (cls.id === 'ROGUE' && stats.AGI >= (cls.agiReq || 20)) return cls;
    // NOVICE: always
    if (cls.id === 'NOVICE') return cls;
  }
  return PLAYER_CLASSES.find(c => c.id === 'NOVICE');
}

// Stat threshold to reach each class
export function getClassRequirements() {
  return [
    { id: 'WARRIOR',   label: 'Warrior',   stat: 'ATK', req: 25 },
    { id: 'TANK',      label: 'Tank',       stat: 'DEF', req: 15, stat2: 'VIT', req2: 15 },
    { id: 'ROGUE',     label: 'Rogue',      stat: 'AGI', req: 20 },
    { id: 'BERSERKER', label: 'Berserker',  stat: 'ATK', req: 50, stat2: 'AGI', req2: 20 },
    { id: 'LEGEND',    label: 'Legend',     level: 100 },
  ];
}

// Returns the current title based on level
export function getPlayerTitle(level = 0) {
  let title = LEVEL_TITLES[0];
  for (const t of LEVEL_TITLES) {
    if (level >= t.level) title = t;
    else break;
  }
  return title;
}

// Class passive bonuses applied on top of base stats
export function getClassBonuses(cls) {
  if (!cls) return {};
  switch (cls.id) {
    case 'WARRIOR':   return { atk: 6 };
    case 'TANK':      return { hp: 30, def: 3 };
    case 'ROGUE':     return { dodge: 5 };
    case 'BERSERKER': return { atk: 10, crit: 5 };
    case 'LEGEND':    return { atk: 15, hp: 50 };
    default:          return {};
  }
}
