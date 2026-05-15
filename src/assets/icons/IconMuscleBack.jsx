import React from 'react';
export default function IconMuscleBack({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Back torso shape */}
      <path d="M5 5C5 5 4 7 4 10V17C4 18.5 5 20 7 20H17C19 20 20 18.5 20 17V10C20 7 19 5 19 5L15 4L12 3L9 4L5 5Z" fill={color} />
      {/* Shoulder blades */}
      <path d="M7 7C7 7 6 8 6 10C6 12 7.5 13 9 13C10.5 13 11 12 11 10V7H7Z" fill={color} opacity="0.55" />
      <path d="M17 7C17 7 18 8 18 10C18 12 16.5 13 15 13C13.5 13 13 12 13 10V7H17Z" fill={color} opacity="0.55" />
      {/* Spine line */}
      <rect x="11.25" y="3" width="1.5" height="17" rx="0.75" fill={color} opacity="0.5" />
      {/* Lats (lower spread) */}
      <path d="M6 14C5 15 4 17 5 19" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M18 14C19 15 20 17 19 19" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {/* Back highlight */}
      <path d="M8 6C9.5 5 10.5 4.5 12 4.5C13.5 4.5 14.5 5 16 6" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}
