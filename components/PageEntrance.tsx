"use client";

import { useEffect, useRef } from "react";

export default function PageEntrance() {
  const curtain = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = curtain.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;
    let animation: Animation | undefined;
    let timer: ReturnType<typeof setTimeout>;
    const skip = () => { if (preference.matches) { animation?.cancel(); element.hidden = true; } };
    preference.addEventListener("change", skip);
    if (preference.matches) element.hidden = true;
    else {
      // Wait for hydration, fonts and page assets, with a bound for slow connections.
      const loaded = document.readyState === "complete" ? Promise.resolve() : new Promise<void>(resolve => window.addEventListener("load", () => resolve(), { once: true }));
      const bounded = new Promise<void>(resolve => { timer = setTimeout(resolve, 2200); });
      void Promise.race([Promise.all([loaded, document.fonts.ready]), bounded]).then(() => {
        if (cancelled || preference.matches) return;
        clearTimeout(timer);
        requestAnimationFrame(() => {
          if (cancelled) return;
          animation = element.animate([
            { opacity: 1, filter: "blur(0px)", offset: 0 },
            { opacity: 1, filter: "blur(0px)", offset: 0.3 },
            { opacity: 0, filter: "blur(6px)", offset: 1 },
          ], { duration: 1800, easing: "ease-in-out", fill: "forwards" });
          animation.finished.then(() => { element.hidden = true; }, () => {});
        });
      });
    }
    return () => { cancelled = true; clearTimeout(timer); animation?.cancel(); preference.removeEventListener("change", skip); };
  }, []);
  return <div ref={curtain} aria-hidden="true" className="page-entrance pointer-events-none fixed inset-0 z-[110] flex items-center justify-center bg-background"><span className="text-5xl font-bold tracking-tight sm:text-6xl">arya<span className="text-accent">.</span></span></div>;
}
