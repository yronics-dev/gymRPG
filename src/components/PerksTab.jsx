import React from 'react';
import { DungeonScene } from './PixelScene';

const TEASER_PERKS = [
  { icon: '⚡', name: 'Berserker',    desc: 'Deal more damage the lower your HP' },
  { icon: '🛡️', name: 'Iron Skin',    desc: 'Passively reduce all incoming damage' },
  { icon: '🩸', name: 'Vampiric',     desc: 'Heal a % of damage dealt' },
  { icon: '💨', name: 'Ghost Step',   desc: 'Chance to dodge twice per turn' },
  { icon: '🔥', name: 'Infernal Rage',desc: 'ATK increases with each kill streak' },
  { icon: '❄️', name: 'Frostbite',    desc: 'Attacks slow the enemy\'s speed' },
  { icon: '⚔️', name: 'Counter',      desc: 'Chance to strike back when hit' },
  { icon: '🌟', name: 'Lucky Star',   desc: 'Boosts gold drop chance' },
  { icon: '🏆', name: 'League Master',desc: 'Bonus rewards in league mode' },
];

export default function PerksTab() {
  return (
    <div className="flex-1 relative overflow-hidden">
      <DungeonScene />
      <div className="absolute inset-0 overflow-y-auto z-10 px-4 pb-6">

        {/* Header */}
        <div className="pt-6 mb-6 text-center">
          <div className="neon-text" style={{ color: '#4ade80', fontSize: '11px', letterSpacing: '4px' }}>✨ PERKS</div>
          <p className="neon-text mt-1" style={{ color: '#334155', fontSize: '7px', letterSpacing: '2px' }}>
            PASSIVE UPGRADES FOR YOUR HERO
          </p>
        </div>

        {/* Coming Soon Banner */}
        <div
          className="rounded-sm p-6 mb-6 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(74,222,128,0.08), rgba(74,222,128,0.02))',
            border: '2px solid rgba(74,222,128,0.35)',
            boxShadow: '0 0 30px rgba(74,222,128,0.08)',
          }}
        >
          <div style={{ fontSize: '48px', lineHeight: 1, marginBottom: '12px' }}>🚧</div>
          <div
            className="neon-text"
            style={{ color: '#4ade80', fontSize: '14px', letterSpacing: '4px', textShadow: '0 0 16px #4ade80' }}
          >
            COMING SOON
          </div>
          <div className="neon-text mt-2" style={{ color: '#475569', fontSize: '7px', letterSpacing: '2px' }}>
            PERKS ARE IN DEVELOPMENT
          </div>
        </div>

        {/* Teaser grid */}
        <div className="neon-text mb-3" style={{ color: '#334155', fontSize: '7px', letterSpacing: '3px' }}>
          SNEAK PEEK
        </div>
        <div className="flex flex-col gap-2">
          {TEASER_PERKS.map((perk, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-sm p-3 relative overflow-hidden"
              style={{
                background: 'rgba(6,10,20,0.7)',
                border: '1px solid rgba(74,222,128,0.08)',
                opacity: 0.5,
                filter: 'blur(0.4px)',
              }}
            >
              {/* Lock overlay */}
              <div
                className="absolute inset-0 flex items-center justify-end pr-3"
                style={{ pointerEvents: 'none' }}
              >
                <span style={{ fontSize: '12px', opacity: 0.4 }}>🔒</span>
              </div>

              <span style={{ fontSize: '22px', flexShrink: 0 }}>{perk.icon}</span>
              <div>
                <div className="neon-text" style={{ color: '#4ade80', fontSize: '8px', letterSpacing: '1px' }}>
                  {perk.name}
                </div>
                <div className="neon-text mt-0.5" style={{ color: '#334155', fontSize: '7px' }}>
                  {perk.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-6 rounded-sm p-3 text-center"
          style={{ background: 'rgba(74,222,128,0.04)', border: '1px dashed rgba(74,222,128,0.15)' }}
        >
          <div className="neon-text" style={{ color: '#334155', fontSize: '7px', letterSpacing: '2px' }}>
            KEEP GRINDING — PERKS ARE COMING 💪
          </div>
        </div>

      </div>
    </div>
  );
}
