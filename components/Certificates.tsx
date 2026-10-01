import Image from "next/image";

const certificates = [
  { title: "The Future of Web Developer and IoT Engineer", date: "9 September 2023", iso: "2023-09-09", image: "/images/certificate-web.jpg", width: 877, height: 620, role: "Panitia / Webinar" },
  { title: "CyberAware: Jaga Data, Lindungi Privasi", date: "13 Juni 2025", iso: "2025-06-13", image: "/images/certificate-cyber.jpg", width: 1053, height: 745, role: "Panitia / Webinar" },
  { title: "Cyber Security: Culture and Society", date: "9 Desember 2023", iso: "2023-12-09", image: "/images/certificate-extra-0.jpg", width: 1682, height: 1190, role: "Peserta / Webinar" },
  { title: "Fundamental of Digital Marketing, The Content Creator", date: "9 Oktober 2023", iso: "2023-10-09", image: "/images/certificate-extra-1.jpg", width: 1440, height: 1080, role: "Peserta / Webinar" },
  { title: "Exploring Cloud System: Membahas Software Terkini untuk Pemula dan Profesional", date: "11 November 2023", iso: "2023-11-11", image: "/images/certificate-extra-2.jpg", width: 1682, height: 1190, role: "Peserta / Webinar" },
  { title: "Meniti Karir di Perusahaan Multinasional", date: "19 Februari 2024", iso: "2024-02-19", image: "/images/certificate-extra-3.jpg", width: 1682, height: 1190, role: "Peserta / Kuliah Umum" },
  { title: "Peluang Karir dalam Era Kecerdasan Artificial Menghadapi Revolusi Industri 5.0", date: "4 Juni 2024", iso: "2024-06-04", image: "/images/certificate-extra-4.jpg", width: 1440, height: 1080, role: "Peserta / Kuliah Umum" },
  { title: "Visiting Lecture Big Data and Artificial Intelligence", date: "24 Agustus 2024", iso: "2024-08-24", image: "/images/certificate-extra-5.jpg", width: 1682, height: 1190, role: "Peserta / Visiting Lecture" },
  { title: "Teknik Keamanan Jaringan", date: "16 Juni 2025", iso: "2025-06-16", image: "/images/certificate-extra-6.jpg", width: 1685, height: 1191, role: "Peserta / Webinar" },
];

export default function Certificates() {
  return (
    <section id="certificates" aria-labelledby="certificates-title" className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24 lg:px-10">
      <div className="border-t border-white/10 pt-10">
        <p className="text-xs uppercase tracking-[0.24em] text-accent">05 / Sertifikat</p>
        <h2 id="certificates-title" className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Bagian dari perjalanan.</h2>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">Pengalaman sebagai panitia dan peserta dalam webinar, kuliah umum, serta visiting lecture.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[...certificates].sort((a, b) => b.iso.localeCompare(a.iso)).map((certificate) => (
            <article key={certificate.image} className="overflow-hidden rounded-2xl border border-white/10 bg-surface transition-colors duration-200 hover:border-accent/30">
              <a href={certificate.image} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`Lihat sertifikat ${certificate.title} (tab baru)`}>
                <Image src={certificate.image} alt={`Sertifikat atas nama Arya Agung Triadi: ${certificate.title}`} width={certificate.width} height={certificate.height} sizes="(max-width: 767px) 100vw, 50vw" className="h-auto w-full transition-opacity group-hover:opacity-85" />
              </a>
              <div className="p-6 sm:p-7">
                <p className="text-xs uppercase tracking-[0.18em] text-accent">{certificate.role}</p>
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


