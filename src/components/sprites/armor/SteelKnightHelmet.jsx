import React from 'react';

/* Steel Knight — Helmet
   Full great helm: flat-topped, riveted steel visor with a narrow eye slit,
   cheek guards that frame the face, a hinged chin plate, and a small
   knight-cross embossed on the brow. Polished steel with blue-grey sheen.

   Head reference (PlayerBase tier 3):
     top y≈8, bottom y≈45, left x≈44, right x≈76, center x=60

   viewBox 0 0 120 200 — position:absolute over base. */

const css = `
@keyframes skh-idle {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-2px); }
}
@keyframes skh-gleam {
  0%, 80%, 100% { opacity: 0; }
  88%            { opacity: 0.7; }
}
`;

const ST    = '#6a7a8a';   // steel mid
const ST_L  = '#9aaabb';   // steel light
const ST_H  = '#c8dae8';   // steel highlight
const ST_D  = '#3a4a58';   // steel dark
const ST_DD = '#1e2a36';   // deep shadow
const BLU   = '#185FA5';   // knight blue accent
const BLU_D = '#0f3f70';
const RIV   = '#aabbc8';   // rivet shine

export default function SteelKnightHelmet() {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 120 200" overflow="visible"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

        <g style={{
          animationName: 'skh-idle',
          animationDuration: '3.4s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}>

          {/* ── CHEEK GUARDS (behind main helm, sides of face) ── */}
          {/* Left cheek guard */}
          <path d="M44,14 Q41,16 41,24 Q41,34 43,42 Q46,44 48,43 L48,14Z"
            fill={ST_D} />
          <path d="M44,14 Q42,16 42,24 Q42,33 44,41 Q47,43 49,42 L49,14Z"
            fill={ST} />
          {/* Right cheek guard */}
          <path d="M76,14 Q79,16 79,24 Q79,34 77,42 Q74,44 72,43 L72,14Z"
            fill={ST_D} />
          <path d="M76,14 Q78,16 78,24 Q78,33 76,41 Q73,43 71,42 L71,14Z"
            fill={ST} />

          {/* ── MAIN HELM BODY ── x=43–77, y=8–40 */}
          {/* Shadow left half */}
          <path d="M60,8 Q43,9 43,18 Q43,28 44,40 L60,40Z"
            fill={ST_D} />
          {/* Lit right half */}
          <path d="M60,8 Q77,9 77,18 Q77,28 76,40 L60,40Z"
            fill={ST} />
          {/* Top face plate highlight */}
          <path d="M43,10 Q60,8 77,10 L77,12 Q60,9 43,12Z"
            fill={ST_H} opacity="0.55" />

          {/* Flat top rim */}
          <path d="M43,8 Q60,6 77,8 L77,10 Q60,8 43,10Z"
            fill={ST_L} />

          {/* ── VISOR PANEL — y=22–32, full width ── */}
          {/* Visor shadow */}
          <path d="M44,22 L76,22 L76,32 Q60,33 44,32Z"
            fill={ST_DD} />
          {/* Visor face */}
          <path d="M44,23 L76,23 L76,31 Q60,32 44,31Z"
            fill={ST_D} />
          {/* Eye slit */}
          <path d="M46,26 L74,26 L74,28 Q60,29 46,28Z"
            fill={ST_DD} />
          {/* Slit interior glow */}
          <path d="M47,26.5 L73,26.5 L73,27.5 Q60,28 47,27.5Z"
            fill="#0a1520" opacity="0.85" />
          {/* Visor top edge highlight */}
          <path d="M44,23 L76,23 L76,24 Q60,24.5 44,24Z"
            fill={ST_H} opacity="0.35" />
          {/* Visor hinge dots */}
          <circle cx="46" cy="22" r="1.2" fill={ST_DD} />
          <circle cx="74" cy="22" r="1.2" fill={ST_DD} />

          {/* ── BROW BAND ── y=20–24 */}
          <path d="M44,20 L76,20 L76,23 Q60,23.5 44,23Z"
            fill={ST_L} opacity="0.7" />

          {/* ── KNIGHT CROSS ON BROW ── centered at (60, 16) */}
          {/* Vertical bar */}
          <rect x="58.5" y="11" width="3" height="10" rx="0.5" fill={BLU_D} />
          <rect x="59" y="11.5" width="2" height="9" rx="0.5" fill={BLU} />
          {/* Horizontal bar */}
          <rect x="54" y="14.5" width="12" height="3" rx="0.5" fill={BLU_D} />
          <rect x="54.5" y="15" width="11" height="2" rx="0.5" fill={BLU} />
          {/* Cross highlight */}
          <rect x="59" y="11.5" width="1" height="3" rx="0" fill={ST_H} opacity="0.4" />

          {/* ── CHIN PLATE ── y=38–46 */}
          {/* Shadow */}
          <path d="M46,38 Q46,36 60,36 Q74,36 74,38 L73,46 Q60,48 47,46Z"
            fill={ST_DD} />
          {/* Face */}
          <path d="M47,38 Q47,36 60,36 Q73,36 73,38 L72,45 Q60,47 48,45Z"
            fill={ST_D} />
          {/* Chin plate highlight */}
          <path d="M47,36 Q60,35 73,38 L73,39 Q60,36 47,37Z"
            fill={ST_H} opacity="0.25" />
          {/* Chin plate breathing slits */}
          <g stroke={ST_DD} strokeWidth="0.7" opacity="0.7">
            <line x1="54" y1="40" x2="54" y2="44"/>
            <line x1="57" y1="40" x2="57" y2="44"/>
            <line x1="60" y1="40" x2="60" y2="44"/>
            <line x1="63" y1="40" x2="63" y2="44"/>
            <line x1="66" y1="40" x2="66" y2="44"/>
          </g>

          {/* ── RIVETS ── */}
          {/* Top row */}
          {[47,52,57,63,68,73].map(x => (
            <g key={x}>
              <circle cx={x} cy="10" r="1.4" fill={ST_DD} />
              <circle cx={x-0.3} cy={9.7} r="0.55" fill={RIV} />
            </g>
          ))}
          {/* Side rivets */}
          {[14,20,28,36].map(y => (
            <g key={y}>
              <circle cx="45" cy={y} r="1.2" fill={ST_DD} />
              <circle cx={44.7} cy={y-0.3} r="0.5" fill={RIV} />
              <circle cx="75" cy={y} r="1.2" fill={ST_DD} />
              <circle cx={74.7} cy={y-0.3} r="0.5" fill={RIV} />
            </g>
          ))}

          {/* ── GLEAM ANIMATION ── */}
          <path d="M55,9 Q65,12 68,20 L66,20 Q63,13 55,10Z"
            fill={ST_H} opacity="0"
            style={{
              animationName: 'skh-gleam',
              animationDuration: '5s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: '1.5s',
            }}
          />

        </g>
      </svg>
    </>
  );
}
