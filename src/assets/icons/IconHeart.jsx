import React from 'react';
export default function IconHeart({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Heart shape */}
      <path d="M12 20.5C12 20.5 3 14.5 3 8.5C3 5.5 5.5 3 8.5 3C10.2 3 11.7 3.8 12 5C12.3 3.8 13.8 3 15.5 3C18.5 3 21 5.5 21 8.5C21 14.5 12 20.5 12 20.5Z" fill={color} />
      {/* Highlight */}
      <ellipse cx="9" cy="7.5" rx="2.5" ry="2" fill={color} opacity="0.5" />
      {/* Inner glow dots */}
      <circle cx="9.5" cy="7" r="1" fill={color} opacity="0.6" />
    </svg>
  );
}
