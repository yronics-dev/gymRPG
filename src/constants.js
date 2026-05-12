export const MUSCLE_GROUPS = [
  'Chest', 'Biceps', 'Triceps', 'Shoulders',
  'Back', 'Core', 'Legs', 'Glutes', 'Cardio',
];

export const BOSS_EMOJIS = [
  '🐉', '🦁', '🐺', '🦅', '🐍', '🦈', '🦂', '🦇', '🦉', '🦌',
  '🐅', '🐆', '🦏', '🦛', '🦒', '🐘', '🦏', '🦘', '🦡', '🐾',
  '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸',
  '🐊', '🐢', '🐍', '🐲', '🐉', '🦎', '🐌', '🦋', '🐛', '🐜',
  '🐝', '🐞', '🦗', '🕷️', '🦂', '🦟', '🦠', '🐙', '🦑', '🦞',
];

export const EXERCISES_BY_MUSCLE = {
  Chest:     ['Bench Press', 'Incline Press', 'Chest Fly', 'Push-up'],
  Biceps:    ['Barbell Curl', 'Hammer Curl', 'Cable Curl'],
  Triceps:   ['Tricep Pushdown', 'Skull Crusher', 'Dips'],
  Shoulders: ['Overhead Press', 'Lateral Raise', 'Face Pull'],
  Back:      ['Pull-up', 'Barbell Row', 'Lat Pulldown', 'Deadlift'],
  Core:      ['Plank', 'Crunch', 'Leg Raise', 'Cable Crunch'],
  Legs:      ['Squat', 'Leg Press', 'Leg Extension', 'Lunge'],
  Glutes:    ['Hip Thrust', 'Romanian Deadlift', 'Glute Kickback'],
  Cardio:    ['Running', 'Cycling', 'Jump Rope', 'HIIT'],
};

export const EXERCISE_TO_MUSCLE = Object.fromEntries(
  Object.entries(EXERCISES_BY_MUSCLE).flatMap(([muscle, exs]) =>
    exs.map(e => [e, muscle])
  )
);

export const EXERCISE_ICONS = {
  'Bench Press': '🏋️',
  'Incline Press': '🏋️‍♂️',
  'Chest Fly': '🦾',
  'Push-up': '🤸',
  'Barbell Curl': '💪',
  'Hammer Curl': '🔨',
  'Cable Curl': '🪢',
  'Tricep Pushdown': '📉',
  'Skull Crusher': '💀',
  'Dips': '⬇️',
  'Overhead Press': '🛡️',
  'Lateral Raise': '🦅',
  'Face Pull': '🎣',
  'Pull-up': '📌',
  'Barbell Row': '🚣',
  'Lat Pulldown': '🔽',
  'Deadlift': '⚰️',
  'Plank': '🧱',
  'Crunch': '🥨',
  'Leg Raise': '🦵',
  'Cable Crunch': '🪢',
  'Squat': '🦵',
  'Leg Press': '🚪',
  'Leg Extension': '📏',
  'Lunge': '👟',
  'Hip Thrust': '🍑',
  'Romanian Deadlift': '🪦',
  'Glute Kickback': '👣',
  'Running': '🏃',
  'Cycling': '🚴',
  'Jump Rope': '🪢',
  'HIIT': '⚡',
};

export const MUSCLE_TO_STAT = {
  Chest: 'ATK', Biceps: 'ATK', Triceps: 'ATK', Shoulders: 'ATK',
  Back: 'VIT',
  Core: 'DEF',
  Legs: 'AGI', Glutes: 'AGI',
  Cardio: 'STA',
};

export const STAT_INFO = {
  ATK: {
    color: '#f87171', label: 'ATK', fullLabel: 'Attack',
    desc: 'Damage dealt to bosses',
    muscles: ['Chest', 'Biceps', 'Triceps', 'Shoulders'],
    icon: '⚔️',
  },
  VIT: {
    color: '#4ade80', label: 'VIT', fullLabel: 'Vitality',
    desc: 'Maximum HP',
    muscles: ['Back'],
    icon: '❤️',
  },
  DEF: {
    color: '#60a5fa', label: 'DEF', fullLabel: 'Defense',
    desc: 'Damage reduction %',
    muscles: ['Core'],
    icon: '🛡️',
  },
  AGI: {
    color: '#facc15', label: 'AGI', fullLabel: 'Agility',
    desc: 'Dodge chance & turn order',
    muscles: ['Legs', 'Glutes'],
    icon: '💨',
  },
  STA: {
    color: '#c084fc', label: 'STA', fullLabel: 'Stamina',
    desc: 'Chance for a bonus attack',
    muscles: ['Cardio'],
    icon: '⚡',
  },
  LCK: {
    color: '#ffd700', label: 'LCK', fullLabel: 'Luck',
    desc: 'Crit chance, dodge, rare loot, status resist',
    muscles: [],
    icon: '🍀',
    goldOnly: true,
  },
};

