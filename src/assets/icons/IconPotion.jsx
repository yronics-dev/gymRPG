import React from 'react';
export default function IconPotion({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Bottle body */}
      <path d="M9 8C9 8 5 11 5 15C5 18.3 8.1 21 12 21C15.9 21 19 18.3 19 15C19 11 15 8 15 8V5H9V8Z" fill={color} />
      {/* Neck */}
      <rect x="9" y="3" width="6" height="3" rx="1" fill={color} opacity="0.8" />
      {/* Cork */}
      <rect x="10" y="2" width="4" height="2.5" rx="1" fill={color} opacity="0.6" />
      {/* Liquid fill (lighter) */}
      <path d="M7 15C7 15 8 12 12 12C16 12 17 15 17 15C17 17.8 14.8 19.5 12 19.5C9.2 19.5 7 17.8 7 15Z" fill={color} opacity="0.5" />
      {/* Bubbles */}
      <circle cx="10" cy="15" r="1" fill={color} opacity="0.7" />
      <circle cx="13.5" cy="13.5" r="0.75" fill={color} opacity="0.6" />
      <circle cx="11" cy="17" r="0.5" fill={color} opacity="0.5" />
      {/* Bottle highlight */}
      <path d="M10 10C10 10 9 12 9 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}
