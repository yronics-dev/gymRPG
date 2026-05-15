import React from 'react';
export default function IconRing({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Ring band */}
      <path d="M12 21C7.6 21 4 17.4 4 13C4 8.6 7.6 5 12 5C16.4 5 20 8.6 20 13C20 17.4 16.4 21 12 21Z" stroke={color} strokeWidth="3" fill="none" />
      {/* Gem setting prongs */}
      <path d="M9 6.5L10.5 4L12 3L13.5 4L15 6.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Gem face */}
      <path d="M9.5 5L12 3.5L14.5 5L13 7H11L9.5 5Z" fill={color} />
      {/* Gem facets */}
      <path d="M12 3.5L12 7M9.5 5L13 7M14.5 5L11 7" stroke={color} strokeWidth="0.6" strokeLinecap="round" opacity="0.5" />
      {/* Band highlight */}
      <path d="M6.5 10.5C6.5 10.5 7 8.5 9 7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
