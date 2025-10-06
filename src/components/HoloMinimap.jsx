import React, { useEffect, useRef } from 'react';

export default function HoloMinimap() {
  const pathRef = useRef(null);

  useEffect(() => {
    // decorative only
  }, []);

  return (
    <div className="pointer-events-none absolute top-6 right-6">
      <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl border border-cyan-300/30 bg-white/5 backdrop-blur-sm overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.25)]">
        <StyleDefs />
        {/* Neon grid */}
        <div className="absolute inset-0 opacity-40" aria-hidden>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(transparent 95%, rgba(59,130,246,0.35) 95%), linear-gradient(90deg, transparent 95%, rgba(147,51,234,0.35) 95%)', backgroundSize: '20px 20px' }} />
        </div>
        {/* Track ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[78%] h-[78%] rounded-full border-2 border-fuchsia-400/50 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
            <div ref={pathRef} className="absolute inset-0 rounded-full animate-spin-slow" style={{ animation: 'spin 8s linear infinite' }}>
              {/* Blue car dot */}
              <span className="absolute left-1/2 -translate-x-1/2 -top-1.5 w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.9)]" />
              {/* Red car dot */}
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_14px_rgba(244,63,94,0.9)]" style={{ animation: 'spin 8s -2.2s linear infinite' }} />
            </div>
          </div>
        </div>
        {/* Legends */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] tracking-wider">
          <div className="flex items-center gap-1 text-white/70"><span className="inline-block w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.7)]" /> Red</div>
          <div className="flex items-center gap-1 text-white/70"><span className="inline-block w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.7)]" /> Blue</div>
        </div>
      </div>
    </div>
  );
}

function StyleDefs() {
  return (
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
    `}</style>
  );
}
