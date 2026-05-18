import React, { useMemo } from 'react';

const CSS = `
@keyframes cb-spark  { 0%,100%{opacity:0} 50%{opacity:1} }
@keyframes cb-pulse  { 0%,100%{opacity:0.3} 50%{opacity:1} }
@keyframes cb-arc    { 0%{transform:rotate(0deg);opacity:1} 100%{transform:rotate(360deg);opacity:0} }
@keyframes cb-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
`;

function seededRnd(s) { let x=Math.sin(s)*9999; return x-Math.floor(x); }

export default function CrystalBackground({ style = {} }) {
  const sparks = useMemo(()=>Array.from({length:16},(_,i)=>({
    x: Math.round(seededRnd(i*13+1)*380/4)*4,
    y: Math.round(seededRnd(i*13+2)*500/4)*4 + 60,
    delay: seededRnd(i*13+3)*4,
    dur: 0.3 + seededRnd(i*13+4)*0.8,
  })),[]);

  const crystals = useMemo(()=>Array.from({length:10},(_,i)=>({
    x: Math.round(seededRnd(i*17+1)*360/4)*4 + 8,
    h: 40 + Math.round(seededRnd(i*17+2)*80/4)*4,
    w: 12 + Math.round(seededRnd(i*17+3)*16/4)*4,
    ceil: seededRnd(i*17+4) > 0.5,
  })),[]);

  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', ...style }}>
      <style>{CSS}</style>
      <svg viewBox="0 0 390 700" width="100%" height="100%"
        preserveAspectRatio="xMidYMax slice"
        shapeRendering="crispEdges"
        style={{ position:'absolute', inset:0 }}>
        <defs>
          <pattern id="crb-stone" x="0" y="0" width="24" height="16" patternUnits="userSpaceOnUse">
            <rect width="24" height="16" fill="#0c1428"/>
            <rect x="1" y="1" width="10" height="6" fill="#141c34"/>
            <rect x="13" y="1" width="10" height="6" fill="#101828"/>
            <rect x="1" y="9" width="22" height="6" fill="#121a2e"/>
            <rect x="0" y="7" width="24" height="2" fill="#080e1c"/>
            <rect x="11" y="0" width="2" height="7" fill="#080e1c"/>
          </pattern>
          <pattern id="crb-floor" x="0" y="0" width="20" height="12" patternUnits="userSpaceOnUse">
            <rect width="20" height="12" fill="#0a1020"/>
            <rect x="1" y="1" width="8" height="4" fill="#121830"/>
            <rect x="11" y="1" width="8" height="4" fill="#0e1428"/>
            <rect x="1" y="7" width="18" height="4" fill="#101628"/>
            <rect x="0" y="5" width="20" height="2" fill="#060a14"/>
          </pattern>
          <radialGradient id="crb-glow-c" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4040e0" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#080c2a" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="crb-glow-r" cx="80%" cy="40%" r="40%">
            <stop offset="0%" stopColor="#8020c0" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#080c2a" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* ── DEEP CAVE BACKGROUND ── */}
        <rect x="0" y="0"   width="390" height="100" fill="#04060e"/>
        <rect x="0" y="100" width="390" height="100" fill="#060810"/>
        <rect x="0" y="200" width="390" height="100" fill="#080c14"/>
        <rect x="0" y="300" width="390" height="100" fill="#0a1018"/>
        <rect x="0" y="400" width="390" height="300" fill="#0c1220"/>

        {/* Glow overlays */}
        <rect x="0" y="0" width="390" height="700" fill="url(#crb-glow-c)"/>
        <rect x="0" y="0" width="390" height="700" fill="url(#crb-glow-r)"/>

        {/* ── CEILING & WALLS ── */}
        <rect x="0" y="0" width="390" height="60"  fill="url(#crb-stone)"/>
        <rect x="0" y="0" width="60"  height="480" fill="url(#crb-stone)"/>
        <rect x="330" y="0" width="60" height="480" fill="url(#crb-stone)"/>

        {/* ── CRYSTAL FORMATIONS ── */}
        {crystals.map((c,i) => {
          const baseColor = i%4===0 ? '#3030d0' : i%4===1 ? '#8020c0' : i%4===2 ? '#2080c0' : '#6040e0';
          const litColor  = i%4===0 ? '#6060f0' : i%4===1 ? '#b050e0' : i%4===2 ? '#40a0e0' : '#9070f0';
          const glowColor = i%4===0 ? '#2020a0' : i%4===1 ? '#5010a0' : i%4===2 ? '#1060a0' : '#4030b0';
          if (c.ceil) {
            return (
              <g key={i} style={{ animation:`cb-float ${2+i*0.3}s ${i*0.4}s ease-in-out infinite` }}>
                {/* Diamond shape pointing down from ceiling */}
                <rect x={c.x}            y={0}         width={c.w}      height={c.h}    fill={baseColor}/>
                <rect x={c.x+2}          y={2}         width={c.w-8}    height={c.h-8}  fill={litColor}/>
                <rect x={c.x+Math.floor(c.w/2)-2} y={c.h-8} width={4} height={8}       fill={litColor}/>
                {/* Glow at tip */}
                <rect x={c.x-4} y={c.h-4} width={c.w+8} height={8} fill={glowColor} opacity="0.5"
                  style={{ animation:`cb-pulse 2s ${i*0.3}s ease-in-out infinite` }}/>
              </g>
            );
          }
          return (
            <g key={i} style={{ animation:`cb-float ${2+i*0.3}s ${i*0.4}s ease-in-out infinite` }}>
              {/* Crystal column from floor area */}
              <rect x={c.x}           y={480-c.h}    width={c.w}    height={c.h}    fill={baseColor}/>
              <rect x={c.x+2}         y={480-c.h+2}  width={c.w-8}  height={c.h-8}  fill={litColor}/>
              <rect x={c.x+Math.floor(c.w/2)-2} y={480-c.h} width={4} height={8}    fill={litColor}/>
              {/* Glow at tip */}
              <rect x={c.x-4} y={480-c.h-4} width={c.w+8} height={8} fill={glowColor} opacity="0.5"
                style={{ animation:`cb-pulse 2s ${i*0.3}s ease-in-out infinite` }}/>
            </g>
          );
        })}

        {/* ── CENTRAL CRYSTAL SHRINE ── */}
        <g style={{ animation:'cb-float 3s ease-in-out infinite' }}>
          {/* Main crystal cluster */}
          {[
            {x:175, y:200, w:40, h:200, c:'#3838d8', l:'#6060f8'},
            {x:159, y:240, w:24, h:160, c:'#5020b0', l:'#8050d0'},
            {x:207, y:250, w:20, h:150, c:'#2060c0', l:'#4090e0'},
            {x:163, y:220, w:16, h:60,  c:'#6040d0', l:'#9070f0'},
            {x:207, y:230, w:14, h:50,  c:'#2840c8', l:'#5070e8'},
          ].map((cr,i) => (
            <g key={i}>
              <rect x={cr.x} y={cr.y} width={cr.w} height={cr.h} fill={cr.c}/>
              <rect x={cr.x+2} y={cr.y+2} width={cr.w-8} height={cr.h-4} fill={cr.l}/>
              {/* Crystal face shine */}
              <rect x={cr.x+2} y={cr.y+4} width={4} height={Math.floor(cr.h*0.4)} fill="#a0c0ff" opacity="0.3"/>
            </g>
          ))}
          {/* Glow under shrine */}
          <ellipse cx="195" cy="400" rx="60" ry="15" fill="#3838d8" opacity="0.4"
            style={{ animation:'cb-pulse 2s ease-in-out infinite' }}/>
        </g>

        {/* ── ELECTRIC ARCS ── */}
        {[100,150,240,290].map((ex,i) => (
          <g key={i}>
            {/* Zigzag lightning lines */}
            <rect x={ex}    y={300+i*20} width={2} height={30} fill="#a0c0ff"
              style={{ animation:`cb-spark 0.3s ${i*0.1}s ease-in-out infinite` }}/>
            <rect x={ex+4}  y={310+i*20} width={2} height={20} fill="#8090ff"
              style={{ animation:`cb-spark 0.4s ${i*0.15}s ease-in-out infinite` }}/>
            <rect x={ex+8}  y={300+i*20} width={2} height={28} fill="#c0c0ff"
              style={{ animation:`cb-spark 0.25s ${i*0.08}s ease-in-out infinite` }}/>
          </g>
        ))}

        {/* ── FLOATING CRYSTALS ── */}
        {[70,160,260,330].map((fx,i) => (
          <g key={i} style={{ animation:`cb-float ${1.5+i*0.5}s ${i*0.6}s ease-in-out infinite` }}>
            <rect x={fx}   y={170+i*30} width={12} height={16} fill={['#4040d0','#8030b0','#3070c0','#5040d0'][i]}/>
            <rect x={fx+2} y={172+i*30} width={6}  height={10} fill={['#7070f0','#b060e0','#50a0e0','#8070f0'][i]}/>
            <rect x={fx+4} y={186+i*30} width={2}  height={4}  fill="#c0d0ff" opacity="0.8"/>
          </g>
        ))}

        {/* ── FLOOR ── */}
        <rect x="0" y="480" width="390" height="220" fill="url(#crb-floor)"/>
        {/* Crystal veins in floor */}
        <rect x="60"  y="490" width="2" height="120" fill="#4040d0" opacity="0.6"/>
        <rect x="62"  y="540" width="80" height="2"  fill="#4040d0" opacity="0.5"/>
        <rect x="290" y="500" width="2" height="100" fill="#8030b0" opacity="0.5"/>
        <rect x="160" y="510" width="2" height="90"  fill="#3070c0" opacity="0.4"/>
        <rect x="162" y="560" width="50" height="2"  fill="#3070c0" opacity="0.4"/>

        {/* ── SPARK PARTICLES ── */}
        {sparks.map((s,i) => (
          <rect key={i} x={s.x} y={s.y} width="4" height="4"
            fill={i%3===0?'#a0c0ff':i%3===1?'#c080ff':'#80e0ff'}
            style={{ animation:`cb-spark ${s.dur}s ${s.delay}s ease-in-out infinite` }}/>
        ))}

        {/* Ambient glow on floor */}
        <rect x="0" y="460" width="390" height="240" fill="#2020c0" opacity="0.08"/>
      </svg>
    </div>
  );
}
