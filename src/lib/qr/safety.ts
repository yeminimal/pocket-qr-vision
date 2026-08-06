/**
 * Heuristic URL safety analysis. Runs entirely on device: no network calls,
 * no uploads. Results are cached for 24 hours in localStorage.
 */

export type ThreatLevel = "safe" | "suspicious" | "malicious";

export interface SafetyReport {
  url: string;
  level: ThreatLevel;
  headline: string;
  signals: string[];
  host: string | null;
  checkedAt: number;
}

const CACHE_KEY = "seeqr-url-safety-v1";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const SHORTENERS = [
  "bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd", "buff.ly",
  "cutt.ly", "rebrand.ly", "shorturl.at", "rb.gy", "t.ly", "s.id", "lnkd.in",
];

const RISKY_TLDS = [
  "zip", "mov", "xyz", "top", "tk", "ml", "ga", "cf", "gq", "work", "click",
  "loan", "rest", "quest", "cam", "surf", "monster", "date", "country",
];

const SENSITIVE_WORDS = [
  "login", "signin", "verify", "verification", "secure", "account", "update",
  "billing", "invoice", "wallet", "seed", "recover", "password", "bank",
  "confirm", "refund", "gift", "prize", "claim", "airdrop", "otp",
];

const IMPERSONATED_BRANDS = [
  "paypal", "apple", "icloud", "microsoft", "office365", "netflix", "amazon",
  "google", "facebook", "instagram", "whatsapp", "binance", "coinbase",
  "metamask", "dhl", "fedex", "usps", "revolut", "chase", "hmrc", "irs",
];

const IPV4 = /^\d{1,3}(\.\d{1,3}){3}$/;

function readCache(): Record<string, SafetyReport> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, SafetyReport>;
  } catch {
    return {};
  }
}

function writeCache(map: Record<string, SafetyReport>) {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(map));
  } catch {
    // storage unavailable: analysis still works, just uncached
  }
}

function getCached(url: string): SafetyReport | null {
  const entry = readCache()[url];
  if (!entry) return null;
  if (Date.now() - entry.checkedAt > CACHE_TTL_MS) return null;
  return entry;
}

function setCached(report: SafetyReport) {
  const map = readCache();
  map[report.url] = report;
  writeCache(map);
}

function registrableDomain(host: string): string {
  const parts = host.split(".");
  return parts.slice(-2).join(".");
}

function analyze(rawUrl: string): SafetyReport {
  const value = rawUrl.trim();
  const signals: string[] = [];
  let level: ThreatLevel = "safe";
  const bump = (next: ThreatLevel) => {
    const order: ThreatLevel[] = ["safe", "suspicious", "malicious"];
    if (order.indexOf(next) > order.indexOf(level)) level = next;
  };

  let parsed: URL | null = null;
  try {
    parsed = new URL(value.includes("://") ? value : `https://${value}`);
  } catch {
    parsed = null;
  }

  if (!parsed) {
    return {
      url: value,
      level: "suspicious",
      headline: "Not a valid web address",
      signals: ["This text is not a link that a browser can open."],
      host: null,
      checkedAt: Date.now(),
    };
  }

  const host = parsed.hostname.toLowerCase();
  const domain = registrableDomain(host);
  const tld = host.split(".").pop() ?? "";
  const path = `${parsed.pathname}${parsed.search}`.toLowerCase();

  if (parsed.protocol === "http:") {
    signals.push("Uses plain HTTP, so traffic is not encrypted.");
    bump("suspicious");
  }
  if (!["http:", "https:"].includes(parsed.protocol)) {
    signals.push(`Unusual scheme "${parsed.protocol.replace(":", "")}" instead of https.`);
    bump("suspicious");
  }
  if (host.startsWith("xn--") || host.includes(".xn--")) {
    signals.push("Punycode domain: characters may imitate a familiar brand.");
    bump("malicious");
  }
  if (IPV4.test(host)) {
    signals.push("Points at a raw IP address instead of a domain name.");
    bump("malicious");
  }
  if (parsed.username || parsed.password) {
    signals.push("Embeds credentials in the link, a common cloaking trick.");
    bump("malicious");
  }
  if (parsed.port && !["", "80", "443"].includes(parsed.port)) {
    signals.push(`Non standard port ${parsed.port}.`);
    bump("suspicious");
  }
  if (SHORTENERS.includes(domain)) {
    signals.push("Shortened link: the real destination is hidden.");
    bump("suspicious");
  }
  if (RISKY_TLDS.includes(tld)) {
    signals.push(`The .${tld} domain ending is heavily abused by scam campaigns.`);
    bump("suspicious");
  }
  if (host.split(".").length > 4) {
    signals.push("Long subdomain chain, often used to hide the real domain.");
    bump("suspicious");
  }
  const impersonated = IMPERSONATED_BRANDS.find(
    (brand) => host.includes(brand) && !domain.startsWith(`${brand}.`),
  );
  if (impersonated) {
    signals.push(`Mentions "${impersonated}" but is not that brand's own domain.`);
    bump("malicious");
  }
  const sensitive = SENSITIVE_WORDS.filter((word) => path.includes(word) || host.includes(word));
  if (sensitive.length) {
    signals.push(`Contains sensitive keywords: ${sensitive.slice(0, 3).join(", ")}.`);
    bump(sensitive.length > 1 ? "malicious" : "suspicious");
  }
  if (/%[0-9a-f]{2}%[0-9a-f]{2}/i.test(path)) {
    signals.push("Heavily encoded path, which can disguise a redirect.");
    bump("suspicious");
  }
  if (value.length > 200) {
    signals.push("Unusually long link.");
    bump("suspicious");
  }
  if (host.split("-").length > 3) {
    signals.push("Many hyphens in the host name, typical of throwaway domains.");
    bump("suspicious");
  }

  const headline =
    level === "safe"
      ? "No risk signals found"
      : level === "suspicious"
        ? "Suspicious, use caution"
        : "Likely phishing or malware";

  if (!signals.length) {
    signals.push("HTTPS, plain domain, no phishing patterns in the address.");
  }

  return { url: value, level, headline, signals, host, checkedAt: Date.now() };
}

/** Analyzes a URL, using the 24 hour cache when available. */
export async function checkUrlSafety(url: string): Promise<SafetyReport> {
  const cached = getCached(url.trim());
  if (cached) return cached;
  // Small delay keeps the UI honest about doing work without blocking input.
  await new Promise((resolve) => setTimeout(resolve, 220));
  const report = analyze(url);
  setCached(report);
  return report;
}

export function threatCopy(level: ThreatLevel): { label: string; note: string } {
  if (level === "safe") return { label: "Safe to open", note: "Nothing suspicious in this address." };
  if (level === "suspicious") return { label: "Use caution", note: "Check the destination before you tap." };
  return { label: "Do not open", note: "This link looks like phishing or malware." };
}
