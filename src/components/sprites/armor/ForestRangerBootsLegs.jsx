import React from 'react';

/* Forest Ranger — Boots & Legs
   Tall dark-leather ranger boots with laced fronts, fur trim at top,
   and carved wooden toe guards. Leather wraps on the calves.
   Leaf motif pressed into the leather on each shin.

   viewBox 0 0 120 200 — position:absolute over base. */

const css = `
@keyframes frbl-idle {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-1px); }
}
`;

const LTH   = '#3d2b1a';
const LTH_M = '#4e3622';
const LTH_L = '#5a3f28';
const LTH_H = '#7a5a38';
const LTH_D = '#2a1a08';
const WD    = '#5a4a2a';
const WD_L  = '#7a6a3a';
const GRN   = '#3B6D11';
const FUR   = '#c8a878';  // fur trim
const FUR_D = '#9a7850';
const RIV   = '#8a7a58';

const LY  = 130;
const LLX = 55;
const RLX = 65;
const LW  = 7;

function Stud({ cx, cy, r = 1.4 }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={LTH_D} />
      <circle cx={cx - 0.3} cy={cy - 0.3} r={r * 0.45} fill={RIV} />
    </>
  );
}

function LeafImprint({ cx, cy }) {
  /* Pressed leaf imprint on leather */
  return (
    <g opacity="0.45">
      <path d={`M${cx},${cy-5} Q${cx-2},${cy} ${cx},${cy+5} Q${cx+2},${cy} ${cx},${cy-5}Z`}
        fill="none" stroke={GRN} strokeWidth="0.8" />
      <line x1={cx} y1={cy-5} x2={cx} y2={cy+5}
        stroke={GRN} strokeWidth="0.5" />
      <line x1={cx-2} y1={cy} x2={cx+2} y2={cy}
        stroke={GRN} strokeWidth="0.4" />
    </g>
  );
}

