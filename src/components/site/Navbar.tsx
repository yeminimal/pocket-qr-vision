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
    <header className="nav-gradient sticky top-0 z-50 text-white">
      <nav
        aria-label="Main"
        className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-4 px-4"
      >
        <Link to="/" className="flex min-w-0 shrink-0 items-center" aria-label="Seeqr home">
          <Logo className="h-[22px] w-auto text-white" />
        </Link>

        <ul className="hidden items-center gap-10 lg:flex">
          {primaryNav.map((item) =>
            item.items ? (
              <li key={item.label} className="relative group">
                <button
                  type="button"
                  className="inline-flex items-center gap-0.5 text-sm font-semibold leading-6 text-white/90 transition-colors hover:text-white"
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="invisible absolute left-0 top-full w-64 rounded-xl border border-border bg-popover p-2 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  {item.items.map((sub) => (
                    <Link
                      key={sub.to}
                      to={sub.to}
                      className="block rounded-lg px-3 py-2 hover:bg-accent"
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
                  className="inline-flex text-sm font-semibold leading-6 text-white/90 transition-colors hover:text-white"
                  activeProps={{ className: "text-white" }}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/app"
            className="hidden items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold leading-6 text-[#29293A] shadow-[inset_0_0.5px_0_0_rgba(255,255,255,0.32),inset_0_-1.5px_0_0_rgba(255,255,255,0.32)] transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Learn More
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg-white/10 lg:hidden"
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
                className="flex h-11 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground"
              >
                Scan for free
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
