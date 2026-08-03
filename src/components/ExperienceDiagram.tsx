import { useState } from "react";

interface Job {
  id: number;
  date: string;
  title: string;
  company: string;
  description: string[];
}

interface Props {
  jobs: Job[];
}

export default function ExperienceDiagram({ jobs }: Props) {
  const ordered = [...jobs].reverse();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <ol className="relative ml-4 flex flex-col">
      {ordered.map((job, index) => {
        const isActive = index === 0;
        const isHovered = hoveredId === job.id;
        const isLast = index === ordered.length - 1;

        return (
          <li key={job.id} className="relative pb-10 pl-8 last:pb-0">
            {!isLast && (
              <span
                className={`absolute left-[7px] top-4 h-full w-px transition-colors ${
                  isHovered ? "bg-blueprint-accent" : "bg-blueprint-line"
                }`}
              />
            )}
            <span
              className={`absolute left-0 top-1.5 flex size-4 items-center justify-center rounded-full border transition-colors ${
                isActive
                  ? "border-blueprint-accent bg-blueprint-accent/20"
                  : "border-blueprint-line bg-blueprint-bg"
              }`}
            >
              {isActive && (
                <span className="size-2 rounded-full bg-blueprint-accent animate-pulse" />
              )}
            </span>

            <div
              onMouseEnter={() => setHoveredId(job.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`rounded-lg border bg-blueprint-panel/60 p-4 transition-colors ${
                isHovered ? "border-blueprint-accent" : "border-blueprint-line"
              }`}
            >
              <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-widest text-blueprint-accent">
                <span>NODE_{String(job.id).padStart(2, "0")}</span>
                {isActive && (
                  <span className="rounded border border-blueprint-accent/50 px-1.5 py-0.5 text-blueprint-accent">
                    ACTIVE
                  </span>
                )}
                <span className="text-slate-400">{job.date}</span>
              </div>
              <h3 className="mt-1 text-lg font-semibold text-slate-100">
                {job.title}
              </h3>
              <h4 className="text-base font-semibold text-blueprint-accent2">
                {job.company}
              </h4>
              <ul className="mt-2 flex flex-col gap-1.5 text-base font-normal text-slate-300">
                {job.description.map((bullet, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-0.5 shrink-0 text-blueprint-accent">▹</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
