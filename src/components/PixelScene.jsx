import React from 'react';

// ─── GYM SCENE (TRAIN tab) ────────────────────────────────────────────────────
// Dark industrial gym: concrete wall, power rack, barbell, neon lights
export function GymScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      <svg
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Sky / ceiling fill ── */}
        <rect x="0" y="0" width="390" height="844" fill="#070912" />

        {/* ── Back wall: concrete block pattern ── */}
        {Array.from({ length: 22 }, (_, row) =>
          Array.from({ length: 8 }, (_, col) => {
            const offset = row % 2 === 0 ? 0 : 24;
            const x = col * 48 + offset - 24;
            const y = row * 22;
            const shade = (row + col) % 3 === 0 ? '#0f1222' : (row + col) % 3 === 1 ? '#0c0f1e' : '#0a0d1a';
            return <rect key={`w${row}-${col}`} x={x} y={y} width="47" height="21" fill={shade} />;
          })
        )}
        {/* Mortar lines H */}
        {Array.from({ length: 22 }, (_, i) => (
          <rect key={`mh${i}`} x="0" y={i * 22} width="390" height="1" fill="#060810" />
        ))}

        {/* ── Overhead industrial ceiling beams ── */}
        <rect x="0" y="0" width="390" height="18" fill="#0a0c16" />
        {[0, 130, 260].map((x, i) => (
          <React.Fragment key={`beam${i}`}>
            <rect x={x} y="0" width="10" height="220" fill="#0d1020" />
            <rect x={x + 1} y="0" width="2" height="220" fill="#151828" />
          </React.Fragment>
        ))}

        {/* ── Overhead lamp (left) ── */}
        <rect x="60" y="0" width="60" height="8" fill="#12141e" />
        <rect x="80" y="8" width="20" height="14" fill="#1a1c28" />
        <rect x="84" y="8" width="12" height="5" fill="#22d3ee" opacity="0.9" />
        {/* Light cone left */}
        <polygon points="85,22 160,340 10,340" fill="url(#coneLeft)" opacity="0.07" />

        {/* ── Overhead lamp (right) ── */}
        <rect x="270" y="0" width="60" height="8" fill="#12141e" />
        <rect x="290" y="8" width="20" height="14" fill="#1a1c28" />
        <rect x="294" y="8" width="12" height="5" fill="#22d3ee" opacity="0.9" />
        {/* Light cone right */}
        <polygon points="305,22 380,340 230,340" fill="url(#coneRight)" opacity="0.07" />

        <defs>
          <linearGradient id="coneLeft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="coneRight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="floorFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#060810" stopOpacity="0" />
            <stop offset="100%" stopColor="#060810" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* ── POWER RACK silhouette (left) ── */}
        {/* Main uprights */}
        <rect x="30" y="100" width="10" height="340" fill="#111326" />
        <rect x="90" y="100" width="10" height="340" fill="#111326" />
        {/* Top crossbar */}
        <rect x="28" y="100" width="74" height="8" fill="#151728" />
        {/* Safety bar pegs */}
        {[180, 220, 260, 300].map((y, i) => (
          <React.Fragment key={`peg${i}`}>
            <rect x="28" y={y} width="14" height="6" fill="#181a2e" />
            <rect x="88" y={y} width="14" height="6" fill="#181a2e" />
          </React.Fragment>
        ))}
        {/* Crossmember at mid */}
        <rect x="28" y="220" width="74" height="5" fill="#1a1c30" />
        {/* Base feet */}
        <rect x="18" y="436" width="30" height="8" fill="#141626" />
        <rect x="82" y="436" width="30" height="8" fill="#141626" />
        {/* J-hooks */}
        <rect x="36" y="260" width="18" height="8" fill="#1e2034" />
        <rect x="96" y="260" width="18" height="8" fill="#1e2034" />
        {/* Barbell on rack */}
        <rect x="0" y="263" width="36" height="5" fill="#181a2e" />
        <rect x="54" y="263" width="80" height="5" fill="#181a2e" />
        <rect x="114" y="263" width="30" height="5" fill="#181a2e" />
        {/* Plates on bar */}
        <rect x="3" y="255" width="8" height="21" rx="1" fill="#1c1e32" />
        <rect x="13" y="258" width="6" height="15" rx="1" fill="#1e2036" />

        {/* ── DUMBBELLS floor (center) ── */}
        <rect x="160" y="620" width="70" height="10" fill="#161826" />
        <rect x="158" y="612" width="14" height="18" rx="2" fill="#1a1c2e" />
        <rect x="214" y="612" width="14" height="18" rx="2" fill="#1a1c2e" />
        <rect x="165" y="615" width="10" height="12" rx="1" fill="#1c1e32" />
        <rect x="215" y="615" width="10" height="12" rx="1" fill="#1c1e32" />

        {/* ── WEIGHT PLATES on right wall ── */}
        {[0, 1, 2, 3].map(i => (
          <React.Fragment key={`plate${i}`}>
            <rect x={290 + i * 18} y="380" width="14" height="60" rx="3" fill={`hsl(230, 20%, ${8 + i * 2}%)`} />
            <rect x={292 + i * 18} y="382" width="10" height="56" rx="2" fill={`hsl(230, 20%, ${10 + i * 2}%)`} />
            <rect x={296 + i * 18} y="404" width="2" height="12" fill={`hsl(230, 20%, ${14 + i * 2}%)`} />
          </React.Fragment>
        ))}
        <rect x="288" y="440" width="90" height="6" fill="#161826" />

        {/* ── NEON SIGN "IRON GYM" ── */}
        <rect x="140" y="48" width="110" height="28" rx="2" fill="#0a0c16" />
        <rect x="142" y="50" width="106" height="24" rx="1" fill="#080a14" />
        {/* Neon text pixels - simplified "GYM" */}
        {/* G */}
        {[[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[1,4],[2,0],[2,2],[2,3],[2,4],[3,4],[4,4],[4,3],[4,2],[4,0],[4,1]].map(([c2,r],i) => (
          <rect key={`gG${i}`} x={148 + c2 * 4} y={56 + r * 4} width="3" height="3" fill="#22d3ee" opacity="0.9" />
        ))}
        {/* Y */}
        {[[0,0],[4,0],[1,1],[3,1],[2,2],[2,3],[2,4]].map(([c2,r],i) => (
          <rect key={`gY${i}`} x={168 + c2 * 4} y={56 + r * 4} width="3" height="3" fill="#22d3ee" opacity="0.9" />
        ))}
        {/* M */}
        {[[0,0],[0,1],[0,2],[0,3],[0,4],[1,1],[2,2],[3,1],[4,0],[4,1],[4,2],[4,3],[4,4]].map(([c2,r],i) => (
          <rect key={`gM${i}`} x={188 + c2 * 4} y={56 + r * 4} width="3" height="3" fill="#22d3ee" opacity="0.9" />
        ))}
        {/* Neon glow behind sign */}
        <rect x="140" y="48" width="110" height="28" rx="2" fill="#22d3ee" opacity="0.03" />

        {/* ── FLOOR PLATFORM ── */}
        <rect x="0" y="640" width="390" height="4" fill="#1a1c2e" />
        {/* Floor tiles */}
        {Array.from({ length: 8 }, (_, col) => (
          <React.Fragment key={`ft${col}`}>
            <rect x={col * 50} y="644" width="49" height="200" fill={col % 2 === 0 ? '#0c0e1c' : '#0a0c18'} />
            {/* Tile highlight */}
            <rect x={col * 50} y="644" width="49" height="1" fill="#151728" opacity="0.5" />
          </React.Fragment>
        ))}
        {/* Floor vertical lines */}
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={`fv${i}`} x={i * 50} y="640" width="1" height="200" fill="#060810" />
        ))}
        {/* Floor horizontal lines every 50px */}
        {[690, 740].map((y, i) => (
          <rect key={`fh${i}`} x="0" y={y} width="390" height="1" fill="#060810" />
        ))}

        {/* ── POWERLIFTING PLATFORM CENTER ── */}
        <rect x="120" y="640" width="150" height="4" fill="#1e2034" />
        <rect x="120" y="644" width="150" height="200" fill="#0e1020" />
        {/* Platform lines */}
        <rect x="165" y="644" width="2" height="200" fill="#141626" />
        <rect x="223" y="644" width="2" height="200" fill="#141626" />
        {/* Platform warning stripes */}
        {Array.from({ length: 6 }, (_, i) => (
          <rect key={`ws${i}`} x={120 + i * 26} y="644" width="13" height="8"
            fill={i % 2 === 0 ? '#1a1400' : '#120e00'} />
        ))}

        {/* ── Floor gradient fade bottom ── */}
        <rect x="0" y="700" width="390" height="144" fill="url(#floorFade)" />

        {/* ── Ambient glow center ── */}
        <ellipse cx="195" cy="350" rx="120" ry="200" fill="#22d3ee" opacity="0.015" />
      </svg>
    </div>
  );
}

