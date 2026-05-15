import React from 'react';
import GameIcon from './GameIcon';

const TIMER_PRESETS = [
  { label: '30s', secs: 30 },
  { label: '1m',  secs: 60 },
  { label: '2m',  secs: 120 },
  { label: '3m',  secs: 180 },
  { label: '5m',  secs: 300 },
];

export default function SettingsModal({
  onClose, timerTotal, onChangeTimerDuration,
  language, onChangeLanguage,
  currentUser, onLogout,
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="rounded-t-lg overflow-hidden"
        style={{ background: '#080e1a', border: '1px solid rgba(34,211,238,0.2)', borderBottom: 'none', maxHeight: '85vh', overflowY: 'auto' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(34,211,238,0.05)' }}
        >
          <div className="neon-text flex items-center gap-2" style={{ color: '#22d3ee', fontSize: '10px', letterSpacing: '3px' }}>
            <GameIcon name="gear" size={14} color="#22d3ee" />
            {language === 'nl' ? 'INSTELLINGEN' : 'SETTINGS'}
          </div>
          <button
            onClick={onClose}
            className="neon-text px-3 py-1 rounded-sm"
            style={{ color: '#475569', fontSize: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            ✕
          </button>
        </div>

        <div className="p-4 flex flex-col gap-5">

          {/* Language */}
          <div>
            <div className="neon-text mb-2" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>
              {language === 'nl' ? 'TAAL' : 'LANGUAGE'}
            </div>
            <div className="flex gap-2">
              {[
                { code: 'en', label: 'EN — English' },
                { code: 'nl', label: 'NL — Nederlands' },
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => onChangeLanguage(lang.code)}
                  className="flex-1 py-2.5 rounded-sm pixel-btn"
                  style={{
                    background: language === lang.code ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${language === lang.code ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    color: language === lang.code ? '#22d3ee' : '#475569',
                    fontSize: '8px',
                    letterSpacing: '1px',
                    boxShadow: language === lang.code ? '0 0 12px rgba(34,211,238,0.15)' : 'none',
                  }}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Timer */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="neon-text" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>
                {language === 'nl' ? 'RUSTTIMER' : 'REST TIMER'}
              </div>
              <div className="neon-text" style={{ color: '#22d3ee', fontSize: '10px', textShadow: '0 0 8px #22d3ee' }}>
                {Math.floor(timerTotal / 60)}m {timerTotal % 60 > 0 ? `${timerTotal % 60}s` : ''}
              </div>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {TIMER_PRESETS.map(p => (
                <button
                  key={p.secs}
                  onClick={() => onChangeTimerDuration(p.secs)}
                  className="pixel-btn py-2 rounded-sm"
                  style={{
                    background: timerTotal === p.secs ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${timerTotal === p.secs ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    color: timerTotal === p.secs ? '#22d3ee' : '#475569',
                    fontSize: '8px',
                    letterSpacing: '1px',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="neon-text mt-2 text-center" style={{ color: '#1e2d3d', fontSize: '7px' }}>
              {language === 'nl' ? 'Timer start na elk oefening' : 'Timer starts after each exercise'}
            </div>
          </div>

          {/* Account */}
          <div>
            <div className="neon-text mb-2" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>
              {language === 'nl' ? 'ACCOUNT' : 'ACCOUNT'}
            </div>
            <div
              className="flex items-center justify-between p-3 rounded-sm"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="neon-text" style={{ color: '#475569', fontSize: '8px' }}>@{currentUser}</div>
              <button
                onClick={() => { onLogout(); onClose(); }}
                className="neon-text px-3 py-1.5 rounded-sm pixel-btn"
                style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', color: '#f87171', fontSize: '7px', letterSpacing: '1px' }}
              >
                {language === 'nl' ? 'UITLOGGEN' : 'LOGOUT'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
