import React from 'react';

/* Nature Wand — Grass / Rare
   A living wooden wand topped with a radiant green nature orb.
   Leaves and petal sparks orbit the orb. */

const css = `
@keyframes nww-orbit {
  from { transform: rotate(0deg) translateX(9px) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(9px) rotate(-360deg); }
}
@keyframes nww-orbit2 {
  from { transform: rotate(120deg) translateX(9px) rotate(-120deg); }
  to   { transform: rotate(480deg) translateX(9px) rotate(-480deg); }
}
@keyframes nww-orbit3 {
  from { transform: rotate(240deg) translateX(9px) rotate(-240deg); }
  to   { transform: rotate(600deg) translateX(9px) rotate(-600deg); }
}
@keyframes nww-glow {
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 1; }
}
@keyframes nww-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes nww-idle {
  0%, 100% { transform: rotate(-1deg) translateY(0); }
  50%       { transform: rotate(1.5deg) translateY(-2px); }
}
`;

export default function NatureWand({ size = 48, style = {} }) {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 48 48" width={size} height={size}
        style={{ display: 'block', ...style }} xmlns="http://www.w3.org/2000/svg">

        <defs>
          <radialGradient id="nww-orb" cx="38%" cy="32%" r="62%">
            <stop offset="0%" stopColor="#f0fdf4" />
            <stop offset="30%" stopColor="#86efac" />
            <stop offset="65%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#052e16" />
          </radialGradient>
          <radialGradient id="nww-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g style={{ transformOrigin: '24px 30px', animation: 'nww-idle 3.5s ease-in-out infinite' }}>

          {/* ── Wooden shaft ── */}
          {/* Knot/texture lines */}
          <rect x="22.5" y="16" width="1.5" height="32" rx="0.75" fill="#3d1f00" />
          <rect x="23" y="16" width="2.5" height="32" rx="1" fill="#6b3a10" />
          <rect x="23" y="16" width="0.6" height="32" rx="0.3" fill="#a0602a" opacity="0.35" />
          {/* Bark texture */}
          <path d="M23.5,22 C23,24 24,26 23.5,28" fill="none" stroke="#3d1f00" strokeWidth="0.4" opacity="0.5" />
          <path d="M24.2,30 C23.7,32 24.5,34 24,36" fill="none" stroke="#3d1f00" strokeWidth="0.4" opacity="0.4" />
          {/* Vine wrap */}
          <path d="M23.5,20 C22,22.5 25,25 22.5,27.5 C20,30 25,33 22.5,36 C20,39 23.5,42 23.5,44"
            fill="none" stroke="#15803d" strokeWidth="0.8" opacity="0.6" />
          {/* Leaf buds on shaft */}
          <ellipse cx="22" cy="25" rx="2" ry="0.8" fill="#4ade80" opacity="0.5"
            transform="rotate(-20, 22, 25)" />
          <ellipse cx="25" cy="35" rx="2" ry="0.8" fill="#4ade80" opacity="0.45"
            transform="rotate(20, 25, 35)" />

          {/* Pommel — natural wood knot */}
          <ellipse cx="24" cy="48.5" rx="2.8" ry="1.8" fill="#3d1f00" />
          <ellipse cx="23.3" cy="48" rx="1.2" ry="0.7" fill="#a0602a" opacity="0.3" />

          {/* ── Top collar ── */}
          <rect x="21.5" y="14" width="5" height="3" rx="1.2" fill="#166534" />
          <rect x="21.5" y="14" width="5" height="1" rx="0.5" fill="#4ade80" opacity="0.3" />

          {/* ── Orb glow halo ── */}
          <circle cx="24" cy="9" r="12" fill="url(#nww-glow)"
            style={{ animation: 'nww-glow 2s ease-in-out infinite' }} />

          {/* ── Orbiting leaves ── */}
          <g style={{ transformOrigin: '24px 9px', animation: 'nww-orbit 3s linear infinite' }}>
            <ellipse cx="0" cy="0" rx="2.2" ry="1" fill="#4ade80" opacity="0.9"
              transform="translate(24, 9)" />
          </g>
          <g style={{ transformOrigin: '24px 9px', animation: 'nww-orbit2 3s linear infinite' }}>
            <ellipse cx="0" cy="0" rx="1.8" ry="0.9" fill="#86efac" opacity="0.8"
              transform="translate(24, 9)" />
          </g>
          <g style={{ transformOrigin: '24px 9px', animation: 'nww-orbit3 3s linear infinite' }}>
            <ellipse cx="0" cy="0" rx="2" ry="0.9" fill="#22c55e" opacity="0.85"
              transform="translate(24, 9)" />
          </g>

          {/* ── Inner swirl ── */}
          <g style={{ transformOrigin: '24px 9px', animation: 'nww-spin 4s linear infinite' }}>
            <path d="M24,5.5 C26.5,6 28,9 26,11.5 C24,13.5 21,12 21.5,9 C22,6.5 24,5.5 24,5.5Z"
              fill="none" stroke="#86efac" strokeWidth="0.6" opacity="0.3" />
          </g>

          {/* ── Orb body ── */}
          <circle cx="24" cy="9" r="7" fill="url(#nww-orb)" />
          {/* Gloss */}
          <ellipse cx="21.5" cy="6.5" rx="2.2" ry="1.3" fill="white" opacity="0.2" />

          {/* ── Petal sparks around orb ── */}
          {[[-6,-3],[6,-3],[0,7],[5,5],[-5,5]].map(([dx, dy], i) => (
            <ellipse key={i}
              cx={24 + dx} cy={9 + dy} rx="0.8" ry="0.5"
              fill="#86efac" opacity="0.6"
              transform={`rotate(${i * 36}, ${24 + dx}, ${9 + dy})`}
              style={{ animation: `nww-glow ${1.5 + i * 0.3}s ease-in-out infinite ${i * 0.2}s` }}
            />
          ))}
        </g>
      </svg>
    </>
  );
}
