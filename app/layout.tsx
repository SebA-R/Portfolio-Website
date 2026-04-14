import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from 'next/font/local';
import "./globals.css";

const soriaFont = localFont({
  src: "../public/soria-font.woff2",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sebastian.wiki"),
  title: "Sebastian Arellano-Rubach",
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
  return (
    <html lang="en" className="overscroll-y-none bg-background" suppressHydrationWarning>
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
      >
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7WD4HM3XRE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7WD4HM3XRE');
          `}
        </Script>
      </body>
    </html>
  );
}
