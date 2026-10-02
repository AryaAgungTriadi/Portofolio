"use client";

import { useSyncExternalStore, useCallback } from "react";
import { translations } from "./translations";

function applyLanguage(language: "id" | "en") {
  document.documentElement.lang = language;
  document.documentElement.dataset.language = language;
}
let transitioning = false;
async function changeLanguage(next: "id" | "en") {
  if (transitioning) return;
  transitioning = true;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
  const animations: Animation[] = [];
  try {
    if (!reduced) {
      for (const target of targets) animations.push(target.animate([
        { opacity: 1, filter: "blur(0px)" },
        { opacity: 0.15, filter: "blur(3px)" },
      ], { duration: 180, easing: "ease-in", fill: "forwards" }));
      await Promise.all(animations.map(animation => animation.finished.catch(() => {})));
    }
    applyLanguage(next);
    try { localStorage.setItem("portfolio-language", next); } catch { /* Language works without storage. */ }
    window.dispatchEvent(new Event("portfolio-language-change"));
    // Allow translated components to render before revealing them.
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    for (const animation of animations) animation.cancel();
    animations.length = 0;
    if (!reduced) {
      for (const target of targets) animations.push(target.animate([
        { opacity: 0.15, filter: "blur(3px)" },
        { opacity: 1, filter: "blur(0px)" },
      ], { duration: 420, easing: "ease-out" }));
      await Promise.all(animations.map(animation => animation.finished.catch(() => {})));
    }
  } finally {
    for (const animation of animations) animation.cancel();
    transitioning = false;
  }
}
function subscribe(callback: () => void) {
  window.addEventListener("portfolio-language-change", callback);
  const storage = (event: StorageEvent) => {
    if (event.key !== "portfolio-language") return;
    applyLanguage(event.newValue === "en" ? "en" : "id");
    callback();
  };
  window.addEventListener("storage", storage);
  return () => {
    window.removeEventListener("portfolio-language-change", callback);
    window.removeEventListener("storage", storage);
  };
}
export function useLanguage() {
  const language = useSyncExternalStore(subscribe, () => document.documentElement.dataset.language === "en" ? "en" : "id", () => "id");
  const t = useCallback((text: string) => language === "en" ? translations[text] ?? text : text, [language]);
  return { language, t };
}
export default function LanguageToggle() {
  const { language } = useLanguage();
  return <button type="button" aria-label={language === "id" ? "Switch to English" : "Ubah ke Bahasa Indonesia"} title={language === "id" ? "Switch to English" : "Ubah ke Bahasa Indonesia"} onClick={() => {
    void changeLanguage(language === "id" ? "en" : "id");
  }} className="inline-flex h-11 shrink-0 cursor-pointer items-center gap-1 rounded-full border border-foreground/20 px-3 text-xs font-semibold transition-colors hover:border-accent lg:order-last"><span className={language === "id" ? "text-accent" : "text-muted"}>ID</span><span aria-hidden="true" className="text-muted">/</span><span className={language === "en" ? "text-accent" : "text-muted"}>EN</span></button>;
}
