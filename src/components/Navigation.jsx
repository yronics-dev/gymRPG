import React from 'react';

const TABS = [
  { id: 'workout',   label: 'TRAIN',  icon: '🏋️', activeColor: '#22d3ee' },
  { id: 'character', label: 'HERO',   icon: '⚔️',  activeColor: '#a855f7' },
  { id: 'boss',      label: 'BOSS',   icon: '👹',  activeColor: '#f87171' },
  { id: 'history',   label: 'LOG',    icon: '📜',  activeColor: '#facc15' },
];

export default function Navigation({ active, onChange, bossCleared, workoutDoneToday }) {
  return (
    <nav
      className="safe-bottom flex-none grid grid-cols-4"
      style={{
        background: '#060d1a',
        borderTop: '1px solid rgba(34,211,238,0.12)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.5)',
      }}
    >
      {TABS.map(tab => {
        const isActive = active === tab.id;
        const hasBadge = tab.id === 'boss' && workoutDoneToday && !bossCleared;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="relative flex flex-col items-center justify-center py-3 gap-0.5 transition-all"
            style={{
              color: isActive ? tab.activeColor : '#334155',
              background: isActive ? `${tab.activeColor}08` : 'transparent',
            }}
          >
            {/* Active top line */}
            {isActive && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '15%',
                  right: '15%',
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${tab.activeColor}, transparent)`,
                  boxShadow: `0 0 8px ${tab.activeColor}`,
                }}
              />
            )}

            {/* Icon */}
            <span
              style={{
                fontSize: '20px',
                lineHeight: 1,
                filter: isActive
                  ? `drop-shadow(0 0 6px ${tab.activeColor})`
                  : 'none',
                transition: 'filter 0.2s ease',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                transitionProperty: 'filter, transform',
              }}
            >
              {tab.icon}
            </span>

            {/* Label */}
            <span
              className="neon-text"
              style={{
                fontSize: '7px',
                letterSpacing: '1px',
                color: isActive ? tab.activeColor : '#334155',
                textShadow: isActive ? `0 0 6px ${tab.activeColor}` : 'none',
              }}
            >
              {tab.label}
            </span>

            {/* Badge */}
            {hasBadge && (
              <span
                className="absolute top-1.5 right-5 w-2.5 h-2.5 rounded-sm animate-pulse"
                style={{ background: '#facc15', boxShadow: '0 0 6px #facc15' }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
