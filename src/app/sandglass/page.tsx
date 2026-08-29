import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

/* ── Release facts — read from the shipped APK, keep in sync with public/sandglass/ ── */
const APK = {
  version: "1.0.0",
  file: "sandglass-1.0.0.apk",
  href: "/sandglass/sandglass-1.0.0.apk",
  sizeLabel: "2.7 MB",
  sizeBytes: "2,805,820 bytes",
  sha256:
    "fe8dae0d6e97c4eaa7b582f2b69510c6b86d386270da41605ba44e3a7f1f6e89",
  minAndroid: "Android 8.0 or newer",
  signer: "CN=Rodgers Momanyi, OU=IT, O=RTM-HD",
};

export const metadata: Metadata = {
  title: "Sandglass",
  description:
    "Sandglass is a calendar-driven hourglass — a Chrome extension and a native Android app that pour the time until your next event through live falling sand.",
  alternates: {
    canonical: "https://rtmhd.tech/sandglass",
  },
  openGraph: {
    title: "Sandglass — a calendar-driven hourglass",
    description:
      "A Chrome extension and a native Android app that pour the time until your next event through live falling sand. Download the Android APK.",
    url: "https://rtmhd.tech/sandglass",
    siteName: "RTM-HD",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sandglass — a calendar-driven hourglass by RTM-HD",
      },
    ],
  },
};

