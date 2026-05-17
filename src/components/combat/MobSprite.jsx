import React from 'react';

// Small mob SVG sprites for dungeon encounters.
// Each renders at the given size (height), width = size * 0.6.
// All designed at viewBox="0 0 60 100" — same geometry scale as bosses but smaller.

function Zombie({ size = 80 }) {
  const w = Math.round(size * 0.6);
  return (
    <svg width={w} height={size} viewBox="0 0 60 100" style={{ imageRendering: 'pixelated', overflow: 'visible' }}>
      {/* Shadow */}
      <ellipse cx="30" cy="97" rx="14" ry="3" fill="rgba(0,0,0,0.4)"/>
      {/* Legs — shuffling zombie stance */}
      <rect x="18" y="68" width="9" height="22" rx="2" fill="#3a5c2a"/>
      <rect x="30" y="68" width="9" height="18" rx="2" fill="#3a5c2a"/>
      {/* Torn shoes */}
      <rect x="15" y="86" width="13" height="6" rx="2" fill="#2a1a0a"/>
      <rect x="29" y="82" width="12" height="6" rx="2" fill="#2a1a0a"/>
      {/* Body — hunched */}
      <rect x="16" y="40" width="28" height="30" rx="4" fill="#5c7a3a"/>
      {/* Torn shirt patches */}
      <rect x="20" y="44" width="8" height="6" rx="1" fill="#4a6a2a" opacity="0.7"/>
      <rect x="30" y="50" width="10" height="4" rx="1" fill="#4a6a2a" opacity="0.7"/>
      {/* Arms outstretched — zombie reach */}
      <rect x="0" y="42" width="18" height="7" rx="3" fill="#5c7a3a"/>
      <rect x="42" y="44" width="16" height="7" rx="3" fill="#5c7a3a"/>
      {/* Hands — clawed */}
      <rect x="-2" y="42" width="6" height="8" rx="2" fill="#7a9a4a"/>
      <rect x="52" y="44" width="6" height="8" rx="2" fill="#7a9a4a"/>
      {/* Neck */}
      <rect x="24" y="34" width="12" height="8" rx="2" fill="#7a9a4a"/>
      {/* Head */}
      <rect x="14" y="12" width="32" height="26" rx="6" fill="#8aaa5a"/>
      {/* Torn top of head */}
      <rect x="14" y="12" width="32" height="6" rx="3" fill="#6a8a4a"/>
      {/* Eyes — sunken hollow */}
      <rect x="18" y="20" width="8" height="7" rx="2" fill="#1a0a00"/>
      <rect x="34" y="20" width="8" height="7" rx="2" fill="#1a0a00"/>
      {/* Glowing dead eyes */}
      <rect x="20" y="22" width="4" height="3" rx="1" fill="#ff4400" opacity="0.8"/>
      <rect x="36" y="22" width="4" height="3" rx="1" fill="#ff4400" opacity="0.8"/>
      {/* Nose */}
      <rect x="27" y="28" width="6" height="4" rx="1" fill="#6a8a3a"/>
      {/* Mouth — grimace */}
      <rect x="18" y="34" width="24" height="4" rx="1" fill="#1a0a00"/>
      <rect x="21" y="34" width="4" height="3" rx="1" fill="#cc2200" opacity="0.7"/>
      <rect x="35" y="34" width="4" height="3" rx="1" fill="#cc2200" opacity="0.7"/>
      {/* Wounds/cracks */}
      <line x1="22" y1="16" x2="25" y2="28" stroke="#5a7a3a" strokeWidth="1.5" opacity="0.8"/>
      <line x1="36" y1="14" x2="34" y2="26" stroke="#5a7a3a" strokeWidth="1" opacity="0.7"/>
    </svg>
  );
}

