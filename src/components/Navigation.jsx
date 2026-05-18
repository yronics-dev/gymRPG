import React from 'react';
import GameIcon from './GameIcon';
import { useT } from '../i18n/LangContext';

const TAB_DEFS = [
  { id: 'workout',   labelKey: 'nav_train',  icon: 'dumbbell', activeColor: '#22d3ee' },
  { id: 'character', labelKey: 'nav_hero',   icon: 'hero',     activeColor: '#a855f7' },
  { id: 'boss',      labelKey: 'nav_boss',   icon: 'skull',    activeColor: '#f87171' },
  { id: 'skills',    labelKey: 'nav_skills', icon: 'star',     activeColor: '#a78bfa' },
  { id: 'history',   labelKey: 'nav_log',    icon: 'scroll',   activeColor: '#facc15' },
];

export default function Navigation({ active, onChange, bossCleared, workoutDoneToday }) {
  const t = useT();
  const TABS = TAB_DEFS.map(tab => ({ ...tab, label: t(tab.labelKey) }));
  return (
    <nav
      className="safe-bottom flex-none grid grid-cols-5"
      style={{
        background: '#1e3a5f',
        borderTop: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.3)',
      }}
    >
      {TABS.map(tab => {
        const isActive = active === tab.id;
        const hasBadge = tab.id === 'boss' && workoutDoneToday && !bossCleared;
        const c = tab.activeColor;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="relative flex flex-col items-center justify-center py-3 gap-1 transition-all"
            style={{
              color: isActive ? c : '#6b8faf',
              background: isActive
                ? `linear-gradient(180deg, ${c}22 0%, ${c}0a 100%)`
                : 'transparent',
            }}
          >
            {/* Active top glow bar */}
            {isActive && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: '10%',
                right: '10%',
                height: '2px',
                background: `linear-gradient(90deg, transparent, ${c}, transparent)`,
                boxShadow: `0 0 12px 2px ${c}99`,
                borderRadius: '0 0 4px 4px',
              }} />
            )}

            {/* Icon */}
            <span style={{
              lineHeight: 1,
              filter: isActive
                ? `drop-shadow(0 0 8px ${c}cc) drop-shadow(0 0 2px ${c})`
                : 'none',
              transform: isActive ? 'scale(1.18) translateY(-1px)' : 'scale(1)',
              transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1), filter 0.2s ease',
              display: 'block',
            }}>
              <GameIcon name={tab.icon} size={22} color={isActive ? c : '#6b8faf'} />
            </span>

            {/* Label */}
            <span
              className="neon-text"
              style={{
                fontSize: '7px',
                letterSpacing: '1.5px',
                fontWeight: isActive ? 700 : 400,
                color: isActive ? c : '#6b8faf',
                textShadow: isActive ? `0 0 10px ${c}cc, 0 0 20px ${c}66` : 'none',
                transition: 'color 0.2s, text-shadow 0.2s',
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
