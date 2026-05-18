import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { runBattleTurn, initFightState } from '../../utils/gameLogic';
import CharacterRenderer from '../CharacterRenderer';
import BossSprite from '../BossSprite';
import MobSprite from './MobSprite';

// ── Keyframes (injected once) ────────────────────────────────────────────────
const KEYFRAMES = `
@keyframes bs-player-charge {
  0%   { transform: translateX(0) scaleX(1); }
  100% { transform: translateX(-10px) scaleX(0.88); }
}
@keyframes bs-player-lunge {
  0%   { transform: translateX(-10px) scaleX(0.88); }
  38%  { transform: translateX(140px) scaleX(1.08); }
  65%  { transform: translateX(120px) scaleX(1.02); }
  100% { transform: translateX(0) scaleX(1); }
}
@keyframes bs-player-hit {
  0%   { transform: translateX(0) rotate(0deg); }
  18%  { transform: translateX(-22px) rotate(-9deg); }
  55%  { transform: translateX(-10px) rotate(-4deg); }
  100% { transform: translateX(0) rotate(0deg); }
}
@keyframes bs-player-death {
  0%   { transform: rotate(0deg) translateX(0); opacity: 1; }
  55%  { transform: rotate(60deg) translateX(-40px); opacity: 0.6; }
  100% { transform: rotate(90deg) translateX(-70px) translateY(20px); opacity: 0; }
}
@keyframes bs-player-victory {
  0%,100% { transform: translateY(0) scaleY(1); }
  35%     { transform: translateY(-22px) scaleY(1.06); }
  65%     { transform: translateY(-10px) scaleY(1.01); }
}
@keyframes bs-boss-telegraph {
  0%,100% { transform: translateX(0) scale(1); }
  25%     { transform: translateX(10px) scale(1.05); }
  75%     { transform: translateX(6px) scale(1.03); }
}
@keyframes bs-boss-lunge {
  0%   { transform: translateX(0) scaleX(1); }
  38%  { transform: translateX(-140px) scaleX(1.08); }
  65%  { transform: translateX(-120px) scaleX(1.02); }
  100% { transform: translateX(0) scaleX(1); }
}
@keyframes bs-boss-hit {
  0%   { transform: translateX(0) rotate(0deg); }
  18%  { transform: translateX(26px) rotate(9deg); }
  55%  { transform: translateX(12px) rotate(4deg); }
  100% { transform: translateX(0) rotate(0deg); }
}
@keyframes bs-boss-explode {
  0%   { transform: scale(1);   opacity: 1; filter: brightness(1); }
  25%  { transform: scale(1.4); opacity: 0.95; filter: brightness(4); }
  55%  { transform: scale(0.7); opacity: 0.5; filter: brightness(6); }
  100% { transform: scale(2.2); opacity: 0; filter: brightness(0); }
}
@keyframes bs-idle-float {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-5px); }
}
@keyframes bs-idle-float-boss {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-4px); }
}
@keyframes bs-shake-crit {
  0%,100% { transform: translate(0,0) rotate(0); }
  12%     { transform: translate(-7px, 3px) rotate(-0.5deg); }
  25%     { transform: translate(7px,-4px) rotate(0.5deg); }
  37%     { transform: translate(-5px, 5px); }
  50%     { transform: translate(5px,-3px); }
  62%     { transform: translate(-3px, 3px); }
  75%     { transform: translate(3px,-3px); }
  87%     { transform: translate(-2px, 2px); }
}
@keyframes bs-shake-death {
  0%,100% { transform: translate(0,0); }
  8%      { transform: translate(-12px, 6px); }
  17%     { transform: translate(12px,-6px); }
  26%     { transform: translate(-9px, 9px); }
  35%     { transform: translate(9px,-5px); }
  44%     { transform: translate(-6px, 6px); }
  53%     { transform: translate(6px,-6px); }
  62%     { transform: translate(-4px, 4px); }
  71%     { transform: translate(4px,-4px); }
  80%     { transform: translate(-2px, 2px); }
  89%     { transform: translate(2px,-2px); }
}
@keyframes bs-float-up {
  0%   { transform: translateY(0) scale(0.5); opacity: 0; }
  12%  { transform: translateY(-8px) scale(1.3); opacity: 1; }
  65%  { transform: translateY(-52px) scale(1); opacity: 1; }
  100% { transform: translateY(-85px) scale(0.85); opacity: 0; }
}
@keyframes bs-float-crit {
  0%   { transform: translateY(0) scale(0.3) rotate(-6deg); opacity: 0; }
  10%  { transform: translateY(-4px) scale(1.6) rotate(3deg); opacity: 1; }
  50%  { transform: translateY(-42px) scale(1.1) rotate(-1deg); opacity: 1; }
  100% { transform: translateY(-85px) scale(0.9) rotate(0deg); opacity: 0; }
}
@keyframes bs-speed-h {
  0%   { transform: scaleX(0); transform-origin: left; opacity: 0.8; }
  100% { transform: scaleX(1); transform-origin: left; opacity: 0; }
}
@keyframes bs-speed-radial {
  0%   { transform: translate(-50%,-50%) scale(0.1); opacity: 1; }
  100% { transform: translate(-50%,-50%) scale(2.8); opacity: 0; }
}
@keyframes bs-impact-pop {
  0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
  55%  { transform: translate(-50%,-50%) scale(1.15); opacity: 0.9; }
  100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; }
}
@keyframes bs-action-spring {
  0%   { transform: scale(0.88); opacity: 0; }
  65%  { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes bs-hp-ghost-fade {
  0%   { opacity: 0.55; }
  100% { opacity: 0; }
}
@keyframes bs-critical-pulse {
  0%,100% { opacity: 1; }
  50%     { opacity: 0.4; }
}
`;

let _stylesInjected = false;
function injectStyles() {
  if (_stylesInjected) return;
  _stylesInjected = true;
  const el = document.createElement('style');
  el.id = 'bs-keyframes';
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
}

// ── Stadium crowd ────────────────────────────────────────────────────────────
const FAN_COLORS  = ['#ef4444','#3b82f6','#22c55e','#f59e0b','#a855f7','#ec4899','#14b8a6','#f97316','#eab308','#06b6d4'];
const SKIN_TONES  = ['#fde68a','#fbbf24','#d97706','#a16207','#e2c9a0','#c8a87a','#8d6748','#f5d0a9'];
const HAIR_COLORS = ['#1a0a00','#3d1f00','#7c3d00','#b5651d','#f4c542','#e8e8e8','#111','#8b0000','#cc44aa'];
// hair style: 0=short, 1=long, 2=spiky, 3=bun, 4=curly
const SIGN_TEXTS  = ['GO!','WIN!','LFG','💪','🔥','POG','EZ','!!!','GG'];

