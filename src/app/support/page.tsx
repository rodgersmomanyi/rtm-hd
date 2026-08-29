import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { support, anyRailConfigured } from "@/lib/support";

export const metadata: Metadata = {
  title: "Support the developer",
  description:
    "Sandglass and my other tools are free and independent. If they earn a place in your day, you can support their development here.",
};

/* Theme-aware rail: the glass tokens flip with html.dark, so the card reads
   on both the off-white and deep-blue backgrounds. flex-wrap lets the
   handle/sublabel drop under the rail name on narrow phones. */
const rail =
  "flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-xl glass px-6 py-5 transition-colors hover:bg-[var(--glass-bg-hover)] hover:border-brand-orange/40";

export default function SupportPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <section className="mx-auto max-w-2xl px-6 pt-28 pb-20">
        <p className="eyebrow text-brand-orange mb-3">Independent software</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-[var(--fg)] mb-6">
          Support the developer
        </h1>
        <p className="text-[var(--fg)] opacity-70 leading-relaxed mb-10">
          I build and maintain <Link href="/sandglass" className="underline underline-offset-4">Sandglass</Link>{" "}
          and my other tools in my own time, free, with no ads and no tracking.
          If one of them has earned a place in your day, a donation keeps the
          lights on for the next one. Thank you — genuinely.
        </p>

        <div className="space-y-4">
          {support.paypalUrl ? (
            <a className={rail} href={support.paypalUrl}
               target="_blank" rel="noopener noreferrer">
              <span className="font-semibold">PayPal</span>
              <span className="text-[var(--fg)] opacity-60">secure PayPal checkout</span>
            </a>
          ) : (
            <div className={`${rail} opacity-60 cursor-default`}>
              <span className="font-semibold">PayPal</span>
              <span className="text-[var(--fg)] opacity-60">coming online shortly</span>
            </div>
          )}

          {support.koFi && (
            <a className={rail} href={`https://ko-fi.com/${support.koFi}`}
               target="_blank" rel="noopener noreferrer">
              <span className="font-semibold">Ko-fi</span>
              <span className="text-[var(--fg)] opacity-60">ko-fi.com/{support.koFi}</span>
            </a>
          )}

          {support.buyMeACoffee && (
            <a className={rail} href={`https://buymeacoffee.com/${support.buyMeACoffee}`}
               target="_blank" rel="noopener noreferrer">
              <span className="font-semibold">Buy Me a Coffee</span>
              <span className="text-[var(--fg)] opacity-60">buymeacoffee.com/{support.buyMeACoffee}</span>
            </a>
          )}

          {support.githubSponsors && (
            <a className={rail} href={`https://github.com/sponsors/${support.githubSponsors}`}
               target="_blank" rel="noopener noreferrer">
              <span className="font-semibold">GitHub Sponsors</span>
              <span className="text-[var(--fg)] opacity-60">github.com/sponsors/{support.githubSponsors}</span>
            </a>
          )}

          {support.mpesa && (
            <div className={`${rail} cursor-default`}>
              <span className="font-semibold">M-Pesa</span>
              <span className="text-[var(--fg)] opacity-60">
                {support.mpesa.kind} {support.mpesa.number}
                {support.mpesa.account ? ` · a/c ${support.mpesa.account}` : ""}
              </span>
            </div>
          )}
        </div>

        {!anyRailConfigured() && (
          <p className="mt-8 text-sm text-[var(--fg)] opacity-50">
            Donation methods are being set up — check back soon, or just{" "}
            <Link href="/#contact" className="underline underline-offset-4">say hello</Link>{" "}
            instead; that counts too.
          </p>
        )}
      </section>
      <Footer />
    </main>
  );
}
