"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Александр В.",
    location: "Петропавловск-Камчатский",
    date: "2024",
    project: "Двухэтажный дом «Аврора», 143 м²",
    rating: 5,
    text: "Обратились после долгого поиска. Приехали в офис — посмотрели реальные дома своими глазами. Это решило все сомнения. Проект адаптировали за неделю. Строили чётко по договору, без сюрпризов. Теперь живём в доме мечты.",
    avatar: "А",
    highlight: true,
  },
  {
    name: "Марина и Олег К.",
    location: "Камчатский край",
    date: "2024",
    project: "Одноэтажный дом 128 м²",
    rating: 5,
    text: "Закупали материалы через snabzhenie.org напрямую и сэкономили значительно. Менеджер была на связи 24/7, отчёты с объекта приходили регулярно. Сдали на 2 недели раньше срока!",
    avatar: "М",
  },
  {
    name: "Дмитрий Н.",
    location: "Вилючинск",
    date: "2023",
    project: "Двухэтажный коттедж, инд. проект",
    rating: 5,
    text: "Хотел дом, которого нет ни у кого. Технический специалист разработал проект с нуля под мои эскизы. Материалы собственного производства — качество видно сразу. Гарантия 5 лет — реальная уверенность.",
    avatar: "Д",
  },
  {
    name: "Семья Петровых",
    location: "Елизово",
    date: "2023",
    project: "Каркасный дом 109 м²",
    rating: 5,
    text: "Помогли оформить ипотеку, объяснили все тонкости. Дом тёплый даже в камчатские морозы. Соседи уже спрашивают контакты. Настоящие профессионалы — чувствуется в каждой детали.",
    avatar: "П",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!dragging) setActive((p) => (p + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [dragging]);

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

  const t = testimonials[active];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{ padding: "120px 0", background: "var(--color-bg-2)", position: "relative", overflow: "hidden" }}
    >
      <div className="grid-decoration" />

      {/* Giant decorative quote */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          fontSize: "400px",
          fontFamily: "serif",
          color: "rgba(200,164,90,0.03)",
          userSelect: "none",
          lineHeight: 1,
          pointerEvents: "none",
        }}
      >
        &ldquo;
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "80px" }} className="reveal-up">
          <div className="tag-pill" style={{ marginBottom: "16px" }}>Что говорят клиенты</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 56px)", fontWeight: 700, color: "#f5f0e8", lineHeight: 1.05 }}>
            Люди, которые
            <br /><span className="gold-text">уже живут</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "3px", alignItems: "stretch" }} className="reviews-grid">
          {/* Main testimonial */}
          <div
            key={active}
            className="reveal-up"
            style={{
              padding: "60px",
              background: "rgba(200,164,90,0.04)",
              border: "1px solid rgba(200,164,90,0.18)",
              position: "relative",
              animation: "fadeSlideIn 0.5s ease",
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
            onMouseDown={(e) => { setDragging(true); setStartX(e.clientX); }}
            onMouseUp={(e) => {
              const dx = e.clientX - startX;
              if (Math.abs(dx) > 50) {
                setActive((p) => (dx < 0 ? (p + 1) % testimonials.length : (p - 1 + testimonials.length) % testimonials.length));
              }
              setDragging(false);
            }}
          >
            {/* Quote mark */}
            <div style={{ position: "absolute", top: "24px", left: "40px", fontSize: "100px", color: "var(--color-accent)", opacity: 0.15, fontFamily: "serif", lineHeight: 1, pointerEvents: "none" }}>
              &ldquo;
            </div>

            {/* Stars */}
            <div style={{ display: "flex", gap: "4px" }}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} style={{ color: "var(--color-accent)", fontSize: "20px", filter: "drop-shadow(0 0 4px rgba(200,164,90,0.4))" }}>★</span>
              ))}
            </div>

            <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(245,240,232,0.85)", lineHeight: 1.8, fontStyle: "italic", flex: 1 }}>
              &ldquo;{t.text}&rdquo;
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "52px", height: "52px",
                  background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-light))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "22px", fontWeight: 700, color: "#0a0a0a", flexShrink: 0,
                }}
              >
                {t.avatar}
              </div>
              <div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#f5f0e8" }}>{t.name}</div>
                <div style={{ fontSize: "12px", color: "rgba(245,240,232,0.4)", marginTop: "2px" }}>
                  {t.location} · {t.date}
                </div>
                <div style={{ fontSize: "12px", color: "var(--color-accent)", marginTop: "2px", fontWeight: 500 }}>
                  {t.project}
                </div>
              </div>
            </div>

            {/* Swipe indicator */}
            <div style={{ position: "absolute", bottom: "24px", right: "24px", fontSize: "11px", color: "rgba(245,240,232,0.2)", letterSpacing: "0.1em" }}>
              SWIPE
            </div>
          </div>

          {/* Right — list + rating */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {testimonials.map((t2, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                style={{
                  padding: "24px 28px",
                  background: i === active ? "rgba(200,164,90,0.07)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${i === active ? "rgba(200,164,90,0.3)" : "rgba(255,255,255,0.04)"}`,
                  cursor: "pointer",
                  transition: "all 0.35s ease",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="reveal-up"

              >
                {i === active && (
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "2px", background: "var(--color-accent)" }} />
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: i === active ? "#f5f0e8" : "rgba(245,240,232,0.5)" }}>
                    {t2.name}
                  </span>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {Array.from({ length: t2.rating }).map((_, j) => (
                      <span key={j} style={{ color: "var(--color-accent)", fontSize: "11px" }}>★</span>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: "12px", color: "rgba(245,240,232,0.3)" }}>{t2.project}</div>
              </div>
            ))}

            {/* Rating summary */}
            <div style={{ padding: "32px 28px", background: "rgba(200,164,90,0.05)", border: "1px solid rgba(200,164,90,0.12)", textAlign: "center" }}>
              <div
                style={{
                  fontSize: "52px",
                  fontWeight: 900,
                  fontFamily: "'Playfair Display', serif",
                  background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-light))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                4.9
              </div>
              <div style={{ display: "flex", gap: "3px", justifyContent: "center", marginBottom: "8px" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{ color: "var(--color-accent)", fontSize: "18px" }}>★</span>
                ))}
              </div>
              <div style={{ fontSize: "12px", color: "rgba(245,240,232,0.4)", letterSpacing: "0.06em" }}>
                Средний рейтинг клиентов
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "40px" }} className="reveal-up">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? "40px" : "8px",
                height: "8px",
                background: i === active ? "var(--color-accent)" : "rgba(200,164,90,0.25)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                padding: 0,
                boxShadow: i === active ? "0 0 12px rgba(200,164,90,0.4)" : "none",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 900px) {
          .reviews-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
