import React from 'react';

/* Inferno Wand — Fire / Rare
   A dark staff topped with a roiling fireball orb.
   The orb churns with red-orange-yellow flame layers. */

const css = `
@keyframes ifw-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes ifw-pulse {
  0%, 100% { opacity: 0.7; r: 7px; }
  50%       { opacity: 1;   r: 8px; }
}
@keyframes ifw-flicker {
  0%, 100% { transform: scaleY(1) translateY(0); opacity: 0.85; }
  33%       { transform: scaleY(1.15) translateY(-1px); opacity: 1; }
  66%       { transform: scaleY(0.9) translateY(1px); opacity: 0.7; }
}
@keyframes ifw-idle {
  0%, 100% { transform: rotate(-1deg) translateY(0); }
  50%       { transform: rotate(1deg) translateY(-1.5px); }
}
`;

export default function InfernoWand({ size = 48, style = {} }) {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 48 48" width={size} height={size}
        style={{ display: 'block', ...style }} xmlns="http://www.w3.org/2000/svg">

        <defs>
          <radialGradient id="ifw-orb" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#fff176" />
            <stop offset="30%" stopColor="#ff9900" />
            <stop offset="70%" stopColor="#cc2200" />
            <stop offset="100%" stopColor="#660000" />
          </radialGradient>
          <radialGradient id="ifw-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff6600" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff2200" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g style={{ transformOrigin: '24px 30px', animation: 'ifw-idle 3s ease-in-out infinite' }}>

          {/* ── Staff shaft ── */}
          {/* Shadow side */}
          <rect x="22.5" y="16" width="2" height="32" rx="1" fill="#1a0800" />
          {/* Main shaft */}
          <rect x="23" y="16" width="2.5" height="32" rx="1" fill="#3d1a06" />
          {/* Highlight edge */}
          <rect x="23" y="16" width="0.7" height="32" rx="0.35" fill="#7a3a12" opacity="0.5" />
          {/* Binding rings */}
          {[22, 30, 38].map(y => (
            <rect key={y} x="22.5" y={y} width="3" height="1.5" rx="0.5" fill="#c0501a" opacity="0.7" key={y} />
          ))}

          {/* Pommel cap */}
          <ellipse cx="24" cy="48.5" rx="2.5" ry="1.5" fill="#2a0a00" />
          <ellipse cx="23.5" cy="48" rx="1" ry="0.6" fill="#7a3a12" opacity="0.4" />

          {/* ── Staff top connector ── */}
          <rect x="22" y="14" width="4" height="3" rx="1" fill="#5a200a" />
          <rect x="22" y="14" width="4" height="1" rx="0.5" fill="#cc5520" opacity="0.4" />

          {/* ── Orb glow halo ── */}
          <circle cx="24" cy="10" r="11" fill="url(#ifw-glow)"
            style={{ animation: 'ifw-pulse 1s ease-in-out infinite' }} />

          {/* ── Swirling inner flame layer (rotates) ── */}
          <g style={{ transformOrigin: '24px 10px', animation: 'ifw-spin 3s linear infinite' }}>
            <ellipse cx="24" cy="7" rx="4" ry="2" fill="#ff7700" opacity="0.25" />
            <ellipse cx="27" cy="12" rx="2" ry="4" fill="#ff3300" opacity="0.2" />
            <ellipse cx="21" cy="11" rx="2" ry="3.5" fill="#ff9900" opacity="0.2" />
          </g>

          {/* ── Counter-rotating wisp ── */}
          <g style={{ transformOrigin: '24px 10px', animation: 'ifw-spin 4.5s linear infinite reverse' }}>
            <ellipse cx="24" cy="6" rx="3" ry="1.5" fill="#ffcc00" opacity="0.2" />
            <ellipse cx="28" cy="10" rx="1.5" ry="3" fill="#ff6600" opacity="0.15" />
          </g>

          {/* ── Orb body ── */}
          <circle cx="24" cy="10" r="7.5" fill="url(#ifw-orb)" />
          {/* Orb gloss highlight */}
          <ellipse cx="21.5" cy="7.5" rx="2.5" ry="1.5" fill="white" opacity="0.18" />

          {/* ── Flame wisps erupting from orb ── */}
          <g style={{ transformOrigin: '24px 4px', animation: 'ifw-flicker 0.9s ease-in-out infinite' }}>
            <ellipse cx="24" cy="3.5" rx="2" ry="3.5" fill="#ff8800" opacity="0.7"
              style={{ filter: 'blur(1px)' }} />
            <ellipse cx="22.5" cy="2.5" rx="1" ry="2.5" fill="#ffcc00" opacity="0.5"
              style={{ filter: 'blur(0.5px)' }} />
            <ellipse cx="25.5" cy="3" rx="1" ry="2" fill="#ff5500" opacity="0.55"
              style={{ filter: 'blur(0.5px)' }} />
          </g>
          <g style={{ transformOrigin: '21px 6px', animation: 'ifw-flicker 1.1s ease-in-out infinite 0.3s' }}>
            <ellipse cx="21" cy="5" rx="1.2" ry="2" fill="#ff6600" opacity="0.45"
              style={{ filter: 'blur(0.8px)' }} />
          </g>
          <g style={{ transformOrigin: '27px 6px', animation: 'ifw-flicker 0.85s ease-in-out infinite 0.6s' }}>
            <ellipse cx="27" cy="5.5" rx="1.2" ry="2" fill="#ff4400" opacity="0.45"
              style={{ filter: 'blur(0.8px)' }} />
          </g>

          {/* ── Rune marks on staff ── */}
          <g stroke="#cc4400" strokeWidth="0.6" fill="none" opacity="0.5">
            <line x1="22.8" y1="26" x2="25.2" y2="26" />
            <line x1="24" y1="24.5" x2="24" y2="27.5" />
          </g>
        </g>
      </svg>
    </>
  );
}
