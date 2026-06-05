"use client";

import { useState, useTransition } from "react";
import type { Service } from "@prisma/client";
import {
  createService,
  updateService,
  deleteService,
  toggleServiceStatus,
  type ServiceFormData,
} from "./actions";
import {
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  X,
  Loader2,
  Layers,
  Star,
  PlusCircle,
  XCircle,
} from "lucide-react";

const emptyForm: ServiceFormData = {
  title: "",
  description: "",
  cible: "",
  delai: "",
  livrables: [""],
  highlight: false,
  isActive: true,
  order: 0,
};

function parseLivrables(raw: string | null): string[] {
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-xl flex-col rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
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

function ServiceForm({
  initial,
  onSubmit,
  onCancel,
  loading,
}: {
  initial: ServiceFormData;
  onSubmit: (d: ServiceFormData) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [form, setForm] = useState<ServiceFormData>(initial);
  const set = <K extends keyof ServiceFormData>(k: K, v: ServiceFormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const setLivrable = (i: number, v: string) =>
    setForm((f) => { const l = [...f.livrables]; l[i] = v; return { ...f, livrables: l }; });
  const addLivrable = () => setForm((f) => ({ ...f, livrables: [...f.livrables, ""] }));
  const removeLivrable = (i: number) =>
    setForm((f) => ({ ...f, livrables: f.livrables.filter((_, idx) => idx !== i) }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="flex flex-col overflow-hidden">
      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Titre *</label>
          <input required value={form.title} onChange={(e) => set("title", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Évaluation 360°" />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Description *</label>
          <textarea required rows={3} value={form.description} onChange={(e) => set("description", e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Présentation de l'offre..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Public cible</label>
            <input value={form.cible} onChange={(e) => set("cible", e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="Bailleurs, ONG..." />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Délai indicatif</label>
            <input value={form.delai} onChange={(e) => set("delai", e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="8 à 16 semaines" />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-300">Livrables</label>
            <button type="button" onClick={addLivrable}
              className="flex items-center gap-1 text-xs text-primary hover:underline">
              <PlusCircle size={13} /> Ajouter
            </button>
          </div>
          <div className="space-y-2">
            {form.livrables.map((l, i) => (
              <div key={i} className="flex items-center gap-2">
                <input value={l} onChange={(e) => setLivrable(i, e.target.value)}
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  placeholder={`Livrable ${i + 1}`} />
                <button type="button" onClick={() => removeLivrable(i)}
                  className="text-red-400 hover:text-red-600 disabled:opacity-30"
                  disabled={form.livrables.length <= 1}>
                  <XCircle size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Ordre</label>
            <input type="number" min={0} value={form.order} onChange={(e) => set("order", parseInt(e.target.value) || 0)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
          </div>
          <div className="flex flex-col gap-2 pt-5">
            <button type="button" onClick={() => set("highlight", !form.highlight)}
              className={`flex items-center gap-2 text-sm font-medium ${form.highlight ? "text-yellow-500" : "text-gray-400"}`}>
              <Star size={16} fill={form.highlight ? "currentColor" : "none"} />
              {form.highlight ? "Offre mise en avant" : "Offre standard"}
            </button>
            <button type="button" onClick={() => set("isActive", !form.isActive)}
              className={`flex items-center gap-2 text-sm font-medium ${form.isActive ? "text-green-600" : "text-gray-400"}`}>
              {form.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
              {form.isActive ? "Active" : "Inactive"}
            </button>
          </div>
        </div>
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

export default function ServiceClient({ services }: { services: Service[] }) {
  const [list, setList] = useState(services);
  const [modal, setModal] = useState<"add" | "edit" | "delete" | null>(null);
  const [selected, setSelected] = useState<Service | null>(null);
  const [isPending, startTransition] = useTransition();

  const close = () => { setModal(null); setSelected(null); };

  const handleCreate = (data: ServiceFormData) => {
    startTransition(async () => { await createService(data); close(); });
  };
  const handleUpdate = (data: ServiceFormData) => {
    if (!selected) return;
    startTransition(async () => {
      await updateService(selected.id, data);
      setList((l) => l.map((s) => s.id === selected.id ? { ...s, ...data, livrables: JSON.stringify(data.livrables) } : s));
      close();
    });
  };
  const handleDelete = () => {
    if (!selected) return;
    startTransition(async () => {
      await deleteService(selected.id);
      setList((l) => l.filter((s) => s.id !== selected.id));
      close();
    });
  };
  const handleToggle = (s: Service) => {
    startTransition(async () => {
      await toggleServiceStatus(s.id, !s.isActive);
      setList((l) => l.map((x) => x.id === s.id ? { ...x, isActive: !x.isActive } : x));
    });
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-gray-700 dark:text-gray-200">{list.length}</span> offres ·{" "}
          <span className="font-medium text-green-600">{list.filter((s) => s.isActive).length} actives</span>
        </p>
        <button onClick={() => setModal("add")}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
          <Plus size={16} /> Ajouter un service
        </button>
      </div>

      <div className="rounded-xl bg-white shadow-sm dark:bg-gray-900">
        {list.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
            <Layers size={40} strokeWidth={1.5} />
            <p className="text-sm">Aucun service</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <th className="px-6 py-4 font-semibold text-gray-500">Service</th>
                <th className="hidden px-6 py-4 font-semibold text-gray-500 md:table-cell">Cible</th>
                <th className="hidden px-6 py-4 font-semibold text-gray-500 lg:table-cell">Délai</th>
                <th className="px-6 py-4 font-semibold text-gray-500">Statut</th>
                <th className="px-6 py-4 font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {s.highlight && <Star size={14} className="shrink-0 text-yellow-400" fill="currentColor" />}
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{s.title}</p>
                        <p className="text-xs text-gray-400 line-clamp-1">{s.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-6 py-4 text-xs text-gray-500 md:table-cell">{s.cible ?? "—"}</td>
                  <td className="hidden px-6 py-4 text-xs text-gray-500 lg:table-cell">{s.delai ?? "—"}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleToggle(s)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                        s.isActive ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}>
                      {s.isActive ? <ToggleRight size={13} /> : <ToggleLeft size={13} />}
                      {s.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => { setSelected(s); setModal("edit"); }}
                        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary dark:border-gray-600">
                        <Pencil size={12} /> Modifier
                      </button>
                      <button onClick={() => { setSelected(s); setModal("delete"); }}
                        className="flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50">
                        <Trash2 size={12} /> Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal === "add" && (
        <Modal title="Ajouter un service" onClose={close}>
          <ServiceForm initial={emptyForm} onSubmit={handleCreate} onCancel={close} loading={isPending} />
        </Modal>
      )}

      {modal === "edit" && selected && (
        <Modal title="Modifier le service" onClose={close}>
          <ServiceForm
            initial={{
              title: selected.title,
              description: selected.description,
              cible: selected.cible ?? "",
              delai: selected.delai ?? "",
              livrables: parseLivrables(selected.livrables).length > 0 ? parseLivrables(selected.livrables) : [""],
              highlight: selected.highlight,
              isActive: selected.isActive,
              order: selected.order,
            }}
            onSubmit={handleUpdate}
            onCancel={close}
            loading={isPending}
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
              {isPending && <Loader2 size={14} className="animate-spin" />}
              Supprimer
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
