import React, { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { ALL_NODES, NODE_MAP, EDGES, PATHS } from '../../data/skilltreeData';

// ── CSS keyframes (injected once) ───────────────────────────────────────────
const CSS_ID = 'skilltree-keyframes';
function injectCSS() {
  if (document.getElementById(CSS_ID)) return;
  const el = document.createElement('style');
  el.id = CSS_ID;
  el.textContent = `
    @keyframes st-panel-up {
      from { transform: translateY(72px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    @keyframes st-toast-in {
      from { transform: translateX(-50%) translateY(-14px); opacity: 0; }
      to   { transform: translateX(-50%) translateY(0);     opacity: 1; }
    }
    @keyframes st-ring-pulse {
      0%   { r: 28; opacity: 0.7; }
      100% { r: 40; opacity: 0;   }
    }
    @keyframes st-node-pop {
      0%   { transform: scale(1);    }
      50%  { transform: scale(1.35); }
      100% { transform: scale(1);    }
    }
  `;
  document.head.appendChild(el);
}

// ── Deterministic starfield ──────────────────────────────────────────────────
function makeStars(count = 130) {
  let seed = 0xdeadbeef;
  const rand = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    return (seed >>> 0) / 0xffffffff;
  };
  return Array.from({ length: count }, () => ({
    x: rand() * 1200,
    y: rand() * 1200,
    r: rand() * 1.3 + 0.2,
    op: rand() * 0.45 + 0.15,
  }));
}
const STARS = makeStars();

// ── Per-node visual properties ───────────────────────────────────────────────
function nodeVisuals(node, state, selected) {
  if (node.type === 'start') return null;

  const pc = node.path ? PATHS[node.path].color : '#ffd700';
  const pg = node.path ? PATHS[node.path].glow  : '#ffd700';

  if (state === 'unlocked') {
    return { fill: `${pg}38`, stroke: selected ? pg : pg, sw: selected ? 3 : 2.5, dash: null, opacity: 1, glow: pg };
  }
  if (state === 'available') {
    return { fill: selected ? `${pc}30` : `${pc}18`, stroke: pc, sw: selected ? 2.5 : 1.5, dash: '5,3', opacity: 0.95, glow: null };
  }
  return { fill: '#080c18', stroke: selected ? '#3a4f6a' : '#1c2a40', sw: selected ? 1.5 : 1, dash: '3,4', opacity: selected ? 0.75 : 0.55, glow: null };
}

// ── Effect summary lines ─────────────────────────────────────────────────────
function formatEffects(effects = {}) {
  const lines = [];
  const pct  = v => `+${Math.round(v * 100)}%`;
  const flat = v => v > 0 ? `+${v}` : `${v}`;
  if (effects.atkMult)      lines.push(`${pct(effects.atkMult)} ATK`);
  if (effects.critBonus)    lines.push(`${pct(effects.critBonus)} Crit`);
  if (effects.dodgeBonus)   lines.push(`${pct(effects.dodgeBonus)} Dodge`);
  if (effects.defBonus)     lines.push(`${pct(effects.defBonus)} DEF`);
  if (effects.hpBonus)      lines.push(`${flat(effects.hpBonus)} Max HP`);
  if (effects.hpMult)       lines.push(`${pct(effects.hpMult)} Max HP`);
  if (effects.lifeSteal)    lines.push(`${pct(effects.lifeSteal)} Life Steal`);
  if (effects.elemDmg)      lines.push(`${pct(effects.elemDmg)} Elem Dmg`);
  if (effects.reflect)      lines.push(`${pct(effects.reflect)} Reflect`);
  if (effects.hpRegen)      lines.push(`${pct(effects.hpRegen)} HP Regen`);
  if (effects.poisonDmg)    lines.push(`${pct(effects.poisonDmg)} Poison`);
  if (effects.counterBonus) lines.push(`${pct(effects.counterBonus)} Counter`);
  if (effects.agiBonus)     lines.push(`${pct(effects.agiBonus)} AGI`);
  if (effects.spellDmg)     lines.push(`${pct(effects.spellDmg)} Spell Dmg`);
  if (effects.lowHpDmg)     lines.push(`${pct(effects.lowHpDmg)} Low-HP Dmg`);
  if (effects.executioner)  lines.push(`${pct(effects.executioner)} Exec Dmg`);
  if (effects.weakDmg)      lines.push(`${pct(effects.weakDmg)} Weak Dmg`);
  if (effects.poisonChance) lines.push(`${pct(effects.poisonChance)} Poison Chance`);
  if (effects.debuffChance) lines.push(`${pct(effects.debuffChance)} Debuff Chance`);
  if (effects.critDefPen)   lines.push(`${pct(effects.critDefPen)} Crit DEF-Pen`);
  if (effects.ability)      lines.push(`ABILITY: ${effects.ability}`);
  if (effects.furyProc)     lines.push('PASSIVE: Fury Proc');
  if (effects.godOfWar)     lines.push('PASSIVE: God of War');
  if (effects.stoneWall)    lines.push('PASSIVE: Stone Wall');
  if (effects.unbreakable)  lines.push('PASSIVE: Unbreakable');
  if (effects.lastStand)    lines.push('PASSIVE: Last Stand');
  if (effects.ghostStep)    lines.push('PASSIVE: Ghost Step');
  if (effects.deathMark)    lines.push('PASSIVE: Death Mark');
  if (effects.phantomKiller)lines.push('PASSIVE: Phantom Killer');
  if (effects.venomStrike)  lines.push('PASSIVE: Venom Strike');
  if (effects.arcaneSurge)  lines.push('PASSIVE: Arcane Surge');
  if (effects.arcaneAscendant) lines.push('PASSIVE: Arcane Ascendant');
  return lines;
}

