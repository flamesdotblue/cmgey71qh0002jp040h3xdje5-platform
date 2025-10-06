import React, { useEffect, useRef } from 'react';

// Simple arcade endless racer on a canvas with neon styling and light trails
// Responsibilities: draw game, handle input, spawn AI cars, detect collisions, report score

export default function GameCanvas({ running, onScore, onGameOver, resetSignal }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const stateRef = useRef(null);
  const inputRef = useRef({ left: false, right: false, touchX: null, touching: false });
  const lastResetRef = useRef(null);

  // Initialize or reset game state
  const init = () => {
    const c = canvasRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = c.clientWidth * dpr;
    const height = c.clientHeight * dpr;
    c.width = width;
    c.height = height;

    const roadBounds = {
      left: Math.floor(width * 0.18),
      right: Math.floor(width * 0.82),
      top: 0,
      bottom: height,
      width: Math.floor(width * 0.64),
    };

    // Base game state
    stateRef.current = {
      width,
      height,
      dpr,
      road: roadBounds,
      t: 0,
      lastSpawn: 0,
      spawnInterval: 700, // ms
      speed: 540, // world px/sec base scroll
      player: {
        x: (roadBounds.left + roadBounds.right) / 2,
        y: height * 0.78,
        w: Math.max(28 * dpr, width * 0.03),
        h: Math.max(52 * dpr, height * 0.08),
        vx: 0,
        maxVx: Math.max(350, width * 0.4),
        color: { body: '#4cc9f0', glow: 'rgba(56,189,248,0.65)' },
      },
      aiCars: [],
      score: 0,
      gameOver: false,
      linesOffset: 0,
    };
  };

  // Resize handling
  useEffect(() => {
    if (!canvasRef.current) return;
    const ro = new ResizeObserver(() => {
      init();
    });
    ro.observe(canvasRef.current);
    init();
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset on start/restart
  useEffect(() => {
    if (!resetSignal || lastResetRef.current === resetSignal) return;
    lastResetRef.current = resetSignal;
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSignal]);

  // Input handlers (keyboard + touch)
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') inputRef.current.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') inputRef.current.right = true;
    };
    const onKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') inputRef.current.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') inputRef.current.right = false;
    };

    const onTouchStart = (e) => {
      inputRef.current.touching = true;
      inputRef.current.touchX = e.touches[0].clientX;
    };
    const onTouchMove = (e) => {
      if (!inputRef.current.touching) return;
      inputRef.current.touchX = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
      inputRef.current.touching = false;
      inputRef.current.touchX = null;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // Main loop
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');

    let prev = performance.now();

    const drawCar = (ctx, x, y, w, h, bodyColor, glowColor, isPlayer) => {
      // Glow trail
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const grad = ctx.createLinearGradient(x, y - h * 0.6, x, y + h);
      grad.addColorStop(0, 'rgba(147,51,234,0)');
      grad.addColorStop(0.5, glowColor);
      grad.addColorStop(1, 'rgba(56,189,248,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x - w * 0.55, y - h * 0.1, w * 1.1, h * 1.4, 8);
      ctx.fill();
      ctx.restore();

      // Body
      ctx.save();
      ctx.shadowBlur = 18;
      ctx.shadowColor = glowColor;
      const bodyGrad = ctx.createLinearGradient(x - w / 2, y - h / 2, x + w / 2, y + h / 2);
      bodyGrad.addColorStop(0, bodyColor);
      bodyGrad.addColorStop(1, isPlayer ? '#a78bfa' : '#f472b6');
      ctx.fillStyle = bodyGrad;
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 2;
      // Futuristic capsule shape
      ctx.beginPath();
      ctx.moveTo(x, y - h * 0.55);
      ctx.bezierCurveTo(x + w * 0.55, y - h * 0.65, x + w * 0.65, y + h * 0.2, x, y + h * 0.55);
      ctx.bezierCurveTo(x - w * 0.65, y + h * 0.2, x - w * 0.55, y - h * 0.65, x, y - h * 0.55);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Headlights
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = 'rgba(250,250,255,0.9)';
      ctx.beginPath();
      ctx.ellipse(x - w * 0.22, y - h * 0.42, w * 0.09, h * 0.06, 0, 0, Math.PI * 2);
      ctx.ellipse(x + w * 0.22, y - h * 0.42, w * 0.09, h * 0.06, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawRoad = (s) => {
      const { width, height, road } = s;
      // Motion fade to create subtle trails
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillRect(0, 0, width, height);

      // Background gradient night sky overlay
      const sky = ctx.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, 'rgba(17,24,39,0.25)');
      sky.addColorStop(1, 'rgba(2,6,23,0.55)');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);

      // Neon road area
      const roadGrad = ctx.createLinearGradient(road.left, 0, road.right, 0);
      roadGrad.addColorStop(0, 'rgba(139,92,246,0.15)');
      roadGrad.addColorStop(0.5, 'rgba(24,24,27,0.85)');
      roadGrad.addColorStop(1, 'rgba(56,189,248,0.15)');
      ctx.fillStyle = roadGrad;
      ctx.fillRect(road.left, 0, road.width, height);

      // Road edge glow
      ctx.save();
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(147,51,234,0.8)';
      ctx.fillStyle = 'rgba(147,51,234,0.35)';
      ctx.fillRect(road.left - 3, 0, 3, height);
      ctx.shadowColor = 'rgba(56,189,248,0.8)';
      ctx.fillStyle = 'rgba(56,189,248,0.35)';
      ctx.fillRect(road.right, 0, 3, height);
      ctx.restore();

      // Center dashed line animating
      const dashW = Math.max(6 * s.dpr, road.width * 0.006);
      const dashH = Math.max(26 * s.dpr, height * 0.04);
      s.linesOffset += 10 * s.dpr;
      const centerX = (road.left + road.right) / 2 - dashW / 2;
      for (let y = -dashH + (s.linesOffset % (dashH * 2)); y < height; y += dashH * 2) {
        ctx.fillStyle = 'rgba(255,255,255,0.65)';
        ctx.fillRect(centerX, y, dashW, dashH);
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.shadowColor = 'rgba(99,102,241,0.8)';
        ctx.shadowBlur = 12;
        ctx.fillStyle = 'rgba(147,51,234,0.25)';
        ctx.fillRect(centerX, y, dashW, dashH);
        ctx.restore();
      }

      // Holographic billboards flashes (faint rectangles at edges)
      const billH = height * 0.12;
      const billW = road.width * 0.18;
      const billY = (Math.sin(s.t / 800) * 0.5 + 0.5) * (height * 0.2) + height * 0.12;
      ctx.save();
      ctx.globalAlpha = 0.25 + 0.25 * Math.sin(s.t / 500);
      ctx.fillStyle = 'rgba(59,130,246,0.25)';
      ctx.fillRect(road.left - billW - 18, billY, billW, billH);
      ctx.fillStyle = 'rgba(168,85,247,0.25)';
      ctx.fillRect(road.right + 18, billY * 0.8, billW, billH * 1.2);
      ctx.restore();
    };

    const spawnAi = (s) => {
      const now = s.t;
      if (now - s.lastSpawn < s.spawnInterval) return;
      s.lastSpawn = now;
      // random x inside road
      const laneMargin = s.road.width * 0.08;
      const x = s.road.left + laneMargin + Math.random() * (s.road.width - laneMargin * 2);
      const minW = Math.max(26 * s.dpr, s.width * 0.025);
      const maxW = Math.max(40 * s.dpr, s.width * 0.04);
      const w = minW + Math.random() * (maxW - minW);
      const h = w * 1.9;
      const speed = s.speed * (0.8 + Math.random() * 0.6);
      const huePick = Math.random() < 0.5;
      const body = huePick ? '#f43f5e' : '#22d3ee';
      const glow = huePick ? 'rgba(244,63,94,0.6)' : 'rgba(34,211,238,0.6)';
      s.aiCars.push({ x, y: -h, w, h, speed, body, glow });
      // Slightly speed up spawns over time
      s.spawnInterval = Math.max(380, s.spawnInterval - 2);
    };

    const collide = (a, b) => {
      const padA = 0.12; // shrink hitbox for fairness
      const padB = 0.1;
      const ax1 = a.x - a.w * 0.5 + a.w * padA;
      const ax2 = a.x + a.w * 0.5 - a.w * padA;
      const ay1 = a.y - a.h * 0.5 + a.h * padA;
      const ay2 = a.y + a.h * 0.5 - a.h * padA;
      const bx1 = b.x - b.w * 0.5 + b.w * padB;
      const bx2 = b.x + b.w * 0.5 - b.w * padB;
      const by1 = b.y - b.h * 0.5 + b.h * padB;
      const by2 = b.y + b.h * 0.5 - b.h * padB;
      return ax1 < bx2 && ax2 > bx1 && ay1 < by2 && ay2 > by1;
    };

    const step = (now) => {
      const s = stateRef.current;
      if (!s) return;
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      s.t = now;

      // Draw background road
      drawRoad(s);

      if (!running || s.gameOver) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      const { player, road } = s;

      // Handle input -> horizontal velocity
      const steer = (inputRef.current.left ? -1 : 0) + (inputRef.current.right ? 1 : 0);
      const steerAccel = player.maxVx * 3; // snappy
      player.vx += steer * steerAccel * dt;
      // Touch steering towards touchX
      if (inputRef.current.touching && inputRef.current.touchX != null) {
        const target = inputRef.current.touchX * s.dpr;
        const diff = target - player.x;
        player.vx += Math.max(-player.maxVx * 3, Math.min(player.maxVx * 3, diff)) * dt * 1.6;
      }
      // Friction
      player.vx *= 0.9;
      // Clamp
      player.vx = Math.max(-player.maxVx, Math.min(player.maxVx, player.vx));
      player.x += player.vx * dt;
      // Stay on road
      const minX = road.left + player.w * 0.6;
      const maxX = road.right - player.w * 0.6;
      if (player.x < minX) { player.x = minX; player.vx = 0; }
      if (player.x > maxX) { player.x = maxX; player.vx = 0; }

      // Update AI cars
      const scroll = s.speed * dt;
      for (let i = s.aiCars.length - 1; i >= 0; i--) {
        const car = s.aiCars[i];
        car.y += scroll * (car.speed / s.speed);
        // Draw car
        drawCar(ctx, car.x, car.y, car.w, car.h, car.body, car.glow, false);
        // Remove off-screen
        if (car.y - car.h > s.height) s.aiCars.splice(i, 1);
      }

      // Draw player
      drawCar(ctx, player.x, player.y, player.w, player.h, '#60a5fa', 'rgba(56,189,248,0.75)', true);

      // Spawn AI
      spawnAi(s);

      // Collision detection
      for (let i = 0; i < s.aiCars.length; i++) {
        const car = s.aiCars[i];
        const pBox = { x: player.x, y: player.y, w: player.w, h: player.h };
        const aBox = { x: car.x, y: car.y, w: car.w, h: car.h };
        if (collide(pBox, aBox)) {
          s.gameOver = true;
          onGameOver && onGameOver();
          break;
        }
      }

      // Score increases with time and slight bonus from speed
      s.score += (s.speed * 0.08) * dt;
      onScore && onScore(Math.floor(s.score));

      rafRef.current = requestAnimationFrame(step);
    };

    // Kickoff loop
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
