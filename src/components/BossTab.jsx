import React, { useState, useCallback } from 'react';
import { ELEMENT_THEMES, MUSCLE_COLORS } from '../constants';
import { DungeonScene } from './PixelScene';
import GameIcon from './GameIcon';
import { generateDailyBoss, generateBossPool, generateTrainingBoss, generateLeagueBoss } from '../utils/bossGenerator';
import { getLevel, getPlayerBattleStats, getTodayKey, getDateKey } from '../utils/gameLogic';
import BossSprite from './BossSprite';
import BattleArena from './BattleArena';
import DungeonRun from './DungeonRun';

function BossCard({ boss, isToday, cleared }) {
  const theme = ELEMENT_THEMES[boss.element];
  return (
    <div
      className="relative overflow-hidden rounded-sm p-5"
      style={{
        background: `linear-gradient(135deg, ${theme.bg}cc, #080e1a)`,
        border: `2px solid ${cleared ? '#facc15' : `${theme.color}66`}`,
        boxShadow: cleared
          ? '0 0 24px rgba(250,204,21,0.3)'
          : `0 0 20px ${theme.glow}`,
      }}
    >
      {/* Top-left corner pixel */}
      <div style={{ position: 'absolute', top: -2, left: -2, width: 6, height: 6, background: cleared ? '#facc15' : theme.color, boxShadow: `0 0 6px ${cleared ? '#facc15' : theme.color}` }} />
      <div style={{ position: 'absolute', bottom: -2, right: -2, width: 6, height: 6, background: cleared ? '#facc15' : theme.color, boxShadow: `0 0 6px ${cleared ? '#facc15' : theme.color}` }} />

      {cleared && (
        <div
          className="absolute top-3 right-3 neon-text"
          style={{ color: '#facc15', fontSize: '8px', textShadow: '0 0 8px #facc15' }}
        >
          ✓ CLEARED
        </div>
      )}
      {isToday && !cleared && (
        <div
          className="absolute top-3 right-3 neon-text px-2 py-0.5 rounded-sm"
          style={{ background: `${theme.color}22`, color: theme.color, border: `1px solid ${theme.color}44`, fontSize: '7px' }}
        >
          TODAY
        </div>
      )}

      <div className="flex items-end gap-4">
        <div style={{ animation: 'pixelBob 2.2s ease-in-out infinite' }}>
          <BossSprite boss={boss} size={80} />
        </div>
        <div className="flex-1">
          <div className="neon-text mb-0.5 flex items-center gap-1.5" style={{ color: theme.color, fontSize: '7px', letterSpacing: '2px' }}>
            <GameIcon name={boss.emoji || theme.icon} size={12} color={theme.color} /> {boss.element} BOSS
          </div>
          <div className="font-black text-white text-xl leading-tight" style={{ fontFamily: 'Courier New', textShadow: `0 0 8px ${theme.color}66` }}>
            {boss.name}
          </div>
          <div className="neon-text mt-1" style={{ color: '#475569', fontSize: '7px' }}>LEVEL {boss.level}</div>

          <div className="flex gap-4 mt-3">
            <div>
              <div className="neon-text" style={{ color: '#475569', fontSize: '7px' }}>HP</div>
              <div className="neon-text" style={{ color: '#4ade80', fontSize: '11px' }}>{boss.maxHP}</div>
            </div>
            <div>
              <div className="neon-text" style={{ color: '#475569', fontSize: '7px' }}>ATK</div>
              <div className="neon-text" style={{ color: '#f87171', fontSize: '11px' }}>{boss.atk}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="neon-text" style={{ color: '#475569', fontSize: '7px' }}>WEAK:</span>
        <span
          className="neon-text px-2 py-0.5 rounded-sm"
          style={{
            background: `${MUSCLE_COLORS[boss.weakness]}22`,
            color: MUSCLE_COLORS[boss.weakness],
            border: `1px solid ${MUSCLE_COLORS[boss.weakness]}55`,
            fontSize: '7px',
          }}
        >
          {boss.weakness}
        </span>
        <span className="neon-text" style={{ color: '#334155', fontSize: '7px' }}>+25% dmg if trained</span>
      </div>
    </div>
  );
}

