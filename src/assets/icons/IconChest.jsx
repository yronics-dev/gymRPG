import React from 'react';
export default function IconChest({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Chest body */}
      <rect x="2" y="11" width="20" height="11" rx="2" fill={color} />
      {/* Chest lid */}
      <rect x="2" y="4" width="20" height="8" rx="2" fill={color} opacity="0.85" />
      {/* Metal band (lid seam) */}
      <rect x="2" y="11" width="20" height="2.5" fill={color} opacity="0.6" />
      {/* Horizontal bands on body */}
      <rect x="2" y="15.5" width="20" height="1.5" fill={color} opacity="0.5" />
      {/* Lock clasp */}
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" fill={color} opacity="0.8" />
      <circle cx="12" cy="12" r="1.5" fill={color} opacity="0.5" />
      <rect x="11.2" y="12" width="1.6" height="2" rx="0.5" fill={color} opacity="0.9" />
      {/* Top highlight */}
      <rect x="3" y="4.5" width="18" height="1.5" rx="0.75" fill={color} opacity="0.5" />
      {/* Corner rivets */}
      <circle cx="4.5" cy="6" r="1" fill={color} opacity="0.7" />
      <circle cx="19.5" cy="6" r="1" fill={color} opacity="0.7" />
      <circle cx="4.5" cy="19" r="1" fill={color} opacity="0.7" />
      <circle cx="19.5" cy="19" r="1" fill={color} opacity="0.7" />
    </svg>
  );
}
