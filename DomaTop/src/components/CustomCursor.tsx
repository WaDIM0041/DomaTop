"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId: number;
    let isVisible = false;

    // Trail positions
    const TRAIL_COUNT = 12;
    const trailPositions: { x: number; y: number }[] = Array(TRAIL_COUNT)
      .fill(null)
      .map(() => ({ x: mouseX, y: mouseY }));

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const onMouseEnterLink = () => {
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.borderColor = "rgba(200,164,90,0.8)";
      ring.style.background = "rgba(200,164,90,0.08)";
    };

    const onMouseLeaveLink = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "rgba(200,164,90,0.5)";
      ring.style.background = "transparent";
    };

    const onMouseDown = () => {
      dot.style.transform = "translate(-50%, -50%) scale(0.5)";
      ring.style.transform = "translate(-50%, -50%) scale(0.85)";
    };

    const onMouseUp = () => {
      dot.style.transform = "translate(-50%, -50%) scale(1)";
      ring.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      // Ring follows with lag
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);

      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";

      // Update trails
      trailPositions.unshift({ x: mouseX, y: mouseY });
      trailPositions.pop();

      trailsRef.current.forEach((trail, i) => {
        if (!trail) return;
        const pos = trailPositions[i] || trailPositions[0];
        trail.style.left = pos.x + "px";
        trail.style.top = pos.y + "px";
        trail.style.opacity = String(((TRAIL_COUNT - i) / TRAIL_COUNT) * 0.35);
        const scale = ((TRAIL_COUNT - i) / TRAIL_COUNT) * 0.7;
        trail.style.transform = `translate(-50%, -50%) scale(${scale})`;
      });

      rafId = requestAnimationFrame(animate);
    };

    // Add interactive listeners to all links and buttons
    const addInteractivity = () => {
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    addInteractivity();
    rafId = requestAnimationFrame(animate);

    // Re-scan for new interactive elements periodically
    const scanTimer = setInterval(addInteractivity, 2000);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafId);
      clearInterval(scanTimer);
    };
  }, []);

  return (
    <>
      {/* Trail particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailsRef.current[i] = el;
          }}
          style={{
            position: "fixed",
            width: "8px",
            height: "8px",
            background: "var(--color-accent)",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 9990,
            transform: "translate(-50%, -50%)",
            opacity: 0,
            transition: "opacity 0.1s ease",
            willChange: "transform, left, top",
          }}
        />
      ))}

      {/* Main dot */}
      <div
        ref={cursorDotRef}
        style={{
          position: "fixed",
          width: "6px",
          height: "6px",
          background: "#e0be82",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9997,
          transform: "translate(-50%, -50%)",
          opacity: 0,
          transition: "transform 0.15s ease, opacity 0.3s ease",
          willChange: "transform, left, top",
        }}
      />

      {/* Ring */}
      <div
        ref={cursorRingRef}
        style={{
          position: "fixed",
          width: "36px",
          height: "36px",
          border: "1px solid rgba(200,164,90,0.5)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9996,
          transform: "translate(-50%, -50%)",
          opacity: 0,
          transition:
            "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease, transform 0.15s ease, opacity 0.3s ease",
          willChange: "transform, left, top",
        }}
      />

      <style>{`
        @media (hover: none) and (pointer: coarse) {
          /* Hide custom cursor on touch devices */
          div[style*="position: fixed"][style*="border-radius: 50%"] { display: none !important; }
        }
        * { cursor: none !important; }
        a, button { cursor: none !important; }
      `}</style>
    </>
  );
}
