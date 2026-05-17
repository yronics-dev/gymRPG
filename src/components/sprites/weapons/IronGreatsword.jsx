import React from 'react';

/* Iron Greatsword — Physical / Common
   Heavy two-handed iron blade, slightly weathered.
   viewBox 0 0 48 48 — designed for equipment slot icons. */

const css = `
@keyframes igs-idle {
  0%, 100% { transform: rotate(-1deg) translateY(0px); }
  50%       { transform: rotate(1deg) translateY(-1px); }
}
`;

export default function IronGreatsword({ size = 48, style = {} }) {
  return (
    <>
      <style>{css}</style>
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        style={{ display: 'block', ...style }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g style={{
          transformOrigin: '24px 24px',
          animation: 'igs-idle 3.2s ease-in-out infinite',
        }}>
          {/* ── Blade ── */}
          {/* Main blade body — tapers from hilt to tip */}
          <polygon
            points="22,42 26,42 25,10 23,10"
            fill="#8a8a8a"
          />
          {/* Blade left bevel — darker */}
          <polygon
            points="22,42 23,10 22.2,10 21.5,42"
            fill="#5c5c5c"
          />
          {/* Blade right bevel — lighter (catch light) */}
          <polygon
            points="26,42 25,10 25.8,10 26.5,42"
            fill="#b0b0b0"
          />
          {/* Blade center fuller (groove down the middle) */}
          <line x1="24" y1="13" x2="24" y2="40" stroke="#666" strokeWidth="0.7" opacity="0.6" />
          {/* Tip */}
          <polygon
            points="22,10 26,10 24,4"
            fill="#9a9a9a"
          />
          <polygon
            points="22,10 24,4 22.5,4"
            fill="#5c5c5c"
          />
          {/* Scratch marks */}
          <line x1="23.2" y1="16" x2="22.8" y2="22" stroke="#aaa" strokeWidth="0.4" opacity="0.5" />
          <line x1="24.8" y1="26" x2="24.4" y2="34" stroke="#ccc" strokeWidth="0.4" opacity="0.35" />

          {/* ── Crossguard ── */}
          <rect x="16" y="40" width="16" height="3" rx="1" fill="#6b6b6b" />
          {/* Guard bevel top */}
          <rect x="16" y="40" width="16" height="1" rx="0.5" fill="#999" opacity="0.6" />
          {/* Guard ends */}
          <rect x="14" y="39" width="4" height="5" rx="1" fill="#5a5a5a" />
          <rect x="30" y="39" width="4" height="5" rx="1" fill="#5a5a5a" />
          <rect x="14" y="39" width="4" height="1" rx="0.5" fill="#888" opacity="0.5" />
          <rect x="30" y="39" width="4" height="1" rx="0.5" fill="#888" opacity="0.5" />

          {/* ── Grip ── */}
          <rect x="22.5" y="43" width="3" height="9" rx="1" fill="#4a3020" />
          {/* Grip wrapping bands */}
          {[44.5, 46.5, 48.5, 50.5].map(y => (
            <rect key={y} x="22" y={y} width="4" height="1" rx="0.4" fill="#3a2010" opacity="0.7" />
          ))}
          {/* Grip highlight */}
          <rect x="22.5" y="43" width="1" height="9" rx="0.5" fill="#7a5030" opacity="0.25" />

          {/* ── Pommel ── */}
          <ellipse cx="24" cy="52.5" rx="3.5" ry="2" fill="#6b6b6b" />
          <ellipse cx="23.5" cy="52" rx="1.2" ry="0.7" fill="#999" opacity="0.4" />
        </g>
      </svg>
    </>
  );
}
