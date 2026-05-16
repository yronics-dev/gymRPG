import React from 'react';
import { ELEMENT_THEMES } from '../constants';
import VampireLord    from './sprites/VampireLord';
import ZombieBrute    from './sprites/ZombieBrute';
import FireDemon      from './sprites/FireDemon';
import IceGolem       from './sprites/IceGolem';
import ShadowWraith   from './sprites/ShadowWraith';
import ThunderTitan   from './sprites/ThunderTitan';
import EarthColossus  from './sprites/EarthColossus';

/* ═══════════════════════════════════════════════════════════════════
   PIXEL-ART BOSS SPRITES  —  viewBox 0 0 48 72
   Each archetype function receives { accent, rage } where:
     accent = bright theme color (eyes, gems, glows)
     rage   = boolean (boss is in rage mode)
═══════════════════════════════════════════════════════════════════ */

// ─── DEMON (Fire / Lava) ──────────────────────────────────────────
function DemonBoss({ accent, rage }) {
  const a = accent;
  return (
    <>
      {/* Ground shadow */}
      <ellipse cx="24" cy="70" rx="14" ry="2.5" fill="#000" opacity="0.35"/>

      {/* Flame aura ring */}
      <ellipse cx="24" cy="66" rx="18" ry="5" fill={a} opacity={rage ? 0.28 : 0.13}/>

      {/* ── WINGS ── */}
      <path d="M11 38 Q-3 24 2 8 Q7 22 9 34Z"     fill="#991b1b" opacity="0.92"/>
      <path d="M11 38 Q2 20 5 6  Q9 18 11 30Z"    fill={a}       opacity="0.55"/>
      <line x1="11" y1="38" x2="1"  y2="8"  stroke="#7f1d1d" strokeWidth="1.5" opacity="0.5"/>
      <line x1="11" y1="38" x2="-1" y2="20" stroke="#7f1d1d" strokeWidth="1"   opacity="0.35"/>
      <line x1="11" y1="38" x2="4"  y2="30" stroke="#7f1d1d" strokeWidth="0.7" opacity="0.25"/>

      <path d="M37 38 Q51 24 46 8  Q41 22 39 34Z"  fill="#991b1b" opacity="0.92"/>
      <path d="M37 38 Q46 20 43 6  Q39 18 37 30Z"  fill={a}       opacity="0.55"/>
      <line x1="37" y1="38" x2="47" y2="8"  stroke="#7f1d1d" strokeWidth="1.5" opacity="0.5"/>
      <line x1="37" y1="38" x2="49" y2="20" stroke="#7f1d1d" strokeWidth="1"   opacity="0.35"/>
      <line x1="37" y1="38" x2="44" y2="30" stroke="#7f1d1d" strokeWidth="0.7" opacity="0.25"/>

      {/* ── HORNS ── */}
      <rect x="12" y="3" width="6" height="16" rx="1" fill="#3f0000" transform="rotate(-22 15 12)"/>
      <rect x="13" y="4" width="3" height="12" rx="0" fill="#991b1b" transform="rotate(-22 15 12)"/>
      <rect x="13" y="4" width="2" height="5"  rx="0" fill={a}       transform="rotate(-22 15 12)" opacity="0.6"/>
      <rect x="30" y="3" width="6" height="16" rx="1" fill="#3f0000" transform="rotate(22 33 12)"/>
      <rect x="31" y="4" width="3" height="12" rx="0" fill="#991b1b" transform="rotate(22 33 12)"/>
      <rect x="33" y="4" width="2" height="5"  rx="0" fill={a}       transform="rotate(22 33 12)" opacity="0.6"/>

      {/* ── HEAD outline shadow ── */}
      <rect x="11" y="14" width="26" height="20" rx="3" fill="#3f0000"/>
      {/* ── HEAD ── */}
      <rect x="12" y="15" width="24" height="18" rx="2" fill="#991b1b"/>
      <rect x="12" y="15" width="24" height="7"  rx="2" fill="#b91c1c"/>
      {/* Brow ridge */}
      <rect x="12" y="20" width="24" height="2" fill="#7f1d1d"/>
      {/* Cheek plates */}
      <rect x="12" y="22" width="5" height="5" rx="0" fill="#7f1d1d"/>
      <rect x="31" y="22" width="5" height="5" rx="0" fill="#7f1d1d"/>

      {/* ── EYES ── */}
      <rect x="14" y="18" width="9" height="7" rx="1" fill="#0a0000"/>
      <rect x="15" y="19" width="7" height="5" rx="0" fill={rage ? '#ffffff' : a}/>
      <rect x="17" y="20" width="3" height="3" fill="#000"/>
      <rect x="15" y="19" width="7" height="5" rx="0" fill={a} opacity={rage ? 0.6 : 0.2}/>

      <rect x="25" y="18" width="9" height="7" rx="1" fill="#0a0000"/>
      <rect x="26" y="19" width="7" height="5" rx="0" fill={rage ? '#ffffff' : a}/>
      <rect x="28" y="20" width="3" height="3" fill="#000"/>
      <rect x="26" y="19" width="7" height="5" rx="0" fill={a} opacity={rage ? 0.6 : 0.2}/>

      {/* ── NOSE ── */}
      <rect x="22" y="25" width="4" height="3" rx="1" fill="#7f1d1d"/>

      {/* ── MOUTH + FANGS ── */}
      <rect x="14" y="29" width="20" height="5" rx="1" fill="#0a0000"/>
      <rect x="15" y="29" width="3" height="5" rx="0" fill="#e2e8f0"/>
      <rect x="19" y="29" width="2" height="4" rx="0" fill="#e2e8f0"/>
      <rect x="23" y="29" width="2" height="3" rx="0" fill="#e2e8f0"/>
      <rect x="27" y="29" width="2" height="4" rx="0" fill="#e2e8f0"/>
      <rect x="30" y="29" width="3" height="5" rx="0" fill="#e2e8f0"/>

      {/* ── NECK ── */}
      <rect x="20" y="33" width="8" height="5" rx="0" fill="#991b1b"/>
      <rect x="21" y="33" width="6" height="3" rx="0" fill="#b91c1c"/>

      {/* ── BODY shadow ── */}
      <rect x="8" y="36" width="32" height="22" rx="2" fill="#3f0000"/>
      {/* ── BODY ── */}
      <rect x="9"  y="37" width="30" height="20" rx="1" fill="#991b1b"/>
      {/* Chest armour plate */}
      <rect x="11" y="38" width="26" height="16" rx="1" fill="#b91c1c"/>
      <rect x="11" y="38" width="26" height="4"  rx="0" fill="#dc2626"/>
      {/* Armour seams */}
      <rect x="23" y="38" width="2"  height="16" fill="#7f1d1d" opacity="0.45"/>
      <rect x="11" y="45" width="26" height="2"  fill="#7f1d1d" opacity="0.35"/>
      <rect x="11" y="50" width="26" height="1.5" fill="#7f1d1d" opacity="0.25"/>
      {/* Chest gem */}
      <rect x="21" y="40" width="6" height="6" rx="1" fill={rage ? '#ffffff' : a}/>
      <rect x="22" y="41" width="4" height="4" rx="0" fill="#7f1d1d" opacity="0.5"/>
      <rect x="22" y="41" width="2" height="2" rx="0" fill={rage ? a : '#fff'} opacity="0.9"/>

      {/* ── SHOULDER SPIKES ── */}
      <polygon points="9,37 4,29 13,37" fill="#b91c1c"/>
      <polygon points="10,37 5,30 12,36" fill="#dc2626" opacity="0.6"/>
      <polygon points="39,37 44,29 35,37" fill="#b91c1c"/>
      <polygon points="38,37 43,30 36,36" fill="#dc2626" opacity="0.6"/>

      {/* ── LEFT ARM ── */}
      <rect x="1"  y="37" width="10" height="20" rx="2" fill="#7f1d1d"/>
      <rect x="2"  y="38" width="8"  height="16" rx="1" fill="#991b1b"/>
      <rect x="1"  y="43" width="10" height="3"  fill="#7f1d1d"/>
      <rect x="2"  y="43" width="8"  height="2"  fill="#b91c1c" opacity="0.5"/>
      {/* LEFT CLAWS */}
      <rect x="1"  y="55" width="3" height="7" rx="0" fill="#e2e8f0"/>
      <rect x="5"  y="55" width="3" height="8" rx="0" fill="#e2e8f0"/>
      <rect x="9"  y="55" width="3" height="7" rx="0" fill="#e2e8f0"/>

      {/* ── RIGHT ARM ── */}
      <rect x="37" y="37" width="10" height="20" rx="2" fill="#7f1d1d"/>
      <rect x="38" y="38" width="8"  height="16" rx="1" fill="#991b1b"/>
      <rect x="37" y="43" width="10" height="3"  fill="#7f1d1d"/>
      <rect x="37" y="43" width="8"  height="2"  fill="#b91c1c" opacity="0.5"/>
      {/* RIGHT CLAWS */}
      <rect x="36" y="55" width="3" height="7" rx="0" fill="#e2e8f0"/>
      <rect x="40" y="55" width="3" height="8" rx="0" fill="#e2e8f0"/>
      <rect x="44" y="55" width="3" height="7" rx="0" fill="#e2e8f0"/>

      {/* ── BELT ── */}
      <rect x="9"  y="56" width="30" height="4" rx="0" fill="#3f0000"/>
      <rect x="22" y="55" width="4"  height="6" rx="0" fill="#b91c1c"/>
      <rect x="22" y="56" width="4"  height="3" fill={a} opacity="0.8"/>

      {/* ── LEGS ── */}
      <rect x="11" y="59" width="10" height="12" rx="0" fill="#991b1b"/>
      <rect x="12" y="60" width="8"  height="9"  rx="0" fill="#b91c1c" opacity="0.6"/>
      <rect x="10" y="67" width="13" height="5" rx="1" fill="#3f0000"/>
      <rect x="11" y="68" width="11" height="3" fill="#7f1d1d" opacity="0.6"/>

      <rect x="27" y="59" width="10" height="12" rx="0" fill="#991b1b"/>
      <rect x="28" y="60" width="8"  height="9"  rx="0" fill="#b91c1c" opacity="0.6"/>
      <rect x="26" y="67" width="13" height="5" rx="1" fill="#3f0000"/>
      <rect x="27" y="68" width="11" height="3" fill="#7f1d1d" opacity="0.6"/>

      {/* Rage flames */}
      {rage && <>
        <ellipse cx="16" cy="71" rx="7" ry="2" fill={a} opacity="0.5"/>
        <ellipse cx="32" cy="71" rx="7" ry="2" fill={a} opacity="0.5"/>
        <ellipse cx="24" cy="70" rx="4" ry="1.5" fill="#fff" opacity="0.3"/>
      </>}
    </>
  );
}

