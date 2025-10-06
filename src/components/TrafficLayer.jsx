import React, { useMemo } from 'react';

// Futuristic traffic layer: stylized 3D-like cars with neon glows moving toward the camera
export default function TrafficLayer() {
  const cars = useMemo(() => {
    // Define multiple cars with lanes and color themes
    // Lanes are relative X positions as percentages across the screen
    const lanes = [30, 40, 50, 60, 70];
    const palettes = [
      { body: '#22d3ee', glow: 'rgba(34,211,238,0.8)' }, // cyan
      { body: '#f43f5e', glow: 'rgba(244,63,94,0.8)' },  // red
      { body: '#a78bfa', glow: 'rgba(167,139,250,0.8)' }, // purple
      { body: '#f59e0b', glow: 'rgba(245,158,11,0.8)' }, // amber
      { body: '#34d399', glow: 'rgba(52,211,153,0.8)' }, // emerald
      { body: '#60a5fa', glow: 'rgba(96,165,250,0.85)' }, // sky
      { body: '#fb7185', glow: 'rgba(251,113,133,0.85)' }, // rose
    ];

    const list = [];
    for (let i = 0; i < 12; i++) {
      const lane = lanes[i % lanes.length] + (i % 2 ? 3 : -2);
      const theme = palettes[i % palettes.length];
      const duration = 6 + (i % 5) * 0.8 + Math.random() * 0.8; // 6s - ~9.8s
      const delay = -(i * 0.9 + Math.random() * 1.4); // negative delay to desync
      const scale = 0.7 + (i % 4) * 0.08; // subtle size variation
      list.push({ id: `car-${i}`, lane, theme, duration, delay, scale });
    }
    return list;
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <StyleDefs />
      {cars.map((car, idx) => (
        <Car key={car.id} lane={car.lane} theme={car.theme} duration={car.duration} delay={car.delay} zIndex={10 + idx} scale={car.scale} />
      ))}
    </div>
  );
}

function Car({ lane = 50, theme, duration = 7.2, delay = 0, zIndex = 10, scale = 1 }) {
  const sizeClamp = `clamp(42px, 5.5vw, 80px)`; // responsive body length
  return (
    <div
      className="absolute top-[-20%]"
      style={{
        left: `${lane}%`,
        zIndex,
        animation: `trafficMove ${duration}s ${delay}s linear infinite`,
        transform: `translateX(-50%)`,
      }}
    >
      {/* Light trail */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-[6%] rounded-full blur-[12px] opacity-70"
        style={{
          width: `calc(${sizeClamp} * 0.7)`,
          height: `calc(${sizeClamp} * 1.6)`,
          background: `radial-gradient(50% 60% at 50% 40%, ${theme.glow}, rgba(0,0,0,0) 70%)`,
          filter: `drop-shadow(0 0 16px ${theme.glow})`,
          transform: `scale(${scale})`
        }}
      />

      {/* Car body (capsule) */}
      <div
        className="relative left-1/2 -translate-x-1/2 will-change-transform"
        style={{ width: `calc(${sizeClamp} * 0.55)`, height: `calc(${sizeClamp})`, transform: `scale(${scale})` }}
      >
        <div
          className="absolute inset-0 rounded-[20px]"
          style={{
            background: `linear-gradient(135deg, ${theme.body}, #0ea5e9)`,
            boxShadow: `0 0 18px ${theme.glow}, inset 0 0 18px ${theme.glow}`,
            transform: 'perspective(600px) rotateX(35deg)',
          }}
        />
        {/* Accents */}
        <div className="absolute inset-x-[10%] top-[10%] h-[16%] rounded-md" style={{ background: 'rgba(255,255,255,0.12)' }} />
        <div className="absolute inset-x-[6%] bottom-[14%] h-[8%] rounded-md" style={{ background: 'rgba(0,0,0,0.25)' }} />
        {/* Headlights */}
        <div className="absolute left-[18%] top-[6%] w-[18%] h-[10%] rounded-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
        <div className="absolute right-[18%] top-[6%] w-[18%] h-[10%] rounded-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
      </div>

      {/* Wheel glow sparks */}
      <div className="absolute left-[15%] bottom-[-6%] w-4 h-[2px] rotate-[18deg]" style={{ background: `linear-gradient(90deg, ${theme.body}, transparent)` }} />
      <div className="absolute right-[15%] bottom-[-6%] w-4 h-[2px] -rotate-[18deg]" style={{ background: `linear-gradient(90deg, ${theme.body}, transparent)` }} />
    </div>
  );
}

function StyleDefs() {
  return (
    <style>{`
      @keyframes trafficMove {
        0% { transform: translate(-50%, -20%) scale(0.7); opacity: 0.6; }
        10% { opacity: 0.9; }
        100% { transform: translate(-50%, 130%) scale(1.25); opacity: 0.0; }
      }
    `}</style>
  );
}
