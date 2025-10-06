import React, { useEffect, useMemo, useState } from 'react';

export default function HUDOverlay() {
  const [speed, setSpeed] = useState(318);
  const [rpm, setRpm] = useState(7200);
  const [nitro, setNitro] = useState(68);
  const [blueLead, setBlueLead] = useState(true);

  useEffect(() => {
    let raf;
    let t0 = performance.now();
    const tick = (t) => {
      const dt = (t - t0) / 1000;
      t0 = t;
      setSpeed((s) => 290 + Math.abs(Math.sin(t / 450)) * 80);
      setRpm((r) => 6000 + Math.abs(Math.sin(t / 300)) * 2200);
      setNitro((n) => 40 + (Math.sin(t / 700) * 0.5 + 0.5) * 60);
      if (Math.floor(t / 2000) % 6 === 0) setBlueLead(true);
      if (Math.floor(t / 2000) % 6 === 3) setBlueLead(false);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const speedInt = useMemo(() => Math.round(speed), [speed]);
  const rpmInt = useMemo(() => Math.round(rpm), [rpm]);
  const nitroInt = useMemo(() => Math.round(nitro), [nitro]);

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Cinematic HUD bottom center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] md:w-[70%] max-w-5xl">
        <div className="relative grid grid-cols-3 gap-4 items-end">
          {/* Left block: Red car stats */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-rose-300/20 shadow-[0_0_40px_rgba(244,63,94,0.15)]">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-widest text-white/60">Red</span>
              <span className="text-[10px] tracking-wider text-white/40">Racer</span>
            </div>
            <div className="mt-1 text-3xl font-semibold text-rose-300 drop-shadow-[0_0_16px_rgba(244,63,94,0.45)]">{speedInt - 6} km/h</div>
            <div className="mt-1 text-xs text-white/60">RPM {rpmInt - 300}</div>
            <div className="mt-2 h-1.5 rounded-full bg-rose-500/20 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-rose-400 via-rose-500 to-pink-500" style={{ width: `${Math.min(100, nitroInt - 10)}%`, boxShadow: '0 0 18px rgba(244,63,94,0.6)' }} />
            </div>
          </div>

          {/* Center block: speedometer */}
          <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-cyan-300/20 text-center shadow-[0_0_60px_rgba(59,130,246,0.20)] overflow-hidden">
            <div className="absolute inset-0 -z-[0]" aria-hidden>
              <div className="absolute inset-0 bg-[conic-gradient(from_180deg,rgba(56,189,248,0.15),rgba(147,51,234,0.2),rgba(56,189,248,0.15))] blur-2xl" />
            </div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/60">Speed</div>
            <div className="mt-1 md:mt-2 text-5xl md:text-7xl font-bold tracking-tight text-white">
              <span className="text-sky-300 drop-shadow-[0_0_24px_rgba(56,189,248,0.65)]">{speedInt}</span>
              <span className="text-xl md:text-2xl ml-2 text-white/60">km/h</span>
            </div>
            <div className="mt-2 flex items-center justify-center gap-3 text-xs text-white/60">
              <span>RPM</span>
              <span className="text-cyan-300/90">{rpmInt}</span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline">Gear</span>
              <span className="hidden md:inline text-fuchsia-300/90">6</span>
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-gradient-to-r from-fuchsia-500/20 via-indigo-500/20 to-sky-500/20 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-sky-400" style={{ width: `${nitroInt}%`, boxShadow: '0 0 24px rgba(99,102,241,0.6)' }} />
            </div>
          </div>

          {/* Right block: Blue car stats */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-sky-300/20 shadow-[0_0_40px_rgba(56,189,248,0.15)]">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-widest text-white/60">Blue</span>
              <span className="text-[10px] tracking-wider text-white/40">Rival</span>
            </div>
            <div className="mt-1 text-3xl font-semibold text-sky-300 drop-shadow-[0_0_16px_rgba(56,189,248,0.45)]">{speedInt + 4} km/h</div>
            <div className="mt-1 text-xs text-white/60">RPM {rpmInt + 220}</div>
            <div className="mt-2 h-1.5 rounded-full bg-sky-500/20 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400" style={{ width: `${Math.min(100, nitroInt + 10)}%`, boxShadow: '0 0 18px rgba(56,189,248,0.6)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Head-up positioning banner */}
      <div className="absolute top-6 right-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10 shadow-[0_0_30px_rgba(147,51,234,0.25)]">
          <div className="text-[10px] uppercase tracking-[0.25em] text-white/60">Position</div>
          <div className="mt-1 flex items-center gap-2">
            <span className={`text-sm font-semibold ${blueLead ? 'text-sky-300' : 'text-rose-300'}`}>{blueLead ? 'Blue' : 'Red'}</span>
            <span className="text-white/50 text-xs">leads</span>
          </div>
        </div>
      </div>

      {/* Cinematic letterbox bars for drama */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/70 to-transparent" />
    </div>
  );
}
