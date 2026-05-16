import React from 'react';

/* Iron Scraps — Boots & Legs
   Iron shin guards that don't quite fit, leather straps wrapping calves,
   rough iron toe caps.
   viewBox 0 0 120 200 — position:absolute over base. */

const css = `
@keyframes isbl-idle {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-1px); }
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

/* Leg geometry — matches PlayerBase tier 2-3 reference
   LY = 130 (shorts bottom / thigh top)
   Knee at LY+40 = 170
   Shin bottom at LY+60 = 190
   Left leg center x ≈ 55  (ls=5, 60-5=55)
   Right leg center x ≈ 65 (60+5=65)
   Leg half-width ≈ 6-7px                         */
const LY  = 130;
const LLX = 55;  // left leg center
const RLX = 65;  // right leg center
const LW  = 7;   // leg half-width

function Rivet({ cx, cy, r = 1.6 }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={FE_S} />
      <circle cx={cx - 0.3} cy={cy - 0.3} r={r * 0.45} fill={RIV} />
    </>
  );
}

export default function IronScrapsBootsLegs() {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 120 200" overflow="visible"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

        <g style={{
          animationName: 'isbl-idle',
          animationDuration: '3s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}>

          {/* ══════════════════════════════════════
              LEFT LEG
          ══════════════════════════════════════ */}

          {/* ── LEATHER CALF WRAPS (on upper shin / lower thigh) ── */}
          {/* These straps sit on the calf area y≈148-168 */}
          <g stroke={LTH} strokeWidth="2.8" strokeLinecap="round">
            <line x1={LLX-LW-1} y1={LY+22} x2={LLX+LW+1} y2={LY+22} />
            <line x1={LLX-LW}   y1={LY+29} x2={LLX+LW+1} y2={LY+29} />
            <line x1={LLX-LW}   y1={LY+36} x2={LLX+LW}   y2={LY+36} />
          </g>
          {/* Strap highlight */}
          <g stroke={LTH_H} strokeWidth="0.7" strokeLinecap="round" opacity="0.4">
            <line x1={LLX-LW-1} y1={LY+22} x2={LLX+LW+1} y2={LY+22} />
            <line x1={LLX-LW}   y1={LY+29} x2={LLX+LW+1} y2={LY+29} />
          </g>
          {/* Strap buckle on left calf */}
          <rect x={LLX-2} y={LY+20} width="5" height="4" rx="0.5" fill={LTH_D} />
          <rect x={LLX-1.5} y={LY+20.5} width="4" height="3" rx="0.5" fill={LTH} />

          {/* ── LEFT SHIN GUARD ──
              Iron plate on front of shin — slightly too wide,
              a bit tilted/shifted (doesn't fit perfectly)     */}
          {/* Guard shadow/back */}
          <path
            d={`M${LLX-LW-2},${LY+40} Q${LLX-LW-3},${LY+50} ${LLX-LW-1},${LY+61} L${LLX+LW+1},${LY+61} Q${LLX+LW+2},${LY+50} ${LLX+LW+1},${LY+40}Z`}
            fill={FE_S}
          />
          {/* Guard lit face — shifted 1px left (doesn't fit right) */}
          <path
            d={`M${LLX-LW-1},${LY+40} Q${LLX-LW-2},${LY+50} ${LLX-LW},${LY+61} L${LLX+LW},${LY+61} Q${LLX+LW+1},${LY+50} ${LLX+LW},${LY+40}Z`}
            fill={FE}
          />
          {/* Shadow left side of guard */}
          <path
            d={`M${LLX-LW-1},${LY+40} Q${LLX-LW-2},${LY+50} ${LLX-LW},${LY+61} L${LLX-1},${LY+61} Q${LLX},${LY+50} ${LLX},${LY+40}Z`}
            fill={FE_D}
          />
          {/* Highlight edge top-right */}
          <path
            d={`M${LLX+LW},${LY+40} L${LLX+LW+1},${LY+41} L${LLX+LW+1},${LY+43} L${LLX+LW},${LY+42}Z`}
            fill={FE_H} opacity="0.6"
          />
          {/* Top edge highlight */}
          <path d={`M${LLX-LW-1},${LY+40} L${LLX+LW},${LY+40} L${LLX+LW},${LY+42} L${LLX-LW-1},${LY+42}Z`}
            fill={FE_H} opacity="0.35" />

          {/* Scratch lines on left shin guard */}
          <g stroke={FE_H} strokeWidth="0.4" opacity="0.45">
            <line x1={LLX-2} y1={LY+42} x2={LLX-1} y2={LY+59} />
            <line x1={LLX+2} y1={LY+42} x2={LLX+2} y2={LY+60} />
          </g>
          {/* Diagonal gouge mark */}
          <path d={`M${LLX-3},${LY+47} L${LLX+1},${LY+53}`}
            stroke={FE_S} strokeWidth="1" opacity="0.7" />

          {/* Shin guard rivets */}
          <Rivet cx={LLX-LW} cy={LY+43} r={1.5} />
          <Rivet cx={LLX+LW-1} cy={LY+42} r={1.5} />
          <Rivet cx={LLX-LW} cy={LY+59} r={1.5} />
          <Rivet cx={LLX+LW-1} cy={LY+59} r={1.5} />

          {/* Leather strap holding shin guard on — crosses over center */}
          <path d={`M${LLX-LW-2},${LY+50} Q${LLX},${LY+48} ${LLX+LW+2},${LY+50}`}
            fill="none" stroke={LTH} strokeWidth="2.5" strokeLinecap="round" />
          <path d={`M${LLX-LW-2},${LY+50} Q${LLX},${LY+48} ${LLX+LW+2},${LY+50}`}
            fill="none" stroke={LTH_H} strokeWidth="0.7" opacity="0.35" strokeLinecap="round" />

          {/* ── LEFT TOE CAP ── */}
          {/* Rough iron plate on toe */}
          <path d={`M${LLX-LW-1},${LY+61} Q${LLX-LW-3},${LY+66} ${LLX-LW},${LY+69} Q${LLX-2},${LY+71} ${LLX+2},${LY+70} L${LLX+LW},${LY+61}Z`}
            fill={FE_S}
          />
          <path d={`M${LLX-LW},${LY+61} Q${LLX-LW-2},${LY+65} ${LLX-LW+1},${LY+68} Q${LLX-1},${LY+70} ${LLX+2},${LY+69} L${LLX+LW-1},${LY+61}Z`}
            fill={FE}
          />
          {/* Toe cap shadow left */}
          <path d={`M${LLX-LW},${LY+61} Q${LLX-LW-2},${LY+65} ${LLX-LW+1},${LY+68} L${LLX},${LY+68} Q${LLX-1},${LY+65} ${LLX},${LY+61}Z`}
            fill={FE_D}
          />
          {/* Toe rivet */}
          <Rivet cx={LLX} cy={LY+65} r={1.5} />
          {/* Jagged rough edge on toe cap */}
          <path d={`M${LLX-2},${LY+69} L${LLX-1},${LY+70} L${LLX+1},${LY+69} L${LLX+2},${LY+70}`}
            fill="none" stroke={FE_S} strokeWidth="0.8" />


          {/* ══════════════════════════════════════
              RIGHT LEG
          ══════════════════════════════════════ */}

          {/* ── LEATHER CALF WRAPS (right) ── */}
          <g stroke={LTH} strokeWidth="2.8" strokeLinecap="round">
            <line x1={RLX-LW-1} y1={LY+22} x2={RLX+LW+1} y2={LY+22} />
            <line x1={RLX-LW-1} y1={LY+29} x2={RLX+LW}   y2={LY+29} />
            <line x1={RLX-LW}   y1={LY+36} x2={RLX+LW}   y2={LY+36} />
          </g>
          <g stroke={LTH_H} strokeWidth="0.7" strokeLinecap="round" opacity="0.35">
            <line x1={RLX-LW-1} y1={LY+22} x2={RLX+LW+1} y2={LY+22} />
            <line x1={RLX-LW-1} y1={LY+29} x2={RLX+LW}   y2={LY+29} />
          </g>
          {/* Right buckle — slightly different position (mismatched) */}
          <rect x={RLX-3} y={LY+27} width="5" height="4" rx="0.5" fill={LTH_D} />
          <rect x={RLX-2.5} y={LY+27.5} width="4" height="3" rx="0.5" fill={LTH} />

          {/* ── RIGHT SHIN GUARD — slightly different fit, shifted right ── */}
          <path
            d={`M${RLX-LW-1},${LY+40} Q${RLX-LW-1},${LY+50} ${RLX-LW+1},${LY+62} L${RLX+LW+2},${LY+62} Q${RLX+LW+3},${LY+50} ${RLX+LW+2},${LY+40}Z`}
            fill={FE_S}
          />
          <path
            d={`M${RLX-LW},${LY+40} Q${RLX-LW},${LY+50} ${RLX-LW+1},${LY+62} L${RLX+LW+1},${LY+62} Q${RLX+LW+2},${LY+50} ${RLX+LW+1},${LY+40}Z`}
            fill={FE}
          />
          {/* Shadow right side of guard */}
          <path
            d={`M${RLX+1},${LY+40} Q${RLX+1},${LY+50} ${RLX+1},${LY+62} L${RLX+LW+1},${LY+62} Q${RLX+LW+2},${LY+50} ${RLX+LW+1},${LY+40}Z`}
            fill={FE_D}
          />
          {/* Top highlight */}
          <path d={`M${RLX-LW},${LY+40} L${RLX+LW+1},${LY+40} L${RLX+LW+1},${LY+42} L${RLX-LW},${LY+42}Z`}
            fill={FE_H} opacity="0.3" />

          {/* Scratch marks */}
          <g stroke={FE_H} strokeWidth="0.4" opacity="0.4">
            <line x1={RLX-1} y1={LY+42} x2={RLX-1} y2={LY+60} />
            <line x1={RLX+3} y1={LY+43} x2={RLX+2} y2={LY+61} />
          </g>

          {/* Right shin guard rivets */}
          <Rivet cx={RLX-LW+1} cy={LY+43} r={1.5} />
          <Rivet cx={RLX+LW+1} cy={LY+43} r={1.5} />
          <Rivet cx={RLX-LW+1} cy={LY+60} r={1.5} />
          <Rivet cx={RLX+LW+1} cy={LY+60} r={1.5} />

          {/* Strap */}
          <path d={`M${RLX-LW-1},${LY+51} Q${RLX},${LY+49} ${RLX+LW+2},${LY+51}`}
            fill="none" stroke={LTH} strokeWidth="2.5" strokeLinecap="round" />
          <path d={`M${RLX-LW-1},${LY+51} Q${RLX},${LY+49} ${RLX+LW+2},${LY+51}`}
            fill="none" stroke={LTH_H} strokeWidth="0.7" opacity="0.3" strokeLinecap="round" />

          {/* ── RIGHT TOE CAP ── */}
          <path d={`M${RLX-LW},${LY+62} Q${RLX-LW-1},${LY+66} ${RLX-LW+1},${LY+69} Q${RLX},${LY+71} ${RLX+3},${LY+71} L${RLX+LW+1},${LY+62}Z`}
            fill={FE_S}
          />
          <path d={`M${RLX-LW+1},${LY+62} Q${RLX-LW},${LY+66} ${RLX-LW+2},${LY+68} Q${RLX+1},${LY+70} ${RLX+3},${LY+70} L${RLX+LW},${LY+62}Z`}
            fill={FE}
          />
          <path d={`M${RLX+1},${LY+62} Q${RLX+1},${LY+66} ${RLX+2},${LY+68} L${RLX+LW},${LY+68} Q${RLX+LW},${LY+65} ${RLX+LW},${LY+62}Z`}
            fill={FE_D}
          />
          <Rivet cx={RLX+1} cy={LY+66} r={1.5} />
          <path d={`M${RLX-1},${LY+70} L${RLX},${LY+71} L${RLX+2},${LY+70} L${RLX+3},${LY+71}`}
            fill="none" stroke={FE_S} strokeWidth="0.8" />

        </g>
      </svg>
    </>
  );
}
