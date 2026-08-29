"use client";

const items = [
  "Строительство под ключ",
  "Каркасные дома",
  "Газобетон",
  "Клеёный брус",
  "Фахверк",
  "Индивидуальные проекты",
  "Монолитное строительство",
  "Снабжение материалами",
  "30+ лет опыта",
  "500+ домов сдано",
  "Гарантия 5 лет",
  "Камчатка",
];

export default function MarqueeSection() {
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        background: "rgba(200,164,90,0.06)",
        borderTop: "1px solid rgba(200,164,90,0.18)",
        borderBottom: "1px solid rgba(200,164,90,0.18)",
        padding: "18px 0",
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Two rows going opposite directions */}
      <div className="marquee-track" style={{ marginBottom: "10px" }}>
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: "24px", paddingRight: "24px", whiteSpace: "nowrap" }}
          >
            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,240,232,0.55)" }}>
              {item}
            </span>
            <span style={{ width: "4px", height: "4px", background: "var(--color-accent)", borderRadius: "50%", display: "block", flexShrink: 0, boxShadow: "0 0 6px rgba(200,164,90,0.6)" }} />
          </div>
        ))}
      </div>
      <div className="marquee-track" style={{ animationDirection: "reverse", animationDuration: "18s" }}>
        {doubled.reverse().map((item, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: "24px", paddingRight: "24px", whiteSpace: "nowrap" }}
          >
            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,164,90,0.35)" }}>
              {item}
            </span>
            <span style={{ width: "3px", height: "3px", background: "rgba(200,164,90,0.4)", borderRadius: "50%", display: "block", flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
