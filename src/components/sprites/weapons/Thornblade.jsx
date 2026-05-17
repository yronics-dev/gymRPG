import React from 'react';

/* Thornblade — Grass / Uncommon
   A sword grown from dense vines, thorns jutting from the blade edges.
   Green poison drips from the serrated edge. */

const css = `
@keyframes thb-drip {
  0%   { opacity: 0; transform: translateY(0); }
  30%  { opacity: 1; }
  100% { opacity: 0; transform: translateY(7px); }
}
@keyframes thb-pulse {
  0%, 100% { opacity: 0.5; }
  50%       { opacity: 1; }
}
@keyframes thb-idle {
  0%, 100% { transform: rotate(-1deg) translateY(0); }
  50%       { transform: rotate(1.5deg) translateY(-1px); }
}
`;

export default function Thornblade({ size = 48, style = {} }) {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 48 48" width={size} height={size}
        style={{ display: 'block', ...style }} xmlns="http://www.w3.org/2000/svg">

        <defs>
          <linearGradient id="thb-blade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="45%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#052e16" />
          </linearGradient>
        </defs>

        <g style={{ transformOrigin: '24px 24px', animation: 'thb-idle 3s ease-in-out infinite' }}>

          {/* Poison glow */}
          <polygon points="20,42 28,42 25.5,8 22.5,8" fill="#22c55e" opacity="0.1"
            style={{ filter: 'blur(3px)' }} />

          {/* ── Vine-wrapped blade ── */}
          <polygon points="22.5,42 25.5,42 24.5,10 23.5,10" fill="url(#thb-blade)" />
          {/* Left shadow edge */}
          <polygon points="22.5,42 23.5,10 22,42" fill="#052e16" opacity="0.5" />
          {/* Right lit edge */}
          <polygon points="25.5,42 24.5,10 26,42" fill="#4ade80" opacity="0.25" />

          {/* Vine coil on blade */}
          <path d="M23.5,38 C22,35 25,32 23.5,29 C22,26 25,23 23.5,20 C22,17 25,14 24,11"
            fill="none" stroke="#15803d" strokeWidth="1.2" opacity="0.7" />
          <path d="M23.5,38 C22,35 25,32 23.5,29 C22,26 25,23 23.5,20 C22,17 25,14 24,11"
            fill="none" stroke="#4ade80" strokeWidth="0.4" opacity="0.3" />

          {/* ── Thorns on right edge ── */}
          {/* Each thorn: a small triangle pointing right */}
          {[14, 20, 26, 32].map((y, i) => (
            <polygon
              key={y}
              points={`25.5,${y} 28.5,${y + 2} 25.5,${y + 4}`}
              fill="#15803d"
              opacity="0.9"
            />
          ))}
          {/* Thorn tips highlight */}
          {[14, 20, 26, 32].map(y => (
            <line key={y} x1="25.5" y1={y + 1} x2="28" y2={y + 2}
              stroke="#4ade80" strokeWidth="0.4" opacity="0.5" />
          ))}

          {/* ── Thorns on left edge (smaller, offset) ── */}
          {[17, 23, 29, 35].map(y => (
            <polygon
              key={y}
              points={`22.5,${y} 19.5,${y + 2} 22.5,${y + 4}`}
              fill="#166534"
              opacity="0.75"
            />
          ))}

          {/* Tip */}
          <polygon points="22.5,10 25.5,10 24,4" fill="#16a34a" />
          <polygon points="22.5,10 24,4 22.8,4" fill="#052e16" opacity="0.6" />

          {/* Poison drips */}
          <circle cx="26.5" cy="18" r="0.9" fill="#4ade80"
            style={{ animation: 'thb-drip 2.5s ease-out infinite' }} />
          <circle cx="27" cy="28" r="0.7" fill="#86efac"
            style={{ animation: 'thb-drip 2.5s ease-out infinite 0.9s' }} />
          <circle cx="26.5" cy="36" r="0.6" fill="#4ade80"
            style={{ animation: 'thb-drip 2.5s ease-out infinite 1.7s' }} />

          {/* ── Crossguard — branch-style ── */}
          <path d="M15,42 Q18,40 24,41 Q30,40 33,42 L34,44 Q30,43 24,44 Q18,43 14,44Z"
            fill="#14532d" />
          {/* Leaf nubs on guard ends */}
          <ellipse cx="14.5" cy="42" rx="2.5" ry="1.2" fill="#15803d" transform="rotate(-15, 14.5, 42)" />
          <ellipse cx="33.5" cy="42" rx="2.5" ry="1.2" fill="#15803d" transform="rotate(15, 33.5, 42)" />
          <path d="M14,41 Q18,39 24,40 Q30,39 34,41 L34,42 Q30,40 24,41 Q18,40 14,42Z"
            fill="#4ade80" opacity="0.2" />

          {/* ── Grip — vine-wrapped ── */}
          <rect x="22.8" y="44" width="2.5" height="9" rx="1" fill="#1a2e1a" />
          {[45, 46.8, 48.6, 50.4, 52.2].map(y => (
            <path key={y} d={`M22.5,${y} Q24,${y - 0.3} 25.5,${y}`}
              fill="none" stroke="#15803d" strokeWidth="0.9" opacity="0.7" />
          ))}
          {/* Small leaf on grip */}
          <ellipse cx="24" cy="47" rx="1.2" ry="0.5" fill="#4ade80" opacity="0.35"
            style={{ animation: 'thb-pulse 2s ease-in-out infinite' }} />

          {/* ── Pommel — seed pod ── */}
          <ellipse cx="24" cy="53.5" rx="3" ry="2" fill="#14532d" />
          <ellipse cx="23.2" cy="53" rx="1.2" ry="0.7" fill="#4ade80" opacity="0.3" />
        </g>
      </svg>
    </>
  );
}
