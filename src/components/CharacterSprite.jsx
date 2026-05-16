import React, { useState, useEffect } from 'react';
import { getSpriteStage } from '../utils/gameLogic';
import { CHARACTER_STAGES } from '../constants';
import '../styles/characterAnimations.css';

// ─── Skin / palette per stage ──────────────────────────────────────────────────
const STAGE_PALETTE = {
  1: { skin: '#f5c5a3', hair: '#4a3728', eyes: '#2d1b0e', shirt: '#4a90d9', pants: '#3d4852', shoes: '#2c2c2c' },
  2: { skin: '#e8a87c', hair: '#2c1a0e', eyes: '#1a0e05', shirt: '#e85d04', pants: '#2d3748', shoes: '#1a1a2e' },
  3: { skin: '#d4956a', hair: '#1a0e05', eyes: '#0f0604', shirt: '#00b4d8', pants: '#1a1a2e', shoes: '#0d0d0d' },
  4: { skin: '#c8835a', hair: '#0d0704', eyes: '#080401', shirt: '#7b2d8b', pants: '#1a0a2e', shoes: '#0d0008' },
  5: { skin: '#b86e48', hair: '#050302', eyes: '#040201', shirt: '#c0392b', pants: '#0d0d1a', shoes: '#06000d' },
  6: { skin: '#a05a38', hair: '#010101', eyes: '#000000', shirt: '#facc15', pants: '#0a0a14', shoes: '#04000a' },
};

// ─── Clothing colours ──────────────────────────────────────────────────────────
function getClothingColor(id) {
  const map = {
    pants_shorts: '#334155', pants_camo: '#365314', pants_gold: '#ca8a04', pants_red: '#991b1b',
    shoes_white: '#e2e8f0', shoes_boots: '#92400e', shoes_gold: '#ca8a04', shoes_red: '#dc2626',
    hat_cap: '#1d4ed8', hat_tophat: '#111827', hat_helmet: '#64748b', hat_crown: '#ca8a04', hat_beanie: '#7c3aed',
  };
  return map[id] || null;
}

// ─── Arm angles per stance ─────────────────────────────────────────────────────
const STANCE_ARMS = {
  idle:   { left: 0,    right: 0    },
  flex:   { left: 125,  right: -125 },
  fight:  { left: 52,   right: -52  },  // tighter guard
  battle: { left: 68,   right: -68  },  // arms up, ready to punch
  wave:   { left: 155,  right: 0    },
};
const STANCE_DURATION = { idle: 5500, flex: 1900, fight: 2100, wave: 2300 };
const STANCES = ['idle', 'flex', 'fight', 'wave'];

// ─── Weapon blade colour from rarity ──────────────────────────────────────────
function weaponColors(rarity) {
  const map = {
    Common:    { blade: '#94a3b8', guard: '#64748b',  handle: '#78350f', glow: null },
    Uncommon:  { blade: '#4ade80', guard: '#166534',  handle: '#14532d', glow: '#4ade8066' },
    Rare:      { blade: '#60a5fa', guard: '#1d4ed8',  handle: '#1e3a8a', glow: '#60a5fa66' },
    Epic:      { blade: '#c084fc', guard: '#7e22ce',  handle: '#4c1d95', glow: '#c084fc88' },
    Legendary: { blade: '#facc15', guard: '#ca8a04',  handle: '#78350f', glow: '#facc15aa' },
  };
  return map[rarity] || map.Common;
}

// ─── Draw weapon next to right hand ───────────────────────────────────────────
// NOTE: drawn in the global SVG space (not inside a rotated arm group) so it
// stays upright at rest and is always visible. It overlaps the arm naturally.
function drawWeapon(weapon, cx, torsoW, armW, armTop, armH) {
  if (!weapon) return null;
  const wc = weaponColors(weapon.rarity);
  // Anchor: right side of right arm, at hand level
  const hx = cx + torsoW / 2 + armW - 1; // hand x
  const hy = armTop + armH - 1;           // hand y

  const icon = weapon.icon || 'sword';

  if (icon === 'sword' || icon === 'sabre') {
    // Elegant sword: point upward from hand
    return (
      <>
        {/* Glow */}
        {wc.glow && <rect x={hx - 1} y={hy - 30} width={5} height={32} rx="2" fill={wc.glow}/>}
        {/* Blade */}
        <rect x={hx}   y={hy - 28} width={3}   height={28} rx="0.8" fill={wc.blade}/>
        {/* Tip */}
        <polygon points={`${hx},${hy-28} ${hx+3},${hy-28} ${hx+1.5},${hy-34}`} fill={wc.blade}/>
        {/* Edge highlight */}
        <rect x={hx+0.5} y={hy-26} width={1} height={22} rx="0.5" fill="rgba(255,255,255,0.35)"/>
        {/* Crossguard */}
        <rect x={hx-4}  y={hy-8}  width={11} height={3}   rx="1" fill={wc.guard}/>
        <rect x={hx-3}  y={hy-8}  width={9}  height={1.5} rx="0.5" fill="rgba(255,255,255,0.2)"/>
        {/* Handle */}
        <rect x={hx+0.5} y={hy-5}  width={2}  height={7}   rx="1" fill={wc.handle}/>
        {/* Pommel */}
        <ellipse cx={hx+1.5} cy={hy+2.5} rx="2.5" ry="2" fill={wc.guard}/>
      </>
    );
  }

  if (icon === 'axe') {
    return (
      <>
        {wc.glow && <rect x={hx-1} y={hy-28} width={10} height={30} rx="2" fill={wc.glow}/>}
        {/* Handle */}
        <rect x={hx+1} y={hy-24} width={2.5} height={28} rx="1" fill={wc.handle}/>
        {/* Axe head */}
        <path d={`M${hx+2} ${hy-24} L${hx-4} ${hy-14} L${hx+2} ${hy-4} Z`} fill={wc.blade}/>
        <path d={`M${hx+2} ${hy-24} L${hx+8} ${hy-16} L${hx+2} ${hy-8} Z`} fill={wc.guard}/>
        <rect x={hx-2} y={hy-18} width={2} height={12} rx="0" fill="rgba(255,255,255,0.25)"/>
      </>
    );
  }

  if (icon === 'mace' || icon === 'hammer') {
    return (
      <>
        {wc.glow && <rect x={hx-1} y={hy-26} width={10} height={28} rx="3" fill={wc.glow}/>}
        {/* Handle */}
        <rect x={hx+1} y={hy-20} width={2.5} height={24} rx="1" fill={wc.handle}/>
        {/* Head */}
        <rect x={hx-4} y={hy-28} width={12} height={12} rx="2" fill={wc.blade}/>
        <rect x={hx-3} y={hy-27} width={10} height={4}  rx="1" fill="rgba(255,255,255,0.2)"/>
        {/* Spikes */}
        {[-3,0,3,6].map((dx,i) => (
          <rect key={i} x={hx+dx} y={hy-30} width={2} height={4} rx="0.5" fill={wc.guard}/>
        ))}
      </>
    );
  }

  if (icon === 'staff' || icon === 'wand') {
    return (
      <>
        {wc.glow && <ellipse cx={hx+1.5} cy={hy-32} rx={5} ry={5} fill={wc.glow}/>}
        {/* Staff shaft */}
        <rect x={hx+0.5} y={hy-30} width={2.5} height={36} rx="1" fill={wc.handle}/>
        {/* Orb on top */}
        <ellipse cx={hx+1.5} cy={hy-30} rx={4} ry={4} fill={wc.blade}/>
        <ellipse cx={hx+0.5} cy={hy-32} rx={1.5} ry={1.5} fill="rgba(255,255,255,0.6)"/>
      </>
    );
  }

  if (icon === 'shield') {
    // Shield on LEFT side
    const sx = cx - torsoW / 2 - armW - 6;
    const sy = armTop + 4;
    return (
      <>
        {wc.glow && <rect x={sx-2} y={sy-2} width={14} height={20} rx="4" fill={wc.glow}/>}
        <rect x={sx} y={sy}   width={12} height={18} rx="3" fill={wc.blade}/>
        <rect x={sx} y={sy}   width={12} height={6}  rx="2" fill={wc.guard}/>
        <ellipse cx={sx+6} cy={sy+10} rx={3} ry={3} fill={wc.guard}/>
        <rect x={sx+2} y={sy+1} width={6} height={3} rx="1" fill="rgba(255,255,255,0.2)"/>
      </>
    );
  }

  // Fallback: simple sword
  return (
    <>
      <rect x={hx}   y={hy-24} width={3}   height={24} rx="0.8" fill={wc.blade}/>
      <rect x={hx-4} y={hy-6}  width={11}  height={2.5} rx="1" fill={wc.guard}/>
      <rect x={hx+0.5} y={hy-3} width={2}  height={5}  rx="1" fill={wc.handle}/>
    </>
  );
}