// ── Node shapes (with hit areas) ─────────────────────────────────────────────
function NodeShape({ node, state, selected, onTap, justPopped }) {
  const { x, y, type, id } = node;
  const v = nodeVisuals(node, state, selected);
  const HIT_R = 22; // minimum tap radius

  const handleTap = useCallback((e) => {
    e.stopPropagation();
    onTap(id);
  }, [id, onTap]);

  // ── START ──
  if (type === 'start') {
    return (
      <g onClick={handleTap} style={{ cursor: 'pointer' }}>
        {selected && <circle cx={x} cy={y} r={32} fill="none" stroke="#ffd700" strokeWidth={1.5} opacity={0.5} strokeDasharray="4,3"/>}
        <circle cx={x} cy={y} r={26} fill="none" stroke="#ffd70033" strokeWidth={2} />
        <circle cx={x} cy={y} r={20} fill="#120a02" stroke="#ffd70099" strokeWidth={2} />
        <circle cx={x} cy={y} r={14} fill="#1e1004" stroke="#ffd700" strokeWidth={1.5} />
        <text x={x} y={y + 4} textAnchor="middle" dominantBaseline="middle"
          fontSize={11} fill="#ffd700" fontFamily="Courier New" fontWeight="bold"
        >✦</text>
        {/* hit area */}
        <circle cx={x} cy={y} r={HIT_R} fill="transparent" />
      </g>
    );
  }

  // ── KEYSTONE ──
  if (type === 'keystone') {
    return (
      <g opacity={v.opacity} onClick={handleTap} style={{ cursor: 'pointer' }}>
        {selected && <circle cx={x} cy={y} r={30} fill="none" stroke={v.stroke} strokeWidth={1.5} opacity={0.6} strokeDasharray="4,3"/>}
        {v.glow && <circle cx={x} cy={y} r={24} fill="none" stroke={v.glow} strokeWidth={6} opacity={0.15} />}
        <circle cx={x} cy={y} r={23} fill="none" stroke={v.stroke} strokeWidth={1} opacity={0.4} strokeDasharray="6,3" />
        <circle cx={x} cy={y} r={20} fill={v.fill} stroke={v.stroke} strokeWidth={v.sw} strokeDasharray={v.dash}
          style={justPopped ? { animation: 'st-node-pop 0.4s ease-out' } : undefined} />
        <circle cx={x} cy={y} r={12} fill="none" stroke={v.stroke} strokeWidth={0.8} opacity={0.6} />
        <circle cx={x} cy={y} r={HIT_R} fill="transparent" />
      </g>
    );
  }

  // ── ABILITY (diamond) ──
  if (type === 'ability') {
    const s = 13;
    const pts  = `${x},${y - s} ${x + s},${y} ${x},${y + s} ${x - s},${y}`;
    const pts2 = `${x},${y - s - 4} ${x + s + 4},${y} ${x},${y + s + 4} ${x - s - 4},${y}`;
    const selPts = `${x},${y - s - 6} ${x + s + 6},${y} ${x},${y + s + 6} ${x - s - 6},${y}`;
    return (
      <g opacity={v.opacity} onClick={handleTap} style={{ cursor: 'pointer' }}>
        {selected && <polygon points={selPts} fill="none" stroke={v.stroke} strokeWidth={1.5} opacity={0.6} strokeDasharray="4,3"/>}
        {v.glow && <polygon points={pts2} fill="none" stroke={v.glow} strokeWidth={5} opacity={0.15} />}
        <polygon points={pts} fill={v.fill} stroke={v.stroke} strokeWidth={v.sw} strokeDasharray={v.dash}
          style={justPopped ? { animation: 'st-node-pop 0.4s ease-out' } : undefined} />
        <circle cx={x} cy={y} r={HIT_R} fill="transparent" />
      </g>
    );
  }

  // ── NOTABLE ──
  if (type === 'notable') {
    return (
      <g opacity={v.opacity} onClick={handleTap} style={{ cursor: 'pointer' }}>
        {selected && <circle cx={x} cy={y} r={19} fill="none" stroke={v.stroke} strokeWidth={1.5} opacity={0.6} strokeDasharray="4,3"/>}
        {v.glow && <circle cx={x} cy={y} r={17} fill="none" stroke={v.glow} strokeWidth={5} opacity={0.2} />}
        <circle cx={x} cy={y} r={13} fill={v.fill} stroke={v.stroke} strokeWidth={v.sw} strokeDasharray={v.dash}
          style={justPopped ? { animation: 'st-node-pop 0.4s ease-out' } : undefined} />
        <circle cx={x} cy={y} r={HIT_R} fill="transparent" />
      </g>
    );
  }

  // ── SMALL ──
  return (
    <g opacity={v.opacity} onClick={handleTap} style={{ cursor: 'pointer' }}>
      {selected && <circle cx={x} cy={y} r={14} fill="none" stroke={v.stroke} strokeWidth={1.5} opacity={0.6} strokeDasharray="4,3"/>}
      {v.glow && <circle cx={x} cy={y} r={11} fill="none" stroke={v.glow} strokeWidth={4} opacity={0.2} />}
      <circle cx={x} cy={y} r={8} fill={v.fill} stroke={v.stroke} strokeWidth={v.sw} strokeDasharray={v.dash}
        style={justPopped ? { animation: 'st-node-pop 0.4s ease-out' } : undefined} />
      <circle cx={x} cy={y} r={HIT_R} fill="transparent" />
    </g>
  );
}

