import React from 'react';

export default function ThunderTitan({ size = 180, rage = false }) {
  const w = size * (100 / 160);
  const h = size;

  const css = `
    @keyframes tt-stomp {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      20%      { transform: translateY(-3px) rotate(-1.5deg); }
      70%      { transform: translateY(-2px) rotate(1.5deg); }
    }
    @keyframes tt-arm-l {
      0%,100% { transform: rotate(-8deg); }
      50%      { transform: rotate(6deg); }
    }
    @keyframes tt-arm-r {
      0%,100% { transform: rotate(8deg); }
      50%      { transform: rotate(-6deg); }
    }
    @keyframes tt-lightning {
      0%,100% { opacity: 1;   d: path("M18 82 L24 75 L20 68 L28 61 L24 54 L30 48 L34 42"); }
      15%      { opacity: 0.2; }
      30%      { opacity: 0.9; d: path("M18 82 L22 76 L18 70 L26 63 L22 56 L28 50 L34 42"); }
      50%      { opacity: 0.4; }
      65%      { opacity: 1;   d: path("M18 82 L26 74 L21 67 L29 60 L25 53 L31 47 L34 42"); }
      80%      { opacity: 0.3; }
    }
    @keyframes tt-lightning-r {
      0%,100% { opacity: 0.8; }
      20%      { opacity: 0.2; }
      40%      { opacity: 1; }
      60%      { opacity: 0.3; }
      80%      { opacity: 0.9; }
    }
    @keyframes tt-spark {
      0%   { opacity: 1;   transform: translate(0,0)   scale(1); }
      100% { opacity: 0;   transform: translate(var(--tx), var(--ty)) scale(0.3); }
    }
    @keyframes tt-eye-glow {
      0%,100% { opacity: 1; }
      30%      { opacity: 0.5; }
      60%      { opacity: 0.9; }
    }
    @keyframes tt-fist-crackle {
      0%,100% { opacity: 0.9; transform: scale(1); }
      25%      { opacity: 0.4; transform: scale(0.85); }
      50%      { opacity: 1;   transform: scale(1.1); }
      75%      { opacity: 0.6; transform: scale(0.95); }
    }
    @keyframes tt-arc-main {
      0%,100% { opacity: 1; }
      10%      { opacity: 0; }
      20%      { opacity: 0.8; }
      35%      { opacity: 0.1; }
      50%      { opacity: 1; }
      65%      { opacity: 0.3; }
      80%      { opacity: 0.9; }
      90%      { opacity: 0.2; }
    }
    @keyframes tt-helm-glow {
      0%,100% { opacity: 0.6; }
      50%      { opacity: 1; }
    }
  `;

  const steel    = '#2c2c4a';
  const steelMid = '#3e3e62';
  const steelHi  = '#5a5a80';
  const steelLo  = '#18182e';
  const bolt     = '#ffe600';
  const boltHi   = '#ffffff';
  const boltGlow = rage ? '#ffffff' : '#fff176';
  const eyeCol   = rage ? '#ffffff' : '#ffe600';
  const glowA    = rage ? 1 : 0.75;

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
          <linearGradient id="tt-armor-front" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor={steelHi} />
            <stop offset="40%"  stopColor={steelMid} />
            <stop offset="100%" stopColor={steelLo} />
          </linearGradient>
          <linearGradient id="tt-armor-side" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={steelLo} />
            <stop offset="100%" stopColor={steelMid} />
          </linearGradient>
          <linearGradient id="tt-helm-front" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#606080" />
            <stop offset="50%"  stopColor={steelMid} />
            <stop offset="100%" stopColor={steelLo} />
          </linearGradient>
          <radialGradient id="tt-eye-glow-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={bolt}     stopOpacity="0.6" />
            <stop offset="100%" stopColor={bolt}     stopOpacity="0" />
          </radialGradient>
          <radialGradient id="tt-fist-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={boltGlow} stopOpacity="0.5" />
            <stop offset="100%" stopColor={boltGlow} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="50" cy="157" rx="30" ry="5.5" fill="#0a0a1a" opacity="0.55" />

        {/* ── BODY GROUP (stomp sway) ── */}
        <g style={{ animation: 'tt-stomp 3.8s ease-in-out infinite', transformOrigin: '50px 148px' }}>

          {/* LEGS — thick armored greaves */}
          {/* Left leg */}
          <rect x="24" y="118" width="20" height="28" rx="4" fill="url(#tt-armor-front)" />
          <rect x="24" y="118" width="20" height="8"  rx="2" fill={steelHi} opacity="0.5" />
          {/* Left sabaton (boot) */}
          <polygon points="20,146 46,146 48,156 18,156" fill={steelMid} />
          <polygon points="20,146 46,146 44,151 22,151" fill={steelHi} opacity="0.45" />
          {/* Knee cop */}
          <ellipse cx="34" cy="124" rx="10" ry="7" fill={steelMid} />
          <ellipse cx="34" cy="122" rx="8"  ry="5" fill={steelHi} opacity="0.4" />
          {/* Knee spike */}
          <polygon points="30,118 34,110 38,118" fill={steelHi} opacity="0.8" />

          {/* Right leg */}
          <rect x="56" y="118" width="20" height="28" rx="4" fill="url(#tt-armor-front)" />
          <rect x="56" y="118" width="20" height="8"  rx="2" fill={steelHi} opacity="0.5" />
          <polygon points="54,146 80,146 82,156 52,156" fill={steelMid} />
          <polygon points="54,146 80,146 78,151 56,151" fill={steelHi} opacity="0.45" />
          <ellipse cx="66" cy="124" rx="10" ry="7" fill={steelMid} />
          <ellipse cx="66" cy="122" rx="8"  ry="5" fill={steelHi} opacity="0.4" />
          <polygon points="62,118 66,110 70,118" fill={steelHi} opacity="0.8" />

          {/* TORSO — massive layered plate armor */}
          {/* Main chest plate */}
          <polygon points="14,72 86,72 82,120 18,120" fill="url(#tt-armor-front)" />
          {/* Top bevel */}
          <polygon points="14,72 86,72 84,78 16,78" fill={steelHi} opacity="0.5" />
          {/* Right shadow panel */}
          <polygon points="86,72 82,120 90,116 94,70" fill={steelLo} opacity="0.6" />
          {/* Left highlight panel */}
          <polygon points="14,72 18,120 10,116 6,70" fill={steelMid} opacity="0.35" />

          {/* Chest engravings — armor detailing */}
          {/* Pec plates */}
          <ellipse cx="36" cy="89" rx="14" ry="11" fill={steelMid} />
          <ellipse cx="64" cy="89" rx="14" ry="11" fill={steelMid} />
          <ellipse cx="36" cy="87" rx="11" ry="8"  fill={steelHi} opacity="0.35" />
          <ellipse cx="64" cy="87" rx="11" ry="8"  fill={steelHi} opacity="0.35" />
          {/* Center ridge breastplate */}
          <rect x="46" y="74" width="8" height="44" rx="3" fill={steelLo} opacity="0.5" />
          <rect x="47" y="74" width="4" height="44" rx="1" fill={steelHi} opacity="0.2" />
          {/* Abdominal plates — segmented */}
          <rect x="30" y="102" width="40" height="8"  rx="2" fill={steelLo} opacity="0.4" />
          <rect x="30" y="112" width="40" height="6"  rx="2" fill={steelLo} opacity="0.35" />
          {/* Rivet details */}
          <circle cx="22" cy="80" r="2" fill={steelLo} opacity="0.6" />
          <circle cx="78" cy="80" r="2" fill={steelLo} opacity="0.6" />
          <circle cx="22" cy="110" r="2" fill={steelLo} opacity="0.6" />
          <circle cx="78" cy="110" r="2" fill={steelLo} opacity="0.6" />

          {/* ── LIGHTNING ARC between shoulders ── */}
          <g style={{ animation: 'tt-arc-main 0.45s steps(2) infinite' }}>
            {/* Main arc */}
            <path d="M16 82 L22 75 L18 68 L26 61 L22 54 L28 48 L34 42"
              fill="none" stroke={boltHi} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
            <path d="M16 82 L22 75 L18 68 L26 61 L22 54 L28 48 L34 42"
              fill="none" stroke={bolt} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
            {/* Branch 1 */}
            <path d="M22 68 L16 62 L20 56" fill="none" stroke={boltHi} strokeWidth="1.5" opacity="0.7" />
            {/* Branch 2 */}
            <path d="M26 60 L32 56 L28 50" fill="none" stroke={boltHi} strokeWidth="1.5" opacity="0.6" />
          </g>
          <g style={{ animation: 'tt-arc-main 0.45s steps(2) infinite 0.22s' }}>
            {/* Right arc (mirror) */}
            <path d="M84 82 L78 75 L82 68 L74 61 L78 54 L72 48 L66 42"
              fill="none" stroke={boltHi} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
            <path d="M84 82 L78 75 L82 68 L74 61 L78 54 L72 48 L66 42"
              fill="none" stroke={bolt} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
            <path d="M78 68 L84 62 L80 56" fill="none" stroke={boltHi} strokeWidth="1.5" opacity="0.7" />
            <path d="M74 60 L68 56 L72 50" fill="none" stroke={boltHi} strokeWidth="1.5" opacity="0.6" />
          </g>

          {/* PAULDRONS — massive spiked shoulder guards */}
          {/* Left pauldron */}
          <ellipse cx="14" cy="78" rx="14" ry="10" fill={steelMid} />
          <ellipse cx="12" cy="76" rx="11" ry="8"  fill={steelHi} opacity="0.4" />
          {/* Left pauldron spikes */}
          <polygon points="4,72  8,60  12,72"  fill={steelHi} />
          <polygon points="12,70 16,58 20,70"  fill={steelHi} opacity="0.85" />
          <polygon points="-2,76 2,66  6,76"   fill={steelMid} opacity="0.9" />
          {/* Left pauldron side plate */}
          <rect x="2" y="78" width="12" height="22" rx="3" fill={steelMid} />
          <rect x="2" y="78" width="12" height="6"  rx="2" fill={steelHi} opacity="0.4" />

          {/* Right pauldron */}
          <ellipse cx="86" cy="78" rx="14" ry="10" fill={steelMid} />
          <ellipse cx="88" cy="76" rx="11" ry="8"  fill={steelHi} opacity="0.4" />
          <polygon points="96,72 92,60 88,72"  fill={steelHi} />
          <polygon points="88,70 84,58 80,70"  fill={steelHi} opacity="0.85" />
          <polygon points="102,76 98,66 94,76" fill={steelMid} opacity="0.9" />
          <rect x="86" y="78" width="12" height="22" rx="3" fill={steelMid} />
          <rect x="86" y="78" width="12" height="6"  rx="2" fill={steelHi} opacity="0.4" />

          {/* ARMS — thick armored vambraces */}
          <g style={{ animation: 'tt-arm-l 3.8s ease-in-out infinite', transformOrigin: '14px 82px' }}>
            <rect x="2"  y="98" width="16" height="34" rx="5" fill="url(#tt-armor-front)" />
            <rect x="2"  y="98" width="16" height="10" rx="3" fill={steelHi} opacity="0.4" />
            {/* Elbow cop */}
            <ellipse cx="10" cy="104" rx="8" ry="6" fill={steelMid} />
            <ellipse cx="10" cy="102" rx="6" ry="4" fill={steelHi} opacity="0.35" />
            {/* Vambrace ridge */}
            <rect x="9" y="108" width="3" height="22" rx="1" fill={steelHi} opacity="0.3" />
          </g>
          <g style={{ animation: 'tt-arm-r 3.8s ease-in-out infinite', transformOrigin: '86px 82px' }}>
            <rect x="82" y="98" width="16" height="34" rx="5" fill="url(#tt-armor-front)" />
            <rect x="82" y="98" width="16" height="10" rx="3" fill={steelHi} opacity="0.4" />
            <ellipse cx="90" cy="104" rx="8" ry="6" fill={steelMid} />
            <ellipse cx="90" cy="102" rx="6" ry="4" fill={steelHi} opacity="0.35" />
            <rect x="88" y="108" width="3" height="22" rx="1" fill={steelHi} opacity="0.3" />
          </g>

          {/* GAUNTLET FISTS with electricity crackling */}
          {/* Left fist */}
          <g style={{ animation: 'tt-fist-crackle 0.5s steps(2) infinite', transformOrigin: '10px 135px' }}>
            <rect x="2"  y="130" width="18" height="16" rx="5" fill={steelMid} />
            <rect x="2"  y="130" width="18" height="6"  rx="3" fill={steelHi} opacity="0.45" />
            {/* Electricity glow */}
            <ellipse cx="11" cy="138" rx="14" ry="10" fill="url(#tt-fist-glow)" />
            {/* Lightning sparks from fist */}
            <path d="M4 132 L0 126 L6 128"   fill="none" stroke={boltHi} strokeWidth="1.5" opacity="0.85" />
            <path d="M8 130 L4 122 L10 125"  fill="none" stroke={bolt}   strokeWidth="1.2" opacity="0.7" />
            <path d="M14 132 L10 124 L16 127" fill="none" stroke={boltHi} strokeWidth="1.5" opacity="0.8" />
            <path d="M18 134 L24 128 L20 124" fill="none" stroke={bolt}   strokeWidth="1.2" opacity="0.7" />
            {/* Knuckle plates */}
            <rect x="3"  y="130" width="4" height="4" rx="1" fill={steelHi} opacity="0.6" />
            <rect x="9"  y="130" width="4" height="4" rx="1" fill={steelHi} opacity="0.6" />
            <rect x="15" y="130" width="4" height="4" rx="1" fill={steelHi} opacity="0.6" />
          </g>
          {/* Right fist */}
          <g style={{ animation: 'tt-fist-crackle 0.5s steps(2) infinite 0.25s', transformOrigin: '90px 135px' }}>
            <rect x="80" y="130" width="18" height="16" rx="5" fill={steelMid} />
            <rect x="80" y="130" width="18" height="6"  rx="3" fill={steelHi} opacity="0.45" />
            <ellipse cx="89" cy="138" rx="14" ry="10" fill="url(#tt-fist-glow)" />
            <path d="M96 132 L100 126 L94 128"  fill="none" stroke={boltHi} strokeWidth="1.5" opacity="0.85" />
            <path d="M92 130 L96 122 L90 125"   fill="none" stroke={bolt}   strokeWidth="1.2" opacity="0.7" />
            <path d="M86 132 L90 124 L84 127"   fill="none" stroke={boltHi} strokeWidth="1.5" opacity="0.8" />
            <path d="M82 134 L76 128 L80 124"   fill="none" stroke={bolt}   strokeWidth="1.2" opacity="0.7" />
            <rect x="81" y="130" width="4" height="4" rx="1" fill={steelHi} opacity="0.6" />
            <rect x="87" y="130" width="4" height="4" rx="1" fill={steelHi} opacity="0.6" />
            <rect x="93" y="130" width="4" height="4" rx="1" fill={steelHi} opacity="0.6" />
          </g>

          {/* NECK gorget */}
          <rect x="38" y="62" width="24" height="14" rx="4" fill={steelMid} />
          <rect x="38" y="62" width="24" height="6"  rx="3" fill={steelHi} opacity="0.4" />

          {/* HEAD — HORNED HELMET */}
          <g id="tt-head">
            {/* Helmet base — great helm shape */}
            <rect x="24" y="28" width="52" height="38" rx="7" fill="url(#tt-helm-front)" />
            {/* Visor slit area */}
            <rect x="24" y="44" width="52" height="12" rx="0" fill={steelLo} opacity="0.7" />
            {/* Top helmet curve */}
            <ellipse cx="50" cy="28" rx="26" ry="8" fill={steelHi} opacity="0.5" />
            {/* Cheek guards */}
            <rect x="24" y="38" width="10" height="20" rx="3" fill={steelMid} opacity="0.8" />
            <rect x="66" y="38" width="10" height="20" rx="3" fill={steelMid} opacity="0.8" />
            {/* Rim of visor */}
            <rect x="24" y="44" width="52" height="3" rx="0" fill={steelHi} opacity="0.4" />
            <rect x="24" y="56" width="52" height="3" rx="0" fill={steelHi} opacity="0.3" />

            {/* ── HELMET HORNS ── */}
            {/* Left horn — thick sweeping outward */}
            <path d="M28 36 C18 26 10 14 14 4 C20 12 24 22 28 34" fill={steelLo} />
            <path d="M28 36 C20 28 14 18 18 8  C22 14 26 24 28 34" fill={steelMid} />
            <path d="M28 36 C22 30 18 22 20 12 C23 17 26 26 28 35" fill={steelHi} opacity="0.4" />
            {/* Right horn */}
            <path d="M72 36 C82 26 90 14 86 4 C80 12 76 22 72 34" fill={steelLo} />
            <path d="M72 36 C80 28 86 18 82 8  C78 14 74 24 72 34" fill={steelMid} />
            <path d="M72 36 C78 30 82 22 80 12 C77 17 74 26 72 35" fill={steelHi} opacity="0.4" />

            {/* ── LIGHTNING BOLT CREST on top of helmet ── */}
            <g style={{ animation: 'tt-helm-glow 1.2s ease-in-out infinite' }}>
              {/* Crest base */}
              <rect x="44" y="20" width="12" height="10" rx="2" fill={steelMid} />
              {/* Lightning bolt shape */}
              <polygon points="54,20 48,20 44,12 49,12 46,4 58,14 52,14" fill={bolt} />
              <polygon points="54,20 48,20 44,12 49,12 46,4 58,14 52,14" fill={boltHi} opacity="0.5" />
              {/* Glow behind bolt */}
              <ellipse cx="50" cy="12" rx="8" ry="9" fill={bolt} opacity="0.25"
                style={{ animation: 'tt-helm-glow 1.2s ease-in-out infinite' }} />
            </g>

            {/* EYES — glowing yellow slits through visor */}
            <g style={{ animation: 'tt-eye-glow 1.8s ease-in-out infinite' }}>
              {/* Eye glow halos (behind visor) */}
              <ellipse cx="38" cy="50" rx="10" ry="5" fill="url(#tt-eye-glow-g)" />
              <ellipse cx="62" cy="50" rx="10" ry="5" fill="url(#tt-eye-glow-g)" />
              {/* Visor eye slits */}
              <rect x="29" y="47" width="18" height="6" rx="3" fill={steelLo} />
              <rect x="53" y="47" width="18" height="6" rx="3" fill={steelLo} />
              {/* Glowing eye behind slit */}
              <rect x="30" y="48" width="16" height="4" rx="2" fill={eyeCol} opacity={glowA} />
              <rect x="54" y="48" width="16" height="4" rx="2" fill={eyeCol} opacity={glowA} />
              {/* Bright core */}
              <rect x="35" y="48.5" width="6" height="3" rx="1" fill={boltHi} opacity="0.9" />
              <rect x="59" y="48.5" width="6" height="3" rx="1" fill={boltHi} opacity="0.9" />
            </g>

            {/* Helmet engravings / rune lines */}
            <path d="M30 36 Q50 32 70 36" fill="none" stroke={steelHi} strokeWidth="1" opacity="0.3" />
            <path d="M28 40 Q50 36 72 40" fill="none" stroke={steelHi} strokeWidth="0.8" opacity="0.2" />
          </g>
        </g>
      </svg>
    </>
  );
}
