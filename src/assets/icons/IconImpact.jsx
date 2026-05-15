import React from 'react';
export default function IconImpact({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Starburst center */}
      <circle cx="12" cy="12" r="4" fill={color} />
      {/* Rays */}
      <path d="M12 2V6M12 18V22M2 12H6M18 12H22M4.9 4.9L7.8 7.8M16.2 16.2L19.1 19.1M4.9 19.1L7.8 16.2M16.2 7.8L19.1 4.9" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Diagonal short rays */}
      <path d="M12 8V6M12 18V16M8 12H6M18 12H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