function Fan({ f }) {
  const hx = f.x, hy = f.y - f.headR - f.size * 0.3;
  const hw = f.headR, sw = f.size * 0.22;

  // hair paths relative to head center
  const hair = f.hairStyle;
  const hairColor = HAIR_COLORS[f.hairColor];

  return (
    <g style={{ animation: `bs-idle-float-boss ${f.dur}s ease-in-out ${f.delay}s infinite` }}>
      {/* Body / jersey */}
      <rect x={hx - f.size/2} y={hy + hw} width={f.size} height={f.size * 1.3} rx="1" fill={f.color} opacity="0.92"/>
      {/* Jersey stripe */}
      <rect x={hx - f.size/2 + 1} y={hy + hw + 1} width={f.size - 2} height={f.size * 0.35} rx="0" fill="rgba(255,255,255,0.15)"/>

      {/* Neck */}
      <rect x={hx - sw/2} y={hy + hw - 1} width={sw} height={f.size * 0.18} fill={f.skin}/>

      {/* Head */}
      <circle cx={hx} cy={hy} r={hw} fill={f.skin}/>

      {/* Eyes — only on larger fans */}
      {f.headR >= 4.5 && (
        <>
          <circle cx={hx - hw * 0.32} cy={hy - hw * 0.05} r={hw * 0.18} fill="#111"/>
          <circle cx={hx + hw * 0.32} cy={hy - hw * 0.05} r={hw * 0.18} fill="#111"/>
          {/* eye shine */}
          <circle cx={hx - hw * 0.28} cy={hy - hw * 0.08} r={hw * 0.07} fill="white"/>
          <circle cx={hx + hw * 0.36} cy={hy - hw * 0.08} r={hw * 0.07} fill="white"/>
        </>
      )}

      {/* Mouth — smile or open "O" */}
      {f.headR >= 5.5 && (
        f.raised
          ? <ellipse cx={hx} cy={hy + hw * 0.4} rx={hw * 0.28} ry={hw * 0.22} fill="#111"/>
          : <path d={`M${hx - hw*0.28} ${hy + hw*0.3} Q${hx} ${hy + hw*0.55} ${hx + hw*0.28} ${hy + hw*0.3}`}
              stroke="#111" strokeWidth={hw*0.12} fill="none"/>
      )}

      {/* Hair */}
      {hair === 0 && <rect x={hx - hw} y={hy - hw} width={hw*2} height={hw*0.7} rx={hw*0.3} fill={hairColor}/>}
      {hair === 1 && <>
        <rect x={hx - hw} y={hy - hw} width={hw*2} height={hw*0.7} rx={hw*0.3} fill={hairColor}/>
        <rect x={hx - hw} y={hy - hw*0.3} width={hw*0.35} height={hw*1.4} rx={hw*0.15} fill={hairColor}/>
        <rect x={hx + hw*0.65} y={hy - hw*0.3} width={hw*0.35} height={hw*1.4} rx={hw*0.15} fill={hairColor}/>
      </>}
      {hair === 2 && <>
        <rect x={hx - hw} y={hy - hw} width={hw*2} height={hw*0.6} rx={hw*0.2} fill={hairColor}/>
        <polygon points={`${hx-hw*0.5},${hy-hw} ${hx-hw*0.3},${hy-hw*1.7} ${hx-hw*0.1},${hy-hw}`} fill={hairColor}/>
        <polygon points={`${hx-hw*0.1},${hy-hw} ${hx+hw*0.1},${hy-hw*1.9} ${hx+hw*0.3},${hy-hw}`} fill={hairColor}/>
        <polygon points={`${hx+hw*0.3},${hy-hw} ${hx+hw*0.5},${hy-hw*1.6} ${hx+hw*0.7},${hy-hw}`} fill={hairColor}/>
      </>}
      {hair === 3 && <>
        <rect x={hx - hw} y={hy - hw} width={hw*2} height={hw*0.6} rx={hw*0.2} fill={hairColor}/>
        <circle cx={hx} cy={hy - hw*1.1} r={hw*0.45} fill={hairColor}/>
      </>}
      {hair === 4 && <>
        <ellipse cx={hx} cy={hy - hw*0.8} rx={hw*1.1} ry={hw*0.8} fill={hairColor}/>
        <circle cx={hx - hw*0.7} cy={hy - hw*0.3} r={hw*0.35} fill={hairColor}/>
        <circle cx={hx + hw*0.7} cy={hy - hw*0.3} r={hw*0.35} fill={hairColor}/>
      </>}

      {/* Arms */}
      {f.raised ? (
        <g stroke={f.color} strokeWidth={sw} strokeLinecap="round">
          <line x1={hx - f.size/2} y1={hy + hw + f.size*0.4}
                x2={hx - f.size - f.size*0.5} y2={hy - f.size*0.2}/>
          <line x1={hx + f.size/2} y1={hy + hw + f.size*0.4}
                x2={hx + f.size + f.size*0.5} y2={hy - f.size*0.2}/>
        </g>
      ) : (
        <g stroke={f.color} strokeWidth={sw} strokeLinecap="round">
          <line x1={hx - f.size/2} y1={hy + hw + f.size*0.4}
                x2={hx - f.size*0.9} y2={hy + hw + f.size*0.95}/>
          <line x1={hx + f.size/2} y1={hy + hw + f.size*0.4}
                x2={hx + f.size*0.9} y2={hy + hw + f.size*0.95}/>
        </g>
      )}

      {/* Sign held by some front-row fans */}
      {f.hasSign && f.raised && f.headR >= 7 && (
        <g>
          <rect x={hx + f.size + f.size*0.4} y={hy - f.size*0.5}
                width={f.size * 1.8} height={f.size * 0.85} rx="1"
                fill="white" stroke="#ccc" strokeWidth="0.5"/>
          <text x={hx + f.size + f.size*0.4 + f.size*0.9} y={hy - f.size*0.05}
                textAnchor="middle" fontSize={f.size * 0.55}
                fontFamily="Courier New" fontWeight="bold" fill="#111">
            {f.signText}
          </text>
        </g>
      )}
    </g>
  );
}

