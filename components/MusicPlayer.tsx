"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./Language";

export default function MusicPlayer() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const english = language === "en";
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!panel.current?.contains(event.target as Node) && !button.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); button.current?.focus(); }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open]);
  return <>
    <button ref={button} type="button" aria-expanded={open} aria-controls="portfolio-music" aria-label={english ? "Open or close music player" : "Buka atau tutup pemutar musik"} title={english ? "Music" : "Musik"} onClick={() => { setLoaded(true); setOpen(value => !value); }} className={"inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors lg:order-last " + (open ? "border-accent bg-accent/10 text-accent" : "border-foreground/20 hover:border-accent hover:text-accent")}>
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13M9 9l12-2"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="18" cy="16" rx="3" ry="2"/></svg>
    </button>
    {loaded && <div hidden={!open} ref={panel} id="portfolio-music" role="region" aria-label={english ? "Music player" : "Pemutar musik"} className="music-panel absolute top-full right-4 z-30 mt-3 w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-foreground/15 bg-surface p-3 shadow-2xl sm:right-6 lg:right-10">
      <div className="mb-2 flex items-center justify-between gap-2"><p className="pl-1 text-sm font-medium">{english ? "My music pick" : "Musik pilihanku"}</p><button type="button" onClick={() => { setOpen(false); button.current?.focus(); }} aria-label={english ? "Close music player" : "Tutup pemutar musik"} className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-muted hover:bg-accent/10 hover:text-accent"><svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6 6 12 12M6 18 18 6"/></svg></button></div>
      <iframe title="hate that i made you love me — Ariana Grande, Spotify" src="https://open.spotify.com/embed/track/20jbSiX29FDX4oQxBXyUEi?utm_source=generator&theme=0" width="100%" height="152" className="rounded-xl border-0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
      <p className="mt-2 px-1 text-[11px] leading-relaxed text-muted">{english ? "Closing this panel keeps music playing. Reopen it to pause." : "Musik tetap berjalan saat panel ditutup. Buka lagi untuk menekan Pause."}</p>
    </div>}
  </>;
}