function WeekCalendar({ bossHistory, playerLevel, currentDayKey }) {
  const days = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = getDateKey(d);
    const boss = generateDailyBoss(key, playerLevel);
    const theme = ELEMENT_THEMES[boss.element];
    const history = bossHistory[key];
    const isToday = key === currentDayKey;
    days.push({ key, d, boss, theme, history, isToday });
  }

  return (
    <div>
      <div className="neon-text mb-2" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>7-DAY HISTORY</div>
      <div className="flex gap-1.5">
        {days.map(({ key, d, boss, theme, history, isToday }) => {
          const cleared = history?.cleared === true;
          const lost    = history?.attempted && !history?.cleared;
          return (
            <div
              key={key}
              className="flex-1 flex flex-col items-center rounded-sm py-2 gap-1"
              style={{
                background: isToday ? `${theme.bg}cc` : '#0a1020',
                border: `1px solid ${cleared ? '#22c55e' : lost ? '#f87171' : isToday ? `${theme.color}66` : 'rgba(255,255,255,0.05)'}`,
              }}
            >
              <div className="neon-text" style={{ color: '#334155', fontSize: '7px' }}>
                {d.toLocaleDateString('en-US', { weekday: 'narrow' })}
              </div>
              <GameIcon name={theme.icon} size={14} color={theme.color} />
              <div style={{ fontSize: '10px' }}>
                {cleared ? (
                  <span
                    className="flex items-center justify-center w-5 h-5 rounded-sm neon-text"
                    style={{ background: '#166534', color: '#4ade80', fontSize: '8px', boxShadow: '0 0 6px #4ade80' }}
                  >W</span>
                ) : lost ? (
                  <span
                    className="flex items-center justify-center w-5 h-5 rounded-sm neon-text"
                    style={{ background: '#7f1d1d', color: '#f87171', fontSize: '8px' }}
                  >L</span>
                ) : (
                  <span className="neon-text" style={{ color: '#334155', fontSize: '8px' }}>–</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BossOutlook({ playerLevel }) {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const key = getDateKey(d);
    const boss = generateDailyBoss(key, playerLevel);
    days.push({ key, d, boss });
  }
  const labels = ['TOM', '+2', '+3', '+4', '+5', '+6', '+7'];

  return (
    <div className="mt-5">
      <div className="neon-text mb-2" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>UPCOMING BOSSES</div>
      <div className="flex gap-1.5">
        {days.map(({ key, boss }, index) => {
          const theme = ELEMENT_THEMES[boss.element];
          return (
            <div
              key={key}
              className="flex-1 flex flex-col items-center rounded-sm py-2 gap-0.5"
              style={{ background: 'rgba(6,10,20,0.82)', border: `1px solid ${theme.color}44` }}
            >
              <div className="neon-text" style={{ color: '#334155', fontSize: '6px' }}>{labels[index]}</div>
              <GameIcon name={boss.emoji || ELEMENT_THEMES[boss.element]?.icon || 'skull'} size={14} color={ELEMENT_THEMES[boss.element]?.color || '#475569'} />
              <div className="neon-text text-center" style={{ color: theme.color, fontSize: '5px', lineHeight: '1', minHeight: '10px' }}>
                {boss.name.substring(0, 12)}
              </div>
              <div className="neon-text text-center" style={{ color: '#334155', fontSize: '5px' }}>{boss.element}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BossTab({
  muscleXP, workouts, bossHistory, coins, statUpgrades = {}, equippedAura,
  equippedClothing = {}, equippedItems = {},
  onBossCleared, onBossDefeat, todayKey, leagueKills = 0, onLeagueBossDefeated,
  onLootEarned, purchasedSkills = [], classBonuses = {},
}) {
  const currentDayKey = todayKey || getTodayKey();
  const playerLevel   = Math.max(1, getLevel(muscleXP));
  const boss          = generateDailyBoss(currentDayKey, playerLevel);
  const todayHistory  = bossHistory[currentDayKey];
  const cleared       = todayHistory?.cleared;

  const todayWorkout  = workouts.find(w => w.date === currentDayKey && w.completed);
  const todayMuscles  = todayWorkout
    ? [...new Set(todayWorkout.exercises.map(e => e.muscleGroup))]
    : [];

  const [inBattle, setInBattle]           = useState(false);
  const [inTraining, setInTraining]       = useState(false);
  const [trainingBoss, setTrainingBoss]   = useState(null);
  const [inLeague, setInLeague]           = useState(false);
  const [leagueGoldFlash, setLeagueGoldFlash] = useState(false);
  const [inDungeon, setInDungeon]         = useState(false);
  const [dungeonResult, setDungeonResult] = useState(null); // null | 'win' | 'lose'

  const leagueBoss = generateLeagueBoss(playerLevel, leagueKills);

  const pStats      = getPlayerBattleStats(muscleXP, statUpgrades, equippedItems, purchasedSkills, classBonuses);
  const bossGallery = generateBossPool();
  const theme       = ELEMENT_THEMES[boss.element];

  function pickTrainingBoss() {
    return generateTrainingBoss(playerLevel, Date.now());
  }

  function startTraining() {
    setTrainingBoss(pickTrainingBoss());
    setInTraining(true);
  }

  function handleLeagueVictory() {
    const willEarnGold = (leagueKills + 1) % 5 === 0;
    if (onLeagueBossDefeated) onLeagueBossDefeated();
    if (willEarnGold) {
      setLeagueGoldFlash(true);
      setTimeout(() => setLeagueGoldFlash(false), 3000);
    }
    setInLeague(false);
  }

  function handleVictory() {
    onBossCleared(currentDayKey, boss.name);
    setInBattle(false);
  }

  function handleDefeat() {
    if (onBossDefeat) onBossDefeat(currentDayKey, boss.name);
    setInBattle(false);
  }

  if (inDungeon) {
    return (
      <DungeonRun
        muscleXP={muscleXP}
        statUpgrades={statUpgrades}
        equippedAura={equippedAura}
        equippedClothing={equippedClothing}
        equippedItems={equippedItems}
        playerLevel={playerLevel}
        todayMuscles={todayMuscles}
        finalBoss={generateTrainingBoss(playerLevel, Date.now())}
        onLootEarned={item => { if (onLootEarned) onLootEarned(item); }}
        onComplete={(won) => {
          setInDungeon(false);
          setDungeonResult(won ? 'win' : 'lose');
          setTimeout(() => setDungeonResult(null), 4000);
        }}
        onClose={() => setInDungeon(false)}
      />
    );
  }

  if (inBattle) {
    return (
      <BattleArena
        boss={boss}
        muscleXP={muscleXP}
        playerLevel={playerLevel}
        todayMuscles={todayMuscles}
        statUpgrades={statUpgrades}
        equippedAura={equippedAura}
        onVictory={handleVictory}
        onDefeat={handleDefeat}
        onClose={() => setInBattle(false)}
      />
    );
  }

  if (inTraining && trainingBoss) {
    return (
      <BattleArena
        boss={trainingBoss}
        muscleXP={muscleXP}
        playerLevel={playerLevel}
        todayMuscles={todayMuscles}
        statUpgrades={statUpgrades}
        equippedAura={equippedAura}
        isTraining
        onVictory={() => { setTrainingBoss(pickTrainingBoss()); }}
        onDefeat={() => { setTrainingBoss(pickTrainingBoss()); }}
        onClose={() => setInTraining(false)}
      />
    );
  }

  if (inLeague) {
    return (
      <BattleArena
        boss={leagueBoss}
        muscleXP={muscleXP}
        playerLevel={playerLevel}
        todayMuscles={todayMuscles}
        statUpgrades={statUpgrades}
        equippedAura={equippedAura}
        onVictory={handleLeagueVictory}
        onDefeat={() => setInLeague(false)}
        onClose={() => setInLeague(false)}
      />
    );
  }

  return (
    <div className="flex-1 relative overflow-hidden">
      <DungeonScene />
      <div className="absolute inset-0 overflow-y-auto z-10 px-4 pb-6">
      <div className="pt-4 mb-4">
        <div className="neon-text" style={{ color: theme.color, fontSize: '11px' }}>DAILY BOSS</div>
        <p className="neon-text mt-1" style={{ color: '#334155', fontSize: '7px' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()}
        </p>
      </div>

      {/* Gold display */}
      <div
        className="mb-4 flex items-center justify-between gap-3 rounded-sm p-3"
        style={{ background: 'rgba(6,10,20,0.82)', border: '1px solid rgba(250,204,21,0.2)', boxShadow: '0 0 12px rgba(250,204,21,0.05)' }}
      >
        <div>
          <div className="neon-text" style={{ color: '#475569', fontSize: '7px', letterSpacing: '2px' }}>GOLD</div>
          <div className="neon-text mt-0.5 flex items-center gap-1.5" style={{ color: '#facc15', fontSize: '16px', textShadow: '0 0 10px #facc15' }}>
            {coins ?? 0} <GameIcon name="coin" size={14} color="#facc15" />
          </div>
        </div>
        <div className="neon-text text-right" style={{ color: '#334155', fontSize: '7px' }}>
          EARN 1 COIN PER<br />BOSS VICTORY
        </div>
      </div>

      <BossCard boss={boss} isToday cleared={cleared} />

      {/* Battle entry */}
      <div className="mt-4">
        {cleared ? (
          <div
            className="rounded-sm p-4 text-center"
            style={{ background: 'rgba(250,204,21,0.06)', border: '1px solid rgba(250,204,21,0.2)' }}
          >
            <div style={{ lineHeight: 1.2 }}><GameIcon name="trophy" size={32} color="#facc15" /></div>
            <div className="neon-text mt-2" style={{ color: '#facc15', fontSize: '10px', textShadow: '0 0 10px #facc15' }}>
              BOSS CLEARED!
            </div>
            <div className="neon-text mt-1" style={{ color: '#334155', fontSize: '7px' }}>
              NEW BOSS AT MIDNIGHT
            </div>
          </div>
        ) : !todayWorkout ? (
          <div
            className="rounded-sm p-5 text-center"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.08)' }}
          >
            <div style={{ marginBottom: '8px' }}><GameIcon name="dumbbell" size={28} color="#334155" /></div>
            <div className="neon-text" style={{ color: '#334155', fontSize: '8px' }}>
              COMPLETE A WORKOUT FIRST<br />TO UNLOCK BATTLE
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Player stats preview */}
            <div
              className="rounded-sm p-3"
              style={{ background: 'rgba(6,10,20,0.82)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="neon-text mb-2" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>YOUR STATS</div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'HP',    val: pStats.maxHP,             color: '#4ade80' },
                  { label: 'ATK',   val: pStats.atk,               color: '#f87171' },
                  { label: 'DEF',   val: `${pStats.defPct.toFixed(0)}%`,   color: '#60a5fa' },
                  { label: 'DODGE', val: `${pStats.dodgePct.toFixed(0)}%`, color: '#facc15' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="neon-text" style={{ color: '#475569', fontSize: '6px' }}>{s.label}</div>
                    <div className="neon-text" style={{ color: s.color, fontSize: '10px' }}>{s.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {todayMuscles.includes(boss.weakness) && (
              <div
                className="neon-text text-center py-2 px-3 rounded-sm"
                style={{ background: 'rgba(250,204,21,0.08)', color: '#facc15', border: '1px solid rgba(250,204,21,0.25)', fontSize: '7px', letterSpacing: '1px' }}
              >
                + {boss.weakness.toUpperCase()} WEAKNESS BONUS ACTIVE!
              </div>
            )}

            <button
              onClick={() => setInBattle(true)}
              className="w-full py-4 rounded-sm pixel-btn"
              style={{
                background: `linear-gradient(135deg, ${theme.bg}dd, #080e1a)`,
                border: `2px solid ${theme.color}`,
                color: theme.color,
                boxShadow: `0 0 28px ${theme.glow}, inset 0 0 20px ${theme.glow}22`,
                fontSize: '12px',
                letterSpacing: '4px',
              }}
            >
              BATTLE!
            </button>
          </div>
        )}
      </div>

      {/* Dungeon Run result flash */}
      {dungeonResult && (
        <div
          className="neon-text text-center py-2 px-3 rounded-sm mb-4"
          style={{
            background: dungeonResult === 'win' ? 'rgba(250,204,21,0.12)' : 'rgba(248,113,113,0.1)',
            border: `1px solid ${dungeonResult === 'win' ? 'rgba(250,204,21,0.4)' : 'rgba(248,113,113,0.3)'}`,
            color: dungeonResult === 'win' ? '#facc15' : '#f87171',
            fontSize: '9px', letterSpacing: '2px',
          }}
        >
          {dungeonResult === 'win' ? 'DUNGEON CLEARED! LOOT ACQUIRED!' : 'DUNGEON FAILED — TRAIN HARDER!'}
        </div>
      )}

      {/* Dungeon Run */}
      <div className="mt-6">
        <div className="neon-text mb-2 flex items-center gap-1.5" style={{ color: '#c084fc', fontSize: '7px', letterSpacing: '3px' }}>
          <GameIcon name="skull" size={10} color="#c084fc" /> DUNGEON RUN
        </div>
        <div
          className="rounded-sm p-4"
          style={{ background: 'rgba(6,10,20,0.85)', border: '1px solid rgba(192,132,252,0.3)', boxShadow: '0 0 16px rgba(192,132,252,0.06)' }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span style={{ filter: 'drop-shadow(0 0 10px #c084fc)' }}><GameIcon name="chest" size={28} color="#c084fc" /></span>
            <div>
              <div className="neon-text" style={{ color: '#c084fc', fontSize: '9px', letterSpacing: '1px' }}>DUNGEON RUN</div>
              <div className="neon-text mt-0.5" style={{ color: '#334155', fontSize: '7px' }}>
                Fight mobs → face a boss → open a chest
              </div>
            </div>
          </div>
          <div className="flex gap-3 mb-3 text-center">
            {[
              { icon: 'impact',    label: '3 WAVES' },
              { icon: 'skull',     label: '5 MOBS'  },
              { icon: 'boss',      label: '1 BOSS'  },
              { icon: 'chest',     label: 'LOOT'    },
            ].map(s => (
              <div key={s.label} className="flex-1 flex flex-col items-center">
                <GameIcon name={s.icon} size={18} color="#c084fc" />
                <div className="neon-text" style={{ color: '#334155', fontSize: '6px', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className="neon-text mb-3" style={{ color: '#475569', fontSize: '7px' }}>
            • No workout required &nbsp;• Loot equips on your hero &nbsp;• Boosts battle stats
          </div>
          <button
            onClick={() => setInDungeon(true)}
            className="w-full py-3 rounded-sm pixel-btn"
            style={{
              background: 'linear-gradient(135deg, rgba(192,132,252,0.18), rgba(192,132,252,0.06))',
              border: '2px solid #c084fc',
              color: '#c084fc',
              boxShadow: '0 0 20px rgba(192,132,252,0.25)',
              fontSize: '10px',
              letterSpacing: '3px',
            }}
          >
            ENTER DUNGEON
          </button>
        </div>
      </div>

      {/* Training Ground */}
      <div className="mt-6">
        <div className="neon-text mb-2 flex items-center gap-1.5" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>
          <GameIcon name="sword" size={10} color="#475569" /> TRAINING GROUND
        </div>
        <div
          className="rounded-sm p-4"
          style={{ background: 'rgba(6,10,20,0.82)', border: '1px solid rgba(168,85,247,0.25)' }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span style={{ filter: 'drop-shadow(0 0 8px #a855f7)' }}><GameIcon name="impact" size={28} color="#a855f7" /></span>
            <div>
              <div className="neon-text" style={{ color: '#a855f7', fontSize: '9px', letterSpacing: '1px' }}>TRAINING GROUND</div>
              <div className="neon-text mt-0.5" style={{ color: '#334155', fontSize: '7px' }}>Fight random bosses anytime, no daily limit</div>
            </div>
          </div>
          <div className="neon-text mb-3" style={{ color: '#475569', fontSize: '7px' }}>
            • No workout required &nbsp;• No rewards &nbsp;• New boss each run
          </div>
          <button
            onClick={startTraining}
            className="w-full py-3 rounded-sm pixel-btn"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(168,85,247,0.06))',
              border: '2px solid #a855f7',
              color: '#a855f7',
              boxShadow: '0 0 16px rgba(168,85,247,0.25)',
              fontSize: '10px', letterSpacing: '3px',
            }}
          >
            ENTER TRAINING
          </button>
        </div>
      </div>

      {/* League Mode */}
      <div className="mt-6">
        <div className="neon-text mb-2 flex items-center gap-1.5" style={{ color: '#facc15', fontSize: '7px', letterSpacing: '3px' }}>
          <GameIcon name="trophy" size={10} color="#facc15" /> LEAGUE MODE
        </div>

        {leagueGoldFlash && (
          <div
            className="neon-text text-center py-2 px-3 rounded-sm mb-3"
            style={{ background: 'rgba(250,204,21,0.15)', color: '#facc15', border: '1px solid rgba(250,204,21,0.5)', fontSize: '9px', letterSpacing: '2px', boxShadow: '0 0 20px rgba(250,204,21,0.3)' }}
          >
            +1 GOLD EARNED!
          </div>
        )}

        <div className="rounded-sm p-4" style={{ background: 'rgba(6,10,20,0.82)', border: '1px solid rgba(250,204,21,0.3)', boxShadow: '0 0 16px rgba(250,204,21,0.06)' }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="neon-text" style={{ color: '#facc15', fontSize: '10px', letterSpacing: '2px' }}>
                TIER {leagueBoss.tier}
              </div>
              <div className="neon-text mt-0.5" style={{ color: '#334155', fontSize: '7px' }}>
                {leagueKills} boss{leagueKills !== 1 ? 'es' : ''} slain
              </div>
            </div>
            <div className="text-right">
              <div className="neon-text" style={{ color: '#475569', fontSize: '7px' }}>NEXT GOLD</div>
              <div className="neon-text" style={{ color: '#facc15', fontSize: '13px', textShadow: '0 0 8px #facc15' }}>
                <span className="flex items-center gap-1">{leagueKills % 5}/5 <GameIcon name="coin" size={12} color="#facc15" /></span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '2px', height: '6px', overflow: 'hidden' }}>
            <div style={{
              width: `${(leagueKills % 5) / 5 * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #ca8a04, #facc15)',
              boxShadow: '0 0 8px #facc15',
              transition: 'width 0.4s ease',
            }} />
          </div>

          {/* League boss preview */}
          <div
            className="flex items-center gap-3 mb-3 p-2 rounded-sm"
            style={{ background: `${ELEMENT_THEMES[leagueBoss.element].bg}44`, border: `1px solid ${ELEMENT_THEMES[leagueBoss.element].color}33` }}
          >
            <div style={{ animation: 'pixelBob 2s ease-in-out infinite', flexShrink: 0 }}>
              <BossSprite boss={leagueBoss} size={52} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="neon-text flex items-center gap-1" style={{ color: ELEMENT_THEMES[leagueBoss.element].color, fontSize: '7px', letterSpacing: '1px' }}>
                <GameIcon name={leagueBoss.emoji || ELEMENT_THEMES[leagueBoss.element].icon} size={10} color={ELEMENT_THEMES[leagueBoss.element].color} />
                {leagueBoss.element} · {leagueBoss.diffLabel}
              </div>
              <div className="neon-text" style={{ color: '#e2e8f0', fontSize: '9px', marginTop: '2px' }}>{leagueBoss.name}</div>
              <div className="flex gap-3 mt-1.5">
                <span className="neon-text" style={{ color: '#4ade80', fontSize: '7px' }}>HP {leagueBoss.maxHP}</span>
                <span className="neon-text" style={{ color: '#f87171', fontSize: '7px' }}>ATK {leagueBoss.atk}</span>
                <span className="neon-text" style={{ color: '#facc15', fontSize: '7px' }}>×{leagueBoss.scaleMult.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="neon-text mb-3" style={{ color: '#475569', fontSize: '7px', lineHeight: '1.6' }}>
            • Bosses get harder each run &nbsp;• 1 coin every 5 slain &nbsp;• No workout required
          </div>

          <button
            onClick={() => setInLeague(true)}
            className="w-full py-3 rounded-sm pixel-btn"
            style={{
              background: 'linear-gradient(135deg, rgba(250,204,21,0.18), rgba(250,204,21,0.06))',
              border: '2px solid #facc15',
              color: '#facc15',
              boxShadow: '0 0 20px rgba(250,204,21,0.25)',
              fontSize: '10px',
              letterSpacing: '3px',
            }}
          >
            ENTER LEAGUE
          </button>
        </div>
      </div>

      {/* Week calendar */}
      <div className="mt-6">
        <WeekCalendar bossHistory={bossHistory} playerLevel={playerLevel} currentDayKey={currentDayKey} />
      </div>

      <BossOutlook playerLevel={playerLevel} />

      {/* Boss gallery */}
      <div className="mt-6">
        <div className="neon-text mb-2" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>BOSS GALLERY</div>
        <div className="grid grid-cols-5 gap-2">
          {bossGallery.map((b, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-sm p-2"
              style={{
                background: 'rgba(6,10,20,0.82)',
                border: `1px solid ${ELEMENT_THEMES[b.element].color}33`,
              }}
            >
              <div style={{ animation: `pixelBob ${1.8 + i * 0.1}s ease-in-out infinite` }}>
                <BossSprite boss={b} size={36} />
              </div>
              <div className="neon-text text-center mt-1" style={{ color: '#334155', fontSize: '6px' }}>
                {b.name.split(' ')[1]}
              </div>
              <div style={{ fontSize: '10px' }}>{b.emoji}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