// ─── Draw equipped chest armour overlay ───────────────────────────────────────
function drawChestArmor(chestItem, cx, torsoW, torsoH, torsoTop, gc) {
  if (!chestItem) return null;
  const wc = weaponColors(chestItem.rarity);
  return (
    <>
      {/* Armour plate outline */}
      <rect
        x={cx - torsoW / 2 + 1} y={torsoTop + 1}
        width={torsoW - 2} height={torsoH - 5}
        rx="3" fill="none" stroke={wc.blade} strokeWidth="1.5" opacity="0.65"
      />
      {/* Pauldron lines */}
      <rect x={cx - torsoW / 2 + 1} y={torsoTop + 4} width={torsoW - 2} height="2" rx="0" fill={wc.blade} opacity="0.2"/>
      {/* Centre plate */}
      <rect x={cx - 4} y={torsoTop + 2} width="8" height={torsoH - 8} rx="2" fill={wc.blade} opacity="0.12"/>
      {/* Chest gem */}
      <ellipse cx={cx} cy={torsoTop + torsoH * 0.38} rx={3} ry={3} fill={wc.blade} opacity="0.75"/>
      <ellipse cx={cx - 0.8} cy={torsoTop + torsoH * 0.36} rx={1} ry={1} fill="rgba(255,255,255,0.7)"/>
      {/* Glow ring */}
      {wc.glow && <ellipse cx={cx} cy={torsoTop + torsoH * 0.38} rx={5} ry={5} fill={wc.glow} opacity="0.4"/>}
    </>
  );
}

// ─── Draw equipped helmet overlay ─────────────────────────────────────────────
function drawHelmetArmor(helmetItem, cx, headW, headH, headTop, h) {
  if (!helmetItem) return null;
  const wc = weaponColors(helmetItem.rarity);
  return (
    <>
      {/* Full helmet shell */}
      <rect
        x={cx - headW / 2 - 1} y={headTop - 3}
        width={headW + 2} height={headH * 0.7 + 3}
        rx="5" fill={wc.blade} opacity="0.55"
      />
      {/* Visor bar */}
      <rect x={cx - headW / 2 + 1} y={headTop + 6} width={headW - 2} height="3" rx="0" fill="#0f172a" opacity="0.75"/>
      {/* Visor glow line */}
      <rect x={cx - headW / 2 + 2} y={headTop + 7} width={headW - 4} height="1.5" rx="0" fill={wc.blade} opacity="0.8"/>
      {/* Crest spike */}
      <rect x={cx - 1.5} y={headTop - 8} width={3} height={8} rx="1" fill={wc.guard}/>
      {/* Rim highlight */}
      <rect x={cx - headW / 2} y={headTop - 2} width={headW + 1} height="2" rx="1" fill="rgba(255,255,255,0.22)"/>
    </>
  );
}

// ─── Draw equipped boots overlay ───────────────────────────────────────────────
function drawBootsArmor(bootsItem, cx, torsoW, legW, legH, legTop, isShorts) {
  if (!bootsItem) return null;
  const wc = weaponColors(bootsItem.rarity);
  const bootY = legTop + (isShorts ? legH * 0.58 : legH) - 8;
  return (
    <>
      {/* Left boot armour plate */}
      <rect
        x={cx - torsoW / 2 + 1} y={bootY}
        width={legW + 2} height={12} rx="2"
        fill={wc.blade} opacity="0.55"
      />
      <rect x={cx - torsoW / 2 + 2} y={bootY + 1} width={legW} height="2" rx="0.5" fill="rgba(255,255,255,0.2)"/>
      {/* Right boot armour plate */}
      <rect
        x={cx + torsoW / 2 - legW - 3} y={bootY}
        width={legW + 2} height={12} rx="2"
        fill={wc.blade} opacity="0.55"
      />
      <rect x={cx + torsoW / 2 - legW - 2} y={bootY + 1} width={legW} height="2" rx="0.5" fill="rgba(255,255,255,0.2)"/>
    </>
  );
}

