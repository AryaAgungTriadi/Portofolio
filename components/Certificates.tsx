import Image from "next/image";

const certificates = [
  { title: "The Future of Web Developer and IoT Engineer", date: "9 September 2023", iso: "2023-09-09", image: "/images/certificate-web.jpg", width: 877, height: 620 },
  { title: "CyberAware: Jaga Data, Lindungi Privasi", date: "13 Juni 2025", iso: "2025-06-13", image: "/images/certificate-cyber.jpg", width: 1053, height: 745 },
];

export default function Certificates() {
  return (
    <section id="certificates" aria-labelledby="certificates-title" className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24 lg:px-10">
      <div className="border-t border-white/10 pt-10">
        <p className="text-xs uppercase tracking-[0.24em] text-accent">05 / Sertifikat</p>
        <h2 id="certificates-title" className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Bagian dari perjalanan.</h2>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">Pengalaman kepanitiaan dalam kegiatan webinar Program Studi Informatika.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {certificates.map((certificate) => (
            <article key={certificate.iso} className="overflow-hidden rounded-2xl border border-white/10 bg-surface transition-colors duration-200 hover:border-accent/30">
              <a href={certificate.image} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`Lihat sertifikat ${certificate.title} (tab baru)`}>
                <Image src={certificate.image} alt={`Sertifikat panitia atas nama Arya Agung Triadi: ${certificate.title}`} width={certificate.width} height={certificate.height} sizes="(max-width: 767px) 100vw, 50vw" className="h-auto w-full transition-opacity group-hover:opacity-85" />
              </a>
              <div className="p-6 sm:p-7">
                <p className="text-xs uppercase tracking-[0.18em] text-accent">Panitia / Webinar</p>
                <h3 className="mt-3 text-xl leading-snug font-semibold">{certificate.title}</h3>
                <p className="mt-4 text-sm text-muted"><time dateTime={certificate.iso}>{certificate.date}</time></p>
                <a href={certificate.image} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm text-accent hover:underline">Lihat sertifikat <span aria-hidden="true">↗</span><span className="sr-only"> (tab baru)</span></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
