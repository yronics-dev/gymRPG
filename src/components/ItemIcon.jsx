import React from 'react';

/*
  ItemIcon — unique pixel-art SVG icon for every loot item in the game.
  Usage: <ItemIcon name={item.name} size={34} color={item.rarityColor}/>

  Each icon is drawn in a 32×32 viewBox with imageRendering: pixelated.
  The `color` prop tints accent details (gems, glows, magic effects).
  Unknown names fall back to a generic chest/star icon.
*/

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const V = 32; // viewBox size

// ─── HELMETS ─────────────────────────────────────────────────────────────────

function IronHelm({ c }) {
  // Full iron knight helmet with visor slits
  return (
    <>
      {/* Dome */}
      <rect x="8"  y="4"  width="16" height="14" rx="6" fill="#475569"/>
      <rect x="9"  y="5"  width="14" height="12" rx="5" fill="#64748b"/>
      {/* Highlight */}
      <rect x="10" y="5"  width="6"  height="4"  rx="2" fill="rgba(255,255,255,0.22)"/>
      {/* Face plate */}
      <rect x="7"  y="14" width="18" height="11" rx="2" fill="#475569"/>
      <rect x="8"  y="15" width="16" height="9"  rx="1" fill="#64748b"/>
      {/* Visor slots */}
      <rect x="9"  y="16" width="6"  height="2"  rx="0" fill="#0f172a"/>
      <rect x="17" y="16" width="6"  height="2"  rx="0" fill="#0f172a"/>
      <rect x="9"  y="20" width="14" height="2"  rx="0" fill="#0f172a"/>
      {/* Chin guard */}
      <rect x="10" y="23" width="12" height="4"  rx="1" fill="#374151"/>
      {/* Accent trim */}
      <rect x="7"  y="14" width="18" height="2"  rx="0" fill={c} opacity="0.6"/>
      {/* Rivets */}
      <circle cx="9"  cy="15" r="1" fill="#94a3b8"/>
      <circle cx="23" cy="15" r="1" fill="#94a3b8"/>
    </>
  );
}

function ShadowHood({ c }) {
  // Dark hooded assassin helmet with glowing eye strip
  return (
    <>
      {/* Hood outer */}
      <rect x="5"  y="3"  width="22" height="20" rx="8" fill="#1e1b4b"/>
      <rect x="6"  y="4"  width="20" height="18" rx="7" fill="#2e1065"/>
      {/* Face opening - dark void */}
      <rect x="9"  y="10" width="14" height="12" rx="3" fill="#0a0015"/>
      {/* Glowing eye strip */}
      <rect x="10" y="14" width="12" height="3"  rx="1" fill={c} opacity="0.9"/>
      <rect x="11" y="14" width="10" height="2"  rx="0" fill="#fff" opacity="0.4"/>
      {/* Hood folds */}
      <path d="M5 14 Q4 20 7 26" stroke="#1e1b4b" strokeWidth="2" fill="none"/>
      <path d="M27 14 Q28 20 25 26" stroke="#1e1b4b" strokeWidth="2" fill="none"/>
      {/* Hood hanging part */}
      <rect x="6"  y="22" width="8"  height="8"  rx="2" fill="#2e1065"/>
      <rect x="18" y="22" width="8"  height="8"  rx="2" fill="#2e1065"/>
      {/* Glow line */}
      <rect x="9"  y="10" width="14" height="2"  rx="1" fill={c} opacity="0.25"/>
    </>
  );
}

function SpikedCrown({ c }) {
  // A menacing crown with jagged spikes
  return (
    <>
      {/* Crown band */}
      <rect x="4"  y="18" width="24" height="8"  rx="2" fill="#92400e"/>
      <rect x="5"  y="19" width="22" height="6"  rx="1" fill="#ca8a04"/>
      {/* Band highlight */}
      <rect x="5"  y="19" width="22" height="2"  rx="1" fill="rgba(255,255,255,0.2)"/>
      {/* Spikes — 5 alternating heights */}
      <polygon points="6,18 9,18 7.5,6"   fill="#b45309"/>
      <polygon points="10,18 13,18 11.5,4" fill={c}/>
      <polygon points="14,18 17,18 15.5,3" fill="#ca8a04"/>
      <polygon points="18,18 21,18 19.5,4" fill={c}/>
      <polygon points="22,18 25,18 23.5,6" fill="#b45309"/>
      {/* Jewels on band */}
      <circle cx="10" cy="22" r="2" fill="#f87171"/>
      <circle cx="16" cy="22" r="2.5" fill={c}/>
      <circle cx="22" cy="22" r="2" fill="#60a5fa"/>
      {/* Crown base */}
      <rect x="4"  y="25" width="24" height="4"  rx="1" fill="#92400e"/>
    </>
  );
}

function BoneMask({ c }) {
  // Skull mask — hollow eyes, grinning teeth
  return (
    <>
      {/* Skull head */}
      <rect x="7"  y="4"  width="18" height="16" rx="6" fill="#e2e8f0"/>
      <rect x="8"  y="5"  width="16" height="14" rx="5" fill="#f1f5f9"/>
      {/* Highlight */}
      <rect x="9"  y="5"  width="8"  height="4"  rx="2" fill="rgba(255,255,255,0.5)"/>
      {/* Eye sockets */}
      <ellipse cx="12" cy="13" rx="3.5" ry="4" fill="#0f172a"/>
      <ellipse cx="20" cy="13" rx="3.5" ry="4" fill="#0f172a"/>
      {/* Glowing pupils */}
      <ellipse cx="12" cy="13" rx="2" ry="2.5" fill={c} opacity="0.85"/>
      <ellipse cx="20" cy="13" rx="2" ry="2.5" fill={c} opacity="0.85"/>
      {/* Nasal cavity */}
      <rect x="14" y="17" width="2" height="2" rx="0" fill="#0f172a" opacity="0.7"/>
      <rect x="16" y="17" width="2" height="2" rx="0" fill="#0f172a" opacity="0.7"/>
      {/* Jaw */}
      <rect x="8"  y="21" width="16" height="7"  rx="2" fill="#e2e8f0"/>
      {/* Teeth */}
      {[9,11,13,15,17,19,21].map((x,i) => (
        <rect key={i} x={x} y="21" width="2" height="4" rx="0" fill={i%2===0?'#f8fafc':'#cbd5e1'}/>
      ))}
      {/* Chin crack */}
      <rect x="15" y="25" width="2" height="3" rx="0" fill={c} opacity="0.4"/>
    </>
  );
}

// ─── CHEST ARMOUR ─────────────────────────────────────────────────────────────

