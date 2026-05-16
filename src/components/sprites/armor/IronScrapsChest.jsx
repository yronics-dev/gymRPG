import React from 'react';

/* Iron Scraps — Chest
   Patchwork mismatched iron plates over torso + shoulders.
   Aligned to PlayerBase tier 3: sw=18, tw=13, SY=54, TY=112
   LAX=42 (left arm shoulder), RAX=78 (right arm shoulder)
   Arm half-width aw=6 → left arm spans x=36–48, right x=72–84

   Left pauldron: LARGE (dominant) — x=30–62, hangs over left arm
   Right pauldron: smaller (mismatched) — x=58–84, sits over right arm
   Torso plate: follows body trapezoid x=42–78 shoulders → x=47–73 waist

   viewBox 0 0 120 200 — position:absolute over base. */

const css = `
@keyframes isc-idle {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-2px); }
}
`;

const FE   = '#888780';
const FE_D = '#636058';
const FE_S = '#4a4840';
const FE_H = '#b0aea6';
const LTH  = '#5a3a20';
const LTH_D = '#3a2010';
const LTH_H = '#7a5030';
const RIV  = '#aaa89e';

function Rivet({ cx, cy, r = 1.8 }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={FE_S} />
      <circle cx={cx - 0.4} cy={cy - 0.4} r={r * 0.45} fill={RIV} />
    </>
  );
}

/* Body reference constants (tier 3) */
const SY  = 54;   // shoulder / torso top Y
const TY  = 112;  // torso bottom Y
const LAX = 42;   // left arm shoulder X
const RAX = 78;   // right arm shoulder X
const TW  = 13;   // waist half-width → waist x = 47–73

