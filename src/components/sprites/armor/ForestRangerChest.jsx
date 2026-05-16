import React from 'react';

/* Forest Ranger — Chest
   Layered dark-leather chest harness with wooden shoulder caps
   and green fabric visible at gaps. Asymmetric quiver strap
   crosses from left shoulder to right hip. Carved leaf accents
   on the wooden shoulder caps.

   Aligned to PlayerBase tier 3: SY=54, TY=112, LAX=42, RAX=78, TW=13
   viewBox 0 0 120 200 — position:absolute over base. */

const css = `
@keyframes frc-idle {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-2px); }
}
`;

const LTH   = '#3d2b1a';  // dark leather
const LTH_M = '#4e3622';  // mid leather
const LTH_L = '#5a3f28';  // lit leather
const LTH_H = '#7a5a38';  // highlight
const LTH_D = '#2a1a08';  // deep shadow
const WD    = '#5a4a2a';  // wood
const WD_L  = '#7a6a3a';  // wood lit
const WD_D  = '#3a2a10';  // wood dark
const GRN   = '#3B6D11';  // green fabric accent
const GRN_L = '#4e8c18';
const RIV   = '#8a7a58';  // leather rivet / stud

const SY  = 54;
const TY  = 112;
const LAX = 42;
const RAX = 78;
const TW  = 13;

function Stud({ cx, cy, r = 1.5 }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={LTH_D} />
      <circle cx={cx - 0.4} cy={cy - 0.4} r={r * 0.45} fill={RIV} />
    </>
  );
}

