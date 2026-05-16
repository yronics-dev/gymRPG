import React from 'react';

/* Iron Scraps — Helmet
   Open-face iron cap, dented, left side bent lower, leather chin strap.
   viewBox matches PlayerBase exactly: 0 0 120 200
   Render position:absolute over base character. */

const css = `
@keyframes ish-idle {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-2px); }
}
`;

/* Iron palette */
const FE   = '#888780'; // main iron
const FE_D = '#636058'; // dark iron / shadow
const FE_S = '#4a4840'; // deep shadow
const FE_H = '#b0aea6'; // highlight edge
const LTH  = '#5a3a20'; // leather brown
const LTH_D = '#3a2010'; // dark leather
const RIV  = '#aaa89e'; // rivet highlight

function Rivet({ cx, cy, r = 1.8 }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={FE_S} />
      <circle cx={cx - 0.4} cy={cy - 0.4} r={r * 0.45} fill={RIV} />
    </>
  );
}

export default function IronScrapsHelmet() {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 120 200" overflow="visible"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

        <g style={{
          animationName: 'ish-idle',
          animationDuration: '3s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}>

          {/* ── SHADOW/DEPTH under brim ── */}
          <path d="M45,27 Q52,28 60,27 Q70,26 75,23"
            fill="none" stroke={FE_S} strokeWidth="3" strokeLinecap="round" />

          {/* ── CAP BODY ──
              Right half: intact, sits higher (brim at y≈22)
              Left half:  bent/damaged, brim sags to y≈27          */}

          {/* Left half — darker (shadow face + battle damage) */}
          <path d="M60,8 Q52,8 46,12 Q42,17 44,27 Q52,26 60,25Z"
            fill={FE_D} />

          {/* Right half — lit face */}
          <path d="M60,8 Q68,8 74,12 Q78,17 75,22 Q68,23 60,24Z"
            fill={FE} />

          {/* ── BRIM LIPS ── */}
          {/* Right brim underside */}
          <path d="M60,24 Q68,23 75,22 L76,24 Q68,25 60,26Z"
            fill={FE_S} />
          {/* Left brim underside (wider — bent further down) */}
          <path d="M44,27 Q52,26 60,26 L60,28 Q52,29 43,30Z"
            fill={FE_S} />

          {/* ── SURFACE DAMAGE on left side ──  */}
          {/* Main dent crease */}
          <path d="M47,13 Q44,17 47,21 Q49,18 47,13Z"
            fill={FE_S} />
          <path d="M47,13 Q46,16 47,19 Q48,16 47,13Z"
            fill={FE_D} />
          {/* Second smaller dent */}
          <path d="M49,23 Q47,24 49,25 Q50,24 49,23Z"
            fill={FE_S} />

          {/* ── HIGHLIGHT EDGE on right crown ── */}
          <path d="M62,8 Q70,9 74,14 Q72,12 67,9 Q62,8 62,8Z"
            fill={FE_H} opacity="0.55" />

          {/* ── SCRATCH LINES (surface texture) ── */}
          <g stroke={FE_H} strokeWidth="0.45" opacity="0.5">
            <line x1="63" y1="10" x2="62" y2="20" />
            <line x1="68" y1="11" x2="68" y2="20" />
            <line x1="72" y1="13" x2="71" y2="21" />
          </g>
          <g stroke={FE_S} strokeWidth="0.4" opacity="0.6">
            <line x1="53" y1="11" x2="54" y2="22" />
            <line x1="57" y1="9"  x2="57" y2="23" />
          </g>

          {/* ── RIVETS ── */}
          <Rivet cx={53} cy={23} />
          <Rivet cx={67} cy={21} />
          <Rivet cx={60} cy={9}  r={1.5} />
          <Rivet cx={46} cy={22} r={1.4} />

          {/* ── LEATHER CHIN STRAP ── */}
          {/* Left strap — runs along head left edge */}
          <path d="M44,28 Q42,33 43,39 Q44,42 49,44"
            fill="none" stroke={LTH} strokeWidth="2.8" strokeLinecap="round" />
          {/* Right strap */}
          <path d="M75,23 Q78,30 77,38 Q76,42 71,44"
            fill="none" stroke={LTH} strokeWidth="2.8" strokeLinecap="round" />
          {/* Strap highlight */}
          <path d="M44,28 Q42,33 43,39 Q44,42 49,44"
            fill="none" stroke="#7a5030" strokeWidth="0.9" opacity="0.5" strokeLinecap="round" />
          <path d="M75,23 Q78,30 77,38 Q76,42 71,44"
            fill="none" stroke="#7a5030" strokeWidth="0.9" opacity="0.4" strokeLinecap="round" />

          {/* ── CHIN STRAP BUCKLE ── */}
          <rect x="54.5" y="42" width="11" height="4.5" rx="1" fill={LTH} />
          <rect x="54.5" y="42" width="11" height="4.5" rx="1"
            fill="none" stroke={LTH_D} strokeWidth="0.6" />
          {/* Buckle pin */}
          <line x1="60" y1="42" x2="60" y2="46.5" stroke={LTH_D} strokeWidth="0.8" />
          {/* Buckle wear marks */}
          <line x1="57" y1="43.5" x2="59" y2="43.5" stroke={LTH_D} strokeWidth="0.5" opacity="0.6" />
          <line x1="61" y1="43.5" x2="63" y2="43.5" stroke={LTH_D} strokeWidth="0.5" opacity="0.6" />

          {/* ── LEATHER INNER PAD STRIP at nape ── */}
          <path d="M46,20 Q43,22 44,26"
            fill="none" stroke={LTH} strokeWidth="3" strokeLinecap="round" opacity="0.6" />

          {/* ── BENT BRIM EDGE rough jagging ── */}
          {/* The left brim edge is rough/jagged from damage */}
          <path d="M44,27 L43,28 L45,29 L43,30 L44,31"
            fill="none" stroke={FE_D} strokeWidth="0.8" />

        </g>
      </svg>
    </>
  );
}
