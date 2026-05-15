import React from 'react';
export default function IconSkull({ size = 24, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Skull dome */}
      <path d="M12 2C7.6 2 4 5.4 4 9.5C4 12.3 5.6 14.8 8 16.1V19C8 19.5 8.5 20 9 20H15C15.5 20 16 19.5 16 19V16.1C18.4 14.8 20 12.3 20 9.5C20 5.4 16.4 2 12 2Z" fill={color} />
      {/* Eye sockets */}
      <ellipse cx="9" cy="10" rx="2.5" ry="2.8" fill={color} opacity="0.0" />
      <path d="M6.5 10C6.5 8.3 7.6 7 9 7C10.4 7 11.5 8.3 11.5 10C11.5 11.7 10.4 13 9 13C7.6 13 6.5 11.7 6.5 10Z" fill="black" opacity="0.7" />
      <path d="M12.5 10C12.5 8.3 13.6 7 15 7C16.4 7 17.5 8.3 17.5 10C17.5 11.7 16.4 13 15 13C13.6 13 12.5 11.7 12.5 10Z" fill="black" opacity="0.7" />
      {/* Nose cavity */}
      <path d="M11 12.5L12 14L13 12.5" stroke="black" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      {/* Teeth */}
      <rect x="9" y="19.5" width="2" height="2.5" rx="0.5" fill={color} />
      <rect x="11.5" y="19.5" width="2" height="2.5" rx="0.5" fill={color} />
      <rect x="14" y="19.5" width="1.5" height="2" rx="0.5" fill={color} opacity="0.7" />
      {/* Cheekbone shading */}
      <path d="M5 12C5 12 6 14 8 15" stroke={color} strokeWidth="0.75" strokeLinecap="round" opacity="0.4" />
      <path d="M19 12C19 12 18 14 16 15" stroke={color} strokeWidth="0.75" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}
