import React from 'react';
export default function IconLock({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Lock body */}
      <rect x="4" y="10" width="16" height="12" rx="2.5" fill={color} />
      {/* Shackle */}
      <path d="M8 10V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V10" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Keyhole */}
      <circle cx="12" cy="15.5" r="2.5" fill={color} opacity="0.5" />
      <rect x="11" y="16" width="2" height="3.5" rx="0.5" fill={color} opacity="0.5" />
      {/* Body highlight */}
      <rect x="4" y="10" width="16" height="2.5" rx="1" fill={color} opacity="0.4" />
    </svg>
  );
}
