import React from 'react';

// ── Star polygon helpers ─────────────────────────────────────────────────────
function star5(cx, cy, outerR, innerR) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
}

function star6(cx, cy, outerR) {
  // 12-point alternating: outer / half for a Star-of-David feel
  const pts = [];
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6 - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : outerR * 0.45;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
}

// Orbit particle positions (8 stops along a circle)
function orbitValues(cx, cy, r, offset = 0) {
  const stops = 9; // 8 unique + repeat first for smooth loop
  const cxVals = [], cyVals = [];
  for (let i = 0; i < stops; i++) {
    const a = (i / (stops - 1)) * 2 * Math.PI + offset;
    cxVals.push((cx + r * Math.cos(a)).toFixed(1));
    cyVals.push((cy + r * Math.sin(a)).toFixed(1));
  }
  return { cx: cxVals.join(';'), cy: cyVals.join(';') };
}

// ── Main component ────────────────────────────────────────────────────────────
export default function SkillNode({ node, tree, state, isJustUnlocked, onClick }) {
  const { id, tier } = node;
  const { color, glowColor } = tree;
  const isAbility  = tier === 5;
  const isUnlocked = state === 'unlocked';
  const isAvail    = state === 'available';
  const filterId   = `glow-${id}`;
  const nodeColor  = isUnlocked && isAbility ? '#ffd700' : isUnlocked ? glowColor : isAvail ? color : 'transparent';

  // Pixel positions come from normalized x/y baked into the SVG by ConstellationMap
  // We receive cx/cy from the parent (ConstellationMap passes them via a wrapper <g>)
  // So this component renders at local origin (0,0) — parent <g> translates it
  const cx = 0, cy = 0;

  const outerR = isUnlocked ? (isAbility ? 20 : 16) : isAvail ? 14 : 13;
  const innerStarR = isUnlocked ? 9 : isAvail ? 7 : 6;
  const innerInnerR = innerStarR * 0.42;

  // Orbit particles for unlocked nodes
  const orb = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((off, i) =>
    orbitValues(cx, cy, outerR + 8, off)
  );

  const glowFilter = isUnlocked ? `url(#${filterId})` : 'none';
  const abilityNodeColor = isAbility && isUnlocked ? '#ffd700' : glowColor;

  return (
    <g>
      {/* Filter def (local — only used by this node) */}
      <defs>
        <filter id={filterId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation={isAbility ? 7 : 5} result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* ── UNLOCKED state ── */}
      {isUnlocked && (
        <>
          {/* Glow halo */}
          <circle cx={cx} cy={cy} r={outerR + 6}
            fill={abilityNodeColor} opacity={0.12}
            filter={glowFilter}/>

          {/* Rotating outer ring */}
          <circle cx={cx} cy={cy} r={outerR}
            stroke={abilityNodeColor} strokeWidth={isAbility ? 2 : 1.5}
            strokeDasharray="6 4" fill={`${abilityNodeColor}33`}
            style={{
              animation: 'skt-spin 8s linear infinite',
              transformBox: 'fill-box', transformOrigin: 'center',
            }}
          />

          {/* Inner star */}
          <polygon points={isAbility
            ? star6(cx, cy, innerStarR + 2)
            : star5(cx, cy, innerStarR, innerInnerR)}
            fill={abilityNodeColor}
            filter={glowFilter}
            style={isJustUnlocked ? { animation: 'skt-unlock 0.4s ease-out' } : {}}
          />

          {/* Ability BADGE */}
          {isAbility && (
            <text x={cx} y={cy - outerR - 10}
              textAnchor="middle" fontSize="7"
              fontFamily="Courier New" fontWeight="bold"
              fill="#ffd700" letterSpacing="1.5">
              ✦ ABILITY
            </text>
          )}

          {/* Orbit particles (3) */}
          {orb.map((o, i) => (
            <circle key={i} r={2.5} fill={abilityNodeColor} opacity={0.75 - i * 0.15}>
              <animate attributeName="cx" values={o.cx} dur={`${3 + i * 0.6}s`} repeatCount="indefinite"/>
              <animate attributeName="cy" values={o.cy} dur={`${3 + i * 0.6}s`} repeatCount="indefinite"/>
            </circle>
          ))}

          {/* Checkmark */}
          <text x={cx} y={cy + 4.5}
            textAnchor="middle" fontSize="11"
            fill="white" fontWeight="bold">✓</text>
        </>
      )}

      {/* ── AVAILABLE state ── */}
      {isAvail && (
        <>
          {/* Pulsing outer ring */}
          <circle cx={cx} cy={cy} r={outerR}
            stroke={color} strokeWidth={1.5} strokeOpacity={0.75}
            fill={`${color}18`}
            style={{
              animation: 'skt-pulse 2s ease-in-out infinite',
              transformBox: 'fill-box', transformOrigin: 'center',
            }}
          />
          {/* Rotating shimmer arc */}
          <circle cx={cx} cy={cy} r={outerR}
            stroke={color} strokeWidth={2.5} strokeOpacity={0.5}
            strokeDasharray="22 78" fill="none"
            style={{
              animation: 'skt-spin 3s linear infinite',
              transformBox: 'fill-box', transformOrigin: 'center',
            }}
          />
          {/* Inner star */}
          <polygon points={isAbility
            ? star6(cx, cy, innerStarR)
            : star5(cx, cy, innerStarR, innerInnerR)}
            fill={`${color}99`} stroke={color} strokeWidth={0.8}
          />
          {/* Ability badge */}
          {isAbility && (
            <text x={cx} y={cy - outerR - 10}
              textAnchor="middle" fontSize="7"
              fontFamily="Courier New" fontWeight="bold"
              fill={color} letterSpacing="1.5">
              ✦ ABILITY
            </text>
          )}
          {/* Cost label */}
          <text x={cx} y={cy + outerR + 12}
            textAnchor="middle" fontSize="8"
            fontFamily="Courier New" fill={color} fontWeight="bold">
            {node.cost} STP
          </text>
        </>
      )}

      {/* ── LOCKED state ── */}
      {state === 'locked' && (
        <>
          <circle cx={cx} cy={cy} r={outerR}
            stroke="white" strokeOpacity={0.2} strokeWidth={1}
            fill="transparent"
          />
          <polygon points={isAbility
            ? star6(cx, cy, innerStarR)
            : star5(cx, cy, innerStarR, innerInnerR)}
            fill="#1a1a2e" stroke="white" strokeOpacity={0.3} strokeWidth={0.8}
          />
          {/* Lock icon */}
          <text x={cx} y={cy + 3.5}
            textAnchor="middle" fontSize="9" fill="white" opacity={0.35}>
            🔒
          </text>
          {/* Cost (dimmed) */}
          <text x={cx} y={cy + outerR + 12}
            textAnchor="middle" fontSize="8"
            fontFamily="Courier New" fill="white" opacity={0.3}>
            {node.cost} STP
          </text>
        </>
      )}

      {/* ── Invisible 44px tap target (always on top) ── */}
      <circle cx={cx} cy={cy} r={22}
        fill="transparent" style={{ cursor: 'pointer' }}
        onClick={() => onClick(node.id)}
      />
    </g>
  );
}
