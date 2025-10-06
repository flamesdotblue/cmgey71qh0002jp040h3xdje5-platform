import React from 'react';
import HeroScene from './components/HeroScene';
import NeonEffects from './components/NeonEffects';
import TrafficLayer from './components/TrafficLayer';
import HUDOverlay from './components/HUDOverlay';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden">
      <div className="relative h-screen w-full">
        <HeroScene />
        <NeonEffects />
        <TrafficLayer />
        <HUDOverlay />
      </div>
    </div>
  );
}
