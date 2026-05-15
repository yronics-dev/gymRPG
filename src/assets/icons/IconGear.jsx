import React from 'react';
export default function IconGear({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Gear body */}
      <path d="M19.4 15C19.8 14.1 20 13.1 20 12C20 10.9 19.8 9.9 19.4 9L21.5 7.5L19.5 4L17 5.3C16 4.5 14.9 4 13.5 3.7L13 1H11L10.5 3.7C9.1 4 8 4.5 7 5.3L4.5 4L2.5 7.5L4.6 9C4.2 9.9 4 10.9 4 12C4 13.1 4.2 14.1 4.6 15L2.5 16.5L4.5 20L7 18.7C8 19.5 9.1 20 10.5 20.3L11 23H13L13.5 20.3C14.9 20 16 19.5 17 18.7L19.5 20L21.5 16.5L19.4 15Z" fill={color} />
      {/* Center hole */}
      <circle cx="12" cy="12" r="3.5" fill={color} opacity="0.0" />
      <circle cx="12" cy="12" r="3.5" fill="rgba(0,0,0,0.4)" />
      {/* Center highlight */}
      <circle cx="12" cy="12" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}
