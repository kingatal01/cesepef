"use client";

import { useState, useTransition } from "react";
import type { Message } from "@prisma/client";
import { markAsRead, markAllAsRead, toggleStar, deleteMessage } from "./actions";
import {
  Mail, MailOpen, Star, Trash2, X, Loader2,
  MessageSquare, Phone, Globe, Tag,
} from "lucide-react";

function timeAgo(date: Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `Il y a ${mins}min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Il y a ${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `Il y a ${days}j`;
  return new Date(date).toLocaleDateString("fr-FR");
}

function DetailModal({ msg, onClose, onRead, onDelete }: {
  msg: Message;
  onClose: () => void;
  onRead: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">Détail du message</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {/* Expéditeur */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
              {msg.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">{msg.name}</p>
              <a href={`mailto:${msg.email}`} className="text-sm text-primary hover:underline">{msg.email}</a>
            </div>
          </div>

          {/* Métadonnées */}
          <div className="grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-800">
            {msg.phone && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Phone size={13} className="text-primary" />
                <span>{msg.phone}</span>
              </div>
            )}
            {msg.subject && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Tag size={13} className="text-primary" />
                <span>{msg.subject}</span>
              </div>
            )}
            {msg.service && (
              <div className="col-span-2 flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Globe size={13} className="text-primary" />
                <span>Service concerné : <strong>{msg.service}</strong></span>
              </div>
            )}
            <div className="col-span-2 text-xs text-gray-400">
              Reçu le {new Date(msg.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>

          {/* Message */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Message</p>
            <p className="whitespace-pre-wrap rounded-lg border border-gray-100 p-4 text-sm leading-relaxed text-gray-700 dark:border-gray-700 dark:text-gray-300">
              {msg.message}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between border-t border-gray-100 px-6 py-4 dark:border-gray-700">
          <button onClick={onDelete}
            className="flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50">
            <Trash2 size={13} /> Supprimer
          </button>
          {!msg.isRead && (
            <button onClick={onRead}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary dark:border-gray-600">
              <MailOpen size={13} /> Marquer lu
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

type Filter = "all" | "unread" | "starred";

export default function MessagesClient({ messages }: { messages: Message[] }) {
  const [list, setList] = useState(messages);
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Message | null>(null);
  const [isPending, startTransition] = useTransition();

  const unreadCount = list.filter((m) => !m.isRead).length;
  const starredCount = list.filter((m) => m.isStarred).length;

  const filtered = list.filter((m) => {
    if (filter === "unread") return !m.isRead;
    if (filter === "starred") return m.isStarred;
    return true;
  });

  const handleOpen = (m: Message) => {
    setSelected(m);
    if (!m.isRead) {
      startTransition(async () => {
        await markAsRead(m.id);
        setList((l) => l.map((x) => x.id === m.id ? { ...x, isRead: true } : x));
        setSelected((s) => s ? { ...s, isRead: true } : s);
      });
    }
  };

  const handleMarkAllRead = () => {
    startTransition(async () => {
      await markAllAsRead();
      setList((l) => l.map((m) => ({ ...m, isRead: true })));
    });
  };

  const handleStar = (m: Message, e: React.MouseEvent) => {
    e.stopPropagation();
    startTransition(async () => {
      await toggleStar(m.id, !m.isStarred);
      setList((l) => l.map((x) => x.id === m.id ? { ...x, isStarred: !x.isStarred } : x));
      setSelected((s) => s?.id === m.id ? { ...s, isStarred: !s.isStarred } : s);
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      await deleteMessage(id);
      setList((l) => l.filter((m) => m.id !== id));
      setSelected(null);
    });
  };

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {([
            ["all", "Tous", list.length],
            ["unread", "Non lus", unreadCount],
            ["starred", "Favoris", starredCount],
          ] as [Filter, string, number][]).map(([f, label, count]) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                filter === f
                  ? "bg-primary text-white"
                  : "border border-gray-200 text-gray-600 hover:border-primary hover:text-primary dark:border-gray-600 dark:text-gray-300"
              }`}>
              {label} <span className="ml-1 text-xs opacity-70">({count})</span>
            </button>
          ))}
        </div>
        {unreadCount > 0 && (
          <button onClick={handleMarkAllRead} disabled={isPending}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:border-primary hover:text-primary disabled:opacity-50 dark:border-gray-600 dark:text-gray-300">
            {isPending ? <Loader2 size={14} className="animate-spin" /> : <MailOpen size={14} />}
            Tout marquer comme lu
          </button>
        )}
      </div>

      {/* Liste */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl bg-white py-16 text-gray-400 shadow-sm dark:bg-gray-900">
          <MessageSquare size={40} strokeWidth={1.5} />
          <p className="text-sm">
            {filter === "unread" ? "Aucun message non lu" : filter === "starred" ? "Aucun favori" : "Aucun message"}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((m) => (
            <div key={m.id} onClick={() => handleOpen(m)} role="button"
              className={`flex cursor-pointer items-start justify-between rounded-xl p-5 shadow-sm transition hover:shadow-md ${
                !m.isRead
                  ? "border-l-4 border-primary bg-white dark:bg-gray-900"
                  : "bg-white opacity-80 hover:opacity-100 dark:bg-gray-900"
              }`}>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {m.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-gray-800 dark:text-white">{m.name}</p>
                    {!m.isRead && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">Nouveau</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{m.email}</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {m.subject && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                        {m.subject}
                      </span>
                    )}
                    {m.service && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        {m.service}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 line-clamp-1 text-xs text-gray-400">{m.message}</p>
                </div>
              </div>
              <div className="ml-4 flex shrink-0 flex-col items-end gap-2">
                <span className="text-xs text-gray-400">{timeAgo(m.createdAt)}</span>
                <div className="flex items-center gap-1">
                  <button onClick={(e) => handleStar(m, e)}
                    className={`rounded-lg p-1.5 transition ${m.isStarred ? "text-yellow-400 hover:text-yellow-500" : "text-gray-300 hover:text-yellow-400"}`}>
                    <Star size={14} fill={m.isStarred ? "currentColor" : "none"} />
                  </button>
                  {!m.isRead
                    ? <Mail size={13} className="text-primary" />
                    : <MailOpen size={13} className="text-gray-300" />
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal détail */}
      {selected && (
        <DetailModal
          msg={selected}
          onClose={() => setSelected(null)}
          onRead={() => {
            startTransition(async () => {
              await markAsRead(selected.id);
              setList((l) => l.map((x) => x.id === selected.id ? { ...x, isRead: true } : x));
              setSelected((s) => s ? { ...s, isRead: true } : s);
            });
          }}
          onDelete={() => handleDelete(selected.id)}
        />
      )}
    </>
  );
}
