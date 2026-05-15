import React from 'react';
export default function IconFlame({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer flame */}
      <path d="M12 2C12 2 16 7 16 11C16 11 14 9.5 13 8C13 8 14 13 11 15.5C11 15.5 11.5 12 10 11C10 11 8 13.5 8 16C8 19.3 9.9 22 12 22C14.8 22 18 19.3 18 15C18 9.5 12 2 12 2Z" fill={color} />
      {/* Inner highlight */}
      <path d="M12 10C12 10 14 13 14 15C14 15 13 14 12.5 13.5C12.5 13.5 13 16 11.5 17.5C11.5 17.5 11.5 15 11 14C11 14 10 16 10 17C10 18.6 10.9 20 12 20C13.7 20 15 18.3 15 16C15 13 12 10 12 10Z" fill={color} opacity="0.5" />
      {/* Base flicker */}
      <ellipse cx="12" cy="21" rx="3" ry="1" fill={color} opacity="0.3" />
    </svg>
  );
}
