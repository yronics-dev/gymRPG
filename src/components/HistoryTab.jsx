import React, { useEffect, useMemo, useState } from 'react';
import { MUSCLE_COLORS } from '../constants';
import { ArchiveScene } from './PixelScene';
import { getVolumeByMuscle } from '../utils/gameLogic';
import {
  getWeekKey,
  getSortedWeekKeys,
  groupWorkoutsByWeek,
  formatWeekLabel,
} from '../utils/dateHelpers';

function WorkoutDetail({ workout }) {
  const vol = getVolumeByMuscle(workout.exercises);
  const totalVol = Object.values(vol).reduce((a, b) => a + b, 0);
  const totalSets = workout.exercises.reduce((s, e) => s + e.sets.length, 0);

  return (
    <div className="mt-3 flex flex-col gap-2">
      {workout.exercises.map(ex => (
        <div key={ex.id} className="text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full shrink-0"
              style={{ background: MUSCLE_COLORS[ex.muscleGroup] }} />
            <span className="text-white font-medium">{ex.name}</span>
            <span className="text-slate-600 ml-auto">{ex.sets.length} sets</span>
          </div>
          {ex.sets.length > 0 && (
            <div className="ml-4 mt-0.5 text-slate-600">
              {ex.sets.map((s, i) => (
                <span key={i} className="mr-2">{s.weight}×{s.reps}</span>
              ))}
            </div>
          )}
        </div>
      ))}

      {Object.keys(vol).length > 0 && (
        <div className="mt-1 pt-2 border-t flex flex-wrap gap-2"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          {Object.entries(vol).map(([m, v]) => (
            <span key={m} className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                background: `${MUSCLE_COLORS[m]}18`,
                color: MUSCLE_COLORS[m],
                border: `1px solid ${MUSCLE_COLORS[m]}44`,
              }}>
              {m} {v.toFixed(0)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function WorkoutCard({ workout }) {
  const [expanded, setExpanded] = useState(false);
  const vol = getVolumeByMuscle(workout.exercises);
  const totalVol = Object.values(vol).reduce((a, b) => a + b, 0);
  const totalSets = workout.exercises.reduce((s, e) => s + e.sets.length, 0);
  const muscles = [...new Set(workout.exercises.map(e => e.muscleGroup))];

  const date = new Date(workout.date + 'T12:00:00');

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: 'rgba(8,13,28,0.82)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <button
        className="w-full px-4 py-3 text-left"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-white font-semibold text-sm">
              {date.toLocaleDateString('en-US', {
                weekday: 'long', month: 'short', day: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {muscles.map(m => (
                <span
                  key={m}
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    background: `${MUSCLE_COLORS[m]}18`,
                    color: MUSCLE_COLORS[m],
                    border: `1px solid ${MUSCLE_COLORS[m]}33`,
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right ml-3 shrink-0">
            <div className="text-cyan-400 font-bold text-sm">{totalVol.toFixed(0)}</div>
            <div className="text-slate-600 text-xs">kg·reps</div>
            <div className="text-slate-600 text-xs mt-0.5">{totalSets} sets</div>
          </div>
        </div>
        <div className="text-slate-700 text-xs mt-1.5">
          {expanded ? '▲ hide' : '▼ show exercises'}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <WorkoutDetail workout={workout} />
        </div>
      )}
    </div>
  );
}

export default function HistoryTab({ workouts }) {
  const completed = [...workouts]
    .filter(w => w.completed)
    .sort((a, b) => b.date.localeCompare(a.date));

  const currentWeekKey = getWeekKey();
  const weekKeys = useMemo(() => {
    const keys = getSortedWeekKeys(completed);
    if (keys[0] !== currentWeekKey) {
      return [currentWeekKey, ...keys.filter(k => k !== currentWeekKey)];
    }
    return keys;
  }, [completed, currentWeekKey]);

  const [selectedWeekKey, setSelectedWeekKey] = useState(currentWeekKey);
  useEffect(() => {
    if (!weekKeys.includes(selectedWeekKey)) {
      setSelectedWeekKey(weekKeys[0]);
    }
  }, [weekKeys, selectedWeekKey]);

  const grouped = useMemo(() => groupWorkoutsByWeek(completed), [completed]);
  const workoutsForWeek = grouped[selectedWeekKey] || [];
  const selectedIndex = weekKeys.indexOf(selectedWeekKey);

  if (completed.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-4 text-center relative overflow-hidden">
        <ArchiveScene />
        <div className="relative z-10 text-5xl">📜</div>
        <div className="relative z-10">
          <div className="neon-text neon-text-pulse" style={{ color: '#facc15', fontSize: '14px', letterSpacing: '2px' }}>NO RECORDS YET</div>
          <div className="neon-text mt-2" style={{ color: '#334155', fontSize: '7px', letterSpacing: '2px' }}>COMPLETE YOUR FIRST WORKOUT</div>
        </div>
      </div>
    );
  }

  // aggregate totals
  const grandTotal = completed.reduce((acc, w) => {
    const vol = getVolumeByMuscle(w.exercises);
    for (const [m, v] of Object.entries(vol)) {
      acc[m] = (acc[m] || 0) + v;
    }
    return acc;
  }, {});

  return (
    <div className="flex-1 relative overflow-hidden">
      <ArchiveScene />
      <div className="absolute inset-0 overflow-y-auto z-10 px-4 pb-6">
      <div className="pt-4 mb-4 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-cyan-400 font-bold text-lg">History</h2>
          <span className="text-slate-500 text-sm">{completed.length} sessions</span>
        </div>
        <div className="flex items-center justify-between gap-3 p-3 rounded-xl"
          style={{ background: 'rgba(8,13,28,0.82)', border: '1px solid rgba(34,211,238,0.15)' }}>
          <button
            onClick={() => setSelectedWeekKey(weekKeys[Math.max(selectedIndex - 1, 0)])}
            disabled={selectedIndex <= 0}
            className="px-3 py-2 rounded-lg text-sm"
            style={{
              background: 'rgba(255,255,255,0.04)',
              color: selectedIndex <= 0 ? '#64748b' : '#e2e8f0',
            }}
          >
            ← Newer
          </button>
          <div className="text-center">
            <div className="text-white font-semibold">Week of</div>
            <div className="text-slate-400 text-sm">{formatWeekLabel(selectedWeekKey)}</div>
            <div className="text-slate-500 text-[11px] mt-1">
              {selectedIndex + 1} / {weekKeys.length}
            </div>
          </div>
          <button
            onClick={() => setSelectedWeekKey(weekKeys[Math.min(selectedIndex + 1, weekKeys.length - 1)])}
            disabled={selectedIndex >= weekKeys.length - 1}
            className="px-3 py-2 rounded-lg text-sm"
            style={{
              background: 'rgba(255,255,255,0.04)',
              color: selectedIndex >= weekKeys.length - 1 ? '#64748b' : '#e2e8f0',
            }}
          >
            Older →
          </button>
        </div>
      </div>

      {/* lifetime totals */}
      <div className="rounded-xl p-3 mb-4"
        style={{ background: 'rgba(8,13,28,0.82)', border: '1px solid rgba(34,211,238,0.15)' }}>
        <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Lifetime Volume</div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(grandTotal).map(([m, v]) => (
            <div key={m} className="text-xs">
              <span className="text-slate-600">{m}: </span>
              <span className="font-bold" style={{ color: MUSCLE_COLORS[m] }}>{v.toFixed(0)}</span>
            </div>
          ))}
        </div>
      </div>

      {workoutsForWeek.length === 0 ? (
        <div className="rounded-xl p-8 text-center"
          style={{ background: 'rgba(8,13,28,0.82)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="text-slate-500">No completed workouts for this week yet.</div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {workoutsForWeek.map(w => <WorkoutCard key={w.id} workout={w} />)}
        </div>
      )}
      </div>
    </div>
  );
}
