import React, { useState } from 'react';
import {
  MUSCLE_GROUPS, EXERCISES_BY_MUSCLE, EXERCISE_ICONS, MUSCLE_COLORS,
} from '../constants';
import GameIcon from './GameIcon';
import { getVolumeByMuscle, getTodayKey, isCardioExercise } from '../utils/gameLogic';
import { GymScene } from './PixelScene';

const MAX_WEIGHT_KG = 400;

function MuscleTag({ muscle }) {
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-medium"
      style={{
        background: `${MUSCLE_COLORS[muscle]}22`,
        color: MUSCLE_COLORS[muscle],
        border: `1px solid ${MUSCLE_COLORS[muscle]}55`,
      }}
    >
      {muscle}
    </span>
  );
}

function AddExerciseModal({ onAdd, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('');
  const [customName, setCustomName] = useState('');
  const [mode, setMode] = useState('search');

  const allExercises = MUSCLE_GROUPS.flatMap(m =>
    EXERCISES_BY_MUSCLE[m].map(e => ({ name: e, muscle: m }))
  ).sort((a, b) => a.name.localeCompare(b.name));

  const filtered = allExercises.filter(e => {
    if (selectedMuscle && e.muscle !== selectedMuscle) return false;
    if (!query.trim()) return true;
    return e.name.toLowerCase().includes(query.toLowerCase());
  });

  function handlePick(name, muscle) {
    onAdd({ name, muscleGroup: muscle });
    onClose();
  }

  function handleAddCustom() {
    const name = customName.trim();
    if (!name || !selectedMuscle) return;
    onAdd({ name, muscleGroup: selectedMuscle });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-30 flex flex-col"
      style={{ background: 'rgba(6,13,26,0.98)', backdropFilter: 'blur(4px)' }}
    >
      <div className="flex items-center justify-between px-4 pt-12 pb-3 border-b"
        style={{ borderColor: 'rgba(34,211,238,0.15)' }}>
        <span className="text-cyan-400 font-bold tracking-wide">Add Exercise</span>
        <button onClick={onClose} className="text-slate-500 p-1">✕</button>
      </div>

      <div className="flex gap-2 px-4 pt-3">
        {['search', 'custom'].map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="flex-1 py-2 rounded-lg text-sm capitalize transition-colors"
            style={{
              background: mode === m ? 'rgba(34,211,238,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${mode === m ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.1)'}`,
              color: mode === m ? '#22d3ee' : '#64748b',
            }}
          >
            {m === 'search' ? 'Built-in' : 'Custom'}
          </button>
        ))}
      </div>

      {mode === 'search' ? (
        <>
          <div className="px-4 pt-3">
            <input
              autoFocus
              className="w-full rounded-lg px-3 py-2.5 text-sm outline-none"
              style={{ background: '#111e36', border: '1px solid rgba(34,211,238,0.2)', color: '#e2e8f0' }}
              placeholder="Search exercises…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <div className="px-4 pt-3 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedMuscle('')}
              className="px-3 py-2 rounded-full text-xs font-semibold"
              style={{
                background: selectedMuscle === '' ? '#22d3ee' : 'rgba(255,255,255,0.06)',
                color: selectedMuscle === '' ? '#020617' : '#e2e8f0',
              }}
            >
              All
            </button>
            {MUSCLE_GROUPS.map(m => (
              <button
                key={m}
                onClick={() => setSelectedMuscle(m)}
                className="px-3 py-2 rounded-full text-xs font-semibold"
                style={{
                  background: selectedMuscle === m ? MUSCLE_COLORS[m] : 'rgba(255,255,255,0.06)',
                  color: selectedMuscle === m ? '#020617' : '#e2e8f0',
                  border: selectedMuscle === m ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto px-4 pt-2 pb-6">
            {MUSCLE_GROUPS.map(muscle => {
              const exs = filtered.filter(e => e.muscle === muscle);
              if (!exs.length) return null;
              return (
                <div key={muscle} className="mb-4">
                  <div className="text-xs mb-2 uppercase tracking-widest" style={{ color: MUSCLE_COLORS[muscle] }}>
                    {muscle}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {exs.map(e => (
                      <button
                        key={e.name}
                        onClick={() => handlePick(e.name, e.muscle)}
                        className="w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center gap-3"
                        style={{ background: 'rgba(8,13,28,0.82)', border: '1px solid rgba(255,255,255,0.07)', color: '#e2e8f0' }}
                      >
                        <GameIcon name={EXERCISE_ICONS[e.name] || 'dumbbell'} size={18} color={MUSCLE_COLORS[e.muscle]} />
                        <span>{e.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex-1 px-4 pt-4 flex flex-col gap-4">
          <div>
            <label className="text-xs text-slate-500 mb-1.5 block uppercase tracking-widest">Exercise Name</label>
            <input
              autoFocus
              className="w-full rounded-lg px-3 py-2.5 text-sm outline-none"
              style={{ background: '#111e36', border: '1px solid rgba(34,211,238,0.2)', color: '#e2e8f0' }}
              placeholder="e.g. Rope Climb"
              value={customName}
              onChange={e => setCustomName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 mb-1.5 block uppercase tracking-widest">Muscle Group</label>
            <div className="grid grid-cols-3 gap-2">
              {MUSCLE_GROUPS.map(m => (
                <button
                  key={m}
                  onClick={() => setSelectedMuscle(m)}
                  className="py-2 rounded-lg text-xs transition-colors"
                  style={{
                    background: selectedMuscle === m ? `${MUSCLE_COLORS[m]}22` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${selectedMuscle === m ? MUSCLE_COLORS[m] : 'rgba(255,255,255,0.1)'}`,
                    color: selectedMuscle === m ? MUSCLE_COLORS[m] : '#64748b',
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddCustom}
            disabled={!customName.trim() || !selectedMuscle}
            className="w-full py-3 rounded-xl font-bold text-sm tracking-widest uppercase mt-2 disabled:opacity-40"
            style={{ background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.5)', color: '#22d3ee' }}
          >
            Add Exercise
          </button>
        </div>
      )}
    </div>
  );
}

function ExerciseDetailsModal({ exercise, onSave, onClose }) {
  const isCardio = isCardioExercise(exercise.muscleGroup);
  const [rows, setRows] = useState(
    isCardio
      ? [{ duration: '', distance: '' }, { duration: '', distance: '' }]
      : [{ weight: '', reps: '' }, { weight: '', reps: '' }]
  );

  function setRowValue(index, field, value) {
    setRows(prev => prev.map((row, i) => i === index ? { ...row, [field]: value } : row));
  }

  function addRow() {
    setRows(prev => [
      ...prev,
      isCardio ? { duration: '', distance: '' } : { weight: '', reps: '' },
    ]);
  }

  function handleSave() {
    let validRows;
    if (isCardio) {
      validRows = rows
        .map(r => ({ duration: parseFloat(r.duration), distance: parseFloat(r.distance) }))
        .filter(r => r.duration > 0 && r.distance > 0);
    } else {
      validRows = rows
        .map(r => ({ weight: Math.min(MAX_WEIGHT_KG, parseFloat(r.weight)), reps: parseInt(r.reps) }))
        .filter(r => r.weight > 0 && r.reps > 0);
    }
    if (!validRows.length) return;
    onSave(exercise.id, validRows);
    onClose();
  }

  const validCount = isCardio
    ? rows.filter(r => parseFloat(r.duration) > 0 && parseFloat(r.distance) > 0).length
    : rows.filter(r => parseFloat(r.weight) > 0 && parseInt(r.reps) > 0).length;

  const totalVol = isCardio
    ? exercise.sets.reduce((s, set) => s + (set.duration || 0) * 60 * (set.distance || 0), 0)
    : exercise.sets.reduce((s, set) => s + (set.weight || 0) * (set.reps || 0), 0);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4 py-6 bg-black/60">
      <div className="w-full max-w-md rounded-[30px] border p-5" style={{ background: 'rgba(8,13,28,0.82)', borderColor: 'rgba(34,211,238,0.18)' }}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <GameIcon name={EXERCISE_ICONS[exercise.name] || (isCardio ? 'cardio' : 'dumbbell')} size={24} color={MUSCLE_COLORS[exercise.muscleGroup]} />
              <div>
                <div className="text-white font-semibold text-lg">{exercise.name}</div>
                <div className="text-slate-400 text-xs mt-0.5"><MuscleTag muscle={exercise.muscleGroup} /></div>
              </div>
            </div>
            <div className="text-slate-500 text-xs">
              {exercise.sets.length} sets · {isCardio ? `${totalVol.toFixed(0)} s·km` : `${totalVol} kg·reps`}
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl">×</button>
        </div>

        <div className="rounded-3xl p-4 mb-4" style={{ background: '#111e36', border: '1px solid rgba(255,255,255,0.06)' }}>
          {exercise.sets.length > 0 ? (
            <div className="space-y-2">
              {exercise.sets.map((set, index) => (
                <div key={index} className="flex items-center justify-between text-sm text-slate-300">
                  <span>Set {index + 1}</span>
                  {isCardio
                    ? <span>{set.duration}min × {set.distance}km</span>
                    : <span>{set.weight}kg × {set.reps}</span>
                  }
                </div>
              ))}
            </div>
          ) : (
            <div className="text-slate-500 text-sm">No sets logged yet. Add your first set below.</div>
          )}
        </div>

        <div className="space-y-3">
          {rows.map((row, index) => (
            <div key={index} className="grid grid-cols-2 gap-3">
              {isCardio ? (
                <>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      placeholder="min"
                      value={row.duration}
                      onChange={e => setRowValue(index, 'duration', e.target.value)}
                      className="w-full rounded-2xl px-3 py-3 text-sm text-center outline-none"
                      style={{ background: '#0b1325', border: '1px solid rgba(34,211,238,0.2)', color: '#e2e8f0' }}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 text-xs pointer-events-none">min</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      placeholder="km"
                      value={row.distance}
                      onChange={e => setRowValue(index, 'distance', e.target.value)}
                      className="w-full rounded-2xl px-3 py-3 text-sm text-center outline-none"
                      style={{ background: '#0b1325', border: '1px solid rgba(34,211,238,0.2)', color: '#e2e8f0' }}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 text-xs pointer-events-none">km</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      placeholder="kg"
                      min="0"
                      max={MAX_WEIGHT_KG}
                      value={row.weight}
                      onChange={e => setRowValue(index, 'weight', Math.min(MAX_WEIGHT_KG, e.target.value))}
                      className="w-full rounded-2xl px-3 py-3 text-sm text-center outline-none"
                      style={{ background: '#0b1325', border: '1px solid rgba(34,211,238,0.2)', color: '#e2e8f0' }}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 text-xs pointer-events-none">kg</span>
                  </div>
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="reps"
                    value={row.reps}
                    onChange={e => setRowValue(index, 'reps', e.target.value)}
                    className="w-full rounded-2xl px-3 py-3 text-sm text-center outline-none"
                    style={{ background: '#0b1325', border: '1px solid rgba(34,211,238,0.2)', color: '#e2e8f0' }}
                  />
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 mt-4">
          <button
            onClick={addRow}
            className="flex-1 rounded-2xl py-3 text-sm font-semibold"
            style={{ background: 'rgba(255,255,255,0.05)', color: '#a5f3fc' }}
          >
            + Add set
          </button>
          <button
            onClick={handleSave}
            className="flex-1 rounded-2xl py-3 text-sm font-bold"
            style={{ background: 'rgba(34,211,238,0.2)', border: '1px solid rgba(34,211,238,0.4)', color: '#22d3ee' }}
          >
            Save {validCount > 0 ? `(${validCount})` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}

function ExerciseCard({ exercise, onOpen, onRemove, muscleVolumePRs }) {
  const [pressed, setPressed] = useState(false);
  const isCardio = isCardioExercise(exercise.muscleGroup);
  const totalVol = isCardio
    ? exercise.sets.reduce((s, set) => s + (set.duration || 0) * 60 * (set.distance || 0), 0)
    : exercise.sets.reduce((s, set) => s + (set.weight || 0) * (set.reps || 0), 0);

  const pr = muscleVolumePRs?.[exercise.muscleGroup] || 0;
  const isPR = totalVol > 0 && totalVol > pr;

  return (
    <div
      className="rounded-xl p-4 cursor-pointer select-none"
      style={{
        background: 'rgba(8,13,28,0.82)',
        border: `1px solid ${pressed ? 'rgba(34,211,238,0.4)' : 'rgba(255,255,255,0.07)'}`,
        transform: pressed ? 'scale(0.975)' : 'scale(1)',
        transition: 'transform 0.15s ease, border-color 0.15s ease',
        boxShadow: pressed ? '0 0 14px rgba(34,211,238,0.12)' : 'none',
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => { setPressed(false); onOpen(exercise); }}
      onPointerLeave={() => setPressed(false)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <GameIcon name={EXERCISE_ICONS[exercise.name] || (isCardio ? 'cardio' : 'dumbbell')} size={20} color={MUSCLE_COLORS[exercise.muscleGroup]} />
          <div>
            <div className="font-semibold text-white text-sm">{exercise.name}</div>
            <div className="mt-1 flex items-center gap-2">
              <MuscleTag muscle={exercise.muscleGroup} />
              {isPR && (
                <span style={{ fontSize: '9px', color: '#facc15', letterSpacing: '1px' }}>PR!</span>
              )}
            </div>
          </div>
        </div>
        <button
          onPointerDown={e => e.stopPropagation()}
          onClick={e => { e.stopPropagation(); onRemove(exercise.id); }}
          className="text-slate-400 hover:text-slate-200 text-lg p-0.5"
          type="button"
        >
          ×
        </button>
      </div>
      <div className="text-slate-400 text-xs">
        {exercise.sets.length} sets logged
        {totalVol > 0 && (
          <span className="ml-2 text-slate-300">
            · {isCardio ? `${totalVol.toFixed(0)} s·km` : `${totalVol} kg·reps`}
          </span>
        )}
      </div>
    </div>
  );
}

function QuestPanel({ quests = [], streak = { count: 0 } }) {
  if (!quests.length) return null;
  const streakBonus = streak.count > 1 ? Math.min(streak.count - 1, 6) * 10 : 0;

  return (
    <div className="px-4 mb-3">
      {/* Streak banner */}
      {streak.count > 0 && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-sm mb-2"
          style={{ background: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.2)' }}
        >
          <GameIcon name="flame" size={16} color="#fb923c" />
          <div className="flex-1">
            <span className="neon-text" style={{ color: '#fb923c', fontSize: '8px', letterSpacing: '1px' }}>
              {streak.count}-DAY STREAK
            </span>
            {streakBonus > 0 && (
              <span className="neon-text ml-2" style={{ color: '#475569', fontSize: '7px' }}>
                +{streakBonus}% XP
              </span>
            )}
          </div>
          <span>
            {streak.count >= 7
              ? <GameIcon name="trophy"    size={12} color="#facc15" />
              : streak.count >= 3
              ? <GameIcon name="lightning" size={12} color="#fb923c" />
              : <span className="neon-text" style={{ color: '#4ade80', fontSize: '10px' }}>+</span>
            }
          </span>
        </div>
      )}

      {/* Quest list */}
      <div
        className="rounded-sm overflow-hidden"
        style={{ border: '1px solid rgba(250,204,21,0.15)', background: 'rgba(6,10,20,0.85)' }}
      >
        <div
          className="px-3 py-2"
          style={{ borderBottom: '1px solid rgba(250,204,21,0.1)', background: 'rgba(250,204,21,0.06)' }}
        >
          <span className="neon-text flex items-center gap-1.5" style={{ color: '#facc15', fontSize: '7px', letterSpacing: '2px' }}>
            <GameIcon name="scroll" size={10} color="#facc15" /> DAILY QUESTS
          </span>
        </div>
        <div className="flex flex-col divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          {quests.map(q => {
            const pct = Math.min(100, (q.progress / q.target) * 100);
            return (
              <div key={q.id} className="px-3 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="neon-text" style={{ color: q.done ? '#4ade80' : '#94a3b8', fontSize: '7px' }}>
                    {q.done ? '✓ ' : ''}{q.desc}
                  </span>
                  <span className="neon-text ml-2 flex-shrink-0" style={{ color: q.done ? '#facc15' : '#475569', fontSize: '7px' }}>
                    {q.done ? q.rewardLabel : `${q.progress}/${q.target}`}
                  </span>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: q.done ? 'linear-gradient(90deg,#4ade80,#22d3ee)' : 'rgba(255,255,255,0.2)',
                      boxShadow: q.done ? '0 0 6px #4ade80' : 'none',
                      transition: 'width 0.6s ease',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function WorkoutTab({
  workouts, onWorkoutUpdate, onRestTimerStart, onWorkoutComplete, onWorkoutReopen,
  muscleVolumePRs = {}, dailyQuests = [], streak = { count: 0 },
}) {
  const todayKey = getTodayKey();
  const todayWorkout = workouts.find(w => w.date === todayKey);
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  function startWorkout() {
    const newWorkout = {
      id: Date.now().toString(),
      date: todayKey,
      exercises: [],
      completed: false,
      completedAt: null,
    };
    onWorkoutUpdate([...workouts, newWorkout]);
  }

  function updateTodayWorkout(updater) {
    onWorkoutUpdate(workouts.map(w =>
      w.date === todayKey ? updater(w) : w
    ));
  }

  function addExercise({ name, muscleGroup }) {
    const newExercise = { id: Date.now().toString(), name, muscleGroup, sets: [] };
    updateTodayWorkout(w => ({ ...w, exercises: [...w.exercises, newExercise] }));
    setSelectedExercise(newExercise);
  }

  function removeExercise(exId) {
    updateTodayWorkout(w => ({ ...w, exercises: w.exercises.filter(e => e.id !== exId) }));
  }

  function logSet(exId, newSets) {
    if (!newSets.length) return;
    updateTodayWorkout(w => ({
      ...w,
      exercises: w.exercises.map(e =>
        e.id === exId ? { ...e, sets: [...e.sets, ...newSets] } : e
      ),
    }));
    onRestTimerStart();
  }

  function completeWorkout() {
    const completed = {
      ...todayWorkout,
      completed: true,
      completedAt: new Date().toISOString(),
    };
    onWorkoutUpdate(workouts.map(w => w.date === todayKey ? completed : w));
    onWorkoutComplete(completed);
  }

  function reopenWorkout() {
    if (onWorkoutReopen) onWorkoutReopen(todayWorkout);
    else {
      updateTodayWorkout(w => ({ ...w, completed: false, completedAt: null }));
    }
  }

  const volumeByMuscle = todayWorkout ? getVolumeByMuscle(todayWorkout.exercises) : {};
  const totalSets = todayWorkout ? todayWorkout.exercises.reduce((s, e) => s + e.sets.length, 0) : 0;
  const totalVolume = Object.values(volumeByMuscle).reduce((a, b) => a + b, 0);

  // ─── Completed view ────────────────────────────────────────────────────────
  if (todayWorkout?.completed) {
    return (
      <div className="flex-1 relative overflow-hidden">
        <GymScene />
        <div className="absolute inset-0 overflow-y-auto z-10 pt-4 pb-6">
          <div className="neon-text mb-1 px-4" style={{ color: '#22d3ee', fontSize: '11px' }}>TODAY'S WORKOUT</div>
          <div className="neon-text mb-3 px-4" style={{ color: '#334155', fontSize: '7px', letterSpacing: '2px' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).toUpperCase()}
          </div>

          <QuestPanel quests={dailyQuests} streak={streak} />
          <div
            className="rounded-sm p-4 mb-4 text-center mx-4"
            style={{ background: '#080e1a', border: '1px solid rgba(34,211,238,0.2)', boxShadow: '0 0 16px rgba(34,211,238,0.08)' }}
          >
            <div style={{ lineHeight: 1.2 }}><GameIcon name="trophy" size={36} color="#22d3ee" /></div>
            <div className="neon-text mt-2 neon-text-pulse" style={{ color: '#22d3ee', fontSize: '10px', letterSpacing: '2px' }}>
              WORKOUT COMPLETE!
            </div>
            <div className="neon-text mt-1" style={{ color: '#334155', fontSize: '7px' }}>
              {todayWorkout.exercises.length} EX · {totalSets} SETS · {totalVolume.toFixed(0)} VOL
            </div>
            {todayWorkout.xpGained && Object.keys(todayWorkout.xpGained).length === 0 && (
              <div className="neon-text mt-2" style={{ color: '#f87171', fontSize: '7px', letterSpacing: '1px' }}>
                No PR beaten — train harder for XP!
              </div>
            )}
            <button
              onClick={reopenWorkout}
              className="mt-4 px-4 py-3 rounded-sm pixel-btn"
              style={{
                background: 'rgba(34,211,238,0.1)',
                border: '1px solid rgba(34,211,238,0.3)',
                color: '#22d3ee',
                fontSize: '8px',
                letterSpacing: '2px',
              }}
            >
              EDIT WORKOUT
            </button>
          </div>
          {Object.entries(volumeByMuscle).map(([muscle, vol]) => {
            const pr = muscleVolumePRs[muscle] || 0;
            const isNewPR = vol >= pr && vol > 0;
            return (
              <div key={muscle} className="flex items-center justify-between py-2 border-b px-4"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: MUSCLE_COLORS[muscle] }} />
                  <span className="text-sm text-white">{muscle}</span>
                  {isNewPR && <GameIcon name="trophy" size={9} color="#facc15" />}
                </div>
                <div>
                  <span className="text-sm font-bold" style={{ color: MUSCLE_COLORS[muscle] }}>
                    {vol.toFixed(0)}
                  </span>
                  {todayWorkout.xpGained?.[muscle] && (
                    <span className="text-slate-400 text-xs ml-2">+{todayWorkout.xpGained[muscle].toFixed(1)} XP</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── No workout today ───────────────────────────────────────────────────────
  if (!todayWorkout) {
    return (
      <div className="flex-1 relative overflow-hidden">
        <GymScene />
        <div className="absolute inset-0 overflow-y-auto z-10 flex flex-col pt-8 pb-6">
          {/* Hero section */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 gap-4">
            <div style={{ filter: 'drop-shadow(0 0 20px rgba(34,211,238,0.5))', animation: 'pixelBob 2s ease-in-out infinite' }}>
              <GameIcon name="dumbbell" size={64} color="#22d3ee" />
            </div>
            <div className="text-center">
              <div className="neon-text neon-text-pulse" style={{ color: '#22d3ee', fontSize: '14px', letterSpacing: '2px' }}>
                READY TO TRAIN?
              </div>
              <div className="neon-text mt-2" style={{ color: '#334155', fontSize: '7px', letterSpacing: '3px' }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()}
              </div>
            </div>
            <button
              onClick={startWorkout}
              className="w-full py-4 rounded-sm pixel-btn"
              style={{
                background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(34,211,238,0.08))',
                border: '2px solid #22d3ee',
                color: '#22d3ee',
                boxShadow: '0 0 28px rgba(34,211,238,0.3), inset 0 0 20px rgba(34,211,238,0.05)',
                fontSize: '12px',
                letterSpacing: '4px',
              }}
            >
              START WORKOUT
            </button>
          </div>

          {/* Quest panel below the start button */}
          <div className="mt-4">
            <QuestPanel quests={dailyQuests} streak={streak} />
          </div>
        </div>
      </div>
    );
  }

  // ─── Active workout ─────────────────────────────────────────────────────────
  return (
    <>
      {showModal && (
        <AddExerciseModal onAdd={addExercise} onClose={() => setShowModal(false)} />
      )}

      <div className="flex-1 relative overflow-hidden">
        <GymScene />
        <div className="absolute inset-0 overflow-y-auto z-10">
          <div className="sticky top-0 z-10 px-4 py-3 flex items-center justify-between"
            style={{ background: 'rgba(6,9,18,0.92)', borderBottom: '1px solid rgba(34,211,238,0.1)', backdropFilter: 'blur(4px)' }}>
            <div>
              <h2 className="text-cyan-400 font-bold">Workout</h2>
              <p className="text-slate-600 text-xs">
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </p>
            </div>
            {totalVolume > 0 && (
              <div className="text-right text-xs">
                <div className="text-white font-bold">{totalVolume.toFixed(0)}</div>
                <div className="text-slate-600">vol</div>
              </div>
            )}
          </div>

          <div className="px-4 pb-4">
            <div className="flex flex-col gap-3 mt-3">
              {todayWorkout.exercises.map(ex => (
                <ExerciseCard
                  key={ex.id}
                  exercise={ex}
                  onOpen={() => setSelectedExercise(ex)}
                  onRemove={removeExercise}
                  muscleVolumePRs={muscleVolumePRs}
                />
              ))}
            </div>

            {selectedExercise && (
              <ExerciseDetailsModal
                exercise={selectedExercise}
                onSave={logSet}
                onClose={() => setSelectedExercise(null)}
              />
            )}

            <button
              onClick={() => setShowModal(true)}
              className="w-full mt-3 py-3 rounded-xl text-sm tracking-wide border-dashed transition-colors"
              style={{ background: 'transparent', border: '1.5px dashed rgba(34,211,238,0.25)', color: '#22d3ee' }}
            >
              + Add Exercise
            </button>

            {Object.keys(volumeByMuscle).length > 0 && (
              <div className="mt-4 rounded-xl p-3"
                style={{ background: 'rgba(8,13,28,0.82)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Volume Summary</div>
                {Object.entries(volumeByMuscle).map(([muscle, vol]) => {
                  const pr = muscleVolumePRs[muscle] || 0;
                  const isPR = vol > pr;
                  return (
                    <div key={muscle} className="flex items-center justify-between text-sm py-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: MUSCLE_COLORS[muscle] }} />
                        <span className="text-slate-300">{muscle}</span>
                        {isPR && <span className="flex items-center gap-1" style={{ fontSize: '9px', color: '#facc15' }}><GameIcon name="trophy" size={9} color="#facc15" /> PR</span>}
                      </div>
                      <span style={{ color: MUSCLE_COLORS[muscle] }}>
                        {vol.toFixed(0)}
                        {isPR && <span className="text-slate-400 text-xs ml-1">(+{(vol / 10).toFixed(1)} XP)</span>}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {totalSets > 0 && (
              <button
                onClick={completeWorkout}
                className="w-full mt-4 py-4 rounded-xl font-bold text-base tracking-widest uppercase"
                style={{
                  background: 'linear-gradient(135deg, rgba(250,204,21,0.2), rgba(250,204,21,0.1))',
                  border: '2px solid #facc15',
                  color: '#facc15',
                  boxShadow: '0 0 20px rgba(250,204,21,0.25)',
                }}
              >
                ✓ Complete Workout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
