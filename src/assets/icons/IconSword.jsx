import React from 'react';
export default function IconSword({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Blade */}
      <path d="M19 3L21 5L8 18L6 16L19 3Z" fill={color} />
      {/* Blade edge highlight */}
      <path d="M18 4L20 6L19 7L17 5L18 4Z" fill={color} opacity="0.5" />
      {/* Crossguard */}
      <path d="M5 15L9 11L11 13L7 17L5 15Z" fill={color} opacity="0.85" />
      {/* Handle */}
      <rect x="2" y="18" width="5" height="2.5" rx="1.25" transform="rotate(-45 2 18)" fill={color} opacity="0.7" />
      {/* Pommel */}
      <circle cx="3.5" cy="20.5" r="2" fill={color} />
    </svg>
  );
}
