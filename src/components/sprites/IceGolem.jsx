import React from 'react';

export default function IceGolem({ size = 180, rage = false }) {
  const w = size * (100 / 160);
  const h = size;

  const css = `
    @keyframes ig-stomp {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      25%      { transform: translateY(-2px) rotate(-1deg); }
      75%      { transform: translateY(-1px) rotate(1deg); }
    }
    @keyframes ig-arm-l {
      0%,100% { transform: rotate(-6deg); }
      50%      { transform: rotate(4deg); }
    }
    @keyframes ig-arm-r {
      0%,100% { transform: rotate(6deg); }
      50%      { transform: rotate(-4deg); }
    }
    @keyframes ig-glow-pulse {
      0%,100% { opacity: 0.55; }
      50%      { opacity: 1; }
    }
    @keyframes ig-crack-shimmer {
      0%,100% { opacity: 0.5; }
      40%      { opacity: 0.9; }
      70%      { opacity: 0.3; }
    }
    @keyframes ig-frost-drift {
      0%   { transform: translate(0px, 0px)   opacity: 1;   }
      100% { transform: translate(-6px,-18px); opacity: 0; }
    }
    @keyframes ig-frost-drift2 {
      0%   { transform: translate(0px, 0px)   opacity: 0.8; }
      100% { transform: translate(5px, -20px); opacity: 0; }
    }
    @keyframes ig-frost-drift3 {
      0%   { transform: translate(0px, 0px)   opacity: 0.6; }
      100% { transform: translate(-3px,-16px); opacity: 0; }
    }
    @keyframes ig-eye-flicker {
      0%,100% { opacity: 1; }
      30%      { opacity: 0.6; }
      60%      { opacity: 0.9; }
    }
  `;

  // Ice palette
  const outer  = '#cce8ff';  // pale outer ice
  const mid    = '#7ab8e8';  // mid blue
  const deep   = '#2a5a8c';  // deep ice
  const shadow = '#0e2a4a';  // darkest inner
  const crack  = '#0a1a3a';  // crack lines
  const glow   = rage ? '#ffffff' : '#aaddff'; // eye / inner glow
  const eyeCol = rage ? '#ffffff' : '#c8eeff';

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
          {/* Ice crystal gradient — light face, dark interior */}
          <linearGradient id="ig-face" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor={outer} />
            <stop offset="45%"  stopColor={mid} />
            <stop offset="100%" stopColor={shadow} />
          </linearGradient>
          <linearGradient id="ig-side" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={shadow} />
            <stop offset="100%" stopColor={mid} />
          </linearGradient>
          <linearGradient id="ig-top" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor={outer} />
            <stop offset="100%" stopColor={mid} />
          </linearGradient>
          <radialGradient id="ig-inner-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={glow}    stopOpacity="0.5" />
            <stop offset="100%" stopColor={glow}    stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="50" cy="157" rx="28" ry="5" fill="#0a1a2a" opacity="0.5" />

        {/* ── FROST PARTICLES (floating up) ── */}
        <g opacity="0.7">
          <polygon points="24,120 26,115 28,120 26,125" fill={glow} style={{ animation: 'ig-frost-drift 3.2s ease-in infinite' }} opacity="0.6" />
          <polygon points="72,108 74,103 76,108 74,113" fill={glow} style={{ animation: 'ig-frost-drift2 2.6s ease-in infinite 0.8s' }} opacity="0.5" />
          <polygon points="48,62 50,57 52,62 50,67"    fill={glow} style={{ animation: 'ig-frost-drift3 3.8s ease-in infinite 1.5s' }} opacity="0.4" />
          <polygon points="18,90 20,86 22,90 20,94"    fill={outer} style={{ animation: 'ig-frost-drift 4.1s ease-in infinite 2s' }} opacity="0.35" />
          <polygon points="78,85 80,81 82,85 80,89"    fill={outer} style={{ animation: 'ig-frost-drift2 3.5s ease-in infinite 0.3s' }} opacity="0.35" />
        </g>

        {/* ── MAIN BODY (slow stomp sway) ── */}
        <g style={{ animation: 'ig-stomp 4.5s ease-in-out infinite', transformOrigin: '50px 148px' }}>

          {/* LEGS — thick ice pillar stumps */}
          {/* Left leg */}
          <polygon points="25,122 38,122 40,148 23,148" fill="url(#ig-face)" />
          <polygon points="25,122 38,122 38,128 25,128" fill={outer} opacity="0.6" />
          {/* Left foot crystal */}
          <polygon points="20,148 42,148 45,156 18,156" fill={mid} />
          <polygon points="20,148 42,148 40,152 22,152" fill={outer} opacity="0.5" />
          {/* Ice spike on toe */}
          <polygon points="24,156 27,148 30,156" fill={outer} opacity="0.8" />
          <polygon points="36,156 39,148 42,156" fill={outer} opacity="0.8" />

          {/* Right leg */}
          <polygon points="62,122 75,122 77,148 60,148" fill="url(#ig-face)" />
          <polygon points="62,122 75,122 75,128 62,128" fill={outer} opacity="0.6" />
          {/* Right foot crystal */}
          <polygon points="58,148 80,148 82,156 55,156" fill={mid} />
          <polygon points="58,148 80,148 78,152 60,152" fill={outer} opacity="0.5" />
          <polygon points="62,156 65,148 68,156" fill={outer} opacity="0.8" />
          <polygon points="74,156 77,148 80,156" fill={outer} opacity="0.8" />

          {/* TORSO — massive blocky crystal slab */}
          {/* Main face */}
          <polygon points="16,72 84,72 80,124 20,124" fill="url(#ig-face)" />
          {/* Top bevel */}
          <polygon points="16,72 84,72 80,78 20,78" fill={outer} opacity="0.7" />
          {/* Right side bevel (dark) */}
          <polygon points="84,72 80,124 86,120 90,70" fill={shadow} opacity="0.6" />
          {/* Left side bevel */}
          <polygon points="16,72 20,124 14,120 10,70" fill={mid} opacity="0.4" />

          {/* Inner glow */}
          <ellipse cx="50" cy="98" rx="26" ry="22" fill="url(#ig-inner-glow)" />

          {/* ICE CRACK LINES on torso */}
          <g style={{ animation: 'ig-crack-shimmer 3s ease-in-out infinite' }}>
            <path d="M30 78 Q28 88 32 98 Q30 108 32 120" fill="none" stroke={crack} strokeWidth="1.5" opacity="0.7" />
            <path d="M50 74 Q47 84 50 94 Q48 104 50 118" fill="none" stroke={crack} strokeWidth="2"   opacity="0.7" />
            <path d="M68 78 Q70 89 67 99 Q70 110 68 122" fill="none" stroke={crack} strokeWidth="1.5" opacity="0.7" />
            <path d="M36 96 Q42 90 50 94 Q58 98 64 92"   fill="none" stroke={crack} strokeWidth="1"   opacity="0.5" />
            <path d="M32 108 Q40 103 48 107 Q56 111 66 106" fill="none" stroke={crack} strokeWidth="1" opacity="0.5" />
          </g>
          {/* Soft inner glow along cracks */}
          <path d="M50 74 Q47 84 50 94 Q48 104 50 118" fill="none" stroke={glow} strokeWidth="4" opacity="0.12" />

          {/* SHOULDER CRYSTAL SPIKES — left */}
          <polygon points="6,72  16,80  10,72"  fill={outer}  />
          <polygon points="0,68  16,76  8,68"   fill={mid}   opacity="0.9" />
          <polygon points="-4,62 16,72  4,63"   fill={outer}  opacity="0.7" />
          <polygon points="2,78  16,84  8,80"   fill={outer}  opacity="0.6" />
          {/* Shoulder spikes — right */}
          <polygon points="94,72  84,80  90,72"  fill={outer} />
          <polygon points="100,68 84,76  92,68"  fill={mid}  opacity="0.9" />
          <polygon points="104,62 84,72  96,63"  fill={outer} opacity="0.7" />
          <polygon points="98,78  84,84  92,80"  fill={outer} opacity="0.6" />

          {/* ARMS — massive crystal blocks */}
          {/* Left arm */}
          <g style={{ animation: 'ig-arm-l 4.5s ease-in-out infinite', transformOrigin: '18px 80px' }}>
            <polygon points="4,80 20,78 22,118 6,120" fill="url(#ig-face)" />
            <polygon points="4,80 20,78 20,86 4,88"   fill={outer} opacity="0.6" />
            <polygon points="20,78 22,118 26,116 24,76" fill={shadow} opacity="0.5" />
            {/* Left fist */}
            <polygon points="0,118 24,116 26,132 -2,134" fill={mid} />
            <polygon points="0,118 24,116 24,124 0,126" fill={outer} opacity="0.55" />
            {/* Knuckle spikes */}
            <polygon points="2,118 6,110 10,118"  fill={outer} opacity="0.9" />
            <polygon points="12,116 16,108 20,116" fill={outer} opacity="0.9" />
            {/* Arm crack */}
            <path d="M12 84 Q10 96 12 110" fill="none" stroke={crack} strokeWidth="1.2" opacity="0.6" style={{ animation: 'ig-crack-shimmer 3.6s ease-in-out infinite 0.5s' }} />
          </g>

          {/* Right arm */}
          <g style={{ animation: 'ig-arm-r 4.5s ease-in-out infinite', transformOrigin: '82px 80px' }}>
            <polygon points="80,78 96,80 94,120 78,118" fill="url(#ig-face)" />
            <polygon points="80,78 96,80 96,88 80,86"   fill={outer} opacity="0.6" />
            <polygon points="80,78 78,118 74,116 76,76"  fill={mid} opacity="0.35" />
            {/* Right fist */}
            <polygon points="76,116 100,118 102,134 74,132" fill={mid} />
            <polygon points="76,116 100,118 100,126 76,124" fill={outer} opacity="0.55" />
            {/* Knuckle spikes */}
            <polygon points="80,116 84,108 88,116"  fill={outer} opacity="0.9" />
            <polygon points="90,118 94,110 98,118"  fill={outer} opacity="0.9" />
            {/* Arm crack */}
            <path d="M88 84 Q90 96 88 110" fill="none" stroke={crack} strokeWidth="1.2" opacity="0.6" style={{ animation: 'ig-crack-shimmer 3.6s ease-in-out infinite 1.2s' }} />
          </g>

          {/* NECK — short thick crystal column */}
          <polygon points="38,60 62,60 60,72 40,72" fill={mid} />
          <polygon points="38,60 62,60 62,65 38,65" fill={outer} opacity="0.6" />

          {/* HEAD — geometric crystal facets */}
          <g id="ig-head">
            {/* Main head block — slightly trapezoidal */}
            <polygon points="26,28 74,28 70,62 30,62" fill="url(#ig-face)" />
            {/* Top bevel */}
            <polygon points="26,28 74,28 72,34 28,34" fill={outer} opacity="0.75" />
            {/* Right dark facet */}
            <polygon points="74,28 70,62 76,58 80,26" fill={shadow} opacity="0.55" />
            {/* Left lighter facet */}
            <polygon points="26,28 30,62 24,58 20,26" fill={mid} opacity="0.35" />

            {/* Inner head glow */}
            <ellipse cx="50" cy="44" rx="18" ry="14" fill="url(#ig-inner-glow)" />

            {/* Head crack lines */}
            <g style={{ animation: 'ig-crack-shimmer 2.8s ease-in-out infinite 0.4s' }}>
              <path d="M40 30 Q38 38 40 46 Q38 54 40 62" fill="none" stroke={crack} strokeWidth="1.5" opacity="0.65" />
              <path d="M60 30 Q62 38 60 46 Q62 54 60 62" fill="none" stroke={crack} strokeWidth="1.5" opacity="0.65" />
              <path d="M34 44 Q42 40 50 43 Q58 46 66 42" fill="none" stroke={crack} strokeWidth="1"   opacity="0.5"  />
            </g>

            {/* CROWN CRYSTAL SPIKES on top of head */}
            <polygon points="34,28 38,12 42,28" fill={outer}  />
            <polygon points="34,28 38,12 38,22" fill={mid}   opacity="0.6" />

            <polygon points="44,28 50,8  56,28" fill={outer}  />
            <polygon points="44,28 50,8  50,20" fill={mid}   opacity="0.6" />
            {/* Center spike — tallest */}

            <polygon points="54,28 62,12 66,28" fill={outer} />
            <polygon points="54,28 62,12 62,22" fill={mid}  opacity="0.6" />

            {/* Frost glow between spikes */}
            <ellipse cx="50" cy="24" rx="14" ry="5" fill={glow} opacity="0.18" style={{ animation: 'ig-glow-pulse 2.4s ease-in-out infinite' }} />

            {/* EYES — glowing ice-blue, no pupils (golem) */}
            <g style={{ animation: 'ig-eye-flicker 2.2s ease-in-out infinite' }}>
              {/* Eye sockets */}
              <ellipse cx="39" cy="44" rx="8" ry="6" fill={shadow} />
              <ellipse cx="61" cy="44" rx="8" ry="6" fill={shadow} />
              {/* Glow fill */}
              <ellipse cx="39" cy="44" rx="6" ry="4.5" fill={eyeCol} />
              <ellipse cx="61" cy="44" rx="6" ry="4.5" fill={eyeCol} />
              {/* Inner bright core */}
              <ellipse cx="39" cy="44" rx="3.5" ry="2.5" fill="#ffffff" opacity="0.9" />
              <ellipse cx="61" cy="44" rx="3.5" ry="2.5" fill="#ffffff" opacity="0.9" />
              {/* Outer glow ring */}
              <ellipse cx="39" cy="44" rx="7.5" ry="5.5" fill="none" stroke={glow} strokeWidth="1.8" opacity="0.7" />
              <ellipse cx="61" cy="44" rx="7.5" ry="5.5" fill="none" stroke={glow} strokeWidth="1.8" opacity="0.7" />
              {/* Second glow ring (bloom) */}
              <ellipse cx="39" cy="44" rx="9.5" ry="7"   fill="none" stroke={glow} strokeWidth="1"   opacity="0.3" />
              <ellipse cx="61" cy="44" rx="9.5" ry="7"   fill="none" stroke={glow} strokeWidth="1"   opacity="0.3" />
            </g>

            {/* MOUTH — straight grim crack */}
            <path d="M36 55 Q50 58 64 55" fill="none" stroke={crack} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M38 55 Q50 57 62 55" fill="none" stroke={mid}   strokeWidth="1"   strokeLinecap="round" opacity="0.4" />
            {/* Tiny ice teeth */}
            <polygon points="40,55 42,52 44,55" fill={outer} opacity="0.7" />
            <polygon points="47,56 49,53 51,56" fill={outer} opacity="0.7" />
            <polygon points="56,55 58,52 60,55" fill={outer} opacity="0.7" />
          </g>
        </g>
      </svg>
    </>
  );
}