// ─── LICH (Ice / Crystal / Storm) ────────────────────────────────
function LichBoss({ accent, rage }) {
  const a = accent;
  return (
    <>
      <ellipse cx="24" cy="70" rx="10" ry="2" fill="#000" opacity="0.3"/>

      {/* Ice aura */}
      <ellipse cx="24" cy="64" rx="16" ry="5" fill={a} opacity={rage ? 0.2 : 0.1}/>

      {/* ── CRYSTAL CROWN ── */}
      {[14,18,22,26,30,34].map((x, i) => (
        <rect key={i} x={x-1} y={i%2===0 ? 0 : 3} width="3" height={i%2===0 ? 12 : 9} rx="0"
          fill={i%2===0 ? a : '#bfdbfe'} opacity={i%2===0 ? 0.95 : 0.75}/>
      ))}
      {/* Crown base band */}
      <rect x="12" y="10" width="24" height="4" rx="0" fill="#1e3a5f"/>
      <rect x="12" y="10" width="24" height="2" rx="0" fill={a} opacity="0.5"/>

      {/* ── HEAD ── */}
      <rect x="13" y="13" width="22" height="18" rx="3" fill="#0f172a"/>
      <rect x="14" y="14" width="20" height="16" rx="2" fill="#1e3a5f"/>
      {/* Skull texture */}
      <rect x="14" y="14" width="20" height="5" rx="2" fill="#2563eb" opacity="0.4"/>
      {/* Cheekbones */}
      <rect x="14" y="24" width="4" height="2" rx="0" fill="#0f172a" opacity="0.6"/>
      <rect x="30" y="24" width="4" height="2" rx="0" fill="#0f172a" opacity="0.6"/>

      {/* ── EYES – glowing ── */}
      <rect x="15" y="18" width="8" height="6" rx="1" fill="#000"/>
      <rect x="16" y="19" width="6" height="4" rx="0" fill={rage ? '#fff' : a} opacity={rage ? 1 : 0.9}/>
      <rect x="17" y="20" width="4" height="2" rx="0" fill={a} opacity="0.4"/>

      <rect x="25" y="18" width="8" height="6" rx="1" fill="#000"/>
      <rect x="26" y="19" width="6" height="4" rx="0" fill={rage ? '#fff' : a} opacity={rage ? 1 : 0.9}/>
      <rect x="27" y="20" width="4" height="2" rx="0" fill={a} opacity="0.4"/>

      {/* ── NOSE (skull style) ── */}
      <rect x="21" y="25" width="2" height="2" rx="0" fill="#000" opacity="0.7"/>
      <rect x="25" y="25" width="2" height="2" rx="0" fill="#000" opacity="0.7"/>

      {/* ── MOUTH ── */}
      <rect x="15" y="28" width="18" height="3" rx="0" fill="#000" opacity="0.8"/>
      {/* Teeth */}
      {[16,19,22,25,28].map((x,i) => (
        <rect key={i} x={x} y="28" width="2" height="3" rx="0" fill="#bfdbfe" opacity="0.9"/>
      ))}

      {/* ── NECK / BODY connecting robes ── */}
      <rect x="20" y="30" width="8" height="6" rx="0" fill="#1e3a5f"/>

      {/* ── ROBED BODY ── */}
      <rect x="9"  y="34" width="30" height="26" rx="4" fill="#0f172a"/>
      <rect x="10" y="35" width="28" height="24" rx="3" fill="#1e3a5f"/>
      {/* Robe folds */}
      <rect x="10" y="35" width="28" height="6" rx="2" fill="#2563eb" opacity="0.3"/>
      <rect x="22" y="35" width="4"  height="24" fill="#0f172a" opacity="0.3"/>
      <rect x="10" y="44" width="28" height="2"  fill="#0f172a" opacity="0.2"/>
      <rect x="10" y="51" width="28" height="2"  fill="#0f172a" opacity="0.2"/>
      {/* Chest rune */}
      <rect x="20" y="39" width="8" height="8" rx="1" fill={a} opacity="0.12"/>
      <rect x="23" y="40" width="2" height="6" rx="0" fill={a} opacity="0.7"/>
      <rect x="21" y="42" width="6" height="2" rx="0" fill={a} opacity="0.7"/>

      {/* ── ARMS ── */}
      <rect x="2"  y="36" width="9" height="20" rx="2" fill="#1e3a5f"/>
      <rect x="3"  y="37" width="7" height="16" rx="1" fill="#2563eb" opacity="0.4"/>
      {/* Crystal gauntlet */}
      <rect x="1"  y="52" width="10" height="6" rx="1" fill={a} opacity="0.8"/>
      <rect x="2"  y="53" width="8"  height="4" rx="0" fill="#bfdbfe" opacity="0.5"/>
      {/* Finger bones */}
      <rect x="2"  y="56" width="2" height="5" rx="0" fill="#bfdbfe" opacity="0.85"/>
      <rect x="5"  y="56" width="2" height="6" rx="0" fill="#bfdbfe" opacity="0.85"/>
      <rect x="8"  y="56" width="2" height="5" rx="0" fill="#bfdbfe" opacity="0.85"/>

      {/* ── STAFF (right side) ── */}
      <rect x="37" y="6"  width="3" height="58" rx="1" fill="#0f172a"/>
      <rect x="38" y="6"  width="1" height="56" rx="0" fill="#2563eb" opacity="0.5"/>
      {/* Staff head */}
      <rect x="34" y="4"  width="9" height="4" rx="1" fill={a} opacity="0.9"/>
      <rect x="36" y="2"  width="5" height="10" rx="1" fill={a} opacity="0.6"/>
      <rect x="37" y="0"  width="3" height="8"  rx="0" fill="#fff" opacity="0.5"/>
      {/* Staff gem */}
      <rect x="36" y="10" width="5" height="5" rx="1" fill={rage ? '#fff' : a}/>
      <rect x="37" y="11" width="3" height="3" rx="0" fill="#0f172a" opacity="0.5"/>

      {/* ── FLOATING CRYSTAL SHARDS ── */}
      <rect x="4"  y="18" width="4" height="8" rx="0" fill={a} opacity="0.6" transform="rotate(-30 6 22)"/>
      <rect x="5"  y="10" width="3" height="6" rx="0" fill="#bfdbfe" opacity="0.5" transform="rotate(-20 6 13)"/>
      <rect x="40" y="22" width="4" height="8" rx="0" fill={a} opacity="0.6" transform="rotate(30 42 26)"/>

      {/* ── LOWER ROBE / FEET ── */}
      <rect x="12" y="58" width="10" height="12" rx="1" fill="#1e3a5f"/>
      <rect x="26" y="58" width="10" height="12" rx="1" fill="#1e3a5f"/>
      {/* Ice boots */}
      <rect x="10" y="65" width="14" height="5" rx="1" fill={a} opacity="0.7"/>
      <rect x="24" y="65" width="14" height="5" rx="1" fill={a} opacity="0.7"/>
      <rect x="11" y="65" width="12" height="2" rx="0" fill="#fff" opacity="0.3"/>
      <rect x="25" y="65" width="12" height="2" rx="0" fill="#fff" opacity="0.3"/>

      {rage && <>
        <ellipse cx="24" cy="70" rx="12" ry="2.5" fill={a} opacity="0.4"/>
        <ellipse cx="24" cy="69" rx="6"  ry="1.5" fill="#fff" opacity="0.3"/>
      </>}
    </>
  );
}

