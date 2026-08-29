import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ЗОДЧИЙ — Строительство домов под ключ | Петропавловск-Камчатский",
  description:
    "Профессиональное строительство одно- и двухэтажных домов под ключ с 1992 года. Более 30 лет опыта, 500+ реализованных проектов, гарантия 5 лет. Индивидуальный подход, собственное производство материалов.",
  keywords:
    "строительство домов, строительство под ключ, Петропавловск-Камчатский, каркасные дома, одноэтажные дома, двухэтажные дома, проекты домов, Зодчий",
  openGraph: {
    title: "ЗОДЧИЙ — Строительство домов под ключ",
    description:
      "Строим дома, в которых хочется жить. С 1992 года. Более 500 реализованных проектов.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
