import React, { useEffect, useMemo, useState } from 'react';

export default function HUDOverlay({ running, gameOver, score, onStart, onRestart }) {
  const [rpm, setRpm] = useState(6800);
  const [nitro, setNitro] = useState(50);
  const [speed, setSpeed] = useState(320);

  useEffect(() => {
    let raf;
    const tick = (t) => {
      setRpm(6000 + Math.abs(Math.sin(t / 250)) * 2500);
      setNitro(30 + (Math.sin(t / 900) * 0.5 + 0.5) * 70);
      setSpeed(290 + Math.abs(Math.sin(t / 400)) * 120);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const rpmInt = useMemo(() => Math.round(rpm), [rpm]);
  const nitroInt = useMemo(() => Math.round(nitro), [nitro]);
  const speedInt = useMemo(() => Math.round(speed), [speed]);

  return (
    <div className="pointer-events-none absolute inset-0 select-none">
      {/* Top-left branding */}
      <div className="absolute top-5 left-6">
        <div className="text-xs uppercase tracking-[0.35em] text-white/60">Neon</div>
        <div className="text-2xl font-semibold tracking-widest text-white drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]">
          Velocity
        </div>
      </div>

      {/* Speed HUD bottom center */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[92%] md:w-[70%] max-w-5xl pointer-events-none">
        <div className="grid grid-cols-3 gap-4 items-end">
          {/* Left card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-rose-300/20 shadow-[0_0_40px_rgba(244,63,94,0.15)]">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-widest text-white/70">RPM</span>
              <span className="text-[10px] tracking-widest text-white/50">Engine</span>
            </div>
            <div className="mt-1 text-3xl font-semibold text-rose-300 drop-shadow-[0_0_16px_rgba(244,63,94,0.45)]">{rpmInt}</div>
            <div className="mt-2 h-1.5 rounded-full bg-rose-500/20 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-rose-400 via-rose-500 to-pink-500" style={{ width: `${Math.min(100, (rpmInt - 3000) / 80)}%`, boxShadow: '0 0 18px rgba(244,63,94,0.6)' }} />
            </div>
          </div>

          {/* Center card */}
          <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-cyan-300/20 text-center shadow-[0_0_60px_rgba(59,130,246,0.20)] overflow-hidden">
            <div className="absolute inset-0 -z-[0]" aria-hidden>
              <div className="absolute inset-0 bg-[conic-gradient(from_180deg,rgba(56,189,248,0.15),rgba(147,51,234,0.25),rgba(56,189,248,0.15))] blur-2xl" />
            </div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/60">Speed</div>
            <div className="mt-1 md:mt-2 text-5xl md:text-7xl font-bold tracking-tight text-white">
              <span className="text-sky-300 drop-shadow-[0_0_24px_rgba(56,189,248,0.65)]">{speedInt}</span>
              <span className="text-xl md:text-2xl ml-2 text-white/70">km/h</span>
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-gradient-to-r from-fuchsia-500/20 via-indigo-500/20 to-sky-500/20 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-sky-400" style={{ width: `${nitroInt}%`, boxShadow: '0 0 24px rgba(99,102,241,0.6)' }} />
            </div>
          </div>

          {/* Right card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-sky-300/20 shadow-[0_0_40px_rgba(56,189,248,0.15)]">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-widest text-white/70">Score</span>
              <span className="text-[10px] tracking-widest text-white/50">Distance</span>
            </div>
            <div className="mt-1 text-3xl font-semibold text-sky-300 drop-shadow-[0_0_16px_rgba(56,189,248,0.45)]">{score}</div>
            <div className="mt-2 text-xs text-white/60">Avoid traffic, rack up points.</div>
          </div>
        </div>
      </div>

      {/* Start overlay */}
      {!running && !gameOver && (
        <div className="pointer-events-auto absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold tracking-wide text-white drop-shadow-[0_0_25px_rgba(147,51,234,0.6)]">Neon Velocity</h1>
            <p className="mt-2 text-white/70">Night-time cyberpunk highway. Dodge oncoming traffic.</p>
            <button
              onClick={onStart}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-sky-500 px-6 py-3 text-white font-semibold shadow-[0_10px_30px_rgba(99,102,241,0.35)] hover:scale-[1.03] active:scale-[0.98] transition-transform"
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      {/* Game Over overlay */}
      {gameOver && (
        <div className="pointer-events-auto absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_60px_rgba(168,85,247,0.3)]">
            <div className="text-sm uppercase tracking-[0.35em] text-white/60">Game Over</div>
            <div className="mt-2 text-4xl font-bold text-white">Score {score}</div>
            <button
              onClick={onRestart}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-sky-500 px-6 py-3 text-white font-semibold shadow-[0_10px_30px_rgba(99,102,241,0.35)] hover:scale-[1.03] active:scale-[0.98] transition-transform"
            >
              Restart
            </button>
          </div>
        </div>
      )}

      {/* Cinematic letterbox bars */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/70 to-transparent" />
    </div>
  );
}
