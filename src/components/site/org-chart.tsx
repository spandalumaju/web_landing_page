import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { orgChart } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

function Connector({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-2" aria-hidden="true">
      <span className="h-7 w-px bg-matcha/35" />
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-matcha/35 bg-cream text-matcha-deep">
        <ArrowDown size={13} strokeWidth={1.8} />
      </span>
      <span className="h-3 w-px bg-matcha/35" />
      {label && (
        <span className="mt-1 eyebrow text-[11px] text-muted">{label}</span>
      )}
    </div>
  );
}

function PersonCard({
  role,
  name,
  photo,
  emphasis = false,
}: {
  role: string;
  name: string;
  photo: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex w-full items-center gap-4 rounded-[22px] border p-4 shadow-[0_12px_32px_rgba(24,56,35,0.06)] ${
        emphasis
          ? "border-white/70 bg-[linear-gradient(145deg,#ffffff,#eef7e7)]"
          : "border-white/70 bg-white/90"
      }`}
    >
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-matcha-mist">
        {photo ? (
          <Image
            src={photo}
            alt={`Foto ${name}`}
            fill
            sizes="56px"
            className="grayscale object-cover"
          />
        ) : (
          <span className="font-display text-sm font-semibold text-matcha-deep/75">
            {name
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase()}
          </span>
        )}
      </div>
      <div>
        <p className="eyebrow text-[11px] text-matcha-deep">{role}</p>
        <h3 className="mt-1 font-display text-[15px] font-semibold leading-snug tracking-[-0.015em] text-ink">
          {name}
        </h3>
      </div>
    </div>
  );
}

function UnitCard({
  title,
  description,
  members,
}: {
  title: string;
  description: string;
  members: string[];
}) {
  return (
    <div className="rounded-[20px] border border-white/70 bg-[linear-gradient(145deg,#ffffff,#f6fbf2)] p-5 shadow-[0_10px_28px_rgba(24,56,35,0.05)]">
      <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-ink">
        {title}
      </h3>
      <p className="mt-2 text-[12px] leading-relaxed text-muted">
        {description}
      </p>
      <ul className="mt-4 space-y-2 border-t border-line pt-3">
        {members.map((member) => (
          <li key={member} className="flex items-baseline gap-2">
            <span className="h-1 w-1 shrink-0 rounded-full bg-matcha" />
            <span className="text-[11px] text-ink-soft">{member}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OrgChart() {
  const [waka, admin] = orgChart.branches;

  return (
    <div className="mt-12">
      <Reveal>
        <div className="mx-auto max-w-md">
          <PersonCard
            role={orgChart.head.role}
            name={orgChart.head.name}
            photo={orgChart.head.photo}
            emphasis
          />
        </div>
      </Reveal>

      <Connector />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
        <Reveal delay={0.06}>
          <div className="flex h-full flex-col items-center">
            <div className="w-full max-w-md">
              <PersonCard
                role={waka.role}
                name={waka.name}
                photo={waka.photo}
                emphasis
              />
            </div>

            <Connector />

            <div className="grid w-full gap-3 sm:grid-cols-2">
              {waka.units.map((unit) => (
                <UnitCard
                  key={unit.title}
                  title={unit.title}
                  description={unit.description}
                  members={unit.members}
                />
              ))}
            </div>

          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="flex h-full flex-col items-center">
            <div className="w-full max-w-md">
              <PersonCard
                role={admin.role}
                name={admin.name}
                photo={admin.photo}
                emphasis
              />
            </div>

            <Connector />

            <div className="grid w-full gap-3">
              {admin.units.map((unit) => (
                <UnitCard
                  key={unit.title}
                  title={unit.title}
                  description={unit.description}
                  members={unit.members}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Connector label="Dewan guru" />

      <Reveal delay={0.18}>
        <div className="gloss-sheen flex flex-col gap-5 rounded-[24px] bg-[linear-gradient(135deg,#4c8a5b,#1f482d)] p-6 text-cream shadow-[0_22px_50px_rgba(24,56,35,0.16)] sm:p-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow text-[11px] text-matcha-light/80">
              Di bawah koordinasi kurikulum
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold leading-tight tracking-[-0.02em]">
              Dewan Guru
            </h3>
            <p className="mt-2 max-w-[44ch] text-[12px] leading-relaxed text-cream/70">
              Guru mata pelajaran dan wali kelas yang menjalankan pembelajaran
              sehari-hari.
            </p>
          </div>
          <a
            href="#direktori"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-cream/25 px-4 py-2.5 eyebrow text-[11px] text-matcha-light transition-colors hover:border-cream hover:text-cream"
          >
            Lihat kartu pendidik
            <ArrowUpRight size={12} className="link-arrow" aria-hidden="true" />
          </a>
        </div>
      </Reveal>

      <p className="mt-12 rounded-[16px] border border-line bg-cream px-4 py-3 text-center text-[11px] text-muted">
        Struktur organisasi pada pratinjau ini adalah contoh. Susunan final
        mengikuti data resmi sekolah.
      </p>
    </div>
  );
}
