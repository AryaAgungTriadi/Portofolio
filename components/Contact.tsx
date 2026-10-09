"use client";

import SocialIcon from "./SocialIcon";
import ArrowIcon from "./ArrowIcon";

import { useState } from "react";
import { useLanguage } from "./Language";

import Typewriter from "./Typewriter";
import ContactForm from "./ContactForm";
export default function Contact() {
  const { t, language } = useLanguage();
  const [copyStatus, setCopyStatus] = useState("");
  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24 lg:px-10">
      <div className="grid gap-10 rounded-[2rem] border border-accent/20 bg-surface p-4 sm:p-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:p-10">
        <div className="min-w-0 px-2 pt-3 sm:px-0 sm:pt-0">
          <p className="text-xs uppercase tracking-[0.24em] text-accent">{t("06 / Kontak")}</p>
          <h2 id="contact-title" className="mt-5 text-3xl leading-tight font-semibold tracking-tight sm:text-5xl">{t("Mari mulai")}<br /><Typewriter words={[t("percakapan.")]} /></h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted">{t("Punya ide proyek atau ingin berdiskusi tentang web, UI/UX, dan karya kreatif? Kamu bisa menghubungiku di sini.")}</p>
        <address className="mt-8 flex flex-col gap-6 not-italic">
          <div><p className="text-xs uppercase tracking-[0.15em] text-muted">Email</p><div className="mt-2 flex items-center gap-1"><a href="mailto:aryaagungtriadi22@gmail.com" className="inline-flex min-h-11 min-w-0 items-center break-all text-base text-accent hover:underline sm:text-lg">aryaagungtriadi22@gmail.com</a><button type="button" aria-label={language === "en" ? "Copy email address" : "Salin alamat email"} onClick={async () => {
            try { await navigator.clipboard.writeText("aryaagungtriadi22@gmail.com"); setCopyStatus(language === "en" ? "Email copied!" : "Email disalin!"); }
            catch { setCopyStatus(language === "en" ? "Could not copy. Select the email and copy it manually." : "Belum bisa menyalin. Pilih email lalu salin secara manual."); }
          }} title={language === "en" ? "Copy email" : "Salin email"} className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-accent/10 hover:text-accent"><svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/></svg></button></div><p role="status" aria-live="polite" className="text-xs text-accent">{copyStatus}</p></div>
          <div><p className="text-xs uppercase tracking-[0.15em] text-muted">{t("Telepon")}</p><a href="https://wa.me/6283841327394" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp +62 838 4132 7394" className="mt-2 inline-flex min-h-11 items-center text-lg hover:text-accent">+62 838 4132 7394 <span aria-hidden="true" className="ml-2 inline-flex items-center gap-1 text-xs text-accent"><ArrowIcon /> WhatsApp</span></a></div>
          <div><p className="text-xs uppercase tracking-[0.15em] text-muted">{t("Lokasi")}</p><p className="mt-3 text-sm">Labuan, Pandeglang, Banten</p></div>
          <div className="border-t border-foreground/10 pt-5">
            <p className="text-xs uppercase tracking-[0.15em] text-muted">{t("Profil")}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a href="https://github.com/AryaAgungTriadi" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 rounded-lg border border-foreground/15 px-4 py-2 text-sm transition-colors hover:border-accent/50 hover:text-accent">GitHub <SocialIcon name="github" /><span className="sr-only">{t("(tab baru)")}</span></a>
              <a href="https://www.linkedin.com/in/aryaagungtriadi" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 rounded-lg border border-foreground/15 px-4 py-2 text-sm transition-colors hover:border-accent/50 hover:text-accent">LinkedIn <SocialIcon name="linkedin" /><span className="sr-only">{t("(tab baru)")}</span></a>
              <a href="https://www.instagram.com/aryaagungtriadii/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 rounded-lg border border-foreground/15 px-4 py-2 text-sm transition-colors hover:border-accent/50 hover:text-accent">Instagram <SocialIcon name="instagram" /><span className="sr-only">{t("(tab baru)")}</span></a>
            </div>
          </div>
        </address>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}


