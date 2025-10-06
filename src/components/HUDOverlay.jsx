import React, { useEffect, useState } from 'react';

export default function HUDOverlay() {
  const [blueLead, setBlueLead] = useState(true);

  useEffect(() => {
    let raf;
    const tick = (t) => {
      if (Math.floor(t / 2000) % 6 === 0) setBlueLead(true);
      if (Math.floor(t / 2000) % 6 === 3) setBlueLead(false);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Branding */}
      <div className="absolute top-6 left-6 select-none">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-wider text-white/90 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]">
          NEON VELOCITY
        </h1>
        <p className="text-xs md:text-sm text-white/60">Arcade Night Racing UI</p>
      </div>

      {/* Position banner (kept) */}
      <div className="absolute top-6 right-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10 shadow-[0_0_30px_rgba(147,51,234,0.25)]">
          <div className="text-[10px] uppercase tracking-[0.25em] text-white/60">Position</div>
          <div className="mt-1 flex items-center gap-2">
            <span className={`text-sm font-semibold ${blueLead ? 'text-sky-300' : 'text-rose-300'}`}>{blueLead ? 'Blue' : 'Red'}</span>
            <span className="text-white/50 text-xs">leads</span>
          </div>
        </div>
      </div>

      {/* Remove bottom stat boxes (red, blue, speed) and keep cinematic bars */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/70 to-transparent" />
    </div>
  );
}
