import React from 'react';

/* ════════════════════════════════════════════════════════════════
   CharacterBackground — Sacred Grove  (pixel-art RPG style)

   Coordinate system: 390 × 700 viewBox, all shapes on 4px grid.
   preserveAspectRatio="xMidYMax slice" anchors the BOTTOM of the
   SVG to the container bottom, so the rune at y=545 is always
   exactly 155px from the container bottom edge on any device.
════════════════════════════════════════════════════════════════ */

const KF = `
  @keyframes cbParticle {
    0%   { transform:translateY(0px)  translateX(0px);  opacity:0; }
    12%  { opacity:0.9; }
    88%  { opacity:0.4; }
    100% { transform:translateY(-96px) translateX(12px); opacity:0; }
  }
  @keyframes cbRune {
    0%,100% { opacity:0.35; }
    50%     { opacity:0.9; }
  }
  @keyframes cbTorch {
    0%,100% { opacity:0.82; transform:scaleX(1) scaleY(1); }
    20%     { opacity:1.0;  transform:scaleX(1.2) scaleY(0.9); }
    50%     { opacity:0.7;  transform:scaleX(0.85) scaleY(1.1); }
    75%     { opacity:0.95; transform:scaleX(1.1) scaleY(0.95); }
  }
  @keyframes cbGlow {
    0%,100% { opacity:0.2; }
    50%     { opacity:0.55; }
  }
`;

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  l: 10 + ((i * 23 + 7)  % 80),
  b: 14 + ((i * 17 + 3)  % 20),
  s: 1.5 + (i % 3) * 0.7,
  d: 3.0 + (i % 5) * 0.8,
  delay: (i * 0.45) % 3.8,
  gold: ['#ffd700','#ffe566','#ffb700'][i % 3],
}));

const STARS = Array.from({ length: 60 }, (_, i) => ({
  x: 4   + ((i * 73 + 11) % 382),
  y: 4   + ((i * 41 + 5)  % 200),
  r: 1   + (i % 3),
  o: 0.4 + (i % 5) * 0.1,
}));