export const MUSCLE_COLORS = {
  Chest:     '#f87171',
  Biceps:    '#fb923c',
  Triceps:   '#fbbf24',
  Shoulders: '#a3e635',
  Back:      '#4ade80',
  Core:      '#22d3ee',
  Legs:      '#60a5fa',
  Glutes:    '#a78bfa',
  Cardio:    '#f472b6',
};

export const ELEMENTS = ['Fire', 'Ice', 'Shadow', 'Thunder', 'Earth', 'Wind'];

export const ELEMENT_THEMES = {
  Fire:    { color: '#f87171', bg: '#7f1d1d', emoji: '🔥', glow: 'rgba(248,113,113,0.5)', particle: '#f87171' },
  Ice:     { color: '#93c5fd', bg: '#1e3a5f', emoji: '❄️', glow: 'rgba(147,197,253,0.5)', particle: '#93c5fd' },
  Shadow:  { color: '#c084fc', bg: '#2e1065', emoji: '🌑', glow: 'rgba(192,132,252,0.5)', particle: '#c084fc' },
  Thunder: { color: '#fde047', bg: '#713f12', emoji: '⚡', glow: 'rgba(253,224,71,0.5)',  particle: '#fde047' },
  Earth:   { color: '#86efac', bg: '#14532d', emoji: '🌍', glow: 'rgba(134,239,172,0.5)', particle: '#86efac' },
  Wind:    { color: '#6ee7b7', bg: '#064e3b', emoji: '💨', glow: 'rgba(110,231,183,0.5)', particle: '#6ee7b7' },
};

export const BOSS_PREFIXES = [
  'Dark', 'Shadow', 'Infernal', 'Frozen', 'Ancient', 'Cursed',
  'Dire', 'Vile', 'Savage', 'Grim', 'Dread', 'Blazing', 'Feral', 'Iron',
];
export const BOSS_SUFFIXES = [
  'Golem', 'Drake', 'Titan', 'Wraith', 'Hydra', 'Colossus',
  'Behemoth', 'Specter', 'Reaper', 'Warlord', 'Basilisk', 'Leviathan',
];

export const REST_DURATION = 120;
export const BOSS_BONUS_XP = 500;
export const WEAKNESS_BONUS_MULTIPLIER = 1.25;

/* ═══════════════════════════════════════════
   BOSS DIALOGUES
═══════════════════════════════════════════ */
export const BOSS_DIALOGUES = {
  intro: [
    "So... you think you can defeat me?",
    "Another gym rat. How disappointing.",
    "Your gains end here, mortal!",
    "I've crushed stronger than you!",
    "Ready to be DESTROYED?",
    "You dare challenge me?!",
    "This will be quick.",
  ],
  halfHP: [
    "Impossible! You're actually strong!",
    "Fine! No more holding back!",
    "You'll regret making me serious!",
    "GRRR... You'll pay for that!",
    "Don't celebrate yet, weakling!",
    "Now you've made me angry!",
  ],
  lowHP: [
    "NOOOO! I can't be beaten!",
    "This can't be happening!",
    "I WON'T FALL HERE!",
    "RAGE ACTIVATED! COME AT ME!",
    "You... haven't won yet!",
    "MAXIMUM POWER!!!",
  ],
  victory: [
    "Pathetic. Come back stronger.",
    "Back to the gym with you!",
    "You needed more leg day.",
    "Expected more from a gym warrior.",
    "Train harder. Try again.",
  ],
  taunt: [
    "Is that all you've got?",
    "BORING! Try harder!",
    "My grandmother hits harder!",
    "STEP IT UP!",
    "You call THAT an attack?!",
  ],
};

