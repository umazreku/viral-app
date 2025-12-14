import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Kjo është pjesa e SEO (Karta e Identitetit për Google)
export const metadata = {
  title: "ViralShqip AI - Gjenero Postime Virale për TikTok & Instagram",
  description: "Aplikacioni i parë Shqiptar me Inteligjencë Artificiale që ju ndihmon të bëheni viral. Krijoni hooks, captions dhe hashtags në sekonda. Falas për provë.",
  keywords: "viral shqip, tiktok albania, instagram keshilla, ai marketing, chatgpt shqip, postime virale, marketing dixhital",
  authors: [{ name: "Emri Yt" }],
  creator: "ViralShqip Team",
  openGraph: {
    title: "ViralShqip AI - Bëhu Viral Sot 🚀",
    description: "Mjeti sekret i influencuesve shqiptarë. Krijo skripte në 2 sekonda.",
    url: "https://viral-app.vercel.app", // Këtu do vendosësh linkun tënd real
    siteName: "ViralShqip AI",
    locale: "sq_AL",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="sq">
      <body className={inter.className}>{children}</body>
    </html>
  );
}