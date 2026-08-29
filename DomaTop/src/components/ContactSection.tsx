"use client";

import { useEffect, useRef, useState } from "react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.05 }
    );

    sectionRef.current?.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach((el) =>
      observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        padding: "120px 0",
        background: "var(--color-bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="grid-decoration" />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: "20%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(200,164,90,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left — info */}
          <div className="reveal-left">
            <div className="tag-pill" style={{ marginBottom: "20px" }}>
              Свяжитесь с нами
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 4vw, 52px)",
                fontWeight: 700,
                color: "#f5f0e8",
                lineHeight: 1.1,
                marginBottom: "24px",
              }}
            >
              Приходите —
              <br />
              <span className="gold-text">покажем всё</span>
              <br />
              вживую
            </h2>

            <div className="section-divider" style={{ marginBottom: "32px" }} />

            <p
              style={{
                color: "rgba(245, 240, 232, 0.6)",
                fontSize: "16px",
                lineHeight: 1.8,
                marginBottom: "48px",
              }}
            >
              В нашем офисе вы увидите альбом всех реализованных проектов,
              пообщаетесь с техническим специалистом и сделаете первый шаг
              к своему дому. Без обязательств — просто приезжайте.
            </p>

            {/* Contacts */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <a
                href="tel:+79992229292"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    border: "1px solid rgba(200,164,90,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 5.28 5.28l1.99-1.99a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "rgba(245,240,232,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                    Позвонить
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: 700, color: "#f5f0e8" }}>
                    +7 (999) 222-92-92
                  </div>
                </div>
              </a>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    border: "1px solid rgba(200,164,90,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "rgba(245,240,232,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                    Офис
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: "#f5f0e8" }}>
                    Петропавловск-Камчатский
                  </div>
                  <div style={{ fontSize: "14px", color: "rgba(245,240,232,0.5)" }}>
                    проспект Карла Маркса, 35, офис 9
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    border: "1px solid rgba(200,164,90,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "rgba(245,240,232,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                    Режим работы
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: "#f5f0e8" }}>
                    Пн–Пт: 9:00 – 18:00
                  </div>
                  <div style={{ fontSize: "14px", color: "rgba(245,240,232,0.5)" }}>
                    Сб: 10:00 – 15:00
                  </div>
                </div>
              </div>
            </div>

            {/* Links to external sites */}
            <div
              style={{
                marginTop: "48px",
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://zodkam.ru"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 20px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(200,164,90,0.15)",
                  color: "rgba(245,240,232,0.7)",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 500,
                  transition: "all 0.3s ease",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                zodkam.ru
              </a>
              <a
                href="https://snabzhenie.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 20px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(200,164,90,0.15)",
                  color: "rgba(245,240,232,0.7)",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 500,
                  transition: "all 0.3s ease",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                snabzhenie.org
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal-right">
            {submitted ? (
              <div
                style={{
                  padding: "60px 48px",
                  background: "rgba(200,164,90,0.06)",
                  border: "1px solid rgba(200,164,90,0.3)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "20px" }}>✓</div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "28px",
                    color: "#f5f0e8",
                    marginBottom: "12px",
                  }}
                >
                  Заявка принята!
                </h3>
                <p style={{ color: "rgba(245,240,232,0.6)", fontSize: "15px", lineHeight: 1.7 }}>
                  Наш менеджер свяжется с вами в течение 30 минут
                  в рабочее время. Ждите звонка!
                </p>
              </div>
            ) : (
              <div
                style={{
                  padding: "48px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(200,164,90,0.15)",
                }}
              >
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#f5f0e8",
                    marginBottom: "8px",
                  }}
                >
                  Получить консультацию
                </h3>
                <p style={{ color: "rgba(245,240,232,0.45)", fontSize: "14px", marginBottom: "36px" }}>
                  Оставьте заявку — перезвоним за 30 минут
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "11px",
                        color: "rgba(245,240,232,0.4)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "8px",
                      }}
                    >
                      Ваше имя *
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Иван Петров"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "11px",
                        color: "rgba(245,240,232,0.4)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "8px",
                      }}
                    >
                      Телефон *
                    </label>
                    <input
                      className="form-input"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "11px",
                        color: "rgba(245,240,232,0.4)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "8px",
                      }}
                    >
                      Расскажите о проекте
                    </label>
                    <textarea
                      className="form-input"
                      rows={4}
                      placeholder="Хочу построить одноэтажный дом 100–120 м², участок есть..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ resize: "vertical" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold"
                    disabled={loading}
                    style={{ width: "100%", justifyContent: "center", marginTop: "8px" }}
                  >
                    <span>
                      {loading ? "Отправляем..." : "Записаться на консультацию"}
                    </span>
                    {!loading && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>

                  <p
                    style={{
                      fontSize: "11px",
                      color: "rgba(245,240,232,0.3)",
                      textAlign: "center",
                      lineHeight: 1.6,
                    }}
                  >
                    Нажимая кнопку, вы соглашаетесь с обработкой
                    персональных данных. Первая консультация — бесплатно.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
