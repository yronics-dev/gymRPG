import React from 'react';

/* ═══════════════════════════════════════════════════════════════
   VAMPIRE LORD  —  Shadow element boss
   viewBox 0 0 100 160  |  aspect 5:8
   Body is split into named <g> groups so each part can be
   targeted independently for attack / hit / death animations.

   Animations (CSS keyframes injected once via <style>):
     vl-body-float  – whole-body slow vertical bob (idle)
     vl-cape-sway   – cape wings drift side-to-side
     vl-eye-pulse   – red eyes pulse / glow
═══════════════════════════════════════════════════════════════ */

const VL_CSS = `
  @keyframes vl-body-float {
    0%,100% { transform: translateY(0px);   }
    50%      { transform: translateY(-4px);  }
  }
  @keyframes vl-cape-sway {
    0%,100% { transform: rotate(0deg)   skewX(0deg);    }
    30%      { transform: rotate(-1.2deg) skewX(-0.6deg); }
    70%      { transform: rotate(1.2deg)  skewX(0.6deg);  }
  }
  @keyframes vl-eye-pulse {
    0%,100% { opacity: 0.85; filter: drop-shadow(0 0 3px #cc0000);  }
    50%      { opacity: 1;    filter: drop-shadow(0 0 10px #ff2200) drop-shadow(0 0 20px #cc0000); }
  }
`;

