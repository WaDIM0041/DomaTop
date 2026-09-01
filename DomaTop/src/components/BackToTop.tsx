"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      className="back-to-top"
      onClick={scrollToTop}
      aria-label="Наверх"
      type="button"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M18 15l-6-6-6 6" />
      </svg>
      <style jsx>{`
        .back-to-top {
          position: fixed;
          bottom: 32px;
          right: 32px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));
          color: #0a0a0a;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 30px rgba(200,164,90,0.35);
          z-index: 999;
          opacity: 0;
          transform: translateY(20px) scale(0.9);
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .back-to-top:global(.visible) {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .back-to-top:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 16px 40px rgba(200,164,90,0.5);
        }
        .back-to-top:active {
          transform: translateY(0) scale(0.98);
        }
        @media (max-width: 640px) {
          .back-to-top {
            bottom: 24px;
            right: 24px;
            width: 48px;
            height: 48px;
          }
        }
      `}</style>
    </button>
  );
}