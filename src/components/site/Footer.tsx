import { Link } from "@tanstack/react-router";
import { Github, Linkedin, QrCode, Twitter } from "lucide-react";
import { footerColumns } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <QrCode className="h-4 w-4" />
              </span>
              <span className="text-base font-semibold">Seeqr</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Scan QR codes from images. Works on every device.
            </p>
            <div className="mt-4 flex gap-2">
              {[
                { icon: Github, label: "GitHub", href: "https://github.com" },
                { icon: Twitter, label: "Twitter", href: "https://twitter.com/tryseeqr" },
                { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm font-semibold text-foreground">{col.title}</h2>
              <ul className="mt-3 space-y-2">
                {col.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Seeqr. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/support" className="hover:text-primary">
              Support
            </Link>
            <Link to="/features/privacy-first" className="hover:text-primary">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
