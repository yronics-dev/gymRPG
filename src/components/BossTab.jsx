import React, { useState, useCallback } from 'react';
import { ELEMENT_THEMES, MUSCLE_COLORS } from '../constants';
import { useT } from '../i18n/LangContext';
import { DungeonScene } from './PixelScene';
import GameIcon from './GameIcon';
import { generateDailyBoss, generateTrainingBoss, generateLeagueBoss } from '../utils/bossGenerator';
import { getLevel, getPlayerBattleStats, getTodayKey, getDateKey } from '../utils/gameLogic';
import BossSprite from './BossSprite';
import BattleArena from './BattleArena';
import DungeonRun from './DungeonRun';

// ─── League Panel ─────────────────────────────────────────────────────────────
const DIFF_META = {
  NORMAL:    { color: '#4ade80', labelKey: 'diff_normal',    icon: 'shield'  },
  HARD:      { color: '#fb923c', labelKey: 'diff_hard',      icon: 'flame'   },
  ELITE:     { color: '#f87171', labelKey: 'diff_elite',     icon: 'skull'   },
  LEGENDARY: { color: '#facc15', labelKey: 'diff_legendary', icon: 'trophy'  },
};

function LeaguePanel({ leagueBoss, leagueKills, leagueGoldFlash, onEnter }) {
  const t = useT();
  const theme   = ELEMENT_THEMES[leagueBoss.element] || ELEMENT_THEMES.Fire;
  const diffRaw = DIFF_META[leagueBoss.diffLabel] || DIFF_META.NORMAL;
  const diff    = { ...diffRaw, label: t(diffRaw.labelKey) };
  const killsToGold = 5 - (leagueKills % 5);
  const goldProgress = (leagueKills % 5) / 5;

  // Threat colour: interpolate from green → orange → red based on scaleMult
  const threatPct = Math.min(1, (leagueBoss.scaleMult - 1) / 5);
  const threatColor = threatPct < 0.4
    ? '#4ade80'
    : threatPct < 0.7 ? '#fb923c' : '#f87171';

  // Tier milestone markers (every 5 kills)
  const milestones = Array.from({ length: 5 }, (_, i) => ({
    kill: i * 5,
    reached: leagueKills >= i * 5,
    isCurrent: leagueKills >= i * 5 && leagueKills < (i + 1) * 5,
  }));

  return (
    <div className="mt-6">
      {/* Section label */}
      <div className="neon-text mb-3 flex items-center gap-2" style={{ color: '#facc15', fontSize: '7px', letterSpacing: '3px' }}>
        <GameIcon name="trophy" size={11} color="#facc15" />
        {t('boss_league')}
        <span className="ml-auto neon-text px-2 py-0.5 rounded-sm"
          style={{ background: `${diff.color}22`, color: diff.color, border: `1px solid ${diff.color}55`, fontSize: '6px', letterSpacing: '2px' }}>
          {diff.label}
        </span>
      </div>

      {leagueGoldFlash && (
        <div className="neon-text text-center py-2 px-3 rounded-sm mb-3"
          style={{ background: 'rgba(250,204,21,0.15)', color: '#facc15', border: '1px solid rgba(250,204,21,0.5)', fontSize: '9px', letterSpacing: '2px', boxShadow: '0 0 20px rgba(250,204,21,0.3)', animation: 'levelUpPop 0.4s ease' }}>
          ✦ +1 GOLD EARNED! ✦
        </div>
      )}

      {/* Main card */}
      <div className="rounded-sm overflow-hidden" style={{
        background: `linear-gradient(160deg, ${theme.bg}cc 0%, #05080f 100%)`,
        border: `1px solid ${theme.color}55`,
        boxShadow: `0 0 24px ${theme.glow}, inset 0 0 40px rgba(0,0,0,0.4)`,
      }}>

        {/* Boss showcase — full-width top section */}
        <div className="relative flex items-end justify-between px-4 pt-4 pb-0" style={{ minHeight: 130 }}>
          {/* Background glow blob */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse 70% 80% at 60% 100%, ${theme.color}18 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          {/* Left: boss identity */}
          <div className="relative z-10 pb-4 flex-1">
            {/* Tier badge */}
            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm mb-2"
              style={{ background: 'rgba(250,204,21,0.12)', border: '1px solid rgba(250,204,21,0.4)' }}>
              <GameIcon name="trophy" size={9} color="#facc15" />
              <span className="neon-text" style={{ color: '#facc15', fontSize: '6px', letterSpacing: '2px' }}>
                {t('boss_tier')} {leagueBoss.tier}
              </span>
            </div>

            {/* Boss name */}
            <div className="neon-text font-black leading-tight" style={{
              color: '#ffffff', fontSize: '16px', fontFamily: 'Courier New',
              textShadow: `0 0 12px ${theme.color}88`,
            }}>
              {leagueBoss.name}
            </div>

            {/* Element + kill count */}
            <div className="flex items-center gap-2 mt-1">
              <div className="neon-text flex items-center gap-1" style={{ color: theme.color, fontSize: '7px' }}>
                <GameIcon name={leagueBoss.emoji || theme.icon} size={10} color={theme.color} />
                {leagueBoss.element}
              </div>
              <span style={{ color: '#334155', fontSize: '7px' }}>·</span>
              <span className="neon-text" style={{ color: '#475569', fontSize: '7px' }}>
                {leagueKills} {t('boss_slain')}
              </span>
            </div>

            {/* Stats row */}
            <div className="flex gap-4 mt-3">
              {[
                { label: 'HP',  val: leagueBoss.maxHP, color: '#4ade80' },
                { label: 'ATK', val: leagueBoss.atk,   color: '#f87171' },
                { label: 'SPD', val: leagueBoss.speed,  color: '#38bdf8' },
              ].map(({ label, val, color }) => (
                <div key={label}>
                  <div className="neon-text" style={{ color: '#475569', fontSize: '6px' }}>{label}</div>
                  <div className="neon-text" style={{ color, fontSize: '11px', textShadow: `0 0 6px ${color}88` }}>{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: sprite */}
          <div className="relative z-10 flex-shrink-0" style={{ animation: 'pixelBob 2.2s ease-in-out infinite' }}>
            <BossSprite boss={leagueBoss} size={90} isRage={leagueBoss.scaleMult >= 2} />
          </div>
        </div>

        {/* Threat / Scale section */}
        <div className="px-4 pt-3 pb-3" style={{ borderTop: `1px solid ${theme.color}22` }}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="neon-text" style={{ color: '#475569', fontSize: '6px', letterSpacing: '2px' }}>{t('boss_threat')}</span>
            <span className="neon-text" style={{ color: threatColor, fontSize: '8px', textShadow: `0 0 8px ${threatColor}` }}>
              ×{leagueBoss.scaleMult.toFixed(2)}
            </span>
          </div>
          <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              width: `${Math.min(100, threatPct * 100)}%`,
              height: '100%',
              background: `linear-gradient(90deg, #4ade80, ${threatColor})`,
              boxShadow: `0 0 8px ${threatColor}`,
              transition: 'width 0.5s ease',
            }} />
          </div>
        </div>

        {/* Milestone progress */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="neon-text" style={{ color: '#475569', fontSize: '6px', letterSpacing: '2px' }}>{t('boss_kill_streak')}</span>
            <span className="neon-text flex items-center gap-1" style={{ color: '#facc15', fontSize: '7px' }}>
              {killsToGold === 5 ? t('boss_reward_ready') : `${killsToGold} to `}
              {killsToGold < 5 && <GameIcon name="coin" size={10} color="#facc15" />}
            </span>
          </div>

          {/* 5-segment streak bar */}
          <div className="flex gap-1 mb-3">
            {Array.from({ length: 5 }, (_, i) => {
              const filled = i < (leagueKills % 5);
              const isNext = i === (leagueKills % 5);
              return (
                <div key={i} className="flex-1 rounded-sm" style={{
                  height: 8,
                  background: filled
                    ? 'linear-gradient(90deg, #ca8a04, #facc15)'
                    : isNext
                      ? 'rgba(250,204,21,0.15)'
                      : 'rgba(255,255,255,0.04)',
                  border: isNext
                    ? '1px solid rgba(250,204,21,0.4)'
                    : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: filled ? '0 0 6px #facc1566' : 'none',
                  transition: 'all 0.3s ease',
                }} />
              );
            })}
          </div>

          {/* Tier milestones */}
          <div className="flex justify-between mb-4">
            {milestones.map(({ kill, reached, isCurrent }) => (
              <div key={kill} className="flex flex-col items-center gap-0.5">
                <div className="w-5 h-5 rounded-sm flex items-center justify-center"
                  style={{
                    background: reached ? 'rgba(250,204,21,0.2)' : 'rgba(255,255,255,0.04)',
                    border: isCurrent
                      ? '1px solid #facc15'
                      : reached ? '1px solid rgba(250,204,21,0.5)' : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: isCurrent ? '0 0 8px #facc1588' : 'none',
                  }}>
                  <GameIcon name="trophy" size={10}
                    color={reached ? '#facc15' : '#334155'} />
                </div>
                <span className="neon-text" style={{ color: reached ? '#facc15' : '#334155', fontSize: '5px' }}>
                  T{Math.floor(kill / 5) + 1}
                </span>
              </div>
            ))}
          </div>

          {/* Enter button */}
          <button
            onClick={onEnter}
            className="w-full py-3.5 rounded-sm pixel-btn neon-text relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${diff.color}28, ${diff.color}0e)`,
              border: `2px solid ${diff.color}`,
              color: diff.color,
              boxShadow: `0 0 24px ${diff.color}44, inset 0 0 20px ${diff.color}08`,
              fontSize: '11px',
              letterSpacing: '4px',
              textShadow: `0 0 12px ${diff.color}`,
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <GameIcon name={diff.icon} size={13} color={diff.color} />
              {t('boss_enter_league')}
              <GameIcon name={diff.icon} size={13} color={diff.color} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function BossCard({ boss, isToday, cleared }) {
  const t = useT();
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
          ✓ {t('boss_cleared')}
        </div>
      )}
      {isToday && !cleared && (
        <div
          className="absolute top-3 right-3 neon-text px-2 py-0.5 rounded-sm"
          style={{ background: `${theme.color}22`, color: theme.color, border: `1px solid ${theme.color}44`, fontSize: '7px' }}
        >
          {t('boss_today')}
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
          <div className="neon-text mt-1" style={{ color: '#475569', fontSize: '7px' }}>{t('boss_level')} {boss.level}</div>

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
        <span className="neon-text" style={{ color: '#475569', fontSize: '7px' }}>{t('boss_weak')}:</span>
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
        <span className="neon-text" style={{ color: '#334155', fontSize: '7px' }}>{t('boss_dmg_bonus')}</span>
      </div>
    </div>
  );
}

function WeekCalendar({ bossHistory, playerLevel, currentDayKey }) {
  const t = useT();
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
      <div className="neon-text mb-2" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>{t('boss_history')}</div>
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
  const t = useT();
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
      <div className="neon-text mb-2" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>{t('boss_upcoming')}</div>
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
  onLootEarned, purchasedSkills = [], classBonuses = {}, skillTreeStats = {},
}) {
  const t = useT();
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

  const pStats      = getPlayerBattleStats(muscleXP, statUpgrades, equippedItems, purchasedSkills, classBonuses, skillTreeStats);
  // The 7 hand-crafted boss sprites
  const NAMED_BOSSES = [
    { name: 'Vampire Lord',   element: 'Shadow',  weaponElement: 'Shadow',   isMob: true,  id: 'vampire', label: 'VAMPIRE LORD'   },
    { name: 'Zombie Brute',   element: 'Earth',   weaponElement: 'Earth',    isMob: true,  id: 'zombie',  label: 'ZOMBIE BRUTE'   },
    { name: 'Fire Demon',     element: 'Fire',    weaponElement: 'Fire',     isMob: false, id: 'fire',    label: 'FIRE DEMON'      },
    { name: 'Ice Golem',      element: 'Ice',     weaponElement: 'Water',    isMob: false, id: 'ice',     label: 'ICE GOLEM'       },
    { name: 'Shadow Wraith',  element: 'Shadow',  weaponElement: 'Shadow',   isMob: false, id: 'shadow',  label: 'SHADOW WRAITH'   },
    { name: 'Thunder Titan',  element: 'Thunder', weaponElement: 'Electric', isMob: false, id: 'thunder', label: 'THUNDER TITAN'   },
    { name: 'Earth Colossus', element: 'Earth',   weaponElement: 'Earth',    isMob: false, id: 'earth',   label: 'EARTH COLOSSUS'  },
  ];
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
        purchasedSkills={purchasedSkills}
        classBonuses={classBonuses}
        skillTreeStats={skillTreeStats}
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
        equippedItems={equippedItems}
        purchasedSkills={purchasedSkills}
        classBonuses={classBonuses}
        skillTreeStats={skillTreeStats}
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
        equippedItems={equippedItems}
        purchasedSkills={purchasedSkills}
        classBonuses={classBonuses}
        skillTreeStats={skillTreeStats}
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
        equippedItems={equippedItems}
        purchasedSkills={purchasedSkills}
        classBonuses={classBonuses}
        skillTreeStats={skillTreeStats}
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
        <div className="neon-text" style={{ color: theme.color, fontSize: '11px' }}>{t('boss_daily')}</div>
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
          <div className="neon-text" style={{ color: '#475569', fontSize: '7px', letterSpacing: '2px' }}>{t('gen_gold')}</div>
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
              {t('boss_cleared')}!
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
          {dungeonResult === 'win' ? `${t('dungeon_cleared')} ${t('dungeon_loot')}!` : `${t('dungeon_title')} — ${t('battle_defeat')}`}
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
      <LeaguePanel
        leagueBoss={leagueBoss}
        leagueKills={leagueKills}
        leagueGoldFlash={leagueGoldFlash}
        onEnter={() => setInLeague(true)}
      />

      {/* Week calendar */}
      <div className="mt-6">
        <WeekCalendar bossHistory={bossHistory} playerLevel={playerLevel} currentDayKey={currentDayKey} />
      </div>

      <BossOutlook playerLevel={playerLevel} />

      {/* Boss gallery */}
      <div className="mt-6">
        <div className="neon-text mb-3" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>BOSS ROSTER</div>
        <div className="grid grid-cols-3 gap-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {NAMED_BOSSES.map((b, i) => {
            const theme = ELEMENT_THEMES[b.element];
            return (
              <div
                key={b.id}
                className="flex flex-col items-center rounded-sm py-4 px-2"
                style={{
                  background: `linear-gradient(160deg, ${theme.bg}cc, #06080f)`,
                  border: `1px solid ${theme.color}44`,
                  boxShadow: `0 0 12px ${theme.glow}`,
                }}
              >
                <div style={{ animation: `pixelBob ${1.8 + i * 0.2}s ease-in-out infinite` }}>
                  <BossSprite boss={b} size={56} />
                </div>
                <div
                  className="neon-text text-center mt-2"
                  style={{ color: theme.color, fontSize: '6px', letterSpacing: '1.5px', lineHeight: 1.4 }}
                >
                  {b.label.split(' ').join('\n')}
                </div>
                <div
                  className="neon-text text-center mt-1"
                  style={{ color: '#334155', fontSize: '6px', letterSpacing: '1px' }}
                >
                  {b.element.toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}
