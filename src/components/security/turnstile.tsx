"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          action?: string;
          theme?: "auto" | "light" | "dark";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      remove: (widget: string | HTMLElement) => void;
    };
  }
}

export function Turnstile({
  siteKey,
  action = "submit",
  className = "",
}: {
  siteKey?: string;
  action?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string | null>(null);

  useEffect(() => {
    if (!siteKey) {
      return;
    }

    let cancelled = false;

    const render = () => {
      if (cancelled || !containerRef.current || !window.turnstile) {
        return;
      }
      if (containerRef.current.childElementCount > 0) {
        return;
      }
      widgetRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action,
        theme: "light",
        callback: () => undefined,
        "expired-callback": () => undefined,
        "error-callback": () => undefined,
      });
    };

    if (window.turnstile) {
      render();
    } else {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[data-turnstile="1"]',
      );
      if (existing) {
        existing.addEventListener("load", render, { once: true });
      } else {
        const script = document.createElement("script");
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.dataset.turnstile = "1";
        script.addEventListener("load", render, { once: true });
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      if (widgetRef.current && window.turnstile) {
        window.turnstile.remove(widgetRef.current);
      }
      widgetRef.current = null;
    };
  }, [action, siteKey]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className={className}>
      <div ref={containerRef} />
    </div>
  );
}
