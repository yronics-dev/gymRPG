// ── Weapon Definitions ────────────────────────────────────────────────────────
// Each weapon occupies the 'weapon' equipment slot.
// atkMult scales the player's base ATK before the elemental multiplier applies.
// specialEffect keys are consumed in BattleArena combat logic (Step 5).

export const WEAPONS = [
  {
    id:           'iron_greatsword',
    name:         'Iron Greatsword',
    element:      'Physical',
    rarity:       'Common',
    rarityColor:  '#94a3b8',
    atkMult:      1.2,
    atk:          4,           // flat ATK bonus from loot system
    slot:         'weapon',
    specialEffect: 'ignore_def',
    specialChance: 20,         // % chance to ignore 50% of boss DEF
    description:  'A heavy iron blade. Ignores 50% of enemy defence on 1-in-5 hits.',
    icon:         'IronGreatsword',
  },
  {
    id:           'ember_sword',
    name:         'Ember Sword',
    element:      'Fire',
    rarity:       'Uncommon',
    rarityColor:  '#fb923c',
    atkMult:      1.0,
    atk:          3,
    slot:         'weapon',
    specialEffect: 'burn_dot',
    specialChance: 30,         // % chance to apply burn
    dotPct:       0.06,        // 6% of boss max HP per turn
    dotTurns:     2,
    description:  'A blade wreathed in embers. 30% chance to ignite the target for 6% HP/turn × 2 turns.',
    icon:         'EmberSword',
  },
  {
    id:           'inferno_wand',
    name:         'Inferno Wand',
    element:      'Fire',
    rarity:       'Rare',
    rarityColor:  '#f87171',
    atkMult:      0.8,
    atk:          2,
    slot:         'weapon',
    specialEffect: 'splash_burn',
    specialChance: 100,        // always applies, even through dodge
    dotPct:       0.06,
    dotTurns:     2,
    description:  'Channels a jet of inferno that always scorches — even dodged attacks still burn.',
    icon:         'InfernoWand',
  },
  {
    id:           'tide_blade',
    name:         'Tide Blade',
    element:      'Water',
    rarity:       'Uncommon',
    rarityColor:  '#fb923c',
    atkMult:      1.0,
    atk:          3,
    slot:         'weapon',
    specialEffect: 'slow',
    specialChance: 25,         // % chance to slow boss
    slowTurns:    2,           // boss loses first-strike for N turns
    description:  'A flowing blade of tidal force. 25% chance to slow the boss, stripping first-strike for 2 turns.',
    icon:         'TideBlade',
  },
  {
    id:           'maelstrom_staff',
    name:         'Maelstrom Staff',
    element:      'Water',
    rarity:       'Rare',
    rarityColor:  '#f87171',
    atkMult:      0.85,
    atk:          2,
    slot:         'weapon',
    specialEffect: 'drain',
    specialChance: 100,        // always drains
    drainPct:     0.15,        // heal 15% of damage dealt
    description:  'A swirling staff of deep water. Every hit drains 15% of damage dealt back as HP.',
    icon:         'MaelstromStaff',
  },
  {
    id:           'thornblade',
    name:         'Thornblade',
    element:      'Grass',
    rarity:       'Uncommon',
    rarityColor:  '#fb923c',
    atkMult:      1.0,
    atk:          3,
    slot:         'weapon',
    specialEffect: 'poison',
    specialChance: 35,         // % chance to poison
    dotPct:       0.05,        // 5% of boss max HP per turn
    dotTurns:     3,
    description:  'A vine-wrapped blade. 35% chance to poison — 5% HP/turn for 3 turns.',
    icon:         'Thornblade',
  },
  {
    id:           'nature_wand',
    name:         'Nature Wand',
    element:      'Grass',
    rarity:       'Rare',
    rarityColor:  '#f87171',
    atkMult:      0.75,
    atk:          2,
    slot:         'weapon',
    specialEffect: 'rejuvenate',
    specialChance: 100,        // always active after kill
    healPct:      0.20,        // heal 20% max HP after each kill
    description:  'A living wand of ancient forest magic. Heals 20% of max HP after each enemy kill.',
    icon:         'NatureWand',
  },
  {
    id:           'thunder_edge',
    name:         'Thunder Edge',
    element:      'Electric',
    rarity:       'Rare',
    rarityColor:  '#f87171',
    atkMult:      1.0,
    atk:          3,
    slot:         'weapon',
    specialEffect: 'stun',
    specialChance: 20,         // % chance to stun
    stunTurns:    1,           // boss skips next attack
    description:  'A crackling edge of pure lightning. 20% chance to stun the boss, making it skip its next attack.',
    icon:         'ThunderEdge',
  },
];

/** Look up a weapon by id */
export function getWeaponById(id) {
  return WEAPONS.find(w => w.id === id) ?? null;
}

/** Map of element → weapons of that element */
export const WEAPONS_BY_ELEMENT = WEAPONS.reduce((acc, w) => {
  (acc[w.element] = acc[w.element] || []).push(w);
  return acc;
}, {});

/** Rarity sort order */
export const RARITY_ORDER = { Common: 0, Uncommon: 1, Rare: 2, Epic: 3, Legendary: 4 };
