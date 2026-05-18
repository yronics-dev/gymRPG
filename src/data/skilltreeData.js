// ═══════════════════════════════════════════════════════════════════
//  Skill Tree Node Data
//  Canvas: 1200×1200, center node: (600, 600)
//  4 paths branching diagonally to each corner:
//    WARLORD  (↖ top-left)   red    #c0392b  — attack & crits
//    TITAN    (↗ top-right)  blue   #2980b9  — HP & defense
//    PHANTOM  (↙ bot-left)   green  #27ae60  — dodge & poison
//    SORCERER (↘ bot-right)  purple #8e44ad  — elemental & drain
// ═══════════════════════════════════════════════════════════════════

// ── Path metadata ────────────────────────────────────────────────
export const PATHS = {
  warlord:  { id: 'warlord',  name: 'WARLORD',  color: '#c0392b', glow: '#e74c3c' },
  titan:    { id: 'titan',    name: 'TITAN',     color: '#2980b9', glow: '#3498db' },
  phantom:  { id: 'phantom',  name: 'PHANTOM',   color: '#27ae60', glow: '#2ecc71' },
  sorcerer: { id: 'sorcerer', name: 'SORCERER',  color: '#8e44ad', glow: '#9b59b6' },
};

// ── Node type costs ──────────────────────────────────────────────
// small=1  notable=3  ability=8  keystone=12  start=0

// ── START NODE ───────────────────────────────────────────────────
const START = {
  id: 'start', path: null, type: 'start',
  name: 'WARRIOR', desc: 'Your journey begins here.',
  x: 600, y: 600, cost: 0, requires: [],
  effects: {},
};

// ── WARLORD (top-left, toward ~70,70) ───────────────────────────
const WARLORD = [
  { id:'w1',    path:'warlord', type:'small',    name:'+4% ATK',           desc:'Increases attack damage by 4%.',                              x:557, y:547, cost:1,  requires:['start'], effects:{ atkMult:0.04 } },
  { id:'w2',    path:'warlord', type:'small',    name:'+3% Crit Chance',   desc:'Increases critical hit chance by 3%.',                        x:508, y:498, cost:1,  requires:['w1'],    effects:{ critBonus:0.03 } },
  { id:'w3',    path:'warlord', type:'notable',  name:'Heavy Hitter',      desc:'+15% ATK. Your strikes land with crushing force.',            x:467, y:453, cost:3,  requires:['w2'],    effects:{ atkMult:0.15 } },
  { id:'w4',    path:'warlord', type:'small',    name:'+4% ATK',           desc:'Increases attack damage by 4%.',                              x:422, y:404, cost:1,  requires:['w3'],    effects:{ atkMult:0.04 } },
  { id:'w5',    path:'warlord', type:'small',    name:'+3% Crit Chance',   desc:'Increases critical hit chance by 3%.',                        x:378, y:358, cost:1,  requires:['w4'],    effects:{ critBonus:0.03 } },
  { id:'w6',    path:'warlord', type:'ability',  name:'Berserker Rush',    desc:'Dash through the boss dealing 2 rapid strikes.',              x:335, y:312, cost:8,  requires:['w5'],    effects:{ ability:'berserkerRush' } },
  { id:'w7',    path:'warlord', type:'small',    name:'+4% ATK',           desc:'Increases attack damage by 4%.',                              x:293, y:268, cost:1,  requires:['w6'],    effects:{ atkMult:0.04 } },
  { id:'w8',    path:'warlord', type:'notable',  name:'Bloodthirst',       desc:'Heal 8% of max HP when you land a killing blow.',            x:255, y:226, cost:3,  requires:['w7'],    effects:{ lifeSteal:0.08, onKill:true } },
  { id:'w9',    path:'warlord', type:'small',    name:'+5% Dmg vs Low HP', desc:'+5% damage to bosses below 50% HP.',                         x:215, y:186, cost:1,  requires:['w8'],    effects:{ lowHpDmg:0.05 } },
  { id:'w10',   path:'warlord', type:'ability',  name:'War Cry',           desc:'+25% ATK for 3 turns. Intimidate your foe.',                 x:178, y:150, cost:8,  requires:['w9'],    effects:{ ability:'warCry' } },
  { id:'w11',   path:'warlord', type:'notable',  name:'Executioner',       desc:'+40% damage to bosses below 25% HP.',                        x:145, y:117, cost:3,  requires:['w10'],   effects:{ executioner:0.40 } },
  { id:'w12',   path:'warlord', type:'small',    name:'+3% Crit Chance',   desc:'Increases critical hit chance by 3%.',                        x:116, y:90,  cost:1,  requires:['w11'],   effects:{ critBonus:0.03 } },
  { id:'w13',   path:'warlord', type:'notable',  name:"Warlord's Fury",    desc:'After landing a crit, your next attack is guaranteed to crit.',x:92,  y:68,  cost:3,  requires:['w12'],   effects:{ furyProc:true } },
  { id:'w_key', path:'warlord', type:'keystone', name:'GOD OF WAR',        desc:'Every 3rd attack auto-crits. Crits ignore 30% of enemy DEF.', x:70,  y:48,  cost:12, requires:['w13'],   effects:{ godOfWar:true, critDefPen:0.30 } },
];

