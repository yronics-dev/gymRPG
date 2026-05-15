import React from 'react';
export default function IconLightning({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Lightning bolt */}
      <path d="M13 2L4 14H11L9 22L20 9H13L13 2Z" fill={color} />
      {/* Inner highlight */}
      <path d="M13 4L6 13H12L10.5 19.5L18 10H12.5L13 4Z" fill={color} opacity="0.45" />
    </svg>
  );
}