// ── Toast notification ────────────────────────────────────────────────────────
function Toast({ text, color, onDone }) {
  useEffect(() => {
    const id = setTimeout(onDone, 2400);
    return () => clearTimeout(id);
  }, [onDone]);
  return (
    <div style={{
      position: 'fixed', top: 64, left: '50%', zIndex: 300,
      transform: 'translateX(-50%)',
      background: '#080e1c',
      border: `1px solid ${color}66`,
      borderRadius: 10, padding: '9px 20px',
      fontFamily: 'Courier New', fontSize: 11, fontWeight: 700,
      color, letterSpacing: 1.5,
      boxShadow: `0 0 24px ${color}44`,
      animation: 'st-toast-in 0.28s ease-out',
      whiteSpace: 'nowrap', pointerEvents: 'none',
    }}>
      {text}
    </div>
  );
}

// ── Type badge label ─────────────────────────────────────────────────────────
const TYPE_LABEL = { small: 'PASSIVE', notable: 'NOTABLE', ability: 'ABILITY', keystone: 'KEYSTONE', start: 'START' };

// ── Info panel (slides up from bottom) ───────────────────────────────────────
function InfoPanel({ node, state, stp, onUnlock, onClose }) {
  const pathData  = node.path ? PATHS[node.path] : null;
  const color     = pathData ? pathData.color : '#ffd700';
  const glow      = pathData ? pathData.glow  : '#ffd700';
  const isUnlocked = state === 'unlocked';
  const isAvail    = state === 'available';
  const affordable = isAvail && stp >= node.cost;
  const effects    = formatEffects(node.effects);

  const stateColor = isUnlocked ? glow : isAvail ? color : '#475569';
  const stateLabel = isUnlocked ? '✓ UNLOCKED' : isAvail ? 'AVAILABLE' : '✕ LOCKED';

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.35)',
      }} />

      {/* Panel */}
      <div style={{
        position: 'fixed', bottom: 54, left: 0, right: 0, zIndex: 210,
        background: '#080e1c',
        border: `1px solid ${color}44`,
        borderTop: `2px solid ${color}`,
        borderRadius: '20px 20px 0 0',
        padding: '18px 20px 28px',
        animation: 'st-panel-up 0.24s ease-out',
        boxShadow: `0 -8px 48px ${color}1a`,
        maxHeight: '62vh',
        overflowY: 'auto',
      }}>
        {/* Drag handle */}
        <div style={{
          width: 38, height: 4, borderRadius: 2,
          background: 'rgba(255,255,255,0.12)',
          margin: '-6px auto 16px',
        }} />

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            {/* Badges */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
              <span style={{
                fontSize: 7, fontFamily: 'Courier New', letterSpacing: 1.5,
                color: stateColor, background: `${stateColor}18`,
                border: `1px solid ${stateColor}44`,
                borderRadius: 4, padding: '2px 8px',
              }}>{stateLabel}</span>
              <span style={{
                fontSize: 7, fontFamily: 'Courier New', letterSpacing: 1.5,
                color: '#64748b', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 4, padding: '2px 8px',
              }}>{TYPE_LABEL[node.type] || node.type.toUpperCase()}</span>
              {pathData && (
                <span style={{
                  fontSize: 7, fontFamily: 'Courier New', letterSpacing: 1.5,
                  color, background: `${color}12`,
                  border: `1px solid ${color}33`,
                  borderRadius: 4, padding: '2px 8px',
                }}>{pathData.name}</span>
              )}
            </div>
            {/* Name */}
            <div style={{
              fontSize: 18, fontWeight: 800, color: '#e2e8f0',
              fontFamily: 'Courier New', letterSpacing: 1,
            }}>{node.name}</div>
          </div>
          <button onClick={onClose} style={{
            color: '#475569', fontSize: 18, lineHeight: 1,
            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
          }}>✕</button>
        </div>

        {/* Description */}
        <p style={{
          fontSize: 12, color: '#94a3b8', lineHeight: 1.6,
          margin: '0 0 14px', fontFamily: 'system-ui, sans-serif',
        }}>{node.desc}</p>

        {/* Effect chips */}
        {effects.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {effects.map((line, i) => (
              <span key={i} style={{
                fontSize: 9, fontFamily: 'Courier New', letterSpacing: 1,
                color: glow, background: `${color}12`,
                border: `1px solid ${color}33`,
                borderRadius: 5, padding: '3px 8px',
              }}>{line}</span>
            ))}
          </div>
        )}

        {/* Cost / balance row */}
        {node.type !== 'start' && (
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 14px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)',
            marginBottom: 16,
          }}>
            <div style={{ fontFamily: 'Courier New', fontSize: 11, color: '#475569' }}>
              COST:{' '}
              <span style={{ color: isUnlocked ? '#4ade80' : color, fontWeight: 700, fontSize: 14 }}>
                {node.cost}
              </span>
              <span style={{ color: '#475569' }}> STP</span>
            </div>
            <div style={{ fontFamily: 'Courier New', fontSize: 11, color: '#475569' }}>
              BALANCE:{' '}
              <span style={{ color: '#facc15', fontWeight: 700, fontSize: 14 }}>{stp}</span>
              <span style={{ color: '#475569' }}> STP</span>
            </div>
          </div>
        )}

        {/* Action area */}
        {isUnlocked && (
          <div style={{
            textAlign: 'center', padding: '13px',
            fontSize: 12, fontFamily: 'Courier New', color: '#4ade80', letterSpacing: 2,
            background: 'rgba(74,222,128,0.06)',
            border: '1px solid rgba(74,222,128,0.2)',
            borderRadius: 10,
          }}>
            ✓ SKILL UNLOCKED
          </div>
        )}

        {isAvail && affordable && (
          <button onClick={() => onUnlock(node.id)} style={{
            width: '100%', padding: '15px 0',
            background: `linear-gradient(135deg, ${color}28, ${color}10)`,
            border: `2px solid ${color}`,
            borderRadius: 12,
            color: glow, fontFamily: 'Courier New',
            fontSize: 13, fontWeight: 700, letterSpacing: 3,
            cursor: 'pointer',
            boxShadow: `0 0 24px ${color}33`,
          }}>
            UNLOCK — {node.cost} STP
          </button>
        )}

        {isAvail && !affordable && (
          <div style={{
            textAlign: 'center', padding: '13px',
            fontSize: 11, fontFamily: 'Courier New', letterSpacing: 1,
            color: '#ef4444',
            background: 'rgba(239,68,68,0.06)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: 10,
          }}>
            NOT ENOUGH STP — need {node.cost - stp} more
          </div>
        )}

        {state === 'locked' && node.type !== 'start' && (
          <div style={{
            textAlign: 'center', padding: '13px',
            fontSize: 11, fontFamily: 'Courier New', letterSpacing: 1,
            color: '#475569',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 10,
          }}>
            {node.requires.length > 0
              ? `REQUIRES: ${node.requires.map(r => NODE_MAP[r]?.name || r).join(', ')}`
              : 'LOCKED'}
          </div>
        )}
      </div>
    </>
  );
}

