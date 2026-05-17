import React from 'react';

/* Maelstrom Staff — Water / Rare
   A deep-blue staff crowned with a swirling water vortex orb.
   The orb has dual-layer counter-rotating water rings. */

const css = `
@keyframes mls-cw {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes mls-ccw {
  from { transform: rotate(0deg); }
  to   { transform: rotate(-360deg); }
}
@keyframes mls-pulse {
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 1; }
}
@keyframes mls-idle {
  0%, 100% { transform: rotate(-1deg) translateY(0); }
  50%       { transform: rotate(1.2deg) translateY(-1.5px); }
}
@keyframes mls-drop {
  0%   { opacity: 0; transform: translateY(0px) rotate(0deg); }
  40%  { opacity: 0.9; }
  100% { opacity: 0; transform: translateY(8px) rotate(90deg); }
}
`;

export default function MaelstromStaff({ size = 48, style = {} }) {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 48 48" width={size} height={size}
        style={{ display: 'block', ...style }} xmlns="http://www.w3.org/2000/svg">

        <defs>
          <radialGradient id="mls-orb" cx="38%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#e0f4ff" />
            <stop offset="35%" stopColor="#38bdf8" />
            <stop offset="70%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#082f49" />
          </radialGradient>
          <radialGradient id="mls-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g style={{ transformOrigin: '24px 30px', animation: 'mls-idle 3.2s ease-in-out infinite' }}>

          {/* ── Staff shaft ── */}
          <rect x="22.5" y="17" width="1.8" height="31" rx="0.9" fill="#0c2840" />
          <rect x="23" y="17" width="2.5" height="31" rx="1" fill="#0c3a5a" />
          <rect x="23" y="17" width="0.6" height="31" rx="0.3" fill="#38bdf8" opacity="0.2" />
          {[23, 31, 39].map(y => (
            <rect key={y} x="22.5" y={y} width="3" height="1.5" rx="0.5" fill="#0284c7" opacity="0.6" />
          ))}
          {/* Pommel */}
          <ellipse cx="24" cy="48.5" rx="2.5" ry="1.5" fill="#082f49" />

          {/* ── Staff top connector ── */}
          <rect x="21.5" y="15" width="5" height="3" rx="1.2" fill="#0369a1" />

          {/* ── Orb glow halo ── */}
          <circle cx="24" cy="9" r="12" fill="url(#mls-glow)"
            style={{ animation: 'mls-pulse 1.8s ease-in-out infinite' }} />

          {/* ── Outer rotating water ring ── */}
          <g style={{ transformOrigin: '24px 9px', animation: 'mls-cw 4s linear infinite' }}>
            <ellipse cx="24" cy="9" rx="8.5" ry="3" fill="none"
              stroke="#7dd3fc" strokeWidth="1.2" opacity="0.35" strokeDasharray="4 3" />
          </g>

          {/* ── Inner counter-rotating ring ── */}
          <g style={{ transformOrigin: '24px 9px', animation: 'mls-ccw 2.8s linear infinite' }}>
            <ellipse cx="24" cy="9" rx="6" ry="2" fill="none"
              stroke="#bae6fd" strokeWidth="0.8" opacity="0.4" strokeDasharray="3 4" />
          </g>

          {/* ── Orb body ── */}
          <circle cx="24" cy="9" r="7.5" fill="url(#mls-orb)" />

          {/* ── Vortex swirl inside orb ── */}
          <g style={{ transformOrigin: '24px 9px', animation: 'mls-cw 3s linear infinite' }}>
            <path d="M24,5 C27,6 29,9 27,12 C25,14 21,13 21,9 C21,6 24,5 24,5Z"
              fill="none" stroke="#bae6fd" strokeWidth="0.7" opacity="0.3" />
          </g>
          <g style={{ transformOrigin: '24px 9px', animation: 'mls-ccw 3.5s linear infinite' }}>
            <path d="M24,7 C26,7.5 27.5,9 26,11 C24.5,12.5 22,12 22,9 C22,7 24,7 24,7Z"
              fill="none" stroke="#e0f4ff" strokeWidth="0.6" opacity="0.3" />
          </g>

          {/* Orb gloss */}
          <ellipse cx="21" cy="6.5" rx="2.5" ry="1.5" fill="white" opacity="0.2" />

          {/* ── Water droplets ── */}
          <circle cx="30" cy="12" r="0.9" fill="#7dd3fc"
            style={{ animation: 'mls-drop 2.2s ease-out infinite' }} />
          <circle cx="18" cy="10" r="0.7" fill="#bae6fd"
            style={{ animation: 'mls-drop 2.2s ease-out infinite 0.8s' }} />
          <circle cx="28" cy="6" r="0.6" fill="#38bdf8"
            style={{ animation: 'mls-drop 2.2s ease-out infinite 1.5s' }} />

          {/* ── Rune on shaft ── */}
          <g stroke="#38bdf8" strokeWidth="0.5" fill="none" opacity="0.5">
            <path d="M23,27 L25,27 M24,25.5 L24,28.5 M22.8,25.5 L25.2,28.5" />
          </g>
        </g>
      </svg>
    </>
  );
}