// ── TITAN (top-right, toward ~1130,70) ──────────────────────────
const TITAN = [
  { id:'t1',    path:'titan', type:'small',    name:'+8 Max HP',         desc:'Increases maximum HP by 8.',                                  x:643, y:547, cost:1,  requires:['start'], effects:{ hpBonus:8 } },
  { id:'t2',    path:'titan', type:'small',    name:'+2% Dmg Reduction', desc:'Reduces incoming damage by 2%.',                             x:692, y:498, cost:1,  requires:['t1'],    effects:{ defBonus:0.02 } },
  { id:'t3',    path:'titan', type:'small',    name:'+8 Max HP',         desc:'Increases maximum HP by 8.',                                  x:733, y:453, cost:1,  requires:['t2'],    effects:{ hpBonus:8 } },
  { id:'t4',    path:'titan', type:'notable',  name:'Iron Skin',         desc:'+20% HP and +5% damage reduction.',                          x:778, y:404, cost:3,  requires:['t3'],    effects:{ hpMult:0.20, defBonus:0.05 } },
  { id:'t5',    path:'titan', type:'small',    name:'+2% Dmg Reduction', desc:'Reduces incoming damage by 2%.',                             x:822, y:358, cost:1,  requires:['t4'],    effects:{ defBonus:0.02 } },
  { id:'t6',    path:'titan', type:'small',    name:'+5% HP Regen',      desc:'Regenerate 5% of max HP each turn.',                         x:862, y:316, cost:1,  requires:['t5'],    effects:{ hpRegen:0.05 } },
  { id:'t7',    path:'titan', type:'ability',  name:'Iron Wall',         desc:'Block and reflect the next incoming hit.',                    x:903, y:272, cost:8,  requires:['t6'],    effects:{ ability:'ironWall' } },
  { id:'t8',    path:'titan', type:'small',    name:'+8 Max HP',         desc:'Increases maximum HP by 8.',                                  x:940, y:230, cost:1,  requires:['t7'],    effects:{ hpBonus:8 } },
  { id:'t9',    path:'titan', type:'notable',  name:'Stone Wall',        desc:'Negate 1 incoming hit per fight completely.',                 x:973, y:192, cost:3,  requires:['t8'],    effects:{ stoneWall:true } },
  { id:'t10',   path:'titan', type:'small',    name:'+2% Dmg Reduction', desc:'Reduces incoming damage by 2%.',                             x:1003,y:155,  cost:1,  requires:['t9'],    effects:{ defBonus:0.02 } },
  { id:'t11',   path:'titan', type:'notable',  name:'Thorns',            desc:'Reflect 20% of damage taken back to the attacker.',          x:1030,y:122,  cost:3,  requires:['t10'],   effects:{ reflect:0.20 } },
  { id:'t12',   path:'titan', type:'ability',  name:'Fortress Stance',   desc:'-20% ATK, +40% DEF for 4 turns. Become an immovable wall.', x:1053,y:93,   cost:8,  requires:['t11'],   effects:{ ability:'fortressStance' } },
  { id:'t13',   path:'titan', type:'small',    name:'+2% Reflect',       desc:'Reflect an additional 2% of damage taken.',                  x:1073,y:68,   cost:1,  requires:['t12'],   effects:{ reflect:0.02 } },
  { id:'t14',   path:'titan', type:'notable',  name:'Last Stand',        desc:'Below 20% HP: gain +30% damage reduction and +20% ATK.',    x:1090,y:48,   cost:3,  requires:['t13'],   effects:{ lastStand:true } },
  { id:'t_key', path:'titan', type:'keystone', name:'UNBREAKABLE',       desc:'Survive one killing blow per fight, then gain +50% ATK for 2 turns.', x:1108,y:30, cost:12, requires:['t14'], effects:{ unbreakable:true } },
];

