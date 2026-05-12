import React, { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import {
  INITIAL_MUSCLE_XP,
  getTodayKey,
  getVolumeByMuscle,
  xpFromVolume,
  getLevel,
} from './utils/gameLogic';
import { BOSS_BONUS_XP, BOSS_CONFIG, MUSCLE_GROUPS } from './constants';
import Navigation from './components/Navigation';
import RestTimerOverlay from './components/RestTimerOverlay';
import WorkoutTab from './components/WorkoutTab';
import CharacterTab from './components/CharacterTab';
import BossTab from './components/BossTab';
import HistoryTab from './components/HistoryTab';
import LoginScreen from './components/LoginScreen';

const DEFAULT_TIMER = 60;

export default function App() {
  // ── Auth ────────────────────────────────────────────────────────
  const [currentUser, setCurrentUser] = useState(() =>
    localStorage.getItem('gymrpg_current_user') || null
  );

  function handleLogin(username) {
    localStorage.setItem('gymrpg_current_user', username);
    setCurrentUser(username);
  }

  function handleLogout() {
    localStorage.removeItem('gymrpg_current_user');
    setCurrentUser(null);
  }

  const u = currentUser ? `${currentUser}_` : '_guest_';

  const [activeTab, setActiveTab] = useState('workout');
  const [workouts, setWorkouts]         = useLocalStorage(`${u}gymrpg_workouts`, []);
  const [muscleXP, setMuscleXP]         = useLocalStorage(`${u}gymrpg_muscle_xp`, INITIAL_MUSCLE_XP);
  const [muscleVolumePRs, setMuscleVolumePRs] = useLocalStorage(`${u}gymrpg_volume_prs`, {});
  const [bossHistory, setBossHistory]   = useLocalStorage(`${u}gymrpg_boss_history`, {});
  const [coins, setCoins]               = useLocalStorage(`${u}gymrpg_coins`, 0);
  const [characterName, setCharacterName] = useLocalStorage(`${u}gymrpg_character_name`, 'Hero');
  const [timerTotal, setTimerTotal]     = useLocalStorage(`${u}gymrpg_timer_duration`, DEFAULT_TIMER);

  // Stat upgrades purchased with gold
  const [statUpgrades, setStatUpgrades] = useLocalStorage(`${u}gymrpg_stat_upgrades`, {
    ATK: 0, DEF: 0, HP: 0, LCK: 0,
  });

  // Aura cosmetics
  const [ownedAuras, setOwnedAuras]       = useLocalStorage(`${u}gymrpg_owned_auras`, ['aura_default']);
  const [equippedAura, setEquippedAura]   = useLocalStorage(`${u}gymrpg_equipped_aura`, 'aura_default');

  // Clothing cosmetics
  const [ownedClothing, setOwnedClothing]     = useLocalStorage(`${u}gymrpg_owned_clothing`, [
    'hat_none', 'pants_none', 'shoes_none', 'acc_none',
  ]);
  const [equippedClothing, setEquippedClothing] = useLocalStorage(`${u}gymrpg_equipped_clothing`, {
    hat: 'hat_none', pants: 'pants_none', shoes: 'shoes_none', accessory: 'acc_none',
  });

  const [currentDayKey, setCurrentDayKey] = useState(getTodayKey());

  // Rest timer
  const [timerActive, setTimerActive] = useState(false);
  const [timerSecs, setTimerSecs]     = useState(timerTotal);
  const timerRef = useRef(null);

  // Level-up animation
  const [showLevelUp, setShowLevelUp] = useState(false);
  const prevLevelRef = useRef(getLevel(muscleXP));

  useEffect(() => {
    const newLevel = getLevel(muscleXP);
    if (newLevel > prevLevelRef.current) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
    prevLevelRef.current = newLevel;
  }, [muscleXP]);

  // Timer tick
  useEffect(() => {
    if (!timerActive) return;
    if (timerSecs <= 0) return;
    timerRef.current = setTimeout(() => setTimerSecs(s => s - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [timerActive, timerSecs]);

  function startRestTimer() {
    setTimerSecs(timerTotal);
    setTimerActive(true);
  }

  function dismissTimer() {
    setTimerActive(false);
    setTimerSecs(timerTotal);
  }

  function handleTimerChangeDuration(secs) {
    setTimerTotal(secs);
    setTimerSecs(secs);
  }

  // PR-based XP: only award XP when volume exceeds personal record for that muscle
  function handleWorkoutComplete(workout) {
    if (!workout) return;
    const volByMuscle = getVolumeByMuscle(workout.exercises);
    const xpGained = {};
    const newPRs = { ...muscleVolumePRs };

    for (const [muscle, vol] of Object.entries(volByMuscle)) {
      const pr = newPRs[muscle] || 0;
      if (vol > pr) {
        xpGained[muscle] = xpFromVolume(vol);
        newPRs[muscle] = vol;
      }
    }

    setMuscleXP(prev => {
      const next = { ...prev };
      for (const [muscle, xp] of Object.entries(xpGained)) {
        next[muscle] = (next[muscle] || 0) + xp;
      }
      return next;
    });
    setMuscleVolumePRs(newPRs);

    // Store xpGained on the workout so we can reverse it on reopen
    setWorkouts(prev => prev.map(w =>
      w.id === workout.id ? { ...w, xpGained } : w
    ));
  }

  // Reverse XP when a completed workout is reopened for editing
  function handleWorkoutReopen(workout) {
    if (!workout?.xpGained) return;
    setMuscleXP(prev => {
      const next = { ...prev };
      for (const [muscle, xp] of Object.entries(workout.xpGained)) {
        next[muscle] = Math.max(0, (next[muscle] || 0) - xp);
      }
      return next;
    });
    // Clear stored xpGained so it can be recalculated on next complete
    setWorkouts(prev => prev.map(w =>
      w.id === workout.id ? { ...w, xpGained: undefined, completed: false } : w
    ));
  }

  function handleBossCleared(dateKey, bossName) {
    const todayWorkout = workouts.find(w => w.date === dateKey && w.completed);
    if (todayWorkout) {
      const muscles = [...new Set(todayWorkout.exercises.map(e => e.muscleGroup))];
      if (muscles.length > 0) {
        const bonusEach = BOSS_BONUS_XP / muscles.length;
        setMuscleXP(prev => {
          const next = { ...prev };
          muscles.forEach(m => { next[m] = (next[m] || 0) + bonusEach; });
          return next;
        });
      }
    }
    setBossHistory(prev => ({
      ...prev,
      [dateKey]: { cleared: true, attempted: true, bossName },
    }));
    setCoins(prev => prev + 1);
  }

  // On defeat: subtract XP penalty distributed across all muscle groups
  function handleBossDefeat(dateKey, bossName) {
    const penalty = BOSS_CONFIG.defeat50XP || 50;
    const perMuscle = penalty / MUSCLE_GROUPS.length;
    setMuscleXP(prev => {
      const next = { ...prev };
      MUSCLE_GROUPS.forEach(m => {
        next[m] = Math.max(0, (next[m] || 0) - perMuscle);
      });
      return next;
    });
    setBossHistory(prev => ({
      ...prev,
      [dateKey]: { cleared: false, attempted: true, bossName },
    }));
  }

  function handleBuyStatUpgrade(stat, cost) {
    if (coins < cost) return;
    setCoins(prev => prev - cost);
    setStatUpgrades(prev => ({ ...prev, [stat]: (prev[stat] || 0) + 1 }));
  }

  function handleBuyAura(auraId, cost) {
    if (coins < cost) return;
    if (ownedAuras.includes(auraId)) return;
    setCoins(prev => prev - cost);
    setOwnedAuras(prev => [...prev, auraId]);
  }

  function handleEquipAura(auraId) {
    if (!ownedAuras.includes(auraId)) return;
    setEquippedAura(auraId);
  }

  function handleBuyClothing(itemId, slot, cost) {
    if (coins < cost) return;
    if (ownedClothing.includes(itemId)) return;
    setCoins(prev => prev - cost);
    setOwnedClothing(prev => [...prev, itemId]);
  }

  function handleEquipClothing(itemId, slot) {
    if (!ownedClothing.includes(itemId)) return;
    setEquippedClothing(prev => ({ ...prev, [slot]: itemId }));
  }

  // Resolve aura color from id
  function getAuraColor(id) {
    const AURA_COLORS = {
      aura_default: '#22d3ee',
      aura_gold:    '#facc15',
      aura_red:     '#f87171',
      aura_purple:  '#a855f7',
      aura_green:   '#4ade80',
      aura_pink:    '#ff006e',
      aura_rainbow: 'rainbow',
    };
    return AURA_COLORS[id] || '#22d3ee';
  }

  // Midnight rollover
  useEffect(() => {
    const interval = setInterval(() => {
      const today = getTodayKey();
      if (today !== currentDayKey) setCurrentDayKey(today);
    }, 60000);
    return () => clearInterval(interval);
  }, [currentDayKey]);

  const todayKey          = currentDayKey;
  const todayWorkoutDone  = workouts.some(w => w.date === todayKey && w.completed);
  const bossCleared       = bossHistory[todayKey]?.cleared;
  const equippedAuraColor = getAuraColor(equippedAura);

  const tabProps = {
    workout: (
      <WorkoutTab
        workouts={workouts}
        onWorkoutUpdate={setWorkouts}
        onRestTimerStart={startRestTimer}
        onWorkoutComplete={handleWorkoutComplete}
        onWorkoutReopen={handleWorkoutReopen}
        muscleVolumePRs={muscleVolumePRs}
      />
    ),
    character: (
      <CharacterTab
        muscleXP={muscleXP}
        showLevelUp={showLevelUp}
        coins={coins}
        characterName={characterName}
        setCharacterName={setCharacterName}
        statUpgrades={statUpgrades}
        ownedAuras={ownedAuras}
        equippedAura={equippedAura}
        currentUser={currentUser}
        onLogout={handleLogout}
        equippedAuraColor={equippedAuraColor}
        onBuyStatUpgrade={handleBuyStatUpgrade}
        onBuyAura={handleBuyAura}
        onEquipAura={handleEquipAura}
        ownedClothing={ownedClothing}
        equippedClothing={equippedClothing}
        onBuyClothing={handleBuyClothing}
        onEquipClothing={handleEquipClothing}
      />
    ),
    boss: (
      <BossTab
        muscleXP={muscleXP}
        workouts={workouts}
        bossHistory={bossHistory}
        coins={coins}
        statUpgrades={statUpgrades}
        equippedAura={equippedAuraColor}
        equippedClothing={equippedClothing}
        onBossCleared={handleBossCleared}
        onBossDefeat={handleBossDefeat}
        todayKey={todayKey}
      />
    ),
    history: (
      <HistoryTab workouts={workouts} />
    ),
  };

  if (!currentUser) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div
      className="flex flex-col safe-top"
      style={{ height: '100dvh', background: 'var(--bg-primary)' }}
    >
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {tabProps[activeTab]}
      </div>

      <Navigation
        active={activeTab}
        onChange={setActiveTab}
        bossCleared={bossCleared}
        workoutDoneToday={todayWorkoutDone}
      />

      {timerActive && (
        <RestTimerOverlay
          secondsLeft={timerSecs}
          totalDuration={timerTotal}
          onCancel={dismissTimer}
          onChangeDuration={handleTimerChangeDuration}
        />
      )}

      {showLevelUp && <LevelUpBanner level={getLevel(muscleXP)} />}
    </div>
  );
}

function LevelUpBanner({ level }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none"
      style={{ background: 'rgba(4,8,18,0.75)', backdropFilter: 'blur(4px)' }}
    >
      <div
        style={{
          animation: 'levelUpPop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
          textAlign: 'center',
        }}
      >
        <div className="neon-text" style={{ color: '#facc15', fontSize: '14px', letterSpacing: '6px', marginBottom: '12px' }}>
          ⚡ LEVEL UP! ⚡
        </div>
        <div
          className="neon-text"
          style={{
            color: '#facc15',
            fontSize: '72px',
            textShadow: '0 0 30px #facc15, 0 0 60px #facc15, 0 0 100px #facc15',
            lineHeight: 1,
          }}
        >
          {level}
        </div>
        <div className="neon-text" style={{ color: '#fde68a', fontSize: '9px', letterSpacing: '4px', marginTop: '12px' }}>
          YOU ARE GETTING STRONGER!
        </div>
      </div>
    </div>
  );
}
