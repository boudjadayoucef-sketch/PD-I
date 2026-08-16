import React from "react";
import PdiIsometricEditor from "./PdiIsometricEditor";

const TOOLBAR = [
  { id: "select", label: "Sélection" },
  { id: "pipe", label: "Tube" },
  { id: "elbow", label: "Coude" },
  { id: "tee", label: "Té" },
  { id: "valve", label: "Vanne" },
  { id: "dimension", label: "Cote" },
];

export interface IsoWorkspaceProps {
  projectName?: string;
}

/**
 * SaaS shell around the preserved V4.8d engine.
 *
 * The shell owns workspace/navigation concerns; the legacy engine remains the
 * rendering/editing implementation until its services are progressively
 * extracted behind the canonical PDI model.
 */
export default function IsoWorkspace({ projectName = "Nouveau projet" }: IsoWorkspaceProps) {
  return (
    <section className="flex h-full min-h-0 flex-col bg-[#0c0f12] text-slate-100">
      <header className="flex h-12 shrink-0 items-center gap-3 border-b border-slate-800 bg-[#11151a] px-3">
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400">ISO</div>
          <div className="truncate text-xs font-medium text-slate-200">{projectName}</div>
        </div>
        <div className="ml-3 flex items-center gap-1 overflow-x-auto">
          {TOOLBAR.map((tool, index) => (
            <button
              key={tool.id}
              type="button"
              title={`${tool.label}${index === 0 ? " (actif)" : ""}`}
              className={`whitespace-nowrap rounded-md border px-2.5 py-1.5 text-[10px] transition ${
                index === 0
                  ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                  : "border-slate-800 bg-slate-900/60 text-slate-500 hover:border-slate-700 hover:text-slate-300"
              }`}
            >
              {tool.label}
            </button>
          ))}
        </div>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <span className="rounded border border-slate-800 px-2 py-1 text-[9px] text-slate-600">ISO V4.8d</span>
          <span className="rounded border border-emerald-900/60 bg-emerald-500/5 px-2 py-1 text-[9px] text-emerald-400">Modèle local</span>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-hidden">
        <PdiIsometricEditor />
      </div>
    </section>
  );
}