export default function CharacterBackground() {
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden' }}>
      <style>{KF}</style>

      <svg
        width="100%" height="100%"
        viewBox="0 0 390 700"
        preserveAspectRatio="xMidYMax slice"
        shapeRendering="crispEdges"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Stone floor tile */}
          <pattern id="cbFloor" x="0" y="0" width="24" height="16" patternUnits="userSpaceOnUse">
            <rect width="24" height="16" fill="#3c2a14"/>
            <rect x="1"  y="1" width="10" height="14" fill="#4a3418"/>
            <rect x="13" y="1" width="10" height="14" fill="#44300e"/>
            <rect x="0"  y="0" width="24" height="1"  fill="#1e1408"/>
            <rect x="0" y="15" width="24" height="1"  fill="#1e1408"/>
            <rect x="12" y="0" width="1"  height="16" fill="#1e1408"/>
          </pattern>
          {/* Column stone brick */}
          <pattern id="cbCol" x="0" y="0" width="20" height="12" patternUnits="userSpaceOnUse">
            <rect width="20" height="12" fill="#3a3024"/>
            <rect x="1" y="1" width="8"  height="10" fill="#44382c"/>
            <rect x="11" y="1" width="8" height="10" fill="#3e3228"/>
            <rect x="0"  y="0" width="20" height="1" fill="#22201a"/>
            <rect x="0" y="11" width="20" height="1" fill="#22201a"/>
            <rect x="10" y="0" width="1" height="12" fill="#22201a"/>
          </pattern>
        </defs>

        {/* ══ LAYER 1 — SKY (banded pixel colours, no gradients) ══ */}
        <rect x="0" y="0"   width="390" height="32"  fill="#060218"/>
        <rect x="0" y="32"  width="390" height="28"  fill="#0c0630"/>
        <rect x="0" y="60"  width="390" height="28"  fill="#140a44"/>
        <rect x="0" y="88"  width="390" height="24"  fill="#1c1058"/>
        <rect x="0" y="112" width="390" height="24"  fill="#24146c"/>
        <rect x="0" y="136" width="390" height="20"  fill="#2e1a80"/>
        <rect x="0" y="156" width="390" height="20"  fill="#3a2288"/>
        <rect x="0" y="176" width="390" height="20"  fill="#462a90"/>
        <rect x="0" y="196" width="390" height="16"  fill="#523290"/>
        <rect x="0" y="212" width="390" height="16"  fill="#5e3a88"/>
        <rect x="0" y="228" width="390" height="12"  fill="#6a4280"/>
        <rect x="0" y="240" width="390" height="12"  fill="#764a78"/>
        <rect x="0" y="252" width="390" height="8"   fill="#82526c"/>
        <rect x="0" y="260" width="390" height="8"   fill="#8c5a58"/>
        <rect x="0" y="268" width="390" height="8"   fill="#986240"/>
        <rect x="0" y="276" width="390" height="8"   fill="#a66c30"/>
        <rect x="0" y="284" width="390" height="4"   fill="#b87828"/>
        <rect x="0" y="288" width="390" height="4"   fill="#cc8820"/>
        <rect x="0" y="292" width="390" height="4"   fill="#de9c18"/>
        <rect x="0" y="296" width="390" height="4"   fill="#eeac14"/>
        <rect x="0" y="300" width="390" height="4"   fill="#f8b810"/>
        {/* Horizon warm glow */}
        <rect x="60"  y="296" width="270" height="4" fill="#ffd040" opacity="0.5"/>
        <rect x="100" y="300" width="190" height="4" fill="#ffe060" opacity="0.3"/>

        {/* Stars */}
        {STARS.map((s,i) => (
          <rect key={i} x={s.x} y={s.y} width={s.r} height={s.r} fill="#ffffff" opacity={s.o}/>
        ))}

        {/* Moon */}
        <rect x="320" y="20" width="24" height="24" fill="#fff8e0" opacity="0.9"/>
        <rect x="316" y="24" width="4"  height="16" fill="#fff8e0" opacity="0.6"/>
        <rect x="344" y="24" width="4"  height="16" fill="#fff8e0" opacity="0.6"/>
        <rect x="320" y="16" width="24" height="4"  fill="#fff8e0" opacity="0.6"/>
        <rect x="320" y="44" width="24" height="4"  fill="#fff8e0" opacity="0.6"/>
        {/* Moon craters */}
        <rect x="326" y="26" width="4" height="4" fill="#e8d878" opacity="0.5"/>
        <rect x="334" y="34" width="4" height="4" fill="#e8d878" opacity="0.4"/>

        {/* ══ LAYER 2 — FAR CASTLE SILHOUETTE ══ */}
        {/* Left tower */}
        <rect x="0"  y="188" width="52" height="116" fill="#1c1450"/>
        <rect x="0"  y="180" width="16" height="8"   fill="#1c1450"/>
        <rect x="20" y="184" width="16" height="4"   fill="#1c1450"/>
        <rect x="40" y="184" width="12" height="4"   fill="#1c1450"/>
        {/* Battlements */}
        {[0,8,16,24,32,40,48].map(x=>(
          <rect key={x} x={x} y="172" width="4" height="8" fill="#1c1450"/>
        ))}
        {/* Tower window */}
        <rect x="12" y="216" width="16" height="24"  fill="#2a1c68"/>
        <rect x="14" y="212" width="12" height="4"   fill="#2a1c68"/>
        <rect x="16" y="208" width="8"  height="4"   fill="#2a1c68"/>
        <rect x="16" y="244" width="4"  height="4"   fill="#ffa020" opacity="0.6"/>

        {/* Right tower */}
        <rect x="338" y="192" width="52" height="112" fill="#1c1450"/>
        <rect x="374" y="184" width="16" height="8"   fill="#1c1450"/>
        <rect x="354" y="188" width="16" height="4"   fill="#1c1450"/>
        <rect x="338" y="188" width="12" height="4"   fill="#1c1450"/>
        {[338,346,354,362,370,378,386].map(x=>(
          <rect key={x} x={x} y="176" width="4" height="8" fill="#1c1450"/>
        ))}
        <rect x="362" y="220" width="16" height="24" fill="#2a1c68"/>
        <rect x="364" y="216" width="12" height="4"  fill="#2a1c68"/>
        <rect x="366" y="212" width="8"  height="4"  fill="#2a1c68"/>
        <rect x="366" y="248" width="4"  height="4"  fill="#ffa020" opacity="0.6"/>

        {/* Connecting wall */}
        <rect x="52"  y="256" width="286" height="48" fill="#1a1248"/>
        {Array.from({length:10},(_,i)=>(
          <rect key={i} x={64+i*26} y="248" width="12" height="8" fill="#1a1248"/>
        ))}
        {/* Wall arched windows */}
        {[88,160,232].map(x=>(
          <g key={x}>
            <rect x={x}   y="264" width="20" height="24" fill="#120e38"/>
            <rect x={x+2} y="260" width="16" height="4"  fill="#120e38"/>
            <rect x={x+4} y="256" width="12" height="4"  fill="#120e38"/>
          </g>
        ))}

        {/* ══ LAYER 3 — FLANKING TREES (left & right) ══ */}
        {/* Left tree */}
        <rect x="56"  y="388" width="16" height="64" fill="#2a1808"/>
        <rect x="60"  y="390" width="8"  height="60" fill="#3a2410"/>
        {/* Pixel tree canopy — stepped pyramid */}
        <rect x="48"  y="364" width="32" height="24" fill="#1e6830"/>
        <rect x="36"  y="340" width="56" height="24" fill="#22783a"/>
        <rect x="24"  y="316" width="80" height="24" fill="#268844"/>
        <rect x="16"  y="292" width="96" height="24" fill="#2a984e"/>
        <rect x="20"  y="268" width="88" height="24" fill="#2ea058"/>
        <rect x="28"  y="244" width="72" height="24" fill="#32a860"/>
        <rect x="36"  y="220" width="56" height="24" fill="#3ab068"/>
        <rect x="44"  y="200" width="40" height="20" fill="#42b870"/>
        {/* Highlight left edge */}
        <rect x="16"  y="292" width="12" height="96" fill="#42c870" opacity="0.4"/>
        <rect x="24"  y="268" width="8"  height="72" fill="#52d878" opacity="0.3"/>
        {/* Dark outline right/bottom */}
        <rect x="108" y="268" width="4"  height="144" fill="#0e2010" opacity="0.7"/>
        <rect x="104" y="384" width="4"  height="24"  fill="#0e2010" opacity="0.5"/>
        {/* Roots */}
        <rect x="48"  y="448" width="12" height="4"  fill="#2a1808"/>
        <rect x="72"  y="452" width="12" height="4"  fill="#2a1808"/>

        {/* Right tree */}
        <rect x="318" y="388" width="16" height="64" fill="#2a1808"/>
        <rect x="322" y="390" width="8"  height="60" fill="#3a2410"/>
        <rect x="310" y="364" width="32" height="24" fill="#1e6830"/>
        <rect x="298" y="340" width="56" height="24" fill="#22783a"/>
        <rect x="286" y="316" width="80" height="24" fill="#268844"/>
        <rect x="278" y="292" width="96" height="24" fill="#2a984e"/>
        <rect x="282" y="268" width="88" height="24" fill="#2ea058"/>
        <rect x="290" y="244" width="72" height="24" fill="#32a860"/>
        <rect x="298" y="220" width="56" height="24" fill="#3ab068"/>
        <rect x="306" y="200" width="40" height="20" fill="#42b870"/>
        <rect x="362" y="292" width="12" height="96" fill="#42c870" opacity="0.4"/>
        <rect x="358" y="268" width="8"  height="72" fill="#52d878" opacity="0.3"/>
        <rect x="278" y="268" width="4"  height="144" fill="#0e2010" opacity="0.7"/>
        <rect x="282" y="384" width="4"  height="24"  fill="#0e2010" opacity="0.5"/>
        <rect x="318" y="448" width="12" height="4"  fill="#2a1808"/>
        <rect x="306" y="452" width="12" height="4"  fill="#2a1808"/>

        {/* ══ LAYER 4 — STONE COLUMNS ══ */}
        {/* ── LEFT COLUMN ── */}
        {/* Base */}
        <rect x="0"  y="500" width="76" height="20" fill="#2c2418"/>
        <rect x="0"  y="500" width="76" height="5"  fill="#48382a"/>
        {/* Shaft */}
        <rect x="4"  y="240" width="68" height="260" fill="url(#cbCol)"/>
        {/* Lit face */}
        <rect x="4"  y="240" width="14" height="260" fill="#5a4a38" opacity="0.55"/>
        {/* Shadow edge */}
        <rect x="62" y="240" width="10" height="260" fill="#141008" opacity="0.6"/>
        {/* Capital top */}
        <rect x="0"  y="224" width="76" height="16" fill="#2e2618"/>
        <rect x="0"  y="224" width="76" height="4"  fill="#483c2a"/>
        <rect x="0"  y="228" width="76" height="4"  fill="#3c301e"/>
        {/* Capital step */}
        <rect x="0"  y="208" width="64" height="16" fill="#26200e"/>
        <rect x="0"  y="208" width="64" height="4"  fill="#3c3018"/>
        {/* Top finial */}
        <rect x="8"  y="196" width="48" height="12" fill="#201c0e"/>
        <rect x="8"  y="196" width="48" height="4"  fill="#342c14"/>
        {/* Carved band decorations */}
        {[280,320,360,400,440].map(y=>(
          <rect key={y} x="4" y={y} width="68" height="3" fill="#4a3c28" opacity="0.8"/>
        ))}
        {/* Torch bracket */}
        <rect x="56" y="316" width="28" height="4"  fill="#5a4830"/>
        <rect x="76" y="304" width="8"  height="12" fill="#483c28"/>
        {/* Torch fire */}
        <g style={{ transformOrigin:'80px 304px', animation:'cbTorch 0.85s ease-in-out infinite' }}>
          <rect x="77" y="284" width="6"  height="8"  fill="#ff8010"/>
          <rect x="75" y="280" width="10" height="4"  fill="#ffa824"/>
          <rect x="77" y="276" width="6"  height="4"  fill="#ffd040"/>
          <rect x="79" y="272" width="2"  height="4"  fill="#fff268"/>
          {/* Glow aura */}
          <rect x="68" y="276" width="24" height="24" fill="#ff9020" opacity="0.1"/>
          <rect x="60" y="280" width="40" height="20" fill="#ff9020" opacity="0.06"/>
        </g>
        {/* Ivy left */}
        <rect x="0"  y="300" width="4"  height="140" fill="#1e4a18" opacity="0.9"/>
        <rect x="4"  y="320" width="4"  height="100" fill="#1e4a18" opacity="0.7"/>
        {[[0,328,10,8],[4,352,10,6],[0,376,12,8],[4,400,10,6],[0,424,12,8],[4,448,10,6]].map(([x,y,w,h],i)=>(
          <rect key={i} x={x} y={y} width={w} height={h} fill="#2e6e22" opacity="0.85"/>
        ))}

        {/* ── RIGHT COLUMN ── */}
        <rect x="314" y="500" width="76" height="20" fill="#2c2418"/>
        <rect x="314" y="500" width="76" height="5"  fill="#48382a"/>
        <rect x="318" y="240" width="68" height="260" fill="url(#cbCol)"/>
        <rect x="318" y="240" width="14" height="260" fill="#5a4a38" opacity="0.55"/>
        <rect x="376" y="240" width="10" height="260" fill="#141008" opacity="0.6"/>
        <rect x="314" y="224" width="76" height="16" fill="#2e2618"/>
        <rect x="314" y="224" width="76" height="4"  fill="#483c2a"/>
        <rect x="314" y="228" width="76" height="4"  fill="#3c301e"/>
        <rect x="326" y="208" width="64" height="16" fill="#26200e"/>
        <rect x="326" y="208" width="64" height="4"  fill="#3c3018"/>
        <rect x="334" y="196" width="48" height="12" fill="#201c0e"/>
        <rect x="334" y="196" width="48" height="4"  fill="#342c14"/>
        {[280,320,360,400,440].map(y=>(
          <rect key={y} x="318" y={y} width="68" height="3" fill="#4a3c28" opacity="0.8"/>
        ))}
        {/* Right torch */}
        <rect x="306" y="316" width="28" height="4" fill="#5a4830"/>
        <rect x="306" y="304" width="8"  height="12" fill="#483c28"/>
        <g style={{ transformOrigin:'310px 304px', animation:'cbTorch 1.1s ease-in-out 0.35s infinite' }}>
          <rect x="307" y="284" width="6"  height="8"  fill="#ff8010"/>
          <rect x="305" y="280" width="10" height="4"  fill="#ffa824"/>
          <rect x="307" y="276" width="6"  height="4"  fill="#ffd040"/>
          <rect x="309" y="272" width="2"  height="4"  fill="#fff268"/>
          <rect x="298" y="276" width="24" height="24" fill="#ff9020" opacity="0.1"/>
          <rect x="290" y="280" width="40" height="20" fill="#ff9020" opacity="0.06"/>
        </g>
        {/* Right ivy */}
        <rect x="386" y="300" width="4"  height="140" fill="#1e4a18" opacity="0.9"/>
        <rect x="382" y="320" width="4"  height="100" fill="#1e4a18" opacity="0.7"/>
        {[[380,328,10,8],[376,352,10,6],[378,376,12,8],[380,400,10,6],[378,424,12,8],[376,448,10,6]].map(([x,y,w,h],i)=>(
          <rect key={i} x={x} y={y} width={w} height={h} fill="#2e6e22" opacity="0.85"/>
        ))}

        {/* ══ LAYER 5 — CENTER SACRED TREE (more contrast) ══ */}
        {/* Trunk */}
        <rect x="183" y="368" width="24" height="72" fill="#2c1c0c"/>
        <rect x="187" y="370" width="16" height="68" fill="#3c2a14"/>
        <rect x="191" y="372" width="6"  height="64" fill="#4a3418" opacity="0.5"/>
        {/* Roots */}
        <rect x="167" y="432" width="16" height="4"  fill="#2c1c0c"/>
        <rect x="207" y="432" width="16" height="4"  fill="#2c1c0c"/>
        <rect x="159" y="436" width="8"  height="4"  fill="#2c1c0c"/>
        <rect x="223" y="436" width="8"  height="4"  fill="#2c1c0c"/>

        {/* Canopy — 9 stepped layers, strongly contrasted greens */}
        {/* Layer 9 — tip */}
        <rect x="187" y="152" width="16" height="16" fill="#5acc70"/>
        {/* Layer 8 */}
        <rect x="175" y="168" width="40" height="20" fill="#44be60"/>
        <rect x="175" y="168" width="8"  height="20" fill="#5cd878" opacity="0.5"/>
        {/* Layer 7 */}
        <rect x="163" y="188" width="64" height="24" fill="#38b054"/>
        <rect x="163" y="188" width="10" height="24" fill="#50c870" opacity="0.45"/>
        {/* Layer 6 */}
        <rect x="151" y="212" width="88" height="24" fill="#2ea04a"/>
        <rect x="151" y="212" width="12" height="24" fill="#44bc66" opacity="0.4"/>
        {/* Layer 5 */}
        <rect x="143" y="236" width="104" height="24" fill="#268e40"/>
        <rect x="143" y="236" width="12" height="24" fill="#3aaa5a" opacity="0.4"/>
        {/* Layer 4 — widest */}
        <rect x="135" y="260" width="120" height="24" fill="#208038"/>
        <rect x="135" y="260" width="12" height="24" fill="#34a052" opacity="0.45"/>
        {/* Dark underside accent */}
        <rect x="135" y="280" width="120" height="4"  fill="#0e3018" opacity="0.6"/>
        {/* Layer 3 */}
        <rect x="143" y="284" width="104" height="24" fill="#1c7030"/>
        <rect x="143" y="284" width="12" height="24" fill="#309050" opacity="0.4"/>
        <rect x="243" y="284" width="4"  height="24" fill="#0a2814" opacity="0.5"/>
        {/* Layer 2 */}
        <rect x="155" y="308" width="80" height="28" fill="#1a6030"/>
        <rect x="155" y="308" width="10" height="28" fill="#2c8048" opacity="0.4"/>
        <rect x="225" y="308" width="4"  height="28" fill="#0a2814" opacity="0.5"/>
        {/* Layer 1 — lower */}
        <rect x="167" y="336" width="56" height="32" fill="#185028"/>
        <rect x="167" y="336" width="8"  height="32" fill="#286e40" opacity="0.4"/>

        {/* Golden light core inside canopy */}
        <rect x="183" y="220" width="24" height="44" fill="#ffd700" opacity="0.07"
          style={{animation:'cbGlow 4s ease-in-out infinite'}}/>
        <rect x="187" y="228" width="16" height="32" fill="#ffe566" opacity="0.1"
          style={{animation:'cbGlow 2.5s ease-in-out 0.8s infinite'}}/>

        {/* ══ LAYER 6 — STONE FLOOR ══ */}
        <rect x="0" y="452" width="390" height="248" fill="url(#cbFloor)"/>
        {/* Darken at column bases */}
        <rect x="0"   y="452" width="76"  height="8" fill="#0e0804" opacity="0.7"/>
        <rect x="314" y="452" width="76"  height="8" fill="#0e0804" opacity="0.7"/>
        {/* Floor edge line */}
        <rect x="0" y="448" width="390" height="4"   fill="#12100a"/>
        {/* Central path — slightly lighter */}
        <rect x="108" y="452" width="174" height="248" fill="#503e28" opacity="0.2"/>
        {/* Floor perspective lines (vanishing point top-center) */}
        {[-4,-3,-2,-1,0,1,2,3,4,5].map(i=>(
          <rect key={i}
            x={Math.max(0, 195 + i*44)} y="452"
            width="2" height="248"
            fill="#ffd700" opacity="0.05"/>
        ))}
        {[0,1,2,3,4,5].map(i=>(
          <rect key={i} x="0" y={460+i*36} width="390" height="2" fill="#ffd700" opacity="0.04"/>
        ))}

        {/* ══ LAYER 7 — RUNE CIRCLE (y=545, always 155px from container bottom) ══ */}
        <g style={{animation:'cbRune 2.8s ease-in-out infinite'}}>
          {/* Glow fill */}
          <ellipse cx="195" cy="545" rx="90" ry="24" fill="#ffd700" opacity="0.08"/>
          {/* Concentric rings */}
          <ellipse cx="195" cy="545" rx="90"  ry="24" fill="none" stroke="#ffd700" strokeWidth="2.5" opacity="0.55"/>
          <ellipse cx="195" cy="545" rx="74"  ry="20" fill="none" stroke="#ffd700" strokeWidth="1.5" opacity="0.45"/>
          <ellipse cx="195" cy="545" rx="58"  ry="16" fill="none" stroke="#ffaa00" strokeWidth="2"   opacity="0.4"/>
          <ellipse cx="195" cy="545" rx="42"  ry="11" fill="none" stroke="#ffd700" strokeWidth="1.5" opacity="0.5"/>
          <ellipse cx="195" cy="545" rx="26"  ry="7"  fill="none" stroke="#ffe566" strokeWidth="1"   opacity="0.6"/>
          <ellipse cx="195" cy="545" rx="12"  ry="3"  fill="#ffd700" opacity="0.25"/>
          {/* Cardinal rune markers (pixel art dots) */}
          {[0,45,90,135,180,225,270,315].map((deg,i)=>{
            const r=deg*Math.PI/180;
            return <rect key={i}
              x={192 + 74*Math.sin(r)} y={543 + 20*Math.cos(r)}
              width="6" height="4" fill="#ffd700" opacity="0.65"/>;
          })}
          {/* Cross lines */}
          <rect x="105" y="544" width="90" height="2" fill="#ffd700" opacity="0.25"/>
          <rect x="193" y="521" width="4"  height="48" fill="#ffd700" opacity="0.25"/>
          {/* Diagonal rune marks */}
          {[[-60,-16],[-40,-10],[40,-10],[60,-16]].map(([dx,dy],i)=>(
            <rect key={i} x={195+dx-6} y={545+dy-1} width="12" height="2" fill="#ffd700" opacity="0.35"/>
          ))}
        </g>

        {/* ══ LAYER 8 — FOREGROUND ══ */}
        {/* Dark rocky bottom edge */}
        <rect x="0"   y="668" width="390" height="32" fill="#080610"/>
        <rect x="0"   y="688" width="390" height="12" fill="#04040c"/>
        {/* Left foreground rocks */}
        <rect x="0"   y="652" width="32" height="16" fill="#14120c"/>
        <rect x="24"  y="656" width="24" height="12" fill="#1c1810"/>
        <rect x="0"   y="660" width="20" height="8"  fill="#0e0c08"/>
        {/* Right foreground rocks */}
        <rect x="358" y="652" width="32" height="16" fill="#14120c"/>
        <rect x="342" y="656" width="24" height="12" fill="#1c1810"/>
        <rect x="370" y="660" width="20" height="8"  fill="#0e0c08"/>
        {/* Pixel grass tufts left */}
        {[[4,644,4,10],[12,640,4,12],[20,644,4,10],[28,642,4,10],[36,640,4,12],[44,644,4,8]].map(([x,y,w,h],i)=>(
          <rect key={i} x={x} y={y} width={w} height={h} fill={i%2===0?'#1e4a14':'#287020'}/>
        ))}
        {/* Pixel grass tufts right */}
        {[[346,644,4,10],[354,640,4,12],[362,644,4,10],[370,642,4,10],[378,640,4,12],[386,644,4,8]].map(([x,y,w,h],i)=>(
          <rect key={i} x={x} y={y} width={w} height={h} fill={i%2===0?'#1e4a14':'#287020'}/>
        ))}
        {/* Dark vine overlays on sides */}
        <rect x="0"   y="452" width="4"  height="216" fill="#0e2408" opacity="0.8"/>
        <rect x="386" y="452" width="4"  height="216" fill="#0e2408" opacity="0.8"/>
      </svg>

      {/* ── Floating golden particles ── */}
      {PARTICLES.map((p,i) => (
        <div key={i} style={{
          position:'absolute',
          width: p.s, height: p.s,
          borderRadius: 0,
          background: p.gold,
          boxShadow: `0 0 ${p.s*3}px ${p.s}px ${p.gold}88`,
          left: `${p.l}%`,
          bottom: `${p.b}%`,
          animation: `cbParticle ${p.d}s ease-in-out ${p.delay}s infinite`,
          opacity: 0,
          imageRendering: 'pixelated',
          pointerEvents:'none',
        }}/>
      ))}
    </div>
  );
}
