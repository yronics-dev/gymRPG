import React from 'react';

/* ═══════════════════════════════════════════════════════════════
   ZOMBIE BRUTE  —  Earth element mob
   viewBox 0 0 100 160  |  aspect 5:8
   Body parts split into named <g> groups.

   Animations:
     zb-sway      – whole-body lumbering side sway (idle)
     zb-arm-left  – left arm hangs, lags body
     zb-arm-right – right arm reaches, lags opposite phase
═══════════════════════════════════════════════════════════════ */

const ZB_CSS = `
  @keyframes zb-sway {
    0%,100% { transform: rotate(0deg)    translateX(0px);  }
    25%      { transform: rotate(-2.5deg) translateX(-4px); }
    75%      { transform: rotate(2.5deg)  translateX(4px);  }
  }
  @keyframes zb-arm-left {
    0%,100% { transform: rotate(0deg);  }
    30%      { transform: rotate(-5deg) translateX(-3px); }
    70%      { transform: rotate(4deg)  translateX(2px); }
  }
  @keyframes zb-arm-right {
    0%,100% { transform: rotate(0deg);  }
    30%      { transform: rotate(5deg)  translateX(3px); }
    70%      { transform: rotate(-4deg) translateX(-2px); }
  }
`;

export default function ZombieBrute({ rage = false, size = 180 }) {
  const W    = size * (100 / 160);
  const skin  = '#4a5a3a';
  const skinH = '#5c6e48';
  const rot   = '#323e24';
  const bone  = '#c8c8b0';
  const cloth = '#3d2b1a';

  return (
    <>
      <style>{ZB_CSS}</style>
      <svg
        viewBox="0 0 100 160"
        width={W}
        height={size}
        style={{ overflow: 'visible', display: 'block' }}
      >
        {/* Ground shadow — large, spread (heavy creature) */}
        <ellipse cx="50" cy="158" rx="28" ry="5" fill="#000" opacity="0.45" />

        {/* ══ Whole-body sway ══ */}
        <g style={{ animation: 'zb-sway 3.5s ease-in-out infinite', transformOrigin: '50px 148px' }}>

          {/* ── LEGS ──────────────────────────────── */}
          <g id="zb-legs">
            {/* Left leg */}
            <rect x="34" y="112" width="15" height="44" rx="4" fill={skin} />
            <rect x="35" y="113" width="10" height="40" rx="3" fill={skinH} opacity="0.35" />
            {/* Torn trouser patch */}
            <rect x="34" y="116" width="15" height="18" rx="2" fill={cloth} />
            <rect x="35" y="117" width="9"  height="14" rx="1" fill="#4a3522" opacity="0.6" />
            {/* Exposed skin strip below tear */}
            <rect x="34" y="133" width="15" height="5"  rx="1" fill={rot} opacity="0.5" />
            {/* Left boot / muddy foot */}
            <rect x="31" y="152" width="20" height="8"  rx="3" fill="#1e1608" />
            <rect x="32" y="153" width="11" height="4"  rx="1" fill="#2e2210" opacity="0.6" />
            <ellipse cx="38" cy="156" rx="5" ry="2" fill="#141008" opacity="0.55" />
            <ellipse cx="45" cy="157" rx="3" ry="1.5" fill="#0e0a04" opacity="0.4" />

            {/* Right leg */}
            <rect x="51" y="112" width="15" height="44" rx="4" fill={skin} />
            <rect x="52" y="113" width="10" height="40" rx="3" fill={skinH} opacity="0.35" />
            {/* Torn trouser */}
            <rect x="51" y="120" width="15" height="20" rx="2" fill={cloth} />
            <rect x="52" y="121" width="9"  height="16" rx="1" fill="#4a3522" opacity="0.6" />
            {/* Right muddy foot */}
            <rect x="49" y="152" width="20" height="8"  rx="3" fill="#1e1608" />
            <rect x="50" y="153" width="11" height="4"  rx="1" fill="#2e2210" opacity="0.6" />
            <ellipse cx="58" cy="156" rx="5" ry="2" fill="#141008" opacity="0.55" />
            <ellipse cx="63" cy="157" rx="4" ry="1.5" fill="#0e0a04" opacity="0.4" />
          </g>

          {/* ── TORSO — wide & hunched ─────────────── */}
          <g id="zb-torso">
            {/* Main body */}
            <rect x="22" y="58" width="56" height="56" rx="8" fill={skin} />
            <rect x="23" y="59" width="50" height="52" rx="7" fill={skinH} opacity="0.3" />

            {/* Torn shirt — left side cloth scraps */}
            <rect x="22" y="62" width="26" height="24" rx="4" fill={cloth} />
            <rect x="23" y="63" width="20" height="20" rx="3" fill="#4a3522" opacity="0.55" />
            {/* Right shoulder cloth */}
            <rect x="62" y="60" width="16" height="28" rx="3" fill={cloth} />
            <rect x="63" y="61" width="10" height="22" rx="2" fill="#4a3522" opacity="0.55" />
            {/* Hanging cloth strip at waist */}
            <rect x="26" y="104" width="8"  height="12" rx="2" fill={cloth} opacity="0.8" />
            <rect x="66" y="106" width="6"  height="10" rx="2" fill={cloth} opacity="0.7" />
            {/* Belt remains */}
            <rect x="22" y="108" width="56" height="6"  rx="2" fill="#1e1208" />
            <rect x="23" y="109" width="28" height="2"  rx="1" fill="#2e1c0e" opacity="0.7" />

            {/* ── EXPOSED RIBS — left side ── */}
            {/* Cavity / dark void behind ribs */}
            <rect x="25" y="66" width="22" height="38" rx="3" fill="#0e0c06" opacity="0.75" />
            {/* Five curved rib bones */}
            {[70, 76, 82, 88, 94].map((y, i) => (
              <React.Fragment key={y}>
                <path
                  d={`M27 ${y} Q36 ${y - 4} 44 ${y}`}
                  stroke={bone}
                  strokeWidth={i < 2 ? '2.5' : '2'}
                  fill="none"
                  strokeLinecap="round"
                  opacity={0.95 - i * 0.06}
                />
                {/* Shadow under each rib */}
                <path
                  d={`M27 ${y + 1} Q36 ${y - 2} 44 ${y + 1}`}
                  stroke="#000"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </React.Fragment>
            ))}
            {/* Cartilage / sternum fragment */}
            <rect x="44" y="68" width="3"  height="28" rx="1.5" fill={bone} opacity="0.5" />

            {/* Rot patches on exposed skin areas */}
            <ellipse cx="60" cy="76" rx="6"  ry="4"  fill={rot} opacity="0.55" />
            <ellipse cx="67" cy="92" rx="4"  ry="3"  fill={rot} opacity="0.45" />
            <ellipse cx="54" cy="100" rx="3" ry="2.5" fill={rot} opacity="0.4" />
            {/* Gash wound */}
            <path d="M55 70 Q62 66 70 70" stroke="#5a0000" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M56 70 Q62 67 69 70" stroke="#880000" strokeWidth="1" fill="none" strokeLinecap="round" />
          </g>

          {/* ── LEFT ARM — hangs down & slightly out ── */}
          <g
            id="zb-arm-left"
            style={{ animation: 'zb-arm-left 3.5s ease-in-out infinite', transformOrigin: '26px 66px' }}
          >
            <rect x="8"  y="62" width="20" height="50" rx="8" fill={skin} />
            <rect x="9"  y="63" width="14" height="44" rx="6" fill={skinH} opacity="0.3" />
            {/* Sleeve scrap */}
            <rect x="8"  y="66" width="20" height="18" rx="4" fill={cloth} />
            <rect x="9"  y="67" width="13" height="14" rx="3" fill="#4a3522" opacity="0.5" />
            {/* Arm rot patches */}
            <ellipse cx="16" cy="94" rx="4" ry="3" fill={rot} opacity="0.5" />
            <ellipse cx="19" cy="104" rx="3" ry="2" fill={rot} opacity="0.4" />
          </g>

          {/* ── LEFT HAND ─────────────────────────── */}
          <g id="zb-hand-left">
            <ellipse cx="18" cy="116" rx="12" ry="8" fill={skin} />
            {/* Drooping thick fingers */}
            <rect x="7"  y="122" width="5" height="13" rx="2.5" fill={skin} />
            <rect x="13" y="122" width="5" height="15" rx="2.5" fill={skin} />
            <rect x="19" y="122" width="5" height="15" rx="2.5" fill={skin} />
            <rect x="25" y="122" width="5" height="12" rx="2.5" fill={skin} />
            {/* Cracked dirty fingernails */}
            <rect x="7.5"  y="133" width="4" height="3" rx="1" fill="#7a6a4a" />
            <rect x="13.5" y="135" width="4" height="3" rx="1" fill="#7a6a4a" />
            <rect x="19.5" y="135" width="4" height="3" rx="1" fill="#7a6a4a" />
            <rect x="25.5" y="132" width="4" height="3" rx="1" fill="#7a6a4a" />
            {/* Knuckle rot */}
            <rect x="8"  y="120" width="22" height="2" rx="1" fill={rot} opacity="0.6" />
          </g>

          {/* ── RIGHT ARM — reaching forward ─────── */}
          <g
            id="zb-arm-right"
            style={{ animation: 'zb-arm-right 3.5s ease-in-out infinite', transformOrigin: '74px 66px' }}
          >
            <rect x="72" y="62" width="20" height="52" rx="8" fill={skin} />
            <rect x="73" y="63" width="14" height="46" rx="6" fill={skinH} opacity="0.3" />
            {/* Sleeve */}
            <rect x="72" y="68" width="20" height="20" rx="4" fill={cloth} />
            <rect x="73" y="69" width="13" height="16" rx="3" fill="#4a3522" opacity="0.5" />
            {/* Rot */}
            <ellipse cx="80" cy="96"  rx="4" ry="3" fill={rot} opacity="0.5" />
            <ellipse cx="83" cy="106" rx="3" ry="2" fill={rot} opacity="0.4" />
          </g>

          {/* ── RIGHT HAND ────────────────────────── */}
          <g id="zb-hand-right">
            <ellipse cx="82" cy="118" rx="12" ry="8" fill={skin} />
            {/* Reaching fingers — slightly longer */}
            <rect x="70" y="124" width="5" height="12" rx="2.5" fill={skin} />
            <rect x="76" y="124" width="5" height="16" rx="2.5" fill={skin} />
            <rect x="82" y="124" width="5" height="16" rx="2.5" fill={skin} />
            <rect x="88" y="124" width="5" height="13" rx="2.5" fill={skin} />
            {/* Nails */}
            <rect x="70.5" y="134" width="4" height="3" rx="1" fill="#7a6a4a" />
            <rect x="76.5" y="138" width="4" height="3" rx="1" fill="#7a6a4a" />
            <rect x="82.5" y="138" width="4" height="3" rx="1" fill="#7a6a4a" />
            <rect x="88.5" y="135" width="4" height="3" rx="1" fill="#7a6a4a" />
            <rect x="71"   y="122" width="22" height="2" rx="1" fill={rot} opacity="0.6" />
          </g>

          {/* ── NECK ─────────────────────────────── */}
          <g id="zb-neck">
            <rect x="42" y="50" width="16" height="12" rx="4" fill={skin} />
            <rect x="43" y="51" width="10" height="8"  rx="3" fill={skinH} opacity="0.3" />
            {/* Neck wound / bite mark */}
            <ellipse cx="48" cy="54" rx="3" ry="2" fill="#550000" opacity="0.7" />
            <ellipse cx="54" cy="53" rx="2" ry="1.5" fill="#550000" opacity="0.6" />
          </g>

          {/* ── HEAD — large, drooping, decayed ────── */}
          <g id="zb-head">
            {/* Matted clumps of hair */}
            <ellipse cx="50" cy="24" rx="20" ry="14" fill="#141410" />
            <rect x="32" y="12" width="10" height="16" rx="3" fill="#1a1a14" />
            <rect x="58" y="14" width="8"  height="12" rx="2" fill="#141410" />
            <rect x="44" y="8"  width="12" height="10" rx="2" fill="#1e1e18" />
            {/* Hair highlight (greasy) */}
            <rect x="46" y="9"  width="6"  height="4"  rx="2" fill="#282818" opacity="0.7" />

            {/* FACE — large, sunken, grey-green */}
            <ellipse cx="50" cy="36" rx="18" ry="22" fill={skin} />
            {/* Sunken cheeks */}
            <ellipse cx="32" cy="38" rx="5" ry="7"  fill={rot} opacity="0.45" />
            <ellipse cx="68" cy="38" rx="5" ry="7"  fill={rot} opacity="0.45" />
            {/* Forehead rot patches */}
            <ellipse cx="42" cy="24" rx="5" ry="3"  fill={rot} opacity="0.5" />
            <ellipse cx="60" cy="26" rx="4" ry="2.5" fill={rot} opacity="0.4" />
            {/* Face gash */}
            <path d="M56 20 L62 28" stroke="#550000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Forehead vein */}
            <path d="M40 22 Q42 18 46 20" stroke={rot} strokeWidth="1" fill="none" opacity="0.6" />

            {/* HEAVY BROW — furrowed, drooping */}
            <rect x="32" y="28" width="14" height="4" rx="2" fill="#2a3a1a" transform="rotate(6 39 30)" />
            <rect x="54" y="28" width="14" height="4" rx="2" fill="#2a3a1a" transform="rotate(-6 61 30)" />
            {/* Brow ridge */}
            <rect x="31" y="26" width="38" height="3" rx="1.5" fill="#1e2e10" opacity="0.5" />

            {/* ─ LEFT EYE — milky white, undead ─ */}
            <ellipse cx="41" cy="36" rx="8"   ry="7"   fill="#1a1208" />
            <ellipse cx="41" cy="36" rx="6"   ry="5.5" fill="#f0f0f0" />
            {/* Cloudy iris */}
            <ellipse cx="41" cy="36" rx="3.5" ry="3.5" fill="#d4d4c0" />
            <ellipse cx="41" cy="36" rx="2"   ry="2"   fill="#bfbfaa" opacity="0.8" />
            {/* Milky glint */}
            <ellipse cx="39" cy="34" rx="1.2" ry="1"   fill="#fff" opacity="0.5" />

            {/* ─ RIGHT EYE — hollow socket, missing ─ */}
            <ellipse cx="59" cy="36" rx="8"   ry="7"   fill="#0a0806" />
            <ellipse cx="59" cy="36" rx="5"   ry="4.5" fill="#120e08" />
            {/* Dried socket texture */}
            <ellipse cx="59" cy="36" rx="3"   ry="2.5" fill="#1e1608" opacity="0.7" />
            {/* Dried blood trickle */}
            <rect x="58"   y="40" width="2"   height="6"  rx="1" fill="#3a0000" opacity="0.5" />

            {/* NOSE — rotted, cartilage gone */}
            <ellipse cx="50" cy="44" rx="5"  ry="3.5" fill={rot} opacity="0.7" />
            {/* Nostrils */}
            <ellipse cx="47" cy="45" rx="2"  ry="1.5" fill="#0e0c06" />
            <ellipse cx="53" cy="45" rx="2"  ry="1.5" fill="#0e0c06" />

            {/* SLACK JAW — wide open mouth */}
            {/* Upper lip / gum line */}
            <rect x="38" y="50" width="24" height="5" rx="2" fill="#1a0e08" />
            {/* Upper teeth — uneven (one gap) */}
            <rect x="39"   y="50" width="3.5" height="5" rx="1" fill={bone} />
            <rect x="43.5" y="50" width="4"   height="6" rx="1" fill={bone} />
            {/* gap at 48 — missing tooth */}
            <rect x="51"   y="50" width="4"   height="5" rx="1" fill={bone} />
            <rect x="56"   y="50" width="3"   height="4" rx="1" fill={bone} opacity="0.8" />
            <rect x="59.5" y="50" width="2.5" height="6" rx="1" fill={bone} />

            {/* Lower jaw — drooping down */}
            <ellipse cx="50" cy="61" rx="14"  ry="9"   fill={skin} />
            <ellipse cx="50" cy="62" rx="11"  ry="6.5" fill={skinH} opacity="0.25" />
            {/* Lower teeth — crooked */}
            <rect x="40"   y="54" width="3"   height="5" rx="1" fill={bone} opacity="0.9" transform="rotate(5 41 56)" />
            <rect x="44.5" y="53" width="3.5" height="6" rx="1" fill={bone} opacity="0.9" />
            <rect x="49"   y="53" width="3.5" height="7" rx="1" fill={bone} opacity="0.85" />
            <rect x="53.5" y="54" width="3"   height="5" rx="1" fill={bone} opacity="0.9" transform="rotate(-4 55 56)" />
            <rect x="57.5" y="54" width="3"   height="4" rx="1" fill={bone} opacity="0.75" />
            {/* Inside mouth cavity */}
            <ellipse cx="50" cy="56" rx="10"  ry="5"   fill="#080402" opacity="0.85" />
            {/* Swollen tongue */}
            <ellipse cx="50" cy="58" rx="7"   ry="4"   fill="#5a1a1a" opacity="0.75" />
            <rect x="44"   y="58" width="12"  height="3"  rx="2" fill="#6a2020" opacity="0.5" />

            {/* Rage — glowing green sclera */}
            {rage && (
              <>
                <ellipse cx="41" cy="36" rx="6"   ry="5.5" fill="#4aff4a" opacity="0.3" />
                <ellipse cx="41" cy="36" rx="4"   ry="3.5" fill="#00ff00" opacity="0.4" />
                <ellipse cx="59" cy="36" rx="5"   ry="4.5" fill="#4aff4a" opacity="0.2" />
              </>
            )}
          </g>

        </g>{/* end sway group */}
      </svg>
    </>
  );
}
