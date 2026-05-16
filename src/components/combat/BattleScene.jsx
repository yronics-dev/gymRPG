import React, { useState, useEffect, useRef, useCallback } from 'react';
import { runBattleTurn } from '../../utils/gameLogic';
import CharacterSprite from '../CharacterSprite';
import BossSprite from '../BossSprite';

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

  const [phase, setPhase]     = useState('ready');
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

  const themeColor = theme?.color || '#f87171';
  const themeBg    = theme?.bg    || '#1a0a14';
  const themeGlow  = theme?.glow  || '#f8717155';

  // ── Float helpers ─────────────────────────────────────────────────────────
  const addFloat = useCallback((val, type, side) => {
    const id = ++floatId.current;
    const aw  = arenaRef.current?.offsetWidth || 360;
    const x   = side === 'player' ? aw * 0.18 : aw * 0.72;
    const y   = 60;
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
    const bx = aw * 0.72;

    setPlayerAnim('charge');
    setSpeedH(true);
    await wait(200);
    setSpeedH(false);
    setPlayerAnim('lunge');
    await wait(200);

    // Impact
    setAtkEffect({ x: bx, y: 70 });
    setBossAnim('hit');
    events.forEach(e => { if (e.val != null) addFloat(e.val, e.type, 'boss'); });

    if (hasCrit) {
      setSpeedR({ x: bx, y: 70, color: '#facc15' });
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
    const px = aw * 0.18;

    // Telegraph (200ms windup)
    setBossAnim('telegraph');
    setBossGlow(true);
    await wait(200);
    setBossGlow(false);
    setBossAnim('lunge');
    await wait(200);

    // Impact at player
    setAtkEffect({ x: px, y: 70, element: 'player-hit' });
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
      setPrevBossHP(b => b);
      setBossHP(phase1BossHP);
    } else {
      const hasDodge = phase1Events.some(e => e.type === 'dodge');
      if (hasDodge) await animDodge(phase1Events);
      else await animBossAttack(phase1Events);
      setPrevPlayerHP(p => p);
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
        setPrevBossHP(b => b);
        setBossHP(finalBossHP);
      } else {
        const hasDodge = phase2Events.some(e => e.type === 'dodge');
        if (hasDodge) await animDodge(phase2Events);
        else await animBossAttack(phase2Events);
        setPrevPlayerHP(p => p);
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
    animating.current = true;
    setPhase('animating');

    const bossHPPct = (bossHP / boss.maxHP) * 100;
    const result = runBattleTurn(playerHP, bossHP, pStats, boss, hasWeaknessBonus, bossHPPct);

    setLog(prev => [...prev, ...result.events]);
    setTurn(t => t + 1);

    await runAnimTurn(result);

    animating.current = false;
    if (result.status === 'ongoing') setPhase('ready');
  }

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
    <div style={{ ...shakeStyle, position:'relative', width:'100%', height:'100%',
                  display:'flex', flexDirection:'column', overflow:'hidden' }}>

      {/* Screen flash */}
      {flash && (
        <div style={{ position:'absolute', inset:0, background:flash,
                      pointerEvents:'none', zIndex:100 }}/>
      )}

      {/* ── ARENA ── */}
      <div ref={arenaRef} style={{
        position: 'relative', flex: 1, overflow: 'hidden',
        display: 'flex', alignItems: 'flex-end',
      }}>
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

        {/* ── PLAYER (left 15%) ── */}
        <div style={{
          position: 'absolute', left: '8%', bottom: 16,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, zIndex: 10,
        }}>
          <FloatHpBar current={playerHP} max={pStats.maxHP} label="YOU" ghostHP={prevPlayerHP}/>
          <div style={pStyle}>
            <CharacterSprite
              level={playerLevel} muscleXP={muscleXP}
              size={88} equippedAura={equippedAura}
              equippedClothing={equippedClothing}
              equippedItems={equippedItems}
              inBattle={true}
            />
          </div>
        </div>

        {/* ── BOSS (right) ── */}
        <div style={{
          position: 'absolute', right: '8%', bottom: 16,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, zIndex: 10,
        }}>
          <FloatHpBar current={bossHP} max={boss.maxHP} label={boss.name} ghostHP={prevBossHP}/>
          <div style={bStyle}>
            <BossSprite boss={boss} size={100} isRage={bossRage}/>
          </div>
        </div>

        {/* Divider line */}
        <div style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1,
          background: `linear-gradient(180deg, transparent, ${themeColor}28, transparent)`,
          transform: 'translateX(-50%)', pointerEvents: 'none',
        }}/>

        {/* Rage label */}
        {bossRage && (
          <div style={{
            position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
            fontFamily: 'Courier New', fontSize: 8, letterSpacing: 3,
            color: '#ef4444', background: 'rgba(239,68,68,0.12)',
            border: '1px solid rgba(239,68,68,0.35)', padding: '2px 10px', borderRadius: 2,
            animation: 'bs-critical-pulse 0.6s ease-in-out infinite',
          }}>!! RAGE !!</div>
        )}
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
    </div>
  );
}
