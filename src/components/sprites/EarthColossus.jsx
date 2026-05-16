import React from 'react';

export default function EarthColossus({ size = 180, rage = false }) {
  const w = size * (100 / 160);
  const h = size;

  const css = `
    @keyframes ec-stomp {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      25%      { transform: translateY(-4px) rotate(-1.2deg); }
      70%      { transform: translateY(-2px) rotate(1.2deg); }
    }
    @keyframes ec-arm-l {
      0%,100% { transform: rotate(-6deg); }
      50%      { transform: rotate(5deg); }
    }
    @keyframes ec-arm-r {
      0%,100% { transform: rotate(6deg); }
      50%      { transform: rotate(-5deg); }
    }
    @keyframes ec-crack-glow {
      0%,100% { opacity: 0.7; }
      40%      { opacity: 1; }
      70%      { opacity: 0.4; }
    }
    @keyframes ec-crack-glow2 {
      0%,100% { opacity: 0.5; }
      30%      { opacity: 1; }
      65%      { opacity: 0.3; }
    }
    @keyframes ec-vine-sway {
      0%,100% { transform: rotate(-3deg); }
      50%      { transform: rotate(3deg); }
    }
    @keyframes ec-root-pulse {
      0%,100% { opacity: 0.7; }
      50%      { opacity: 1; }
    }
    @keyframes ec-moss-shimmer {
      0%,100% { opacity: 0.8; }
      50%      { opacity: 0.5; }
    }
    @keyframes ec-eye-pulse {
      0%,100% { opacity: 1; filter: drop-shadow(0 0 3px #4caf50); }
      50%      { opacity: 0.6; filter: drop-shadow(0 0 6px #66bb6a); }
    }
    @keyframes ec-leaf-drift {
      0%   { transform: translate(0,0) rotate(0deg);   opacity: 0.8; }
      100% { transform: translate(-8px,-20px) rotate(-40deg); opacity: 0; }
    }
    @keyframes ec-leaf-drift2 {
      0%   { transform: translate(0,0) rotate(0deg);   opacity: 0.7; }
      100% { transform: translate(6px,-18px) rotate(30deg);  opacity: 0; }
    }
  `;

  const stone    = '#3a2e1e';
  const stoneMid = '#4e3f28';
  const stoneHi  = '#6a5538';
  const stoneLo  = '#221a0e';
  const moss     = '#3d5a2a';
  const mossHi   = '#5a7a3a';
  const vine     = '#2a4018';
  const crack    = rage ? '#88ff44' : '#4caf50';
  const crackGlo = rage ? '#aaffaa' : '#81c784';
  const eyeCol   = rage ? '#ffffff' : '#66ff44';

  return (
    <>
      <style>{css}</style>
      <svg
        width={w} height={h}
        viewBox="0 0 100 160"
        overflow="visible"
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id="ec-stone-front" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor={stoneHi} />
            <stop offset="45%"  stopColor={stoneMid} />
            <stop offset="100%" stopColor={stoneLo} />
          </linearGradient>
          <linearGradient id="ec-stone-dark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={stoneLo} />
            <stop offset="100%" stopColor={stoneMid} />
          </linearGradient>
          <radialGradient id="ec-crack-glow-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={crack}    stopOpacity="0.4" />
            <stop offset="100%" stopColor={crack}    stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ec-eye-glow-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={crack}    stopOpacity="0.5" />
            <stop offset="100%" stopColor={crack}    stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground shadow + roots spreading */}
        <ellipse cx="50" cy="157" rx="32" ry="5.5" fill="#110d06" opacity="0.6" />
        {/* Surface roots radiating out */}
        <path d="M30 154 Q18 152 10 156" fill="none" stroke={vine} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <path d="M38 156 Q26 158 16 154" fill="none" stroke={vine} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <path d="M70 154 Q82 152 90 156" fill="none" stroke={vine} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <path d="M62 156 Q74 158 84 154" fill="none" stroke={vine} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <path d="M48 157 Q44 162 40 158" fill="none" stroke={vine} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <path d="M52 157 Q56 162 60 158" fill="none" stroke={vine} strokeWidth="2" strokeLinecap="round" opacity="0.5" />

        {/* Floating leaf particles */}
        <g>
          <ellipse cx="22" cy="110" rx="4" ry="2.5" fill={mossHi} style={{ animation: 'ec-leaf-drift 3.4s ease-in infinite 0.5s', transformOrigin: '22px 118px' }} />
          <ellipse cx="78" cy="96"  rx="3.5" ry="2" fill={mossHi} style={{ animation: 'ec-leaf-drift2 2.8s ease-in infinite 1.2s', transformOrigin: '78px 104px' }} />
          <ellipse cx="14" cy="80"  rx="3" ry="2"   fill={moss}   style={{ animation: 'ec-leaf-drift 4.2s ease-in infinite 0.1s', transformOrigin: '14px 88px' }} />
          <ellipse cx="86" cy="74"  rx="3" ry="2"   fill={mossHi} style={{ animation: 'ec-leaf-drift2 3.8s ease-in infinite 2s', transformOrigin: '86px 82px' }} />
        </g>

        {/* ── BODY (stomp sway) ── */}
        <g style={{ animation: 'ec-stomp 5s ease-in-out infinite', transformOrigin: '50px 148px' }}>

          {/* LEGS — massive stone pillars */}
          {/* Left leg */}
          <rect x="22" y="118" width="22" height="32" rx="5" fill="url(#ec-stone-front)" />
          <rect x="22" y="118" width="22" height="9"  rx="3" fill={stoneHi} opacity="0.45" />
          {/* Stone texture on leg */}
          <path d="M26 126 Q32 124 38 126" fill="none" stroke={stoneLo} strokeWidth="1.2" opacity="0.5" />
          <path d="M24 136 Q33 134 42 136" fill="none" stroke={stoneLo} strokeWidth="1.2" opacity="0.5" />
          <path d="M25 146 Q33 144 41 146" fill="none" stroke={stoneLo} strokeWidth="1" opacity="0.4" />
          {/* Moss patches on leg */}
          <ellipse cx="26" cy="130" rx="4" ry="3" fill={moss} opacity="0.7" style={{ animation: 'ec-moss-shimmer 3s ease-in-out infinite' }} />
          <ellipse cx="38" cy="142" rx="3" ry="2" fill={mossHi} opacity="0.6" />
          {/* Left root wrapping leg */}
          <path d="M22 130 Q16 136 18 144 Q20 150 24 150" fill="none" stroke={vine} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" style={{ animation: 'ec-root-pulse 3s ease-in-out infinite' }} />
          <path d="M44 138 Q48 144 44 150" fill="none" stroke={vine} strokeWidth="2" strokeLinecap="round" opacity="0.6" />

          {/* Right leg */}
          <rect x="56" y="118" width="22" height="32" rx="5" fill="url(#ec-stone-front)" />
          <rect x="56" y="118" width="22" height="9"  rx="3" fill={stoneHi} opacity="0.45" />
          <path d="M60 126 Q67 124 74 126" fill="none" stroke={stoneLo} strokeWidth="1.2" opacity="0.5" />
          <path d="M58 136 Q67 134 76 136" fill="none" stroke={stoneLo} strokeWidth="1.2" opacity="0.5" />
          <path d="M59 146 Q67 144 75 146" fill="none" stroke={stoneLo} strokeWidth="1" opacity="0.4" />
          <ellipse cx="74" cy="130" rx="4" ry="3" fill={moss} opacity="0.7" style={{ animation: 'ec-moss-shimmer 3s ease-in-out infinite 1s' }} />
          <ellipse cx="62" cy="142" rx="3" ry="2" fill={mossHi} opacity="0.6" />
          <path d="M78 130 Q84 136 82 144 Q80 150 76 150" fill="none" stroke={vine} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" style={{ animation: 'ec-root-pulse 3s ease-in-out infinite 1.2s' }} />
          <path d="M56 138 Q52 144 56 150" fill="none" stroke={vine} strokeWidth="2" strokeLinecap="round" opacity="0.6" />

          {/* TORSO — massive boulder chest */}
          <polygon points="12,70 88,70 84,120 16,120" fill="url(#ec-stone-front)" />
          {/* Top bevel */}
          <polygon points="12,70 88,70 86,76 14,76" fill={stoneHi} opacity="0.45" />
          {/* Right dark side */}
          <polygon points="88,70 84,120 92,116 96,68" fill={stoneLo} opacity="0.55" />
          {/* Left highlight */}
          <polygon points="12,70 16,120 8,116 4,68"   fill={stoneMid} opacity="0.35" />

          {/* Stone texture lines on torso */}
          <path d="M24 76 Q36 72 50 74 Q64 72 76 76" fill="none" stroke={stoneLo} strokeWidth="1.5" opacity="0.4" />
          <path d="M18 90 Q34 86 50 88 Q66 86 82 90"  fill="none" stroke={stoneLo} strokeWidth="1.5" opacity="0.4" />
          <path d="M16 106 Q33 102 50 104 Q67 102 84 106" fill="none" stroke={stoneLo} strokeWidth="1.2" opacity="0.35" />

          {/* Boulder crack / chunk breaks in stone */}
          <path d="M32 72 Q30 80 33 88 Q30 96 32 106" fill="none" stroke={stoneLo} strokeWidth="2.5" opacity="0.5" />
          <path d="M68 72 Q70 80 67 88 Q70 96 68 106" fill="none" stroke={stoneLo} strokeWidth="2.5" opacity="0.5" />
          <path d="M46 72 Q44 82 47 92"               fill="none" stroke={stoneLo} strokeWidth="2" opacity="0.4" />

          {/* GLOWING GREEN CRACKS (earth energy) */}
          <g style={{ animation: 'ec-crack-glow 2.5s ease-in-out infinite' }}>
            <path d="M34 74 Q32 84 35 94 Q32 104 34 116" fill="none" stroke={crack} strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
            <path d="M50 72 Q48 82 51 92 Q49 102 51 112 Q50 118 50 122" fill="none" stroke={crack} strokeWidth="2" strokeLinecap="round" opacity="0.85" />
            <path d="M66 74 Q68 84 65 94 Q68 104 66 116" fill="none" stroke={crack} strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
          </g>
          <g style={{ animation: 'ec-crack-glow2 2s ease-in-out infinite 0.7s' }}>
            <path d="M38 96 Q44 91 50 94 Q56 97 62 92" fill="none" stroke={crack} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
            <path d="M30 108 Q40 104 50 107 Q60 110 70 106" fill="none" stroke={crack} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          </g>
          {/* Crack glow bloom */}
          <path d="M50 72 Q48 82 51 92 Q49 102 51 112" fill="none" stroke={crackGlo} strokeWidth="6" strokeLinecap="round" opacity="0.1" />
          <path d="M34 74 Q32 84 35 94 Q32 104 34 116" fill="none" stroke={crackGlo} strokeWidth="5" strokeLinecap="round" opacity="0.08" />

          {/* MOSS patches on torso */}
          <ellipse cx="24" cy="86"  rx="8"  ry="5"  fill={moss} opacity="0.65" style={{ animation: 'ec-moss-shimmer 4s ease-in-out infinite' }} />
          <ellipse cx="76" cy="92"  rx="7"  ry="4"  fill={moss} opacity="0.6"  style={{ animation: 'ec-moss-shimmer 4s ease-in-out infinite 1.5s' }} />
          <ellipse cx="50" cy="114" rx="10" ry="4"  fill={mossHi} opacity="0.5" style={{ animation: 'ec-moss-shimmer 3.5s ease-in-out infinite 0.5s' }} />
          <ellipse cx="36" cy="108" rx="5"  ry="3"  fill={mossHi} opacity="0.55" />
          <ellipse cx="64" cy="104" rx="4"  ry="3"  fill={moss} opacity="0.5" />

          {/* VINES wrapping torso */}
          <g style={{ animation: 'ec-vine-sway 6s ease-in-out infinite', transformOrigin: '20px 90px' }}>
            <path d="M20 72 Q14 82 16 94 Q12 106 18 114 Q22 118 24 116" fill="none" stroke={vine} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
            <path d="M16 84 Q10 88 12 94" fill="none" stroke={vine} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </g>
          <g style={{ animation: 'ec-vine-sway 6s ease-in-out infinite reverse', transformOrigin: '80px 90px' }}>
            <path d="M80 72 Q86 82 84 94 Q88 106 82 114 Q78 118 76 116" fill="none" stroke={vine} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
            <path d="M84 84 Q90 88 88 94" fill="none" stroke={vine} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </g>

          {/* SHOULDER BOULDERS */}
          <ellipse cx="12" cy="76" rx="14" ry="10" fill={stoneMid} />
          <ellipse cx="10" cy="74" rx="11" ry="8"  fill={stoneHi} opacity="0.4" />
          <ellipse cx="88" cy="76" rx="14" ry="10" fill={stoneMid} />
          <ellipse cx="90" cy="74" rx="11" ry="8"  fill={stoneHi} opacity="0.4" />
          {/* Rock spurs on shoulders */}
          <polygon points="2,72 6,62 10,72"  fill={stoneHi} opacity="0.85" />
          <polygon points="10,68 14,56 18,68" fill={stoneHi} />
          <polygon points="-2,78 2,70 6,78"  fill={stoneMid} opacity="0.9" />
          <polygon points="90,68 86,56 82,68" fill={stoneHi} />
          <polygon points="98,72 94,62 90,72" fill={stoneHi} opacity="0.85" />
          <polygon points="102,78 98,70 94,78" fill={stoneMid} opacity="0.9" />
          {/* Moss on shoulders */}
          <ellipse cx="12" cy="72" rx="6" ry="3" fill={mossHi} opacity="0.6" style={{ animation: 'ec-moss-shimmer 3s ease-in-out infinite 0.3s' }} />
          <ellipse cx="88" cy="72" rx="6" ry="3" fill={mossHi} opacity="0.6" style={{ animation: 'ec-moss-shimmer 3s ease-in-out infinite 1.8s' }} />

          {/* ARMS — giant boulder arms */}
          <g style={{ animation: 'ec-arm-l 5s ease-in-out infinite', transformOrigin: '12px 82px' }}>
            <rect x="0"  y="82" width="18" height="38" rx="6" fill="url(#ec-stone-front)" />
            <rect x="0"  y="82" width="18" height="10" rx="4" fill={stoneHi} opacity="0.4" />
            {/* Arm cracks */}
            <path d="M8 88 Q6 100 8 112" fill="none" stroke={stoneLo} strokeWidth="2" opacity="0.4" />
            <path d="M9 90 Q10 100 9 113" fill="none" stroke={crack} strokeWidth="1.2" opacity="0.5" style={{ animation: 'ec-crack-glow 3s ease-in-out infinite 0.8s' }} />
            {/* Arm moss */}
            <ellipse cx="6"  cy="94"  rx="5" ry="3" fill={moss} opacity="0.6" style={{ animation: 'ec-moss-shimmer 4s ease-in-out infinite 0.7s' }} />
            <ellipse cx="14" cy="108" rx="4" ry="2.5" fill={mossHi} opacity="0.5" />
            {/* Root wrapping arm */}
            <path d="M0 96 Q-4 106 0 114 Q2 118 4 116" fill="none" stroke={vine} strokeWidth="2.5" strokeLinecap="round" opacity="0.75" style={{ animation: 'ec-root-pulse 2.8s ease-in-out infinite 0.4s' }} />
          </g>
          <g style={{ animation: 'ec-arm-r 5s ease-in-out infinite', transformOrigin: '88px 82px' }}>
            <rect x="82" y="82" width="18" height="38" rx="6" fill="url(#ec-stone-front)" />
            <rect x="82" y="82" width="18" height="10" rx="4" fill={stoneHi} opacity="0.4" />
            <path d="M92 88 Q94 100 92 112" fill="none" stroke={stoneLo} strokeWidth="2" opacity="0.4" />
            <path d="M91 90 Q90 100 91 113" fill="none" stroke={crack} strokeWidth="1.2" opacity="0.5" style={{ animation: 'ec-crack-glow 3s ease-in-out infinite 1.4s' }} />
            <ellipse cx="94" cy="94"  rx="5" ry="3" fill={moss} opacity="0.6" style={{ animation: 'ec-moss-shimmer 4s ease-in-out infinite 2s' }} />
            <ellipse cx="86" cy="108" rx="4" ry="2.5" fill={mossHi} opacity="0.5" />
            <path d="M100 96 Q104 106 100 114 Q98 118 96 116" fill="none" stroke={vine} strokeWidth="2.5" strokeLinecap="round" opacity="0.75" style={{ animation: 'ec-root-pulse 2.8s ease-in-out infinite 1.6s' }} />
          </g>

          {/* BOULDER FISTS */}
          {/* Left fist */}
          <ellipse cx="9"  cy="122" rx="12" ry="10" fill={stoneMid} />
          <ellipse cx="7"  cy="120" rx="10" ry="8"  fill={stoneHi} opacity="0.4" />
          {/* Knuckle rocks */}
          <polygon points="-2,116 2,108 6,116"  fill={stoneHi} opacity="0.85" />
          <polygon points="6,114  10,106 14,114" fill={stoneHi} />
          <polygon points="14,116 18,108 22,116" fill={stoneHi} opacity="0.85" />
          {/* Green crack on fist */}
          <path d="M4 118 Q8 122 6 128" fill="none" stroke={crack} strokeWidth="1.5" opacity="0.7" style={{ animation: 'ec-crack-glow2 1.8s ease-in-out infinite' }} />
          {/* Fist moss */}
          <ellipse cx="4" cy="126" rx="4" ry="2.5" fill={moss} opacity="0.6" />
          {/* Root knuckles */}
          <path d="M-2 122 Q-6 128 -2 132" fill="none" stroke={vine} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <path d="M18 120 Q22 126 20 132" fill="none" stroke={vine} strokeWidth="2" strokeLinecap="round" opacity="0.7" />

          {/* Right fist */}
          <ellipse cx="91" cy="122" rx="12" ry="10" fill={stoneMid} />
          <ellipse cx="93" cy="120" rx="10" ry="8"  fill={stoneHi} opacity="0.4" />
          <polygon points="78,116 82,108 86,116"  fill={stoneHi} opacity="0.85" />
          <polygon points="86,114 90,106 94,114"  fill={stoneHi} />
          <polygon points="94,116 98,108 102,116" fill={stoneHi} opacity="0.85" />
          <path d="M96 118 Q92 122 94 128" fill="none" stroke={crack} strokeWidth="1.5" opacity="0.7" style={{ animation: 'ec-crack-glow2 1.8s ease-in-out infinite 0.9s' }} />
          <ellipse cx="96" cy="126" rx="4" ry="2.5" fill={moss} opacity="0.6" />
          <path d="M82 120 Q78 126 80 132"  fill="none" stroke={vine} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <path d="M102 122 Q106 128 104 132" fill="none" stroke={vine} strokeWidth="2" strokeLinecap="round" opacity="0.7" />

          {/* NECK — stone column with vine */}
          <rect x="38" y="60" width="24" height="14" rx="5" fill={stoneMid} />
          <rect x="38" y="60" width="24" height="6"  rx="3" fill={stoneHi} opacity="0.4" />
          <path d="M38 66 Q50 63 62 66" fill="none" stroke={vine} strokeWidth="2" opacity="0.6" />

          {/* HEAD — craggy boulder head */}
          <g id="ec-head">
            {/* Main head boulder */}
            <ellipse cx="50" cy="42" rx="26" ry="22" fill="url(#ec-stone-front)" />
            {/* Stone facet highlights */}
            <ellipse cx="44" cy="36" rx="18" ry="14" fill={stoneHi} opacity="0.2" />
            {/* Right dark facet */}
            <path d="M70 30 Q76 42 72 56 Q68 60 64 58 Q72 48 70 30Z" fill={stoneLo} opacity="0.5" />

            {/* Stone texture cracks on head */}
            <path d="M38 22 Q36 30 38 36 Q36 42 38 48" fill="none" stroke={stoneLo} strokeWidth="2" opacity="0.45" />
            <path d="M58 22 Q60 30 58 36 Q60 44 58 50"  fill="none" stroke={stoneLo} strokeWidth="2" opacity="0.45" />
            <path d="M32 38 Q40 34 50 36 Q60 34 68 38"  fill="none" stroke={stoneLo} strokeWidth="1.5" opacity="0.35" />

            {/* Glowing green fissures on head */}
            <g style={{ animation: 'ec-crack-glow 2.8s ease-in-out infinite 0.3s' }}>
              <path d="M44 22 Q42 30 44 38 Q42 46 44 54" fill="none" stroke={crack} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
              <path d="M56 22 Q58 30 56 38 Q58 46 56 54" fill="none" stroke={crack} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
              <path d="M36 40 Q42 36 50 38 Q58 36 64 40"  fill="none" stroke={crack} strokeWidth="1" strokeLinecap="round" opacity="0.65" />
            </g>
            {/* Crack glow on head */}
            <path d="M44 22 Q42 30 44 38 Q42 46 44 54" fill="none" stroke={crackGlo} strokeWidth="5" strokeLinecap="round" opacity="0.1" />

            {/* MOSSY CROWN on top of head */}
            <ellipse cx="50" cy="20" rx="18" ry="7" fill={moss} opacity="0.75" style={{ animation: 'ec-moss-shimmer 3s ease-in-out infinite' }} />
            <ellipse cx="50" cy="18" rx="14" ry="5" fill={mossHi} opacity="0.65" />
            {/* Rock protrusions through moss crown */}
            <polygon points="38,20 42,10 46,20" fill={stoneHi} opacity="0.8" />
            <polygon points="46,18 50,6  54,18"  fill={stoneHi} />
            <polygon points="54,20 58,10 62,20" fill={stoneHi} opacity="0.8" />
            {/* Moss on rock spires */}
            <ellipse cx="42" cy="14" rx="3" ry="2" fill={mossHi} opacity="0.6" />
            <ellipse cx="50" cy="10" rx="3.5" ry="2" fill={mossHi} opacity="0.7" />
            <ellipse cx="58" cy="14" rx="3" ry="2" fill={mossHi} opacity="0.6" />

            {/* Vines draping over head */}
            <path d="M28 30 Q22 38 24 48" fill="none" stroke={vine} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" style={{ animation: 'ec-vine-sway 7s ease-in-out infinite', transformOrigin: '28px 30px' }} />
            <path d="M70 32 Q76 40 74 50" fill="none" stroke={vine} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" style={{ animation: 'ec-vine-sway 7s ease-in-out infinite reverse', transformOrigin: '70px 32px' }} />

            {/* EYES — deep-set glowing green */}
            <g style={{ animation: 'ec-eye-pulse 2s ease-in-out infinite' }}>
              {/* Eye sockets — deep recessed */}
              <ellipse cx="38" cy="42" rx="9" ry="7"   fill={stoneLo} />
              <ellipse cx="62" cy="42" rx="9" ry="7"   fill={stoneLo} />
              {/* Glow halos */}
              <ellipse cx="38" cy="42" rx="10" ry="8"  fill="url(#ec-eye-glow-g)" />
              <ellipse cx="62" cy="42" rx="10" ry="8"  fill="url(#ec-eye-glow-g)" />
              {/* Iris glow */}
              <ellipse cx="38" cy="42" rx="6" ry="5"   fill={crack} opacity="0.7" />
              <ellipse cx="62" cy="42" rx="6" ry="5"   fill={crack} opacity="0.7" />
              {/* Bright core */}
              <ellipse cx="38" cy="42" rx="3.5" ry="3" fill={eyeCol} opacity="0.95" />
              <ellipse cx="62" cy="42" rx="3.5" ry="3" fill={eyeCol} opacity="0.95" />
              {/* White specular */}
              <ellipse cx="36" cy="40" rx="1.5" ry="1" fill="#ffffff" opacity="0.8" />
              <ellipse cx="60" cy="40" rx="1.5" ry="1" fill="#ffffff" opacity="0.8" />
              {/* Glow rings */}
              <ellipse cx="38" cy="42" rx="8" ry="6.5" fill="none" stroke={crack} strokeWidth="1.5" opacity="0.5" />
              <ellipse cx="62" cy="42" rx="8" ry="6.5" fill="none" stroke={crack} strokeWidth="1.5" opacity="0.5" />
            </g>

            {/* Nose — flat stone ridge with nostril crevices */}
            <path d="M46 50 Q50 54 54 50" fill="none" stroke={stoneLo} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            <ellipse cx="47" cy="52" rx="2.5" ry="2" fill={stoneLo} opacity="0.6" />
            <ellipse cx="53" cy="52" rx="2.5" ry="2" fill={stoneLo} opacity="0.6" />

            {/* MOUTH — wide crevice with jagged stone teeth + inner glow */}
            <path d="M32 56 Q50 65 68 56" fill={stoneLo} />
            {/* Upper stone teeth */}
            <polygon points="36,56 39,52 42,56" fill={stoneHi} opacity="0.9" />
            <polygon points="44,57 47,53 50,57" fill={stoneHi} opacity="0.9" />
            <polygon points="50,57 53,53 56,57" fill={stoneHi} opacity="0.9" />
            <polygon points="58,56 61,52 64,56" fill={stoneHi} opacity="0.9" />
            {/* Lower teeth */}
            <polygon points="38,64 41,60 44,64" fill={stoneHi} opacity="0.8" />
            <polygon points="48,65 51,61 54,65" fill={stoneHi} opacity="0.8" />
            <polygon points="57,64 60,60 63,64" fill={stoneHi} opacity="0.8" />
            {/* Inner mouth green energy glow */}
            <ellipse cx="50" cy="60" rx="12" ry="5" fill={crack} opacity="0.2" style={{ animation: 'ec-crack-glow 2.5s ease-in-out infinite' }} />
          </g>
        </g>
      </svg>
    </>
  );
}
