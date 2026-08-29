"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  { num: "01", title: "Консультация", desc: "Бесплатная встреча в офисе. Показываем 500+ реальных проектов. Обсуждаем ваш дом.", icon: "💬", time: "1 день", color: "rgba(200,164,90,0.9)" },
  { num: "02", title: "Проект", desc: "Подбираем готовый или создаём индивидуальный. Видите 3D и утверждаете каждую деталь.", icon: "📐", time: "3–7 дней", color: "rgba(180,140,70,0.9)" },
  { num: "03", title: "Договор", desc: "Фиксируем цену, сроки и гарантию. Цена в договоре = цена при сдаче. Никаких сюрпризов.", icon: "📋", time: "1–2 дня", color: "rgba(160,120,55,0.9)" },
  { num: "04", title: "Строительство", desc: "Своя бригада, свои материалы. Онлайн-отчёты. Технадзор на каждом этапе работ.", icon: "🏗️", time: "3–6 мес", color: "rgba(140,100,45,0.9)" },
  { num: "05", title: "Ключи", desc: "Финальная приёмка. Подписываем акт. Вручаем ключи. Начинается гарантия 5 лет.", icon: "🔑", time: "1 день", color: "rgba(200,164,90,0.9)" },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{ padding: "120px 0", background: "var(--color-bg-2)", position: "relative", overflow: "hidden" }}
    >
      <div className="grid-decoration" />

      {/* Big bg text */}
      <div
        style={{
          position: "absolute",
          bottom: "-20px",
          right: "-40px",
          fontSize: "clamp(100px, 18vw, 260px)",
          fontWeight: 900,
          color: "transparent",
          WebkitTextStroke: "1px rgba(200,164,90,0.04)",
          fontFamily: "'Playfair Display', serif",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.05em",
        }}
      >
        05
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "80px", flexWrap: "wrap", gap: "32px" }}>
          <div className="reveal-up">
            <div className="tag-pill" style={{ marginBottom: "16px" }}>Как мы работаем</div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 4vw, 56px)",
                fontWeight: 700,
                color: "#f5f0e8",
                lineHeight: 1.05,
              }}
            >
              5 шагов до
              <br />
              <span className="gold-text">дома мечты</span>
            </h2>
          </div>
          <div className="reveal-up" style={{ maxWidth: "320px" }}>
            <p style={{ color: "rgba(245,240,232,0.45)", fontSize: "15px", lineHeight: 1.7 }}>
              Прозрачный процесс от звонка до ключей. Без сюрпризов — только чёткие договорённости.
            </p>
          </div>
        </div>

        {/* Interactive steps */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="process-layout">
          {/* Left: step list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }} className="reveal-up">
            {steps.map((step, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(i)}
                style={{
                  padding: "24px 28px",
                  cursor: "pointer",
                  background: activeStep === i ? "rgba(200,164,90,0.07)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${activeStep === i ? "rgba(200,164,90,0.35)" : "rgba(255,255,255,0.04)"}`,
                  transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Active indicator */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: activeStep === i ? "3px" : "0",
                    height: "100%",
                    background: "var(--color-accent)",
                    transition: "width 0.4s ease",
                  }}
                />

                {/* Number */}
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 900,
                    fontFamily: "'Playfair Display', serif",
                    color: activeStep === i ? "var(--color-accent)" : "rgba(200,164,90,0.15)",
                    transition: "color 0.4s ease",
                    minWidth: "48px",
                    lineHeight: 1,
                  }}
                >
                  {step.num}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: activeStep === i ? "#f5f0e8" : "rgba(245,240,232,0.5)", marginBottom: "2px", transition: "color 0.4s ease" }}>
                    {step.title}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "rgba(245,240,232,0.35)",
                      maxHeight: activeStep === i ? "60px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.4s ease",
                    }}
                  >
                    {step.desc}
                  </div>
                </div>

                <div style={{ fontSize: "10px", color: "var(--color-accent)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: activeStep === i ? 1 : 0.3, transition: "opacity 0.4s ease", flexShrink: 0 }}>
                  {step.time}
                </div>
              </div>
            ))}
          </div>

          {/* Right: active step display */}
          <div className="reveal-up" style={{ transitionDelay: "0.2s" }}>
            <div
              key={activeStep}
              style={{
                padding: "60px 48px",
                background: "rgba(200,164,90,0.04)",
                border: "1px solid rgba(200,164,90,0.2)",
                position: "relative",
                overflow: "hidden",
                animation: "stepFadeIn 0.5s ease",
              }}
            >
              {/* Bg number */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  right: "20px",
                  fontSize: "120px",
                  fontWeight: 900,
                  fontFamily: "'Playfair Display', serif",
                  color: "rgba(200,164,90,0.06)",
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {steps[activeStep].num}
              </div>

              <div style={{ fontSize: "52px", marginBottom: "24px" }}>{steps[activeStep].icon}</div>

              <div style={{ fontSize: "11px", color: "var(--color-accent)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px" }}>
                Шаг {steps[activeStep].num} · {steps[activeStep].time}
              </div>

              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 3vw, 36px)",
                  color: "#f5f0e8",
                  marginBottom: "20px",
                  lineHeight: 1.2,
                }}
              >
                {steps[activeStep].title}
              </h3>

              <p style={{ color: "rgba(245,240,232,0.6)", fontSize: "16px", lineHeight: 1.8 }}>
                {steps[activeStep].desc}
              </p>

              {/* Progress dots */}
              <div style={{ display: "flex", gap: "8px", marginTop: "40px" }}>
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    style={{
                      width: i === activeStep ? "32px" : "8px",
                      height: "8px",
                      background: i === activeStep ? "var(--color-accent)" : "rgba(200,164,90,0.2)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.35s ease",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ marginTop: "24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href="#contact"
                className="btn-gold"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                <span>Начать консультацию</span>
              </a>
              <a href="tel:+79992229292" className="btn-outline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 5.28 5.28l1.99-1.99a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Позвонить
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes stepFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .process-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
