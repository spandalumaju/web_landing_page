"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ImagePlaceholder } from "@/components/site/image-placeholder";

export function ParallaxImage({
  src,
  alt,
  sizes,
  className = "",
  imageClassName = "image-soft object-cover",
  distance = 28,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  distance?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (!src) {
    return (
      <div ref={ref} className={`relative overflow-hidden ${className}`}>
        <ImagePlaceholder label={alt || "Dokumentasi sekolah"} />
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{
          y: reduce ? 0 : y,
          position: "absolute",
          inset: -distance,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={imageClassName}
        />
      </motion.div>
    </div>
  );
}
