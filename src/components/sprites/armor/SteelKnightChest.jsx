import React from 'react';

/* Steel Knight — Chest
   Full polished plate chest: large gorget at the neck, wide pauldrons with
   layered lames, a breastplate with central ridge and knight-cross emboss,
   flared faulds at the waist. Blue fabric visible at gaps.

   Aligned to PlayerBase tier 3: SY=54, TY=112, LAX=42, RAX=78, TW=13
   viewBox 0 0 120 200 — position:absolute over base. */

const css = `
@keyframes skc-idle {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-2px); }
}
@keyframes skc-gleam {
  0%, 75%, 100% { opacity: 0; }
  85%            { opacity: 0.6; }
}
`;

const ST    = '#6a7a8a';
const ST_L  = '#9aaabb';
const ST_H  = '#c8dae8';
const ST_D  = '#3a4a58';
const ST_DD = '#1e2a36';
const BLU   = '#185FA5';
const BLU_D = '#0f3f70';
const BLU_F = '#2a6bbf';   // blue fabric
const RIV   = '#aabbc8';

const SY  = 54;
const TY  = 112;
const LAX = 42;
const RAX = 78;
const TW  = 13;

function Rivet({ cx, cy, r = 1.4 }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={ST_DD} />
      <circle cx={cx-0.35} cy={cy-0.35} r={r*0.42} fill={RIV} />
    </>
  );
}

