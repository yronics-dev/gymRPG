import React from 'react';

export default function ShadowWraith({ size = 180, rage = false }) {
  const w = size * (100 / 160);
  const h = size;

  const css = `
    @keyframes sw-float {
      0%,100% { transform: translateY(0px); }
      50%      { transform: translateY(-8px); }
    }
    @keyframes sw-cloak-billow {
      0%,100% { transform: skewX(0deg) scaleX(1); }
      30%      { transform: skewX(-2deg) scaleX(1.03); }
      65%      { transform: skewX(2deg) scaleX(0.98); }
    }
    @keyframes sw-arm-l {
      0%,100% { transform: rotate(-8deg) translateY(0px); }
      50%      { transform: rotate(10deg) translateY(-4px); }
    }
    @keyframes sw-arm-r {
      0%,100% { transform: rotate(8deg) translateY(0px); }
      50%      { transform: rotate(-10deg) translateY(-4px); }
    }
    @keyframes sw-wisp-rise {
      0%   { transform: translateY(0px) scaleX(1);   opacity: 0.8; }
      100% { transform: translateY(-22px) scaleX(0); opacity: 0; }
    }
    @keyframes sw-wisp-rise2 {
      0%   { transform: translateY(0px) scaleX(1);    opacity: 0.6; }
      100% { transform: translateY(-18px) scaleX(0);  opacity: 0; }
    }
    @keyframes sw-wisp-rise3 {
      0%   { transform: translateY(0px) scaleX(1);    opacity: 0.5; }
      100% { transform: translateY(-25px) scaleX(0);  opacity: 0; }
    }
    @keyframes sw-eye-scream {
      0%,100% { transform: scaleY(1); opacity: 1; }
      45%      { transform: scaleY(0.3); opacity: 0.6; }
      55%      { transform: scaleY(1.1); opacity: 1; }
    }
    @keyframes sw-mouth-pulse {
      0%,100% { transform: scaleY(1) scaleX(1); }
      40%      { transform: scaleY(1.15) scaleX(1.05); }
      70%      { transform: scaleY(0.9) scaleX(0.97); }
    }
    @keyframes sw-energy-spin {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes sw-shadow-pulse {
      0%,100% { opacity: 0.45; transform: scaleX(1); }
      50%      { opacity: 0.2;  transform: scaleX(0.85); }
    }
    @keyframes sw-orb-pulse {
      0%,100% { opacity: 0.8; r: 3; }
      50%      { opacity: 0.3; r: 2; }
    }
  `;

  const purple     = '#c084fc';
  const deepPurple = '#3d1a6e';
  const dark       = '#1a0a2e';
  const void_      = '#06020f';
  const eyeCol     = rage ? '#ffffff' : '#e0aaff';
  const glowStr    = rage ? 0.9 : 0.6;

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
          {/* Cloak gradient — dark at top, fully transparent at bottom */}
          <linearGradient id="sw-cloak-g" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor={deepPurple} stopOpacity="1" />
            <stop offset="60%"  stopColor="#1e0640"    stopOpacity="0.9" />
            <stop offset="100%" stopColor={void_}      stopOpacity="0" />
          </linearGradient>
          <radialGradient id="sw-face-g" cx="50%" cy="45%" r="55%">
            <stop offset="0%"   stopColor="#2a1040" />
            <stop offset="100%" stopColor={void_} />
          </radialGradient>
          <radialGradient id="sw-glow-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={purple} stopOpacity="0.3" />
            <stop offset="100%" stopColor={purple} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sw-shadow-pool" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#3d1a6e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06020f" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Shadow pool on ground */}
        <ellipse cx="50" cy="155" rx="30" ry="8" fill="url(#sw-shadow-pool)"
          style={{ animation: 'sw-shadow-pulse 3.5s ease-in-out infinite' }} />

        {/* ── SMOKE WISPS rising from bottom (cloak hem) ── */}
        <g opacity="0.75">
          <ellipse cx="36" cy="140" rx="5" ry="10" fill={deepPurple}
            style={{ animation: 'sw-wisp-rise 2.8s ease-out infinite', transformOrigin: '36px 150px' }} />
          <ellipse cx="50" cy="143" rx="6" ry="12" fill="#2a1050"
            style={{ animation: 'sw-wisp-rise2 3.4s ease-out infinite 0.6s', transformOrigin: '50px 155px' }} />
          <ellipse cx="64" cy="140" rx="5" ry="10" fill={deepPurple}
            style={{ animation: 'sw-wisp-rise3 3s ease-out infinite 1.2s', transformOrigin: '64px 150px' }} />
          <ellipse cx="28" cy="136" rx="3.5" ry="8" fill="#1a0840"
            style={{ animation: 'sw-wisp-rise 3.8s ease-out infinite 0.9s', transformOrigin: '28px 144px' }} />
          <ellipse cx="72" cy="136" rx="3.5" ry="8" fill="#1a0840"
            style={{ animation: 'sw-wisp-rise2 2.6s ease-out infinite 1.8s', transformOrigin: '72px 144px' }} />
        </g>

        {/* ── ENTIRE BODY FLOATS ── */}
        <g style={{ animation: 'sw-float 4s ease-in-out infinite', transformOrigin: '50px 100px' }}>

          {/* ── CLOAK BODY — billowing tattered robe ── */}
          <g style={{ animation: 'sw-cloak-billow 5s ease-in-out infinite', transformOrigin: '50px 100px' }}>
            {/* Main cloak mass */}
            <path d="M22 68 Q14 90 10 115 Q12 135 22 142 Q36 150 50 148 Q64 150 78 142 Q88 135 90 115 Q86 90 78 68 Q64 60 50 60 Q36 60 22 68Z"
              fill="url(#sw-cloak-g)" />

            {/* Tattered hem tears — ragged bottom edge */}
            <path d="M10 115 Q16 130 14 142 Q20 136 22 142" fill={void_} opacity="0.8" />
            <path d="M90 115 Q84 130 86 142 Q80 136 78 142" fill={void_} opacity="0.8" />
            <path d="M30 147 Q34 138 36 148 Q40 140 42 148 Q46 136 50 148 Q54 140 56 148 Q60 138 62 147 Q66 136 70 144"
              fill="none" stroke={void_} strokeWidth="3" strokeLinecap="round" />

            {/* Cloak interior shadow */}
            <ellipse cx="50" cy="108" rx="28" ry="34" fill={void_} opacity="0.55" />

            {/* Cloak highlight — left light catch */}
            <path d="M22 68 Q18 85 16 105 Q18 95 26 80 Q32 68 38 64"
              fill={deepPurple} opacity="0.5" />

            {/* Purple energy wisps off cloak edges */}
            <ellipse cx="12" cy="96"  rx="4" ry="10" fill={deepPurple} opacity="0.4"
              style={{ animation: 'sw-wisp-rise 3.5s ease-out infinite 0.4s', transformOrigin: '12px 106px' }} />
            <ellipse cx="88" cy="96"  rx="4" ry="10" fill={deepPurple} opacity="0.4"
              style={{ animation: 'sw-wisp-rise2 3.1s ease-out infinite 1.1s', transformOrigin: '88px 106px' }} />
          </g>

          {/* ── LONG REACHING ARMS ── */}
          {/* Left arm — long bony, reaching forward */}
          <g style={{ animation: 'sw-arm-l 4s ease-in-out infinite', transformOrigin: '26px 80px' }}>
            {/* Upper arm */}
            <path d="M26 80 Q10 96 4 116" fill="none" stroke={deepPurple} strokeWidth="7" strokeLinecap="round" />
            <path d="M26 80 Q10 96 4 116" fill="none" stroke="#2a0a50" strokeWidth="4.5" strokeLinecap="round" />
            {/* Forearm */}
            <path d="M4 116 Q-4 130 -2 144" fill="none" stroke={deepPurple} strokeWidth="5" strokeLinecap="round" />
            <path d="M4 116 Q-4 130 -2 144" fill="none" stroke="#2a0a50" strokeWidth="3" strokeLinecap="round" />
            {/* Claw hand */}
            <ellipse cx="-2" cy="144" rx="6" ry="5" fill="#1e0840" />
            {/* 4 long curving claw fingers */}
            <path d="M-6 143 Q-14 148 -12 156" fill="none" stroke={deepPurple} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M-2 146 Q-8 152 -6 160"  fill="none" stroke={deepPurple} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M4 145  Q2 152  4 160"   fill="none" stroke={deepPurple} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M8 142  Q14 148 14 156"  fill="none" stroke={deepPurple} strokeWidth="2.5" strokeLinecap="round" />
            {/* Claw tips */}
            <polygon points="-13,156 -11,162 -9,156"  fill={purple} opacity="0.8" />
            <polygon points="-7,160  -5,166 -3,160"   fill={purple} opacity="0.8" />
            <polygon points="3,160   5,166  7,160"    fill={purple} opacity="0.8" />
            <polygon points="13,156  15,162 17,156"   fill={purple} opacity="0.8" />
            {/* Energy wisps off arm */}
            <ellipse cx="4" cy="120" rx="3" ry="6" fill={purple} opacity="0.2"
              style={{ animation: 'sw-wisp-rise 2.4s ease-out infinite 0.5s', transformOrigin: '4px 126px' }} />
          </g>

          {/* Right arm */}
          <g style={{ animation: 'sw-arm-r 4s ease-in-out infinite', transformOrigin: '74px 80px' }}>
            <path d="M74 80 Q90 96 96 116" fill="none" stroke={deepPurple} strokeWidth="7" strokeLinecap="round" />
            <path d="M74 80 Q90 96 96 116" fill="none" stroke="#2a0a50" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M96 116 Q104 130 102 144" fill="none" stroke={deepPurple} strokeWidth="5" strokeLinecap="round" />
            <path d="M96 116 Q104 130 102 144" fill="none" stroke="#2a0a50" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="102" cy="144" rx="6" ry="5" fill="#1e0840" />
            <path d="M98 142  Q90 148  92 156"  fill="none" stroke={deepPurple} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M102 146 Q108 152 106 160" fill="none" stroke={deepPurple} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M106 145 Q114 151 112 160" fill="none" stroke={deepPurple} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M108 142 Q116 148 114 156" fill="none" stroke={deepPurple} strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="91,156  93,162  95,156"  fill={purple} opacity="0.8" />
            <polygon points="105,160 107,166 109,160" fill={purple} opacity="0.8" />
            <polygon points="111,160 113,166 115,160" fill={purple} opacity="0.8" />
            <polygon points="113,156 115,162 117,156" fill={purple} opacity="0.8" />
            <ellipse cx="96" cy="120" rx="3" ry="6" fill={purple} opacity="0.2"
              style={{ animation: 'sw-wisp-rise2 2.4s ease-out infinite 1s', transformOrigin: '96px 126px' }} />
          </g>

          {/* ── GLOW HALO behind head ── */}
          <ellipse cx="50" cy="40" rx="28" ry="22" fill="url(#sw-glow-halo)" />
          <ellipse cx="50" cy="40" rx="20" ry="16" fill="url(#sw-glow-halo)" opacity="0.6" />

          {/* ── HEAD — hollow skull-like wraith face ── */}
          <g id="sw-head">
            {/* Skull mass — dark, translucent */}
            <ellipse cx="50" cy="40" rx="24" ry="26" fill="url(#sw-face-g)" />
            <ellipse cx="50" cy="38" rx="22" ry="23" fill={dark} opacity="0.7" />

            {/* Hood shadow over top of head */}
            <path d="M26 30 Q50 18 74 30 Q66 24 50 22 Q34 24 26 30Z" fill={void_} opacity="0.6" />

            {/* Cheekbone structure — subtle ridges */}
            <path d="M30 46 Q34 42 38 46" fill="none" stroke={deepPurple} strokeWidth="1.5" opacity="0.5" />
            <path d="M62 46 Q66 42 70 46" fill="none" stroke={deepPurple} strokeWidth="1.5" opacity="0.5" />

            {/* Hollow EYES — dark pits with purple glow from within */}
            <g style={{ animation: 'sw-eye-scream 3.5s ease-in-out infinite' }}>
              {/* Left eye pit */}
              <ellipse cx="38" cy="38" rx="9" ry="8" fill={void_} />
              <ellipse cx="38" cy="38" rx="7" ry="6" fill="#0e0020" />
              {/* Inner glow */}
              <ellipse cx="38" cy="38" rx="5" ry="4" fill={eyeCol} opacity={glowStr} />
              <ellipse cx="38" cy="38" rx="3" ry="2.5" fill="#ffffff" opacity="0.85" />
              {/* Glow bloom rings */}
              <ellipse cx="38" cy="38" rx="8"  ry="7"  fill="none" stroke={purple} strokeWidth="1.5" opacity="0.5" />
              <ellipse cx="38" cy="38" rx="11" ry="9"  fill="none" stroke={purple} strokeWidth="0.8" opacity="0.25" />

              {/* Right eye pit */}
              <ellipse cx="62" cy="38" rx="9" ry="8" fill={void_} />
              <ellipse cx="62" cy="38" rx="7" ry="6" fill="#0e0020" />
              <ellipse cx="62" cy="38" rx="5" ry="4" fill={eyeCol} opacity={glowStr} />
              <ellipse cx="62" cy="38" rx="3" ry="2.5" fill="#ffffff" opacity="0.85" />
              <ellipse cx="62" cy="38" rx="8"  ry="7"  fill="none" stroke={purple} strokeWidth="1.5" opacity="0.5" />
              <ellipse cx="62" cy="38" rx="11" ry="9"  fill="none" stroke={purple} strokeWidth="0.8" opacity="0.25" />
            </g>

            {/* Nose cavity — just two dark slits */}
            <ellipse cx="47" cy="50" rx="2.5" ry="3" fill={void_} opacity="0.8" />
            <ellipse cx="53" cy="50" rx="2.5" ry="3" fill={void_} opacity="0.8" />

            {/* SCREAMING MOUTH — wide open hollow O */}
            <g style={{ animation: 'sw-mouth-pulse 3.5s ease-in-out infinite', transformOrigin: '50px 60px' }}>
              {/* Outer mouth opening */}
              <ellipse cx="50" cy="60" rx="14" ry="10" fill={void_} />
              {/* Inner mouth glow */}
              <ellipse cx="50" cy="60" rx="11" ry="8"  fill="#0e0020" />
              <ellipse cx="50" cy="60" rx="8"  ry="5.5" fill={deepPurple} opacity="0.7" />
              <ellipse cx="50" cy="60" rx="5"  ry="3.5" fill={purple}     opacity="0.4" />
              {/* Teeth — ragged upper and lower */}
              {/* Upper teeth */}
              <polygon points="38,50 41,50 40,54" fill="#e8e0f0" opacity="0.9" />
              <polygon points="44,49 47,49 46,53" fill="#e8e0f0" opacity="0.9" />
              <polygon points="50,49 53,49 52,53" fill="#e8e0f0" opacity="0.9" />
              <polygon points="56,49 59,50 57,54" fill="#e8e0f0" opacity="0.9" />
              {/* Lower teeth */}
              <polygon points="40,70 42,66 44,70" fill="#e8e0f0" opacity="0.8" />
              <polygon points="47,71 49,67 51,71" fill="#e8e0f0" opacity="0.8" />
              <polygon points="56,70 58,66 60,70" fill="#e8e0f0" opacity="0.8" />
              {/* Purple tongue / inner energy */}
              <ellipse cx="50" cy="63" rx="4" ry="2.5" fill={purple} opacity="0.5" />
            </g>

            {/* Skull cracks / fissure lines */}
            <path d="M50 22 Q47 30 50 36" fill="none" stroke={purple} strokeWidth="1" opacity="0.4" />
            <path d="M32 34 Q36 40 34 46" fill="none" stroke={deepPurple} strokeWidth="1" opacity="0.35" />
            <path d="M66 34 Q64 40 66 46" fill="none" stroke={deepPurple} strokeWidth="1" opacity="0.35" />

            {/* Purple energy orbs orbiting the head */}
            <g style={{ animation: 'sw-energy-spin 8s linear infinite', transformOrigin: '50px 40px' }}>
              <circle cx="76" cy="40" r="3" fill={purple} opacity="0.7" />
              <circle cx="24" cy="40" r="2" fill={purple} opacity="0.5" />
            </g>
            <g style={{ animation: 'sw-energy-spin 12s linear infinite reverse', transformOrigin: '50px 40px' }}>
              <circle cx="50" cy="14" r="2.5" fill={purple} opacity="0.6" />
              <circle cx="50" cy="66" r="1.5" fill={purple} opacity="0.4" />
            </g>
          </g>
        </g>
      </svg>
    </>
  );
}
