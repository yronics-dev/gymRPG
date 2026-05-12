export function pad(num) {
  return num.toString().padStart(2, '0');
}

export function getWeekKey(date = new Date()) {
  const utc = new Date(date);
  const day = utc.getUTCDay();
  const diff = utc.getUTCDate() - day + (day === 0 ? -6 : 1); // Monday as first day
  const monday = new Date(utc.setUTCDate(diff));
  return `${monday.getUTCFullYear()}-${pad(monday.getUTCMonth() + 1)}-${pad(monday.getUTCDate())}`;
}

export function getWeekBoundaries(weekKey) {
  const [year, month, day] = weekKey.split('-').map(Number);
  const monday = new Date(Date.UTC(year, month - 1, day));
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  return { start: monday, end: sunday };
}

export function formatWeekLabel(weekKey) {
  const { start, end } = getWeekBoundaries(weekKey);
  const startLabel = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endLabel = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${startLabel} — ${endLabel}`;
}

export function getSortedWeekKeys(workouts) {
  const keys = [...new Set(workouts.map(w => getWeekKey(new Date(w.date + 'T12:00:00'))))];
  return keys.sort((a, b) => b.localeCompare(a));
}

export function groupWorkoutsByWeek(workouts) {
  return workouts.reduce((acc, workout) => {
    const key = getWeekKey(new Date(workout.date + 'T12:00:00'));
    acc[key] = acc[key] || [];
    acc[key].push(workout);
    return acc;
  }, {});
}
