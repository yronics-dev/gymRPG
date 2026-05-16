import React, { useState, useEffect } from 'react';
import PlayerBase from './sprites/PlayerBase';
import IronScrapsHelmet    from './sprites/armor/IronScrapsHelmet';
import IronScrapsChest     from './sprites/armor/IronScrapsChest';
import IronScrapsBootsLegs from './sprites/armor/IronScrapsBootsLegs';
import ForestRangerHelmet    from './sprites/armor/ForestRangerHelmet';
import ForestRangerChest     from './sprites/armor/ForestRangerChest';
import ForestRangerBootsLegs from './sprites/armor/ForestRangerBootsLegs';
import SteelKnightHelmet    from './sprites/armor/SteelKnightHelmet';
import SteelKnightChest     from './sprites/armor/SteelKnightChest';
import SteelKnightBootsLegs from './sprites/armor/SteelKnightBootsLegs';
import VoidReaperHelmet    from './sprites/armor/VoidReaperHelmet';
import VoidReaperChest     from './sprites/armor/VoidReaperChest';
import VoidReaperBootsLegs from './sprites/armor/VoidReaperBootsLegs';
import SolarTitanHelmet    from './sprites/armor/SolarTitanHelmet';
import SolarTitanChest     from './sprites/armor/SolarTitanChest';
import SolarTitanBootsLegs from './sprites/armor/SolarTitanBootsLegs';
import VampireLord from './sprites/VampireLord';
import ZombieBrute from './sprites/ZombieBrute';
import FireDemon from './sprites/FireDemon';
import IceGolem from './sprites/IceGolem';
import ShadowWraith from './sprites/ShadowWraith';
import ThunderTitan from './sprites/ThunderTitan';
import EarthColossus from './sprites/EarthColossus';

function SpriteCard({ label, children, rageColor = '#cc0000' }) {
  const [rage, setRage] = useState(false);
  return (
    <div style={{
      background: 'rgba(0,0,0,0.4)',
      border: '2px solid #c084fc44',
      borderRadius: 12,
      padding: '40px 52px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20,
      boxShadow: '0 0 40px #c084fc22',
    }}>
      <div style={{ color: '#c084fc', fontSize: 10, letterSpacing: 3 }}>{label}</div>
      {children(rage)}
      <button
        onClick={() => setRage(r => !r)}
        style={{
          background: rage ? `rgba(200,0,0,0.2)` : 'rgba(255,255,255,0.05)',
          border: `1px solid ${rage ? rageColor : '#334155'}`,
          color: rage ? rageColor : '#475569',
          padding: '6px 18px',
          fontFamily: 'Courier New',
          fontSize: 9,
          letterSpacing: 2,
          cursor: 'pointer',
          borderRadius: 4,
        }}
      >
        {rage ? '🔴 RAGE ON' : 'RAGE OFF'}
      </button>
    </div>
  );
}

