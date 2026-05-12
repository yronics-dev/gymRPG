import React from 'react';
import { ELEMENT_THEMES } from '../constants';

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(hash);
}

// Much more detailed boss shapes — 48×64 viewBox
const SHAPES = {
  Fire: (c1, c2, c3) => (
    <>
      {/* Flame aura */}
      <ellipse cx="24" cy="50" rx="18" ry="5" fill={c1} opacity="0.15" />
      {/* Flame wings */}
      <path d="M8 28 Q2 18 8 10 Q12 20 10 28" fill={c2} opacity="0.7" />
      <path d="M40 28 Q46 18 40 10 Q36 20 38 28" fill={c2} opacity="0.7" />
      {/* Inner flames */}
      <path d="M10 26 Q6 19 10 14 Q13 21 11 26" fill={c3} opacity="0.5" />
      <path d="M38 26 Q42 19 38 14 Q35 21 37 26" fill={c3} opacity="0.5" />
      {/* Body */}
      <rect x="12" y="20" width="24" height="28" rx="4" fill={c1} />
      {/* Head */}
      <rect x="14" y="8" width="20" height="16" rx="6" fill={c1} />
      {/* Head highlight */}
      <rect x="16" y="9" width="16" height="5" rx="3" fill="rgba(255,255,255,0.12)" />
      {/* Horns */}
      <rect x="14" y="0" width="5" height="12" rx="2" fill={c3} />
      <rect x="29" y="0" width="5" height="12" rx="2" fill={c3} />
      <rect x="15" y="0" width="3" height="5" fill="rgba(255,255,255,0.3)" />
      <rect x="30" y="0" width="3" height="5" fill="rgba(255,255,255,0.3)" />
      {/* Eyes */}
      <rect x="16" y="12" width="6" height="6" rx="3" fill="#fde047" />
      <rect x="26" y="12" width="6" height="6" rx="3" fill="#fde047" />
      <rect x="17" y="13" width="2" height="2" fill="#000" />
      <rect x="27" y="13" width="2" height="2" fill="#000" />
      {/* Eye glow */}
      <rect x="16" y="12" width="6" height="6" rx="3" fill="#fde047" opacity="0.4" />
      {/* Mouth */}
      <rect x="18" y="20" width="12" height="3" rx="1" fill="#000" opacity="0.5" />
      {[-4,-2,0,2,4].map((dx, i) => (
        <rect key={i} x={24+dx-1} y={20} width="2" height="3" fill={c3} opacity="0.8" />
      ))}
      {/* Chest muscles */}
      <ellipse cx="19" cy="29" rx="5" ry="4" fill="rgba(0,0,0,0.2)" />
      <ellipse cx="29" cy="29" rx="5" ry="4" fill="rgba(0,0,0,0.2)" />
      {/* Arms */}
      <rect x="4" y="22" width="9" height="20" rx="4" fill={c1} />
      <rect x="35" y="22" width="9" height="20" rx="4" fill={c1} />
      {/* Fists */}
      <rect x="3" y="38" width="10" height="8" rx="3" fill={c2} />
      <rect x="35" y="38" width="10" height="8" rx="3" fill={c2} />
      {/* Legs */}
      <rect x="13" y="48" width="9" height="14" rx="3" fill={c2} />
      <rect x="26" y="48" width="9" height="14" rx="3" fill={c2} />
      {/* Feet */}
      <rect x="11" y="58" width="12" height="6" rx="2" fill={c1} />
      <rect x="25" y="58" width="12" height="6" rx="2" fill={c1} />
      {/* Body armor stripe */}
      <rect x="12" y="44" width="24" height="4" rx="2" fill={c3} opacity="0.5" />
    </>
  ),

  Ice: (c1, c2, c3) => (
    <>
      {/* Ice aura */}
      <ellipse cx="24" cy="52" rx="18" ry="4" fill={c1} opacity="0.12" />
      {/* Ice crystal crown */}
      {[-8,-4,0,4,8].map((dx, i) => (
        <rect key={i} x={24+dx-2} y={i%2===0?-2:2} width="4" height={i%2===0?10:8} rx="1" fill={c3} opacity="0.9" />
      ))}
      {/* Crystal shards floating */}
      <rect x="3" y="15" width="5" height="10" rx="1" fill={c2} opacity="0.7" transform="rotate(-20,5,20)" />
      <rect x="40" y="15" width="5" height="10" rx="1" fill={c2} opacity="0.7" transform="rotate(20,43,20)" />
      {/* Body */}
      <rect x="12" y="20" width="24" height="28" rx="3" fill={c1} />
      {/* Ice facets on body */}
      <path d="M12 30 L18 25 L24 30 L18 35Z" fill={c2} opacity="0.4" />
      <path d="M24 30 L30 25 L36 30 L30 35Z" fill={c2} opacity="0.4" />
      {/* Head */}
      <rect x="14" y="8" width="20" height="15" rx="5" fill={c1} />
      {/* Eyes */}
      <rect x="17" y="12" width="5" height="5" rx="2" fill="white" />
      <rect x="26" y="12" width="5" height="5" rx="2" fill="white" />
      <rect x="18" y="13" width="2" height="2" fill={c3} />
      <rect x="27" y="13" width="2" height="2" fill={c3} />
      {/* Arms with crystal shard armor */}
      <rect x="4" y="22" width="9" height="18" rx="3" fill={c1} />
      <rect x="35" y="22" width="9" height="18" rx="3" fill={c1} />
      <rect x="3" y="28" width="6" height="10" rx="1" fill={c2} opacity="0.8" transform="rotate(-10,6,33)" />
      <rect x="39" y="28" width="6" height="10" rx="1" fill={c2} opacity="0.8" transform="rotate(10,42,33)" />
      {/* Fists */}
      <rect x="4" y="37" width="9" height="7" rx="3" fill={c3} />
      <rect x="35" y="37" width="9" height="7" rx="3" fill={c3} />
      {/* Legs */}
      <rect x="13" y="48" width="9" height="14" rx="3" fill={c1} />
      <rect x="26" y="48" width="9" height="14" rx="3" fill={c1} />
      {/* Ice boots */}
      <rect x="11" y="58" width="13" height="6" rx="2" fill={c3} />
      <rect x="24" y="58" width="13" height="6" rx="2" fill={c3} />
      {/* Crystal spikes on boots */}
      <rect x="12" y="55" width="3" height="6" rx="1" fill={c2} opacity="0.8" />
      <rect x="33" y="55" width="3" height="6" rx="1" fill={c2} opacity="0.8" />
    </>
  ),

  Shadow: (c1, c2, c3) => (
    <>
      {/* Shadow mist */}
      <ellipse cx="24" cy="54" rx="20" ry="6" fill={c1} opacity="0.2" />
      <ellipse cx="24" cy="54" rx="14" ry="4" fill={c1} opacity="0.15" />
      {/* Tentacle arms */}
      {[0,1,2].map(i => (
        <rect key={i} x={1+i*2} y={22+i*4} width={10-i*2} height="4" rx="3" fill={c2} opacity={0.5-i*0.1} />
      ))}
      {[0,1,2].map(i => (
        <rect key={i} x={37-i*2} y={22+i*4} width={10-i*2} height="4" rx="3" fill={c2} opacity={0.5-i*0.1} />
      ))}
      {/* Body */}
      <rect x="10" y="20" width="28" height="30" rx="6" fill={c1} />
      {/* Void crack on body */}
      <path d="M24 22 L20 32 L24 30 L21 42" stroke={c3} strokeWidth="2" fill="none" opacity="0.7" />
      {/* Head */}
      <rect x="12" y="8" width="24" height="16" rx="7" fill={c1} />
      {/* Head highlight */}
      <rect x="14" y="9" width="20" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
      {/* Glowing eyes */}
      <rect x="14" y="12" width="7" height="7" rx="3" fill={c3} />
      <rect x="27" y="12" width="7" height="7" rx="3" fill={c3} />
      <rect x="15" y="13" width="5" height="5" rx="2" fill="rgba(255,255,255,0.3)" />
      <rect x="28" y="13" width="5" height="5" rx="2" fill="rgba(255,255,255,0.3)" />
      {/* Eyes inner */}
      <rect x="16" y="14" width="3" height="3" rx="1" fill="#fff" />
      <rect x="29" y="14" width="3" height="3" rx="1" fill="#fff" />
      {/* Mouth - jagged */}
      {[-4,-2,0,2,4].map((dx, i) => (
        <rect key={i} x={24+dx-1} y={i%2===0?21:22} width="2" height={i%2===0?3:2} fill={c3} opacity="0.8" />
      ))}
      {/* Legs */}
      <rect x="12" y="50" width="9" height="14" rx="3" fill={c1} opacity="0.9" />
      <rect x="27" y="50" width="9" height="14" rx="3" fill={c1} opacity="0.9" />
      {/* Shadow wisps from legs */}
      <rect x="10" y="56" width="7" height="3" rx="2" fill={c2} opacity="0.4" />
      <rect x="31" y="56" width="7" height="3" rx="2" fill={c2} opacity="0.4" />
    </>
  ),

  Thunder: (c1, c2, c3) => (
    <>
      {/* Electric aura */}
      <ellipse cx="24" cy="53" rx="20" ry="5" fill={c1} opacity="0.15" />
      {/* Lightning bolts floating */}
      <polygon points="8,8 4,18 8,16 5,28 12,14 8,16 11,8" fill={c3} opacity="0.8" />
      <polygon points="40,10 36,20 40,18 37,30 44,16 40,18 43,10" fill={c3} opacity="0.8" />
      {/* Body */}
      <rect x="11" y="20" width="26" height="28" rx="4" fill={c1} />
      {/* Lightning body markings */}
      <path d="M24 22 L20 30 L25 28 L21 38" stroke={c3} strokeWidth="3" fill="none" strokeLinecap="square" />
      <path d="M20 22 L17 28 L21 27 L18 34" stroke={c3} strokeWidth="2" fill="none" strokeLinecap="square" opacity="0.5" />
      {/* Head */}
      <rect x="13" y="8" width="22" height="15" rx="5" fill={c1} />
      {/* Electric bolt head crest */}
      <polygon points="24,0 20,8 24,6 21,14 28,4 24,6 26,0" fill={c3} />
      {/* Eyes */}
      <rect x="15" y="11" width="6" height="6" rx="2" fill="#1e293b" />
      <rect x="27" y="11" width="6" height="6" rx="2" fill="#1e293b" />
      <rect x="16" y="12" width="3" height="3" fill={c3} opacity="0.9" />
      <rect x="28" y="12" width="3" height="3" fill={c3} opacity="0.9" />
      {/* Electric eye glow */}
      <rect x="15" y="11" width="6" height="6" rx="2" fill={c3} opacity="0.2" />
      <rect x="27" y="11" width="6" height="6" rx="2" fill={c3} opacity="0.2" />
      {/* Arms */}
      <rect x="4" y="22" width="8" height="18" rx="3" fill={c1} />
      <rect x="36" y="22" width="8" height="18" rx="3" fill={c1} />
      {/* Electric gauntlets */}
      <rect x="3" y="37" width="10" height="7" rx="3" fill={c3} opacity="0.8" />
      <rect x="35" y="37" width="10" height="7" rx="3" fill={c3} opacity="0.8" />
      {/* Legs */}
      <rect x="13" y="48" width="9" height="14" rx="3" fill={c1} />
      <rect x="26" y="48" width="9" height="14" rx="3" fill={c1} />
      {/* Boots with charge lines */}
      <rect x="11" y="57" width="13" height="7" rx="2" fill={c2} />
      <rect x="24" y="57" width="13" height="7" rx="2" fill={c2} />
      <path d="M13 57 L14 62 L16 57" stroke={c3} strokeWidth="1.5" fill="none" />
      <path d="M26 57 L27 62 L29 57" stroke={c3} strokeWidth="1.5" fill="none" />
    </>
  ),

  Earth: (c1, c2, c3) => (
    <>
      {/* Ground rumble aura */}
      <ellipse cx="24" cy="56" rx="22" ry="6" fill={c1} opacity="0.2" />
      {/* Rocky protrusions on shoulders */}
      <rect x="2" y="16" width="8" height="14" rx="2" fill={c2} />
      <rect x="38" y="16" width="8" height="14" rx="2" fill={c2} />
      <rect x="0" y="12" width="6" height="8" rx="1" fill={c3} opacity="0.6" />
      <rect x="42" y="12" width="6" height="8" rx="1" fill={c3} opacity="0.6" />
      {/* Massive rocky body */}
      <rect x="8" y="20" width="32" height="32" rx="6" fill={c1} />
      {/* Rock texture */}
      <rect x="10" y="24" width="8" height="6" rx="1" fill={c2} opacity="0.5" />
      <rect x="22" y="26" width="10" height="5" rx="1" fill={c2} opacity="0.4" />
      <rect x="30" y="23" width="6" height="7" rx="1" fill={c2} opacity="0.5" />
      {/* Crack lines */}
      <path d="M20 22 L18 30 M28 24 L30 32 M16 32 L20 40" stroke={c3} strokeWidth="1.5" fill="none" opacity="0.4" />
      {/* Head */}
      <rect x="12" y="8" width="24" height="16" rx="6" fill={c1} />
      {/* Rocky brow ridge */}
      <rect x="10" y="8" width="28" height="5" rx="2" fill={c2} />
      {/* Eyes */}
      <rect x="15" y="12" width="5" height="5" rx="1" fill="#064e3b" />
      <rect x="28" y="12" width="5" height="5" rx="1" fill="#064e3b" />
      <rect x="16" y="13" width="2" height="2" fill={c3} opacity="0.8" />
      <rect x="29" y="13" width="2" height="2" fill={c3} opacity="0.8" />
      {/* Stone fists */}
      <rect x="3" y="38" width="11" height="10" rx="3" fill={c2} />
      <rect x="34" y="38" width="11" height="10" rx="3" fill={c2} />
      {/* Knuckle ridges */}
      {[0,1,2].map(i => (
        <rect key={i} x={4+i*3} y={38} width="2" height="4" rx="0.5" fill={c3} opacity="0.5" />
      ))}
      {[0,1,2].map(i => (
        <rect key={i} x={35+i*3} y={38} width="2" height="4" rx="0.5" fill={c3} opacity="0.5" />
      ))}
      {/* Legs */}
      <rect x="11" y="52" width="11" height="12" rx="3" fill={c2} />
      <rect x="26" y="52" width="11" height="12" rx="3" fill={c2} />
      <rect x="9" y="60" width="15" height="5" rx="2" fill={c1} />
      <rect x="24" y="60" width="15" height="5" rx="2" fill={c1} />
    </>
  ),

  Wind: (c1, c2, c3) => (
    <>
      {/* Wind swirl aura */}
      <ellipse cx="24" cy="53" rx="22" ry="6" fill={c1} opacity="0.12" />
      {/* Wind streaks */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={1+i*2} y={20+i*6} width={14-i*3} height="2" rx="1" fill={c2} opacity={0.4-i*0.05} />
      ))}
      {[0,1,2,3].map(i => (
        <rect key={i} x={33+i} y={20+i*6} width={14-i*3} height="2" rx="1" fill={c2} opacity={0.4-i*0.05} />
      ))}
      {/* Body */}
      <rect x="12" y="20" width="24" height="28" rx="8" fill={c1} />
      {/* Wind pattern on body */}
      <path d="M14 28 Q24 24 34 28 Q24 32 14 28" fill={c2} opacity="0.3" />
      <path d="M14 34 Q24 30 34 34 Q24 38 14 34" fill={c2} opacity="0.25" />
      {/* Head */}
      <rect x="13" y="8" width="22" height="15" rx="8" fill={c1} />
      {/* Wind wisps on head */}
      <rect x="8" y="10" width="7" height="2.5" rx="1.5" fill={c2} opacity="0.5" />
      <rect x="7" y="14" width="5" height="2" rx="1" fill={c2} opacity="0.3" />
      <rect x="33" y="10" width="7" height="2.5" rx="1.5" fill={c2} opacity="0.5" />
      <rect x="36" y="14" width="5" height="2" rx="1" fill={c2} opacity="0.3" />
      {/* Eyes */}
      <rect x="16" y="12" width="5" height="5" rx="2.5" fill="white" opacity="0.9" />
      <rect x="27" y="12" width="5" height="5" rx="2.5" fill="white" opacity="0.9" />
      <rect x="17" y="13" width="3" height="3" rx="1.5" fill={c3} />
      <rect x="28" y="13" width="3" height="3" rx="1.5" fill={c3} />
      {/* Arms - wispy */}
      <rect x="4" y="22" width="9" height="16" rx="6" fill={c1} opacity="0.9" />
      <rect x="35" y="22" width="9" height="16" rx="6" fill={c1} opacity="0.9" />
      {/* Wind trail from arms */}
      <rect x="1" y="24" width="5" height="2" rx="1" fill={c2} opacity="0.4" />
      <rect x="42" y="24" width="5" height="2" rx="1" fill={c2} opacity="0.4" />
      <rect x="0" y="28" width="4" height="1.5" rx="1" fill={c2} opacity="0.25" />
      <rect x="44" y="28" width="4" height="1.5" rx="1" fill={c2} opacity="0.25" />
      {/* Legs */}
      <rect x="13" y="48" width="8" height="14" rx="5" fill={c1} opacity="0.9" />
      <rect x="27" y="48" width="8" height="14" rx="5" fill={c1} opacity="0.9" />
      {/* Wind boots */}
      <rect x="10" y="58" width="14" height="6" rx="3" fill={c2} opacity="0.8" />
      <rect x="24" y="58" width="14" height="6" rx="3" fill={c2} opacity="0.8" />
    </>
  ),
};

