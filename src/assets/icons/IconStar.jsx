import React from 'react';
export default function IconStar({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* 5-pointed star */}
      <path d="M12 2L14.4 9.2H22L16 13.8L18.4 21L12 16.4L5.6 21L8 13.8L2 9.2H9.6L12 2Z" fill={color} />
      {/* Inner highlight */}
      <path d="M12 5L13.6 9.8H18.5L14.5 12.6L16 17.4L12 14.6L8 17.4L9.5 12.6L5.5 9.8H10.4L12 5Z" fill={color} opacity="0.45" />
    </svg>
  );
}