// ─── WRAITH (Shadow / Void / Blood) ──────────────────────────────
function WraithBoss({ accent, rage }) {
  const a = accent;
  return (
    <>
      {/* Mist base */}
      <ellipse cx="24" cy="70" rx="20" ry="4" fill={a} opacity={rage ? 0.25 : 0.15}/>
      <ellipse cx="24" cy="70" rx="12" ry="2.5" fill="#000" opacity="0.3"/>

      {/* ── CLOAK BODY ── */}
      {/* Outer cloak shadow */}
      <path d="M4 22 Q2 48 8 68 Q16 72 24 72 Q32 72 40 68 Q46 48 44 22 Q36 16 24 16 Q12 16 4 22Z" fill="#09001a"/>
      {/* Cloak fill */}
      <path d="M5 24 Q4 48 9 67 Q17 71 24 71 Q31 71 39 67 Q44 48 43 24 Q35 18 24 18 Q13 18 5 24Z" fill="#2e1065"/>
      {/* Cloak folds */}
      <path d="M5 24 Q6 44 8 64"   stroke="#4c1d95" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <path d="M43 24 Q42 44 40 64" stroke="#4c1d95" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <path d="M14 20 Q12 44 11 68" stroke="#4c1d95" strokeWidth="1" fill="none" opacity="0.35"/>
      <path d="M34 20 Q36 44 37 68" stroke="#4c1d95" strokeWidth="1" fill="none" opacity="0.35"/>
      <path d="M24 18 L24 70"       stroke="#4c1d95" strokeWidth="1.5" fill="none" opacity="0.4"/>
      {/* Cloak edge glow */}
      <path d="M5 24 Q4 48 9 67" stroke={a} strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M43 24 Q44 48 39 67" stroke={a} strokeWidth="0.8" fill="none" opacity="0.4"/>

      {/* ── HOOD ── */}
      <ellipse cx="24" cy="20" rx="18" ry="14" fill="#09001a"/>
      <ellipse cx="24" cy="20" rx="16" ry="12" fill="#1a0535"/>
      {/* Hood highlight */}
      <ellipse cx="20" cy="14" rx="8" ry="6" fill={a} opacity="0.08"/>

      {/* ── VOID FACE (darkness inside hood) ── */}
      <ellipse cx="24" cy="22" rx="12" ry="10" fill="#000" opacity="0.85"/>
      <ellipse cx="24" cy="22" rx="10" ry="8"  fill="#09001a"/>

      {/* ── MULTIPLE EYES ── */}
      {/* Top pair */}
      <ellipse cx="19" cy="16" rx="4" ry="3" fill={a} opacity={rage ? 1 : 0.9}/>
      <ellipse cx="29" cy="16" rx="4" ry="3" fill={a} opacity={rage ? 1 : 0.9}/>
      <ellipse cx="19" cy="16" rx="2" ry="1.5" fill="#000"/>
      <ellipse cx="29" cy="16" rx="2" ry="1.5" fill="#000"/>
      <ellipse cx="18" cy="15" rx="1" ry="1" fill="#fff" opacity="0.6"/>
      <ellipse cx="28" cy="15" rx="1" ry="1" fill="#fff" opacity="0.6"/>

      {/* Middle pair */}
      <ellipse cx="17" cy="22" rx="3.5" ry="2.5" fill={a} opacity="0.8"/>
      <ellipse cx="31" cy="22" rx="3.5" ry="2.5" fill={a} opacity="0.8"/>
      <ellipse cx="17" cy="22" rx="1.5" ry="1.2" fill="#000"/>
      <ellipse cx="31" cy="22" rx="1.5" ry="1.2" fill="#000"/>

      {/* Center lone eye (rage only or always) */}
      <ellipse cx="24" cy="20" rx={rage ? 5 : 3} ry={rage ? 4 : 2.5} fill={rage ? '#fff' : a} opacity={rage ? 1 : 0.7}/>
      <ellipse cx="24" cy="20" rx={rage ? 2.5 : 1.5} ry={rage ? 2 : 1.2} fill="#000"/>
      <ellipse cx="22" cy="19" rx="1" ry="0.8" fill="#fff" opacity="0.8"/>

      {/* ── TENTACLE ARMS ── */}
      {/* Left arm */}
      <path d="M6 28 Q0 36 2 46 Q3 52 6 54" stroke="#4c1d95" strokeWidth="8" fill="none" strokeLinecap="round"/>
      <path d="M6 28 Q0 36 2 46 Q3 52 6 54" stroke="#6b21a8" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M6 28 Q0 36 2 46 Q3 52 6 54" stroke={a}       strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
      {/* Left claws */}
      <path d="M6 54 Q2 58 0 62" stroke="#e2e8f0" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M6 54 Q5 60 4 65" stroke="#e2e8f0" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M6 54 Q9 59 9 64" stroke="#e2e8f0" strokeWidth="2" fill="none" strokeLinecap="round"/>

      {/* Right arm */}
      <path d="M42 28 Q48 36 46 46 Q45 52 42 54" stroke="#4c1d95" strokeWidth="8" fill="none" strokeLinecap="round"/>
      <path d="M42 28 Q48 36 46 46 Q45 52 42 54" stroke="#6b21a8" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M42 28 Q48 36 46 46 Q45 52 42 54" stroke={a}       strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
      {/* Right claws */}
      <path d="M42 54 Q46 58 48 62" stroke="#e2e8f0" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M42 54 Q43 60 44 65" stroke="#e2e8f0" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M42 54 Q39 59 39 64" stroke="#e2e8f0" strokeWidth="2" fill="none" strokeLinecap="round"/>

      {/* ── WISPY LOWER BODY ── */}
      {[14,18,22,26,30,34].map((x,i) => (
        <rect key={i} x={x-1} y={60 + (i%3)*2} width="3" height={10 - (i%3)*2} rx="1"
          fill={a} opacity={(0.3 - i*0.02).toFixed(2)}/>
      ))}

      {rage && <>
        <ellipse cx="24" cy="65" rx="16" ry="4" fill={a} opacity="0.2"/>
        <ellipse cx="24" cy="70" rx="18" ry="3" fill={a} opacity="0.15"/>
      </>}
    </>
  );
}

