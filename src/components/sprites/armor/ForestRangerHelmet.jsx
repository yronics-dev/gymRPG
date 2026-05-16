import React from 'react';

/* Forest Ranger — Helmet
   Fitted dark-leather ranger cap that hugs the skull.
   Wooden brow guard across the forehead.
   Small leaf pins at the temples. Open face.
   Crown has a carved oak leaf accent.

   Head reference (PlayerBase tier 3):
     top y≈8, bottom y≈45, left x≈44, right x≈76, center x=60

   viewBox 0 0 120 200 — position:absolute over base. */

const css = `
@keyframes frh-idle {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-2px); }
}
@keyframes frh-leaf {
  0%, 100% { transform: rotate(0deg); }
  50%       { transform: rotate(4deg); }
}
`;

const LTH   = '#3d2b1a';
const LTH_M  = '#4e3622';
const LTH_L  = '#5a3f28';
const LTH_H  = '#7a5a38';
const LTH_D  = '#2a1a08';
const WD     = '#5a4a2a';
const WD_L   = '#7a6a3a';
const WD_D   = '#3a2a10';
const GRN    = '#3B6D11';
const GRN_L  = '#4e8c18';

export default function ForestRangerHelmet() {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 120 200" overflow="visible"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

        <g style={{
          animationName: 'frh-idle',
          animationDuration: '3.2s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}>

          {/* ── CAP BODY ──
              Fits the head: x=44–76, y=8–32 (leaves lower face open) */}

          {/* Shadow left half */}
          <path d="M60,8 Q44,9 44,16 Q43,24 45,32 L60,31Z"
            fill={LTH} />
          {/* Lit right half */}
          <path d="M60,8 Q76,9 76,16 Q77,24 75,32 L60,31Z"
            fill={LTH_M} />

          {/* Cap seam (center crease) */}
          <line x1="60" y1="8" x2="60" y2="31"
            stroke={LTH_D} strokeWidth="0.7" opacity="0.55" />

          {/* Top edge highlight */}
          <path d="M44,10 Q60,8 76,10 L76,11 Q60,9 44,11Z"
            fill={LTH_H} opacity="0.4" />

          {/* Texture stitching right */}
          <g stroke={LTH_H} strokeWidth="0.45" opacity="0.3" strokeDasharray="1.5 2">
            <path d="M68,10 Q71,18 70,30" fill="none" />
            <path d="M73,12 Q75,19 73,29" fill="none" />
          </g>

          {/* ── BROW GUARD (WOOD) ──
              Slim carved plank across forehead, y=26–31 */}
          {/* Shadow underside */}
          <path d="M45,28 Q45,25 60,24 Q75,25 75,28 L75,32 Q75,31 60,31 Q45,31 45,32Z"
            fill={WD_D} />
          {/* Lit face */}
          <path d="M46,28 Q46,25 60,24 Q74,25 74,28 L74,31 Q74,30 60,30 Q46,30 46,31Z"
            fill={WD} />
          {/* Top highlight edge */}
          <path d="M47,25 Q60,24 73,26 L73,27 Q60,25 47,26Z"
            fill={WD_L} opacity="0.5" />
          {/* Wood grain */}
          <g stroke={WD_D} strokeWidth="0.4" opacity="0.45">
            <line x1="52" y1="25" x2="52" y2="30" />
            <line x1="58" y1="24" x2="58" y2="31" />
            <line x1="64" y1="24" x2="64" y2="31" />
            <line x1="70" y1="25" x2="70" y2="30" />
          </g>
          {/* Carved notches at edges */}
          <path d="M46,26 L45,28 L46,30" fill="none" stroke={WD_D} strokeWidth="0.8" />
          <path d="M74,26 L75,28 L74,30" fill="none" stroke={WD_D} strokeWidth="0.8" />

          {/* ── SMALL LEAF PINS AT TEMPLES ──
              Subtle, close to the head */}
          {/* Left temple leaf */}
          <path d="M45,17 Q43,20 44,23 Q46,20 46,17Z"
            fill={GRN} opacity="0.9" />
          <line x1="45" y1="17" x2="45" y2="23"
            stroke={LTH_D} strokeWidth="0.4" opacity="0.7" />

          {/* Right temple leaf */}
          <path d="M75,17 Q77,20 76,23 Q74,20 74,17Z"
            fill={GRN} opacity="0.9" />
          <line x1="75" y1="17" x2="75" y2="23"
            stroke={LTH_D} strokeWidth="0.4" opacity="0.7" />

          {/* ── CROWN OAK LEAF (animated sway) ── */}
          <g style={{
            animationName: 'frh-leaf',
            animationDuration: '4s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            transformOrigin: '60px 8px',
          }}>
            {/* Stem */}
            <line x1="60" y1="8" x2="60" y2="4"
              stroke={LTH_D} strokeWidth="0.8" />
            {/* Leaf */}
            <path d="M60,4 Q57,2 55,4 Q57,5 60,7 Q63,5 65,4 Q63,2 60,4Z"
              fill={GRN_L} />
            <path d="M60,4 Q58,3 57,5 Q59,5 60,7 Q61,5 62,5 Q61,3 60,4Z"
              fill={GRN} />
            <line x1="60" y1="4" x2="60" y2="7"
              stroke={LTH_D} strokeWidth="0.4" opacity="0.7" />
          </g>

          {/* ── LEATHER CHIN STRAP ──
              Thin straps from brow guard corners to a central tie */}
          <path d="M46,31 Q44,36 47,40"
            fill="none" stroke={LTH_M} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M74,31 Q76,36 73,40"
            fill="none" stroke={LTH_M} strokeWidth="1.8" strokeLinecap="round" />
          {/* Chin tie */}
          <path d="M47,40 Q60,43 73,40"
            fill="none" stroke={LTH_H} strokeWidth="1" strokeLinecap="round" opacity="0.5" />

        </g>
      </svg>
    </>
  );
}
