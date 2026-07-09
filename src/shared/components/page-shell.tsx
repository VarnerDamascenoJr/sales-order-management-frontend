import { cn } from "@/shared/utils/cn";

type PageShellProps = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}>;

export function PageShell({
  eyebrow,
  title,
  description,
  children,
  className,
}: PageShellProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-6 py-16">
      <section
        className={cn(
          "w-full rounded-[2rem] border border-white/60 bg-white/75 p-8 shadow-xl shadow-cyan-950/5 backdrop-blur sm:p-12",
          className,
        )}
      >
        <span className="inline-flex rounded-full bg-brand-light px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-dark">
          {eyebrow}
        </span>
        <div className="mt-6 max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            {description}
          </p>
        </div>
        <div className="mt-10">{children}</div>
      </section>
    </main>
  );
}
