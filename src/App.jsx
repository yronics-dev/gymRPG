import React, { useState, useEffect, useRef } from 'react';
import SpritePreview from './components/SpritePreview';
const SPRITE_PREVIEW = window.location.search.includes('sprites');
import { useLocalStorage } from './hooks/useLocalStorage';
import {
  INITIAL_MUSCLE_XP,
  getTodayKey,
  getVolumeByMuscle,
  xpFromVolume,
  getLevel,
  getSkillXPMultiplier,
} from './utils/gameLogic';
import { BOSS_BONUS_XP, BOSS_CONFIG, MUSCLE_GROUPS, WORKOUT_EVENTS } from './constants';
import { updateStreak, getStreakMultiplier, shouldGrantStreakReward } from './utils/streakHelper';
import { generateDailyQuests, updateQuestProgress } from './utils/questGenerator';
import { getPlayerClass, getClassBonuses, getPlayerTitle } from './utils/classSystem';
import { rollWorkoutLoot, generateLootItem } from './utils/lootGenerator';
import Navigation from './components/Navigation';
import RestTimerOverlay from './components/RestTimerOverlay';
import WorkoutTab from './components/WorkoutTab';
import CharacterTab from './components/CharacterTab';
import BossTab from './components/BossTab';
import HistoryTab from './components/HistoryTab';
import LoginScreen from './components/LoginScreen';
import PerksTab from './components/PerksTab';
import PostWorkoutOverlay from './components/PostWorkoutOverlay';
import OnboardingFlow from './components/OnboardingFlow';

const DEFAULT_TIMER = 60;

const WOODEN_SWORD = {
  id: 'starter_wooden_sword',
  name: 'Wooden Sword',
  slot: 'weapon',
  icon: 'sword',
  rarity: 'Common',
  rarityColor: '#94a3b8',
  rarityGlow: 'rgba(148,163,184,0.2)',
  atk: 2, def: 0, hp: 0, crit: 0, dodge: 0,
};

