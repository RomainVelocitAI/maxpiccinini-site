import type { Metadata } from "next";
import { Montserrat, Oswald } from "next/font/google";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/tracking/GoogleTagManager";
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ['400', '500', '600', '700', '800', '900'],
});

const oswald = Oswald({ 
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Max Piccinini - Du Dirigeant Esclave au Stratège Libre | Audit Stratégique Gratuit",
  description: "Transformez votre entreprise à 7 chiffres avec la méthode MAXIMIZER™. +30-100% de marge sans recruter. Audit stratégique gratuit pour dirigeants PME ambitieux.",
  keywords: "audit stratégique entreprise, augmenter EBITDA, liberté entrepreneuriale, conseil dirigeant PME, stratégie entreprise, optimisation marge, Max Piccinini",
  authors: [{ name: "Max Piccinini" }],
  creator: "Max Piccinini",
  publisher: "Max Piccinini",
  robots: "index, follow",
  metadataBase: new URL('https://maxpiccinini.com'),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://maxpiccinini.com",
    title: "Max Piccinini - Stratège Business pour Dirigeants Ambitieux",
    description: "Libérez-vous de l'opérationnel et triplez votre liberté entrepreneuriale. Méthode éprouvée avec +160% de profit net pour certains clients.",
    siteName: "Max Piccinini",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Max Piccinini - Expert en stratégie business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Max Piccinini - Du Dirigeant Esclave au Stratège Libre",
    description: "Audit stratégique gratuit pour dirigeants PME. Méthode MAXIMIZER™ pour tripler votre liberté.",
    images: ["/twitter-image.jpg"],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A2540',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${oswald.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <GoogleTagManager />
      </head>
      <body className="font-montserrat antialiased bg-neutral-50 text-neutral-800">
        <GoogleTagManagerNoScript />
        {children}
      </body>
    </html>
  );
}