// ── PHANTOM (bot-left, toward ~70,1130) ─────────────────────────
const PHANTOM = [
  { id:'p1',    path:'phantom', type:'small',    name:'+3% Dodge',          desc:'Increases dodge chance by 3%.',                              x:557, y:653, cost:1,  requires:['start'], effects:{ dodgeBonus:0.03 } },
  { id:'p2',    path:'phantom', type:'small',    name:'+3% Dodge',          desc:'Increases dodge chance by 3%.',                              x:508, y:702, cost:1,  requires:['p1'],    effects:{ dodgeBonus:0.03 } },
  { id:'p3',    path:'phantom', type:'notable',  name:'Light Step',         desc:'+12% dodge. Dodges trigger a 40% damage counter-attack.',   x:467, y:747, cost:3,  requires:['p2'],    effects:{ dodgeBonus:0.12, dodgeCounter:0.40 } },
  { id:'p4',    path:'phantom', type:'small',    name:'+5% AGI Speed',      desc:'Increases agility-based speed by 5%.',                       x:422, y:796, cost:1,  requires:['p3'],    effects:{ agiBonus:0.05 } },
  { id:'p5',    path:'phantom', type:'small',    name:'+3% Dodge',          desc:'Increases dodge chance by 3%.',                              x:378, y:842, cost:1,  requires:['p4'],    effects:{ dodgeBonus:0.03 } },
  { id:'p6',    path:'phantom', type:'ability',  name:'Shadow Step',        desc:'Vanish and strike for 180% damage from behind.',             x:335, y:888, cost:8,  requires:['p5'],    effects:{ ability:'shadowStep' } },
  { id:'p7',    path:'phantom', type:'small',    name:'+4% Counter Dmg',    desc:'Increases counter-attack damage by 4%.',                     x:293, y:932, cost:1,  requires:['p6'],    effects:{ counterBonus:0.04 } },
  { id:'p8',    path:'phantom', type:'notable',  name:'Venom Strike',       desc:'Poison the boss for 6% HP/turn over 3 turns.',               x:255, y:974, cost:3,  requires:['p7'],    effects:{ venomStrike:true, poisonDmg:0.06 } },
  { id:'p9',    path:'phantom', type:'small',    name:'+5% Poison Dmg',     desc:'Poison deals 5% more damage per tick.',                      x:215, y:1014,cost:1,  requires:['p8'],    effects:{ poisonDmg:0.05 } },
  { id:'p10',   path:'phantom', type:'ability',  name:'Smoke Bomb',         desc:'Blind the boss for 2 turns, halving their accuracy.',        x:178, y:1050,cost:8,  requires:['p9'],    effects:{ ability:'smokeBomb' } },
  { id:'p11',   path:'phantom', type:'notable',  name:'Ghost Step',         desc:'25% chance to evade any hit + deal 60% backstab damage.',    x:145, y:1083,cost:3,  requires:['p10'],   effects:{ ghostStep:true } },
  { id:'p12',   path:'phantom', type:'small',    name:'+2% Poison Chance',  desc:'Increases poison application chance by 2%.',                 x:116, y:1112,cost:1,  requires:['p11'],   effects:{ poisonChance:0.02 } },
  { id:'p13',   path:'phantom', type:'notable',  name:'Death Mark',         desc:'+20% damage to the marked target for 5 turns.',              x:92,  y:1136,cost:3,  requires:['p12'],   effects:{ deathMark:true } },
  { id:'p_key', path:'phantom', type:'keystone', name:'PHANTOM KILLER',     desc:'Every 4th hit deals 400% damage. Poison stacks ×3.',         x:70,  y:1156,cost:12, requires:['p13'],   effects:{ phantomKiller:true } },
];