/* ═══════════════════════════════════════════
   GOLD SHOP
═══════════════════════════════════════════ */
export const GOLD_SHOP = {
  stats: [
    { id: 'ATK',  label: '+1 ATK',  desc: '+3 attack power',       cost: 1, stat: 'ATK',  max: 20, icon: '⚔️',  color: '#f87171' },
    { id: 'DEF',  label: '+1 DEF',  desc: '+2% damage reduction',  cost: 1, stat: 'DEF',  max: 20, icon: '🛡️',  color: '#60a5fa' },
    { id: 'HP',   label: '+15 HP',  desc: '+15 max HP',            cost: 1, stat: 'HP',   max: 20, icon: '❤️',  color: '#4ade80' },
    { id: 'LCK',  label: '+1 LCK',  desc: '+2% crit/dodge chance', cost: 2, stat: 'LCK',  max: 10, icon: '🍀',  color: '#ffd700' },
  ],
  clothing: {
    hat: [
      { id: 'hat_none',   label: 'None',          cost: 0,  color: null,      icon: '🚫' },
      { id: 'hat_cap',    label: 'Baseball Cap',  cost: 2,  color: '#1d4ed8', icon: '🧢' },
      { id: 'hat_tophat', label: 'Top Hat',       cost: 4,  color: '#111827', icon: '🎩' },
      { id: 'hat_helmet', label: 'Combat Helmet', cost: 5,  color: '#64748b', icon: '⛑️' },
      { id: 'hat_beanie', label: 'Beanie',        cost: 3,  color: '#7c3aed', icon: '🎓' },
      { id: 'hat_crown',  label: 'Golden Crown',  cost: 10, color: '#ca8a04', icon: '👑' },
    ],
    pants: [
      { id: 'pants_default', label: 'Default',    cost: 0, color: null,      icon: '👖' },
      { id: 'pants_shorts',  label: 'Shorts',     cost: 2, color: '#334155', icon: '🩳' },
      { id: 'pants_camo',    label: 'Camo',       cost: 4, color: '#365314', icon: '🎽' },
      { id: 'pants_gold',    label: 'Gold Pants', cost: 6, color: '#ca8a04', icon: '✨' },
      { id: 'pants_red',     label: 'Red Pants',  cost: 3, color: '#991b1b', icon: '🔴' },
    ],
    shoes: [
      { id: 'shoes_default', label: 'Default',    cost: 0, color: null,      icon: '👟' },
      { id: 'shoes_white',   label: 'White Kicks',cost: 2, color: '#e2e8f0', icon: '👟' },
      { id: 'shoes_boots',   label: 'Brown Boots',cost: 3, color: '#92400e', icon: '🥾' },
      { id: 'shoes_gold',    label: 'Gold Boots', cost: 6, color: '#ca8a04', icon: '✨' },
      { id: 'shoes_red',     label: 'Red Kicks',  cost: 3, color: '#dc2626', icon: '❤️' },
    ],
    accessory: [
      { id: 'acc_none',       label: 'None',        cost: 0, icon: '🚫' },
      { id: 'acc_beer',       label: 'Beer',        cost: 2, icon: '🍺' },
      { id: 'acc_cigarette',  label: 'Cigarette',   cost: 2, icon: '🚬' },
      { id: 'acc_coffee',     label: 'Coffee',      cost: 1, icon: '☕' },
      { id: 'acc_wristbands', label: 'Wristbands',  cost: 3, icon: '💪' },
      { id: 'acc_sunglasses', label: 'Sunglasses',  cost: 4, icon: '🕶️' },
    ],
  },
  auras: [
    { id: 'aura_default', label: 'Cyan Aura',    cost: 0,  color: '#22d3ee', owned: true  },
    { id: 'aura_gold',    label: 'Gold Aura',     cost: 3,  color: '#facc15' },
    { id: 'aura_red',     label: 'Crimson Aura',  cost: 3,  color: '#f87171' },
    { id: 'aura_purple',  label: 'Shadow Aura',   cost: 3,  color: '#a855f7' },
    { id: 'aura_green',   label: 'Toxic Aura',    cost: 4,  color: '#4ade80' },
    { id: 'aura_pink',    label: 'Neon Aura',     cost: 5,  color: '#ff006e' },
    { id: 'aura_rainbow', label: 'Mythic Aura',   cost: 10, color: 'rainbow' },
  ],
};

/* ═══════════════════════════════════════════
   CHARACTER EVOLUTION STAGES
═══════════════════════════════════════════ */
export const CHARACTER_STAGES = {
  1: {
    label:      'Skinny Noob',
    sublabel:   'Just joined the gym',
    scale:      0.75,
    auraColor:  '#10b981',
    idleClass:  'character-idle',
    auraClass:  'aura-stage-1',
  },
  2: {
    label:      'Beginner Lifter',
    sublabel:   'Gains are coming',
    scale:      0.88,
    auraColor:  '#f59e0b',
    idleClass:  'character-idle',
    auraClass:  'aura-stage-2',
  },
  3: {
    label:      'Athletic Build',
    sublabel:   'Looking jacked',
    scale:      1.0,
    auraColor:  '#64748b',
    idleClass:  'character-idle',
    auraClass:  'aura-stage-3',
  },
  4: {
    label:      'Muscular Beast',
    sublabel:   'Serious gains unlocked',
    scale:      1.15,
    auraColor:  '#a855f7',
    idleClass:  'character-idle-heavy',
    auraClass:  'aura-stage-4',
  },
  5: {
    label:      'Monster Build',
    sublabel:   'Absolutely jacked',
    scale:      1.25,
    auraColor:  '#a78bfa',
    idleClass:  'character-idle-heavy',
    auraClass:  'aura-stage-5',
  },
  6: {
    label:      'Mythic Form',
    sublabel:   'Beyond human limits',
    scale:      1.30,
    auraColor:  '#22d3ee',
    idleClass:  'character-idle-heavy',
    auraClass:  'aura-stage-6',
  },
};