// ─── TITAN (Thunder) ─────────────────────────────────────────────
function TitanBoss({ accent, rage }) {
  const a = accent;
  return (
    <>
      <ellipse cx="24" cy="70" rx="16" ry="3" fill="#000" opacity="0.35"/>
      <ellipse cx="24" cy="67" rx="20" ry="6" fill={a} opacity={rage ? 0.2 : 0.1}/>

      {/* ── HORNED HELMET ── */}
      {/* Left horn */}
      <rect x="7" y="0" width="6" height="18" rx="1" fill="#713f12" transform="rotate(-15 10 10)"/>
      <rect x="8" y="1" width="3" height="14" rx="0" fill="#92400e" transform="rotate(-15 10 10)"/>
      <rect x="8" y="1" width="2" height="6"  rx="0" fill={a}       transform="rotate(-15 10 10)" opacity="0.6"/>
      {/* Right horn */}
      <rect x="35" y="0" width="6" height="18" rx="1" fill="#713f12" transform="rotate(15 38 10)"/>
      <rect x="36" y="1" width="3" height="14" rx="0" fill="#92400e" transform="rotate(15 38 10)"/>
      <rect x="38" y="1" width="2" height="6"  rx="0" fill={a}       transform="rotate(15 38 10)" opacity="0.6"/>

      {/* ── HELMET ── */}
      <rect x="10" y="8"  width="28" height="20" rx="3" fill="#3c1f08"/>
      <rect x="11" y="9"  width="26" height="18" rx="2" fill="#713f12"/>
      <rect x="11" y="9"  width="26" height="6"  rx="2" fill="#92400e"/>
      {/* Helmet visor slit */}
      <rect x="13" y="18" width="22" height="5" rx="1" fill="#0a0500"/>
      <rect x="14" y="18" width="20" height="3" rx="0" fill="#1c0a00" opacity="0.8"/>
      {/* Visor glow */}
      <rect x="14" y="19" width="20" height="2" rx="0" fill={rage ? '#fff' : a} opacity={rage ? 0.9 : 0.7}/>
      {/* Helmet cheek guards */}
      <rect x="10" y="18" width="4" height="10" rx="1" fill="#3c1f08"/>
      <rect x="34" y="18" width="4" height="10" rx="1" fill="#3c1f08"/>
      {/* Helmet nose guard */}
      <rect x="22" y="14" width="4" height="14" rx="0" fill="#3c1f08"/>
      <rect x="23" y="15" width="2" height="12" rx="0" fill="#92400e" opacity="0.5"/>

      {/* ── NECK/GORGET ── */}
      <rect x="18" y="27" width="12" height="8" rx="1" fill="#3c1f08"/>
      <rect x="19" y="28" width="10" height="6" rx="0" fill="#713f12"/>
      <rect x="19" y="28" width="10" height="2" rx="0" fill="#92400e" opacity="0.5"/>

      {/* ── MASSIVE BODY ── */}
      <rect x="6"  y="33" width="36" height="24" rx="2" fill="#3c1f08"/>
      <rect x="7"  y="34" width="34" height="22" rx="2" fill="#713f12"/>
      {/* Plate armour */}
      <rect x="9"  y="35" width="30" height="18" rx="1" fill="#92400e"/>
      <rect x="9"  y="35" width="30" height="5"  rx="0" fill="#b45309"/>
      {/* Rivets */}
      {[11,17,23,29,35].map((x,i) => (
        <rect key={i} x={x} y="36" width="2" height="2" rx="1" fill={a} opacity="0.7"/>
      ))}
      {/* Centre plate line */}
      <rect x="23" y="35" width="2" height="18" fill="#3c1f08" opacity="0.4"/>
      {/* Lightning bolt marking */}
      <polygon points="22,38 20,45 23,43 21,50 26,42 23,44" fill={rage ? '#fff' : a} opacity={rage ? 0.9 : 0.8}/>

      {/* ── SHOULDERS (massive pauldrons) ── */}
      <rect x="3"  y="32" width="8"  height="12" rx="2" fill="#92400e"/>
      <rect x="4"  y="33" width="6"  height="10" rx="1" fill="#b45309"/>
      <rect x="4"  y="33" width="6"  height="3"  rx="0" fill={a} opacity="0.4"/>
      <rect x="37" y="32" width="8"  height="12" rx="2" fill="#92400e"/>
      <rect x="37" y="33" width="6"  height="10" rx="1" fill="#b45309"/>
      <rect x="37" y="33" width="6"  height="3"  rx="0" fill={a} opacity="0.4"/>

      {/* ── LEFT ARM ── */}
      <rect x="1"  y="42" width="8"  height="16" rx="2" fill="#713f12"/>
      <rect x="2"  y="43" width="6"  height="12" rx="1" fill="#92400e"/>
      <rect x="1"  y="50" width="8"  height="3"  fill="#3c1f08"/>
      {/* LEFT GAUNTLET */}
      <rect x="0"  y="56" width="10" height="8" rx="2" fill={a} opacity="0.7"/>
      <rect x="1"  y="57" width="8"  height="6" rx="1" fill={rage ? '#fff' : '#fef9c3'} opacity="0.5"/>
      <rect x="0"  y="62" width="3"  height="5" rx="0" fill="#e2e8f0"/>
      <rect x="4"  y="62" width="3"  height="6" rx="0" fill="#e2e8f0"/>
      <rect x="8"  y="62" width="3"  height="5" rx="0" fill="#e2e8f0"/>

      {/* ── RIGHT ARM + HAMMER ── */}
      <rect x="39" y="42" width="8"  height="16" rx="2" fill="#713f12"/>
      <rect x="39" y="43" width="6"  height="12" rx="1" fill="#92400e"/>
      <rect x="39" y="50" width="8"  height="3"  fill="#3c1f08"/>
      {/* HAMMER HANDLE */}
      <rect x="44" y="10" width="4"  height="48" rx="1" fill="#3c1f08"/>
      <rect x="45" y="10" width="2"  height="46" rx="0" fill="#713f12" opacity="0.6"/>
      {/* HAMMER HEAD */}
      <rect x="40" y="6"  width="12" height="16" rx="2" fill="#1e293b"/>
      <rect x="41" y="7"  width="10" height="14" rx="1" fill="#334155"/>
      <rect x="41" y="7"  width="10" height="4"  rx="0" fill="#475569"/>
      {/* Hammer electric charge */}
      <rect x="40" y="6"  width="12" height="16" rx="2" fill={a} opacity={rage ? 0.3 : 0.15}/>
      <polygon points="48,10 45,16 47,15 44,22 50,14 47,16" fill={rage ? '#fff' : a} opacity="0.8"/>

      {/* ── LEGS ── */}
      <rect x="10" y="56" width="12" height="14" rx="1" fill="#713f12"/>
      <rect x="11" y="57" width="10" height="11" rx="0" fill="#92400e" opacity="0.6"/>
      <rect x="9"  y="66" width="14" height="5"  rx="1" fill="#3c1f08"/>
      <rect x="10" y="67" width="12" height="3"  fill="#713f12" opacity="0.5"/>

      <rect x="26" y="56" width="12" height="14" rx="1" fill="#713f12"/>
      <rect x="27" y="57" width="10" height="11" rx="0" fill="#92400e" opacity="0.6"/>
      <rect x="25" y="66" width="14" height="5"  rx="1" fill="#3c1f08"/>
      <rect x="26" y="67" width="12" height="3"  fill="#713f12" opacity="0.5"/>

      {/* Electric arcs (rage) */}
      {rage && <>
        <path d="M1 44 Q-3 46 0 50" stroke={a} strokeWidth="1.5" fill="none" opacity="0.8"/>
        <path d="M0 48 Q-4 50 1 53" stroke={a} strokeWidth="1"   fill="none" opacity="0.6"/>
        <path d="M47 44 Q51 46 48 50" stroke={a} strokeWidth="1.5" fill="none" opacity="0.8"/>
        <ellipse cx="24" cy="70" rx="16" ry="3" fill={a} opacity="0.25"/>
      </>}
    </>
  );
}