export default function SteelKnightChest() {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 120 200" overflow="visible"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

        <g style={{
          animationName: 'skc-idle',
          animationDuration: '3.4s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}>

          {/* ══ BLUE FABRIC AT GAPS ══ */}
          <path d={`M${LAX},${SY} L${RAX},${SY} Q${60+TW+1},88 ${60+TW},${TY} L${60-TW},${TY} Q${60-TW-1},88 ${LAX},${SY}Z`}
            fill={BLU_F} opacity="0.18" />

          {/* ══ GORGET (neck plate) ══ y=SY to SY+10 */}
          <path d={`M50,${SY} Q50,${SY-4} 60,${SY-5} Q70,${SY-4} 70,${SY} L70,${SY+10} Q60,${SY+12} 50,${SY+10}Z`}
            fill={ST_D} />
          <path d={`M51,${SY} Q51,${SY-3} 60,${SY-4} Q69,${SY-3} 69,${SY} L69,${SY+9} Q60,${SY+11} 51,${SY+9}Z`}
            fill={ST} />
          <path d={`M51,${SY-3} Q60,${SY-4} 69,${SY-1} L69,${SY} Q60,${SY-3} 51,${SY-2}Z`}
            fill={ST_H} opacity="0.45" />

          {/* ══ BREASTPLATE ══ */}
          {/* Shadow left */}
          <path d={`M${60-1},${SY+8} L${LAX+2},${SY+10} Q${LAX},75 ${60-TW},${TY} L${60-1},${TY}Z`}
            fill={ST_D} />
          {/* Main plate */}
          <path d={`M${60+1},${SY+8} L${LAX+3},${SY+10} Q${LAX+1},75 ${60-TW+1},${TY} L${60+1},${TY}Z`}
            fill={ST} />
          {/* Right plate lit */}
          <path d={`M${60+1},${SY+8} L${RAX-3},${SY+10} Q${RAX-1},75 ${60+TW-1},${TY} L${60+1},${TY}Z`}
            fill={ST_L} />
          {/* Right shadow edge */}
          <path d={`M${60+1},${SY+8} L${RAX-2},${SY+10} Q${RAX},75 ${60+TW},${TY} L${60+TW-1},${TY}Z`}
            fill={ST_D} />

          {/* Central ridge */}
          <path d={`M60,${SY+8} Q61,${SY+30} 61,${TY}`}
            fill="none" stroke={ST_H} strokeWidth="1.5" opacity="0.5" />
          <path d={`M60,${SY+8} Q59,${SY+30} 59,${TY}`}
            fill="none" stroke={ST_DD} strokeWidth="0.8" opacity="0.4" />

          {/* Breastplate top highlight */}
          <path d={`M${LAX+3},${SY+10} Q60,${SY+8} ${RAX-3},${SY+10} L${RAX-3},${SY+12} Q60,${SY+10} ${LAX+3},${SY+12}Z`}
            fill={ST_H} opacity="0.35" />

          {/* ══ HORIZONTAL PLATE BANDS ══ */}
          {[SY+22, SY+36, SY+50].map((y, i) => (
            <g key={i}>
              <rect x={LAX+2} y={y} width={RAX-LAX-4} height="5" rx="0.5" fill={ST_D} />
              <rect x={LAX+3} y={y+0.5} width={RAX-LAX-6} height="3.5" rx="0.5" fill={ST_L} />
              <rect x={LAX+3} y={y+0.5} width={RAX-LAX-6} height="1.5" rx="0" fill={ST_H} opacity="0.3" />
            </g>
          ))}

          {/* ══ KNIGHT CROSS ON BREASTPLATE ══ centered at (60, SY+30) */}
          <rect x="57.5" y={SY+22} width="5" height="18" rx="1" fill={BLU_D} />
          <rect x="58"   y={SY+22} width="4" height="17" rx="1" fill={BLU} />
          <rect x="52"   y={SY+28} width="16" height="5" rx="1" fill={BLU_D} />
          <rect x="52.5" y={SY+28} width="15" height="4" rx="1" fill={BLU} />
          {/* Cross highlight */}
          <rect x="58.5" y={SY+22} width="1.5" height="5" rx="0" fill={ST_H} opacity="0.35" />
          <rect x="52.5" y={SY+28} width="5" height="1.5" rx="0" fill={ST_H} opacity="0.25" />

          {/* ══ LEFT PAULDRON (large) ══ */}
          {/* Shadow layer */}
          <path d={`M28,${SY+6} Q26,${SY+2} ${LAX},${SY} Q54,${SY} 62,${SY+8} L62,${SY+26} Q54,${SY+28} ${LAX},${SY+26} Q28,${SY+22} 28,${SY+14}Z`}
            fill={ST_DD} />
          {/* Main plate */}
          <path d={`M29,${SY+6} Q27,${SY+2} ${LAX},${SY} Q53,${SY} 61,${SY+8} L61,${SY+24} Q53,${SY+26} ${LAX},${SY+24} Q29,${SY+20} 29,${SY+12}Z`}
            fill={ST_D} />
          {/* Lit upper face */}
          <path d={`M30,${SY+5} Q28,${SY+1} ${LAX},${SY} Q53,${SY} 61,${SY+7} L61,${SY+16} Q53,${SY+18} ${LAX},${SY+16} Q30,${SY+12} 30,${SY+8}Z`}
            fill={ST} />
          {/* Top highlight */}
          <path d={`M${LAX},${SY} Q52,${SY} 61,${SY+6} L61,${SY+7} Q52,${SY+1} ${LAX},${SY+1}Z`}
            fill={ST_H} opacity="0.5" />
          {/* Lame line across pauldron */}
          <path d={`M30,${SY+14} Q${LAX},${SY+17} 61,${SY+18}`}
            fill="none" stroke={ST_DD} strokeWidth="1.2" />
          <path d={`M30,${SY+13} Q${LAX},${SY+16} 61,${SY+17}`}
            fill="none" stroke={ST_H} strokeWidth="0.5" opacity="0.35" />
          {/* Blue fabric visible under pauldron edge */}
          <path d={`M29,${SY+20} Q${LAX},${SY+22} 61,${SY+24}`}
            fill="none" stroke={BLU_F} strokeWidth="1.5" opacity="0.4" />
          <Rivet cx={31} cy={SY+8} />
          <Rivet cx={61} cy={SY+12} />
          <Rivet cx={45} cy={SY+4} />

          {/* ══ RIGHT PAULDRON (slightly smaller) ══ */}
          <path d={`M59,${SY+6} Q59,${SY+2} ${RAX},${SY} Q84,${SY} 88,${SY+6} L88,${SY+22} Q84,${SY+24} ${RAX},${SY+22} Q59,${SY+22} 59,${SY+16}Z`}
            fill={ST_DD} />
          <path d={`M60,${SY+5} Q60,${SY+1} ${RAX},${SY} Q83,${SY} 87,${SY+5} L87,${SY+20} Q83,${SY+22} ${RAX},${SY+20} Q60,${SY+20} 60,${SY+14}Z`}
            fill={ST_D} />
          <path d={`M60,${SY+4} Q60,${SY} ${RAX},${SY} Q82,${SY} 86,${SY+4} L86,${SY+12} Q82,${SY+14} ${RAX},${SY+12} Q60,${SY+12} 60,${SY+8}Z`}
            fill={ST_L} />
          <path d={`M${RAX},${SY} Q82,${SY} 86,${SY+3} L86,${SY+4} Q82,${SY+1} ${RAX},${SY+1}Z`}
            fill={ST_H} opacity="0.45" />
          {/* Lame line */}
          <path d={`M60,${SY+14} Q${RAX},${SY+16} 87,${SY+16}`}
            fill="none" stroke={ST_DD} strokeWidth="1.2" />
          <path d={`M60,${SY+13} Q${RAX},${SY+15} 87,${SY+15}`}
            fill="none" stroke={ST_H} strokeWidth="0.5" opacity="0.35" />
          <path d={`M60,${SY+18} Q${RAX},${SY+20} 87,${SY+20}`}
            fill="none" stroke={BLU_F} strokeWidth="1.5" opacity="0.4" />
          <Rivet cx={86} cy={SY+8} />
          <Rivet cx={60} cy={SY+10} />
          <Rivet cx={74} cy={SY+3} />

          {/* ══ FAULDS (waist plates) ══ */}
          {/* Three overlapping plates at TY */}
          <path d={`M${LAX},${TY-8} Q60,${TY-4} ${RAX},${TY-8} L${RAX},${TY+2} Q60,${TY+6} ${LAX},${TY+2}Z`}
            fill={ST_D} />
          <path d={`M${LAX},${TY-7} Q60,${TY-3} ${RAX},${TY-7} L${RAX},${TY+1} Q60,${TY+5} ${LAX},${TY+1}Z`}
            fill={ST} />
          <path d={`M${LAX},${TY-7} Q60,${TY-3} ${RAX},${TY-7} L${RAX},${TY-5} Q60,${TY-1} ${LAX},${TY-5}Z`}
            fill={ST_H} opacity="0.3" />
          <Rivet cx={LAX+4} cy={TY-3} />
          <Rivet cx={53} cy={TY+1} />
          <Rivet cx={67} cy={TY+1} />
          <Rivet cx={RAX-4} cy={TY-3} />

          {/* ══ GLEAM ══ */}
          <path d={`M${LAX+8},${SY+10} Q${LAX+14},${SY+20} ${LAX+12},${SY+35}`}
            fill="none" stroke={ST_H} strokeWidth="2.5" strokeLinecap="round" opacity="0"
            style={{
              animationName: 'skc-gleam',
              animationDuration: '6s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: '2s',
            }}
          />

        </g>
      </svg>
    </>
  );
}
