"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    num: "01",
    title: "Строительство домов под ключ",
    desc: "Полный цикл от проекта до ключей. Каркасные, монолитные, газобетонные, клеёный брус, фахверк. Точно в срок, с гарантией.",
    link: "https://zodkam.ru",
    highlight: true,
    icon: "🏗️",
  },
  {
    num: "02",
    title: "Индивидуальное проектирование",
    desc: "Технический специалист разработает проект с нуля или адаптирует готовый под участок, бюджет и ваши пожелания.",
    link: "https://zodkam.ru/typeprojects/",
    icon: "📐",
  },
  {
    num: "03",
    title: "База 500+ готовых проектов",
    desc: "Все объекты реальны и открыты для посещения. Выбирайте из типовых — и заезжайте смотреть вживую.",
    link: "https://zodkam.ru/works/",
    icon: "🏠",
  },
  {
    num: "04",
    title: "Поставка стройматериалов",
    desc: "snabzhenie.org — оптово-розничная база напрямую от производителей. Без наценок, доставка по городу бесплатно.",
    link: "https://snabzhenie.org",
    badge: "snabzhenie.org",
    icon: "📦",
  },
  {
    num: "05",
    title: "Земельные участки",
    desc: "Собственные земельные участки для строительства. Подберём оптимальный под ваш проект и бюджет.",
    link: "https://zodkam.ru",
    icon: "🌳",
  },
  {
    num: "06",
    title: "Ипотека и господдержка",
    desc: "Помогаем оформить ипотеку и воспользоваться государственными программами субсидирования строительства.",
    link: "#contact",
    internal: true,
    icon: "💳",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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
      id="services"
      style={{ padding: "120px 0", background: "var(--color-bg)", position: "relative" }}
    >
      <div className="grid-decoration" />

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "80px", flexWrap: "wrap", gap: "32px" }}
        >
          <div className="reveal-up">
            <div className="tag-pill" style={{ marginBottom: "16px" }}>Что мы делаем</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 56px)", fontWeight: 700, color: "#f5f0e8", lineHeight: 1.05 }}>
              Всё для вашего
              <br /><span className="gold-text">будущего дома</span>
            </h2>
          </div>
          <p className="reveal-up" style={{ color: "rgba(245,240,232,0.45)", fontSize: "15px", lineHeight: 1.7, maxWidth: "320px" }}>
            Один звонок — и мы берём на себя всё: от проектирования до ключей и материалов.
          </p>
        </div>

        {/* Services grid — 2 columns */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px" }}
          className="services-grid"
        >
          {services.map((s, i) => (
            <div
              key={i}
              className="reveal-up"
              style={{
                transitionDelay: `${i * 0.07}s`,
                padding: "44px 48px",
                background: hoveredIdx === i
                  ? "rgba(200,164,90,0.06)"
                  : s.highlight
                  ? "rgba(200,164,90,0.05)"
                  : "rgba(255,255,255,0.02)",
                border: `1px solid ${hoveredIdx === i ? "rgba(200,164,90,0.4)" : s.highlight ? "rgba(200,164,90,0.2)" : "rgba(255,255,255,0.04)"}`,
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                position: "relative",
                overflow: "hidden",
                transform: hoveredIdx === i ? "translateY(-3px)" : "translateY(0)",
                boxShadow: hoveredIdx === i ? "0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(200,164,90,0.04)" : "none",
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => {
                if (s.internal) {
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.open(s.link, "_blank", "noopener");
                }
              }}
            >
              {/* Top accent */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: hoveredIdx === i || s.highlight ? "linear-gradient(90deg, var(--color-accent), transparent)" : "transparent", transition: "background 0.4s ease" }} />

              {/* Diagonal number */}
              <div style={{ position: "absolute", top: "16px", right: "24px", fontSize: "64px", fontWeight: 900, fontFamily: "'Playfair Display', serif", color: hoveredIdx === i ? "rgba(200,164,90,0.15)" : "rgba(200,164,90,0.06)", transition: "color 0.4s ease", lineHeight: 1 }}>
                {s.num}
              </div>

              {/* Icon */}
              <div style={{ fontSize: "40px", marginBottom: "24px" }}>{s.icon}</div>

              {/* Badge */}
              {s.badge && (
                <div style={{ marginBottom: "12px" }}>
                  <span className="tag-pill" style={{ background: "rgba(200,164,90,0.15)" }}>
                    {s.badge}
                  </span>
                </div>
              )}

              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#f5f0e8", marginBottom: "12px", lineHeight: 1.3, maxWidth: "85%" }}>
                {s.title}
              </h3>

              <p style={{ fontSize: "14px", color: "rgba(245,240,232,0.5)", lineHeight: 1.7, marginBottom: "24px" }}>
                {s.desc}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: hoveredIdx === i ? "var(--color-accent)" : "rgba(200,164,90,0.3)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.4s ease" }}>
                {s.internal ? "Узнать подробнее" : s.badge ? "Перейти в магазин" : "Подробнее"}
                <svg style={{ transform: hoveredIdx === i ? "translateX(4px)" : "translateX(0)", transition: "transform 0.3s ease" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* snabzhenie.org special block */}
        <div
          className="reveal-up"
          style={{ marginTop: "3px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "40px",
              alignItems: "center",
              padding: "48px 60px",
              background: "linear-gradient(135deg, rgba(200,164,90,0.08) 0%, rgba(200,164,90,0.03) 100%)",
              border: "1px solid rgba(200,164,90,0.2)",
              position: "relative",
              overflow: "hidden",
            }}
            className="snab-block"
          >
            <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, rgba(200,164,90,0.02) 0, rgba(200,164,90,0.02) 1px, transparent 1px, transparent 40px)", pointerEvents: "none" }} />

            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <div className="tag-pill">Партнёрский сервис</div>
                <span style={{ fontSize: "20px" }}>🚚</span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 2.5vw, 30px)", color: "#f5f0e8", marginBottom: "8px", lineHeight: 1.2 }}>
                Стройматериалы прямо от производителей —{" "}
                <span className="gold-text">без накруток</span>
              </h3>
              <p style={{ color: "rgba(245,240,232,0.5)", fontSize: "15px" }}>
                Knauf, Rockwool, Grand Line, пиломатериалы, аренда опалубки и спецтехники. 3 900+ товаров в наличии.
              </p>
            </div>

            <a
              href="https://snabzhenie.org"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{ flexShrink: 0, whiteSpace: "nowrap" }}
            >
              <span>Перейти на snabzhenie.org</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 700px) {
          .snab-block { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
