import React from 'react';

/* Void Reaper — Boots & Legs
   Jagged black plate greaves with void crack energy lines, pointed
   shadow-claw toe guards, and pulsing purple seam glow.

   viewBox 0 0 120 200 — position:absolute over base. */

const css = `
@keyframes vrbl-idle {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-1px); }
}
@keyframes vrbl-pulse {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1; }
}
`;

const BK    = '#0a0a12';
const BK_M  = '#12121e';
const BK_L  = '#1e1e30';
const BK_H  = '#2a2a44';
const PRP   = '#7F77DD';
const PRP_D = '#534AB7';

const LY  = 130;
const LLX = 55;
const RLX = 65;
const LW  = 7;

export default function VoidReaperBootsLegs() {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 120 200" overflow="visible"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

        <g style={{
          animationName: 'vrbl-idle',
          animationDuration: '3.6s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}>

          {/* ══════════ LEFT GREAVE ══════════ */}

          {/* ── Upper plate (thigh) y=LY to LY+32 ── */}
          {/* Shadow */}
          <path d={`M${LLX-LW-1},${LY} Q${LLX-LW-2},${LY+16} ${LLX-LW-1},${LY+32} L${LLX},${LY+32} Q${LLX-1},${LY+16} ${LLX},${LY}Z`}
            fill={BK} />
          {/* Lit */}
          <path d={`M${LLX},${LY} L${LLX+LW},${LY} Q${LLX+LW+1},${LY+16} ${LLX+LW},${LY+32} L${LLX},${LY+32} Q${LLX+1},${LY+16} ${LLX},${LY}Z`}
            fill={BK_M} />
          {/* Top jagged edge */}
          <path d={`M${LLX-LW-1},${LY+2} L${LLX-LW+1},${LY} L${LLX-LW+3},${LY+3} L${LLX},${LY-1} L${LLX+LW-2},${LY+3} L${LLX+LW},${LY} L${LLX+LW+1},${LY+2}`}
            fill="none" stroke={PRP} strokeWidth="0.7" opacity="0.5"
            style={{ animationName:'vrbl-pulse', animationDuration:'2.5s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />
          {/* Vertical crack */}
          <path d={`M${LLX+2},${LY+4} L${LLX},${LY+12} L${LLX+3},${LY+9} L${LLX+1},${LY+22}`}
            fill="none" stroke={PRP} strokeWidth="0.7" strokeLinecap="round" opacity="0.7"
            style={{ animationName:'vrbl-pulse', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />
          {/* Front ridge glow */}
          <line x1={LLX} y1={LY} x2={LLX} y2={LY+32} stroke={BK_H} strokeWidth="0.8" />
          {/* Top highlight */}
          <path d={`M${LLX-LW-1},${LY+1} Q${LLX},${LY} ${LLX+LW},${LY+1} L${LLX+LW},${LY+2} Q${LLX},${LY+1} ${LLX-LW-1},${LY+2}Z`}
            fill={BK_H} opacity="0.5" />
          {/* Mid band */}
          <rect x={LLX-LW-1} y={LY+16} width={LW*2+3} height="3" rx="0.3" fill={BK} />
          <rect x={LLX-LW} y={LY+16.5} width={LW*2+1} height="2" rx="0.3" fill={BK_L} />
          <line x1={LLX-LW} y1={LY+17.5} x2={LLX+LW} y2={LY+17.5} stroke={PRP_D} strokeWidth="0.5" opacity="0.4"
            style={{ animationName:'vrbl-pulse', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />

          {/* ── Lower plate (shin) y=LY+30 to LY+60 ── */}
          <path d={`M${LLX-LW-1},${LY+30} Q${LLX-LW-2},${LY+46} ${LLX-LW-1},${LY+61} L${LLX},${LY+61} Q${LLX-1},${LY+46} ${LLX},${LY+30}Z`}
            fill={BK} />
          <path d={`M${LLX},${LY+30} L${LLX+LW},${LY+30} Q${LLX+LW+1},${LY+46} ${LLX+LW},${LY+61} L${LLX},${LY+61} Q${LLX+1},${LY+46} ${LLX},${LY+30}Z`}
            fill={BK_M} />
          <line x1={LLX} y1={LY+30} x2={LLX} y2={LY+60} stroke={BK_H} strokeWidth="0.8" />
          {/* Crack on shin */}
          <path d={`M${LLX-2},${LY+36} L${LLX-4},${LY+44} L${LLX-1},${LY+41} L${LLX-3},${LY+54}`}
            fill="none" stroke={PRP} strokeWidth="0.7" strokeLinecap="round" opacity="0.65"
            style={{ animationName:'vrbl-pulse', animationDuration:'3s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite', animationDelay:'0.3s' }} />
          {/* Purple seam glow at mid */}
          <line x1={LLX-LW-1} y1={LY+45} x2={LLX+LW} y2={LY+45} stroke={PRP_D} strokeWidth="0.6" opacity="0.35"
            style={{ animationName:'vrbl-pulse', animationDuration:'2.5s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />

          {/* ── Shadow-claw toe guard ── */}
          <path d={`M${LLX-LW-2},${LY+60} Q${LLX-LW-5},${LY+66} ${LLX-LW-2},${LY+72} Q${LLX-1},${LY+74} ${LLX+3},${LY+72} L${LLX+LW+1},${LY+60}Z`}
            fill={BK} />
          <path d={`M${LLX-LW-1},${LY+60} Q${LLX-LW-3},${LY+65} ${LLX-LW-1},${LY+70} Q${LLX},${LY+72} ${LLX+3},${LY+70} L${LLX+LW},${LY+60}Z`}
            fill={BK_M} />
          {/* Claw tip */}
          <path d={`M${LLX-LW-2},${LY+70} Q${LLX-LW-6},${LY+74} ${LLX-LW-4},${LY+76}`}
            fill="none" stroke={BK_L} strokeWidth="1.5" strokeLinecap="round" />
          {/* Purple toe glow */}
          <path d={`M${LLX-LW-1},${LY+62} Q${LLX},${LY+64} ${LLX+LW},${LY+62}`}
            fill="none" stroke={PRP} strokeWidth="0.7" opacity="0.4"
            style={{ animationName:'vrbl-pulse', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />


          {/* ══════════ RIGHT GREAVE ══════════ */}

          {/* Upper plate right */}
          <path d={`M${RLX-LW},${LY} Q${RLX-LW-1},${LY+16} ${RLX-LW},${LY+32} L${RLX},${LY+32} Q${RLX-1},${LY+16} ${RLX},${LY}Z`}
            fill={BK} />
          <path d={`M${RLX},${LY} L${RLX+LW+1},${LY} Q${RLX+LW+2},${LY+16} ${RLX+LW+1},${LY+32} L${RLX},${LY+32} Q${RLX+1},${LY+16} ${RLX},${LY}Z`}
            fill={BK_M} />
          <path d={`M${RLX-LW},${LY+2} L${RLX-LW+1},${LY} L${RLX-LW+3},${LY+3} L${RLX},${LY-1} L${RLX+LW-1},${LY+3} L${RLX+LW+1},${LY} L${RLX+LW+2},${LY+2}`}
            fill="none" stroke={PRP} strokeWidth="0.7" opacity="0.5"
            style={{ animationName:'vrbl-pulse', animationDuration:'2.5s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />
          <path d={`M${RLX-2},${LY+4} L${RLX},${LY+12} L${RLX-3},${LY+9} L${RLX-1},${LY+22}`}
            fill="none" stroke={PRP} strokeWidth="0.7" strokeLinecap="round" opacity="0.7"
            style={{ animationName:'vrbl-pulse', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite', animationDelay:'0.2s' }} />
          <line x1={RLX} y1={LY} x2={RLX} y2={LY+32} stroke={BK_H} strokeWidth="0.8" />
          <path d={`M${RLX-LW},${LY+1} Q${RLX},${LY} ${RLX+LW+1},${LY+1} L${RLX+LW+1},${LY+2} Q${RLX},${LY+1} ${RLX-LW},${LY+2}Z`}
            fill={BK_H} opacity="0.5" />
          <rect x={RLX-LW} y={LY+16} width={LW*2+3} height="3" rx="0.3" fill={BK} />
          <rect x={RLX-LW+1} y={LY+16.5} width={LW*2+1} height="2" rx="0.3" fill={BK_L} />
          <line x1={RLX-LW+1} y1={LY+17.5} x2={RLX+LW+1} y2={LY+17.5} stroke={PRP_D} strokeWidth="0.5" opacity="0.4"
            style={{ animationName:'vrbl-pulse', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />

          {/* Lower plate right */}
          <path d={`M${RLX-LW},${LY+30} Q${RLX-LW-1},${LY+46} ${RLX-LW},${LY+61} L${RLX},${LY+61} Q${RLX-1},${LY+46} ${RLX},${LY+30}Z`}
            fill={BK} />
          <path d={`M${RLX},${LY+30} L${RLX+LW+1},${LY+30} Q${RLX+LW+2},${LY+46} ${RLX+LW+1},${LY+61} L${RLX},${LY+61} Q${RLX+1},${LY+46} ${RLX},${LY+30}Z`}
            fill={BK_M} />
          <line x1={RLX} y1={LY+30} x2={RLX} y2={LY+60} stroke={BK_H} strokeWidth="0.8" />
          <path d={`M${RLX+2},${LY+36} L${RLX+4},${LY+44} L${RLX+1},${LY+41} L${RLX+3},${LY+54}`}
            fill="none" stroke={PRP} strokeWidth="0.7" strokeLinecap="round" opacity="0.65"
            style={{ animationName:'vrbl-pulse', animationDuration:'3s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite', animationDelay:'0.5s' }} />
          <line x1={RLX-LW} y1={LY+45} x2={RLX+LW+1} y2={LY+45} stroke={PRP_D} strokeWidth="0.6" opacity="0.35"
            style={{ animationName:'vrbl-pulse', animationDuration:'2.5s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite', animationDelay:'0.3s' }} />

          {/* Right toe guard */}
          <path d={`M${RLX-LW},${LY+60} Q${RLX-LW-1},${LY+66} ${RLX-LW+1},${LY+72} Q${RLX+1},${LY+74} ${RLX+4},${LY+72} L${RLX+LW+2},${LY+60}Z`}
            fill={BK} />
          <path d={`M${RLX-LW+1},${LY+60} Q${RLX-LW},${LY+65} ${RLX-LW+2},${LY+70} Q${RLX+2},${LY+72} ${RLX+4},${LY+70} L${RLX+LW+1},${LY+60}Z`}
            fill={BK_M} />
          {/* Right claw tip */}
          <path d={`M${RLX+LW+2},${LY+70} Q${RLX+LW+6},${LY+74} ${RLX+LW+4},${LY+76}`}
            fill="none" stroke={BK_L} strokeWidth="1.5" strokeLinecap="round" />
          <path d={`M${RLX-LW+1},${LY+62} Q${RLX+1},${LY+64} ${RLX+LW+1},${LY+62}`}
            fill="none" stroke={PRP} strokeWidth="0.7" opacity="0.4"
            style={{ animationName:'vrbl-pulse', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite', animationDelay:'0.2s' }} />

        </g>
      </svg>
    </>
  );
}
