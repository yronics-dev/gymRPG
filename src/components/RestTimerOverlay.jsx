import React, { useEffect, useRef, useState } from 'react';
import { playBeep } from '../utils/gameLogic';
import GameIcon from './GameIcon';

const R = 108;
const CIRCUMFERENCE = 2 * Math.PI * R;

const PRESETS = [
  { label: '30s', secs: 30 },
  { label: '1m',  secs: 60 },
  { label: '2m',  secs: 120 },
  { label: '3m',  secs: 180 },
];

export default function RestTimerOverlay({ secondsLeft, totalDuration = 60, onCancel, onChangeDuration }) {
  const prevRef = useRef(secondsLeft);
  const [customInput, setCustomInput] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  useEffect(() => {
    if (prevRef.current > 0 && secondsLeft === 0) {
      playBeep(1046, 0.8);
      setTimeout(() => playBeep(1318, 0.5), 250);
    }
    prevRef.current = secondsLeft;
  }, [secondsLeft]);

  const progress = totalDuration > 0 ? secondsLeft / totalDuration : 0;
  const offset   = CIRCUMFERENCE * (1 - progress);
  const mins  = Math.floor(secondsLeft / 60);
  const secs  = secondsLeft % 60;
  const label = `${mins}:${String(secs).padStart(2, '0')}`;
  const done  = secondsLeft === 0;

  function handlePreset(s) {
    setShowCustom(false);
    onChangeDuration?.(s);
  }

  function handleCustomSubmit(e) {
    e.preventDefault();
    const val = parseInt(customInput, 10);
    if (!isNaN(val) && val > 0) {
      onChangeDuration?.(Math.min(val, 3600));
      setShowCustom(false);
      setCustomInput('');
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5"
      style={{ background: 'rgba(4,8,18,0.97)', backdropFilter: 'blur(8px)' }}
    >
      {/* Pixel grid bg */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(34,211,238,0.04) 1px, transparent 1px)', backgroundSize: '16px 16px', pointerEvents: 'none' }} />

      <div className="neon-text neon-text-pulse" style={{ color: done ? '#facc15' : '#22d3ee', fontSize: '9px', letterSpacing: '4px' }}>
        {done ? '✓ REST COMPLETE' : 'REST TIMER'}
      </div>

      <div className="relative flex items-center justify-center">
        <svg width="260" height="260" className="pixel" style={{ overflow: 'visible' }}>
          {/* outer ring decoration */}
          <circle cx="130" cy="130" r="120" fill="none" stroke="rgba(34,211,238,0.05)" strokeWidth="2" />
          {/* track */}
          <circle cx="130" cy="130" r={R} fill="none" stroke="rgba(34,211,238,0.10)" strokeWidth="12" />
          {/* progress arc */}
          <circle cx="130" cy="130" r={R}
            fill="none"
            stroke={done ? '#facc15' : '#22d3ee'}
            strokeWidth="12"
            strokeLinecap="square"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={done ? 0 : offset}
            className="timer-ring"
            transform="rotate(-90 130 130)"
            style={{ filter: `drop-shadow(0 0 12px ${done ? '#facc15' : '#22d3ee'})` }}
          />
        </svg>
        <div className="absolute text-center">
          <div
            className="neon-text tabular-nums"
            style={{
              color: done ? '#facc15' : '#22d3ee',
              fontSize: '44px',
              textShadow: `0 0 20px ${done ? '#facc15' : '#22d3ee'}, 0 0 40px ${done ? '#facc15' : '#22d3ee'}`,
            }}
          >
            {done ? '✓' : label}
          </div>
          {!done && (
            <div className="neon-text mt-1" style={{ color: '#334155', fontSize: '7px', letterSpacing: '2px' }}>SECONDS LEFT</div>
          )}
        </div>
      </div>

      {done && (
        <div className="neon-text neon-text-pulse flex items-center gap-2" style={{ color: '#facc15', fontSize: '10px', letterSpacing: '2px' }}>
          <GameIcon name="dumbbell" size={16} color="#facc15" /> BACK TO WORK!
        </div>
      )}

      {/* Duration presets */}
      {!done && onChangeDuration && (
        <div className="flex flex-col items-center gap-2" style={{ position: 'relative', zIndex: 1 }}>
          <div className="neon-text" style={{ color: '#475569', fontSize: '7px', letterSpacing: '2px', marginBottom: '2px' }}>
            CHANGE DURATION
          </div>
          <div className="flex gap-2">
            {PRESETS.map(p => (
              <button
                key={p.secs}
                onClick={() => handlePreset(p.secs)}
                className="pixel-btn"
                style={{
                  border: `1px solid ${totalDuration === p.secs ? 'rgba(34,211,238,0.8)' : 'rgba(34,211,238,0.25)'}`,
                  color: totalDuration === p.secs ? '#22d3ee' : '#64748b',
                  background: totalDuration === p.secs ? 'rgba(34,211,238,0.10)' : 'transparent',
                  fontSize: '8px',
                  padding: '6px 12px',
                  letterSpacing: '1px',
                }}
              >
                {p.label}
              </button>
            ))}
            <button
              onClick={() => setShowCustom(v => !v)}
              className="pixel-btn"
              style={{
                border: `1px solid ${showCustom ? 'rgba(250,204,21,0.7)' : 'rgba(250,204,21,0.25)'}`,
                color: showCustom ? '#facc15' : '#64748b',
                background: showCustom ? 'rgba(250,204,21,0.08)' : 'transparent',
                fontSize: '8px',
                padding: '6px 12px',
                letterSpacing: '1px',
              }}
            >
              <GameIcon name="gear" size={14} color={showCustom ? '#facc15' : '#64748b'} />
            </button>
          </div>
          {showCustom && (
            <form onSubmit={handleCustomSubmit} className="flex gap-2 items-center mt-1">
              <input
                type="number"
                min="1"
                max="3600"
                value={customInput}
                onChange={e => setCustomInput(e.target.value)}
                placeholder="sec"
                autoFocus
                style={{
                  background: 'rgba(15,23,42,0.9)',
                  border: '1px solid rgba(250,204,21,0.4)',
                  color: '#facc15',
                  fontSize: '8px',
                  padding: '6px 10px',
                  width: '80px',
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                className="pixel-btn"
                style={{
                  border: '1px solid rgba(250,204,21,0.5)',
                  color: '#facc15',
                  background: 'rgba(250,204,21,0.08)',
                  fontSize: '7px',
                  padding: '6px 10px',
                  letterSpacing: '1px',
                }}
              >
                SET
              </button>
            </form>
          )}
        </div>
      )}

      <button
        onClick={onCancel}
        className="pixel-btn px-8 py-3 rounded-sm"
        style={{
          border: `1px solid ${done ? 'rgba(250,204,21,0.4)' : 'rgba(34,211,238,0.3)'}`,
          color: done ? '#facc15' : '#94a3b8',
          background: done ? 'rgba(250,204,21,0.08)' : 'transparent',
          fontSize: '8px',
          letterSpacing: '3px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {done ? 'DISMISS' : 'SKIP REST'}
      </button>
    </div>
  );
}