// ─── GOLEM (Earth / Poison) ──────────────────────────────────────
function GolemBoss({ accent, rage }) {
  const a = accent;
  return (
    <>
      <ellipse cx="24" cy="70" rx="18" ry="3.5" fill="#000" opacity="0.4"/>
      <ellipse cx="24" cy="67" rx="22" ry="6" fill={a} opacity={rage ? 0.2 : 0.1}/>

      {/* ── HUGE ROCKY BODY ── */}
      {/* Main body silhouette */}
      <rect x="5"  y="28" width="38" height="38" rx="4" fill="#1c1917"/>
      <rect x="6"  y="29" width="36" height="36" rx="3" fill="#292524"/>
      {/* Rock face detail */}
      <rect x="8"  y="30" width="12" height="10" rx="1" fill="#44403c" opacity="0.8"/>
      <rect x="24" y="32" width="14" height="8"  rx="1" fill="#44403c" opacity="0.7"/>
      <rect x="10" y="44" width="10" height="8"  rx="1" fill="#44403c" opacity="0.6"/>
      <rect x="26" y="46" width="12" height="8"  rx="1" fill="#44403c" opacity="0.7"/>
      <rect x="8"  y="56" width="16" height="7"  rx="1" fill="#44403c" opacity="0.65"/>
      <rect x="28" y="54" width="12" height="9"  rx="1" fill="#44403c" opacity="0.65"/>

      {/* ── GLOWING CRACKS ── */}
      <path d="M18 30 L14 40 L18 44 L15 56" stroke={a} strokeWidth="2.5" fill="none" opacity={rage ? 1 : 0.75}/>
      <path d="M30 32 L33 44 L29 48 L32 60" stroke={a} strokeWidth="2.5" fill="none" opacity={rage ? 1 : 0.75}/>
      <path d="M14 36 L8  42"               stroke={a} strokeWidth="1.5" fill="none" opacity={rage ? 0.9 : 0.6}/>
      <path d="M34 40 L40 46"               stroke={a} strokeWidth="1.5" fill="none" opacity={rage ? 0.9 : 0.6}/>
      <path d="M12 52 L20 56 L16 62"        stroke={a} strokeWidth="2"   fill="none" opacity={rage ? 0.9 : 0.65}/>
      <path d="M36 50 L30 54 L33 62"        stroke={a} strokeWidth="2"   fill="none" opacity={rage ? 0.9 : 0.65}/>
      {/* Crack glow layer */}
      <path d="M18 30 L14 40 L18 44 L15 56" stroke={a} strokeWidth="5" fill="none" opacity="0.12"/>
      <path d="M30 32 L33 44 L29 48 L32 60" stroke={a} strokeWidth="5" fill="none" opacity="0.12"/>

      {/* ── MOSSY PATCHES ── */}
      <rect x="6"  y="29" width="6"  height="4" rx="1" fill={a} opacity="0.25"/>
      <rect x="36" y="32" width="5"  height="3" rx="1" fill={a} opacity="0.2"/>
      <rect x="8"  y="54" width="8"  height="3" rx="1" fill={a} opacity="0.2"/>
      <rect x="34" y="58" width="6"  height="3" rx="1" fill={a} opacity="0.2"/>

      {/* ── HEAD ── */}
      <rect x="10" y="10" width="28" height="22" rx="4" fill="#1c1917"/>
      <rect x="11" y="11" width="26" height="20" rx="3" fill="#292524"/>
      {/* Rock brow */}
      <rect x="10" y="10" width="28" height="6" rx="3" fill="#44403c"/>
      {/* Eye sockets */}
      <rect x="13" y="17" width="9" height="8" rx="2" fill="#000"/>
      <rect x="26" y="17" width="9" height="8" rx="2" fill="#000"/>
      {/* EYES – glowing cracks */}
      <rect x="14" y="18" width="7" height="6" rx="1" fill={rage ? '#fff' : a} opacity={rage ? 1 : 0.9}/>
      <rect x="27" y="18" width="7" height="6" rx="1" fill={rage ? '#fff' : a} opacity={rage ? 1 : 0.9}/>
      <rect x="16" y="20" width="3" height="2" fill="#000"/>
      <rect x="29" y="20" width="3" height="2" fill="#000"/>
      {/* Eye cracks */}
      <path d="M14 21 L21 21" stroke={a} strokeWidth="1.5" fill="none"/>
      <path d="M27 21 L34 21" stroke={a} strokeWidth="1.5" fill="none"/>
      {/* Nose crags */}
      <rect x="21" y="27" width="6" height="4" rx="1" fill="#1c1917" opacity="0.8"/>
      {/* Mouth */}
      <rect x="13" y="29" width="22" height="4" rx="0" fill="#000"/>
      {[14,17,20,23,26,29,32].map((x,i) => (
        <rect key={i} x={x} y={29} width="2" height="4" rx="0" fill="#44403c" opacity="0.8"/>
      ))}

      {/* ── FOUR ARMS ── */}
      {/* Upper left arm */}
      <rect x="0"  y="28" width="8"  height="16" rx="2" fill="#292524"/>
      <rect x="1"  y="29" width="6"  height="13" rx="1" fill="#44403c"/>
      <path d="M0 40 L-2 46" stroke={a} strokeWidth="1.5" fill="none" opacity="0.5"/>
      {/* Upper left fist */}
      <rect x="-1" y="42" width="10" height="8" rx="2" fill="#292524"/>
      <rect x="0"  y="43" width="8"  height="6" rx="1" fill="#44403c"/>

      {/* Lower left arm */}
      <rect x="0"  y="46" width="8"  height="14" rx="2" fill="#292524"/>
      <rect x="1"  y="47" width="6"  height="11" rx="1" fill="#44403c"/>
      {/* Lower left fist */}
      <rect x="-1" y="58" width="10" height="8" rx="2" fill="#1c1917"/>
      <rect x="0"  y="59" width="8"  height="6" rx="1" fill="#292524"/>

      {/* Upper right arm */}
      <rect x="40" y="28" width="8"  height="16" rx="2" fill="#292524"/>
      <rect x="41" y="29" width="6"  height="13" rx="1" fill="#44403c"/>
      <path d="M48 40 L50 46" stroke={a} strokeWidth="1.5" fill="none" opacity="0.5"/>
      {/* Upper right fist */}
      <rect x="39" y="42" width="10" height="8" rx="2" fill="#292524"/>
      <rect x="40" y="43" width="8"  height="6" rx="1" fill="#44403c"/>

      {/* Lower right arm */}
      <rect x="40" y="46" width="8"  height="14" rx="2" fill="#292524"/>
      <rect x="41" y="47" width="6"  height="11" rx="1" fill="#44403c"/>
      {/* Lower right fist */}
      <rect x="39" y="58" width="10" height="8" rx="2" fill="#1c1917"/>
      <rect x="40" y="59" width="8"  height="6" rx="1" fill="#292524"/>

      {/* Knuckle ridges */}
      {[0,3,6].map(dx => (
        <React.Fragment key={dx}>
          <rect x={dx}    y="42" width="2" height="3" rx="0" fill={a} opacity="0.4"/>
          <rect x={40+dx} y="42" width="2" height="3" rx="0" fill={a} opacity="0.4"/>
        </React.Fragment>
      ))}

      {/* ── MASSIVE LEGS ── */}
      <rect x="9"  y="64" width="13" height="8" rx="1" fill="#292524"/>
      <rect x="26" y="64" width="13" height="8" rx="1" fill="#292524"/>
      <rect x="8"  y="68" width="15" height="4" rx="2" fill="#1c1917"/>
      <rect x="25" y="68" width="15" height="4" rx="2" fill="#1c1917"/>

      {rage && <>
        <ellipse cx="24" cy="70" rx="20" ry="3.5" fill={a} opacity="0.3"/>
        <path d="M18 30 L14 40 L18 44 L15 56" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4"/>
        <path d="M30 32 L33 44 L29 48 L32 60" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4"/>
      </>}
    </>
  );
}

