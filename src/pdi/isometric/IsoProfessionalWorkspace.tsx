import React, { useEffect, useState } from "react";
import { Maximize2, Minus, Plus, Save, MousePointer2, Hand, Ruler, Grid3X3, Layers3, Eye, Settings2 } from "lucide-react";
import PdiIsometricEditor from "./PdiIsometricEditor";

type Tool = "select" | "pan" | "dimension";

const TOOLS: Array<{ id: Tool; label: string; shortcut: string; icon: React.ReactNode }> = [
  { id: "select", label: "Sélection", shortcut: "V", icon: <MousePointer2 size={14} /> },
  { id: "pan", label: "Déplacer la vue", shortcut: "H", icon: <Hand size={14} /> },
  { id: "dimension", label: "Cotation", shortcut: "D", icon: <Ruler size={14} /> },
];

/**
 * Professional drawing shell around the proven V4.8d engine.
 * The shell owns drawing-session UX; the engine remains the source of truth
 * for piping geometry and editing operations.
 */
export default function IsoProfessionalWorkspace() {
  const [tool, setTool] = useState<Tool>("select");
  const [grid, setGrid] = useState(true);
  const [layersOpen, setLayersOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(true);
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      const key = event.key.toLowerCase();
      const match = TOOLS.find((item) => item.shortcut.toLowerCase() === key);
      if (match) {
        event.preventDefault();
        setTool(match.id);
      }
      if (key === "g") setGrid((value) => !value);
      if (key === "escape") {
        setLayersOpen(false);
        setPropertiesOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#0b0e11] text-slate-100">
      <header className="flex h-12 shrink-0 items-center border-b border-slate-800 bg-[#11151a] px-3">
        <div className="flex items-center gap-3">
          <div className="grid h-7 w-7 place-items-center rounded-md border border-cyan-500/25 bg-cyan-500/10 text-[9px] font-bold text-cyan-300">ISO</div>
          <div>
            <div className="text-xs font-semibold">Éditeur isométrique</div>
            <div className="text-[9px] uppercase tracking-[0.16em] text-slate-600">Dessin professionnel · V4.8d</div>
          </div>
        </div>

        <div className="ml-8 flex items-center gap-1">
          {TOOLS.map((item) => (
            <button
              key={item.id}
              title={`${item.label} (${item.shortcut})`}
              onClick={() => setTool(item.id)}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] transition ${tool === item.id ? "bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/30" : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"}`}
            >
              {item.icon}<span>{item.label}</span><kbd className="ml-1 text-[8px] text-slate-600">{item.shortcut}</kbd>
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button title="Afficher/masquer la grille (G)" onClick={() => setGrid((value) => !value)} className={`rounded-md p-2 ${grid ? "bg-slate-800 text-cyan-300" : "text-slate-600 hover:bg-slate-800"}`}><Grid3X3 size={14} /></button>
          <button title="Calques" onClick={() => setLayersOpen((value) => !value)} className={`rounded-md p-2 ${layersOpen ? "bg-slate-800 text-cyan-300" : "text-slate-600 hover:bg-slate-800"}`}><Layers3 size={14} /></button>
          <button title="Propriétés" onClick={() => setPropertiesOpen((value) => !value)} className={`rounded-md p-2 ${propertiesOpen ? "bg-slate-800 text-cyan-300" : "text-slate-600 hover:bg-slate-800"}`}><Settings2 size={14} /></button>
          <span className="mx-2 h-5 w-px bg-slate-800" />
          <button title="Enregistrer" onClick={() => setSaved(true)} className="flex items-center gap-1.5 rounded-md border border-slate-700 px-2.5 py-1.5 text-[10px] text-slate-400 hover:bg-slate-800 hover:text-slate-200"><Save size={13} /> Enregistrer</button>
          <button title="Plein écran" className="rounded-md p-2 text-slate-500 hover:bg-slate-800 hover:text-slate-200"><Maximize2 size={14} /></button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-12 shrink-0 flex-col items-center gap-1 border-r border-slate-800 bg-[#0e1216] py-2 lg:flex">
          <button title="Zoom avant" className="rounded-md p-2 text-slate-500 hover:bg-slate-800 hover:text-slate-200"><Plus size={15} /></button>
          <button title="Zoom arrière" className="rounded-md p-2 text-slate-500 hover:bg-slate-800 hover:text-slate-200"><Minus size={15} /></button>
          <span className="my-1 h-px w-6 bg-slate-800" />
          <button title="Vue" className="rounded-md p-2 text-slate-500 hover:bg-slate-800 hover:text-slate-200"><Eye size={15} /></button>
        </aside>

        <main className="relative min-w-0 flex-1 overflow-hidden">
          <PdiIsometricEditor />
          {grid && <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)", backgroundSize: "24px 24px" }} />}
        </main>

        {propertiesOpen && (
          <aside className="hidden w-64 shrink-0 border-l border-slate-800 bg-[#11151a] xl:block">
            <div className="border-b border-slate-800 px-3 py-3">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Propriétés</div>
            </div>
            <div className="space-y-4 p-3 text-[10px] text-slate-500">
              <div>
                <div className="mb-1 text-slate-600">Outil actif</div>
                <div className="rounded-md border border-slate-800 bg-[#0c0f12] px-2.5 py-2 text-slate-300">{TOOLS.find((item) => item.id === tool)?.label}</div>
              </div>
              <div>
                <div className="mb-1 text-slate-600">Affichage</div>
                <div className="rounded-md border border-slate-800 bg-[#0c0f12] px-2.5 py-2 text-slate-300">Grille {grid ? "activée" : "désactivée"}</div>
              </div>
              <div className="rounded-md border border-slate-800 bg-[#0c0f12] p-2.5 leading-5">
                Les propriétés de l'objet sélectionné seront reliées au modèle ISO canonique dans l'étape suivante.
              </div>
            </div>
          </aside>
        )}

        {layersOpen && (
          <div className="absolute right-3 top-14 z-30 w-56 rounded-lg border border-slate-700 bg-[#151a20] p-2 shadow-2xl">
            <div className="px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Calques ISO</div>
            {[
              ["Tuyauterie", true], ["Équipements", true], ["Cotations", true], ["Repères", true], ["Soudures", false]
            ].map(([label, visible]) => (
              <div key={String(label)} className="flex items-center justify-between rounded-md px-2 py-2 text-[10px] text-slate-300 hover:bg-slate-800">
                <span>{String(label)}</span><span className={visible ? "text-emerald-400" : "text-slate-600"}>{visible ? "●" : "○"}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="flex h-7 shrink-0 items-center justify-between border-t border-slate-800 bg-[#0a0d10] px-3 text-[9px] text-slate-600">
        <div className="flex items-center gap-4"><span className="text-emerald-500">● Prêt</span><span>Outil : {TOOLS.find((item) => item.id === tool)?.label}</span><span>Grille : {grid ? "ON" : "OFF"}</span></div>
        <div className="flex items-center gap-4"><span>{saved ? "Enregistré" : "Modifications non enregistrées"}</span><span>ISO V4.8d</span></div>
      </footer>
    </div>
  );
}
