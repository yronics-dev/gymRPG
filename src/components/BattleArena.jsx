import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getPlayerBattleStats, runBattleTurn } from '../utils/gameLogic';
import { ELEMENT_THEMES, BOSS_DIALOGUES } from '../constants';
import CharacterSprite from './CharacterSprite';
import BossSprite from './BossSprite';
import GameIcon from './GameIcon';
import BattleScene from './combat/BattleScene';

// ════════════════════════════════════════════════════════════
//  PIXEL-ART BATTLE BACKGROUNDS — one per element family
//  SVG viewBox="0 0 360 280", preserveAspectRatio slice.
//  These render BEHIND the fighters to give depth & context.
// ════════════════════════════════════════════════════════════

function BgFire({ color }) {
  // Volcanic dungeon: stone walls, lava rivers, fire torches
  return (
    <svg viewBox="0 0 360 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, imageRendering: 'pixelated' }}>
      {/* Sky / ceiling */}
      <rect x="0" y="0" width="360" height="280" fill="#1a0800"/>
      {/* Stone ceiling blocks */}
      {[0,40,80,120,160,200,240,280,320].map((x,i)=>(
        <rect key={i} x={x} y="0" width="38" height={18+(i%3)*4} rx="0" fill={i%2===0?'#2a1200':'#1f0e00'}/>
      ))}
      {/* Stalactites */}
      {[20,70,120,175,230,285,330].map((x,i)=>(
        <polygon key={i} points={`${x},${14+(i%2)*4} ${x+8},${14+(i%2)*4} ${x+4},${40+(i%3)*10}`} fill="#1a0800"/>
      ))}
      {/* Back wall stone rows */}
      {[0,1,2,3,4].map(row=>(
        <React.Fragment key={row}>
          {[0,48,96,144,192,240,288,336].map((x,ci)=>(
            <rect key={ci} x={x+(row%2)*24} y={55+row*28} width="46" height="26" rx="0"
              fill={row%2===0?'#2a1500':'#220f00'} stroke="#1a0a00" strokeWidth="1"/>
          ))}
        </React.Fragment>
      ))}
      {/* Lava floor glow */}
      <rect x="0" y="240" width="360" height="40" fill="#7f1d1d" opacity="0.8"/>
      <rect x="0" y="252" width="360" height="28" fill="#b91c1c" opacity="0.7"/>
      <rect x="0" y="260" width="360" height="20" fill="#dc2626" opacity="0.6"/>
      {/* Lava highlights */}
      {[20,80,140,210,280,330].map((x,i)=>(
        <ellipse key={i} cx={x} cy={268+(i%2)*4} rx={18+(i%3)*8} ry="4" fill={color} opacity="0.55"/>
      ))}
      {/* Left torch */}
      <rect x="18" y="85" width="6" height="22" rx="1" fill="#78350f"/>
      <rect x="15" y="80" width="12" height="8"  rx="1" fill="#92400e"/>
      <ellipse cx="21" cy="80" rx="6" ry="8" fill={color} opacity="0.9"/>
      <ellipse cx="21" cy="78" rx="3" ry="5" fill="#fef9c3" opacity="0.8"/>
      {/* Right torch */}
      <rect x="336" y="85" width="6" height="22" rx="1" fill="#78350f"/>
      <rect x="333" y="80" width="12" height="8"  rx="1" fill="#92400e"/>
      <ellipse cx="339" cy="80" rx="6" ry="8" fill={color} opacity="0.9"/>
      <ellipse cx="339" cy="78" rx="3" ry="5" fill="#fef9c3" opacity="0.8"/>
      {/* Lava column left */}
      <rect x="30" y="150" width="20" height="90" rx="2" fill="#7f1d1d"/>
      <rect x="32" y="152" width="16" height="88" rx="1" fill="#991b1b"/>
      {/* Lava column right */}
      <rect x="310" y="150" width="20" height="90" rx="2" fill="#7f1d1d"/>
      <rect x="312" y="152" width="16" height="88" rx="1" fill="#991b1b"/>
      {/* Arena floor cracks */}
      <path d="M80 240 L120 240 L140 248 L180 244" stroke={color} strokeWidth="2" fill="none" opacity="0.5"/>
      <path d="M220 244 L260 240 L290 248" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4"/>
    </svg>
  );
}

