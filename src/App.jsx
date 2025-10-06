import React from 'react';
import HeroScene from './components/HeroScene';
import HUDOverlay from './components/HUDOverlay';
import NeonEffects from './components/NeonEffects';
import HoloMinimap from './components/HoloMinimap';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden">
      <div className="relative h-screen w-full">
        <HeroScene />
        <NeonEffects />
        <HUDOverlay />
        <HoloMinimap />
      </div>
    </div>
  );
}
