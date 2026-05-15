import React from 'react';
export default function IconDodge({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Arrow swoosh */}
      <path d="M4 8C4 8 8 4 14 5C18 5.7 20 9 20 12C20 15 18 18 14 19" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Arrowhead */}
      <path d="M10 16L14 19L11 22" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Speed lines */}
      <path d="M2 10H7M2 13H5M2 16H7" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
      {/* Motion blur dots */}
      <circle cx="5" cy="7" r="1" fill={color} opacity="0.3" />
      <circle cx="6.5" cy="6" r="0.75" fill={color} opacity="0.2" />
    </svg>
  );
}
