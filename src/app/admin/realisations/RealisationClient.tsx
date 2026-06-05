"use client";

import { useState, useTransition, useRef } from "react";
import Image from "next/image";
import type { Realisation } from "@prisma/client";
import {
  createRealisation, updateRealisation, deleteRealisation,
  togglePublished, type RealisationFormData,
} from "./actions";
import {
  Plus, Pencil, Trash2, ToggleLeft, ToggleRight,
  X, Loader2, Trophy, Camera, MapPin, Calendar, Building2, Eye, EyeOff,
} from "lucide-react";

const SECTEURS = [
  "Santé", "Éducation", "Agriculture & Sécurité alimentaire",
  "Environnement", "Emploi & Formation professionnelle",
  "Gouvernance", "Action humanitaire", "Développement territorial",
];

const PAYS = [
  "Tchad", "Cameroun", "RCA", "Niger", "Mali", "Burkina Faso",
  "Sénégal", "Côte d'Ivoire", "RDC", "Bénin", "Togo", "Autre",
];

const emptyForm: RealisationFormData = {
  title: "", description: "", client: "", sector: "",
  country: "Tchad", year: new Date().getFullYear(),
  image: "", tags: "", isPublished: true, order: 0,
};

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[92vh] w-full max-w-xl flex-col rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ImageUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setError(""); setUploading(true);
    const fd = new FormData(); fd.append("file", file);
    try {
      const res = await fetch("/api/upload/realisations", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      onChange(json.url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally { setUploading(false); }
  };

  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Photo / Image</label>
      <div className="flex gap-4">
        <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
          {value ? <Image src={value} alt="img" fill className="object-cover" />
            : <div className="flex h-full items-center justify-center text-xs text-gray-300">16:9</div>}
          {uploading && <div className="absolute inset-0 flex items-center justify-center bg-black/40"><Loader2 size={16} className="animate-spin text-white" /></div>}
        </div>
        <div className="flex flex-1 flex-col justify-center gap-1.5">
          <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary disabled:opacity-50 dark:border-gray-600">
            <Camera size={13} /> {uploading ? "Envoi…" : "Choisir une image"}
          </button>
          <p className="text-[11px] text-gray-400">JPG, PNG, WEBP — max 3 Mo</p>
          {error && <p className="text-[11px] text-red-500">{error}</p>}
          {value && <button type="button" onClick={() => onChange("")} className="text-left text-[11px] text-red-400 hover:underline">Supprimer</button>}
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
    </div>
  );
}

