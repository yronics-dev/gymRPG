import React from 'react';
export default function IconWing({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Wing body */}
      <path d="M3 18C3 18 6 8 14 6C14 6 10 10 10 14L14 10C14 10 12 15 9 17L14 13C14 13 13 18 8 20C8 20 9 16 11 15C11 15 6 17 3 18Z" fill={color} />
      {/* Quill lines */}
      <path d="M7 17L10 12" stroke={color} strokeWidth="0.75" strokeLinecap="round" opacity="0.6" />
      <path d="M8.5 15.5L12 11" stroke={color} strokeWidth="0.75" strokeLinecap="round" opacity="0.6" />
      {/* Second wing hint */}
      <path d="M13 7C13 7 18 6 21 9C21 9 18 9 17 11L21 9C21 9 19 14 16 15L19 12C19 12 18 17 15 18C15 18 16 14 14 14C14 14 15 10 13 7Z" fill={color} opacity="0.55" />
    </svg>
  );
}