export default function BossSprite({ boss, size = 96, isRage = false }) {
  const theme = ELEMENT_THEMES[boss.element] || ELEMENT_THEMES.Fire;
  const ShapeFn = SHAPES[boss.element] || SHAPES.Fire;

  const hash = hashString(boss.name);
  const hue1 = hash % 360;
  const hue2 = (hash * 7) % 360;
  const hue3 = (hash * 13) % 360;
  const color1 = `hsl(${hue1}, 70%, 45%)`;
  const color2 = `hsl(${hue2}, 60%, 38%)`;
  const color3 = `hsl(${hue3}, 85%, 60%)`;

  return (
    <div
      className="flex flex-col items-center gap-1"
      style={{
        filter: isRage
          ? `drop-shadow(0 0 16px ${color1}) drop-shadow(0 0 32px #f87171) brightness(1.3)`
          : `drop-shadow(0 0 10px ${color1}) drop-shadow(0 0 20px ${color1}88)`,
        transition: 'filter 0.3s ease',
      }}
    >
      <svg
        viewBox="0 0 48 68"
        width={size}
        height={size * 1.42}
        className="pixel"
        style={{
          imageRendering: 'pixelated',
          overflow: 'visible',
        }}
      >
        <defs>
          <radialGradient id={`boss-aura-${boss.id}`} cx="50%" cy="75%" r="60%">
            <stop offset="0%" stopColor={color1} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color1} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Aura wash */}
        <ellipse cx="24" cy="50" rx="22" ry="22" fill={`url(#boss-aura-${boss.id})`} />

        {ShapeFn(color1, color2, color3)}

        {/* Rage overlay */}
        {isRage && (
          <>
            <rect x="0" y="0" width="48" height="68" fill="#f87171" opacity="0.08" rx="4" />
            {/* Rage sparks */}
            <circle cx="6" cy="8" r="2" fill="#f87171" opacity="0.8" />
            <circle cx="42" cy="12" r="2" fill="#f87171" opacity="0.8" />
            <circle cx="24" cy="2" r="1.5" fill="#facc15" opacity="0.9" />
          </>
        )}
      </svg>
    </div>
  );
}