// ── SORCERER (bot-right, toward ~1130,1130) ──────────────────────
const SORCERER = [
  { id:'s1',    path:'sorcerer', type:'small',    name:'+4% Elemental Dmg',  desc:'Increases elemental damage by 4%.',                          x:643, y:653, cost:1,  requires:['start'], effects:{ elemDmg:0.04 } },
  { id:'s2',    path:'sorcerer', type:'small',    name:'+4% Elemental Dmg',  desc:'Increases elemental damage by 4%.',                          x:692, y:702, cost:1,  requires:['s1'],    effects:{ elemDmg:0.04 } },
  { id:'s3',    path:'sorcerer', type:'notable',  name:'Elemental Mastery',  desc:'+20% elemental damage. Debuffs last 1 extra turn.',          x:733, y:747, cost:3,  requires:['s2'],    effects:{ elemDmg:0.20, debuffDur:1 } },
  { id:'s4',    path:'sorcerer', type:'small',    name:'+3% Debuff Chance',  desc:'Increases elemental debuff application chance by 3%.',       x:778, y:796, cost:1,  requires:['s3'],    effects:{ debuffChance:0.03 } },
  { id:'s5',    path:'sorcerer', type:'small',    name:'+5% Dmg to Weak',    desc:'+5% damage to elementally weak enemies.',                    x:822, y:842, cost:1,  requires:['s4'],    effects:{ weakDmg:0.05 } },
  { id:'s6',    path:'sorcerer', type:'ability',  name:'Thunder Combo',      desc:'3 rapid electrical strikes in one turn.',                     x:862, y:888, cost:8,  requires:['s5'],    effects:{ ability:'thunderCombo' } },
  { id:'s7',    path:'sorcerer', type:'small',    name:'+4% Elemental Dmg',  desc:'Increases elemental damage by 4%.',                          x:903, y:932, cost:1,  requires:['s6'],    effects:{ elemDmg:0.04 } },
  { id:'s8',    path:'sorcerer', type:'notable',  name:'Life Drain',         desc:'Heal 12% of all damage dealt.',                              x:940, y:974, cost:3,  requires:['s7'],    effects:{ lifeSteal:0.12 } },
  { id:'s9',    path:'sorcerer', type:'small',    name:'+6% Spell Dmg',      desc:'Increases spell and ability damage by 6%.',                  x:973, y:1014,cost:1,  requires:['s8'],    effects:{ spellDmg:0.06 } },
  { id:'s10',   path:'sorcerer', type:'ability',  name:'Arcane Barrier',     desc:'Absorb the next 3 incoming hits with a magical barrier.',    x:1003,y:1050,cost:8,  requires:['s9'],    effects:{ ability:'arcaneBarrier' } },
  { id:'s11',   path:'sorcerer', type:'notable',  name:'Mana Shield',        desc:'Absorb damage equal to 15% of max HP before HP is affected.',x:1030,y:1082,cost:3,  requires:['s10'],   effects:{ manaShield:0.15 } },
  { id:'s12',   path:'sorcerer', type:'small',    name:'+4% Elemental Dmg',  desc:'Increases elemental damage by 4%.',                          x:1053,y:1110,cost:1,  requires:['s11'],   effects:{ elemDmg:0.04 } },
  { id:'s13',   path:'sorcerer', type:'small',    name:'+2% Life Drain',     desc:'Increases life drain by 2%.',                                x:1073,y:1136,cost:1,  requires:['s12'],   effects:{ lifeSteal:0.02 } },
  { id:'s14',   path:'sorcerer', type:'notable',  name:'Arcane Surge',       desc:'Every 5th hit triggers a free elemental explosion.',         x:1090,y:1158,cost:3,  requires:['s13'],   effects:{ arcaneSurge:true } },
  { id:'s_key', path:'sorcerer', type:'keystone', name:'ARCANE ASCENDANT',   desc:"Weapon auto-adapts to enemy's weak element. +30% elemental. Life drain 20%.", x:1108,y:1178, cost:12, requires:['s14'], effects:{ arcaneAscendant:true, elemDmg:0.30, lifeSteal:0.20 } },
];

// ── Exports ──────────────────────────────────────────────────────
export const ALL_NODES = [START, ...WARLORD, ...TITAN, ...PHANTOM, ...SORCERER];

/** O(1) lookup by node id */
export const NODE_MAP = Object.fromEntries(ALL_NODES.map(n => [n.id, n]));

/** All edges as { from, to, path } for drawing connection lines */
export const EDGES = ALL_NODES.flatMap(n =>
  n.requires.map(reqId => ({ from: reqId, to: n.id, path: n.path }))
);

export const NODE_COUNTS = {
  total:    ALL_NODES.length,
  warlord:  WARLORD.length,
  titan:    TITAN.length,
  phantom:  PHANTOM.length,
  sorcerer: SORCERER.length,
};
