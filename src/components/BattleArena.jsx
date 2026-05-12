import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getPlayerBattleStats, runBattleTurn } from '../utils/gameLogic';
import { ELEMENT_THEMES, BOSS_DIALOGUES } from '../constants';
import CharacterSprite from './CharacterSprite';
import BossSprite from './BossSprite';

// ─── Animated HP Bar ─────────────────────────────────────────────────────────
function HpBar({ current, max, color, label, side = 'left' }) {
  const pct = Math.max(0, Math.min(100, (current / max) * 100));
  const isCritical = pct <= 25;
  const isLow      = pct <= 50;

  let barColor = color;
  if (isCritical) barColor = '#f87171';
  else if (isLow) barColor = '#fb923c';

  return (
    <div className="w-full">
      <div className={`flex justify-between text-xs mb-1 items-center ${side === 'right' ? 'flex-row-reverse' : ''}`}>
        <span
          className="neon-text"
          style={{ color: '#94a3b8', fontSize: '7px' }}
        >
          {label}
        </span>
        <span
          className="neon-text"
          style={{ color: barColor, fontSize: '7px', textShadow: `0 0 6px ${barColor}` }}
        >
          {current}/{max}
        </span>
      </div>
      <div
        className="w-full h-4 rounded-sm overflow-hidden relative"
        style={{
          background: 'rgba(0,0,0,0.5)',
          border: `1px solid ${barColor}44`,
          boxShadow: isCritical ? `0 0 8px ${barColor}66` : 'none',
        }}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 6px)',
          }}
        />
        {/* HP fill */}
        <div
          className={`h-full ${isCritical ? 'animate-hp-flash' : ''}`}
          style={{
            width: `${pct}%`,
            background: isCritical
              ? `linear-gradient(90deg, #7f1d1d, ${barColor})`
              : `linear-gradient(90deg, ${barColor}aa, ${barColor})`,
            boxShadow: `0 0 8px ${barColor}88`,
            transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
            position: 'relative',
          }}
        >
          {/* Shine */}
          <div
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '40%',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '2px',
            }}
          />
        </div>
        {/* Damage ghost (shows last damage) */}
        {isCritical && (
          <div
            style={{
              position: 'absolute',
              right: 0, top: 0,
              width: `${100 - pct}%`,
              height: '100%',
              background: 'rgba(248,113,113,0.15)',
            }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Floating Damage Number ───────────────────────────────────────────────────
function FloatDmg({ val, type, id, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1300);
    return () => clearTimeout(t);
  }, [onDone]);

  const colors = {
    player:     '#22d3ee',
    crit:       '#facc15',
    adrenaline: '#f87171',
    boss:       '#f87171',
    boss_rage:  '#ef4444',
    block:      '#60a5fa',
    stamina:    '#c084fc',
    selfhit:    '#fb923c',
    weakness:   '#fde047',
    lockedin:   '#facc15',
    dodge:      '#4ade80',
  };
  const c = colors[type] || '#fff';
  const isCrit = type === 'crit';
  const isNeg  = type === 'boss' || type === 'boss_rage' || type === 'selfhit';

  return (
    <div
      className={`dmg-float ${isCrit ? 'crit' : ''}`}
      style={{
        color: c,
        textShadow: `0 0 8px ${c}, 2px 2px 0 #000`,
        fontSize: isCrit ? '22px' : isNeg ? '16px' : '14px',
      }}
    >
      {isNeg ? `-${val}` : isCrit ? `💥${val}!` : `+${val}`}
    </div>
  );
}

// ─── Particle field for arena background ─────────────────────────────────────
function ArenaParticles({ color, count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`particle particle-${(i % 6) + 1}`}
          style={{
            width: `${3 + (i % 3) * 2}px`,
            height: `${3 + (i % 3) * 2}px`,
            background: color,
            left: `${10 + i * 14}%`,
            bottom: `${5 + (i % 3) * 8}%`,
            opacity: 0.6,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      ))}
    </>
  );
}

