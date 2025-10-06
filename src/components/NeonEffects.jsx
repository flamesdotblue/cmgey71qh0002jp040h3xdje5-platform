import React from 'react';

export default function NeonEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <StyleDefs />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1 md:w-1.5 h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/70 to-white/0 blur-[1px] opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] animate-road" />
      </div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-[-30%] h-[30%] w-px bg-gradient-to-b from-cyan-400/80 via-fuchsia-400/60 to-transparent blur-[1px] opacity-70"
          style={{
            left: `${i % 2 === 0 ? 20 + i * 8 : 60 + (i - 1) * 6}%`,
            animation: `sweep 1.8s ${i * 0.18}s linear infinite`,
            filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.8))',
          }}
        />
      ))}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`bill-${i}`]
          className="absolute w-40 md:w-64 h-24 md:h-36 border border-cyan-300/40 rounded-md"
          style={{
            right: i % 2 ? `${10 + i * 8}%` : 'auto',
            left: i % 2 ? 'auto' : `${8 + i * 10}%`,
            top: `${20 + i * 18}%`,
            background: 'linear-gradient(135deg, rgba(147,51,234,0.18), rgba(59,130,246,0.18))',
            boxShadow:
              '0 0 24px rgba(147,51,234,0.35), inset 0 0 24px rgba(59,130,246,0.25), 0 0 60px rgba(37,99,235,0.25)',
            animation: `holo 2.8s ${i * 0.6}s ease-in-out infinite`,
          }}
        >
          <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient( to bottom, rgba(255,255,255,0.06) 0 2px, transparent 2px 6px )' }} />
        </div>
      ))}
      <div className="absolute bottom-[18%] left-[24%] w-1/3 h-1 opacity-70" style={{ animation: 'trail 1.2s linear infinite' }}>
        <div className="h-full w-full bg-gradient-to-r from-fuchsia-400/0 via-fuchsia-400 to-fuchsia-400/0 blur-sm" />
      </div>
      <div className="absolute bottom-[22%] right-[24%] w-1/3 h-1 opacity-70" style={{ animation: 'trail 1.2s 0.3s linear infinite' }}>
        <div className="h-full w-full bg-gradient-to-l from-cyan-400/0 via-cyan-400 to-cyan-400/0 blur-sm" />
      </div>
      <div className="absolute bottom-[12%] left-1/2 -translate-x-[58%] w-[30%] h-1 rotate-[2deg]">
        <div className="h-full w-full bg-gradient-to-r from-rose-500/0 via-rose-500 to-rose-500/0 blur-[3px] opacity-80" style={{ animation: 'tire 0.6s ease-in-out infinite' }} />
      </div>
      <div className="absolute bottom-[14%] left-1/2 -translate-x-[2%] w-[30%] h-1 -rotate-[2deg]">
        <div className="h-full w-full bg-gradient-to-r from-sky-400/0 via-sky-400 to-sky-400/0 blur-[3px] opacity-80" style={{ animation: 'tire 0.6s 0.2s ease-in-out infinite' }} />
      </div>
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={`spark-${i}`]
          className="absolute block w-1 h-0.5"
          style={{
            left: `calc(50% + ${(i % 2 ? -1 : 1) * (20 + (i % 5) * 6)}px)`,
            bottom: `${12 + (i % 3) * 2}%`,
            background: i % 2 ? 'linear-gradient(90deg, rgba(244,63,94,1), transparent)' : 'linear-gradient(90deg, rgba(56,189,248,1), transparent)',
            filter: 'drop-shadow(0 0 6px rgba(147,51,234,0.7))',
            transform: `rotate(${i % 2 ? -25 : 25}deg)`,
            animation: `spark 0.7s ${i * 0.05}s ease-out infinite`,
            opacity: 0.9,
          }}
        />
      ))}
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
      @keyframes road {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
      }
      .animate-road { animation: road 0.4s linear infinite; }
      @keyframes holo {
        0%,100% { filter: drop-shadow(0 0 10px rgba(59,130,246,0.5)); opacity: 0.9; }
        45% { filter: drop-shadow(0 0 18px rgba(147,51,234,0.8)); opacity: 1; }
        50% { opacity: 0.7; }
        55% { opacity: 1; }
        70% { filter: drop-shadow(0 0 22px rgba(59,130,246,0.9)); }
      }
      @keyframes trail {
        0% { transform: translateX(-10%); opacity: 0; }
        10% { opacity: 0.8; }
        100% { transform: translateX(110%); opacity: 0; }
      }
      @keyframes tire {
        0%,100% { opacity: 0.65; }
        50% { opacity: 0.95; }
      }
      @keyframes spark {
        0% { transform: translate(0,0) rotate(var(--r, 0deg)); opacity: 1; }
        100% { transform: translate(40px,-20px) rotate(var(--r, 0deg)); opacity: 0; }
      }
    `}</style>
  );
}
