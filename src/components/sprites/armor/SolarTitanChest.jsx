import React from 'react';

/* Solar Titan — Chest
   Radiant gold plate cuirass: massive sun-disc embossed on the breastplate
   with glowing amber core, broad layered pauldrons with engraved solar rays,
   golden faulds with rune trim, warm white fabric at gaps.

   Aligned to PlayerBase tier 3: SY=54, TY=112, LAX=42, RAX=78, TW=13
   viewBox 0 0 120 200 — position:absolute over base. */

const css = `
@keyframes stc-idle {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-2px); }
}
@keyframes stc-glow {
  0%, 100% { opacity: 0.5; }
  50%       { opacity: 1; }
}
@keyframes stc-pulse {
  0%, 100% { opacity: 0.3; }
  50%       { opacity: 0.7; }
}
`;

const GD    = '#c9952a';
const GD_L  = '#e8b84a';
const GD_H  = '#ffd870';
const GD_D  = '#8a6010';
const GD_DD = '#4a3008';
const AMB   = '#ff9a20';
const AMB_L = '#ffcc60';
const WHT   = '#fff4c0';

const SY  = 54;
const TY  = 112;
const LAX = 42;
const RAX = 78;
const TW  = 13;

function GoldStud({ cx, cy, r = 1.5 }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={GD_DD} />
      <circle cx={cx-0.35} cy={cy-0.35} r={r*0.45} fill={GD_H} />
    </>
  );
}

