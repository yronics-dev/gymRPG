import React, { useMemo } from 'react';

const CSS = `
@keyframes fb-aurora { 0%{transform:translateX(0) scaleY(1)} 50%{transform:translateX(20px) scaleY(1.1)} 100%{transform:translateX(0) scaleY(1)} }
@keyframes fb-snow   { 0%{transform:translate(0,0);opacity:1} 100%{transform:translate(var(--sx),80px);opacity:0} }
@keyndef fb-glint  { 0%,100%{opacity:0.2} 30%{opacity:1} 70%{opacity:0.6} }
@keyframes fb-glint  { 0%,100%{opacity:0.2} 30%{opacity:1} 70%{opacity:0.6} }
@keyframes fb-crack  { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
`;

function seededRnd(s) { let x=Math.sin(s)*9999; return x-Math.floor(x); }

export default function FrozenBackground({ style = {} }) {
  const snowflakes = useMemo(()=>Array.from({length:20},(_,i)=>({
    x: Math.round(seededRnd(i*11+1)*380/4)*4,
    y: Math.round(seededRnd(i*11+2)*400/4)*4,
    delay: seededRnd(i*11+3)*5,
    sx: (seededRnd(i*11+4)-0.5)*40,
    dur: 2 + seededRnd(i*11+5)*3,
  })),[]);

  const icicles = useMemo(()=>Array.from({length:16},(_,i)=>({
    x: Math.round(seededRnd(i*7+1)*370/4)*4 + 4,
    h: 20 + Math.round(seededRnd(i*7+2)*60/4)*4,
    w: 8  + Math.round(seededRnd(i*7+3)*12/4)*4,
    floor: seededRnd(i*7+4) > 0.6,
  })),[]);

  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', ...style }}>
      <style>{CSS}</style>
      <svg viewBox="0 0 390 700" width="100%" height="100%"
        preserveAspectRatio="xMidYMax slice"
        shapeRendering="crispEdges"
        style={{ position:'absolute', inset:0 }}>
        <defs>
          <pattern id="fb-ice" x="0" y="0" width="24" height="16" patternUnits="userSpaceOnUse">
            <rect width="24" height="16" fill="#0a1e34"/>
            <rect x="1" y="1" width="10" height="6" fill="#0e2840"/>
            <rect x="13" y="1" width="10" height="6" fill="#0c2238"/>
            <rect x="1" y="9" width="22" height="6" fill="#102438"/>
            <rect x="0" y="7" width="24" height="2" fill="#061628"/>
            <rect x="11" y="0" width="2" height="7" fill="#061628"/>
            {/* Ice glint */}
            <rect x="2" y="2" width="2" height="2" fill="#80c0e0" opacity="0.2"/>
            <rect x="14" y="10" width="2" height="2" fill="#80c0e0" opacity="0.2"/>
          </pattern>
          <pattern id="fb-floor" x="0" y="0" width="20" height="12" patternUnits="userSpaceOnUse">
            <rect width="20" height="12" fill="#081828"/>
            <rect x="1" y="1" width="8" height="4" fill="#0c2030"/>
            <rect x="11" y="1" width="8" height="4" fill="#0a1c2c"/>
            <rect x="1" y="7" width="18" height="4" fill="#0c1e30"/>
            <rect x="0" y="5" width="20" height="2" fill="#041020"/>
            {/* Ice shine */}
            <rect x="2" y="2" width="2" height="1" fill="#60a8d0" opacity="0.3"/>
          </pattern>
          <radialGradient id="fb-glow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#2060a0" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#040c18" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="fb-glow2" cx="20%" cy="50%" r="40%">
            <stop offset="0%" stopColor="#008080" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#040c18" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* ── ICY CAVE SKY ── */}
        <rect x="0" y="0"   width="390" height="80"  fill="#020810"/>
        <rect x="0" y="80"  width="390" height="80"  fill="#040c18"/>
        <rect x="0" y="160" width="390" height="80"  fill="#060e1c"/>
        <rect x="0" y="240" width="390" height="80"  fill="#081220"/>
        <rect x="0" y="320" width="390" height="80"  fill="#0a1628"/>
        <rect x="0" y="400" width="390" height="300" fill="#0c1a30"/>

        {/* Glow overlays */}
        <rect x="0" y="0" width="390" height="700" fill="url(#fb-glow)"/>
        <rect x="0" y="0" width="390" height="700" fill="url(#fb-glow2)"/>

        {/* ── AURORA BOREALIS ── */}
        {[
          {x:40,  y:40,  w:120, h:80, c:'#004040', l:'#00a080', d:'0s'},
          {x:120, y:20,  w:100, h:100,c:'#002060', l:'#0060c0', d:'1.5s'},
          {x:200, y:30,  w:140, h:90, c:'#200040', l:'#6000a0', d:'0.8s'},
          {x:160, y:10,  w:80,  h:70, c:'#004020', l:'#00c060', d:'2.2s'},
          {x:280, y:50,  w:110, h:80, c:'#003050', l:'#0080b0', d:'1.2s'},
        ].map((a,i) => (
          <g key={i} style={{ animation:`fb-aurora ${3+i*0.7}s ${a.d} ease-in-out infinite`, opacity:0.5 }}>
            <rect x={a.x} y={a.y} width={a.w} height={a.h} fill={a.c}/>
            <rect x={a.x+8} y={a.y} width={a.w-20} height={Math.floor(a.h*0.6)} fill={a.l} opacity="0.4"/>
            <rect x={a.x+4} y={a.y+4} width={4} height={a.h-8} fill="#ffffff" opacity="0.1"/>
          </g>
        ))}

        {/* ── CAVE WALLS ── */}
        <rect x="0"   y="60" width="70"  height="440" fill="url(#fb-ice)"/>
        <rect x="320" y="60" width="70"  height="440" fill="url(#fb-ice)"/>
        <rect x="0"   y="0"  width="390" height="60"  fill="url(#fb-ice)"/>

        {/* ── FROZEN LAKE / CRACKED ICE WALL ── */}
        <rect x="70" y="100" width="250" height="260" fill="url(#fb-ice)"/>
        {/* Ice cracks */}
        <rect x="130" y="110" width="2" height="100" fill="#80c0e0" opacity="0.3"
          style={{ animation:'fb-crack 4s ease-in-out infinite' }}/>
        <rect x="132" y="160" width="60" height="2"  fill="#80c0e0" opacity="0.3"/>
        <rect x="230" y="130" width="2" height="80"  fill="#80c0e0" opacity="0.25"
          style={{ animation:'fb-crack 5s 1s ease-in-out infinite' }}/>
        <rect x="180" y="200" width="2" height="60"  fill="#80c0e0" opacity="0.2"/>
        <rect x="182" y="230" width="40" height="2"  fill="#80c0e0" opacity="0.2"/>

        {/* ── FROZEN STATUE / MONSTER ── */}
        {/* Frozen creature silhouette in ice wall */}
        <rect x="165" y="120" width="60" height="100" fill="#1a3a5c" opacity="0.7"/>
        <rect x="175" y="115" width="40" height="30"  fill="#1a3a5c" opacity="0.7"/>
        {/* Arms */}
        <rect x="145" y="135" width="24" height="16" fill="#1a3a5c" opacity="0.6"/>
        <rect x="221" y="135" width="24" height="16" fill="#1a3a5c" opacity="0.6"/>
        {/* Ice glint over frozen creature */}
        <rect x="165" y="120" width="60" height="100" fill="#60a0c0" opacity="0.15"/>
        {/* Glowing eyes of creature */}
        <rect x="181" y="128" width="8" height="8" fill="#00e0ff" opacity="0.9"
          style={{ animation:'fb-crack 2s ease-in-out infinite' }}/>
        <rect x="201" y="128" width="8" height="8" fill="#00e0ff" opacity="0.9"
          style={{ animation:'fb-crack 2s 0.5s ease-in-out infinite' }}/>

        {/* ── ICICLES from ceiling ── */}
        {icicles.filter(ic=>!ic.floor).map((ic,i) => (
          <g key={i}>
            <rect x={ic.x}   y={0}        width={ic.w}      height={ic.h}    fill="#1a3a5c"/>
            <rect x={ic.x+2} y={0}        width={ic.w-6}    height={ic.h-4}  fill="#2050a0"/>
            <rect x={ic.x+2} y={4}        width={2}          height={ic.h-8}  fill="#80c0e0" opacity="0.3"/>
            {/* Tip glint */}
            <rect x={ic.x+Math.floor(ic.w/2)-1} y={ic.h-4} width={2} height={4} fill="#b0e0ff"
              style={{ animation:`fb-glint ${2+i*0.5}s ${i*0.3}s ease-in-out infinite` }}/>
          </g>
        ))}

        {/* ── ICE STALAGMITES from floor ── */}
        {icicles.filter(ic=>ic.floor).map((ic,i) => (
          <g key={i}>
            <rect x={ic.x}   y={480-ic.h} width={ic.w}   height={ic.h}   fill="#1a3a5c"/>
            <rect x={ic.x+2} y={480-ic.h+2} width={ic.w-6} height={ic.h-4} fill="#2050a0"/>
            <rect x={ic.x+2} y={480-ic.h+4} width={2} height={Math.floor(ic.h*0.4)} fill="#80c0e0" opacity="0.3"/>
            {/* Tip glint */}
            <rect x={ic.x+Math.floor(ic.w/2)-1} y={480-ic.h} width={2} height={4} fill="#b0e0ff"
              style={{ animation:`fb-glint ${2+i*0.5}s ${i*0.4}s ease-in-out infinite` }}/>
          </g>
        ))}

        {/* ── FLOOR ── */}
        <rect x="0" y="480" width="390" height="220" fill="url(#fb-floor)"/>
        {/* Ice sheen on floor */}
        <rect x="0" y="480" width="390" height="4"   fill="#80c0e0" opacity="0.3"/>
        {/* Floor cracks glowing blue */}
        <rect x="80"  y="492" width="2" height="100" fill="#40a0d0" opacity="0.5"/>
        <rect x="82"  y="540" width="70" height="2"  fill="#40a0d0" opacity="0.4"/>
        <rect x="270" y="500" width="2" height="80"  fill="#40a0d0" opacity="0.4"/>
        <rect x="180" y="520" width="2" height="60"  fill="#40a0d0" opacity="0.3"/>
        {/* Floor reflections */}
        <ellipse cx="195" cy="510" rx="80" ry="8" fill="#60b0d0" opacity="0.1"/>

        {/* ── SNOWFLAKES ── */}
        {snowflakes.map((s,i) => (
          <rect key={i} x={s.x} y={s.y} width="4" height="4"
            fill={i%3===0?'#ffffff':i%3===1?'#a0d0f0':'#c0e8ff'}
            opacity="0.8"
            style={{
              '--sx': `${s.sx}px`,
              animation:`fb-snow ${s.dur}s ${s.delay}s ease-in infinite`,
            }}/>
        ))}

        {/* Cold blue ambient floor glow */}
        <rect x="0" y="460" width="390" height="240" fill="#1060a0" opacity="0.06"/>
      </svg>
    </div>
  );
}
