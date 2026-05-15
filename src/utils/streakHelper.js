import { getTodayKey } from './gameLogic';

export function getYesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Call this when a workout is completed.
// Returns the new streak object.
export function updateStreak(streak = { count: 0, lastDate: null, maxStreak: 0 }) {
  const today = getTodayKey();
  const yesterday = getYesterdayKey();

  // Already counted today
  if (streak.lastDate === today) return streak;

  const newCount = streak.lastDate === yesterday
    ? streak.count + 1   // consecutive
    : 1;                  // reset (but keep it positive — no punishment)

  const newMax = Math.max(streak.maxStreak || 0, newCount);
  return { count: newCount, lastDate: today, maxStreak: newMax };
}

// +10% XP per streak day beyond the first, capped at +60% (7-day streak)
export function getStreakMultiplier(streakCount = 0) {
  if (streakCount <= 1) return 1;
  return 1 + Math.min(streakCount - 1, 6) * 0.10;
}

// Returns a label like "🔥 3-day streak (+20%)"
export function getStreakLabel(streakCount = 0) {
  if (streakCount <= 0) return null;
  const bonus = Math.round((getStreakMultiplier(streakCount) - 1) * 100);
  return { count: streakCount, bonus };
}

// Whether this streak count triggers a 7-day item reward
export function shouldGrantStreakReward(prevCount, newCount) {
  return newCount >= 7 && prevCount < 7;
}
