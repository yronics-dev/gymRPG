import { useState, useCallback, useMemo } from 'react';
import { WEAPONS, getWeaponById } from '../data/weapons';

const STORAGE_KEY_PREFIX = 'gymrpg_weapon_';

/**
 * useWeapons(userPrefix)
 *
 * Manages the player's weapon inventory and equipped weapon.
 * Persisted to localStorage under `${userPrefix}gymrpg_equipped_weapon`
 * and `${userPrefix}gymrpg_owned_weapons`.
 *
 * Returns:
 *   equippedWeapon   — weapon object or null
 *   ownedWeaponIds   — string[]
 *   equipWeapon(id)  — equip a weapon by id (or null to unequip)
 *   ownsWeapon(id)   — boolean
 *   addWeapon(id)    — add to inventory (call from loot / shop)
 *   allWeapons       — full WEAPONS array for shop/display
 *   weaponLootStats  — { atk, atkMult } ready for getPlayerBattleStats equippedItems
 */
export function useWeapons(userPrefix = '') {
  const u = userPrefix;

  const [equippedId, setEquippedId] = useState(() => {
    try { return localStorage.getItem(`${u}gymrpg_equipped_weapon`) || null; }
    catch { return null; }
  });

  const [ownedIds, setOwnedIds] = useState(() => {
    try {
      const raw = localStorage.getItem(`${u}gymrpg_owned_weapons`);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  const equippedWeapon = useMemo(
    () => (equippedId ? getWeaponById(equippedId) : null),
    [equippedId],
  );

  const equipWeapon = useCallback((id) => {
    setEquippedId(id);
    try {
      if (id) localStorage.setItem(`${u}gymrpg_equipped_weapon`, id);
      else     localStorage.removeItem(`${u}gymrpg_equipped_weapon`);
    } catch {}
  }, [u]);

  const addWeapon = useCallback((id) => {
    setOwnedIds(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try { localStorage.setItem(`${u}gymrpg_owned_weapons`, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [u]);

  const ownsWeapon = useCallback((id) => ownedIds.includes(id), [ownedIds]);

  /**
   * weaponLootStats — shaped like an item object for the existing
   * loot-bonus system in getPlayerBattleStats (equippedItems param).
   * The `atkMult` field is NOT part of the standard item shape; it is
   * read separately in BattleArena → calcElementalDamage.
   */
  const weaponLootStats = useMemo(() => {
    if (!equippedWeapon) return null;
    return {
      atk:     equippedWeapon.atk     || 0,
      def:     0,
      hp:      0,
      crit:    0,
      dodge:   0,
      atkMult: equippedWeapon.atkMult || 1.0,
      element: equippedWeapon.element || 'Physical',
      specialEffect: equippedWeapon.specialEffect || null,
      specialChance: equippedWeapon.specialChance || 0,
      // DOT / utility params forwarded directly
      dotPct:    equippedWeapon.dotPct    || 0,
      dotTurns:  equippedWeapon.dotTurns  || 0,
      drainPct:  equippedWeapon.drainPct  || 0,
      healPct:   equippedWeapon.healPct   || 0,
      slowTurns: equippedWeapon.slowTurns || 0,
      stunTurns: equippedWeapon.stunTurns || 0,
    };
  }, [equippedWeapon]);

  return {
    equippedWeapon,
    equippedId,
    ownedWeaponIds: ownedIds,
    equipWeapon,
    addWeapon,
    ownsWeapon,
    allWeapons: WEAPONS,
    weaponLootStats,
  };
}