export default function SpritePreview() {
  useEffect(() => {
    const targets = [document.documentElement, document.body, document.getElementById('root')];
    const prev = targets.map(el => el ? el.style.overflow : '');
    targets.forEach(el => { if (el) el.style.overflow = 'auto'; });
    return () => targets.forEach((el, i) => { if (el) el.style.overflow = prev[i]; });
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 30%, #1a0a2a, #060d1a)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 32,
      padding: 32,
      fontFamily: 'Courier New, monospace',
    }}>
      <div style={{ color: '#c084fc', fontSize: 13, letterSpacing: 4 }}>SPRITE PREVIEW</div>

      {/* Player base tiers */}
      <div style={{ color: '#7af8d0', fontSize: 10, letterSpacing: 3 }}>PLAYER BASE — ALL TIERS</div>
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
        {[1,2,3,4,5].map(tier => (
          <div key={tier} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
            <div style={{ color:'#475569', fontSize:8, letterSpacing:2 }}>TIER {tier}</div>
            <div style={{ background:'rgba(0,0,0,0.4)', border:'1px solid #334155', borderRadius:8, padding:'12px 8px' }}>
              <PlayerBase tier={tier} size={200} />
            </div>
          </div>
        ))}
      </div>

      {/* Iron Scraps armor preview */}
      <div style={{ color: '#888780', fontSize: 10, letterSpacing: 3 }}>SET 1 — IRON SCRAPS</div>
      <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          { label: 'FULL SET',    helm: true,  chest: true,  boots: true  },
          { label: 'HELMET ONLY', helm: true,  chest: false, boots: false },
          { label: 'CHEST ONLY',  helm: false, chest: true,  boots: false },
          { label: 'BOOTS ONLY',  helm: false, chest: false, boots: true  },
        ].map(({ label, helm, chest, boots }) => (
          <div key={label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
            <div style={{ color:'#888780', fontSize:7, letterSpacing:2 }}>{label}</div>
            <div style={{ background:'rgba(0,0,0,0.4)', border:'1px solid #888780', borderRadius:8, padding:'12px 8px', position:'relative' }}>
              <PlayerBase tier={3} size={200} />
              {helm  && <IronScrapsHelmet />}
              {chest && <IronScrapsChest />}
              {boots && <IronScrapsBootsLegs />}
            </div>
          </div>
        ))}
      </div>

      {/* Forest Ranger armor preview */}
      <div style={{ color: '#3B6D11', fontSize: 10, letterSpacing: 3 }}>SET 2 — FOREST RANGER</div>
      <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          { label: 'FULL SET',    helm: true,  chest: true,  boots: true  },
          { label: 'HELMET ONLY', helm: true,  chest: false, boots: false },
          { label: 'CHEST ONLY',  helm: false, chest: true,  boots: false },
          { label: 'BOOTS ONLY',  helm: false, chest: false, boots: true  },
        ].map(({ label, helm, chest, boots }) => (
          <div key={label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
            <div style={{ color:'#3B6D11', fontSize:7, letterSpacing:2 }}>{label}</div>
            <div style={{ background:'rgba(0,0,0,0.4)', border:'1px solid #3B6D11', borderRadius:8, padding:'12px 8px', position:'relative' }}>
              <PlayerBase tier={3} size={200} />
              {helm  && <ForestRangerHelmet />}
              {chest && <ForestRangerChest />}
              {boots && <ForestRangerBootsLegs />}
            </div>
          </div>
        ))}
      </div>

      {/* Steel Knight armor preview */}
      <div style={{ color: '#185FA5', fontSize: 10, letterSpacing: 3 }}>SET 3 — STEEL KNIGHT</div>
      <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          { label: 'FULL SET',    helm: true,  chest: true,  boots: true  },
          { label: 'HELMET ONLY', helm: true,  chest: false, boots: false },
          { label: 'CHEST ONLY',  helm: false, chest: true,  boots: false },
          { label: 'BOOTS ONLY',  helm: false, chest: false, boots: true  },
        ].map(({ label, helm, chest, boots }) => (
          <div key={label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
            <div style={{ color:'#185FA5', fontSize:7, letterSpacing:2 }}>{label}</div>
            <div style={{ background:'rgba(0,0,0,0.4)', border:'1px solid #185FA5', borderRadius:8, padding:'12px 8px', position:'relative' }}>
              <PlayerBase tier={3} size={200} />
              {helm  && <SteelKnightHelmet />}
              {chest && <SteelKnightChest />}
              {boots && <SteelKnightBootsLegs />}
            </div>
          </div>
        ))}
      </div>

      {/* Void Reaper armor preview */}
      <div style={{ color: '#7F77DD', fontSize: 10, letterSpacing: 3 }}>SET 4 — VOID REAPER</div>
      <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          { label: 'FULL SET',    helm: true,  chest: true,  boots: true  },
          { label: 'HELMET ONLY', helm: true,  chest: false, boots: false },
          { label: 'CHEST ONLY',  helm: false, chest: true,  boots: false },
          { label: 'BOOTS ONLY',  helm: false, chest: false, boots: true  },
        ].map(({ label, helm, chest, boots }) => (
          <div key={label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
            <div style={{ color:'#7F77DD', fontSize:7, letterSpacing:2 }}>{label}</div>
            <div style={{ background:'rgba(0,0,0,0.4)', border:'1px solid #7F77DD', borderRadius:8, padding:'12px 8px', position:'relative' }}>
              <PlayerBase tier={3} size={200} />
              {helm  && <VoidReaperHelmet />}
              {chest && <VoidReaperChest />}
              {boots && <VoidReaperBootsLegs />}
            </div>
          </div>
        ))}
      </div>

      {/* Solar Titan armor preview */}
      <div style={{ color: '#c9952a', fontSize: 10, letterSpacing: 3 }}>SET 5 — SOLAR TITAN</div>
      <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          { label: 'FULL SET',    helm: true,  chest: true,  boots: true  },
          { label: 'HELMET ONLY', helm: true,  chest: false, boots: false },
          { label: 'CHEST ONLY',  helm: false, chest: true,  boots: false },
          { label: 'BOOTS ONLY',  helm: false, chest: false, boots: true  },
        ].map(({ label, helm, chest, boots }) => (
          <div key={label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
            <div style={{ color:'#c9952a', fontSize:7, letterSpacing:2 }}>{label}</div>
            <div style={{ background:'rgba(0,0,0,0.4)', border:'1px solid #c9952a', borderRadius:8, padding:'12px 8px', position:'relative' }}>
              <PlayerBase tier={3} size={200} />
              {helm  && <SolarTitanHelmet />}
              {chest && <SolarTitanChest />}
              {boots && <SolarTitanBootsLegs />}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
        <SpriteCard label="VAMPIRE LORD" rageColor="#cc0000">
          {(rage) => <VampireLord size={220} rage={rage} />}
        </SpriteCard>

        <SpriteCard label="ZOMBIE BRUTE" rageColor="#5a8a2a">
          {(rage) => <ZombieBrute size={220} rage={rage} />}
        </SpriteCard>

        <SpriteCard label="FIRE DEMON" rageColor="#ff6600">
          {(rage) => <FireDemon size={220} rage={rage} />}
        </SpriteCard>

        <SpriteCard label="ICE GOLEM" rageColor="#aaddff">
          {(rage) => <IceGolem size={220} rage={rage} />}
        </SpriteCard>

        <SpriteCard label="SHADOW WRAITH" rageColor="#c084fc">
          {(rage) => <ShadowWraith size={220} rage={rage} />}
        </SpriteCard>

        <SpriteCard label="THUNDER TITAN" rageColor="#ffe600">
          {(rage) => <ThunderTitan size={220} rage={rage} />}
        </SpriteCard>

        <SpriteCard label="EARTH COLOSSUS" rageColor="#4caf50">
          {(rage) => <EarthColossus size={220} rage={rage} />}
        </SpriteCard>
      </div>

      <div style={{ color: '#334155', fontSize: 8, letterSpacing: 2 }}>
        IDLE ANIMATIONS RUNNING
      </div>
    </div>
  );
}
