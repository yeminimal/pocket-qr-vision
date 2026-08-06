import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { primaryNav } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4"
      >
        <Link to="/" className="flex min-w-0 shrink-0 items-center" aria-label="Seeqr home">
          <Logo className="h-6 w-auto text-primary lg:h-7" />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {primaryNav.map((item) =>
            item.items ? (
              <li key={item.label} className="group relative">
                <button
                  type="button"
                  className="inline-flex items-center gap-0.5 text-sm font-medium tracking-[-0.01em] text-muted-foreground transition-colors hover:text-primary"
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
                        <span className="block text-xs text-muted-foreground">
                          {sub.description}
                        </span>
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
                  className="inline-flex text-sm font-medium tracking-[-0.01em] text-muted-foreground transition-colors hover:text-primary"
                  activeProps={{ className: "text-primary" }}
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
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-label="Open menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-foreground hover:bg-accent lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="animate-in fade-in absolute inset-0 bg-background/70 backdrop-blur-sm duration-300"
          />
          <div
            role="dialog"
            aria-label="Site menu"
            className="animate-in slide-in-from-left absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col overflow-y-auto border-r border-border bg-card p-4 duration-300 ease-out sm:w-[60%]"
          >
            <div className="flex items-center justify-between">
              <Logo className="h-6 w-auto text-primary" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-foreground hover:bg-accent"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <ul className="mt-6 flex flex-col gap-2">
              {primaryNav.map((item) => (
                <li key={item.label}>
                  {item.items ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                        aria-expanded={openGroup === item.label}
                        className="flex min-h-12 w-full items-center justify-between rounded-xl px-4 text-base font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${openGroup === item.label ? "rotate-180" : ""}`}
                        />
                      </button>
                      {openGroup === item.label && (
                        <ul className="animate-in fade-in mt-1 flex flex-col gap-1 pl-3 duration-200">
                          {item.items.map((sub) => (
                            <li key={sub.to}>
                              <Link
                                to={sub.to}
                                onClick={() => setOpen(false)}
                                className="flex min-h-12 items-center rounded-xl px-4 text-[15px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                activeProps={{
                                  className: "border-l-4 border-primary bg-muted text-foreground",
                                }}
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
                      activeOptions={{ exact: item.to === "/" }}
                      className="flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-foreground transition-colors hover:bg-muted"
                      activeProps={{ className: "border-l-4 border-primary bg-muted" }}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <Link
              to="/pricing"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-primary px-4 text-[15px] font-medium text-primary-foreground"
            >
              Go premium
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