// ─── Main character drawing ────────────────────────────────────────────────────
function drawCharacter(stage, palette, muscleXP = {}, stance, equippedClothing = {}, equippedItems = {}) {
  const upperXP = (muscleXP.Chest || 0) + (muscleXP.Shoulders || 0) + (muscleXP.Biceps || 0) + (muscleXP.Triceps || 0);
  const lowerXP = (muscleXP.Legs || 0) + (muscleXP.Glutes || 0) + (muscleXP.Core || 0);
  const totalXP = Math.max(1, upperXP + lowerXP);

  // Body proportions — scale with stage + XP
  const armW   = 6  + Math.min(10, stage * 2   + upperXP / 300);
  const armH   = 15 + Math.min(12, stage * 2.5 + upperXP / 250);
  const torsoW = 18 + Math.min(18, stage * 4   + totalXP / 250);
  const torsoH = 20 + Math.min(12, stage * 2   + totalXP / 300);
  const legW   = 7  + Math.min(9,  stage * 1.5 + lowerXP / 300);
  const legH   = 17 + Math.min(10, stage * 2   + lowerXP / 280);
  const neckW  = 5  + stage;
  const headW  = 15 + Math.min(4, stage);
  const headH  = 15 + Math.min(4, stage);

  const cx = 40;
  const headTop  = 4;
  const torsoTop = headTop + headH + 3;
  const armTop   = torsoTop + 2;
  const legTop   = torsoTop + torsoH;

  const s  = palette.skin;
  const h  = palette.hair;
  const e  = palette.eyes;
  const sh = palette.shirt;

  const pantsColor  = getClothingColor(equippedClothing.pants)  || palette.pants;
  const shoeColor   = getClothingColor(equippedClothing.shoes)  || palette.shoes;
  const isShorts    = equippedClothing.pants === 'pants_shorts';
  const isCamo      = equippedClothing.pants === 'pants_camo';
  const isBoots     = equippedClothing.shoes === 'shoes_boots';
  const isGoldShoe  = equippedClothing.shoes === 'shoes_gold';
  const actualLegH  = isShorts ? legH * 0.58 : legH;

  const glowColors  = { 1: '#10b981', 2: '#f59e0b', 3: '#64748b', 4: '#a855f7', 5: '#a78bfa', 6: '#22d3ee' };
  const gc = glowColors[stage] || '#22d3ee';
  const gloveColor  = stage >= 4 ? gc : '#555';

  const leftPivotX  = cx - torsoW / 2 + 1;
  const leftPivotY  = armTop;
  const rightPivotX = cx + torsoW / 2 - 1;
  const rightPivotY = armTop;
  const leftAngle   = STANCE_ARMS[stance]?.left  ?? 0;
  const rightAngle  = STANCE_ARMS[stance]?.right ?? 0;

  return (
    <>
      {/* ─── AURA RINGS ─────────────────────── */}
      <ellipse cx={cx} cy={legTop + actualLegH + 4} rx={torsoW * 0.85} ry="4"   fill={gc} opacity="0.14"/>
      <ellipse cx={cx} cy={legTop + actualLegH + 4} rx={torsoW * 0.55} ry="2.5" fill={gc} opacity="0.24"/>
      {stage >= 4 && <circle cx={cx} cy={torsoTop + torsoH / 2} r={torsoW + 12} fill="none" stroke={gc} strokeWidth="1"   opacity="0.20"/>}
      {stage >= 5 && <circle cx={cx} cy={torsoTop + torsoH / 2} r={torsoW + 20} fill="none" stroke={gc} strokeWidth="1"   opacity="0.14"/>}
      {stage >= 6 && <>
        <circle cx={cx} cy={torsoTop + torsoH / 2} r={torsoW + 28} fill="none" stroke={gc} strokeWidth="1.5" opacity="0.24"/>
        {[0,1,2,3,4].map(i => (
          <rect key={i} x={cx - 12 + i * 6} y={headTop - 8 + (i % 2 === 0 ? 0 : 4)} width="3" height={i % 2 === 0 ? 8 : 5} fill={gc} opacity="0.8"/>
        ))}
      </>}

      {/* ─── LEGS ────────────────────────────── */}
      {/* Left leg */}
      <rect x={cx - torsoW / 2 + 2} y={legTop} width={legW} height={actualLegH} rx="2" fill={pantsColor}/>
      <rect x={cx - torsoW / 2 + 2} y={legTop} width="1.5" height={actualLegH}  rx="0" fill="rgba(0,0,0,0.15)"/>
      <rect x={cx - torsoW / 2 + 4} y={legTop} width="2"   height={actualLegH * 0.35} rx="0" fill="rgba(255,255,255,0.08)"/>
      {/* Right leg */}
      <rect x={cx + torsoW / 2 - legW - 2} y={legTop} width={legW} height={actualLegH} rx="2" fill={pantsColor}/>
      <rect x={cx + torsoW / 2 - legW - 2} y={legTop} width="1.5" height={actualLegH}  rx="0" fill="rgba(0,0,0,0.15)"/>

      {/* Exposed skin below shorts */}
      {isShorts && <>
        <rect x={cx - torsoW / 2 + 2}         y={legTop + actualLegH} width={legW} height={legH - actualLegH - 4} rx="1" fill={s}/>
        <rect x={cx + torsoW / 2 - legW - 2}  y={legTop + actualLegH} width={legW} height={legH - actualLegH - 4} rx="1" fill={s}/>
      </>}
      {isCamo && <>
        <rect x={cx - torsoW / 2 + 2} y={legTop + 3}  width={legW * 0.5}  height="3" rx="1" fill="#166534" opacity="0.75"/>
        <rect x={cx - torsoW / 2 + 2} y={legTop + 9}  width={legW * 0.45} height="4" rx="1" fill="#14532d" opacity="0.65"/>
        <rect x={cx + torsoW / 2 - legW - 2} y={legTop + 5}  width={legW * 0.55} height="3" rx="1" fill="#166534" opacity="0.75"/>
        <rect x={cx + torsoW / 2 - legW - 2} y={legTop + 11} width={legW * 0.4}  height="4" rx="1" fill="#14532d" opacity="0.65"/>
      </>}
      {stage >= 4 && <>
        <rect x={cx - torsoW / 2 + 2}        y={legTop + actualLegH * 0.32} width={legW} height="4" rx="1" fill={gc} opacity="0.7"/>
        <rect x={cx + torsoW / 2 - legW - 2} y={legTop + actualLegH * 0.32} width={legW} height="4" rx="1" fill={gc} opacity="0.7"/>
      </>}

      {/* ─── SHOES ───────────────────────────── */}
      {isBoots ? <>
        <rect x={cx - torsoW / 2 + 1}        y={legTop + actualLegH - 6} width={legW + 3} height="11" rx="2" fill={shoeColor}/>
        <rect x={cx + torsoW / 2 - legW - 3} y={legTop + actualLegH - 6} width={legW + 3} height="11" rx="2" fill={shoeColor}/>
        <rect x={cx - torsoW / 2 + 2}        y={legTop + actualLegH - 5} width="3" height="2" rx="1" fill="rgba(255,255,255,0.22)"/>
        <rect x={cx + torsoW / 2 - legW - 2} y={legTop + actualLegH - 5} width="3" height="2" rx="1" fill="rgba(255,255,255,0.22)"/>
      </> : <>
        <rect x={cx - torsoW / 2 + 1}        y={legTop + actualLegH - 2} width={legW + 3} height="6" rx="2" fill={shoeColor}/>
        <rect x={cx + torsoW / 2 - legW - 3} y={legTop + actualLegH - 2} width={legW + 3} height="6" rx="2" fill={shoeColor}/>
        <rect x={cx - torsoW / 2 + 2}        y={legTop + actualLegH - 1} width="3" height="1.5" fill="rgba(255,255,255,0.3)"/>
        <rect x={cx + torsoW / 2 - legW - 2} y={legTop + actualLegH - 1} width="3" height="1.5" fill="rgba(255,255,255,0.3)"/>
        {equippedClothing.shoes === 'shoes_white' && <>
          <rect x={cx - torsoW / 2 + 1}        y={legTop + actualLegH} width={legW + 2} height="1.5" rx="0.5" fill="#94a3b8" opacity="0.7"/>
          <rect x={cx + torsoW / 2 - legW - 3} y={legTop + actualLegH} width={legW + 2} height="1.5" rx="0.5" fill="#94a3b8" opacity="0.7"/>
        </>}
        {isGoldShoe && <>
          <circle cx={cx - torsoW / 2 + legW / 2 + 1} cy={legTop + actualLegH + 2} r="1.5" fill="rgba(255,255,255,0.5)"/>
          <circle cx={cx + torsoW / 2 - legW / 2 - 2} cy={legTop + actualLegH + 2} r="1.5" fill="rgba(255,255,255,0.5)"/>
        </>}
      </>}

      {/* Boots armour overlay (equipped item) */}
      {drawBootsArmor(equippedItems?.boots, cx, torsoW, legW, legH, legTop, isShorts)}

      {/* ─── LEFT ARM ────────────────────────── */}
      <g style={{ transformOrigin: `${leftPivotX}px ${leftPivotY}px`, transform: `rotate(${leftAngle}deg)`, transition: 'transform 0.45s ease' }}>
        {/* Upper arm */}
        <rect x={cx - torsoW / 2 - armW + 1} y={armTop}              width={armW}     height={armH * 0.55} rx="2" fill={s}/>
        {/* Lower arm */}
        <rect x={cx - torsoW / 2 - armW + 1.5} y={armTop + armH * 0.5} width={armW - 1} height={armH * 0.5} rx="2" fill={s}/>
        {/* Shading */}
        <rect x={cx - torsoW / 2 - armW + 1} y={armTop} width="1.5" height={armH * 0.55} rx="0" fill="rgba(0,0,0,0.12)"/>
        {/* Hand */}
        <rect x={cx - torsoW / 2 - armW}     y={armTop + armH - 3}   width={armW + 2} height="5" rx="2" fill={s}/>
        <rect x={cx - torsoW / 2 - armW + 1} y={armTop + armH - 1}   width={armW * 0.6} height="1.5" rx="0.5" fill="rgba(255,255,255,0.2)"/>
        {/* Bicep bump stage 3+ */}
        {stage >= 3 && <ellipse cx={cx - torsoW / 2 - armW / 2 + 1} cy={armTop + armH * 0.28} rx={armW * 0.55} ry={armW * 0.5} fill={s} opacity="0.5"/>}
        {/* Gloves */}
        {stage >= 2 && <rect x={cx - torsoW / 2 - armW} y={armTop + armH - 3} width={armW + 2} height="5" rx="2" fill={gloveColor} opacity={stage >= 4 ? 0.82 : 1}/>}
        {/* Wristbands */}
        {equippedClothing.accessory === 'acc_wristbands' && (
          <rect x={cx - torsoW / 2 - armW} y={armTop + armH * 0.7} width={armW + 2} height="4" rx="1" fill="#dc2626"/>
        )}
        {/* Beer / coffee */}
        {stance === 'wave' && equippedClothing.accessory === 'acc_beer' && <>
          <rect x={cx - torsoW / 2 - armW + 1} y={armTop + armH + 1} width="4" height="8" rx="1" fill="#ca8a04"/>
          <rect x={cx - torsoW / 2 - armW + 2} y={armTop + armH}     width="2" height="2" rx="0.5" fill="#e2e8f0" opacity="0.5"/>
        </>}
        {stance === 'wave' && equippedClothing.accessory === 'acc_coffee' && <>
          <rect x={cx - torsoW / 2 - armW + 1} y={armTop + armH + 1} width="5" height="6" rx="1" fill="#451a03"/>
          <rect x={cx - torsoW / 2 - armW + 1} y={armTop + armH}     width="5" height="2" rx="0.5" fill="#7c3aed" opacity="0.8"/>
        </>}
      </g>

      {/* ─── RIGHT ARM ───────────────────────── */}
      <g style={{ transformOrigin: `${rightPivotX}px ${rightPivotY}px`, transform: `rotate(${rightAngle}deg)`, transition: 'transform 0.45s ease' }}>
        {/* Upper arm */}
        <rect x={cx + torsoW / 2 - 1}   y={armTop}              width={armW}     height={armH * 0.55} rx="2" fill={s}/>
        {/* Lower arm */}
        <rect x={cx + torsoW / 2 - 0.5} y={armTop + armH * 0.5} width={armW - 1} height={armH * 0.5} rx="2" fill={s}/>
        {/* Shading */}
        <rect x={cx + torsoW / 2 + armW - 2} y={armTop} width="1.5" height={armH * 0.55} rx="0" fill="rgba(0,0,0,0.12)"/>
        {/* Hand */}
        <rect x={cx + torsoW / 2 - 1}   y={armTop + armH - 3}   width={armW + 2} height="5" rx="2" fill={s}/>
        <rect x={cx + torsoW / 2 + 1}   y={armTop + armH - 1}   width={armW * 0.6} height="1.5" rx="0.5" fill="rgba(255,255,255,0.2)"/>
        {stage >= 3 && <ellipse cx={cx + torsoW / 2 + armW / 2 - 1} cy={armTop + armH * 0.28} rx={armW * 0.55} ry={armW * 0.5} fill={s} opacity="0.5"/>}
        {stage >= 2 && <rect x={cx + torsoW / 2 - 1} y={armTop + armH - 3} width={armW + 2} height="5" rx="2" fill={gloveColor} opacity={stage >= 4 ? 0.82 : 1}/>}
        {equippedClothing.accessory === 'acc_wristbands' && (
          <rect x={cx + torsoW / 2 - 1} y={armTop + armH * 0.7} width={armW + 2} height="4" rx="1" fill="#dc2626"/>
        )}
        {/* Beer / coffee in right hand (non-wave) */}
        {stance !== 'wave' && equippedClothing.accessory === 'acc_beer' && <>
          <rect x={cx + torsoW / 2 + armW - 2} y={armTop + armH + 1} width="5" height="8" rx="1" fill="#ca8a04"/>
          <rect x={cx + torsoW / 2 + armW - 1} y={armTop + armH}     width="3" height="2" rx="0.5" fill="#e2e8f0" opacity="0.5"/>
        </>}
        {stance !== 'wave' && equippedClothing.accessory === 'acc_coffee' && <>
          <rect x={cx + torsoW / 2 + armW - 2} y={armTop + armH + 1} width="6" height="6" rx="1" fill="#451a03"/>
          <rect x={cx + torsoW / 2 + armW - 2} y={armTop + armH}     width="6" height="2" rx="0.5" fill="#7c3aed" opacity="0.8"/>
          <circle cx={cx + torsoW / 2 + armW + 2} cy={armTop + armH - 1} r="1"   fill="rgba(220,220,220,0.3)"/>
          <circle cx={cx + torsoW / 2 + armW + 1} cy={armTop + armH - 3} r="0.8" fill="rgba(220,220,220,0.2)"/>
        </>}
      </g>

      {/* ─── WEAPON (drawn after arms so it appears in front) ─── */}
      {drawWeapon(equippedItems?.weapon, cx, torsoW, armW, armTop, armH)}

      {/* ─── TORSO ───────────────────────────── */}
      <rect x={cx - torsoW / 2} y={torsoTop} width={torsoW} height={torsoH} rx="4" fill={sh}/>
      {/* Top highlight */}
      <rect x={cx - torsoW / 2 + 2} y={torsoTop + 1} width={torsoW - 4} height="3" rx="2" fill="rgba(255,255,255,0.18)"/>
      {/* V-neck shadow */}
      <rect x={cx - 3} y={torsoTop} width="6" height="4" rx="1" fill="rgba(0,0,0,0.2)"/>
      {/* Centre chest line */}
      <rect x={cx - 1} y={torsoTop + 3} width="2" height={torsoH - 9} fill="rgba(0,0,0,0.14)"/>
      {/* Side shading */}
      <rect x={cx - torsoW / 2} y={torsoTop} width="2.5" height={torsoH} rx="1" fill="rgba(0,0,0,0.1)"/>
      <rect x={cx + torsoW / 2 - 2.5} y={torsoTop} width="2.5" height={torsoH} rx="1" fill="rgba(0,0,0,0.1)"/>
      {/* Belt */}
      <rect x={cx - torsoW / 2} y={torsoTop + torsoH - 4} width={torsoW} height="3" rx="1" fill="rgba(0,0,0,0.3)"/>
      <rect x={cx - 3} y={torsoTop + torsoH - 5} width="6" height="5" rx="1" fill="rgba(0,0,0,0.45)"/>
      <rect x={cx - 2} y={torsoTop + torsoH - 4} width="4" height="3" rx="0.5" fill="#ca8a04" opacity="0.65)"/>
      {/* Chest muscles stage 3+ */}
      {stage >= 3 && <>
        <ellipse cx={cx - torsoW * 0.22} cy={torsoTop + torsoH * 0.28} rx={torsoW * 0.20} ry={torsoH * 0.15} fill="rgba(0,0,0,0.11)"/>
        <ellipse cx={cx + torsoW * 0.22} cy={torsoTop + torsoH * 0.28} rx={torsoW * 0.20} ry={torsoH * 0.15} fill="rgba(0,0,0,0.11)"/>
        <ellipse cx={cx - torsoW * 0.22} cy={torsoTop + torsoH * 0.22} rx={torsoW * 0.11} ry={torsoH * 0.09} fill="rgba(255,255,255,0.07)"/>
        <ellipse cx={cx + torsoW * 0.22} cy={torsoTop + torsoH * 0.22} rx={torsoW * 0.11} ry={torsoH * 0.09} fill="rgba(255,255,255,0.07)"/>
        {/* Ab lines */}
        <rect x={cx - 1} y={torsoTop + torsoH * 0.48} width="2" height="1.5" rx="0.5" fill="rgba(0,0,0,0.12)"/>
        <rect x={cx - 1} y={torsoTop + torsoH * 0.62} width="2" height="1.5" rx="0.5" fill="rgba(0,0,0,0.10)"/>
      </>}
      {/* Armour plate stage 4+ */}
      {stage >= 4 && <>
        <rect x={cx - torsoW / 2 + 2} y={torsoTop + 2} width={torsoW - 4} height={torsoH - 8} rx="3" fill="none" stroke={gc} strokeWidth="1.5" opacity="0.5"/>
        <rect x={cx - torsoW * 0.3} y={torsoTop + torsoH * 0.64} width={torsoW * 0.6} height="2.5" rx="1" fill={gc} opacity="0.38"/>
      </>}
      {stage >= 5 && <>
        <circle cx={cx} cy={torsoTop + torsoH * 0.35} r="4" fill={gc} opacity="0.5"/>
        <circle cx={cx} cy={torsoTop + torsoH * 0.35} r="2.5" fill="rgba(0,0,0,0.5)"/>
      </>}
      {stage >= 6 && <>
        {[-8, 0, 8].map((dx, i) => (
          <rect key={i} x={cx + dx - 1} y={torsoTop + torsoH * 0.54} width="2" height="5" rx="1" fill={gc} opacity="0.7"/>
        ))}
      </>}

      {/* Equipped chest armour overlay */}
      {drawChestArmor(equippedItems?.chest, cx, torsoW, torsoH, torsoTop, gc)}

      {/* ─── NECK ────────────────────────────── */}
      <rect x={cx - neckW / 2} y={headTop + headH - 2} width={neckW} height="5" rx="1" fill={s}/>
      <rect x={cx - neckW / 2} y={headTop + headH - 2} width={neckW} height="3"  fill="rgba(0,0,0,0.09)"/>

      {/* ─── EARS ────────────────────────────── */}
      <rect x={cx - headW / 2 - 2} y={headTop + 5} width="3" height="5" rx="1.5" fill={s}/>
      <rect x={cx + headW / 2 - 1} y={headTop + 5} width="3" height="5" rx="1.5" fill={s}/>
      <rect x={cx - headW / 2 - 1} y={headTop + 6} width="1.5" height="2" rx="0.5" fill="rgba(0,0,0,0.13)"/>
      <rect x={cx + headW / 2}     y={headTop + 6} width="1.5" height="2" rx="0.5" fill="rgba(0,0,0,0.13)"/>

      {/* ─── HEAD ────────────────────────────── */}
      <rect x={cx - headW / 2} y={headTop} width={headW} height={headH} rx="4" fill={s}/>
      {/* Top highlight */}
      <rect x={cx - headW / 2 + 2} y={headTop + 1} width={headW - 4} height="3.5" rx="2" fill="rgba(255,255,255,0.2)"/>
      {/* Chin definition */}
      <rect x={cx - headW / 2 + 3} y={headTop + headH - 4} width={headW - 6} height="2.5" rx="1.5" fill="rgba(0,0,0,0.09)"/>
      {/* Cheek blush stage 1-2 */}
      {stage <= 2 && <>
        <ellipse cx={cx - headW / 2 + 3} cy={headTop + headH * 0.62} rx="2" ry="1.2" fill="rgba(255,120,120,0.18)"/>
        <ellipse cx={cx + headW / 2 - 3} cy={headTop + headH * 0.62} rx="2" ry="1.2" fill="rgba(255,120,120,0.18)"/>
      </>}

      {/* ─── HAIR ────────────────────────────── */}
      {(!equippedClothing.hat || equippedClothing.hat === 'hat_none') ? <>
        <rect x={cx - headW / 2} y={headTop} width={headW} height="5" rx="3" fill={h}/>
        {stage <= 3 && <>
          <rect x={cx - headW / 2 - 1} y={headTop + 2} width="4" height="4" rx="2" fill={h}/>
          <rect x={cx + headW / 2 - 3} y={headTop + 2} width="4" height="4" rx="2" fill={h}/>
        </>}
        {stage === 4 && <rect x={cx - 3} y={headTop - 3} width="6" height="5" rx="1" fill={h}/>}
        {stage >= 5 && <>
          {[-6, -3, 0, 3, 6].map((dx, i) => (
            <rect key={i} x={cx + dx - 1.5} y={headTop - 4 - (i % 2 === 0 ? 3 : 0)} width="3" height={6 + (i % 2 === 0 ? 3 : 0)} rx="1" fill={h}/>
          ))}
        </>}
      </> : <>
        {/* Sideburns under any hat */}
        <rect x={cx - headW / 2 - 1} y={headTop + 5} width="4" height="4" rx="2" fill={h}/>
        <rect x={cx + headW / 2 - 3} y={headTop + 5} width="4" height="4" rx="2" fill={h}/>
      </>}

      {/* ─── EYES ────────────────────────────── */}
      {equippedClothing.accessory === 'acc_sunglasses' ? <>
        <rect x={cx - headW / 2 + 2} y={headTop + 5} width="6" height="4" rx="2" fill="#0f172a" opacity="0.93"/>
        <rect x={cx + headW / 2 - 8} y={headTop + 5} width="6" height="4" rx="2" fill="#0f172a" opacity="0.93"/>
        <rect x={cx - headW / 2 + 7} y={headTop + 6} width={headW - 14} height="1.5" fill="#0f172a" opacity="0.65"/>
        <rect x={cx - headW / 2 + 2} y={headTop + 5} width="5" height="2" rx="1" fill="rgba(255,255,255,0.12)"/>
        <rect x={cx + headW / 2 - 8} y={headTop + 5} width="5" height="2" rx="1" fill="rgba(255,255,255,0.12)"/>
      </> : <>
        <rect x={cx - headW / 2 + 3} y={headTop + 5} width="4" height="4" rx="2" fill={e}/>
        <rect x={cx + headW / 2 - 7} y={headTop + 5} width="4" height="4" rx="2" fill={e}/>
        {/* Eye shine */}
        <rect x={cx - headW / 2 + 4} y={headTop + 5} width="1.5" height="1.5" fill="rgba(255,255,255,0.85)"/>
        <rect x={cx + headW / 2 - 6} y={headTop + 5} width="1.5" height="1.5" fill="rgba(255,255,255,0.85)"/>
        {/* Stage 4+ glowing eyes */}
        {stage >= 4 && <>
          <rect x={cx - headW / 2 + 3} y={headTop + 5} width="4" height="4" rx="2" fill={gc} opacity="0.55"/>
          <rect x={cx + headW / 2 - 7} y={headTop + 5} width="4" height="4" rx="2" fill={gc} opacity="0.55"/>
        </>}
      </>}

      {/* ─── EYEBROWS ────────────────────────── */}
      {stage <= 2 ? <>
        <rect x={cx - headW / 2 + 3} y={headTop + 3} width="4" height="1.5" rx="0.5" fill={h} opacity="0.75"/>
        <rect x={cx + headW / 2 - 7} y={headTop + 3} width="4" height="1.5" rx="0.5" fill={h} opacity="0.75"/>
      </> : <>
        {/* Determined scowl for stages 3+ */}
        <rect x={cx - headW / 2 + 3} y={headTop + 3} width="5" height="1.5" rx="0.5" fill={h}/>
        <rect x={cx + headW / 2 - 8} y={headTop + 3} width="5" height="1.5" rx="0.5" fill={h}/>
        <rect x={cx - headW / 2 + 6} y={headTop + 2} width="2" height="1.5" rx="0.5" fill={h} opacity="0.55"/>
        <rect x={cx + headW / 2 - 8} y={headTop + 2} width="2" height="1.5" rx="0.5" fill={h} opacity="0.55"/>
      </>}

      {/* ─── NOSE ────────────────────────────── */}
      <rect x={cx - 1} y={headTop + headH / 2} width="2" height="2" rx="1" fill="rgba(0,0,0,0.15)"/>

      {/* ─── MOUTH ───────────────────────────── */}
      {stage <= 2
        ? <rect x={cx - 3} y={headTop + headH - 4} width="6" height="2" rx="1" fill={e} opacity="0.45)"/>
        : stage <= 4
          ? <>
              <rect x={cx} y={headTop + headH - 4} width="5" height="2" rx="1" fill={e} opacity="0.65)"/>
              <rect x={cx} y={headTop + headH - 5} width="2" height="1.5" rx="0.5" fill={e} opacity="0.30)"/>
            </>
          : <>
              {/* Determined grin with teeth */}
              <rect x={cx - 5} y={headTop + headH - 4} width="10" height="2" rx="1" fill={e} opacity="0.65)"/>
              {[-3,-1,1,3].map((dx, i) => (
                <rect key={i} x={cx + dx - 1} y={headTop + headH - 4} width="2" height="2" fill="rgba(255,255,255,0.7)" rx="0.5"/>
              ))}
            </>
      }

      {/* ─── CIGARETTE ───────────────────────── */}
      {equippedClothing.accessory === 'acc_cigarette' && <>
        <rect x={cx + 2} y={headTop + headH - 3} width="8" height="1.5" rx="0.5" fill="#e2e8f0"/>
        <circle cx={cx + 10} cy={headTop + headH - 2.5} r="1.5" fill="#ef4444" opacity="0.85"/>
        <circle cx={cx + 10} cy={headTop + headH - 5}   r="1"   fill="rgba(200,200,200,0.28)"/>
        <circle cx={cx + 9}  cy={headTop + headH - 7.5} r="0.7" fill="rgba(200,200,200,0.18)"/>
      </>}

      {/* ─── HATS ────────────────────────────── */}
      {equippedClothing.hat === 'hat_cap' && <>
        <rect x={cx + headW / 2 - 4} y={headTop + 4}  width="11"       height="3"  rx="1.5" fill="#1d4ed8"/>
        <rect x={cx - headW / 2 + 1} y={headTop - 7}  width={headW - 2} height="11" rx="4"   fill="#1d4ed8"/>
        <rect x={cx - headW / 2 + 1} y={headTop - 7}  width={headW - 2} height="3"  rx="2"   fill="rgba(255,255,255,0.13)"/>
        <circle cx={cx} cy={headTop - 7} r="1.5" fill="#1e3a8a"/>
      </>}
      {equippedClothing.hat === 'hat_tophat' && <>
        <rect x={cx - headW / 2 - 5} y={headTop - 2}  width={headW + 10} height="3"  rx="1.5" fill="#111827"/>
        <rect x={cx - headW / 2 + 2} y={headTop - 19} width={headW - 4}  height="19" rx="2"   fill="#111827"/>
        <rect x={cx - headW / 2 + 2} y={headTop - 5}  width={headW - 4}  height="3"  rx="1"   fill="#1f2937"/>
        <rect x={cx - headW / 2 + 3} y={headTop - 18} width="4"          height="11" rx="1"   fill="rgba(255,255,255,0.05)"/>
      </>}
      {equippedClothing.hat === 'hat_helmet' && <>
        <rect x={cx - headW / 2 - 1} y={headTop - 2}  width={headW + 2} height={headH * 0.65} rx="5" fill="#64748b"/>
        <rect x={cx - headW / 2 + 1} y={headTop - 1}  width={headW * 0.5} height="4" rx="2" fill="rgba(255,255,255,0.22)"/>
        <rect x={cx - headW / 2 - 1} y={headTop + 5}  width={headW * 0.42} height="3" rx="1" fill="rgba(0,0,0,0.5)"/>
        <rect x={cx - headW / 2 - 1} y={headTop + 7}  width="2" height="4" rx="1" fill="#475569"/>
        <rect x={cx + headW / 2 - 1} y={headTop + 7}  width="2" height="4" rx="1" fill="#475569"/>
      </>}
      {equippedClothing.hat === 'hat_beanie' && <>
        <rect x={cx - headW / 2 - 1} y={headTop - 7}  width={headW + 2} height={headH * 0.65 + 7} rx="4" fill="#7c3aed"/>
        <rect x={cx - headW / 2 - 1} y={headTop + 2}  width={headW + 2} height="3" rx="0" fill="#6d28d9" opacity="0.65"/>
        <circle cx={cx} cy={headTop - 8} r="4" fill="#8b5cf6"/>
        <circle cx={cx} cy={headTop - 8} r="2.5" fill="rgba(109,40,217,0.5)"/>
        {[-4,-1,2].map((dx, i) => (
          <rect key={i} x={cx + dx * 3} y={headTop - 6} width="2" height={headH * 0.5 + 6} fill="rgba(255,255,255,0.07)"/>
        ))}
      </>}
      {equippedClothing.hat === 'hat_crown' && <>
        <rect x={cx - headW / 2 + 1} y={headTop - 3}  width={headW - 2} height="5" rx="1" fill="#ca8a04"/>
        <rect x={cx - headW / 2 + 1} y={headTop - 3}  width={headW - 2} height="2" rx="1" fill="rgba(255,255,255,0.22)"/>
        {[-8,-4,0,4,8].map((dx, i) => (
          <rect key={i} x={cx + dx - 2} y={headTop - 11 - (i % 2 === 0 ? 5 : 0)} width="4" height={i % 2 === 0 ? 13 : 9} rx="1" fill="#ca8a04"/>
        ))}
        {[-6,0,6].map((dx, i) => (
          <circle key={i} cx={cx + dx} cy={headTop - 2} r="1.5" fill={['#f87171','#60a5fa','#4ade80'][i]} opacity="0.92"/>
        ))}
      </>}

      {/* ─── EQUIPPED HELMET (item armour overlay, drawn on top of hats) ─── */}
      {!equippedClothing.hat || equippedClothing.hat === 'hat_none'
        ? drawHelmetArmor(equippedItems?.helmet, cx, headW, headH, headTop, h)
        : null
      }

      {/* ─── STAGE PARTICLES ─────────────────── */}
      {stage >= 5 && <>
        <circle cx={cx - torsoW / 2 - 5} cy={torsoTop + 4}  r="2"   fill={gc} opacity="0.7"/>
        <circle cx={cx + torsoW / 2 + 5} cy={torsoTop + 8}  r="2"   fill={gc} opacity="0.7"/>
        <circle cx={cx}                  cy={headTop - 5}    r="1.5" fill={gc} opacity="0.6"/>
      </>}
      {stage >= 6 && <>
        <circle cx={cx - torsoW / 2 - 10} cy={torsoTop + 16} r="2.5" fill={gc} opacity="0.5"/>
        <circle cx={cx + torsoW / 2 + 10} cy={torsoTop + 20} r="2.5" fill={gc} opacity="0.5"/>
        <circle cx={cx - 8}               cy={headTop - 8}   r="2"   fill={gc} opacity="0.5"/>
        <circle cx={cx + 8}               cy={headTop - 8}   r="2"   fill={gc} opacity="0.5"/>
      </>}
    </>
  );
}