function Skeleton({ size = 80 }) {
  const w = Math.round(size * 0.6);
  return (
    <svg width={w} height={size} viewBox="0 0 60 100" style={{ imageRendering: 'pixelated', overflow: 'visible' }}>
      <ellipse cx="30" cy="97" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>
      {/* Legs — bone segments */}
      <rect x="20" y="72" width="7" height="12" rx="2" fill="#d4c9a8"/>
      <rect x="33" y="72" width="7" height="12" rx="2" fill="#d4c9a8"/>
      <rect x="20" y="60" width="7" height="14" rx="2" fill="#c9bc98"/>
      <rect x="33" y="60" width="7" height="14" rx="2" fill="#c9bc98"/>
      {/* Feet */}
      <ellipse cx="24" cy="85" rx="6" ry="3" fill="#d4c9a8"/>
      <ellipse cx="37" cy="85" rx="6" ry="3" fill="#d4c9a8"/>
      {/* Pelvis */}
      <rect x="17" y="55" width="26" height="8" rx="3" fill="#c9bc98"/>
      <rect x="19" y="57" width="10" height="4" rx="2" fill="#a09070"/>
      <rect x="31" y="57" width="10" height="4" rx="2" fill="#a09070"/>
      {/* Ribcage */}
      <rect x="18" y="32" width="24" height="24" rx="3" fill="#c9bc98"/>
      {/* Ribs */}
      {[36, 40, 44, 48].map((y, i) => (
        <React.Fragment key={i}>
          <rect x="20" y={y} width="8" height="2" rx="1" fill="#a09070"/>
          <rect x="32" y={y} width="8" height="2" rx="1" fill="#a09070"/>
        </React.Fragment>
      ))}
      {/* Spine */}
      <rect x="28" y="32" width="4" height="24" fill="#b0a080"/>
      {/* Arms — bone */}
      <rect x="4" y="34" width="14" height="5" rx="2" fill="#c9bc98"/>
      <rect x="42" y="34" width="14" height="5" rx="2" fill="#c9bc98"/>
      {/* Shoulder joints */}
      <circle cx="18" cy="36" r="4" fill="#d4c9a8"/>
      <circle cx="42" cy="36" r="4" fill="#d4c9a8"/>
      {/* Hand bones */}
      <rect x="2" y="34" width="7" height="7" rx="1" fill="#c9bc98"/>
      <rect x="51" y="34" width="7" height="7" rx="1" fill="#c9bc98"/>
      {/* Neck */}
      <rect x="27" y="26" width="6" height="8" rx="1" fill="#c9bc98"/>
      {/* Skull */}
      <ellipse cx="30" cy="16" rx="13" ry="14" fill="#d4c9a8"/>
      {/* Eye sockets — large and dark */}
      <ellipse cx="22" cy="14" rx="5" ry="6" fill="#0a0a0a"/>
      <ellipse cx="38" cy="14" rx="5" ry="6" fill="#0a0a0a"/>
      {/* Glowing eyes */}
      <ellipse cx="22" cy="14" rx="3" ry="4" fill="#00ff88" opacity="0.7"/>
      <ellipse cx="38" cy="14" rx="3" ry="4" fill="#00ff88" opacity="0.7"/>
      {/* Nose hole */}
      <polygon points="29,20 31,20 30,24" fill="#0a0a0a"/>
      {/* Teeth */}
      <rect x="22" y="24" width="16" height="5" rx="1" fill="#0a0a0a"/>
      {[23,27,31,35].map((x, i) => (
        <rect key={i} x={x} y="24" width="3" height="4" rx="0.5" fill="#d4c9a8"/>
      ))}
    </svg>
  );
}

