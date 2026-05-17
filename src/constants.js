export const MUSCLE_GROUPS = [
  'Chest', 'Biceps', 'Triceps', 'Shoulders',
  'Back', 'Core', 'Legs', 'Glutes', 'Cardio',
];

// Boss archetype icons — used to pick a visual style for generated bosses.
// Each entry maps to a GameIcon name (skull = undead, flame = fire, orb = magic, etc.)
export const BOSS_ICONS = [
  'skull', 'flame', 'orb', 'lightning', 'shield',
  'sword', 'skull', 'wing', 'orb', 'flame',
  'skull', 'lightning', 'shield', 'flame', 'orb',
  'sword', 'skull', 'wing', 'flame', 'orb',
  'skull', 'orb', 'flame', 'lightning', 'sword',
  'shield', 'skull', 'flame', 'orb', 'wing',
  'skull', 'lightning', 'orb', 'flame', 'shield',
  'sword', 'skull', 'wing', 'flame', 'orb',
  'skull', 'orb', 'flame', 'shield', 'lightning',
  'sword', 'skull', 'flame', 'orb', 'wing',
];
// Legacy alias so any old code that references BOSS_EMOJIS still compiles.
export const BOSS_EMOJIS = BOSS_ICONS;

export const EXERCISES_BY_MUSCLE = {
  Chest:     ['Bench Press', 'Incline Bench Press', 'Chest Fly', 'Push-up', 'Cable Crossover', 'Dumbbell Press', 'Decline Bench Press'],
  Biceps:    ['Barbell Curl', 'Hammer Curl', 'Cable Curl', 'Preacher Curl', 'Concentration Curl', 'Incline Dumbbell Curl'],
  Triceps:   ['Tricep Pushdown', 'Skull Crusher', 'Dips', 'Close-Grip Bench Press', 'Overhead Extension', 'Diamond Push-up'],
  Shoulders: ['Overhead Press', 'Lateral Raise', 'Face Pull', 'Arnold Press', 'Front Raise', 'Rear Delt Fly'],
  Back:      ['Pull-up', 'Barbell Row', 'Lat Pulldown', 'Deadlift', 'Seated Cable Row', 'T-Bar Row', 'Single Arm Row'],
  Core:      ['Plank', 'Crunch', 'Leg Raise', 'Cable Crunch', 'Ab Wheel', 'Russian Twist', 'Bicycle Crunch'],
  Legs:      ['Squat', 'Leg Press', 'Leg Extension', 'Lunge', 'Leg Curl', 'Bulgarian Split Squat', 'Hack Squat'],
  Glutes:    ['Hip Thrust', 'Romanian Deadlift', 'Glute Kickback', 'Cable Pull-Through', 'Sumo Deadlift'],
  Cardio:    ['Running', 'Cycling', 'Jump Rope', 'HIIT', 'Rowing Machine'],
};

export const EXERCISE_TO_MUSCLE = Object.fromEntries(
  Object.entries(EXERCISES_BY_MUSCLE).flatMap(([muscle, exs]) =>
    exs.map(e => [e, muscle])
  )
);

