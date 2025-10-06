import React from 'react';

export default function HUDOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute top-6 left-6 select-none">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-wider text-white/90 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]">
          NEON VELOCITY
        </h1>
        <p className="text-xs md:text-sm text-white/60">Cyberpunk Night Racing UI</p>
      </div>
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/70 to-transparent" />
    </div>
  );
}
