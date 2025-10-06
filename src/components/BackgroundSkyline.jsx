import React from 'react';

export default function BackgroundSkyline() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <StyleDefs />
      {/* Night gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b1a] via-[#0a0a12] to-[#03040a]" />

      {/* Parallax city layers */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-60">
        {/* Farthest skyline */}
        <CityStrip className="animate-parallax-slow" color="#342766" glow="rgba(99,102,241,0.25)" height={28} gap={36} />
        {/* Mid skyline */}
        <CityStrip className="translate-y-6 animate-parallax-med" color="#3b2c7d" glow="rgba(168,85,247,0.32)" height={42} gap={42} />
        {/* Near skyline */}
        <CityStrip className="translate-y-12 animate-parallax-fast" color="#1e2a5a" glow="rgba(56,189,248,0.32)" height={64} gap={50} />
      </div>

      {/* Holographic billboards */}
      <div className="absolute inset-x-0 top-[14%] flex justify-between px-10">
        <Billboard width={180} height={80} colorA="rgba(147,51,234,0.2)" colorB="rgba(56,189,248,0.2)" delay="0s" />
        <Billboard width={220} height={90} colorA="rgba(56,189,248,0.2)" colorB="rgba(147,51,234,0.2)" delay="1.2s" />
      </div>

      {/* Subtle stars */}
      {Array.from({ length: 60 }).map((_, i) => (
        <span
          key={i}
          className="absolute w-[2px] h-[2px] rounded-full bg-white/60"
          style={{
            left: `${(i * 73) % 100}%`,
            top: `${(i * 37) % 100}%`,
            opacity: 0.15 + ((i % 7) / 10),
            animation: `twinkle 2.6s ${(i % 10) * 0.22}s ease-in-out infinite`,
            filter: 'drop-shadow(0 0 4px rgba(99,102,241,0.8))',
          }}
        />
      ))}

      {/* Road floor reflection gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-fuchsia-500/10 via-sky-500/10 to-transparent" />
    </div>
  );
}

function CityStrip({ className = '', color = '#1b1b3a', glow = 'rgba(147,51,234,0.25)', height = 40, gap = 40 }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 flex items-end gap-4 px-6 ${className}`} style={{ animationDuration: '18s' }}>
      {Array.from({ length: 28 }).map((_, i) => (
        <div
          key={i}
          className="rounded-t"
          style={{
            width: `${20 + (i * 13) % gap}px`,
            height: `${height + ((i * 11) % (height * 1.2))}px`,
            background: color,
            boxShadow: `0 0 12px ${glow}, inset 0 0 24px ${glow}`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
}

function Billboard({ width = 160, height = 80, colorA, colorB, delay = '0s' }) {
  return (
    <div
      className="relative border rounded-md"
      style={{
        width,
        height,
        borderColor: 'rgba(255,255,255,0.18)',
        background: `linear-gradient(135deg, ${colorA}, ${colorB})`,
        boxShadow: '0 0 40px rgba(59,130,246,0.35), inset 0 0 24px rgba(147,51,234,0.35)',
        animation: `holo 2.8s ${delay} ease-in-out infinite`,
      }}
    >
      <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient( to bottom, rgba(255,255,255,0.08) 0 2px, transparent 2px 6px )' }} />
    </div>
  );
}

function StyleDefs() {
  return (
    <style>{`
      @keyframes twinkle { 0%,100% { opacity: 0.2 } 50% { opacity: 0.9 } }
      @keyframes holo {
        0%,100% { filter: drop-shadow(0 0 10px rgba(59,130,246,0.5)); opacity: 0.9; }
        45% { filter: drop-shadow(0 0 18px rgba(147,51,234,0.8)); opacity: 1; }
        50% { opacity: 0.7; }
        55% { opacity: 1; }
        70% { filter: drop-shadow(0 0 22px rgba(59,130,246,0.9)); }
      }
      .animate-parallax-slow { animation: parallax 40s linear infinite; }
      .animate-parallax-med { animation: parallax 26s linear infinite; }
      .animate-parallax-fast { animation: parallax 18s linear infinite; }
      @keyframes parallax { from { transform: translateX(0) } to { transform: translateX(-20%) } }
    `}</style>
  );
}
