import React from 'react';

/* Thunder Edge — Electric / Rare
   A jagged lightning-forged blade — serrated edge like a thunderbolt.
   Arcing lightning crawls up the blade face. */

const css = `
@keyframes the-arc {
  0%, 100% { opacity: 0; }
  10%       { opacity: 1; }
  20%       { opacity: 0.2; }
  25%       { opacity: 0.9; }
  40%       { opacity: 0; }
}
@keyframes the-arc2 {
  0%, 60%  { opacity: 0; }
  65%      { opacity: 1; }
  75%      { opacity: 0.3; }
  80%      { opacity: 0.8; }
  95%      { opacity: 0; }
  100%     { opacity: 0; }
}
@keyframes the-glow {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.9; }
}
@keyframes the-idle {
  0%, 100% { transform: rotate(-1deg) translateY(0); }
  50%       { transform: rotate(1.5deg) translateY(-1.5px); }
}
@keyframes the-spark {
  0%   { opacity: 0; transform: translate(0, 0) scale(1); }
  30%  { opacity: 1; }
  100% { opacity: 0; transform: translate(4px, -4px) scale(0); }
}
`;

export default function ThunderEdge({ size = 48, style = {} }) {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 48 48" width={size} height={size}
        style={{ display: 'block', ...style }} xmlns="http://www.w3.org/2000/svg">

        <defs>
          <linearGradient id="the-blade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#312e00" />
            <stop offset="35%" stopColor="#a8930a" />
            <stop offset="65%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>
          <filter id="the-glow">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <g style={{ transformOrigin: '24px 24px', animation: 'the-idle 2.6s ease-in-out infinite' }}>

          {/* Electric glow behind blade */}
          <polygon points="19,42 29,42 26,6 22,6" fill="#facc15" opacity="0.08"
            style={{ filter: 'blur(4px)' }} />

          {/* ── Jagged blade — lightning bolt profile ── */}
          {/* The right edge has a pronounced zigzag/serration pattern */}
          <path
            d={`
              M22.5,42 L25.5,42
              L26,38 L27.5,35 L25,33 L27,30 L25,27
              L26.5,24 L25,21 L26.5,18 L25,15
              L26,12 L24.5,8 L23.5,8
              L22,12 L23.5,15 L22,18 L23.5,21
              L22,24 L23.5,27 L21.5,30 L23.5,33
              L21,35 L22,38
              Z
            `}
            fill="url(#the-blade)"
          />

          {/* Dark left edge shadow */}
          <path d="M22.5,42 L22,38 L21.5,35 L23.5,33 L21.5,30 L23.5,27 L22,24 L23.5,21 L22,18 L23.5,15 L22,12 L23.5,8 L22.5,8 L21.5,12 L22.8,15 L21.5,18 L22.8,21 L21.5,24 L22.8,27 L20.8,30 L22.8,33 L20.5,35 L21.5,38 L21.5,42Z"
            fill="#312e00" opacity="0.5" />

          {/* Blade edge highlight glow */}
          <path
            d="M25,33 L27,30 L25,27 L26.5,24 L25,21 L26.5,18 L25,15 L26,12 L24.5,8"
            fill="none" stroke="#fef08a" strokeWidth="0.6" opacity="0.5"
            style={{ animation: 'the-glow 0.8s ease-in-out infinite' }}
          />

          {/* ── Lightning arcs on blade ── */}
          <path
            d="M23.5,38 L25,34 L23,31 L25.5,27 L23,23 L25,19 L23.5,15 L24.5,11"
            fill="none" stroke="#fff176" strokeWidth="0.8"
            style={{ animation: 'the-arc 2s steps(1) infinite' }}
            filter="url(#the-glow)"
          />
          <path
            d="M24,36 L22.5,32 L24.5,29 L22,25 L24.5,21 L23,17 L24.5,13"
            fill="none" stroke="#fde047" strokeWidth="0.6"
            style={{ animation: 'the-arc2 2s steps(1) infinite' }}
            filter="url(#the-glow)"
          />

          {/* ── Sparks ── */}
          <circle cx="26.5" cy="20" r="1" fill="#fff176"
            style={{ animation: 'the-spark 1.5s ease-out infinite 0.3s' }} />
          <circle cx="25" cy="30" r="0.8" fill="#facc15"
            style={{ animation: 'the-spark 1.5s ease-out infinite 1s' }} />
          <circle cx="27" cy="25" r="0.7" fill="#fef08a"
            style={{ animation: 'the-spark 1.8s ease-out infinite 0.6s' }} />

          {/* ── Crossguard — angular, sharp ── */}
          <path d="M14,41 L18,40 L22.5,41 L25.5,41 L30,40 L34,41 L34,43 L30,42 L25.5,43 L22.5,43 L18,42 L14,43Z"
            fill="#786504" />
          <path d="M14,41 L18,40 L22.5,41 L25.5,41 L30,40 L34,41 L34,41.5 L30,40.5 L25.5,41.5 L22.5,41.5 L18,40.5 L14,41.5Z"
            fill="#facc15" opacity="0.3" />
          {/* Guard spikes */}
          <polygon points="14,41 12,42 14,43" fill="#5c4d00" />
          <polygon points="34,41 36,42 34,43" fill="#5c4d00" />

          {/* ── Grip ── */}
          <rect x="22.5" y="43" width="3" height="9" rx="1" fill="#1a1400" />
          {[44.5, 46.5, 48.5, 50.5].map(y => (
            <rect key={y} x="22" y={y} width="4" height="1" rx="0.4" fill="#786504" opacity="0.6" />
          ))}
          {/* Grip lightning mark */}
          <path d="M24.5,45 L23.5,47 L24.5,47 L23.5,51"
            fill="none" stroke="#facc15" strokeWidth="0.5" opacity="0.4"
            style={{ animation: 'the-arc 3s steps(1) infinite 1s' }} />

          {/* ── Pommel — lightning-bolt shaped ── */}
          <polygon points="24,52 21,53.5 22.5,55 24,54 25.5,55 27,53.5"
            fill="#786504" />
          <polygon points="24,52 21.5,53.5 22.5,54.5 24,53.5 25.5,54.5 26.5,53.5"
            fill="#facc15" opacity="0.4" />
        </g>
      </svg>
    </>
  );
}
