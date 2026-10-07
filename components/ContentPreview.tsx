"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "./Language";

export default function ContentPreview({ title, url, fallbackUrl, label, className, video = false }: {
  title: string; url: string; fallbackUrl: string; label: string; className: string; video?: boolean;
}) {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  useEffect(() => {
    if (!open) return;
    const popup = dialog.current;
    const opener = trigger.current;
    if (!popup) return;
    popup.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      popup.close();
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [open]);
  return <>
    <button ref={trigger} type="button" aria-haspopup="dialog" className={className + " cursor-pointer"} onClick={() => setOpen(true)}>{label}<span aria-hidden="true">â†—</span></button>
    <dialog ref={dialog} aria-labelledby={titleId} onCancel={() => setOpen(false)} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setOpen(false);
    }} className="certificate-dialog m-auto max-h-[92dvh] w-[calc(100%-2rem)] max-w-6xl overflow-hidden rounded-2xl border border-foreground/15 bg-background p-0 text-foreground backdrop:bg-black/70 backdrop:backdrop-blur-sm">
      {open && <>
        <div className="flex items-center justify-between gap-4 border-b border-foreground/10 px-4 py-3 sm:px-6">
          <h2 id={titleId} className="text-base font-semibold sm:text-lg">{title}</h2>
          <button type="button" autoFocus onClick={() => setOpen(false)} aria-label={language === "en" ? "Close preview" : "Tutup pratinjau"} className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-foreground/15 hover:border-accent hover:text-accent"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
        </div>
        <iframe src={url} title={title} allow={video ? "autoplay; fullscreen" : "fullscreen"} allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className={video ? "block aspect-video max-h-[65dvh] w-full border-0 bg-black" : "block h-[70dvh] w-full border-0 bg-surface"} />
        <div className="border-t border-foreground/10 px-4 py-3 text-xs text-muted sm:px-6">
          {language === "en" ? "Preview unavailable? " : "Pratinjau tidak tampil? "}<a href={fallbackUrl} className="text-accent hover:underline">{language === "en" ? "Open directly" : "Buka langsung"}</a>
        </div>
      </>}
    </dialog>
  </>;
}
