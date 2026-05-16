import React, { Suspense, lazy } from 'react';
import PlayerBase from './sprites/PlayerBase';
import { getSpriteStage } from '../utils/gameLogic';

/*
  CharacterRenderer
  ─────────────────
  Composites PlayerBase + armor SVG overlays based on equipped items.
  Each armor overlay is an absolute-positioned SVG using the same
  viewBox="0 0 120 200", so they layer pixel-perfect over the base.

  Props:
    level         — player level (used to derive tier 1-5)
    equippedItems — { helmet, chest, boots, weapon, ring, special }
    size          — height in px (width = size * 0.6)
    showLabel     — show stage label below sprite (default false)
*/

// ── Lazy-loaded armor components ────────────────────────────────────────────
// Set 1 — Iron Scraps (Common)
const IronScrapsHelmet    = lazy(() => import('./sprites/armor/IronScrapsHelmet'));
const IronScrapsChest     = lazy(() => import('./sprites/armor/IronScrapsChest'));
const IronScrapsBootsLegs = lazy(() => import('./sprites/armor/IronScrapsBootsLegs'));

// Set 2 — Forest Ranger (Uncommon)
const ForestRangerHelmet    = lazy(() => import('./sprites/armor/ForestRangerHelmet'));
const ForestRangerChest     = lazy(() => import('./sprites/armor/ForestRangerChest'));
const ForestRangerBootsLegs = lazy(() => import('./sprites/armor/ForestRangerBootsLegs'));

// Set 3 — Steel Knight (Rare)
const SteelKnightHelmet    = lazy(() => import('./sprites/armor/SteelKnightHelmet'));
const SteelKnightChest     = lazy(() => import('./sprites/armor/SteelKnightChest'));
const SteelKnightBootsLegs = lazy(() => import('./sprites/armor/SteelKnightBootsLegs'));
// Set 4 — Void Reaper (Epic)
const VoidReaperHelmet    = lazy(() => import('./sprites/armor/VoidReaperHelmet'));
const VoidReaperChest     = lazy(() => import('./sprites/armor/VoidReaperChest'));
const VoidReaperBootsLegs = lazy(() => import('./sprites/armor/VoidReaperBootsLegs'));
// Set 5 — Solar Titan (Legendary)
const SolarTitanHelmet    = lazy(() => import('./sprites/armor/SolarTitanHelmet'));
const SolarTitanChest     = lazy(() => import('./sprites/armor/SolarTitanChest'));
const SolarTitanBootsLegs = lazy(() => import('./sprites/armor/SolarTitanBootsLegs'));

// ── Armor set lookup ─────────────────────────────────────────────────────────
const RARITY_PREFIXES = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
function baseName(name = '') {
  for (const p of RARITY_PREFIXES) {
    if (name.startsWith(p + ' ')) return name.slice(p.length + 1);
  }
  return name;
}

function getArmorSet(itemName) {
  const base = baseName(itemName);
  if (base.startsWith('Iron Scraps'))    return 'iron-scraps';
  if (base.startsWith('Forest Ranger'))  return 'forest-ranger';
  if (base.startsWith('Steel Knight'))  return 'steel-knight';
  if (base.startsWith('Void Reaper'))    return 'void-reaper';
  if (base.startsWith('Solar Titan'))    return 'solar-titan';
  return null;
}

const HELMET_COMPONENTS = {
  'iron-scraps':   IronScrapsHelmet,
  'forest-ranger': ForestRangerHelmet,
  'steel-knight':  SteelKnightHelmet,
  'void-reaper':   VoidReaperHelmet,
  'solar-titan':   SolarTitanHelmet,
};
const CHEST_COMPONENTS = {
  'iron-scraps':   IronScrapsChest,
  'forest-ranger': ForestRangerChest,
  'steel-knight':  SteelKnightChest,
  'void-reaper':   VoidReaperChest,
  'solar-titan':   SolarTitanChest,
};
const BOOTS_COMPONENTS = {
  'iron-scraps':   IronScrapsBootsLegs,
  'forest-ranger': ForestRangerBootsLegs,
  'steel-knight':  SteelKnightBootsLegs,
  'void-reaper':   VoidReaperBootsLegs,
  'solar-titan':   SolarTitanBootsLegs,
};

// ── Stage → tier mapping ─────────────────────────────────────────────────────
// getSpriteStage returns 1-6; PlayerBase accepts tier 1-5
function levelToTier(level) {
  const stage = getSpriteStage(level);
  return Math.min(5, Math.max(1, stage));
}

// ── Component ────────────────────────────────────────────────────────────────
export default function CharacterRenderer({
  level = 1,
  equippedItems = {},
  size = 150,
}) {
  const tier = levelToTier(level);
  const hw   = Math.round(size * 0.6);

  const helmetSet = getArmorSet(equippedItems?.helmet?.name);
  const chestSet  = getArmorSet(equippedItems?.chest?.name);
  const bootsSet  = getArmorSet(equippedItems?.boots?.name);

  const HelmetComp = helmetSet ? HELMET_COMPONENTS[helmetSet] : null;
  const ChestComp  = chestSet  ? CHEST_COMPONENTS[chestSet]   : null;
  const BootsComp  = bootsSet  ? BOOTS_COMPONENTS[bootsSet]   : null;

  return (
    <div style={{
      position: 'relative',
      width: hw,
      height: size,
      overflow: 'visible',
    }}>
      {/* Base body */}
      <PlayerBase tier={tier} size={size} />

      {/* Armor layers: boots → chest → helmet (back to front) */}
      {BootsComp && (
        <Suspense fallback={null}>
          <BootsComp />
        </Suspense>
      )}
      {ChestComp && (
        <Suspense fallback={null}>
          <ChestComp />
        </Suspense>
      )}
      {HelmetComp && (
        <Suspense fallback={null}>
          <HelmetComp />
        </Suspense>
      )}
    </div>
  );
}
