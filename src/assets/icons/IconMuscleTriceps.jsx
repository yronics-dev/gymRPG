import React from 'react';
export default function IconMuscleTriceps({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Upper arm back (triceps) */}
      <path d="M14 5C14 5 16 6 17 8C18 10 18 12 17 14C16.5 15 16 15.5 15 15H12C11 15 10 14 10 13V7C10 6 11 5 12 5H14Z" fill={color} />
      {/* Tricep horseshoe shape (inner) */}
      <path d="M11 7C11 7 11.5 6.5 13 6.5C14.5 6.5 15.5 7.5 15.5 9C15.5 10.5 14.5 11 13 11C11.5 11 11 10 11 9V7Z" fill={color} opacity="0.5" />
      {/* Long head */}
      <path d="M12 5C12 5 11 4 10 5C9 6 9 8 9 10C9 12 10 14 11 15" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      {/* Forearm */}
      <path d="M12 15C12 15 11 17 11 18.5C11 20 12 21 13 21C14 21 15 20 15 18.5C15 17 14 15 13 15H12Z" fill={color} opacity="0.75" />
      {/* Elbow point */}
      <ellipse cx="13" cy="15" rx="2.5" ry="1.5" fill={color} opacity="0.6" />
    </svg>
  );
}
