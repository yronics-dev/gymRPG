import React from 'react';
export default function IconDumbbell({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Left weight plate outer */}
      <rect x="1" y="7" width="4" height="10" rx="1.5" fill={color} />
      {/* Left weight plate inner */}
      <rect x="5" y="9" width="2.5" height="6" rx="1" fill={color} opacity="0.7" />
      {/* Bar */}
      <rect x="7.5" y="10.5" width="9" height="3" rx="1.5" fill={color} />
      {/* Right weight plate inner */}
      <rect x="16.5" y="9" width="2.5" height="6" rx="1" fill={color} opacity="0.7" />
      {/* Right weight plate outer */}
      <rect x="19" y="7" width="4" height="10" rx="1.5" fill={color} />
      {/* Plate highlights */}
      <rect x="1.5" y="7.5" width="3" height="1.5" rx="0.75" fill={color} opacity="0.5" />
      <rect x="19.5" y="7.5" width="3" height="1.5" rx="0.75" fill={color} opacity="0.5" />
    </svg>
  );
}
