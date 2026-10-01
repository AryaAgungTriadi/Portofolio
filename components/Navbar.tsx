"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const links = [
  ["#home", "Beranda"], ["#about", "Tentang"], ["#skills", "Skills"],
  ["#projects", "Proyek"], ["#achievements", "Prestasi"],
  ["#certificates", "Sertifikat"], ["#contact", "Kontak"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useLayoutEffect(() => {
    const container = menu.current;
    if (!container) return;
    const measure = () => {
      const selected = container.querySelector<HTMLAnchorElement>('[aria-current="location"]');
      if (!selected || !container.getClientRects().length) return;
      setIndicator({ x: selected.offsetLeft, y: selected.offsetTop, width: selected.offsetWidth, height: selected.offsetHeight });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    for (const child of container.querySelectorAll("a")) observer.observe(child);
    document.fonts.ready.then(measure);
    return () => observer.disconnect();
  }, [active, open]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = "#home";
      // Pick the last section that has reached the line below the sticky header.
      for (const [href] of links) {
        const section = document.getElementById(href.slice(1));
        if (section && section.getBoundingClientRect().top <= 140) current = href;
      }
      if (window.scrollY > 0 && Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2) {
        current = "#contact";
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur-xl">
      <nav aria-label="Navigasi utama" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 px-6 py-3 lg:px-10" onKeyDown={(event) => {
        if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); }
      }}>
        <a href="#home" onClick={() => setOpen(false)} aria-label="Arya, beranda" className="inline-flex min-h-11 items-center rounded text-2xl font-bold tracking-tight transition-opacity hover:opacity-80">arya<span className="text-accent">.</span></a>
        <button ref={toggle} type="button" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)} className="min-h-11 rounded-lg border border-white/20 px-4 py-2 text-sm transition-colors hover:border-accent/50 hover:text-accent lg:hidden">{open ? "Tutup" : "Menu"}</button>
        <div ref={menu} id="nav-links" className={`${open ? "flex" : "hidden"} relative isolate max-h-[70dvh] w-full flex-col gap-1 overflow-y-auto pt-3 lg:flex lg:w-auto lg:flex-row lg:gap-1 lg:overflow-visible lg:pt-0`}>
          <span aria-hidden="true" className="pointer-events-none absolute -z-10 rounded-lg bg-accent/10 transition-[transform,width,height] duration-300 ease-out motion-reduce:transition-none" style={{ transform: `translate(${indicator.x}px, ${indicator.y}px)`, width: indicator.width, height: indicator.height, top: 0, left: 0 }}>
            <span className="absolute inset-x-3 bottom-1 h-px bg-accent" />
          </span>
          {links.map(([href, label]) => (
            <a key={href} href={href} aria-current={active === href ? "location" : undefined} onClick={() => setOpen(false)} className={`relative inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm transition-colors ${active === href ? "text-accent" : "text-muted hover:bg-white/5 hover:text-foreground"}`}>
              {label}

            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