function BgIce({ color }) {
  // Ice cave: blue/white ice walls, stalactites, frost floor
  return (
    <svg viewBox="0 0 360 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, imageRendering: 'pixelated' }}>
      <rect x="0" y="0" width="360" height="280" fill="#0a1628"/>
      {/* Ice ceiling blocks */}
      {[0,40,80,120,160,200,240,280,320].map((x,i)=>(
        <rect key={i} x={x} y="0" width="38" height={20+(i%3)*5} rx="0" fill={i%2===0?'#1e3a5f':'#172f4c'}/>
      ))}
      {/* Ice stalactites */}
      {[15,55,105,160,205,255,310,350].map((x,i)=>(
        <React.Fragment key={i}>
          <polygon points={`${x},${18+(i%2)*6} ${x+10},${18+(i%2)*6} ${x+5},${50+(i%3)*15}`}
            fill={i%2===0?'#bfdbfe':'#93c5fd'} opacity="0.7"/>
          <polygon points={`${x+1},${18+(i%2)*6} ${x+9},${18+(i%2)*6} ${x+5},${48+(i%3)*15}`}
            fill="#dbeafe" opacity="0.4"/>
        </React.Fragment>
      ))}
      {/* Back wall ice */}
      {[0,1,2,3].map(row=>(
        <React.Fragment key={row}>
          {[0,52,104,156,208,260,312].map((x,ci)=>(
            <rect key={ci} x={x+(row%2)*26} y={55+row*30} width="50" height="28" rx="0"
              fill={row%2===0?'#1e3a5f':'#172f4c'} stroke="#0f2a4a" strokeWidth="1" opacity="0.9"/>
          ))}
        </React.Fragment>
      ))}
      {/* Crystal formations */}
      {[60,170,290].map((x,i)=>(
        <React.Fragment key={i}>
          <polygon points={`${x},200 ${x+8},170 ${x+16},200`} fill={color} opacity="0.6"/>
          <polygon points={`${x+4},200 ${x+10},175 ${x+18},200`} fill="#bfdbfe" opacity="0.4"/>
        </React.Fragment>
      ))}
      {/* Frost floor */}
      <rect x="0" y="242" width="360" height="38" fill="#1e3a5f" opacity="0.8"/>
      <rect x="0" y="248" width="360" height="32" fill="#1d4ed8" opacity="0.25"/>
      {[30,90,150,220,290,340].map((x,i)=>(
        <ellipse key={i} cx={x} cy="250" rx={22+(i%3)*6} ry="5" fill={color} opacity="0.35"/>
      ))}
      {/* Ice pillars */}
      <rect x="25" y="120" width="18" height="130" rx="2" fill="#1e3a5f" opacity="0.9"/>
      <rect x="27" y="122" width="8"  height="126" rx="1" fill="#bfdbfe" opacity="0.2"/>
      <rect x="317" y="120" width="18" height="130" rx="2" fill="#1e3a5f" opacity="0.9"/>
      <rect x="319" y="122" width="8"  height="126" rx="1" fill="#bfdbfe" opacity="0.2"/>
      {/* Torch-crystals */}
      <rect x="18" y="88" width="6" height="18" rx="1" fill="#1e3a5f"/>
      <polygon points="15,88 21,72 27,88" fill={color} opacity="0.9"/>
      <polygon points="17,88 21,78 25,88" fill="#fff" opacity="0.5"/>
      <rect x="336" y="88" width="6" height="18" rx="1" fill="#1e3a5f"/>
      <polygon points="333,88 339,72 345,88" fill={color} opacity="0.9"/>
      <polygon points="335,88 339,78 343,88" fill="#fff" opacity="0.5"/>
    </svg>
  );
}

function BgShadow({ color }) {
  // Dark void dungeon: floating stone platforms, runes, spectral orbs
  return (
    <svg viewBox="0 0 360 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, imageRendering: 'pixelated' }}>
      <rect x="0" y="0" width="360" height="280" fill="#05000f"/>
      {/* Deep void gradient */}
      <rect x="0" y="0" width="360" height="280" fill="url(#voidGrad)" opacity="0.6"/>
      <defs>
        <radialGradient id="voidGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* Floating stone platforms */}
      {[40,130,220,310].map((x,i)=>(
        <React.Fragment key={i}>
          <rect x={x} y={60+(i%3)*25} width={40+(i%2)*20} height="12" rx="2" fill="#1a0535" opacity="0.9"/>
          <rect x={x+1} y={60+(i%3)*25} width={38+(i%2)*20} height="4"  rx="1" fill={color} opacity="0.15"/>
        </React.Fragment>
      ))}
      {/* Rune circles on floor */}
      {[90,180,270].map((x,i)=>(
        <React.Fragment key={i}>
          <circle cx={x} cy="240" r={20+(i%2)*8} fill="none" stroke={color} strokeWidth="1" opacity="0.35"/>
          <circle cx={x} cy="240" r={10+(i%2)*4} fill="none" stroke={color} strokeWidth="0.8" opacity="0.25"/>
          {[0,60,120,180,240,300].map(a=>(
            <line key={a}
              x1={x} y1="240"
              x2={x+Math.cos(a*Math.PI/180)*(20+(i%2)*8)}
              y2={240+Math.sin(a*Math.PI/180)*(20+(i%2)*8)}
              stroke={color} strokeWidth="0.5" opacity="0.2"/>
          ))}
        </React.Fragment>
      ))}
      {/* Spectral orbs */}
      {[50,140,240,310].map((x,i)=>(
        <React.Fragment key={i}>
          <circle cx={x} cy={90+(i%3)*30} r={5+(i%2)*3} fill={color} opacity="0.5"/>
          <circle cx={x} cy={90+(i%3)*30} r={2+(i%2)*1} fill="#fff"  opacity="0.4"/>
        </React.Fragment>
      ))}
      {/* Stone floor */}
      <rect x="0" y="240" width="360" height="40" fill="#09001a" opacity="0.95"/>
      {[0,60,120,180,240,300].map((x,i)=>(
        <rect key={i} x={x} y="240" width="58" height="40" rx="0" fill={i%2===0?'#0f0025':'#09001a'} stroke="#05000f" strokeWidth="1"/>
      ))}
      {/* Dark pillars */}
      <rect x="20" y="100" width="22" height="140" rx="2" fill="#09001a" opacity="0.95"/>
      <rect x="22" y="102" width="6"  height="136" rx="1" fill={color} opacity="0.12"/>
      <rect x="318" y="100" width="22" height="140" rx="2" fill="#09001a" opacity="0.95"/>
      <rect x="320" y="102" width="6"  height="136" rx="1" fill={color} opacity="0.12"/>
      {/* Eye patterns on walls */}
      {[60,300].map((x,i)=>(
        <React.Fragment key={i}>
          <ellipse cx={x} cy="160" rx="8" ry="6" fill={color} opacity="0.5"/>
          <ellipse cx={x} cy="160" rx="3" ry="4" fill="#000"/>
          <ellipse cx={x-1} cy="158" rx="1" ry="1" fill="#fff" opacity="0.8"/>
        </React.Fragment>
      ))}
    </svg>
  );
}

