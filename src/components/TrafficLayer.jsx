import React, { useMemo } from 'react';

// Multiple stylized 3D-like traffic cars moving toward the camera with varied colors
export default function TrafficLayer() {
  const cars = useMemo(() => {
    const lanes = [26, 34, 42, 50, 58, 66, 74]; // percentage across screen
    const palettes = [
      { body: '#22d3ee', glow: 'rgba(34,211,238,0.85)' },
      { body: '#f43f5e', glow: 'rgba(244,63,94,0.85)' },
      { body: '#a78bfa', glow: 'rgba(167,139,250,0.85)' },
      { body: '#f59e0b', glow: 'rgba(245,158,11,0.85)' },
      { body: '#34d399', glow: 'rgba(52,211,153,0.85)' },
      { body: '#60a5fa', glow: 'rgba(96,165,250,0.9)' },
      { body: '#fb7185', glow: 'rgba(251,113,133,0.9)' },
    ];

    // Create many cars with staggered delays so multiple are visible at once.
    const list = [];
    const COUNT = 28;
    for (let i = 0; i < COUNT; i++) {
      const lane = lanes[i % lanes.length] + (i % 2 ? 2 : -2);
      const theme = palettes[i % palettes.length];
      const duration = 7.5 + (i % 5) * 0.7 + Math.random() * 0.9; // 7.5s - ~11s
      const delay = -((i * 0.7) + Math.random() * 6.0); // negative to phase across timeline
      const scale = 0.72 + (i % 4) * 0.09; // size variety
      const skew = (i % 3) - 1; // -1,0,1 for slight lane drift illusion
      list.push({ id: `car-${i}`, lane, theme, duration, delay, scale, skew });
    }
    return list;
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <style>{`
        @keyframes trafficMove {
          0% { transform: translate(-50%, -25%) scale(0.7); opacity: 0.0; }
          10% { opacity: 0.9; }
          100% { transform: translate(-50%, 130%) scale(1.3); opacity: 0.0; }
        }
        .carWrap { will-change: transform, opacity; }
      `}</style>
      {cars.map((car, idx) => (
        <Car key={car.id} lane={car.lane} theme={car.theme} duration={car.duration} delay={car.delay} zIndex={20 + idx} scale={car.scale} skew={car.skew} />
      ))}
    </div>
  );
}

function Car({ lane = 50, theme, duration = 8, delay = 0, zIndex = 10, scale = 1, skew = 0 }) {
  const sizeClamp = 'clamp(44px, 5.6vw, 86px)';
  const tilt = skew * 2; // small yaw
  return (
    <div
      className="carWrap absolute top-[-20%]"
      style={{
        left: `${lane}%`,
        zIndex,
        animation: `trafficMove ${duration}s ${delay}s linear infinite`,
        transform: `translateX(-50%)`,
      }}
    >
      {/* Trail */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-[6%] rounded-full blur-[14px] opacity-70"
        style={{
          width: `calc(${sizeClamp} * 0.7)`,
          height: `calc(${sizeClamp} * 1.7)`,
          background: `radial-gradient(50% 60% at 50% 40%, ${theme.glow}, rgba(0,0,0,0) 70%)`,
          filter: `drop-shadow(0 0 18px ${theme.glow})`,
          transform: `scale(${scale})`,
        }}
      />

      {/* Body */}
      <div
        className="relative left-1/2 -translate-x-1/2"
        style={{ width: `calc(${sizeClamp} * 0.58)`, height: sizeClamp, transform: `scale(${scale}) perspective(700px) rotateX(32deg) rotateZ(${tilt}deg)` }}
      >
        <div
          className="absolute inset-0 rounded-[22px]"
          style={{
            background: `linear-gradient(135deg, ${theme.body}, #0ea5e9)`,
            boxShadow: `0 0 18px ${theme.glow}, inset 0 0 18px ${theme.glow}`,
          }}
        />
        <div className="absolute inset-x-[10%] top-[10%] h-[16%] rounded-md" style={{ background: 'rgba(255,255,255,0.12)' }} />
        <div className="absolute inset-x-[6%] bottom-[14%] h-[8%] rounded-md" style={{ background: 'rgba(0,0,0,0.25)' }} />
        <div className="absolute left-[18%] top-[6%] w-[18%] h-[10%] rounded-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
        <div className="absolute right-[18%] top-[6%] w-[18%] h-[10%] rounded-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
      </div>

      {/* Wheel sparks */}
      <div className="absolute left-[14%] bottom-[-6%] w-5 h-[2px] rotate-[18deg]" style={{ background: `linear-gradient(90deg, ${theme.body}, transparent)` }} />
      <div className="absolute right-[14%] bottom-[-6%] w-5 h-[2px] -rotate-[18deg]" style={{ background: `linear-gradient(90deg, ${theme.body}, transparent)` }} />
    </div>
  );
}