function StadiumCrowd({ themeColor, bossHPPct, playerHPPct, phase }) {
  const excited = phase === 'victory' || bossHPPct < 30 || playerHPPct < 25;
  const rowDefs = [
    { y: 32,  count: 18, gap: 19,   size: 7,  headR: 4   },
    { y: 68,  count: 13, gap: 26,   size: 9,  headR: 5   },
    { y: 110, count: 9,  gap: 37,   size: 12, headR: 6.5 },
    { y: 158, count: 6,  gap: 56,   size: 16, headR: 9   },
  ];

  const fans = rowDefs.flatMap((row, ri) =>
    Array.from({ length: row.count }, (_, i) => {
      const seed      = ri * 97 + i * 37;
      const x         = (ri === 3 ? 28 : 10) + i * row.gap;
      return {
        x, y: row.y,
        size: row.size, headR: row.headR,
        color:      FAN_COLORS[seed % FAN_COLORS.length],
        skin:       SKIN_TONES[(seed * 3) % SKIN_TONES.length],
        hairStyle:  seed % 5,
        hairColor:  (seed * 7) % HAIR_COLORS.length,
        raised:     excited ? (seed % 4 !== 0) : (seed % 5 === 0),
        hasSign:    seed % 7 === 0,
        signText:   SIGN_TEXTS[seed % SIGN_TEXTS.length],
        delay:      ((ri * 0.4 + i * 0.13) % 2).toFixed(2),
        dur:        (1.5 + (seed % 7) * 0.18).toFixed(2),
      };
    })
  );

  return (
    <div style={{ flexShrink: 0, overflow: 'hidden', minHeight: 280 }}>
      <svg viewBox="0 0 360 195" width="100%" height="280" preserveAspectRatio="xMidYMid slice"
        style={{ display: 'block' }}>
        {/* Background */}
        <rect width="360" height="195" fill="#050a12"/>

        {/* Stadium arch ceiling */}
        <path d="M0 0 Q180 22 360 0 L360 38 Q180 58 0 38 Z" fill="#0a1220"/>
        <path d="M0 0 Q180 16 360 0 L360 26 Q180 44 0 26 Z" fill="#0d1828" stroke={themeColor} strokeWidth="0.5" opacity="0.5"/>

        {/* Scoreboard */}
        <rect x="132" y="4" width="96" height="20" rx="2" fill="#111c2e" stroke={themeColor} strokeWidth="0.8"/>
        <rect x="134" y="6" width="92" height="16" rx="1" fill="#07101e"/>
        <text x="180" y="17" textAnchor="middle" fontSize="6" fontFamily="Courier New" fill={themeColor} letterSpacing="2">★ ARENA ★</text>

        {/* Stadium spotlights */}
        <line x1="20" y1="28" x2="80"  y2="130" stroke={themeColor} strokeWidth="18" opacity="0.025"/>
        <line x1="340" y1="28" x2="280" y2="130" stroke={themeColor} strokeWidth="18" opacity="0.025"/>
        <ellipse cx="20"  cy="28" rx="12" ry="5" fill={themeColor} opacity="0.15"/>
        <ellipse cx="340" cy="28" rx="12" ry="5" fill={themeColor} opacity="0.15"/>

        {/* Bleacher row backgrounds */}
        {rowDefs.map((row, ri) => (
          <rect key={ri} x="0" y={row.y - row.size - 4} width="360" height={row.size * 2.8 + 8}
            fill={ri % 2 === 0 ? '#08101e' : '#060d1a'} stroke="#111c2e" strokeWidth="0.5"/>
        ))}

        {/* Fans — back rows first so front overlaps */}
        {fans.map((f, idx) => <Fan key={idx} f={f}/>)}

        {/* Floor glow bar */}
        <rect x="0" y="182" width="360" height="13" fill="#050a12"/>
        <rect x="0" y="181" width="360" height="3" fill={themeColor} opacity="0.15"/>
      </svg>
    </div>
  );
}

// ── Utilities ────────────────────────────────────────────────────────────────
function wait(ms) { return new Promise(res => setTimeout(res, ms)); }

const ELEMENT_COLOR = {
  Fire: '#ff6620', Ice: '#7dd3fc', Shadow: '#c084fc', Thunder: '#facc15',
  Earth: '#86efac', Water: '#38bdf8', Wind: '#a3e635', Dark: '#a855f7', Light: '#fef08a',
};

// ── Attack Effect (SVG starburst + element-specific) ─────────────────────────
function AttackEffect({ x, y, element, active }) {
  if (!active) return null;
  const col = ELEMENT_COLOR[element] || '#ffffff';
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      pointerEvents: 'none', zIndex: 50,
    }}>
      <svg width="90" height="90" viewBox="-45 -45 90 90"
        style={{ animation: 'bs-impact-pop 0.48s ease-out forwards', overflow: 'visible',
                 position: 'absolute', transform: 'translate(-50%,-50%)' }}>
        {/* Spikes */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
          <line key={i}
            x1={Math.cos(deg*Math.PI/180)*4} y1={Math.sin(deg*Math.PI/180)*4}
            x2={Math.cos(deg*Math.PI/180)*(i%3===0?34:22)}
            y2={Math.sin(deg*Math.PI/180)*(i%3===0?34:22)}
            stroke={col} strokeWidth={i%3===0?3:1.5} strokeLinecap="round" opacity={i%3===0?1:0.65}
          />
        ))}
        {/* Fire: flame blobs */}
        {element === 'Fire' && [0,60,120,180,240,300].map((deg,i)=>(
          <ellipse key={i} cx={Math.cos(deg*Math.PI/180)*16} cy={Math.sin(deg*Math.PI/180)*16}
            rx="5" ry="9" fill={col} opacity="0.75"
            transform={`rotate(${deg+90},${Math.cos(deg*Math.PI/180)*16},${Math.sin(deg*Math.PI/180)*16})`}/>
        ))}
        {/* Ice: diamond shards */}
        {element === 'Ice' && [0,45,90,135,180,225,270,315].map((deg,i)=>(
          <polygon key={i}
            points={`0,0 ${Math.cos((deg-10)*Math.PI/180)*4},${Math.sin((deg-10)*Math.PI/180)*4} ${Math.cos(deg*Math.PI/180)*24},${Math.sin(deg*Math.PI/180)*24} ${Math.cos((deg+10)*Math.PI/180)*4},${Math.sin((deg+10)*Math.PI/180)*4}`}
            fill={col} opacity="0.8"/>
        ))}
        {/* Thunder: bolt */}
        {element === 'Thunder' && (
          <path d="M-5,-22 L5,-6 L-2,-6 L8,20 L-8,2 L0,2 L-5,-22"
            fill={col} opacity="0.95"/>
        )}
        {/* Shadow: tendrils */}
        {element === 'Shadow' && [0,72,144,216,288].map((deg,i)=>(
          <path key={i}
            d={`M0,0 Q${Math.cos((deg+22)*Math.PI/180)*16},${Math.sin((deg+22)*Math.PI/180)*16} ${Math.cos(deg*Math.PI/180)*30},${Math.sin(deg*Math.PI/180)*30}`}
            stroke={col} strokeWidth="2.5" fill="none" opacity="0.85" strokeLinecap="round"/>
        ))}
        {/* Core */}
        <circle cx="0" cy="0" r="11" fill="white" opacity="0.92"/>
        <circle cx="0" cy="0" r="7" fill={col} opacity="1"/>
      </svg>
    </div>
  );
}