// ─── HARPY (Wind) ────────────────────────────────────────────────
function HarpyBoss({ accent, rage }) {
  const a = accent;
  return (
    <>
      <ellipse cx="24" cy="70" rx="16" ry="3" fill="#000" opacity="0.25"/>
      {/* Wind swirl base */}
      <ellipse cx="24" cy="65" rx="20" ry="7" fill={a} opacity={rage ? 0.2 : 0.1}/>

      {/* ── LARGE FEATHERED WINGS ── */}
      {/* Left wing outer */}
      <path d="M12 26 Q-6 20 -4 10 Q4 16 8 24Z"   fill="#065f46" opacity="0.9"/>
      <path d="M12 30 Q-8 28 -6 16 Q2 22 8 28Z"   fill="#065f46" opacity="0.85"/>
      <path d="M12 34 Q-4 34 -2 22 Q4 28 9 32Z"   fill="#065f46" opacity="0.8"/>
      <path d="M12 38 Q-2 40 0 28 Q6 34 10 36Z"   fill="#065f46" opacity="0.75"/>
      {/* Left wing highlight */}
      <path d="M12 26 Q-2 22 0 14 Q6 18 10 24Z"   fill={a} opacity="0.45"/>
      <path d="M12 30 Q-2 28 0 20 Q6 24 10 28Z"   fill={a} opacity="0.35"/>
      <path d="M12 34 Q0 34 2 26 Q7 30 11 33Z"    fill={a} opacity="0.3"/>
      {/* Left feather quills */}
      <line x1="12" y1="26" x2="-4" y2="10" stroke={a} strokeWidth="1" opacity="0.4"/>
      <line x1="12" y1="30" x2="-6" y2="16" stroke={a} strokeWidth="1" opacity="0.35"/>
      <line x1="12" y1="34" x2="-3" y2="22" stroke={a} strokeWidth="0.8" opacity="0.3"/>
      <line x1="12" y1="38" x2="-1" y2="28" stroke={a} strokeWidth="0.8" opacity="0.25"/>

      {/* Right wing outer */}
      <path d="M36 26 Q54 20 52 10 Q44 16 40 24Z"  fill="#065f46" opacity="0.9"/>
      <path d="M36 30 Q56 28 54 16 Q46 22 40 28Z"  fill="#065f46" opacity="0.85"/>
      <path d="M36 34 Q52 34 50 22 Q44 28 39 32Z"  fill="#065f46" opacity="0.8"/>
      <path d="M36 38 Q50 40 48 28 Q42 34 38 36Z"  fill="#065f46" opacity="0.75"/>
      {/* Right wing highlight */}
      <path d="M36 26 Q50 22 48 14 Q42 18 38 24Z"  fill={a} opacity="0.45"/>
      <path d="M36 30 Q50 28 48 20 Q42 24 38 28Z"  fill={a} opacity="0.35"/>
      <path d="M36 34 Q48 34 46 26 Q41 30 37 33Z"  fill={a} opacity="0.3"/>
      <line x1="36" y1="26" x2="52" y2="10" stroke={a} strokeWidth="1"   opacity="0.4"/>
      <line x1="36" y1="30" x2="54" y2="16" stroke={a} strokeWidth="1"   opacity="0.35"/>
      <line x1="36" y1="34" x2="51" y2="22" stroke={a} strokeWidth="0.8" opacity="0.3"/>
      <line x1="36" y1="38" x2="49" y2="28" stroke={a} strokeWidth="0.8" opacity="0.25"/>

      {/* ── HEAD ── */}
      <ellipse cx="24" cy="16" rx="12" ry="11" fill="#022c22"/>
      <ellipse cx="24" cy="16" rx="10" ry="9"  fill="#064e3b"/>
      {/* Feather crest */}
      {[-6,-3,0,3,6].map((dx,i) => (
        <rect key={i} x={24+dx-1} y={4-(i%2===0?4:2)} width="2.5" height={i%2===0?10:8} rx="0.5"
          fill={i%2===0 ? a : '#5eead4'} opacity={i%2===0?0.9:0.7}/>
      ))}
      {/* Face */}
      <ellipse cx="24" cy="17" rx="8" ry="7" fill="#064e3b"/>
      {/* Eyes */}
      <ellipse cx="20" cy="14" rx="3.5" ry="3" fill="#000"/>
      <ellipse cx="28" cy="14" rx="3.5" ry="3" fill="#000"/>
      <ellipse cx="20" cy="14" rx="2.5" ry="2" fill={rage ? '#fff' : a}/>
      <ellipse cx="28" cy="14" rx="2.5" ry="2" fill={rage ? '#fff' : a}/>
      <ellipse cx="19" cy="13" rx="1"   ry="0.8" fill="#fff" opacity="0.7"/>
      <ellipse cx="27" cy="13" rx="1"   ry="0.8" fill="#fff" opacity="0.7"/>
      {/* Beak */}
      <path d="M21 19 L24 23 L27 19Z" fill="#92400e"/>
      <path d="M21 19 L24 21 L27 19Z" fill="#b45309"/>
      {/* Beak line */}
      <line x1="21" y1="19" x2="27" y2="19" stroke="#78350f" strokeWidth="1"/>

      {/* ── SLENDER BODY ── */}
      <rect x="17" y="24" width="14" height="26" rx="5" fill="#022c22"/>
      <rect x="18" y="25" width="12" height="24" rx="4" fill="#064e3b"/>
      {/* Breast feathers */}
      <rect x="18" y="26" width="12" height="8"  rx="3" fill="#065f46"/>
      <rect x="18" y="26" width="12" height="4"  rx="2" fill={a} opacity="0.3"/>
      {/* Belly scales */}
      {[28,32,36,40].map((y,i) => (
        <rect key={i} x={19+i%2} y={y} width={10-i%2} height="2.5" rx="1" fill="#065f46" opacity="0.5"/>
      ))}
      {/* Chest rune / feather mark */}
      <ellipse cx="24" cy="34" rx="3" ry="4" fill={a} opacity="0.2"/>
      <rect cx="24" x="23" y="32" width="2" height="4" rx="0" fill={a} opacity="0.5"/>

      {/* ── TALONED ARMS ── */}
      <rect x="10" y="28" width="8" height="14" rx="3" fill="#064e3b"/>
      <rect x="11" y="29" width="6" height="11" rx="2" fill="#065f46"/>
      {/* Left talons */}
      <path d="M10 40 Q8  46 7  50" stroke="#92400e" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M13 40 Q12 46 11 50" stroke="#92400e" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M16 40 Q16 46 15 50" stroke="#92400e" strokeWidth="3" fill="none" strokeLinecap="round"/>

      <rect x="30" y="28" width="8" height="14" rx="3" fill="#064e3b"/>
      <rect x="31" y="29" width="6" height="11" rx="2" fill="#065f46"/>
      {/* Right talons */}
      <path d="M30 40 Q30 46 29 50" stroke="#92400e" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M33 40 Q33 46 32 50" stroke="#92400e" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M36 40 Q37 46 37 50" stroke="#92400e" strokeWidth="3" fill="none" strokeLinecap="round"/>

      {/* ── CYCLONE BASE (no legs) ── */}
      {/* Wind rings */}
      <ellipse cx="24" cy="55" rx="12" ry="4" fill="none" stroke={a} strokeWidth="2"   opacity="0.5"/>
      <ellipse cx="24" cy="59" rx="14" ry="4" fill="none" stroke={a} strokeWidth="1.5" opacity="0.4"/>
      <ellipse cx="24" cy="63" rx="16" ry="4" fill="none" stroke={a} strokeWidth="1"   opacity="0.3"/>
      <ellipse cx="24" cy="66" rx="18" ry="4" fill="none" stroke={a} strokeWidth="0.8" opacity="0.2"/>
      {/* Wind streaks */}
      {[-8,-4,0,4,8].map((dx,i) => (
        <rect key={i} x={24+dx-1} y={52+(i%2)*2} width="2" height={14-(i%2)*2} rx="1"
          fill={a} opacity={(0.35-i*0.02).toFixed(2)}/>
      ))}

      {rage && <>
        <ellipse cx="24" cy="55" rx="14" ry="5" fill={a} opacity="0.2"/>
        <ellipse cx="24" cy="60" rx="18" ry="5" fill={a} opacity="0.15"/>
      </>}
    </>
  );
}

