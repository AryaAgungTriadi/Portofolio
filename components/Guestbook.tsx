"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./Language";

type Entry = { id: string; name: string; message: string; created_at: string; parent_id: string | null };
export default function Guestbook() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [reply, setReply] = useState<Entry | null>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const message = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!open) return;
    const popup = dialog.current;
    if (!popup) return;
    popup.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { popup.close(); document.body.style.overflow = overflow; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    fetch("/api/guestbook", { cache: "no-store", signal: controller.signal }).then(async (response) => {
      if (!response.ok) throw new Error("load failed");
      const data = await response.json();
      if (controller.signal.aborted) return;
      setEntries(data.entries); setReady(data.ready); setError(false);
    }).catch(() => {
      if (!controller.signal.aborted) { setError(true); setReady(false); }
    }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [open, refresh]);

  const inputClass = "mt-2 w-full rounded-xl border border-foreground/15 bg-background px-4 py-3 text-foreground placeholder:text-muted/70";
  return <>
    <button type="button" aria-haspopup="dialog" onClick={() => { setLoading(true); setOpen(true); }} className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-full border border-accent/30 bg-surface px-5 py-3 text-sm font-semibold shadow-xl transition-colors hover:border-accent hover:text-accent sm:right-6"><span aria-hidden="true">✎</span>{t("Buku Tamu")}{ready && <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">{entries.length}</span>}</button>
    <dialog ref={dialog} aria-labelledby="guestbook-title" aria-describedby="guestbook-description" onCancel={() => setOpen(false)} onClose={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }} className="guestbook-dialog fixed inset-0 ml-auto h-[100dvh] max-h-none w-full max-w-lg overflow-y-auto border-l border-foreground/15 bg-surface p-0 text-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm">
      <div className="min-h-full">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-foreground/10 bg-surface px-5 py-4">
          <div><h2 id="guestbook-title" className="text-xl font-semibold">{t("Buku Tamu")}</h2><p className="mt-1 text-xs text-muted">{t("Ruang untuk menyapa dan berdiskusi.")}</p></div>
          <button type="button" autoFocus onClick={() => setOpen(false)} aria-label={t("Tutup Buku Tamu")} className="min-h-11 cursor-pointer rounded-lg border border-foreground/20 px-4 text-sm hover:border-accent hover:text-accent">{t("Tutup")} <span aria-hidden="true">×</span></button>
        </div>
        <div className="p-5">
          <p id="guestbook-description" className="text-sm leading-relaxed text-muted">{t("Tinggalkan sapaan, masukan, atau balas komentar. Pesan tampil setelah disetujui Arya.")}</p>
          <div className="mt-5 flex items-center justify-between gap-3"><p className="text-xs text-muted">{t("Komentar terbaru")}</p><button type="button" disabled={loading} onClick={() => { setLoading(true); setRefresh((value) => value + 1); }} className="min-h-11 cursor-pointer text-sm text-accent disabled:opacity-50">{t("Muat ulang")} <span aria-hidden="true">↻</span></button></div>
          <div aria-live="polite" className="mt-3 space-y-4">
            {loading ? <p className="py-5 text-sm text-muted">{t("Memuat komentar...")}</p> : error ? <p role="alert" className="py-5 text-sm text-muted">{t("Komentar belum bisa dimuat. Coba muat ulang.")}</p> : !ready ? <p className="rounded-xl border border-accent/20 bg-accent/5 p-4 text-sm leading-relaxed">{t("Buku Tamu sedang disiapkan. Kamu bisa menghubungi Arya lewat email dulu.")}</p> : !entries.length ? <p className="py-5 text-sm text-muted">{t("Belum ada komentar. Jadilah yang pertama menyapa!")}</p> : entries.map((entry) => {
              const parent = entries.find((item) => item.id === entry.parent_id);
              return <article key={entry.id} className="rounded-2xl border border-foreground/10 bg-background p-4">
                <p className="text-sm font-semibold">{entry.name}</p>
                {entry.parent_id && <p className="mt-1 text-xs text-accent">{t("Membalas")} {parent?.name ?? t("komentar sebelumnya")}</p>}
                <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed">{entry.message}</p>
                <div className="mt-3 flex items-center justify-between gap-3"><time dateTime={entry.created_at} className="text-xs text-muted">{new Date(entry.created_at).toLocaleString(language === "en" ? "en-GB" : "id-ID", { dateStyle: "medium", timeStyle: "short" })}</time><button type="button" onClick={() => { setReply(entry); message.current?.focus(); }} className="min-h-11 cursor-pointer text-sm text-accent">{t("Balas")}</button></div>
              </article>;
            })}
          </div>
          <form className="mt-6 border-t border-foreground/10 pt-6" onSubmit={async (event) => {
            event.preventDefault(); if (sending || !ready) return;
            const form = event.currentTarget;
            setSending(true); setStatus("");
            try {
              const response = await fetch("/api/guestbook", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), parentId: reply?.id ?? null }) });
              if (response.status === 429) { setStatus("Terlalu banyak kiriman. Coba lagi nanti."); return; }
              if (!response.ok) throw new Error("submit failed");
              const result = await response.json();
              if (!result.pending) throw new Error("submit failed");
              setStatus("Terima kasih! Pesanmu tersimpan dan menunggu persetujuan Arya."); form.reset(); setReply(null);
            } catch { setStatus("Pesan belum tersimpan. Silakan coba lagi."); }
            finally { setSending(false); }
          }}>
            <h3 className="font-semibold">{t("Tinggalkan jejak")}</h3>
            {reply && <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-accent/10 p-3 text-sm"><span>{t("Membalas")} {reply.name}</span><button type="button" onClick={() => setReply(null)} className="min-h-11 cursor-pointer text-accent">{t("Batal")}</button></div>}
            <label htmlFor="guest-name" className="mt-4 block text-sm">{t("Nama Anda")}<input id="guest-name" name="name" autoComplete="name" minLength={2} maxLength={80} required disabled={!ready || loading} className={inputClass} placeholder={t("Nama panggilan")} /></label>
            <label htmlFor="guest-message" className="mt-4 block text-sm">{t("Pesan")}<textarea ref={message} id="guest-message" name="message" rows={3} minLength={2} maxLength={1000} required disabled={!ready || loading} className={inputClass + " resize-y"} placeholder={t("Tulis sapaan atau masukanmu...")} /></label>
            <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
            <button type="submit" disabled={!ready || loading || sending} className="mt-4 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-on-accent hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50">{t(sending ? "Mengirim..." : "Kirim Komentar")}</button>
            <p role="status" aria-live="polite" className="mt-4 text-sm leading-relaxed text-muted">{t(status)}</p>
            <p className="mt-4 text-xs leading-relaxed text-muted">{t("Komentar bersifat publik. Hindari membagikan data pribadi.")}</p>
          </form>
        </div>
      </div>
    </dialog>
  </>;
}