// ─── Hype Meter ───────────────────────────────────────────────────────────────
function HypeMeter({ hype }) {
  const label =
    hype >= 90 ? 'ON FIRE 🔥' :
    hype >= 70 ? 'HYPE! ⚡' :
    hype >= 50 ? 'LOCKED IN 💪' :
    hype >= 30 ? 'FOCUSED 👀' :
    'LOW... 😰';

  return (
    <div style={{ width: '100%' }}>
      <div className="flex items-center justify-between mb-1">
        <span className="neon-text" style={{ color: '#facc15', fontSize: '7px' }}>HYPE</span>
        <span className="neon-text" style={{ color: '#facc15', fontSize: '7px' }}>{label}</span>
      </div>
      <div
        className="w-full h-2.5 rounded-sm overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(250,204,21,0.2)' }}
      >
        <div
          className={`hype-bar-fill h-full rounded-sm ${hype >= 70 ? 'animate-hype-pulse' : ''}`}
          style={{ width: `${hype}%` }}
        />
      </div>
    </div>
  );
}

// ─── Boss Dialogue Bubble ─────────────────────────────────────────────────────
function BossDialogue({ text }) {
  if (!text) return null;
  return (
    <div className="boss-bubble">
      {text}
    </div>
  );
}

// ─── Event Colors / Labels ────────────────────────────────────────────────────
const EVENT_STYLES = {
  player:   { color: '#22d3ee',  prefix: '⚔️' },
  crit:     { color: '#facc15',  prefix: '💥' },
  adrenaline:{ color: '#f87171', prefix: '🔥' },
  stamina:  { color: '#c084fc',  prefix: '⚡' },
  boss:     { color: '#f87171',  prefix: '👊' },
  boss_rage:{ color: '#ef4444',  prefix: '😡' },
  dodge:    { color: '#4ade80',  prefix: '💨' },
  block:    { color: '#60a5fa',  prefix: '🛡️' },
  weakness: { color: '#fde047',  prefix: '⚡' },
  selfhit:  { color: '#fb923c',  prefix: '😵' },
  injury:   { color: '#f87171',  prefix: '🩸' },
  lockedin: { color: '#facc15',  prefix: '🔒' },
  info:     { color: '#475569',  prefix: '•' },
};