function Slime({ size = 80 }) {
  const w = Math.round(size * 0.7);
  return (
    <svg width={w} height={size} viewBox="0 0 70 100" style={{ imageRendering: 'pixelated', overflow: 'visible' }}>
      <ellipse cx="35" cy="98" rx="22" ry="4" fill="rgba(0,0,0,0.4)"/>
      {/* Body — blob */}
      <ellipse cx="35" cy="62" rx="28" ry="30" fill="#4aaa22"/>
      {/* Highlights */}
      <ellipse cx="26" cy="46" rx="10" ry="8" fill="#6acc44" opacity="0.6"/>
      <ellipse cx="22" cy="42" rx="4" ry="3" fill="#8aee60" opacity="0.4"/>
      {/* Drips at bottom */}
      <ellipse cx="16" cy="87" rx="5" ry="8" fill="#4aaa22"/>
      <ellipse cx="52" cy="85" rx="4" ry="6" fill="#4aaa22"/>
      <ellipse cx="34" cy="89" rx="6" ry="9" fill="#3a9a12"/>
      {/* Eyes — googly */}
      <circle cx="24" cy="52" r="9" fill="white"/>
      <circle cx="46" cy="52" r="9" fill="white"/>
      <circle cx="26" cy="54" r="5" fill="#0a1a0a"/>
      <circle cx="48" cy="54" r="5" fill="#0a1a0a"/>
      {/* Pupils */}
      <circle cx="28" cy="55" r="2.5" fill="black"/>
      <circle cx="50" cy="55" r="2.5" fill="black"/>
      {/* Eye shine */}
      <circle cx="30" cy="53" r="1.5" fill="white" opacity="0.9"/>
      <circle cx="52" cy="53" r="1.5" fill="white" opacity="0.9"/>
      {/* Mouth */}
      <path d="M22 66 Q35 75 48 66" stroke="#1a4a00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Antenna */}
      <line x1="35" y1="32" x2="35" y2="18" stroke="#3a9a12" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="35" cy="16" r="5" fill="#5aaa22"/>
    </svg>
  );
}

function Goblin({ size = 80 }) {
  const w = Math.round(size * 0.55);
  return (
    <svg width={w} height={size} viewBox="0 0 55 100" style={{ imageRendering: 'pixelated', overflow: 'visible' }}>
      <ellipse cx="27" cy="97" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>
      {/* Legs */}
      <rect x="14" y="70" width="9" height="20" rx="3" fill="#2d6a2a"/>
      <rect x="26" y="70" width="9" height="20" rx="3" fill="#2d6a2a"/>
      <rect x="12" y="86" width="12" height="5" rx="2" fill="#1a2a1a"/>
      <rect x="25" y="86" width="12" height="5" rx="2" fill="#1a2a1a"/>
      {/* Body */}
      <rect x="12" y="44" width="31" height="28" rx="5" fill="#3d8a2a"/>
      {/* Loincloth */}
      <rect x="15" y="64" width="10" height="12" rx="2" fill="#6a4a1a"/>
      <rect x="27" y="64" width="10" height="12" rx="2" fill="#6a4a1a"/>
      {/* Arms — holding weapon */}
      <rect x="0" y="48" width="14" height="7" rx="3" fill="#3d8a2a"/>
      <rect x="41" y="46" width="14" height="7" rx="3" fill="#3d8a2a"/>
      {/* Club weapon */}
      <rect x="42" y="28" width="6" height="24" rx="2" fill="#8a6a2a"/>
      <ellipse cx="45" cy="26" rx="8" ry="7" fill="#6a4a1a"/>
      <rect x="2" y="45" width="5" height="12" rx="2" fill="#5a4a1a"/>
      {/* Neck */}
      <rect x="21" y="38" width="13" height="8" rx="2" fill="#5aaa3a"/>
      {/* Head — big ears, big nose */}
      <ellipse cx="27" cy="26" rx="16" ry="15" fill="#5aaa3a"/>
      {/* Big pointy ears */}
      <polygon points="8,18 14,28 6,32" fill="#5aaa3a"/>
      <polygon points="46,18 40,28 48,32" fill="#5aaa3a"/>
      {/* Eyes — beady */}
      <ellipse cx="20" cy="24" rx="4" ry="4.5" fill="#ff0000"/>
      <ellipse cx="34" cy="24" rx="4" ry="4.5" fill="#ff0000"/>
      <circle cx="21" cy="25" r="2" fill="black"/>
      <circle cx="35" cy="25" r="2" fill="black"/>
      <circle cx="22" cy="24" r="1" fill="white" opacity="0.8"/>
      <circle cx="36" cy="24" r="1" fill="white" opacity="0.8"/>
      {/* Big nose */}
      <ellipse cx="27" cy="30" rx="5" ry="4" fill="#4a9a2a"/>
      <circle cx="25" cy="31" r="1.5" fill="#3a8a1a"/>
      <circle cx="29" cy="31" r="1.5" fill="#3a8a1a"/>
      {/* Mouth — sharp fangs */}
      <rect x="19" y="35" width="16" height="5" rx="1" fill="#1a0a00"/>
      <polygon points="21,35 23,35 22,39" fill="white"/>
      <polygon points="25,35 27,35 26,39" fill="white"/>
      <polygon points="29,35 31,35 30,39" fill="white"/>
      <polygon points="33,35 35,35 34,39" fill="white"/>
    </svg>
  );
}

