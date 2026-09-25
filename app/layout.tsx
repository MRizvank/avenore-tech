import type { Metadata } from "next";
import { Outfit, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import { LanguageProvider } from "@/contexts/LanguageContext";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Avenore Studio – Mobile App Development Kuwait & GCC",
    template: "%s | Avenore Studio Kuwait",
  },
  description:
    "Kuwait City's premier mobile app engineering studio. We build Flutter iOS & Android apps, backend cloud systems, and digital products for GCC founders, Dubai startups, and Saudi enterprise teams.",
  keywords: [
    // Kuwait primary
    "mobile app development Kuwait",
    "app development company Kuwait City",
    "Flutter developer Kuwait",
    "iOS app development Kuwait",
    "Android app development Kuwait",
    "Kuwait tech startup",
    "software development company Kuwait",
    // GCC expansion
    "mobile app development Dubai",
    "app development company UAE",
    "Flutter development Saudi Arabia",
    "app developer Qatar",
    "mobile app development GCC",
    "software company GCC",
    // Service keywords
    "Flutter cross-platform development",
    "fintech app development GCC",
    "luxury ecommerce app development",
    "enterprise mobile app GCC",
    "MVP development startup Kuwait",
    // AI/semantic keywords
    "premium product engineering studio",
    "mobile app engineering team",
    "senior Flutter engineers Kuwait",
  ],
  authors: [{ name: "Avenore Studio", url: "https://avenore.tech" }],
  creator: "Avenore Studio",
  publisher: "Avenore Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://avenore.tech",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_KW", "ar_AE", "ar_SA"],
    url: "https://avenore.tech",
    siteName: "Avenore Studio",
    title: "Avenore Studio – Mobile App Development Kuwait & GCC",
    description:
      "Kuwait City's premier mobile app engineering studio. Flutter iOS & Android apps, backend cloud systems, and digital products for GCC markets.",
    images: [
      {
        url: "https://avenore.tech/og-image.png",
        width: 1200,
        height: 630,
        alt: "Avenore Studio – Mobile App Engineering Kuwait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avenore Studio – Mobile App Development Kuwait & GCC",
    description:
      "Kuwait City's premier mobile app engineering studio. Flutter, iOS & Android for GCC markets.",
    images: ["https://avenore.tech/og-image.png"],
    creator: "@avenorestudio",
    site: "@avenorestudio",
  },
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Avenore Tech",
              "url": "https://avenore.tech",
              "logo": "https://avenore.tech/logo.png",
              "image": "https://avenore.tech/og-image.png",
              "description": "Premium mobile app engineering studio based in Kuwait City, building scalable Flutter iOS & Android apps and cloud systems for the GCC market.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Sharq, Financial District, Arabian Gulf Street",
                "addressLocality": "Kuwait City",
                "addressCountry": "KW"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 29.3759,
                "longitude": 47.9774
              },
              "areaServed": ["KW", "SA", "AE", "QA", "BH", "OM"],
              "priceRange": "$$$",
              "telephone": "+965-6763-4440"
            })
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${geist.variable} ${geistMono.variable}`}
        style={{
          backgroundColor: "#131317",
          color: "#e4e1e8",
          fontFamily: "var(--font-geist), Geist, sans-serif",
          minHeight: "100vh",
        }}
      >
        <LanguageProvider>
          <CustomCursor />
          <SmoothScrollProvider>
            <Header />
            <SocialSidebar />
            <main
              style={{ paddingTop: "80px", backgroundColor: "#131317" }}
            >
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
