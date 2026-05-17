import React from 'react';

/* Ember Sword — Fire / Uncommon
   A blade glowing with inner heat — orange core fading to dark steel edges.
   Animated ember glow pulses from the blade. */

const css = `
@keyframes esw-glow {
  0%, 100% { opacity: 0.55; }
  50%       { opacity: 1; }
}
@keyframes esw-flame {
  0%   { transform: scaleY(1)   translateY(0px); opacity: 0.8; }
  50%  { transform: scaleY(1.1) translateY(-1px); opacity: 1; }
  100% { transform: scaleY(1)   translateY(0px); opacity: 0.8; }
}
@keyframes esw-idle {
  0%, 100% { transform: rotate(-1deg); }
  50%       { transform: rotate(1.5deg) translateY(-1px); }
}
`;

export default function EmberSword({ size = 48, style = {} }) {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 48 48" width={size} height={size}
        style={{ display: 'block', ...style }} xmlns="http://www.w3.org/2000/svg">

        <defs>
          <radialGradient id="esw-blade-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff9920" />
            <stop offset="60%" stopColor="#cc4400" />
            <stop offset="100%" stopColor="#551100" />
          </radialGradient>
          <filter id="esw-glow-filter">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <g style={{ transformOrigin: '24px 24px', animation: 'esw-idle 2.8s ease-in-out infinite' }}>

          {/* Glow halo behind blade */}
          <polygon points="20,42 28,42 25.5,8 22.5,8" fill="#ff6600"
            opacity="0.18" style={{ filter: 'blur(3px)' }} />

          {/* ── Blade ── */}
          <polygon points="22,42 26,42 25,10 23,10" fill="url(#esw-blade-grad)" />
          {/* Dark steel edges */}
          <polygon points="22,42 23,10 21.8,42" fill="#220800" opacity="0.6" />
          <polygon points="26,42 25,10 26.2,42" fill="#cc5500" opacity="0.3" />
          {/* Hot center fuller */}
          <line x1="24" y1="13" x2="24" y2="40" stroke="#ffcc44" strokeWidth="0.8" opacity="0.5"
            style={{ animation: 'esw-glow 1.4s ease-in-out infinite' }} />
          {/* Tip */}
          <polygon points="22,10 26,10 24,4" fill="#ff7720" />
          <polygon points="22,10 24,4 22.5,4" fill="#551100" />

          {/* Flame wisps at tip */}
          <g style={{ transformOrigin: '24px 6px', animation: 'esw-flame 1.2s ease-in-out infinite' }}>
            <ellipse cx="24" cy="5" rx="1.5" ry="3" fill="#ff9900" opacity="0.7"
              style={{ filter: 'blur(1px)' }} />
            <ellipse cx="23" cy="4" rx="0.8" ry="2" fill="#ffcc00" opacity="0.5"
              style={{ filter: 'blur(0.5px)' }} />
            <ellipse cx="25" cy="4.5" rx="0.7" ry="1.8" fill="#ff6600" opacity="0.6"
              style={{ filter: 'blur(0.5px)' }} />
          </g>

          {/* Ember sparks on blade */}
          <circle cx="23.5" cy="20" r="0.6" fill="#ffaa00"
            style={{ animation: 'esw-glow 0.9s ease-in-out infinite' }} />
          <circle cx="24.8" cy="30" r="0.5" fill="#ff7700"
            style={{ animation: 'esw-glow 1.1s ease-in-out infinite 0.3s' }} />

          {/* ── Crossguard ── */}
          <rect x="16" y="40" width="16" height="3" rx="1" fill="#5a2800" />
          <rect x="16" y="40" width="16" height="1" rx="0.5" fill="#cc5500" opacity="0.5" />
          <rect x="14" y="39" width="4" height="5" rx="1" fill="#441500" />
          <rect x="30" y="39" width="4" height="5" rx="1" fill="#441500" />
          {/* Guard ember glow */}
          <rect x="16" y="40" width="16" height="3" rx="1" fill="#ff6600" opacity="0.12"
            style={{ animation: 'esw-glow 1.6s ease-in-out infinite' }} />

          {/* ── Grip ── */}
          <rect x="22.5" y="43" width="3" height="9" rx="1" fill="#2a1008" />
          {[44.5, 46.5, 48.5, 50.5].map(y => (
            <rect key={y} x="22" y={y} width="4" height="1" rx="0.4" fill="#cc4400" opacity="0.4" />
          ))}

          {/* ── Pommel ── */}
          <ellipse cx="24" cy="52.5" rx="3.5" ry="2" fill="#5a2800" />
          <ellipse cx="23.5" cy="52" rx="1.2" ry="0.7" fill="#ff6600" opacity="0.35"
            style={{ animation: 'esw-glow 2s ease-in-out infinite' }} />
        </g>
      </svg>
    </>
  );
}
