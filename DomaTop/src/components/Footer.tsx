"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(200,164,90,0.12)",
        padding: "60px 0 24px",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Top footer */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "48px",
            marginBottom: "48px",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div className="logo-mark">З</div>
              <div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    color: "#f5f0e8",
                    textTransform: "uppercase",
                  }}
                >
                  ЗОДЧИЙ
                </div>
                <div
                  style={{
                    fontSize: "9px",
                    color: "var(--color-accent)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  с 1992 года
                </div>
              </div>
            </div>
            <p
              style={{
                color: "rgba(245,240,232,0.4)",
                fontSize: "14px",
                lineHeight: 1.7,
                maxWidth: "280px",
                marginBottom: "24px",
              }}
            >
              Профессиональное строительство одно- и двухэтажных домов
              под ключ. Более 30 лет создаём пространство для жизни.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <a
                href="tel:+79992229292"
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "var(--color-accent)",
                  textDecoration: "none",
                }}
              >
                +7 (999) 222-92-92
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(245,240,232,0.3)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Навигация
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                ["О компании", "#about"],
                ["Проекты", "#projects"],
                ["Услуги", "#services"],
                ["Процесс", "#process"],
                ["Контакты", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    color: "rgba(245,240,232,0.5)",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "color 0.3s ease",
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* External sites */}
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(245,240,232,0.3)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Наши сайты
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <a
                href="https://zodkam.ru"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-accent)", marginBottom: "2px" }}>
                  zodkam.ru
                </div>
                <div style={{ fontSize: "12px", color: "rgba(245,240,232,0.4)" }}>
                  Главный сайт компании
                </div>
              </a>
              <a
                href="https://snabzhenie.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-accent)", marginBottom: "2px" }}>
                  snabzhenie.org
                </div>
                <div style={{ fontSize: "12px", color: "rgba(245,240,232,0.4)" }}>
                  Стройматериалы оптом
                </div>
              </a>
            </nav>
          </div>

          {/* Info */}
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(245,240,232,0.3)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Адрес
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "rgba(245,240,232,0.5)",
                lineHeight: 1.7,
              }}
            >
              <div style={{ color: "#f5f0e8", fontWeight: 600, marginBottom: "4px" }}>
                Петропавловск-Камчатский
              </div>
              пр. Карла Маркса, 35,
              <br />
              офис 9
              <br />
              <br />
              <span style={{ color: "rgba(245,240,232,0.35)" }}>
                Пн–Пт: 9:00–18:00
                <br />
                Сб: 10:00–15:00
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(200,164,90,0.1)",
            marginBottom: "24px",
          }}
        />

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ fontSize: "12px", color: "rgba(245,240,232,0.25)" }}>
            © {year} ЗОДЧИЙ. Строительство домов с 1992 года. Все права защищены.
          </div>
          <div style={{ fontSize: "12px", color: "rgba(245,240,232,0.2)" }}>
            ИП Кавтаскина У.Ю.
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
