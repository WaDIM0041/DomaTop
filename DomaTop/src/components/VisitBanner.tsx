"use client";

import { useEffect, useRef } from "react";

export default function VisitBanner() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "0",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('https://images.pexels.com/photos/36777507/pexels-photo-36777507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1400')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(10,10,10,0.93) 0%, rgba(10,10,10,0.75) 100%)",
        }}
      />

      {/* Gold accent line top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, #c8a45a, #e0be82, #c8a45a, transparent)",
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "100px 24px",
          position: "relative",
          textAlign: "center",
        }}
      >
        <div className="reveal-up">
          <div className="tag-pill" style={{ marginBottom: "24px" }}>
            Специальное предложение
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 64px)",
              fontWeight: 700,
              color: "#f5f0e8",
              lineHeight: 1.1,
              marginBottom: "24px",
            }}
          >
            Приходите в офис —
            <br />
            <span className="gold-text">покажем 500+ реальных домов</span>
          </h2>

          <p
            style={{
              color: "rgba(245, 240, 232, 0.65)",
              fontSize: "clamp(15px, 2vw, 20px)",
              lineHeight: 1.7,
              maxWidth: "640px",
              margin: "0 auto 48px",
            }}
          >
            Не рендеры и не 3D — живой альбом каждого построенного объекта.
            Видите дом — едете смотреть вживую. Так мы работаем 30 лет.
            Первая встреча <strong style={{ color: "#f5f0e8" }}>бесплатна и ни к чему не обязывает.</strong>
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "48px",
            }}
          >
            <a
              href="#contact"
              className="btn-gold"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ padding: "18px 48px", fontSize: "15px" }}
            >
              <span>Записаться на встречу</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="tel:+79992229292"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 40px",
                border: "1px solid rgba(245,240,232,0.3)",
                color: "#f5f0e8",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 600,
                letterSpacing: "0.04em",
                transition: "all 0.3s ease",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 5.28 5.28l1.99-1.99a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +7 (999) 222-92-92
            </a>
          </div>

          {/* Trust indicators */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "48px",
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: "✓", text: "Бесплатная консультация" },
              { icon: "✓", text: "Смотрим реальные объекты" },
              { icon: "✓", text: "Без обязательств" },
              { icon: "✓", text: "Ответ за 30 минут" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    color: "var(--color-accent)",
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  {item.icon}
                </span>
                <span
                  style={{
                    color: "rgba(245,240,232,0.65)",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gold accent line bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, #c8a45a, #e0be82, #c8a45a, transparent)",
        }}
      />
    </section>
  );
}