function BgThunder({ color }) {
  // Storm arena: stone platform, dark clouds, lightning arcs
  return (
    <svg viewBox="0 0 360 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, imageRendering: 'pixelated' }}>
      <rect x="0" y="0" width="360" height="280" fill="#0c0800"/>
      {/* Storm clouds */}
      {[0,80,160,240].map((x,i)=>(
        <React.Fragment key={i}>
          <rect x={x}    y={10+(i%2)*8} width="90" height="35" rx="10" fill="#1c1004" opacity="0.95"/>
          <rect x={x+10} y={6+(i%2)*8}  width="70" height="30" rx="8"  fill="#251606" opacity="0.9"/>
          <rect x={x+5}  y={12+(i%2)*8} width="80" height="20" rx="6"  fill={color}   opacity="0.05"/>
        </React.Fragment>
      ))}
      {/* Lightning bolts (static) */}
      {[[80,40,95,120],[200,35,188,115],[290,42,302,118]].map(([x1,y1,x2,y2],i)=>(
        <React.Fragment key={i}>
          <polyline points={`${x1},${y1} ${x1-6},${(y1+y2)/2} ${x2},${y2}`}
            stroke={color} strokeWidth="2.5" fill="none" opacity="0.7"/>
          <polyline points={`${x1},${y1} ${x1-6},${(y1+y2)/2} ${x2},${y2}`}
            stroke="#fff" strokeWidth="0.8" fill="none" opacity="0.5"/>
        </React.Fragment>
      ))}
      {/* Stone wall rows */}
      {[0,1,2,3].map(row=>(
        <React.Fragment key={row}>
          {[0,55,110,165,220,275,330].map((x,ci)=>(
            <rect key={ci} x={x+(row%2)*27} y={60+row*28} width="52" height="26" rx="0"
              fill={row%2===0?'#1c1004':'#140c02'} stroke="#0c0800" strokeWidth="1"/>
          ))}
        </React.Fragment>
      ))}
      {/* Electric arena floor */}
      <rect x="0" y="242" width="360" height="38" fill="#1c1004"/>
      {[0,60,120,180,240,300].map((x,i)=>(
        <rect key={i} x={x} y="242" width="58" height="38" rx="0"
          fill={i%2===0?'#251606':'#1c1004'} stroke="#0c0800" strokeWidth="1"/>
      ))}
      {/* Electric veins on floor */}
      {[40,130,220,310].map((x,i)=>(
        <line key={i} x1={x} y1="280" x2={x+(i%2===0?15:-15)} y2="242"
          stroke={color} strokeWidth="1.5" opacity="0.5"/>
      ))}
      {/* Side pillars */}
      <rect x="15" y="95" width="20" height="147" rx="2" fill="#1c1004"/>
      <rect x="17" y="97" width="5"  height="143" rx="1" fill={color} opacity="0.2"/>
      <rect x="325" y="95" width="20" height="147" rx="2" fill="#1c1004"/>
      <rect x="327" y="97" width="5"  height="143" rx="1" fill={color} opacity="0.2"/>
      {/* Electric torch glow */}
      <ellipse cx="25" cy="95" rx="10" ry="10" fill={color} opacity="0.3"/>
      <ellipse cx="25" cy="95" rx="5"  ry="5"  fill="#fff"  opacity="0.3"/>
      <ellipse cx="335" cy="95" rx="10" ry="10" fill={color} opacity="0.3"/>
      <ellipse cx="335" cy="95" rx="5"  ry="5"  fill="#fff"  opacity="0.3"/>
    </svg>
  );
}