// ── Speed lines (horizontal — charge) ────────────────────────────────────────
function SpeedLinesH({ active, color = '#22d3ee' }) {
  if (!active) return null;
  const lines = [12,26,40,54,68,82,96,112,130,148,164,180,196,214,232,250];
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:20, overflow:'hidden' }}>
      {lines.map((y, i) => (
        <div key={i} style={{
          position:'absolute', left:0, top: y,
          width: `${45 + (i%4)*18}%`,
          height: i%5===0 ? '2px' : '1px',
          background: `linear-gradient(90deg, transparent, ${color}${i%3===0?'90':'44'}, transparent)`,
          animation: `bs-speed-h ${0.22+(i%3)*0.04}s ease-out forwards`,
          animationDelay: `${(i%4)*0.015}s`,
        }}/>
      ))}
    </div>
  );
}

// ── Radial speed lines (crit) ─────────────────────────────────────────────────
function SpeedLinesRadial({ x, y, color = '#facc15' }) {
  return (
    <div style={{ position:'absolute', left:x, top:y, pointerEvents:'none', zIndex:20 }}>
      <svg width="180" height="180" viewBox="-90 -90 180 180"
        style={{ animation: 'bs-speed-radial 0.42s ease-out forwards',
                 overflow:'visible', position:'absolute', transform:'translate(-50%,-50%)' }}>
        {Array.from({length:24},(_,i) => {
          const deg = i*(360/24);
          const r = 38 + (i%3)*14;
          return (
            <line key={i}
              x1={Math.cos(deg*Math.PI/180)*7} y1={Math.sin(deg*Math.PI/180)*7}
              x2={Math.cos(deg*Math.PI/180)*r} y2={Math.sin(deg*Math.PI/180)*r}
              stroke={color} strokeWidth={i%4===0?2.5:1} opacity={i%4===0?0.9:0.5}/>
          );
        })}
      </svg>
    </div>
  );
}

// ── Floating damage number ────────────────────────────────────────────────────
function FloatDmg({ val, type, x, y, onDone }) {
  const isCrit  = type === 'crit' || type === 'adrenaline';
  const isMiss  = type === 'dodge';
  const isCombo = type === 'stamina';
  const isBoss  = type === 'boss' || type === 'boss_rage' || type === 'block';
  const text  = isMiss ? 'MISS!' : isCombo ? `+${val} COMBO!` : val;
  const color = isCrit ? '#facc15' : isMiss ? '#fbbf24' : isCombo ? '#c084fc' : isBoss ? '#f87171' : '#ffffff';
  const size  = isCrit ? 24 : isMiss ? 20 : isCombo ? 17 : 15;
  const anim  = isCrit ? 'bs-float-crit 1.1s ease-out forwards' : 'bs-float-up 1.05s ease-out forwards';

  useEffect(() => {
    const t = setTimeout(onDone, 1150);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: 'translateX(-50%)',
      fontFamily: 'Courier New, monospace', fontWeight: 'bold',
      fontSize: size, color,
      textShadow: `0 0 10px ${color}, 0 0 20px ${color}44`,
      animation: anim, pointerEvents: 'none', zIndex: 60, whiteSpace: 'nowrap',
    }}>{text}</div>
  );
}

// ── Floating HP bar (above character) ─────────────────────────────────────────
function FloatHpBar({ current, max, label, ghostHP }) {
  const pct      = Math.max(0, Math.min(100, (current / max) * 100));
  const ghostPct = ghostHP != null ? Math.max(0, Math.min(100, (ghostHP / max) * 100)) : pct;
  const barColor = pct > 50 ? '#4ade80' : pct > 25 ? '#fbbf24' : '#f87171';
  const critical = pct <= 10 && current > 0;

  return (
    <div style={{ width: 130, fontFamily: 'Courier New, monospace' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{ fontSize: 7, color: '#94a3b8', letterSpacing: 2 }}>{label}</span>
        <span style={{ fontSize: 7, color: barColor }}>{current}/{max}</span>
      </div>
      <div style={{
        position: 'relative', width: '100%', height: 8,
        background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 4, overflow: 'hidden',
      }}>
        {/* Ghost drain */}
        {ghostPct > pct && (
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: `${ghostPct}%`, background: 'rgba(255,255,255,0.28)',
            borderRadius: 4, animation: 'bs-hp-ghost-fade 0.9s ease-out forwards',
          }}/>
        )}
        {/* HP fill */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${barColor}, ${barColor}cc)`,
          borderRadius: 4, transition: 'width 0.4s ease',
          boxShadow: critical ? `0 0 8px #ef4444` : `0 0 4px ${barColor}55`,
          animation: critical ? 'bs-critical-pulse 0.5s ease-in-out infinite' : 'none',
        }}/>
        {/* Shimmer */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 60%)',
          borderRadius: 4, pointerEvents: 'none',
        }}/>
      </div>
    </div>
  );
}