function VampireBat({ size = 80 }) {
  const w = Math.round(size * 1.2);
  return (
    <svg width={w} height={size} viewBox="0 0 120 100" style={{ imageRendering: 'pixelated', overflow: 'visible' }}>
      <ellipse cx="60" cy="95" rx="10" ry="3" fill="rgba(0,0,0,0.4)"/>
      {/* Left wing */}
      <path d="M60,50 L10,25 L5,55 L20,60 L45,70" fill="#3a1a5a" stroke="#2a0a4a" strokeWidth="1.5"/>
      <path d="M60,50 L10,25" stroke="#6a3a8a" strokeWidth="1" opacity="0.6"/>
      <line x1="60" y1="50" x2="10" y2="38" stroke="#6a3a8a" strokeWidth="0.8" opacity="0.4"/>
      <line x1="60" y1="50" x2="15" y2="52" stroke="#6a3a8a" strokeWidth="0.8" opacity="0.4"/>
      {/* Right wing */}
      <path d="M60,50 L110,25 L115,55 L100,60 L75,70" fill="#3a1a5a" stroke="#2a0a4a" strokeWidth="1.5"/>
      <path d="M60,50 L110,25" stroke="#6a3a8a" strokeWidth="1" opacity="0.6"/>
      <line x1="60" y1="50" x2="110" y2="38" stroke="#6a3a8a" strokeWidth="0.8" opacity="0.4"/>
      <line x1="60" y1="50" x2="105" y2="52" stroke="#6a3a8a" strokeWidth="0.8" opacity="0.4"/>
      {/* Body */}
      <ellipse cx="60" cy="62" rx="14" ry="18" fill="#2a0a3a"/>
      {/* Fur texture */}
      <ellipse cx="60" cy="56" rx="10" ry="10" fill="#3a1a4a"/>
      {/* Head */}
      <ellipse cx="60" cy="42" rx="14" ry="13" fill="#2a0a3a"/>
      {/* Ears */}
      <polygon points="48,34 44,20 54,32" fill="#3a1a4a"/>
      <polygon points="72,34 76,20 66,32" fill="#3a1a4a"/>
      <polygon points="49,34 46,24 53,32" fill="#6a3a6a" opacity="0.6"/>
      <polygon points="71,34 74,24 67,32" fill="#6a3a6a" opacity="0.6"/>
      {/* Eyes */}
      <ellipse cx="52" cy="42" rx="5" ry="5" fill="#ff0044"/>
      <ellipse cx="68" cy="42" rx="5" ry="5" fill="#ff0044"/>
      <circle cx="53" cy="43" r="2.5" fill="#0a0a0a"/>
      <circle cx="69" cy="43" r="2.5" fill="#0a0a0a"/>
      <circle cx="54" cy="42" r="1" fill="white" opacity="0.8"/>
      <circle cx="70" cy="42" r="1" fill="white" opacity="0.8"/>
      {/* Nose */}
      <ellipse cx="60" cy="47" rx="3" ry="2" fill="#3a1a4a"/>
      {/* Fangs */}
      <rect x="54" y="50" width="3" height="6" rx="1" fill="#e0d0c0"/>
      <rect x="63" y="50" width="3" height="6" rx="1" fill="#e0d0c0"/>
    </svg>
  );
}

