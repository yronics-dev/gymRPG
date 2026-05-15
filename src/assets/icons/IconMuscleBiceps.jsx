import React from 'react';
export default function IconMuscleBiceps({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Upper arm */}
      <path d="M6 14C6 14 5 10 7 7C9 4 12 4 13 5L14 7C14 7 11 7 10 10L9 14H6Z" fill={color} />
      {/* Bicep peak (flexed) */}
      <path d="M8 9C8 9 9 6 11 6C13 6 14 8 14 8C14 8 12 7 11 8C10 9 9 11 9 11L8 9Z" fill={color} opacity="0.7" />
      {/* Forearm */}
      <path d="M6 14C6 14 5 16 6 18C7 20 9 21 10 20L11 18C11 18 9 18 8.5 17C8 16 8 14.5 9 14H6Z" fill={color} />
      {/* Elbow */}
      <ellipse cx="8" cy="14" rx="3" ry="1.5" fill={color} opacity="0.6" />
      {/* Hand/fist */}
      <path d="M9.5 18C9.5 18 10 20 11 20.5C12 21 14 20 14 18.5C14 17 13 16.5 12 16.5C11 16.5 9.5 17 9.5 18Z" fill={color} opacity="0.7" />
      {/* Muscle striations */}
      <path d="M10 8.5C10.5 7.5 11.5 7 12.5 7.5" stroke={color} strokeWidth="0.75" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
