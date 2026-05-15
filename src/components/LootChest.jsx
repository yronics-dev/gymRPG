import React, { useState, useEffect } from 'react';
import GameIcon from './GameIcon';

function StatLine({ iconName, label, val, color }) {
  if (!val) return null;
  return (
    <div className="flex items-center gap-1.5">
      <GameIcon name={iconName} size={10} color={color} />
      <span className="neon-text" style={{ color: '#475569', fontSize: '7px' }}>{label}</span>
      <span className="neon-text" style={{ color, fontSize: '8px', textShadow: `0 0 6px ${color}` }}>+{val}</span>
    </div>
  );
}

function ItemCard({ item, onEquip, onSkip, showButtons = true, alreadyEquipped = false }) {
  const rc = item.rarityColor;
  return (
    <div
      className="rounded-sm p-4 flex flex-col gap-3"
      style={{
        background: `linear-gradient(135deg, ${item.rarityGlow}, rgba(6,10,20,0.9))`,
        border: `2px solid ${rc}`,
        boxShadow: `0 0 24px ${item.rarityGlow}, inset 0 0 20px ${item.rarityGlow}22`,
      }}
    >
      {/* Rarity badge + icon */}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center rounded-sm"
          style={{
            width: 56, height: 56,
            background: `linear-gradient(135deg, ${item.rarityGlow}, rgba(0,0,0,0.6))`,
            border: `2px solid ${rc}55`,
            boxShadow: `0 0 16px ${item.rarityGlow}`,
          }}
        >
          <GameIcon name={item.icon || 'star'} size={28} color={rc} />
        </div>
        <div className="flex-1">
          <div
            className="neon-text"
            style={{ color: rc, fontSize: '7px', letterSpacing: '2px', textShadow: `0 0 8px ${rc}` }}
          >
            {item.rarity.toUpperCase()} · {item.slot.toUpperCase()}
          </div>
          <div
            className="neon-text mt-0.5"
            style={{ color: '#e2e8f0', fontSize: '10px' }}
          >
            {item.name}
          </div>
          {alreadyEquipped && (
            <div className="neon-text mt-0.5" style={{ color: rc, fontSize: '7px' }}>
              ✓ EQUIPPED
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-1.5 px-1">
        <StatLine iconName="sword"     label="ATK"   val={item.atk}   color="#f87171" />
        <StatLine iconName="shield"    label="DEF"   val={item.def}   color="#60a5fa" />
        <StatLine iconName="heart"     label="HP"    val={item.hp}    color="#4ade80" />
        <StatLine iconName="lightning" label="CRIT"  val={item.crit ? `${item.crit}%` : null} color="#facc15" />
        <StatLine iconName="wing"      label="DODGE" val={item.dodge ? `${item.dodge}%` : null} color="#a78bfa" />
      </div>

      {showButtons && (
        <div className="flex gap-2 mt-1">
          <button
            onClick={onEquip}
            className="flex-1 py-2.5 rounded-sm pixel-btn neon-text"
            style={{
              background: `linear-gradient(135deg, ${item.rarityGlow}, rgba(0,0,0,0.4))`,
              border: `2px solid ${rc}`,
              color: rc,
              fontSize: '8px',
              letterSpacing: '2px',
              boxShadow: `0 0 12px ${item.rarityGlow}`,
            }}
          >
            ✓ EQUIP
          </button>
          <button
            onClick={onSkip}
            className="px-4 py-2.5 rounded-sm pixel-btn neon-text"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#475569',
              fontSize: '8px',
            }}
          >
            SKIP
          </button>
        </div>
      )}
    </div>
  );
}

export default function LootChest({ items, equippedItems = {}, onEquip, onDone }) {
  const [phase, setPhase] = useState('closed');  // closed → opening → open
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('opening'), 400);
    const t2 = setTimeout(() => { setPhase('open'); setRevealed(1); }, 1400);
    const t3 = items.length > 1 ? setTimeout(() => setRevealed(2), 2000) : null;
    return () => { clearTimeout(t1); clearTimeout(t2); if (t3) clearTimeout(t3); };
  }, [items.length]);

  const allDone = () => onDone();

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'rgba(2,5,12,0.95)', backdropFilter: 'blur(8px)' }}
    >
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${3 + (i % 3) * 2}px`,
              height: `${3 + (i % 3) * 2}px`,
              background: phase === 'open' ? '#facc15' : '#475569',
              borderRadius: '50%',
              left: `${5 + i * 9}%`,
              top: `${10 + (i % 5) * 15}%`,
              opacity: phase === 'open' ? 0.7 : 0.2,
              boxShadow: phase === 'open' ? '0 0 8px #facc15' : 'none',
              transition: `all 0.5s ease ${i * 0.05}s`,
              animation: phase === 'open' ? `floatUp ${1.5 + i * 0.3}s ease-in-out infinite` : 'none',
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-sm px-4 flex flex-col items-center gap-5">
        {/* Header */}
        <div className="text-center">
          <div
            className="neon-text flex items-center gap-2 justify-center"
            style={{ color: '#facc15', fontSize: '12px', letterSpacing: '4px', textShadow: '0 0 20px #facc15' }}
          >
            {phase === 'closed'  && <><GameIcon name="chest"  size={14} color="#facc15" /> A CHEST!</>}
            {phase === 'opening' && <><GameIcon name="star"   size={14} color="#facc15" /> OPENING...</>}
            {phase === 'open'    && <><GameIcon name="trophy" size={14} color="#facc15" /> LOOT FOUND!</>}
          </div>
          <div className="neon-text mt-1" style={{ color: '#475569', fontSize: '7px', letterSpacing: '2px' }}>
            {phase === 'open' ? 'DUNGEON CLEARED!' : 'DUNGEON REWARD'}
          </div>
        </div>

        {/* Chest icon */}
        <div
          style={{
            transition: 'all 0.6s cubic-bezier(0.34,1.56,0.64,1)',
            filter: phase === 'open' ? 'drop-shadow(0 0 20px #facc15)' : 'none',
            animation: phase === 'opening' ? 'pixelBob 0.3s ease-in-out infinite' : 'none',
          }}
        >
          <GameIcon
            name="chest"
            size={phase === 'opening' ? 80 : phase === 'open' ? 56 : 72}
            color={phase === 'open' ? '#facc15' : '#60a5fa'}
          />
        </div>

        {/* Item cards */}
        {phase === 'open' && (
          <div className="w-full flex flex-col gap-3 animate-slide-up">
            {items.slice(0, revealed).map((item, i) => {
              const isEquipped = equippedItems[item.slot]?.id === item.id;
              return (
                <ItemCard
                  key={item.id}
                  item={item}
                  alreadyEquipped={isEquipped}
                  onEquip={() => { onEquip(item); }}
                  onSkip={() => { if (i === items.length - 1) allDone(); }}
                  showButtons={!isEquipped}
                />
              );
            })}

            {revealed >= items.length && (
              <button
                onClick={allDone}
                className="w-full py-3 rounded-sm pixel-btn neon-text"
                style={{
                  background: 'rgba(250,204,21,0.08)',
                  border: '1px solid rgba(250,204,21,0.3)',
                  color: '#facc15',
                  fontSize: '9px',
                  letterSpacing: '3px',
                  marginTop: '4px',
                }}
              >
                CONTINUE →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
