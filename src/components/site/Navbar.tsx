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
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <nav
          aria-label="Main"
          className="glass-panel mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-4 rounded-full px-3 sm:h-16 sm:px-5"
        >
          <Link to="/" className="flex min-w-0 shrink-0 items-center px-1" aria-label="Seeqr home">
            <Logo className="h-6 w-auto text-foreground lg:h-7" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) =>
              item.items ? (
                <li key={item.label} className="group relative">
                  <button
                    type="button"
                    className="inline-flex items-center gap-0.5 rounded-full px-4 py-2 text-sm font-light text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="glass-panel invisible absolute left-0 top-full mt-2 w-64 rounded-2xl p-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    {item.items.map((sub) => (
                      <Link
                        key={sub.to}
                        to={sub.to}
                        className="block rounded-xl px-3 py-2 transition-colors hover:bg-foreground/10"
                      >
                        <span className="block text-sm font-light text-foreground">
                          {sub.label}
                        </span>
                        {sub.description && (
                          <span className="block text-xs font-light text-muted-foreground">
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
                    className="inline-flex rounded-full px-4 py-2 text-sm font-light text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
                    activeProps={{ className: "bg-foreground/10 text-foreground" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <Link
              to="/pricing"
              className="hidden items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-light tracking-tight text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
            >
              Go premium
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/10 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="animate-in fade-in absolute inset-0 bg-background/60 backdrop-blur-sm duration-300"
          />
          <div
            role="dialog"
            aria-label="Site menu"
            className="glass-panel animate-in slide-in-from-left absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col overflow-y-auto rounded-r-3xl p-4 duration-300 ease-out sm:w-[60%]"
          >
            <div className="flex items-center justify-between">
              <Logo className="h-6 w-auto text-foreground" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ul className="mt-6 flex flex-col gap-1.5">
              {primaryNav.map((item) => (
                <li key={item.label}>
                  {item.items ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                        aria-expanded={openGroup === item.label}
                        className="flex min-h-12 w-full items-center justify-between rounded-full px-4 text-base font-light text-foreground transition-colors hover:bg-foreground/10"
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
                                className="flex min-h-12 items-center rounded-full px-4 text-[15px] font-light text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
                                activeProps={{
                                  className: "bg-foreground/10 text-foreground",
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
                      className="flex min-h-12 items-center rounded-full px-4 text-base font-light text-foreground transition-colors hover:bg-foreground/10"
                      activeProps={{ className: "bg-foreground/10" }}
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
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-4 text-[15px] font-light text-primary-foreground"
            >
              Go premium
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