function RealisationForm({ initial, onSubmit, onCancel, loading }: {
  initial: RealisationFormData;
  onSubmit: (d: RealisationFormData) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [form, setForm] = useState<RealisationFormData>(initial);
  const set = <K extends keyof RealisationFormData>(k: K, v: RealisationFormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="flex flex-col overflow-hidden">
      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
        <ImageUpload value={form.image} onChange={(url) => set("image", url)} />

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Titre de la mission *</label>
          <input required value={form.title} onChange={(e) => set("title", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Évaluation finale du projet..." />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Description</label>
          <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Contexte, objectifs, résultats obtenus..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-1"><Building2 size={11} /> Commanditaire / Client</span>
            </label>
            <input value={form.client ?? ""} onChange={(e) => set("client", e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="UNICEF, Banque Mondiale..." />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-1"><Calendar size={11} /> Année</span>
            </label>
            <input type="number" min={2000} max={2099}
              value={form.year ?? ""} onChange={(e) => set("year", e.target.value ? parseInt(e.target.value) : null)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Secteur</label>
            <select value={form.sector ?? ""} onChange={(e) => set("sector", e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <option value="">— Choisir —</option>
              {SECTEURS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-1"><MapPin size={11} /> Pays</span>
            </label>
            <select value={form.country} onChange={(e) => set("country", e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              {PAYS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Tags (virgule-séparés)</label>
            <input value={form.tags ?? ""} onChange={(e) => set("tags", e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="évaluation, santé, UNICEF" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Ordre</label>
            <input type="number" min={0} value={form.order} onChange={(e) => set("order", parseInt(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          </div>
        </div>

        <button type="button" onClick={() => set("isPublished", !form.isPublished)}
          className={`flex items-center gap-2 text-sm font-medium ${form.isPublished ? "text-green-600" : "text-gray-400"}`}>
          {form.isPublished ? <Eye size={18} /> : <EyeOff size={18} />}
          {form.isPublished ? "Publiée (visible sur le site)" : "Non publiée"}
        </button>
      </div>

      <div className="flex shrink-0 justify-end gap-3 border-t border-gray-100 px-6 py-4 dark:border-gray-700">
        <button type="button" onClick={onCancel}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300">
          Annuler
        </button>
        <button type="submit" disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60">
          {loading && <Loader2 size={14} className="animate-spin" />} Enregistrer
        </button>
      </div>
    </form>
  );
}

export default function RealisationClient({ realisations }: { realisations: Realisation[] }) {
  const [list, setList] = useState(realisations);
  const [modal, setModal] = useState<"add" | "edit" | "delete" | null>(null);
  const [selected, setSelected] = useState<Realisation | null>(null);
  const [isPending, startTransition] = useTransition();

  const close = () => { setModal(null); setSelected(null); };

  const handleCreate = (data: RealisationFormData) => {
    startTransition(async () => { await createRealisation(data); close(); });
  };
  const handleUpdate = (data: RealisationFormData) => {
    if (!selected) return;
    startTransition(async () => {
      await updateRealisation(selected.id, data);
      setList((l) => l.map((r) => r.id === selected.id ? { ...r, ...data } : r));
      close();
    });
  };
  const handleDelete = () => {
    if (!selected) return;
    startTransition(async () => {
      await deleteRealisation(selected.id);
      setList((l) => l.filter((r) => r.id !== selected.id));
      close();
    });
  };
  const handleToggle = (r: Realisation) => {
    startTransition(async () => {
      await togglePublished(r.id, !r.isPublished);
      setList((l) => l.map((x) => x.id === r.id ? { ...x, isPublished: !x.isPublished } : x));
    });
  };

  const publiees = list.filter((r) => r.isPublished).length;

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-gray-700 dark:text-gray-200">{list.length}</span> missions ·{" "}
          <span className="font-medium text-green-600">{publiees} publiées</span>
        </p>
        <button onClick={() => setModal("add")}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
          <Plus size={16} /> Ajouter une mission
        </button>
      </div>

      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white py-20 dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Trophy size={32} strokeWidth={1.5} />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">Aucune réalisation</h3>
          <p className="mb-6 max-w-sm text-center text-sm text-gray-400">
            Ajoutez vos missions et références pour les afficher sur le site.
          </p>
          <button onClick={() => setModal("add")}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90">
            Ajouter la première mission
          </button>
        </div>
      ) : (
        <div className="rounded-xl bg-white shadow-sm dark:bg-gray-900">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <th className="px-6 py-4 font-semibold text-gray-500">Mission</th>
                <th className="hidden px-6 py-4 font-semibold text-gray-500 md:table-cell">Secteur</th>
                <th className="hidden px-6 py-4 font-semibold text-gray-500 lg:table-cell">Client</th>
                <th className="hidden px-6 py-4 font-semibold text-gray-500 lg:table-cell">Pays / Année</th>
                <th className="px-6 py-4 font-semibold text-gray-500">Statut</th>
                <th className="px-6 py-4 font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
                        {r.image
                          ? <Image src={r.image} alt={r.title} fill className="object-cover" />
                          : <div className="flex h-full items-center justify-center"><Trophy size={14} className="text-gray-300" /></div>}
                      </div>
                      <p className="line-clamp-2 text-sm font-medium text-gray-800 dark:text-white">{r.title}</p>
                    </div>
                  </td>
                  <td className="hidden px-6 py-4 md:table-cell">
                    {r.sector && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{r.sector}</span>}
                  </td>
                  <td className="hidden px-6 py-4 text-xs text-gray-500 lg:table-cell">{r.client ?? "—"}</td>
                  <td className="hidden px-6 py-4 lg:table-cell">
                    <div className="flex flex-col gap-0.5">
                      {r.country && <span className="flex items-center gap-1 text-xs text-gray-500"><MapPin size={10} />{r.country}</span>}
                      {r.year && <span className="flex items-center gap-1 text-xs text-gray-500"><Calendar size={10} />{r.year}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleToggle(r)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                        r.isPublished ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}>
                      {r.isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                      {r.isPublished ? "Publiée" : "Masquée"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => { setSelected(r); setModal("edit"); }}
                        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary dark:border-gray-600">
                        <Pencil size={12} /> Modifier
                      </button>
                      <button onClick={() => { setSelected(r); setModal("delete"); }}
                        className="flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50">
                        <Trash2 size={12} /> Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal === "add" && (
        <Modal title="Ajouter une mission" onClose={close}>
          <RealisationForm initial={emptyForm} onSubmit={handleCreate} onCancel={close} loading={isPending} />
        </Modal>
      )}
      {modal === "edit" && selected && (
        <Modal title="Modifier la mission" onClose={close}>
          <RealisationForm
            initial={{ title: selected.title, description: selected.description, client: selected.client ?? "", sector: selected.sector ?? "", country: selected.country, year: selected.year, image: selected.image ?? "", tags: selected.tags ?? "", isPublished: selected.isPublished, order: selected.order }}
            onSubmit={handleUpdate} onCancel={close} loading={isPending}
          />
        </Modal>
      )}
      {modal === "delete" && selected && (
        <Modal title="Confirmer la suppression" onClose={close}>
          <div className="px-6 py-5">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Supprimer <span className="font-semibold text-gray-800 dark:text-white">{selected.title}</span> ? Action irréversible.
            </p>
          </div>
          <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4 dark:border-gray-700">
            <button onClick={close} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 dark:border-gray-600">Annuler</button>
            <button onClick={handleDelete} disabled={isPending}
              className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-60">
              {isPending && <Loader2 size={14} className="animate-spin" />} Supprimer
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
