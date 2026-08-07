import { Link } from "@tanstack/react-router";
import { Sections, type Section } from "./Sections";

export type ContentPage = {
  h1: string;
  intro: string;
  eyebrow?: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
  sections: Section[];
};

export function PageShell({ page }: { page: ContentPage }) {
  return (
    <main>
      <div className="border-b border-border bg-primary-soft">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          {page.eyebrow && (
            <p className="mb-3 text-xs font-light uppercase tracking-wide text-primary">
              {page.eyebrow}
            </p>
          )}
          <h1 className="max-w-3xl text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {page.intro}
          </p>
          {(page.primary || page.secondary) && (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {page.primary && (
                <Link
                  to={page.primary.to}
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-sm font-light text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {page.primary.label}
                </Link>
              )}
              {page.secondary && (
                <Link
                  to={page.secondary.to}
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-primary px-6 text-sm font-light text-primary transition-colors hover:bg-background"
                >
                  {page.secondary.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <Sections sections={page.sections} />
    </main>
  );
}
