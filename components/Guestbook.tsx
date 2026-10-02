"use client";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./Language";
type Person = { name: string; avatar_url: string | null; provider: string | null; is_owner: boolean };
type Entry = Person & { id: string; message: string; created_at: string; parent_id: string | null };
function Avatar({ person }: { person: Person }) {
  const [failed, setFailed] = useState(false);
  return <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-foreground/15 bg-accent/15 text-sm font-semibold text-accent">
    {person.avatar_url && !failed ?
      // Provider avatars use arbitrary hosts; keep them outside the image optimizer.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={person.avatar_url} alt="" referrerPolicy="no-referrer" onError={() => setFailed(true)} className="size-full object-cover" /> : person.name.slice(0,1).toUpperCase()}
  </span>;
}
function Provider({ provider }: { provider: string | null }) {
  if (!provider) return null;
  return <span aria-label={provider === "google" ? "Google" : "GitHub"} title={provider === "google" ? "Google" : "GitHub"} className="text-xs font-bold text-accent">{provider === "google" ? "G" : "GH"}</span>;
}
export default function Guestbook() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [ready, setReady] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [reply, setReply] = useState<Entry | null>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const message = useRef<HTMLTextAreaElement>(null);
  const list = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const url = new URL(window.location.href);
    const result = url.searchParams.get("guestbook");
    if (result) {
      const frame = requestAnimationFrame(() => {
        setOpen(true);
        if (result === "login-error") setStatus("Login belum berhasil. Silakan coba lagi.");
      });
      url.searchParams.delete("guestbook"); window.history.replaceState(null, "", url);
      return () => cancelAnimationFrame(frame);
    }
  }, []);
  useEffect(() => {
    if (!open || !dialog.current) return;
    const popup = dialog.current; popup.showModal();
    const overflow = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { popup.close(); document.body.style.overflow = overflow; };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/guestbook", { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error();
        const data = await response.json();
        if (controller.signal.aborted) return;
        const nearBottom = !list.current || list.current.scrollHeight - list.current.scrollTop - list.current.clientHeight < 100;
        setEntries([...data.entries].sort((a: Entry,b: Entry) => Date.parse(a.created_at)-Date.parse(b.created_at)));
        setReady(data.ready); setError(false);
        if (nearBottom) requestAnimationFrame(() => { if (list.current) list.current.scrollTop = list.current.scrollHeight; });
      } catch { if (!controller.signal.aborted) setError(true); }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }
    void load();
    // Poll only while visible; approved messages update without reloading the page.
    const timer = window.setInterval(() => { if (document.visibilityState === "visible") void load(); }, 15000);
    return () => { controller.abort(); window.clearInterval(timer); };
  }, [open, refresh]);
  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    fetch("/api/guestbook/session", { cache: "no-store", signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error();
      const data = await response.json(); if (!controller.signal.aborted) { setUser(data.user); setAuthReady(data.ready); }
    }).catch(() => { if (!controller.signal.aborted) { setUser(null); setAuthReady(false); } });
    return () => controller.abort();
  }, [open, refresh]);
  return <>
    <button type="button" aria-haspopup="dialog" onClick={() => { setLoading(true); setOpen(true); }} className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-full border border-accent/30 bg-surface px-5 py-3 text-sm font-semibold shadow-xl hover:border-accent hover:text-accent sm:right-6"><span aria-hidden="true">✎</span>{t("Buku Tamu")}{ready && <span className="rounded bg-accent/10 px-2 py-0.5 text-xs text-accent">{entries.length}</span>}</button>
    <dialog ref={dialog} aria-labelledby="guestbook-title" onCancel={() => setOpen(false)} onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) setOpen(false); }} className="guestbook-dialog fixed inset-0 ml-auto h-[100dvh] max-h-none w-full max-w-[580px] overflow-hidden border-l border-foreground/15 bg-surface p-0 text-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm">
      <div className="flex h-full min-h-0 flex-col">
        <header className="flex shrink-0 items-center gap-3 border-b border-foreground/15 px-5 py-5">
          <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-xl bg-foreground font-mono text-background">&gt;_</span>
          <div className="min-w-0 flex-1"><h2 id="guestbook-title" className="font-mono text-sm font-bold">~/guestbook.log</h2><p className="mt-1 text-xs text-muted">{entries.length} {t("jejak tersimpan")}</p></div>
          <button type="button" autoFocus aria-label={t("Tutup Buku Tamu")} onClick={() => setOpen(false)} className="min-h-10 cursor-pointer rounded-xl border border-foreground/25 px-3 text-xs hover:border-accent"><span className="text-muted">ESC</span> <span className="ml-2 text-lg">×</span></button>
        </header>
        <section className="shrink-0 border-b border-foreground/10 px-5 py-4">
          {user ? <div className="flex items-center gap-3"><Avatar person={user}/><div className="flex-1 text-sm"><p className="font-semibold">{user.name}</p><p className="text-xs text-muted">{t("Masuk melalui")} {user.provider === "google" ? "Google" : "GitHub"}</p></div><button type="button" className="min-h-10 cursor-pointer text-xs text-accent" onClick={async () => { try { const response = await fetch("/api/guestbook/logout", {method:"POST"}); if (!response.ok) throw new Error(); setUser(null); setReply(null); setStatus(""); } catch { setStatus("Gagal keluar. Silakan coba lagi."); } }}>{t("Keluar")}</button></div> : <><p className="mb-3 text-sm font-semibold">{t("Masuk untuk Menulis Pesan")}</p><div className="grid grid-cols-2 gap-3">{["github","google"].map(provider => <button key={provider} disabled={!authReady} onClick={() => { window.location.href = `/api/guestbook/login?provider=${provider}`; }} className={"flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-foreground/20 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40 " + (provider === "github" ? "bg-foreground text-background" : "bg-background text-foreground")}><Provider provider={provider}/>{provider === "github" ? "GitHub" : "Google"}</button>)}</div>{!authReady && <p className="mt-2 text-xs text-muted">{t("Login sedang disiapkan.")}</p>}</>}
        </section>
        <div ref={list} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          <div className="mb-5 flex items-center justify-between gap-2 border-b border-foreground/10 pb-3 text-[11px] text-muted"><span className="font-semibold">{t("SEMUA PESAN")} <span className="ml-1 rounded bg-foreground/10 px-2 py-0.5">{entries.length}</span></span><span>{t("Chat: Lama → Baru")}</span><button type="button" aria-label={t("Muat ulang")} onClick={() => setRefresh(v=>v+1)} className="size-8 cursor-pointer text-lg text-accent">↻</button></div>
          {loading ? <p className="text-sm text-muted">{t("Memuat komentar...")}</p> : error ? <p role="alert" className="text-sm text-muted">{t("Komentar belum bisa dimuat. Coba muat ulang.")}</p> : !ready ? <p className="text-sm text-muted">{t("Buku Tamu sedang disiapkan. Kamu bisa menghubungi Arya lewat email dulu.")}</p> : !entries.length ? <p className="py-6 text-sm text-muted">{t("Belum ada komentar. Jadilah yang pertama menyapa!")}</p> : <div className="space-y-6">{entries.map(entry => {
            const parent = entries.find(item=>item.id===entry.parent_id);
            return <article key={entry.id} className={"flex items-end gap-3 " + (entry.is_owner ? "flex-row-reverse" : "")}><Avatar person={entry}/><div className={"min-w-0 max-w-[85%] " + (entry.is_owner ? "text-right" : "")}><div className={"mb-2 flex items-center gap-2 text-xs font-semibold " + (entry.is_owner ? "justify-end" : "")}>{entry.is_owner && <span className="rounded-full bg-accent px-2 py-0.5 text-[9px] text-on-accent">DEV</span>}<span className="break-words">{entry.name}</span><Provider provider={entry.provider}/></div><div className={"inline-block max-w-full rounded-2xl border px-4 py-3 text-left text-sm leading-relaxed " + (entry.is_owner ? "rounded-br-sm border-accent/30 bg-accent text-on-accent" : "rounded-bl-sm border-foreground/10 bg-background")}>
              {entry.parent_id && <p className="mb-2 border-l-2 border-current/30 pl-2 text-xs opacity-70">{t("Membalas")} {parent?.name ?? t("komentar sebelumnya")}<span className="block truncate">{parent?.message.slice(0,80)}</span></p>}
              <p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{entry.message}</p></div><div className={"mt-1 flex flex-wrap items-center gap-2 text-[10px] text-muted " + (entry.is_owner ? "justify-end" : "")}><time dateTime={entry.created_at}>{new Date(entry.created_at).toLocaleString(language === "en" ? "en-GB" : "id-ID", {dateStyle:"medium",timeStyle:"short"})}</time><button type="button" disabled={!user} onClick={() => { setReply(entry); message.current?.focus(); }} className="min-h-8 cursor-pointer hover:text-accent disabled:cursor-not-allowed">↳ {t("Balas")}</button></div></div></article>;
          })}</div>}
        </div>
        <footer className="shrink-0 border-t border-foreground/15 bg-surface px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {user ? <form onSubmit={async event => {
            event.preventDefault(); if (sending || !ready) return; const form=event.currentTarget;
            setSending(true); setStatus("");
            try { const response=await fetch("/api/guestbook",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...Object.fromEntries(new FormData(form)),parentId:reply?.id??null})});
              if (response.status===429) {setStatus("Terlalu banyak kiriman. Coba lagi nanti.");return;}
              if (response.status===401) {setUser(null);setStatus("Sesi berakhir. Silakan masuk lagi.");return;}
              if (!response.ok || !(await response.json()).pending) throw new Error();
              setStatus("Terima kasih! Pesanmu tersimpan dan menunggu persetujuan Arya.");form.reset();setReply(null);
            } catch {setStatus("Pesan belum tersimpan. Silakan coba lagi.");} finally {setSending(false);}
          }}>
            {reply && <div className="mb-2 flex items-center justify-between gap-2 rounded-lg bg-accent/10 p-2 text-xs"><span>{t("Membalas")} {reply.name}</span><button type="button" onClick={()=>setReply(null)} className="min-h-8 cursor-pointer text-accent">{t("Batal")}</button></div>}
            <label htmlFor="guest-message" className="sr-only">{t("Pesan")}</label><div className="flex items-end gap-2"><textarea ref={message} id="guest-message" name="message" required minLength={2} maxLength={1000} rows={2} disabled={!ready || sending} placeholder={t("Tulis sapaan atau masukanmu...")} className="min-w-0 flex-1 resize-none rounded-xl border border-foreground/15 bg-background px-3 py-2 text-sm placeholder:text-muted"/><button type="submit" aria-label={t("Kirim Komentar")} disabled={!ready || sending} className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-accent text-xl text-on-accent disabled:opacity-40">{sending ? "…" : "↑"}</button></div><div className="hidden" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off"/></div><p className="mt-2 text-[11px] text-muted">{t("Pesan tampil setelah disetujui Arya.")}</p>
          </form> : <p className="py-2 text-center text-xs leading-relaxed text-muted">{t("Silakan login menggunakan GitHub atau Google untuk menulis pesan.")}</p>}
          {status && <p role="status" aria-live="polite" className="mt-2 text-xs leading-relaxed text-accent">{t(status)}</p>}
        </footer>
      </div>
    </dialog>
  </>;
}