// ─── Old pixel-art archetype map (fallback for elements without a new sprite) ──
const ELEMENT_TO_ARCHETYPE = {
  Fire: DemonBoss, Lava: DemonBoss,
  Ice: LichBoss, Crystal: LichBoss, Storm: LichBoss,
  Shadow: WraithBoss, Void: WraithBoss, Blood: WraithBoss,
  Thunder: TitanBoss,
  Earth: GolemBoss, Poison: GolemBoss,
  Wind: HarpyBoss,
};

// ─── New SVG sprite lookup ────────────────────────────────────────
// Returns the new sprite component to use, or null to fall back to pixel art.
function getNewSprite(boss) {
  // Mob types by id
  if (boss.isMob) {
    if (boss.id === 'vampire') return VampireLord;
    if (boss.id === 'zombie')  return ZombieBrute;
    if (boss.id === 'demon')   return FireDemon;
    if (boss.id === 'ghost')   return ShadowWraith;
  }
  // Element-based mapping for bosses (and mob fallthrough)
  switch (boss.element) {
    case 'Fire':    case 'Lava':   return FireDemon;
    case 'Ice':                    return IceGolem;
    case 'Shadow':  case 'Void':
    case 'Blood':                  return ShadowWraith;
    case 'Thunder':                return ThunderTitan;
    case 'Earth':   case 'Poison': return EarthColossus;
    default:                       return null;   // Wind, Crystal, Storm → pixel art
  }
}

