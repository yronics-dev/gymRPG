import React from 'react';

/* Solar Titan — Helmet
   Gleaming divine gold great helm with a radiant sun-disc crown, an
   open-face visor with burning amber eye lenses, carved sun-ray wing
   flanges on each side, and animated golden rune glow.

   Head reference (PlayerBase tier 3):
     top y≈8, bottom y≈45, left x≈44, right x≈76, center x=60

   viewBox 0 0 120 200 — position:absolute over base. */

const css = `
@keyframes sth-idle {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-2px); }
}
@keyframes sth-glow {
  0%, 100% { opacity: 0.55; }
  50%       { opacity: 1; }
}
@keyframes sth-rays {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

const GD    = '#c9952a';   // gold mid
const GD_L  = '#e8b84a';   // gold light
const GD_H  = '#ffd870';   // gold highlight
const GD_D  = '#8a6010';   // gold dark
const GD_DD = '#4a3008';   // deep shadow
const AMB   = '#ff9a20';   // amber glow
const AMB_L = '#ffcc60';   // amber bright
const WHT   = '#fff8e0';   // solar white

export default function SolarTitanHelmet() {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 120 200" overflow="visible"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

        <g style={{
          animationName: 'sth-idle',
          animationDuration: '3.2s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}>

          {/* ── SUN DISC CROWN (rotating rays) ── */}
          <g style={{
            animationName: 'sth-rays',
            animationDuration: '8s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            transformOrigin: '60px 3px',
          }}>
            {[0,30,60,90,120,150,210,240,270,300,330].map((deg, i) => {
              const r = deg * Math.PI / 180;
              const x1 = 60 + Math.sin(r) * 5;
              const y1 = 3 - Math.cos(r) * 5;
              const x2 = 60 + Math.sin(r) * 10;
              const y2 = 3 - Math.cos(r) * 10;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={GD_H} strokeWidth={i % 3 === 0 ? "1.4" : "0.8"} opacity="0.8"
                strokeLinecap="round" />;
            })}
          </g>
          {/* Sun disc center */}
          <circle cx="60" cy="3" r="4.5" fill={GD_D} />
          <circle cx="60" cy="3" r="3.5" fill={GD} />
          <circle cx="60" cy="3" r="2.5" fill={GD_L} />
          <circle cx="60" cy="3" r="1.5" fill={AMB}
            style={{ animationName:'sth-glow', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />

          {/* ── LEFT WING FLANGE (sun ray fins) ── */}
          <path d="M44,14 Q38,8 34,5 Q36,10 40,16 Q42,18 44,18Z"
            fill={GD_D} />
          <path d="M44,14 Q38,8 35,6 Q37,11 41,16 Q43,18 44,17Z"
            fill={GD} />
          <path d="M44,14 Q40,10 37,8 Q39,12 42,16Z"
            fill={GD_L} opacity="0.6" />
          {/* Ray lines on left flange */}
          <g stroke={GD_H} strokeWidth="0.6" opacity="0.5">
            <line x1="44" y1="14" x2="36" y2="7"/>
            <line x1="44" y1="16" x2="38" y2="11"/>
            <line x1="44" y1="18" x2="40" y2="15"/>
          </g>

          {/* ── RIGHT WING FLANGE ── */}
          <path d="M76,14 Q82,8 86,5 Q84,10 80,16 Q78,18 76,18Z"
            fill={GD_D} />
          <path d="M76,14 Q82,8 85,6 Q83,11 79,16 Q77,18 76,17Z"
            fill={GD} />
          <path d="M76,14 Q80,10 83,8 Q81,12 78,16Z"
            fill={GD_L} opacity="0.6" />
          <g stroke={GD_H} strokeWidth="0.6" opacity="0.5">
            <line x1="76" y1="14" x2="84" y2="7"/>
            <line x1="76" y1="16" x2="82" y2="11"/>
            <line x1="76" y1="18" x2="80" y2="15"/>
          </g>

          {/* ── MAIN HELM BODY ── x=43–77, y=8–44 */}
          {/* Shadow left */}
          <path d="M60,8 Q43,9 43,18 Q43,30 44,44 L60,44Z"
            fill={GD_D} />
          {/* Lit right */}
          <path d="M60,8 Q77,9 77,18 Q77,30 76,44 L60,44Z"
            fill={GD} />
          {/* Bright right edge */}
          <path d="M60,8 Q77,9 77,14 L76,14 Q76,9 60,8Z"
            fill={GD_H} opacity="0.5" />
          {/* Top rim */}
          <path d="M43,8 Q60,6 77,8 L77,10 Q60,8 43,10Z"
            fill={GD_H} />

          {/* ── FACE OPENING (open visor with amber lenses) ── */}
          {/* Cheek plates frame the face */}
          <path d="M44,18 Q43,24 44,36 L48,36 Q47,24 48,18Z"
            fill={GD_D} />
          <path d="M76,18 Q77,24 76,36 L72,36 Q73,24 72,18Z"
            fill={GD_D} />

          {/* ── AMBER EYE LENSES ── */}
          {/* Left lens */}
          <path d="M48,20 Q50,18 55,19 Q58,20 58,23 Q58,26 55,27 Q50,28 48,26 Q46,24 48,20Z"
            fill={GD_DD} />
          <path d="M49,21 Q51,19 55,20 Q57,21 57,23 Q57,25 55,26 Q51,27 49,25 Q47,23 49,21Z"
            fill={AMB} style={{ animationName:'sth-glow', animationDuration:'2.4s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />
          <path d="M50,21 Q52,20 55,21 Q56,22 56,23 Q56,24 54,25 Q52,26 50,24 Q49,23 50,21Z"
            fill={AMB_L} opacity="0.7" />
          <circle cx="51" cy="21.5" r="1" fill={WHT} opacity="0.5"/>

          {/* Right lens */}
          <path d="M62,19 Q65,18 68,20 Q72,22 72,24 Q72,27 69,27 Q65,28 62,26 Q60,24 62,19Z"
            fill={GD_DD} />
          <path d="M63,20 Q65,19 68,21 Q71,23 71,24 Q71,26 68,26 Q65,27 63,25 Q61,23 63,20Z"
            fill={AMB} style={{ animationName:'sth-glow', animationDuration:'2.4s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />
          <path d="M64,21 Q66,20 68,21 Q70,22 70,23 Q70,25 68,25 Q66,26 64,24 Q63,23 64,21Z"
            fill={AMB_L} opacity="0.7" />
          <circle cx="65" cy="21.5" r="1" fill={WHT} opacity="0.5"/>

          {/* ── NOSE BRIDGE / BROW ── */}
          <rect x="57" y="18" width="6" height="3" rx="1" fill={GD_D} />
          <rect x="57.5" y="18.5" width="5" height="2" rx="0.5" fill={GD_L} />

          {/* ── SOLAR RUNE ON BROW ── */}
          <g style={{ animationName:'sth-glow', animationDuration:'3s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }}>
            <circle cx="60" cy="13" r="3" fill={GD_DD} />
            <circle cx="60" cy="13" r="2.2" fill={GD_D} />
            <circle cx="60" cy="13" r="1.4" fill={AMB} opacity="0.9" />
            {/* Rune cross */}
            <line x1="60" y1="10.5" x2="60" y2="15.5" stroke={GD_H} strokeWidth="0.7" />
            <line x1="57.5" y1="13" x2="62.5" y2="13" stroke={GD_H} strokeWidth="0.7" />
          </g>

          {/* ── CHEEK PLATES DETAIL ── */}
          {/* Engraved lines */}
          <g stroke={GD_H} strokeWidth="0.5" opacity="0.3">
            <path d="M44,20 Q44,28 44,36" fill="none"/>
            <path d="M46,19 Q46,28 46,36" fill="none"/>
            <path d="M76,20 Q76,28 76,36" fill="none"/>
            <path d="M74,19 Q74,28 74,36" fill="none"/>
          </g>

          {/* ── CHIN GUARD ── */}
          <path d="M48,36 Q48,34 60,34 Q72,34 72,36 L71,44 Q60,46 49,44Z"
            fill={GD_D} />
          <path d="M49,36 Q49,34 60,34 Q71,34 71,36 L70,43 Q60,45 50,43Z"
            fill={GD} />
          <path d="M49,34 Q60,33 71,36 L71,37 Q60,34 49,35Z"
            fill={GD_H} opacity="0.4" />
          {/* Solar motif on chin */}
          <circle cx="60" cy="39" r="2.5" fill={GD_D} />
          <circle cx="60" cy="39" r="1.8" fill={GD_L} />
          <circle cx="60" cy="39" r="1" fill={AMB} opacity="0.7"
            style={{ animationName:'sth-glow', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />

          {/* ── RIVETS (gold studs) ── */}
          {[47,52,57,63,68,73].map(x => (
            <g key={x}>
              <circle cx={x} cy="10" r="1.4" fill={GD_DD} />
              <circle cx={x-0.3} cy={9.7} r="0.55" fill={GD_H} />
            </g>
          ))}

          {/* ── AMBIENT GLOW BLOOM ── */}
          <ellipse cx="60" cy="22" rx="18" ry="12" fill={AMB} opacity="0.03"
            style={{ animationName:'sth-glow', animationDuration:'2.4s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />

        </g>
      </svg>
    </>
  );
}