// ─── Exported component ────────────────────────────────────────────────────────
export default function CharacterSprite({
  level, muscleXP = {}, size = 96, equippedAura,
  equippedClothing = {}, equippedItems = {}, inBattle = false,
}) {
  const stage     = getSpriteStage(level);
  const stageData = CHARACTER_STAGES[stage];
  const palette   = STAGE_PALETTE[stage];

  // In battle, hold fight/battle stance — otherwise cycle stances
  const [stance, setStance] = useState(inBattle ? 'battle' : 'idle');

  useEffect(() => {
    if (inBattle) { setStance('battle'); return; }
    const dur = STANCE_DURATION[stance] || 5500;
    const t = setTimeout(() => {
      if (stance === 'idle') {
        const others = STANCES.filter(s => s !== 'idle');
        setStance(others[Math.floor(Math.random() * others.length)]);
      } else {
        setStance('idle');
      }
    }, dur);
    return () => clearTimeout(t);
  }, [stance, inBattle]);

  const glowColor = equippedAura && equippedAura !== 'rainbow' ? equippedAura : stageData.auraColor;
  const auraClass = equippedAura === 'rainbow' ? 'aura-stage-6'
    : equippedAura && equippedAura !== stageData.auraColor ? 'aura-stage-1'
    : stageData.auraClass;
  const bobDuration = stage >= 4 ? '1.8s' : '2.4s';
  // In battle use a tighter, faster bob
  const bobAnim = inBattle
    ? `pixelBob ${stage >= 4 ? '1.4s' : '1.8s'} ease-in-out infinite`
    : `pixelBob ${bobDuration} ease-in-out infinite`;

  return (
    <div className={`flex flex-col items-center gap-1 ${auraClass}`} style={{ '--aura-color': glowColor, overflow: 'visible' }}>
      <div style={{ position: 'relative', animation: bobAnim, display: 'inline-block', overflow: 'visible' }}>
        <svg
          viewBox="0 0 80 90"
          width={size}
          height={size * 1.25}
          className="pixel character-sprite"
          style={{
            imageRendering: 'pixelated',
            transform: `scale(${stageData.scale})`,
            transformOrigin: 'center bottom',
            transition: 'transform 0.5s ease',
            overflow: 'visible',
          }}
        >
          <defs>
            <radialGradient id={`aura-${stage}`} cx="50%" cy="70%" r="60%">
              <stop offset="0%" stopColor={glowColor} stopOpacity="0.22"/>
              <stop offset="100%" stopColor={glowColor} stopOpacity="0"/>
            </radialGradient>
          </defs>
          <ellipse cx="40" cy="55" rx="36" ry="36" fill={`url(#aura-${stage})`}/>
          {drawCharacter(stage, palette, muscleXP, stance, equippedClothing, equippedItems)}
        </svg>
      </div>

      {/* Only show label when NOT in battle */}
      {!inBattle && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <span className="neon-text" style={{ color: glowColor, fontSize: '7px', textShadow: `0 0 6px ${glowColor}` }}>
            {stageData.label}
          </span>
          <div style={{ display: 'flex', gap: '2px' }}>
            {Array.from({ length: stage }).map((_, i) => (
              <div key={i} style={{ width: '4px', height: '4px', background: glowColor, borderRadius: '1px', boxShadow: `0 0 4px ${glowColor}` }}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