const features: {
  tag: string;
  title: string;
  body: string;
}[] = [
  {
    tag: "App + Extension",
    title: "Live hourglass physics",
    body:
      "Simulated sand, not a progress bar. Grains pile, slide and settle in real time as your remaining minutes drain through the neck.",
  },
  {
    tag: "App + Extension",
    title: "Four countdown modes",
    body:
      "Next, Timer, Pomodoro and Workday — the glass drains toward your next event, a preset timer, a focus cycle, or the end of your working day.",
  },
  {
    tag: "Android",
    title: "Your device calendars",
    body:
      "Reads the calendars already on your phone via Android's CalendarContract — Google, Outlook, whatever syncs to the device.",
  },
  {
    tag: "Android",
    title: "ICS feeds",
    body:
      "Subscribe to any .ics calendar URL — public holiday feeds, team schedules, sports fixtures — and count down to those too.",
  },
  {
    tag: "Android",
    title: "Home-screen widget",
    body:
      "A glanceable widget keeps the hourglass and your next event on the home screen, without opening the app.",
  },
  {
    tag: "Extension",
    title: "Daily Bing wallpaper",
    body:
      "The Chrome extension turns every new tab into the hourglass, set against Bing's photo of the day.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sandglass",
  operatingSystem: "Android 8.0+",
  applicationCategory: "UtilitiesApplication",
  softwareVersion: APK.version,
  downloadUrl: `https://rtmhd.tech${APK.href}`,
  author: { "@type": "Person", name: "Rodgers T. Momanyi", url: "https://rtmhd.tech" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function SandglassPage() {
  return (
    <>
      <main className="min-h-screen bg-[var(--bg)] pt-28 pb-0 relative overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Background grid — same treatment as the hero */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Ambient orbs */}
        <div className="orb w-[480px] h-[480px] bg-brand-orange -top-24 -right-28 opacity-15 dark:opacity-20" />
        <div className="orb w-[380px] h-[380px] bg-brand-blue bottom-1/4 -left-24 opacity-10 dark:opacity-15" />

        <div className="relative z-10 mx-auto max-w-[1100px] px-6 md:px-10">
          {/* ── Header ── */}
          <div className="mb-10">
            <span className="eyebrow text-brand-orange block mb-4">
              Side Project · Android + Chrome
            </span>
            <h1
              className="font-display font-black text-[var(--fg)]"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
            >
              Your calendar,
              <br />
              <span className="text-brand-orange">as falling sand.</span>
            </h1>
          </div>

          <p
            className="text-[var(--fg)] opacity-70 max-w-2xl mb-12"
            style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
          >
            Sandglass is a calendar-driven hourglass — a Chrome new-tab extension and a
            native Android app. It looks at what&apos;s next on your schedule and pours the
            remaining time through a live hourglass, grain by grain, so you can see a
            meeting approaching instead of reading it off a clock.
          </p>

          {/* ── Calls to action ── */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <a
              href={APK.href}
              download
              data-cursor-arrow
              className="inline-flex items-center gap-2 bg-brand-orange text-white font-display font-bold px-7 py-3.5 rounded-full hover:bg-brand-orange/90 transition-colors duration-200"
              style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}
            >
              Download the Android APK
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3v12" />
                <path d="m7 10 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
            </a>

            <span
              className="inline-flex items-center gap-2 glass rounded-full text-[var(--fg)] font-display font-bold px-7 py-3.5 opacity-70 select-none"
              style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}
            >
              Chrome extension — coming to the Web Store
            </span>
          </div>

          <p className="eyebrow text-[var(--fg)] opacity-50 mb-3">
            v{APK.version} · {APK.sizeLabel} · {APK.minAndroid}
          </p>

          <p
            className="text-[var(--fg)] opacity-50 max-w-2xl mb-2"
            style={{ fontSize: "0.85rem", lineHeight: 1.6 }}
          >
            The APK is signed with my developer certificate. Android will warn you about
            installing apps from outside Google Play — that&apos;s expected until the Play
            listing is live.
          </p>
          <p
            className="text-[var(--fg)] opacity-50 max-w-2xl mb-2"
            style={{ fontSize: "0.85rem", lineHeight: 1.6 }}
          >
            Sandglass is free, with no ads and no tracking. If it earns a place in your
            day, you can{" "}
            <Link href="/support" className="underline underline-offset-4 opacity-90">
              support the developer
            </Link>
            .
          </p>
          <p
            className="text-[var(--fg)] opacity-50 max-w-2xl mb-16"
            style={{ fontSize: "0.85rem", lineHeight: 1.6 }}
          >
            The extension isn&apos;t on the Chrome Web Store yet, so there&apos;s no store
            link to give you — it&apos;s next in line.
          </p>

          {/* ── Features ── */}
          <div className="mb-16">
            <span className="eyebrow text-brand-orange block mb-6">
              What it does
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="border border-[var(--border)] rounded-2xl p-7 hover:border-brand-orange transition-colors duration-300"
                >
                  <span
                    className="inline-block px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange mb-4"
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {f.tag}
                  </span>
                  <h2
                    className="font-display font-bold text-[var(--fg)] mb-2"
                    style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}
                  >
                    {f.title}
                  </h2>
                  <p
                    className="text-[var(--fg)] opacity-60"
                    style={{ fontSize: "0.9rem", lineHeight: 1.6 }}
                  >
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Verify the download ── */}
          <div className="glass rounded-2xl p-7 md:p-8 mb-24">
            <span className="eyebrow text-brand-orange block mb-4">
              Verify your download
            </span>
            <dl
              className="grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-x-8 gap-y-2 font-mono text-[var(--fg)]"
              style={{ fontSize: "0.8rem", lineHeight: 1.7 }}
            >
              <dt className="opacity-50">File</dt>
              <dd className="break-all">{APK.file}</dd>
              <dt className="opacity-50">Version</dt>
              <dd>{APK.version}</dd>
              <dt className="opacity-50">Size</dt>
              <dd>
                {APK.sizeBytes} ({APK.sizeLabel})
              </dd>
              <dt className="opacity-50">SHA-256</dt>
              <dd className="break-all">{APK.sha256}</dd>
              <dt className="opacity-50">Signed by</dt>
              <dd className="break-all">{APK.signer}</dd>
            </dl>
            <p
              className="text-[var(--fg)] opacity-50 mt-4"
              style={{ fontSize: "0.8rem", lineHeight: 1.6 }}
            >
              Check it yourself: <code className="font-mono">certutil -hashfile {APK.file} SHA256</code> on
              Windows, or <code className="font-mono">sha256sum {APK.file}</code> on Linux/macOS. The digest
              must match the one above.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