// ── Clamp helper ─────────────────────────────────────────────────────────────
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const MIN_SCALE = 0.35;
const MAX_SCALE = 3.0;

// ── Main screen ───────────────────────────────────────────────────────────────
export default function SkillTreeScreen({ stp, unlockedSkills, getNodeState, canUnlock, unlock }) {
  const [selectedId, setSelectedId] = useState(null);
  const [poppedId,   setPoppedId]   = useState(null);
  const [toast,      setToast]      = useState(null);
  const [xform,      setXform]      = useState({ scale: 1, tx: 0, ty: 0 });

  const containerRef = useRef(null);
  // xformRef mirrors xform for gesture math (no stale-closure issues)
  const xformRef = useRef({ scale: 1, tx: 0, ty: 0 });
  // gesture state — mutated directly, never causes re-render
  const gestRef  = useRef({ active: false, type: null, moved: false,
    x0: 0, y0: 0, tx0: 0, ty0: 0,
    dist0: 0, scale0: 1, midX0: 0, midY0: 0 });

  useEffect(() => { injectCSS(); }, []);

  // ── Initial centering (after layout so we have real dimensions) ──────────
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const next = { scale: 1, tx: el.clientWidth / 2 - 600, ty: el.clientHeight / 2 - 600 };
    xformRef.current = next;
    setXform(next);
  }, []);

  // ── Attach non-passive touch + wheel listeners ───────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const applyXform = (next) => {
      xformRef.current = next;
      setXform({ ...next });
    };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        gestRef.current = {
          active: true, type: 'drag', moved: false,
          x0: t.clientX, y0: t.clientY,
          tx0: xformRef.current.tx, ty0: xformRef.current.ty,
        };
      } else if (e.touches.length === 2) {
        const [a, b] = [e.touches[0], e.touches[1]];
        const dist = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
        const midX = (a.clientX + b.clientX) / 2;
        const midY = (a.clientY + b.clientY) / 2;
        gestRef.current = {
          active: true, type: 'pinch', moved: false,
          dist0: dist, scale0: xformRef.current.scale,
          midX0: midX, midY0: midY,
          tx0: xformRef.current.tx, ty0: xformRef.current.ty,
        };
      }
    };

    const onTouchMove = (e) => {
      e.preventDefault();
      const g = gestRef.current;
      if (!g.active) return;

      if (g.type === 'drag' && e.touches.length >= 1) {
        const t = e.touches[0];
        const dx = t.clientX - g.x0;
        const dy = t.clientY - g.y0;
        if (Math.abs(dx) > 6 || Math.abs(dy) > 6) g.moved = true;
        applyXform({ ...xformRef.current, tx: g.tx0 + dx, ty: g.ty0 + dy });
      }

      if (g.type === 'pinch' && e.touches.length >= 2) {
        const [a, b] = [e.touches[0], e.touches[1]];
        const dist = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
        const midX = (a.clientX + b.clientX) / 2;
        const midY = (a.clientY + b.clientY) / 2;
        const newScale = clamp(g.scale0 * dist / g.dist0, MIN_SCALE, MAX_SCALE);
        // keep canvas point under the pinch midpoint stationary
        const cX = (g.midX0 - g.tx0) / g.scale0;
        const cY = (g.midY0 - g.ty0) / g.scale0;
        const dMidX = midX - g.midX0;
        const dMidY = midY - g.midY0;
        g.moved = true;
        applyXform({
          scale: newScale,
          tx: midX + dMidX - cX * newScale,
          ty: midY + dMidY - cY * newScale,
        });
      }
    };

    const onTouchEnd = () => { gestRef.current.active = false; };

    const onWheel = (e) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mX = e.clientX - rect.left;
      const mY = e.clientY - rect.top;
      const { scale, tx, ty } = xformRef.current;
      const factor = e.deltaY > 0 ? 0.88 : 1.14;
      const newScale = clamp(scale * factor, MIN_SCALE, MAX_SCALE);
      const cX = (mX - tx) / scale;
      const cY = (mY - ty) / scale;
      applyXform({ scale: newScale, tx: mX - cX * newScale, ty: mY - cY * newScale });
    };

    const opts = { passive: false };
    el.addEventListener('touchstart', onTouchStart, opts);
    el.addEventListener('touchmove',  onTouchMove,  opts);
    el.addEventListener('touchend',   onTouchEnd,   opts);
    el.addEventListener('wheel',      onWheel,      opts);
    return () => {
      el.removeEventListener('touchstart', onTouchStart, opts);
      el.removeEventListener('touchmove',  onTouchMove,  opts);
      el.removeEventListener('touchend',   onTouchEnd,   opts);
      el.removeEventListener('wheel',      onWheel,      opts);
    };
  }, []);

  // ── Reset view ───────────────────────────────────────────────────────────
  const resetView = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const next = { scale: 1, tx: el.clientWidth / 2 - 600, ty: el.clientHeight / 2 - 600 };
    xformRef.current = next;
    setXform(next);
  }, []);

  const handleTap = useCallback((nodeId) => {
    // If a pan/pinch just finished, ignore the synthetic click
    if (gestRef.current.moved) { gestRef.current.moved = false; return; }
    setSelectedId(prev => prev === nodeId ? null : nodeId);
  }, []);

  const handleUnlock = useCallback((nodeId) => {
    const success = unlock(nodeId);
    if (!success) return;
    const node  = NODE_MAP[nodeId];
    const color = node.path ? PATHS[node.path].glow : '#ffd700';
    const isKey = node.type === 'keystone';
    const isAbi = node.type === 'ability';
    setToast({
      text:  isKey ? `⚡ KEYSTONE: ${node.name}!`
           : isAbi ? `✦ ABILITY: ${node.name}!`
                   : `✓ ${node.name} UNLOCKED!`,
      color: isKey ? '#ffd700' : color,
    });
    setPoppedId(nodeId);
    setTimeout(() => setPoppedId(null), 500);
    setSelectedId(null);
  }, [unlock]);

  const selectedNode = selectedId ? NODE_MAP[selectedId] : null;

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: '#06040f', minHeight: 0, overflow: 'hidden',
    }}>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '44px 16px 10px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}>
        <div>
          <div style={{
            fontSize: 14, fontWeight: 800, color: '#e2e8f0',
            fontFamily: 'Courier New', letterSpacing: 2,
          }}>
            ✦ SKILL TREE
          </div>
          <div style={{ fontSize: 8, color: '#334155', fontFamily: 'Courier New', letterSpacing: 2, marginTop: 2 }}>
            {Math.max(0, unlockedSkills.length - 1)} / {ALL_NODES.length - 1} NODES UNLOCKED
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Reset view button */}
          <button onClick={resetView} style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 8, padding: '6px 10px',
            color: '#64748b', fontFamily: 'Courier New',
            fontSize: 9, letterSpacing: 1, cursor: 'pointer',
          }}>⊙ RESET</button>
          {/* STP badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(250,204,21,0.1)',
            border: '1px solid rgba(250,204,21,0.35)',
            borderRadius: 8, padding: '6px 14px',
          }}>
            <span style={{ fontSize: 12 }}>✦</span>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#facc15', fontFamily: 'Courier New', lineHeight: 1 }}>
                {stp}
              </div>
              <div style={{ fontSize: 7, color: '#92750a', fontFamily: 'Courier New', letterSpacing: 1 }}>STP</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Pan + zoom canvas ──────────────────────────────────────────── */}
      <div
        ref={containerRef}
        style={{ flex: 1, overflow: 'hidden', minHeight: 0, position: 'relative', touchAction: 'none' }}
        onClick={() => { if (!gestRef.current.moved) setSelectedId(null); }}
      >
        <svg
          width={1200} height={1200}
          viewBox="0 0 1200 1200"
          style={{
            display: 'block', userSelect: 'none',
            transform: `translate(${xform.tx}px,${xform.ty}px) scale(${xform.scale})`,
            transformOrigin: '0 0',
            willChange: 'transform',
          }}
        >
          {/* Defs */}
          <defs>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="45%">
              <stop offset="0%"   stopColor="#1a0933" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#06040f" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background */}
          <rect width={1200} height={1200} fill="#06040f" />
          <rect width={1200} height={1200} fill="url(#centerGlow)" />

          {/* Stars */}
          {STARS.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.op} />
          ))}

          {/* ── Corner path labels ─── */}
          <text x={70} y={18} textAnchor="middle" fill={PATHS.warlord.color}
            fontSize={10} fontFamily="Courier New" fontWeight="bold" letterSpacing={2} opacity={0.9}>WARLORD</text>
          <line x1={16} y1={24} x2={124} y2={24} stroke={PATHS.warlord.color} strokeWidth={0.8} opacity={0.35} />

          <text x={1108} y={14} textAnchor="middle" fill={PATHS.titan.color}
            fontSize={10} fontFamily="Courier New" fontWeight="bold" letterSpacing={2} opacity={0.9}>TITAN</text>
          <line x1={1054} y1={20} x2={1162} y2={20} stroke={PATHS.titan.color} strokeWidth={0.8} opacity={0.35} />

          <text x={70} y={1193} textAnchor="middle" fill={PATHS.phantom.color}
            fontSize={10} fontFamily="Courier New" fontWeight="bold" letterSpacing={2} opacity={0.9}>PHANTOM</text>
          <line x1={16} y1={1184} x2={124} y2={1184} stroke={PATHS.phantom.color} strokeWidth={0.8} opacity={0.35} />

          <text x={1108} y={1196} textAnchor="middle" fill={PATHS.sorcerer.color}
            fontSize={10} fontFamily="Courier New" fontWeight="bold" letterSpacing={2} opacity={0.9}>SORCERER</text>
          <line x1={1054} y1={1185} x2={1162} y2={1185} stroke={PATHS.sorcerer.color} strokeWidth={0.8} opacity={0.35} />

          {/* ── Connection edges ─── */}
          {EDGES.map((edge, i) => {
            const from = NODE_MAP[edge.from];
            const to   = NODE_MAP[edge.to];
            if (!from || !to) return null;
            const color = edge.path ? PATHS[edge.path].color : '#ffd700';
            const fromSt = getNodeState(edge.from);
            const toSt   = getNodeState(edge.to);
            const lit    = fromSt === 'unlocked' && toSt === 'unlocked';
            return (
              <line key={i}
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke={color}
                strokeWidth={lit ? 2 : 1.2}
                strokeOpacity={lit ? 0.55 : 0.22}
                strokeDasharray={lit ? undefined : '5,5'}
              />
            );
          })}

          {/* ── Nodes ─── */}
          {ALL_NODES.map(node => (
            <NodeShape
              key={node.id}
              node={node}
              state={getNodeState(node.id)}
              selected={selectedId === node.id}
              justPopped={poppedId === node.id}
              onTap={handleTap}
            />
          ))}
        </svg>
      </div>

      {/* ── Zoom hint (fades after first interaction) ───────────────── */}

      {/* ── Path legend ─────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 16, padding: '8px 16px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}>
        {Object.values(PATHS).map(p => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: p.color, boxShadow: `0 0 5px ${p.glow}`,
            }} />
            <span style={{
              fontSize: 8, color: p.color,
              fontFamily: 'Courier New', letterSpacing: 1.5, fontWeight: 700,
            }}>{p.name}</span>
          </div>
        ))}
      </div>

      {/* ── Info panel ────────────────────────────────────────────────── */}
      {selectedNode && (
        <InfoPanel
          node={selectedNode}
          state={getNodeState(selectedNode.id)}
          stp={stp}
          onUnlock={handleUnlock}
          onClose={() => setSelectedId(null)}
        />
      )}

      {/* ── Toast ────────────────────────────────────────────────────── */}
      {toast && (
        <Toast text={toast.text} color={toast.color} onDone={() => setToast(null)} />
      )}

    </div>
  );
}
