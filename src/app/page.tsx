import { PageShell } from "@/shared/components/page-shell";
import { appText } from "@/shared/lib/dictionaries/app-text";

export default function HomePage() {
  return (
    <PageShell
      eyebrow={appText.home.eyebrow}
      title={appText.home.title}
      description={appText.home.description}
    >
      <ul className="space-y-3 text-sm text-slate-700">
        {appText.home.highlights.map((item) => (
          <li
            key={item}
            className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-sm shadow-slate-200/60"
          >
            {item}
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
