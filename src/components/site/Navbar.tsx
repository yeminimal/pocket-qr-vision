import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { primaryNav } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4"
      >
        <Link to="/" className="flex min-w-0 shrink-0 items-center" aria-label="Seeqr home">
          <Logo className="h-[20px] w-auto text-foreground" />
        </Link>


        <ul className="hidden items-center gap-8 lg:flex">
          {primaryNav.map((item) =>
            item.items ? (
              <li key={item.label} className="group relative">
                <button
                  type="button"
                  className="inline-flex items-center gap-0.5 text-sm font-medium tracking-[-0.01em] text-muted-foreground transition-colors hover:text-foreground"
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="invisible absolute left-0 top-full w-64 rounded-2xl border border-border bg-popover p-2 opacity-0 shadow-sm transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  {item.items.map((sub) => (
                    <Link
                      key={sub.to}
                      to={sub.to}
                      className="block rounded-xl px-3 py-2 hover:bg-accent"
                    >
                      <span className="block text-sm font-medium text-foreground">{sub.label}</span>
                      {sub.description && (
                        <span className="block text-xs text-muted-foreground">{sub.description}</span>
                      )}
                    </Link>
                  ))}
                </div>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  to={item.to!}
                  activeOptions={{ exact: item.to === "/" }}
                  className="inline-flex text-sm font-medium tracking-[-0.01em] text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/pricing"
            className="hidden items-center justify-center rounded-2xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Go premium
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-foreground hover:bg-accent lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </nav>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {primaryNav.map((item) => (
              <li key={item.label} className="border-b border-border/60 last:border-0">
                {item.items ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                      aria-expanded={openGroup === item.label}
                      className="flex w-full items-center justify-between py-3 text-sm font-medium"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${openGroup === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openGroup === item.label && (
                      <ul className="pb-2 pl-3">
                        {item.items.map((sub) => (
                          <li key={sub.to}>
                            <Link
                              to={sub.to}
                              onClick={() => setOpen(false)}
                              className="block py-2.5 text-sm text-muted-foreground"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.to!}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="py-3">
              <Link
                to="/app"
                onClick={() => setOpen(false)}
                className="flex h-11 items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-foreground"
              >
                Learn More
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
