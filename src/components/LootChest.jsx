import React, { useState, useEffect, useCallback } from 'react';
import GameIcon from './GameIcon';
import ItemIcon from './ItemIcon';
import { useT } from '../i18n/LangContext';

// ─── Burst Particle ───────────────────────────────────────────────
function BurstParticle({ color, angle, distance, delay, size }) {
  const rad  = (angle * Math.PI) / 180;
  const tx   = Math.cos(rad) * distance;
  const ty   = Math.sin(rad) * distance;
  return (
    <div style={{
      position: 'absolute', left: '50%', top: '50%',
      width: size, height: size, borderRadius: '50%',
      background: color,
      boxShadow: `0 0 ${size * 2}px ${color}`,
      transform: 'translate(-50%, -50%)',
      animation: `burstParticle 0.7s ease-out ${delay}s forwards`,
      '--tx': `${tx}px`, '--ty': `${ty}px`,
      pointerEvents: 'none',
    }}/>
  );
}

// ─── Static sparkle dots floating around ─────────────────────────
function SparkleField({ active, color }) {
  const sparks = [
    { x: '15%', y: '20%', s: 4 }, { x: '80%', y: '15%', s: 3 }, { x: '90%', y: '60%', s: 5 },
    { x: '10%', y: '70%', s: 3 }, { x: '50%', y: '10%', s: 4 }, { x: '30%', y: '80%', s: 3 },
    { x: '70%', y: '75%', s: 5 }, { x: '5%',  y: '40%', s: 3 }, { x: '92%', y: '35%', s: 4 },
    { x: '60%', y: '5%',  s: 3 },
  ];
  return (
    <>
      {sparks.map((sp, i) => (
        <div key={i} style={{
          position: 'absolute', left: sp.x, top: sp.y,
          width: sp.s, height: sp.s, borderRadius: '50%',
          background: color,
          opacity: active ? 0.8 : 0.2,
          boxShadow: active ? `0 0 ${sp.s * 2}px ${color}` : 'none',
          transition: `all 0.5s ease ${i * 0.05}s`,
          animation: active ? `floatUp ${1.4 + i * 0.25}s ease-in-out infinite` : 'none',
          pointerEvents: 'none',
        }}/>
      ))}
    </>
  );
}

// ─── Rarity tier labels & colors ──────────────────────────────────
const RARITY_TIER = {
  Common:    { label: 'COMMON',    rank: 1 },
  Uncommon:  { label: 'UNCOMMON',  rank: 2 },
  Rare:      { label: 'RARE',      rank: 3 },
  Epic:      { label: 'EPIC',      rank: 4 },
  Legendary: { label: 'LEGENDARY', rank: 5 },
};

// ─── Single stat row ─────────────────────────────────────────────
function StatRow({ icon, label, value, color }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2">
      <GameIcon name={icon} size={11} color={color}/>
      <span className="neon-text" style={{ color: '#64748b', fontSize: '7px', minWidth: 28 }}>{label}</span>
      <span className="neon-text" style={{ color, fontSize: '9px', textShadow: `0 0 6px ${color}` }}>+{value}</span>
    </div>
  );
}