// ── Stats Info Panel ─────────────────────────────────────────────────────────
function StatsInfoPanel({ pStats, onClose }) {
  const p = pStats;
  const pct = v => `${Math.round(v * 100)}%`;

  // Core stats rows
  const core = [
    { label: 'MAX HP',   val: p.maxHP,                      col: '#4ade80',  desc: 'Total health pool' },
    { label: 'ATK',      val: p.atk,                        col: '#f87171',  desc: 'Base damage per hit' },
    { label: 'DEF',      val: `${Math.floor(p.defPct)}%`,   col: '#60a5fa',  desc: 'Incoming damage reduced by this %' },
    { label: 'DODGE',    val: `${Math.floor(p.dodgePct)}%`, col: '#a78bfa',  desc: 'Chance to avoid a hit entirely' },
    { label: 'CRIT',     val: `${Math.floor(p.critPct)}%`,  col: '#facc15',  desc: 'Chance to deal 1.5× damage' },
    { label: 'SPEED',    val: p.speed,                       col: '#22d3ee',  desc: 'Higher speed attacks first' },
  ];

  // Active tree bonuses (only show non-zero / true)
  const treeRows = [
    p.treeLifeSteal   > 0 && { label: 'Life Steal',    val: pct(p.treeLifeSteal),   col: '#f472b6', desc: '% of damage dealt is healed back' },
    p.treeReflect     > 0 && { label: 'Reflect',       val: pct(p.treeReflect),     col: '#a78bfa', desc: '% of incoming damage reflected to boss' },
    p.treeHpRegen     > 0 && { label: 'HP Regen',      val: pct(p.treeHpRegen)+'/turn', col: '#4ade80', desc: 'HP restored at the start of each turn' },
    p.treeElemDmg     > 0 && { label: 'Elem Dmg',      val: pct(p.treeElemDmg),     col: '#38bdf8', desc: 'Bonus elemental damage on every hit' },
    p.treeWeakDmg     > 0 && { label: 'Weak Bonus',    val: pct(p.treeWeakDmg),     col: '#fde047', desc: 'Extra % added to the weakness bonus' },
    p.treeCounterBonus> 0 && { label: 'Counter Dmg',   val: pct(p.treeCounterBonus),col: '#22d3ee', desc: 'Counter-attack damage on dodge' },
    p.treeLowHpDmg    > 0 && { label: 'Low HP Dmg',    val: pct(p.treeLowHpDmg),    col: '#fb923c', desc: 'Bonus damage when boss is below 50% HP' },
    p.treeExecutioner > 0 && { label: 'Executioner',   val: pct(p.treeExecutioner), col: '#ef4444', desc: 'Bonus damage when boss is below 25% HP' },
    p.treeCritDefPen  > 0 && { label: 'Crit DEF-Pen',  val: pct(p.treeCritDefPen),  col: '#facc15', desc: 'Crits penetrate this % of enemy defence' },
    p.treePoisonDmg   > 0 && { label: 'Poison Dmg',    val: pct(p.treePoisonDmg)+'/turn', col: '#a3e635', desc: 'Poison tick damage as % of boss max HP' },
  ].filter(Boolean);

  // Active passives (booleans)
  const passives = [
    p.treeLastStand     && { label: 'Last Stand',      col: '#f87171', desc: 'Below 20% HP → +30% DEF, +20% ATK' },
    p.treeGhostStep     && { label: 'Ghost Step',      col: '#a78bfa', desc: '25% chance to phase through any hit + backstab' },
    p.treeFuryProc      && { label: 'Fury Proc',       col: '#facc15', desc: 'After a crit, your next attack is guaranteed to crit' },
    p.treeGodOfWar      && { label: 'God of War',      col: '#ef4444', desc: 'Every 3rd attack auto-crits + ignores 30% DEF' },
    p.treeStoneWall     && { label: 'Stone Wall',      col: '#60a5fa', desc: 'First hit of each fight is completely negated' },
    p.treeUnbreakable   && { label: 'Unbreakable',     col: '#fbbf24', desc: 'Survive one killing blow at 1 HP → +50% ATK 2 turns' },
    p.treeVenomStrike   && { label: 'Venom Strike',    col: '#a3e635', desc: '85% chance to poison boss for 3 turns on hit' },
    p.treeDeathMark     && { label: 'Death Mark',      col: '#c084fc', desc: '+20% damage to all attacks' },
    p.treePhantomKiller && { label: 'Phantom Killer',  col: '#818cf8', desc: 'Every 4th attack deals 400% damage' },
    p.treeArcaneSurge   && { label: 'Arcane Surge',    col: '#38bdf8', desc: 'Every 5th attack triggers a free elemental explosion' },
    p.treeArcaneAscendant&&{ label: 'Arcane Ascendant',col: '#a855f7', desc: 'Always hits weakness. +30% elem. 20% life drain.' },
  ].filter(Boolean);

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.5)' }} />

      {/* Panel */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 210,
        background: '#080e1c',
        border: '1px solid rgba(255,255,255,0.1)',
        borderTop: '2px solid #22d3ee',
        borderRadius: '20px 20px 0 0',
        padding: '16px 18px 32px',
        maxHeight: '72vh', overflowY: 'auto',
        animation: 'st-panel-up 0.22s ease-out',
      }}>
        {/* Handle */}
        <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.12)', margin: '-4px auto 14px' }} />

        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontFamily: 'Courier New', fontSize: 12, fontWeight: 800, color: '#e2e8f0', letterSpacing: 2 }}>
            ⓘ COMBAT STATS
          </div>
          <button onClick={onClose} style={{ color: '#475569', fontSize: 18, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>✕</button>
        </div>

        {/* Core stats */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 7, color: '#334155', fontFamily: 'Courier New', letterSpacing: 2, marginBottom: 8 }}>COMBAT STATS</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
            {core.map(({ label, val, col, desc }) => (
              <div key={label} style={{
                background: `${col}0d`, border: `1px solid ${col}2a`,
                borderRadius: 8, padding: '8px 10px',
              }}>
                <div style={{ fontSize: 6, color: '#475569', fontFamily: 'Courier New', letterSpacing: 1, marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 14, color: col, fontFamily: 'Courier New', fontWeight: 800, lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 7, color: '#334155', fontFamily: 'system-ui', marginTop: 4, lineHeight: 1.3 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tree numeric bonuses */}
        {treeRows.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 7, color: '#334155', fontFamily: 'Courier New', letterSpacing: 2, marginBottom: 8 }}>SKILL TREE BONUSES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {treeRows.map(({ label, val, col, desc }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: `${col}0a`, border: `1px solid ${col}22`,
                  borderRadius: 6, padding: '6px 10px',
                }}>
                  <div>
                    <span style={{ fontSize: 9, color: col, fontFamily: 'Courier New', fontWeight: 700 }}>{label}</span>
                    <div style={{ fontSize: 7, color: '#475569', fontFamily: 'system-ui', marginTop: 1 }}>{desc}</div>
                  </div>
                  <span style={{ fontSize: 13, color: col, fontFamily: 'Courier New', fontWeight: 800, flexShrink: 0, marginLeft: 10 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active passives */}
        {passives.length > 0 && (
          <div>
            <div style={{ fontSize: 7, color: '#334155', fontFamily: 'Courier New', letterSpacing: 2, marginBottom: 8 }}>ACTIVE PASSIVES</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {passives.map(({ label, col, desc }) => (
                <div key={label} style={{
                  background: `${col}12`, border: `1px solid ${col}44`,
                  borderRadius: 20, padding: '5px 12px',
                  fontFamily: 'Courier New', fontSize: 8, color: col, fontWeight: 700,
                  letterSpacing: 1,
                  title: desc,
                }} title={desc}>
                  ✦ {label}
                </div>
              ))}
            </div>
            {/* Describe active passives */}
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {passives.map(({ label, col, desc }) => (
                <div key={label} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 8, color: col, fontFamily: 'Courier New', fontWeight: 700, flexShrink: 0, width: 100 }}>{label}</span>
                  <span style={{ fontSize: 8, color: '#64748b', fontFamily: 'system-ui', lineHeight: 1.4 }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {treeRows.length === 0 && passives.length === 0 && (
          <div style={{ textAlign: 'center', padding: '16px 0', fontSize: 9, color: '#334155', fontFamily: 'Courier New', letterSpacing: 1 }}>
            No skill tree bonuses active yet.{'\n'}Unlock skills in the SKILLS tab to power up!
          </div>
        )}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  BATTLESCENE — main export
// ═══════════════════════════════════════════════════════════════════════════════
export default function BattleScene({
  boss, pStats, playerLevel, muscleXP,
  equippedItems, equippedAura, equippedClothing,
  isTraining, hasWeaknessBonus,
  onVictory, onDefeat, onClose,
  theme,
}) {
  injectStyles();

  const [phase, setPhase]       = useState('ready');
  const [showStatsInfo, setShowStatsInfo] = useState(false);
  const [playerHP, setPlayerHP]   = useState(pStats.maxHP);
  const [bossHP, setBossHP]       = useState(boss.maxHP);
  const [prevPlayerHP, setPrevPlayerHP] = useState(pStats.maxHP);
  const [prevBossHP, setPrevBossHP]     = useState(boss.maxHP);
  const [turn, setTurn]           = useState(0);
  const [log, setLog]             = useState([]);
  const [bossRage, setBossRage]   = useState(false);

  // Animation state
  const [shake, setShake]         = useState(null);
  const [playerAnim, setPlayerAnim] = useState('idle');
  const [bossAnim, setBossAnim]   = useState('idle');
  const [atkEffect, setAtkEffect] = useState(null);
  const [speedH, setSpeedH]       = useState(false);
  const [speedR, setSpeedR]       = useState(null);
  const [floats, setFloats]       = useState([]);
  const [flash, setFlash]         = useState(null);
  const [bossGlow, setBossGlow]   = useState(false);

  const floatId     = useRef(0);
  const animating   = useRef(false);
  const defeatDone  = useRef(false);
  const arenaRef    = useRef(null);
  const autoFight   = useRef(false);
  const fightStateRef = useRef(initFightState());

  const themeColor = theme?.color || '#f87171';
  const themeBg    = theme?.bg    || '#1a0a14';
  const themeGlow  = theme?.glow  || '#f8717155';

  // ── Float helpers ─────────────────────────────────────────────────────────
  // Arena = 260px tall, chars sit at bottom:10, sprites ~120px → body spans y≈130–240
  // Player is left ~10–130px, boss is right ~(aw-130)–(aw-10)
  const addFloat = useCallback((val, type, side) => {
    const id = ++floatId.current;
    const aw  = arenaRef.current?.offsetWidth || 360;
    const rx  = Math.random();   // horizontal jitter within body width (~110px)
    const ry  = Math.random();   // vertical jitter within torso (~80px)
    const x   = side === 'player'
      ? 20  + rx * 100           // 20–120 px from left
      : aw - 120 + rx * 100;    // 20–120 px from right edge
    const y   = 140 + ry * 80;  // 140–220 px from top (torso → hips)
    setFloats(prev => [...prev, { id, val, type, x, y }]);
  }, []);
  const rmFloat = useCallback(id => setFloats(p => p.filter(f => f.id !== id)), []);

  // ── Screen helpers ────────────────────────────────────────────────────────
  async function doFlash(color, ms = 280) {
    setFlash(color);
    await wait(ms);
    setFlash(null);
  }
  async function doShake(type, ms) {
    setShake(type);
    await wait(ms);
    setShake(null);
  }

  // ── Player attacks boss ───────────────────────────────────────────────────
  async function animPlayerAttack(events) {
    const hasCrit = events.some(e => e.type === 'crit');
    const aw = arenaRef.current?.offsetWidth || 360;
    // Random hit spot on boss body
    const bx = aw - 120 + Math.random() * 100;
    const by = 140 + Math.random() * 80;

    setPlayerAnim('charge');
    setSpeedH(true);
    await wait(200);
    setSpeedH(false);
    setPlayerAnim('lunge');
    await wait(200);

    // Impact on boss body
    setAtkEffect({ x: bx, y: by });
    setBossAnim('hit');
    events.forEach(e => { if (e.val != null) addFloat(e.val, e.type, 'boss'); });

    if (hasCrit) {
      setSpeedR({ x: bx, y: by, color: '#facc15' });
      doFlash('#facc1533', 320);
      doShake('crit', 300);
    }
    await wait(260);

    setAtkEffect(null);
    setSpeedR(null);
    setBossAnim('idle');
    await wait(200);

    setPlayerAnim('idle');
  }

  // ── Boss attacks player ───────────────────────────────────────────────────
  async function animBossAttack(events) {
    const isRage = events.some(e => e.type === 'boss_rage');
    const aw = arenaRef.current?.offsetWidth || 360;
    // Random hit spot on player body
    const px = 20 + Math.random() * 100;
    const py = 140 + Math.random() * 80;

    // Telegraph (200ms windup)
    setBossAnim('telegraph');
    setBossGlow(true);
    await wait(200);
    setBossGlow(false);
    setBossAnim('lunge');
    await wait(200);

    // Impact on player body
    setAtkEffect({ x: px, y: py, element: 'player-hit' });
    setPlayerAnim('hit');
    events.forEach(e => { if (e.val != null) addFloat(e.val, e.type, 'player'); });
    doFlash('#f8717122', 200);
    if (isRage) doShake('crit', 320);
    await wait(260);

    setAtkEffect(null);
    setPlayerAnim('idle');
    setBossAnim('idle');
    await wait(150);
  }

  // ── Dodge ─────────────────────────────────────────────────────────────────
  async function animDodge(events) {
    events.forEach(e => { if (e.type === 'dodge') addFloat(0, 'dodge', 'player'); });
    await wait(350);
  }

  // ── Full turn sequence ────────────────────────────────────────────────────
  async function runAnimTurn(result) {
    const {
      phase1Events, phase2Events, playerFirst,
      bossHP: finalBossHP, playerHP: finalPlayerHP,
      phase1BossHP, phase1PlayerHP, status, bossRageActive,
    } = result;

    if (bossRageActive) setBossRage(true);

    // ── Phase 1 ──
    if (playerFirst) {
      await animPlayerAttack(phase1Events);
      setPrevBossHP(bossHP);
      setBossHP(phase1BossHP);
    } else {
      const hasDodge = phase1Events.some(e => e.type === 'dodge');
      if (hasDodge) await animDodge(phase1Events);
      else await animBossAttack(phase1Events);
      setPrevPlayerHP(playerHP);
      setPlayerHP(phase1PlayerHP);
    }

    await wait(400);

    // Early victory / defeat after phase 1
    if (status === 'victory' && phase1BossHP <= 0) {
      await animBossDeath();
      return;
    }
    if (status === 'defeat' && phase1PlayerHP <= 0) {
      await animPlayerDeath();
      return;
    }

    // ── Phase 2 ──
    if (phase2Events.length > 0) {
      if (!playerFirst) {
        await animPlayerAttack(phase2Events);
        setPrevBossHP(phase1BossHP);
        setBossHP(finalBossHP);
      } else {
        const hasDodge = phase2Events.some(e => e.type === 'dodge');
        if (hasDodge) await animDodge(phase2Events);
        else await animBossAttack(phase2Events);
        setPrevPlayerHP(phase1PlayerHP);
        setPlayerHP(finalPlayerHP);
      }
      await wait(400);
    } else {
      setBossHP(finalBossHP);
      setPlayerHP(finalPlayerHP);
    }

    if (status === 'victory') { await animBossDeath(); return; }
    if (status === 'defeat')  { await animPlayerDeath(); return; }
  }

  async function animBossDeath() {
    setBossAnim('death');
    doShake('death', 500);
    doFlash('#ffffff55', 500);
    await wait(700);
    setPhase('victory');
    setPlayerAnim('victory');
  }

  async function animPlayerDeath() {
    setPlayerAnim('death');
    await wait(850);
    setPhase('defeat');
  }

  // ── Turn driver ───────────────────────────────────────────────────────────
  async function doTurn() {
    if (animating.current || phase !== 'ready') return;
    // Reset fight state on first press (turn 0 = fresh fight)
    if (!autoFight.current) fightStateRef.current = initFightState();
    autoFight.current = true;
    animating.current = true;
    setPhase('animating');

    const bossHPPct = (bossHP / boss.maxHP) * 100;
    const result = runBattleTurn(playerHP, bossHP, pStats, boss, hasWeaknessBonus, bossHPPct, fightStateRef.current);

    setLog(prev => [...prev, ...result.events]);
    setTurn(t => t + 1);

    await runAnimTurn(result);

    animating.current = false;
    if (result.status === 'ongoing') setPhase('ready');
  }

  // ── Auto-advance turns after first FIGHT press ────────────────────────────
  useEffect(() => {
    if (phase === 'ready' && autoFight.current) {
      const t = setTimeout(() => doTurn(), 400);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ── Defeat callback ───────────────────────────────────────────────────────
  useEffect(() => {
    if (phase === 'defeat' && onDefeat && !defeatDone.current) {
      defeatDone.current = true;
      setTimeout(() => onDefeat(), 900);
    }
  }, [phase, onDefeat]);

  // ── Anim CSS ──────────────────────────────────────────────────────────────
  const pStyle = {
    animation:
      playerAnim === 'charge'  ? 'bs-player-charge 0.22s ease-out forwards' :
      playerAnim === 'lunge'   ? 'bs-player-lunge 0.55s ease-in-out forwards' :
      playerAnim === 'hit'     ? 'bs-player-hit 0.45s ease-out forwards' :
      playerAnim === 'death'   ? 'bs-player-death 0.85s ease-in forwards' :
      playerAnim === 'victory' ? 'bs-player-victory 0.7s ease-in-out infinite' :
      'bs-idle-float 2.5s ease-in-out infinite',
    display: 'inline-block',
  };

  const bStyle = {
    animation:
      bossAnim === 'telegraph' ? 'bs-boss-telegraph 0.22s ease-in-out' :
      bossAnim === 'lunge'     ? 'bs-boss-lunge 0.55s ease-in-out forwards' :
      bossAnim === 'hit'       ? 'bs-boss-hit 0.45s ease-out forwards' :
      bossAnim === 'death'     ? 'bs-boss-explode 0.72s ease-out forwards' :
      'bs-idle-float-boss 2.9s ease-in-out infinite',
    display: 'inline-block',
    filter: bossGlow ? `drop-shadow(0 0 14px ${themeColor}) brightness(1.6)` : 'none',
    transition: 'filter 0.08s ease',
  };

  const shakeStyle = shake === 'crit'  ? { animation: 'bs-shake-crit 0.3s ease-out forwards' }
                   : shake === 'death' ? { animation: 'bs-shake-death 0.5s ease-out forwards' }
                   : {};

  const EVENT_COLOR = {
    player:'#22d3ee', crit:'#facc15', adrenaline:'#f87171', stamina:'#c084fc',
    boss:'#f87171', boss_rage:'#ef4444', dodge:'#4ade80', block:'#60a5fa',
    weakness:'#fde047', selfhit:'#fb923c', injury:'#f87171', lockedin:'#facc15', info:'#475569',
  };

  return (
    <div style={{ ...shakeStyle, position:'relative', width:'100%',
                  display:'flex', flexDirection:'column' }}>

      {/* Screen flash */}
      {flash && (
        <div style={{ position:'absolute', inset:0, background:flash,
                      pointerEvents:'none', zIndex:100 }}/>
      )}

      {/* ── ARENA BOX ── */}
      <div ref={arenaRef} style={{
        position: 'relative', height: 260, flexShrink: 0, overflow: 'hidden',
        margin: '10px 12px 0',
        background: `linear-gradient(135deg, ${themeBg}dd 0%, #05080f 100%)`,
        border: `1px solid ${themeColor}44`,
        borderRadius: 8,
        boxShadow: `0 0 32px ${themeGlow}, inset 0 0 60px rgba(0,0,0,0.5)`,
        transform: 'translateZ(0)',
      }}>
        {/* Scanline overlay inside box */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.10) 0px, rgba(0,0,0,0.10) 1px, transparent 1px, transparent 3px)',
          borderRadius: 8,
        }}/>
        {/* Speed lines */}
        <SpeedLinesH active={speedH}/>
        {speedR && <SpeedLinesRadial {...speedR}/>}

        {/* Attack effect */}
        {atkEffect && (
          <AttackEffect x={atkEffect.x} y={atkEffect.y}
            element={atkEffect.element || boss.element} active/>
        )}

        {/* Floating damage */}
        {floats.map(f => (
          <FloatDmg key={f.id} val={f.val} type={f.type} x={f.x} y={f.y}
            onDone={() => rmFloat(f.id)}/>
        ))}

        {/* Rage label */}
        {bossRage && (
          <div style={{
            position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
            fontFamily: 'Courier New', fontSize: 7, letterSpacing: 3,
            color: '#ef4444', background: 'rgba(239,68,68,0.12)',
            border: '1px solid rgba(239,68,68,0.35)', padding: '2px 8px', borderRadius: 2,
            animation: 'bs-critical-pulse 0.6s ease-in-out infinite', zIndex: 25,
          }}>!! RAGE !!</div>
        )}

        {/* Divider line */}
        <div style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1,
          background: `linear-gradient(180deg, transparent, ${themeColor}22, transparent)`,
          transform: 'translateX(-50%)', pointerEvents: 'none',
        }}/>

        {/* ── PLAYER (left) — HP bar directly above character ── */}
        <div style={{
          position: 'absolute', left: 10, bottom: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 10,
        }}>
          <FloatHpBar current={playerHP} max={pStats.maxHP} label="YOU" ghostHP={prevPlayerHP}/>
          <div style={pStyle}>
            <Suspense fallback={null}>
              <CharacterRenderer level={playerLevel} equippedItems={equippedItems} size={120}/>
            </Suspense>
          </div>
        </div>

        {/* ── BOSS (right) — HP bar directly above character ── */}
        <div style={{
          position: 'absolute', right: 10, bottom: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 10,
        }}>
          <FloatHpBar current={bossHP} max={boss.maxHP} label={boss.name.split(' ').slice(-1)[0].toUpperCase()} ghostHP={prevBossHP}/>
          <div style={bStyle}>
            {boss.isMob
              ? <MobSprite mob={boss} size={90}/>
              : <BossSprite boss={boss} size={110} isRage={bossRage}/>
            }
          </div>
        </div>
      </div>

      {/* ── BATTLE LOG ── */}
      <div style={{
        maxHeight: 52, overflowY: 'auto', padding: '4px 14px',
        background: 'rgba(0,0,0,0.55)', borderTop: '1px solid rgba(255,255,255,0.05)',
        flexShrink: 0,
      }}>
        {log.length === 0
          ? <div style={{ fontSize:8, color:'#334155', fontFamily:'Courier New',
                          textAlign:'center', padding:'6px 0' }}>PRESS FIGHT TO BEGIN</div>
          : log.slice(-5).map((e,i) => (
              <div key={i} style={{
                fontSize: 8, lineHeight: '1.5',
                color: EVENT_COLOR[e.type] || '#475569',
                fontFamily: 'Courier New',
              }}>{e.text}</div>
            ))
        }
      </div>

      {/* ── ACTION BUTTONS ── */}
      <div style={{
        padding: '10px 14px 22px', display: 'flex', gap: 10,
        background: 'rgba(0,0,0,0.3)', flexShrink: 0,
      }}>
        {/* Flee */}
        <button onClick={onClose} style={{
          padding: '8px 12px',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
          color: '#475569', fontFamily: 'Courier New', fontSize: 9, letterSpacing: 2,
          cursor: 'pointer', borderRadius: 4,
        }}>✕ FLEE</button>

        <div style={{ flex: 1 }}>
          {phase === 'ready' && (
            <button onClick={doTurn} style={{
              width: '100%', padding: '14px 0',
              background: `linear-gradient(135deg, ${themeBg}ee, ${themeBg}88)`,
              border: `2px solid ${themeColor}`,
              color: themeColor,
              boxShadow: `0 0 22px ${themeGlow}, inset 0 0 18px ${themeGlow}55`,
              fontFamily: 'Courier New', fontSize: 11, letterSpacing: 3,
              cursor: 'pointer', borderRadius: 4,
              animation: 'bs-action-spring 0.32s ease-out both',
            }}>FIGHT!</button>
          )}

          {phase === 'animating' && (
            <div style={{
              width: '100%', padding: '14px 0', textAlign: 'center',
              background: 'rgba(0,0,0,0.28)', border: '1px solid rgba(255,255,255,0.04)',
              color: '#334155', fontFamily: 'Courier New', fontSize: 9, letterSpacing: 3,
              borderRadius: 4,
            }}>· · ·</div>
          )}

          {phase === 'victory' && (
            <button onClick={() => onVictory()} style={{
              width: '100%', padding: '14px 0',
              background: isTraining
                ? 'linear-gradient(135deg, rgba(168,85,247,0.28), rgba(168,85,247,0.1))'
                : 'linear-gradient(135deg, rgba(250,204,21,0.28), rgba(250,204,21,0.1))',
              border: `2px solid ${isTraining ? '#a855f7' : '#facc15'}`,
              color: isTraining ? '#a855f7' : '#facc15',
              boxShadow: isTraining ? '0 0 28px rgba(168,85,247,0.5)' : '0 0 28px rgba(250,204,21,0.6)',
              fontFamily: 'Courier New', fontSize: 11, letterSpacing: 3,
              cursor: 'pointer', borderRadius: 4,
              animation: 'bs-action-spring 0.35s ease-out both',
            }}>{isTraining ? 'NEXT CHALLENGER' : 'CLAIM REWARD'}</button>
          )}

          {phase === 'defeat' && (
            <button onClick={() => {
              defeatDone.current = false;
              autoFight.current = false;
              fightStateRef.current = initFightState();
              setPlayerHP(pStats.maxHP); setBossHP(boss.maxHP);
              setPrevPlayerHP(pStats.maxHP); setPrevBossHP(boss.maxHP);
              setLog([]); setTurn(0); setPhase('ready');
              setBossRage(false); setPlayerAnim('idle'); setBossAnim('idle');
              setFloats([]); setShake(null); setFlash(null);
            }} style={{
              width: '100%', padding: '14px 0',
              background: 'linear-gradient(135deg, rgba(239,68,68,0.18), rgba(239,68,68,0.06))',
              border: '2px solid #ef4444', color: '#ef4444',
              boxShadow: '0 0 22px rgba(239,68,68,0.4)',
              fontFamily: 'Courier New', fontSize: 11, letterSpacing: 3,
              cursor: 'pointer', borderRadius: 4,
              animation: 'bs-action-spring 0.32s ease-out both',
            }}>RETRY</button>
          )}
        </div>

        {/* Turn counter */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 2,
        }}>
          <span style={{ fontSize:6, color:'#475569', fontFamily:'Courier New', letterSpacing:1 }}>TURN</span>
          <span style={{ fontSize:12, color:'#e2e8f0', fontFamily:'Courier New' }}>{turn}</span>
        </div>
      </div>

      {/* ── BATTLE STATS STRIP ── */}
      <div style={{
        display: 'flex', gap: 5, padding: '7px 12px', flexWrap: 'wrap',
        background: 'rgba(0,0,0,0.5)', borderTop: `1px solid ${themeColor}22`,
        flexShrink: 0,
      }}>
        {[
          { label: 'ELEMENT',    val: boss.element,                     col: themeColor },
          { label: 'WEAKNESS',   val: boss.weakness,                    col: '#facc15'  },
          { label: 'DIFFICULTY', val: boss.diffLabel || 'NORMAL',       col: /HARD|ELITE|MYTHIC|LEGEND/.test(boss.diffLabel) ? '#ef4444' : '#4ade80' },
          { label: 'YOUR ATK',   val: pStats.atk,                       col: '#f87171'  },
          { label: 'DEF',        val: `${Math.floor(pStats.defPct)}%`,  col: '#60a5fa'  },
          { label: 'DODGE',      val: `${Math.floor(pStats.dodgePct)}%`,col: '#a78bfa'  },
        ].map(({ label, val, col }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.04)', border: `1px solid ${col}33`,
            borderRadius: 4, padding: '3px 8px', textAlign: 'center', flex: '1 0 auto',
          }}>
            <div style={{ fontSize: 6, color: '#475569', fontFamily: 'Courier New', letterSpacing: 1 }}>{label}</div>
            <div style={{ fontSize: 9, color: col, fontFamily: 'Courier New', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{val}</div>
          </div>
        ))}
      </div>

      {/* ── STADIUM CROWD ── */}
      <StadiumCrowd
        themeColor={themeColor}
        bossHPPct={(bossHP / boss.maxHP) * 100}
        playerHPPct={(playerHP / pStats.maxHP) * 100}
        phase={phase}
      />
    </div>
  );
}
