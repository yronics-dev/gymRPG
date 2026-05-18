import React, { useMemo } from 'react';

const CSS = `
@keyframes ab-cloud { 0%{transform:translateX(0)} 100%{transform:translateX(420px)} }
@keyframes ab-crowd { 0%,100%{opacity:0.7} 50%{opacity:1} }
@keyframes ab-dust  { 0%{transform:translateY(0);opacity:0.8} 100%{transform:translateY(-18px);opacity:0} }
@keyframes ab-flag  { 0%,100%{transform:skewX(0deg)} 50%{transform:skewX(6deg)} }
`;

function seededRnd(s) { let x=Math.sin(s)*9999; return x-Math.floor(x); }

export default function ArenaBackground({ style = {} }) {
  const stars = useMemo(() => Array.from({length:18},(_,i)=>({
    x: Math.round(seededRnd(i*7+1)*390/4)*4,
    y: Math.round(seededRnd(i*7+2)*200/4)*4,
    s: seededRnd(i*7+3) > 0.6 ? 4 : 2,
  })),[]);

  const dustParts = useMemo(()=>Array.from({length:8},(_,i)=>({
    x: 40 + Math.round(seededRnd(i*11+5)*310/4)*4,
    delay: seededRnd(i*11+6)*2.5,
  })),[]);

  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', ...style }}>
      <style>{CSS}</style>
      <svg viewBox="0 0 390 700" width="100%" height="100%"
        preserveAspectRatio="xMidYMax slice"
        shapeRendering="crispEdges"
        style={{ position:'absolute', inset:0 }}>
        <defs>
          {/* Sand floor pattern */}
          <pattern id="ab-sand" x="0" y="0" width="16" height="8" patternUnits="userSpaceOnUse">
            <rect width="16" height="8" fill="#c8922a"/>
            <rect x="0" y="0" width="8" height="4" fill="#d4a030"/>
            <rect x="8" y="4" width="8" height="4" fill="#b87c1c"/>
            <rect x="3" y="2" width="2" height="2" fill="#c0851e"/>
            <rect x="11" y="5" width="2" height="1" fill="#e0b040"/>
          </pattern>
          {/* Stone block pattern for walls */}
          <pattern id="ab-stone" x="0" y="0" width="24" height="16" patternUnits="userSpaceOnUse">
            <rect width="24" height="16" fill="#8c7848"/>
            <rect x="1" y="1" width="10" height="6" fill="#a08850"/>
            <rect x="13" y="1" width="10" height="6" fill="#987e44"/>
            <rect x="1" y="9" width="22" height="6" fill="#9c8448"/>
            <rect x="0" y="7" width="24" height="2" fill="#6a5830"/>
            <rect x="11" y="0" width="2" height="7" fill="#6a5830"/>
          </pattern>
          {/* Crowd silhouette pattern */}
          <pattern id="ab-crowd" x="0" y="0" width="20" height="28" patternUnits="userSpaceOnUse">
            <rect width="20" height="28" fill="#5a3a18"/>
            <rect x="2" y="14" width="6" height="14" fill="#3a2008"/>
            <rect x="4" y="10" width="4" height="4" fill="#4a2c10"/>
            <rect x="12" y="16" width="6" height="12" fill="#3a2008"/>
            <rect x="13" y="12" width="4" height="4" fill="#4a2c10"/>
          </pattern>
        </defs>

        {/* ── SKY BANDS ── */}
        <rect x="0" y="0" width="390" height="40"  fill="#1a6fd4"/>
        <rect x="0" y="40" width="390" height="40" fill="#2278d8"/>
        <rect x="0" y="80" width="390" height="40" fill="#2880e0"/>
        <rect x="0" y="120" width="390" height="40" fill="#3088e4"/>
        <rect x="0" y="160" width="390" height="40" fill="#3890e8"/>
        <rect x="0" y="200" width="390" height="40" fill="#4098ec"/>
        <rect x="0" y="240" width="390" height="60" fill="#48a0f0"/>

        {/* Sun */}
        <rect x="296" y="20" width="48" height="48" fill="#ffd832"/>
        <rect x="300" y="24" width="40" height="40" fill="#ffe448"/>
        <rect x="304" y="28" width="32" height="32" fill="#ffed60"/>
        {/* Sun rays (pixel style) */}
        <rect x="316" y="8"  width="8" height="12" fill="#ffd832"/>
        <rect x="316" y="68" width="8" height="12" fill="#ffd832"/>
        <rect x="280" y="36" width="12" height="8" fill="#ffd832"/>
        <rect x="344" y="36" width="12" height="8" fill="#ffd832"/>
        <rect x="292" y="16" width="8" height="8" fill="#ffd832"/>
        <rect x="336" y="16" width="8" height="8" fill="#ffd832"/>
        <rect x="292" y="56" width="8" height="8" fill="#ffd832"/>
        <rect x="336" y="56" width="8" height="8" fill="#ffd832"/>

        {/* ── CLOUDS ── */}
        <g style={{ animation:'ab-cloud 22s linear infinite' }} transform="translate(-420,0)">
          <rect x="10"  y="60" width="60" height="16" fill="#ffffff"/>
          <rect x="6"   y="68" width="68" height="12" fill="#ffffff"/>
          <rect x="18"  y="52" width="36" height="12" fill="#ffffff"/>
          <rect x="14"  y="80" width="52" height="8"  fill="#e8e8e8"/>
        </g>
        <g style={{ animation:'ab-cloud 32s linear 8s infinite' }} transform="translate(-420,0)">
          <rect x="200" y="40" width="48" height="12" fill="#f0f0f0"/>
          <rect x="196" y="48" width="56" height="12" fill="#ffffff"/>
          <rect x="210" y="34" width="28" height="10" fill="#f8f8f8"/>
          <rect x="200" y="60" width="48" height="6"  fill="#e0e0e0"/>
        </g>

        {/* ── COLOSSEUM BACK WALL ── */}
        {/* Upper crowd tier */}
        <rect x="0"   y="180" width="390" height="100" fill="url(#ab-crowd)"
          style={{ animation:'ab-crowd 3s ease-in-out infinite' }}/>
        {/* Dividing wall */}
        <rect x="0"   y="272" width="390" height="16" fill="url(#ab-stone)"/>
        <rect x="0"   y="280" width="390" height="4"  fill="#5c4820"/>

        {/* ── COLOSSEUM ARCHES ── */}
        {[0,78,156,234,312].map((ax,i) => (
          <g key={i}>
            {/* Arch pillar left */}
            <rect x={ax}     y="288" width="20" height="160" fill="url(#ab-stone)"/>
            {/* Arch pillar right */}
            <rect x={ax+58}  y="288" width="20" height="160" fill="url(#ab-stone)"/>
            {/* Arch top block */}
            <rect x={ax}     y="288" width="78" height="20"  fill="#a08850"/>
            {/* Shadow under arch */}
            <rect x={ax+20}  y="308" width="38" height="140" fill="#1a1208" opacity="0.5"/>
            {/* Arch opening (darker inside) */}
            <rect x={ax+20}  y="308" width="38" height="100" fill="#0c0800" opacity="0.7"/>
          </g>
        ))}

        {/* ── LOWER CROWD TIER ── */}
        <rect x="0"   y="436" width="390" height="12" fill="url(#ab-stone)"/>

        {/* ── FLAGS ── */}
        {[20, 100, 180, 260, 340].map((fx, i) => (
          <g key={i}>
            {/* Flagpole */}
            <rect x={fx+28} y="250" width="4" height="38" fill="#5c4820"/>
            {/* Flag */}
            <rect x={fx+32} y="250" width="20" height="14"
              fill={['#c0281c','#d4a030','#1a5c9c','#8c1c7c','#1c7c30'][i]}
              style={{ transformOrigin:`${fx+32}px 250px`, animation:`ab-flag 1.${2+i}s ease-in-out ${i*0.3}s infinite` }}/>
          </g>
        ))}

        {/* ── ARENA FLOOR ── */}
        <rect x="0" y="448" width="390" height="252" fill="url(#ab-sand)"/>

        {/* Floor shadow at base of walls */}
        <rect x="0"   y="448" width="390" height="20" fill="#0000000" opacity="0.4"/>
        <rect x="0"   y="448" width="390" height="8"  fill="#00000040"/>

        {/* Perspective grid lines on arena floor */}
        {[0,1,2,3,4].map(i => (
          <rect key={i} x={0} y={464+i*40} width={390} height={2} fill="#b07820" opacity="0.4"/>
        ))}
        {[0,1,2,3,4,5,6].map(i => (
          <rect key={i} x={i*60+i*2} y={448} width={2} height={252} fill="#b07820" opacity="0.2"/>
        ))}

        {/* Center circle on arena floor */}
        <ellipse cx="195" cy="560" rx="80" ry="20" fill="none" stroke="#d4a030" strokeWidth="4" opacity="0.6"/>
        <ellipse cx="195" cy="560" rx="60" ry="15" fill="none" stroke="#d4a030" strokeWidth="2" opacity="0.4"/>

        {/* ── DUST PARTICLES ── */}
        {dustParts.map((p,i) => (
          <rect key={i} x={p.x} y={530} width="4" height="4" fill="#d4a030" opacity="0.6"
            style={{ animation:`ab-dust 2s ${p.delay}s ease-out infinite` }}/>
        ))}

        {/* ── TORCHES on pillars ── */}
        {[20, 98, 176, 254, 332].map((tx, i) => (
          <g key={i}>
            <rect x={tx+6} y="350" width="8" height="12" fill="#5c3010"/>
            <rect x={tx+4} y="338" width="12" height="16" fill="#f08020"/>
            <rect x={tx+6} y="334" width="8" height="8"  fill="#ffc040"/>
            <rect x={tx+8} y="330" width="4" height="6"  fill="#fff060"/>
          </g>
        ))}
      </svg>
    </div>
  );
}
