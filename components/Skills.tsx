const skillGroups = [
  {
    title: "Pemrograman & Web",
    description: "Bahasa dan teknologi dalam perjalanan belajarku.",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML", "CSS", "JavaScript", "PHP", "Python", "Java", "C", "C++"],
  },
  {
    title: "Desain & Editing",
    description: "Tools untuk UI/UX, foto, video, dan animasi.",
    items: ["Figma", "Canva", "Adobe Photoshop", "Adobe Premiere Pro", "Adobe Lightroom", "Adobe After Effects", "Adobe Illustrator", "Adobe Animate", "CapCut", "Alight Motion"],
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
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24 lg:px-10"
    >
      <div className="border-t border-white/10 pt-10">
        <p className="text-xs uppercase tracking-[0.24em] text-accent">02 / Skills</p>
        <div className="mt-5 grid gap-5 md:grid-cols-2 md:items-end">
          <h2 id="skills-title" className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
            Bekal untuk<br />membangun karya.
          </h2>
          <p className="max-w-md leading-relaxed text-muted">
            Dari pengembangan web dan UI/UX hingga konten visual, 3D, dan audio, berikut teknologi dan tools yang menjadi bagian dari perjalanan belajarku.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <article key={group.title} aria-labelledby={`skill-group-${index}`} className="rounded-2xl border border-white/10 bg-surface transition-colors duration-200 hover:border-accent/30 p-6 sm:p-7">
              <span aria-hidden="true" className="text-xs font-mono text-accent">0{index + 1}</span>
              <h3 id={`skill-group-${index}`} className="mt-5 text-xl font-semibold">{group.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{group.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Daftar skill ${group.title}`}>
                {group.items.map((item) => (
                  <li key={item} className="rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-foreground">{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
