import React from 'react';
export default function IconMuscleCore({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Core/abs shape */}
      <path d="M7 4H17V16C17 18.2 14.8 20 12 20C9.2 20 7 18.2 7 16V4Z" fill={color} />
      {/* Belt/waist band */}
      <rect x="5" y="14" width="14" height="3" rx="1.5" fill={color} opacity="0.7" />
      {/* Belt buckle */}
      <rect x="10" y="13.5" width="4" height="4" rx="0.75" fill={color} opacity="0.6" />
      <rect x="11" y="14.5" width="2" height="2" rx="0.25" fill={color} opacity="0.9" />
      {/* Six-pack grid */}
      <rect x="9" y="5" width="2.5" height="3" rx="1" fill={color} opacity="0.5" />
      <rect x="12.5" y="5" width="2.5" height="3" rx="1" fill={color} opacity="0.5" />
      <rect x="9" y="9.5" width="2.5" height="3" rx="1" fill={color} opacity="0.5" />
      <rect x="12.5" y="9.5" width="2.5" height="3" rx="1" fill={color} opacity="0.5" />
      {/* Center line */}
      <rect x="11.25" y="4" width="1.5" height="10" rx="0.75" fill={color} opacity="0.45" />
      {/* Sides */}
      <path d="M7 8C6 9 6 11 7 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
      <path d="M17 8C18 9 18 11 17 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}
