"use client";

import { useLanguage } from "./Language";

import Typewriter from "./Typewriter";
const skillIcons: Record<string, string> = {
  "Next.js": "nextjs.svg",
  "React": "react.svg",
  "TypeScript": "typescript.svg",
  "Tailwind CSS": "tailwindcss.svg",
  "HTML": "html5.png",
  "CSS": "css3.png",
  "JavaScript": "javascript.png",
  "PHP": "php.svg",
  "Python": "python.svg",
  "Java": "java.svg",
  "C": "c.png",
  "C++": "cplusplus.svg",
  "SQL": "sql.svg",
  "Supabase": "supabase.svg",
  "Flutter": "flutter.svg",
  "Dart": "dart.svg",
  "Figma": "figma.svg",
  "Canva": "canva.svg",
  "Blender": "blender.svg",
  "Unity Hub": "unity.svg",
  "Adobe Photoshop": "adobe-photoshop.svg",
  "Adobe Premiere Pro": "adobe-premiere-pro.svg",
  "Adobe Lightroom": "adobe-lightroom.svg",
  "Adobe After Effects": "adobe-after-effects.svg",
  "Adobe Illustrator": "adobe-illustrator.svg",
  "CapCut": "capcut.ico",
  "Alight Motion": "alight-motion.png",
  "FL Studio": "fl-studio.ico",
  "Google Workspace": "google-workspace.svg",
  "Microsoft 365": "microsoft-365.svg"
};

const skillGroups = [
  {
    title: "Pemrograman & Web",
    description: "Bahasa dan teknologi untuk web, database, dan aplikasi mobile dalam perjalanan belajarku.",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML", "CSS", "JavaScript", "PHP", "Python", "Java", "C", "C++", "SQL", "Supabase", "Flutter", "Dart"],
  },
  {
    title: "Desain & Editing",
    description: "Tools untuk UI/UX, foto, video, dan animasi.",
    items: ["Figma", "Canva", "Adobe Photoshop", "Adobe Premiere Pro", "Adobe Lightroom", "Adobe After Effects", "Adobe Illustrator", "CapCut", "Alight Motion"],
  },
  {
    title: "3D, Game & Audio",
    description: "Tools untuk eksplorasi 3D, game, dan produksi audio.",
    items: ["Blender", "Unity Hub", "FL Studio"],
  },
  {
    title: "Produktivitas",
    description: "Tools pendukung pekerjaan dan kolaborasi.",
    items: ["Google Workspace", "Microsoft 365"],
  },
];

export default function Skills() {
  const { t } = useLanguage();
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24 lg:px-10"
    >
      <div className="border-t border-foreground/10 pt-10">
        <p className="text-xs uppercase tracking-[0.24em] text-accent">02 / Skills</p>
        <div className="mt-5 grid gap-5 md:grid-cols-2 md:items-end">
          <h2 id="skills-title" className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">{t("Bekal untuk")}<br /><Typewriter words={[t("membangun karya.")]} />
          </h2>
          <p className="max-w-md leading-relaxed text-muted">{t("Dari pengembangan web dan UI/UX hingga konten visual, 3D, dan audio, berikut teknologi dan tools yang menjadi bagian dari perjalanan belajarku.")}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <article key={group.title} aria-labelledby={`skill-group-${index}`} className="rounded-2xl border border-foreground/10 bg-surface transition-colors duration-200 hover:border-accent/30 p-6 sm:p-7">
              <span aria-hidden="true" className="text-xs font-mono text-accent">0{index + 1}</span>
              <h3 id={`skill-group-${index}`} className="mt-5 text-xl font-semibold">{t(group.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t(group.description)}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${t("Daftar skill")} ${t(group.title)}`}>
                {group.items.map((item) => (
                  <li key={item} className="skill-badge inline-flex items-center gap-2 rounded-lg border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground">
                    <span className="skill-icon inline-flex h-5 w-5 shrink-0 items-center justify-center" aria-hidden="true">
                      {/* Local icons keep the skill list independent of external image services. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/icons/skills/${skillIcons[item]}`} alt="" width={20} height={20} loading="lazy" className={`h-5 w-5 object-contain ${item === "Next.js" || item === "Unity Hub" ? "skill-icon-monochrome" : ""}`} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
