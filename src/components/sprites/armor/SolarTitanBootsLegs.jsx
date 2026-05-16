import React from 'react';

/* Solar Titan — Boots & Legs
   Radiant gold plate greaves with solar-rune knee discs, engraved ray
   patterns on the shin, golden sabatons with sun motif, amber glow trim.

   viewBox 0 0 120 200 — position:absolute over base. */

const css = `
@keyframes stbl-idle {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-1px); }
}
@keyframes stbl-glow {
  0%, 100% { opacity: 0.5; }
  50%       { opacity: 1; }
}
`;

const GD    = '#c9952a';
const GD_L  = '#e8b84a';
const GD_H  = '#ffd870';
const GD_D  = '#8a6010';
const GD_DD = '#4a3008';
const AMB   = '#ff9a20';
const AMB_L = '#ffcc60';

const LY  = 130;
const LLX = 55;
const RLX = 65;
const LW  = 7;

function GoldStud({ cx, cy, r = 1.3 }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={GD_DD} />
      <circle cx={cx-0.3} cy={cy-0.3} r={r*0.45} fill={GD_H} />
    </>
  );
}

export default function SolarTitanBootsLegs() {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 120 200" overflow="visible"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

        <g style={{
          animationName: 'stbl-idle',
          animationDuration: '3.2s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}>

          {/* ══════════ LEFT GREAVE ══════════ */}

          {/* ── Warm fabric at knee ── */}
          <path d={`M${LLX-LW-1},${LY+2} Q${LLX},${LY-1} ${LLX+LW+1},${LY+2} L${LLX+LW+1},${LY+6} Q${LLX},${LY+3} ${LLX-LW-1},${LY+6}Z`}
            fill={AMB_L} opacity="0.25" />

          {/* ── Knee cop with solar rune ── */}
          {/* Shadow */}
          <path d={`M${LLX-LW-2},${LY+2} Q${LLX-LW-2},${LY-1} ${LLX},${LY-2} Q${LLX+LW+2},${LY-1} ${LLX+LW+2},${LY+2} L${LLX+LW+2},${LY+13} Q${LLX+LW},${LY+16} ${LLX},${LY+15} Q${LLX-LW},${LY+16} ${LLX-LW-2},${LY+13}Z`}
            fill={GD_DD} />
          {/* Face */}
          <path d={`M${LLX-LW-1},${LY+2} Q${LLX-LW-1},${LY-1} ${LLX},${LY-2} Q${LLX+LW+1},${LY-1} ${LLX+LW+1},${LY+2} L${LLX+LW+1},${LY+12} Q${LLX+LW},${LY+15} ${LLX},${LY+14} Q${LLX-LW},${LY+15} ${LLX-LW-1},${LY+12}Z`}
            fill={GD_D} />
          {/* Lit upper */}
          <path d={`M${LLX-LW},${LY+2} Q${LLX-LW},${LY} ${LLX},${LY-1} Q${LLX+LW},${LY} ${LLX+LW},${LY+2} L${LLX+LW},${LY+8} Q${LLX},${LY+9} ${LLX-LW},${LY+8}Z`}
            fill={GD} />
          {/* Top highlight */}
          <path d={`M${LLX-LW},${LY} Q${LLX},${LY-1} ${LLX+LW},${LY} L${LLX+LW},${LY+1} Q${LLX},${LY} ${LLX-LW},${LY+1}Z`}
            fill={GD_H} opacity="0.6" />
          {/* Solar rune disc on knee */}
          <circle cx={LLX} cy={LY+7} r="3.5" fill={GD_DD} />
          <circle cx={LLX} cy={LY+7} r="2.6" fill={GD_D} />
          <circle cx={LLX} cy={LY+7} r="1.7" fill={AMB}
            style={{ animationName:'stbl-glow', animationDuration:'2.4s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />
          <circle cx={LLX} cy={LY+7} r="0.9" fill={AMB_L} opacity="0.8" />

          {/* ── Shin plate y=LY+12 to LY+43 ── */}
          {/* Shadow */}
          <path d={`M${LLX-LW-1},${LY+12} Q${LLX-LW-2},${LY+28} ${LLX-LW-1},${LY+44} L${LLX},${LY+44} Q${LLX-1},${LY+28} ${LLX},${LY+12}Z`}
            fill={GD_D} />
          {/* Lit */}
          <path d={`M${LLX},${LY+12} L${LLX+LW},${LY+12} Q${LLX+LW+1},${LY+28} ${LLX+LW},${LY+44} L${LLX},${LY+44} Q${LLX+1},${LY+28} ${LLX},${LY+12}Z`}
            fill={GD_L} />
          {/* Ridge */}
          <line x1={LLX} y1={LY+13} x2={LLX} y2={LY+43} stroke={GD_H} strokeWidth="0.9" opacity="0.45" />
          {/* Top highlight */}
          <path d={`M${LLX-LW-1},${LY+13} Q${LLX},${LY+12} ${LLX+LW},${LY+13} L${LLX+LW},${LY+14} Q${LLX},${LY+13} ${LLX-LW-1},${LY+14}Z`}
            fill={GD_H} opacity="0.45" />
          {/* Engraved ray lines on shin */}
          <g stroke={GD_H} strokeWidth="0.5" opacity="0.25">
            <path d={`M${LLX-LW+1},${LY+16} Q${LLX-LW},${LY+28} ${LLX-LW+1},${LY+40}`} fill="none"/>
            <path d={`M${LLX+LW-1},${LY+16} Q${LLX+LW},${LY+28} ${LLX+LW-1},${LY+40}`} fill="none"/>
          </g>
          {/* Mid band */}
          <rect x={LLX-LW-1} y={LY+28} width={LW*2+3} height="3.5" rx="0.5" fill={GD_DD} />
          <rect x={LLX-LW} y={LY+28.5} width={LW*2+1} height="2.5" rx="0.5" fill={GD_D} />
          {/* Amber rune on band */}
          <line x1={LLX-LW} y1={LY+29.8} x2={LLX+LW} y2={LY+29.8} stroke={AMB} strokeWidth="0.5" opacity="0.4"
            style={{ animationName:'stbl-glow', animationDuration:'3s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />
          <GoldStud cx={LLX-LW+1} cy={LY+30} r={1.1} />
          <GoldStud cx={LLX+LW-1} cy={LY+30} r={1.1} />

          {/* ── Lower greave y=LY+43 to LY+61 ── */}
          <path d={`M${LLX-LW-1},${LY+42} Q${LLX-LW-2},${LY+52} ${LLX-LW-1},${LY+62} L${LLX},${LY+62} Q${LLX-1},${LY+52} ${LLX},${LY+42}Z`}
            fill={GD_D} />
          <path d={`M${LLX},${LY+42} L${LLX+LW},${LY+42} Q${LLX+LW+1},${LY+52} ${LLX+LW},${LY+62} L${LLX},${LY+62} Q${LLX+1},${LY+52} ${LLX},${LY+42}Z`}
            fill={GD} />

          {/* ── Golden Sabaton ── */}
          <path d={`M${LLX-LW-2},${LY+61} Q${LLX-LW-4},${LY+66} ${LLX-LW-1},${LY+70} Q${LLX},${LY+73} ${LLX+4},${LY+72} L${LLX+LW+1},${LY+61}Z`}
            fill={GD_DD} />
          <path d={`M${LLX-LW-1},${LY+61} Q${LLX-LW-2},${LY+65} ${LLX-LW},${LY+69} Q${LLX+1},${LY+72} ${LLX+4},${LY+71} L${LLX+LW},${LY+61}Z`}
            fill={GD_D} />
          {/* Lit toe face */}
          <path d={`M${LLX-LW},${LY+61} Q${LLX-LW-1},${LY+64} ${LLX-LW+2},${LY+68} L${LLX+1},${LY+68} Q${LLX},${LY+64} ${LLX+1},${LY+61}Z`}
            fill={GD_L} opacity="0.7" />
          {/* Toe highlight */}
          <path d={`M${LLX-LW},${LY+63} Q${LLX},${LY+67} ${LLX+4},${LY+70}`}
            fill="none" stroke={GD_H} strokeWidth="0.7" opacity="0.5" />
          {/* Sun motif on toe */}
          <circle cx={LLX} cy={LY+66} r="2.2" fill={GD_DD} />
          <circle cx={LLX} cy={LY+66} r="1.5" fill={GD_D} />
          <circle cx={LLX} cy={LY+66} r="0.8" fill={AMB} opacity="0.7"
            style={{ animationName:'stbl-glow', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />


          {/* ══════════ RIGHT GREAVE ══════════ */}

          <path d={`M${RLX-LW-1},${LY+2} Q${RLX},${LY-1} ${RLX+LW+1},${LY+2} L${RLX+LW+1},${LY+6} Q${RLX},${LY+3} ${RLX-LW-1},${LY+6}Z`}
            fill={AMB_L} opacity="0.25" />

          {/* Knee cop right */}
          <path d={`M${RLX-LW-2},${LY+2} Q${RLX-LW-2},${LY-1} ${RLX},${LY-2} Q${RLX+LW+2},${LY-1} ${RLX+LW+2},${LY+2} L${RLX+LW+2},${LY+13} Q${RLX+LW},${LY+16} ${RLX},${LY+15} Q${RLX-LW},${LY+16} ${RLX-LW-2},${LY+13}Z`}
            fill={GD_DD} />
          <path d={`M${RLX-LW-1},${LY+2} Q${RLX-LW-1},${LY-1} ${RLX},${LY-2} Q${RLX+LW+1},${LY-1} ${RLX+LW+1},${LY+2} L${RLX+LW+1},${LY+12} Q${RLX+LW},${LY+15} ${RLX},${LY+14} Q${RLX-LW},${LY+15} ${RLX-LW-1},${LY+12}Z`}
            fill={GD_D} />
          <path d={`M${RLX-LW},${LY+2} Q${RLX-LW},${LY} ${RLX},${LY-1} Q${RLX+LW},${LY} ${RLX+LW},${LY+2} L${RLX+LW},${LY+8} Q${RLX},${LY+9} ${RLX-LW},${LY+8}Z`}
            fill={GD} />
          <path d={`M${RLX-LW},${LY} Q${RLX},${LY-1} ${RLX+LW},${LY} L${RLX+LW},${LY+1} Q${RLX},${LY} ${RLX-LW},${LY+1}Z`}
            fill={GD_H} opacity="0.6" />
          <circle cx={RLX} cy={LY+7} r="3.5" fill={GD_DD} />
          <circle cx={RLX} cy={LY+7} r="2.6" fill={GD_D} />
          <circle cx={RLX} cy={LY+7} r="1.7" fill={AMB}
            style={{ animationName:'stbl-glow', animationDuration:'2.4s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite', animationDelay:'0.3s' }} />
          <circle cx={RLX} cy={LY+7} r="0.9" fill={AMB_L} opacity="0.8" />

          {/* Shin right */}
          <path d={`M${RLX-LW},${LY+12} Q${RLX-LW-1},${LY+28} ${RLX-LW},${LY+44} L${RLX},${LY+44} Q${RLX-1},${LY+28} ${RLX},${LY+12}Z`}
            fill={GD_D} />
          <path d={`M${RLX},${LY+12} L${RLX+LW+1},${LY+12} Q${RLX+LW+2},${LY+28} ${RLX+LW+1},${LY+44} L${RLX},${LY+44} Q${RLX+1},${LY+28} ${RLX},${LY+12}Z`}
            fill={GD_L} />
          <line x1={RLX} y1={LY+13} x2={RLX} y2={LY+43} stroke={GD_H} strokeWidth="0.9" opacity="0.45" />
          <path d={`M${RLX-LW},${LY+13} Q${RLX},${LY+12} ${RLX+LW+1},${LY+13} L${RLX+LW+1},${LY+14} Q${RLX},${LY+13} ${RLX-LW},${LY+14}Z`}
            fill={GD_H} opacity="0.45" />
          <g stroke={GD_H} strokeWidth="0.5" opacity="0.25">
            <path d={`M${RLX-LW+1},${LY+16} Q${RLX-LW},${LY+28} ${RLX-LW+1},${LY+40}`} fill="none"/>
            <path d={`M${RLX+LW},${LY+16} Q${RLX+LW+1},${LY+28} ${RLX+LW},${LY+40}`} fill="none"/>
          </g>
          <rect x={RLX-LW} y={LY+28} width={LW*2+3} height="3.5" rx="0.5" fill={GD_DD} />
          <rect x={RLX-LW+1} y={LY+28.5} width={LW*2+1} height="2.5" rx="0.5" fill={GD_D} />
          <line x1={RLX-LW+1} y1={LY+29.8} x2={RLX+LW+1} y2={LY+29.8} stroke={AMB} strokeWidth="0.5" opacity="0.4"
            style={{ animationName:'stbl-glow', animationDuration:'3s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite', animationDelay:'0.5s' }} />
          <GoldStud cx={RLX-LW+1} cy={LY+30} r={1.1} />
          <GoldStud cx={RLX+LW+1} cy={LY+30} r={1.1} />

          {/* Lower greave right */}
          <path d={`M${RLX-LW},${LY+42} Q${RLX-LW-1},${LY+52} ${RLX-LW},${LY+62} L${RLX},${LY+62} Q${RLX-1},${LY+52} ${RLX},${LY+42}Z`}
            fill={GD_D} />
          <path d={`M${RLX},${LY+42} L${RLX+LW+1},${LY+42} Q${RLX+LW+2},${LY+52} ${RLX+LW+1},${LY+62} L${RLX},${LY+62} Q${RLX+1},${LY+52} ${RLX},${LY+42}Z`}
            fill={GD} />

          {/* Right sabaton */}
          <path d={`M${RLX-LW},${LY+61} Q${RLX-LW-1},${LY+66} ${RLX-LW+1},${LY+70} Q${RLX+2},${LY+73} ${RLX+5},${LY+72} L${RLX+LW+2},${LY+61}Z`}
            fill={GD_DD} />
          <path d={`M${RLX-LW+1},${LY+61} Q${RLX-LW},${LY+65} ${RLX-LW+2},${LY+69} Q${RLX+3},${LY+72} ${RLX+5},${LY+71} L${RLX+LW+1},${LY+61}Z`}
            fill={GD_D} />
          <path d={`M${RLX-LW+1},${LY+61} Q${RLX-LW},${LY+64} ${RLX-LW+3},${LY+68} L${RLX+2},${LY+68} Q${RLX+1},${LY+64} ${RLX+2},${LY+61}Z`}
            fill={GD_L} opacity="0.7" />
          <path d={`M${RLX-LW+1},${LY+63} Q${RLX+2},${LY+67} ${RLX+5},${LY+70}`}
            fill="none" stroke={GD_H} strokeWidth="0.7" opacity="0.5" />
          <circle cx={RLX+1} cy={LY+66} r="2.2" fill={GD_DD} />
          <circle cx={RLX+1} cy={LY+66} r="1.5" fill={GD_D} />
          <circle cx={RLX+1} cy={LY+66} r="0.8" fill={AMB} opacity="0.7"
            style={{ animationName:'stbl-glow', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite', animationDelay:'0.3s' }} />

        </g>
      </svg>
    </>
  );
}