// Pick a random workout event, weighted
function rollWorkoutEvent() {
  const total = WORKOUT_EVENTS.reduce((s, e) => s + e.weight, 0);
  let roll = Math.random() * total;
  for (const ev of WORKOUT_EVENTS) {
    if (roll < ev.weight) return ev;
    roll -= ev.weight;
  }
  return WORKOUT_EVENTS[WORKOUT_EVENTS.length - 1];
}

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
  const [leagueKills, setLeagueKills]   = useLocalStorage(`${u}gymrpg_league_kills`, 0);
  const [characterName, setCharacterName] = useLocalStorage(`${u}gymrpg_character_name`, 'Hero');
  const [timerTotal, setTimerTotal]     = useLocalStorage(`${u}gymrpg_timer_duration`, DEFAULT_TIMER);
  const [language, setLanguage]         = useLocalStorage(`gymrpg_language`, 'en');

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

  // Dungeon loot system
  const [inventory, setInventory]         = useLocalStorage(`${u}gymrpg_inventory`, [WOODEN_SWORD]);
  const [equippedItems, setEquippedItems] = useLocalStorage(`${u}gymrpg_equipped_items`, {
    helmet: null, chest: null, boots: null, weapon: WOODEN_SWORD, ring: null, special: null,
  });

  // ── New feature states ─────────────────────────────────────────
  // Streak
  const [streak, setStreak] = useLocalStorage(`${u}gymrpg_streak`, { count: 0, lastDate: null, maxStreak: 0 });

  // Daily quests (regenerate when date changes)
  const [questsDate, setQuestsDate] = useLocalStorage(`${u}gymrpg_quests_date`, '');
  const [dailyQuests, setDailyQuests] = useLocalStorage(`${u}gymrpg_daily_quests`, []);

  // Skill tree
  const [purchasedSkills, setPurchasedSkills] = useLocalStorage(`${u}gymrpg_purchased_skills`, []);

  // Prestige
  const [prestige, setPrestige] = useLocalStorage(`${u}gymrpg_prestige`, { count: 0, multiplier: 1 });

  // Onboarding
  const [onboardingDone, setOnboardingDone] = useLocalStorage(`${u}gymrpg_onboarding_done`, false);
  const [playerGoal, setPlayerGoal]         = useLocalStorage(`${u}gymrpg_player_goal`, null);

  // Post-workout overlay (transient — not persisted)
  const [postWorkoutData, setPostWorkoutData] = useState(null);

  // Give wooden sword to any player who has no weapons at all (existing accounts)
  useEffect(() => {
    const hasAnyWeapon = inventory.some(i => i.slot === 'weapon');
    if (!hasAnyWeapon) {
      setInventory(prev => [...prev, WOODEN_SWORD]);
      setEquippedItems(prev => prev.weapon ? prev : { ...prev, weapon: WOODEN_SWORD });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [currentDayKey, setCurrentDayKey] = useState(getTodayKey());

  // Regenerate quests if date changed
  useEffect(() => {
    const today = getTodayKey();
    if (questsDate !== today) {
      setDailyQuests(generateDailyQuests(today));
      setQuestsDate(today);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDayKey]);

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

  // ── Workout completion ─────────────────────────────────────────
  function handleWorkoutComplete(workout) {
    if (!workout) return;

    const volByMuscle  = getVolumeByMuscle(workout.exercises);
    const rawXpGained  = {};
    const newPRs       = { ...muscleVolumePRs };
    let   isPR         = false;

    for (const [muscle, vol] of Object.entries(volByMuscle)) {
      const pr = newPRs[muscle] || 0;
      if (vol > pr) {
        rawXpGained[muscle] = xpFromVolume(vol);
        newPRs[muscle] = vol;
        isPR = true;
      }
    }

    // ── Multipliers ────────────────────────────────────────────
    const newStreak        = updateStreak(streak);
    const streakMult       = getStreakMultiplier(newStreak.count);
    const workoutEvent     = rollWorkoutEvent();
    const eventMult        = workoutEvent.xpMult;
    const skillXpMult      = getSkillXPMultiplier(purchasedSkills);
    const prestigeMult     = prestige.multiplier || 1;

    // PR surge skill: +25% XP when setting a PR
    const prSurgeMult      = (isPR && purchasedSkills.includes('xp_surge')) ? 1.25 : 1;
    const totalMult        = streakMult * eventMult * skillXpMult * prestigeMult * prSurgeMult;

    const finalXpGained    = {};
    let   totalXP          = 0;
    for (const [muscle, xp] of Object.entries(rawXpGained)) {
      const final = xp * totalMult;
      finalXpGained[muscle] = final;
      totalXP += final;
    }

    // Apply XP
    setMuscleXP(prev => {
      const next = { ...prev };
      for (const [muscle, xp] of Object.entries(finalXpGained)) {
        next[muscle] = (next[muscle] || 0) + xp;
      }
      return next;
    });
    setMuscleVolumePRs(newPRs);

    // Store xpGained + pre-workout PRs on workout so reopen can fully reverse both
    const prevPRs = muscleVolumePRs; // snapshot before we mutated newPRs
    setWorkouts(prev => prev.map(w =>
      w.id === workout.id ? { ...w, xpGained: finalXpGained, prevPRs } : w
    ));

    // ── Streak update ──────────────────────────────────────────
    const prevStreakCount = streak.count;
    setStreak(newStreak);

    // 7-day streak reward: drop a random loot item
    let streakLoot = null;
    if (shouldGrantStreakReward(prevStreakCount, newStreak.count)) {
      streakLoot = generateLootItem(Date.now() ^ 0x777777);
    }

    // ── Quest progress ─────────────────────────────────────────
    const setsCount = workout.exercises.reduce((s, ex) => s + ex.sets.length, 0);
    const musclesTrainedCount = new Set(workout.exercises.map(e => e.muscleGroup)).size;

    const { updated: updatedQuests, completed: completedQuests } = updateQuestProgress(
      dailyQuests.length ? dailyQuests : generateDailyQuests(getTodayKey()),
      { musclesTrainedCount, setsCount, xpEarned: totalXP, isPR, streakCount: newStreak.count }
    );
    setDailyQuests(updatedQuests);

    // Award quest rewards
    let questGold = 0;
    let questXP   = 0;
    for (const q of completedQuests) {
      if (q.reward?.gold) questGold += q.reward.gold;
      if (q.reward?.xp)   questXP   += q.reward.xp;
    }
    if (questGold > 0) setCoins(prev => prev + questGold);
    if (questXP > 0) {
      setMuscleXP(prev => {
        const next = { ...prev };
        // Distribute bonus XP evenly across trained muscles
        const muscles = Object.keys(finalXpGained);
        if (muscles.length > 0) {
          const each = questXP / muscles.length;
          muscles.forEach(m => { next[m] = (next[m] || 0) + each; });
        }
        return next;
      });
    }

    // ── Post-workout loot roll ─────────────────────────────────
    const lootDrop = streakLoot || rollWorkoutLoot(Date.now());

    // ── Show post-workout overlay ──────────────────────────────
    setPostWorkoutData({
      event: workoutEvent,
      xpGained: finalXpGained,
      totalXP,
      streak: newStreak,
      streakMultiplier: streakMult,
      eventMultiplier: eventMult,
      questUpdates: updatedQuests,
      completedQuests,
      lootDrop,
    });
  }

  function handlePostWorkoutDone() {
    setPostWorkoutData(null);
  }

  function handlePostWorkoutEquipLoot(item) {
    handleLootEarned(item);
    setPostWorkoutData(null);
  }

  // ── Workout reopen ─────────────────────────────────────────────
  function handleWorkoutReopen(workout) {
    if (!workout?.xpGained) return;
    // Reverse XP
    setMuscleXP(prev => {
      const next = { ...prev };
      for (const [muscle, xp] of Object.entries(workout.xpGained)) {
        next[muscle] = Math.max(0, (next[muscle] || 0) - xp);
      }
      return next;
    });
    // Restore PRs to what they were before this workout so re-completing awards XP correctly
    if (workout.prevPRs) {
      setMuscleVolumePRs(workout.prevPRs);
    }
    setWorkouts(prev => prev.map(w =>
      w.id === workout.id ? { ...w, xpGained: undefined, prevPRs: undefined, completed: false } : w
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

  function handleLeagueBossDefeated() {
    const next = leagueKills + 1;
    setLeagueKills(next);
    if (next % 5 === 0) setCoins(prev => prev + 1);
  }

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

  function handleLootEarned(item) {
    setInventory(prev => {
      const without = prev.filter(i => i.id !== item.id);
      return [...without, item];
    });
    setEquippedItems(prev => ({ ...prev, [item.slot]: item }));
  }

  function handleEquipInventoryItem(item) {
    setEquippedItems(prev => ({ ...prev, [item.slot]: item }));
  }

  function handleUnequipItem(slot) {
    setEquippedItems(prev => ({ ...prev, [slot]: null }));
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
    setEquippedClothing(prev => ({ ...prev, [slot]: itemId }));
  }

  function handleEquipClothing(itemId, slot) {
    setEquippedClothing(prev => ({ ...prev, [slot]: itemId }));
  }

  // ── Skill tree purchase ────────────────────────────────────────
  function handleBuySkill(skillId, cost) {
    if (coins < cost) return;
    if (purchasedSkills.includes(skillId)) return;
    setCoins(prev => prev - cost);
    setPurchasedSkills(prev => [...prev, skillId]);
  }

  // ── Prestige ───────────────────────────────────────────────────
  function handlePrestige() {
    const level = getLevel(muscleXP);
    if (level < 200) return;
    const newCount = (prestige.count || 0) + 1;
    const newMult  = 1 + newCount * 0.25; // +25% XP per prestige
    setPrestige({ count: newCount, multiplier: newMult });
    setMuscleXP(INITIAL_MUSCLE_XP);
    setMuscleVolumePRs({});
    setStatUpgrades({ ATK: 0, DEF: 0, HP: 0, LCK: 0 });
    setPurchasedSkills([]);
  }

  // ── Onboarding ─────────────────────────────────────────────────
  function handleOnboardingComplete(goalId) {
    setPlayerGoal(goalId);
    setOnboardingDone(true);
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

  // Derived character data
  const playerLevel  = getLevel(muscleXP);
  const playerClass  = getPlayerClass(muscleXP, playerLevel);
  const classBonuses = getClassBonuses(playerClass);
  const playerTitle  = getPlayerTitle(playerLevel);

  if (!currentUser) return <LoginScreen onLogin={handleLogin} />;
  if (!onboardingDone) return <OnboardingFlow onComplete={handleOnboardingComplete} />;

  const tabProps = {
    workout: (
      <WorkoutTab
        workouts={workouts}
        onWorkoutUpdate={setWorkouts}
        onRestTimerStart={startRestTimer}
        onWorkoutComplete={handleWorkoutComplete}
        onWorkoutReopen={handleWorkoutReopen}
        muscleVolumePRs={muscleVolumePRs}
        dailyQuests={dailyQuests}
        streak={streak}
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
        timerTotal={timerTotal}
        onChangeTimerDuration={handleTimerChangeDuration}
        language={language}
        onChangeLanguage={setLanguage}
        inventory={inventory}
        equippedItems={equippedItems}
        onEquipItem={handleEquipInventoryItem}
        onUnequipItem={handleUnequipItem}
        playerClass={playerClass}
        playerTitle={playerTitle}
        prestige={prestige}
        streak={streak}
        purchasedSkills={purchasedSkills}
        onPrestige={handlePrestige}
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
        equippedItems={equippedItems}
        onBossCleared={handleBossCleared}
        onBossDefeat={handleBossDefeat}
        todayKey={todayKey}
        leagueKills={leagueKills}
        onLeagueBossDefeated={handleLeagueBossDefeated}
        onLootEarned={handleLootEarned}
        purchasedSkills={purchasedSkills}
        classBonuses={classBonuses}
      />
    ),
    perks: (
      <PerksTab
        coins={coins}
        purchasedSkills={purchasedSkills}
        onBuySkill={handleBuySkill}
      />
    ),
    history: (
      <HistoryTab workouts={workouts} />
    ),
  };

  if (SPRITE_PREVIEW) return <SpritePreview />;

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

      {showLevelUp && <LevelUpBanner level={playerLevel} playerTitle={playerTitle} />}

      {postWorkoutData && (
        <PostWorkoutOverlay
          event={postWorkoutData.event}
          xpGained={postWorkoutData.xpGained}
          totalXP={postWorkoutData.totalXP}
          streak={postWorkoutData.streak}
          streakMultiplier={postWorkoutData.streakMultiplier}
          eventMultiplier={postWorkoutData.eventMultiplier}
          questUpdates={postWorkoutData.questUpdates}
          completedQuests={postWorkoutData.completedQuests}
          lootDrop={postWorkoutData.lootDrop}
          onEquipLoot={handlePostWorkoutEquipLoot}
          onDone={handlePostWorkoutDone}
        />
      )}
    </div>
  );
}

function LevelUpBanner({ level, playerTitle }) {
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
          LEVEL UP!
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
        {playerTitle && (
          <div className="neon-text mt-2" style={{ color: playerTitle.color, fontSize: '9px', letterSpacing: '3px' }}>
            {playerTitle.title.toUpperCase()}
          </div>
        )}
        <div className="neon-text" style={{ color: '#fde68a', fontSize: '9px', letterSpacing: '4px', marginTop: '12px' }}>
          YOU ARE GETTING STRONGER!
        </div>
      </div>
    </div>
  );
}
