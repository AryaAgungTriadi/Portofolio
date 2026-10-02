"use client";

import { useSyncExternalStore, useCallback } from "react";
import { translations } from "./translations";

function applyLanguage(language: "id" | "en") {
  document.documentElement.lang = language;
  document.documentElement.dataset.language = language;
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
    const next = language === "id" ? "en" : "id";
    applyLanguage(next);
    try { localStorage.setItem("portfolio-language", next); } catch { /* Language works without storage. */ }
    window.dispatchEvent(new Event("portfolio-language-change"));
  }} className="inline-flex h-11 shrink-0 cursor-pointer items-center gap-1 rounded-full border border-foreground/20 px-3 text-xs font-semibold transition-colors hover:border-accent lg:order-last"><span className={language === "id" ? "text-accent" : "text-muted"}>ID</span><span aria-hidden="true" className="text-muted">/</span><span className={language === "en" ? "text-accent" : "text-muted"}>EN</span></button>;
}
