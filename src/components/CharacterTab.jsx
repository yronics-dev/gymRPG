import React, { useState } from 'react';
import {
  STAT_INFO, MUSCLE_COLORS, MUSCLE_GROUPS, MUSCLE_TO_STAT, GOLD_SHOP,
} from '../constants';
import { SanctumScene } from './PixelScene';
import {
  getStats, getStatXP, getTotalXP, getLevel, getWeaknessWarnings,
  getMuscleRank, getMuscleRankProgress, xpForLevel, getXPInCurrentLevel,
} from '../utils/gameLogic';
import CharacterSprite from './CharacterSprite';

function StatBar({ statKey, xp, stat, upgradeCount = 0 }) {
  const info = STAT_INFO[statKey];
  const maxDisplay = 100;
  const totalVal = stat;
  const pct = Math.min(100, (totalVal / maxDisplay) * 100);
  const [hover, setHover] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-1">
        <div
          className="flex items-center gap-2 cursor-help"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <span style={{ fontSize: '14px' }}>{info.icon}</span>
          <span className="neon-text" style={{ color: info.color, fontSize: '8px', letterSpacing: '1px' }}>{info.label}</span>
          <span className="neon-text" style={{ color: '#334155', fontSize: '7px' }}>{info.fullLabel}</span>
        </div>
        <div className="flex items-center gap-1">
          {upgradeCount > 0 && (
            <span className="neon-text" style={{ color: '#facc15', fontSize: '7px' }}>+{upgradeCount}</span>
          )}
          <span className="neon-text" style={{ color: info.color, fontSize: '10px' }}>{stat}</span>
        </div>
      </div>

      <div className="stat-bar-container w-full h-3 rounded-sm">
        <div
          className="stat-bar-fill h-full rounded-sm"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${info.color}88, ${info.color})`,
            boxShadow: `0 0 6px ${info.color}66`,
          }}
        />
      </div>

      <div className="neon-text text-right mt-0.5" style={{ color: '#1e2d3d', fontSize: '7px' }}>
        {xp.toFixed(0)} XP → {info.muscles.length > 0 ? info.muscles.join(', ') : 'Gold Only'}
      </div>

      {hover && (
        <div
          className="absolute left-0 top-10 z-10 px-3 py-2 rounded-sm w-52"
          style={{ background: '#080e1a', border: `1px solid ${info.color}44`, boxShadow: `0 0 12px ${info.color}22` }}
        >
          <div className="neon-text mb-1" style={{ color: info.color, fontSize: '8px' }}>{info.fullLabel}</div>
          <div className="neon-text" style={{ color: '#475569', fontSize: '7px' }}>{info.desc}</div>
          {info.goldOnly && (
            <div className="neon-text mt-1" style={{ color: '#facc15', fontSize: '7px' }}>💰 Upgrade with Gold</div>
          )}
        </div>
      )}
    </div>
  );
}

function MuscleRankRow({ muscle, xp, isFocus }) {
  const rank    = getMuscleRank(xp);
  const prog    = getMuscleRankProgress(xp);

  return (
    <div className="flex items-center gap-2 py-1.5">
      <div className="neon-text w-20 text-right shrink-0" style={{ color: MUSCLE_COLORS[muscle], fontSize: '7px' }}>
        {muscle.toUpperCase()}
      </div>
      <div
        className="flex-1 h-1.5 rounded-sm overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div
          className="h-full rounded-sm"
          style={{
            width: `${Math.min(100, prog * 100)}%`,
            background: rank.color,
            boxShadow: `0 0 4px ${rank.color}88`,
            transition: 'width 0.8s ease',
          }}
        />
      </div>
      <div
        className="neon-text shrink-0 px-1.5 py-0.5 rounded-sm"
        style={{ color: rank.textColor, background: `${rank.color}22`, fontSize: '6px', letterSpacing: '1px', border: `1px solid ${rank.color}44`, minWidth: '48px', textAlign: 'center' }}
      >
        {rank.name.toUpperCase()}
      </div>
      {isFocus && (
        <div className="neon-text shrink-0 px-1 py-0.5 rounded-sm" style={{ color: '#f87171', fontSize: '6px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)' }}>
          FOCUS
        </div>
      )}
    </div>
  );
}

function WardrobeShop({ coins, ownedClothing, equippedClothing, onBuyClothing, onEquipClothing }) {
  const SLOTS = ['hat', 'pants', 'shoes', 'accessory'];
  const SLOT_LABELS = { hat: '🎩 Hats', pants: '👖 Pants', shoes: '👟 Shoes', accessory: '✨ Accessories' };
  const [activeSlot, setActiveSlot] = useState('hat');
  const items = GOLD_SHOP.clothing[activeSlot] || [];

  return (
    <div>
      {/* Slot tabs */}
      <div className="flex gap-1 mb-3 overflow-x-auto">
        {SLOTS.map(slot => (
          <button
            key={slot}
            onClick={() => setActiveSlot(slot)}
            className="px-2 py-1.5 rounded-sm whitespace-nowrap"
            style={{
              background: activeSlot === slot ? 'rgba(250,204,21,0.15)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${activeSlot === slot ? 'rgba(250,204,21,0.5)' : 'rgba(255,255,255,0.06)'}`,
              color: activeSlot === slot ? '#facc15' : '#475569',
              fontSize: '7px',
              letterSpacing: '1px',
            }}
          >
            {SLOT_LABELS[slot]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {items.map(item => {
          const owned    = ownedClothing.includes(item.id);
          const equipped = equippedClothing[activeSlot] === item.id;
          const canAfford = coins >= item.cost;

          return (
            <div
              key={item.id}
              className="rounded-sm p-3 flex flex-col gap-2"
              style={{
                background: equipped ? 'rgba(250,204,21,0.08)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${equipped ? 'rgba(250,204,21,0.4)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <div className="neon-text" style={{ color: '#e2e8f0', fontSize: '7px' }}>{item.label}</div>
              </div>
              {owned ? (
                <button
                  onClick={() => onEquipClothing(item.id, activeSlot)}
                  className="pixel-btn py-1.5 rounded-sm text-center"
                  style={{
                    background: equipped ? 'rgba(250,204,21,0.15)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${equipped ? 'rgba(250,204,21,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    color: equipped ? '#facc15' : '#475569',
                    fontSize: '7px',
                  }}
                >
                  {equipped ? '✓ EQUIPPED' : 'EQUIP'}
                </button>
              ) : item.cost === 0 ? (
                <button
                  onClick={() => onEquipClothing(item.id, activeSlot)}
                  className="pixel-btn py-1.5 rounded-sm text-center"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#475569', fontSize: '7px' }}
                >
                  EQUIP
                </button>
              ) : (
                <button
                  disabled={!canAfford}
                  onClick={() => onBuyClothing(item.id, activeSlot, item.cost)}
                  className="pixel-btn py-1.5 rounded-sm text-center"
                  style={{
                    background: canAfford ? 'rgba(250,204,21,0.12)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${canAfford ? 'rgba(250,204,21,0.3)' : 'rgba(255,255,255,0.06)'}`,
                    color: canAfford ? '#facc15' : '#334155',
                    fontSize: '7px',
                    opacity: canAfford ? 1 : 0.5,
                  }}
                >
                  {item.cost} 🪙
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GoldShop({
  coins, statUpgrades, ownedAuras, equippedAura, equippedAuraColor,
  ownedClothing, equippedClothing, onBuyClothing, onEquipClothing,
  onBuyStatUpgrade, onBuyAura, onEquipAura,
}) {
  const [shopTab, setShopTab] = useState('stats');

  return (
    <div
      className="mt-5 rounded-sm overflow-hidden"
      style={{ border: '1px solid rgba(250,204,21,0.2)', background: '#080e1a' }}
    >
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ background: 'linear-gradient(90deg, rgba(250,204,21,0.1), transparent)', borderBottom: '1px solid rgba(250,204,21,0.15)' }}
      >
        <div className="neon-text" style={{ color: '#facc15', fontSize: '9px', letterSpacing: '2px' }}>
          🏪 GOLD SHOP
        </div>
        <div className="neon-text" style={{ color: '#facc15', fontSize: '11px', textShadow: '0 0 10px #facc15' }}>
          {coins} 🪙
        </div>
      </div>

      <div className="flex border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        {[
          { id: 'stats',    label: '⚔️ Stats'   },
          { id: 'wardrobe', label: '👔 Wardrobe' },
          { id: 'auras',    label: '✨ Auras'    },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setShopTab(t.id)}
            className="flex-1 py-2"
            style={{
              background: shopTab === t.id ? 'rgba(250,204,21,0.1)' : 'transparent',
              borderBottom: shopTab === t.id ? '2px solid #facc15' : '2px solid transparent',
              color: shopTab === t.id ? '#facc15' : '#475569',
              fontFamily: 'Courier New',
              fontSize: '9px',
              letterSpacing: '1px',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {shopTab === 'stats' && (
        <div className="p-4 flex flex-col gap-3">
          {GOLD_SHOP.stats.map(item => {
            const currentCount = statUpgrades[item.stat] || 0;
            const maxed        = currentCount >= item.max;
            const canAfford    = coins >= item.cost;
            return (
              <div key={item.id} className="shop-card rounded-sm p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <div>
                    <div className="neon-text" style={{ color: item.color, fontSize: '9px', letterSpacing: '1px' }}>{item.label}</div>
                    <div className="neon-text mt-0.5" style={{ color: '#334155', fontSize: '7px' }}>{item.desc}</div>
                    <div className="neon-text mt-0.5" style={{ color: '#475569', fontSize: '7px' }}>Owned: {currentCount}/{item.max}</div>
                  </div>
                </div>
                <button
                  disabled={maxed || !canAfford}
                  onClick={() => onBuyStatUpgrade(item.stat, item.cost)}
                  className="pixel-btn px-3 py-2 rounded-sm ml-2"
                  style={{
                    background: maxed ? 'rgba(255,255,255,0.05)' : !canAfford ? 'rgba(255,255,255,0.03)' : 'rgba(250,204,21,0.15)',
                    border: maxed ? '1px solid rgba(255,255,255,0.1)' : !canAfford ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(250,204,21,0.4)',
                    color: maxed ? '#334155' : !canAfford ? '#334155' : '#facc15',
                    fontSize: '8px',
                    minWidth: '60px',
                    opacity: maxed || !canAfford ? 0.5 : 1,
                  }}
                >
                  {maxed ? 'MAX' : `${item.cost} 🪙`}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {shopTab === 'wardrobe' && (
        <div className="p-4">
          <WardrobeShop
            coins={coins}
            ownedClothing={ownedClothing}
            equippedClothing={equippedClothing}
            onBuyClothing={onBuyClothing}
            onEquipClothing={onEquipClothing}
          />
        </div>
      )}

      {shopTab === 'auras' && (
        <div className="p-4">
          <div className="neon-text mb-3" style={{ color: '#334155', fontSize: '7px', letterSpacing: '2px' }}>
            EQUIPPED: <span style={{ color: equippedAuraColor !== 'rainbow' ? equippedAuraColor : '#facc15' }}>
              {equippedAura?.replace('aura_', '').toUpperCase() || 'CYAN'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {GOLD_SHOP.auras.map(aura => {
              const owned    = ownedAuras.includes(aura.id) || aura.cost === 0;
              const equipped = equippedAura === aura.id;
              const canAfford = coins >= aura.cost;
              return (
                <div
                  key={aura.id}
                  className="rounded-sm p-3 flex flex-col gap-2"
                  style={{
                    background: equipped ? `${aura.color !== 'rainbow' ? aura.color : '#facc15'}18` : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${equipped ? (aura.color !== 'rainbow' ? aura.color : '#facc15') : 'rgba(255,255,255,0.08)'}`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      style={{
                        width: '20px', height: '20px', borderRadius: '4px',
                        background: aura.color === 'rainbow'
                          ? 'conic-gradient(#f87171,#facc15,#4ade80,#22d3ee,#a855f7,#f87171)'
                          : aura.color,
                        boxShadow: `0 0 8px ${aura.color !== 'rainbow' ? aura.color : '#facc15'}`,
                      }}
                    />
                    <div className="neon-text" style={{ color: '#e2e8f0', fontSize: '7px' }}>{aura.label}</div>
                  </div>
                  {owned ? (
                    <button
                      onClick={() => onEquipAura(aura.id)}
                      className="pixel-btn py-1.5 rounded-sm text-center"
                      style={{
                        background: equipped ? `${aura.color !== 'rainbow' ? aura.color : '#facc15'}22` : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${equipped ? (aura.color !== 'rainbow' ? aura.color : '#facc15') : 'rgba(255,255,255,0.1)'}`,
                        color: equipped ? (aura.color !== 'rainbow' ? aura.color : '#facc15') : '#475569',
                        fontSize: '7px',
                      }}
                    >
                      {equipped ? '✓ EQUIPPED' : 'EQUIP'}
                    </button>
                  ) : (
                    <button
                      disabled={!canAfford}
                      onClick={() => onBuyAura(aura.id, aura.cost)}
                      className="pixel-btn py-1.5 rounded-sm text-center"
                      style={{
                        background: canAfford ? 'rgba(250,204,21,0.12)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${canAfford ? 'rgba(250,204,21,0.3)' : 'rgba(255,255,255,0.06)'}`,
                        color: canAfford ? '#facc15' : '#334155',
                        fontSize: '7px',
                        opacity: canAfford ? 1 : 0.5,
                      }}
                    >
                      {aura.cost} 🪙
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CharacterTab({
  muscleXP, showLevelUp, coins, characterName, setCharacterName,
  statUpgrades = {}, ownedAuras = ['aura_default'], equippedAura = 'aura_default',
  equippedAuraColor = '#22d3ee',
  currentUser, onLogout,
  onBuyStatUpgrade, onBuyAura, onEquipAura,
  ownedClothing = [], equippedClothing = {}, onBuyClothing, onEquipClothing,
}) {
  const stats   = getStats(muscleXP);
  const statXP  = getStatXP(muscleXP);
  const level   = getLevel(muscleXP);
  const warnings = getWeaknessWarnings(muscleXP);

  const xpInLevel = getXPInCurrentLevel(muscleXP);
  const xpNeeded  = xpForLevel(level);
  const xpPct     = Math.min(100, (xpInLevel / xpNeeded) * 100);
  const xpToNext  = xpNeeded - xpInLevel;

  const MILESTONE_LEVELS = [10, 20, 30, 40, 50];
  const nextMilestone = MILESTONE_LEVELS.find(m => m > level);

  const lckUpgrades = statUpgrades.LCK || 0;

  // Find 3 lowest-ranked muscles for focus badges
  const muscleSorted = [...MUSCLE_GROUPS].sort((a, b) => (muscleXP[a] || 0) - (muscleXP[b] || 0));
  const focusSet = new Set(muscleSorted.slice(0, 3));

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero section */}
      <div
        className="flex flex-col items-center pt-8 pb-5 px-4 relative overflow-hidden"
        style={{
          borderBottom: `1px solid ${equippedAuraColor !== 'rainbow' ? equippedAuraColor : '#facc15'}22`,
          minHeight: '320px',
        }}
      >
        <SanctumScene />
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          <span className="neon-text" style={{ color: '#334155', fontSize: '7px', letterSpacing: '1px' }}>@{currentUser}</span>
          <button
            onClick={onLogout}
            className="neon-text px-2 py-1 rounded-sm"
            style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', color: '#f87171', fontSize: '6px', letterSpacing: '1px' }}
          >
            LOGOUT
          </button>
        </div>

        <CharacterSprite level={level} muscleXP={muscleXP} size={92} equippedAura={equippedAuraColor} equippedClothing={equippedClothing} />

        <div className="mt-4 text-center w-full max-w-xs relative z-10">
          <div className="neon-text neon-text-pulse" style={{ color: '#facc15', fontSize: '22px', textShadow: '0 0 20px #facc15' }}>
            LV.{level}
          </div>

          <input
            type="text"
            value={characterName}
            onChange={e => setCharacterName(e.target.value)}
            className="mt-2 text-center bg-transparent outline-none w-full"
            style={{
              borderBottom: `1px solid ${equippedAuraColor !== 'rainbow' ? equippedAuraColor : '#facc15'}44`,
              color: '#e2e8f0',
              fontFamily: 'Courier New',
              fontSize: '16px',
              fontWeight: 'bold',
              letterSpacing: '2px',
            }}
            placeholder="Enter name"
          />

          <div className="mt-2 flex items-center justify-center gap-2">
            <span
              className="neon-text px-3 py-1 rounded-sm"
              style={{ background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.2)', color: '#facc15', fontSize: '9px', textShadow: '0 0 8px #facc15' }}
            >
              🪙 {coins ?? 0} GOLD
            </span>
          </div>

          {/* XP bar */}
          <div className="w-full mt-3">
            <div className="flex justify-between mb-1">
              <span className="neon-text" style={{ color: '#334155', fontSize: '7px' }}>TO LV.{level + 1}</span>
              <span className="neon-text" style={{ color: '#334155', fontSize: '7px' }}>{xpToNext.toFixed(0)} XP</span>
            </div>
            <div className="h-2.5 w-full rounded-sm overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div
                className="h-full rounded-sm"
                style={{
                  width: `${xpPct}%`,
                  background: `linear-gradient(90deg, ${equippedAuraColor !== 'rainbow' ? equippedAuraColor : '#22d3ee'}88, ${equippedAuraColor !== 'rainbow' ? equippedAuraColor : '#22d3ee'})`,
                  boxShadow: `0 0 8px ${equippedAuraColor !== 'rainbow' ? equippedAuraColor : '#22d3ee'}`,
                  transition: 'width 1s ease',
                }}
              />
            </div>
            <div className="neon-text text-right mt-0.5" style={{ color: '#334155', fontSize: '6px' }}>
              {xpInLevel.toFixed(0)} / {xpNeeded} XP
            </div>
          </div>

          {nextMilestone && (
            <div className="neon-text mt-1.5" style={{ color: '#1e2d3d', fontSize: '7px' }}>
              EVOLUTION AT LV.{nextMilestone}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pb-6">
        {/* Weakness warnings */}
        {warnings.length > 0 && (
          <div className="mt-4 rounded-sm p-3" style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)' }}>
            <div className="neon-text mb-1.5" style={{ color: '#f87171', fontSize: '8px', letterSpacing: '1px' }}>⚠️ WEAK MUSCLES</div>
            {warnings.map(m => (
              <div key={m} className="neon-text" style={{ color: '#475569', fontSize: '7px', marginBottom: '2px' }}>
                • <span style={{ color: MUSCLE_COLORS[m] }}>{m}</span> — bosses deal extra damage!
              </div>
            ))}
          </div>
        )}

        {/* Combat stats */}
        <div className="mt-5">
          <div className="neon-text mb-3" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>COMBAT STATS</div>
          <div className="flex flex-col gap-4">
            {Object.keys(STAT_INFO).filter(k => !STAT_INFO[k].goldOnly).map(key => (
              <StatBar key={key} statKey={key} xp={statXP[key] || 0} stat={stats[key] || 0} upgradeCount={statUpgrades[key] || 0} />
            ))}
            <StatBar key="LCK" statKey="LCK" xp={0} stat={lckUpgrades * 2} upgradeCount={lckUpgrades} />
          </div>
        </div>

        {/* Gold shop */}
        <GoldShop
          coins={coins}
          statUpgrades={statUpgrades}
          ownedAuras={ownedAuras}
          equippedAura={equippedAura}
          equippedAuraColor={equippedAuraColor}
          ownedClothing={ownedClothing}
          equippedClothing={equippedClothing}
          onBuyClothing={onBuyClothing}
          onEquipClothing={onEquipClothing}
          onBuyStatUpgrade={onBuyStatUpgrade}
          onBuyAura={onBuyAura}
          onEquipAura={onEquipAura}
        />

        {/* Muscle ranks */}
        <div className="mt-5">
          <div className="neon-text mb-2" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>MUSCLE RANKS</div>
          <div className="rounded-sm px-4 py-3" style={{ background: '#080e1a', border: '1px solid rgba(255,255,255,0.05)' }}>
            {MUSCLE_GROUPS.map(m => (
              <MuscleRankRow key={m} muscle={m} xp={muscleXP[m] || 0} isFocus={focusSet.has(m)} />
            ))}
          </div>
        </div>

        {/* Stat legend */}
        <div className="mt-4 rounded-sm p-3" style={{ background: '#080e1a', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="neon-text mb-2" style={{ color: '#334155', fontSize: '7px', letterSpacing: '3px' }}>HOW STATS WORK</div>
          {Object.entries(STAT_INFO).map(([key, info]) => (
            <div key={key} className="py-1 flex gap-2 items-start">
              <span style={{ fontSize: '12px' }}>{info.icon}</span>
              <span className="neon-text" style={{ color: info.color, fontSize: '7px', minWidth: '28px' }}>{info.label}</span>
              <span className="neon-text" style={{ color: '#334155', fontSize: '7px' }}>{info.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
