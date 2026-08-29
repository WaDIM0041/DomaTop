"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let rafId: number;
    let width = 0;
    let height = 0;

    const COLORS = [
      "rgba(200, 164, 90",
      "rgba(224, 190, 130",
      "rgba(245, 220, 160",
      "rgba(180, 140, 70",
    ];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const createParticle = (x: number, y: number, fromMouse = false): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = fromMouse ? Math.random() * 2 + 0.5 : Math.random() * 0.8 + 0.2;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (fromMouse ? 0 : 0.5),
        size: fromMouse ? Math.random() * 3 + 1 : Math.random() * 2 + 0.5,
        opacity: fromMouse ? Math.random() * 0.8 + 0.2 : Math.random() * 0.5 + 0.1,
        color,
        life: 0,
        maxLife: fromMouse ? Math.random() * 80 + 40 : Math.random() * 200 + 100,
      };
    };

    // Spawn ambient particles across canvas
    for (let i = 0; i < 60; i++) {
      const p = createParticle(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      );
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    let mouseSpawnTimer = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseSpawnTimer++;
      if (mouseSpawnTimer % 2 === 0) {
        for (let i = 0; i < 3; i++) {
          particles.push(createParticle(mouseX, mouseY, true));
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Ambient particle respawn
      if (Math.random() < 0.3 && particles.length < 120) {
        particles.push(createParticle(Math.random() * width, height + 10));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Slight drift
        p.vx += (Math.random() - 0.5) * 0.05;
        p.vy -= 0.01; // gentle upward drift for ambient

        const lifeRatio = p.life / p.maxLife;
        const currentOpacity = p.opacity * (1 - lifeRatio);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}, ${currentOpacity})`;
        ctx.fill();

        // Remove dead particles
        if (p.life >= p.maxLife || p.y < -20 || p.x < -20 || p.x > width + 20) {
          particles.splice(i, 1);
          // Respawn ambient particle
          if (particles.length < 60) {
            const rp = createParticle(Math.random() * width, height + 10);
            rp.life = 0;
            particles.push(rp);
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.6,
      }}
    />
  );
}
