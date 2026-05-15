import React from 'react';
export default function IconCardio({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Heart base */}
      <path d="M12 19C12 19 3 13 3 7.5C3 5 5 3 7.5 3C9.2 3 10.7 3.9 12 5.5C13.3 3.9 14.8 3 16.5 3C19 3 21 5 21 7.5C21 13 12 19 12 19Z" fill={color} />
      {/* Lightning bolt through heart */}
      <path d="M14 4L10 10H13L10 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.0" />
      {/* Lightning bolt (filled, punching through) */}
      <path d="M14 5L10 11H13.5L10.5 17L15.5 10H12L14 5Z" fill={color} opacity="0.85" />
      {/* EKG line below */}
      <path d="M2 21H8L10 18L12 22L14 17L16 21H22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}