export default function ForestRangerBootsLegs() {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 120 200" overflow="visible"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

        <g style={{
          animationName: 'frbl-idle',
          animationDuration: '3.2s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}>

          {/* ══════════ LEFT BOOT ══════════ */}

          {/* ── Calf leather wrap (upper boot) — y=LY+0 to LY+32 ── */}
          {/* Shadow half */}
          <path d={`M${LLX-LW},${LY} Q${LLX-LW-2},${LY+16} ${LLX-LW-1},${LY+32} L${LLX},${LY+32} Q${LLX-1},${LY+16} ${LLX},${LY}Z`}
            fill={LTH_D} />
          {/* Lit half */}
          <path d={`M${LLX},${LY} L${LLX+LW},${LY} Q${LLX+LW+1},${LY+16} ${LLX+LW},${LY+32} L${LLX},${LY+32} Q${LLX+1},${LY+16} ${LLX},${LY}Z`}
            fill={LTH_L} />
          {/* Front seam */}
          <line x1={LLX} y1={LY} x2={LLX} y2={LY+32} stroke={LTH_D} strokeWidth="0.8" />

          {/* Lacing on front of calf */}
          <g stroke={LTH_H} strokeWidth="0.7" opacity="0.7">
            {[6, 12, 18, 24].map(dy => (
              <React.Fragment key={dy}>
                <line x1={LLX-2} y1={LY+dy} x2={LLX-4} y2={LY+dy+2} />
                <line x1={LLX+2} y1={LY+dy} x2={LLX+4} y2={LY+dy+2} />
                <line x1={LLX-4} y1={LY+dy+2} x2={LLX+4} y2={LY+dy+2} />
              </React.Fragment>
            ))}
          </g>

          {/* Fur trim at top of boot */}
          <path d={`M${LLX-LW-1},${LY+2} Q${LLX},${LY-1} ${LLX+LW+1},${LY+2} L${LLX+LW+1},${LY+7} Q${LLX},${LY+4} ${LLX-LW-1},${LY+7}Z`}
            fill={FUR_D} />
          <path d={`M${LLX-LW-1},${LY+2} Q${LLX},${LY-1} ${LLX+LW+1},${LY+2} L${LLX+LW+1},${LY+5} Q${LLX},${LY+2} ${LLX-LW-1},${LY+5}Z`}
            fill={FUR} />
          {/* Fur texture strokes */}
          <g stroke={FUR_D} strokeWidth="0.6" opacity="0.6">
            {[-5,-2,0,2,5].map(dx => (
              <line key={dx} x1={LLX+dx} y1={LY} x2={LLX+dx} y2={LY+5} />
            ))}
          </g>

          {/* ── Shin section (lower boot) — LY+32 to LY+60 ── */}
          {/* Shadow half */}
          <path d={`M${LLX-LW-1},${LY+30} Q${LLX-LW-2},${LY+46} ${LLX-LW-1},${LY+61} L${LLX},${LY+61} Q${LLX-1},${LY+46} ${LLX},${LY+30}Z`}
            fill={LTH_D} />
          {/* Lit half */}
          <path d={`M${LLX},${LY+30} L${LLX+LW},${LY+30} Q${LLX+LW+1},${LY+46} ${LLX+LW},${LY+61} L${LLX},${LY+61} Q${LLX+1},${LY+46} ${LLX},${LY+30}Z`}
            fill={LTH_M} />

          {/* Leaf imprint on shin */}
          <LeafImprint cx={LLX+3} cy={LY+47} />

          {/* ── Wooden Toe Guard ── */}
          <path d={`M${LLX-LW-1},${LY+61} Q${LLX-LW-3},${LY+66} ${LLX-LW},${LY+69} Q${LLX-1},${LY+71} ${LLX+2},${LY+70} L${LLX+LW},${LY+61}Z`}
            fill={WD} />
          <path d={`M${LLX-LW},${LY+61} Q${LLX-LW-2},${LY+65} ${LLX-LW+1},${LY+68} Q${LLX},${LY+70} ${LLX+2},${LY+69} L${LLX+LW-1},${LY+61}Z`}
            fill={WD_L} />
          {/* Toe guard shadow half */}
          <path d={`M${LLX-LW},${LY+61} Q${LLX-LW-2},${LY+65} ${LLX-LW+1},${LY+68} L${LLX},${LY+68} Q${LLX-1},${LY+65} ${LLX},${LY+61}Z`}
            fill={WD} opacity="0.5" />
          {/* Wood grain on toe guard */}
          <line x1={LLX-2} y1={LY+62} x2={LLX-2} y2={LY+68} stroke={WD} strokeWidth="0.6" opacity="0.6" />
          <Stud cx={LLX} cy={LY+65} r={1.4} />


          {/* ══════════ RIGHT BOOT ══════════ */}

          {/* Shadow half */}
          <path d={`M${RLX-LW},${LY} Q${RLX-LW-1},${LY+16} ${RLX-LW},${LY+32} L${RLX},${LY+32} Q${RLX-1},${LY+16} ${RLX},${LY}Z`}
            fill={LTH_D} />
          {/* Lit half */}
          <path d={`M${RLX},${LY} L${RLX+LW},${LY} Q${RLX+LW+2},${LY+16} ${RLX+LW+1},${LY+32} L${RLX},${LY+32} Q${RLX+1},${LY+16} ${RLX},${LY}Z`}
            fill={LTH_L} />
          <line x1={RLX} y1={LY} x2={RLX} y2={LY+32} stroke={LTH_D} strokeWidth="0.8" />

          {/* Right lacing */}
          <g stroke={LTH_H} strokeWidth="0.7" opacity="0.7">
            {[6, 12, 18, 24].map(dy => (
              <React.Fragment key={dy}>
                <line x1={RLX-2} y1={LY+dy} x2={RLX-4} y2={LY+dy+2} />
                <line x1={RLX+2} y1={LY+dy} x2={RLX+4} y2={LY+dy+2} />
                <line x1={RLX-4} y1={LY+dy+2} x2={RLX+4} y2={LY+dy+2} />
              </React.Fragment>
            ))}
          </g>

          {/* Right fur trim */}
          <path d={`M${RLX-LW-1},${LY+2} Q${RLX},${LY-1} ${RLX+LW+1},${LY+2} L${RLX+LW+1},${LY+7} Q${RLX},${LY+4} ${RLX-LW-1},${LY+7}Z`}
            fill={FUR_D} />
          <path d={`M${RLX-LW-1},${LY+2} Q${RLX},${LY-1} ${RLX+LW+1},${LY+2} L${RLX+LW+1},${LY+5} Q${RLX},${LY+2} ${RLX-LW-1},${LY+5}Z`}
            fill={FUR} />
          <g stroke={FUR_D} strokeWidth="0.6" opacity="0.6">
            {[-5,-2,0,2,5].map(dx => (
              <line key={dx} x1={RLX+dx} y1={LY} x2={RLX+dx} y2={LY+5} />
            ))}
          </g>

          {/* Right shin */}
          <path d={`M${RLX-LW},${LY+30} Q${RLX-LW-1},${LY+46} ${RLX-LW},${LY+61} L${RLX},${LY+61} Q${RLX-1},${LY+46} ${RLX},${LY+30}Z`}
            fill={LTH_D} />
          <path d={`M${RLX},${LY+30} L${RLX+LW+1},${LY+30} Q${RLX+LW+2},${LY+46} ${RLX+LW+1},${LY+61} L${RLX},${LY+61} Q${RLX+1},${LY+46} ${RLX},${LY+30}Z`}
            fill={LTH_M} />

          {/* Leaf imprint right shin */}
          <LeafImprint cx={RLX-2} cy={LY+47} />

          {/* Right toe guard */}
          <path d={`M${RLX-LW},${LY+61} Q${RLX-LW-1},${LY+66} ${RLX-LW+1},${LY+69} Q${RLX+1},${LY+71} ${RLX+3},${LY+71} L${RLX+LW+1},${LY+61}Z`}
            fill={WD} />
          <path d={`M${RLX-LW+1},${LY+61} Q${RLX-LW},${LY+65} ${RLX-LW+2},${LY+68} Q${RLX+2},${LY+70} ${RLX+3},${LY+70} L${RLX+LW},${LY+61}Z`}
            fill={WD_L} />
          <line x1={RLX+2} y1={LY+62} x2={RLX+2} y2={LY+68} stroke={WD} strokeWidth="0.6" opacity="0.6" />
          <Stud cx={RLX+1} cy={LY+66} r={1.4} />

        </g>
      </svg>
    </>
  );
}
