"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./Language";

export default function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/contact", { cache: "no-store", signal: controller.signal }).then((response) => response.json()).then((data) => {
      if (!controller.signal.aborted) setReady(data.ready === true);
    }).catch(() => {}).finally(() => { if (!controller.signal.aborted) setChecking(false); });
    return () => controller.abort();
  }, []);
  const inputClass = "mt-2 w-full rounded-xl border border-foreground/15 bg-background px-4 py-3 text-foreground placeholder:text-muted/70 focus:border-accent";
  return <form className="rounded-2xl border border-foreground/10 bg-background/40 p-6 sm:p-8" onSubmit={async (event) => {
    event.preventDefault();
    if (sending || !ready) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    setSending(true); setStatus("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      if (response.status === 429) { setStatus("Terlalu banyak kiriman. Coba lagi nanti."); return; }
      if (!response.ok) throw new Error("send failed");
      if (!(await response.json()).sent) throw new Error("send failed");
      setStatus("Pesan berhasil dikirim. Terima kasih sudah menghubungiku!");
      form.reset();
    } catch {
      setStatus("Pesan belum terkirim. Silakan coba lagi atau hubungi lewat email langsung.");
    } finally { setSending(false); }
  }}>
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="text-sm font-medium" htmlFor="contact-name">{t("Nama Anda")}<input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={80} placeholder={t("Nama lengkap")} className={inputClass} /></label>
      <label className="text-sm font-medium" htmlFor="contact-email">{t("Email Anda")}<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="nama@example.com" className={inputClass} /></label>
    </div>
    <label className="mt-5 block text-sm font-medium" htmlFor="contact-subject">{t("Subjek")}<select id="contact-subject" name="subject" className={inputClass} defaultValue="collaboration">
      <option value="collaboration">{t("Kolaborasi Proyek")}</option>
      <option value="opportunity">{t("Peluang Kerja")}</option>
      <option value="question">{t("Pertanyaan Umum")}</option>
    </select></label>
    <label className="mt-5 block text-sm font-medium" htmlFor="contact-message">{t("Pesan")}<textarea id="contact-message" name="message" required minLength={10} maxLength={4000} rows={6} placeholder={t("Ceritakan ide atau pesanmu...")} className={inputClass + " resize-y"} /></label>
    <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button type="submit" disabled={sending || !ready || checking} className="mt-6 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-60">{t(sending ? "Mengirim..." : "Kirim Pesan")}<span aria-hidden="true">↗</span></button>
    {!checking && !ready && <p className="mt-4 text-sm leading-relaxed text-muted">{t("Form kontak sedang disiapkan. Untuk sementara, gunakan email langsung di sebelahnya.")}</p>}
    <p aria-live="polite" role="status" className="mt-4 text-sm leading-relaxed text-muted">{t(status)}</p>
  </form>;
}
