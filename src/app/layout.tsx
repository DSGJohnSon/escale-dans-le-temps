import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://escaledansletemps.fr"),
  title: {
    default: "Escale dans le Temps — Rénovation de meubles",
    template: "%s · Escale dans le Temps",
  },
  description:
    "Rénovation de meubles anciens sur-mesure : peinture, patine, finitions soignées. Meubles déjà rénovés ou à personnaliser, devis gratuit.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${cormorantGaramond.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
