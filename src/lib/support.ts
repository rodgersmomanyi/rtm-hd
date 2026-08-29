/**
 * The single source of truth for every "Support the developer" surface.
 *
 * Each rail renders on /support ONLY when its value is non-null, so adding a
 * new method later is: fill the field, deploy. Nothing here processes money -
 * these are links to established processors, nothing more.
 *
 * PLACEHOLDER RULE: a null means "not configured yet" and the page says so
 * honestly. An invented handle must never ship - a donation link that pays a
 * stranger is worse than no link.
 */
export const support = {
  /** PayPal no-code checkout link, created in Rodgers's own PayPal dashboard.
   * Verified resolving 2026-08-29. Full URL, used verbatim. */
  paypalUrl: "https://www.paypal.com/ncp/payment/VTJVYK242GT78" as string | null,

  /** Optional rails - fill when the account actually exists. */
  koFi: null as string | null,          // ko-fi.com/<name>
  buyMeACoffee: null as string | null,  // buymeacoffee.com/<name>
  githubSponsors: null as string | null, // github.com/sponsors/<name>

  /**
   * M-Pesa, displayed as text for Kenyan supporters. PII-adjacent: ships only
   * if Rodgers explicitly supplies it. { kind: "till" | "paybill" | "phone",
   * number: string, account?: string }
   */
  mpesa: null as { kind: string; number: string; account?: string } | null,
};

export const anyRailConfigured = () =>
  Boolean(support.paypalUrl || support.koFi || support.buyMeACoffee ||
          support.githubSponsors || support.mpesa);
