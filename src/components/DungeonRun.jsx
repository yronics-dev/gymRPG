import React, { useState, useEffect, useMemo } from 'react';
import BattleArena from './BattleArena';
import LootChest from './LootChest';
import { generateDungeonEnemies, generateChestLoot } from '../utils/lootGenerator';
import { ELEMENT_THEMES } from '../constants';
import GameIcon from './GameIcon';
import MobSprite from './combat/MobSprite';
import { useT } from '../i18n/LangContext';

// ─── Wave-complete banner (auto-advances) ────────────────────────────────────
function WaveBanner({ waveLabel, nextLabel, onContinue }) {
  useEffect(() => {
    const t = setTimeout(onContinue, 1800);
    return () => clearTimeout(t);
  }, [onContinue]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'rgba(2,5,12,0.92)', backdropFilter: 'blur(6px)' }}
    >
      <div
        className="neon-text text-center"
        style={{
          color: '#4ade80',
          fontSize: '20px',
          letterSpacing: '4px',
          textShadow: '0 0 30px #4ade80',
          animation: 'levelUpPop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
        }}
      >
        ✓ {waveLabel}
      </div>
      <div className="neon-text mt-4" style={{ color: '#475569', fontSize: '8px', letterSpacing: '3px' }}>
        NEXT: {nextLabel}
      </div>
      <div
        className="mt-6 w-24 h-1 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.1)' }}
      >
        <div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #4ade80, #22d3ee)',
            animation: 'progressFill 1.8s linear forwards',
          }}
        />
      </div>
    </div>
  );
}

