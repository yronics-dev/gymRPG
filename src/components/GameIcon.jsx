/**
 * GameIcon — renders a named SVG icon from the GymRPG icon library.
 *
 * Usage:
 *   <GameIcon name="sword" size={20} color="#f87171" />
 *   <GameIcon name="heart" size={32} />
 *
 * The `color` prop defaults to "currentColor" so it inherits CSS color automatically.
 */
import React from 'react';
import {
  IconSword, IconShield, IconHeart, IconFlame, IconWing,
  IconDumbbell, IconSkull, IconChest, IconStar, IconLightning,
  IconCoin, IconGear, IconScroll, IconHelmet, IconBoots,
  IconRing, IconOrb, IconChestArmor,
  IconMuscleChest, IconMuscleBiceps, IconMuscleTriceps,
  IconMuscleShoulders, IconMuscleBack, IconMuscleCore,
  IconMuscleLegs, IconMuscleGlutes, IconCardio,
  IconImpact, IconDodge, IconHeal, IconTrophy, IconLock,
  IconCalendar, IconPotion, IconHero,
} from '../assets/icons';

const ICON_MAP = {
  // Weapons & armor
  sword:         IconSword,
  shield:        IconShield,
  helmet:        IconHelmet,
  boots:         IconBoots,
  ring:          IconRing,
  orb:           IconOrb,
  'chest-armor': IconChestArmor,
  special:       IconOrb,

  // Stats
  heart:    IconHeart,
  flame:    IconFlame,
  wing:     IconWing,
  lightning: IconLightning,
  star:     IconStar,

  // UI
  dumbbell: IconDumbbell,
  skull:    IconSkull,
  chest:    IconChest,
  coin:     IconCoin,
  gear:     IconGear,
  scroll:   IconScroll,
  trophy:   IconTrophy,
  lock:     IconLock,
  calendar: IconCalendar,
  potion:   IconPotion,

  // Muscle groups
  'muscle-chest':     IconMuscleChest,
  'muscle-biceps':    IconMuscleBiceps,
  'muscle-triceps':   IconMuscleTriceps,
  'muscle-shoulders': IconMuscleShoulders,
  'muscle-back':      IconMuscleBack,
  'muscle-core':      IconMuscleCore,
  'muscle-legs':      IconMuscleLegs,
  'muscle-glutes':    IconMuscleGlutes,
  'muscle-cardio':    IconCardio,
  cardio:             IconCardio,

  // Combat effects
  impact: IconImpact,
  dodge:  IconDodge,
  heal:   IconHeal,

  // Character
  hero:   IconHero,

  // Aliases
  atk:    IconSword,
  def:    IconShield,
  vit:    IconHeart,
  sta:    IconFlame,
  agi:    IconWing,
  xp:     IconStar,
  gold:   IconCoin,
  boss:   IconSkull,
  loot:   IconChest,
  quest:  IconScroll,
  streak: IconFlame,
  fire:   IconFlame,
};

export default function GameIcon({ name = 'star', size = 20, color = 'currentColor', className = '', style = {} }) {
  const Component = ICON_MAP[name] || IconStar;
  return (
    <Component
      size={size}
      color={color}
      className={className}
      style={style}
    />
  );
}

// Convenience: export the map so other code can check if an icon exists
export { ICON_MAP };

// Muscle-group → icon name lookup
export const MUSCLE_ICON_MAP = {
  Chest:     'muscle-chest',
  Biceps:    'muscle-biceps',
  Triceps:   'muscle-triceps',
  Shoulders: 'muscle-shoulders',
  Back:      'muscle-back',
  Core:      'muscle-core',
  Legs:      'muscle-legs',
  Glutes:    'muscle-glutes',
  Cardio:    'muscle-cardio',
};

// Equipment slot → icon name lookup
export const SLOT_ICON_MAP = {
  weapon:  'sword',
  helmet:  'helmet',
  chest:   'chest-armor',
  boots:   'boots',
  ring:    'ring',
  special: 'orb',
};

// Element → icon name (fallback: skull)
export const ELEMENT_ICON_MAP = {
  Fire:    'flame',
  Ice:     'shield',
  Shadow:  'orb',
  Thunder: 'lightning',
  Earth:   'shield',
  Wind:    'wing',
  Void:    'orb',
  Storm:   'lightning',
  Lava:    'flame',
  Crystal: 'star',
  Poison:  'skull',
  Blood:   'heart',
};