function BgEarth({ color }) {
  // Forest cave: tree roots, glowing mushrooms, stone floor, green mist
  return (
    <svg viewBox="0 0 360 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, imageRendering: 'pixelated' }}>
      <rect x="0" y="0" width="360" height="280" fill="#0a1a05"/>
      {/* Cave ceiling */}
      {[0,40,80,120,160,200,240,280,320].map((x,i)=>(
        <rect key={i} x={x} y="0" width="38" height={16+(i%3)*5} rx="0" fill={i%2===0?'#1a2e0a':'#132208'}/>
      ))}
      {/* Root tendrils from ceiling */}
      {[30,80,140,200,260,320].map((x,i)=>(
        <React.Fragment key={i}>
          <path d={`M${x} 20 Q${x-8} ${50+(i%2)*20} ${x-3} ${80+(i%3)*15}`}
            stroke="#2d4a1e" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d={`M${x+4} 18 Q${x+10} ${60+(i%2)*15} ${x+6} ${90+(i%3)*12}`}
            stroke="#1a2e0a" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </React.Fragment>
      ))}
      {/* Stone wall */}
      {[0,1,2,3].map(row=>(
        <React.Fragment key={row}>
          {[0,52,104,156,208,260,312].map((x,ci)=>(
            <rect key={ci} x={x+(row%2)*26} y={55+row*30} width="50" height="28" rx="0"
              fill={row%2===0?'#1a2e0a':'#132208'} stroke="#0a1a05" strokeWidth="1"/>
          ))}
        </React.Fragment>
      ))}
      {/* Glowing mushrooms */}
      {[45,95,155,215,270,320].map((x,i)=>(
        <React.Fragment key={i}>
          {/* Stem */}
          <rect x={x+3} y={220+(i%2)*8} width="5" height={12+(i%3)*4} rx="1" fill="#1a2e0a"/>
          {/* Cap */}
          <ellipse cx={x+5} cy={220+(i%2)*8} rx={8+(i%2)*3} ry={5+(i%2)*2} fill={color} opacity="0.8"/>
          <ellipse cx={x+5} cy={218+(i%2)*8} rx={5+(i%2)*2} ry="3" fill="#d9f99d" opacity="0.5"/>
          {/* Glow */}
          <ellipse cx={x+5} cy={222+(i%2)*8} rx={12+(i%2)*4} ry="6" fill={color} opacity="0.2"/>
        </React.Fragment>
      ))}
      {/* Mossy stone floor */}
      <rect x="0" y="244" width="360" height="36" fill="#132208"/>
      {[0,60,120,180,240,300].map((x,i)=>(
        <rect key={i} x={x} y="244" width="58" height="36" rx="0"
          fill={i%2===0?'#1a2e0a':'#132208'} stroke="#0a1a05" strokeWidth="1"/>
      ))}
      {[15,75,135,195,255,315].map((x,i)=>(
        <rect key={i} x={x} y="244" width="30" height="6" rx="1" fill={color} opacity="0.15"/>
      ))}
      {/* Green mist at floor level */}
      {[30,120,210,300].map((x,i)=>(
        <ellipse key={i} cx={x} cy="250" rx={40+(i%2)*15} ry="10" fill={color} opacity="0.12"/>
      ))}
      {/* Side trees/roots */}
      <path d="M20 240 Q10 180 25 120 Q15 160 30 200" stroke="#2d4a1e" strokeWidth="8" fill="none" strokeLinecap="round"/>
      <path d="M340 240 Q350 180 335 120 Q345 160 330 200" stroke="#2d4a1e" strokeWidth="8" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function BgWind({ color }) {
  // Sky arena: cloud platforms, floating stones, wind streaks
  return (
    <svg viewBox="0 0 360 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, imageRendering: 'pixelated' }}>
      {/* Sky gradient */}
      <rect x="0" y="0" width="360" height="280" fill="#022c22"/>
      <rect x="0" y="0" width="360" height="140" fill="#064e3b" opacity="0.6"/>
      <rect x="0" y="0" width="360" height="60"  fill="#065f46" opacity="0.5"/>
      {/* Wind streaks */}
      {[20,60,100,150,200,260,310].map((x,i)=>(
        <rect key={i} x={x} y={30+(i%4)*18} width={40+(i%3)*20} height="2" rx="1"
          fill={color} opacity={0.15+(i%3)*0.06}/>
      ))}
      {/* Floating cloud platforms */}
      {[30,140,240].map((x,i)=>(
        <React.Fragment key={i}>
          <rect x={x}    y={80+(i%2)*30} width="80" height="20" rx="10" fill="#065f46" opacity="0.9"/>
          <rect x={x+5}  y={76+(i%2)*30} width="70" height="16" rx="8"  fill="#047857" opacity="0.7"/>
          <rect x={x+10} y={80+(i%2)*30} width="60" height="8"  rx="6"  fill={color}   opacity="0.2"/>
        </React.Fragment>
      ))}
      {/* Floating stones */}
      {[55,165,275].map((x,i)=>(
        <React.Fragment key={i}>
          <rect x={x}    y={130+(i%2)*20} width="32" height="14" rx="3" fill="#022c22" opacity="0.9"/>
          <rect x={x+2}  y={132+(i%2)*20} width="28" height="6"  rx="2" fill="#065f46" opacity="0.4"/>
        </React.Fragment>
      ))}
      {/* Main cloud floor */}
      <rect x="0" y="240" width="360" height="40" fill="#065f46" opacity="0.95"/>
      {[0,50,110,180,240,300].map((x,i)=>(
        <rect key={i} x={x} y="240" width="48" height="40" rx="0" fill={i%2===0?'#047857':'#065f46'}/>
      ))}
      {/* Cloud puffs on floor */}
      {[40,120,200,290].map((x,i)=>(
        <ellipse key={i} cx={x} cy="240" rx={25+(i%2)*10} ry="8" fill="#10b981" opacity="0.4"/>
      ))}
      {/* Wind birds/streaks mid-scene */}
      {[80,200,300].map((x,i)=>(
        <path key={i} d={`M${x} ${140+(i%2)*20} Q${x+12} ${134+(i%2)*20} ${x+24} ${140+(i%2)*20}`}
          stroke={color} strokeWidth="1.5" fill="none" opacity="0.3"/>
      ))}
    </svg>
  );
}

// ─── Background router ────────────────────────────────────────────────────────
function BattleBackground({ element, theme }) {
  const color = theme.color;
  const map = {
    Fire: <BgFire color={color}/>,
    Lava: <BgFire color={color}/>,
    Ice:  <BgIce color={color}/>,
    Crystal: <BgIce color={color}/>,
    Storm:   <BgIce color={color}/>,
    Shadow: <BgShadow color={color}/>,
    Void:   <BgShadow color={color}/>,
    Blood:  <BgShadow color={color}/>,
    Thunder: <BgThunder color={color}/>,
    Earth:   <BgEarth color={color}/>,
    Poison:  <BgEarth color={color}/>,
    Wind:    <BgWind color={color}/>,
  };
  return map[element] || <BgFire color={color}/>;
}

// ─── Animated HP Bar ──────────────────────────────────────────────────────────
function HpBar({ current, max, color, label, side = 'left' }) {
  const pct = Math.max(0, Math.min(100, (current / max) * 100));
  const isCritical = pct <= 25;
  const isLow      = pct <= 50;
  let barColor = color;
  if (isCritical) barColor = '#f87171';
  else if (isLow) barColor = '#fb923c';

  return (
    <div className="w-full">
      <div className={`flex justify-between text-xs mb-0.5 items-center ${side === 'right' ? 'flex-row-reverse' : ''}`}>
        <span className="neon-text" style={{ color: '#94a3b8', fontSize: '7px' }}>{label}</span>
        <span className="neon-text" style={{ color: barColor, fontSize: '7px', textShadow: `0 0 6px ${barColor}` }}>
          {current}/{max}
        </span>
      </div>
      <div className="w-full rounded-sm overflow-hidden relative"
        style={{ height: '12px', background: 'rgba(0,0,0,0.5)', border: `1px solid ${barColor}44`,
          boxShadow: isCritical ? `0 0 8px ${barColor}66` : 'none' }}>
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 6px)',
        }}/>
        <div className={`h-full ${isCritical ? 'animate-hp-flash' : ''}`}
          style={{
            width: `${pct}%`,
            background: isCritical
              ? `linear-gradient(90deg, #7f1d1d, ${barColor})`
              : `linear-gradient(90deg, ${barColor}aa, ${barColor})`,
            boxShadow: `0 0 8px ${barColor}88`,
            transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
            position: 'relative',
          }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', background: 'rgba(255,255,255,0.2)' }}/>
        </div>
      </div>
    </div>
  );
}

