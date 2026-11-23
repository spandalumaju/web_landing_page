"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

import { SchoolMark } from "@/components/site/school-mark";

type Phase = "loading" | "revealing" | "done";

export function PageIntro({ photos }: { photos: { src: string; alt: string }[] }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const root = document.documentElement;
    const alreadySeen =
      root.classList.contains("intro-seen") ||
      window.sessionStorage.getItem("smpn-intro-seen") === "1";

    if (reduce || alreadySeen) {
      root.classList.remove("intro-active");
      const skipTimer = window.setTimeout(() => setPhase("done"), 0);
      return () => window.clearTimeout(skipTimer);
    }

    root.classList.add("intro-active");
    const revealTimer = window.setTimeout(() => setPhase("revealing"), 1550);
    const doneTimer = window.setTimeout(() => {
      setPhase("done");
      root.classList.remove("intro-active");
      try {
        window.sessionStorage.setItem("smpn-intro-seen", "1");
      } catch {
        // Storage can be unavailable in private contexts; the intro still works.
      }
    }, 2800);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(doneTimer);
      root.classList.remove("intro-active");
    };
  }, [reduce]);

  if (phase === "done") {
    return null;
  }

  return (
    <div id="page-intro" data-phase={phase} aria-hidden="true">
      {photos.length > 0 && (
        <div className="intro-collage">
          {photos.map((photo, index) => (
            <div key={photo.src} className="intro-photo">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={index < 2}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
      <div className="intro-wash" />
      <div className="intro-content">
        <div className="intro-mark">
          <SchoolMark className="h-10 w-10 text-matcha-light" />
          <p className="intro-place">SMP Negeri 2 Ambulu</p>
          <p className="intro-word">
            SMPN 2<span className="text-matcha-light">.</span>
          </p>
          <p className="intro-accent">Sekolah untuk bertanya, mencoba, dan bertumbuh.</p>
          <p className="intro-place">Sabrang · Ambulu</p>
        </div>
        <div className="intro-line">
          <span />
        </div>
      </div>
    </div>
  );
}
