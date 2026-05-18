import React from 'react';
export default function IconHero({ size = 24, color = 'currentColor', className = '', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className} style={style}>

      {/* ── Helmet ── */}
      {/* Visor / helm base */}
      <path d="M7 9C7 5.7 9.2 3 12 3C14.8 3 17 5.7 17 9V11H7V9Z" fill={color} />
      {/* Helmet side cheek guards */}
      <rect x="6" y="9" width="2" height="4" rx="0.5" fill={color} opacity="0.75" />
      <rect x="16" y="9" width="2" height="4" rx="0.5" fill={color} opacity="0.75" />
      {/* Visor slit */}
      <path d="M8.5 9.5H15.5" stroke="black" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      {/* Helmet top crest */}
      <path d="M10 3C10 3 12 1.5 14 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

      {/* ── Neck ── */}
      <rect x="10.5" y="11" width="3" height="2" rx="0.5" fill={color} opacity="0.8" />

      {/* ── Pauldrons / Shoulders ── */}
      <path d="M5 14C5 13 6 13 7 13H17C18 13 19 13 19 14V15C19 15.5 18.5 16 18 16H6C5.5 16 5 15.5 5 15V14Z"
        fill={color} opacity="0.9" />

      {/* ── Chest plate ── */}
      <path d="M7 16H17L16.5 21H7.5L7 16Z" fill={color} opacity="0.85" />
      {/* Chest centre line */}
      <line x1="12" y1="16.5" x2="12" y2="20.5" stroke="black" strokeWidth="0.8" opacity="0.25" />
      {/* Chest horizontal band */}
      <line x1="7.2" y1="18.5" x2="16.8" y2="18.5" stroke="black" strokeWidth="0.7" opacity="0.2" />

      {/* ── Arms ── */}
      <rect x="3.5" y="15" width="3.5" height="5.5" rx="1" fill={color} opacity="0.75" />
      <rect x="17" y="15" width="3.5" height="5.5" rx="1" fill={color} opacity="0.75" />

      {/* ── Gloves ── */}
      <rect x="3" y="20" width="4" height="2.5" rx="1" fill={color} opacity="0.6" />
      <rect x="17" y="20" width="4" height="2.5" rx="1" fill={color} opacity="0.6" />
    </svg>
  );
}