// ─── Floating Damage Numbers ───────────────────────────────────────────────────
function FloatDmg({ val, type, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 1300); return () => clearTimeout(t); }, [onDone]);
  const colors = {
    player: '#22d3ee', crit: '#facc15', adrenaline: '#f87171',
    boss: '#f87171', boss_rage: '#ef4444', block: '#60a5fa',
    stamina: '#c084fc', selfhit: '#fb923c', weakness: '#fde047',
    lockedin: '#facc15', dodge: '#4ade80',
  };
  const c = colors[type] || '#fff';
  const isCrit = type === 'crit';
  const isNeg  = type === 'boss' || type === 'boss_rage' || type === 'selfhit';
  return (
    <div className={`dmg-float ${isCrit ? 'crit' : ''}`}
      style={{ color: c, textShadow: `0 0 8px ${c}, 2px 2px 0 #000`, fontSize: isCrit ? '22px' : isNeg ? '16px' : '14px' }}>
      {isNeg ? `-${val}` : isCrit ? `${val}!!` : `+${val}`}
    </div>
  );
}

// ─── Arena Particles ───────────────────────────────────────────────────────────
function ArenaParticles({ color, count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`particle particle-${(i % 6) + 1}`} style={{
          width: `${3 + (i % 3) * 2}px`, height: `${3 + (i % 3) * 2}px`,
          background: color, left: `${10 + i * 14}%`, bottom: `${5 + (i % 3) * 8}%`,
          opacity: 0.6, boxShadow: `0 0 6px ${color}`,
        }}/>
      ))}
    </>
  );
}

// ─── Hype Meter ───────────────────────────────────────────────────────────────
function HypeMeter({ hype }) {
  const label = hype >= 90 ? 'ON FIRE' : hype >= 70 ? 'HYPE!' : hype >= 50 ? 'LOCKED IN' : hype >= 30 ? 'FOCUSED' : 'LOW...';
  return (
    <div style={{ width: '100%' }}>
      <div className="flex items-center justify-between mb-0.5">
        <span className="neon-text" style={{ color: '#facc15', fontSize: '6px' }}>HYPE</span>
        <span className="neon-text" style={{ color: '#facc15', fontSize: '6px' }}>{label}</span>
      </div>
      <div className="w-full rounded-sm overflow-hidden"
        style={{ height: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(250,204,21,0.2)' }}>
        <div className={`hype-bar-fill h-full rounded-sm ${hype >= 70 ? 'animate-hype-pulse' : ''}`}
          style={{ width: `${hype}%` }}/>
      </div>
    </div>
  );
}

// ─── Boss Dialogue Bubble ─────────────────────────────────────────────────────
function BossDialogue({ text }) {
  if (!text) return null;
  return <div className="boss-bubble">{text}</div>;
}

// ─── Impact Effect — sparks + shockwave ───────────────────────────────────────
function ImpactEffect({ color, active }) {
  if (!active) return null;
  return (
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 30 }}>
      {/* Cross sparks */}
      {[0,45,90,135].map(angle => (
        <div key={angle} style={{
          position: 'absolute', left: '50%', top: '50%',
          width: '48px', height: '4px', borderRadius: '2px',
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          transform: `translate(-50%,-50%) rotate(${angle}deg)`,
          boxShadow: `0 0 12px ${color}`,
          animation: 'impactBurst 0.38s ease-out forwards',
        }}/>
      ))}
      {/* Shockwave ring */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        width: '30px', height: '30px', borderRadius: '50%',
        border: `3px solid ${color}`,
        transform: 'translate(-50%,-50%)',
        boxShadow: `0 0 20px ${color}, inset 0 0 10px ${color}`,
        animation: 'shockRing 0.38s ease-out forwards',
      }}/>
      {/* Center flash */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        width: '22px', height: '22px', borderRadius: '50%',
        background: color, opacity: 0.9,
        transform: 'translate(-50%,-50%)',
        boxShadow: `0 0 30px ${color}`,
        animation: 'dustPuff 0.4s ease-out forwards',
      }}/>
    </div>
  );
}