function DarkMage({ size = 80 }) {
  const w = Math.round(size * 0.55);
  return (
    <svg width={w} height={size} viewBox="0 0 55 100" style={{ imageRendering: 'pixelated', overflow: 'visible' }}>
      <ellipse cx="27" cy="97" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>
      {/* Robe */}
      <path d="M10,50 L8,95 L46,95 L44,50 Z" fill="#1a0a2a"/>
      <path d="M10,50 L18,95 L20,50 Z" fill="#2a1a3a" opacity="0.5"/>
      {/* Belt */}
      <rect x="10" y="60" width="35" height="5" rx="1" fill="#4a2a0a"/>
      {/* Staff in right hand */}
      <rect x="46" y="20" width="4" height="70" rx="2" fill="#4a3a1a"/>
      <circle cx="48" cy="18" r="8" fill="#1a0a2a"/>
      <circle cx="48" cy="18" r="5" fill="#8844cc"/>
      <circle cx="48" cy="18" r="2.5" fill="#cc88ff"/>
      {/* Staff glow */}
      <circle cx="48" cy="18" r="9" fill="#8844cc" opacity="0.25"/>
      {/* Body */}
      <rect x="14" y="40" width="27" height="15" rx="3" fill="#1a0a2a"/>
      {/* Hood/Hat */}
      <polygon points="10,22 27,2 44,22" fill="#0a0014"/>
      <rect x="8" y="20" width="39" height="8" rx="2" fill="#0a0014"/>
      {/* Face — shadowed */}
      <ellipse cx="27" cy="34" rx="12" ry="13" fill="#0a0014"/>
      {/* Glowing eyes */}
      <ellipse cx="21" cy="32" rx="4" ry="4" fill="#aa44ff"/>
      <ellipse cx="33" cy="32" rx="4" ry="4" fill="#aa44ff"/>
      <ellipse cx="21" cy="32" rx="2" ry="2" fill="white"/>
      <ellipse cx="33" cy="32" rx="2" ry="2" fill="white"/>
      {/* Arms in casting pose */}
      <rect x="2" y="50" width="16" height="7" rx="3" fill="#1a0a2a"/>
      <rect x="2" y="46" width="8" height="8" rx="3" fill="#0d0010"/>
      {/* Magic sparkles */}
      <circle cx="4" cy="44" r="2" fill="#aa44ff" opacity="0.8"/>
      <circle cx="0" cy="48" r="1.5" fill="#8844cc" opacity="0.7"/>
      <circle cx="6" cy="40" r="1" fill="#cc88ff" opacity="0.6"/>
    </svg>
  );
}

