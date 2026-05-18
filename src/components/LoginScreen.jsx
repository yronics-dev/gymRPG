import React, { useState } from 'react';
import GameIcon from './GameIcon';
import { useT } from '../i18n/LangContext';

function getAccounts() {
  try { return JSON.parse(localStorage.getItem('gymrpg_accounts') || '{}'); }
  catch { return {}; }
}

function saveAccounts(accounts) {
  localStorage.setItem('gymrpg_accounts', JSON.stringify(accounts));
}

export default function LoginScreen({ onLogin }) {
  const t = useT();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode]         = useState('login');
  const [error, setError]       = useState('');

  function handleSubmit() {
    const name = username.trim().toLowerCase();
    const pass = password.trim();
    if (!name || name.length < 2) return setError(t('login_error_short'));
    if (!pass || pass.length < 4) return setError(t('login_error_pass'));

    const accounts = getAccounts();

    if (mode === 'register') {
      if (accounts[name]) return setError(t('login_error_short'));
      accounts[name] = pass;
      saveAccounts(accounts);
      onLogin(name);
    } else {
      if (!accounts[name]) return setError(t('login_error_wrong'));
      if (accounts[name] !== pass) return setError(t('login_error_wrong'));
      onLogin(name);
    }
  }

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-6"
      style={{ background: '#040810', fontFamily: 'Courier New' }}
    >
      {/* Pixel grid bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(34,211,238,0.04) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
      }} />

      {/* Logo */}
      <div className="relative z-10 text-center mb-8">
        <div style={{
          lineHeight: 1,
          filter: 'drop-shadow(0 0 24px rgba(34,211,238,0.6))',
          animation: 'pixelBob 2s ease-in-out infinite',
        }}>
          <GameIcon name="sword" size={52} color="#22d3ee" />
        </div>
        <div className="neon-text mt-3" style={{ color: '#22d3ee', fontSize: '20px', letterSpacing: '6px' }}>
          GYMRPG
        </div>
        <div className="neon-text mt-1" style={{ color: '#334155', fontSize: '7px', letterSpacing: '3px' }}>
          TRAIN · BATTLE · EVOLVE
        </div>
      </div>

      {/* Card */}
      <div
        className="relative z-10 w-full rounded-sm p-5"
        style={{
          maxWidth: '320px',
          background: '#080f1e',
          border: '1px solid rgba(34,211,238,0.2)',
          boxShadow: '0 0 40px rgba(34,211,238,0.06)',
        }}
      >
        {/* Corner decorations */}
        <div style={{ position: 'absolute', top: -2, left: -2, width: 6, height: 6, background: '#22d3ee', boxShadow: '0 0 6px #22d3ee' }} />
        <div style={{ position: 'absolute', bottom: -2, right: -2, width: 6, height: 6, background: '#22d3ee', boxShadow: '0 0 6px #22d3ee' }} />

        {/* Mode toggle */}
        <div
          className="flex gap-0 mb-5 overflow-hidden rounded-sm"
          style={{ border: '1px solid rgba(34,211,238,0.15)' }}
        >
          {[
            { id: 'login',    label: t('login_btn') },
            { id: 'register', label: t('login_create') },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => { setMode(m.id); setError(''); }}
              className="flex-1 py-2 neon-text"
              style={{
                background: mode === m.id ? 'rgba(34,211,238,0.12)' : 'transparent',
                color: mode === m.id ? '#22d3ee' : '#334155',
                fontSize: '7px', letterSpacing: '2px',
                borderRight: m.id === 'login' ? '1px solid rgba(34,211,238,0.15)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <div className="neon-text mb-1" style={{ color: '#475569', fontSize: '7px', letterSpacing: '2px' }}>{t('login_username')}</div>
            <input
              type="text"
              value={username}
              autoCapitalize="none"
              autoCorrect="off"
              onChange={e => { setUsername(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="your hero name"
              className="w-full px-3 py-2.5 rounded-sm outline-none"
              style={{
                background: '#0b1426',
                border: '1px solid rgba(34,211,238,0.2)',
                color: '#e2e8f0',
                fontSize: '13px',
              }}
            />
          </div>
          <div>
            <div className="neon-text mb-1" style={{ color: '#475569', fontSize: '7px', letterSpacing: '2px' }}>{t('login_password')}</div>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="••••••"
              className="w-full px-3 py-2.5 rounded-sm outline-none"
              style={{
                background: '#0b1426',
                border: '1px solid rgba(34,211,238,0.2)',
                color: '#e2e8f0',
                fontSize: '14px',
                letterSpacing: '3px',
              }}
            />
          </div>
        </div>

        {error && (
          <div className="neon-text mt-2 flex items-center gap-1.5" style={{ color: '#f87171', fontSize: '7px', letterSpacing: '1px' }}>
            <GameIcon name="impact" size={10} color="#f87171" />
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full mt-4 py-3.5 rounded-sm pixel-btn"
          style={{
            background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(34,211,238,0.06))',
            border: '2px solid #22d3ee',
            color: '#22d3ee',
            boxShadow: '0 0 20px rgba(34,211,238,0.25)',
            fontSize: '10px', letterSpacing: '3px',
          }}
        >
          {mode === 'login' ? t('login_title') : t('login_create')}
        </button>
      </div>

      <div className="relative z-10 mt-4 neon-text" style={{ color: '#1e2d3d', fontSize: '7px', letterSpacing: '2px' }}>
        DATA SAVED ON THIS DEVICE
      </div>
    </div>
  );
}
