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
    default: "Rodgers T. Momanyi — RTM-HD | Network Engineer · Google Data Center Technician III",
    template: "%s | RTM-HD",
  },
  description:
    "Network Engineer with 8+ years building resilient ISP, enterprise, and cloud networks. Data Center Technician III at Google, Hamina, Finland.",
  keywords: [
    "Rodgers Momanyi",
    "Rodgers T Momanyi",
    "RTM-HD",
    "Network Engineer Kenya",
    "Senior Network Engineer Nairobi",
    "Google Data Center Technician",
    "Google Noogler",
    "Google Hamina Finland",
    "Data Center Technician Finland",
    "Network Engineer Finland",
    "DWDM Engineer",
    "BGP Engineer",
    "MPLS Network",
    "ISP Network Engineer",
    "Vilcom Networks",
    "Juniper Networks Engineer",
    "Huawei Certified Engineer",
    "Azure Network Engineer",
    "Cybersecurity Kenya",
  ],
  authors: [{ name: "Rodgers T. Momanyi", url: "https://rtmhd.tech" }],
  creator: "Rodgers T. Momanyi",
  metadataBase: new URL("https://rtmhd.tech"),
  alternates: {
    canonical: "https://rtmhd.tech",
  },
  openGraph: {
    title: "Rodgers T. Momanyi — RTM-HD | Network Engineer · Google Data Center Technician III",
    description:
      "Network Engineer with 8+ years building resilient ISP, enterprise, and cloud networks. Data Center Technician III at Google Hamina, Finland.",
    url: "https://rtmhd.tech",
    siteName: "RTM-HD",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rodgers T. Momanyi — RTM-HD | Network Engineer · Google Data Center Technician III",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rodgers T. Momanyi — RTM-HD",
    description:
      "Network Engineer · Google Data Center Technician III · Hamina, Finland",
    creator: "@RTM_HD",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://rtmhd.tech/#person",
      "name": "Rodgers T. Momanyi",
      "alternateName": "RTM-HD",
      "url": "https://rtmhd.tech",
      "image": {
        "@type": "ImageObject",
        "url": "https://rtmhd.tech/rodgers.jpg",
        "width": 800,
        "height": 1000,
      },
      "jobTitle": "Data Center Technician III",
      "description": "Network Engineer with 8+ years delivering resilient ISP, enterprise, and cloud networks, and former lead of a 19-member multidisciplinary team. Data Center Technician III at Google's Hamina, Finland campus since July 2026.",
      "worksFor": {
        "@type": "Organization",
        "name": "Google",
        "url": "https://www.google.com",
      },
      "alumniOf": [
        { "@type": "Organization", "name": "Juniper Networks" },
        { "@type": "Organization", "name": "Huawei" },
        { "@type": "Organization", "name": "Microsoft Azure" },
        { "@type": "Organization", "name": "Google Cloud" },
      ],
      "knowsAbout": [
        "Network Engineering",
        "BGP Routing",
        "MPLS",
        "DWDM Optical Networks",
        "Cybersecurity",
        "ISP Infrastructure",
        "Data Center Operations",
        "Cloud Networking",
        "OSS BSS Systems",
        "SLA Management",
        "Network Automation",
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hamina",
        "addressCountry": "FI",
      },
      "sameAs": [
        "https://www.linkedin.com/in/rodgers-momanyi-40033866/",
        "https://www.youtube.com/@RTM-HD",
        "https://github.com/RTM-HD",
        "https://x.com/RTM_HD",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://rtmhd.tech/#website",
      "url": "https://rtmhd.tech",
      "name": "RTM-HD — Rodgers T. Momanyi",
      "description": "Portfolio of Rodgers T. Momanyi — Network Engineer & Google Data Center Technician III",
      "author": { "@id": "https://rtmhd.tech/#person" },
      "inLanguage": "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": "https://rtmhd.tech/#webpage",
      "url": "https://rtmhd.tech",
      "name": "Rodgers T. Momanyi — RTM-HD | Network Engineer · Google Data Center Technician III",
      "isPartOf": { "@id": "https://rtmhd.tech/#website" },
      "about": { "@id": "https://rtmhd.tech/#person" },
      "dateModified": new Date().toISOString(),
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://rtmhd.tech",
          },
        ],
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