const DB = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises';
export const EXERCISE_IMAGES = {
  'Bench Press':           [`${DB}/Barbell_Bench_Press_-_Medium_Grip/0.jpg`,           `${DB}/Barbell_Bench_Press_-_Medium_Grip/1.jpg`],
  'Incline Bench Press':   [`${DB}/Barbell_Incline_Bench_Press_-_Medium_Grip/0.jpg`,   `${DB}/Barbell_Incline_Bench_Press_-_Medium_Grip/1.jpg`],
  'Chest Fly':             [`${DB}/Dumbbell_Flyes/0.jpg`,                              `${DB}/Dumbbell_Flyes/1.jpg`],
  'Push-up':               [`${DB}/Pushups/0.jpg`,                                     `${DB}/Pushups/1.jpg`],
  'Cable Crossover':       [`${DB}/Cable_Crossover/0.jpg`,                             `${DB}/Cable_Crossover/1.jpg`],
  'Dumbbell Press':        [`${DB}/Dumbbell_Bench_Press/0.jpg`,                        `${DB}/Dumbbell_Bench_Press/1.jpg`],
  'Decline Bench Press':   [`${DB}/Decline_Barbell_Bench_Press/0.jpg`,                 `${DB}/Decline_Barbell_Bench_Press/1.jpg`],
  'Barbell Curl':          [`${DB}/Barbell_Curl/0.jpg`,                                `${DB}/Barbell_Curl/1.jpg`],
  'Hammer Curl':           [`${DB}/Hammer_Curls/0.jpg`,                                `${DB}/Hammer_Curls/1.jpg`],
  'Cable Curl':            [`${DB}/Standing_Biceps_Cable_Curl/0.jpg`,                  `${DB}/Standing_Biceps_Cable_Curl/1.jpg`],
  'Preacher Curl':         [`${DB}/Preacher_Curl/0.jpg`,                               `${DB}/Preacher_Curl/1.jpg`],
  'Concentration Curl':    [`${DB}/Concentration_Curls/0.jpg`,                         `${DB}/Concentration_Curls/1.jpg`],
  'Incline Dumbbell Curl': [`${DB}/Incline_Dumbbell_Curl/0.jpg`,                       `${DB}/Incline_Dumbbell_Curl/1.jpg`],
  'Tricep Pushdown':       [`${DB}/Triceps_Pushdown/0.jpg`,                            `${DB}/Triceps_Pushdown/1.jpg`],
  'Skull Crusher':         [`${DB}/EZ-Bar_Skullcrusher/0.jpg`,                         `${DB}/EZ-Bar_Skullcrusher/1.jpg`],
  'Dips':                  [`${DB}/Dips_-_Triceps_Version/0.jpg`,                      `${DB}/Dips_-_Triceps_Version/1.jpg`],
  'Close-Grip Bench Press':[`${DB}/Close-Grip_Barbell_Bench_Press/0.jpg`,              `${DB}/Close-Grip_Barbell_Bench_Press/1.jpg`],
  'Overhead Extension':    [`${DB}/Standing_Overhead_Barbell_Triceps_Extension/0.jpg`, `${DB}/Standing_Overhead_Barbell_Triceps_Extension/1.jpg`],
  'Diamond Push-up':       [`${DB}/Push-Ups_-_Close_Triceps_Position/0.jpg`,           `${DB}/Push-Ups_-_Close_Triceps_Position/1.jpg`],
  'Overhead Press':        [`${DB}/Standing_Military_Press/0.jpg`,                     `${DB}/Standing_Military_Press/1.jpg`],
  'Lateral Raise':         [`${DB}/Side_Lateral_Raise/0.jpg`,                          `${DB}/Side_Lateral_Raise/1.jpg`],
  'Face Pull':             [`${DB}/Face_Pull/0.jpg`,                                   `${DB}/Face_Pull/1.jpg`],
  'Arnold Press':          [`${DB}/Arnold_Dumbbell_Press/0.jpg`,                       `${DB}/Arnold_Dumbbell_Press/1.jpg`],
  'Front Raise':           [`${DB}/Front_Dumbbell_Raise/0.jpg`,                        `${DB}/Front_Dumbbell_Raise/1.jpg`],
  'Rear Delt Fly':         [`${DB}/Cable_Rear_Delt_Fly/0.jpg`,                         `${DB}/Cable_Rear_Delt_Fly/1.jpg`],
  'Pull-up':               [`${DB}/Pullups/0.jpg`,                                     `${DB}/Pullups/1.jpg`],
  'Barbell Row':           [`${DB}/Bent_Over_Barbell_Row/0.jpg`,                       `${DB}/Bent_Over_Barbell_Row/1.jpg`],
  'Lat Pulldown':          [`${DB}/Wide-Grip_Lat_Pulldown/0.jpg`,                      `${DB}/Wide-Grip_Lat_Pulldown/1.jpg`],
  'Deadlift':              [`${DB}/Barbell_Deadlift/0.jpg`,                            `${DB}/Barbell_Deadlift/1.jpg`],
  'Seated Cable Row':      [`${DB}/Seated_Cable_Rows/0.jpg`,                           `${DB}/Seated_Cable_Rows/1.jpg`],
  'T-Bar Row':             [`${DB}/T-Bar_Row_with_Handle/0.jpg`,                       `${DB}/T-Bar_Row_with_Handle/1.jpg`],
  'Single Arm Row':        [`${DB}/One-Arm_Dumbbell_Row/0.jpg`,                        `${DB}/One-Arm_Dumbbell_Row/1.jpg`],
  'Plank':                 [`${DB}/Plank/0.jpg`,                                       `${DB}/Plank/1.jpg`],
  'Crunch':                [`${DB}/Crunch_-_Hands_Overhead/0.jpg`,                     `${DB}/Crunch_-_Hands_Overhead/1.jpg`],
  'Leg Raise':             [`${DB}/Hanging_Leg_Raise/0.jpg`,                           `${DB}/Hanging_Leg_Raise/1.jpg`],
  'Cable Crunch':          [`${DB}/Cable_Crunch/0.jpg`,                                `${DB}/Cable_Crunch/1.jpg`],
  'Ab Wheel':              [`${DB}/Ab_Roller/0.jpg`,                                   `${DB}/Ab_Roller/1.jpg`],
  'Russian Twist':         [`${DB}/Russian_Twist/0.jpg`,                               `${DB}/Russian_Twist/1.jpg`],
  'Bicycle Crunch':        [`${DB}/Air_Bike/0.jpg`,                                    `${DB}/Air_Bike/1.jpg`],
  'Squat':                 [`${DB}/Barbell_Squat/0.jpg`,                               `${DB}/Barbell_Squat/1.jpg`],
  'Leg Press':             [`${DB}/Leg_Press/0.jpg`,                                   `${DB}/Leg_Press/1.jpg`],
  'Leg Extension':         [`${DB}/Leg_Extensions/0.jpg`,                              `${DB}/Leg_Extensions/1.jpg`],
  'Lunge':                 [`${DB}/Dumbbell_Lunges/0.jpg`,                             `${DB}/Dumbbell_Lunges/1.jpg`],
  'Leg Curl':              [`${DB}/Lying_Leg_Curls/0.jpg`,                             `${DB}/Lying_Leg_Curls/1.jpg`],
  'Bulgarian Split Squat': [`${DB}/Split_Squat_with_Dumbbells/0.jpg`,                  `${DB}/Split_Squat_with_Dumbbells/1.jpg`],
  'Hack Squat':            [`${DB}/Hack_Squat/0.jpg`,                                  `${DB}/Hack_Squat/1.jpg`],
  'Hip Thrust':            [`${DB}/Barbell_Hip_Thrust/0.jpg`,                          `${DB}/Barbell_Hip_Thrust/1.jpg`],
  'Romanian Deadlift':     [`${DB}/Romanian_Deadlift/0.jpg`,                           `${DB}/Romanian_Deadlift/1.jpg`],
  'Glute Kickback':        [`${DB}/Glute_Kickback/0.jpg`,                              `${DB}/Glute_Kickback/1.jpg`],
  'Cable Pull-Through':    [`${DB}/Pull_Through/0.jpg`,                                `${DB}/Pull_Through/1.jpg`],
  'Sumo Deadlift':         [`${DB}/Sumo_Deadlift/0.jpg`,                               `${DB}/Sumo_Deadlift/1.jpg`],
  'Running':               [`${DB}/Running_Treadmill/0.jpg`,                           `${DB}/Running_Treadmill/1.jpg`],
  'Cycling':               [`${DB}/Bicycling_Stationary/0.jpg`,                        `${DB}/Bicycling_Stationary/1.jpg`],
  'Jump Rope':             [`${DB}/Rope_Jumping/0.jpg`,                                `${DB}/Rope_Jumping/1.jpg`],
  'HIIT':                  [`${DB}/Burpee/0.jpg`,                                      `${DB}/Burpee/1.jpg`],
  'Rowing Machine':        [`${DB}/Rowing_Stationary/0.jpg`,                           `${DB}/Rowing_Stationary/1.jpg`],
};

