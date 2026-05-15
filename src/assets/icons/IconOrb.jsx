import React from 'react';
export default function IconOrb({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Pedestal base */}
      <path d="M8 20H16L15 17H9L8 20Z" fill={color} opacity="0.7" />
      <rect x="6" y="20" width="12" height="2" rx="1" fill={color} opacity="0.6" />
      {/* Orb stand */}
      <rect x="11" y="14" width="2" height="4" fill={color} opacity="0.7" />
      {/* Orb outer glow ring */}
      <circle cx="12" cy="10" r="7.5" fill={color} opacity="0.15" />
      {/* Orb body */}
      <circle cx="12" cy="10" r="6" fill={color} />
      {/* Orb inner */}
      <circle cx="12" cy="10" r="4" fill={color} opacity="0.5" />
      {/* Orb highlights */}
      <ellipse cx="9.5" cy="7.5" rx="2" ry="1.5" fill={color} opacity="0.6" />
      <circle cx="9" cy="7" r="0.8" fill={color} opacity="0.8" />
      {/* Energy swirl */}
      <path d="M10 8C11 7 14 8 14 10C14 12 11 13 10 12" stroke={color} strokeWidth="0.75" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  );
}
