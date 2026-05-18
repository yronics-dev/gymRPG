import React, { useState, useEffect } from 'react';
import GameIcon from './GameIcon';
import { useT } from '../i18n/LangContext';

function QuestRow({ quest, wasCompleted }) {
  const pct = Math.min(100, (quest.progress / quest.target) * 100);
  return (
    <div
      className="rounded-sm p-2"
      style={{
        background: wasCompleted ? 'rgba(74,222,128,0.08)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${wasCompleted ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.07)'}`,
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="neon-text" style={{ color: wasCompleted ? '#4ade80' : '#94a3b8', fontSize: '7px' }}>
          {wasCompleted ? '✓ ' : ''}{quest.desc}
        </div>
        <div className="neon-text" style={{ color: wasCompleted ? '#facc15' : '#475569', fontSize: '7px' }}>
          {wasCompleted ? quest.rewardLabel : `${quest.progress}/${quest.target}`}
        </div>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: wasCompleted ? 'linear-gradient(90deg, #4ade80, #22d3ee)' : 'rgba(255,255,255,0.2)',
            transition: 'width 0.6s ease',
            boxShadow: wasCompleted ? '0 0 6px #4ade80' : 'none',
          }}
        />
      </div>
    </div>
  );
}

function LootReveal({ item }) {
  return (
    <div
      className="rounded-sm p-3 flex items-center gap-3 animate-slide-up"
      style={{
        background: `linear-gradient(135deg, ${item.rarityGlow}, rgba(6,10,20,0.9))`,
        border: `2px solid ${item.rarityColor}`,
        boxShadow: `0 0 20px ${item.rarityGlow}`,
      }}
    >
      <span style={{ filter: `drop-shadow(0 0 8px ${item.rarityColor})` }}>
        <GameIcon name={item.icon} size={28} color={item.rarityColor} />
      </span>
      <div>
        <div className="neon-text flex items-center gap-1" style={{ color: item.rarityColor, fontSize: '7px', letterSpacing: '2px' }}>
          <GameIcon name="chest" size={10} color={item.rarityColor} /> ITEM FOUND! · {item.rarity.toUpperCase()}
        </div>
        <div className="neon-text mt-0.5" style={{ color: '#e2e8f0', fontSize: '9px' }}>{item.name}</div>
        <div className="neon-text" style={{ color: '#334155', fontSize: '6px' }}>
          {item.atk   > 0 && `ATK+${item.atk} `}
          {item.def   > 0 && `DEF+${item.def} `}
          {item.hp    > 0 && `HP+${item.hp} `}
          {item.crit  > 0 && `CRIT+${item.crit}% `}
          {item.dodge > 0 && `DODGE+${item.dodge}% `}
          · {item.slot.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

export default function PostWorkoutOverlay({
  event,
  xpGained = {},
  totalXP = 0,
  streak = { count: 0 },
  streakMultiplier = 1,
  eventMultiplier = 1,
  questUpdates = [],
  completedQuests = [],
  lootDrop = null,
  onEquipLoot,
  onDone,
}) {
  const t = useT();
  const [step, setStep] = useState(0);

  // Auto-advance event step after 1.2s
  useEffect(() => {
    if (step === 0 && event?.type !== 'normal') {
      const t = setTimeout(() => setStep(1), 1400);
      return () => clearTimeout(t);
    }
    if (step === 0) setStep(1);
  }, [step, event]);

  const totalMult = streakMultiplier * eventMultiplier;
  const isBonus   = totalMult > 1;
  const isMalus   = totalMult < 1;

  const xpEntries = Object.entries(xpGained).filter(([, v]) => v > 0);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden"
      style={{ background: 'rgba(2,5,12,0.96)', backdropFilter: 'blur(6px)' }}
    >
      {/* Event splash (step 0 for non-normal events) */}
      {step === 0 && event && event.type !== 'normal' && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div
            style={{
              animation: 'levelUpPop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
              filter: `drop-shadow(0 0 20px ${event.color})`,
            }}
          >
            <GameIcon name={event.icon} size={72} color={event.color} />
          </div>
          <div
            className="neon-text mt-4 text-center"
            style={{ color: event.color, fontSize: '14px', letterSpacing: '4px', textShadow: `0 0 20px ${event.color}` }}
          >
            {event.title}
          </div>
          <div className="neon-text mt-2" style={{ color: '#475569', fontSize: '8px', letterSpacing: '2px' }}>
            {event.desc}
          </div>
        </div>
      )}

      {/* Main summary (step 1+) */}
      {step >= 1 && (
        <div className="flex-1 overflow-y-auto px-4 pb-6 pt-10">

          {/* Header */}
          <div className="text-center mb-5">
            <div
              className="neon-text flex items-center gap-2 justify-center"
              style={{ color: isBonus ? '#4ade80' : isMalus ? '#f87171' : '#22d3ee', fontSize: '13px', letterSpacing: '4px', textShadow: isBonus ? '0 0 16px #4ade80' : 'none' }}
            >
              {event?.icon && <GameIcon name={event.icon} size={16} color={isBonus ? '#4ade80' : isMalus ? '#f87171' : '#22d3ee'} />}
              {t('workout_done')}!
            </div>
            {event && event.type !== 'normal' && (
              <div className="neon-text mt-1" style={{ color: event.color, fontSize: '8px', letterSpacing: '2px' }}>
                {event.title} · {event.desc}
              </div>
            )}
          </div>

          {/* XP gained */}
          {xpEntries.length > 0 && (
            <div
              className="rounded-sm p-3 mb-3"
              style={{ background: 'rgba(6,10,20,0.85)', border: '1px solid rgba(34,211,238,0.15)' }}
            >
              <div className="neon-text mb-2" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>{t('gen_xp')} +</div>
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                {xpEntries.map(([muscle, xp]) => (
                  <div key={muscle} className="flex items-center justify-between">
                    <span className="neon-text" style={{ color: '#475569', fontSize: '7px' }}>{muscle}</span>
                    <span className="neon-text" style={{ color: '#22d3ee', fontSize: '8px' }}>+{Math.floor(xp)}</span>
                  </div>
                ))}
              </div>
              <div
                className="flex items-center justify-between pt-2"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="neon-text" style={{ color: '#475569', fontSize: '7px' }}>{t('workout_volume')}</span>
                <span className="neon-text" style={{ color: '#4ade80', fontSize: '11px', textShadow: '0 0 8px #4ade80' }}>
                  +{Math.floor(totalXP)} XP
                </span>
              </div>
              {totalMult !== 1 && (
                <div className="neon-text text-center mt-1 flex items-center gap-1 justify-center" style={{ color: isBonus ? '#facc15' : '#f87171', fontSize: '7px' }}>
                  <GameIcon name={isBonus ? 'lightning' : 'flame'} size={10} color={isBonus ? '#facc15' : '#f87171'} />
                  {isBonus ? `x${totalMult.toFixed(2)} multiplier applied!` : `x${totalMult.toFixed(2)} penalty applied`}
                </div>
              )}
            </div>
          )}

          {/* Streak */}
          {streak.count > 0 && (
            <div
              className="rounded-sm p-3 mb-3 flex items-center gap-3"
              style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.25)' }}
            >
              <GameIcon name="flame" size={24} color="#fb923c" />
              <div className="flex-1">
                <div className="neon-text" style={{ color: '#fb923c', fontSize: '9px' }}>
                  {streak.count}-DAY STREAK!
                </div>
                {streakMultiplier > 1 && (
                  <div className="neon-text mt-0.5" style={{ color: '#475569', fontSize: '7px' }}>
                    +{Math.round((streakMultiplier - 1) * 100)}% XP bonus applied
                  </div>
                )}
                {streak.count === 7 && (
                  <div className="neon-text mt-0.5 flex items-center gap-1" style={{ color: '#facc15', fontSize: '7px' }}>
                    <GameIcon name="trophy" size={10} color="#facc15" /> 7-DAY STREAK REWARD UNLOCKED!
                  </div>
                )}
              </div>
              <div style={{ color: '#fb923c' }}>
                {streak.count >= 7
                  ? <GameIcon name="trophy" size={20} color="#facc15" />
                  : streak.count >= 3
                  ? <GameIcon name="lightning" size={20} color="#fb923c" />
                  : <span className="neon-text" style={{ fontSize: '14px' }}>+</span>
                }
              </div>
            </div>
          )}

          {/* Quests */}
          {questUpdates.length > 0 && (
            <div className="mb-3">
              <div className="neon-text mb-2" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>{t('workout_streak')}</div>
              <div className="flex flex-col gap-1.5">
                {questUpdates.map(q => (
                  <QuestRow
                    key={q.id}
                    quest={q}
                    wasCompleted={completedQuests.some(c => c.id === q.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Loot drop */}
          {lootDrop && (
            <div className="mb-3">
              <LootReveal item={lootDrop} />
              <button
                onClick={() => { onEquipLoot && onEquipLoot(lootDrop); }}
                className="w-full mt-2 py-2 rounded-sm pixel-btn neon-text"
                style={{
                  background: `linear-gradient(135deg, ${lootDrop.rarityGlow}, rgba(0,0,0,0.4))`,
                  border: `1px solid ${lootDrop.rarityColor}`,
                  color: lootDrop.rarityColor,
                  fontSize: '8px',
                  letterSpacing: '2px',
                }}
              >
                ✓ {t('loot_equip')}
              </button>
            </div>
          )}

          <button
            onClick={onDone}
            className="w-full py-4 rounded-sm pixel-btn neon-text mt-2"
            style={{
              background: 'rgba(34,211,238,0.08)',
              border: '1px solid rgba(34,211,238,0.3)',
              color: '#22d3ee',
              fontSize: '10px',
              letterSpacing: '3px',
            }}
          >
            {t('loot_done')} →
          </button>
        </div>
      )}
    </div>
  );
}
