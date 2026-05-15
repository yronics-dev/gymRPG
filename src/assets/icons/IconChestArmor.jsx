import React from 'react';
export default function IconChestArmor({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Breastplate body */}
      <path d="M5 8C5 8 4 6 5 4L8 3L12 5L16 3L19 4C20 6 19 8 19 8V18C19 19.1 18.1 20 17 20H7C5.9 20 5 19.1 5 18V8Z" fill={color} />
      {/* Pauldron left */}
      <path d="M5 8C5 8 3 7 2 9C2 9 3 12 5 11V8Z" fill={color} opacity="0.8" />
      {/* Pauldron right */}
      <path d="M19 8C19 8 21 7 22 9C22 9 21 12 19 11V8Z" fill={color} opacity="0.8" />
      {/* Neck gorget */}
      <path d="M9 3L10 5H14L15 3L12 2L9 3Z" fill={color} opacity="0.75" />
      {/* Plate lines (ribbing) */}
      <path d="M8 9H16M7 12H17M8 15H16" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      {/* Center keel */}
      <rect x="11" y="5" width="2" height="13" rx="1" fill={color} opacity="0.45" />
      {/* Pec highlights */}
      <ellipse cx="9" cy="10" rx="2.5" ry="2" fill={color} opacity="0.35" />
      <ellipse cx="15" cy="10" rx="2.5" ry="2" fill={color} opacity="0.35" />
      {/* Top highlight */}
      <path d="M7 5.5C8.5 4.5 10.5 4 12 4C13.5 4 15.5 4.5 17 5.5" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}
