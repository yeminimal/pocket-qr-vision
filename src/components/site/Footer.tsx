import { Link } from "@tanstack/react-router";
import { footerColumns } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="w-full px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="glass-panel mx-auto max-w-[1280px] rounded-3xl px-6 py-14 sm:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <Logo className="h-7 w-auto text-foreground" />
            <p className="glass-body mt-4 text-sm">
              Scan QR codes from photos and check links for scams. Everything runs on your device.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="label-caps text-muted-foreground">{column.title}</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.items.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="text-sm font-light text-foreground/90 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs tracking-[0.02em] text-muted-foreground">
            (c) {new Date().getFullYear()} Seeqr. Decoded on device.
          </p>
          <p className="font-mono text-xs tracking-[0.02em] text-muted-foreground">
            no uploads. no accounts. no tracking pixels.
          </p>
        </div>
      </div>
    </footer>
  );
}
