import React from 'react';
export default function IconHelmet({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Helmet dome */}
      <path d="M12 2C7.6 2 4 5.4 4 9.5V14H20V9.5C20 5.4 16.4 2 12 2Z" fill={color} />
      {/* Cheek guards */}
      <path d="M4 13H7V19C7 19.5 6.6 20 6 20C5.4 20 4 18.5 4 16V13Z" fill={color} opacity="0.85" />
      <path d="M20 13H17V19C17 19.5 17.4 20 18 20C18.6 20 20 18.5 20 16V13Z" fill={color} opacity="0.85" />
      {/* Brim */}
      <rect x="3" y="13" width="18" height="2.5" rx="1" fill={color} opacity="0.7" />
      {/* Nasal guard */}
      <rect x="10.5" y="9" width="3" height="7" rx="1.5" fill={color} opacity="0.6" />
      {/* Dome highlight */}
      <path d="M8 5C8 5 9.5 3.5 12 3.5C14.5 3.5 16 5 16 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Rivets */}
      <circle cx="7.5" cy="13" r="1" fill={color} opacity="0.6" />
      <circle cx="16.5" cy="13" r="1" fill={color} opacity="0.6" />
    </svg>
  );
}
