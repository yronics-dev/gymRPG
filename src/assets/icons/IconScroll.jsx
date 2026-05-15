import React from 'react';
export default function IconScroll({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Scroll body */}
      <rect x="4" y="4" width="16" height="16" rx="2" fill={color} />
      {/* Top roll */}
      <ellipse cx="12" cy="4" rx="6" ry="2.5" fill={color} opacity="0.8" />
      {/* Bottom roll */}
      <ellipse cx="12" cy="20" rx="6" ry="2.5" fill={color} opacity="0.8" />
      {/* Top roll highlight */}
      <ellipse cx="10" cy="3.5" rx="2.5" ry="1" fill={color} opacity="0.5" />
      {/* Lines of text */}
      <rect x="7" y="8" width="10" height="1.5" rx="0.75" fill={color} opacity="0.5" />
      <rect x="7" y="11" width="8" height="1.5" rx="0.75" fill={color} opacity="0.5" />
      <rect x="7" y="14" width="9" height="1.5" rx="0.75" fill={color} opacity="0.5" />
      {/* Wax seal hint */}
      <circle cx="16" cy="14" r="1.5" fill={color} opacity="0.6" />
    </svg>
  );
}
