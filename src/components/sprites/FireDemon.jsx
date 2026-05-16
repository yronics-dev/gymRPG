import React from 'react';

export default function FireDemon({ size = 180, rage = false }) {
  const w = size * (100 / 160);
  const h = size;

  const css = `
    @keyframes fd-body-breathe {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-4px); }
    }
    @keyframes fd-tail-whip {
      0%, 100% { transform: rotate(-10deg); }
      45%      { transform: rotate(20deg); }
      75%      { transform: rotate(-16deg); }
    }
    @keyframes fd-crack-a {
      0%,100% { opacity:1; }   20% { opacity:0.3; }
      50%     { opacity:0.9; } 75% { opacity:0.5; }
    }
    @keyframes fd-crack-b {
      0%,100% { opacity:0.6; } 30% { opacity:1; }
      60%     { opacity:0.2; } 85% { opacity:0.9; }
    }
    @keyframes fd-flame-lick {
      0%,100% { transform: scaleY(1)   scaleX(1);    }
      35%     { transform: scaleY(1.3) scaleX(0.82); }
      65%     { transform: scaleY(0.8) scaleX(1.1);  }
    }
    @keyframes fd-eye-glow {
      0%,100% { opacity:1; }
      50%     { opacity:0.6; }
    }
    @keyframes fd-wing-l {
      0%,100% { transform: rotate(-5deg); }
      50%     { transform: rotate(4deg);  }
    }
    @keyframes fd-wing-r {
      0%,100% { transform: rotate(5deg);  }
      50%     { transform: rotate(-4deg); }
    }
    @keyframes fd-arm-l {
      0%,100% { transform: rotate(-5deg); }
      50%     { transform: rotate(5deg);  }
    }
    @keyframes fd-arm-r {
      0%,100% { transform: rotate(5deg);  }
      50%     { transform: rotate(-5deg); }
    }
  `;

  const ec = rage ? '#ffffff' : '#ff7700';   // eye colour
  const cc = rage ? '#ffcc00' : '#ff4400';   // crack colour
  const ga = rage ? 0.9 : 0.65;              // glow alpha

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
          <radialGradient id="fd-tg" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#a82020" />
            <stop offset="100%" stopColor="#3c0800" />
          </radialGradient>
          <radialGradient id="fd-pec" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#922020" />
            <stop offset="100%" stopColor="#600e0e" />
          </radialGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="50" cy="157" rx="24" ry="4" fill="#000" opacity="0.45" />

        {/* ── TAIL ── */}
        <g style={{ animation: 'fd-tail-whip 2.7s ease-in-out infinite', transformOrigin: '40px 128px' }}>
          <path d="M40 128 Q22 138 16 151 Q12 159 20 155 Q26 151 28 144 Q32 137 40 131"
            fill="none" stroke="#4a0800" strokeWidth="6" strokeLinecap="round" />
          <path d="M40 128 Q22 138 16 151 Q12 159 20 155 Q26 151 28 144 Q32 137 40 131"
            fill="none" stroke="#7a1010" strokeWidth="3.5" strokeLinecap="round" />
          {/* arrowhead */}
          <polygon points="11,158 19,151 23,159 15,157" fill="#cc2200" />
        </g>

        {/* ── WINGS ── */}
        <g style={{ animation: 'fd-wing-l 3.1s ease-in-out infinite', transformOrigin: '28px 82px' }}>
          <path d="M28 82 Q2 52 0 26 Q8 34 12 46 Q16 58 24 70 Q26 75 28 79" fill="#2c0500" />
          <path d="M28 82 Q6 58 6 38 Q12 44 15 56 Q20 66 26 76" fill="#3e0800" />
          <path d="M28 82 Q8 60 2 34" fill="none" stroke="#300500" strokeWidth="1.5" opacity="0.6" />
          <path d="M28 79 Q10 64 6 46" fill="none" stroke="#300500" strokeWidth="1" opacity="0.4" />
          <polygon points="0,25 5,33 9,28" fill="#6e0e0e" />
        </g>
        <g style={{ animation: 'fd-wing-r 3.1s ease-in-out infinite', transformOrigin: '72px 82px' }}>
          <path d="M72 82 Q98 52 100 26 Q92 34 88 46 Q84 58 76 70 Q74 75 72 79" fill="#2c0500" />
          <path d="M72 82 Q94 58 94 38 Q88 44 85 56 Q80 66 74 76" fill="#3e0800" />
          <path d="M72 82 Q92 60 98 34" fill="none" stroke="#300500" strokeWidth="1.5" opacity="0.6" />
          <path d="M72 79 Q90 64 94 46" fill="none" stroke="#300500" strokeWidth="1" opacity="0.4" />
          <polygon points="100,25 95,33 91,28" fill="#6e0e0e" />
        </g>

        {/* ── MAIN BODY (breathe) ── */}
        <g style={{ animation: 'fd-body-breathe 3.7s ease-in-out infinite', transformOrigin: '50px 104px' }}>

          {/* Legs */}
          <rect x="28" y="122" width="18" height="26" rx="5" fill="#5a0e0e" />
          <rect x="28" y="122" width="18" height="12" rx="3" fill="#7a1414" />
          <ellipse cx="37" cy="149" rx="12" ry="5" fill="#380700" />
          <ellipse cx="32" cy="150" rx="5" ry="3.5" fill="#240400" />
          <ellipse cx="42" cy="150" rx="5" ry="3.5" fill="#240400" />
          <polygon points="28,134 21,126 30,130" fill="#cc2200" />  {/* knee spike */}

          <rect x="54" y="122" width="18" height="26" rx="5" fill="#5a0e0e" />
          <rect x="54" y="122" width="18" height="12" rx="3" fill="#7a1414" />
          <ellipse cx="63" cy="149" rx="12" ry="5" fill="#380700" />
          <ellipse cx="58" cy="150" rx="5" ry="3.5" fill="#240400" />
          <ellipse cx="68" cy="150" rx="5" ry="3.5" fill="#240400" />
          <polygon points="72,134 79,126 70,130" fill="#cc2200" />

          {/* Torso */}
          <rect x="20" y="72" width="60" height="54" rx="10" fill="url(#fd-tg)" />
          <ellipse cx="38" cy="89" rx="13" ry="11" fill="url(#fd-pec)" />
          <ellipse cx="62" cy="89" rx="13" ry="11" fill="url(#fd-pec)" />
          <rect x="47" y="76" width="6" height="46" rx="3" fill="#3a0800" opacity="0.45" />
          <ellipse cx="50" cy="108" rx="9" ry="6" fill="#5a0e0e" />
          <ellipse cx="50" cy="119" rx="7" ry="4" fill="#4a0a0a" />
          {/* Shoulder spikes */}
          <polygon points="20,80 8,66 22,75" fill="#cc2200" />
          <polygon points="19,73 7,61 20,68" fill="#991500" />
          <polygon points="80,80 92,66 78,75" fill="#cc2200" />
          <polygon points="81,73 93,61 80,68" fill="#991500" />

          {/* Lava cracks */}
          <g style={{ animation: 'fd-crack-a 0.8s steps(2) infinite' }}>
            <path d="M35 76 Q33 85 36 93 Q33 101 35 110" fill="none" stroke={cc} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M50 74 Q48 83 51 91 Q49 99 52 108 Q50 115 51 121" fill="none" stroke={cc} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M65 76 Q67 85 64 93 Q67 101 65 110" fill="none" stroke={cc} strokeWidth="1.8" strokeLinecap="round" />
          </g>
          <g style={{ animation: 'fd-crack-b 1.2s steps(2) infinite' }}>
            <path d="M40 98 Q45 94 50 97 Q55 100 60 96" fill="none" stroke={cc} strokeWidth="1.2" strokeLinecap="round" />
          </g>
          {/* Glow beneath */}
          <path d="M50 74 Q48 83 51 91 Q49 99 52 108" fill="none" stroke="#ff4400" strokeWidth="5" strokeLinecap="round" opacity="0.13" />
          <path d="M35 76 Q33 85 36 93 Q33 101 35 110" fill="none" stroke="#ff4400" strokeWidth="4" strokeLinecap="round" opacity="0.1" />

          {/* Arms */}
          <g style={{ animation: 'fd-arm-l 3.7s ease-in-out infinite', transformOrigin: '22px 82px' }}>
            <rect x="8" y="80" width="16" height="40" rx="6" fill="#5a0e0e" />
            <rect x="8" y="80" width="16" height="22" rx="5" fill="#7a1414" />
            <path d="M15 90 Q13 100 15 112" fill="none" stroke={cc} strokeWidth="1.2" opacity="0.6" style={{ animation: 'fd-crack-a 1.3s steps(2) infinite' }} />
          </g>
          <g style={{ animation: 'fd-arm-r 3.7s ease-in-out infinite', transformOrigin: '78px 82px' }}>
            <rect x="76" y="80" width="16" height="40" rx="6" fill="#5a0e0e" />
            <rect x="76" y="80" width="16" height="22" rx="5" fill="#7a1414" />
            <path d="M85 90 Q87 100 85 112" fill="none" stroke={cc} strokeWidth="1.2" opacity="0.6" style={{ animation: 'fd-crack-b 0.9s steps(2) infinite' }} />
          </g>

          {/* Clawed hands */}
          <ellipse cx="16" cy="122" rx="9" ry="7" fill="#4a0800" />
          <path d="M8 120 Q6 129 7 135"  fill="none" stroke="#3e0700" strokeWidth="5" strokeLinecap="round" />
          <path d="M16 124 Q15 133 15 139" fill="none" stroke="#3e0700" strokeWidth="5" strokeLinecap="round" />
          <path d="M24 120 Q26 129 25 135" fill="none" stroke="#3e0700" strokeWidth="5" strokeLinecap="round" />
          <polygon points="5,135 8,141 11,135"  fill="#cc2200" />
          <polygon points="13,139 16,145 19,139" fill="#cc2200" />
          <polygon points="23,135 26,141 29,135" fill="#cc2200" />

          <ellipse cx="84" cy="122" rx="9" ry="7" fill="#4a0800" />
          <path d="M76 120 Q74 129 75 135"  fill="none" stroke="#3e0700" strokeWidth="5" strokeLinecap="round" />
          <path d="M84 124 Q83 133 83 139"  fill="none" stroke="#3e0700" strokeWidth="5" strokeLinecap="round" />
          <path d="M92 120 Q94 129 93 135"  fill="none" stroke="#3e0700" strokeWidth="5" strokeLinecap="round" />
          <polygon points="73,135 76,141 79,135"  fill="#cc2200" />
          <polygon points="82,139 84,145 86,139"  fill="#cc2200" />
          <polygon points="91,135 94,141 97,135"  fill="#cc2200" />

          {/* Neck */}
          <rect x="41" y="63" width="18" height="13" rx="5" fill="#6a1010" />

          {/* HEAD */}
          <g id="fd-head">
            <rect x="28" y="34" width="44" height="34" rx="9" fill="#7e1414" />
            <rect x="26" y="48" width="48" height="9"  rx="3" fill="#4c0a0a" />
            <rect x="32" y="56" width="36" height="20" rx="7" fill="#641010" />
            <ellipse cx="50" cy="76" rx="14" ry="5.5" fill="#4c0a0a" />

            {/* Head cracks */}
            <path d="M50 36 Q47 42 50 49" fill="none" stroke={cc} strokeWidth="1.5" opacity="0.8"
              style={{ animation: 'fd-crack-a 0.75s steps(2) infinite' }} />
            <path d="M38 52 Q43 56 41 62" fill="none" stroke={cc} strokeWidth="1.2" opacity="0.6"
              style={{ animation: 'fd-crack-b 1.4s steps(2) infinite' }} />

            {/* ── HORNS — thick curved swept-up demon horns ── */}
            {/* Left horn: base near left brow, curves outward and upward */}
            <path d="M33 38 C22 28 14 14 18 2 C24 12 28 24 34 36" fill="#2e0500" />
            <path d="M33 38 C24 30 18 18 22 8  C26 16 30 26 34 36" fill="#6e1010" />
            <path d="M33 38 C26 32 22 22 24 12 C27 18 31 28 34 37" fill="#8a1818" opacity="0.5" />
            {/* Right horn */}
            <path d="M67 38 C78 28 86 14 82 2 C76 12 72 24 66 36" fill="#2e0500" />
            <path d="M67 38 C76 30 82 18 78 8  C74 16 70 26 66 36" fill="#6e1010" />
            <path d="M67 38 C74 32 78 22 76 12 C73 18 69 28 66 37" fill="#8a1818" opacity="0.5" />

            {/* ── FLAME TIPS — pointed flame polygons ── */}
            {/* Left flame — centred on horn tip ~(18,2) */}
            <g style={{ animation: 'fd-flame-lick 0.85s ease-in-out infinite', transformOrigin: '18px 2px' }}>
              {/* outer flame */}
              <path d="M18 4 L13 -4 L15 -12 L18 -17 L21 -12 L23 -4 Z" fill="#ff4400" opacity="0.95" />
              {/* mid flame */}
              <path d="M18 4 L14 -3 L16 -10 L18 -14 L20 -10 L22 -3 Z" fill="#ff7700" opacity="0.9" />
              {/* inner flame */}
              <path d="M18 4 L16 -1 L17 -8  L18 -11 L19 -8  L20 -1 Z" fill="#ffcc00" opacity="0.9" />
            </g>
            {/* Right flame — centred on horn tip ~(82,2) */}
            <g style={{ animation: 'fd-flame-lick 1.05s ease-in-out infinite reverse', transformOrigin: '82px 2px' }}>
              <path d="M82 4 L77 -4 L79 -12 L82 -17 L85 -12 L87 -4 Z" fill="#ff4400" opacity="0.95" />
              <path d="M82 4 L78 -3 L80 -10 L82 -14 L84 -10 L86 -3 Z" fill="#ff7700" opacity="0.9" />
              <path d="M82 4 L80 -1 L81 -8  L82 -11 L83 -8  L84 -1 Z" fill="#ffcc00" opacity="0.9" />
            </g>

            {/* EYES */}
            <g style={{ animation: 'fd-eye-glow 1.6s ease-in-out infinite' }}>
              <ellipse cx="40" cy="53" rx="7.5" ry="5.5" fill="#160100" />
              <ellipse cx="60" cy="53" rx="7.5" ry="5.5" fill="#160100" />
              <ellipse cx="40" cy="53" rx="5.5" ry="4"   fill={ec} />
              <ellipse cx="60" cy="53" rx="5.5" ry="4"   fill={ec} />
              <ellipse cx="40" cy="53" rx="1.5" ry="3.2" fill="#120000" />
              <ellipse cx="60" cy="53" rx="1.5" ry="3.2" fill="#120000" />
              <ellipse cx="40" cy="53" rx="7"   ry="5.2" fill="none" stroke={ec} strokeWidth="1.5" opacity={ga} />
              <ellipse cx="60" cy="53" rx="7"   ry="5.2" fill="none" stroke={ec} strokeWidth="1.5" opacity={ga} />
              <ellipse cx="38" cy="51" rx="1.5" ry="1"   fill="#ffe8cc" opacity="0.5" />
              <ellipse cx="58" cy="51" rx="1.5" ry="1"   fill="#ffe8cc" opacity="0.5" />
            </g>

            {/* Nostrils */}
            <ellipse cx="46" cy="63" rx="3.5" ry="2.5" fill="#360600" />
            <ellipse cx="54" cy="63" rx="3.5" ry="2.5" fill="#360600" />

            {/* Mouth + fangs */}
            <path d="M34 69 Q50 80 66 69" fill="#160100" />
            <polygon points="41,69 39,77 44,77" fill="#ddc898" />
            <polygon points="50,71 48,79 52,79" fill="#ddc898" />
            <polygon points="59,69 57,77 62,77" fill="#ddc898" />
            <ellipse cx="50" cy="73" rx="9" ry="3.5" fill="#ff3300" opacity="0.18" />
          </g>
        </g>
      </svg>
    </>
  );
}
