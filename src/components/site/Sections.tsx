import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Bolt,
  Check,
  ChevronDown,
  Clock,
  CreditCard,
  DeviceMobileIcon,
  FileText,
  Lock,
  Package,
  ShieldCheck,
  Ticket,
  TrendingUp,
  Upload,
  X,
  type LucideIcon,
} from "lucide-react";

// lucide has no DeviceMobileIcon export; alias below keeps the map explicit.
type IconName = keyof typeof icons;

const icons = {
  upload: Upload,
  bolt: Bolt,
  shield: ShieldCheck,
  lock: Lock,
  clock: Clock,
  chart: TrendingUp,
  card: CreditCard,
  document: FileText,
  package: Package,
  ticket: Ticket,
  check: Check,
} satisfies Record<string, LucideIcon>;

export type Section =
  | { type: "prose"; heading?: string; sub?: string; paragraphs: string[] }
  | {
      type: "cards";
      heading?: string;
      sub?: string;
      cols?: 2 | 3 | 4;
      items: { icon?: IconName; title: string; body: string; to?: string }[];
    }
  | { type: "stats"; items: { icon?: IconName; value: string; label: string }[] }
  | { type: "steps"; heading?: string; sub?: string; items: { title: string; body: string }[] }
  | { type: "list"; heading?: string; sub?: string; items: string[] }
  | { type: "table"; heading?: string; sub?: string; columns: string[]; rows: string[][] }
  | { type: "faq"; heading?: string; sub?: string; items: { q: string; a: string }[] }
  | { type: "code"; heading?: string; sub?: string; code: string }
  | {
      type: "pricing";
      heading?: string;
      sub?: string;
      tiers: { name: string; price: string; note?: string; features: string[]; cta: { label: string; to: string }; featured?: boolean }[];
    }
  | {
      type: "cta";
      heading: string;
      sub?: string;
      primary: { label: string; to: string };
      secondary?: { label: string; to: string };
    };

function Icon({ name, className = "h-6 w-6" }: { name?: IconName; className?: string }) {
  if (!name) return null;
  const Cmp = icons[name];
  return <Cmp className={className} aria-hidden="true" />;
}

function Heading({ heading, sub }: { heading?: string; sub?: string }) {
  if (!heading && !sub) return null;
  return (
    <div className="mb-8 max-w-2xl">
      {heading && (
        <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{heading}</h2>
      )}
      {sub && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Sections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section, i) => (
        <section key={i} className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <SectionBody section={section} />
        </section>
      ))}
    </>
  );
}

function SectionBody({ section }: { section: Section }) {
  switch (section.type) {
    case "prose":
      return (
        <div>
          <Heading heading={section.heading} sub={section.sub} />
          <div className="max-w-2xl space-y-4">
            {section.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </div>
      );

    case "stats":
      return (
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {section.items.map((s) => (
            <li key={s.label} className="rounded-xl bg-primary-soft p-5">
              <Icon name={s.icon} className="h-5 w-5 text-primary" />
              <p className="mt-3 text-2xl font-semibold tracking-tight">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </li>
          ))}
        </ul>
      );

    case "cards": {
      const cols =
        section.cols === 4
          ? "sm:grid-cols-2 lg:grid-cols-4"
          : section.cols === 2
            ? "sm:grid-cols-2"
            : "sm:grid-cols-2 lg:grid-cols-3";
      return (
        <div>
          <Heading heading={section.heading} sub={section.sub} />
          <ul className={`grid gap-4 ${cols}`}>
            {section.items.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <Icon name={item.icon} className="h-6 w-6 text-primary" />
                <h3 className="mt-3 text-base font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                {item.to && (
                  <Link
                    to={item.to}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    case "steps":
      return (
        <div>
          <Heading heading={section.heading} sub={section.sub} />
          <ol className="grid gap-4 sm:grid-cols-3">
            {section.items.map((s, i) => (
              <li key={s.title} className="rounded-xl border border-border bg-card p-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-medium">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      );

    case "list":
      return (
        <div>
          <Heading heading={section.heading} sub={section.sub} />
          <ul className="max-w-2xl space-y-3">
            {section.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "table":
      return (
        <div>
          <Heading heading={section.heading} sub={section.sub} />
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-xl border border-border sm:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted">
                <tr>
                  {section.columns.map((c) => (
                    <th key={c} scope="col" className="px-4 py-3 font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, i) => (
                  <tr key={i} className="border-t border-border">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={j === 0 ? "px-4 py-3 font-medium" : "px-4 py-3 text-muted-foreground"}
                      >
                        <Cell value={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <ul className="space-y-3 sm:hidden">
            {section.rows.map((row, i) => (
              <li key={i} className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-medium">{row[0]}</p>
                <dl className="mt-2 space-y-1">
                  {row.slice(1).map((cell, j) => (
                    <div key={j} className="flex justify-between gap-3 text-sm">
                      <dt className="text-muted-foreground">{section.columns[j + 1]}</dt>
                      <dd>
                        <Cell value={cell} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </div>
      );

    case "faq":
      return (
        <div>
          <Heading heading={section.heading} sub={section.sub} />
          <ul className="max-w-3xl space-y-3">
            {section.items.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </ul>
        </div>
      );

    case "code":
      return (
        <div>
          <Heading heading={section.heading} sub={section.sub} />
          <pre className="overflow-x-auto rounded-xl border border-border bg-muted p-4 text-xs leading-relaxed">
            <code>{section.code}</code>
          </pre>
        </div>
      );

    case "pricing":
      return (
        <div>
          <Heading heading={section.heading} sub={section.sub} />
          <ul className="grid gap-4 lg:grid-cols-3">
            {section.tiers.map((tier) => (
              <li
                key={tier.name}
                className={`flex flex-col rounded-xl border bg-card p-6 ${
                  tier.featured ? "border-primary shadow-md" : "border-border"
                }`}
              >
                <h3 className="text-base font-medium">{tier.name}</h3>
                <p className="mt-2 text-3xl font-semibold tracking-tight">{tier.price}</p>
                {tier.note && <p className="mt-1 text-sm text-muted-foreground">{tier.note}</p>}
                <ul className="mt-5 flex-1 space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={tier.cta.to}
                  className={`mt-6 flex h-11 items-center justify-center rounded-lg px-6 text-sm font-medium transition-colors ${
                    tier.featured
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "border border-primary text-primary hover:bg-primary-soft"
                  }`}
                >
                  {tier.cta.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );

    case "cta":
      return (
        <div className="rounded-2xl bg-primary-soft px-6 py-12 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{section.heading}</h2>
          {section.sub && <p className="mt-3 text-base text-muted-foreground">{section.sub}</p>}
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to={section.primary.to}
              className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
            >
              {section.primary.label}
            </Link>
            {section.secondary && (
              <Link
                to={section.secondary.to}
                className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-primary px-6 text-sm font-medium text-primary transition-colors hover:bg-background sm:w-auto"
              >
                {section.secondary.label}
              </Link>
            )}
          </div>
        </div>
      );
  }
}

function Cell({ value }: { value: string }) {
  if (value === "yes") return <Check className="h-4 w-4 text-primary" aria-label="Yes" />;
  if (value === "no") return <X className="h-4 w-4 text-destructive" aria-label="No" />;
  return <>{value}</>;
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="rounded-xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium"
      >
        {q}
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">{a}</p>}
    </li>
  );
}
