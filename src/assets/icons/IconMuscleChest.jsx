import React from 'react';
export default function IconMuscleChest({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Left pectoral */}
      <path d="M2 6C2 6 3 4 6 4C9 4 11 6 11 9C11 12 9 14 6 14C3 14 2 12 2 10V6Z" fill={color} />
      {/* Right pectoral */}
      <path d="M22 6C22 6 21 4 18 4C15 4 13 6 13 9C13 12 15 14 18 14C21 14 22 12 22 10V6Z" fill={color} />
      {/* Sternum line */}
      <rect x="11" y="4" width="2" height="11" rx="1" fill={color} opacity="0.6" />
      {/* Collar bones */}
      <path d="M6 4L12 3L18 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
      {/* Pec highlights */}
      <ellipse cx="7" cy="8" rx="2.5" ry="2" fill={color} opacity="0.45" />
      <ellipse cx="17" cy="8" rx="2.5" ry="2" fill={color} opacity="0.45" />
      {/* Lower chest curve */}
      <path d="M4 13C6 16 8 17 12 17C16 17 18 16 20 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.55" />
    </svg>
  );
}
