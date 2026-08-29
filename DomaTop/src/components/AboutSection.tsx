"use client";

import { useEffect, useRef } from "react";

const features = [
  { icon: "🏗️", title: "Собственное производство", desc: "Клеёный брус, каркасные панели, фахверк — без посредников, напрямую с производства." },
  { icon: "📐", title: "Проект под вас", desc: "Создадим с нуля или адаптируем готовый под участок, бюджет и ваши пожелания." },
  { icon: "🏠", title: "500+ реальных объектов", desc: "Все проекты реальны — вы можете приехать и посмотреть любой дом из нашей базы." },
  { icon: "🛡️", title: "Гарантия 60 месяцев", desc: "Подписываем договор с фиксированной ценой. 5 лет несём полную ответственность." },
  { icon: "📦", title: "База стройматериалов", desc: "snabzhenie.org — оптово-розничная база напрямую от производителей, без наценок." },
  { icon: "🤝", title: "Личный менеджер", desc: "От первого звонка до ключей — один человек знает ваш проект от и до." },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    sectionRef.current?.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach((el) =>
      observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);

  // Horizontal scroll text on scroll
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = 1 - rect.top / window.innerHeight;
      const inner = el.querySelector(".scroll-text-inner") as HTMLElement;
      if (inner) {
        inner.style.transform = `translateX(${-progress * 120}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ padding: "120px 0", position: "relative", background: "var(--color-bg)", overflow: "hidden" }}
    >
      <div className="grid-decoration" />

      {/* Horizontal scrolling text */}
      <div
        ref={textRef}
        style={{ overflow: "hidden", marginBottom: "80px", opacity: 0.06, userSelect: "none" }}
      >
        <div
          className="scroll-text-inner"
          style={{
            whiteSpace: "nowrap",
            fontSize: "clamp(60px, 10vw, 130px)",
            fontWeight: 900,
            color: "var(--color-accent)",
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "-0.02em",
            transition: "transform 0.1s linear",
          }}
        >
          ЗОДЧИЙ · СТРОИТЕЛЬСТВО · КАЧЕСТВО · НАДЁЖНОСТЬ · ЗОДЧИЙ · СТРОИТЕЛЬСТВО ·
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        {/* Main grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start", marginBottom: "80px" }}
          className="about-main-grid"
        >
          {/* Left */}
          <div className="reveal-left">
            <div className="tag-pill" style={{ marginBottom: "20px" }}>О компании</div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px, 4vw, 58px)",
                fontWeight: 700,
                lineHeight: 1.05,
                color: "#f5f0e8",
                marginBottom: "32px",
              }}
            >
              Более 30 лет
              <br />
              <span className="gold-text">строим дома,</span>
              <br />
              <span style={{ WebkitTextStroke: "1px rgba(245,240,232,0.4)", color: "transparent" }}>
                которые живут
              </span>
            </h2>

            <div style={{ width: "48px", height: "2px", background: "linear-gradient(90deg, var(--color-accent), transparent)", marginBottom: "28px" }} />

            <p style={{ color: "rgba(245,240,232,0.6)", lineHeight: 1.8, fontSize: "16px", marginBottom: "24px" }}>
              С 1992 года мы прошли путь от небольшой бригады до застройщика
              с собственным производством. Наша сила — в открытости:
              все проекты реальны, все объекты открыты для визита.
            </p>
            <p style={{ color: "rgba(245,240,232,0.6)", lineHeight: 1.8, fontSize: "16px", marginBottom: "40px" }}>
              Мы не просто строим — мы создаём пространство, в котором будет
              расти ваша семья. Поэтому подходим к каждому проекту как к своему.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="https://zodkam.ru/about/" target="_blank" rel="noopener noreferrer" className="btn-gold">
                <span>О компании</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="https://zodkam.ru/works/" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Наши работы
              </a>
            </div>
          </div>

          {/* Right — image with tilt */}
          <div className="reveal-right" style={{ position: "relative" }}>
            <div
              style={{ position: "relative", paddingBottom: "130%", overflow: "hidden" }}
              className="about-img-wrap"
            >
              <img
                src="https://images.pexels.com/photos/7031604/pexels-photo-7031604.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700"
                alt="Зодчий — современный дом"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
              {/* Corner accent */}
              <div style={{ position: "absolute", top: 0, left: 0, width: "60px", height: "60px", borderTop: "2px solid var(--color-accent)", borderLeft: "2px solid var(--color-accent)" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "60px", height: "60px", borderBottom: "2px solid var(--color-accent)", borderRight: "2px solid var(--color-accent)" }} />
            </div>

            {/* Floating badge */}
            <div
              style={{
                position: "absolute",
                bottom: "-24px",
                left: "-24px",
                background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-light))",
                color: "#0a0a0a",
                padding: "24px 28px",
                zIndex: 2,
                animation: "floatBadge 4s ease-in-out infinite",
              }}
            >
              <div style={{ fontSize: "38px", fontWeight: 900, lineHeight: 1, fontFamily: "'Playfair Display', serif" }}>500+</div>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "4px" }}>домов сдано</div>
            </div>

            {/* Second badge */}
            <div
              style={{
                position: "absolute",
                top: "24px",
                right: "-24px",
                background: "rgba(10,10,10,0.95)",
                border: "1px solid rgba(200,164,90,0.35)",
                color: "#f5f0e8",
                padding: "16px 20px",
                zIndex: 2,
                backdropFilter: "blur(10px)",
                animation: "floatBadge 4s ease-in-out infinite 1.5s",
              }}
            >
              <div style={{ fontSize: "11px", color: "var(--color-accent)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>Гарантия</div>
              <div style={{ fontSize: "24px", fontWeight: 900, fontFamily: "'Playfair Display', serif" }}>5 лет</div>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}
          className="features-grid-about"
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card reveal-up"
              style={{
                transitionDelay: `${i * 0.08}s`,
                background: "var(--color-bg)",
                padding: "36px",
                position: "relative",
                overflow: "hidden",
                border: "1px solid rgba(200,164,90,0.1)",
                transition: "all 0.4s ease",
              }}
            >
              {/* Hover glow */}
              <div className="card-glow" style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(200,164,90,0.08) 0%, transparent 70%)", opacity: 0, transition: "opacity 0.4s ease" }} />

              <div style={{ fontSize: "36px", marginBottom: "20px", display: "block" }}>{f.icon}</div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#f5f0e8", marginBottom: "12px" }}>{f.title}</h3>
              <p style={{ fontSize: "14px", color: "rgba(245,240,232,0.5)", lineHeight: 1.7 }}>{f.desc}</p>

              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, var(--color-accent), transparent)", transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.4s ease" }} className="card-line" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .feature-card:hover .card-glow { opacity: 1 !important; }
        .feature-card:hover .card-line { transform: scaleX(1) !important; }
        .feature-card:hover { border-color: rgba(200,164,90,0.3) !important; }
        @media (max-width: 900px) {
          .about-main-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .features-grid-about { grid-template-columns: 1fr 1fr !important; }
          .about-img-wrap { padding-bottom: 70% !important; }
        }
        @media (max-width: 500px) {
          .features-grid-about { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
