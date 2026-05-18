import React, { useMemo } from 'react';

const CSS = `
@keyframes tb-flame { 0%,100%{transform:scaleY(1) scaleX(1)} 33%{transform:scaleY(1.2) scaleX(0.8)} 66%{transform:scaleY(0.85) scaleX(1.15)} }
@keyframes tb-lava  { 0%{transform:translateX(0)} 100%{transform:translateX(-60px)} }
@keyframes tb-ember { 0%{transform:translate(0,0);opacity:1} 100%{transform:translate(var(--ex),var(--ey));opacity:0} }
@keyframes tb-glow  { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
`;

function seededRnd(s) { let x=Math.sin(s)*9999; return x-Math.floor(x); }

export default function TempleBackground({ style = {} }) {
  const embers = useMemo(()=>Array.from({length:12},(_,i)=>({
    x: 80 + Math.round(seededRnd(i*11+1)*230/4)*4,
    y: 360 + Math.round(seededRnd(i*11+2)*80/4)*4,
    delay: seededRnd(i*11+3)*3,
    ex: (seededRnd(i*11+4)-0.5)*60,
    ey: -(20 + seededRnd(i*11+5)*60),
  })),[]);

  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', ...style }}>
      <style>{CSS}</style>
      <svg viewBox="0 0 390 700" width="100%" height="100%"
        preserveAspectRatio="xMidYMax slice"
        shapeRendering="crispEdges"
        style={{ position:'absolute', inset:0 }}>
        <defs>
          <pattern id="tb-stone" x="0" y="0" width="24" height="16" patternUnits="userSpaceOnUse">
            <rect width="24" height="16" fill="#2a1408"/>
            <rect x="1" y="1" width="10" height="6" fill="#3a1c0c"/>
            <rect x="13" y="1" width="10" height="6" fill="#341808"/>
            <rect x="1" y="9" width="22" height="6" fill="#381a0a"/>
            <rect x="0" y="7" width="24" height="2" fill="#1a0c04"/>
            <rect x="11" y="0" width="2" height="7" fill="#1a0c04"/>
          </pattern>
          <pattern id="tb-lava-pat" x="0" y="0" width="60" height="20" patternUnits="userSpaceOnUse">
            <rect width="60" height="20" fill="#8c1c00"/>
            <rect x="0"  y="4"  width="16" height="12" fill="#c43000"/>
            <rect x="20" y="2"  width="12" height="16" fill="#e04800"/>
            <rect x="36" y="6"  width="20" height="10" fill="#b02800"/>
            <rect x="8"  y="0"  width="8"  height="8"  fill="#f06020"/>
            <rect x="44" y="0"  width="12" height="8"  fill="#e85020"/>
            <rect x="0"  y="14" width="60" height="6"  fill="#6c1000"/>
          </pattern>
          <pattern id="tb-floor" x="0" y="0" width="24" height="16" patternUnits="userSpaceOnUse">
            <rect width="24" height="16" fill="#1e0c04"/>
            <rect x="1" y="1" width="10" height="6" fill="#2e1408"/>
            <rect x="13" y="1" width="10" height="6" fill="#28100c"/>
            <rect x="1" y="9" width="22" height="6" fill="#2c120a"/>
            <rect x="0" y="7" width="24" height="2" fill="#140800"/>
            <rect x="11" y="0" width="2" height="7" fill="#140800"/>
          </pattern>
          <radialGradient id="tb-lava-glow" cx="50%" cy="80%" r="50%">
            <stop offset="0%" stopColor="#f06020" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#3c0800" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* ── SKY / CEILING ── dark red/orange cave ceiling */}
        <rect x="0" y="0"   width="390" height="60"  fill="#1a0400"/>
        <rect x="0" y="60"  width="390" height="60"  fill="#200800"/>
        <rect x="0" y="120" width="390" height="60"  fill="#280c00"/>
        <rect x="0" y="180" width="390" height="60"  fill="#2e0e02"/>
        <rect x="0" y="240" width="390" height="60"  fill="#341204"/>
        <rect x="0" y="300" width="390" height="60"  fill="#3c1608"/>

        {/* Lava glow from below */}
        <rect x="0" y="0" width="390" height="700" fill="url(#tb-lava-glow)"/>

        {/* ── TEMPLE BACK WALL ── */}
        <rect x="60" y="60" width="270" height="380" fill="url(#tb-stone)"/>

        {/* ── GIANT CARVING / IDOL ── */}
        {/* Body */}
        <rect x="155" y="80"  width="80" height="140" fill="#3c1c08"/>
        <rect x="163" y="82"  width="64" height="136" fill="#4a2410"/>
        {/* Head */}
        <rect x="163" y="64"  width="64" height="52"  fill="#3c1c08"/>
        <rect x="167" y="66"  width="56" height="48"  fill="#4a2410"/>
        {/* Eyes glow */}
        <rect x="175" y="76"  width="16" height="12" fill="#e84000"
          style={{ animation:'tb-glow 2s ease-in-out infinite' }}/>
        <rect x="199" y="76"  width="16" height="12" fill="#e84000"
          style={{ animation:'tb-glow 2s 0.5s ease-in-out infinite' }}/>
        {/* Crown/horns */}
        <rect x="167" y="52"  width="8"  height="16" fill="#3c1c08"/>
        <rect x="179" y="48"  width="8"  height="16" fill="#3c1c08"/>
        <rect x="203" y="48"  width="8"  height="16" fill="#3c1c08"/>
        <rect x="215" y="52"  width="8"  height="16" fill="#3c1c08"/>
        {/* Runes on body */}
        <rect x="167" y="100" width="8" height="4" fill="#c04000" opacity="0.8"/>
        <rect x="179" y="110" width="8" height="4" fill="#c04000" opacity="0.8"/>
        <rect x="195" y="100" width="8" height="4" fill="#c04000" opacity="0.8"/>
        <rect x="207" y="115" width="8" height="4" fill="#c04000" opacity="0.8"/>
        {/* Arms */}
        <rect x="119" y="100" width="36" height="24" fill="#3c1c08"/>
        <rect x="235" y="100" width="36" height="24" fill="#3c1c08"/>

        {/* ── PILLARS ── */}
        {[0, 1].map(side => {
          const px = side === 0 ? 60 : 290;
          return (
            <g key={side}>
              <rect x={px} y="60" width="40" height="380" fill="url(#tb-stone)"/>
              {/* Pillar highlight */}
              <rect x={px+2} y="60" width="8" height="380" fill="#50281020" opacity="0.3"/>
              {/* Rune carvings on pillar */}
              {[120,180,240,300].map(ry => (
                <g key={ry}>
                  <rect x={px+8}  y={ry}    width="24" height="4" fill="#c04000" opacity="0.5"/>
                  <rect x={px+12} y={ry+6}  width="16" height="4" fill="#c04000" opacity="0.4"/>
                </g>
              ))}
            </g>
          );
        })}

        {/* ── LAVA CHANNELS ── */}
        {/* Left lava channel */}
        <rect x="0" y="360" width="60" height="80" fill="#8c1c00"/>
        <rect x="0" y="360" width="60" height="80"
          fill="url(#tb-lava-pat)"
          style={{ animation:'tb-lava 2s linear infinite' }}/>
        {/* Right lava channel */}
        <rect x="330" y="360" width="60" height="80" fill="#8c1c00"/>
        <rect x="330" y="360" width="60" height="80"
          fill="url(#tb-lava-pat)"
          style={{ animation:'tb-lava 1.5s linear infinite' }}/>
        {/* Lava glow */}
        <rect x="0"   y="350" width="60"  height="20" fill="#f06020" opacity="0.4"/>
        <rect x="330" y="350" width="60"  height="20" fill="#f06020" opacity="0.4"/>

        {/* Center lava pit (in front of idol) */}
        <rect x="100" y="420" width="190" height="60" fill="#6c1000"/>
        <rect x="100" y="420" width="190" height="60"
          fill="url(#tb-lava-pat)"
          style={{ animation:'tb-lava 3s linear infinite' }}/>
        <rect x="100" y="412" width="190" height="12" fill="#f06020" opacity="0.5"
          style={{ animation:'tb-glow 1.5s ease-in-out infinite' }}/>

        {/* ── FIRE BRAZIERS ── */}
        {[80, 270].map((fx,i) => (
          <g key={i}>
            {/* Stand */}
            <rect x={fx+6}  y={340} width={8} height={32} fill="#4a2010"/>
            <rect x={fx}    y={366} width={20} height={8} fill="#5a2814"/>
            {/* Bowl */}
            <rect x={fx-4}  y={328} width={28} height={16} fill="#6a3018"/>
            <rect x={fx-2}  y={330} width={24} height={12} fill="#7a3820"/>
            {/* Flames */}
            <rect x={fx-2}  y={304} width={24} height={28} fill="#c04000"
              style={{ transformOrigin:`${fx+10}px 332px`, animation:`tb-flame 0.7s ${i*0.2}s ease-in-out infinite` }}/>
            <rect x={fx+2}  y={296} width={16} height={14} fill="#e06020"
              style={{ transformOrigin:`${fx+10}px 310px`, animation:`tb-flame 0.5s ${i*0.15}s ease-in-out infinite` }}/>
            <rect x={fx+4}  y={290} width={12} height={10} fill="#f09040"
              style={{ transformOrigin:`${fx+10}px 300px`, animation:`tb-flame 0.4s ${i*0.1}s ease-in-out infinite` }}/>
            <rect x={fx+6}  y={284} width={8}  height={8}  fill="#ffd060"
              style={{ transformOrigin:`${fx+10}px 292px`, animation:`tb-flame 0.35s ease-in-out infinite` }}/>
            {/* Fire glow */}
            <rect x={fx-16} y={290} width={52} height={60} fill="#c04000" opacity="0.15"/>
          </g>
        ))}

        {/* Steps leading up to idol */}
        <rect x="100" y="360" width="190" height="16" fill="url(#tb-stone)"/>
        <rect x="120" y="344" width="150" height="16" fill="url(#tb-stone)"/>
        <rect x="140" y="330" width="110" height="16" fill="#3c1c08"/>

        {/* ── FLOOR ── */}
        <rect x="0" y="480" width="390" height="220" fill="url(#tb-floor)"/>
        {/* Floor cracks with lava glow */}
        <rect x="80"  y="490" width="2"  height="120" fill="#e84000" opacity="0.5"/>
        <rect x="82"  y="550" width="60" height="2"   fill="#e84000" opacity="0.4"/>
        <rect x="280" y="500" width="2"  height="100" fill="#e84000" opacity="0.4"/>
        <rect x="200" y="510" width="2"  height="80"  fill="#e84000" opacity="0.3"/>

        {/* ── EMBERS ── */}
        {embers.map((e,i) => (
          <rect key={i} x={e.x} y={e.y} width="4" height="4"
            fill={i%3===0?'#ff8020':i%3===1?'#ffd060':'#ff4000'}
            style={{
              '--ex': `${e.ex}px`, '--ey': `${e.ey}px`,
              animation:`tb-ember ${1.5+i*0.2}s ${e.delay}s ease-out infinite`,
            }}/>
        ))}
      </svg>
    </div>
  );
}
