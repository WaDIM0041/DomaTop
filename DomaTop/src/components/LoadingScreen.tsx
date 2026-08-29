"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Check if already shown this session
    if (sessionStorage.getItem("loaded")) {
      setHidden(true);
      return;
    }

    let p = 0;
    const timer = setInterval(() => {
      p += Math.random() * 18 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(timer);
        setTimeout(() => {
          setDone(true);
          setTimeout(() => {
            setHidden(true);
            sessionStorage.setItem("loaded", "1");
          }, 700);
        }, 300);
      }
      setProgress(Math.min(p, 100));
    }, 80);

    return () => clearInterval(timer);
  }, []);

  if (hidden) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#050505",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: done ? 0 : 1,
        transform: done ? "scale(1.03)" : "scale(1)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        pointerEvents: done ? "none" : "all",
      }}
    >
      {/* Grid bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(200,164,90,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,164,90,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Logo */}
      <div style={{ position: "relative", marginBottom: "48px", textAlign: "center" }}>
        <div
          style={{
            fontSize: "80px",
            fontWeight: 900,
            fontFamily: "'Playfair Display', serif",
            color: "transparent",
            WebkitTextStroke: "1px rgba(200,164,90,0.3)",
            letterSpacing: "-0.04em",
            userSelect: "none",
          }}
        >
          ЗОДЧИЙ
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            fontSize: "80px",
            fontWeight: 900,
            fontFamily: "'Playfair Display', serif",
            background: "linear-gradient(135deg, #c8a45a, #e0be82, #c8a45a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.04em",
            clipPath: `inset(0 ${100 - progress}% 0 0)`,
            transition: "clip-path 0.08s linear",
          }}
        >
          ЗОДЧИЙ
        </div>
      </div>

      <div style={{ fontSize: "11px", color: "rgba(200,164,90,0.6)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "32px" }}>
        Строительство с 1992 года
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "240px",
          height: "1px",
          background: "rgba(200,164,90,0.15)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, var(--color-accent), var(--color-accent-light))",
            transition: "width 0.08s linear",
            boxShadow: "0 0 10px rgba(200,164,90,0.6)",
          }}
        />
      </div>

      <div style={{ fontSize: "11px", color: "rgba(200,164,90,0.4)", marginTop: "16px", letterSpacing: "0.1em" }}>
        {Math.round(progress)}%
      </div>
    </div>
  );
}
