import React from 'react';

/* Steel Knight — Boots & Legs
   Full plate greaves: upper knee cop, layered lower leg plate, and a pointed
   sabatons (toe guard). Blue fabric peek at the knee joint. Polished steel.

   viewBox 0 0 120 200 — position:absolute over base. */

const css = `
@keyframes skbl-idle {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-1px); }
}
`;

const ST    = '#6a7a8a';
const ST_L  = '#9aaabb';
const ST_H  = '#c8dae8';
const ST_D  = '#3a4a58';
const ST_DD = '#1e2a36';
const BLU_F = '#2a6bbf';
const RIV   = '#aabbc8';

const LY  = 130;
const LLX = 55;
const RLX = 65;
const LW  = 7;

function Rivet({ cx, cy, r = 1.3 }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={ST_DD} />
      <circle cx={cx-0.3} cy={cy-0.3} r={r*0.42} fill={RIV} />
    </>
  );
}

export default function SteelKnightBootsLegs() {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 120 200" overflow="visible"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

        <g style={{
          animationName: 'skbl-idle',
          animationDuration: '3.4s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}>

          {/* ══════════ LEFT GREAVE ══════════ */}

          {/* ── Knee cop (rounded cap over knee joint) y=LY to LY+14 ── */}
          {/* Blue fabric peeking above knee */}
          <path d={`M${LLX-LW-1},${LY+2} Q${LLX},${LY-1} ${LLX+LW+1},${LY+2} L${LLX+LW+1},${LY+6} Q${LLX},${LY+3} ${LLX-LW-1},${LY+6}Z`}
            fill={BLU_F} opacity="0.5" />
          {/* Knee cop shadow */}
          <path d={`M${LLX-LW-2},${LY+2} Q${LLX-LW-2},${LY-1} ${LLX},${LY-2} Q${LLX+LW+2},${LY-1} ${LLX+LW+2},${LY+2} L${LLX+LW+2},${LY+12} Q${LLX+LW},${LY+16} ${LLX},${LY+15} Q${LLX-LW},${LY+16} ${LLX-LW-2},${LY+12}Z`}
            fill={ST_DD} />
          {/* Knee cop face */}
          <path d={`M${LLX-LW-1},${LY+3} Q${LLX-LW-1},${LY} ${LLX},${LY-1} Q${LLX+LW+1},${LY} ${LLX+LW+1},${LY+3} L${LLX+LW+1},${LY+11} Q${LLX+LW},${LY+14} ${LLX},${LY+13} Q${LLX-LW},${LY+14} ${LLX-LW-1},${LY+11}Z`}
            fill={ST_D} />
          {/* Lit upper half */}
          <path d={`M${LLX-LW},${LY+3} Q${LLX-LW},${LY} ${LLX},${LY-1} Q${LLX+LW},${LY} ${LLX+LW},${LY+3} L${LLX+LW},${LY+8} Q${LLX},${LY+9} ${LLX-LW},${LY+8}Z`}
            fill={ST} />
          {/* Top highlight */}
          <path d={`M${LLX-LW},${LY} Q${LLX},${LY-1} ${LLX+LW},${LY} L${LLX+LW},${LY+1} Q${LLX},${LY} ${LLX-LW},${LY+1}Z`}
            fill={ST_H} opacity="0.5" />
          <Rivet cx={LLX-LW} cy={LY+7} />
          <Rivet cx={LLX+LW} cy={LY+7} />

          {/* ── Upper greave (shin plate) y=LY+12 to LY+42 ── */}
          {/* Shadow half */}
          <path d={`M${LLX-LW-1},${LY+11} Q${LLX-LW-2},${LY+26} ${LLX-LW-1},${LY+43} L${LLX},${LY+43} Q${LLX-1},${LY+26} ${LLX},${LY+11}Z`}
            fill={ST_D} />
          {/* Lit half */}
          <path d={`M${LLX},${LY+11} L${LLX+LW},${LY+11} Q${LLX+LW+1},${LY+26} ${LLX+LW},${LY+43} L${LLX},${LY+43} Q${LLX+1},${LY+26} ${LLX},${LY+11}Z`}
            fill={ST_L} />
          {/* Front ridge */}
          <line x1={LLX} y1={LY+12} x2={LLX} y2={LY+42} stroke={ST_H} strokeWidth="0.9" opacity="0.45" />
          {/* Top edge highlight */}
          <path d={`M${LLX-LW-1},${LY+12} Q${LLX},${LY+11} ${LLX+LW},${LY+12} L${LLX+LW},${LY+13} Q${LLX},${LY+12} ${LLX-LW-1},${LY+13}Z`}
            fill={ST_H} opacity="0.4" />
          {/* Mid strap */}
          <rect x={LLX-LW-1} y={LY+26} width={LW*2+3} height="3.5" rx="0.5" fill={ST_DD} />
          <rect x={LLX-LW} y={LY+26.5} width={LW*2+1} height="2.5" rx="0.5" fill={ST_D} />
          <Rivet cx={LLX-LW+1} cy={LY+28} r={1.1} />
          <Rivet cx={LLX+LW-1} cy={LY+28} r={1.1} />

          {/* ── Lower greave (ankle) y=LY+42 to LY+60 ── */}
          <path d={`M${LLX-LW-1},${LY+41} Q${LLX-LW-2},${LY+51} ${LLX-LW},${LY+61} L${LLX},${LY+61} Q${LLX-1},${LY+51} ${LLX},${LY+41}Z`}
            fill={ST_D} />
          <path d={`M${LLX},${LY+41} L${LLX+LW},${LY+41} Q${LLX+LW+1},${LY+51} ${LLX+LW},${LY+61} L${LLX},${LY+61} Q${LLX+1},${LY+51} ${LLX},${LY+41}Z`}
            fill={ST} />

          {/* ── Sabaton (pointed steel toe guard) ── */}
          <path d={`M${LLX-LW-1},${LY+60} Q${LLX-LW-3},${LY+64} ${LLX-LW},${LY+68} Q${LLX},${LY+71} ${LLX+4},${LY+70} L${LLX+LW},${LY+60}Z`}
            fill={ST_DD} />
          <path d={`M${LLX-LW},${LY+60} Q${LLX-LW-2},${LY+63} ${LLX-LW+1},${LY+67} Q${LLX+1},${LY+70} ${LLX+4},${LY+69} L${LLX+LW-1},${LY+60}Z`}
            fill={ST_D} />
          {/* Toe highlight */}
          <path d={`M${LLX-LW},${LY+60} Q${LLX-LW-1},${LY+62} ${LLX-LW+2},${LY+65} L${LLX},${LY+65} Q${LLX-1},${LY+62} ${LLX},${LY+60}Z`}
            fill={ST_L} opacity="0.6" />
          {/* Toe ridge line */}
          <path d={`M${LLX-LW+2},${LY+62} Q${LLX},${LY+66} ${LLX+3},${LY+68}`}
            fill="none" stroke={ST_H} strokeWidth="0.6" opacity="0.5" />
          <Rivet cx={LLX} cy={LY+65} r={1.2} />


          {/* ══════════ RIGHT GREAVE ══════════ */}

          {/* Blue fabric */}
          <path d={`M${RLX-LW-1},${LY+2} Q${RLX},${LY-1} ${RLX+LW+1},${LY+2} L${RLX+LW+1},${LY+6} Q${RLX},${LY+3} ${RLX-LW-1},${LY+6}Z`}
            fill={BLU_F} opacity="0.5" />
          {/* Knee cop */}
          <path d={`M${RLX-LW-2},${LY+2} Q${RLX-LW-2},${LY-1} ${RLX},${LY-2} Q${RLX+LW+2},${LY-1} ${RLX+LW+2},${LY+2} L${RLX+LW+2},${LY+12} Q${RLX+LW},${LY+16} ${RLX},${LY+15} Q${RLX-LW},${LY+16} ${RLX-LW-2},${LY+12}Z`}
            fill={ST_DD} />
          <path d={`M${RLX-LW-1},${LY+3} Q${RLX-LW-1},${LY} ${RLX},${LY-1} Q${RLX+LW+1},${LY} ${RLX+LW+1},${LY+3} L${RLX+LW+1},${LY+11} Q${RLX+LW},${LY+14} ${RLX},${LY+13} Q${RLX-LW},${LY+14} ${RLX-LW-1},${LY+11}Z`}
            fill={ST_D} />
          <path d={`M${RLX-LW},${LY+3} Q${RLX-LW},${LY} ${RLX},${LY-1} Q${RLX+LW},${LY} ${RLX+LW},${LY+3} L${RLX+LW},${LY+8} Q${RLX},${LY+9} ${RLX-LW},${LY+8}Z`}
            fill={ST} />
          <path d={`M${RLX-LW},${LY} Q${RLX},${LY-1} ${RLX+LW},${LY} L${RLX+LW},${LY+1} Q${RLX},${LY} ${RLX-LW},${LY+1}Z`}
            fill={ST_H} opacity="0.5" />
          <Rivet cx={RLX-LW} cy={LY+7} />
          <Rivet cx={RLX+LW} cy={LY+7} />

          {/* Upper greave right */}
          <path d={`M${RLX-LW},${LY+11} Q${RLX-LW-1},${LY+26} ${RLX-LW},${LY+43} L${RLX},${LY+43} Q${RLX-1},${LY+26} ${RLX},${LY+11}Z`}
            fill={ST_D} />
          <path d={`M${RLX},${LY+11} L${RLX+LW+1},${LY+11} Q${RLX+LW+2},${LY+26} ${RLX+LW+1},${LY+43} L${RLX},${LY+43} Q${RLX+1},${LY+26} ${RLX},${LY+11}Z`}
            fill={ST_L} />
          <line x1={RLX} y1={LY+12} x2={RLX} y2={LY+42} stroke={ST_H} strokeWidth="0.9" opacity="0.45" />
          <path d={`M${RLX-LW},${LY+12} Q${RLX},${LY+11} ${RLX+LW+1},${LY+12} L${RLX+LW+1},${LY+13} Q${RLX},${LY+12} ${RLX-LW},${LY+13}Z`}
            fill={ST_H} opacity="0.4" />
          <rect x={RLX-LW} y={LY+26} width={LW*2+3} height="3.5" rx="0.5" fill={ST_DD} />
          <rect x={RLX-LW+1} y={LY+26.5} width={LW*2+1} height="2.5" rx="0.5" fill={ST_D} />
          <Rivet cx={RLX-LW+1} cy={LY+28} r={1.1} />
          <Rivet cx={RLX+LW+1} cy={LY+28} r={1.1} />

          {/* Lower greave right */}
          <path d={`M${RLX-LW},${LY+41} Q${RLX-LW-1},${LY+51} ${RLX-LW},${LY+61} L${RLX},${LY+61} Q${RLX-1},${LY+51} ${RLX},${LY+41}Z`}
            fill={ST_D} />
          <path d={`M${RLX},${LY+41} L${RLX+LW+1},${LY+41} Q${RLX+LW+2},${LY+51} ${RLX+LW+1},${LY+61} L${RLX},${LY+61} Q${RLX+1},${LY+51} ${RLX},${LY+41}Z`}
            fill={ST} />

          {/* Right sabaton */}
          <path d={`M${RLX-LW},${LY+60} Q${RLX-LW-1},${LY+64} ${RLX-LW+1},${LY+68} Q${RLX+1},${LY+71} ${RLX+4},${LY+71} L${RLX+LW+1},${LY+60}Z`}
            fill={ST_DD} />
          <path d={`M${RLX-LW+1},${LY+60} Q${RLX-LW},${LY+63} ${RLX-LW+2},${LY+67} Q${RLX+2},${LY+70} ${RLX+4},${LY+70} L${RLX+LW},${LY+60}Z`}
            fill={ST_D} />
          <path d={`M${RLX-LW+1},${LY+60} Q${RLX-LW},${LY+62} ${RLX-LW+3},${LY+65} L${RLX+1},${LY+65} Q${RLX},${LY+62} ${RLX+1},${LY+60}Z`}
            fill={ST_L} opacity="0.6" />
          <path d={`M${RLX-LW+3},${LY+62} Q${RLX+1},${LY+66} ${RLX+4},${LY+68}`}
            fill="none" stroke={ST_H} strokeWidth="0.6" opacity="0.5" />
          <Rivet cx={RLX+1} cy={LY+65} r={1.2} />

        </g>
      </svg>
    </>
  );
}
