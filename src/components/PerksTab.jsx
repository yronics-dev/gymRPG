import React from 'react';
import { DungeonScene } from './PixelScene';
import { SKILLS } from '../constants';
import GameIcon from './GameIcon';

export default function PerksTab({ coins = 0, purchasedSkills = [], onBuySkill }) {
  const totalSpent = purchasedSkills.reduce((s, id) => {
    const skill = SKILLS.find(sk => sk.id === id);
    return s + (skill?.cost || 0);
  }, 0);

  return (
    <div className="flex-1 relative overflow-hidden">
      <DungeonScene />
      <div className="absolute inset-0 overflow-y-auto z-10 px-4 pb-6">

        {/* Header */}
        <div className="pt-6 mb-5 text-center">
          <div className="neon-text flex items-center gap-2 justify-center" style={{ color: '#4ade80', fontSize: '11px', letterSpacing: '4px' }}>
            <GameIcon name="star" size={14} color="#4ade80" /> SKILL TREE
          </div>
          <p className="neon-text mt-1" style={{ color: '#334155', fontSize: '7px', letterSpacing: '2px' }}>
            PASSIVE UPGRADES — SPEND GOLD TO UNLOCK
          </p>
        </div>

        {/* Gold + stats bar */}
        <div
          className="rounded-sm p-3 mb-5 flex items-center justify-between"
          style={{ background: 'rgba(6,10,20,0.85)', border: '1px solid rgba(250,204,21,0.2)' }}
        >
          <div>
            <div className="neon-text" style={{ color: '#475569', fontSize: '6px', letterSpacing: '2px' }}>YOUR GOLD</div>
            <div className="neon-text mt-0.5 flex items-center gap-1.5" style={{ color: '#facc15', fontSize: '13px', textShadow: '0 0 8px #facc15' }}>
              <GameIcon name="coin" size={14} color="#facc15" /> {coins}
            </div>
          </div>
          <div className="text-right">
            <div className="neon-text" style={{ color: '#475569', fontSize: '6px', letterSpacing: '2px' }}>UNLOCKED</div>
            <div className="neon-text mt-0.5" style={{ color: '#4ade80', fontSize: '11px' }}>
              {purchasedSkills.length} / {SKILLS.length}
            </div>
          </div>
        </div>

        {/* Skills grid */}
        <div className="flex flex-col gap-3">
          {SKILLS.map(skill => {
            const owned    = purchasedSkills.includes(skill.id);
            const canAfford = coins >= skill.cost;

            return (
              <div
                key={skill.id}
                className="rounded-sm p-3 relative overflow-hidden"
                style={{
                  background: owned
                    ? `linear-gradient(135deg, ${skill.color}18, rgba(6,10,20,0.9))`
                    : 'rgba(6,10,20,0.75)',
                  border: `1px solid ${owned ? skill.color + '55' : 'rgba(255,255,255,0.07)'}`,
                  boxShadow: owned ? `0 0 16px ${skill.color}22` : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Owned glow streak */}
                {owned && (
                  <div
                    style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                      background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
                    }}
                  />
                )}

                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div
                    style={{
                      width: 40, height: 40, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: owned ? `${skill.color}22` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${owned ? skill.color + '55' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: 6,
                      filter: owned ? `drop-shadow(0 0 6px ${skill.color})` : 'grayscale(0.8)',
                      opacity: owned ? 1 : 0.6,
                    }}
                  >
                    <GameIcon name={skill.icon} size={20} color={skill.color} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="neon-text" style={{ color: owned ? skill.color : '#e2e8f0', fontSize: '8px', letterSpacing: '1px' }}>
                        {skill.name.toUpperCase()}
                      </span>
                      {owned && (
                        <span className="neon-text" style={{ color: skill.color, fontSize: '7px' }}>✓ UNLOCKED</span>
                      )}
                    </div>
                    <div className="neon-text" style={{ color: '#475569', fontSize: '7px', lineHeight: 1.4 }}>
                      {skill.desc}
                    </div>
                  </div>

                  {/* Buy button / cost */}
                  <div className="flex-shrink-0">
                    {owned ? (
                      <div
                        className="neon-text"
                        style={{
                          width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: `${skill.color}22`,
                          border: `1px solid ${skill.color}55`,
                          borderRadius: 6, color: skill.color, fontSize: '8px', letterSpacing: '0.5px',
                        }}
                      >
                        MAX
                      </div>
                    ) : (
                      <button
                        onClick={() => onBuySkill && onBuySkill(skill.id, skill.cost)}
                        disabled={!canAfford}
                        className="pixel-btn neon-text"
                        style={{
                          width: 52, height: 40,
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          background: canAfford ? 'rgba(250,204,21,0.12)' : 'rgba(6,10,20,0.5)',
                          border: `1px solid ${canAfford ? 'rgba(250,204,21,0.4)' : 'rgba(255,255,255,0.06)'}`,
                          borderRadius: 6,
                          color: canAfford ? '#facc15' : '#334155',
                          cursor: canAfford ? 'pointer' : 'not-allowed',
                          fontSize: '7px',
                          letterSpacing: '1px',
                          gap: 2,
                        }}
                      >
                        <GameIcon name="coin" size={12} color={canAfford ? '#facc15' : '#334155'} />
                        <span>{skill.cost}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer tip */}
        <div
          className="mt-5 rounded-sm p-3 text-center"
          style={{ background: 'rgba(74,222,128,0.04)', border: '1px dashed rgba(74,222,128,0.12)' }}
        >
          <div className="neon-text" style={{ color: '#334155', fontSize: '7px', letterSpacing: '2px' }}>
            EARN GOLD BY CLEARING BOSSES & DAILY QUESTS
          </div>
        </div>

      </div>
    </div>
  );
}