// ─── Pick random dialogue ─────────────────────────────────────────────────────
function pickDialogue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── MAIN BATTLE ARENA ───────────────────────────────────────────────────────
export default function BattleArena({
  boss, muscleXP, playerLevel, todayMuscles, statUpgrades = {}, equippedAura, equippedClothing = {},
  isTraining = false,
  onVictory, onDefeat, onClose,
}) {
  const pStats = getPlayerBattleStats(muscleXP, statUpgrades);
  const theme  = ELEMENT_THEMES[boss.element] || ELEMENT_THEMES.Fire;
  const hasWeaknessBonus = todayMuscles.includes(boss.weakness);

  // ── Core state ──────────────────────────────────────────
  const [phase, setPhase]         = useState('intro');
  const [playerHP, setPlayerHP]   = useState(pStats.maxHP);
  const [bossHP, setBossHP]       = useState(boss.maxHP);
  const [log, setLog]             = useState([]);
  const [turn, setTurn]           = useState(0);

  // ── Cinematic state ──────────────────────────────────────
  const [shakeTarget, setShakeTarget]     = useState(null);
  const [screenFlash, setScreenFlash]     = useState(null);
  const [floatDmgs, setFloatDmgs]         = useState([]);
  const [showCritText, setShowCritText]   = useState(false);
  const [hype, setHype]                   = useState(50);
  const [playerStatus, setPlayerStatus]   = useState(null);
  const [bossRage, setBossRage]           = useState(false);
  const [bossDialogue, setBossDialogue]   = useState(null);
  const [dialogueSeen, setDialogueSeen]   = useState(new Set());
  const [introStep, setIntroStep]         = useState(0);
  const [comboCount, setComboCount]       = useState(0);
  const [activeSide, setActiveSide]       = useState(null); // 'player' | 'boss' | null

  const logRef     = useRef(null);
  const defeatDone = useRef(false);
  const floatId    = useRef(0);

  // ── Auto-scroll log ──────────────────────────────────────
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  // ── Boss intro sequence ──────────────────────────────────
  useEffect(() => {
    if (introStep === 0) {
      const t1 = setTimeout(() => setIntroStep(1), 200);
      return () => clearTimeout(t1);
    }
    if (introStep === 1) {
      setBossDialogue(pickDialogue(BOSS_DIALOGUES.intro));
      const t2 = setTimeout(() => { setBossDialogue(null); setIntroStep(2); }, 2800);
      return () => clearTimeout(t2);
    }
    if (introStep === 2) {
      setPhase('ready');
    }
  }, [introStep]);

  // ── Show boss dialogue at key HP thresholds ───────────────
  useEffect(() => {
    const pct = (bossHP / boss.maxHP) * 100;
    if (pct <= 50 && pct > 40 && !dialogueSeen.has('half')) {
      setDialogueSeen(prev => new Set([...prev, 'half']));
      setBossDialogue(pickDialogue(BOSS_DIALOGUES.halfHP));
      setTimeout(() => setBossDialogue(null), 2500);
    }
    if (pct <= 25 && !dialogueSeen.has('low')) {
      setDialogueSeen(prev => new Set([...prev, 'low']));
      setBossDialogue(pickDialogue(BOSS_DIALOGUES.lowHP));
      setTimeout(() => setBossDialogue(null), 2500);
    }
  }, [bossHP, boss.maxHP, dialogueSeen]);

  // ── Add floating damage ──────────────────────────────────
  const addFloat = useCallback((val, type) => {
    const id = ++floatId.current;
    setFloatDmgs(prev => [...prev, { id, val, type }]);
  }, []);

  const removeFloat = useCallback((id) => {
    setFloatDmgs(prev => prev.filter(f => f.id !== id));
  }, []);

  // ── Auto two-phase battle: phase1 (attacker) then phase2 (counter) ───────────
  useEffect(() => {
    if (phase !== 'fighting') return;

    function applyPhaseVisuals(events) {
      let hitsBoss = false, hitsPlayer = false, hasCrit = false, rageHit = false, hypeD = 0;
      events.forEach(ev => {
        if (ev.type === 'player' || ev.type === 'crit' || ev.type === 'adrenaline' || ev.type === 'stamina' || ev.type === 'selfhit') hitsBoss = true;
        if (ev.type === 'boss' || ev.type === 'boss_rage' || ev.type === 'block') hitsPlayer = true;
        if (ev.effect === 'crit') { hasCrit = true; hypeD += 15; }
        if (ev.type === 'boss_rage') rageHit = true;
        if (ev.effect === 'hit' && ev.type === 'player') hypeD += 8;
        if (ev.effect === 'adrenaline') { setPlayerStatus('adrenaline'); hypeD += 12; }
        if (ev.effect === 'lockedin')   setPlayerStatus('lockedin');
        if (ev.effect === 'injury')     setPlayerStatus('injured');
        if (ev.effect === 'stamina') hypeD += 6;
        if (ev.effect === 'dodge') hypeD += 10;
        if (ev.effect === 'block') hypeD += 5;
        if (ev.effect === 'weakness') hypeD += 10;
        if (ev.type === 'boss' || ev.type === 'boss_rage') hypeD -= 8;
        if (ev.val) addFloat(ev.val, ev.type);
      });
      if (hasCrit) {
        setScreenFlash('#facc1544');
        setShowCritText(true);
        setTimeout(() => setShowCritText(false), 700);
        setTimeout(() => setScreenFlash(null), 400);
      } else if (rageHit) {
        setScreenFlash('#f8717122');
        setTimeout(() => setScreenFlash(null), 350);
      }
      if (hitsBoss || hasCrit) setShakeTarget('boss');
      if (hitsPlayer)          setShakeTarget('player');
      setTimeout(() => setShakeTarget(null), 400);
      setHype(h => Math.min(100, Math.max(0, h + hypeD)));
    }

    const t1 = setTimeout(() => {
      const bossHPPercent = (bossHP / boss.maxHP) * 100;
      const result = runBattleTurn(playerHP, bossHP, pStats, boss, hasWeaknessBonus, bossHPPercent);

      // Phase 1 — first mover
      setActiveSide(result.playerFirst ? 'player' : 'boss');
      applyPhaseVisuals(result.phase1Events);
      setLog(prev => [...prev, ...result.phase1Events]);
      setPlayerHP(result.phase1PlayerHP);
      setBossHP(result.phase1BossHP);

      // Early KO in phase 1?
      if (result.phase1BossHP <= 0 || result.phase1PlayerHP <= 0) {
        const s = result.phase1BossHP <= 0 ? 'victory' : 'defeat';
        setTimeout(() => { setActiveSide(null); setPhase(s); }, 500);
        return;
      }

      // Phase 2 — counter-attacker
      const t2 = setTimeout(() => {
        setActiveSide(result.playerFirst ? 'boss' : 'player');
        applyPhaseVisuals(result.phase2Events);
        setLog(prev => [...prev, ...result.phase2Events]);
        setPlayerHP(result.playerHP);
        setBossHP(result.bossHP);

        if (result.bossRageActive && !bossRage) setBossRage(true);
        if (playerStatus === 'lockedin') setTimeout(() => setPlayerStatus(null), 2000);

        // Combo tracking
        let newCombo = comboCount;
        [...result.phase1Events, ...result.phase2Events].forEach(ev => {
          if (ev.effect === 'crit' || (ev.effect === 'hit' && ev.type === 'player') || ev.effect === 'adrenaline') newCombo++;
          if (ev.type === 'boss' || ev.type === 'boss_rage') newCombo = 0;
        });
        setComboCount(newCombo);

        setTimeout(() => {
          setActiveSide(null);
          if (result.status === 'victory')     setPhase('victory');
          else if (result.status === 'defeat') setPhase('defeat');
          else setTurn(t => t + 1);
        }, 400);
      }, 800);

      return () => clearTimeout(t2);
    }, 700);

    return () => clearTimeout(t1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, turn]);

  // ── Defeat callback ───────────────────────────────────────
  useEffect(() => {
    if (phase === 'defeat' && onDefeat && !defeatDone.current) {
      defeatDone.current = true;
      onDefeat();
    }
  }, [phase, onDefeat]);

  function startFight() {
    const startLog = [{ type: 'info', text: `⚔️ Battle vs ${boss.name} begins!` }];
    if (hasWeaknessBonus) {
      startLog.push({ type: 'weakness', text: `💪 ${boss.weakness} weakness bonus active!` });
    }
    setLog(startLog);
    setPhase('fighting');
  }

  function retry() {
    defeatDone.current = false;
    setPlayerHP(pStats.maxHP);
    setBossHP(boss.maxHP);
    setLog([]);
    setTurn(0);
    setPhase('ready');
    setHype(50);
    setPlayerStatus(null);
    setBossRage(false);
    setComboCount(0);
    setDialogueSeen(new Set());
    setActiveSide(null);
  }

  const playerHPPct  = (playerHP / pStats.maxHP) * 100;
  const bossHPPct    = (bossHP / boss.maxHP) * 100;
  const isPlayerLow  = playerHPPct <= 25;
  const isBossLow    = bossHPPct <= 25;

  // ═══════════════════════════════════════════
  // INTRO SCREEN
  // ═══════════════════════════════════════════
  if (phase === 'intro') {
    return (
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden"
        style={{ background: `radial-gradient(ellipse at 50% 30%, ${theme.bg}cc, #020509)` }}
      >
        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden' }}>
          <ArenaParticles color={theme.particle || theme.color} count={8} />
        </div>

        {/* VS Text */}
        <div
          className="neon-text text-center mb-6 animate-slide-up"
          style={{ color: '#475569', fontSize: '10px', letterSpacing: '8px' }}
        >
          TODAY'S CHALLENGE
        </div>

        {/* Boss reveal */}
        <div
          className="flex flex-col items-center animate-boss-intro"
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        >
          <div style={{ position: 'relative' }}>
            <BossSprite boss={boss} size={110} isRage={false} />
            {bossDialogue && <BossDialogue text={bossDialogue} />}
          </div>

          <div
            className="mt-4 text-center animate-slide-up"
            style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
          >
            <div
              className="neon-text neon-text-pulse"
              style={{ color: theme.color, fontSize: '14px', letterSpacing: '3px' }}
            >
              {boss.name}
            </div>
            <div
              className="neon-text mt-2"
              style={{ color: theme.color, fontSize: '8px', opacity: 0.8 }}
            >
              {theme.emoji} {boss.element} · Level {boss.level}
            </div>
            <div className="flex gap-6 mt-3 justify-center">
              <div className="text-center">
                <div className="neon-text" style={{ color: '#4ade80', fontSize: '7px' }}>HP</div>
                <div className="neon-text" style={{ color: '#4ade80', fontSize: '11px' }}>{boss.maxHP}</div>
              </div>
              <div className="text-center">
                <div className="neon-text" style={{ color: '#f87171', fontSize: '7px' }}>ATK</div>
                <div className="neon-text" style={{ color: '#f87171', fontSize: '11px' }}>{boss.atk}</div>
              </div>
              <div className="text-center">
                <div className="neon-text" style={{ color: '#facc15', fontSize: '7px' }}>WEAK</div>
                <div className="neon-text" style={{ color: '#facc15', fontSize: '8px' }}>{boss.weakness}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading bar */}
        <div
          className="mt-10 w-40 h-1.5 rounded-full overflow-hidden animate-slide-up"
          style={{ background: 'rgba(255,255,255,0.1)', animationDelay: '1s', animationFillMode: 'both' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${theme.color}, white)`,
              width: introStep >= 1 ? '100%' : '0%',
              transition: 'width 2s ease',
              boxShadow: `0 0 8px ${theme.color}`,
            }}
          />
        </div>
        <div className="neon-text mt-2" style={{ color: '#475569', fontSize: '7px' }}>
          PREPARING BATTLE...
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════
  // BATTLE SCREEN
  // ═══════════════════════════════════════════
  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col ${shakeTarget === 'player' ? 'animate-camera-shake' : ''}`}
      style={{ background: `linear-gradient(180deg, ${theme.bg}cc 0%, #020509 55%)` }}
    >
      {/* Screen flash overlay */}
      {screenFlash && (
        <div
          className="battle-flash"
          style={{ background: screenFlash }}
        />
      )}

      {/* Critical hit text */}
      {showCritText && (
        <div className="crit-text">CRITICAL!</div>
      )}

      {/* Arena grid background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="arena-grid" />
        <ArenaParticles color={theme.particle || theme.color} count={6} />
      </div>

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-10 pb-1">
        <button
          onClick={onClose}
          className="pixel-btn px-3 py-1.5 rounded"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#475569',
            fontSize: '8px',
          }}
        >
          ✕ FLEE
        </button>

        <div className="flex flex-col items-center gap-1">
          <div className="neon-text" style={{ color: '#475569', fontSize: '7px', letterSpacing: '4px' }}>VS</div>
          <div
            className={`neon-text ${bossRage ? 'neon-text-pulse' : ''}`}
            style={{ color: theme.color, fontSize: '10px', textShadow: `0 0 10px ${theme.color}` }}
          >
            {boss.name}
          </div>
          <div className="neon-text" style={{ color: theme.color, fontSize: '7px', opacity: 0.8 }}>
            {theme.emoji} {boss.element} · Lv.{boss.level}
          </div>
        </div>

        <div className="flex flex-col items-end gap-0.5">
          <div className="neon-text" style={{ color: '#475569', fontSize: '7px' }}>TURN</div>
          <div className="neon-text" style={{ color: '#e2e8f0', fontSize: '12px' }}>{turn}</div>
          {comboCount > 1 && (
            <div
              className="neon-text animate-slide-up"
              style={{ color: '#facc15', fontSize: '7px' }}
            >
              {comboCount}× COMBO!
            </div>
          )}
        </div>
      </div>

      {/* HP BARS */}
      <div className="relative z-10 px-4 pt-1 pb-2 flex flex-col gap-2">
        {/* Hype meter */}
        <HypeMeter hype={hype} />

        {/* Boss HP */}
        <div
          className={`flex items-center gap-3 ${shakeTarget === 'boss' ? 'animate-hit-shake' : ''}`}
        >
          <div style={{ position: 'relative' }}>
            <BossSprite boss={boss} size={48} isRage={bossRage} />
            {bossDialogue && <BossDialogue text={bossDialogue} />}
          </div>
          <div className="flex-1">
            <HpBar current={bossHP} max={boss.maxHP} color={theme.color} label={boss.name} />
          </div>
        </div>

        {/* Weakness pill */}
        {hasWeaknessBonus && (
          <div
            className="flex items-center gap-1 text-center w-full justify-center"
          >
            <div
              className="neon-text px-3 py-1 rounded-sm"
              style={{
                background: 'rgba(250,204,21,0.1)',
                border: '1px solid rgba(250,204,21,0.3)',
                color: '#facc15',
                fontSize: '7px',
              }}
            >
              ⚡ WEAKNESS BONUS ACTIVE!
            </div>
          </div>
        )}

        {/* Player HP */}
        <div
          className={`flex items-center gap-3 flex-row-reverse ${shakeTarget === 'player' ? 'animate-hit-shake' : ''} ${isPlayerLow ? 'animate-adrenaline-pulse' : ''}`}
        >
          <div style={{ position: 'relative' }}>
            <CharacterSprite level={playerLevel} muscleXP={muscleXP} size={48} equippedAura={equippedAura} equippedClothing={equippedClothing} />
            {/* Floating damage numbers */}
            {floatDmgs.map(f => (
              <FloatDmg
                key={f.id}
                val={f.val}
                type={f.type}
                id={f.id}
                onDone={() => removeFloat(f.id)}
              />
            ))}
          </div>
          <div className="flex-1">
            <HpBar current={playerHP} max={pStats.maxHP} color="#22d3ee" label="YOU" side="right" />
            {/* Player status badge */}
            {playerStatus && (
              <div className="flex justify-end mt-1">
                <span className={`status-badge status-${playerStatus}`}>
                  {playerStatus === 'adrenaline' ? '🔥 ADRENALINE' :
                   playerStatus === 'lockedin'   ? '🔒 LOCKED IN' :
                   '🩸 INJURED'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BATTLE LOG */}
      <div
        ref={logRef}
        className="battle-log mx-4 flex-1 rounded-sm px-3 py-2 overflow-y-auto space-y-0.5"
        style={{
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.06)',
          minHeight: '80px',
          maxHeight: '160px',
        }}
      >
        {log.length === 0 && (
          <p className="neon-text text-center pt-4" style={{ color: '#475569', fontSize: '7px' }}>
            PRESS FIGHT TO BEGIN
          </p>
        )}
        {log.slice(-12).map((e, i) => {
          const style = EVENT_STYLES[e.type] || EVENT_STYLES.info;
          return (
            <div
              key={i}
              className="animate-slide-up flex items-center gap-1"
              style={{ color: style.color }}
            >
              <span style={{ fontSize: '10px' }}>{style.prefix}</span>
              <span style={{ fontSize: '9px', fontFamily: 'Courier New' }}>{e.text}</span>
            </div>
          );
        })}
        {phase === 'victory' && (
          <div
            className="text-center py-3 animate-slide-up"
            style={{ color: '#facc15' }}
          >
            <div className="neon-text neon-text-pulse" style={{ fontSize: '18px', color: '#facc15' }}>
              🏆 VICTORY!
            </div>
          </div>
        )}
        {phase === 'defeat' && (
          <div className="text-center py-3 animate-slide-up">
            <div className="neon-text" style={{ fontSize: '16px', color: '#f87171' }}>
              💀 DEFEATED!
            </div>
          </div>
        )}
      </div>

      {/* PHASE CHANGE OVERLAY at low boss HP */}
      {isBossLow && phase === 'fighting' && (
        <div
          className="mx-4 my-1 px-3 py-1.5 rounded-sm text-center animate-rage-flash"
          style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}
        >
          <span className="neon-text" style={{ color: '#ef4444', fontSize: '7px' }}>
            {bossRage ? '😡 BOSS RAGE MODE!' : '⚠️ BOSS IS DESPERATE!'}
          </span>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="safe-bottom relative z-10 px-4 py-3 flex gap-3">
        {phase === 'ready' && (
          <button
            onClick={startFight}
            className="flex-1 py-4 rounded-sm pixel-btn"
            style={{
              background: `linear-gradient(135deg, ${theme.bg}ee, ${theme.bg}88)`,
              border: `2px solid ${theme.color}`,
              color: theme.color,
              boxShadow: `0 0 20px ${theme.glow}, inset 0 0 20px ${theme.glow}33`,
              fontSize: '11px',
              letterSpacing: '3px',
            }}
          >
            ⚔️ FIGHT!
          </button>
        )}

        {phase === 'fighting' && (
          <div
            className="flex-1 flex items-center justify-center gap-3 py-3 rounded-sm"
            style={{
              background: activeSide === 'player'
                ? 'rgba(34,211,238,0.08)'
                : activeSide === 'boss'
                ? `${theme.bg}44`
                : 'transparent',
              border: `1px solid ${activeSide === 'player' ? 'rgba(34,211,238,0.3)' : activeSide === 'boss' ? `${theme.color}44` : 'rgba(255,255,255,0.05)'}`,
              transition: 'all 0.3s ease',
            }}
          >
            {activeSide === 'player' && (
              <>
                <span className="neon-text animate-pulse" style={{ color: '#22d3ee', fontSize: '11px' }}>⚔️</span>
                <span className="neon-text" style={{ color: '#22d3ee', fontSize: '8px', letterSpacing: '3px' }}>YOUR TURN</span>
                <span className="neon-text animate-pulse" style={{ color: '#22d3ee', fontSize: '11px', animationDelay: '0.3s' }}>⚔️</span>
              </>
            )}
            {activeSide === 'boss' && (
              <>
                <span className="neon-text animate-pulse" style={{ color: theme.color, fontSize: '11px' }}>💀</span>
                <span className="neon-text" style={{ color: theme.color, fontSize: '8px', letterSpacing: '3px' }}>BOSS TURN</span>
                <span className="neon-text animate-pulse" style={{ color: theme.color, fontSize: '11px', animationDelay: '0.3s' }}>💀</span>
              </>
            )}
            {!activeSide && (
              <>
                <span className="neon-text animate-pulse" style={{ color: '#334155', fontSize: '9px' }}>⚔️</span>
                <span className="neon-text" style={{ color: '#475569', fontSize: '8px' }}>BATTLING...</span>
                <span className="neon-text animate-pulse" style={{ color: '#334155', fontSize: '9px', animationDelay: '0.5s' }}>⚔️</span>
              </>
            )}
          </div>
        )}

        {phase === 'victory' && (
          <button
            onClick={() => onVictory()}
            className="flex-1 py-4 rounded-sm pixel-btn"
            style={{
              background: isTraining
                ? 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(168,85,247,0.1))'
                : 'linear-gradient(135deg, rgba(250,204,21,0.25), rgba(250,204,21,0.1))',
              border: `2px solid ${isTraining ? '#a855f7' : '#facc15'}`,
              color: isTraining ? '#a855f7' : '#facc15',
              boxShadow: isTraining ? '0 0 28px rgba(168,85,247,0.5)' : '0 0 28px rgba(250,204,21,0.6), inset 0 0 20px rgba(250,204,21,0.1)',
              fontSize: '11px',
              letterSpacing: '3px',
            }}
          >
            {isTraining ? '🥊 NEXT CHALLENGER' : '🏆 CLAIM REWARD'}
          </button>
        )}

        {phase === 'defeat' && (
          <>
            <button
              onClick={retry}
              className="flex-1 py-4 rounded-sm pixel-btn"
              style={{
                background: 'rgba(248,113,113,0.12)',
                border: '2px solid rgba(248,113,113,0.5)',
                color: '#f87171',
                fontSize: '10px',
                letterSpacing: '2px',
              }}
            >
              🔄 RETRY
            </button>
            {isTraining && (
              <button
                onClick={() => onDefeat()}
                className="flex-1 py-4 rounded-sm pixel-btn"
                style={{
                  background: 'rgba(168,85,247,0.1)',
                  border: '2px solid rgba(168,85,247,0.4)',
                  color: '#a855f7',
                  fontSize: '10px',
                  letterSpacing: '2px',
                }}
              >
                🥊 NEXT
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
