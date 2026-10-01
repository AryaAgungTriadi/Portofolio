import Image from "next/image";
export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="mx-auto max-w-6xl px-6 pt-14 pb-12 sm:pt-20 lg:px-10 lg:pt-24">
      <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <p className="mb-7 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-muted"><span aria-hidden="true" className="h-px w-10 bg-accent" />Portfolio personal</p>
          <h1 id="hero-title" className="text-5xl leading-[1.08] font-semibold tracking-tight sm:text-7xl lg:text-8xl">Halo, aku<br /><span className="text-accent">Arya.</span></h1>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">Aku Arya Agung Triadi. Web Developer, UI/UX Enthusiast, serta editor foto dan video. Selamat datang di portfolio-ku.</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#about" className="inline-flex items-center gap-6 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-background transition-colors hover:bg-accent-hover">Kenali aku lebih dekat <span aria-hidden="true">↗</span></a>
            <a href="/documents/cv-arya-agung-triadi.pdf" download="CV-Arya-Agung-Triadi.pdf" className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-4 text-sm font-semibold transition-colors hover:border-accent hover:text-accent">Unduh CV <span aria-hidden="true">↓</span><span className="sr-only"> (PDF)</span></a>
          </div>
          <div className="mt-12 flex flex-wrap gap-5 text-xs text-muted"><span>Belajar.</span><span>Bereksperimen.</span><span className="text-foreground">Berkarya.</span></div>
        </div>
        <figure className="relative mx-auto w-full max-w-sm pb-5 pl-5 lg:max-w-none">
          <div aria-hidden="true" className="absolute inset-x-0 top-5 bottom-0 rounded-[2rem] border border-accent/30" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface">
            <Image src="/images/arya-formal.png" alt="Foto Arya Agung Triadi" width={1086} height={1448} preload sizes="(max-width: 1023px) 384px, 440px" className="aspect-[4/5] w-full object-cover object-top" />
            <figcaption className="border-t border-white/10 p-5 sm:p-6">
              <p className="font-medium">Arya Agung Triadi</p>
              <p className="mt-2 text-sm text-muted">Web Development · UI/UX · Visual Creative</p>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}