function Bandit({ size = 80 }) {
  const w = Math.round(size * 0.55);
  return (
    <svg width={w} height={size} viewBox="0 0 55 100" style={{ imageRendering: 'pixelated', overflow: 'visible' }}>
      <ellipse cx="27" cy="97" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>
      {/* Legs */}
      <rect x="14" y="68" width="10" height="22" rx="3" fill="#2a2a3a"/>
      <rect x="28" y="68" width="10" height="22" rx="3" fill="#2a2a3a"/>
      <rect x="12" y="86" width="13" height="5" rx="2" fill="#1a1a1a"/>
      <rect x="27" y="86" width="13" height="5" rx="2" fill="#1a1a1a"/>
      {/* Body */}
      <rect x="12" y="42" width="31" height="28" rx="4" fill="#3a3a4a"/>
      {/* Belts */}
      <rect x="12" y="55" width="31" height="4" rx="1" fill="#5a4a2a"/>
      <rect x="22" y="42" width="4" height="28" fill="#5a4a2a" opacity="0.6"/>
      {/* Arms */}
      <rect x="0" y="44" width="14" height="7" rx="3" fill="#3a3a4a"/>
      <rect x="41" y="42" width="14" height="7" rx="3" fill="#3a3a4a"/>
      {/* Dagger in left hand */}
      <rect x="-2" y="42" width="4" height="14" rx="1" fill="#8a8a9a"/>
      <rect x="-4" y="42" width="8" height="3" fill="#5a5a6a"/>
      {/* Sword in right hand */}
      <rect x="50" y="24" width="5" height="30" rx="1" fill="#8a8a9a"/>
      <rect x="46" y="42" width="13" height="4" fill="#5a5a6a"/>
      {/* Glint */}
      <line x1="51" y1="24" x2="54" y2="28" stroke="white" strokeWidth="1.5" opacity="0.7"/>
      {/* Neck */}
      <rect x="21" y="36" width="13" height="8" rx="2" fill="#8a7060"/>
      {/* Head */}
      <ellipse cx="27" cy="24" rx="14" ry="14" fill="#8a7060"/>
      {/* Bandana */}
      <rect x="13" y="26" width="28" height="8" rx="1" fill="#aa2222"/>
      <rect x="40" y="24" width="8" height="12" rx="2" fill="#aa2222"/>
      {/* Eyes — menacing */}
      <ellipse cx="20" cy="22" rx="4" ry="3.5" fill="#1a0a00"/>
      <ellipse cx="34" cy="22" rx="4" ry="3.5" fill="#1a0a00"/>
      <ellipse cx="20" cy="22" rx="2" ry="2" fill="#cc4400"/>
      <ellipse cx="34" cy="22" rx="2" ry="2" fill="#cc4400"/>
      {/* Scar */}
      <line x1="30" y1="18" x2="36" y2="26" stroke="#6a5040" strokeWidth="1.5"/>
      {/* Smirk */}
      <path d="M18 30 Q27 36 36 30" stroke="#6a5040" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function ForestTroll({ size = 80 }) {
  const w = Math.round(size * 0.7);
  return (
    <svg width={w} height={size} viewBox="0 0 70 100" style={{ imageRendering: 'pixelated', overflow: 'visible' }}>
      <ellipse cx="35" cy="97" rx="20" ry="4" fill="rgba(0,0,0,0.4)"/>
      {/* Legs — thick */}
      <rect x="12" y="66" width="16" height="26" rx="5" fill="#2a5a1a"/>
      <rect x="34" y="66" width="16" height="26" rx="5" fill="#2a5a1a"/>
      <rect x="9" y="87" width="20" height="7" rx="3" fill="#1a3a0a"/>
      <rect x="33" y="87" width="20" height="7" rx="3" fill="#1a3a0a"/>
      {/* Body — massive */}
      <ellipse cx="35" cy="50" rx="22" ry="20" fill="#3a7a1a"/>
      {/* Moss patches */}
      <ellipse cx="22" cy="44" rx="7" ry="5" fill="#4a9a2a" opacity="0.7"/>
      <ellipse cx="46" cy="56" rx="6" ry="4" fill="#4a9a2a" opacity="0.7"/>
      {/* Belly */}
      <ellipse cx="35" cy="56" rx="14" ry="10" fill="#4a8a2a"/>
      {/* Arms — massive hanging */}
      <rect x="-2" y="38" width="18" height="12" rx="6" fill="#3a7a1a"/>
      <rect x="54" y="36" width="18" height="12" rx="6" fill="#3a7a1a"/>
      {/* Club fists */}
      <ellipse cx="5" cy="52" rx="9" ry="8" fill="#2a6a0a"/>
      <ellipse cx="65" cy="50" rx="9" ry="8" fill="#2a6a0a"/>
      {/* Neck */}
      <rect x="24" y="28" width="22" height="12" rx="5" fill="#4a8a2a"/>
      {/* Head — big */}
      <ellipse cx="35" cy="20" rx="20" ry="18" fill="#4a8a2a"/>
      {/* Forehead ridge */}
      <rect x="16" y="10" width="38" height="8" rx="4" fill="#3a7a1a"/>
      {/* Eyes — small beady */}
      <circle cx="24" cy="18" r="5" fill="#1a0a00"/>
      <circle cx="46" cy="18" r="5" fill="#1a0a00"/>
      <circle cx="25" cy="18" r="2.5" fill="#cc4400"/>
      <circle cx="47" cy="18" r="2.5" fill="#cc4400"/>
      {/* Nose — bulbous */}
      <ellipse cx="35" cy="24" rx="6" ry="5" fill="#3a7a1a"/>
      {/* Mouth — wide with tusks */}
      <rect x="20" y="30" width="30" height="6" rx="2" fill="#1a0a00"/>
      <rect x="22" y="30" width="7" height="5" rx="1" fill="#d4c9a8"/>
      <rect x="41" y="30" width="7" height="5" rx="1" fill="#d4c9a8"/>
      {/* Moss on head */}
      <ellipse cx="28" cy="7" rx="6" ry="3" fill="#5aaa3a" opacity="0.8"/>
      <ellipse cx="40" cy="6" rx="5" ry="3" fill="#5aaa3a" opacity="0.7"/>
    </svg>
  );
}

function StoneGolem({ size = 80 }) {
  const w = Math.round(size * 0.65);
  return (
    <svg width={w} height={size} viewBox="0 0 65 100" style={{ imageRendering: 'pixelated', overflow: 'visible' }}>
      <ellipse cx="32" cy="97" rx="18" ry="4" fill="rgba(0,0,0,0.4)"/>
      {/* Legs — stone blocks */}
      <rect x="10" y="68" width="18" height="24" rx="2" fill="#5a5a6a"/>
      <rect x="36" y="68" width="18" height="24" rx="2" fill="#5a5a6a"/>
      <rect x="8" y="62" width="22" height="10" rx="2" fill="#6a6a7a"/>
      <rect x="34" y="62" width="22" height="10" rx="2" fill="#6a6a7a"/>
      {/* Feet */}
      <rect x="6" y="88" width="24" height="6" rx="2" fill="#4a4a5a"/>
      <rect x="33" y="88" width="24" height="6" rx="2" fill="#4a4a5a"/>
      {/* Body — rectangular blocks */}
      <rect x="8" y="36" width="50" height="30" rx="3" fill="#6a6a7a"/>
      {/* Stone segments */}
      <rect x="8" y="50" width="50" height="3" fill="#5a5a6a"/>
      <rect x="26" y="36" width="3" height="30" fill="#5a5a6a"/>
      {/* Glowing chest rune */}
      <rect x="22" y="40" width="22" height="16" rx="2" fill="#1a1a2a"/>
      <ellipse cx="33" cy="48" rx="8" ry="6" fill="#4488ff" opacity="0.6"/>
      <ellipse cx="33" cy="48" rx="4" ry="3" fill="#88aaff" opacity="0.9"/>
      {/* Arms — thick stone */}
      <rect x="-4" y="36" width="16" height="26" rx="3" fill="#5a5a6a"/>
      <rect x="53" y="36" width="16" height="26" rx="3" fill="#5a5a6a"/>
      {/* Fists */}
      <rect x="-6" y="58" width="18" height="12" rx="2" fill="#4a4a5a"/>
      <rect x="53" y="58" width="18" height="12" rx="2" fill="#4a4a5a"/>
      {/* Neck */}
      <rect x="20" y="28" width="26" height="10" rx="2" fill="#5a5a6a"/>
      {/* Head — square */}
      <rect x="12" y="6" width="42" height="28" rx="3" fill="#6a6a7a"/>
      {/* Stone cracks */}
      <line x1="20" y1="6" x2="22" y2="34" stroke="#4a4a5a" strokeWidth="1.5"/>
      <line x1="42" y1="6" x2="38" y2="20" stroke="#4a4a5a" strokeWidth="1"/>
      {/* Eye runes — glowing */}
      <rect x="18" y="14" width="10" height="8" rx="1" fill="#0a0a14"/>
      <rect x="37" y="14" width="10" height="8" rx="1" fill="#0a0a14"/>
      <rect x="19" y="15" width="8" height="6" rx="1" fill="#4488ff" opacity="0.8"/>
      <rect x="38" y="15" width="8" height="6" rx="1" fill="#4488ff" opacity="0.8"/>
      {/* Glow effect */}
      <rect x="18" y="14" width="10" height="8" rx="1" fill="#88aaff" opacity="0.3"/>
      <rect x="37" y="14" width="10" height="8" rx="1" fill="#88aaff" opacity="0.3"/>
    </svg>
  );
}

function FireImp({ size = 80 }) {
  const w = Math.round(size * 0.55);
  return (
    <svg width={w} height={size} viewBox="0 0 55 100" style={{ imageRendering: 'pixelated', overflow: 'visible' }}>
      <ellipse cx="27" cy="97" rx="10" ry="3" fill="rgba(0,0,0,0.4)"/>
      {/* Tail */}
      <path d="M27,75 Q50,70 48,55 Q46,45 40,50" stroke="#cc3300" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <polygon points="38,48 44,52 40,56" fill="#ff4400"/>
      {/* Legs */}
      <rect x="16" y="72" width="8" height="18" rx="3" fill="#aa2200"/>
      <rect x="28" y="72" width="8" height="18" rx="3" fill="#aa2200"/>
      {/* Clawed feet */}
      <rect x="13" y="86" width="12" height="5" rx="2" fill="#880000"/>
      <rect x="26" y="86" width="12" height="5" rx="2" fill="#880000"/>
      <polygon points="13,86 11,90 13,89" fill="#1a0a00"/>
      <polygon points="26,86 24,90 26,89" fill="#1a0a00"/>
      {/* Body */}
      <ellipse cx="27" cy="58" rx="16" ry="16" fill="#cc2200"/>
      {/* Belly */}
      <ellipse cx="27" cy="60" rx="10" ry="11" fill="#ff4400"/>
      {/* Arms — menacing */}
      <rect x="5" y="50" width="13" height="7" rx="3" fill="#aa2200"/>
      <rect x="37" y="48" width="13" height="7" rx="3" fill="#aa2200"/>
      {/* Clawed hands */}
      <rect x="3" y="50" width="7" height="8" rx="2" fill="#880000"/>
      <rect x="45" y="48" width="7" height="8" rx="2" fill="#880000"/>
      {/* Neck */}
      <rect x="21" y="40" width="13" height="10" rx="3" fill="#aa2200"/>
      {/* Head */}
      <ellipse cx="27" cy="28" rx="15" ry="16" fill="#cc2200"/>
      {/* Horns */}
      <polygon points="14,22 10,6 18,20" fill="#880000"/>
      <polygon points="40,22 44,6 36,20" fill="#880000"/>
      <polygon points="14,22 11,10 17,20" fill="#aa3300" opacity="0.6"/>
      <polygon points="40,22 43,10 37,20" fill="#aa3300" opacity="0.6"/>
      {/* Eyes — glowing fire */}
      <ellipse cx="20" cy="26" rx="5" ry="5" fill="#ff8800"/>
      <ellipse cx="34" cy="26" rx="5" ry="5" fill="#ff8800"/>
      <ellipse cx="20" cy="26" rx="3" ry="3" fill="#ffcc00"/>
      <ellipse cx="34" cy="26" rx="3" ry="3" fill="#ffcc00"/>
      <ellipse cx="20" cy="26" rx="1.5" ry="1.5" fill="white"/>
      <ellipse cx="34" cy="26" rx="1.5" ry="1.5" fill="white"/>
      {/* Grin */}
      <path d="M16 34 Q27 42 38 34" stroke="#1a0a00" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <polygon points="18,34 20,34 19,38" fill="white"/>
      <polygon points="25,36 27,36 26,40" fill="white"/>
      <polygon points="34,34 36,34 35,38" fill="white"/>
      {/* Flames on body */}
      <polygon points="15,46 18,36 21,46" fill="#ff6600" opacity="0.7"/>
      <polygon points="33,44 36,34 39,44" fill="#ff6600" opacity="0.7"/>
      <polygon points="24,42 27,32 30,42" fill="#ffaa00" opacity="0.6"/>
    </svg>
  );
}

// ── Lookup ────────────────────────────────────────────────────────────────────
const MOB_COMPONENTS = {
  zombie:      Zombie,
  skeleton:    Skeleton,
  slime:       Slime,
  goblin:      Goblin,
  vampire_bat: VampireBat,
  dark_mage:   DarkMage,
  bandit:      Bandit,
  forest_troll: ForestTroll,
  stone_golem: StoneGolem,
  fire_imp:    FireImp,
};

export default function MobSprite({ mob, size = 80 }) {
  const Comp = MOB_COMPONENTS[mob?.id];
  if (!Comp) {
    // Fallback — generic monster silhouette
    const w = Math.round(size * 0.6);
    return (
      <svg width={w} height={size} viewBox="0 0 60 100" style={{ overflow: 'visible' }}>
        <ellipse cx="30" cy="97" rx="12" ry="3" fill="rgba(0,0,0,0.4)"/>
        <ellipse cx="30" cy="55" rx="18" ry="35" fill="#334155"/>
        <ellipse cx="30" cy="28" rx="14" ry="14" fill="#475569"/>
        <circle cx="22" cy="26" r="4" fill="#ff0000" opacity="0.8"/>
        <circle cx="38" cy="26" r="4" fill="#ff0000" opacity="0.8"/>
      </svg>
    );
  }
  return <Comp size={size}/>;
}
