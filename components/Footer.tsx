"use client";

import ArrowIcon from "./ArrowIcon";

import { useLanguage } from "./Language";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p className="text-muted">© {new Date().getFullYear()} Arya Agung Triadi.</p>
        <a href="#home" className="inline-flex min-h-11 items-center gap-3 text-foreground hover:text-accent">{t("Kembali ke atas")}<ArrowIcon direction="up" /></a>
      </div>
    </footer>
  );
}
