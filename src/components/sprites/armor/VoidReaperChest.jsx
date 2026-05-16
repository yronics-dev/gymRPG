import React from 'react';

/* Void Reaper — Chest
   Jagged black plate cuirass with asymmetric void-cracked pauldrons,
   a ribbed sternum plate, a tattered shadow cloak visible at the back,
   and pulsing purple crack energy lines across the armour.

   Aligned to PlayerBase tier 3: SY=54, TY=112, LAX=42, RAX=78, TW=13
   viewBox 0 0 120 200 — position:absolute over base. */

const css = `
@keyframes vrc-idle {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-2px); }
}
@keyframes vrc-pulse {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.95; }
}
@keyframes vrc-cloak {
  0%, 100% { transform: skewX(0deg) scaleX(1); opacity: 0.35; }
  50%       { transform: skewX(2deg) scaleX(1.04); opacity: 0.55; }
}
`;

const BK    = '#0a0a12';
const BK_M  = '#12121e';
const BK_L  = '#1e1e30';
const BK_H  = '#2a2a44';
const PRP   = '#7F77DD';
const PRP_L = '#a89af0';
const PRP_D = '#534AB7';

const SY  = 54;
const TY  = 112;
const LAX = 42;
const RAX = 78;
const TW  = 13;

export default function VoidReaperChest() {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 120 200" overflow="visible"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

        <g style={{
          animationName: 'vrc-idle',
          animationDuration: '3.6s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}>

          {/* ══ SHADOW CLOAK (behind torso) ══ */}
          <g style={{
            animationName: 'vrc-cloak',
            animationDuration: '3s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            transformOrigin: `60px ${SY}px`,
          }}>
            <path d={`M30,${SY+10} Q${LAX},${SY+30} 28,${TY+20} Q40,${TY+15} ${LAX+5},${TY} Q${LAX},${SY+28} 32,${SY+8}Z`}
              fill={PRP_D} opacity="0.35" />
            <path d={`M90,${SY+10} Q${RAX},${SY+30} 92,${TY+20} Q80,${TY+15} ${RAX-5},${TY} Q${RAX},${SY+28} 88,${SY+8}Z`}
              fill={PRP_D} opacity="0.35" />
          </g>

          {/* ══ MAIN CUIRASS ══ */}
          {/* Shadow left */}
          <path d={`M${60-1},${SY+6} L${LAX+1},${SY+8} Q${LAX-1},78 ${60-TW},${TY} L${60-1},${TY}Z`}
            fill={BK} />
          {/* Mid-lit right */}
          <path d={`M${60+1},${SY+6} L${RAX-1},${SY+8} Q${RAX+1},78 ${60+TW},${TY} L${60+1},${TY}Z`}
            fill={BK_M} />
          {/* Top highlight edge */}
          <path d={`M${LAX+1},${SY+8} Q60,${SY+5} ${RAX-1},${SY+8} L${RAX-1},${SY+10} Q60,${SY+7} ${LAX+1},${SY+10}Z`}
            fill={BK_H} opacity="0.6" />

          {/* ══ RIBBED STERNUM PLATES ══ */}
          {[SY+14, SY+24, SY+34, SY+44].map((y, i) => (
            <g key={i}>
              <path d={`M${LAX+3},${y} Q60,${y-2} ${RAX-3},${y} L${RAX-3},${y+7} Q60,${y+5} ${LAX+3},${y+7}Z`}
                fill={BK_M} />
              <path d={`M${LAX+4},${y+0.5} Q60,${y-1} ${RAX-4},${y+0.5} L${RAX-4},${y+5} Q60,${y+3} ${LAX+4},${y+5}Z`}
                fill={BK_L} />
              <path d={`M${LAX+4},${y+0.5} Q60,${y-1} ${RAX-4},${y+0.5} L${RAX-4},${y+2} Q60,${y} ${LAX+4},${y+2}Z`}
                fill={BK_H} opacity="0.5" />
            </g>
          ))}

          {/* ══ VOID CRACK LINES ON TORSO ══ */}
          <g style={{ animationName:'vrc-pulse', animationDuration:'2.5s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }}>
            <path d={`M${LAX+8},${SY+12} L${LAX+5},${SY+22} L${LAX+9},${SY+18} L${LAX+6},${SY+32}`}
              fill="none" stroke={PRP} strokeWidth="0.9" strokeLinecap="round" opacity="0.8" />
            <path d={`M${RAX-8},${SY+10} L${RAX-4},${SY+20} L${RAX-8},${SY+17} L${RAX-5},${SY+28}`}
              fill="none" stroke={PRP} strokeWidth="0.9" strokeLinecap="round" opacity="0.8" />
            <path d="M57,74 L60,68 L63,74 L60,80"
              fill="none" stroke={PRP_D} strokeWidth="0.7" strokeLinecap="round" opacity="0.6" />
          </g>

          {/* ══ LEFT PAULDRON (jagged, larger) ══ */}
          {/* Shadow base */}
          <path d={`M26,${SY+4} Q24,${SY} ${LAX},${SY} Q54,${SY} 62,${SY+8} L62,${SY+28} Q54,${SY+30} ${LAX},${SY+28} Q26,${SY+24} 26,${SY+14}Z`}
            fill={BK} />
          {/* Face */}
          <path d={`M27,${SY+4} Q25,${SY} ${LAX},${SY} Q53,${SY} 61,${SY+7} L61,${SY+26} Q53,${SY+28} ${LAX},${SY+26} Q27,${SY+22} 27,${SY+12}Z`}
            fill={BK_M} />
          {/* Lit upper face */}
          <path d={`M28,${SY+3} Q26,${SY} ${LAX},${SY} Q52,${SY} 60,${SY+6} L60,${SY+14} Q52,${SY+16} ${LAX},${SY+14} Q28,${SY+10} 28,${SY+8}Z`}
            fill={BK_L} />
          {/* Jagged lower edge */}
          <path d={`M27,${SY+22} L30,${SY+26} L34,${SY+22} L38,${SY+27} L42,${SY+23} L46,${SY+28} L50,${SY+24} L55,${SY+28} L61,${SY+26}`}
            fill={BK} stroke={BK} strokeWidth="0.5" />
          <path d={`M27,${SY+22} L30,${SY+26} L34,${SY+22} L38,${SY+27} L42,${SY+23} L46,${SY+28} L50,${SY+24} L55,${SY+28} L61,${SY+26}`}
            fill="none" stroke={PRP} strokeWidth="0.7" opacity="0.4"
            style={{ animationName:'vrc-pulse', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />
          {/* Crack on left pauldron */}
          <path d={`M36,${SY+2} L34,${SY+10} L38,${SY+7} L36,${SY+18}`}
            fill="none" stroke={PRP} strokeWidth="0.8" strokeLinecap="round" opacity="0.7"
            style={{ animationName:'vrc-pulse', animationDuration:'2.5s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />
          {/* Purple edge glow */}
          <path d={`M${LAX},${SY} Q53,${SY} 61,${SY+7} L61,${SY+8} Q53,${SY+1} ${LAX},${SY+1}Z`}
            fill={PRP_D} opacity="0.3" />

          {/* ══ RIGHT PAULDRON (slightly smaller, sharper) ══ */}
          <path d={`M59,${SY+4} Q59,${SY} ${RAX},${SY} Q85,${SY} 89,${SY+6} L89,${SY+24} Q85,${SY+26} ${RAX},${SY+24} Q59,${SY+24} 59,${SY+18}Z`}
            fill={BK} />
          <path d={`M60,${SY+3} Q60,${SY} ${RAX},${SY} Q84,${SY} 88,${SY+5} L88,${SY+22} Q84,${SY+24} ${RAX},${SY+22} Q60,${SY+22} 60,${SY+16}Z`}
            fill={BK_M} />
          <path d={`M60,${SY+2} Q60,${SY} ${RAX},${SY} Q83,${SY} 87,${SY+4} L87,${SY+12} Q83,${SY+14} ${RAX},${SY+12} Q60,${SY+12} 60,${SY+8}Z`}
            fill={BK_L} />
          {/* Jagged bottom right */}
          <path d={`M60,${SY+22} L65,${SY+26} L70,${SY+22} L74,${SY+27} L78,${SY+23} L82,${SY+26} L87,${SY+22}`}
            fill={BK} stroke={BK} strokeWidth="0.5" />
          <path d={`M60,${SY+22} L65,${SY+26} L70,${SY+22} L74,${SY+27} L78,${SY+23} L82,${SY+26} L87,${SY+22}`}
            fill="none" stroke={PRP} strokeWidth="0.7" opacity="0.4"
            style={{ animationName:'vrc-pulse', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />
          {/* Crack on right pauldron */}
          <path d={`M76,${SY+1} L78,${SY+9} L74,${SY+6} L76,${SY+16}`}
            fill="none" stroke={PRP} strokeWidth="0.8" strokeLinecap="round" opacity="0.7"
            style={{ animationName:'vrc-pulse', animationDuration:'2.5s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite', animationDelay:'0.4s' }} />
          <path d={`M${RAX},${SY} Q83,${SY} 87,${SY+4} L87,${SY+5} Q83,${SY+1} ${RAX},${SY+1}Z`}
            fill={PRP_D} opacity="0.3" />

          {/* ══ BOTTOM JAGGED EDGE ══ */}
          <path d={`M${LAX},${TY-2} L${LAX+4},${TY+4} L${LAX+8},${TY-2} L${LAX+12},${TY+5} L${LAX+16},${TY-1} L60,${TY+6} L${RAX-16},${TY-1} L${RAX-12},${TY+5} L${RAX-8},${TY-2} L${RAX-4},${TY+4} L${RAX},${TY-2}`}
            fill={BK_M} stroke={BK_M} strokeWidth="0.5" />
          <path d={`M${LAX},${TY-2} L${LAX+4},${TY+4} L${LAX+8},${TY-2} L${LAX+12},${TY+5} L${LAX+16},${TY-1} L60,${TY+6} L${RAX-16},${TY-1} L${RAX-12},${TY+5} L${RAX-8},${TY-2} L${RAX-4},${TY+4} L${RAX},${TY-2}`}
            fill="none" stroke={PRP} strokeWidth="0.8" opacity="0.4"
            style={{ animationName:'vrc-pulse', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />

        </g>
      </svg>
    </>
  );
}
