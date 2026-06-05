"use client";

import { useState, useTransition, useRef } from "react";
import Image from "next/image";
import type { Publication } from "@prisma/client";
import {
  createPublication, updatePublication, deletePublication,
  togglePublished, generateUniqueSlug, type PublicationFormData,
} from "./actions";
import {
  Plus, Pencil, Trash2, ToggleLeft, ToggleRight,
  X, Loader2, FileText, Camera, Eye, EyeOff,
} from "lucide-react";

const CATEGORIES = [
  "Suivi & Évaluation", "Méthodologie", "Formation", "Numérique",
  "Études & Recherches", "Développement local", "Actualité CESEPEF",
];

const emptyForm: PublicationFormData = {
  title: "", slug: "", excerpt: "", content: "",
  coverImage: "", category: "", tags: "",
  author: "Équipe CESEPEF", published: false,
};

function Modal({ title, wide = false, onClose, children }: {
  title: string; wide?: boolean; onClose: () => void; children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className={`flex max-h-[92vh] flex-col rounded-2xl bg-white shadow-2xl dark:bg-gray-900 ${wide ? "w-full max-w-3xl" : "w-full max-w-xl"}`}>
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function CoverUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setError(""); setUploading(true);
    const fd = new FormData(); fd.append("file", file);
    try {
      const res = await fetch("/api/upload/publications", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Erreur upload");
      onChange(json.url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally { setUploading(false); }
  };

  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Image de couverture</label>
      <div className="flex gap-4">
        <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
          {value
            ? <Image src={value} alt="cover" fill className="object-cover" />
            : <div className="flex h-full items-center justify-center text-xs text-gray-300">16:9</div>
          }
          {uploading && <div className="absolute inset-0 flex items-center justify-center bg-black/40"><Loader2 size={18} className="animate-spin text-white" /></div>}
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2">
          <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary disabled:opacity-50 dark:border-gray-600 dark:text-gray-300">
            <Camera size={13} /> {uploading ? "Envoi…" : "Choisir une image"}
          </button>
          <p className="text-[11px] text-gray-400">JPG, PNG, WEBP — max 3 Mo. Format 16:9 recommandé.</p>
          {error && <p className="text-[11px] text-red-500">{error}</p>}
          {value && <button type="button" onClick={() => onChange("")} className="text-left text-[11px] text-red-400 hover:underline">Supprimer</button>}
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
    </div>
  );
}

function PublicationForm({ initial, onSubmit, onCancel, loading }: {
  initial: PublicationFormData;
  onSubmit: (d: PublicationFormData) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [form, setForm] = useState<PublicationFormData>(initial);
  const [genSlug, setGenSlug] = useState(false);
  const set = <K extends keyof PublicationFormData>(k: K, v: PublicationFormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleTitleBlur = async () => {
    if (!form.slug && form.title) {
      setGenSlug(true);
      const slug = await generateUniqueSlug(form.title);
      set("slug", slug);
      setGenSlug(false);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="flex flex-col overflow-hidden">
      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
        <CoverUpload value={form.coverImage} onChange={(url) => set("coverImage", url)} />

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Titre *</label>
          <input required value={form.title}
            onChange={(e) => set("title", e.target.value)}
            onBlur={handleTitleBlur}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Titre de la publication" />
        </div>

        <div>
          <label className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300">
            Slug (URL)
            {genSlug && <Loader2 size={11} className="animate-spin text-gray-400" />}
          </label>
          <input value={form.slug} onChange={(e) => set("slug", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 font-mono text-xs focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="auto-généré depuis le titre" />
          <p className="mt-0.5 text-[11px] text-gray-400">/blog/{form.slug || "slug-auto"}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Catégorie</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <option value="">— Choisir —</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Auteur</label>
            <input value={form.author} onChange={(e) => set("author", e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="Équipe CESEPEF" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Tags (séparés par des virgules)</label>
          <input value={form.tags ?? ""} onChange={(e) => set("tags", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="suivi-évaluation, OCDE-CAD, Tchad" />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Extrait / Résumé</label>
          <textarea rows={2} value={form.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Courte description affichée sur la liste d'articles..." />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Contenu *</label>
          <textarea required rows={10} value={form.content} onChange={(e) => set("content", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Contenu complet de l'article..." />
        </div>

        <button type="button" onClick={() => set("published", !form.published)}
          className={`flex items-center gap-2 text-sm font-medium ${form.published ? "text-green-600" : "text-gray-400"}`}>
          {form.published ? <Eye size={18} /> : <EyeOff size={18} />}
          {form.published ? "Publié (visible sur le site)" : "Brouillon (non visible)"}
        </button>
      </div>

      <div className="flex shrink-0 justify-end gap-3 border-t border-gray-100 px-6 py-4 dark:border-gray-700">
        <button type="button" onClick={onCancel}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300">
          Annuler
        </button>
        <button type="submit" disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60">
          {loading && <Loader2 size={14} className="animate-spin" />}
          Enregistrer
        </button>
      </div>
    </form>
  );
}

export default function PublicationClient({ publications }: { publications: Publication[] }) {
  const [list, setList] = useState(publications);
  const [modal, setModal] = useState<"add" | "edit" | "delete" | null>(null);
  const [selected, setSelected] = useState<Publication | null>(null);
  const [isPending, startTransition] = useTransition();

  const close = () => { setModal(null); setSelected(null); };

  const handleCreate = (data: PublicationFormData) => {
    startTransition(async () => { await createPublication(data); close(); });
  };
  const handleUpdate = (data: PublicationFormData) => {
    if (!selected) return;
    startTransition(async () => {
      await updatePublication(selected.id, data);
      setList((l) => l.map((p) => p.id === selected.id ? { ...p, ...data } : p));
      close();
    });
  };
  const handleDelete = () => {
    if (!selected) return;
    startTransition(async () => {
      await deletePublication(selected.id);
      setList((l) => l.filter((p) => p.id !== selected.id));
      close();
    });
  };
  const handleToggle = (p: Publication) => {
    startTransition(async () => {
      await togglePublished(p.id, !p.published);
      setList((l) => l.map((x) => x.id === p.id ? { ...x, published: !x.published } : x));
    });
  };

  const published = list.filter((p) => p.published).length;

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-gray-700 dark:text-gray-200">{list.length}</span> articles ·{" "}
          <span className="font-medium text-green-600">{published} publiés</span>{" "}
          {list.length - published > 0 && <span className="text-gray-400">· {list.length - published} brouillon(s)</span>}
        </p>
        <button onClick={() => setModal("add")}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
          <Plus size={16} /> Nouvel article
        </button>
      </div>

      {list.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl bg-white py-16 text-gray-400 shadow-sm dark:bg-gray-900">
          <FileText size={40} strokeWidth={1.5} />
          <p className="text-sm">Aucune publication</p>
          <button onClick={() => setModal("add")} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">
            Rédiger le premier article
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-xl bg-white p-5 shadow-sm dark:bg-gray-900">
              <div className="flex items-center gap-4">
                {/* Miniature */}
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  {p.coverImage
                    ? <Image src={p.coverImage} alt={p.title} fill className="object-cover" />
                    : <div className="flex h-full items-center justify-center"><FileText size={18} className="text-gray-300" /></div>
                  }
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium text-gray-800 dark:text-white">{p.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    {p.category && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{p.category}</span>}
                    <span className="text-xs text-gray-400">
                      {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("fr-FR") : new Date(p.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                    <span className="font-mono text-[11px] text-gray-300">/blog/{p.slug}</span>
                  </div>
                </div>
              </div>
              <div className="ml-4 flex shrink-0 items-center gap-2">
                <button onClick={() => handleToggle(p)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                    p.published ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}>
                  {p.published ? <Eye size={12} /> : <EyeOff size={12} />}
                  {p.published ? "Publié" : "Brouillon"}
                </button>
                <button onClick={() => { setSelected(p); setModal("edit"); }}
                  className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary dark:border-gray-600">
                  <Pencil size={12} /> Modifier
                </button>
                <button onClick={() => { setSelected(p); setModal("delete"); }}
                  className="flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50">
                  <Trash2 size={12} /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal === "add" && (
        <Modal title="Nouvel article" wide onClose={close}>
          <PublicationForm initial={emptyForm} onSubmit={handleCreate} onCancel={close} loading={isPending} />
        </Modal>
      )}

      {modal === "edit" && selected && (
        <Modal title="Modifier l'article" wide onClose={close}>
          <PublicationForm
            initial={{ title: selected.title, slug: selected.slug, excerpt: selected.excerpt ?? "", content: selected.content, coverImage: selected.coverImage ?? "", category: selected.category ?? "", tags: selected.tags ?? "", author: selected.author, published: selected.published }}
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
            <button onClick={close} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-600">Annuler</button>
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
