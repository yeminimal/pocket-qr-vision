import { Link } from "@tanstack/react-router";
import heroPreview from "@/assets/hero-app-preview.png";

export function Hero({
  title = (
    <>
      Got a QR code in a photo?
      <br className="hidden sm:block" /> We&rsquo;ll scan it for you.
    </>
  ),
  sub = "Upload any photo from your gallery. Seeqr reads the code and gives you the link in seconds, no app, no camera, no Google.",
  ctaLabel = "Upload Photo",
  ctaTo = "/app",
}: {
  title?: React.ReactNode;
  sub?: string;
  ctaLabel?: string;
  ctaTo?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-[1192px] px-4 pb-0 pt-16 sm:pt-24">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-6">
              <h1 className="font-display text-center text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-[5.25rem] lg:tracking-[-0.06em]">
                {title}
              </h1>
              <p className="max-w-3xl text-center text-base leading-relaxed text-muted-foreground sm:text-xl sm:leading-[1.75]">
                {sub}
              </p>
            </div>
            <Link
              to={ctaTo}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3 text-base font-semibold tracking-[-0.2px] text-brand-foreground shadow-[inset_0_0.5px_0_0_rgba(255,255,255,0.32),inset_0_-1.5px_0_0_rgba(255,255,255,0.32)] transition-transform hover:scale-[1.02]"
            >
              {ctaLabel}
            </Link>
          </div>
          <p className="text-center text-sm tracking-[-0.14px] text-muted-foreground/70">
            Your image is processed in your browser and is not sent to our servers.
          </p>
        </div>

        {/* Browser window preview */}
        <div className="mx-auto mt-16 max-w-[531px] px-2 sm:mt-20">
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_6px_59px_0_rgba(0,0,0,0.08)]">
            <div className="relative flex h-[42px] items-center bg-[#313131] px-5">
              <div className="flex items-center gap-[5px]">
                <span className="h-3 w-3 rounded-full bg-[#09FF00] opacity-50" />
                <span className="h-3 w-3 rounded-full bg-[#FBFF00] opacity-50" />
                <span className="h-3 w-3 rounded-full bg-[#FF0000] opacity-50" />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2 text-[15px] tracking-[-0.384px] text-[#D1D5DB]">
                www.seeqr.io
              </span>
            </div>
            <img
              src={heroPreview}
              alt="Seeqr scanner interface decoding a QR code from an uploaded image"
              width={665}
              height={368}
              loading="eager"
              className="block w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