const EVENT_STYLES = {
  player:    { color: '#22d3ee', prefix: '>' },
  crit:      { color: '#facc15', prefix: '!!' },
  adrenaline:{ color: '#f87171', prefix: '>>' },
  stamina:   { color: '#c084fc', prefix: '+' },
  boss:      { color: '#f87171', prefix: '<' },
  boss_rage: { color: '#ef4444', prefix: '<<' },
  dodge:     { color: '#4ade80', prefix: '~' },
  block:     { color: '#60a5fa', prefix: '|' },
  weakness:  { color: '#fde047', prefix: '*' },
  selfhit:   { color: '#fb923c', prefix: 'x' },
  injury:    { color: '#f87171', prefix: 'x' },
  lockedin:  { color: '#facc15', prefix: '#' },
  info:      { color: '#475569', prefix: '.' },
};

function pickDialogue(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ════════════════════════════════════════════════════════════
//  MAIN BATTLE ARENA
// ════════════════════════════════════════════════════════════
export default function BattleArena({
  boss, muscleXP, playerLevel, todayMuscles, statUpgrades = {},
  equippedAura, equippedClothing = {}, equippedItems = {},
  isTraining = false, onVictory, onDefeat, onClose,
}) {
  const pStats = getPlayerBattleStats(muscleXP, statUpgrades);
  const theme  = ELEMENT_THEMES[boss.element] || ELEMENT_THEMES.Fire;
  const hasWeaknessBonus = todayMuscles.includes(boss.weakness);

  // ── Core state ────────────────────────────────────────────
  const [phase, setPhase]       = useState('intro');
  const [playerHP, setPlayerHP] = useState(pStats.maxHP);
  const [bossHP, setBossHP]     = useState(boss.maxHP);
  const [log, setLog]           = useState([]);
  const [turn, setTurn]         = useState(0);

  // ── Visual state ──────────────────────────────────────────
  const [screenFlash, setScreenFlash]   = useState(null);
  const [floatDmgs, setFloatDmgs]       = useState([]);
  const [showCritText, setShowCritText] = useState(false);
  const [hype, setHype]                 = useState(50);
  const [playerStatus, setPlayerStatus] = useState(null);
  const [bossRage, setBossRage]         = useState(false);
  const [bossDialogue, setBossDialogue] = useState(null);
  const [dialogueSeen, setDialogueSeen] = useState(new Set());
  const [introStep, setIntroStep]       = useState(0);
  const [comboCount, setComboCount]     = useState(0);
  const [activeSide, setActiveSide]     = useState(null);

  // ── Combat animation state ────────────────────────────────
  // 'lunge'|'hit'|'victory'|null for player; 'lunge'|'hit'|'rage'|null for boss
  const [playerAnim, setPlayerAnim]   = useState(null);
  const [bossAnim, setBossAnim]       = useState(null);
  const [impactColor, setImpactColor] = useState(null);
  // Keys force CSS animation restart even if the same anim name would repeat
  const [playerAnimKey, setPlayerAnimKey] = useState(0);
  const [bossAnimKey, setBossAnimKey]     = useState(0);

  const logRef     = useRef(null);
  const defeatDone = useRef(false);
  const floatId    = useRef(0);

  // ── Auto-scroll log ───────────────────────────────────────
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  // ── COMBAT ANIMATIONS — triggers on activeSide change ─────
  // Player lunges UP; boss lunges DOWN. Impact fires at 280 ms,
  // matching the ~40% mark of the 0.65s lunge animation.
  useEffect(() => {
    if (activeSide === 'player') {
      setPlayerAnim('lunge');
      setPlayerAnimKey(k => k + 1);
      setTimeout(() => {
        setImpactColor('#22d3ee');
        setBossAnim('hit');
        setBossAnimKey(k => k + 1);
        setTimeout(() => {
          setImpactColor(null);
          setBossAnim(null);
          setPlayerAnim(null);
        }, 420);
      }, 280);
    } else if (activeSide === 'boss') {
      setBossAnim('lunge');
      setBossAnimKey(k => k + 1);
      setTimeout(() => {
        setImpactColor(theme.color);
        setPlayerAnim('hit');
        setPlayerAnimKey(k => k + 1);
        setTimeout(() => {
          setImpactColor(null);
          setPlayerAnim(null);
          setBossAnim(null);
        }, 420);
      }, 280);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSide]);

  // ── Boss intro sequence ───────────────────────────────────
  useEffect(() => {
    if (introStep === 0) { const t = setTimeout(() => setIntroStep(1), 200); return () => clearTimeout(t); }
    if (introStep === 1) {
      setBossDialogue(pickDialogue(BOSS_DIALOGUES.intro));
      const t = setTimeout(() => { setBossDialogue(null); setIntroStep(2); }, 2800);
      return () => clearTimeout(t);
    }
    if (introStep === 2) setPhase('ready');
  }, [introStep]);

  // ── Boss HP dialogue triggers ─────────────────────────────
  useEffect(() => {
    const pct = (bossHP / boss.maxHP) * 100;
    if (pct <= 50 && pct > 40 && !dialogueSeen.has('half')) {
      setDialogueSeen(prev => new Set([...prev, 'half']));
      setBossDialogue(pickDialogue(BOSS_DIALOGUES.halfHP));
      setTimeout(() => setBossDialogue(null), 2500);
    }
    if (pct <= 25 && !dialogueSeen.has('low')) {
      setDialogueSeen(prev => new Set([...prev, 'low']));
      setBossDialogue(pickDialogue(BOSS_DIALOGUES.lowHP));
      setTimeout(() => setBossDialogue(null), 2500);
    }
  }, [bossHP, boss.maxHP, dialogueSeen]);

  // ── Float damage helpers ──────────────────────────────────
  const addFloat    = useCallback((val, type) => {
    const id = ++floatId.current;
    setFloatDmgs(prev => [...prev, { id, val, type }]);
  }, []);
  const removeFloat = useCallback((id) => setFloatDmgs(prev => prev.filter(f => f.id !== id)), []);

  // ── Victory animation ─────────────────────────────────────
  useEffect(() => {
    if (phase === 'victory') { setPlayerAnim('victory'); setPlayerAnimKey(k => k + 1); }
  }, [phase]);

  // ── Battle turn loop ──────────────────────────────────────
  useEffect(() => {
    if (phase !== 'fighting') return;

    function applyPhaseVisuals(events) {
      let hitsBoss = false, hitsPlayer = false, hasCrit = false, rageHit = false, hypeD = 0;
      events.forEach(ev => {
        if (['player','crit','adrenaline','stamina','selfhit'].includes(ev.type)) hitsBoss = true;
        if (['boss','boss_rage','block'].includes(ev.type)) hitsPlayer = true;
        if (ev.effect === 'crit')        { hasCrit = true; hypeD += 15; }
        if (ev.type === 'boss_rage')     rageHit = true;
        if (ev.effect === 'hit' && ev.type === 'player') hypeD += 8;
        if (ev.effect === 'adrenaline')  { setPlayerStatus('adrenaline'); hypeD += 12; }
        if (ev.effect === 'lockedin')    setPlayerStatus('lockedin');
        if (ev.effect === 'injury')      setPlayerStatus('injured');
        if (ev.effect === 'stamina')     hypeD += 6;
        if (ev.effect === 'dodge')       hypeD += 10;
        if (ev.effect === 'block')       hypeD += 5;
        if (ev.effect === 'weakness')    hypeD += 10;
        if (['boss','boss_rage'].includes(ev.type)) hypeD -= 8;
        if (ev.val) addFloat(ev.val, ev.type);
      });
      if (hasCrit) {
        setScreenFlash('#facc1544');
        setShowCritText(true);
        setTimeout(() => setShowCritText(false), 700);
        setTimeout(() => setScreenFlash(null), 400);
      } else if (rageHit) {
        setScreenFlash('#f8717122');
        setTimeout(() => setScreenFlash(null), 350);
      }
      setHype(h => Math.min(100, Math.max(0, h + hypeD)));
    }

    const t1 = setTimeout(() => {
      const bossHPPct = (bossHP / boss.maxHP) * 100;
      const result = runBattleTurn(playerHP, bossHP, pStats, boss, hasWeaknessBonus, bossHPPct);

      setActiveSide(result.playerFirst ? 'player' : 'boss');
      applyPhaseVisuals(result.phase1Events);
      setLog(prev => [...prev, ...result.phase1Events]);
      setPlayerHP(result.phase1PlayerHP);
      setBossHP(result.phase1BossHP);

      if (result.phase1BossHP <= 0 || result.phase1PlayerHP <= 0) {
        const s = result.phase1BossHP <= 0 ? 'victory' : 'defeat';
        setTimeout(() => { setActiveSide(null); setPhase(s); }, 500);
        return;
      }

      const t2 = setTimeout(() => {
        setActiveSide(result.playerFirst ? 'boss' : 'player');
        applyPhaseVisuals(result.phase2Events);
        setLog(prev => [...prev, ...result.phase2Events]);
        setPlayerHP(result.playerHP);
        setBossHP(result.bossHP);
        if (result.bossRageActive && !bossRage) setBossRage(true);
        if (playerStatus === 'lockedin') setTimeout(() => setPlayerStatus(null), 2000);

        let newCombo = comboCount;
        [...result.phase1Events, ...result.phase2Events].forEach(ev => {
          if (ev.effect === 'crit' || (ev.effect === 'hit' && ev.type === 'player') || ev.effect === 'adrenaline') newCombo++;
          if (ev.type === 'boss' || ev.type === 'boss_rage') newCombo = 0;
        });
        setComboCount(newCombo);

        setTimeout(() => {
          setActiveSide(null);
          if (result.status === 'victory')     setPhase('victory');
          else if (result.status === 'defeat') setPhase('defeat');
          else setTurn(t => t + 1);
        }, 400);
      }, 850);
      return () => clearTimeout(t2);
    }, 700);
    return () => clearTimeout(t1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, turn]);

  // ── Defeat callback ───────────────────────────────────────
  useEffect(() => {
    if (phase === 'defeat' && onDefeat && !defeatDone.current) {
      defeatDone.current = true;
      onDefeat();
    }
  }, [phase, onDefeat]);

  function startFight() {
    const startLog = [{ type: 'info', text: `Battle vs ${boss.name} begins!` }];
    if (hasWeaknessBonus) startLog.push({ type: 'weakness', text: `${boss.weakness} weakness bonus active!` });
    setLog(startLog);
    setPhase('fighting');
  }

  function retry() {
    defeatDone.current = false;
    setPlayerHP(pStats.maxHP); setBossHP(boss.maxHP);
    setLog([]); setTurn(0); setPhase('ready'); setHype(50);
    setPlayerStatus(null); setBossRage(false); setComboCount(0);
    setDialogueSeen(new Set()); setActiveSide(null);
    setPlayerAnim(null); setBossAnim(null);
  }

  const playerHPPct = (playerHP / pStats.maxHP) * 100;
  const bossHPPct   = (bossHP / boss.maxHP) * 100;
  const isPlayerLow = playerHPPct <= 25;
  const isBossLow   = bossHPPct  <= 25;

  // ── Derive animation CSS from current anim state ──────────
  // Using forward-fill animations so characters hold their final position
  // until the state clears back to null.
  const playerAnimStyle = {
    animation:
      playerAnim === 'lunge'   ? 'playerLunge 0.65s ease-in-out forwards'   :
      playerAnim === 'hit'     ? 'playerStagger 0.5s ease-out forwards'      :
      playerAnim === 'victory' ? 'victoryJump 0.7s ease-in-out infinite'      :
      'none',
  };
  const bossAnimStyle = {
    animation:
      bossAnim === 'lunge' ? 'bossLunge 0.65s ease-in-out forwards'   :
      bossAnim === 'hit'   ? 'bossStagger 0.5s ease-out forwards'     :
      bossRage && !bossAnim ? 'bossRageShake 0.6s ease-in-out infinite' :
      'none',
  };

  // ═════════════════════════════════════════════
  // INTRO SCREEN
  // ═════════════════════════════════════════════
  if (phase === 'intro') {
    return (
      <div className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden"
        style={{ background: `radial-gradient(ellipse at 50% 30%, ${theme.bg}cc, #020509)` }}>
        <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden' }}>
          <ArenaParticles color={theme.particle || theme.color} count={8}/>
        </div>
        <div className="neon-text text-center mb-6 animate-slide-up"
          style={{ color: '#475569', fontSize: '10px', letterSpacing: '8px' }}>
          TODAY'S CHALLENGE
        </div>
        <div className="flex flex-col items-center animate-boss-intro"
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <div style={{ position: 'relative' }}>
            <BossSprite boss={boss} size={130} isRage={false}/>
            {bossDialogue && <BossDialogue text={bossDialogue}/>}
          </div>
          <div className="mt-4 text-center animate-slide-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <div className="neon-text neon-text-pulse" style={{ color: theme.color, fontSize: '14px', letterSpacing: '3px' }}>{boss.name}</div>
            <div className="neon-text mt-1" style={{ color: theme.color, fontSize: '8px', opacity: 0.8 }}>{boss.element} · Level {boss.level}</div>
            <div className="flex gap-6 mt-3 justify-center">
              {[['HP',boss.maxHP,'#4ade80'],['ATK',boss.atk,'#f87171'],['WEAK',boss.weakness,'#facc15']].map(([l,v,c])=>(
                <div key={l} className="text-center">
                  <div className="neon-text" style={{ color: c, fontSize: '7px' }}>{l}</div>
                  <div className="neon-text" style={{ color: c, fontSize: '11px' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 w-40 h-1.5 rounded-full overflow-hidden animate-slide-up"
          style={{ background: 'rgba(255,255,255,0.1)', animationDelay: '1s', animationFillMode: 'both' }}>
          <div className="h-full rounded-full" style={{
            background: `linear-gradient(90deg, ${theme.color}, white)`,
            width: introStep >= 1 ? '100%' : '0%',
            transition: 'width 2s ease',
            boxShadow: `0 0 8px ${theme.color}`,
          }}/>
        </div>
        <div className="neon-text mt-2" style={{ color: '#475569', fontSize: '7px' }}>PREPARING BATTLE...</div>
      </div>
    );
  }

  // ═════════════════════════════════════════════
  // BATTLE SCREEN — handled by BattleScene
  // ═════════════════════════════════════════════
  return (
    <div className="fixed inset-0 z-40 flex flex-col"
      style={{ background: `linear-gradient(180deg, ${theme.bg}cc 0%, #02050a 70%)` }}>

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.10) 0px, rgba(0,0,0,0.10) 1px, transparent 1px, transparent 3px)',
        zIndex: 1,
      }}/>

      {/* Pixel-art background (element-specific) */}
      <BattleBackground element={boss.element} theme={theme}/>

      {/* ── BATTLE SCENE (anime combat system) ── */}
      <div className="relative z-10 flex-1 flex flex-col" style={{ minHeight:0 }}>
        <BattleScene
          boss={boss}
          pStats={pStats}
          playerLevel={playerLevel}
          muscleXP={muscleXP}
          equippedItems={equippedItems}
          equippedAura={equippedAura}
          equippedClothing={equippedClothing}
          isTraining={isTraining}
          hasWeaknessBonus={hasWeaknessBonus}
          onVictory={onVictory}
          onDefeat={onDefeat}
          onClose={onClose}
          theme={theme}
        />
      </div>
    </div>
  );
}