// ─── SANCTUM SCENE (HERO tab) ─────────────────────────────────────────────────
// Cosmic hero's sanctum: starfield, glowing platform, stone pillars
export function SanctumScene() {
  // Deterministic star positions
  const stars = Array.from({ length: 80 }, (_, i) => ({
    x: ((i * 137 + 47) % 390),
    y: ((i * 89  + 13) % 700),
    r: i % 7 === 0 ? 2 : i % 3 === 0 ? 1.5 : 1,
    op: 0.3 + (i % 5) * 0.14,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      <svg
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <radialGradient id="cosmicBg" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#0d0620" />
            <stop offset="60%" stopColor="#070410" />
            <stop offset="100%" stopColor="#030208" />
          </radialGradient>
          <radialGradient id="platformGlow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="runeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pillarGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#100820" />
            <stop offset="40%" stopColor="#180e30" />
            <stop offset="100%" stopColor="#0c0618" />
          </linearGradient>
          <linearGradient id="platformShine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width="390" height="844" fill="url(#cosmicBg)" />

        {/* Nebula wisps */}
        <ellipse cx="80"  cy="200" rx="140" ry="80"  fill="#3b0764" opacity="0.07" />
        <ellipse cx="310" cy="120" rx="120" ry="60"  fill="#1e1b4b" opacity="0.08" />
        <ellipse cx="195" cy="400" rx="180" ry="100" fill="#2e1065" opacity="0.06" />

        {/* Stars */}
        {stars.map((s, i) => (
          <rect key={i} x={s.x} y={s.y} width={s.r} height={s.r} fill="white" opacity={s.op} />
        ))}
        {/* Bright accent stars */}
        {[{x:60,y:80},{x:320,y:50},{x:180,y:140},{x:340,y:220},{x:45,y:320}].map((s,i)=>(
          <React.Fragment key={`bs${i}`}>
            <rect x={s.x-1} y={s.y} width="2" height="8" fill="white" opacity="0.4" />
            <rect x={s.x-3} y={s.y+3} width="8" height="2" fill="white" opacity="0.4" />
            <rect x={s.x} y={s.y+3} width="2" height="2" fill="white" opacity="0.9" />
          </React.Fragment>
        ))}

        {/* ── LEFT PILLAR ── */}
        <rect x="0" y="220" width="52" height="520" fill="url(#pillarGrad)" />
        {/* Pillar capital */}
        <rect x="-4" y="216" width="60" height="10" fill="#1a0e2e" />
        <rect x="-4" y="220" width="60" height="5"  fill="#220f3a" />
        {/* Pillar detail lines */}
        {[0,1,2,3].map(i=>(
          <rect key={i} x={4+i*10} y="226" width="6" height="510" fill="#130a22" />
        ))}
        {/* Pillar rune glyph */}
        <rect x="16" y="400" width="20" height="30" fill="#1a0e2e" opacity="0.8" />
        <rect x="24" y="392" width="4" height="46" fill="#2d1060" opacity="0.7" />
        <rect x="16" y="413" width="20" height="4"  fill="#2d1060" opacity="0.7" />
        {/* Pillar base */}
        <rect x="-4" y="730" width="60" height="16" fill="#1a0e2e" />

        {/* ── RIGHT PILLAR ── */}
        <rect x="338" y="220" width="52" height="520" fill="url(#pillarGrad)" />
        <rect x="334" y="216" width="60" height="10" fill="#1a0e2e" />
        <rect x="334" y="220" width="60" height="5"  fill="#220f3a" />
        {[0,1,2,3].map(i=>(
          <rect key={i} x={342+i*10} y="226" width="6" height="510" fill="#130a22" />
        ))}
        <rect x="354" y="400" width="20" height="30" fill="#1a0e2e" opacity="0.8" />
        <rect x="362" y="392" width="4" height="46" fill="#2d1060" opacity="0.7" />
        <rect x="354" y="413" width="20" height="4"  fill="#2d1060" opacity="0.7" />
        <rect x="334" y="730" width="60" height="16" fill="#1a0e2e" />

        {/* ── FLOATING ORBS ── */}
        {[
          {x:80,  y:300, r:6, op:0.7},
          {x:310, y:280, r:5, op:0.6},
          {x:155, y:180, r:4, op:0.5},
          {x:240, y:210, r:4, op:0.5},
          {x:70,  y:450, r:3, op:0.4},
          {x:320, y:420, r:3, op:0.4},
        ].map((o,i)=>(
          <React.Fragment key={`orb${i}`}>
            <circle cx={o.x} cy={o.y} r={o.r*3} fill="#a855f7" opacity={o.op*0.15} />
            <rect x={o.x-o.r} y={o.y-o.r} width={o.r*2} height={o.r*2} fill="#c084fc" opacity={o.op} />
          </React.Fragment>
        ))}

        {/* ── RUNE CIRCLE on floor ── */}
        {/* Outer ring */}
        <circle cx="195" cy="660" r="88" fill="none" stroke="#4c1d95" strokeWidth="2" opacity="0.4" />
        <circle cx="195" cy="660" r="80" fill="none" stroke="#7c3aed" strokeWidth="1" opacity="0.3" />
        {/* Rune cross */}
        <rect x="193" y="572" width="4" height="176" fill="#4c1d95" opacity="0.2" />
        <rect x="107" y="658" width="176" height="4" fill="#4c1d95" opacity="0.2" />
        {/* Diagonal rune lines */}
        <line x1="133" y1="598" x2="257" y2="722" stroke="#4c1d95" strokeWidth="1.5" opacity="0.15" />
        <line x1="257" y1="598" x2="133" y2="722" stroke="#4c1d95" strokeWidth="1.5" opacity="0.15" />
        {/* Rune node dots */}
        {[0,45,90,135,180,225,270,315].map((deg,i)=>{
          const rad = (deg * Math.PI) / 180;
          const x = 195 + 80 * Math.cos(rad);
          const y = 660 + 80 * Math.sin(rad);
          return <rect key={i} x={x-3} y={y-3} width="6" height="6" fill="#7c3aed" opacity="0.5" />;
        })}
        {/* Rune glow */}
        <circle cx="195" cy="660" r="88" fill="url(#runeGlow)" opacity="0.15" />

        {/* ── HERO PLATFORM ── */}
        {/* Platform base shadow */}
        <ellipse cx="195" cy="660" rx="90" ry="20" fill="#000" opacity="0.5" />
        {/* Platform layers */}
        {[{y:608,w:140,h:14,c:'#1a0e30'},{y:622,w:160,h:10,c:'#200e38'},{y:632,w:180,h:10,c:'#26103e'},{y:642,w:160,h:10,c:'#1e0c36'}].map((l,i)=>(
          <React.Fragment key={`pl${i}`}>
            <rect x={195-l.w/2} y={l.y} width={l.w} height={l.h} rx="2" fill={l.c} />
            <rect x={195-l.w/2+2} y={l.y+1} width={l.w-4} height="3" fill="rgba(255,255,255,0.04)" rx="1" />
          </React.Fragment>
        ))}
        {/* Platform glow top */}
        <rect x={195-70} y="606" width="140" height="4" fill="#a855f7" opacity="0.35" rx="1" />
        <rect x={195-80} y="620" width="160" height="2" fill="#7c3aed" opacity="0.2" rx="1" />
        {/* Platform shine */}
        <rect x={195-70} y="608" width="140" height="14" fill="url(#platformShine)" rx="1" />
        {/* Platform bottom glow */}
        <ellipse cx="195" cy="652" rx="85" ry="14" fill="url(#platformGlow)" opacity="0.5" />

        {/* ── ARCH at top ── */}
        {/* Left arch leg */}
        <rect x="80" y="0"   width="24" height="180" fill="#120a20" />
        <rect x="76" y="174" width="32" height="10"  fill="#1a0e30" />
        {/* Right arch leg */}
        <rect x="286" y="0"  width="24" height="180" fill="#120a20" />
        <rect x="282" y="174" width="32" height="10" fill="#1a0e30" />
        {/* Arch crown */}
        <path d="M80 180 Q195 80 310 180" fill="none" stroke="#1a0e30" strokeWidth="24" />
        <path d="M80 180 Q195 80 310 180" fill="none" stroke="#220f3a" strokeWidth="4" />
        {/* Arch rune glow */}
        <path d="M80 180 Q195 80 310 180" fill="none" stroke="#7c3aed" strokeWidth="1" opacity="0.4" />

        {/* ── Overall ambient purple glow from platform ── */}
        <ellipse cx="195" cy="620" rx="140" ry="200" fill="#a855f7" opacity="0.04" />
      </svg>
    </div>
  );
}

// ─── DUNGEON SCENE (BOSS tab) ─────────────────────────────────────────────────
// Dark dungeon: stone walls, torches, ominous gate, skull motifs
export function DungeonScene() {
  // Stone block wall
  const wallBlocks = [];
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 9; col++) {
      const offset = row % 2 === 0 ? 0 : 22;
      const x = col * 44 + offset - 22;
      const y = row * 32;
      const shade = (row * 3 + col) % 4 === 0 ? '#100608' :
                    (row * 3 + col) % 4 === 1 ? '#0e0507' :
                    (row * 3 + col) % 4 === 2 ? '#130708' : '#0c0405';
      wallBlocks.push({ x, y, shade, row, col });
    }
  }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      <svg
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <radialGradient id="torchGlowL" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="torchGlowR" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gateGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="mistGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="floorDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c0405" />
            <stop offset="100%" stopColor="#080204" />
          </linearGradient>
        </defs>

        {/* Base fill */}
        <rect x="0" y="0" width="390" height="844" fill="#080204" />

        {/* Stone wall blocks */}
        {wallBlocks.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width="43" height="31" fill={b.shade} />
        ))}
        {/* Mortar lines H */}
        {Array.from({ length: 20 }, (_, i) => (
          <rect key={`mh${i}`} x="0" y={i * 32} width="390" height="1" fill="#050203" />
        ))}

        {/* ── Torch left ── */}
        {/* Torch bracket */}
        <rect x="42" y="200" width="20" height="5" fill="#1c0c0e" />
        <rect x="52" y="195" width="6" height="14" fill="#1c0c0e" />
        {/* Torch body */}
        <rect x="50" y="205" width="10" height="28" rx="2" fill="#2d1a0a" />
        {/* Flame */}
        <rect x="52" y="196" width="6" height="12" rx="2" fill="#f59e0b" opacity="0.9" />
        <rect x="53" y="193" width="4" height="8"  rx="2" fill="#fcd34d" opacity="0.8" />
        <rect x="54" y="190" width="2" height="6"  rx="1" fill="#fef3c7" opacity="0.7" />
        {/* Torch light cone */}
        <ellipse cx="55" cy="200" rx="55" ry="55" fill="url(#torchGlowL)" opacity="0.8" />

        {/* ── Torch right ── */}
        <rect x="328" y="200" width="20" height="5" fill="#1c0c0e" />
        <rect x="332" y="195" width="6" height="14" fill="#1c0c0e" />
        <rect x="330" y="205" width="10" height="28" rx="2" fill="#2d1a0a" />
        <rect x="332" y="196" width="6" height="12" rx="2" fill="#f59e0b" opacity="0.9" />
        <rect x="333" y="193" width="4" height="8"  rx="2" fill="#fcd34d" opacity="0.8" />
        <rect x="334" y="190" width="2" height="6"  rx="1" fill="#fef3c7" opacity="0.7" />
        <ellipse cx="335" cy="200" rx="55" ry="55" fill="url(#torchGlowR)" opacity="0.8" />

        {/* ── DUNGEON ARCH / GATE ── */}
        {/* Left column */}
        <rect x="80"  y="0" width="36" height="320" fill="#100608" />
        <rect x="76"  y="0" width="8"  height="320" fill="#150809" />
        <rect x="112" y="0" width="8"  height="320" fill="#0e0507" />
        {/* Right column */}
        <rect x="274" y="0" width="36" height="320" fill="#100608" />
        <rect x="270" y="0" width="8"  height="320" fill="#0e0507" />
        <rect x="306" y="0" width="8"  height="320" fill="#150809" />
        {/* Arch curve */}
        <path d="M80 320 Q195 100 310 320" fill="#100608" />
        <path d="M80 320 Q195 100 310 320" fill="none" stroke="#1a0a0b" strokeWidth="12" />
        {/* Arch highlight */}
        <path d="M88 316 Q195 112 302 316" fill="none" stroke="#1e0c0d" strokeWidth="3" opacity="0.7" />
        {/* Iron gate bars */}
        {[130, 155, 180, 205, 230, 255].map((x, i) => (
          <rect key={`bar${i}`} x={x} y="100" width="7" height="220" fill="#0c0405" />
        ))}
        {/* Gate horizontal crossbars */}
        {[180, 240, 300].map((y, i) => (
          <rect key={`cross${i}`} x="128" y={y} width="134" height="5" fill="#0e0506" />
        ))}
        {/* Gate crown spikes */}
        {[130, 155, 180, 205, 230, 255].map((x, i) => (
          <React.Fragment key={`spike${i}`}>
            <rect x={x+1} y="92" width="5" height="14" rx="1" fill="#140608" />
            <rect x={x+2} y="88" width="3" height="8"  rx="1" fill="#1a0809" />
          </React.Fragment>
        ))}

        {/* ── SKULL MOTIF above arch ── */}
        <rect x="175" y="20" width="40" height="34" rx="8" fill="#1a080a" />
        <rect x="177" y="22" width="36" height="30" rx="7" fill="#200a0c" />
        {/* Eye sockets */}
        <rect x="180" y="26" width="10" height="10" rx="3" fill="#050203" />
        <rect x="200" y="26" width="10" height="10" rx="3" fill="#050203" />
        {/* Nose cavity */}
        <rect x="192" y="36" width="6"  height="6"  rx="1" fill="#080304" />
        {/* Teeth */}
        {[180,185,190,195,200,205].map((x,i)=>(
          <rect key={i} x={x} y="49" width="4" height="6" fill="#050203" />
        ))}
        {/* Skull glow */}
        <rect x="175" y="20" width="40" height="34" rx="8" fill="#dc2626" opacity="0.06" />

        {/* ── Crack in wall (center, ominous) ── */}
        <path d="M195 320 L188 380 L193 420 L185 480 L192 540" stroke="#050203" strokeWidth="3" fill="none" />
        <path d="M195 320 L188 380 L193 420 L185 480 L192 540" stroke="#dc2626" strokeWidth="1" fill="none" opacity="0.4" />
        {/* Crack glow */}
        <ellipse cx="189" cy="430" rx="10" ry="80" fill="#dc2626" opacity="0.06" />

        {/* ── FLOOR ── */}
        {/* Stone floor tiles */}
        {Array.from({ length: 9 }, (_, col) => (
          Array.from({ length: 4 }, (_, row) => (
            <rect key={`f${col}-${row}`}
              x={col * 44} y={620 + row * 56}
              width="43" height="55"
              fill={(col + row) % 2 === 0 ? '#0e0507' : '#0b0405'}
            />
          ))
        ))}
        {/* Floor mortar H */}
        {[620, 676, 732, 788].map((y, i) => (
          <rect key={`fm${i}`} x="0" y={y} width="390" height="1" fill="#040102" />
        ))}
        {/* Floor mortar V */}
        {Array.from({ length: 10 }, (_, i) => (
          <rect key={`fmv${i}`} x={i * 44} y="620" width="1" height="224" fill="#040102" />
        ))}

        {/* ── Red mist rising ── */}
        <rect x="0" y="580" width="390" height="264" fill="url(#mistGrad)" opacity="0.5" />
        <ellipse cx="195" cy="700" rx="200" ry="60" fill="#7f1d1d" opacity="0.08" />

        {/* ── Gate red glow ── */}
        <ellipse cx="195" cy="200" rx="100" ry="130" fill="url(#gateGlow)" opacity="0.3" />

        {/* ── Overall dark vignette ── */}
        <rect x="0" y="0" width="60" height="844" fill="rgba(0,0,0,0.3)" />
        <rect x="330" y="0" width="60" height="844" fill="rgba(0,0,0,0.3)" />
      </svg>
    </div>
  );
}