// ─── Dungeon lobby (overview before entering) ─────────────────────────────────
function DungeonLobby({ enemies, onStart, onClose }) {
  const t = useT();
  const mobs = enemies.filter(e => e.isMob);
  const boss = enemies.find(e => e.isBoss);
  const theme = ELEMENT_THEMES[boss.element] || ELEMENT_THEMES.Fire;

  // Group mobs by wave
  const waves = [0, 1, 2].map(wi => mobs.filter(m => m.waveIdx === wi));

  return (
    <div className="fixed inset-0 z-40 flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0f1e 0%, #020509 100%)' }}
    >
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)',
        zIndex: 1,
      }} />

      <div className="relative z-10 flex-1 overflow-y-auto px-4 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between pt-10 pb-4">
          <div>
            <div className="neon-text flex items-center gap-2" style={{ color: '#c084fc', fontSize: '12px', letterSpacing: '4px', textShadow: '0 0 16px #c084fc' }}>
              <GameIcon name="skull" size={14} color="#c084fc" /> {t('dungeon_title')}
            </div>
            <div className="neon-text mt-1" style={{ color: '#334155', fontSize: '7px' }}>
              {t('dungeon_enemies')}
            </div>
          </div>
          <button
            onClick={onClose}
            className="pixel-btn px-3 py-1.5 rounded-sm neon-text"
            style={{ color: '#475569', fontSize: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            ✕ {t('dungeon_back')}
          </button>
        </div>

        {/* Wave map */}
        <div
          className="rounded-sm p-4 mb-4"
          style={{ background: 'rgba(6,10,20,0.85)', border: '1px solid rgba(192,132,252,0.2)' }}
        >
          <div className="neon-text mb-3" style={{ color: '#475569', fontSize: '7px', letterSpacing: '3px' }}>{t('dungeon_map')}</div>

          <div className="flex items-center gap-1">
            {waves.map((wave, wi) => (
              <React.Fragment key={wi}>
                {/* Wave block */}
                <div className="flex flex-col items-center gap-1 flex-1">
                  <div className="neon-text" style={{ color: '#334155', fontSize: '6px' }}>{t('dungeon_wave')} {wi + 1}</div>
                  <div className="flex gap-1 justify-center">
                    {wave.map((mob, mi) => (
                      <div
                        key={mi}
                        className="flex items-center justify-center rounded-sm"
                        style={{
                          width: 44, height: 44,
                          background: `${(ELEMENT_THEMES[mob.element] || ELEMENT_THEMES.Earth).bg}cc`,
                          border: `1px solid ${(ELEMENT_THEMES[mob.element] || ELEMENT_THEMES.Earth).color}55`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          overflow: 'hidden',
                        }}
                      >
                        <MobSprite mob={mob} size={40}/>
                      </div>
                    ))}
                  </div>
                  <div className="neon-text text-center" style={{ color: '#475569', fontSize: '6px' }}>
                    {wave.map(m => m.name).join(' & ')}
                  </div>
                </div>

                {/* Arrow */}
                <div className="neon-text" style={{ color: '#334155', fontSize: '10px' }}>→</div>
              </React.Fragment>
            ))}

            {/* Boss */}
            <div className="flex flex-col items-center gap-1 flex-1">
              <div className="neon-text" style={{ color: theme.color, fontSize: '6px', letterSpacing: '1px' }}>{t('dungeon_boss')}</div>
              <div
                className="flex items-center justify-center rounded-sm"
                style={{
                  width: 44, height: 44,
                  background: `${theme.bg}cc`,
                  border: `2px solid ${theme.color}88`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 12px ${theme.glow}`,
                  animation: 'pixelBob 2s ease-in-out infinite',
                }}
              >
                <GameIcon name={boss.emoji || theme.icon || 'skull'} size={24} color={theme.color} />
              </div>
              <div className="neon-text text-center" style={{ color: theme.color, fontSize: '6px' }}>
                {boss.name.split(' ').slice(-1)[0]}
              </div>
            </div>

            {/* Chest */}
            <div className="neon-text" style={{ color: '#334155', fontSize: '10px' }}>→</div>
            <div className="flex flex-col items-center gap-1">
              <div className="neon-text" style={{ color: '#facc15', fontSize: '6px' }}>{t('dungeon_loot')}</div>
              <div style={{ filter: 'drop-shadow(0 0 8px #facc15)' }}><GameIcon name="chest" size={28} color="#facc15" /></div>
            </div>
          </div>
        </div>

        {/* Enemy list */}
        <div className="flex flex-col gap-2 mb-4">
          {[...mobs, boss].map((enemy, i) => {
            const theme2 = ELEMENT_THEMES[enemy.element] || ELEMENT_THEMES.Fire;
            return (
              <div
                key={i}
                className="flex items-center gap-3 rounded-sm p-2.5"
                style={{
                  background: `${theme2.bg}55`,
                  border: `1px solid ${theme2.color}33`,
                }}
              >
                <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36 }}>
                  {enemy.isMob
                    ? <MobSprite mob={enemy} size={34}/>
                    : <GameIcon name={enemy.emoji || ELEMENT_THEMES[enemy.element]?.icon || 'skull'} size={22} color={(ELEMENT_THEMES[enemy.element] || ELEMENT_THEMES.Fire).color}/>
                  }
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="neon-text" style={{ color: theme2.color, fontSize: '8px' }}>
                      {enemy.name}
                    </div>
                    {enemy.isBoss && (
                      <div
                        className="neon-text px-1.5 py-0.5 rounded-sm"
                        style={{ background: `${theme2.color}22`, border: `1px solid ${theme2.color}44`, color: theme2.color, fontSize: '6px' }}
                      >
                        {t('dungeon_boss')}
                      </div>
                    )}
                  </div>
                  <div className="neon-text" style={{ color: '#334155', fontSize: '6px' }}>
                    {enemy.element} · {t('boss_weak')}: {enemy.weakness}
                  </div>
                </div>
                <div className="text-right">
                  <div className="neon-text" style={{ color: '#4ade80', fontSize: '7px' }}>{t('battle_hp')} {enemy.maxHP}</div>
                  <div className="neon-text" style={{ color: '#f87171', fontSize: '7px' }}>{t('battle_atk')} {enemy.atk}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reward teaser */}
        <div
          className="rounded-sm p-3 mb-5 text-center"
          style={{ background: 'rgba(250,204,21,0.06)', border: '1px solid rgba(250,204,21,0.2)' }}
        >
          <div className="neon-text flex items-center gap-1.5 justify-center" style={{ color: '#facc15', fontSize: '8px', letterSpacing: '2px' }}>
            <GameIcon name="chest" size={12} color="#facc15" /> {t('dungeon_reward')}
          </div>
          <div className="neon-text mt-1" style={{ color: '#475569', fontSize: '6px' }}>
            {t('dungeon_reward_sub')}
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full py-4 rounded-sm pixel-btn neon-text"
          style={{
            background: 'linear-gradient(135deg, rgba(192,132,252,0.2), rgba(192,132,252,0.06))',
            border: '2px solid #c084fc',
            color: '#c084fc',
            boxShadow: '0 0 28px rgba(192,132,252,0.3)',
            fontSize: '12px',
            letterSpacing: '4px',
          }}
        >
          {t('dungeon_enter')}
        </button>
      </div>
    </div>
  );
}

// ─── MAIN DUNGEON RUN ─────────────────────────────────────────────────────────
export default function DungeonRun({
  muscleXP, statUpgrades = {}, equippedAura, equippedClothing = {},
  equippedItems = {}, playerLevel, todayMuscles = [],
  finalBoss, onLootEarned, onComplete, onClose,
  purchasedSkills = [], classBonuses = {}, skillTreeStats = {},
}) {
  const t = useT();
  const dungeonSeed = Math.floor(Date.now() / 60000); // changes every minute for variety

  const enemies = useMemo(
    () => generateDungeonEnemies(playerLevel, finalBoss, dungeonSeed),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dungeonSeed]
  );

  const [phase, setPhase] = useState('lobby'); // lobby → fighting → wave_banner → chest → done
  const [enemyIdx, setEnemyIdx] = useState(0);
  const [chestItems, setChestItems] = useState([]);
  const [equippedInSession, setEquippedInSession] = useState({ ...equippedItems });

  const currentEnemy = enemies[enemyIdx];
  const isBossFight  = currentEnemy?.isBoss;
  const isLastMob    = !isBossFight && enemies[enemyIdx + 1]?.isBoss;

  function getWaveLabel(idx) {
    const enemy = enemies[idx];
    if (!enemy) return '';
    if (enemy.isBoss) return `${t('dungeon_boss')} ${t('battle_fight')}!`;
    return `${t('dungeon_wave')} ${enemy.waveIdx + 1} ${t('dungeon_cleared')}`;
  }

  function getNextLabel(idx) {
    const next = enemies[idx + 1];
    if (!next) return t('dungeon_loot');
    if (next.isBoss) return `${t('dungeon_boss')} ${t('battle_fight')}`;
    // Check if next enemy is in a new wave
    const curr = enemies[idx];
    if (next.waveIdx !== curr.waveIdx) return `${t('dungeon_wave')} ${next.waveIdx + 1}`;
    return next.name.toUpperCase();
  }

  // Check whether we should show a wave banner between enemies
  function shouldShowBanner(justFinishedIdx) {
    const finished = enemies[justFinishedIdx];
    const next = enemies[justFinishedIdx + 1];
    if (!next) return false; // last enemy, no banner
    // Show banner when wave ends (next is in a new wave or is the boss)
    if (next.isBoss) return true;
    if (next.waveIdx !== finished.waveIdx) return true;
    return false;
  }

  function handleMobVictory() {
    if (shouldShowBanner(enemyIdx)) {
      setPhase('wave_banner');
    } else {
      setEnemyIdx(i => i + 1);
    }
  }

  function handleBossVictory() {
    const loot = generateChestLoot(dungeonSeed + enemyIdx);
    setChestItems(loot);
    setPhase('chest');
  }

  function handleVictory() {
    if (isBossFight) handleBossVictory();
    else handleMobVictory();
  }

  function handleDefeat() {
    // On defeat: close dungeon, no loot
    onComplete(false);
  }

  function handleBannerContinue() {
    setEnemyIdx(i => i + 1);
    setPhase('fighting');
  }

  function handleEquipLoot(item) {
    onLootEarned(item);
    setEquippedInSession(prev => ({ ...prev, [item.slot]: item }));
  }

  if (phase === 'lobby') {
    return (
      <DungeonLobby
        enemies={enemies}
        onStart={() => setPhase('fighting')}
        onClose={onClose}
      />
    );
  }

  if (phase === 'wave_banner') {
    return (
      <WaveBanner
        waveLabel={getWaveLabel(enemyIdx)}
        nextLabel={getNextLabel(enemyIdx)}
        onContinue={handleBannerContinue}
      />
    );
  }

  if (phase === 'fighting' && currentEnemy) {
    return (
      <BattleArena
        key={enemyIdx}
        boss={currentEnemy}
        muscleXP={muscleXP}
        playerLevel={playerLevel}
        todayMuscles={todayMuscles}
        statUpgrades={statUpgrades}
        equippedItems={equippedInSession}
        equippedAura={equippedAura}
        equippedClothing={equippedClothing}
        purchasedSkills={purchasedSkills}
        classBonuses={classBonuses}
        skillTreeStats={skillTreeStats}
        isTraining={false}
        onVictory={handleVictory}
        onDefeat={handleDefeat}
        onClose={() => onComplete(false)}
      />
    );
  }

  if (phase === 'chest') {
    return (
      <LootChest
        items={chestItems}
        equippedItems={equippedInSession}
        onEquip={handleEquipLoot}
        onDone={() => onComplete(true)}
      />
    );
  }

  return null;
}
