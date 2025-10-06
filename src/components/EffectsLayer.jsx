import React from 'react';

export default function EffectsLayer() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <StyleDefs />
      {/* Light sweeps to simulate street lights rushing by */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-[-30%] h-[30%] w-px bg-gradient-to-b from-cyan-400/80 via-fuchsia-400/60 to-transparent blur-[1px] opacity-60"
          style={{
            left: `${i % 2 === 0 ? 22 + i * 8 : 60 + (i - 1) * 6}%`,
            animation: `sweep 1.6s ${i * 0.18}s linear infinite`,
            filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.8))',
          }}
        />
      ))}

      {/* Lane light trails */}
      <div className="absolute bottom-[18%] left-[24%] w-1/3 h-1 opacity-70" style={{ animation: 'trail 1.2s linear infinite' }}>
        <div className="h-full w-full bg-gradient-to-r from-fuchsia-400/0 via-fuchsia-400 to-fuchsia-400/0 blur-sm" />
      </div>
      <div className="absolute bottom-[22%] right-[24%] w-1/3 h-1 opacity-70" style={{ animation: 'trail 1.2s 0.3s linear infinite' }}>
        <div className="h-full w-full bg-gradient-to-l from-cyan-400/0 via-cyan-400 to-cyan-400/0 blur-sm" />
      </div>

      {/* Vignette / cinema */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,transparent,rgba(0,0,0,0.45))]" />
    </div>
  );
}

function StyleDefs() {
  return (
    <style>{`
      @keyframes sweep {
        0% { transform: translateY(-10vh) scaleY(0.8); opacity: 0; }
        10% { opacity: 0.8; }
        100% { transform: translateY(120vh) scaleY(1.6); opacity: 0; }
      }
      @keyframes trail {
        0% { transform: translateX(-10%); opacity: 0; }
        10% { opacity: 0.8; }
        100% { transform: translateX(110%); opacity: 0; }
      }
    `}</style>
  );
}
