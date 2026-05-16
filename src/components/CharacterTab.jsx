import React, { useState } from 'react';
import {
  STAT_INFO, MUSCLE_COLORS, MUSCLE_GROUPS, MUSCLE_TO_STAT, GOLD_SHOP,
} from '../constants';
import GameIcon from './GameIcon';
import { SLOT_ICON_MAP } from './GameIcon';
import ItemIcon from './ItemIcon';
import { SanctumScene } from './PixelScene';
import {
  getStats, getStatXP, getTotalXP, getLevel, getWeaknessWarnings,
  getMuscleRank, getMuscleRankProgress, xpForLevel, getXPInCurrentLevel,
  getPlayerBattleStats,
} from '../utils/gameLogic';
import { getClassBonuses } from '../utils/classSystem';
import CharacterSprite from './CharacterSprite';
import CharacterRenderer from './CharacterRenderer';
import SettingsModal from './SettingsModal';

function t(key, lang) {
  const TR = {
    en: {
      hero: 'HERO', level: 'LV', gold: 'GOLD', evolution: 'EVOLUTION AT',
      equipment: 'EQUIPMENT', locked: 'LOCKED', comingSoon: 'COMING SOON',
      combatStats: 'COMBAT STATS', muscleRanks: 'MUSCLE RANKS',
      weakMuscles: 'WEAK MUSCLES', shop: 'GOLD SHOP',
      weapon: 'WEAPON', helmet: 'HELMET', chest: 'CHEST ARMOR',
      boots: 'BOOTS', ring: 'RING', special: 'SPECIAL',
    },
    nl: {
      hero: 'HELD', level: 'NV', gold: 'GOUD', evolution: 'EVOLUTIE BIJ',
      equipment: 'UITRUSTING', locked: 'VERGRENDELD', comingSoon: 'BINNENKORT',
      combatStats: 'GEVECHT', muscleRanks: 'SPIERRANKEN',
      weakMuscles: 'ZWAKKE SPIEREN', shop: 'GOUDWINKEL',
      weapon: 'WAPEN', helmet: 'HELM', chest: 'PANTSER',
      boots: 'LAARZEN', ring: 'RING', special: 'SPECIAAL',
    },
  };
  return (TR[lang] || TR.en)[key] || key;
}

const EQUIP_SLOTS = [
  { key: 'helmet',  icon: 'helmet',     color: '#f87171' },
  { key: 'chest',   icon: 'chest-armor',color: '#60a5fa' },
  { key: 'boots',   icon: 'boots',      color: '#f87171' },
  { key: 'weapon',  icon: 'sword',      color: '#a78bfa' },
  { key: 'ring',    icon: 'ring',       color: '#facc15' },
  { key: 'special', icon: 'orb',        color: '#4ade80' },
];

