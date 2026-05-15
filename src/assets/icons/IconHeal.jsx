import React from 'react';
export default function IconHeal({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Cross body */}
      <rect x="9" y="3" width="6" height="18" rx="2" fill={color} />
      <rect x="3" y="9" width="18" height="6" rx="2" fill={color} />
      {/* Center highlight */}
      <rect x="10.5" y="10.5" width="3" height="3" rx="0.5" fill={color} opacity="0.5" />
      {/* Sparkle dots */}
      <circle cx="4" cy="4" r="1.5" fill={color} opacity="0.7" />
      <circle cx="20" cy="4" r="1.5" fill={color} opacity="0.7" />
      <circle cx="4" cy="20" r="1.5" fill={color} opacity="0.7" />
      <circle cx="20" cy="20" r="1.5" fill={color} opacity="0.7" />
      {/* Shine lines */}
      <path d="M3 3L5 5M21 3L19 5M3 21L5 19M21 21L19 19" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