// ─── Main component ───────────────────────────────────────────────
export default function BossSprite({ boss, size = 96, isRage = false }) {
  const theme  = ELEMENT_THEMES[boss.element] || ELEMENT_THEMES.Fire;
  const accent = theme.color;

  // size here is the "width-equivalent" from callers (old API: width=size, height=size*1.5)
  // New sprites use size as HEIGHT. Translate: newHeight = size * 1.5
  const NewSprite = getNewSprite(boss);
  if (NewSprite) {
    const spriteHeight = Math.round(size * 1.5);
    return (
      <div
        style={{
          filter: isRage
            ? `drop-shadow(0 0 12px ${accent}) drop-shadow(0 0 24px ${accent}88) brightness(1.2)`
            : `drop-shadow(0 0 6px ${accent}99) drop-shadow(0 0 14px ${accent}44)`,
          transition: 'filter 0.4s ease',
          display: 'inline-block',
        }}
      >
        <NewSprite size={spriteHeight} rage={isRage} />
      </div>
    );
  }

  // ── Pixel-art fallback ──────────────────────────────────────────
  const Shape = ELEMENT_TO_ARCHETYPE[boss.element] || DemonBoss;
  return (
    <div
      style={{
        filter: isRage
          ? `drop-shadow(0 0 14px ${accent}) drop-shadow(0 0 28px ${accent}88) brightness(1.25)`
          : `drop-shadow(0 0 8px ${accent}99) drop-shadow(0 0 18px ${accent}44)`,
        transition: 'filter 0.4s ease',
        animation: `pixelBob ${isRage ? '1.4s' : '2s'} ease-in-out infinite`,
        display: 'inline-block',
      }}
    >
      <svg
        viewBox="0 0 48 72"
        width={size}
        height={size * 1.5}
        style={{ imageRendering: 'pixelated', overflow: 'visible' }}
      >
        <defs>
          <radialGradient id={`boss-bg-${boss.id || boss.element}`} cx="50%" cy="70%" r="65%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.18"/>
            <stop offset="100%" stopColor={accent} stopOpacity="0"/>
          </radialGradient>
        </defs>
        <ellipse cx="24" cy="44" rx="26" ry="30" fill={`url(#boss-bg-${boss.id || boss.element})`}/>
        <Shape accent={accent} rage={isRage}/>
        {isRage && (
          <rect x="0" y="0" width="48" height="72" fill="#ef4444" opacity="0.06" rx="4"/>
        )}
      </svg>
    </div>
  );
}
