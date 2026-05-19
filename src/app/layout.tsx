import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { Cursor } from "@/components/layout/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Nav } from "@/components/layout/Nav";
import { IntroOverlay } from "@/components/layout/IntroOverlay";
import { PodcastPlayerProvider } from "@/components/ui/PodcastPlayer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rodgers T. Momanyi — RTM-HD | Network Engineer · Incoming Noogler",
    template: "%s | RTM-HD",
  },
  description:
    "Senior Network Engineer with 8+ years building resilient ISP, enterprise, and cloud networks. Joining Google as Data Center Technician III at Hamina, Finland (July 2026).",
  keywords: [
    "Rodgers Momanyi",
    "RTM-HD",
    "Network Engineer",
    "Google Data Center",
    "DWDM",
    "BGP",
    "MPLS",
    "Nairobi",
    "Hamina Finland",
    "Vilcom Networks",
  ],
  authors: [{ name: "Rodgers T. Momanyi", url: "https://rtmhd.tech" }],
  creator: "Rodgers T. Momanyi",
  metadataBase: new URL("https://rtmhd.tech"),
  openGraph: {
    title: "Rodgers T. Momanyi — RTM-HD",
    description:
      "Senior Network Engineer · 8+ years · 99.99% uptime · Incoming Noogler at Google Hamina",
    url: "https://rtmhd.tech",
    siteName: "RTM-HD",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rodgers T. Momanyi — RTM-HD",
    description:
      "Senior Network Engineer · Incoming Google Data Center Technician III · Hamina, Finland",
    creator: "@RTM_HD",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${jetbrains.variable}`}
    >
      <body>
        <ThemeProvider>
          <LenisProvider>
            <PodcastPlayerProvider>
              <IntroOverlay />
              <ScrollProgress />
              <Cursor />
              <Nav />
              {children}
            </PodcastPlayerProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
