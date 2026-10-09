"use client";

import ArrowIcon from "./ArrowIcon";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./Language";

const gallery = [
  { file: "profile", width: 1920, height: 1080, id: "Profil", en: "Profile" },
  { file: "stats", width: 1920, height: 1080, id: "Statistik", en: "Statistics" },
  { file: "heroes", width: 1920, height: 1080, id: "Hero favorit", en: "Favorite heroes" },
  { file: "titles", width: 1420, height: 799, id: "Gelar Alucard", en: "Alucard titles" },
  { file: "seasons", width: 1920, height: 1080, id: "Riwayat season", en: "Season history" },
  { file: "collection", width: 1920, height: 1080, id: "Koleksi", en: "Collection" },
  { file: "account", width: 1167, height: 657, id: "Awal bermain", en: "Playing history" },
];
const heroes = [
  { name: "Alucard", matches: 3593, rate: "59.7%", power: 8026 },
  { name: "Fanny", matches: 850, rate: "47.2%", power: 3375 },
  { name: "Lancelot", matches: 827, rate: "47.5%", power: 2459 },
];

export default function Gaming() {
  const { language } = useLanguage();
  const en = language === "en";
  const [open, setOpen] = useState(false);
  const [shot, setShot] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const number = (value: number) => value.toLocaleString(en ? "en-US" : "id-ID");
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
  const stats = [
    { label: en ? "Matches" : "Pertandingan", value: number(13870) },
    { label: "Win rate", value: en ? "52.85%" : "52,85%" },
    { label: "MVP", value: number(2668) },
  ];
  return <article aria-labelledby="gaming-title" className="mt-10 overflow-hidden rounded-2xl border border-foreground/10 bg-surface">
    <div className="grid md:grid-cols-[1fr_1.7fr]">
      <div className="relative flex min-h-60 flex-col justify-end overflow-hidden bg-[#111b35] p-7 sm:p-9">
        <Image src="/images/gaming/profile.jpg" alt="" fill sizes="(max-width: 767px) 100vw, 400px" className="object-cover object-right opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111b35] via-[#111b35]/35 to-transparent" />
        <div className="relative text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-white/65">Mobile Legends: Bang Bang</p>
          <p className="mt-6 text-sm text-white/75">{en ? "Highest rank" : "Rank tertinggi"}</p>
          <p className="mt-2 text-2xl font-semibold">Mythical Immortal</p>
          <div className="mt-3 flex items-center gap-3"><Image src="/images/gaming/immortal.png" alt="" width={396} height={391} className="h-16 w-16 shrink-0 object-contain" /><p className="text-5xl font-semibold text-accent">138 <span className="text-base font-medium text-white/75">{en ? "stars" : "bintang"}</span></p></div>
        </div>
      </div>
      <div className="p-7 sm:p-9">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">{en ? "Beyond coding" : "Di luar coding"}</p>
        <h3 id="gaming-title" className="mt-3 text-2xl font-semibold">{en ? "A little competitive side." : "Sisi kompetitifku."}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{en ? "When taking a break from coding, I enjoy Mobile Legends. Alucard is my most-played hero, with a highest title of Banten No.16 Alucard." : "Saat rehat dari coding, aku juga bermain Mobile Legends. Alucard jadi hero yang paling sering kumainkan, dengan gelar tertinggi Banten No.16 Alucard."}</p>
        <p className="mt-3 text-sm text-muted">{en ? "Playing since 2017–2018." : "Bermain sejak 2017–2018."}</p>
        <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-foreground/10 py-5">
          {stats.map(stat => <div key={stat.label}><dt className="text-xs text-muted">{stat.label}</dt><dd className="mt-2 text-lg font-semibold sm:text-2xl">{stat.value}</dd></div>)}
        </dl>
        <p className="mt-3 text-xs text-muted">{en ? "Screenshot capture. Data reflects the display at the time it was taken." : "Hasil screenshot, data mengikuti tampilan saat diambil."}</p>
        <button ref={trigger} type="button" aria-haspopup="dialog" onClick={() => { setShot(0); setOpen(true); }} className="mt-5 inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-full border border-foreground/20 px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent">{en ? "Explore my gaming profile" : "Lihat profil gaming"}<ArrowIcon /></button>
      </div>
    </div>
    <dialog ref={dialog} aria-labelledby="gaming-dialog-title" onCancel={() => setOpen(false)} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setOpen(false);
    }} className="certificate-dialog m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto overscroll-contain rounded-2xl border border-foreground/15 bg-background p-0 text-foreground backdrop:bg-black/70 backdrop:backdrop-blur-sm">
      {open && <>
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-foreground/10 bg-background px-5 py-4 sm:px-7">
          <div><p className="text-xs text-accent">Mobile Legends</p><h2 id="gaming-dialog-title" className="mt-1 text-xl font-semibold">Star`Arcardz</h2></div>
          <button autoFocus type="button" onClick={() => setOpen(false)} aria-label={en ? "Close gaming profile" : "Tutup profil gaming"} className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-foreground/15 hover:border-accent hover:text-accent"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
        </div>
        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap gap-2" role="group" aria-label={en ? "Gaming screenshots" : "Screenshot gaming"}>
            {gallery.map((item, index) => <button key={item.file} type="button" aria-pressed={shot === index} aria-controls="gaming-screenshot" onClick={() => setShot(index)} className={"min-h-11 cursor-pointer rounded-full border px-4 py-2 text-xs transition-colors " + (shot === index ? "border-accent bg-accent/10 text-accent" : "border-foreground/15 text-muted hover:border-accent/50 hover:text-accent")}>{en ? item.en : item.id}</button>)}
          </div>
          <figure id="gaming-screenshot" className="mt-5"><Image src={`/images/gaming/${gallery[shot].file}.jpg`} alt={`${en ? gallery[shot].en : gallery[shot].id} — Mobile Legends`} width={gallery[shot].width} height={gallery[shot].height} sizes="(max-width: 1024px) 100vw, 960px" className="h-auto w-full rounded-xl border border-foreground/10" /><figcaption className="mt-2 text-xs text-muted">{en ? "Screenshot capture. Data reflects the display at the time it was taken." : "Hasil screenshot, data mengikuti tampilan saat diambil."}</figcaption></figure>
          <div className="mt-6 rounded-xl border border-foreground/10 bg-surface p-4">
            <h3 className="font-semibold text-accent">{en ? "2nd Place · Classmeeting E-Sport" : "Juara II · Classmeeting E-Sport"}</h3>
            <p className="mt-2 text-sm text-muted">{en ? "With the XII IPA 8 team, PORAK SMAN 3 Pandeglang · 12–15 December 2022." : "Bersama tim XII IPA 8, PORAK SMAN 3 Pandeglang · 12–15 Desember 2022."}</p>
            <a href="/documents/certificate-classmeeting-esport.pdf" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm text-accent hover:underline">{en ? "View certificate (PDF)" : "Lihat sertifikat (PDF)"}<ArrowIcon /></a>
          </div>
          <h3 className="mt-7 text-lg font-semibold">{en ? "Most-played heroes" : "Hero yang paling sering dimainkan"}</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {heroes.map(hero => <div key={hero.name} className="rounded-xl border border-foreground/10 bg-surface p-4"><h4 className="font-semibold text-accent">{hero.name}</h4><dl className="mt-3 space-y-2 text-xs"><div className="flex justify-between gap-2"><dt className="text-muted">{en ? "Matches" : "Pertandingan"}</dt><dd>{number(hero.matches)}</dd></div><div className="flex justify-between gap-2"><dt className="text-muted">Win rate</dt><dd>{en ? hero.rate : hero.rate.replace(".", ",")}</dd></div><div className="flex justify-between gap-2"><dt className="text-muted">Hero power</dt><dd>{number(hero.power)}</dd></div></dl></div>)}
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[{ label: "Savage", value: "61" }, { label: "Maniac", value: "416" }, { label: en ? "Best win streak" : "Win streak tertinggi", value: "15" }, { label: en ? "Skins collected" : "Koleksi skin", value: "687" }].map(stat => <div key={stat.label} className="rounded-xl border border-foreground/10 p-4"><dt className="text-xs text-muted">{stat.label}</dt><dd className="mt-2 text-xl font-semibold">{stat.value}</dd></div>)}
          </dl>
        </div>
      </>}
    </dialog>
  </article>;
}
