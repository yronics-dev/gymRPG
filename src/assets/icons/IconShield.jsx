import React from 'react';
export default function IconShield({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Shield body */}
      <path d="M12 2L20 5.5V13C20 17.4 16.5 21.1 12 22C7.5 21.1 4 17.4 4 13V5.5L12 2Z" fill={color} />
      {/* Inner lighter area */}
      <path d="M12 4.5L18 7.3V13C18 16.3 15.4 19.2 12 20.1C8.6 19.2 6 16.3 6 13V7.3L12 4.5Z" fill={color} opacity="0.5" />
      {/* Center vertical line */}
      <rect x="11.25" y="6" width="1.5" height="10" rx="0.75" fill={color} opacity="0.9" />
      {/* Horizontal bar */}
      <rect x="7" y="11" width="10" height="1.5" rx="0.75" fill={color} opacity="0.9" />
      {/* Boss notch at top */}
      <path d="M9 4.8L12 3.5L15 4.8L12 4.2L9 4.8Z" fill={color} opacity="0.7" />
    </svg>
  );
}
