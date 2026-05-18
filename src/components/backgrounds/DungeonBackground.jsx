import React, { useMemo } from 'react';

const CSS = `
@keyframes db-torch { 0%,100%{transform:scaleY(1) scaleX(1)} 33%{transform:scaleY(1.15) scaleX(0.85)} 66%{transform:scaleY(0.9) scaleX(1.1)} }
@keyframes db-drip  { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(24px);opacity:0} }
@keyframes db-pulse { 0%,100%{opacity:0.3} 50%{opacity:0.8} }
@keyframes db-skull { 0%,100%{opacity:0.6} 50%{opacity:1} }
`;

function seededRnd(s) { let x=Math.sin(s)*9999; return x-Math.floor(x); }

export default function DungeonBackground({ style = {} }) {
  const stalactites = useMemo(() => Array.from({length:14},(_,i)=>({
    x: Math.round(seededRnd(i*13+1)*370/4)*4 + 4,
    h: 24 + Math.round(seededRnd(i*13+2)*60/4)*4,
    w: 8 + Math.round(seededRnd(i*13+3)*16/4)*4,
  })),[]);

  const drips = useMemo(()=>Array.from({length:6},(_,i)=>({
    x: 60 + Math.round(seededRnd(i*17+5)*270/4)*4,
    delay: seededRnd(i*17+6)*3,
    sy: 20 + Math.round(seededRnd(i*17+7)*40),
  })),[]);

  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', ...style }}>
      <style>{CSS}</style>
      <svg viewBox="0 0 390 700" width="100%" height="100%"
        preserveAspectRatio="xMidYMax slice"
        shapeRendering="crispEdges"
        style={{ position:'absolute', inset:0 }}>
        <defs>
          <pattern id="db-brick" x="0" y="0" width="24" height="16" patternUnits="userSpaceOnUse">
            <rect width="24" height="16" fill="#1a1418"/>
            <rect x="1" y="1" width="10" height="6" fill="#242028"/>
            <rect x="13" y="1" width="10" height="6" fill="#201c24"/>
            <rect x="1" y="9" width="22" height="6" fill="#222028"/>
            <rect x="0" y="7" width="24" height="2" fill="#0e0c10"/>
            <rect x="11" y="0" width="2" height="7" fill="#0e0c10"/>
          </pattern>
          <pattern id="db-floor" x="0" y="0" width="20" height="12" patternUnits="userSpaceOnUse">
            <rect width="20" height="12" fill="#161018"/>
            <rect x="1" y="1" width="8" height="4" fill="#1e1820"/>
            <rect x="11" y="1" width="8" height="4" fill="#1c161e"/>
            <rect x="1" y="7" width="18" height="4" fill="#1a1420"/>
            <rect x="0" y="5" width="20" height="2" fill="#0c0a0e"/>
          </pattern>
          {/* Poison glow gradient */}
          <radialGradient id="db-glow1" cx="30%" cy="60%" r="40%">
            <stop offset="0%" stopColor="#3a7c1a" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#0a1a04" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="db-glow2" cx="70%" cy="70%" r="40%">
            <stop offset="0%" stopColor="#5c1c8c" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#0a0414" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* ── CEILING ── */}
        <rect x="0" y="0" width="390" height="700" fill="#0a0810"/>

        {/* Ceiling stone */}
        <rect x="0" y="0" width="390" height="80" fill="#12101a"/>

        {/* Stalactites */}
        {stalactites.map((s,i) => (
          <g key={i}>
            <rect x={s.x} y={0} width={s.w} height={s.h} fill="#1c1828"/>
            <rect x={s.x+2} y={0} width={Math.max(4,s.w-4)} height={s.h-4} fill="#201c2c"/>
            <rect x={s.x+Math.floor(s.w/2)-1} y={s.h-8} width={2} height={8} fill="#151220"/>
            {/* Drip highlight */}
            <rect x={s.x+2} y={2} width={2} height={Math.floor(s.h*0.6)} fill="#28243a" opacity="0.5"/>
          </g>
        ))}

        {/* ── WALLS with bricks ── */}
        <rect x="0"   y="80" width="80"  height="420" fill="url(#db-brick)"/>
        <rect x="310" y="80" width="80"  height="420" fill="url(#db-brick)"/>

        {/* ── BACK WALL ── */}
        <rect x="80" y="80" width="230" height="320" fill="url(#db-brick)"/>

        {/* ── ARCHED DOORWAY (center) ── */}
        <rect x="140" y="100" width="110" height="220" fill="#040208"/>
        {/* Arch bricks */}
        {[0,1,2,3].map(r => (
          <rect key={r} x={140+r*4} y={100+r*4} width={110-r*8} height={16} fill="#14121c" opacity={0.5+r*0.1}/>
        ))}
        {/* Door glow (from beyond) */}
        <rect x="140" y="100" width="110" height="220" fill="#0a0414" opacity="0.9"/>
        <ellipse cx="195" cy="200" rx="30" ry="50" fill="#1e0840" opacity="0.5"
          style={{ animation:'db-pulse 3s ease-in-out infinite' }}/>

        {/* ── CHAINS ── */}
        {[160, 220].map((cx,i) => (
          <g key={i}>
            {Array.from({length:10},(_,j) => (
              <rect key={j} x={cx + (j%2===0?-2:2)} y={80+j*14} width="6" height="10" fill="#2a2030"
                style={{ opacity: 0.7+Math.sin(j)*0.3 }}/>
            ))}
            <rect x={cx-4} y={210} width="14" height="8" fill="#241c30"/>
          </g>
        ))}

        {/* ── SKULL DECORATIONS ── */}
        {[40, 310].map((sx,i) => (
          <g key={i} style={{ animation:`db-skull 4s ${i*1.5}s ease-in-out infinite` }}>
            {/* Skull face */}
            <rect x={sx}    y={180} width={28} height={24} fill="#1e1a28"/>
            <rect x={sx+2}  y={178} width={24} height={26} fill="#241e2e"/>
            {/* Eyes */}
            <rect x={sx+4}  y={185} width={8}  height={8}  fill="#5c1c8c"/>
            <rect x={sx+16} y={185} width={8}  height={8}  fill="#5c1c8c"/>
            {/* Teeth */}
            <rect x={sx+4}  y={198} width={4}  height={6}  fill="#1a1424"/>
            <rect x={sx+10} y={198} width={4}  height={6}  fill="#1a1424"/>
            <rect x={sx+16} y={198} width={4}  height={6}  fill="#1a1424"/>
          </g>
        ))}

        {/* ── TORCHES ── */}
        {[56, 306].map((tx,i) => (
          <g key={i}>
            {/* Bracket */}
            <rect x={tx}    y={220} width={8}  height={16} fill="#2a2030"/>
            <rect x={tx-4}  y={220} width={16} height={4}  fill="#322838"/>
            {/* Flame body */}
            <rect x={tx-2}  y={200} width={12} height={20} fill="#8c2c00"
              style={{ transformOrigin:`${tx+4}px 220px`, animation:`db-torch 0.8s ${i*0.3}s ease-in-out infinite` }}/>
            <rect x={tx}    y={195} width={8}  height={10} fill="#c04000"
              style={{ transformOrigin:`${tx+4}px 205px`, animation:`db-torch 0.6s ${i*0.2}s ease-in-out infinite` }}/>
            <rect x={tx+2}  y={192} width={4}  height={6}  fill="#e87020"
              style={{ transformOrigin:`${tx+4}px 198px`, animation:`db-torch 0.5s ${i*0.15}s ease-in-out infinite` }}/>
            {/* Torch glow on wall */}
            <rect x={tx-12} y={190} width={32} height={50} fill="#6c2000" opacity="0.15"/>
          </g>
        ))}

        {/* ── POISON PUDDLES ── */}
        <ellipse cx="130" cy="470" rx="32" ry="10" fill="#1a4a06" opacity="0.7"
          style={{ animation:'db-pulse 2.5s ease-in-out infinite' }}/>
        <ellipse cx="270" cy="490" rx="24" ry="8" fill="#1a4a06" opacity="0.6"
          style={{ animation:'db-pulse 3.2s 0.8s ease-in-out infinite' }}/>
        <ellipse cx="195" cy="480" rx="16" ry="5" fill="#2a6a0a" opacity="0.5"
          style={{ animation:'db-pulse 2s 0.4s ease-in-out infinite' }}/>

        {/* Poison glow overlays */}
        <rect x="0" y="0" width="390" height="700" fill="url(#db-glow1)"/>
        <rect x="0" y="0" width="390" height="700" fill="url(#db-glow2)"/>

        {/* ── FLOOR ── */}
        <rect x="0" y="500" width="390" height="200" fill="url(#db-floor)"/>
        {/* Floor cracks */}
        <rect x="100" y="510" width="2" height="80" fill="#0a0810" opacity="0.8"/>
        <rect x="102" y="550" width="40" height="2" fill="#0a0810" opacity="0.6"/>
        <rect x="260" y="520" width="2" height="60" fill="#0a0810" opacity="0.7"/>

        {/* ── WATER DRIPS ── */}
        {drips.map((d,i) => (
          <rect key={i} x={d.x} y={d.sy} width="2" height="8" fill="#3a7c1a" opacity="0.8"
            style={{ animation:`db-drip 2.${i}s ${d.delay}s ease-in infinite` }}/>
        ))}

        {/* ── AMBIENT GLOW on floor ── */}
        <rect x="0" y="480" width="390" height="220" fill="#2a0050" opacity="0.12"/>
      </svg>
    </div>
  );
}