function EquipSlot({ slot, aura, language, item, onUnequip }) {
  const [showTip, setShowTip] = useState(false);
  // Empty = dark grey; filled = rarity colour
  const borderColor = item ? item.rarityColor : 'rgba(71,85,105,0.45)';
  const bgColor     = item ? item.rarityGlow  : 'rgba(71,85,105,0.06)';
  const accentColor = item ? item.rarityColor : '#334155';
  const labelColor  = item ? item.rarityColor : '#475569';

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        width: 52, height: 52,
        background: `linear-gradient(135deg, ${bgColor}, rgba(4,8,18,0.92))`,
        border: `2px solid ${borderColor}`,
        borderRadius: 6,
        boxShadow: item
          ? `0 0 12px ${bgColor}, inset 0 0 8px rgba(0,0,0,0.3)`
          : 'inset 0 0 8px rgba(0,0,0,0.5)',
        position: 'relative',
        cursor: item ? 'pointer' : 'default',
      }}
      onClick={() => { if (item) setShowTip(p => !p); }}
    >
      {/* Corner accent */}
      <div style={{ position:'absolute', top:-1, left:-1, width:6, height:6, background: accentColor, borderRadius:1, opacity: item ? 0.9 : 0.5 }} />
      <div style={{ position:'absolute', bottom:-1, right:-1, width:6, height:6, background: accentColor, borderRadius:1, opacity: item ? 0.9 : 0.5 }} />

      <span style={{ opacity: item ? 1 : 0.35, filter: `drop-shadow(0 0 ${item ? 6 : 2}px rgba(0,0,0,0.8))` }}>
        {item
          ? <ItemIcon name={item.name} size={22} color={item.rarityColor}/>
          : <GameIcon name={slot.icon} size={18} color={slot.color}/>
        }
      </span>
      <div className="neon-text" style={{ color: labelColor, fontSize: '5px', letterSpacing: '0.5px', marginTop: 2, opacity: item ? 1 : 0.5 }}>
        {item ? item.rarity.slice(0,3).toUpperCase() : t(slot.key, language).slice(0, 6).toUpperCase()}
      </div>
      {!item && (
        <div style={{ position:'absolute', top:2, right:2, opacity:0.25 }}>
          <GameIcon name="lock" size={7} color="#475569" />
        </div>
      )}

      {/* Tooltip on tap */}
      {item && showTip && (
        <div
          className="absolute z-50 rounded-sm p-2 flex flex-col gap-1"
          style={{
            background: '#060d1a',
            border: `1px solid ${item.rarityColor}88`,
            boxShadow: `0 0 16px ${item.rarityGlow}`,
            width: 130,
            left: slot.key === 'weapon' || slot.key === 'ring' || slot.key === 'special' ? 'auto' : '100%',
            right: slot.key === 'weapon' || slot.key === 'ring' || slot.key === 'special' ? '100%' : 'auto',
            top: '50%',
            transform: 'translateY(-50%)',
            marginLeft: 6, marginRight: 6,
          }}
          onClick={e => e.stopPropagation()}
        >
          <div className="neon-text" style={{ color: item.rarityColor, fontSize: '7px', letterSpacing: '1px' }}>{item.name}</div>
          {item.atk   > 0 && <div className="neon-text flex items-center gap-1" style={{ color: '#f87171', fontSize: '6px' }}><GameIcon name="sword"     size={8} color="#f87171" /> +{item.atk} ATK</div>}
          {item.def   > 0 && <div className="neon-text flex items-center gap-1" style={{ color: '#60a5fa', fontSize: '6px' }}><GameIcon name="shield"    size={8} color="#60a5fa" /> +{item.def} DEF</div>}
          {item.hp    > 0 && <div className="neon-text flex items-center gap-1" style={{ color: '#4ade80', fontSize: '6px' }}><GameIcon name="heart"     size={8} color="#4ade80" /> +{item.hp} HP</div>}
          {item.crit  > 0 && <div className="neon-text flex items-center gap-1" style={{ color: '#facc15', fontSize: '6px' }}><GameIcon name="lightning" size={8} color="#facc15" /> +{item.crit}% CRIT</div>}
          {item.dodge > 0 && <div className="neon-text flex items-center gap-1" style={{ color: '#a78bfa', fontSize: '6px' }}><GameIcon name="wing"      size={8} color="#a78bfa" /> +{item.dodge}% DODGE</div>}
          <button
            className="neon-text mt-1 py-0.5 rounded-sm text-center"
            style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', fontSize: '6px' }}
            onClick={() => { onUnequip(slot.key); setShowTip(false); }}
          >
            UNEQUIP
          </button>
        </div>
      )}
    </div>
  );
}

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
          <GameIcon name={info.icon} size={14} color={info.color} />
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
            <div className="neon-text mt-1 flex items-center gap-1" style={{ color: '#facc15', fontSize: '7px' }}>
              <GameIcon name="coin" size={8} color="#facc15" /> Upgrade with Gold
            </div>
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
  const SLOT_LABELS = { hat: 'Hats', pants: 'Pants', shoes: 'Shoes', accessory: 'Accessories' };
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
                <GameIcon name={item.icon || 'star'} size={18} color={item.color || '#475569'} />
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
                  {item.cost} <GameIcon name="coin" size={10} color={canAfford ? '#facc15' : '#334155'} />
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
        <div className="neon-text flex items-center gap-1.5" style={{ color: '#facc15', fontSize: '9px', letterSpacing: '2px' }}>
          <GameIcon name="coin" size={12} color="#facc15" /> GOLD SHOP
        </div>
        <div className="neon-text flex items-center gap-1" style={{ color: '#facc15', fontSize: '11px', textShadow: '0 0 10px #facc15' }}>
          {coins} <GameIcon name="coin" size={12} color="#facc15" />
        </div>
      </div>

      <div className="flex border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        {[
          { id: 'stats',    label: 'Stats'    },
          { id: 'wardrobe', label: 'Wardrobe' },
          { id: 'auras',    label: 'Auras'    },
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
                  <GameIcon name={item.icon || 'star'} size={18} color={item.color} />
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
                  {maxed ? 'MAX' : <span className="flex items-center gap-1">{item.cost} <GameIcon name="coin" size={10} color={maxed || !canAfford ? '#334155' : '#facc15'} /></span>}
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
                      <span className="flex items-center gap-1">{aura.cost} <GameIcon name="coin" size={10} color={canAfford ? '#facc15' : '#334155'} /></span>
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

