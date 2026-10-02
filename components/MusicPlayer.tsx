"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./Language";

const tracks = [
  { id: "63y6xWR4gXz7bnUGOk8iI6", name: "Into You" },
  { id: "20jbSiX29FDX4oQxBXyUEi", name: "hate that i made you love me" },
  { id: "3NcrKwg8J1mOB1Ybt18rYt", name: "bye" },
];
type PlaybackEvent = { data: { isPaused: boolean } };
type SpotifyController = {
  play: () => void;
  pause: () => void;
  loadEntity: (url: string) => void;
  destroy: () => void;
  addListener: (event: string, callback: (event: PlaybackEvent) => void) => void;
};
type SpotifyAPI = {
  createController: (element: HTMLElement, options: { url: string; width: string; height: number }, callback: (controller: SpotifyController) => void) => void;
};
let apiPromise: Promise<SpotifyAPI> | undefined;
function getSpotifyAPI() {
  if (!apiPromise) apiPromise = new Promise<SpotifyAPI>((resolve, reject) => {
    (window as Window & { onSpotifyIframeApiReady?: (api: SpotifyAPI) => void }).onSpotifyIframeApiReady = resolve;
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    script.onerror = () => { apiPromise = undefined; script.remove(); reject(new Error("Spotify unavailable")); };
    document.head.appendChild(script);
  });
  return apiPromise;
}
const trackURL = (index: number) => `https://open.spotify.com/track/${tracks[index].id}?theme=0`;
export default function MusicPlayer() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<SpotifyController | null>(null);
  const [selected, setSelected] = useState(0);

  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const english = language === "en";
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let active = true;
    getSpotifyAPI().then(api => {
      if (!active) return;
      const placeholder = document.createElement("div");
      container.appendChild(placeholder);
      api.createController(placeholder, { url: trackURL(0), width: "100%", height: 152 }, player => {
        if (!active) { player.destroy(); return; }
        controller.current = player;
        player.addListener("ready", () => {
          if (!active) return;
          setReady(true);
          // Best effort: browsers may require the visitor to press Play.
          player.play();
        });
        player.addListener("playback_update", event => {
          if (active) setPlaying(!event.data.isPaused);
        });
      });
    }).catch(() => { if (active) setFailed(true); });
    return () => {
      active = false;
      controller.current?.destroy();
      controller.current = null;
      container.replaceChildren();
    };
  }, []);
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
    <button ref={button} type="button" aria-expanded={open} aria-controls="portfolio-music" aria-label={english ? "Open or close music player" : "Buka atau tutup pemutar musik"} title={english ? "Music" : "Musik"} onClick={() => { setOpen(value => !value); }} className={"inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors lg:order-last " + (open ? "border-accent bg-accent/10 text-accent" : "border-foreground/20 hover:border-accent hover:text-accent")}>
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13M9 9l12-2"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="18" cy="16" rx="3" ry="2"/></svg>
    </button>
    <div hidden={!open} ref={panel} id="portfolio-music" role="region" aria-label={english ? "Music player" : "Pemutar musik"} className="music-panel absolute top-full right-4 z-30 mt-3 w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-foreground/15 bg-surface p-3 shadow-2xl sm:right-6 lg:right-10">
      <div className="mb-2 flex items-center justify-between gap-2"><p className="pl-1 text-sm font-medium">{english ? "My music pick" : "Musik pilihanku"}</p><button type="button" onClick={() => { setOpen(false); button.current?.focus(); }} aria-label={english ? "Close music player" : "Tutup pemutar musik"} className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-muted hover:bg-accent/10 hover:text-accent"><svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6 6 12 12M6 18 18 6"/></svg></button></div>
      <div className="mb-3 flex flex-col gap-1" role="group" aria-label={english ? "Ariana Grande song selection" : "Pilihan lagu Ariana Grande"}>
        {tracks.map((item, index) => <button key={item.id} type="button" aria-pressed={selected === index} disabled={!ready} onClick={() => { setSelected(index); controller.current?.loadEntity(trackURL(index)); controller.current?.play(); }} className={"flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-3 text-left text-xs transition-colors " + (selected === index ? "bg-accent/10 text-accent" : "text-muted hover:bg-foreground/5 hover:text-foreground")}><span className="font-mono opacity-60">0{index + 1}</span>{item.name}</button>)}
      </div>
      <div ref={host} className="overflow-hidden rounded-xl" />
      <button type="button" disabled={!ready} onClick={() => { if (playing) controller.current?.pause(); else controller.current?.play(); }} className="mt-3 flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg border border-accent/40 text-sm text-accent hover:bg-accent/10 disabled:cursor-wait disabled:opacity-50">
        {ready ? (playing ? (english ? "Pause music" : "Matikan musik") : (english ? "Play music" : "Putar musik")) : (failed ? (english ? "Spotify unavailable" : "Spotify belum tersedia") : (english ? "Loading music…" : "Menyiapkan musik…"))}
      </button>
      <p className="mt-2 px-1 text-[11px] leading-relaxed text-muted">{english ? "Music keeps playing when closed. If autoplay is blocked, press Play." : "Musik tetap berjalan saat ditutup. Jika autoplay diblokir, tekan Putar musik."}</p>
    </div>
  </>;
}
