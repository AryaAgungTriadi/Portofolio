"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !window.IntersectionObserver) return;

    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        const siblings = Array.from(element.parentElement?.children ?? []).filter((child) => child.matches("article, figure"));
        const delay = Math.max(0, siblings.indexOf(element) % 2) * 90;
        const animation = element.animate([
          { opacity: 0, transform: "translateY(20px)", filter: "blur(3px)" },
          { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
        ], { duration: 600, delay, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" });
        animations.add(animation);
        animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
      }
    }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });

    // Animate headings and cards separately so long sections stay readable.
    const targets = document.querySelectorAll<HTMLElement>(
      "#home > div > div, #home figure, #about > div, #skills > div > p, #skills > div > h2, #skills > div > div, #projects > div > p, #projects > div > div:first-of-type, #projects article, #achievements > div > p, #achievements > div > h2, #achievements article, #achievements figure, #certificates > div > p, #certificates > div > h2, #certificates article, #contact > div"
    );
    for (const target of targets) observer.observe(target);
    const stop = () => {
      if (!preference.matches) return;
      observer.disconnect();
      for (const animation of animations) animation.cancel();
      animations.clear();
    };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", stop);
      for (const animation of animations) animation.cancel();
    };
  }, []);

  return null;
}