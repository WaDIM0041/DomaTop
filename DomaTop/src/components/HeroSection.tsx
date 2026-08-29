"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [loaded, setLoaded] = useState(false);

  // 3D rotating wireframe house / particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let rafId: number;
    let mouseX = W / 2;
    let mouseY = H / 2;
    let time = 0;

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // ── 3D geometry helpers ────────────────────────────────────────
    type Vec3 = [number, number, number];

    const rotY = (p: Vec3, a: number): Vec3 => [
      p[0] * Math.cos(a) + p[2] * Math.sin(a),
      p[1],
      -p[0] * Math.sin(a) + p[2] * Math.cos(a),
    ];
    const rotX = (p: Vec3, a: number): Vec3 => [
      p[0],
      p[1] * Math.cos(a) - p[2] * Math.sin(a),
      p[1] * Math.sin(a) + p[2] * Math.cos(a),
    ];
    const project = (p: Vec3, fov: number): [number, number, number] => {
      const z = p[2] + fov;
      if (z <= 0) return [0, 0, 0];
      const scale = fov / z;
      return [p[0] * scale + W / 2, p[1] * scale + H / 2, scale];
    };

    // House wireframe vertices
    const BASE: Vec3[] = [
      [-120, 60, -120], [120, 60, -120], [120, 60, 120], [-120, 60, 120],
      [-120, -60, -120], [120, -60, -120], [120, -60, 120], [-120, -60, 120],
      // Roof peak points
      [0, -130, -120], [0, -130, 120],
    ];

    // Edges: base box
    const EDGES: [number, number][] = [
      [0, 1], [1, 2], [2, 3], [3, 0], // top face
      [4, 5], [5, 6], [6, 7], [7, 4], // bottom face
      [0, 4], [1, 5], [2, 6], [3, 7], // verticals
      // Roof
      [4, 8], [5, 8], [7, 9], [6, 9], // roof edges front/back
      [8, 9], // roof ridge
      [0, 8], [1, 8], [2, 9], [3, 9], // roof to top
    ];

    // Floating particles around the house
    interface FParticle {
      angle: number;
      radius: number;
      yOff: number;
      speed: number;
      size: number;
      opacity: number;
    }
    const fparticles: FParticle[] = Array.from({ length: 80 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 150 + Math.random() * 200,
      yOff: (Math.random() - 0.5) * 300,
      speed: (Math.random() - 0.5) * 0.008,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      time += 0.008;

      // Mouse influence
      const mx = (mouseX / W - 0.5) * 0.5;
      const my = (mouseY / H - 0.5) * 0.3;

      const rotY_ = time * 0.4 + mx;
      const rotX_ = my * 0.5;

      // ── Draw house wireframe ────────────────────────────────────
      const FOV = 500;
      const HOUSE_SCALE = 0.9;

      const transformed = BASE.map((v) => {
        let p: Vec3 = [v[0] * HOUSE_SCALE, v[1] * HOUSE_SCALE, v[2] * HOUSE_SCALE];
        p = rotX(p, rotX_);
        p = rotY(p, rotY_);
        p[1] += Math.sin(time * 0.6) * 12; // gentle float
        return p;
      });

      EDGES.forEach(([a, b]) => {
        const pa = project(transformed[a], FOV);
        const pb = project(transformed[b], FOV);
        if (!pa[2] || !pb[2]) return;

        const avgScale = (pa[2] + pb[2]) / 2;
        const alpha = Math.min(0.7, avgScale * 0.8);

        ctx.beginPath();
        ctx.moveTo(pa[0], pa[1]);
        ctx.lineTo(pb[0], pb[1]);

        const grad = ctx.createLinearGradient(pa[0], pa[1], pb[0], pb[1]);
        grad.addColorStop(0, `rgba(200, 164, 90, ${alpha})`);
        grad.addColorStop(0.5, `rgba(245, 220, 160, ${alpha * 0.9})`);
        grad.addColorStop(1, `rgba(200, 164, 90, ${alpha})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "rgba(200, 164, 90, 0.4)";
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // ── Vertex dots ────────────────────────────────────────────
      transformed.forEach((v) => {
        const p = project(v, FOV);
        if (!p[2]) return;
        ctx.beginPath();
        ctx.arc(p[0], p[1], 3 * p[2], 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 190, 130, ${p[2] * 0.8})`;
        ctx.shadowColor = "rgba(200, 164, 90, 0.8)";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // ── Orbital particles ──────────────────────────────────────
      fparticles.forEach((fp) => {
        fp.angle += fp.speed;
        const px = Math.cos(fp.angle) * fp.radius + W / 2;
        const py = fp.yOff + H / 2 + Math.sin(fp.angle * 0.5) * 30;

        ctx.beginPath();
        ctx.arc(px, py, fp.size, 0, Math.PI * 2);
        const pulse = 0.5 + 0.5 * Math.sin(time * 2 + fp.angle * 3);
        ctx.fillStyle = `rgba(200, 164, 90, ${fp.opacity * pulse})`;
        ctx.fill();
      });

      // ── Connection lines between nearby particles ──────────────
      for (let i = 0; i < fparticles.length; i++) {
        const a = fparticles[i];
        const ax = Math.cos(a.angle) * a.radius + W / 2;
        const ay = a.yOff + H / 2 + Math.sin(a.angle * 0.5) * 30;
        for (let j = i + 1; j < fparticles.length; j++) {
          const b = fparticles[j];
          const bx = Math.cos(b.angle) * b.radius + W / 2;
          const by = b.yOff + H / 2 + Math.sin(b.angle * 0.5) * 30;
          const dist = Math.hypot(ax - bx, ay - by);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(200, 164, 90, ${(1 - dist / 80) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  // Text reveal animation
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Parallax scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const content = heroRef.current.querySelector(".hero-content") as HTMLElement;
      if (content) content.style.transform = `translateY(${scrollY * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = ["дома,", "в\u00A0которых", "хочется\u00A0жить"];

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#050505",
      }}
    >
      {/* Photo background with heavy overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('https://images.pexels.com/photos/8134821/pexels-photo-8134821.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.12,
        }}
      />

      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          right: "10%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(200,164,90,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(200,164,90,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,164,90,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Diagonal line decorations */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: "30%",
          width: "1px",
          height: "100%",
          background: "linear-gradient(to bottom, transparent, rgba(200,164,90,0.12) 30%, rgba(200,164,90,0.12) 70%, transparent)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        className="hero-content"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "140px 48px 80px",
          position: "relative",
          zIndex: 3,
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
        }}
      >
        <div>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "36px",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                background: "var(--color-accent)",
                borderRadius: "50%",
                boxShadow: "0 0 12px rgba(200,164,90,0.8)",
                animation: "pulseDot 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
              }}
            >
              Строительство домов · С 1992 года
            </span>
          </div>

          {/* Main title — word by word reveal */}
          <h1
            ref={titleRef}
            style={{
              fontFamily: "'Playfair Display', serif",
              lineHeight: 1.05,
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "clamp(16px, 2.5vw, 28px)",
                fontWeight: 400,
                color: "rgba(245,240,232,0.5)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "8px",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
              }}
            >
              Строим
            </span>

            {words.map((word, i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  fontSize: "clamp(52px, 7.5vw, 100px)",
                  fontWeight: 700,
                  color: i === 1 ? "transparent" : "#f5f0e8",
                  WebkitTextStroke: i === 1 ? "1.5px rgba(200,164,90,0.7)" : "none",
                  letterSpacing: "-0.03em",
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0) skewY(0)" : "translateY(60px) skewY(3deg)",
                  transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + i * 0.12}s`,
                  overflow: "hidden",
                }}
              >
                {i === 2 ? (
                  <span className="gold-text">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>

          {/* Sub */}
          <p
            style={{
              fontSize: "clamp(15px, 1.6vw, 18px)",
              color: "rgba(245, 240, 232, 0.55)",
              lineHeight: 1.8,
              maxWidth: "460px",
              marginBottom: "48px",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.7s",
            }}
          >
            Одно- и двухэтажные дома под ключ.{" "}
            <strong style={{ color: "#f5f0e8" }}>500+ реализованных проектов</strong>,
            которые вы можете увидеть своими глазами.
            Гарантия 5 лет.
          </p>

          {/* CTA */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.85s",
            }}
          >
            <a
              href="https://zodkam.ru/typeprojects/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{ fontSize: "13px" }}
            >
              <span>Смотреть проекты</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="btn-outline"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ fontSize: "13px" }}
            >
              Приехать в офис
            </a>
          </div>
        </div>

        {/* Right side — stats cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateX(0)" : "translateX(60px)",
            transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
          }}
          className="hero-stats-col"
        >
          {[
            { num: "30+", label: "Лет на рынке", sub: "С 1992 года по сей день", icon: "🏆" },
            { num: "500+", label: "Домов сдано", sub: "Реализованных проектов", icon: "🏠" },
            { num: "5 лет", label: "Гарантия", sub: "На все работы и материалы", icon: "🛡️" },
            { num: "3000+", label: "м² в год", sub: "Введённой жилой площади", icon: "📐" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "20px 24px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(200,164,90,0.12)",
                backdropFilter: "blur(10px)",
                transition: "all 0.4s ease",
                position: "relative",
                overflow: "hidden",
              }}
              className="hero-stat-card"
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "3px",
                  height: "100%",
                  background: "linear-gradient(to bottom, var(--color-accent), transparent)",
                }}
              />
              <div style={{ fontSize: "28px", flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div
                  style={{
                    fontSize: "clamp(22px, 2.5vw, 30px)",
                    fontWeight: 900,
                    color: "var(--color-accent)",
                    fontFamily: "'Playfair Display', serif",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#f5f0e8", marginTop: "2px" }}>
                  {s.label}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(245,240,232,0.35)", marginTop: "1px" }}>
                  {s.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.5s",
        }}
      >
        <span
          style={{
            fontSize: "9px",
            color: "rgba(245,240,232,0.3)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: "1px",
            height: "60px",
            background: "linear-gradient(to bottom, rgba(200,164,90,0.6), transparent)",
            animation: "scrollPulse 2.5s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); box-shadow: 0 0 12px rgba(200,164,90,0.8); }
          50% { transform: scale(1.5); box-shadow: 0 0 24px rgba(200,164,90,1); }
        }
        @keyframes scrollPulse {
          0% { opacity: 0; transform: scaleY(0); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); }
          100% { opacity: 0; transform: scaleY(0); transform-origin: bottom; }
        }
        .hero-stat-card:hover {
          background: rgba(200,164,90,0.06) !important;
          border-color: rgba(200,164,90,0.35) !important;
          transform: translateX(6px);
        }
        @media (max-width: 900px) {
          .hero-content { grid-template-columns: 1fr !important; gap: 40px !important; padding: 120px 24px 60px !important; }
          .hero-stats-col { flex-direction: row !important; flex-wrap: wrap !important; }
          .hero-stat-card { min-width: calc(50% - 8px); }
        }
        @media (max-width: 500px) {
          .hero-stat-card { min-width: 100%; }
        }
      `}</style>
    </section>
  );
}
