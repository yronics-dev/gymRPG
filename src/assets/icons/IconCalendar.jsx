import React from 'react';
export default function IconCalendar({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Calendar body */}
      <rect x="2" y="4" width="20" height="18" rx="2.5" fill={color} opacity="0.9" />
      {/* Header bar */}
      <rect x="2" y="4" width="20" height="6" rx="2.5" fill={color} />
      {/* Bottom corners (override rounded to square) */}
      <rect x="2" y="8" width="20" height="2" fill={color} />
      {/* Ring posts */}
      <rect x="7" y="2" width="2.5" height="5" rx="1.25" fill={color} />
      <rect x="14.5" y="2" width="2.5" height="5" rx="1.25" fill={color} />
      {/* Day dots grid */}
      <circle cx="7" cy="14" r="1.5" fill={color} opacity="0.6" />
      <circle cx="12" cy="14" r="1.5" fill={color} opacity="0.6" />
      <circle cx="17" cy="14" r="1.5" fill={color} opacity="0.6" />
      <circle cx="7" cy="18.5" r="1.5" fill={color} opacity="0.6" />
      <circle cx="12" cy="18.5" r="1.5" fill={color} opacity="0.6" />
      {/* Highlighted day */}
      <circle cx="17" cy="18.5" r="2" fill={color} />
    </svg>
  );
}