export default function IronScrapsChest() {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 120 200" overflow="visible"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

        <g style={{
          animationName: 'isc-idle',
          animationDuration: '3s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}>

          {/* ══════════════════════════════════════
              LEATHER BACKING — drawn first
              Visible through gaps between plates
          ══════════════════════════════════════ */}
          <path d={`M${LAX},${SY} L${RAX},${SY} Q${60+TW+2},90 ${60+TW},${TY} L${60-TW},${TY} Q${60-TW-2},90 ${LAX},${SY}Z`}
            fill={LTH} opacity="0.5" />

          {/* ══════════════════════════════════════
              MAIN TORSO PLATE
              Follows body trapezoid + 2px overhang each side
              Right half lit, left half shadowed
          ══════════════════════════════════════ */}
          {/* Shadow (left half) */}
          <path d={`M60,${SY} L${LAX-2},${SY} Q${60-TW-3},90 ${60-TW-1},${TY} L60,${TY}Z`}
            fill={FE_D} />
          {/* Lit (right half) */}
          <path d={`M60,${SY} L${RAX+2},${SY} Q${60+TW+3},90 ${60+TW+1},${TY} L60,${TY}Z`}
            fill={FE} />
          {/* Top edge highlight strip */}
          <path d={`M${LAX-2},${SY} L${RAX+2},${SY} L${RAX+2},${SY+3} L${LAX-2},${SY+3}Z`}
            fill={FE_H} opacity="0.35" />
          {/* Center line (gap seam) */}
          <line x1="60" y1={SY} x2="60" y2={TY}
            stroke={FE_S} strokeWidth="1" opacity="0.5" />

          {/* Abs / plate horizontal seams */}
          <g stroke={FE_S} strokeWidth="0.8" opacity="0.4">
            <path d={`M${LAX-1},${SY+18} Q60,${SY+21} ${RAX+1},${SY+18}`} fill="none" />
            <path d={`M${LAX},${SY+36} Q60,${SY+39} ${RAX},${SY+36}`} fill="none" />
          </g>

          {/* Scratch lines */}
          <g stroke={FE_H} strokeWidth="0.4" opacity="0.3">
            <line x1="55" y1={SY+4} x2="56" y2={SY+42} />
            <line x1="63" y1={SY+4} x2="64" y2={SY+40} />
            <line x1="67" y1={SY+6} x2="68" y2={SY+35} />
          </g>
          {/* Battle gouge — diagonal scratch */}
          <path d={`M${60-8},${SY+12} L${60-2},${SY+22}`}
            stroke={FE_S} strokeWidth="1.2" opacity="0.75" />
          <path d={`M${60-9},${SY+12} L${60-3},${SY+22}`}
            stroke={FE_H} strokeWidth="0.4" opacity="0.35" />

          {/* ══════════════════════════════════════
              LEFT PAULDRON — LARGE (dominant)
              Top sits at SY (y=54), extends outward x=30–63
              Droops down outer edge to SY+22
          ══════════════════════════════════════ */}
          {/* Shadow underside/back of plate */}
          <path d={`M29,${SY+2} Q29,${SY+6} 32,${SY+22} Q36,${SY+26} ${LAX},${SY+24} Q54,${SY+22} 64,${SY+16} L64,${SY} Q54,${SY} ${LAX},${SY} Q31,${SY} 29,${SY+2}Z`}
            fill={FE_S} />
          {/* Main lit face */}
          <path d={`M30,${SY+2} Q30,${SY+5} 33,${SY+20} Q37,${SY+24} ${LAX},${SY+22} Q53,${SY+20} 63,${SY+14} L63,${SY+1} Q53,${SY+1} ${LAX},${SY+1} Q31,${SY+1} 30,${SY+2}Z`}
            fill={FE} />
          {/* Shadow left outer edge of pauldron */}
          <path d={`M30,${SY+2} Q29,${SY+6} 32,${SY+20} Q31,${SY+16} 30,${SY+8}Z`}
            fill={FE_D} />
          {/* Top highlight edge */}
          <path d={`M${LAX},${SY+1} Q54,${SY+1} 63,${SY+2} L63,${SY+1} Q54,${SY} ${LAX},${SY}Z`}
            fill={FE_H} opacity="0.45" />
          {/* Scratch lines on left pauldron */}
          <g stroke={FE_H} strokeWidth="0.4" opacity="0.45">
            <line x1="35" y1={SY+3} x2="34" y2={SY+17} />
            <line x1="40" y1={SY+2} x2="39" y2={SY+18} />
            <line x1="47" y1={SY+2} x2="47" y2={SY+19} />
          </g>
          {/* Battle mark on left pauldron */}
          <path d={`M34,${SY+6} L38,${SY+14}`} stroke={FE_S} strokeWidth="1.2" opacity="0.8" />
          <path d={`M33,${SY+6} L37,${SY+14}`} stroke={FE_H} strokeWidth="0.4" opacity="0.4" />
          {/* Left pauldron rivets */}
          <Rivet cx={32} cy={SY+8} r={1.6} />
          <Rivet cx={40} cy={SY+2} r={1.6} />
          <Rivet cx={55} cy={SY+2} r={1.6} />
          <Rivet cx={62} cy={SY+8} r={1.6} />

          {/* ══════════════════════════════════════
              RIGHT PAULDRON — SMALLER (mismatched)
              Top at SY (y=54), x=57–84, droops to SY+16
          ══════════════════════════════════════ */}
          {/* Shadow back */}
          <path d={`M57,${SY+2} Q58,${SY} ${RAX},${SY} Q82,${SY} 85,${SY+4} L85,${SY+16} Q82,${SY+18} ${RAX},${SY+16} Q58,${SY+16} 57,${SY+12}Z`}
            fill={FE_S} />
          {/* Lit face */}
          <path d={`M58,${SY+2} Q59,${SY+1} ${RAX},${SY+1} Q81,${SY+1} 84,${SY+4} L84,${SY+14} Q81,${SY+16} ${RAX},${SY+14} Q59,${SY+14} 58,${SY+10}Z`}
            fill={FE} />
          {/* Shadow right outer edge */}
          <path d={`M84,${SY+4} Q85,${SY+6} 84,${SY+14} Q85,${SY+10} 84,${SY+6}Z`}
            fill={FE_D} />
          {/* Top highlight */}
          <path d={`M${RAX},${SY+1} Q81,${SY+1} 84,${SY+3} L84,${SY+2} Q80,${SY} ${RAX},${SY}Z`}
            fill={FE_H} opacity="0.4" />
          {/* Right pauldron rivets */}
          <Rivet cx={60} cy={SY+3} r={1.5} />
          <Rivet cx={72} cy={SY+2} r={1.5} />
          <Rivet cx={83} cy={SY+6} r={1.5} />
          <Rivet cx={83} cy={SY+13} r={1.5} />

          {/* ══════════════════════════════════════
              LEATHER SHOULDER STRAP
              Visible crossing from left to right plate
          ══════════════════════════════════════ */}
          <path d={`M44,${SY+14} Q60,${SY+10} 76,${SY+10}`}
            fill="none" stroke={LTH} strokeWidth="3" strokeLinecap="round" />
          <path d={`M44,${SY+14} Q60,${SY+10} 76,${SY+10}`}
            fill="none" stroke={LTH_H} strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />

          {/* ══════════════════════════════════════
              HORIZONTAL BELLY STRAP
              Mid-torso leather band with buckle
          ══════════════════════════════════════ */}
          <rect x={LAX-2} y={SY+37} width={(RAX-LAX+4)} height="5" rx="1" fill={LTH} />
          <rect x={LAX-2} y={SY+37} width={(RAX-LAX+4)} height="5" rx="1"
            fill="none" stroke={LTH_D} strokeWidth="0.6" />
          {/* Buckle */}
          <rect x="56" y={SY+36} width="8" height="7" rx="0.5" fill={LTH_D} />
          <rect x="57.5" y={SY+37.5} width="5" height="4" rx="0.5" fill={LTH} />
          <line x1="60" y1={SY+36} x2="60" y2={SY+43} stroke={LTH_D} strokeWidth="0.8" />
          <Rivet cx={58} cy={SY+40} r={1.2} />
          <Rivet cx={62} cy={SY+40} r={1.2} />

          {/* Torso plate rivets (corners + mid) */}
          <Rivet cx={LAX} cy={SY+3} />
          <Rivet cx={RAX} cy={SY+3} />
          <Rivet cx={60-TW-1} cy={TY-4} />
          <Rivet cx={60+TW+1} cy={TY-4} />
          <Rivet cx={60} cy={SY+3} r={1.4} />

          {/* ══════════════════════════════════════
              BOTTOM LEATHER LIP
              Sits just above shorts line
          ══════════════════════════════════════ */}
          <path d={`M${LAX-1},${TY-4} Q60,${TY+1} ${RAX+1},${TY-4}`}
            fill="none" stroke={LTH} strokeWidth="4" strokeLinecap="round" />
          <path d={`M${LAX-1},${TY-4} Q60,${TY+1} ${RAX+1},${TY-4}`}
            fill="none" stroke={LTH_H} strokeWidth="0.9" opacity="0.3" strokeLinecap="round" />
          <Rivet cx={LAX+2} cy={TY-2} r={1.5} />
          <Rivet cx={53} cy={TY} r={1.5} />
          <Rivet cx={67} cy={TY} r={1.5} />
          <Rivet cx={RAX-2} cy={TY-2} r={1.5} />

        </g>
      </svg>
    </>
  );
}
