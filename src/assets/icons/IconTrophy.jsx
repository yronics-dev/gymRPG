import React from 'react';
export default function IconTrophy({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Trophy cup */}
      <path d="M6 3H18V12C18 15.3 15.3 18 12 18C8.7 18 6 15.3 6 12V3Z" fill={color} />
      {/* Handles */}
      <path d="M6 5C6 5 3 5 3 8C3 10 5 11 6 10" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M18 5C18 5 21 5 21 8C21 10 19 11 18 10" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Stem */}
      <rect x="11" y="18" width="2" height="3" fill={color} opacity="0.8" />
      {/* Base */}
      <rect x="7" y="21" width="10" height="2" rx="1" fill={color} opacity="0.8" />
      {/* Cup highlight */}
      <path d="M8.5 5C8.5 5 9 4 10.5 4C12 4 12.5 5 12.5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
      {/* Star in cup */}
      <path d="M12 7L13 10H10L12 7Z" fill={color} opacity="0.5" />
    </svg>
  );
}
