import { marqueeItems } from "@/lib/content";

export function Marquee() {
  return (
    <section
      aria-label="Nilai yang kami rawat"
      className="gloss-sheen border-b border-white/10 bg-[linear-gradient(135deg,#4c8a5b,#1f482d)] py-5 text-cream shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
    >
      <div className="marquee">
        <div className="marquee-track items-center">
          {[0, 1].map((group) => (
            <div
              key={group}
              aria-hidden={group === 1}
              className="flex shrink-0 items-center"
            >
              {marqueeItems.map((item) => (
                <span
                  key={`${group}-${item}`}
                  className="flex items-center gap-8 pr-8"
                >
                  <span className="font-sans text-[clamp(1.25rem,2vw,1.7rem)] leading-none tracking-[-0.015em] text-cream/90">
                    {item}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-matcha-light/70" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
