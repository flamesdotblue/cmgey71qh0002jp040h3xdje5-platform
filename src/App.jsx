import React, { useCallback, useState } from 'react';
import BackgroundSkyline from './components/BackgroundSkyline';
import EffectsLayer from './components/EffectsLayer';
import GameCanvas from './components/GameCanvas';
import HUDOverlay from './components/HUDOverlay';

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const handleStart = useCallback(() => {
    setScore(0);
    setGameOver(false);
    setRunning(true);
  }, []);

  const handleGameOver = useCallback(() => {
    setRunning(false);
    setGameOver(true);
  }, []);

  const handleRestart = useCallback(() => {
    setScore(0);
    setGameOver(false);
    setRunning(true);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden">
      <div className="relative h-screen w-full">
        <BackgroundSkyline />
        <GameCanvas
          running={running}
          onScore={setScore}
          onGameOver={handleGameOver}
          resetSignal={running && !gameOver ? Date.now() : null}
        />
        <EffectsLayer />
        <HUDOverlay
          running={running}
          gameOver={gameOver}
          score={score}
          onStart={handleStart}
          onRestart={handleRestart}
        />
      </div>
    </div>
  );
}