function ChainMail({ c }) {
  // Chain mail — interlocking ring pattern
  return (
    <>
      {/* Chest shape */}
      <rect x="5"  y="6"  width="22" height="22" rx="4" fill="#374151"/>
      <rect x="6"  y="7"  width="20" height="20" rx="3" fill="#4b5563"/>
      {/* Chain ring pattern */}
      {[0,1,2,3].map(row => (
        <React.Fragment key={row}>
          {[0,1,2,3].map(col => (
            <React.Fragment key={col}>
              <circle cx={9 + col*5 + (row%2)*2.5} cy={10 + row*5} r="2" fill="none" stroke="#6b7280" strokeWidth="1.2"/>
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
      {/* Shoulder guards */}
      <rect x="4"  y="6"  width="5"  height="8"  rx="2" fill="#374151"/>
      <rect x="23" y="6"  width="5"  height="8"  rx="2" fill="#374151"/>
      {/* Collar */}
      <rect x="10" y="5"  width="12" height="5"  rx="2" fill="#4b5563"/>
      {/* Centre gem accent */}
      <circle cx="16" cy="18" r="3" fill={c} opacity="0.8"/>
      <circle cx="15" cy="17" r="1" fill="#fff" opacity="0.6"/>
      {/* Bottom trim */}
      <rect x="5"  y="26" width="22" height="3"  rx="1" fill="#374151"/>
    </>
  );
}

function LeatherVest({ c }) {
  // Brown leather vest with buckles
  return (
    <>
      {/* Vest body */}
      <rect x="6"  y="5"  width="20" height="23" rx="3" fill="#78350f"/>
      <rect x="7"  y="6"  width="18" height="21" rx="2" fill="#92400e"/>
      {/* Vest highlight */}
      <rect x="8"  y="6"  width="6"  height="10" rx="1" fill="rgba(255,255,255,0.08)"/>
      {/* Lapels */}
      <path d="M14 6 L10 14 L14 12Z" fill="#92400e"/>
      <path d="M18 6 L22 14 L18 12Z" fill="#92400e"/>
      <path d="M13 6 L10 14 L14 12Z" fill="#78350f"/>
      <path d="M19 6 L22 14 L18 12Z" fill="#78350f"/>
      {/* Buckles */}
      <rect x="13" y="14" width="6"  height="3"  rx="0" fill="#ca8a04"/>
      <rect x="13" y="19" width="6"  height="3"  rx="0" fill="#ca8a04"/>
      <rect x="14" y="14" width="4"  height="1.5" rx="0" fill={c} opacity="0.8"/>
      <rect x="14" y="19" width="4"  height="1.5" rx="0" fill={c} opacity="0.8"/>
      {/* Stitching lines */}
      {[9,11,13].map(y => (
        <React.Fragment key={y}>
          <rect x="8" y={y} width="4" height="0.8" rx="0" fill="#b45309" opacity="0.5"/>
          <rect x="20" y={y} width="4" height="0.8" rx="0" fill="#b45309" opacity="0.5"/>
        </React.Fragment>
      ))}
      {/* Shoulder patches */}
      <rect x="6"  y="5"  width="6"  height="8"  rx="2" fill="#7c3aed" opacity="0.3"/>
      <rect x="20" y="5"  width="6"  height="8"  rx="2" fill="#7c3aed" opacity="0.3"/>
    </>
  );
}

function BattlePlate({ c }) {
  // Full plate armour chest — heavy, imposing
  return (
    <>
      {/* Plate body */}
      <rect x="4"  y="5"  width="24" height="23" rx="3" fill="#1e293b"/>
      <rect x="5"  y="6"  width="22" height="21" rx="2" fill="#334155"/>
      {/* Chest plate highlight */}
      <rect x="6"  y="6"  width="20" height="7"  rx="1" fill="#475569"/>
      <rect x="7"  y="7"  width="10" height="4"  rx="1" fill="rgba(255,255,255,0.14)"/>
      {/* Centre ridge */}
      <rect x="15" y="6"  width="2"  height="19" rx="0" fill="#1e293b" opacity="0.5"/>
      {/* Horizontal plate lines */}
      <rect x="5"  y="14" width="22" height="2"  rx="0" fill="#1e293b" opacity="0.4"/>
      <rect x="5"  y="20" width="22" height="2"  rx="0" fill="#1e293b" opacity="0.4"/>
      {/* Pauldrons */}
      <rect x="3"  y="5"  width="7"  height="10" rx="3" fill="#334155"/>
      <rect x="4"  y="6"  width="5"  height="8"  rx="2" fill="#475569"/>
      <rect x="22" y="5"  width="7"  height="10" rx="3" fill="#334155"/>
      <rect x="23" y="6"  width="5"  height="8"  rx="2" fill="#475569"/>
      {/* Collar */}
      <rect x="11" y="4"  width="10" height="5"  rx="2" fill="#475569"/>
      {/* Chest gem */}
      <rect x="13" y="10" width="6"  height="6"  rx="1" fill={c} opacity="0.85"/>
      <rect x="14" y="11" width="2"  height="2"  rx="0" fill="#fff" opacity="0.6"/>
      {/* Edge trim */}
      <rect x="4"  y="5"  width="24" height="2"  rx="1" fill={c} opacity="0.35"/>
    </>
  );
}

function RunedRobe({ c }) {
  // Magical flowing robe with glowing runes
  return (
    <>
      {/* Robe body */}
      <rect x="6"  y="4"  width="20" height="25" rx="5" fill="#1e1b4b"/>
      <rect x="7"  y="5"  width="18" height="23" rx="4" fill="#2e1065"/>
      {/* Robe folds */}
      <rect x="7"  y="5"  width="18" height="8"  rx="3" fill="#3b0764" opacity="0.6"/>
      {/* Central ornament */}
      <rect x="14" y="9"  width="4"  height="12" rx="1" fill={c} opacity="0.35"/>
      <rect x="10" y="14" width="12" height="2"  rx="0" fill={c} opacity="0.35"/>
      {/* Rune symbols */}
      <rect x="12" y="11" width="2"  height="4"  rx="0" fill={c} opacity="0.8"/>
      <rect x="11" y="12" width="4"  height="2"  rx="0" fill={c} opacity="0.8"/>
      <rect x="18" y="15" width="3"  height="2"  rx="0" fill={c} opacity="0.7"/>
      <rect x="19" y="14" width="1"  height="4"  rx="0" fill={c} opacity="0.7"/>
      <rect x="10" y="18" width="3"  height="2"  rx="0" fill={c} opacity="0.6"/>
      {/* Stars on robe */}
      <circle cx="14" cy="22" r="1.5" fill={c} opacity="0.9"/>
      <circle cx="18" cy="20" r="1"   fill={c} opacity="0.7"/>
      <circle cx="11" cy="20" r="1"   fill={c} opacity="0.7"/>
      {/* Collar */}
      <path d="M13 4 L10 10 L16 8Z" fill="#4c1d95"/>
      <path d="M19 4 L22 10 L16 8Z" fill="#4c1d95"/>
    </>
  );
}

// ─── BOOTS ────────────────────────────────────────────────────────────────────

function SpeedBoots({ c }) {
  // Slim aerodynamic boots with lightning motif
  return (
    <>
      {/* Left boot */}
      <rect x="4"  y="8"  width="9"  height="18" rx="2" fill="#1e3a5f"/>
      <rect x="5"  y="9"  width="7"  height="16" rx="1" fill="#2563eb"/>
      <rect x="2"  y="22" width="12" height="5"  rx="2" fill="#1e3a5f"/>
      <rect x="3"  y="23" width="10" height="3"  rx="1" fill="#3b82f6"/>
      {/* Right boot */}
      <rect x="19" y="8"  width="9"  height="18" rx="2" fill="#1e3a5f"/>
      <rect x="20" y="9"  width="7"  height="16" rx="1" fill="#2563eb"/>
      <rect x="19" y="22" width="12" height="5"  rx="2" fill="#1e3a5f"/>
      <rect x="20" y="23" width="10" height="3"  rx="1" fill="#3b82f6"/>
      {/* Lightning bolts on boots */}
      <polygon points="7,12 5,18 7,16 5,22" fill={c} opacity="0.9"/>
      <polygon points="22,12 20,18 22,16 20,22" fill={c} opacity="0.9"/>
      {/* Speed lines */}
      <rect x="1"  y="14" width="3"  height="1" rx="0" fill={c} opacity="0.6"/>
      <rect x="28" y="14" width="3"  height="1" rx="0" fill={c} opacity="0.6"/>
      <rect x="1"  y="17" width="2"  height="1" rx="0" fill={c} opacity="0.4"/>
      <rect x="29" y="17" width="2"  height="1" rx="0" fill={c} opacity="0.4"/>
    </>
  );
}

function IronTreads({ c }) {
  // Thick heavy iron boots with studs
  return (
    <>
      {/* Left boot — very thick/blocky */}
      <rect x="3"  y="6"  width="11" height="18" rx="2" fill="#374151"/>
      <rect x="4"  y="7"  width="9"  height="16" rx="1" fill="#4b5563"/>
      <rect x="2"  y="21" width="14" height="7"  rx="2" fill="#374151"/>
      <rect x="3"  y="22" width="12" height="5"  rx="1" fill="#4b5563"/>
      {/* Right boot */}
      <rect x="18" y="6"  width="11" height="18" rx="2" fill="#374151"/>
      <rect x="19" y="7"  width="9"  height="16" rx="1" fill="#4b5563"/>
      <rect x="18" y="21" width="14" height="7"  rx="2" fill="#374151"/>
      <rect x="19" y="22" width="12" height="5"  rx="1" fill="#4b5563"/>
      {/* Studs on boots */}
      {[[5,9],[8,9],[5,13],[8,13]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.2" fill={c} opacity="0.8"/>
      ))}
      {[[20,9],[23,9],[20,13],[23,13]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.2" fill={c} opacity="0.8"/>
      ))}
      {/* Boot trim */}
      <rect x="3"  y="6"  width="11" height="2"  rx="0" fill={c} opacity="0.4"/>
      <rect x="18" y="6"  width="11" height="2"  rx="0" fill={c} opacity="0.4"/>
    </>
  );
}

function NinjaWraps({ c }) {
  // Foot wraps with crossed straps
  return (
    <>
      {/* Left wrap */}
      <rect x="4"  y="10" width="9"  height="14" rx="1" fill="#1c1917"/>
      <rect x="5"  y="11" width="7"  height="12" rx="0" fill="#292524"/>
      <rect x="3"  y="22" width="11" height="5"  rx="1" fill="#1c1917"/>
      {/* Cross straps left */}
      <path d="M4 14 L13 22" stroke={c} strokeWidth="1.5" fill="none" opacity="0.8"/>
      <path d="M4 18 L13 14" stroke={c} strokeWidth="1.5" fill="none" opacity="0.8"/>
      <rect x="4"  y="10" width="9"  height="2"  rx="0" fill={c} opacity="0.6"/>
      <rect x="4"  y="21" width="9"  height="1.5" rx="0" fill={c} opacity="0.6"/>
      {/* Right wrap */}
      <rect x="19" y="10" width="9"  height="14" rx="1" fill="#1c1917"/>
      <rect x="20" y="11" width="7"  height="12" rx="0" fill="#292524"/>
      <rect x="18" y="22" width="11" height="5"  rx="1" fill="#1c1917"/>
      <path d="M19 14 L28 22" stroke={c} strokeWidth="1.5" fill="none" opacity="0.8"/>
      <path d="M19 18 L28 14" stroke={c} strokeWidth="1.5" fill="none" opacity="0.8"/>
      <rect x="19" y="10" width="9"  height="2"  rx="0" fill={c} opacity="0.6"/>
      <rect x="19" y="21" width="9"  height="1.5" rx="0" fill={c} opacity="0.6"/>
    </>
  );
}

function CursedShoes({ c }) {
  // Dark cursed shoes with unholy marks
  return (
    <>
      {/* Left shoe */}
      <rect x="4"  y="10" width="10" height="14" rx="3" fill="#09001a"/>
      <rect x="5"  y="11" width="8"  height="12" rx="2" fill="#1a0535"/>
      <rect x="3"  y="22" width="13" height="5"  rx="2" fill="#09001a"/>
      <rect x="4"  y="23" width="11" height="3"  rx="1" fill="#1a0535"/>
      {/* Right shoe */}
      <rect x="18" y="10" width="10" height="14" rx="3" fill="#09001a"/>
      <rect x="19" y="11" width="8"  height="12" rx="2" fill="#1a0535"/>
      <rect x="18" y="22" width="13" height="5"  rx="2" fill="#09001a"/>
      <rect x="19" y="23" width="11" height="3"  rx="1" fill="#1a0535"/>
      {/* Curse marks */}
      <circle cx="9"  cy="16" r="3" fill={c} opacity="0.5"/>
      <rect x="8"  y="14" width="2" height="4" rx="0" fill={c} opacity="0.8"/>
      <rect x="7"  y="15" width="4" height="2" rx="0" fill={c} opacity="0.8"/>
      <circle cx="23" cy="16" r="3" fill={c} opacity="0.5"/>
      <rect x="22" y="14" width="2" height="4" rx="0" fill={c} opacity="0.8"/>
      <rect x="21" y="15" width="4" height="2" rx="0" fill={c} opacity="0.8"/>
      {/* Smoke wisps */}
      <ellipse cx="9"  cy="10" rx="3" ry="2" fill={c} opacity="0.25"/>
      <ellipse cx="23" cy="10" rx="3" ry="2" fill={c} opacity="0.25"/>
    </>
  );
}

// ─── WEAPONS ─────────────────────────────────────────────────────────────────

function IronSword({ c }) {
  // Classic straight iron sword
  return (
    <>
      {/* Blade */}
      <rect x="14" y="2"  width="4"  height="22" rx="1" fill="#94a3b8"/>
      <rect x="15" y="2"  width="2"  height="20" rx="0" fill="#cbd5e1"/>
      {/* Blade tip */}
      <polygon points="14,24 18,24 16,28" fill="#94a3b8"/>
      {/* Edge highlight */}
      <rect x="15" y="3"  width="1"  height="18" rx="0" fill="rgba(255,255,255,0.4)"/>
      {/* Crossguard */}
      <rect x="8"  y="20" width="16" height="4"  rx="1" fill="#64748b"/>
      <rect x="9"  y="21" width="14" height="2"  rx="0" fill="#94a3b8"/>
      {/* Grip */}
      <rect x="14" y="23" width="4"  height="7"  rx="1" fill="#78350f"/>
      {[24,26,28].map(y => (
        <rect key={y} x="14" y={y} width="4" height="0.8" rx="0" fill="#92400e" opacity="0.7"/>
      ))}
      {/* Pommel */}
      <ellipse cx="16" cy="30" rx="3.5" ry="2.5" fill="#64748b"/>
      <ellipse cx="16" cy="30" rx="2"   ry="1.5" fill="#94a3b8"/>
    </>
  );
}

function BattleAxe({ c }) {
  // Double-headed battle axe — clearly an AXE not a sword
  return (
    <>
      {/* Handle */}
      <rect x="14" y="4"  width="4"  height="26" rx="1" fill="#78350f"/>
      <rect x="15" y="5"  width="2"  height="24" rx="0" fill="#92400e"/>
      {/* Top axe head */}
      <path d="M16 4 L5 10 L5 2 Z"  fill="#475569"/>
      <path d="M16 4 L27 10 L27 2 Z" fill="#475569"/>
      <path d="M16 4 L6 9 L6 3 Z"   fill="#64748b"/>
      <path d="M16 4 L26 9 L26 3 Z"  fill="#64748b"/>
      {/* Bottom axe head (smaller) */}
      <path d="M16 20 L7 26 L7 20 Z"  fill="#475569"/>
      <path d="M16 20 L25 26 L25 20 Z" fill="#475569"/>
      {/* Edge highlights */}
      <path d="M16 4 L5.5 9 L5.5 3 Z"  fill="rgba(255,255,255,0.2)"/>
      <path d="M16 4 L26.5 9 L26.5 3 Z" fill="rgba(255,255,255,0.2)"/>
      {/* Accent colour on axe head */}
      <rect x="5"  y="2"  width="3"  height="8"  rx="0" fill={c} opacity="0.4"/>
      <rect x="24" y="2"  width="3"  height="8"  rx="0" fill={c} opacity="0.4"/>
    </>
  );
}

function MagicStaff({ c }) {
  // Tall wizard staff with glowing orb top
  return (
    <>
      {/* Staff shaft */}
      <rect x="14" y="8"  width="4"  height="24" rx="1" fill="#451a03"/>
      <rect x="15" y="9"  width="2"  height="22" rx="0" fill="#78350f"/>
      {/* Crystal top holder */}
      <rect x="12" y="5"  width="8"  height="6"  rx="1" fill="#64748b"/>
      <rect x="13" y="6"  width="6"  height="4"  rx="0" fill="#94a3b8"/>
      {/* Main orb — glowing */}
      <circle cx="16" cy="4"  r="6"  fill={c} opacity="0.9"/>
      <circle cx="16" cy="4"  r="4"  fill={c}/>
      <circle cx="14" cy="2"  r="2"  fill="#fff" opacity="0.5"/>
      {/* Orb glow rings */}
      <circle cx="16" cy="4"  r="7"  fill="none" stroke={c} strokeWidth="1" opacity="0.5"/>
      <circle cx="16" cy="4"  r="8.5" fill="none" stroke={c} strokeWidth="0.7" opacity="0.25"/>
      {/* Staff decorations */}
      <rect x="13" y="14" width="6"  height="2"  rx="1" fill="#92400e"/>
      <rect x="13" y="20" width="6"  height="2"  rx="1" fill="#92400e"/>
      <circle cx="16" cy="15" r="1.5" fill={c} opacity="0.7"/>
    </>
  );
}

function ShadowBlade({ c }) {
  // Dark serrated shadow blade — looks dangerous
  return (
    <>
      {/* Main dark blade */}
      <rect x="13" y="2"  width="6"  height="22" rx="1" fill="#1e1b4b"/>
      <rect x="14" y="3"  width="4"  height="20" rx="0" fill="#2e1065"/>
      {/* Serrated edge (left side) */}
      {[4,7,10,13,16,19].map((y,i) => (
        <polygon key={i} points={`13,${y} 10,${y+2} 13,${y+3}`} fill="#4c1d95"/>
      ))}
      {/* Shadow glow overlay */}
      <rect x="13" y="2"  width="6"  height="22" rx="1" fill={c} opacity="0.2"/>
      {/* Blade tip */}
      <polygon points="13,24 19,24 16,29" fill="#2e1065"/>
      {/* Dark edge */}
      <rect x="17" y="3"  width="1"  height="20" rx="0" fill={c} opacity="0.5"/>
      {/* Crossguard — dark */}
      <rect x="8"  y="20" width="16" height="4"  rx="1" fill="#1e1b4b"/>
      <rect x="8"  y="21" width="16" height="2"  rx="0" fill={c} opacity="0.6"/>
      {/* Handle */}
      <rect x="13" y="23" width="6"  height="7"  rx="1" fill="#09001a"/>
      <rect x="14" y="24" width="4"  height="5"  rx="0" fill="#1a0535"/>
    </>
  );
}

function HolyMace({ c }) {
  // Flanged holy mace — clearly a mace/bludgeon
  return (
    <>
      {/* Handle */}
      <rect x="14" y="12" width="4"  height="18" rx="1" fill="#78350f"/>
      <rect x="15" y="13" width="2"  height="16" rx="0" fill="#92400e"/>
      {/* Pommel */}
      <ellipse cx="16" cy="30" rx="4" ry="3" fill="#ca8a04"/>
      {/* Mace head — flanged */}
      <circle cx="16" cy="9"  r="7"  fill="#64748b"/>
      <circle cx="16" cy="9"  r="5.5" fill="#94a3b8"/>
      {/* Flanges (spikes around head) */}
      {[0,45,90,135,180,225,270,315].map((deg,i) => {
        const r  = (deg * Math.PI) / 180;
        const x1 = 16 + Math.cos(r) * 5.5;
        const y1 = 9  + Math.sin(r) * 5.5;
        const x2 = 16 + Math.cos(r) * 9;
        const y2 = 9  + Math.sin(r) * 9;
        const x3 = 16 + Math.cos(r + 0.4) * 6;
        const y3 = 9  + Math.sin(r + 0.4) * 6;
        return <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill="#64748b"/>;
      })}
      {/* Holy glow */}
      <circle cx="16" cy="9"  r="4"  fill={c} opacity="0.6"/>
      <circle cx="14" cy="7"  r="2"  fill="#fff" opacity="0.5"/>
      {/* Cross mark on head */}
      <rect x="15" y="5"  width="2"  height="8"  rx="0" fill="#fff" opacity="0.4"/>
      <rect x="12" y="8"  width="8"  height="2"  rx="0" fill="#fff" opacity="0.4"/>
    </>
  );
}

// ─── RINGS ────────────────────────────────────────────────────────────────────

function RingOfWar({ c }) {
  // Bold war ring with sword emblem
  return (
    <>
      {/* Ring band */}
      <circle cx="16" cy="16" r="10" fill="none" stroke="#64748b" strokeWidth="4"/>
      <circle cx="16" cy="16" r="10" fill="none" stroke={c}       strokeWidth="1.5" opacity="0.7"/>
      {/* Ring gem/setting top */}
      <rect x="12" y="4"  width="8"  height="8"  rx="2" fill="#374151"/>
      <rect x="13" y="5"  width="6"  height="6"  rx="1" fill={c}/>
      {/* Mini sword in gem */}
      <rect x="15" y="5"  width="2"  height="6"  rx="0" fill="#fff" opacity="0.7"/>
      <rect x="13" y="7"  width="6"  height="1.5" rx="0" fill="#fff" opacity="0.7"/>
      {/* Ring shine */}
      <circle cx="20" cy="12" r="2" fill="rgba(255,255,255,0.25)"/>
    </>
  );
}

function RingOfLife({ c }) {
  // Green ring with leaf/heart gem
  return (
    <>
      <circle cx="16" cy="16" r="10" fill="none" stroke="#166534" strokeWidth="4"/>
      <circle cx="16" cy="16" r="10" fill="none" stroke={c}       strokeWidth="1.5" opacity="0.8"/>
      {/* Setting */}
      <rect x="11" y="4"  width="10" height="10" rx="3" fill="#14532d"/>
      <rect x="12" y="5"  width="8"  height="8"  rx="2" fill={c}/>
      {/* Heart leaf shape */}
      <ellipse cx="14" cy="8" rx="2.5" ry="3" fill="#4ade80"/>
      <ellipse cx="18" cy="8" rx="2.5" ry="3" fill="#4ade80"/>
      <polygon points="13,10 16,15 19,10" fill="#4ade80"/>
      {/* Vine */}
      <path d="M16 12 Q18 10 20 12" stroke="#166534" strokeWidth="1" fill="none"/>
      <circle cx="20" cy="9" r="1" fill="#166534"/>
    </>
  );
}

function ShieldRing({ c }) {
  // Blue defensive ring with shield gem
  return (
    <>
      <circle cx="16" cy="16" r="10" fill="none" stroke="#1e3a5f" strokeWidth="4"/>
      <circle cx="16" cy="16" r="10" fill="none" stroke={c}       strokeWidth="1.5" opacity="0.8"/>
      {/* Shield shaped gem */}
      <path d="M16 4 L22 7 L22 12 L16 16 L10 12 L10 7 Z" fill="#1e3a5f"/>
      <path d="M16 5 L21 8 L21 12 L16 15 L11 12 L11 8 Z" fill={c} opacity="0.85"/>
      {/* Shield emboss */}
      <rect x="15" y="7"  width="2"  height="6"  rx="0" fill="#fff" opacity="0.3"/>
      <rect x="13" y="9"  width="6"  height="2"  rx="0" fill="#fff" opacity="0.3"/>
    </>
  );
}

function PhantomRing({ c }) {
  // Purple ghostly ring — wispy/ethereal
  return (
    <>
      {/* Ghostly band — dashed look */}
      <circle cx="16" cy="16" r="10" fill="none" stroke="#4c1d95" strokeWidth="3" opacity="0.8"/>
      <circle cx="16" cy="16" r="10" fill="none" stroke={c}       strokeWidth="1" opacity="0.9" strokeDasharray="3 2"/>
      {/* Ghost gem */}
      <ellipse cx="16" cy="7" rx="5" ry="4" fill="#2e1065"/>
      <ellipse cx="16" cy="7" rx="3.5" ry="3" fill={c} opacity="0.7"/>
      {/* Ghost face */}
      <ellipse cx="14.5" cy="6.5" rx="1.2" ry="1.5" fill="#000" opacity="0.7"/>
      <ellipse cx="17.5" cy="6.5" rx="1.2" ry="1.5" fill="#000" opacity="0.7"/>
      <path d="M13.5 8.5 Q15 9.5 18.5 8.5" fill="none" stroke="#000" strokeWidth="0.8" opacity="0.7"/>
      {/* Ghost tail wisp */}
      <path d="M12 10 Q14 12 13 14" stroke={c} strokeWidth="1.5" fill="none" opacity="0.5"/>
      <path d="M20 10 Q18 12 19 14" stroke={c} strokeWidth="1.5" fill="none" opacity="0.5"/>
      {/* Ring glow */}
      <circle cx="16" cy="16" r="10" fill="none" stroke={c} strokeWidth="0.5" opacity="0.4"/>
    </>
  );
}

// ─── SPECIAL ITEMS ────────────────────────────────────────────────────────────

function AmuletOfFury({ c }) {
  // Pendant with a flame — fire amulet
  return (
    <>
      {/* Chain */}
      <path d="M10 2 Q16 6 22 2" fill="none" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="2 1"/>
      {/* Pendant housing */}
      <ellipse cx="16" cy="18" rx="8" ry="10" fill="#7f1d1d"/>
      <ellipse cx="16" cy="18" rx="6.5" ry="8.5" fill="#991b1b"/>
      {/* Flame inside */}
      <path d="M16 10 Q19 13 18 16 Q20 14 19 18 Q18 22 16 24 Q14 22 13 18 Q12 14 14 16 Q13 13 16 10Z"
        fill={c} opacity="0.95"/>
      <path d="M16 13 Q17.5 15 17 17 Q17.5 15.5 17 18 Q16.5 20 16 22 Q15.5 20 15 18 Q14.5 15.5 15 17 Q14.5 15 16 13Z"
        fill="#fef9c3" opacity="0.8"/>
      {/* Pendant rim */}
      <ellipse cx="16" cy="18" rx="8" ry="10" fill="none" stroke={c} strokeWidth="1.5" opacity="0.7"/>
      {/* Chain join */}
      <circle cx="16" cy="8" r="2" fill="#ca8a04"/>
    </>
  );
}

function DragonScale({ c }) {
  // Hexagonal dragon scale — protective relic
  return (
    <>
      {/* Multiple overlapping scales */}
      {[[8,16],[16,12],[24,16],[12,22],[20,22],[16,28]].map(([x,y],i) => (
        <React.Fragment key={i}>
          <path d={`M${x} ${y-6} L${x+6} ${y-2} L${x+6} ${y+4} L${x} ${y+8} L${x-6} ${y+4} L${x-6} ${y-2} Z`}
            fill={i%2===0?'#14532d':'#166534'} opacity="0.9"/>
          <path d={`M${x} ${y-5} L${x+5} ${y-1} L${x+5} ${y+3} L${x} ${y+7} L${x-5} ${y+3} L${x-5} ${y-1} Z`}
            fill={c} opacity={0.15 + i*0.05}/>
          <path d={`M${x} ${y-5} L${x+2} ${y-3}`} stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none"/>
        </React.Fragment>
      ))}
      {/* Central glow */}
      <circle cx="16" cy="16" r="4" fill={c} opacity="0.4"/>
      <circle cx="16" cy="16" r="2" fill="#fff" opacity="0.3"/>
    </>
  );
}

function OrbOfChaos({ c }) {
  // Swirling chaotic energy orb
  return (
    <>
      {/* Outer dark sphere */}
      <circle cx="16" cy="16" r="12" fill="#0f0025"/>
      <circle cx="16" cy="16" r="11" fill="#1a0040"/>
      {/* Chaos swirls */}
      <path d="M8 12 Q12 8 16 12 Q20 16 24 12" fill="none" stroke={c} strokeWidth="2" opacity="0.8"/>
      <path d="M8 16 Q12 20 16 16 Q20 12 24 16" fill="none" stroke="#f87171" strokeWidth="1.5" opacity="0.7"/>
      <path d="M8 20 Q12 16 16 20 Q20 24 24 20" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.6"/>
      {/* Energy core */}
      <circle cx="16" cy="16" r="5" fill={c} opacity="0.6"/>
      <circle cx="16" cy="16" r="3" fill="#fff" opacity="0.4"/>
      {/* Orbiting sparks */}
      <circle cx="10" cy="10" r="1.5" fill={c} opacity="0.9"/>
      <circle cx="22" cy="10" r="1.5" fill="#f87171" opacity="0.9"/>
      <circle cx="22" cy="22" r="1.5" fill="#22d3ee" opacity="0.9"/>
      <circle cx="10" cy="22" r="1.5" fill="#facc15" opacity="0.9"/>
      {/* Rim glow */}
      <circle cx="16" cy="16" r="12" fill="none" stroke={c} strokeWidth="1" opacity="0.4"/>
    </>
  );
}

function SoulCrystal({ c }) {
  // Angular glowing crystal
  return (
    <>
      {/* Crystal facets */}
      <polygon points="16,2 22,8 24,20 16,30 8,20 10,8" fill="#1e1b4b"/>
      <polygon points="16,3 21,8 23,20 16,29 9,20 11,8"  fill="#2e1065"/>
      {/* Facet highlights */}
      <polygon points="16,3 21,8 16,8" fill={c} opacity="0.5"/>
      <polygon points="16,8 21,8 23,20 16,20" fill={c} opacity="0.25"/>
      <polygon points="16,8 11,8 9,20 16,20"  fill="rgba(255,255,255,0.1)"/>
      {/* Inner glow */}
      <polygon points="16,8 20,12 20,20 16,24 12,20 12,12" fill={c} opacity="0.35"/>
      {/* Core */}
      <circle cx="16" cy="16" r="4" fill={c} opacity="0.8"/>
      <circle cx="14" cy="14" r="1.5" fill="#fff" opacity="0.7"/>
      {/* Edge glow */}
      <polygon points="16,2 22,8 24,20 16,30 8,20 10,8" fill="none" stroke={c} strokeWidth="1" opacity="0.7"/>
      {/* Floating sparkles */}
      <circle cx="8"  cy="8"  r="1" fill={c} opacity="0.7"/>
      <circle cx="24" cy="8"  r="1" fill={c} opacity="0.6"/>
      <circle cx="24" cy="24" r="1" fill={c} opacity="0.6"/>
      <circle cx="8"  cy="24" r="1" fill={c} opacity="0.7"/>
    </>
  );
}

// ─── IRON SCRAPS SET ──────────────────────────────────────────────────────────

function IronScrapsHelm({ c }) {
  // Dented open-face iron cap, left brim bent down, rivets, chin strap
  return (
    <>
      {/* Cap right half (lit) */}
      <rect x="14" y="4" width="10" height="12" rx="5" fill="#888780"/>
      {/* Cap left half (shadowed/dented) */}
      <rect x="8"  y="5" width="8"  height="12" rx="4" fill="#636058"/>
      {/* Dent on left */}
      <path d="M10 8 Q9 11 10 14" fill="none" stroke="#4a4840" strokeWidth="1.5"/>
      {/* Right brim (higher) */}
      <rect x="14" y="15" width="11" height="3" rx="1" fill="#4a4840"/>
      <rect x="15" y="15" width="9"  height="2" rx="0.5" fill="#888780"/>
      {/* Left brim (bent lower) */}
      <rect x="6"  y="16" width="10" height="3" rx="1" fill="#4a4840"/>
      <rect x="7"  y="16" width="8"  height="2" rx="0.5" fill="#636058"/>
      {/* Rivets */}
      <circle cx="15" cy="8"  r="1.2" fill="#aaa89e"/>
      <circle cx="22" cy="7"  r="1.2" fill="#aaa89e"/>
      <circle cx="11" cy="13" r="1"   fill="#aaa89e"/>
      {/* Chin strap */}
      <path d="M8 19 Q7 23 10 26" fill="none" stroke="#5a3a20" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 17 Q25 22 22 26" fill="none" stroke="#5a3a20" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="13" y="25" width="6" height="3" rx="1" fill="#5a3a20"/>
      {/* Accent from rarity */}
      <rect x="14" y="15" width="11" height="1" rx="0" fill={c} opacity="0.5"/>
    </>
  );
}

function IronScrapsChestIcon({ c }) {
  // Mismatched iron plates — larger left pauldron, central plates, leather strap
  return (
    <>
      {/* Main torso plate */}
      <rect x="8"  y="12" width="16" height="16" rx="2" fill="#636058"/>
      <rect x="9"  y="12" width="8"  height="16" rx="1" fill="#888780"/>
      {/* Central seam */}
      <rect x="16" y="12" width="1"  height="16" rx="0" fill="#4a4840"/>
      {/* Left pauldron (larger) */}
      <rect x="3"  y="6"  width="10" height="9"  rx="3" fill="#4a4840"/>
      <rect x="4"  y="7"  width="8"  height="7"  rx="2" fill="#888780"/>
      {/* Right pauldron (smaller) */}
      <rect x="19" y="8"  width="9"  height="7"  rx="3" fill="#4a4840"/>
      <rect x="20" y="9"  width="7"  height="5"  rx="2" fill="#636058"/>
      {/* Leather mid-strap */}
      <rect x="7"  y="20" width="18" height="3"  rx="1" fill="#5a3a20"/>
      <rect x="14" y="19" width="4"  height="5"  rx="1" fill="#3a2010"/>
      {/* Rivets */}
      <circle cx="6"  cy="9"  r="1.2" fill="#aaa89e"/>
      <circle cx="11" cy="7"  r="1.2" fill="#aaa89e"/>
      <circle cx="21" cy="10" r="1"   fill="#aaa89e"/>
      <circle cx="26" cy="10" r="1"   fill="#aaa89e"/>
      <circle cx="9"  cy="13" r="1"   fill="#aaa89e"/>
      <circle cx="23" cy="13" r="1"   fill="#aaa89e"/>
      {/* Battle gouge scratch */}
      <path d="M10 15 L13 20" fill="none" stroke="#4a4840" strokeWidth="1" opacity="0.8"/>
      {/* Rarity accent */}
      <rect x="3" y="6" width="10" height="1.5" rx="0" fill={c} opacity="0.45"/>
    </>
  );
}

function IronScrapsBootsIcon({ c }) {
  // Iron shin guards with leather calf wraps and rough toe caps
  return (
    <>
      {/* Left leg leather wraps */}
      <rect x="3"  y="6"  width="10" height="2"  rx="0.5" fill="#5a3a20"/>
      <rect x="3"  y="10" width="10" height="2"  rx="0.5" fill="#5a3a20"/>
      <rect x="3"  y="14" width="10" height="2"  rx="0.5" fill="#5a3a20"/>
      {/* Left shin guard */}
      <rect x="3"  y="16" width="10" height="10" rx="1"   fill="#4a4840"/>
      <rect x="4"  y="16" width="8"  height="10" rx="1"   fill="#888780"/>
      <rect x="4"  y="16" width="4"  height="10" rx="0"   fill="#636058"/>
      {/* Left toe cap */}
      <path d="M3 26 Q2 29 4 30 L13 30 L13 26Z" fill="#636058"/>
      <path d="M4 26 Q3 28 5 30 L12 30 L12 26Z" fill="#888780"/>
      {/* Right leg leather wraps */}
      <rect x="19" y="6"  width="10" height="2"  rx="0.5" fill="#5a3a20"/>
      <rect x="19" y="10" width="10" height="2"  rx="0.5" fill="#5a3a20"/>
      <rect x="19" y="14" width="10" height="2"  rx="0.5" fill="#5a3a20"/>
      {/* Right shin guard */}
      <rect x="19" y="16" width="10" height="10" rx="1"   fill="#4a4840"/>
      <rect x="20" y="16" width="8"  height="10" rx="1"   fill="#636058"/>
      <rect x="24" y="16" width="4"  height="10" rx="0"   fill="#888780"/>
      {/* Right toe cap */}
      <path d="M19 26 Q19 29 21 30 L29 30 Q30 28 29 26Z" fill="#636058"/>
      {/* Rivets */}
      <circle cx="4"  cy="17" r="1"   fill="#aaa89e"/>
      <circle cx="12" cy="17" r="1"   fill="#aaa89e"/>
      <circle cx="20" cy="17" r="1"   fill="#aaa89e"/>
      <circle cx="28" cy="17" r="1"   fill="#aaa89e"/>
      {/* Strap across shin */}
      <rect x="3"  y="21" width="10" height="2"  rx="0.5" fill="#5a3a20"/>
      <rect x="19" y="21" width="10" height="2"  rx="0.5" fill="#5a3a20"/>
      {/* Rarity accent */}
      <rect x="3" y="16" width="10" height="1" rx="0" fill={c} opacity="0.5"/>
      <rect x="19" y="16" width="10" height="1" rx="0" fill={c} opacity="0.5"/>
    </>
  );
}

// ─── FOREST RANGER SET ICONS ─────────────────────────────────────────────────

function ForestRangerHelmIcon({ c }) {
  // Fitted dark leather ranger cap with wood brow guard, leaf pin, crown leaf
  return (
    <>
      {/* Cap body shadow half */}
      <path d="M16 8 Q7 9 7 15 Q7 21 9 26 L16 25Z" fill="#3d2b1a"/>
      {/* Cap body lit half */}
      <path d="M16 8 Q25 9 25 15 Q25 21 23 26 L16 25Z" fill="#4e3622"/>
      {/* Center seam */}
      <line x1="16" y1="8" x2="16" y2="25" stroke="#2a1a08" strokeWidth="0.7" opacity="0.6"/>
      {/* Top highlight */}
      <path d="M7 10 Q16 8 25 10 L25 11 Q16 9 7 11Z" fill="#7a5a38" opacity="0.4"/>
      {/* Wood brow guard */}
      <path d="M8 20 Q8 18 16 17 Q24 18 24 20 L24 23 Q24 22 16 22 Q8 22 8 23Z" fill="#5a4a2a"/>
      <path d="M9 18 Q16 17 23 19 L23 20 Q16 18 9 19Z" fill="#7a6a3a" opacity="0.5"/>
      {/* Left temple leaf */}
      <path d="M7 13 Q5 16 6 19 Q8 16 8 13Z" fill="#3B6D11" opacity="0.9"/>
      {/* Right temple leaf */}
      <path d="M25 13 Q27 16 26 19 Q24 16 24 13Z" fill="#3B6D11" opacity="0.9"/>
      {/* Crown leaf stem */}
      <line x1="16" y1="8" x2="16" y2="5" stroke="#2a1a08" strokeWidth="0.8"/>
      {/* Crown leaf */}
      <path d="M16 5 Q13 3 11 5 Q13 6 16 8 Q19 6 21 5 Q19 3 16 5Z" fill="#4e8c18"/>
      {/* Chin strap */}
      <path d="M9 23 Q8 27 10 30" fill="none" stroke="#4e3622" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M23 23 Q24 27 22 30" fill="none" stroke="#4e3622" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 30 Q16 32 22 30" fill="none" stroke="#7a5a38" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      {/* Rarity accent */}
      <rect x="7" y="20" width="17" height="1" rx="0" fill={c} opacity="0.45"/>
    </>
  );
}

function ForestRangerChestIcon({ c }) {
  // Dark leather harness, wooden shoulder caps, diagonal quiver strap, leaf motifs
  return (
    <>
      {/* Green fabric underlay */}
      <path d="M8 10 L24 10 L22 26 L10 26Z" fill="#3B6D11" opacity="0.2"/>
      {/* Left leather band */}
      <path d="M14 10 L8 12 Q7 19 10 26 L14 26Z" fill="#3d2b1a"/>
      <path d="M14 10 L9 12 Q8 19 11 26 L14 26Z" fill="#4e3622"/>
      {/* Right leather band */}
      <path d="M18 10 L24 12 Q25 19 22 26 L18 26Z" fill="#5a3f28"/>
      {/* Horizontal straps */}
      <rect x="8" y="14" width="16" height="3" rx="0.5" fill="#4e3622"/>
      <rect x="8" y="14" width="16" height="1.5" rx="0.5" fill="#5a3f28"/>
      <rect x="8" y="20" width="16" height="3" rx="0.5" fill="#4e3622"/>
      <rect x="8" y="20" width="16" height="1.5" rx="0.5" fill="#5a3f28"/>
      {/* Buckle center upper */}
      <rect x="14" y="13" width="4" height="5" rx="0.5" fill="#2a1a08"/>
      <rect x="14.5" y="13.5" width="3" height="4" rx="0.5" fill="#4e3622"/>
      {/* Diagonal quiver strap */}
      <path d="M9 11 Q16 18 23 25" fill="none" stroke="#2a1a08" strokeWidth="3" strokeLinecap="round"/>
      <path d="M9 11 Q16 18 23 25" fill="none" stroke="#4e3622" strokeWidth="2" strokeLinecap="round"/>
      {/* Left shoulder cap (wood) */}
      <path d="M3 8 Q3 5 8 4 Q14 4 17 8 L17 14 Q14 16 8 15 Q3 15 3 12Z" fill="#5a4a2a"/>
      <path d="M4 8 Q4 5 9 4 Q14 4 16 8 L16 13 Q13 14 9 13 Q4 13 4 10Z" fill="#6a5a38"/>
      <path d="M4 4 Q9 3 16 6 L16 7 Q9 4 4 5Z" fill="#7a6a3a" opacity="0.5"/>
      {/* Leaf on left cap */}
      <path d="M7 6 Q5 9 7 13 Q9 9 7 6Z" fill="#3B6D11" opacity="0.75"/>
      {/* Right shoulder cap */}
      <path d="M15 8 Q15 5 20 4 Q25 4 27 8 L27 13 Q25 15 20 14 Q15 14 15 11Z" fill="#3a2a10"/>
      <path d="M16 8 Q16 5 20 4 Q24 4 26 8 L26 12 Q24 13 20 12 Q16 12 16 10Z" fill="#5a4a2a"/>
      {/* Leaf on right cap */}
      <path d="M23 6 Q21 9 23 12 Q25 9 23 6Z" fill="#3B6D11" opacity="0.75"/>
      {/* Studs */}
      <circle cx="5"  cy="10" r="1" fill="#2a1a08"/><circle cx="4.5" cy="9.5" r="0.4" fill="#8a7a58"/>
      <circle cx="25" cy="9"  r="1" fill="#2a1a08"/><circle cx="24.5" cy="8.5" r="0.4" fill="#8a7a58"/>
      {/* Rarity accent */}
      <rect x="3" y="4" width="14" height="1" rx="0" fill={c} opacity="0.45"/>
    </>
  );
}

function ForestRangerBootsIcon({ c }) {
  // Tall leather boots: laced front, fur trim, leaf imprint on shin, wooden toe guard
  return (
    <>
      {/* ── Left boot ── */}
      {/* Calf (upper boot) shadow */}
      <rect x="3"  y="6"  width="5" height="16" rx="1" fill="#2a1a08"/>
      {/* Calf lit */}
      <rect x="5"  y="6"  width="5" height="16" rx="1" fill="#5a3f28"/>
      {/* Fur trim */}
      <rect x="3"  y="6"  width="9" height="4"  rx="1" fill="#c8a878"/>
      <rect x="3"  y="6"  width="9" height="2.5" rx="1" fill="#d8b888"/>
      {/* Front seam */}
      <line x1="7" y1="6" x2="7" y2="22" stroke="#2a1a08" strokeWidth="0.8"/>
      {/* Lacing */}
      <g stroke="#7a5a38" strokeWidth="0.6" opacity="0.7">
        <line x1="5" y1="11" x2="3" y2="13"/><line x1="9" y1="11" x2="11" y2="13"/>
        <line x1="5" y1="15" x2="3" y2="17"/><line x1="9" y1="15" x2="11" y2="17"/>
      </g>
      {/* Leaf imprint */}
      <path d="M7 16 Q5 19 7 22 Q9 19 7 16Z" fill="none" stroke="#3B6D11" strokeWidth="0.7" opacity="0.5"/>
      {/* Wood toe guard */}
      <path d="M3 22 Q2 25 4 27 L10 27 L11 22Z" fill="#5a4a2a"/>
      <path d="M4 22 Q3 24 5 26 L10 26 L10 22Z" fill="#7a6a3a"/>
      <circle cx="7" cy="24" r="1" fill="#2a1a08"/><circle cx="6.6" cy="23.6" r="0.4" fill="#8a7a58"/>

      {/* ── Right boot ── */}
      <rect x="20" y="6"  width="5" height="16" rx="1" fill="#2a1a08"/>
      <rect x="22" y="6"  width="5" height="16" rx="1" fill="#5a3f28"/>
      <rect x="20" y="6"  width="9" height="4"  rx="1" fill="#c8a878"/>
      <rect x="20" y="6"  width="9" height="2.5" rx="1" fill="#d8b888"/>
      <line x1="24" y1="6" x2="24" y2="22" stroke="#2a1a08" strokeWidth="0.8"/>
      <g stroke="#7a5a38" strokeWidth="0.6" opacity="0.7">
        <line x1="22" y1="11" x2="20" y2="13"/><line x1="26" y1="11" x2="28" y2="13"/>
        <line x1="22" y1="15" x2="20" y2="17"/><line x1="26" y1="15" x2="28" y2="17"/>
      </g>
      <path d="M24 16 Q22 19 24 22 Q26 19 24 16Z" fill="none" stroke="#3B6D11" strokeWidth="0.7" opacity="0.5"/>
      <path d="M20 22 Q20 25 22 27 L28 27 Q29 25 28 22Z" fill="#5a4a2a"/>
      <path d="M21 22 Q21 24 23 26 L27 26 Q28 24 27 22Z" fill="#7a6a3a"/>
      <circle cx="24" cy="24" r="1" fill="#2a1a08"/><circle cx="23.6" cy="23.6" r="0.4" fill="#8a7a58"/>

      {/* Rarity accent */}
      <rect x="3"  y="6" width="9" height="1" rx="0" fill={c} opacity="0.45"/>
      <rect x="20" y="6" width="9" height="1" rx="0" fill={c} opacity="0.45"/>
    </>
  );
}

// ─── STEEL KNIGHT SET ICONS ──────────────────────────────────────────────────

function SteelKnightHelmIcon({ c }) {
  return (
    <>
      {/* Great helm body shadow */}
      <path d="M7 10 Q7 6 16 5 Q25 6 25 10 L25 24 Q25 28 16 29 Q7 28 7 24Z" fill="#3a4a58"/>
      {/* Great helm face */}
      <path d="M8 10 Q8 6 16 5 Q24 6 24 10 L24 23 Q24 27 16 28 Q8 27 8 23Z" fill="#6a7a8a"/>
      {/* Lit right side */}
      <path d="M16 5 Q24 6 24 10 L24 18 Q20 20 16 20Z" fill="#9aaabb"/>
      {/* Top rim */}
      <path d="M7 10 Q16 8 25 10 L25 11 Q16 9 7 11Z" fill="#c8dae8"/>
      {/* Visor */}
      <path d="M8 16 L24 16 L24 21 Q16 22 8 21Z" fill="#1e2a36"/>
      {/* Eye slit */}
      <path d="M9 18 L23 18 L23 19.5 Q16 20 9 19.5Z" fill="#0a1520"/>
      {/* Knight cross */}
      <rect x="14.5" y="10" width="3" height="7" rx="0.5" fill="#0f3f70"/>
      <rect x="15" y="10.5" width="2" height="6" rx="0.5" fill="#185FA5"/>
      <rect x="11" y="12.5" width="10" height="2.5" rx="0.5" fill="#0f3f70"/>
      <rect x="11.5" y="13" width="9" height="1.5" rx="0.5" fill="#185FA5"/>
      {/* Rivets */}
      {[9,13,17,21,25].map(x => (
        <g key={x}><circle cx={x} cy="10" r="1" fill="#1e2a36"/><circle cx={x-0.2} cy={9.8} r="0.4" fill="#aabbc8"/></g>
      ))}
      {/* Chin plate */}
      <path d="M9 24 Q9 23 16 23 Q23 23 23 24 L22 28 Q16 29 10 28Z" fill="#3a4a58"/>
      <path d="M10 24 Q10 23 16 23 Q22 23 22 24 L21 27 Q16 28 11 27Z" fill="#6a7a8a"/>
      {/* Rarity accent */}
      <rect x="7" y="10" width="18" height="1" rx="0" fill={c} opacity="0.4"/>
    </>
  );
}

function SteelKnightChestIcon({ c }) {
  return (
    <>
      {/* Blue fabric underlay */}
      <path d="M8 10 L24 10 L22 26 L10 26Z" fill="#2a6bbf" opacity="0.18"/>
      {/* Left half shadow */}
      <path d="M14 10 L8 12 Q7 19 10 26 L16 26Z" fill="#3a4a58"/>
      {/* Right half lit */}
      <path d="M18 10 L24 12 Q25 19 22 26 L16 26Z" fill="#9aaabb"/>
      {/* Center ridge */}
      <line x1="16" y1="10" x2="16" y2="26" stroke="#c8dae8" strokeWidth="1" opacity="0.4"/>
      {/* Plate bands */}
      <rect x="9" y="15" width="14" height="3" rx="0.5" fill="#3a4a58"/>
      <rect x="9.5" y="15.5" width="13" height="2" rx="0.5" fill="#6a7a8a"/>
      <rect x="9" y="21" width="14" height="3" rx="0.5" fill="#3a4a58"/>
      <rect x="9.5" y="21.5" width="13" height="2" rx="0.5" fill="#6a7a8a"/>
      {/* Knight cross */}
      <rect x="14.5" y="11" width="3" height="10" rx="0.5" fill="#0f3f70"/>
      <rect x="15" y="11.5" width="2" height="9" rx="0.5" fill="#185FA5"/>
      <rect x="10" y="14" width="12" height="3" rx="0.5" fill="#0f3f70"/>
      <rect x="10.5" y="14.5" width="11" height="2" rx="0.5" fill="#185FA5"/>
      {/* Left pauldron */}
      <path d="M2 8 Q2 5 8 4 Q14 4 16 8 L16 14 Q14 16 8 15 Q2 15 2 12Z" fill="#3a4a58"/>
      <path d="M3 8 Q3 5 8 4 Q13 4 15 8 L15 13 Q13 14 8 13 Q3 13 3 10Z" fill="#6a7a8a"/>
      <path d="M3 4 Q8 3 15 7 L15 8 Q8 4 3 5Z" fill="#c8dae8" opacity="0.4"/>
      {/* Right pauldron */}
      <path d="M16 8 Q16 5 22 4 Q28 4 30 8 L30 13 Q28 15 22 14 Q16 14 16 11Z" fill="#3a4a58"/>
      <path d="M17 8 Q17 5 22 4 Q27 4 29 8 L29 12 Q27 13 22 12 Q17 12 17 10Z" fill="#9aaabb"/>
      <path d="M17 4 Q22 3 29 7 L29 8 Q22 4 17 5Z" fill="#c8dae8" opacity="0.35"/>
      {/* Rivets */}
      <circle cx="3"  cy="10" r="1" fill="#1e2a36"/><circle cx="2.7" cy="9.7" r="0.4" fill="#aabbc8"/>
      <circle cx="29" cy="10" r="1" fill="#1e2a36"/><circle cx="28.7" cy="9.7" r="0.4" fill="#aabbc8"/>
      {/* Rarity accent */}
      <rect x="2" y="4" width="13" height="1" rx="0" fill={c} opacity="0.4"/>
    </>
  );
}

function SteelKnightBootsIcon({ c }) {
  return (
    <>
      {/* Blue fabric at knee */}
      <rect x="3"  y="6" width="9" height="3" rx="0.5" fill="#2a6bbf" opacity="0.5"/>
      <rect x="20" y="6" width="9" height="3" rx="0.5" fill="#2a6bbf" opacity="0.5"/>
      {/* Left knee cop */}
      <path d="M3 8 Q3 6 7 5 Q11 6 11 8 L11 13 Q11 15 7 15 Q3 15 3 13Z" fill="#3a4a58"/>
      <path d="M4 8 Q4 6 7 5 Q10 6 10 8 L10 12 Q10 14 7 14 Q4 14 4 12Z" fill="#9aaabb"/>
      <path d="M4 5 Q7 4 10 7 L10 8 Q7 5 4 6Z" fill="#c8dae8" opacity="0.4"/>
      {/* Left shin plate */}
      <rect x="3"  y="14" width="9" height="10" rx="1" fill="#3a4a58"/>
      <rect x="4"  y="14" width="8" height="10" rx="1" fill="#6a7a8a"/>
      <rect x="7"  y="14" width="3" height="10" rx="0" fill="#9aaabb"/>
      <line x1="7" y1="14" x2="7" y2="24" stroke="#c8dae8" strokeWidth="0.7" opacity="0.4"/>
      {/* Mid strap left */}
      <rect x="3" y="19" width="9" height="2" rx="0.5" fill="#1e2a36"/>
      {/* Left sabaton */}
      <path d="M3 24 Q2 27 4 29 L12 29 L12 24Z" fill="#3a4a58"/>
      <path d="M4 24 Q3 26 5 28 L11 28 L11 24Z" fill="#6a7a8a"/>
      <circle cx="7" cy="26" r="1" fill="#1e2a36"/><circle cx="6.7" cy="25.7" r="0.4" fill="#aabbc8"/>

      {/* Right knee cop */}
      <path d="M20 8 Q20 6 24 5 Q28 6 28 8 L28 13 Q28 15 24 15 Q20 15 20 13Z" fill="#3a4a58"/>
      <path d="M21 8 Q21 6 24 5 Q27 6 27 8 L27 12 Q27 14 24 14 Q21 14 21 12Z" fill="#9aaabb"/>
      <path d="M21 5 Q24 4 27 7 L27 8 Q24 5 21 6Z" fill="#c8dae8" opacity="0.4"/>
      {/* Right shin */}
      <rect x="20" y="14" width="9" height="10" rx="1" fill="#3a4a58"/>
      <rect x="21" y="14" width="8" height="10" rx="1" fill="#6a7a8a"/>
      <rect x="24" y="14" width="3" height="10" rx="0" fill="#9aaabb"/>
      <line x1="24" y1="14" x2="24" y2="24" stroke="#c8dae8" strokeWidth="0.7" opacity="0.4"/>
      <rect x="20" y="19" width="9" height="2" rx="0.5" fill="#1e2a36"/>
      {/* Right sabaton */}
      <path d="M20 24 Q20 27 22 29 L29 29 Q30 27 29 24Z" fill="#3a4a58"/>
      <path d="M21 24 Q21 26 23 28 L28 28 Q29 26 28 24Z" fill="#6a7a8a"/>
      <circle cx="24" cy="26" r="1" fill="#1e2a36"/><circle cx="23.7" cy="25.7" r="0.4" fill="#aabbc8"/>

      {/* Rarity accent */}
      <rect x="3"  y="14" width="9" height="1" rx="0" fill={c} opacity="0.4"/>
      <rect x="20" y="14" width="9" height="1" rx="0" fill={c} opacity="0.4"/>
    </>
  );
}

// ─── VOID REAPER SET ICONS ───────────────────────────────────────────────────

function VoidReaperHelmIcon({ c }) {
  return (
    <>
      {/* Main helm body */}
      <path d="M7 11 Q7 7 16 6 Q25 7 25 11 L25 26 Q25 30 16 31 Q7 30 7 26Z" fill="#0a0a12"/>
      <path d="M16 6 Q25 7 25 11 L25 20 Q21 22 16 22Z" fill="#1e1e30"/>
      {/* Left horn */}
      <path d="M8 11 Q3 6 1 2 Q3 4 6 9 Q7 12 8 14Z" fill="#12121e"/>
      <path d="M8 11 Q3 6 1 2 Q2 3 5 8 Q6 11 7 13Z" fill="#1e1e30"/>
      {/* Right horn */}
      <path d="M24 11 Q29 6 31 2 Q29 4 26 9 Q25 12 24 14Z" fill="#12121e"/>
      <path d="M24 11 Q29 6 31 2 Q30 3 27 8 Q26 11 25 13Z" fill="#1e1e30"/>
      {/* Eye slits */}
      <path d="M9 18 Q11 17 14 18 L14 20 Q11 21 9 20Z" fill="#534AB7"/>
      <path d="M10 18 Q12 17.5 13 18 L13 19.5 Q11 20 10 19.5Z" fill="#a89af0"/>
      <path d="M18 18 Q21 17 23 18 L23 20 Q21 21 18 20Z" fill="#534AB7"/>
      <path d="M19 18 Q21 17.5 22 18 L22 19.5 Q20 20 19 19.5Z" fill="#a89af0"/>
      {/* Void cracks */}
      <path d="M12 24 L11 29 L13 27 L12 32" fill="none" stroke="#7F77DD" strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
      <path d="M20 23 L21 28 L19 26 L20 31" fill="none" stroke="#7F77DD" strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
      {/* Jagged bottom */}
      <path d="M8 26 L10 29 L12 26 L14 30 L16 26 L18 30 L20 26 L22 29 L24 26" fill="none" stroke="#7F77DD" strokeWidth="0.7" opacity="0.5"/>
      {/* Rarity accent */}
      <rect x="7" y="11" width="18" height="1" rx="0" fill={c} opacity="0.4"/>
    </>
  );
}

function VoidReaperChestIcon({ c }) {
  return (
    <>
      {/* Shadow cloak */}
      <path d="M3 10 Q4 20 2 30 Q6 28 8 26 Q6 18 7 10Z" fill="#534AB7" opacity="0.3"/>
      <path d="M29 10 Q28 20 30 30 Q26 28 24 26 Q26 18 25 10Z" fill="#534AB7" opacity="0.3"/>
      {/* Main cuirass */}
      <path d="M14 8 L8 10 Q7 18 10 26 L16 26Z" fill="#0a0a12"/>
      <path d="M18 8 L24 10 Q25 18 22 26 L16 26Z" fill="#1e1e30"/>
      {/* Rib plates */}
      {[10,14,18,22].map(y => (
        <g key={y}>
          <rect x="9" y={y} width="14" height="3" rx="0.3" fill="#12121e"/>
          <rect x="9.5" y={y+0.5} width="13" height="2" rx="0.3" fill="#1e1e30"/>
        </g>
      ))}
      {/* Cracks */}
      <path d="M10 11 L9 17 L11 14 L10 22" fill="none" stroke="#7F77DD" strokeWidth="0.8" strokeLinecap="round" opacity="0.8"/>
      <path d="M22 10 L23 16 L21 13 L22 21" fill="none" stroke="#7F77DD" strokeWidth="0.8" strokeLinecap="round" opacity="0.8"/>
      {/* Left pauldron */}
      <path d="M2 7 Q2 4 8 3 Q14 3 16 7 L16 15 Q14 17 8 16 Q2 16 2 12Z" fill="#0a0a12"/>
      <path d="M3 7 Q3 4 8 3 Q13 3 15 7 L15 14 Q13 15 8 14 Q3 14 3 10Z" fill="#1e1e30"/>
      {/* Jagged pauldron edge */}
      <path d="M3 13 L5 16 L7 13 L9 17 L11 13 L13 16 L15 14" fill="none" stroke="#7F77DD" strokeWidth="0.6" opacity="0.5"/>
      {/* Right pauldron */}
      <path d="M16 7 Q16 4 22 3 Q28 3 30 7 L30 14 Q28 16 22 15 Q16 15 16 11Z" fill="#0a0a12"/>
      <path d="M17 7 Q17 4 22 3 Q27 3 29 7 L29 13 Q27 14 22 13 Q17 13 17 10Z" fill="#1e1e30"/>
      <path d="M17 12 L19 15 L21 12 L23 16 L25 12 L27 15 L29 13" fill="none" stroke="#7F77DD" strokeWidth="0.6" opacity="0.5"/>
      {/* Jagged bottom */}
      <path d="M8 25 L10 28 L12 25 L14 29 L16 25 L18 29 L20 25 L22 28 L24 25" fill="none" stroke="#7F77DD" strokeWidth="0.7" opacity="0.5"/>
      {/* Rarity accent */}
      <rect x="2" y="3" width="13" height="1" rx="0" fill={c} opacity="0.4"/>
    </>
  );
}

function VoidReaperBootsIcon({ c }) {
  return (
    <>
      {/* Left boot */}
      <rect x="3"  y="6"  width="9" height="16" rx="1" fill="#0a0a12"/>
      <rect x="7"  y="6"  width="5" height="16" rx="0" fill="#1e1e30"/>
      <line x1="7" y1="6" x2="7" y2="22" stroke="#2a2a44" strokeWidth="0.8"/>
      {/* Jagged top left */}
      <path d="M3 7 L5 5 L7 7 L9 5 L11 7" fill="none" stroke="#7F77DD" strokeWidth="0.7" opacity="0.6"/>
      {/* Crack left */}
      <path d="M5 10 L4 16 L6 13 L5 20" fill="none" stroke="#7F77DD" strokeWidth="0.7" strokeLinecap="round" opacity="0.7"/>
      {/* Mid band */}
      <rect x="3" y="17" width="9" height="2" rx="0.3" fill="#12121e"/>
      <line x1="3" y1="18" x2="12" y2="18" stroke="#534AB7" strokeWidth="0.5" opacity="0.5"/>
      {/* Claw toe guard left */}
      <path d="M3 22 Q1 26 3 30 L12 30 L12 22Z" fill="#0a0a12"/>
      <path d="M4 22 Q2 25 4 28 L11 28 L11 22Z" fill="#1e1e30"/>
      <path d="M2 28 Q0 30 1 33" fill="none" stroke="#1e1e30" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 22 Q2 24 4 28" fill="none" stroke="#7F77DD" strokeWidth="0.6" opacity="0.4"/>

      {/* Right boot */}
      <rect x="20" y="6"  width="9" height="16" rx="1" fill="#0a0a12"/>
      <rect x="20" y="6"  width="5" height="16" rx="0" fill="#1e1e30"/>
      <line x1="24" y1="6" x2="24" y2="22" stroke="#2a2a44" strokeWidth="0.8"/>
      <path d="M20 7 L22 5 L24 7 L26 5 L28 7" fill="none" stroke="#7F77DD" strokeWidth="0.7" opacity="0.6"/>
      <path d="M26 10 L27 16 L25 13 L26 20" fill="none" stroke="#7F77DD" strokeWidth="0.7" strokeLinecap="round" opacity="0.7"/>
      <rect x="20" y="17" width="9" height="2" rx="0.3" fill="#12121e"/>
      <line x1="20" y1="18" x2="29" y2="18" stroke="#534AB7" strokeWidth="0.5" opacity="0.5"/>
      <path d="M20 22 Q20 26 22 30 L29 30 Q30 26 29 22Z" fill="#0a0a12"/>
      <path d="M21 22 Q21 25 23 28 L28 28 Q29 25 28 22Z" fill="#1e1e30"/>
      <path d="M29 28 Q31 30 30 33" fill="none" stroke="#1e1e30" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 22 Q30 24 28 28" fill="none" stroke="#7F77DD" strokeWidth="0.6" opacity="0.4"/>

      {/* Rarity accent */}
      <rect x="3"  y="6" width="9" height="1" rx="0" fill={c} opacity="0.4"/>
      <rect x="20" y="6" width="9" height="1" rx="0" fill={c} opacity="0.4"/>
    </>
  );
}

// ─── SOLAR TITAN SET ICONS ───────────────────────────────────────────────────

function SolarTitanHelmIcon({ c }) {
  return (
    <>
      {/* Main helm body shadow */}
      <path d="M7 11 Q7 7 16 6 Q25 7 25 11 L25 26 Q25 30 16 31 Q7 30 7 26Z" fill="#8a6010"/>
      {/* Lit right */}
      <path d="M16 6 Q25 7 25 11 L25 20 Q20 22 16 21Z" fill="#e8b84a"/>
      {/* Face */}
      <path d="M8 11 Q8 7 16 6 Q24 7 24 11 L24 25 Q24 29 16 30 Q8 29 8 25Z" fill="#c9952a"/>
      {/* Top rim */}
      <path d="M7 11 Q16 9 25 11 L25 12 Q16 10 7 12Z" fill="#ffd870"/>
      {/* Left wing flange */}
      <path d="M8 13 Q3 8 1 5 Q3 9 6 14 Q7 16 8 17Z" fill="#8a6010"/>
      <path d="M8 13 Q3 9 2 6 Q4 10 7 15Z" fill="#c9952a"/>
      {/* Right wing flange */}
      <path d="M24 13 Q29 8 31 5 Q29 9 26 14 Q25 16 24 17Z" fill="#8a6010"/>
      <path d="M24 13 Q29 9 30 6 Q28 10 25 15Z" fill="#e8b84a"/>
      {/* Amber eye lenses */}
      <path d="M9 18 Q11 16 14 17 Q16 18 16 20 Q16 22 14 23 Q11 24 9 22 Q8 20 9 18Z" fill="#4a3008"/>
      <path d="M10 18 Q12 17 14 18 Q15 19 15 20 Q15 21 13 22 Q11 23 10 21 Q9 20 10 18Z" fill="#ff9a20"/>
      <circle cx="11" cy="18.5" r="0.8" fill="#fff4c0" opacity="0.6"/>
      <path d="M18 17 Q21 16 23 18 Q24 20 23 22 Q21 23 18 22 Q16 20 18 17Z" fill="#4a3008"/>
      <path d="M19 18 Q21 17 23 18 Q24 19 23 21 Q21 22 19 21 Q17 20 19 18Z" fill="#ff9a20"/>
      <circle cx="20" cy="18.5" r="0.8" fill="#fff4c0" opacity="0.6"/>
      {/* Solar rune on brow */}
      <circle cx="16" cy="14" r="2.5" fill="#4a3008"/>
      <circle cx="16" cy="14" r="1.7" fill="#8a6010"/>
      <circle cx="16" cy="14" r="1" fill="#ff9a20" opacity="0.9"/>
      <line x1="16" y1="11.5" x2="16" y2="16.5" stroke="#ffd870" strokeWidth="0.6" opacity="0.6"/>
      <line x1="13.5" y1="14" x2="18.5" y2="14" stroke="#ffd870" strokeWidth="0.6" opacity="0.6"/>
      {/* Sun disc crown */}
      {[0,60,120,180,240,300].map((deg, i) => {
        const r = deg * Math.PI / 180;
        return <line key={i} x1={16+Math.sin(r)*3} y1={5-Math.cos(r)*3} x2={16+Math.sin(r)*6} y2={5-Math.cos(r)*6}
          stroke="#ffd870" strokeWidth="0.8" opacity="0.7" strokeLinecap="round"/>;
      })}
      <circle cx="16" cy="5" r="2.5" fill="#8a6010"/>
      <circle cx="16" cy="5" r="1.5" fill="#ff9a20"/>
      {/* Rivets */}
      {[9,13,17,21,25].map(x => (
        <g key={x}><circle cx={x} cy="11" r="1" fill="#4a3008"/><circle cx={x-0.2} cy={10.8} r="0.4" fill="#ffd870"/></g>
      ))}
      {/* Chin guard */}
      <path d="M9 25 Q9 24 16 24 Q23 24 23 25 L22 29 Q16 30 10 29Z" fill="#8a6010"/>
      <path d="M10 25 Q10 24 16 24 Q22 24 22 25 L21 28 Q16 29 11 28Z" fill="#c9952a"/>
      {/* Rarity accent */}
      <rect x="7" y="11" width="18" height="1" rx="0" fill={c} opacity="0.4"/>
    </>
  );
}

function SolarTitanChestIcon({ c }) {
  return (
    <>
      {/* Fabric */}
      <path d="M8 10 L24 10 L22 26 L10 26Z" fill="#fff4c0" opacity="0.1"/>
      {/* Left shadow */}
      <path d="M14 8 L8 10 Q7 18 10 26 L16 26Z" fill="#8a6010"/>
      {/* Right lit */}
      <path d="M18 8 L24 10 Q25 18 22 26 L16 26Z" fill="#e8b84a"/>
      {/* Central ridge */}
      <line x1="16" y1="8" x2="16" y2="26" stroke="#ffd870" strokeWidth="1" opacity="0.45"/>
      {/* Sun disc on chest */}
      <circle cx="16" cy="18" r="7" fill="#4a3008"/>
      <circle cx="16" cy="18" r="5.5" fill="#8a6010"/>
      <circle cx="16" cy="18" r="4" fill="#c9952a"/>
      <circle cx="16" cy="18" r="2.5" fill="#4a3008"/>
      <circle cx="16" cy="18" r="1.5" fill="#ff9a20"/>
      <circle cx="16" cy="18" r="0.7" fill="#ffcc60"/>
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const r = deg * Math.PI / 180;
        return <line key={i} x1={16+Math.sin(r)*3} y1={18-Math.cos(r)*3} x2={16+Math.sin(r)*6} y2={18-Math.cos(r)*6}
          stroke="#ffd870" strokeWidth="0.6" opacity="0.5"/>;
      })}
      {/* Plate bands */}
      <rect x="8" y="10" width="16" height="2.5" rx="0.5" fill="#8a6010"/>
      <rect x="8.5" y="10.5" width="15" height="1.5" rx="0.5" fill="#e8b84a"/>
      <rect x="8" y="23" width="16" height="2.5" rx="0.5" fill="#8a6010"/>
      <rect x="8.5" y="23.5" width="15" height="1.5" rx="0.5" fill="#c9952a"/>
      {/* Left pauldron */}
      <path d="M2 7 Q2 4 8 3 Q14 3 16 7 L16 15 Q14 17 8 16 Q2 16 2 11Z" fill="#4a3008"/>
      <path d="M3 7 Q3 4 8 3 Q13 3 15 7 L15 14 Q13 15 8 14 Q3 14 3 10Z" fill="#c9952a"/>
      <path d="M3 3 Q8 2 15 6 L15 7 Q8 3 3 4Z" fill="#ffd870" opacity="0.5"/>
      <circle cx="7" cy="9" r="2" fill="#4a3008"/><circle cx="7" cy="9" r="1.3" fill="#8a6010"/><circle cx="7" cy="9" r="0.7" fill="#ff9a20"/>
      {/* Right pauldron */}
      <path d="M16 7 Q16 4 22 3 Q28 3 30 7 L30 14 Q28 16 22 15 Q16 15 16 11Z" fill="#4a3008"/>
      <path d="M17 7 Q17 4 22 3 Q27 3 29 7 L29 13 Q27 14 22 13 Q17 13 17 10Z" fill="#e8b84a"/>
      <path d="M17 3 Q22 2 29 6 L29 7 Q22 3 17 4Z" fill="#ffd870" opacity="0.45"/>
      <circle cx="25" cy="8" r="2" fill="#4a3008"/><circle cx="25" cy="8" r="1.3" fill="#8a6010"/><circle cx="25" cy="8" r="0.7" fill="#ff9a20"/>
      {/* Rarity accent */}
      <rect x="2" y="3" width="13" height="1" rx="0" fill={c} opacity="0.4"/>
    </>
  );
}

function SolarTitanBootsIcon({ c }) {
  return (
    <>
      {/* Left boot */}
      <rect x="3"  y="6"  width="9" height="16" rx="1" fill="#8a6010"/>
      <rect x="7"  y="6"  width="5" height="16" rx="0" fill="#e8b84a"/>
      <line x1="7" y1="6" x2="7" y2="22" stroke="#ffd870" strokeWidth="0.8" opacity="0.4"/>
      {/* Knee rune disc */}
      <circle cx="7" cy="10" r="3" fill="#4a3008"/>
      <circle cx="7" cy="10" r="2.1" fill="#8a6010"/>
      <circle cx="7" cy="10" r="1.2" fill="#ff9a20"/>
      <circle cx="7" cy="10" r="0.5" fill="#ffcc60"/>
      {/* Mid band */}
      <rect x="3" y="18" width="9" height="2.5" rx="0.5" fill="#4a3008"/>
      <rect x="3.5" y="18.5" width="8" height="1.5" rx="0.5" fill="#c9952a"/>
      {/* Golden sabaton left */}
      <path d="M3 22 Q1 26 3 29 L12 29 L12 22Z" fill="#4a3008"/>
      <path d="M4 22 Q2 25 4 28 L11 28 L11 22Z" fill="#8a6010"/>
      <path d="M5 22 Q3 24 5 27 L8 27 L8 22Z" fill="#c9952a" opacity="0.7"/>
      <circle cx="7" cy="25" r="1.5" fill="#4a3008"/><circle cx="7" cy="25" r="0.9" fill="#8a6010"/><circle cx="7" cy="25" r="0.5" fill="#ff9a20"/>
      {/* Ray line on shin */}
      <path d="M4 13 Q3 17 4 21" fill="none" stroke="#ffd870" strokeWidth="0.5" opacity="0.3"/>

      {/* Right boot */}
      <rect x="20" y="6"  width="9" height="16" rx="1" fill="#8a6010"/>
      <rect x="20" y="6"  width="5" height="16" rx="0" fill="#e8b84a"/>
      <line x1="24" y1="6" x2="24" y2="22" stroke="#ffd870" strokeWidth="0.8" opacity="0.4"/>
      <circle cx="24" cy="10" r="3" fill="#4a3008"/>
      <circle cx="24" cy="10" r="2.1" fill="#8a6010"/>
      <circle cx="24" cy="10" r="1.2" fill="#ff9a20"/>
      <circle cx="24" cy="10" r="0.5" fill="#ffcc60"/>
      <rect x="20" y="18" width="9" height="2.5" rx="0.5" fill="#4a3008"/>
      <rect x="20.5" y="18.5" width="8" height="1.5" rx="0.5" fill="#c9952a"/>
      <path d="M20 22 Q20 26 22 29 L29 29 Q30 26 29 22Z" fill="#4a3008"/>
      <path d="M21 22 Q21 25 23 28 L28 28 Q29 25 28 22Z" fill="#8a6010"/>
      <path d="M24 22 Q25 24 25 27 L28 27 Q28 24 27 22Z" fill="#c9952a" opacity="0.7"/>
      <circle cx="24" cy="25" r="1.5" fill="#4a3008"/><circle cx="24" cy="25" r="0.9" fill="#8a6010"/><circle cx="24" cy="25" r="0.5" fill="#ff9a20"/>
      <path d="M27 13 Q28 17 27 21" fill="none" stroke="#ffd870" strokeWidth="0.5" opacity="0.3"/>

      {/* Rarity accent */}
      <rect x="3"  y="6" width="9" height="1" rx="0" fill={c} opacity="0.4"/>
      <rect x="20" y="6" width="9" height="1" rx="0" fill={c} opacity="0.4"/>
    </>
  );
}

// ─── NAME → ICON MAP ──────────────────────────────────────────────────────────
const ITEM_ICONS = {
  // Iron Scraps set
  'Iron Scraps Helm':  IronScrapsHelm,
  'Iron Scraps Chest': IronScrapsChestIcon,
  'Iron Scraps Boots': IronScrapsBootsIcon,
  // Forest Ranger set
  'Forest Ranger Helm':  ForestRangerHelmIcon,
  'Forest Ranger Chest': ForestRangerChestIcon,
  'Forest Ranger Boots': ForestRangerBootsIcon,
  // Steel Knight set
  'Steel Knight Helm':  SteelKnightHelmIcon,
  'Steel Knight Chest': SteelKnightChestIcon,
  'Steel Knight Boots': SteelKnightBootsIcon,
  // Void Reaper set
  'Void Reaper Helm':  VoidReaperHelmIcon,
  'Void Reaper Chest': VoidReaperChestIcon,
  'Void Reaper Boots': VoidReaperBootsIcon,
  // Solar Titan set
  'Solar Titan Helm':  SolarTitanHelmIcon,
  'Solar Titan Chest': SolarTitanChestIcon,
  'Solar Titan Boots': SolarTitanBootsIcon,
  // Helmets
  'Iron Helm':    IronHelm,
  'Shadow Hood':  ShadowHood,
  'Spiked Crown': SpikedCrown,
  'Bone Mask':    BoneMask,
  // Chest
  'Chain Mail':   ChainMail,
  'Leather Vest': LeatherVest,
  'Battle Plate': BattlePlate,
  'Runed Robe':   RunedRobe,
  // Boots
  'Speed Boots':  SpeedBoots,
  'Iron Treads':  IronTreads,
  'Ninja Wraps':  NinjaWraps,
  'Cursed Shoes': CursedShoes,
  // Weapons
  'Iron Sword':   IronSword,
  'Battle Axe':   BattleAxe,
  'Magic Staff':  MagicStaff,
  'Shadow Blade': ShadowBlade,
  'Holy Mace':    HolyMace,
  'Wooden Sword': IronSword,   // Wooden Sword uses sword shape — rendered with grey/brown color
  // Rings
  'Ring of War':  RingOfWar,
  'Ring of Life': RingOfLife,
  'Shield Ring':  ShieldRing,
  'Phantom Ring': PhantomRing,
  // Special
  'Amulet of Fury': AmuletOfFury,
  'Dragon Scale':   DragonScale,
  'Orb of Chaos':   OrbOfChaos,
  'Soul Crystal':   SoulCrystal,
};

// Strip rarity prefix to find base name
// e.g. "Legendary Iron Sword" → "Iron Sword"
const RARITY_PREFIXES = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
function baseName(name) {
  for (const p of RARITY_PREFIXES) {
    if (name?.startsWith(p + ' ')) return name.slice(p.length + 1);
  }
  return name || '';
}

// ─── EXPORTED COMPONENT ──────────────────────────────────────────────────────
export default function ItemIcon({ name, size = 34, color = '#94a3b8' }) {
  const base  = baseName(name);
  const Shape = ITEM_ICONS[base];

  return (
    <svg
      viewBox={`0 0 ${V} ${V}`}
      width={size} height={size}
      style={{ imageRendering: 'pixelated', overflow: 'visible', display: 'block' }}
    >
      {Shape
        ? <Shape c={color}/>
        : <>
            {/* Generic fallback — glowing star */}
            <polygon
              points="16,2 19,12 30,12 21,18 24,28 16,22 8,28 11,18 2,12 13,12"
              fill={color} opacity="0.8"
            />
            <polygon
              points="16,6 18,12 24,12 20,16 21,22 16,19 11,22 12,16 8,12 14,12"
              fill="#fff" opacity="0.4"
            />
          </>
      }
    </svg>
  );
}