// ─── Full item card shown after reveal ────────────────────────────
function ItemCard({ item, onEquip, onSkip, alreadyEquipped }) {
  const t     = useT();
  const rc    = item.rarityColor;
  const glow  = item.rarityGlow;
  const tier  = RARITY_TIER[item.rarity] || RARITY_TIER.Common;

  return (
    <div className="rounded-sm flex flex-col gap-3"
      style={{
        background: `linear-gradient(135deg, ${glow}cc, rgba(6,10,20,0.95))`,
        border: `2px solid ${rc}`,
        boxShadow: `0 0 28px ${glow}, 0 0 60px ${glow}44, inset 0 0 20px ${glow}11`,
        padding: '16px',
        animation: 'itemReveal 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
      }}>

      {/* ── TOP ROW: icon + name + rarity ── */}
      <div className="flex items-center gap-3">
        {/* Icon box */}
        <div className="flex-shrink-0 flex items-center justify-center rounded-sm"
          style={{
            width: 64, height: 64,
            background: `radial-gradient(circle, ${glow}88, rgba(0,0,0,0.7))`,
            border: `2px solid ${rc}66`,
            boxShadow: `0 0 20px ${glow}, inset 0 0 16px ${glow}44`,
            position: 'relative',
          }}>
          {/* Rarity shimmer */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '2px',
            background: `linear-gradient(135deg, ${rc}22, transparent 60%)`,
            animation: tier.rank >= 4 ? 'legendaryShimmer 2s linear infinite' : 'none',
          }}/>
          <ItemIcon name={item.name} size={34} color={rc}/>
        </div>

        {/* Name + rarity badge */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className="neon-text px-1.5 py-0.5 rounded-sm"
              style={{ background: `${rc}22`, border: `1px solid ${rc}44`, color: rc, fontSize: '6px', letterSpacing: '1px' }}>
              {tier.label}
            </div>
            <div className="neon-text" style={{ color: '#475569', fontSize: '6px' }}>
              {item.slot.toUpperCase()}
            </div>
          </div>
          <div className="neon-text" style={{ color: '#f1f5f9', fontSize: '11px', lineHeight: 1.2 }}>{item.name}</div>
          {alreadyEquipped && (
            <div className="neon-text mt-1" style={{ color: rc, fontSize: '7px' }}>✓ EQUIPPED</div>
          )}
        </div>
      </div>

      {/* ── STATS GRID ── */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 px-1 py-2 rounded-sm"
        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <StatRow icon="sword"     label="ATK"   value={item.atk}   color="#f87171"/>
        <StatRow icon="shield"    label="DEF"   value={item.def}   color="#60a5fa"/>
        <StatRow icon="heart"     label="HP"    value={item.hp}    color="#4ade80"/>
        <StatRow icon="lightning" label="CRIT"  value={item.crit  ? `${item.crit}%` : null}  color="#facc15"/>
        <StatRow icon="wing"      label="DODGE" value={item.dodge ? `${item.dodge}%` : null} color="#a78bfa"/>
      </div>

      {/* ── BUTTONS ── */}
      {!alreadyEquipped && (
        <div className="flex gap-2">
          <button onClick={onEquip} className="flex-1 py-3 rounded-sm pixel-btn neon-text"
            style={{
              background: `linear-gradient(135deg, ${glow}cc, rgba(0,0,0,0.5))`,
              border: `2px solid ${rc}`,
              color: rc, fontSize: '9px', letterSpacing: '2px',
              boxShadow: `0 0 16px ${glow}`,
            }}>
            ✓ {t('loot_equip')}
          </button>
          <button onClick={onSkip} className="px-4 py-3 rounded-sm pixel-btn neon-text"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#475569', fontSize: '8px' }}>
            {t('gen_close')}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Animated SVG Chest ───────────────────────────────────────────
function ChestSVG({ phase, color = '#facc15' }) {
  const isOpen   = phase === 'open' || phase === 'burst';
  const isShake  = phase === 'shaking';
  const lidAngle = isOpen ? -40 : 0;
  const c1 = color;
  const c2 = '#92400e';
  const c3 = '#78350f';

  return (
    <svg viewBox="0 0 64 52" width="100" height="78"
      style={{
        imageRendering: 'pixelated', overflow: 'visible',
        filter: `drop-shadow(0 0 12px ${c1}88) drop-shadow(0 0 24px ${c1}44)`,
        animation: isShake
          ? 'chestShake 0.5s ease-in-out'
          : isOpen ? 'none'
          : 'pixelBob 2.5s ease-in-out infinite',
      }}>

      {/* Shadow */}
      <ellipse cx="32" cy="50" rx="22" ry="3" fill="#000" opacity="0.4"/>

      {/* ── CHEST BASE ── */}
      <rect x="4"  y="28" width="56" height="22" rx="3" fill={c3}/>
      <rect x="5"  y="29" width="54" height="20" rx="2" fill={c2}/>
      {/* Wood planks */}
      <rect x="5"  y="29" width="54" height="7"  rx="0" fill={c2} opacity="0.6"/>
      <rect x="5"  y="36" width="54" height="7"  rx="0" fill={c2} opacity="0.5"/>
      <rect x="5"  y="43" width="54" height="6"  rx="0" fill={c2} opacity="0.4"/>
      {/* Iron bands */}
      <rect x="4"  y="29" width="56" height="3"  rx="0" fill="#374151"/>
      <rect x="4"  y="38" width="56" height="3"  rx="0" fill="#374151"/>
      <rect x="4"  y="47" width="56" height="3"  rx="1" fill="#374151"/>
      {/* Corner rivets */}
      {[[6,30],[54,30],[6,48],[54,48]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#6b7280"/>
      ))}

      {/* Lock (shown on locked phase) */}
      {!isOpen && (
        <g transform="translate(28, 36)">
          <rect x="-5" y="2"  width="10" height="9" rx="1" fill="#374151"/>
          <rect x="-4" y="3"  width="8"  height="7" rx="0" fill="#4b5563"/>
          <rect x="-2" y="5"  width="4"  height="3" rx="0" fill={c1} opacity="0.7"/>
          <path d="M-3 2 Q-3 -4 0 -4 Q3 -4 3 2" fill="none" stroke="#374151" strokeWidth="3" strokeLinecap="round"/>
          <path d="M-2 2 Q-2 -3 0 -3 Q2 -3 2 2" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
      )}

      {/* Keyhole glow (locked) */}
      {!isOpen && (
        <ellipse cx="32" cy="40" rx="3" ry="3" fill={c1} opacity="0.25"/>
      )}

      {/* ── CHEST LID ── */}
      <g transform={`rotate(${lidAngle}, 32, 28)`} style={{ transformOrigin: '32px 28px', transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
        <rect x="4"  y="10" width="56" height="20" rx="3" fill={c3}/>
        <rect x="5"  y="11" width="54" height="18" rx="2" fill={c2}/>
        {/* Lid planks */}
        <rect x="5"  y="11" width="54" height="6"  rx="0" fill={c2} opacity="0.6"/>
        <rect x="5"  y="17" width="54" height="6"  rx="0" fill={c2} opacity="0.5"/>
        <rect x="5"  y="23" width="54" height="5"  rx="0" fill={c2} opacity="0.4"/>
        {/* Lid iron bands */}
        <rect x="4"  y="11" width="56" height="3"  rx="0" fill="#374151"/>
        <rect x="4"  y="20" width="56" height="2.5" rx="0" fill="#374151"/>
        <rect x="4"  y="27" width="56" height="3"  rx="0" fill="#374151"/>
        {/* Gold trim on lid edge */}
        <rect x="4"  y="26" width="56" height="4"  rx="1" fill={c1} opacity="0.35"/>
        <rect x="5"  y="27" width="54" height="2"  rx="0" fill={c1} opacity="0.5"/>
        {/* Lid rivets */}
        {[[6,13],[54,13]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#6b7280"/>
        ))}
        {/* Lid highlight */}
        <rect x="6"  y="12" width="52" height="4" rx="0" fill="rgba(255,255,255,0.08)"/>
      </g>

      {/* Open glow inside */}
      {isOpen && (
        <ellipse cx="32" cy="30" rx="20" ry="8" fill={c1} opacity="0.5"/>
      )}
    </svg>
  );
}

// ─── MAIN LOOT CHEST ─────────────────────────────────────────────
export default function LootChest({ items, equippedItems = {}, onEquip, onDone }) {
  const t = useT();
  // phases: 'locked' → 'shaking' → 'burst' → 'open'
  const [phase, setPhase]         = useState('locked');
  const [burstActive, setBurstActive] = useState(false);
  const [itemsRevealed, setItemsRevealed] = useState(false);

  // How many items player has actioned (equipped or skipped)
  const [actioned, setActioned]   = useState(0);

  const handleChestClick = useCallback(() => {
    if (phase !== 'locked') return;
    setPhase('shaking');
    setTimeout(() => {
      setPhase('burst');
      setBurstActive(true);
      setTimeout(() => {
        setPhase('open');
        setBurstActive(false);
        setTimeout(() => setItemsRevealed(true), 200);
      }, 600);
    }, 550);
  }, [phase]);

  const handleEquip = useCallback((item) => {
    onEquip(item);
    setActioned(a => a + 1);
  }, [onEquip]);

  const handleSkip = useCallback(() => {
    setActioned(a => a + 1);
  }, []);

  const allActioned = actioned >= items.length;

  // Burst particle angles
  const BURST_COUNT = 16;
  const burstColors = ['#facc15', '#fb923c', '#f87171', '#c084fc', '#22d3ee', '#4ade80', '#fff'];

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(120,80,10,0.3), rgba(2,5,12,0.98))' }}>

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 3px)',
        zIndex: 1,
      }}/>

      {/* Sparkle field */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <SparkleField active={phase === 'open'} color="#facc15"/>
      </div>

      {/* Burst particles */}
      {burstActive && (
        <div className="absolute pointer-events-none" style={{ left: '50%', top: '38%', zIndex: 5 }}>
          {Array.from({ length: BURST_COUNT }).map((_, i) => {
            const angle    = (i / BURST_COUNT) * 360;
            const distance = 60 + Math.random() * 60;
            const color    = burstColors[i % burstColors.length];
            const size     = 4 + Math.floor(Math.random() * 6);
            return (
              <BurstParticle
                key={i} color={color} angle={angle}
                distance={distance} delay={i * 0.02} size={size}
              />
            );
          })}
        </div>
      )}

      {/* ── SCROLLABLE CONTENT ── */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 pb-6 flex flex-col items-center">
        {/* Header */}
        <div className="text-center pt-12 pb-4">
          <div className="neon-text flex items-center gap-2 justify-center"
            style={{ color: '#facc15', fontSize: '13px', letterSpacing: '4px', textShadow: '0 0 24px #facc15' }}>
            {phase === 'locked' && <><GameIcon name="chest" size={15} color="#facc15"/> {t('loot_title')}</>}
            {phase === 'shaking' && <><GameIcon name="chest" size={15} color="#facc15"/> {t('loot_open')}...</>}
            {phase === 'burst' && <><GameIcon name="star" size={15} color="#facc15"/> !!</>}
            {phase === 'open' && <><GameIcon name="trophy" size={15} color="#facc15"/> {t('loot_item_found')}</>}
          </div>
          <div className="neon-text mt-1" style={{ color: '#475569', fontSize: '7px', letterSpacing: '2px' }}>
            {phase === 'open' ? t('dungeon_cleared') : t('dungeon_loot')}
          </div>
        </div>

        {/* Chest visual */}
        <div
          onClick={handleChestClick}
          style={{
            cursor: phase === 'locked' ? 'pointer' : 'default',
            position: 'relative',
            marginBottom: phase === 'open' ? '8px' : '24px',
            transition: 'margin 0.4s ease',
          }}
        >
          <ChestSVG phase={phase} color="#facc15"/>

          {/* Open glow ring */}
          {phase === 'open' && (
            <div style={{
              position: 'absolute', inset: -12, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(250,204,21,0.15) 0%, transparent 70%)',
              animation: 'auraGlow 2s ease-in-out infinite',
              '--aura-color': '#facc15',
            }}/>
          )}
        </div>

        {/* Tap prompt */}
        {phase === 'locked' && (
          <div
            onClick={handleChestClick}
            className="neon-text animate-pulse"
            style={{
              color: '#facc15', fontSize: '10px', letterSpacing: '3px',
              cursor: 'pointer', marginBottom: '16px',
              textShadow: '0 0 12px #facc15',
            }}
          >
            ▶ {t('loot_open')} ◀
          </div>
        )}

        {phase === 'shaking' && (
          <div className="neon-text" style={{ color: '#fb923c', fontSize: '9px', letterSpacing: '2px', marginBottom: '16px' }}>
            CREAKING...
          </div>
        )}

        {phase === 'burst' && (
          <div className="neon-text neon-text-pulse" style={{ color: '#fff', fontSize: '11px', letterSpacing: '3px', marginBottom: '16px' }}>
            !!
          </div>
        )}

        {/* ── ITEM CARDS ── */}
        {phase === 'open' && itemsRevealed && (
          <div className="w-full flex flex-col gap-4" style={{ maxWidth: '420px' }}>
            {items.map((item, i) => {
              const alreadyEquipped = equippedItems[item.slot]?.id === item.id;
              return (
                <div key={item.id} style={{ animationDelay: `${i * 0.12}s` }}>
                  <ItemCard
                    item={item}
                    alreadyEquipped={alreadyEquipped}
                    onEquip={() => handleEquip(item)}
                    onSkip={handleSkip}
                  />
                </div>
              );
            })}

            {/* Continue button */}
            <button
              onClick={onDone}
              className="w-full py-3.5 rounded-sm pixel-btn neon-text mt-2"
              style={{
                background: allActioned
                  ? 'linear-gradient(135deg, rgba(250,204,21,0.15), rgba(250,204,21,0.06))'
                  : 'rgba(255,255,255,0.04)',
                border: allActioned ? '2px solid #facc15' : '1px solid rgba(255,255,255,0.1)',
                color: allActioned ? '#facc15' : '#475569',
                fontSize: '9px', letterSpacing: '3px',
                boxShadow: allActioned ? '0 0 20px rgba(250,204,21,0.3)' : 'none',
                transition: 'all 0.3s ease',
              }}>
              {t('loot_done')} →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
