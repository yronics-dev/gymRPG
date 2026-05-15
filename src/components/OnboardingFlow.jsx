import React, { useState } from 'react';
import { PLAYER_GOALS } from '../constants';
import GameIcon from './GameIcon';

export default function OnboardingFlow({ onComplete }) {
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(0); // 0 = welcome, 1 = goal pick

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'rgba(2,5,12,1)', backdropFilter: 'blur(6px)' }}
    >
      {/* Animated background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(34,211,238,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center">

        {step === 0 && (
          <div className="text-center animate-slide-up">
            {/* Logo icon */}
            <div style={{ lineHeight: 1, marginBottom: '24px', filter: 'drop-shadow(0 0 20px #22d3ee)' }}>
              <GameIcon name="sword" size={72} color="#22d3ee" />
            </div>

            <div
              className="neon-text"
              style={{ color: '#22d3ee', fontSize: '16px', letterSpacing: '6px', textShadow: '0 0 20px #22d3ee', marginBottom: '8px' }}
            >
              GYM RPG
            </div>
            <div className="neon-text" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px', marginBottom: '32px' }}>
              TURN YOUR WORKOUTS INTO POWER
            </div>

            <div
              className="rounded-sm p-4 mb-8 text-left"
              style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}
            >
              {[
                ['lightning', '#22d3ee', 'Log workouts → earn XP & level up'],
                ['trophy',    '#facc15', 'Fight bosses & collect loot'],
                ['flame',     '#fb923c', 'Build streaks for bonus XP'],
                ['star',      '#4ade80', 'Unlock skills, titles & classes'],
              ].map(([icon, color, text]) => (
                <div key={text} className="flex items-center gap-3 mb-3 last:mb-0">
                  <GameIcon name={icon} size={16} color={color} />
                  <span className="neon-text" style={{ color: '#94a3b8', fontSize: '7px' }}>{text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full py-4 rounded-sm pixel-btn neon-text"
              style={{
                background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(34,211,238,0.05))',
                border: '2px solid rgba(34,211,238,0.5)',
                color: '#22d3ee',
                fontSize: '10px',
                letterSpacing: '3px',
                boxShadow: '0 0 20px rgba(34,211,238,0.2)',
              }}
            >
              BEGIN YOUR JOURNEY →
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="w-full animate-slide-up">
            <div className="text-center mb-6">
              <div className="neon-text" style={{ color: '#facc15', fontSize: '10px', letterSpacing: '4px', marginBottom: '4px' }}>
                CHOOSE YOUR GOAL
              </div>
              <div className="neon-text" style={{ color: '#475569', fontSize: '7px', letterSpacing: '2px' }}>
                THIS SHAPES YOUR ADVENTURE
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              {PLAYER_GOALS.map(goal => {
                const isSelected = selected === goal.id;
                return (
                  <button
                    key={goal.id}
                    onClick={() => setSelected(goal.id)}
                    className="w-full rounded-sm p-4 text-left pixel-btn"
                    style={{
                      background: isSelected
                        ? `linear-gradient(135deg, ${goal.color}22, rgba(6,10,20,0.9))`
                        : 'rgba(6,10,20,0.7)',
                      border: `2px solid ${isSelected ? goal.color : 'rgba(255,255,255,0.07)'}`,
                      boxShadow: isSelected ? `0 0 20px ${goal.color}33` : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span style={{ filter: isSelected ? `drop-shadow(0 0 8px ${goal.color})` : 'none' }}>
                        <GameIcon name={goal.icon} size={28} color={goal.color} />
                      </span>
                      <div>
                        <div className="neon-text" style={{ color: isSelected ? goal.color : '#e2e8f0', fontSize: '9px', letterSpacing: '2px' }}>
                          {goal.label.toUpperCase()}
                        </div>
                        <div className="neon-text mt-0.5" style={{ color: '#475569', fontSize: '7px' }}>
                          {goal.desc}
                        </div>
                        <div className="neon-text mt-1" style={{ color: '#334155', fontSize: '6px', letterSpacing: '1px' }}>
                          FOCUS: {goal.focus.slice(0, 3).join(' · ')}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="ml-auto neon-text" style={{ color: goal.color, fontSize: '14px' }}>✓</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => selected && onComplete(selected)}
              disabled={!selected}
              className="w-full py-4 rounded-sm pixel-btn neon-text"
              style={{
                background: selected
                  ? 'linear-gradient(135deg, rgba(74,222,128,0.15), rgba(74,222,128,0.05))'
                  : 'rgba(6,10,20,0.5)',
                border: `2px solid ${selected ? 'rgba(74,222,128,0.5)' : 'rgba(255,255,255,0.07)'}`,
                color: selected ? '#4ade80' : '#334155',
                fontSize: '10px',
                letterSpacing: '3px',
                boxShadow: selected ? '0 0 20px rgba(74,222,128,0.2)' : 'none',
                transition: 'all 0.2s ease',
                cursor: selected ? 'pointer' : 'not-allowed',
              }}
            >
              {selected ? 'LET\'S GO! →' : 'PICK A GOAL FIRST'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
