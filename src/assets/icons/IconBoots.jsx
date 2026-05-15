import React from 'react';
export default function IconBoots({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Boot leg */}
      <rect x="7" y="3" width="7" height="13" rx="2" fill={color} />
      {/* Boot toe box */}
      <path d="M7 14H18C18 14 19 14 19 16C19 18 18 19 16 19H7V14Z" fill={color} />
      {/* Sole */}
      <rect x="6" y="19" width="14" height="2.5" rx="1.25" fill={color} opacity="0.7" />
      {/* Buckle strap */}
      <rect x="7" y="10" width="7" height="2.5" rx="0" fill={color} opacity="0.6" />
      <rect x="10.5" y="9.5" width="2.5" height="3.5" rx="0.5" fill={color} opacity="0.5" />
      {/* Top fold */}
      <rect x="7" y="3" width="7" height="3" rx="1.5" fill={color} opacity="0.6" />
      {/* Laces hint */}
      <path d="M9 7L13 7M9 9L13 9" stroke={color} strokeWidth="0.75" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}
