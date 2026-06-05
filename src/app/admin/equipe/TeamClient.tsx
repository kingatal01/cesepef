"use client";

import { useState, useTransition, useRef } from "react";
import Image from "next/image";
import {
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  toggleTeamMemberStatus,
} from "./actions";
import type { TeamMember } from "@prisma/client";
import {
  UserPlus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  X,
  Loader2,
  User,
  Camera,
} from "lucide-react";

const DEPARTMENTS = [
  "Direction / Gouvernance",
  "Suivi & Évaluation",
  "Études & Recherches",
  "Formation",
  "Conseil & Projets",
  "Administration",
];

const emptyForm = {
  name: "",
  role: "",
  department: "",
  bio: "",
  email: "",
  linkedin: "",
  photo: "",
  isActive: true,
  order: 0,
};

type FormData = typeof emptyForm;

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl dark:bg-gray-900 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-700 shrink-0">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function PhotoUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setError("");
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload/team", { method: "POST", body: fd });
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
      <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
        Photo
      </label>
      <div className="flex items-center gap-4">
        {/* Prévisualisation */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-dashed border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
          {value ? (
            <Image src={value} alt="photo" fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-300">
              <User size={32} />
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Loader2 size={20} className="animate-spin text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary disabled:opacity-50 dark:border-gray-600 dark:text-gray-300"
          >
            <Camera size={14} />
            {uploading ? "Envoi en cours…" : "Choisir une photo"}
          </button>
          <p className="text-[11px] text-gray-400">JPG, PNG, WEBP — max 2 Mo</p>
          {error && <p className="text-[11px] text-red-500">{error}</p>}
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-[11px] text-red-400 hover:underline"
            >
              Supprimer la photo
            </button>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

function MemberForm({
  initial,
  onSubmit,
  onCancel,
  loading,
}: {
  initial: FormData;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [form, setForm] = useState<FormData>(initial);
  const set = (key: keyof FormData, val: string | boolean | number) =>
    setForm((f) => ({ ...f, [key]: val }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="flex flex-col overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="space-y-4">
          {/* Photo */}
          <PhotoUpload value={form.photo} onChange={(url) => set("photo", url)} />

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                Nom complet *
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="ADOUMBEYE Amine"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                Poste / Fonction *
              </label>
              <input
                required
                value={form.role}
                onChange={(e) => set("role", e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="Chef de département"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                Département
              </label>
              <select
                value={form.department}
                onChange={(e) => set("department", e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="">— Sélectionner —</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                Ordre d&apos;affichage
              </label>
              <input
                type="number"
                min={0}
                value={form.order}
                onChange={(e) => set("order", parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="contact@cesepef.org"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                LinkedIn
              </label>
              <input
                value={form.linkedin}
                onChange={(e) => set("linkedin", e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div className="col-span-2">
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                Biographie courte
              </label>
              <textarea
                rows={3}
                value={form.bio}
                onChange={(e) => set("bio", e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="Expertise principale, parcours..."
              />
            </div>
            <div className="col-span-2">
              <button
                type="button"
                onClick={() => set("isActive", !form.isActive)}
                className={`flex items-center gap-2 text-sm font-medium ${form.isActive ? "text-green-600" : "text-gray-400"}`}
              >
                {form.isActive ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                {form.isActive ? "Membre actif" : "Membre inactif"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4 dark:border-gray-700 shrink-0">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-60"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          Enregistrer
        </button>
      </div>
    </form>
  );
}

function Avatar({ member }: { member: TeamMember }) {
  if (member.photo) {
    return (
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
        <Image src={member.photo} alt={member.name} fill className="object-cover" />
      </div>
    );
  }
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
      {member.name.charAt(0)}
    </div>
  );
}

export default function TeamClient({ members }: { members: TeamMember[] }) {
  const [list, setList] = useState(members);
  const [modal, setModal] = useState<"add" | "edit" | "delete" | null>(null);
  const [selected, setSelected] = useState<TeamMember | null>(null);
  const [isPending, startTransition] = useTransition();

  const openAdd = () => { setSelected(null); setModal("add"); };
  const openEdit = (m: TeamMember) => { setSelected(m); setModal("edit"); };
  const openDelete = (m: TeamMember) => { setSelected(m); setModal("delete"); };
  const close = () => { setModal(null); setSelected(null); };

  const handleCreate = (data: FormData) => {
    startTransition(async () => {
      await createTeamMember(data);
      close();
    });
  };

  const handleUpdate = (data: FormData) => {
    if (!selected) return;
    startTransition(async () => {
      await updateTeamMember(selected.id, data);
      setList((l) => l.map((m) => (m.id === selected.id ? { ...m, ...data } : m)));
      close();
    });
  };

  const handleDelete = () => {
    if (!selected) return;
    startTransition(async () => {
      await deleteTeamMember(selected.id);
      setList((l) => l.filter((m) => m.id !== selected.id));
      close();
    });
  };

  const handleToggle = (m: TeamMember) => {
    startTransition(async () => {
      await toggleTeamMemberStatus(m.id, !m.isActive);
      setList((l) => l.map((x) => (x.id === m.id ? { ...x, isActive: !x.isActive } : x)));
    });
  };

  const actifs = list.filter((m) => m.isActive).length;

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-gray-700 dark:text-gray-200">{list.length}</span> membres
          {" · "}
          <span className="font-medium text-green-600">{actifs} actifs</span>
        </p>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
        >
          <UserPlus size={16} />
          Ajouter un membre
        </button>
      </div>

      <div className="rounded-xl bg-white shadow-sm dark:bg-gray-900">
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400">
            <User size={40} strokeWidth={1.5} />
            <p className="text-sm">Aucun membre pour l&apos;instant</p>
            <button
              onClick={openAdd}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
            >
              Ajouter le premier membre
            </button>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <th className="px-6 py-4 font-semibold text-gray-500 dark:text-gray-400">Membre</th>
                <th className="hidden px-6 py-4 font-semibold text-gray-500 dark:text-gray-400 md:table-cell">
                  Département
                </th>
                <th className="px-6 py-4 font-semibold text-gray-500 dark:text-gray-400">Statut</th>
                <th className="px-6 py-4 font-semibold text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-gray-50 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar member={m} />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">{m.name}</p>
                        <p className="text-xs text-gray-400">{m.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-6 py-4 text-gray-600 dark:text-gray-300 md:table-cell">
                    {m.department ?? "—"}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggle(m)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                        m.isActive
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {m.isActive ? <ToggleRight size={13} /> : <ToggleLeft size={13} />}
                      {m.isActive ? "Actif" : "Inactif"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(m)}
                        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary dark:border-gray-600 dark:text-gray-300"
                      >
                        <Pencil size={12} />
                        Modifier
                      </button>
                      <button
                        onClick={() => openDelete(m)}
                        className="flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={12} />
                        Supprimer
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
        <Modal title="Ajouter un membre" onClose={close}>
          <MemberForm initial={emptyForm} onSubmit={handleCreate} onCancel={close} loading={isPending} />
        </Modal>
      )}

      {modal === "edit" && selected && (
        <Modal title="Modifier le membre" onClose={close}>
          <MemberForm
            initial={{
              name: selected.name,
              role: selected.role,
              department: selected.department ?? "",
              bio: selected.bio ?? "",
              email: selected.email ?? "",
              linkedin: selected.linkedin ?? "",
              photo: selected.photo ?? "",
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
            <div className="flex items-center gap-4 mb-4">
              <Avatar member={selected} />
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">{selected.name}</p>
                <p className="text-xs text-gray-400">{selected.role}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Voulez-vous vraiment supprimer ce membre ? Cette action est irréversible.
            </p>
          </div>
          <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4 dark:border-gray-700">
            <button
              onClick={close}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-600"
            >
              Annuler
            </button>
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-60"
            >
              {isPending && <Loader2 size={14} className="animate-spin" />}
              Supprimer
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
