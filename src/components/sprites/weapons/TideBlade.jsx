import React from 'react';

/* Tide Blade — Water / Uncommon
   A flowing sword with a wavy blade profile and water-blue tones.
   Drops of water shimmer along the edge. */

const css = `
@keyframes tdb-ripple {
  0%, 100% { opacity: 0.4; transform: scaleX(1); }
  50%       { opacity: 0.9; transform: scaleX(1.05); }
}
@keyframes tdb-drop {
  0%   { opacity: 0; transform: translateY(0); }
  30%  { opacity: 0.8; }
  100% { opacity: 0; transform: translateY(6px); }
}
@keyframes tdb-idle {
  0%, 100% { transform: rotate(-1.5deg) translateY(0); }
  50%       { transform: rotate(1deg) translateY(-1px); }
}
`;

export default function TideBlade({ size = 48, style = {} }) {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 48 48" width={size} height={size}
        style={{ display: 'block', ...style }} xmlns="http://www.w3.org/2000/svg">

        <defs>
          <linearGradient id="tdb-blade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0f4ff" />
            <stop offset="40%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </linearGradient>
          <filter id="tdb-glow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <g style={{ transformOrigin: '24px 24px', animation: 'tdb-idle 3.5s ease-in-out infinite' }}>

          {/* Glow behind blade */}
          <polygon points="20,42 28,42 25.5,8 22.5,8" fill="#38bdf8" opacity="0.12"
            style={{ filter: 'blur(3px)' }} />

          {/* ── Blade — wavy profile ── */}
          {/* The blade has a sinuous wave on the right edge */}
          <path
            d="M23,42 L25,42 C25.5,38 26.5,34 25.5,30 C26.5,26 26,22 25,18 C25.8,14 25,10 24,4 L23,10 C24,14 23.2,18 22.5,22 C23.5,26 23,30 22,34 C23,38 22.5,40 23,42Z"
            fill="url(#tdb-blade)"
          />
          {/* Left edge — straight dark */}
          <path
            d="M23,42 C22.5,40 23,38 22,34 C23,30 23.5,26 22.5,22 C23.2,18 24,14 23,10 L22.2,10 L21.5,42Z"
            fill="#0c4a6e" opacity="0.5"
          />
          {/* Water sheen — center line */}
          <path
            d="M24,14 C24.2,20 23.8,26 24,32 C24,36 24,40 24,42"
            stroke="#bae6fd" strokeWidth="0.8" fill="none" opacity="0.5"
            style={{ animation: 'tdb-ripple 2s ease-in-out infinite' }}
          />

          {/* Water droplets clinging to blade */}
          <circle cx="23.5" cy="22" r="0.8" fill="#7dd3fc"
            style={{ animation: 'tdb-drop 2s ease-out infinite' }} />
          <circle cx="25" cy="30" r="0.7" fill="#bae6fd"
            style={{ animation: 'tdb-drop 2s ease-out infinite 0.7s' }} />
          <circle cx="23" cy="36" r="0.6" fill="#7dd3fc"
            style={{ animation: 'tdb-drop 2s ease-out infinite 1.4s' }} />

          {/* ── Crossguard — wave-shaped ── */}
          <path d="M14,41 Q18,38 24,40 Q30,38 34,41 L34,44 Q30,42 24,44 Q18,42 14,44Z"
            fill="#075985" />
          <path d="M14,41 Q18,38 24,40 Q30,38 34,41 L34,42 Q30,40 24,42 Q18,40 14,42Z"
            fill="#38bdf8" opacity="0.3" />

          {/* ── Grip ── */}
          <rect x="22.5" y="44" width="3" height="9" rx="1" fill="#0c2840" />
          {[45.5, 47.5, 49.5, 51.5].map(y => (
            <rect key={y} x="22" y={y} width="4" height="0.8" rx="0.4" fill="#0284c7" opacity="0.5" />
          ))}
          <rect x="22.5" y="44" width="0.8" height="9" rx="0.4" fill="#38bdf8" opacity="0.15" />

          {/* ── Pommel — teardrop ── */}
          <ellipse cx="24" cy="53.5" rx="3" ry="1.8" fill="#075985" />
          <ellipse cx="23.2" cy="53" rx="1" ry="0.6" fill="#7dd3fc" opacity="0.4"
            style={{ animation: 'tdb-ripple 2.5s ease-in-out infinite' }} />
        </g>
      </svg>
    </>
  );
}