// ─── Inventory Modal ─────────────────────────────────────────────────────────
function InventoryModal({ inventory, equippedItems, onEquip, onUnequip, onClose }) {
  const [selected, setSelected] = React.useState(null);
  const selectedItem = inventory.find(it => it.id === selected);

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'rgba(2,5,12,0.97)', backdropFilter: 'blur(8px)' }}>
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 3px)',
      }}/>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-10 pb-3"
        style={{ borderBottom: '1px solid rgba(192,132,252,0.15)' }}>
        <div>
          <div className="neon-text flex items-center gap-2" style={{ color: '#c084fc', fontSize: '12px', letterSpacing: '3px' }}>
            <GameIcon name="chest" size={14} color="#c084fc"/>
            INVENTORY
          </div>
          <div className="neon-text" style={{ color: '#334155', fontSize: '7px' }}>{inventory.length} ITEMS</div>
        </div>
        <button onClick={onClose} className="pixel-btn px-3 py-1.5 rounded-sm"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#475569', fontSize: '8px' }}>
          ✕ CLOSE
        </button>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-3">
        {inventory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <GameIcon name="chest" size={48} color="#1e2d3d"/>
            <div className="neon-text" style={{ color: '#334155', fontSize: '8px', letterSpacing: '2px' }}>NO ITEMS YET</div>
            <div className="neon-text" style={{ color: '#1e2d3d', fontSize: '6px' }}>Complete dungeon runs to earn loot</div>
          </div>
        ) : (
          <>
            {/* Item detail panel */}
            {selectedItem && (
              <div className="mb-4 rounded-sm p-3 animate-slide-up"
                style={{
                  background: `linear-gradient(135deg, ${selectedItem.rarityGlow}cc, rgba(6,10,20,0.95))`,
                  border: `2px solid ${selectedItem.rarityColor}`,
                  boxShadow: `0 0 24px ${selectedItem.rarityGlow}`,
                }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center rounded-sm"
                    style={{
                      width: 52, height: 52,
                      background: `radial-gradient(circle, ${selectedItem.rarityGlow}88, rgba(0,0,0,0.7))`,
                      border: `2px solid ${selectedItem.rarityColor}55`,
                      boxShadow: `0 0 16px ${selectedItem.rarityGlow}`,
                    }}>
                    <ItemIcon name={selectedItem.name} size={28} color={selectedItem.rarityColor}/>
                  </div>
                  <div className="flex-1">
                    <div className="neon-text px-1.5 py-0.5 rounded-sm inline-block mb-1"
                      style={{ background: `${selectedItem.rarityColor}22`, border: `1px solid ${selectedItem.rarityColor}44`, color: selectedItem.rarityColor, fontSize: '6px' }}>
                      {selectedItem.rarity.toUpperCase()} · {selectedItem.slot.toUpperCase()}
                    </div>
                    <div className="neon-text" style={{ color: '#f1f5f9', fontSize: '11px' }}>{selectedItem.name}</div>
                  </div>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-3 gap-1.5 mb-3">
                  {selectedItem.atk  > 0 && <div className="text-center rounded-sm py-1.5" style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)' }}>
                    <div className="neon-text" style={{ color: '#f87171', fontSize: '9px' }}>+{selectedItem.atk}</div>
                    <div className="neon-text" style={{ color: '#475569', fontSize: '6px' }}>ATK</div>
                  </div>}
                  {selectedItem.def  > 0 && <div className="text-center rounded-sm py-1.5" style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.2)' }}>
                    <div className="neon-text" style={{ color: '#60a5fa', fontSize: '9px' }}>+{selectedItem.def}</div>
                    <div className="neon-text" style={{ color: '#475569', fontSize: '6px' }}>DEF</div>
                  </div>}
                  {selectedItem.hp   > 0 && <div className="text-center rounded-sm py-1.5" style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
                    <div className="neon-text" style={{ color: '#4ade80', fontSize: '9px' }}>+{selectedItem.hp}</div>
                    <div className="neon-text" style={{ color: '#475569', fontSize: '6px' }}>HP</div>
                  </div>}
                  {selectedItem.crit > 0 && <div className="text-center rounded-sm py-1.5" style={{ background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.2)' }}>
                    <div className="neon-text" style={{ color: '#facc15', fontSize: '9px' }}>+{selectedItem.crit}%</div>
                    <div className="neon-text" style={{ color: '#475569', fontSize: '6px' }}>CRIT</div>
                  </div>}
                  {selectedItem.dodge > 0 && <div className="text-center rounded-sm py-1.5" style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)' }}>
                    <div className="neon-text" style={{ color: '#a78bfa', fontSize: '9px' }}>+{selectedItem.dodge}%</div>
                    <div className="neon-text" style={{ color: '#475569', fontSize: '6px' }}>DODGE</div>
                  </div>}
                </div>
                {/* Action buttons */}
                {equippedItems[selectedItem.slot]?.id === selectedItem.id ? (
                  <button onClick={() => { onUnequip && onUnequip(selectedItem.slot); setSelected(null); }}
                    className="w-full py-2.5 rounded-sm pixel-btn neon-text"
                    style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.4)', color: '#f87171', fontSize: '8px' }}>
                    UNEQUIP
                  </button>
                ) : (
                  <button onClick={() => { onEquip && onEquip(selectedItem); setSelected(null); }}
                    className="w-full py-2.5 rounded-sm pixel-btn neon-text"
                    style={{
                      background: `linear-gradient(135deg, ${selectedItem.rarityGlow}, rgba(0,0,0,0.4))`,
                      border: `2px solid ${selectedItem.rarityColor}`,
                      color: selectedItem.rarityColor, fontSize: '8px',
                      boxShadow: `0 0 12px ${selectedItem.rarityGlow}`,
                    }}>
                    ✓ EQUIP
                  </button>
                )}
              </div>
            )}

            {/* Grid of items */}
            <div className="grid grid-cols-2 gap-2">
              {inventory.map(item => {
                const isEquipped = equippedItems[item.slot]?.id === item.id;
                const isSelected = selected === item.id;
                return (
                  <button key={item.id} onClick={() => setSelected(isSelected ? null : item.id)}
                    className="rounded-sm p-2.5 flex items-center gap-2.5 text-left"
                    style={{
                      background: isSelected
                        ? `linear-gradient(135deg, ${item.rarityGlow}, rgba(6,10,20,0.8))`
                        : isEquipped ? `${item.rarityGlow}44` : 'rgba(6,10,20,0.7)',
                      border: `${isSelected ? '2px' : '1px'} solid ${isSelected || isEquipped ? item.rarityColor : 'rgba(255,255,255,0.08)'}`,
                      boxShadow: isSelected ? `0 0 16px ${item.rarityGlow}` : 'none',
                      transition: 'all 0.2s ease',
                    }}>
                    <div className="flex-shrink-0 flex items-center justify-center rounded-sm"
                      style={{ width: 36, height: 36,
                        background: `${item.rarityGlow}44`,
                        border: `1px solid ${item.rarityColor}44`,
                      }}>
                      <ItemIcon name={item.name} size={20} color={item.rarityColor}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="neon-text truncate" style={{ color: item.rarityColor, fontSize: '7px' }}>{item.name}</div>
                      <div className="neon-text" style={{ color: '#334155', fontSize: '6px' }}>{item.slot.toUpperCase()}</div>
                      {isEquipped && (
                        <div className="neon-text" style={{ color: item.rarityColor, fontSize: '6px' }}>✓ ON</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
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
  timerTotal = 60, onChangeTimerDuration,
  language = 'en', onChangeLanguage,
  inventory = [], equippedItems = {}, onEquipItem, onUnequipItem,
  // New props
  playerClass = null, playerTitle = null,
  prestige = { count: 0, multiplier: 1 },
  streak = { count: 0 },
  purchasedSkills = [],
  onPrestige,
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showPrestigeConfirm, setShowPrestigeConfirm] = useState(false);

  const stats    = getStats(muscleXP);
  const statXP   = getStatXP(muscleXP);
  const level    = getLevel(muscleXP);
  const warnings = getWeaknessWarnings(muscleXP);
  const classBonuses = getClassBonuses(playerClass);
  const pStats   = getPlayerBattleStats(muscleXP, statUpgrades, equippedItems, purchasedSkills, classBonuses);

  const xpInLevel = getXPInCurrentLevel(muscleXP);
  const xpNeeded  = xpForLevel(level);
  const xpPct     = Math.min(100, (xpInLevel / xpNeeded) * 100);
  const xpToNext  = xpNeeded - xpInLevel;

  const MILESTONE_LEVELS = [25, 50, 100, 150, 200];
  const nextMilestone = MILESTONE_LEVELS.find(m => m > level);
  const lckUpgrades = statUpgrades.LCK || 0;

  const muscleSorted = [...MUSCLE_GROUPS].sort((a, b) => (muscleXP[a] || 0) - (muscleXP[b] || 0));
  const focusSet = new Set(muscleSorted.slice(0, 3));

  const aura = equippedAuraColor !== 'rainbow' ? equippedAuraColor : '#facc15';

  const QUICK_STATS = [
    { label: 'HP',    val: pStats.maxHP,                     color: '#4ade80', icon: 'heart'   },
    { label: 'ATK',   val: pStats.atk,                       color: '#f87171', icon: 'sword'   },
    { label: 'DEF',   val: `${pStats.defPct.toFixed(0)}%`,   color: '#60a5fa', icon: 'shield'  },
    { label: 'DODGE', val: `${pStats.dodgePct.toFixed(0)}%`, color: '#facc15', icon: 'wing'    },
  ];

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: 'var(--bg-primary)' }}>

      {/* ── Top bar ─────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 sticky top-0 z-20"
        style={{ background: '#060d1aee', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${aura}18` }}
      >
        <div className="neon-text" style={{ color: aura, fontSize: '11px', letterSpacing: '3px', textShadow: `0 0 8px ${aura}` }}>
          {t('hero', language)}
        </div>
        <div className="flex items-center gap-2">
          <span
            className="neon-text px-2 py-1 rounded-sm flex items-center gap-1"
            style={{ background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.2)', color: '#facc15', fontSize: '8px' }}
          >
            <GameIcon name="coin" size={10} color="#facc15" /> {coins ?? 0}
          </span>
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center justify-center rounded-sm"
            style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <GameIcon name="gear" size={14} color="#475569" />
          </button>
        </div>
      </div>

        {/* ── Hero stage — full-width, scene + character + floating slots ── */}
        <div className="relative overflow-hidden mb-0" style={{ height: '62vw', minHeight: 240, maxHeight: 320 }}>
          <SanctumScene />

          {/* Gradient overlay bottom */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,13,26,0.1) 0%, transparent 40%, rgba(6,13,26,0.85) 100%)', zIndex: 1 }} />

          {/* LEFT equipment column */}
          <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 5, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {EQUIP_SLOTS.slice(0, 3).map(slot => (
              <EquipSlot
                key={slot.key}
                slot={slot}
                aura={aura}
                language={language}
                item={equippedItems[slot.key] || null}
                onUnequip={onUnequipItem || (() => {})}
              />
            ))}
          </div>

          {/* RIGHT equipment column */}
          <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 5, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {EQUIP_SLOTS.slice(3).map(slot => (
              <EquipSlot
                key={slot.key}
                slot={slot}
                aura={aura}
                language={language}
                item={equippedItems[slot.key] || null}
                onUnequip={onUnequipItem || (() => {})}
              />
            ))}
          </div>

          {/* Character portrait frame — centered */}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 4,
            width: 148, height: 168,
            border: `3px solid ${aura}`,
            borderRadius: 6,
            boxShadow: `0 0 0 1px rgba(0,0,0,0.8), 0 0 24px ${aura}55, inset 0 0 20px rgba(0,0,0,0.4)`,
            background: 'rgba(4,8,18,0.25)',
            overflow: 'visible',
          }}>
            {/* Corner gems */}
            {[{top:-4,left:-4},{top:-4,right:-4},{bottom:-4,left:-4},{bottom:-4,right:-4}].map((p,i)=>(
              <div key={i} style={{ position:'absolute', ...p, width:8, height:8, background: aura, borderRadius:1, boxShadow:`0 0 6px ${aura}` }} />
            ))}
            <div className="flex items-end justify-center w-full h-full" style={{ overflow: 'visible', paddingBottom: 4 }}>
              <CharacterRenderer level={level} equippedItems={equippedItems} size={148} />
            </div>
          </div>

          {/* Level badge — top-left overlay */}
          <div style={{ position: 'absolute', top: 10, left: 74, zIndex: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div className="neon-text px-2 py-0.5 rounded-sm" style={{ background: 'rgba(4,8,18,0.9)', border: `1px solid ${aura}88`, color: aura, fontSize: '8px', textShadow: `0 0 6px ${aura}` }}>
              {t('level', language)}.{level}
            </div>
            {playerClass && playerClass.id !== 'NOVICE' && (
              <div
                className="neon-text px-2 py-0.5 rounded-sm flex items-center gap-1"
                style={{ background: 'rgba(4,8,18,0.9)', border: `1px solid ${playerClass.color}88`, color: playerClass.color, fontSize: '7px', letterSpacing: '1px' }}
              >
                <GameIcon name={playerClass.icon} size={10} color={playerClass.color} /> {playerClass.name.toUpperCase()}
              </div>
            )}
            {playerTitle && (
              <div
                className="neon-text px-2 py-0.5 rounded-sm"
                style={{ background: 'rgba(4,8,18,0.9)', border: `1px solid ${playerTitle.color}55`, color: playerTitle.color, fontSize: '6px', letterSpacing: '1px' }}
              >
                {playerTitle.title.toUpperCase()}
              </div>
            )}
            {prestige?.count > 0 && (
              <div
                className="neon-text px-2 py-0.5 rounded-sm"
                style={{ background: 'rgba(250,204,21,0.15)', border: '1px solid rgba(250,204,21,0.5)', color: '#facc15', fontSize: '6px', letterSpacing: '1px' }}
              >
                ★ PRESTIGE {prestige.count}
              </div>
            )}
          </div>

          {/* Name + XP — bottom overlay */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 6, padding: '0 16px 10px' }}>
            <input
              type="text"
              value={characterName}
              onChange={e => setCharacterName(e.target.value)}
              className="w-full text-center bg-transparent outline-none"
              style={{ color: '#f1f5f9', fontFamily: 'Courier New', fontSize: '15px', fontWeight: 'bold', letterSpacing: '2px', borderBottom: `1px solid ${aura}44` }}
              placeholder="HERO NAME"
            />
            <div className="mt-1.5">
              <div className="h-2 w-full rounded-sm overflow-hidden" style={{ background: 'rgba(0,0,0,0.5)', border: `1px solid ${aura}33` }}>
                <div style={{ width: `${xpPct}%`, height: '100%', background: `linear-gradient(90deg, ${aura}88, ${aura})`, boxShadow: `0 0 6px ${aura}`, transition: 'width 1s ease' }} />
              </div>
              <div className="flex justify-between mt-0.5">
                <span className="neon-text" style={{ color: '#334155', fontSize: '6px' }}>{xpInLevel.toFixed(0)} XP</span>
                <span className="neon-text" style={{ color: '#334155', fontSize: '6px' }}>LV.{level+1} — {xpToNext.toFixed(0)} left{nextMilestone ? ` →${nextMilestone}` : ''}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick stats bar ──────────────────────── */}
        <div className="grid grid-cols-4 gap-0" style={{ borderTop: `1px solid ${aura}22`, background: 'rgba(4,8,18,0.95)' }}>
          {QUICK_STATS.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center py-3"
              style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
            >
              <GameIcon name={s.icon} size={13} color={s.color} />
              <div className="neon-text mt-1" style={{ color: s.color, fontSize: '11px', textShadow: `0 0 6px ${s.color}` }}>{s.val}</div>
              <div className="neon-text" style={{ color: '#334155', fontSize: '6px', letterSpacing: '1px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Streak + class row ──────────────────── */}
        <div
          className="grid grid-cols-2 gap-0 mb-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(4,8,18,0.9)' }}
        >
          {/* Streak */}
          <div
            className="flex items-center gap-2 px-3 py-2"
            style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}
          >
            <GameIcon name="flame" size={16} color="#fb923c" />
            <div>
              <div className="neon-text" style={{ color: streak.count > 0 ? '#fb923c' : '#334155', fontSize: '9px' }}>
                {streak.count > 0 ? `${streak.count}-DAY` : 'NO STREAK'}
              </div>
              <div className="neon-text" style={{ color: '#334155', fontSize: '6px', letterSpacing: '1px' }}>
                {streak.count > 1
                  ? `+${Math.round((Math.min(streak.count - 1, 6)) * 10)}% XP`
                  : 'DAILY STREAK'}
              </div>
            </div>
          </div>
          {/* Class */}
          <div className="flex items-center gap-2 px-3 py-2">
            <GameIcon name={playerClass?.icon || 'dumbbell'} size={16} color={playerClass?.color || '#475569'} />
            <div>
              <div className="neon-text" style={{ color: playerClass?.color || '#475569', fontSize: '9px' }}>
                {playerClass?.name?.toUpperCase() || 'NOVICE'}
              </div>
              <div className="neon-text" style={{ color: '#334155', fontSize: '6px', letterSpacing: '1px' }}>
                {playerClass?.bonus?.label || 'KEEP GRINDING'}
              </div>
            </div>
          </div>
        </div>

        {/* ── Inventory button (opens modal) ─────────────── */}
        <div className="px-4 mb-4">
          <button
            onClick={() => setShowInventory(true)}
            className="w-full flex items-center justify-between py-3 px-3 rounded-sm pixel-btn"
            style={{
              background: 'linear-gradient(135deg, rgba(192,132,252,0.12), rgba(192,132,252,0.04))',
              border: '1px solid rgba(192,132,252,0.35)',
            }}
          >
            <div className="neon-text flex items-center gap-2" style={{ color: '#c084fc', fontSize: '8px', letterSpacing: '2px' }}>
              <GameIcon name="chest" size={14} color="#c084fc" />
              INVENTORY
              {inventory.length > 0 && (
                <span className="neon-text px-1.5 py-0.5 rounded-sm"
                  style={{ background: 'rgba(192,132,252,0.2)', border: '1px solid rgba(192,132,252,0.4)', fontSize: '7px', color: '#c084fc' }}>
                  {inventory.length}
                </span>
              )}
            </div>
            <div className="neon-text" style={{ color: '#c084fc', fontSize: '10px' }}>→</div>
          </button>

          {/* Inventory popup modal */}
          {showInventory && (
            <InventoryModal
              inventory={inventory}
              equippedItems={equippedItems}
              onEquip={onEquipItem}
              onUnequip={onUnequipItem}
              onClose={() => setShowInventory(false)}
            />
          )}
        </div>

        <div className="px-4">

        {/* ── Weakness warnings ───────────────────── */}
        {warnings.length > 0 && (
          <div className="mb-4 rounded-sm p-3" style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)' }}>
            <div className="neon-text mb-1.5 flex items-center gap-1" style={{ color: '#f87171', fontSize: '8px', letterSpacing: '1px' }}>
              <GameIcon name="impact" size={10} color="#f87171" /> {t('weakMuscles', language)}
            </div>
            {warnings.map(m => (
              <div key={m} className="neon-text" style={{ color: '#475569', fontSize: '7px', marginBottom: '2px' }}>
                • <span style={{ color: MUSCLE_COLORS[m] }}>{m}</span> — {language === 'nl' ? 'bazen doen extra schade!' : 'bosses deal extra damage!'}
              </div>
            ))}
          </div>
        )}

        {/* ── Combat stats ────────────────────────── */}
        <div className="mt-1">
          <div className="neon-text mb-3" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>{t('combatStats', language)}</div>
          <div className="flex flex-col gap-4">
            {Object.keys(STAT_INFO).filter(k => !STAT_INFO[k].goldOnly).map(key => (
              <StatBar key={key} statKey={key} xp={statXP[key] || 0} stat={stats[key] || 0} upgradeCount={statUpgrades[key] || 0} />
            ))}
            <StatBar key="LCK" statKey="LCK" xp={0} stat={lckUpgrades * 2} upgradeCount={lckUpgrades} />
          </div>
        </div>

        {/* ── Gold shop ───────────────────────────── */}
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

        {/* ── Muscle ranks ────────────────────────── */}
        <div className="mt-5">
          <div className="neon-text mb-2" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>{t('muscleRanks', language)}</div>
          <div className="rounded-sm px-4 py-3" style={{ background: '#080e1a', border: '1px solid rgba(255,255,255,0.05)' }}>
            {MUSCLE_GROUPS.map(m => (
              <MuscleRankRow key={m} muscle={m} xp={muscleXP[m] || 0} isFocus={focusSet.has(m)} />
            ))}
          </div>
        </div>

        {/* ── Prestige section ─────────────────────── */}
        <div className="mt-5 mb-2">
          <div className="neon-text mb-2 flex items-center gap-1.5" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>
            <GameIcon name="star" size={10} color="#475569" /> PRESTIGE
          </div>
          <div
            className="rounded-sm p-4"
            style={{
              background: prestige.count > 0
                ? 'linear-gradient(135deg, rgba(250,204,21,0.1), rgba(6,10,20,0.9))'
                : 'rgba(6,10,20,0.75)',
              border: `1px solid ${prestige.count > 0 ? 'rgba(250,204,21,0.35)' : 'rgba(255,255,255,0.06)'}`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="neon-text flex items-center gap-1" style={{ color: prestige.count > 0 ? '#facc15' : '#475569', fontSize: '9px', letterSpacing: '1px' }}>
                  {prestige.count > 0 && <GameIcon name="star" size={10} color="#facc15" />}
                  {prestige.count > 0 ? `PRESTIGE ${prestige.count}` : 'NOT YET PRESTIGED'}
                </div>
                <div className="neon-text mt-0.5" style={{ color: '#334155', fontSize: '7px' }}>
                  {prestige.count > 0
                    ? `×${prestige.multiplier.toFixed(2)} permanent XP multiplier`
                    : 'Reach level 200 to prestige'}
                </div>
              </div>
              {prestige.count > 0 && (
                <div style={{ filter: 'drop-shadow(0 0 8px #facc15)' }}>
                  <GameIcon name="star" size={24} color="#facc15" />
                </div>
              )}
            </div>

            {level >= 200 && !showPrestigeConfirm && (
              <button
                onClick={() => setShowPrestigeConfirm(true)}
                className="w-full py-2 rounded-sm pixel-btn neon-text"
                style={{
                  background: 'linear-gradient(135deg, rgba(250,204,21,0.2), rgba(250,204,21,0.05))',
                  border: '2px solid rgba(250,204,21,0.6)',
                  color: '#facc15',
                  fontSize: '8px',
                  letterSpacing: '2px',
                  boxShadow: '0 0 16px rgba(250,204,21,0.2)',
                }}
              >
                PRESTIGE NOW (+25% XP FOREVER)
              </button>
            )}

            {showPrestigeConfirm && (
              <div
                className="rounded-sm p-3"
                style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.3)' }}
              >
                <div className="neon-text mb-2 text-center" style={{ color: '#f87171', fontSize: '7px', letterSpacing: '1px' }}>
                  RESET ALL STATS & START OVER?
                </div>
                <div className="neon-text mb-3 text-center" style={{ color: '#334155', fontSize: '6px' }}>
                  Your level, XP, and skills reset. You keep your gold and loot. Gain +25% XP permanently.
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { onPrestige && onPrestige(); setShowPrestigeConfirm(false); }}
                    className="flex-1 py-2 rounded-sm pixel-btn neon-text"
                    style={{ background: 'rgba(250,204,21,0.15)', border: '1px solid rgba(250,204,21,0.4)', color: '#facc15', fontSize: '7px' }}
                  >
                    ✓ CONFIRM
                  </button>
                  <button
                    onClick={() => setShowPrestigeConfirm(false)}
                    className="flex-1 py-2 rounded-sm pixel-btn neon-text"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#475569', fontSize: '7px' }}
                  >
                    ✕ CANCEL
                  </button>
                </div>
              </div>
            )}

            {level < 200 && (
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span className="neon-text" style={{ color: '#334155', fontSize: '6px' }}>PRESTIGE PROGRESS</span>
                  <span className="neon-text" style={{ color: '#334155', fontSize: '6px' }}>LV {level} / 200</span>
                </div>
                <div className="h-1.5 rounded-sm overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div
                    className="h-full rounded-sm"
                    style={{
                      width: `${Math.min(100, (level / 200) * 100)}%`,
                      background: 'linear-gradient(90deg, #facc15, #fb923c)',
                      boxShadow: '0 0 4px #facc15',
                      transition: 'width 0.8s ease',
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* spacer */}
        <div style={{ height: 8 }} />

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

      {/* ── Settings modal ──────────────────────── */}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          timerTotal={timerTotal}
          onChangeTimerDuration={onChangeTimerDuration}
          language={language}
          onChangeLanguage={onChangeLanguage}
          currentUser={currentUser}
          onLogout={onLogout}
        />
      )}
    </div>
  );
}
