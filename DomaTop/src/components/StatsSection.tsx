"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 30, suffix: "+", label: "Лет на рынке", desc: "С 1992 года — одна из старейших компаний Камчатки", accent: true },
  { value: 500, suffix: "+", label: "Домов построено", desc: "Реализованных проектов, открытых для визита" },
  { value: 5, suffix: " лет", label: "Гарантия", desc: "На все выполненные работы без исключений" },
  { value: 3000, suffix: "+", label: "м² в год", desc: "Жилой площади вводим ежегодно в эксплуатацию" },
];

function GlitchCounter({
  value,
  suffix,
  accent,
}: {
  value: number;
  suffix: string;
  accent?: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          // Glitch effect
          setGlitch(true);
          setTimeout(() => setGlitch(false), 600);

          const duration = 2200;
          const fps = 60;
          const steps = (duration / 1000) * fps;
          let frame = 0;

          const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

          const timer = setInterval(() => {
            frame++;
            const t = frame / steps;
            const eased = easeOut(Math.min(t, 1));
            setDisplay(Math.round(eased * value));
            if (frame >= steps) {
              clearInterval(timer);
              setDisplay(value);
            }
          }, 1000 / fps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Glitch layers */}
      {glitch && (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              color: "#ff4444",
              fontSize: "inherit",
              fontWeight: "inherit",
              fontFamily: "inherit",
              animation: "glitchR 0.15s steps(1) 3",
              clipPath: "polygon(0 30%, 100% 30%, 100% 50%, 0 50%)",
              opacity: 0.7,
            }}
          >
            {Math.floor(Math.random() * value)}
            {suffix}
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              color: "#44ffff",
              fontSize: "inherit",
              fontWeight: "inherit",
              fontFamily: "inherit",
              animation: "glitchL 0.2s steps(1) 3",
              clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
              opacity: 0.7,
            }}
          >
            {Math.floor(Math.random() * value)}
            {suffix}
          </div>
        </>
      )}
      <span style={{ color: accent ? "#f5f0e8" : "var(--color-accent)" }}>
        {display.toLocaleString("ru")}
        {suffix}
      </span>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll(".reveal-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--color-bg)",
      }}
    >
      {/* Fullwidth image background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('https://images.pexels.com/photos/8961296/pexels-photo-8961296.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1920')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(5,5,5,0.88)" }} />

      {/* Diagonal accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, transparent, var(--color-accent) 30%, var(--color-accent-light) 50%, var(--color-accent) 70%, transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, transparent, var(--color-accent) 30%, var(--color-accent-light) 50%, var(--color-accent) 70%, transparent)",
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "100px 24px",
          position: "relative",
        }}
      >
        {/* Label */}
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="tag-pill">Цифры говорят сами</div>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}
          className="stats-grid-enhanced"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="reveal-up"
              style={{
                transitionDelay: `${i * 0.12}s`,
                padding: "48px 36px",
                textAlign: "center",
                position: "relative",
                borderRight: i < stats.length - 1 ? "1px solid rgba(200,164,90,0.12)" : "none",
              }}
            >
              {/* Highlight first card */}
              {i === 0 && (
                <div style={{ position: "absolute", inset: 0, background: "rgba(200,164,90,0.05)", pointerEvents: "none" }} />
              )}

              <div
                style={{
                  fontSize: "clamp(48px, 6vw, 72px)",
                  fontWeight: 900,
                  fontFamily: "'Playfair Display', serif",
                  lineHeight: 1,
                  marginBottom: "12px",
                  position: "relative",
                }}
              >
                <GlitchCounter value={s.value} suffix={s.suffix} accent={s.accent} />
              </div>

              <div style={{ width: "30px", height: "1px", background: "var(--color-accent)", margin: "0 auto 14px", opacity: 0.6 }} />

              <div style={{ fontSize: "15px", fontWeight: 700, color: "#f5f0e8", marginBottom: "8px" }}>
                {s.label}
              </div>
              <div style={{ fontSize: "13px", color: "rgba(245,240,232,0.38)", lineHeight: 1.6 }}>
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes glitchR {
          0% { transform: translateX(-3px); clip-path: polygon(0 20%, 100% 20%, 100% 35%, 0 35%); }
          33% { transform: translateX(3px); clip-path: polygon(0 50%, 100% 50%, 100% 65%, 0 65%); }
          66% { transform: translateX(-1px); clip-path: polygon(0 75%, 100% 75%, 100% 90%, 0 90%); }
          100% { transform: translateX(0); }
        }
        @keyframes glitchL {
          0% { transform: translateX(3px); clip-path: polygon(0 10%, 100% 10%, 100% 25%, 0 25%); }
          50% { transform: translateX(-3px); clip-path: polygon(0 45%, 100% 45%, 100% 60%, 0 60%); }
          100% { transform: translateX(0); }
        }
        @media (max-width: 768px) {
          .stats-grid-enhanced { grid-template-columns: 1fr 1fr !important; }
          .stats-grid-enhanced > div { border-right: none !important; border-bottom: 1px solid rgba(200,164,90,0.12); }
        }
        @media (max-width: 400px) {
          .stats-grid-enhanced { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
