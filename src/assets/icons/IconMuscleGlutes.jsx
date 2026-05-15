import React from 'react';
export default function IconMuscleGlutes({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Left glute */}
      <path d="M3 8C3 8 2 11 3 15C4 18 6 20 9 20C11 20 12 19 12 17V9C12 7.5 11 6 9 6C6 6 3 8 3 8Z" fill={color} />
      {/* Right glute */}
      <path d="M21 8C21 8 22 11 21 15C20 18 18 20 15 20C13 20 12 19 12 17V9C12 7.5 13 6 15 6C18 6 21 8 21 8Z" fill={color} />
      {/* Glute highlights */}
      <ellipse cx="8.5" cy="11" rx="3" ry="3.5" fill={color} opacity="0.4" />
      <ellipse cx="15.5" cy="11" rx="3" ry="3.5" fill={color} opacity="0.4" />
      {/* Center divide */}
      <rect x="11.25" y="8" width="1.5" height="12" rx="0.75" fill={color} opacity="0.5" />
      {/* Hip bone top */}
      <path d="M6 6C7.5 4.5 9.5 4 12 4C14.5 4 16.5 4.5 18 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
    </svg>
  );
}
