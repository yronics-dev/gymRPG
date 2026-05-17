import React from 'react';
import { SKILL_TREES } from '../../data/skilltrees';

export default function SkillTreeTabs({ activeId, onChange }) {
  return (
    <div style={{
      display: 'flex', gap: 6, padding: '10px 12px 0',
      flexShrink: 0,
    }}>
      {SKILL_TREES.map(tree => {
        const active = activeId === tree.id;
        return (
          <button
            key={tree.id}
            onClick={() => onChange(tree.id)}
            style={{
              flex: 1, padding: '8px 4px', borderRadius: 10,
              fontSize: 11, fontWeight: 700, letterSpacing: 1,
              fontFamily: 'Courier New, monospace',
              background: active ? `${tree.color}28` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${active ? tree.color : 'rgba(255,255,255,0.08)'}`,
              color: active ? tree.glowColor : '#475569',
              boxShadow: active ? `0 0 12px ${tree.color}44` : 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {tree.label.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
