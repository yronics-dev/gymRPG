import React from 'react';
export default function IconMuscleShoulders({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Left deltoid */}
      <path d="M2 10C2 10 3 6 6 5C8 4.5 10 5 11 7V11C11 11 8 10 6 11C4 12 3 14 3 14L2 10Z" fill={color} />
      {/* Right deltoid */}
      <path d="M22 10C22 10 21 6 18 5C16 4.5 14 5 13 7V11C13 11 16 10 18 11C20 12 21 14 21 14L22 10Z" fill={color} />
      {/* Trapezius (neck/top) */}
      <path d="M8 5C8 5 10 3 12 3C14 3 16 5 16 5L12 7L8 5Z" fill={color} opacity="0.75" />
      {/* Deltoid highlights */}
      <ellipse cx="6" cy="8.5" rx="2" ry="2.5" fill={color} opacity="0.45" />
      <ellipse cx="18" cy="8.5" rx="2" ry="2.5" fill={color} opacity="0.45" />
      {/* Collar/neck base */}
      <rect x="10" y="7" width="4" height="5" rx="1" fill={color} opacity="0.5" />
    </svg>
  );
}