// Maps exercise names → icon name (used by GameIcon component)
export const EXERCISE_ICONS = {
  'Bench Press': 'muscle-chest', 'Incline Bench Press': 'muscle-chest', 'Chest Fly': 'muscle-chest',
  'Push-up': 'muscle-chest', 'Cable Crossover': 'muscle-chest', 'Dumbbell Press': 'muscle-chest',
  'Decline Bench Press': 'muscle-chest',
  'Barbell Curl': 'muscle-biceps', 'Hammer Curl': 'muscle-biceps', 'Cable Curl': 'muscle-biceps',
  'Preacher Curl': 'muscle-biceps', 'Concentration Curl': 'muscle-biceps', 'Incline Dumbbell Curl': 'muscle-biceps',
  'Tricep Pushdown': 'muscle-triceps', 'Skull Crusher': 'muscle-triceps', 'Dips': 'muscle-triceps',
  'Close-Grip Bench Press': 'muscle-triceps', 'Overhead Extension': 'muscle-triceps', 'Diamond Push-up': 'muscle-triceps',
  'Overhead Press': 'muscle-shoulders', 'Lateral Raise': 'muscle-shoulders', 'Face Pull': 'muscle-shoulders',
  'Arnold Press': 'muscle-shoulders', 'Front Raise': 'muscle-shoulders', 'Rear Delt Fly': 'muscle-shoulders',
  'Pull-up': 'muscle-back', 'Barbell Row': 'muscle-back', 'Lat Pulldown': 'muscle-back',
  'Deadlift': 'muscle-back', 'Seated Cable Row': 'muscle-back', 'T-Bar Row': 'muscle-back', 'Single Arm Row': 'muscle-back',
  'Plank': 'muscle-core', 'Crunch': 'muscle-core', 'Leg Raise': 'muscle-core',
  'Cable Crunch': 'muscle-core', 'Ab Wheel': 'muscle-core', 'Russian Twist': 'muscle-core', 'Bicycle Crunch': 'muscle-core',
  'Squat': 'muscle-legs', 'Leg Press': 'muscle-legs', 'Leg Extension': 'muscle-legs',
  'Lunge': 'muscle-legs', 'Leg Curl': 'muscle-legs', 'Bulgarian Split Squat': 'muscle-legs', 'Hack Squat': 'muscle-legs',
  'Hip Thrust': 'muscle-glutes', 'Romanian Deadlift': 'muscle-glutes', 'Glute Kickback': 'muscle-glutes',
  'Cable Pull-Through': 'muscle-glutes', 'Sumo Deadlift': 'muscle-glutes',
  'Running': 'muscle-cardio', 'Cycling': 'muscle-cardio', 'Jump Rope': 'muscle-cardio',
  'HIIT': 'muscle-cardio', 'Rowing Machine': 'muscle-cardio',
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
    icon: 'sword',
  },
  VIT: {
    color: '#4ade80', label: 'VIT', fullLabel: 'Vitality',
    desc: 'Maximum HP',
    muscles: ['Back'],
    icon: 'heart',
  },
  DEF: {
    color: '#60a5fa', label: 'DEF', fullLabel: 'Defense',
    desc: 'Damage reduction %',
    muscles: ['Core'],
    icon: 'shield',
  },
  AGI: {
    color: '#facc15', label: 'AGI', fullLabel: 'Agility',
    desc: 'Dodge chance & turn order',
    muscles: ['Legs', 'Glutes'],
    icon: 'wing',
  },
  STA: {
    color: '#c084fc', label: 'STA', fullLabel: 'Stamina',
    desc: 'Chance for a bonus attack',
    muscles: ['Cardio'],
    icon: 'flame',
  },
  LCK: {
    color: '#ffd700', label: 'LCK', fullLabel: 'Luck',
    desc: 'Crit chance, dodge, rare loot, status resist',
    muscles: [],
    icon: 'star',
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

export const ELEMENTS = [
  'Fire', 'Ice', 'Shadow', 'Thunder', 'Earth', 'Wind',
  'Void', 'Storm', 'Lava', 'Crystal', 'Poison', 'Blood',
];

export const ELEMENT_THEMES = {
  Fire:    { color: '#f87171', bg: '#7f1d1d', icon: 'flame',    glow: 'rgba(248,113,113,0.5)', particle: '#f87171' },
  Ice:     { color: '#93c5fd', bg: '#1e3a5f', icon: 'shield',   glow: 'rgba(147,197,253,0.5)', particle: '#93c5fd' },
  Shadow:  { color: '#c084fc', bg: '#2e1065', icon: 'orb',      glow: 'rgba(192,132,252,0.5)', particle: '#c084fc' },
  Thunder: { color: '#fde047', bg: '#713f12', icon: 'lightning', glow: 'rgba(253,224,71,0.5)',  particle: '#fde047' },
  Earth:   { color: '#86efac', bg: '#14532d', icon: 'shield',   glow: 'rgba(134,239,172,0.5)', particle: '#86efac' },
  Wind:    { color: '#6ee7b7', bg: '#064e3b', icon: 'wing',     glow: 'rgba(110,231,183,0.5)', particle: '#6ee7b7' },
  Void:    { color: '#a78bfa', bg: '#1e1b4b', icon: 'orb',      glow: 'rgba(167,139,250,0.5)', particle: '#a78bfa' },
  Storm:   { color: '#7dd3fc', bg: '#0c2840', icon: 'lightning', glow: 'rgba(125,211,252,0.5)', particle: '#7dd3fc' },
  Lava:    { color: '#fb923c', bg: '#431407', icon: 'flame',    glow: 'rgba(251,146,60,0.5)',  particle: '#fb923c' },
  Crystal: { color: '#e0f2fe', bg: '#0f2744', icon: 'star',     glow: 'rgba(224,242,254,0.5)', particle: '#e0f2fe' },
  Poison:  { color: '#a3e635', bg: '#1a2e05', icon: 'skull',    glow: 'rgba(163,230,53,0.5)',  particle: '#a3e635' },
  Blood:   { color: '#fca5a5', bg: '#450a0a', icon: 'heart',    glow: 'rgba(252,165,165,0.5)', particle: '#fca5a5' },
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
export const WEAKNESS_BONUS_MULTIPLIER = 1.10;
// Boss config — baseATK lowered so fresh players aren't one-shot;
// HP and ATK scale up smoothly with level.
export const BOSS_CONFIG = {
  baseHP: 140,
  baseATK: 13,
  baseSpeed: 10,
  levelHPScale: 12,
  levelATKScale: 1.8,
  levelSpeedScale: 0.3,
  hpVariance: 2.5,
  atkVariance: 1.0,
  diffVariance: 0.25,
};

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
    { id: 'ATK',  label: '+1 ATK',  desc: '+3 attack power',       cost: 1, stat: 'ATK',  max: 20, icon: 'sword',   color: '#f87171' },
    { id: 'DEF',  label: '+1 DEF',  desc: '+2% damage reduction',  cost: 1, stat: 'DEF',  max: 20, icon: 'shield',  color: '#60a5fa' },
    { id: 'HP',   label: '+15 HP',  desc: '+15 max HP',            cost: 1, stat: 'HP',   max: 20, icon: 'heart',   color: '#4ade80' },
    { id: 'LCK',  label: '+1 LCK',  desc: '+2% crit/dodge chance', cost: 2, stat: 'LCK',  max: 10, icon: 'star',    color: '#ffd700' },
  ],
  clothing: {
    hat: [
      { id: 'hat_none',   label: 'None',          cost: 0,  color: null,      icon: 'lock'    },
      { id: 'hat_cap',    label: 'Baseball Cap',  cost: 2,  color: '#1d4ed8', icon: 'helmet'  },
      { id: 'hat_tophat', label: 'Top Hat',       cost: 4,  color: '#111827', icon: 'helmet'  },
      { id: 'hat_helmet', label: 'Combat Helmet', cost: 5,  color: '#64748b', icon: 'helmet'  },
      { id: 'hat_beanie', label: 'Beanie',        cost: 3,  color: '#7c3aed', icon: 'helmet'  },
      { id: 'hat_crown',  label: 'Golden Crown',  cost: 10, color: '#ca8a04', icon: 'star'    },
    ],
    pants: [
      { id: 'pants_default', label: 'Default',    cost: 0, color: null,      icon: 'lock'   },
      { id: 'pants_shorts',  label: 'Shorts',     cost: 2, color: '#334155', icon: 'boots'  },
      { id: 'pants_camo',    label: 'Camo',       cost: 4, color: '#365314', icon: 'boots'  },
      { id: 'pants_gold',    label: 'Gold Pants', cost: 6, color: '#ca8a04', icon: 'star'   },
      { id: 'pants_red',     label: 'Red Pants',  cost: 3, color: '#991b1b', icon: 'boots'  },
    ],
    shoes: [
      { id: 'shoes_default', label: 'Default',    cost: 0, color: null,      icon: 'lock'    },
      { id: 'shoes_white',   label: 'White Kicks',cost: 2, color: '#e2e8f0', icon: 'boots'   },
      { id: 'shoes_boots',   label: 'Brown Boots',cost: 3, color: '#92400e', icon: 'boots'   },
      { id: 'shoes_gold',    label: 'Gold Boots', cost: 6, color: '#ca8a04', icon: 'boots'   },
      { id: 'shoes_red',     label: 'Red Kicks',  cost: 3, color: '#dc2626', icon: 'boots'   },
    ],
    accessory: [
      { id: 'acc_none',       label: 'None',        cost: 0, icon: 'lock'    },
      { id: 'acc_beer',       label: 'Beer',        cost: 2, icon: 'potion'  },
      { id: 'acc_cigarette',  label: 'Cigarette',   cost: 2, icon: 'flame'   },
      { id: 'acc_coffee',     label: 'Coffee',      cost: 1, icon: 'potion'  },
      { id: 'acc_wristbands', label: 'Wristbands',  cost: 3, icon: 'dumbbell'},
      { id: 'acc_sunglasses', label: 'Sunglasses',  cost: 4, icon: 'orb'     },
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
   PLAYER CLASSES
═══════════════════════════════════════════ */
export const PLAYER_CLASSES = [
  {
    id: 'LEGEND', name: 'Legend', icon: 'star', color: '#facc15',
    desc: 'Transcends all classes', levelReq: 100,
    bonus: { label: '+15 ATK, +50 HP' },
  },
  {
    id: 'BERSERKER', name: 'Berserker', icon: 'flame', color: '#fb923c',
    desc: 'Raw power and relentless aggression', atkReq: 50, agiReq: 20,
    bonus: { label: '+10 ATK, +5% CRIT' },
  },
  {
    id: 'WARRIOR', name: 'Warrior', icon: 'sword', color: '#f87171',
    desc: 'Master of brute strength', atkReq: 25,
    bonus: { label: '+6 ATK' },
  },
  {
    id: 'TANK', name: 'Tank', icon: 'shield', color: '#60a5fa',
    desc: 'Immovable wall of muscle', defReq: 15, vitReq: 15,
    bonus: { label: '+30 HP, +3% DEF' },
  },
  {
    id: 'ROGUE', name: 'Rogue', icon: 'wing', color: '#4ade80',
    desc: 'Fast, agile, elusive', agiReq: 20,
    bonus: { label: '+5% DODGE' },
  },
  {
    id: 'NOVICE', name: 'Novice', icon: 'dumbbell', color: '#475569',
    desc: 'Just getting started', bonus: { label: '' },
  },
];

/* ═══════════════════════════════════════════
   LEVEL TITLES
═══════════════════════════════════════════ */
export const LEVEL_TITLES = [
  { level: 0,   title: 'Rookie',       color: '#6b7280' },
  { level: 5,   title: 'Trainee',      color: '#64748b' },
  { level: 10,  title: 'Fighter',      color: '#3b82f6' },
  { level: 15,  title: 'Brawler',      color: '#3b82f6' },
  { level: 20,  title: 'Iron Fist',    color: '#f59e0b' },
  { level: 25,  title: 'Iron Knight',  color: '#f59e0b' },
  { level: 35,  title: 'Battle Mage',  color: '#ef4444' },
  { level: 50,  title: 'Warlord',      color: '#8b5cf6' },
  { level: 75,  title: 'Champion',     color: '#8b5cf6' },
  { level: 100, title: 'Legend',       color: '#facc15' },
  { level: 150, title: 'Mythic',       color: '#facc15' },
  { level: 200, title: 'Immortal',     color: '#22d3ee' },
];

/* ═══════════════════════════════════════════
   SKILL TREE
═══════════════════════════════════════════ */
export const SKILLS = [
  { id: 'xp_boost',      name: 'XP Boost',        icon: 'lightning', color: '#facc15', cost: 2, desc: '+10% XP from all workouts',            effect: 'xpMult',  val: 0.10 },
  { id: 'resilience',    name: 'Resilience',       icon: 'heart',     color: '#f87171', cost: 2, desc: '+25 base HP',                          effect: 'hp',      val: 25   },
  { id: 'lucky_strike',  name: 'Lucky Strike',     icon: 'star',      color: '#4ade80', cost: 3, desc: '+5% critical hit chance',              effect: 'crit',    val: 5    },
  { id: 'iron_skin',     name: 'Iron Skin',        icon: 'shield',    color: '#60a5fa', cost: 3, desc: '+3% damage reduction',                 effect: 'def',     val: 3    },
  { id: 'quick_hands',   name: 'Quick Hands',      icon: 'wing',      color: '#a78bfa', cost: 3, desc: '+4% dodge chance',                     effect: 'dodge',   val: 4    },
  { id: 'treasure_hunt', name: 'Treasure Hunter',  icon: 'chest',     color: '#fb923c', cost: 5, desc: 'Dungeon chests always drop 2 items',   effect: 'loot2',   val: 1    },
  { id: 'berserker_rush',name: 'Berserker Rush',   icon: 'flame',     color: '#ef4444', cost: 4, desc: '+6 ATK when HP < 30%',                 effect: 'berserk', val: 6    },
  { id: 'xp_surge',      name: 'XP Surge',         icon: 'lightning', color: '#22d3ee', cost: 5, desc: '+25% XP when you set a PR',            effect: 'prBoost', val: 0.25 },
  { id: 'gold_greed',    name: 'Gold Greed',       icon: 'coin',      color: '#facc15', cost: 4, desc: 'Earn gold every 3 boss kills',         effect: 'goldFreq',val: 3    },
];

/* ═══════════════════════════════════════════
   POST-WORKOUT EVENTS
═══════════════════════════════════════════ */
export const WORKOUT_EVENTS = [
  { id: 'crit',      weight: 12, type: 'bonus',  icon: 'lightning', title: 'CRITICAL WORKOUT!',  desc: 'Your body responded perfectly. +50% XP!', color: '#facc15', xpMult: 1.50 },
  { id: 'focused',   weight: 20, type: 'bonus',  icon: 'lock',      title: 'IN THE ZONE!',        desc: 'Pure focus. +25% XP this session.',        color: '#4ade80', xpMult: 1.25 },
  { id: 'rested',    weight: 15, type: 'bonus',  icon: 'heart',     title: 'WELL RESTED',         desc: 'Recovery paid off. +15% XP.',              color: '#22d3ee', xpMult: 1.15 },
  { id: 'fatigue',   weight: 10, type: 'malus',  icon: 'flame',     title: 'FATIGUED',            desc: 'Body needs rest. XP -25% today.',          color: '#f87171', xpMult: 0.75 },
  { id: 'solid',     weight: 43, type: 'normal', icon: 'star',      title: 'SOLID SESSION',       desc: 'Good work. Keep grinding.',                color: '#475569', xpMult: 1.00 },
];

/* ═══════════════════════════════════════════
   DAILY QUEST TEMPLATES
═══════════════════════════════════════════ */
export const QUEST_TEMPLATES = [
  { id: 'complete_workout', desc: 'Complete today\'s workout',        type: 'workout',  target: 1,   reward: { gold: 1 },   rewardLabel: '+1 Gold'  },
  { id: 'train_2_muscles',  desc: 'Train 2 different muscle groups',  type: 'muscles',  target: 2,   reward: { gold: 1 },   rewardLabel: '+1 Gold'  },
  { id: 'train_3_muscles',  desc: 'Train 3 different muscle groups',  type: 'muscles',  target: 3,   reward: { gold: 2 },   rewardLabel: '+2 Gold'  },
  { id: 'log_5_sets',       desc: 'Log 5 sets',                       type: 'sets',     target: 5,   reward: { xp: 50 },    rewardLabel: '+50 XP'   },
  { id: 'log_10_sets',      desc: 'Log 10 sets',                      type: 'sets',     target: 10,  reward: { gold: 1 },   rewardLabel: '+1 Gold'  },
  { id: 'earn_100xp',       desc: 'Earn 100 XP in one session',       type: 'xp',       target: 100, reward: { gold: 1 },   rewardLabel: '+1 Gold'  },
  { id: 'earn_300xp',       desc: 'Earn 300 XP in one session',       type: 'xp',       target: 300, reward: { gold: 2 },   rewardLabel: '+2 Gold'  },
  { id: 'set_pr',           desc: 'Set a new volume PR',              type: 'pr',       target: 1,   reward: { gold: 2 },   rewardLabel: '+2 Gold'  },
  { id: 'hit_streak3',      desc: 'Reach a 3-day streak',             type: 'streak',   target: 3,   reward: { gold: 2 },   rewardLabel: '+2 Gold'  },
];

/* ═══════════════════════════════════════════
   ONBOARDING GOALS
═══════════════════════════════════════════ */
export const PLAYER_GOALS = [
  { id: 'bulk',  label: 'Build Muscle',  icon: 'muscle-biceps', desc: 'Focus on strength & size', color: '#f87171', focus: ['Chest','Biceps','Triceps','Shoulders','Back'] },
  { id: 'fit',   label: 'Get Fit',       icon: 'lightning',     desc: 'Balanced training & cardio', color: '#4ade80', focus: ['Cardio','Legs','Core','Back'] },
  { id: 'cut',   label: 'Lose Fat',      icon: 'flame',         desc: 'Cardio & full body', color: '#22d3ee', focus: ['Cardio','Core','Legs','Glutes'] },
];

/* ═══════════════════════════════════════════
   MUSCLE RANKS (XP-based progression)
═══════════════════════════════════════════ */
export const MUSCLE_RANKS = [
  { min: 0,    name: 'Novice',      color: '#6b7280', textColor: '#9ca3af' },
  { min: 500,  name: 'Intermediate', color: '#3b82f6', textColor: '#93c5fd' },
  { min: 1500, name: 'Advanced',    color: '#f59e0b', textColor: '#fbbf24' },
  { min: 3500, name: 'Expert',      color: '#ef4444', textColor: '#fca5a5' },
  { min: 6500, name: 'Master',      color: '#8b5cf6', textColor: '#d8b4fe' },
  { min: 12000, name: 'Legendary',  color: '#facc15', textColor: '#fef08a' },
];

/* ═══════════════════════════════════════════
   DUNGEON — MOB TYPES
═══════════════════════════════════════════ */
// Mob multipliers are relative to the dungeon final boss stats (not player stats).
// hpMult × boss.maxHP = mob HP,  atkMult × boss.atk = mob ATK
// Wave scaling adds +15% per wave, so later waves naturally hit harder.
export const MOB_TYPES = [
  { id: 'zombie',   name: 'Zombie',   icon: 'skull',    hpMult: 0.38, atkMult: 0.50, speed: 5  },
  { id: 'skeleton', name: 'Skeleton', icon: 'skull',    hpMult: 0.28, atkMult: 0.60, speed: 10 },
  { id: 'bat',      name: 'Bat',      icon: 'wing',     hpMult: 0.22, atkMult: 0.46, speed: 14 },
  { id: 'vampire',  name: 'Vampire',  icon: 'heart',    hpMult: 0.46, atkMult: 0.70, speed: 12 },
  { id: 'werewolf', name: 'Werewolf', icon: 'sword',    hpMult: 0.55, atkMult: 0.80, speed: 11 },
  { id: 'goblin',   name: 'Goblin',   icon: 'sword',    hpMult: 0.32, atkMult: 0.55, speed: 13 },
  { id: 'ghost',    name: 'Ghost',    icon: 'orb',      hpMult: 0.25, atkMult: 0.48, speed: 15 },
  { id: 'spider',   name: 'Spider',   icon: 'shield',   hpMult: 0.35, atkMult: 0.56, speed: 12 },
  { id: 'demon',    name: 'Demon',    icon: 'flame',    hpMult: 0.65, atkMult: 0.90, speed: 9  },
  { id: 'slime',    name: 'Slime',    icon: 'potion',   hpMult: 0.50, atkMult: 0.38, speed: 6  },
];

/* ═══════════════════════════════════════════
   DUNGEON — LOOT SYSTEM
═══════════════════════════════════════════ */
export const LOOT_RARITIES = [
  { name: 'Common',    color: '#94a3b8', glow: 'rgba(148,163,184,0.3)', weight: 50, mult: 1.0 },
  { name: 'Rare',      color: '#60a5fa', glow: 'rgba(96,165,250,0.4)',  weight: 30, mult: 1.6 },
  { name: 'Epic',      color: '#c084fc', glow: 'rgba(192,132,252,0.5)', weight: 15, mult: 2.5 },
  { name: 'Legendary', color: '#facc15', glow: 'rgba(250,204,21,0.6)',  weight: 5,  mult: 4.0 },
];

// Common-tier values below. Rarity multiplier is applied on top (Rare×1.6, Epic×2.5, Legendary×4).
// A fully Common-equipped hero gains roughly: +15 ATK, +20% DEF, +80 HP, +5% CRIT, +5% DODGE.
// Legendary full set would be roughly ×4 those values — very powerful, earned through dedication.
export const LOOT_BASE = {
  helmet: [
    { name: 'Iron Scraps Helm',   icon: 'iron-scraps-helm',     atk: 0, def: 2, hp: 12 },
    { name: 'Forest Ranger Helm', icon: 'forest-ranger-helm',   atk: 0, def: 3, hp: 18, dodge: 1 },
    { name: 'Steel Knight Helm',  icon: 'steel-knight-helm',    atk: 0, def: 6, hp: 20 },
    { name: 'Void Reaper Helm',   icon: 'void-reaper-helm',     atk: 3, def: 5, hp: 25, crit: 3 },
    { name: 'Solar Titan Helm',   icon: 'solar-titan-helm',     atk: 2, def: 8, hp: 40, crit: 4 },
    { name: 'Iron Helm',          icon: 'helmet',               atk: 0, def: 3, hp: 15 },
    { name: 'Shadow Hood',       icon: 'helmet',             atk: 2, def: 1, hp: 8  },
    { name: 'Spiked Crown',      icon: 'helmet',             atk: 3, def: 0, hp: 10 },
    { name: 'Bone Mask',         icon: 'skull',              atk: 1, def: 3, hp: 8  },
  ],
  chest: [
    { name: 'Iron Scraps Chest',   icon: 'iron-scraps-chest',    atk: 0, def: 4, hp: 18 },
    { name: 'Forest Ranger Chest', icon: 'forest-ranger-chest',  atk: 1, def: 4, hp: 22, dodge: 1 },
    { name: 'Steel Knight Chest',  icon: 'steel-knight-chest',   atk: 0, def: 8, hp: 35 },
    { name: 'Void Reaper Chest',   icon: 'void-reaper-chest',    atk: 4, def: 7, hp: 30, crit: 3 },
    { name: 'Solar Titan Chest',   icon: 'solar-titan-chest',    atk: 3, def: 12, hp: 55, crit: 4 },
    { name: 'Chain Mail',          icon: 'chest-armor',          atk: 0, def: 5, hp: 25 },
    { name: 'Leather Vest',      icon: 'chest-armor',        atk: 2, def: 3, hp: 20 },
    { name: 'Battle Plate',      icon: 'chest-armor',        atk: 0, def: 7, hp: 30 },
    { name: 'Runed Robe',        icon: 'chest-armor',        atk: 3, def: 1, hp: 15 },
  ],
  boots: [
    { name: 'Iron Scraps Boots',   icon: 'iron-scraps-boots',    atk: 0, def: 2, hp: 6,  dodge: 1 },
    { name: 'Forest Ranger Boots', icon: 'forest-ranger-boots',  atk: 0, def: 3, hp: 10, dodge: 2 },
    { name: 'Steel Knight Boots',  icon: 'steel-knight-boots',   atk: 0, def: 5, hp: 14 },
    { name: 'Void Reaper Boots',   icon: 'void-reaper-boots',    atk: 2, def: 4, hp: 14, crit: 2, dodge: 2 },
    { name: 'Solar Titan Boots',   icon: 'solar-titan-boots',    atk: 1, def: 7, hp: 22, crit: 3 },
    { name: 'Speed Boots',         icon: 'boots',                atk: 0, def: 0, hp: 8,  dodge: 4 },
    { name: 'Iron Treads',       icon: 'boots',              atk: 0, def: 3, hp: 12, dodge: 0 },
    { name: 'Ninja Wraps',       icon: 'boots',              atk: 1, def: 0, hp: 8,  dodge: 5 },
    { name: 'Cursed Shoes',      icon: 'boots',              atk: 3, def: 0, hp: 0,  dodge: 3 },
  ],
  weapon: [
    { name: 'Iron Sword',   icon: 'sword', atk: 5, def: 0, hp: 0  },
    { name: 'Battle Axe',   icon: 'sword', atk: 8, def: 0, hp: 0  },
    { name: 'Magic Staff',  icon: 'orb',   atk: 6, def: 0, hp: 8  },
    { name: 'Shadow Blade', icon: 'sword', atk: 4, def: 0, hp: 0, crit: 6 },
    { name: 'Holy Mace',    icon: 'sword', atk: 5, def: 1, hp: 8  },
  ],
  ring: [
    { name: 'Ring of War',   icon: 'ring', atk: 3, def: 0, hp: 8  },
    { name: 'Ring of Life',  icon: 'ring', atk: 0, def: 0, hp: 25 },
    { name: 'Shield Ring',   icon: 'ring', atk: 0, def: 4, hp: 8  },
    { name: 'Phantom Ring',  icon: 'ring', atk: 1, def: 1, hp: 0, dodge: 4 },
  ],
  special: [
    { name: 'Amulet of Fury', icon: 'orb',   atk: 4, def: 0, hp: 8  },
    { name: 'Dragon Scale',   icon: 'shield', atk: 0, def: 5, hp: 25 },
    { name: 'Orb of Chaos',   icon: 'orb',   atk: 6, def: 0, hp: 0, crit: 8 },
    { name: 'Soul Crystal',   icon: 'star',  atk: 3, def: 3, hp: 12 },
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