export default function ForestRangerChest() {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 120 200" overflow="visible"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

        <g style={{
          animationName: 'frc-idle',
          animationDuration: '3.2s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}>

          {/* ══ GREEN FABRIC UNDERLAY (visible at gaps) ══ */}
          <path d={`M${LAX},${SY} L${RAX},${SY} Q${60+TW+2},90 ${60+TW},${TY} L${60-TW},${TY} Q${60-TW-2},90 ${LAX},${SY}Z`}
            fill={GRN} opacity="0.25" />

          {/* ══ MAIN CHEST HARNESS ══
              Two vertical leather bands running from shoulders to waist */}
          {/* Left band (shadow) */}
          <path d={`M${60-4},${SY} L${LAX-1},${SY+2} Q${LAX-3},80 ${60-TW-1},${TY} L${60-2},${TY}Z`}
            fill={LTH_D} />
          <path d={`M${60-3},${SY} L${LAX},${SY+2} Q${LAX-2},80 ${60-TW},${TY} L${60-1},${TY}Z`}
            fill={LTH_M} />
          {/* Right band (lit) */}
          <path d={`M${60+3},${SY} L${RAX},${SY+2} Q${RAX+2},80 ${60+TW},${TY} L${60+1},${TY}Z`}
            fill={LTH_L} />
          <path d={`M${60+4},${SY} L${RAX+1},${SY+2} Q${RAX+3},80 ${60+TW+1},${TY} L${60+2},${TY}Z`}
            fill={LTH_D} />

          {/* ══ HORIZONTAL CHEST STRAPS ══ */}
          {/* Upper strap */}
          <rect x={LAX-1} y={SY+14} width={RAX-LAX+2} height="5" rx="1" fill={LTH_M} />
          <rect x={LAX} y={SY+15} width={RAX-LAX} height="3" rx="0.5" fill={LTH_L} />
          <rect x={LAX} y={SY+15} width={RAX-LAX} height="1" rx="0" fill={LTH_H} opacity="0.4" />
          {/* Lower strap */}
          <rect x={LAX-1} y={SY+36} width={RAX-LAX+2} height="5" rx="1" fill={LTH_M} />
          <rect x={LAX} y={SY+37} width={RAX-LAX} height="3" rx="0.5" fill={LTH_L} />
          <rect x={LAX} y={SY+37} width={RAX-LAX} height="1" rx="0" fill={LTH_H} opacity="0.4" />

          {/* Upper strap buckle center */}
          <rect x="57" y={SY+13} width="6" height="7" rx="0.5" fill={LTH_D} />
          <rect x="57.5" y={SY+14} width="5" height="5" rx="0.5" fill={LTH_M} />
          <line x1="60" y1={SY+13} x2="60" y2={SY+20} stroke={LTH_D} strokeWidth="0.8" />
          <Stud cx={58} cy={SY+17} r={1.2} />
          <Stud cx={62} cy={SY+17} r={1.2} />

          {/* Lower strap buckle */}
          <rect x="57" y={SY+35} width="6" height="7" rx="0.5" fill={LTH_D} />
          <rect x="57.5" y={SY+36} width="5" height="5" rx="0.5" fill={LTH_M} />
          <line x1="60" y1={SY+35} x2="60" y2={SY+42} stroke={LTH_D} strokeWidth="0.8" />

          {/* ══ DIAGONAL QUIVER STRAP ══
              Runs from left shoulder to right hip — ranger's quiver strap */}
          <path d={`M${LAX-2},${SY+4} Q${60},${SY+30} ${RAX+2},${TY-4}`}
            fill="none" stroke={LTH_D} strokeWidth="4.5" strokeLinecap="round" />
          <path d={`M${LAX-2},${SY+4} Q${60},${SY+30} ${RAX+2},${TY-4}`}
            fill="none" stroke={LTH_M} strokeWidth="3" strokeLinecap="round" />
          <path d={`M${LAX-2},${SY+4} Q${60},${SY+30} ${RAX+2},${TY-4}`}
            fill="none" stroke={LTH_H} strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />
          {/* Strap studs */}
          <Stud cx={LAX+4} cy={SY+8} r={1.3} />
          <Stud cx={60} cy={SY+30} r={1.3} />
          <Stud cx={RAX-4} cy={TY-8} r={1.3} />

          {/* ══ LEFT SHOULDER CAP (WOOD) ══
              Carved wood pauldron — sits at SY, extends to x=32 */}
          {/* Shadow underside */}
          <path d={`M30,${SY+3} Q29,${SY-2} ${LAX},${SY} Q54,${SY} 63,${SY+6} L63,${SY+20} Q54,${SY+22} ${LAX},${SY+20} Q30,${SY+18} 30,${SY+10}Z`}
            fill={WD_D} />
          {/* Lit face */}
          <path d={`M31,${SY+3} Q30,${SY-2} ${LAX},${SY} Q53,${SY} 62,${SY+5} L62,${SY+18} Q53,${SY+20} ${LAX},${SY+18} Q31,${SY+16} 31,${SY+8}Z`}
            fill={WD} />
          {/* Top highlight edge */}
          <path d={`M${LAX},${SY} Q53,${SY} 62,${SY+4} L62,${SY+5} Q53,${SY+1} ${LAX},${SY+1}Z`}
            fill={WD_L} opacity="0.55" />
          {/* Wood grain */}
          <g stroke={WD_D} strokeWidth="0.5" opacity="0.5">
            <path d={`M36,${SY+1} Q35,${SY+10} 36,${SY+16}`} fill="none" />
            <path d={`M42,${SY} Q41,${SY+10} 42,${SY+18}`} fill="none" />
            <path d={`M50,${SY} Q50,${SY+10} 50,${SY+19}`} fill="none" />
          </g>
          {/* Carved leaf motif on left cap */}
          <path d={`M38,${SY+5} Q36,${SY+9} 38,${SY+14} Q40,${SY+9} 38,${SY+5}Z`}
            fill={GRN} opacity="0.7" />
          <line x1="38" y1={SY+5} x2="38" y2={SY+14}
            stroke="#2a4a08" strokeWidth="0.5" opacity="0.8" />
          {/* Studs */}
          <Stud cx={32} cy={SY+8} r={1.5} />
          <Stud cx={61} cy={SY+10} r={1.5} />

          {/* ══ RIGHT SHOULDER CAP (WOOD, slightly smaller) ══ */}
          <path d={`M58,${SY+3} Q58,${SY-1} ${RAX},${SY} Q82,${SY} 86,${SY+5} L86,${SY+17} Q82,${SY+19} ${RAX},${SY+17} Q58,${SY+17} 58,${SY+12}Z`}
            fill={WD_D} />
          <path d={`M59,${SY+3} Q59,${SY-1} ${RAX},${SY} Q81,${SY} 85,${SY+5} L85,${SY+15} Q81,${SY+17} ${RAX},${SY+15} Q59,${SY+15} 59,${SY+10}Z`}
            fill={WD} />
          <path d={`M${RAX},${SY} Q81,${SY} 85,${SY+4} L85,${SY+5} Q81,${SY+1} ${RAX},${SY+1}Z`}
            fill={WD_L} opacity="0.5" />
          {/* Wood grain right */}
          <g stroke={WD_D} strokeWidth="0.5" opacity="0.5">
            <path d={`M64,${SY} Q64,${SY+8} 64,${SY+15}`} fill="none" />
            <path d={`M72,${SY} Q72,${SY+8} 72,${SY+16}`} fill="none" />
            <path d={`M80,${SY+1} Q80,${SY+8} 80,${SY+14}`} fill="none" />
          </g>
          {/* Leaf motif right */}
          <path d={`M82,${SY+5} Q80,${SY+9} 82,${SY+13} Q84,${SY+9} 82,${SY+5}Z`}
            fill={GRN} opacity="0.7" />
          <line x1="82" y1={SY+5} x2="82" y2={SY+13}
            stroke="#2a4a08" strokeWidth="0.5" opacity="0.8" />
          <Stud cx={84} cy={SY+8} r={1.4} />
          <Stud cx={60} cy={SY+8} r={1.4} />

          {/* ══ BOTTOM LEATHER EDGE ══ */}
          <path d={`M${LAX-1},${TY-4} Q60,${TY+2} ${RAX+1},${TY-4}`}
            fill="none" stroke={LTH_D} strokeWidth="5" strokeLinecap="round" />
          <path d={`M${LAX-1},${TY-4} Q60,${TY+2} ${RAX+1},${TY-4}`}
            fill="none" stroke={LTH_M} strokeWidth="3.5" strokeLinecap="round" />
          <path d={`M${LAX-1},${TY-4} Q60,${TY+2} ${RAX+1},${TY-4}`}
            fill="none" stroke={LTH_H} strokeWidth="0.8" opacity="0.35" strokeLinecap="round" />
          <Stud cx={LAX+2} cy={TY-2} r={1.4} />
          <Stud cx={53} cy={TY+1} r={1.4} />
          <Stud cx={67} cy={TY+1} r={1.4} />
          <Stud cx={RAX-2} cy={TY-2} r={1.4} />

        </g>
      </svg>
    </>
  );
}
