import React from 'react';
export default function IconCoin({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Coin base */}
      <circle cx="12" cy="12" r="10" fill={color} />
      {/* Coin rim */}
      <circle cx="12" cy="12" r="8.5" fill={color} opacity="0.6" />
      {/* Crown/cross emblem */}
      <path d="M12 6V8M12 16V18M6 12H8M16 12H18" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <circle cx="12" cy="12" r="2.5" fill={color} opacity="0.9" />
      {/* Top highlight */}
      <ellipse cx="9.5" cy="8.5" rx="2.5" ry="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}
