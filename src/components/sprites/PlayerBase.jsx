import React from 'react';

const css = `
@keyframes pb-breathe {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-2px); }
}
@keyframes pb-rune-pulse {
  0%, 100% { opacity: 0.4; filter: drop-shadow(0 0 2px #4af8d0); }
  50%       { opacity: 1;   filter: drop-shadow(0 0 8px #4af8d0); }
}
@keyframes pb-rune-gold {
  0%, 100% { opacity: 0.5;  filter: drop-shadow(0 0 2px #ffd700); }
  50%       { opacity: 1;   filter: drop-shadow(0 0 9px #ffd700); }
}
@keyframes pb-aura-pulse {
  0%, 100% { opacity: 0.07; }
  50%       { opacity: 0.25; }
}
@keyframes pb-hair-sway {
  0%, 100% { transform: skewX(-2.5deg) translateY(0); }
  50%       { transform: skewX(2.5deg)  translateY(-2px); }
}
@keyframes pb-eye-glow {
  0%, 100% { opacity: 0.7; }
  50%       { opacity: 1;  filter: drop-shadow(0 0 4px currentColor); }
}
@keyframes pb-particle {
  0%   { opacity: 0.9;  transform: translate(0,      0);     }
  100% { opacity: 0;    transform: translate(var(--pdx,0px), -26px); }
}
`;

/*  Pre-calculated skin tones — NO opacity overlays, avoids seam banding
    b = base/lit side   d = dark/shadow side   m = mid detail */
const SK = {
  1: { b: '#ead6be', d: '#c4a070', m: '#d8bc98', eye: '#241408' }, // pale
  2: { b: '#d49060', d: '#a86030', m: '#be7848', eye: '#1c0e06' }, // healthy
  3: { b: '#c07248', d: '#8a4520', m: '#a85e36', eye: '#160a04' }, // tanned
  4: { b: '#ac6230', d: '#783a10', m: '#945026', eye: '#0a0402' }, // dark
  5: { b: '#caa050', d: '#8c5e14', m: '#ae8030', eye: '#080400' }, // golden
};

const HAIR  = ['', '#4a3520', '#342210', '#1e0e06', '#0c0400', '#be9e38'];
const SCOL  = ['', '#7a6a48', '#385270', '#423820', '#160826', '#6a5006'];
const SMID  = ['', '#9a8860', '#4a6488', '#524628', '#201030', '#887010'];
const SBELT = ['', '', '', '#1a1008', '#1a1008', '#806008'];

const anim = (name, dur, delay = '0s') => ({
  animationName: name,
  animationDuration: dur,
  animationTimingFunction: 'ease-in-out',
  animationIterationCount: 'infinite',
  animationDelay: delay,
});

