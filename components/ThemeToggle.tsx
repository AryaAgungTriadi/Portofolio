"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("portfolio-theme-change", callback);
  const storage = (event: StorageEvent) => {
    if (event.key !== "portfolio-theme") return;
    document.documentElement.dataset.theme = event.newValue === "light" ? "light" : "dark";
    callback();
  };
  window.addEventListener("storage", storage);
  return () => {
    window.removeEventListener("portfolio-theme-change", callback);
    window.removeEventListener("storage", storage);
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme ?? "dark", () => "dark");
  const label = theme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap";
  return <button type="button" aria-label={label} title={label} onClick={() => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("portfolio-theme", next); } catch { /* Theme still works when storage is unavailable. */ }
    window.dispatchEvent(new Event("portfolio-theme-change"));
  }} className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-foreground/20 text-xl transition-colors hover:border-accent hover:text-accent lg:order-last"><span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span></button>;
}
