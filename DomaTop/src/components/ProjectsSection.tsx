"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    name: "Аврора 12",
    type: "Двухэтажный",
    area: "143 м²",
    rooms: "3 комнаты · 3 санузла",
    image: "https://images.pexels.com/photos/8134821/pexels-photo-8134821.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
    tag: "Популярный",
    size: "large",
  },
  {
    name: "Норд",
    type: "Одноэтажный",
    area: "128 м²",
    rooms: "Скандинавский стиль",
    image: "https://images.pexels.com/photos/8082328/pexels-photo-8082328.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700",
    tag: "Новинка",
    size: "small",
  },
  {
    name: "Брукс 162",
    type: "Одноэтажный",
    area: "162 м²",
    rooms: "Фахверк · Панорамные окна",
    image: "https://images.pexels.com/photos/7598375/pexels-photo-7598375.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700",
    tag: "Премиум",
    size: "small",
  },
  {
    name: "Грань",
    type: "Двухэтажный",
    area: "127 м²",
    rooms: "Barnhouse · Лофт",
    image: "https://images.pexels.com/photos/31737859/pexels-photo-31737859.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700",
    tag: "Хит",
    size: "small",
  },
  {
    name: "Олимп 1",
    type: "Двухэтажный",
    area: "109 м²",
    rooms: "4 спальни · 2 санузла",
    image: "https://images.pexels.com/photos/7031412/pexels-photo-7031412.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700",
    tag: "Для семьи",
    size: "small",
  },
];

function MagneticCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setPos({ x, y });
    setImgPos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * -20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -20,
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setPos({ x: 0, y: 0 });
    setImgPos({ x: 0, y: 0 });
  };

  const isLarge = project.size === "large";

  return (
    <div
      ref={cardRef}
      className={`project-card-3d reveal-up`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transitionDelay: `${index * 0.08}s`,
        gridRow: isLarge ? "span 2" : "auto",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transform: hovered ? `perspective(1000px) rotateX(${-pos.y}deg) rotateY(${pos.x}deg) scale(1.02)` : "perspective(1000px) rotateX(0) rotateY(0) scale(1)",
        transition: hovered ? "transform 0.1s ease" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
        minHeight: isLarge ? "500px" : "240px",
      }}
      onClick={() => window.open("https://zodkam.ru/typeprojects/", "_blank")}
    >
      {/* Image */}
      <img
        src={project.image}
        alt={project.name}
        style={{
          position: "absolute",
          inset: "-10%",
          width: "120%",
          height: "120%",
          objectFit: "cover",
          transform: hovered ? `translate(${imgPos.x}px, ${imgPos.y}px) scale(1.1)` : "translate(0,0) scale(1.05)",
          transition: hovered ? "transform 0.1s ease" : "transform 0.8s ease",
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
          transition: "background 0.4s ease",
        }}
      />

      {/* Gold shine on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(200,164,90,0.12) 0%, transparent 50%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Border glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: hovered ? "1px solid rgba(200,164,90,0.6)" : "1px solid transparent",
          transition: "border 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Tag */}
      <div style={{ position: "absolute", top: "16px", left: "16px" }}>
        <span className="tag-pill">{project.tag}</span>
      </div>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "28px",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            color: "var(--color-accent)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: "6px",
          }}
        >
          {project.type} · {project.rooms}
        </div>
        <div
          style={{
            fontSize: isLarge ? "28px" : "20px",
            fontWeight: 700,
            color: "#f5f0e8",
            fontFamily: "'Playfair Display', serif",
            marginBottom: "4px",
          }}
        >
          {project.name}
        </div>
        <div
          style={{
            fontSize: "14px",
            color: "rgba(245,240,232,0.5)",
            marginBottom: hovered ? "16px" : "0",
            transition: "margin 0.4s ease",
          }}
        >
          {project.area}
        </div>

        {/* CTA appears on hover */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--color-accent)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            maxHeight: hovered ? "30px" : "0",
            opacity: hovered ? 1 : 0,
            overflow: "hidden",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          Смотреть проект
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

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
      id="projects"
      style={{ padding: "120px 0", background: "var(--color-bg-2)", position: "relative" }}
    >
      <div className="grid-decoration" />

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "60px",
            flexWrap: "wrap",
            gap: "32px",
          }}
        >
          <div className="reveal-up">
            <div className="tag-pill" style={{ marginBottom: "16px" }}>Каталог проектов</div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 4vw, 56px)",
                fontWeight: 700,
                color: "#f5f0e8",
                lineHeight: 1.05,
              }}
            >
              Проекты, которые
              <br />
              <span className="gold-text">уже живут</span>
            </h2>
          </div>
          <div className="reveal-up" style={{ textAlign: "right" }}>
            <p style={{ color: "rgba(245,240,232,0.45)", fontSize: "14px", marginBottom: "16px", maxWidth: "280px" }}>
              Наведите на карточку — увидите детали.<br />Каждый проект можно посмотреть вживую.
            </p>
            <a
              href="https://zodkam.ru/typeprojects/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Все 100+ проектов →
            </a>
          </div>
        </div>

        {/* Masonry grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "auto",
            gap: "3px",
          }}
          className="projects-masonry"
        >
          {projects.map((p, i) => (
            <MagneticCard key={p.name} project={p} index={i} />
          ))}
        </div>

        {/* Big CTA block */}
        <div className="reveal-up" style={{ marginTop: "60px" }}>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "64px",
              background: "rgba(200,164,90,0.04)",
              border: "1px solid rgba(200,164,90,0.15)",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              gap: "40px",
            }}
            className="cta-block-inner"
          >
            {/* Animated background lines */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "repeating-linear-gradient(45deg, rgba(200,164,90,0.03) 0px, rgba(200,164,90,0.03) 1px, transparent 1px, transparent 30px)",
                pointerEvents: "none",
              }}
            />
            <div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(22px, 3vw, 40px)",
                  color: "#f5f0e8",
                  marginBottom: "12px",
                }}
              >
                Хотите что-то изменить?{" "}
                <span className="gold-text">Создадим под вас.</span>
              </h3>
              <p style={{ color: "rgba(245,240,232,0.5)", fontSize: "15px", lineHeight: 1.7 }}>
                Технический специалист адаптирует любой проект или разработает дом с нуля — строго по вашим желаниям.
              </p>
            </div>
            <a
              href="#contact"
              className="btn-gold"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ flexShrink: 0, whiteSpace: "nowrap" }}
            >
              <span>Обсудить проект</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .projects-masonry { grid-template-columns: 1fr 1fr !important; }
          .projects-masonry > div[style*="span 2"] { grid-row: auto !important; }
        }
        @media (max-width: 600px) {
          .projects-masonry { grid-template-columns: 1fr !important; }
        }
        .cta-block-inner { grid-template-columns: 1fr !important; }
        @media (min-width: 700px) {
          .cta-block-inner { grid-template-columns: 1fr auto !important; }
        }
      `}</style>
    </section>
  );
}