export default function PlayerBase({ tier = 1, size = 200 }) {
  const t  = Math.max(1, Math.min(5, tier));
  const sk = SK[t];
  const hc = HAIR[t];

  /* Body measurements per tier */
  const sw  = [0, 13, 15, 18, 21, 23][t]; // shoulder half-width
  const tw  = [0,  9, 11, 13, 16, 18][t]; // waist half-width
  const aw  = [0,  4,  5,  6,  7,  8][t]; // arm radius
  const ls  = [0,  1,  3,  6, 10,  8][t]; // leg spread from center
  const hw  = Math.round(size * 0.6);       // svg pixel width

  /* Shoulder Y where arms attach */
  const SY = 54;
  /* Torso bottom */
  const TY = 112;
  /* Shorts bottom / leg top */
  const LY = 130;

  /* Arm shape — left arm hangs slightly outward */
  const LAX = 60 - sw;  // left arm shoulder X
  const RAX = 60 + sw;  // right arm shoulder X

  /* Shadow color (same for everything — no opacity) */
  const sd = sk.d;
  const sm = sk.m;

  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 120 200" overflow="visible"
        width={hw} height={size} style={{ display: 'block' }}>

        {/* ── GROUND SHADOW ── */}
        <ellipse cx="60" cy="197" rx={18 + t * 2} ry="4"
          fill="rgba(0,0,0,0.2)" />

        {/* ── TIER 5 AURA ── */}
        {t === 5 && (
          <ellipse cx="60" cy="108" rx="36" ry="86"
            fill="none" stroke="#ffd700" strokeWidth="9" strokeOpacity="1"
            style={anim('pb-aura-pulse', '3s')} />
        )}

        {/* ════ HAIR ════ */}
        <g id="pb-hair">
          {t === 1 && (
            /* short, unkempt */
            <path d="M46,27 Q47,8 60,9 Q73,8 74,27
                     Q71,18 64,16 Q60,15 56,16 Q49,18 46,27Z"
              fill={hc} />
          )}
          {t === 2 && (
            <path d="M45,26 Q46,7 60,8 Q74,7 75,26
                     Q72,17 64,15 Q60,14 56,15 Q48,17 45,26Z"
              fill={hc} />
          )}
          {t === 3 && (
            /* neat pulled back */
            <path d="M44,25 Q45,6 60,7 Q75,6 76,25
                     Q73,15 64,13 Q60,12 56,13 Q47,15 44,25Z"
              fill={hc} />
          )}
          {t === 4 && (
            /* cropped close, sharp hairline */
            <path d="M44,23 Q45,5 60,6 Q75,5 76,23
                     Q73,13 64,11 Q60,10 56,11 Q47,13 44,23Z"
              fill={hc} />
          )}
          {t === 5 && (
            /* divine flowing — animated sway */
            <g style={{ ...anim('pb-hair-sway', '3s'), transformOrigin: '60px 20px' }}>
              <path d="M44,22 Q42,3 55,0 Q60,-2 65,0 Q78,3 76,22
                       Q72,10 64,9 Q60,8 56,9 Q48,10 44,22Z"
                fill={hc} />
              <path d="M46,13 Q42,2 49,-2 Q46,6 46,13Z" fill={hc} opacity="0.65" />
              <path d="M74,13 Q78,2 73,-2 Q76,6 74,13Z" fill={hc} opacity="0.65" />
              <path d="M58,8 Q57,-3 60,-5 Q63,-3 62,8Z"  fill={hc} opacity="0.5"  />
            </g>
          )}
        </g>

        {/* ════ HEAD ════ */}
        <g id="pb-head">
          {/* lit right side */}
          <path
            d={t <= 2
              ? 'M60,10 Q76,14 75,27 Q76,42 62,45 L60,45Z'
              : t === 3
              ? 'M60,9 Q77,13 76,26 Q77,42 62,45 L60,45Z'
              : 'M60,8 Q78,12 77,25 Q78,43 62,46 L60,46Z'
            }
            fill={sk.b}
          />
          {/* shadow left side */}
          <path
            d={t <= 2
              ? 'M60,10 Q44,14 46,27 Q45,42 60,45Z'
              : t === 3
              ? 'M60,9 Q43,13 45,26 Q44,42 60,45Z'
              : 'M60,8 Q42,12 44,25 Q43,43 60,46Z'
            }
            fill={sd}
          />
          {/* Cheek highlight (right side) */}
          <ellipse
            cx={t <= 2 ? 68 : 69} cy={t <= 2 ? 32 : 31}
            rx="4" ry="3" fill={sk.b} opacity="0.35"
          />
          {/* Jaw crease tier 3+ */}
          {t >= 3 && (
            <path d={t === 3 ? 'M48,40 Q60,46 72,40' : 'M47,41 Q60,47 73,41'}
              fill="none" stroke={sd} strokeWidth="0.8" opacity="0.5" />
          )}
        </g>

        {/* ════ FACE ════ */}
        <g id="pb-face">
          {t === 1 && (
            /* tired downcast */
            <>
              <ellipse cx="53.5" cy="28.5" rx="3.2" ry="2.8" fill={sk.eye} />
              <ellipse cx="67"   cy="29.5" rx="2.8" ry="2.5" fill={sk.eye} />
              <ellipse cx="52.8" cy="27.8" rx="1"   ry="0.8" fill="#fff" opacity="0.55" />
              <ellipse cx="66.3" cy="28.8" rx="0.9" ry="0.8" fill="#fff" opacity="0.55" />
              {/* heavy eyelids */}
              <path d="M51,26.5 Q54,25 57,26.5" fill="none" stroke={hc} strokeWidth="1" />
              <path d="M64.5,27.5 Q67,26 70,27.5" fill="none" stroke={hc} strokeWidth="1" />
              {/* under-eye shadow */}
              <path d="M51,31 Q53.5,32.5 56,31" fill="none" stroke={sd} strokeWidth="0.6" opacity="0.45" />
            </>
          )}
          {t === 2 && (
            /* neutral forward gaze */
            <>
              <ellipse cx="53.5" cy="27.5" rx="3.4" ry="3"   fill={sk.eye} />
              <ellipse cx="67"   cy="27.5" rx="3"   ry="2.8" fill={sk.eye} />
              <ellipse cx="52.5" cy="26.5" rx="1.2" ry="1"   fill="#fff" opacity="0.7" />
              <ellipse cx="66"   cy="26.5" rx="1"   ry="0.9" fill="#fff" opacity="0.7" />
              <path d="M50.5,24.5 Q53.5,22.5 57,24.5" fill="none" stroke={hc} strokeWidth="0.9" />
              <path d="M64,24.5 Q67,22.5 70.5,24.5" fill="none" stroke={hc} strokeWidth="0.9" />
            </>
          )}
          {t === 3 && (
            /* focused, strong brow */
            <>
              <ellipse cx="53.5" cy="26.5" rx="3.6" ry="3.2" fill={sk.eye} />
              <ellipse cx="67"   cy="26.5" rx="3.2" ry="3"   fill={sk.eye} />
              <ellipse cx="52.3" cy="25.5" rx="1.3" ry="1.1" fill="#fff" opacity="0.8" />
              <ellipse cx="65.8" cy="25.5" rx="1.1" ry="1"   fill="#fff" opacity="0.8" />
              {/* furrowed brow */}
              <path d="M50,22 Q53.5,19.5 57.5,22" fill="none" stroke={hc} strokeWidth="1.3" />
              <path d="M62.5,22 Q67,19.5 71,22"   fill="none" stroke={hc} strokeWidth="1.3" />
              <path d="M57.5,22 Q59.5,20.5 62.5,22" fill="none" stroke={hc} strokeWidth="0.7" opacity="0.6" />
            </>
          )}
          {t === 4 && (
            /* intense glowing teal iris */
            <>
              <ellipse cx="53.5" cy="25.5" rx="3.8" ry="3.5" fill={sk.eye} />
              <ellipse cx="67"   cy="25.5" rx="3.5" ry="3.2" fill={sk.eye} />
              <ellipse cx="53.5" cy="25.5" rx="2.4" ry="2.2" fill="#3ae8c0"
                style={anim('pb-eye-glow', '3s')} />
              <ellipse cx="67"   cy="25.5" rx="2.2" ry="2"   fill="#3ae8c0"
                style={anim('pb-eye-glow', '3s', '0.3s')} />
              <ellipse cx="52.6" cy="24.6" rx="0.8" ry="0.7" fill="#fff" opacity="0.9" />
              <ellipse cx="66.2" cy="24.6" rx="0.7" ry="0.6" fill="#fff" opacity="0.9" />
              <path d="M49.5,21.5 Q53.5,19 58,21.5" fill="none" stroke={hc} strokeWidth="1.5" />
              <path d="M62,21.5 Q67,19 71.5,21.5"   fill="none" stroke={hc} strokeWidth="1.5" />
            </>
          )}
          {t === 5 && (
            /* fully glowing golden — no pupils */
            <>
              <ellipse cx="53.5" cy="24.5" rx="4"   ry="3.8" fill="#c8a040"
                style={anim('pb-eye-glow', '2.5s')} />
              <ellipse cx="67"   cy="24.5" rx="3.8" ry="3.5" fill="#c8a040"
                style={anim('pb-eye-glow', '2.5s', '0.2s')} />
              <ellipse cx="53.5" cy="24.5" rx="2.5" ry="2.3" fill="#fff8dc" opacity="0.95" />
              <ellipse cx="67"   cy="24.5" rx="2.3" ry="2.1" fill="#fff8dc" opacity="0.95" />
              <path d="M49.5,20.5 Q53.5,18 58,20.5" fill="none" stroke={hc} strokeWidth="1.2" />
              <path d="M62,20.5 Q67,18 71.5,20.5"   fill="none" stroke={hc} strokeWidth="1.2" />
            </>
          )}

          {/* Nose bridge */}
          <line x1="60" y1={t<=2?30:29} x2="59" y2={t<=2?35:34}
            stroke={sd} strokeWidth="0.9" />
          <path d={`M57.5,${t<=2?36.5:35.5} Q60,${t<=2?38.5:37.5} 63,${t<=2?36.5:35.5}`}
            fill="none" stroke={sd} strokeWidth="0.7" opacity="0.6" />

          {/* Mouth */}
          {t === 1 && <path d="M56,39.5 Q60,38 64.5,39.5" fill="none" stroke={sd} strokeWidth="0.9" />}
          {t === 2 && <path d="M56.5,38.5 Q60,40 64,38.5"  fill="none" stroke={sd} strokeWidth="0.9" />}
          {t === 3 && <path d="M57,38.5 Q60,40 63.5,38.5"  fill="none" stroke={sd} strokeWidth="1" />}
          {t === 4 && <path d="M57,38.5 Q60,40.5 63.5,38.5" fill="none" stroke={sd} strokeWidth="1" />}
          {t === 5 && <path d="M57.5,37.5 Q60,39 63,37.5"  fill="none" stroke={sm} strokeWidth="0.8" />}

          {/* Collarbone tier 1 */}
          {t === 1 && (
            <path d="M50,52 Q60,50 70,52" fill="none" stroke={sd} strokeWidth="0.8" opacity="0.55" />
          )}
        </g>

        {/* ════ NECK ════ */}
        <g id="pb-neck">
          <rect x={59} y="43" width={4 + (t>=3?2:0)} height={t<=2?10:11}
            fill={sk.b} rx="1" />
          {/* shadow left strip of neck */}
          <rect x={59} y="43" width={2 + (t>=3?1:0)} height={t<=2?10:11}
            fill={sd} rx="1" />
        </g>

        {/* ════ TORSO (breathing animation) ════ */}
        <g id="pb-torso"
          transform={t === 1 ? 'rotate(2,60,82)' : undefined}
          style={anim('pb-breathe', '3s')}
        >
          {/* Right (lit) half of torso */}
          <path
            d={`M60,${SY} L${60+sw},${SY} Q${60+tw+4},82 ${60+tw},${TY} L60,${TY}Z`}
            fill={sk.b}
          />
          {/* Left (shadow) half */}
          <path
            d={`M60,${SY} L${60-sw},${SY} Q${60-tw-4},82 ${60-tw},${TY} L60,${TY}Z`}
            fill={sd}
          />

          {/* Pec shelf (tier 2+) */}
          {t >= 2 && (
            <>
              <path d={`M${60+sw-4},${SY+8} Q${60+4},${SY+16} 60,${SY+14}`}
                fill="none" stroke={sk.b} strokeWidth="0.9" opacity="0.5" />
              <path d={`M${60-sw+4},${SY+8} Q${60-4},${SY+16} 60,${SY+14}`}
                fill="none" stroke={sd} strokeWidth="0.9" opacity="0.5" />
            </>
          )}

          {/* Abs (tier 3+) */}
          {t >= 3 && (
            <g stroke={sk.b} opacity="0.35">
              <line x1="60" y1={SY+16} x2="60" y2={TY-2} strokeWidth="0.8" />
              <line x1={60-6} y1={SY+26} x2={60+6} y2={SY+26} strokeWidth="0.7" />
              <line x1={60-6} y1={SY+37} x2={60+6} y2={SY+37} strokeWidth="0.7" />
              <line x1={60-5} y1={SY+48} x2={60+5} y2={SY+48} strokeWidth="0.6" />
            </g>
          )}

          {/* Rune tattoos on torso sides (tier 4) */}
          {t === 4 && (
            <g style={anim('pb-rune-pulse', '3s')}>
              <path d={`M${60+sw-8},${SY+18} L${60+sw-4},${SY+24} L${60+sw-8},${SY+30}`}
                fill="none" stroke="#4af8d0" strokeWidth="1" />
              <path d={`M${60-sw+8},${SY+18} L${60-sw+4},${SY+24} L${60-sw+8},${SY+30}`}
                fill="none" stroke="#4af8d0" strokeWidth="1" />
            </g>
          )}

          {/* Golden overlay tier 5 */}
          {t === 5 && (
            <path d={`M${60-sw},${SY} L${60+sw},${SY} Q${60+tw+4},82 ${60+tw},${TY} L${60-tw},${TY} Q${60-tw-4},82 ${60-sw},${SY}Z`}
              fill="#ffd700" opacity="0.08" />
          )}
        </g>

        {/* ════ SHORTS ════ */}
        <g id="pb-shorts">
          {/* Waistband — starts 3px above TY to overlap torso seam */}
          <rect x={60-tw-1} y={TY-3} width={(tw+1)*2} height="7"
            fill={t>=3 ? SBELT[t] : SCOL[t]} rx="1" />
          {/* Short body — right lit / left shadow; starts at TY+4 (above TY) */}
          <path
            d={`M60,${TY+4} L${60+tw+1},${TY+4} L${60+ls+tw},${LY} L${60+ls},${LY} L60,${LY}Z`}
            fill={SMID[t]}
          />
          <path
            d={`M60,${TY+4} L${60-tw-1},${TY+4} L${60-ls-tw},${LY} L${60-ls},${LY} L60,${LY}Z`}
            fill={SCOL[t]}
          />

          {/* Tier 1 linen hatching */}
          {t === 1 && (
            <g stroke="#6a5830" strokeWidth="0.5" opacity="0.4">
              {[47,52,57,62,67,72].map(x => (
                <line key={x} x1={x} y1={TY+7} x2={x-4} y2={LY-1} />
              ))}
            </g>
          )}

          {/* Tier 3+ belt buckle */}
          {t >= 3 && (
            <rect x="56.5" y={TY+1} width="7" height="4" rx="1"
              fill={t === 5 ? '#ffd700' : '#666'} stroke={t===5?'#c8a040':'#444'} strokeWidth="0.5" />
          )}

          {/* Tier 4 waist wrap line */}
          {t === 4 && (
            <line x1={60-tw-1} y1={TY+10} x2={60+tw+1} y2={TY+10}
              stroke="#2e1808" strokeWidth="1.5" opacity="0.7" />
          )}
        </g>

        {/* ════ LEFT ARM ════ */}
        <g id="pb-arm-l">
          {/* Upper arm — lit right face, shadow left face */}
          <path
            d={`M${LAX},${SY+2} Q${LAX},${SY+14} ${LAX-aw},${SY+38} L${LAX+aw},${SY+38} Q${LAX+1},${SY+14} ${LAX},${SY+2}Z`}
            fill={sk.b}
          />
          <path
            d={`M${LAX},${SY+2} Q${LAX-2},${SY+14} ${LAX-aw},${SY+38} L${LAX-1},${SY+38} Q${LAX-1},${SY+14} ${LAX},${SY+2}Z`}
            fill={sd}
          />
          {/* Elbow crease line — subtle, no knob block */}
          <line x1={LAX-aw-1} y1={SY+38} x2={LAX+aw} y2={SY+38}
            stroke={sd} strokeWidth="0.8" opacity="0.5" />

          {/* Forearm — starts at SY+35 to overlap upper-arm seam */}
          <path
            d={`M${LAX-aw},${SY+35} Q${LAX-aw-2},${SY+53} ${LAX-aw-1},${SY+70} L${LAX+aw},${SY+70} Q${LAX+aw},${SY+53} ${LAX+aw},${SY+35}Z`}
            fill={sk.b}
          />
          <path
            d={`M${LAX-aw},${SY+35} Q${LAX-aw-1},${SY+53} ${LAX-aw-1},${SY+70} L${LAX-1},${SY+70} Q${LAX-1},${SY+53} ${LAX-aw},${SY+35}Z`}
            fill={sd}
          />

          {/* Tier 3 scar */}
          {t === 3 && (
            <path d={`M${LAX-2},${SY+44} L${LAX+2},${SY+49} L${LAX-1},${SY+55}`}
              fill="none" stroke="#7a3820" strokeWidth="1" opacity="0.75" />
          )}

          {/* Tier 4-5 forearm rune */}
          {t >= 4 && (
            <g style={anim(t===5 ? 'pb-rune-gold' : 'pb-rune-pulse', '3s')}>
              <path d={`M${LAX},${SY+44} L${LAX-3},${SY+51} L${LAX},${SY+58} L${LAX+3},${SY+51}Z`}
                fill="none" stroke={t===5?'#ffd700':'#4af8d0'} strokeWidth="1.1" />
              <line x1={LAX-4} y1={SY+51} x2={LAX+4} y2={SY+51}
                stroke={t===5?'#ffd700':'#4af8d0'} strokeWidth="0.8" />
            </g>
          )}
        </g>

        {/* ════ RIGHT ARM ════ */}
        <g id="pb-arm-r">
          <path
            d={`M${RAX},${SY+2} Q${RAX},${SY+14} ${RAX+aw},${SY+38} L${RAX-aw},${SY+38} Q${RAX-1},${SY+14} ${RAX},${SY+2}Z`}
            fill={sk.b}
          />
          <path
            d={`M${RAX},${SY+2} Q${RAX+1},${SY+14} ${RAX+1},${SY+38} L${RAX-aw},${SY+38} Q${RAX-1},${SY+14} ${RAX},${SY+2}Z`}
            fill={sm}
          />
          <line x1={RAX-aw} y1={SY+38} x2={RAX+aw+1} y2={SY+38}
            stroke={sd} strokeWidth="0.8" opacity="0.4" />

          <path
            d={`M${RAX+aw},${SY+35} Q${RAX+aw+2},${SY+53} ${RAX+aw+1},${SY+70} L${RAX-aw},${SY+70} Q${RAX-aw},${SY+53} ${RAX-aw},${SY+35}Z`}
            fill={sk.b}
          />
          <path
            d={`M${RAX+aw+1},${SY+35} Q${RAX+aw+2},${SY+53} ${RAX+aw+1},${SY+70} L${RAX+1},${SY+70} Q${RAX+1},${SY+53} ${RAX+1},${SY+35}Z`}
            fill={sm}
          />

          {t >= 4 && (
            <g style={anim(t===5 ? 'pb-rune-gold' : 'pb-rune-pulse', '3s', '0.5s')}>
              <path d={`M${RAX},${SY+44} L${RAX+3},${SY+51} L${RAX},${SY+58} L${RAX-3},${SY+51}Z`}
                fill="none" stroke={t===5?'#ffd700':'#4af8d0'} strokeWidth="1.1" />
              <line x1={RAX-4} y1={SY+51} x2={RAX+4} y2={SY+51}
                stroke={t===5?'#ffd700':'#4af8d0'} strokeWidth="0.8" />
            </g>
          )}
        </g>

        {/* ════ HANDS ════ */}
        <g id="pb-hand-l">
          {/* Mitt — 4-finger shape */}
          <path
            d={`M${LAX-aw-1},${SY+70} Q${LAX-aw-4},${SY+74} ${LAX-aw-3},${SY+82}
               Q${LAX-aw-1},${SY+86} ${LAX+aw+1},${SY+86}
               Q${LAX+aw+3},${SY+82} ${LAX+aw},${SY+70}Z`}
            fill={sk.b}
          />
          {/* Shadow left side of hand */}
          <path
            d={`M${LAX-aw-1},${SY+70} Q${LAX-aw-4},${SY+74} ${LAX-aw-3},${SY+82}
               Q${LAX-1},${SY+86} ${LAX},${SY+86}
               L${LAX},${SY+70}Z`}
            fill={sd}
          />
          {/* Knuckle dividers */}
          <g stroke={sd} strokeWidth="0.7" opacity="0.6">
            <line x1={LAX-aw-2} y1={SY+73} x2={LAX-aw-2} y2={SY+84} />
            <line x1={LAX}      y1={SY+71} x2={LAX}       y2={SY+85} />
            <line x1={LAX+aw}   y1={SY+72} x2={LAX+aw}    y2={SY+84} />
          </g>
          {/* Thumb */}
          <path d={`M${LAX+aw},${SY+72} Q${LAX+aw+4},${SY+68} ${LAX+aw+5},${SY+76}`}
            fill={sk.b} stroke={sd} strokeWidth="0.5" />
        </g>

        <g id="pb-hand-r">
          <path
            d={`M${RAX+aw+1},${SY+70} Q${RAX+aw+4},${SY+74} ${RAX+aw+3},${SY+82}
               Q${RAX+aw+1},${SY+86} ${RAX-aw-1},${SY+86}
               Q${RAX-aw-3},${SY+82} ${RAX-aw},${SY+70}Z`}
            fill={sk.b}
          />
          <path
            d={`M${RAX+aw+1},${SY+70} Q${RAX+aw+3},${SY+74} ${RAX+aw+3},${SY+82}
               Q${RAX+2},${SY+86} ${RAX+1},${SY+86}
               L${RAX+1},${SY+70}Z`}
            fill={sm}
          />
          <g stroke={sd} strokeWidth="0.6" opacity="0.5">
            <line x1={RAX+aw+2} y1={SY+73} x2={RAX+aw+2} y2={SY+84} />
            <line x1={RAX}      y1={SY+71} x2={RAX}       y2={SY+85} />
            <line x1={RAX-aw}   y1={SY+72} x2={RAX-aw}    y2={SY+84} />
          </g>
          <path d={`M${RAX-aw},${SY+72} Q${RAX-aw-4},${SY+68} ${RAX-aw-5},${SY+76}`}
            fill={sk.b} stroke={sd} strokeWidth="0.5" />
        </g>

        {/* ════ LEGS ════ */}
        <g id="pb-leg-l">
          {/* Thigh — starts at LY-3 to overlap shorts seam */}
          <path
            d={`M${60-ls},${LY-3} Q${60-ls-4},${LY+13} ${60-ls-7},${LY+38} L${60-ls+5},${LY+38} Q${60-ls+3},${LY+13} ${60-ls},${LY-3}Z`}
            fill={sk.b}
          />
          <path
            d={`M${60-ls},${LY-3} Q${60-ls-1},${LY+13} ${60-ls-1},${LY+38} L${60-ls+5},${LY+38} Q${60-ls+3},${LY+13} ${60-ls},${LY-3}Z`}
            fill={sd}
          />
          {/* Knee crease */}
          <line x1={60-ls-8} y1={LY+40} x2={60-ls+5} y2={LY+40}
            stroke={sd} strokeWidth="0.9" opacity="0.4" />
          {/* Shin — starts at LY+35 to overlap thigh seam */}
          <path
            d={`M${60-ls-7},${LY+35} Q${60-ls-8},${LY+49} ${60-ls-6},${LY+60} L${60-ls+4},${LY+60} Q${60-ls+5},${LY+49} ${60-ls+5},${LY+35}Z`}
            fill={sk.b}
          />
          <path
            d={`M${60-ls-7},${LY+35} Q${60-ls-5},${LY+49} ${60-ls-4},${LY+60} L${60-ls},${LY+60} Q${60-ls+1},${LY+49} ${60-ls+5},${LY+35}Z`}
            fill={sd}
          />

          {/* Tier 4 shin wraps */}
          {t === 4 && (
            <g stroke="#2a1408" strokeWidth="1.8" opacity="0.7">
              <line x1={60-ls-7} y1={LY+44} x2={60-ls+5} y2={LY+44} />
              <line x1={60-ls-7} y1={LY+51} x2={60-ls+5} y2={LY+51} />
              <line x1={60-ls-6} y1={LY+57} x2={60-ls+4} y2={LY+57} />
            </g>
          )}
        </g>

        <g id="pb-leg-r">
          <path
            d={`M${60+ls},${LY-3} Q${60+ls+4},${LY+13} ${60+ls+7},${LY+38} L${60+ls-5},${LY+38} Q${60+ls-3},${LY+13} ${60+ls},${LY-3}Z`}
            fill={sk.b}
          />
          <path
            d={`M${60+ls},${LY-3} Q${60+ls+1},${LY+13} ${60+ls+1},${LY+38} L${60+ls-5},${LY+38} Q${60+ls-3},${LY+13} ${60+ls},${LY-3}Z`}
            fill={sm}
          />
          <line x1={60+ls-5} y1={LY+40} x2={60+ls+8} y2={LY+40}
            stroke={sd} strokeWidth="0.9" opacity="0.35" />
          <path
            d={`M${60+ls+7},${LY+35} Q${60+ls+8},${LY+49} ${60+ls+6},${LY+60} L${60+ls-4},${LY+60} Q${60+ls-5},${LY+49} ${60+ls-5},${LY+35}Z`}
            fill={sk.b}
          />
          <path
            d={`M${60+ls+7},${LY+35} Q${60+ls+5},${LY+49} ${60+ls+4},${LY+60} L${60+ls},${LY+60} Q${60+ls-1},${LY+49} ${60+ls-5},${LY+35}Z`}
            fill={sm}
          />
          {t === 4 && (
            <g stroke="#2a1408" strokeWidth="1.8" opacity="0.7">
              <line x1={60+ls+7} y1={LY+44} x2={60+ls-5} y2={LY+44} />
              <line x1={60+ls+7} y1={LY+51} x2={60+ls-5} y2={LY+51} />
              <line x1={60+ls+6} y1={LY+57} x2={60+ls-4} y2={LY+57} />
            </g>
          )}
        </g>

        {/* ════ FEET ════ */}
        <g id="pb-foot-l">
          {/* Feet start at LY+57 — 3px overlap with shin bottom */}
          <path
            d={`M${60-ls-8},${LY+57} Q${60-ls-10},${LY+66} ${60-ls-8},${LY+70} Q${60-ls-5},${LY+72} ${60-ls+5},${LY+70} L${60-ls+5},${LY+57}Z`}
            fill={sd}
          />
          <path
            d={`M${60-ls-7},${LY+57} Q${60-ls-9},${LY+65} ${60-ls-7},${LY+68} Q${60-ls-4},${LY+70} ${60-ls+4},${LY+68} L${60-ls+4},${LY+57}Z`}
            fill={sk.b}
          />
        </g>

        <g id="pb-foot-r">
          <path
            d={`M${60+ls+8},${LY+57} Q${60+ls+10},${LY+66} ${60+ls+8},${LY+70} Q${60+ls+5},${LY+72} ${60+ls-5},${LY+70} L${60+ls-5},${LY+57}Z`}
            fill={sd}
          />
          <path
            d={`M${60+ls+7},${LY+57} Q${60+ls+9},${LY+65} ${60+ls+7},${LY+68} Q${60+ls+4},${LY+70} ${60+ls-4},${LY+68} L${60+ls-4},${LY+57}Z`}
            fill={sk.b}
          />
        </g>

        {/* ════ TIER 5: Energy particles ════ */}
        {t === 5 && [
          { cx: 40, cy: 78,  delay: '0s',    dx: '-6px' },
          { cx: 80, cy: 93,  delay: '0.7s',  dx:  '6px' },
          { cx: 45, cy: 118, delay: '1.3s',  dx: '-4px' },
          { cx: 77, cy: 66,  delay: '2s',    dx:  '5px' },
          { cx: 50, cy: 148, delay: '0.4s',  dx: '-5px' },
          { cx: 72, cy: 135, delay: '2.5s',  dx:  '4px' },
          { cx: 43, cy: 100, delay: '1.7s',  dx: '-3px' },
        ].map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r="1.7" fill="#ffd700"
            style={{ ...anim('pb-particle', '2.5s', p.delay), '--pdx': p.dx }} />
        ))}

      </svg>
    </>
  );
}
