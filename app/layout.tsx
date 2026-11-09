import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import { PHProvider } from "./components/common/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sebastian.wiki"),
  title: "Sebastian Arellano-Rubach",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Sebastian Arellano-Rubach",
  },
  description: "AI Researcher & Data Engineer. Co-author of 4 peer-reviewed papers with 250+ citations. 1st Place Hack Canada 2026. UWaterloo + Laurier Double Degree.",
  keywords: "Sebastian Arellano-Rubach, AI Researcher, Data Engineer, LLMs, Machine Learning, Chemistry Robotics, UWaterloo, Hackathon, Full Stack Developer",
  authors: [{ name: "Sebastian Arellano-Rubach" }],
  creator: "Sebastian Arellano-Rubach",
  publisher: "Sebastian Arellano-Rubach",
  alternates: {
    canonical: "https://sebastian.wiki",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Sebastian Arellano-Rubach - AI Researcher & Data Engineer",
    description: "Co-author of 4 peer-reviewed papers with 250+ citations. 1st Place Hack Canada 2026. Building at the intersection of AI, robotics, and data.",
    url: "https://sebastian.wiki",
    siteName: "Sebastian Arellano-Rubach",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sebastian Arellano-Rubach - AI Researcher & Data Engineer",
    description: "Co-author of 4 peer-reviewed papers with 250+ citations. 1st Place Hack Canada 2026.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  initialScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The same files the 3D text (troika) loads, so each font downloads once.
  preload("/soria-font.ttf", { as: "font", type: "font/ttf", crossOrigin: "anonymous" });
  preload("/Vercetti-Regular.woff", { as: "font", type: "font/woff", crossOrigin: "anonymous" });

  return (
    <html lang="en" className="overscroll-y-none bg-background" suppressHydrationWarning>
      <body
        className="font-sans antialiased"
      >
        <link rel="preconnect" href="https://t.sebastian.wiki" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sebastian Arellano-Rubach",
              url: "https://sebastian.wiki",
              jobTitle: "AI Researcher & Data Engineer",
              alumniOf: [
                { "@type": "CollegeOrUniversity", name: "University of Waterloo" },
                { "@type": "CollegeOrUniversity", name: "Wilfrid Laurier University" },
              ],
              knowsAbout: ["Artificial Intelligence", "Machine Learning", "LLMs", "Robotics", "Data Engineering"],
              award: "1st Place Hack Canada 2026",
              sameAs: [
                "https://github.com/SebA-R",
                "https://devpost.com/cookiekingcrusher",
              ],
            }),
          }}
        />
        <PHProvider>
          {children}
        </PHProvider>
      </body>
    </html>
  );
}
