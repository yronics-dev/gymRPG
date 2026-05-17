// ── Elemental Damage System ──────────────────────────────────────────────────
// Player weapon elements: Fire | Water | Grass | Electric | Physical
// Boss elements:          Fire | Water | Grass | Electric | Shadow | Earth | None

// ── Multiplier table [attacker → defender] ────────────────────────────────────
export const ELEMENT_MULTIPLIERS = {
  Fire: {
    Grass:    1.6,   // super effective
    Electric: 1.2,   // partial
    Water:    0.6,   // resisted
    Fire:     0.8,   // same element
    Shadow:   0.9,
    Earth:    0.9,
    None:     1.0,
  },
  Water: {
    Fire:     1.6,   // super effective
    Earth:    1.2,   // partial
    Grass:    0.6,   // resisted
    Electric: 0.7,   // resisted — conducts, bad idea
    Water:    0.8,   // same element
    Shadow:   1.0,
    None:     1.0,
  },
  Grass: {
    Electric: 1.6,   // super effective
    Earth:    1.3,   // partial
    Fire:     0.6,   // resisted
    Grass:    0.8,   // same element
    Water:    1.0,
    Shadow:   0.9,
    None:     1.0,
  },
  Electric: {
    Water:    1.6,   // super effective
    Shadow:   1.2,   // partial — lightning in darkness
    Grass:    0.6,   // resisted — plants ground lightning
    Earth:    0.5,   // strongly resisted — earth absorbs
    Electric: 0.8,   // same element
    Fire:     1.0,
    None:     1.0,
  },
  Physical: {
    Fire:     1.0,
    Water:    1.0,
    Grass:    1.0,
    Electric: 1.0,
    Shadow:   0.7,   // hard to hit a ghost with steel
    Earth:    1.0,
    None:     1.0,
  },
};

// ── Lookup helpers ────────────────────────────────────────────────────────────
export function getElementalMultiplier(weaponElement, bossElement) {
  const table = ELEMENT_MULTIPLIERS[weaponElement] || ELEMENT_MULTIPLIERS.Physical;
  // Fall back to 1.0 for any unlisted combo
  return table[bossElement] ?? 1.0;
}

// ── Effectiveness text ────────────────────────────────────────────────────────
export function getEffectivenessLabel(mult) {
  if (mult >= 1.5)  return { text: 'Super effective!',      color: '#4ade80', scale: 1.25 };
  if (mult >= 1.1)  return { text: 'Effective!',            color: '#86efac', scale: 1.0  };
  if (mult >= 0.85) return null; // neutral — no popup
  if (mult >= 0.5)  return { text: 'Not very effective...', color: '#f87171', scale: 1.0  };
  return               { text: 'Barely effective...',   color: '#ef4444', scale: 1.0  };
}

// ── Core elemental damage formula ────────────────────────────────────────────
// pATK        — player ATK stat (already includes loot/skill bonuses)
// weaponMult  — weapon's atkMult (e.g. 1.2 for Iron Greatsword)
// weaponElem  — equipped weapon element string, or 'Physical'
// bossElement — boss element string, or 'None'
// bossDEF     — boss raw DEF value (optional, bosses usually don't have one → 0)
export function calcElementalDamage({ pATK, weaponMult = 1.0, weaponElem = 'Physical', bossElement = 'None', bossDEF = 0 }) {
  const elemMult = getElementalMultiplier(weaponElem, bossElement);

  // Bosses of their own element have +15% elemental resistance
  const resistFactor = weaponElem !== 'Physical' && weaponElem === bossElement ? 1.15 : 1.0;
  const effectiveDEF = bossDEF * resistFactor;

  // Apply jitter last so it never overwrites elemental logic
  const jitter  = 0.9 + Math.random() * 0.2;   // 0.90 – 1.10
  const rawDmg  = (pATK * weaponMult - effectiveDEF) * elemMult * jitter;
  const finalDmg = Math.max(1, Math.round(rawDmg));

  return {
    dmg:      finalDmg,
    elemMult,
    label:    getEffectivenessLabel(elemMult),
  };
}

// ── Weakness table: what element is super-effective vs a given boss element? ──
export const SUPER_EFFECTIVE_VS = {
  Fire:     'Water',
  Water:    'Fire',
  Grass:    'Fire',
  Electric: 'Grass',
  Shadow:   'Electric',
  Earth:    'Water',
  None:     null,     // no specific weakness
};

export function getWeaponHint(bossElement) {
  return SUPER_EFFECTIVE_VS[bossElement] ?? null;
}

// ── Boss flavor-element → weapon combat element ───────────────────────────────
// Boss generator uses flavor elements (Fire, Ice, Shadow, Thunder, Earth, etc.)
// This maps them onto the 7-element weapon combat system.
export const BOSS_ELEMENT_TO_WEAPON_ELEMENT = {
  Fire:     'Fire',
  Lava:     'Fire',
  Ice:      'Water',
  Crystal:  'Water',
  Shadow:   'Shadow',
  Void:     'Shadow',
  Blood:    'Shadow',   // Vampire Lord
  Thunder:  'Electric',
  Storm:    'Electric',
  Earth:    'Earth',
  Poison:   'Earth',
  Wind:     'None',     // Zombie Brute — no elemental weakness
  None:     'None',
};

/** Convert a boss's flavor element string to a weapon-system element */
export function bossFlavorToWeaponElement(flavorElement) {
  return BOSS_ELEMENT_TO_WEAPON_ELEMENT[flavorElement] ?? 'None';
}

// ── Element accent colors (reuse in UI) ──────────────────────────────────────
export const ELEMENT_COLORS = {
  Fire:     '#ff6620',
  Water:    '#38bdf8',
  Grass:    '#4ade80',
  Electric: '#facc15',
  Shadow:   '#c084fc',
  Earth:    '#86efac',
  None:     '#94a3b8',
  Physical: '#94a3b8',
};