export default function VampireLord({ rage = false, size = 180 }) {
  const W = size * (100 / 160);   // maintain 5:8 aspect
  const eyeFill  = rage ? '#ffffff' : '#cc0000';
  const eyeGlow  = rage ? '#ff0000' : '#cc0000';

  return (
    <>
      <style>{VL_CSS}</style>

      <svg
        viewBox="0 0 100 160"
        width={W}
        height={size}
        style={{ overflow: 'visible', display: 'block' }}
      >
        {/* ── Ground shadow ────────────────────────── */}
        <ellipse cx="50" cy="157" rx="22" ry="4" fill="#000" opacity="0.35" />

        {/* ══════════════════════════════════════════
            CAPE  — rendered first so it sits behind
            everything. Has its own sway animation.
        ══════════════════════════════════════════ */}
        <g
          id="vl-cape"
          style={{
            animation: 'vl-cape-sway 5s ease-in-out infinite',
            transformOrigin: '50px 64px',
          }}
        >
          {/* Left wing — outer dark shell */}
          <path
            d="M36 64 Q24 96 16 148 Q28 156 40 152 Q34 116 38 96 Q40 80 36 64Z"
            fill="#1a0a0a"
          />
          {/* Left wing — inner blood-red lining */}
          <path
            d="M36 64 Q26 96 20 148 Q30 154 40 150 Q35 114 38 96Z"
            fill="#2d0808"
            opacity="0.65"
          />
          {/* Right wing — outer */}
          <path
            d="M64 64 Q76 96 84 148 Q72 156 60 152 Q66 116 62 96 Q60 80 64 64Z"
            fill="#1a0a0a"
          />
          {/* Right wing — inner lining */}
          <path
            d="M64 64 Q74 96 80 148 Q70 154 60 150 Q65 114 62 96Z"
            fill="#2d0808"
            opacity="0.65"
          />
        </g>

        {/* ══════════════════════════════════════════
            LEGS + FEET
        ══════════════════════════════════════════ */}
        <g
          id="vl-legs"
          style={{ animation: 'vl-body-float 4.5s ease-in-out infinite' }}
        >
          {/* Left trouser leg */}
          <rect x="40" y="110" width="10" height="40" rx="2" fill="#0d0914" />
          <rect x="41" y="111" width="6"  height="38" rx="1" fill="#14101e" />
          {/* Right trouser leg */}
          <rect x="50" y="110" width="10" height="40" rx="2" fill="#0d0914" />
          <rect x="51" y="111" width="6"  height="38" rx="1" fill="#14101e" />
          {/* Left shoe — pointed, elegant */}
          <rect x="37" y="148" width="16" height="8"  rx="3" fill="#0a0808" />
          <rect x="37" y="148" width="7"  height="4"  rx="1" fill="#1a1214" opacity="0.5" />
          {/* Right shoe */}
          <rect x="47" y="148" width="16" height="8"  rx="3" fill="#0a0808" />
          <rect x="47" y="148" width="7"  height="4"  rx="1" fill="#1a1214" opacity="0.5" />
        </g>

        {/* ══════════════════════════════════════════
            TORSO — dark formal suit
        ══════════════════════════════════════════ */}
        <g
          id="vl-torso"
          style={{ animation: 'vl-body-float 4.5s ease-in-out infinite' }}
        >
          {/* Suit body */}
          <rect x="36" y="64" width="28" height="48" rx="3" fill="#14101a" />
          <rect x="37" y="65" width="26" height="46" rx="2" fill="#1c1528" />
          {/* Left lapel */}
          <polygon points="50,70 37,86 40,112 46,112 46,82" fill="#0d0914" />
          {/* Right lapel */}
          <polygon points="50,70 63,86 60,112 54,112 54,82" fill="#0d0914" />
          {/* White shirt strip between lapels */}
          <rect x="47" y="70" width="6" height="18" rx="0" fill="#1e1830" />
          {/* Cravat / bow-tie — blood red */}
          <polygon points="50,70 46,74 50,79 54,74" fill="#660000" />
          <polygon points="50,70 46,74 50,79 54,74" fill="#880000" opacity="0.5" />
          {/* Three suit buttons */}
          <ellipse cx="50" cy="85"  rx="1.2" ry="1.2" fill="#2a1e3a" />
          <ellipse cx="50" cy="92"  rx="1.2" ry="1.2" fill="#2a1e3a" />
          <ellipse cx="50" cy="99"  rx="1.2" ry="1.2" fill="#2a1e3a" />
          {/* Belt / suit waist line */}
          <rect x="36" y="109" width="28" height="3" rx="1" fill="#0d0914" />
          <rect x="47" y="108" width="6"  height="5" rx="1" fill="#2a1e3a" />
        </g>

        {/* ══════════════════════════════════════════
            LEFT ARM
        ══════════════════════════════════════════ */}
        <g
          id="vl-arm-left"
          style={{ animation: 'vl-body-float 4.5s ease-in-out infinite 0.1s' }}
        >
          <rect x="22" y="68" width="15" height="46" rx="5" fill="#14101a" />
          <rect x="23" y="69" width="12" height="43" rx="4" fill="#1c1528" />
          {/* Sleeve cuff */}
          <rect x="22" y="110" width="15" height="5" rx="2" fill="#0d0914" />
          <rect x="23" y="110" width="9"  height="2" rx="1" fill="#2a1e3a" />
        </g>

        {/* ══════════════════════════════════════════
            RIGHT ARM
        ══════════════════════════════════════════ */}
        <g
          id="vl-arm-right"
          style={{ animation: 'vl-body-float 4.5s ease-in-out infinite 0.2s' }}
        >
          <rect x="63" y="68" width="15" height="46" rx="5" fill="#14101a" />
          <rect x="64" y="69" width="12" height="43" rx="4" fill="#1c1528" />
          {/* Sleeve cuff */}
          <rect x="63" y="110" width="15" height="5" rx="2" fill="#0d0914" />
          <rect x="65" y="110" width="9"  height="2" rx="1" fill="#2a1e3a" />
        </g>

        {/* ══════════════════════════════════════════
            LEFT HAND — raised, clawed
        ══════════════════════════════════════════ */}
        <g
          id="vl-hand-left"
          style={{ animation: 'vl-body-float 4.5s ease-in-out infinite 0.1s' }}
        >
          {/* Palm */}
          <rect x="21" y="112" width="16" height="14" rx="3" fill="#e0cdb5" />
          {/* Claw fingers */}
          <rect x="22"   y="124" width="3" height="8"  rx="1.5" fill="#d4c0a8" />
          <rect x="26"   y="124" width="3" height="9"  rx="1.5" fill="#d4c0a8" />
          <rect x="30"   y="124" width="3" height="8"  rx="1.5" fill="#d4c0a8" />
          {/* Talon tips */}
          <polygon points="22,132 25,132 23.5,138" fill="#7a6050" />
          <polygon points="26,133 29,133 27.5,140" fill="#7a6050" />
          <polygon points="30,132 33,132 31.5,138" fill="#7a6050" />
          {/* Knuckle lines */}
          <rect x="22" y="116" width="14" height="1" rx="0.5" fill="#c8a88a" opacity="0.4" />
        </g>

        {/* ══════════════════════════════════════════
            RIGHT HAND — raised, clawed
        ══════════════════════════════════════════ */}
        <g
          id="vl-hand-right"
          style={{ animation: 'vl-body-float 4.5s ease-in-out infinite 0.2s' }}
        >
          {/* Palm */}
          <rect x="63" y="112" width="16" height="14" rx="3" fill="#e0cdb5" />
          {/* Claw fingers */}
          <rect x="63"   y="124" width="3" height="8"  rx="1.5" fill="#d4c0a8" />
          <rect x="67"   y="124" width="3" height="9"  rx="1.5" fill="#d4c0a8" />
          <rect x="71"   y="124" width="3" height="8"  rx="1.5" fill="#d4c0a8" />
          {/* Talon tips */}
          <polygon points="63,132 66,132 64.5,138" fill="#7a6050" />
          <polygon points="67,133 70,133 68.5,140" fill="#7a6050" />
          <polygon points="71,132 74,132 72.5,138" fill="#7a6050" />
          <rect x="64" y="116" width="14" height="1" rx="0.5" fill="#c8a88a" opacity="0.4" />
        </g>

        {/* ══════════════════════════════════════════
            HIGH COLLAR — the most iconic vampire feature.
            Two sharp wings flanking the face, rising tall.
        ══════════════════════════════════════════ */}
        <g id="vl-collar">
          {/* Left wing: base at chest, tip high left of face */}
          <path d="M36 64 L37 32 L22 8 L28 64Z" fill="#1a0a0a" />
          {/* Left collar edge highlight */}
          <path d="M37 32 L22 8" stroke="#2d1010" strokeWidth="1" fill="none" />
          {/* Left inner face */}
          <path d="M37 32 L38 46 L34 64" fill="#100606" opacity="0.7" />

          {/* Right wing: base at chest, tip high right of face */}
          <path d="M64 64 L63 32 L78 8 L72 64Z" fill="#1a0a0a" />
          <path d="M63 32 L78 8" stroke="#2d1010" strokeWidth="1" fill="none" />
          <path d="M63 32 L62 46 L66 64" fill="#100606" opacity="0.7" />
        </g>

        {/* ══════════════════════════════════════════
            NECK
        ══════════════════════════════════════════ */}
        <g
          id="vl-neck"
          style={{ animation: 'vl-body-float 4.5s ease-in-out infinite' }}
        >
          <rect x="44" y="52" width="12" height="15" rx="3" fill="#e0cdb5" />
          {/* Neck shadow */}
          <rect x="44" y="62" width="12" height="5"  rx="2" fill="#c8a88a" opacity="0.4" />
        </g>

        {/* ══════════════════════════════════════════
            HEAD — hair + face (floats with body)
        ══════════════════════════════════════════ */}
        <g
          id="vl-head"
          style={{ animation: 'vl-body-float 4.5s ease-in-out infinite' }}
        >
          {/* ── HAIR (renders behind face) ── */}
          {/* Back hair mass — slightly larger than face */}
          <ellipse cx="50" cy="28" rx="19" ry="17" fill="#1a1a2a" />
          {/* Slicked side pieces */}
          <rect x="31" y="22" width="7" height="22" rx="2" fill="#1a1a2a" />
          <rect x="62" y="22" width="7" height="22" rx="2" fill="#1a1a2a" />
          {/* Hair sheen / highlight */}
          <rect x="43" y="12" width="14" height="5" rx="3" fill="#252535" />
          <rect x="45" y="12" width="8"  height="3" rx="2" fill="#2e2e42" opacity="0.7" />

          {/* ── FACE ── */}
          {/* Face oval — pale, gaunt */}
          <ellipse cx="50" cy="35" rx="16" ry="22" fill="#f0e6d3" />
          {/* Widow's peak — inverted V into hairline */}
          <polygon points="50,22 43,14 57,14" fill="#1a1a2a" />
          {/* Temple shadow (gaunt cheeks) */}
          <ellipse cx="34" cy="38" rx="4"  ry="6"  fill="#c8a88a" opacity="0.28" />
          <ellipse cx="66" cy="38" rx="4"  ry="6"  fill="#c8a88a" opacity="0.28" />
          {/* Cheekbone ridge */}
          <rect x="33" y="38" width="6" height="2" rx="1" fill="#c0967a" opacity="0.35" />
          <rect x="61" y="38" width="6" height="2" rx="1" fill="#c0967a" opacity="0.35" />

          {/* ── EYEBROWS — arched, severe ── */}
          <rect x="38" y="26" width="10" height="2.5" rx="1.2" fill="#1a1a2a"
            transform="rotate(-10 43 27)" />
          <rect x="52" y="26" width="10" height="2.5" rx="1.2" fill="#1a1a2a"
            transform="rotate(10 57 27)" />

          {/* ── NOSE — sharp, aquiline ── */}
          {/* Bridge */}
          <rect x="49" y="34" width="2"  height="8"  rx="1" fill="#c8a88a" opacity="0.5" />
          {/* Tip / nostrils */}
          <polygon points="50,44 46,48 54,48" fill="#c0967a" opacity="0.5" />
          <rect x="46" y="45" width="3"  height="3"  rx="1" fill="#b08870" opacity="0.4" />
          <rect x="51" y="45" width="3"  height="3"  rx="1" fill="#b08870" opacity="0.4" />

          {/* ── MOUTH — contemptuous sneer with fangs ── */}
          {/* Upper lip */}
          <path d="M43 51 Q47 49 50 51 Q53 49 57 51"
            stroke="#9a7060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Lower lip — subtle downward curve */}
          <path d="M44 51 Q50 55 56 51"
            stroke="#9a7060" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          {/* Fangs — prominent, long */}
          <rect x="47"   y="51" width="3" height="7" rx="1.5" fill="#f8f6f2" />
          <rect x="50.5" y="51" width="3" height="7" rx="1.5" fill="#f8f6f2" />
          {/* Fang shadow */}
          <rect x="48.5" y="51" width="1" height="7" rx="0.5" fill="#d4ccc0" opacity="0.5" />
          <rect x="52"   y="51" width="1" height="7" rx="0.5" fill="#d4ccc0" opacity="0.5" />
          {/* Drop of blood — detail */}
          <ellipse cx="49" cy="58" rx="1"   ry="1.5" fill="#880000" opacity="0.7" />
        </g>

        {/* ══════════════════════════════════════════
            EYES — separate layer, animated glow pulse
        ══════════════════════════════════════════ */}
        <g
          id="vl-eyes"
          style={{
            animation: 'vl-eye-pulse 2.5s ease-in-out infinite',
            transformOrigin: '50px 33px',
          }}
        >
          {/* Eye sockets — dark recesses */}
          <ellipse cx="43" cy="33" rx="6" ry="5" fill="#1a0606" />
          <ellipse cx="57" cy="33" rx="6" ry="5" fill="#1a0606" />
          {/* Irises — glowing red */}
          <ellipse cx="43" cy="33" rx="4.5" ry="4" fill={eyeFill} />
          <ellipse cx="57" cy="33" rx="4.5" ry="4" fill={eyeFill} />
          {/* Pupils — vertical slit */}
          <rect x="42" y="30" width="2" height="6" rx="1" fill="#220000" />
          <rect x="56" y="30" width="2" height="6" rx="1" fill="#220000" />
          {/* Glow halo */}
          <ellipse cx="43" cy="33" rx="6"   ry="5.5" fill={eyeGlow} opacity="0.35" />
          <ellipse cx="57" cy="33" rx="6"   ry="5.5" fill={eyeGlow} opacity="0.35" />
          {/* Bright highlight dot */}
          <ellipse cx="41" cy="31" rx="1.2" ry="1"   fill="#ff6666" opacity="0.9" />
          <ellipse cx="55" cy="31" rx="1.2" ry="1"   fill="#ff6666" opacity="0.9" />
        </g>

      </svg>
    </>
  );
}
