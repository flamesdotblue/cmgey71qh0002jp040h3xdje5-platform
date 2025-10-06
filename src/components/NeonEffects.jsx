import React from 'react';

export default function NeonEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <StyleDefs />
      {/* Center road marking for speed */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1 md:w-1.5 h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/70 to-white/0 blur-[1px] opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] animate-road" />
      </div>

      {/* Street light pillars sweeping past */}
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

      {/* Light trails (lanes) */}
      <div className="absolute bottom-[18%] left-[24%] w-1/3 h-1 opacity-70" style={{ animation: 'trail 1.2s linear infinite' }}>
        <div className="h-full w-full bg-gradient-to-r from-fuchsia-400/0 via-fuchsia-400 to-fuchsia-400/0 blur-sm" />
      </div>
      <div className="absolute bottom-[22%] right-[24%] w-1/3 h-1 opacity-70" style={{ animation: 'trail 1.2s 0.3s linear infinite' }}>
        <div className="h-full w-full bg-gradient-to-l from-cyan-400/0 via-cyan-400 to-cyan-400/0 blur-sm" />
      </div>

      {/* Tire glow trails behind two cars (red & blue) */}
      <div className="absolute bottom-[12%] left-1/2 -translate-x-[58%] w-[30%] h-1 rotate-[2deg]">
        <div className="h-full w-full bg-gradient-to-r from-rose-500/0 via-rose-500 to-rose-500/0 blur-[3px] opacity-80" style={{ animation: 'tire 0.6s ease-in-out infinite' }} />
      </div>
      <div className="absolute bottom-[14%] left-1/2 -translate-x-[2%] w-[30%] h-1 -rotate-[2deg]">
        <div className="h-full w-full bg-gradient-to-r from-sky-400/0 via-sky-400 to-sky-400/0 blur-[3px] opacity-80" style={{ animation: 'tire 0.6s 0.2s ease-in-out infinite' }} />
      </div>

      {/* Sparks near rear wheels */}
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={`spark-${i}`}
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

      {/* Vignette */}
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
      @keyframes road {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
      }
      .animate-road { animation: road 0.4s linear infinite; }
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
