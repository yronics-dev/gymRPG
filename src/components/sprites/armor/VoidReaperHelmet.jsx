import React from 'react';

/* Void Reaper — Helmet
   Jagged black plate skull-helm with swept-back horns, a hollow face with
   purple glowing eye slits, cracked void energy lines that pulse, and a
   tattered shadow-wisp rising from the crown.

   Head reference (PlayerBase tier 3):
     top y≈8, bottom y≈45, left x≈44, right x≈76, center x=60

   viewBox 0 0 120 200 — position:absolute over base. */

const css = `
@keyframes vrh-idle {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-2px); }
}
@keyframes vrh-pulse {
  0%, 100% { opacity: 0.5; }
  50%       { opacity: 1; }
}
@keyframes vrh-wisp {
  0%        { transform: translateY(0px) scaleX(1); opacity: 0.6; }
  50%       { transform: translateY(-4px) scaleX(0.7); opacity: 0.9; }
  100%      { transform: translateY(0px) scaleX(1); opacity: 0.6; }
}
`;

const BK    = '#0a0a12';   // void black
const BK_M  = '#12121e';   // mid black
const BK_L  = '#1e1e30';   // lit black
const PRP   = '#7F77DD';   // void purple
const PRP_L = '#a89af0';   // purple bright
const PRP_D = '#534AB7';   // purple dark
const PRP_G = '#c0b8ff';   // glow

export default function VoidReaperHelmet() {
  return (
    <>
      <style>{css}</style>
      <svg viewBox="0 0 120 200" overflow="visible"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

        <g style={{
          animationName: 'vrh-idle',
          animationDuration: '3.6s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
        }}>

          {/* ── SHADOW WISP (crown) ── */}
          <g style={{
            animationName: 'vrh-wisp',
            animationDuration: '2.8s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            transformOrigin: '60px 4px',
          }}>
            <path d="M57,4 Q55,0 58,-4 Q60,-6 62,-4 Q65,0 63,4"
              fill="none" stroke={PRP} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M54,2 Q52,-2 55,-5 Q57,-7 58,-5 Q56,-2 57,3"
              fill="none" stroke={PRP_D} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            <path d="M66,2 Q68,-2 65,-5 Q63,-7 62,-5 Q64,-2 63,3"
              fill="none" stroke={PRP_D} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          </g>

          {/* ── LEFT SWEPT HORN ── */}
          <path d="M46,10 Q38,4 34,0 Q36,2 40,8 Q42,12 46,14Z"
            fill={BK_M} />
          <path d="M46,10 Q38,4 34,0 Q36,1 39,6 Q41,10 45,13Z"
            fill={BK_L} />
          <path d="M46,10 Q38,4 34,0 L35,0 Q38,4 46,11Z"
            fill={PRP_D} opacity="0.25" />

          {/* ── RIGHT SWEPT HORN ── */}
          <path d="M74,10 Q82,4 86,0 Q84,2 80,8 Q78,12 74,14Z"
            fill={BK_M} />
          <path d="M74,10 Q82,4 86,0 Q85,1 82,6 Q80,10 75,13Z"
            fill={BK_L} />
          <path d="M74,10 Q82,4 86,0 L85,0 Q82,4 74,11Z"
            fill={PRP_D} opacity="0.25" />

          {/* ── MAIN HELM BODY ── x=43–77, y=8–44 */}
          {/* Deep shadow base */}
          <path d="M60,8 Q43,9 43,18 Q43,30 44,44 L60,44Z"
            fill={BK} />
          <path d="M60,8 Q77,9 77,18 Q77,30 76,44 L60,44Z"
            fill={BK_M} />
          {/* Subtle lit edge right */}
          <path d="M60,8 Q77,9 77,16 L76,16 Q76,9 60,8Z"
            fill={BK_L} opacity="0.6" />

          {/* ── FACE VOID (sunken eye region) y=16–34 ── */}
          {/* Dark face cavity */}
          <path d="M46,16 Q45,22 46,34 L74,34 Q75,22 74,16Z"
            fill={BK} />

          {/* Eye slits — glowing purple */}
          {/* Left eye */}
          <path d="M47,22 Q50,20 55,21 L55,24 Q50,25 47,23Z"
            fill={PRP_D} style={{ animationName:'vrh-pulse', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />
          <path d="M48,22 Q51,21 54,22 L54,23.5 Q51,24.5 48,23Z"
            fill={PRP} style={{ animationName:'vrh-pulse', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite', animationDelay:'0.1s' }} />
          <path d="M49,22 Q51,21.5 53,22 L53,23 Q51,23.5 49,23Z"
            fill={PRP_L} opacity="0.7" style={{ animationName:'vrh-pulse', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite', animationDelay:'0.2s' }} />

          {/* Right eye */}
          <path d="M65,21 Q70,20 73,22 L73,23 Q70,25 65,24Z"
            fill={PRP_D} style={{ animationName:'vrh-pulse', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />
          <path d="M66,22 Q69,21 72,22 L72,23.5 Q69,24.5 66,23Z"
            fill={PRP} style={{ animationName:'vrh-pulse', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite', animationDelay:'0.1s' }} />
          <path d="M67,22 Q69,21.5 71,22 L71,23 Q69,23.5 67,23Z"
            fill={PRP_L} opacity="0.7" style={{ animationName:'vrh-pulse', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite', animationDelay:'0.2s' }} />

          {/* ── VOID CRACK LINES ── */}
          <g style={{ animationName:'vrh-pulse', animationDuration:'3s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }}>
            <path d="M52,28 L50,36 L53,32 L51,42" fill="none" stroke={PRP} strokeWidth="0.8" opacity="0.7" strokeLinecap="round"/>
            <path d="M68,26 L70,33 L67,30 L69,40" fill="none" stroke={PRP} strokeWidth="0.8" opacity="0.7" strokeLinecap="round"/>
            <path d="M60,10 L58,16 L62,13 L60,20"  fill="none" stroke={PRP_D} strokeWidth="0.6" opacity="0.5" strokeLinecap="round"/>
          </g>

          {/* ── BROW RIDGE (angular) ── */}
          <path d="M44,16 L76,16 L76,18 Q60,19 44,18Z"
            fill={BK_L} opacity="0.8" />
          <path d="M44,16 L60,17 L76,16"
            fill="none" stroke={PRP_D} strokeWidth="0.7" opacity="0.4" />

          {/* ── JAGGED BOTTOM EDGE ── y=40–46 */}
          <path d="M44,40 L47,44 L50,40 L53,45 L56,40 L60,46 L64,40 L67,45 L70,40 L73,44 L76,40"
            fill={BK_M} stroke={BK_M} strokeWidth="0.5" />
          {/* Purple glow along jaw edge */}
          <path d="M44,40 L47,44 L50,40 L53,45 L56,40 L60,46 L64,40 L67,45 L70,40 L73,44 L76,40"
            fill="none" stroke={PRP} strokeWidth="0.8" opacity="0.4"
            style={{ animationName:'vrh-pulse', animationDuration:'2.5s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />

          {/* ── EYE GLOW BLOOM ── */}
          <ellipse cx="51" cy="22.5" rx="5" ry="2" fill={PRP_G} opacity="0.06"
            style={{ animationName:'vrh-pulse', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />
          <ellipse cx="69" cy="22.5" rx="5" ry="2" fill={PRP_G} opacity="0.06"
            style={{ animationName:'vrh-pulse', animationDuration:'2s', animationTimingFunction:'ease-in-out', animationIterationCount:'infinite' }} />

        </g>
      </svg>
    </>
  );
}