// ─── ARCHIVE SCENE (HISTORY/LOG tab) ─────────────────────────────────────────
// Stone hall of records: warm candle light, stone walls, scroll cases
export function ArchiveScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      <svg
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <radialGradient id="candleL" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="candleR" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="archiveFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f0c08" />
            <stop offset="100%" stopColor="#0a0806" />
          </linearGradient>
        </defs>

        {/* Warm dark fill */}
        <rect x="0" y="0" width="390" height="844" fill="#0a0805" />

        {/* ── Stone wall blocks (warm tone) ── */}
        {Array.from({ length: 18 }, (_, row) =>
          Array.from({ length: 9 }, (_, col) => {
            const offset = row % 2 === 0 ? 0 : 22;
            const x = col * 44 + offset - 22;
            const y = row * 28;
            const shade = (row + col) % 3 === 0 ? '#140f08' : (row + col) % 3 === 1 ? '#110c07' : '#0e0a05';
            return <rect key={`w${row}-${col}`} x={x} y={y} width="43" height="27" fill={shade} />;
          })
        )}
        {Array.from({ length: 18 }, (_, i) => (
          <rect key={`mh${i}`} x="0" y={i * 28} width="390" height="1" fill="#060402" />
        ))}

        {/* ── Left candle bracket ── */}
        <rect x="30" y="160" width="20" height="4" fill="#1c1208" />
        <rect x="38" y="156" width="6" height="24" rx="1" fill="#2d1e0a" />
        <rect x="36" y="174" width="10" height="20" rx="2" fill="#3d2a0e" />
        {/* Candle flame */}
        <rect x="39" y="166" width="4" height="10" rx="2" fill="#f59e0b" opacity="0.9" />
        <rect x="40" y="162" width="2" height="7"  rx="1" fill="#fcd34d" opacity="0.8" />
        {/* Candle drip */}
        <rect x="37" y="192" width="2" height="5" rx="1" fill="#e8d5a0" opacity="0.4" />
        <rect x="41" y="190" width="2" height="7" rx="1" fill="#e8d5a0" opacity="0.3" />
        {/* Light */}
        <ellipse cx="41" cy="170" rx="70" ry="70" fill="url(#candleL)" opacity="0.7" />

        {/* ── Right candle bracket ── */}
        <rect x="340" y="160" width="20" height="4" fill="#1c1208" />
        <rect x="346" y="156" width="6" height="24" rx="1" fill="#2d1e0a" />
        <rect x="344" y="174" width="10" height="20" rx="2" fill="#3d2a0e" />
        <rect x="347" y="166" width="4" height="10" rx="2" fill="#f59e0b" opacity="0.9" />
        <rect x="348" y="162" width="2" height="7"  rx="1" fill="#fcd34d" opacity="0.8" />
        <rect x="345" y="192" width="2" height="5" rx="1" fill="#e8d5a0" opacity="0.4" />
        <rect x="349" y="190" width="2" height="7" rx="1" fill="#e8d5a0" opacity="0.3" />
        <ellipse cx="349" cy="170" rx="70" ry="70" fill="url(#candleR)" opacity="0.7" />

        {/* ── HALL ARCH at top ── */}
        <rect x="70"  y="0" width="30" height="280" fill="#130f07" />
        <rect x="290" y="0" width="30" height="280" fill="#130f07" />
        <path d="M70 280 Q195 100 320 280" fill="#130f07" />
        <path d="M70 280 Q195 100 320 280" fill="none" stroke="#1c1509" strokeWidth="8" />
        <path d="M78 276 Q195 112 312 276" fill="none" stroke="#24190c" strokeWidth="2" opacity="0.6" />

        {/* ── SCROLL CASES on left wall ── */}
        {[250, 320, 390, 460].map((y, i) => (
          <React.Fragment key={`scroll${i}`}>
            <rect x="0" y={y} width="65" height="50" rx="2" fill="#1a1409" />
            <rect x="2" y={y+2} width="61" height="46" rx="1" fill="#221c0c" />
            {/* Scroll */}
            <rect x="8" y={y+8} width="48" height="34" rx="1" fill="#2d2410" />
            <rect x="8" y={y+8} width="48" height="5" rx="1" fill="#3d3018" />
            <rect x="8" y={y+37} width="48" height="5" rx="1" fill="#3d3018" />
            {/* Text lines on scroll */}
            {[0,1,2].map(l => (
              <rect key={l} x="12" y={y+16+l*6} width={28+l*4} height="2" fill="#4a3c1c" opacity="0.8" />
            ))}
            {/* Gold clasp */}
            <rect x="28" y={y+22} width="8" height="8" rx="2" fill="#78350f" />
            <rect x="30" y={y+24} width="4" height="4" rx="1" fill="#b45309" />
          </React.Fragment>
        ))}

        {/* ── TROPHY SHELF on right wall ── */}
        <rect x="325" y="300" width="65" height="8" fill="#1c1409" />
        {/* Trophy cups */}
        {[0,1].map(i => (
          <React.Fragment key={`trophy${i}`}>
            <rect x={332+i*30} y="260" width="20" height="38" rx="3" fill="#2d1e06" />
            <rect x={330+i*30} y="258" width="24" height="8" rx="2" fill="#3d2a08" />
            <rect x={338+i*30} y="296" width="8" height="6" rx="1" fill="#3d2a08" />
            <rect x={334+i*30} y="300" width="14" height="4" rx="1" fill="#4a3310" />
            {/* Trophy star */}
            <rect x={339+i*30} y="266" width="4" height="4" fill="#b45309" opacity="0.8" />
            {/* Handles */}
            <rect x={326+i*30} y="264" width="6" height="10" rx="2" fill="#2d1e06" />
            <rect x={348+i*30} y="264" width="6" height="10" rx="2" fill="#2d1e06" />
          </React.Fragment>
        ))}
        <rect x="322" y="298" width="68" height="4" fill="#140f07" />

        {/* ── CENTER PILLAR BANNER ── */}
        <rect x="181" y="0" width="28" height="240" fill="#150f07" />
        {/* Banner hanging */}
        <rect x="176" y="100" width="38" height="80" fill="#1e1609" />
        {/* Banner design - crown pixel art */}
        {[[2,1],[3,1],[4,1],[1,2],[2,2],[4,2],[5,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3]].map(([c2,r],i) => (
          <rect key={i} x={178+c2*4} y={115+r*4} width="3" height="3" fill="#78350f" opacity="0.7" />
        ))}
        {/* Shield */}
        <path d="M181 140 L209 140 L209 165 L195 175 L181 165Z" fill="#1a1208" stroke="#2d1e09" strokeWidth="1" />
        <path d="M185 143 L205 143 L205 163 L195 171 L185 163Z" fill="#220f0a" opacity="0.6" />

        {/* ── Stone floor ── */}
        {Array.from({ length: 9 }, (_, col) =>
          Array.from({ length: 5 }, (_, row) => (
            <rect key={`f${col}-${row}`}
              x={col * 44} y={640 + row * 44}
              width="43" height="43"
              fill={(col + row) % 2 === 0 ? '#130f07' : '#100c05'}
            />
          ))
        )}
        {[640, 684, 728, 772, 816].map((y, i) => (
          <rect key={`fmh${i}`} x="0" y={y} width="390" height="1" fill="#060402" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <rect key={`fmv${i}`} x={i * 44} y="640" width="1" height="204" fill="#060402" />
        ))}

        {/* ── Warm atmospheric glow center ── */}
        <ellipse cx="195" cy="300" rx="180" ry="240" fill="#f59e0b" opacity="0.025" />

        {/* ── Vignette ── */}
        <rect x="0" y="0" width="70" height="844" fill="rgba(0,0,0,0.25)" />
        <rect x="320" y="0" width="70" height="844" fill="rgba(0,0,0,0.25)" />
        <rect x="0" y="720" width="390" height="124" fill="rgba(0,0,0,0.3)" />
      </svg>
    </div>
  );
}