export default function SolarTitanChest() {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 120 200" overflow="visible"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

        <g style={{
          animationName: 'stc-idle',
          animationDuration: '3.2s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}>

          {/* ══ WARM FABRIC AT GAPS ══ */}
          <path d={`M${LAX},${SY} L${RAX},${SY} Q${60+TW+2},88 ${60+TW},${TY} L${60-TW},${TY} Q${60-TW-2},88 ${LAX},${SY}Z`}
            fill={WHT} opacity="0.12" />

          {/* ══ GORGET ══ */}
          <path d={`M50,${SY} Q50,${SY-4} 60,${SY-5} Q70,${SY-4} 70,${SY} L70,${SY+10} Q60,${SY+12} 50,${SY+10}Z`}
            fill={GD_D} />
          <path d={`M51,${SY} Q51,${SY-3} 60,${SY-4} Q69,${SY-3} 69,${SY} L69,${SY+9} Q60,${SY+11} 51,${SY+9}Z`}
            fill={GD} />
          <path d={`M51,${SY-3} Q60,${SY-4} 69,${SY-1} L69,${SY} Q60,${SY-3} 51,${SY-2}Z`}
            fill={GD_H} opacity="0.5" />

          {/* ══ BREASTPLATE ══ */}
          {/* Shadow left */}
          <path d={`M${60-1},${SY+8} L${LAX+2},${SY+10} Q${LAX},76 ${60-TW},${TY} L${60-1},${TY}Z`}
            fill={GD_D} />
          {/* Lit right */}
          <path d={`M${60+1},${SY+8} L${RAX-2},${SY+10} Q${RAX},76 ${60+TW},${TY} L${60+1},${TY}Z`}
            fill={GD} />
          {/* Bright right edge highlight */}
          <path d={`M${60+1},${SY+8} L${RAX-3},${SY+10} L${RAX-3},${SY+12} L${60+1},${SY+10}Z`}
            fill={GD_H} opacity="0.4" />
          {/* Top edge */}
          <path d={`M${LAX+2},${SY+10} Q60,${SY+7} ${RAX-2},${SY+10} L${RAX-2},${SY+12} Q60,${SY+9} ${LAX+2},${SY+12}Z`}
            fill={GD_H} opacity="0.4" />
          {/* Central ridge */}
          <path d={`M60,${SY+8} Q61,${SY+35} 61,${TY}`}
            fill="none" stroke={GD_H} strokeWidth="1.5" opacity="0.45" />

          {/* ══ SUN DISC EMBOSS (center of chest) ══ */}
          {/* Disc outer ring */}
          <circle cx="60" cy={SY+32} r="14" fill={GD_DD} />
          <circle cx="60" cy={SY+32} r="12.5" fill={GD_D} />
          <circle cx="60" cy={SY+32} r="10.5" fill={GD} />
          <circle cx="60" cy={SY+32} r="8" fill={GD_L} />
          {/* Inner amber core */}
          <circle cx="60" cy={SY+32} r="5.5" fill={GD_D} />
          <circle cx="60" cy={SY+32} r="4" fill={AMB}
            style={{ animationName:'stc-glow', animationDuration:'2.4s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />
          <circle cx="60" cy={SY+32} r="2.5" fill={AMB_L}
            style={{ animationName:'stc-glow', animationDuration:'2.4s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite', animationDelay:'0.2s' }} />
          {/* Sun ray engravings on disc */}
          {[0,45,90,135,180,225,270,315].map((deg, i) => {
            const r = deg * Math.PI / 180;
            const cx1 = 60 + Math.sin(r) * 6;
            const cy1 = (SY+32) - Math.cos(r) * 6;
            const cx2 = 60 + Math.sin(r) * 11.5;
            const cy2 = (SY+32) - Math.cos(r) * 11.5;
            return <line key={i} x1={cx1} y1={cy1} x2={cx2} y2={cy2}
              stroke={GD_H} strokeWidth="0.8" opacity="0.5" />;
          })}
          {/* Rune ring */}
          <circle cx="60" cy={SY+32} r="9" fill="none" stroke={AMB} strokeWidth="0.5" opacity="0.4"
            style={{ animationName:'stc-pulse', animationDuration:'3s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />
          {/* Glow bloom */}
          <circle cx="60" cy={SY+32} r="16" fill={AMB} opacity="0.04"
            style={{ animationName:'stc-glow', animationDuration:'2.4s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />

          {/* ══ HORIZONTAL BANDS ══ */}
          {[SY+16, SY+50].map((y, i) => (
            <g key={i}>
              <rect x={LAX+2} y={y} width={RAX-LAX-4} height="5" rx="0.5" fill={GD_D} />
              <rect x={LAX+3} y={y+0.5} width={RAX-LAX-6} height="3.5" rx="0.5" fill={GD_L} />
              <rect x={LAX+3} y={y+0.5} width={RAX-LAX-6} height="1.5" rx="0" fill={GD_H} opacity="0.35" />
            </g>
          ))}

          {/* ══ LEFT PAULDRON (massive, layered) ══ */}
          {/* Shadow */}
          <path d={`M26,${SY+4} Q24,${SY} ${LAX},${SY} Q54,${SY} 62,${SY+8} L62,${SY+30} Q54,${SY+32} ${LAX},${SY+30} Q26,${SY+26} 26,${SY+16}Z`}
            fill={GD_DD} />
          {/* Main plate */}
          <path d={`M27,${SY+4} Q25,${SY} ${LAX},${SY} Q53,${SY} 61,${SY+7} L61,${SY+28} Q53,${SY+30} ${LAX},${SY+28} Q27,${SY+24} 27,${SY+14}Z`}
            fill={GD_D} />
          {/* Lit face */}
          <path d={`M28,${SY+3} Q26,${SY} ${LAX},${SY} Q52,${SY} 60,${SY+6} L60,${SY+16} Q52,${SY+18} ${LAX},${SY+16} Q28,${SY+12} 28,${SY+8}Z`}
            fill={GD} />
          {/* Top highlight */}
          <path d={`M${LAX},${SY} Q52,${SY} 60,${SY+5} L60,${SY+7} Q52,${SY+1} ${LAX},${SY+1}Z`}
            fill={GD_H} opacity="0.55" />
          {/* Lame lines */}
          <path d={`M27,${SY+16} Q${LAX},${SY+18} 61,${SY+20}`}
            fill="none" stroke={GD_DD} strokeWidth="1.5" />
          <path d={`M27,${SY+15} Q${LAX},${SY+17} 61,${SY+19}`}
            fill="none" stroke={GD_H} strokeWidth="0.5" opacity="0.4" />
          {/* Engraved sun rays on left cap */}
          <g stroke={GD_H} strokeWidth="0.6" opacity="0.3">
            <path d={`M38,${SY+2} Q36,${SY+10} 38,${SY+18}`} fill="none"/>
            <path d={`M44,${SY} Q42,${SY+10} 44,${SY+20}`} fill="none"/>
            <path d={`M50,${SY} Q49,${SY+10} 50,${SY+20}`} fill="none"/>
          </g>
          {/* Sun rune on pauldron */}
          <circle cx="37" cy={SY+9} r="3.5" fill={GD_DD} />
          <circle cx="37" cy={SY+9} r="2.5" fill={GD_D} />
          <circle cx="37" cy={SY+9} r="1.5" fill={AMB} opacity="0.8"
            style={{ animationName:'stc-glow', animationDuration:'2.6s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />
          <GoldStud cx={29} cy={SY+9} />
          <GoldStud cx={61} cy={SY+14} />

          {/* ══ RIGHT PAULDRON ══ */}
          <path d={`M59,${SY+4} Q59,${SY} ${RAX},${SY} Q86,${SY} 90,${SY+6} L90,${SY+26} Q86,${SY+28} ${RAX},${SY+26} Q59,${SY+26} 59,${SY+18}Z`}
            fill={GD_DD} />
          <path d={`M60,${SY+3} Q60,${SY} ${RAX},${SY} Q85,${SY} 89,${SY+5} L89,${SY+24} Q85,${SY+26} ${RAX},${SY+24} Q60,${SY+24} 60,${SY+16}Z`}
            fill={GD_D} />
          <path d={`M60,${SY+2} Q60,${SY} ${RAX},${SY} Q84,${SY} 88,${SY+4} L88,${SY+14} Q84,${SY+16} ${RAX},${SY+14} Q60,${SY+14} 60,${SY+9}Z`}
            fill={GD} />
          <path d={`M${RAX},${SY} Q84,${SY} 88,${SY+3} L88,${SY+5} Q84,${SY+1} ${RAX},${SY+1}Z`}
            fill={GD_H} opacity="0.5" />
          <path d={`M60,${SY+16} Q${RAX},${SY+18} 89,${SY+20}`}
            fill="none" stroke={GD_DD} strokeWidth="1.5" />
          <path d={`M60,${SY+15} Q${RAX},${SY+17} 89,${SY+19}`}
            fill="none" stroke={GD_H} strokeWidth="0.5" opacity="0.4" />
          <g stroke={GD_H} strokeWidth="0.6" opacity="0.3">
            <path d={`M70,${SY} Q71,${SY+10} 70,${SY+20}`} fill="none"/>
            <path d={`M76,${SY} Q77,${SY+10} 76,${SY+20}`} fill="none"/>
            <path d={`M82,${SY+1} Q83,${SY+8} 82,${SY+16}`} fill="none"/>
          </g>
          <circle cx="83" cy={SY+8} r="3.5" fill={GD_DD} />
          <circle cx="83" cy={SY+8} r="2.5" fill={GD_D} />
          <circle cx="83" cy={SY+8} r="1.5" fill={AMB} opacity="0.8"
            style={{ animationName:'stc-glow', animationDuration:'2.6s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite', animationDelay:'0.4s' }} />
          <GoldStud cx={89} cy={SY+10} />
          <GoldStud cx={60} cy={SY+11} />

          {/* ══ FAULDS WITH RUNE TRIM ══ */}
          <path d={`M${LAX},${TY-8} Q60,${TY-4} ${RAX},${TY-8} L${RAX},${TY+4} Q60,${TY+8} ${LAX},${TY+4}Z`}
            fill={GD_D} />
          <path d={`M${LAX},${TY-7} Q60,${TY-3} ${RAX},${TY-7} L${RAX},${TY+3} Q60,${TY+7} ${LAX},${TY+3}Z`}
            fill={GD} />
          <path d={`M${LAX},${TY-7} Q60,${TY-3} ${RAX},${TY-7} L${RAX},${TY-4} Q60,${TY} ${LAX},${TY-4}Z`}
            fill={GD_H} opacity="0.3" />
          {/* Rune line on fauld */}
          <path d={`M${LAX+4},${TY-1} Q60,${TY+3} ${RAX-4},${TY-1}`}
            fill="none" stroke={AMB} strokeWidth="0.7" opacity="0.5"
            style={{ animationName:'stc-pulse', animationDuration:'2.5s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />
          <GoldStud cx={LAX+4} cy={TY-3} />
          <GoldStud cx={53} cy={TY+2} />
          <GoldStud cx={67} cy={TY+2} />
          <GoldStud cx={RAX-4} cy={TY-3} />

        </g>
      </svg>
    </>
  );
}
