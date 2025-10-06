import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroScene() {
  return (
    <section className="relative h-full w-full bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/sbnqZNZdJSLK7U2A/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 mix-blend-screen" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/30 via-transparent to-blue-900/40" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_130%,rgba(147,51,234,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_-10%,rgba(59,130,246,0.35),transparent_55%)]" />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="pointer-events-none absolute top-6 left-6 select-none">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-wider text-white/90 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]">
          NEON VELOCITY
        </h1>
        <p className="text-xs md:text-sm text-white/60">Arcade Night Racing</p>
      </div>
    </section>
  );
}
