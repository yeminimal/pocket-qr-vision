import { Link } from "@tanstack/react-router";
import { footerColumns } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="w-full bg-brand text-brand-foreground">
      <div className="mx-auto max-w-[1280px] px-4 py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <Logo className="h-7 w-auto text-brand-foreground" />
            <p className="mt-4 text-sm leading-relaxed opacity-80">
              Scan QR codes from photos and check links for scams. Everything runs on your device.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="label-caps opacity-70">{column.title}</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.items.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="text-sm font-medium underline-offset-4 transition-opacity hover:underline hover:opacity-80"
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

        <div className="mt-14 flex flex-col gap-2 border-t border-brand-foreground/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs tracking-[0.02em] opacity-70">
            (c) {new Date().getFullYear()} Seeqr. Decoded on device.
          </p>
          <p className="font-mono text-xs tracking-[0.02em] opacity-70">
            no uploads. no accounts. no tracking pixels.
          </p>
        </div>
      </div>
    </footer>
  );
}
