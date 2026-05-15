import React from 'react';
export default function IconMuscleLegs({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Left thigh */}
      <path d="M5 3H10V13C10 15.5 8.5 17 7 17C5.5 17 4 15.5 4 13V5C4 4 4.5 3 5 3Z" fill={color} />
      {/* Right thigh */}
      <path d="M19 3H14V13C14 15.5 15.5 17 17 17C18.5 17 20 15.5 20 13V5C20 4 19.5 3 19 3Z" fill={color} />
      {/* Left shin/calf */}
      <path d="M5 17C5 17 4 19 5 21H9C10 19 9.5 17 7 17" fill={color} opacity="0.8" />
      {/* Right shin/calf */}
      <path d="M19 17C19 17 20 19 19 21H15C14 19 14.5 17 17 17" fill={color} opacity="0.8" />
      {/* Knee caps */}
      <ellipse cx="7" cy="14.5" rx="3" ry="2" fill={color} opacity="0.55" />
      <ellipse cx="17" cy="14.5" rx="3" ry="2" fill={color} opacity="0.55" />
      {/* Quad lines */}
      <path d="M6 6C5.5 8 5.5 11 6 13" stroke={color} strokeWidth="0.75" strokeLinecap="round" opacity="0.45" />
      <path d="M18 6C18.5 8 18.5 11 18 13" stroke={color} strokeWidth="0.75" strokeLinecap="round" opacity="0.45" />
      {/* Groin/hip line */}
      <path d="M10 3C10 3 11 5 12 5C13 5 14 3 14 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
    </svg>
  );
}
