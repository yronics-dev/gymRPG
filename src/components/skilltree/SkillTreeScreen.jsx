import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SKILL_TREES, getNodeById } from '../../data/skilltrees';
import ConstellationMap from './ConstellationMap';
import SkillTreeTabs from './SkillTreeTabs';

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ text, color, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)',
      zIndex: 200,
      background: '#0d1628', border: `1px solid ${color}88`,
      borderRadius: 10, padding: '9px 18px',
      fontFamily: 'Courier New', fontSize: 11, fontWeight: 700,
      color, letterSpacing: 1.5,
      boxShadow: `0 0 20px ${color}55`,
      animation: 'skt-toast 0.3s ease-out',
      whiteSpace: 'nowrap',
    }}>
      {text}
    </div>
  );
}

// ── Info panel (slides up from bottom) ───────────────────────────────────────
function InfoPanel({ nodeId, tree, getNodeState, canUnlock, stp, onUnlock, onClose }) {
  const hit = getNodeById(nodeId);
  if (!hit) return null;
  const { node } = hit;
  const state     = getNodeState(nodeId);
  const affordable = canUnlock(nodeId);
  const isUnlocked = state === 'unlocked';
  const isAvail    = state === 'available';

  const prereqNames = node.requires.map(r => {
    const h = getNodeById(r);
    return h ? h.node.name : r;
  });

  const stateLabel =
    isUnlocked ? 'UNLOCKED'   :
    isAvail    ? 'AVAILABLE'  : 'LOCKED';
  const stateColor =
    isUnlocked ? tree.glowColor :
    isAvail    ? tree.color     : '#475569';

  return (
    <>
      {/* Backdrop tap to dismiss */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 110 }}
      />

      {/* Panel */}
      <div style={{
        position: 'fixed', bottom: 56, left: 0, right: 0, zIndex: 120,
        background: '#0a111f',
        border: `1px solid ${tree.color}55`,
        borderTop: `2px solid ${tree.color}`,
        borderRadius: '18px 18px 0 0',
        padding: '18px 20px 24px',
        animation: 'skt-panel-up 0.22s ease-out',
        boxShadow: `0 -8px 40px ${tree.color}22`,
      }}>
        {/* Drag handle */}
        <div style={{
          width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)',
          margin: '-6px auto 14px',
        }}/>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{
                fontSize: 7, fontFamily: 'Courier New', letterSpacing: 2,
                color: stateColor,
                background: `${stateColor}18`,
                border: `1px solid ${stateColor}44`,
                borderRadius: 4, padding: '2px 7px',
              }}>{stateLabel}</span>
              {node.tier === 5 && (
                <span style={{
                  fontSize: 7, fontFamily: 'Courier New', letterSpacing: 2,
                  color: '#ffd700', background: 'rgba(255,215,0,0.12)',
                  border: '1px solid rgba(255,215,0,0.4)',
                  borderRadius: 4, padding: '2px 7px',
                }}>✦ ABILITY</span>
              )}
            </div>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#e2e8f0', fontFamily: 'Courier New' }}>
              {node.name}
            </div>
          </div>
          <button onClick={onClose}
            style={{ color: '#475569', fontSize: 18, padding: 4, lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer' }}>
            ✕
          </button>
        </div>

        {/* Description */}
        <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.55, margin: '0 0 16px' }}>
          {node.desc}
        </p>

        {/* Cost / status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontFamily: 'Courier New', color: '#475569' }}>
            COST:{' '}
            <span style={{ color: isUnlocked ? '#4ade80' : tree.color, fontWeight: 700 }}>
              {node.cost} STP
            </span>
          </div>
          <div style={{ fontSize: 11, fontFamily: 'Courier New', color: '#475569' }}>
            YOUR STP:{' '}
            <span style={{ color: '#facc15', fontWeight: 700 }}>{stp}</span>
          </div>
        </div>

        {/* Action area */}
        {isUnlocked && (
          <div style={{
            textAlign: 'center', padding: '12px 0',
            fontSize: 11, fontFamily: 'Courier New', color: '#4ade80', letterSpacing: 2,
          }}>
            ✓ SKILL UNLOCKED
          </div>
        )}

        {isAvail && affordable && (
          <button onClick={() => onUnlock(nodeId)}
            style={{
              width: '100%', padding: '14px 0',
              background: `linear-gradient(135deg, ${tree.color}33, ${tree.color}11)`,
              border: `2px solid ${tree.color}`,
              borderRadius: 10,
              color: tree.glowColor, fontFamily: 'Courier New',
              fontSize: 12, fontWeight: 700, letterSpacing: 3,
              cursor: 'pointer',
              boxShadow: `0 0 20px ${tree.color}44`,
            }}>
            UNLOCK  —  {node.cost} STP
          </button>
        )}

        {isAvail && !affordable && (
          <div style={{
            textAlign: 'center', padding: '13px 0',
            fontSize: 11, fontFamily: 'Courier New',
            color: '#ef4444', letterSpacing: 1,
          }}>
            NEED {node.cost - stp} MORE STP
          </div>
        )}

        {state === 'locked' && (
          <div style={{
            textAlign: 'center', padding: '13px 0',
            fontSize: 11, fontFamily: 'Courier New',
            color: '#475569', letterSpacing: 1,
          }}>
            {prereqNames.length > 0
              ? `UNLOCK "${prereqNames[0]}" FIRST`
              : 'LOCKED'}
          </div>
        )}
      </div>
    </>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function SkillTreeScreen({ stp, unlockedSkills, getNodeState, canUnlock, unlock }) {
  const [activeTreeId, setActiveTreeId] = useState('warrior');
  const [selectedNode, setSelectedNode] = useState(null);
  const [justUnlocked, setJustUnlocked] = useState(null);
  const [toast, setToast] = useState(null);
  const [mapKey, setMapKey] = useState(0); // force re-render on tab switch for fade

  const activeTree = SKILL_TREES.find(t => t.id === activeTreeId);

  // Inject panel animation keyframe once
  useEffect(() => {
    const id = 'skt-panel-styles';
    if (document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id;
    el.textContent = `
      @keyframes skt-panel-up {
        from { transform: translateY(60px); opacity: 0; }
        to   { transform: translateY(0);    opacity: 1; }
      }
      @keyframes skt-toast {
        from { transform: translateX(-50%) translateY(-16px); opacity: 0; }
        to   { transform: translateX(-50%) translateY(0);     opacity: 1; }
      }
    `;
    document.head.appendChild(el);
  }, []);

  function handleTabChange(id) {
    setActiveTreeId(id);
    setSelectedNode(null);
    setMapKey(k => k + 1); // trigger fade-in animation
  }

  function handleNodeClick(nodeId) {
    setSelectedNode(prev => prev === nodeId ? null : nodeId);
  }

  function handleUnlock(nodeId) {
    const hit = getNodeById(nodeId);
    if (!hit) return;
    const success = unlock(nodeId);
    if (!success) return;
    setJustUnlocked(nodeId);
    setSelectedNode(null);
    const isAbility = hit.node.tier === 5;
    setToast({
      text: isAbility ? `✦ ABILITY UNLOCKED: ${hit.node.name}!` : `✓ ${hit.node.name} UNLOCKED!`,
      color: isAbility ? '#ffd700' : activeTree.glowColor,
    });
    setTimeout(() => setJustUnlocked(null), 500);
  }

  // Count unlocked nodes for this tree
  const unlockedCount = activeTree.nodes.filter(n => unlockedSkills.includes(n.id)).length;

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      background: '#06040f', minHeight: 0, position: 'relative', overflow: 'hidden',
    }}>

      {/* ── Header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '44px 16px 10px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>✦</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#e2e8f0', fontFamily: 'Courier New', letterSpacing: 1 }}>
              SKILL TREE
            </div>
            <div style={{ fontSize: 8, color: '#334155', fontFamily: 'Courier New', letterSpacing: 2, marginTop: 1 }}>
              {unlockedCount}/{activeTree.nodes.length} UNLOCKED IN {activeTree.label.toUpperCase()}
            </div>
          </div>
        </div>
        {/* STP balance */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.3)',
          borderRadius: 8, padding: '6px 12px',
        }}>
          <span style={{ fontSize: 13 }}>✦</span>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#facc15', fontFamily: 'Courier New', lineHeight: 1 }}>
              {stp}
            </div>
            <div style={{ fontSize: 7, color: '#92750a', fontFamily: 'Courier New', letterSpacing: 1 }}>STP</div>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <SkillTreeTabs activeId={activeTreeId} onChange={handleTabChange}/>

      {/* ── Tree legend strip ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 14px 4px', flexShrink: 0,
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: activeTree.color, boxShadow: `0 0 6px ${activeTree.glowColor}` }}/>
        <span style={{ fontSize: 8, color: activeTree.color, fontFamily: 'Courier New', letterSpacing: 2 }}>
          {activeTree.label.toUpperCase()} PATH
        </span>
        <div style={{ flex: 1, height: 1, background: `${activeTree.color}33` }}/>
        <span style={{ fontSize: 8, color: '#334155', fontFamily: 'Courier New' }}>
          TAP A STAR TO INSPECT
        </span>
      </div>

      {/* ── Constellation Map ── */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        <ConstellationMap
          key={mapKey}
          tree={activeTree}
          getNodeState={getNodeState}
          justUnlocked={justUnlocked}
          onNodeClick={handleNodeClick}
        />
      </div>

      {/* ── Info panel ── */}
      {selectedNode && (
        <InfoPanel
          nodeId={selectedNode}
          tree={activeTree}
          getNodeState={getNodeState}
          canUnlock={canUnlock}
          stp={stp}
          onUnlock={handleUnlock}
          onClose={() => setSelectedNode(null)}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <Toast
          text={toast.text}
          color={toast.color}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  );
}
