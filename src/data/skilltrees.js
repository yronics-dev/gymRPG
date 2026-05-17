// ── Skill Tree Data ──────────────────────────────────────────────────────────
// 4 trees × 5 nodes = 20 nodes total
// Node effects feed into derivedStats → applied in getPlayerBattleStats

export const SKILL_TREES = [
  // ────────────────────────────────────────────────────────────────────────────
  // WARRIOR  — red, ATK & crit focused
  // ────────────────────────────────────────────────────────────────────────────
  {
    id: 'warrior',
    label: 'Warrior',
    color: '#c0392b',
    glowColor: '#ff5555',
    nodes: [
      {
        id: 'warrior_1',
        name: 'Heavy Hitter',
        desc: '+10% base ATK. Your strikes land with crushing force.',
        tier: 1, cost: 1,
        x: 0.50, y: 0.10,
        requires: [], abilityUnlock: null,
        effects: { atkMult: 0.10 },
      },
      {
        id: 'warrior_2',
        name: 'Weapon Mastery',
        desc: '+15% ATK. You have mastered the art of the blade.',
        tier: 2, cost: 2,
        x: 0.30, y: 0.28,
        requires: ['warrior_1'], abilityUnlock: null,
        effects: { atkMult: 0.15 },
      },
      {
        id: 'warrior_3',
        name: 'Battle Hardened',
        desc: '+20 max HP. Scars teach you to endure.',
        tier: 3, cost: 2,
        x: 0.65, y: 0.46,
        requires: ['warrior_2'], abilityUnlock: null,
        effects: { hpBonus: 20 },
      },
      {
        id: 'warrior_4',
        name: 'Crushing Blows',
        desc: '+5% critical hit chance. Every strike might be the killing blow.',
        tier: 4, cost: 3,
        x: 0.40, y: 0.65,
        requires: ['warrior_3'], abilityUnlock: null,
        effects: { critBonus: 5 },
      },
      {
        id: 'warrior_5',
        name: 'Berserker Rage',
        desc: 'ABILITY: When HP drops below 30%, your ATK doubles for 3 turns.',
        tier: 5, cost: 4,
        x: 0.55, y: 0.84,
        requires: ['warrior_4'], abilityUnlock: 'berserker_rage',
        effects: {},
      },
    ],
    connections: [
      { from: 'warrior_1', to: 'warrior_2' },
      { from: 'warrior_2', to: 'warrior_3' },
      { from: 'warrior_3', to: 'warrior_4' },
      { from: 'warrior_4', to: 'warrior_5' },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  // SHADOW  — purple, dodge & crit-damage focused
  // ────────────────────────────────────────────────────────────────────────────
  {
    id: 'shadow',
    label: 'Shadow',
    color: '#7c3aed',
    glowColor: '#c084fc',
    nodes: [
      {
        id: 'shadow_1',
        name: 'Shadowstep',
        desc: '+5% dodge chance. You move like a ghost in the dark.',
        tier: 1, cost: 1,
        x: 0.48, y: 0.10,
        requires: [], abilityUnlock: null,
        effects: { dodgeBonus: 5 },
      },
      {
        id: 'shadow_2',
        name: "Assassin's Mark",
        desc: '+8% critical hit chance. You always strike where it hurts.',
        tier: 2, cost: 2,
        x: 0.68, y: 0.28,
        requires: ['shadow_1'], abilityUnlock: null,
        effects: { critBonus: 8 },
      },
      {
        id: 'shadow_3',
        name: 'Dark Reflexes',
        desc: '+8% dodge chance. Your body reacts before your mind does.',
        tier: 3, cost: 2,
        x: 0.32, y: 0.45,
        requires: ['shadow_2'], abilityUnlock: null,
        effects: { dodgeBonus: 8 },
      },
      {
        id: 'shadow_4',
        name: 'Lethal Strike',
        desc: 'Critical hits deal +25% bonus damage. Death comes swiftly.',
        tier: 4, cost: 3,
        x: 0.60, y: 0.64,
        requires: ['shadow_3'], abilityUnlock: null,
        effects: { critMult: 0.25 },
      },
      {
        id: 'shadow_5',
        name: 'Shadow Blink',
        desc: 'ABILITY: 20% chance to fully dodge any attack each turn + 5% dodge.',
        tier: 5, cost: 4,
        x: 0.45, y: 0.84,
        requires: ['shadow_4'], abilityUnlock: 'shadow_blink',
        effects: { dodgeBonus: 5 },
      },
    ],
    connections: [
      { from: 'shadow_1', to: 'shadow_2' },
      { from: 'shadow_2', to: 'shadow_3' },
      { from: 'shadow_3', to: 'shadow_4' },
      { from: 'shadow_4', to: 'shadow_5' },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  // TANK  — blue, DEF & HP focused
  // ────────────────────────────────────────────────────────────────────────────
  {
    id: 'tank',
    label: 'Tank',
    color: '#1d4ed8',
    glowColor: '#60a5fa',
    nodes: [
      {
        id: 'tank_1',
        name: 'Iron Skin',
        desc: '+5% damage reduction (DEF). Your skin hardens like steel.',
        tier: 1, cost: 1,
        x: 0.50, y: 0.10,
        requires: [], abilityUnlock: null,
        effects: { defBonus: 5 },
      },
      {
        id: 'tank_2',
        name: 'Fortress',
        desc: '+30 max HP. You are an unmovable wall of flesh and iron.',
        tier: 2, cost: 2,
        x: 0.28, y: 0.30,
        requires: ['tank_1'], abilityUnlock: null,
        effects: { hpBonus: 30 },
      },
      {
        id: 'tank_3',
        name: 'Shield Wall',
        desc: '+8% damage reduction. Attacks bounce off you like rain.',
        tier: 3, cost: 2,
        x: 0.68, y: 0.48,
        requires: ['tank_2'], abilityUnlock: null,
        effects: { defBonus: 8 },
      },
      {
        id: 'tank_4',
        name: 'Last Stand',
        desc: "+50 max HP. At death's door, you fight harder than ever.",
        tier: 4, cost: 3,
        x: 0.38, y: 0.66,
        requires: ['tank_3'], abilityUnlock: null,
        effects: { hpBonus: 50 },
      },
      {
        id: 'tank_5',
        name: 'Unbreakable',
        desc: 'ABILITY: The very first hit of each battle deals 0 damage.',
        tier: 5, cost: 4,
        x: 0.52, y: 0.84,
        requires: ['tank_4'], abilityUnlock: 'unbreakable',
        effects: { defBonus: 5 },
      },
    ],
    connections: [
      { from: 'tank_1', to: 'tank_2' },
      { from: 'tank_2', to: 'tank_3' },
      { from: 'tank_3', to: 'tank_4' },
      { from: 'tank_4', to: 'tank_5' },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  // BERSERKER  — orange, raw ATK & rage effects
  // ────────────────────────────────────────────────────────────────────────────
  {
    id: 'berserker',
    label: 'Berserker',
    color: '#b45309',
    glowColor: '#fb923c',
    nodes: [
      {
        id: 'berserk_1',
        name: 'Adrenaline',
        desc: '+5 flat ATK bonus. Pure fury flows through your veins.',
        tier: 1, cost: 1,
        x: 0.50, y: 0.10,
        requires: [], abilityUnlock: null,
        effects: { atkBonus: 5 },
      },
      {
        id: 'berserk_2',
        name: 'Bloodlust',
        desc: 'Restore 5% max HP after each enemy is defeated.',
        tier: 2, cost: 2,
        x: 0.65, y: 0.30,
        requires: ['berserk_1'], abilityUnlock: null,
        effects: { lifeSteal: 5 },
      },
      {
        id: 'berserk_3',
        name: 'Fury',
        desc: '+10 ATK when your HP drops below 50%. Pain fuels you.',
        tier: 3, cost: 2,
        x: 0.35, y: 0.47,
        requires: ['berserk_2'], abilityUnlock: null,
        effects: { furyAtk: 10 },
      },
      {
        id: 'berserk_4',
        name: 'Rampage',
        desc: 'Gain +3 ATK for each turn you survive in battle.',
        tier: 4, cost: 3,
        x: 0.58, y: 0.65,
        requires: ['berserk_3'], abilityUnlock: null,
        effects: { rampageAtk: 3 },
      },
      {
        id: 'berserk_5',
        name: 'Primal Rage',
        desc: 'ABILITY: After taking damage, gain +25 ATK for 2 turns + 5 flat ATK.',
        tier: 5, cost: 4,
        x: 0.47, y: 0.84,
        requires: ['berserk_4'], abilityUnlock: 'primal_rage',
        effects: { atkBonus: 5 },
      },
    ],
    connections: [
      { from: 'berserk_1', to: 'berserk_2' },
      { from: 'berserk_2', to: 'berserk_3' },
      { from: 'berserk_3', to: 'berserk_4' },
      { from: 'berserk_4', to: 'berserk_5' },
    ],
  },
];

// Look up a node by id across all trees
export function getNodeById(nodeId) {
  for (const tree of SKILL_TREES) {
    const node = tree.nodes.find(n => n.id === nodeId);
    if (node) return { node, tree };
  }
  return null;
}
