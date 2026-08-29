"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "О нас", href: "#about" },
  { label: "Проекты", href: "#projects" },
  { label: "Услуги", href: "#services" },
  { label: "Процесс", href: "#process" },
  { label: "Отзывы", href: "#testimonials" },
  { label: "Контакты", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 990,
          padding: scrolled ? "12px 0" : "20px 0",
          background: scrolled
            ? "rgba(10, 10, 10, 0.97)"
            : "linear-gradient(to bottom, rgba(10,10,10,0.8), transparent)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(200, 164, 90, 0.1)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="https://zodkam.ru"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
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
                  marginTop: "1px",
                }}
              >
                с 1992 года
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "36px",
            }}
            className="hidden-mobile"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                onClick={(e) => handleAnchorClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA button desktop */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a
              href="tel:+79992229292"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--color-accent)",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
              className="hidden-mobile"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 5.28 5.28l1.99-1.99a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              +7 (999) 222-92-92
            </a>

            <a
              href="#contact"
              className="btn-gold hidden-mobile"
              onClick={(e) => handleAnchorClick(e, "#contact")}
              style={{ padding: "10px 24px", fontSize: "12px" }}
            >
              <span>Записаться</span>
            </a>

            {/* Burger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="show-mobile"
              style={{
                background: "none",
                border: "1px solid rgba(200, 164, 90, 0.3)",
                padding: "8px 10px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
              aria-label="Меню"
            >
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1.5px",
                  background: "var(--color-accent)",
                  transition: "all 0.3s ease",
                  transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1.5px",
                  background: "var(--color-accent)",
                  transition: "all 0.3s ease",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1.5px",
                  background: "var(--color-accent)",
                  transition: "all 0.3s ease",
                  transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleAnchorClick(e, link.href)}
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#f5f0e8",
              textDecoration: "none",
              letterSpacing: "0.05em",
              transition: "color 0.3s ease",
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="tel:+79992229292"
          style={{
            fontSize: "18px",
            color: "var(--color-accent)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          +7 (999) 222-92-92
        </a>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 901px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
