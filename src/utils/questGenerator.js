import { QUEST_TEMPLATES } from '../constants';

function seededRng(seed) {
  let s = (seed ^ 0xdeadbeef) >>> 0;
  return function () {
    s = Math.imul(s ^ (s >>> 15), s | 1);
    s ^= s + Math.imul(s ^ (s >>> 7), s | 61);
    return ((s ^ (s >>> 14)) >>> 0) / 0x100000000;
  };
}

function stringHash(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// Generate 3 quests for the day, seeded by date so they're stable
export function generateDailyQuests(dateKey) {
  const rng = seededRng(stringHash(dateKey + '_quests'));
  const pool = [...QUEST_TEMPLATES];
  const chosen = [];

  // Always include "complete workout" as the first quest
  const workoutQuest = pool.find(q => q.id === 'complete_workout');
  chosen.push({ ...workoutQuest, progress: 0, done: false });
  const remaining = pool.filter(q => q.id !== 'complete_workout');

  // Pick 2 more at random
  while (chosen.length < 3 && remaining.length > 0) {
    const idx = Math.floor(rng() * remaining.length);
    chosen.push({ ...remaining.splice(idx, 1)[0], progress: 0, done: false });
  }

  return chosen;
}

// Update quest progress given a workout-completion event.
// Returns updated quests array + array of newly-completed quests.
export function updateQuestProgress(quests, { musclesTrainedCount, setsCount, xpEarned, isPR, streakCount }) {
  const completed = [];
  const updated = quests.map(q => {
    if (q.done) return q;
    let progress = q.progress;

    if (q.type === 'workout') progress = 1;
    if (q.type === 'muscles') progress = Math.min(q.target, musclesTrainedCount);
    if (q.type === 'sets')    progress = Math.min(q.target, setsCount);
    if (q.type === 'xp')      progress = Math.min(q.target, Math.floor(xpEarned));
    if (q.type === 'pr' && isPR) progress = 1;
    if (q.type === 'streak')  progress = Math.min(q.target, streakCount);

    const done = progress >= q.target;
    if (done && !q.done) completed.push({ ...q, progress, done });
    return { ...q, progress, done };
  });

  return { updated, completed };
}
