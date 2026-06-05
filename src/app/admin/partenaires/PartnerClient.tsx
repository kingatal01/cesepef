"use client";

import { useState, useTransition, useRef } from "react";
import Image from "next/image";
import type { Partner } from "@prisma/client";
import {
  createPartner,
  updatePartner,
  deletePartner,
  togglePartnerStatus,
  type PartnerFormData,
} from "./actions";
import {
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  X,
  Loader2,
  Handshake,
  Camera,
  Globe,
} from "lucide-react";

const CATEGORIES = [
  "Multilatéral",
  "Bilatéral",
  "Nations Unies",
  "Institution financière",
  "ONG internationale",
  "État / Gouvernement",
  "Secteur privé",
];

const emptyForm: PartnerFormData = {
  name: "",
  logo: "",
  website: "",
  category: "",
  isActive: true,
  order: 0,
};

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
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

function LogoUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setError("");
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload/partners", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Erreur upload");
      onChange(json.url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur upload");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Logo</label>
      <div className="flex items-center gap-4">
        <div className="relative flex h-16 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
          {value ? (
            <Image src={value} alt="logo" fill className="object-contain p-1" />
          ) : (
            <span className="text-[10px] text-gray-300">Logo</span>
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Loader2 size={16} className="animate-spin text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 space-y-1.5">
          <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary disabled:opacity-50 dark:border-gray-600 dark:text-gray-300">
            <Camera size={13} />
            {uploading ? "Envoi…" : "Choisir un logo"}
          </button>
          <p className="text-[11px] text-gray-400">JPG, PNG, WEBP, SVG — max 2 Mo</p>
          {error && <p className="text-[11px] text-red-500">{error}</p>}
          {value && (
            <button type="button" onClick={() => onChange("")} className="text-[11px] text-red-400 hover:underline">
              Supprimer le logo
            </button>
          )}
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
    </div>
  );
}

function PartnerForm({
  initial, onSubmit, onCancel, loading,
}: {
  initial: PartnerFormData;
  onSubmit: (d: PartnerFormData) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [form, setForm] = useState<PartnerFormData>(initial);
  const set = <K extends keyof PartnerFormData>(k: K, v: PartnerFormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="flex flex-col overflow-hidden">
      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
        <LogoUpload value={form.logo} onChange={(url) => set("logo", url)} />

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Nom *</label>
          <input required value={form.name} onChange={(e) => set("name", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Banque Mondiale" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Catégorie</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <option value="">— Sélectionner —</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Ordre</label>
            <input type="number" min={0} value={form.order} onChange={(e) => set("order", parseInt(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
            <span className="flex items-center gap-1"><Globe size={12} /> Site web</span>
          </label>
          <input value={form.website} onChange={(e) => set("website", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="https://..." />
        </div>

        <button type="button" onClick={() => set("isActive", !form.isActive)}
          className={`flex items-center gap-2 text-sm font-medium ${form.isActive ? "text-green-600" : "text-gray-400"}`}>
          {form.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
          {form.isActive ? "Partenaire actif" : "Partenaire inactif"}
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

function LogoCard({ partner }: { partner: Partner }) {
  return (
    <div className="flex h-14 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800">
      {partner.logo ? (
        <Image src={partner.logo} alt={partner.name} width={100} height={40} className="h-10 w-auto object-contain" />
      ) : (
        <span className="text-[11px] italic text-gray-300">Pas de logo</span>
      )}
    </div>
  );
}

export default function PartnerClient({ partners }: { partners: Partner[] }) {
  const [list, setList] = useState(partners);
  const [modal, setModal] = useState<"add" | "edit" | "delete" | null>(null);
  const [selected, setSelected] = useState<Partner | null>(null);
  const [isPending, startTransition] = useTransition();

  const close = () => { setModal(null); setSelected(null); };

  const handleCreate = (data: PartnerFormData) => {
    startTransition(async () => { await createPartner(data); close(); });
  };
  const handleUpdate = (data: PartnerFormData) => {
    if (!selected) return;
    startTransition(async () => {
      await updatePartner(selected.id, data);
      setList((l) => l.map((p) => p.id === selected.id ? { ...p, ...data } : p));
      close();
    });
  };
  const handleDelete = () => {
    if (!selected) return;
    startTransition(async () => {
      await deletePartner(selected.id);
      setList((l) => l.filter((p) => p.id !== selected.id));
      close();
    });
  };
  const handleToggle = (p: Partner) => {
    startTransition(async () => {
      await togglePartnerStatus(p.id, !p.isActive);
      setList((l) => l.map((x) => x.id === p.id ? { ...x, isActive: !x.isActive } : x));
    });
  };

  const actifs = list.filter((p) => p.isActive).length;

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-gray-700 dark:text-gray-200">{list.length}</span> partenaires ·{" "}
          <span className="font-medium text-green-600">{actifs} actifs</span>
        </p>
        <button onClick={() => setModal("add")}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
          <Plus size={16} /> Ajouter un partenaire
        </button>
      </div>

      {list.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl bg-white py-16 text-gray-400 shadow-sm dark:bg-gray-900">
          <Handshake size={40} strokeWidth={1.5} />
          <p className="text-sm">Aucun partenaire pour l&apos;instant</p>
          <button onClick={() => setModal("add")} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">
            Ajouter le premier partenaire
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => (
            <div key={p.id} className="group flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-900">
              <LogoCard partner={p} />
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{p.name}</p>
                {p.category && (
                  <span className="mt-0.5 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                    {p.category}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleToggle(p)}
                  className={`flex-1 rounded-lg px-2 py-1 text-xs font-medium transition ${
                    p.isActive ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}>
                  {p.isActive ? "Actif" : "Inactif"}
                </button>
                <button onClick={() => { setSelected(p); setModal("edit"); }}
                  className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:border-primary hover:text-primary dark:border-gray-600">
                  <Pencil size={13} />
                </button>
                <button onClick={() => { setSelected(p); setModal("delete"); }}
                  className="rounded-lg border border-red-100 p-1.5 text-red-400 hover:bg-red-50">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal === "add" && (
        <Modal title="Ajouter un partenaire" onClose={close}>
          <PartnerForm initial={emptyForm} onSubmit={handleCreate} onCancel={close} loading={isPending} />
        </Modal>
      )}

      {modal === "edit" && selected && (
        <Modal title="Modifier le partenaire" onClose={close}>
          <PartnerForm
            initial={{ name: selected.name, logo: selected.logo ?? "", website: selected.website ?? "", category: selected.category ?? "", isActive: selected.isActive, order: selected.order }}
            onSubmit={handleUpdate} onCancel={close} loading={isPending}
          />
        </Modal>
      )}

      {modal === "delete" && selected && (
        <Modal title="Confirmer la suppression" onClose={close}>
          <div className="px-6 py-5">
            <div className="mb-4 flex items-center gap-3">
              <LogoCard partner={selected} />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Supprimer <span className="font-semibold text-gray-800 dark:text-white">{selected.name}</span> ? Action irréversible.
            </p>
          </div>
          <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4 dark:border-gray-700">
            <button onClick={close} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-600">Annuler</button>
            <button onClick={handleDelete} disabled={isPending}
              className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-60">
              {isPending && <Loader2 size={14} className="animate-spin" />}
              Supprimer
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
