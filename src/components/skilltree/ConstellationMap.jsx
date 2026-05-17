import React, { useMemo } from 'react';
import SkillNode from './SkillNode';

// ── CSS keyframes injected once ───────────────────────────────────────────────
const KEYFRAMES = `
@keyframes skt-pulse {
  0%,100% { transform: scale(1);    opacity: 1; }
  50%      { transform: scale(1.18); opacity: 0.85; }
}
@keyframes skt-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes skt-twinkle {
  0%,100% { opacity: 0.25; }
  50%      { opacity: 0.95; }
}
@keyframes skt-unlock {
  0%   { transform: scale(1);   }
  30%  { transform: scale(1.7); }
  65%  { transform: scale(0.88); }
  100% { transform: scale(1);   }
}
@keyframes skt-burst {
  0%   { transform: translate(0,0) scale(1); opacity: 1; }
  100% { transform: translate(var(--bx), var(--by)) scale(0.3); opacity: 0; }
}
@keyframes skt-tree-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
`;

let _injected = false;
function injectStyles() {
  if (_injected) return;
  _injected = true;
  const el = document.createElement('style');
  el.id = 'skt-keyframes';
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
}

// ── Seeded RNG for stable starfield ──────────────────────────────────────────
function seededRNG(seed) {
  let s = seed >>> 0;
  return () => {
    s = Math.imul(s ^ (s >>> 15), s | 1);
    s ^= s + Math.imul(s ^ (s >>> 7), s | 61);
    return ((s ^ (s >>> 14)) >>> 0) / 0x100000000;
  };
}

// ── Main component ────────────────────────────────────────────────────────────
const VB_W = 380;
const VB_H = 560;

export default function ConstellationMap({
  tree, getNodeState, justUnlocked, onNodeClick,
}) {
  injectStyles();

  // ── Stable starfield ──────────────────────────────────────────────────────
  const stars = useMemo(() => {
    const rng = seededRNG(0xdeadcafe);
    return Array.from({ length: 72 }, (_, i) => ({
      x: rng() * VB_W,
      y: rng() * VB_H,
      r: 0.6 + rng() * 1.2,
      op: 0.2 + rng() * 0.6,
      twinkle: i < 16, // first 16 twinkle
      dur: (1.8 + rng() * 2.2).toFixed(1),
      delay: (rng() * 3).toFixed(1),
    }));
  }, []);

  // ── Node pixel positions ───────────────────────────────────────────────────
  const nodePositions = useMemo(() =>
    tree.nodes.reduce((acc, n) => {
      acc[n.id] = { px: n.x * VB_W, py: n.y * VB_H };
      return acc;
    }, {}),
    [tree],
  );

  // ── Connection state helper ───────────────────────────────────────────────
  function connState(conn) {
    const fromState = getNodeState(conn.from);
    const toState   = getNodeState(conn.to);
    if (fromState === 'unlocked' && toState === 'unlocked') return 'both';
    if (fromState === 'unlocked') return 'from';
    return 'none';
  }

  // ── Nebula center (centroid of nodes) ─────────────────────────────────────
  const nebulaX = tree.nodes.reduce((s, n) => s + n.x * VB_W, 0) / tree.nodes.length;
  const nebulaY = tree.nodes.reduce((s, n) => s + n.y * VB_H, 0) / tree.nodes.length;

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      width="100%" height="100%"
      style={{ display: 'block', animation: 'skt-tree-fade 0.2s ease-out' }}
    >
      <defs>
        {/* Nebula gradient */}
        <radialGradient id={`nebula-${tree.id}`}
          cx={nebulaX / VB_W} cy={nebulaY / VB_H} r="0.55"
          gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor={tree.color} stopOpacity="0.11"/>
          <stop offset="60%"  stopColor={tree.color} stopOpacity="0.04"/>
          <stop offset="100%" stopColor={tree.color} stopOpacity="0"/>
        </radialGradient>

        {/* Line glow filter */}
        <filter id={`line-glow-${tree.id}`} x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── Deep space background ── */}
      <rect width={VB_W} height={VB_H} fill="#06040f"/>

      {/* ── Nebula glow ── */}
      <rect width={VB_W} height={VB_H} fill={`url(#nebula-${tree.id})`}/>

      {/* ── Starfield ── */}
      {stars.map((s, i) => (
        s.twinkle ? (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.op}
            style={{
              animation: `skt-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}/>
        ) : (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.op}/>
        )
      ))}

      {/* ── Connection lines ── */}
      {tree.connections.map(conn => {
        const from = nodePositions[conn.from];
        const to   = nodePositions[conn.to];
        if (!from || !to) return null;
        const cs = connState(conn);

        return (
          <g key={`${conn.from}-${conn.to}`}>
            {cs === 'none' && (
              <line x1={from.px} y1={from.py} x2={to.px} y2={to.py}
                stroke="white" strokeOpacity={0.15} strokeWidth={1}
                strokeDasharray="4 6"/>
            )}
            {cs === 'from' && (
              <line x1={from.px} y1={from.py} x2={to.px} y2={to.py}
                stroke={tree.color} strokeOpacity={0.4} strokeWidth={1.2}/>
            )}
            {cs === 'both' && (
              <line x1={from.px} y1={from.py} x2={to.px} y2={to.py}
                stroke={tree.glowColor} strokeWidth={1.8}
                filter={`url(#line-glow-${tree.id})`}/>
            )}
          </g>
        );
      })}

      {/* ── Nodes ── */}
      {tree.nodes.map(node => {
        const { px, py } = nodePositions[node.id];
        const state = getNodeState(node.id);
        return (
          <g key={node.id} transform={`translate(${px},${py})`}>
            <SkillNode
              node={node}
              tree={tree}
              state={state}
              isJustUnlocked={justUnlocked === node.id}
              onClick={onNodeClick}
            />
          </g>
        );
      })}
    </svg>
  );
}
