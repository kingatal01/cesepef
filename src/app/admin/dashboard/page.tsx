export const dynamic = "force-dynamic";
import TopBar from "@/components/Admin/TopBar";
import { prisma } from "@/lib/prisma";
import {
  FileText,
  Users,
  MessageSquare,
  Layers,
  Trophy,
  Pencil,
  Inbox,
  UserRound,
  Settings,
  Wrench,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const [
    publicationsCount,
    membresActifs,
    messagesCount,
    messagesNonLus,
    servicesActifs,
    realisationsCount,
    derniersMessages,
    dernieresPubs,
  ] = await Promise.all([
    prisma.publication.count(),
    prisma.teamMember.count({ where: { isActive: true } }),
    prisma.message.count(),
    prisma.message.count({ where: { isRead: false } }),
    prisma.service.count({ where: { isActive: true } }),
    prisma.realisation.count({ where: { isPublished: true } }),
    prisma.message.findMany({ orderBy: { createdAt: "desc" }, take: 3 }),
    prisma.publication.findMany({ orderBy: { createdAt: "desc" }, take: 2 }),
  ]);

  const stats = [
    {
      label: "Publications",
      value: publicationsCount,
      change: publicationsCount === 0 ? "Aucune encore" : `${publicationsCount} au total`,
      icon: FileText,
      color: "bg-blue-50 text-blue-600 dark:bg-blue-950",
      iconBg: "bg-blue-100 dark:bg-blue-900",
    },
    {
      label: "Membres actifs",
      value: membresActifs,
      change: "Équipe opérationnelle",
      icon: Users,
      color: "bg-green-50 text-green-600 dark:bg-green-950",
      iconBg: "bg-green-100 dark:bg-green-900",
    },
    {
      label: "Messages reçus",
      value: messagesCount,
      change: messagesNonLus > 0 ? `${messagesNonLus} non lu${messagesNonLus > 1 ? "s" : ""}` : "Tous lus",
      icon: MessageSquare,
      color: "bg-yellow-50 text-yellow-600 dark:bg-yellow-950",
      iconBg: "bg-yellow-100 dark:bg-yellow-900",
      alert: messagesNonLus > 0,
    },
    {
      label: "Services actifs",
      value: servicesActifs,
      change: "Offres publiées",
      icon: Layers,
      color: "bg-purple-50 text-purple-600 dark:bg-purple-950",
      iconBg: "bg-purple-100 dark:bg-purple-900",
    },
  ];

  // Activité récente : combine messages + publications triés par date
  type ActivityItem = {
    action: string;
    detail: string;
    time: Date;
    type: "message" | "blog";
  };

  const activites: ActivityItem[] = [
    ...derniersMessages.map((m) => ({
      action: "Nouveau message reçu",
      detail: m.subject ?? `De ${m.name}`,
      time: m.createdAt,
      type: "message" as const,
    })),
    ...dernieresPubs.map((p) => ({
      action: p.published ? "Publication publiée" : "Publication créée",
      detail: p.title,
      time: p.createdAt,
      type: "blog" as const,
    })),
  ].sort((a, b) => b.time.getTime() - a.time.getTime()).slice(0, 5);

  const typeColor = {
    message: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    blog: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  };

  const typeLabel = { message: "Message", blog: "Publication" };

  function timeAgo(date: Date): string {
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `Il y a ${mins}min`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `Il y a ${hrs}h`;
    const days = Math.floor(hrs / 24);
    return `Il y a ${days}j`;
  }

  const quickLinks = [
    { label: "Ajouter une publication", href: "/admin/publications", icon: Pencil },
    { label: "Voir les messages", href: "/admin/messages", icon: Inbox, badge: messagesNonLus || undefined },
    { label: "Gérer l'équipe", href: "/admin/equipe", icon: UserRound },
    { label: "Modifier les services", href: "/admin/services", icon: Wrench },
    { label: "Ajouter une réalisation", href: "/admin/realisations", icon: Trophy },
    { label: "Paramètres", href: "/admin/parametres", icon: Settings },
  ];

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopBar title="Tableau de bord" />
      <main className="flex-1 overflow-y-auto p-6">

        {/* Bannière */}
        <div className="mb-6 rounded-xl bg-primary p-6 text-white">
          <h2 className="text-xl font-bold">Bienvenue dans l&apos;espace administration CESEPEF</h2>
          <p className="mt-1 text-sm text-white/80">
            Gérez le contenu du site : équipe, publications, services, réalisations et messages.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`rounded-xl p-5 ${s.color}`}>
                <div className={`mb-3 inline-flex rounded-lg p-2 ${s.iconBg}`}>
                  <Icon size={20} />
                </div>
                <div className="flex items-end gap-1">
                  <p className="text-2xl font-bold">{s.value}</p>
                  {s.alert && (
                    <span className="mb-0.5 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      !
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium">{s.label}</p>
                <p className="mt-1 text-xs opacity-60">{s.change}</p>
              </div>
            );
          })}
        </div>

        {/* Stats secondaires */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-100 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Réalisations publiées</p>
            <p className="mt-1 text-3xl font-bold text-gray-800 dark:text-white">{realisationsCount}</p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Messages non lus</p>
            <p className={`mt-1 text-3xl font-bold ${messagesNonLus > 0 ? "text-red-500" : "text-gray-800 dark:text-white"}`}>
              {messagesNonLus}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Activité récente */}
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-900">
            <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white">
              Activité récente
            </h3>
            {activites.length === 0 ? (
              <p className="text-sm text-gray-400">Aucune activité pour l&apos;instant.</p>
            ) : (
              <ul className="space-y-3">
                {activites.map((a, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${typeColor[a.type]}`}>
                      {typeLabel[a.type]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{a.action}</p>
                      <p className="truncate text-xs text-gray-400">{a.detail}</p>
                    </div>
                    <span className="shrink-0 text-xs text-gray-400">{timeAgo(a.time)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Accès rapide */}
          <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-900">
            <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white">
              Accès rapide
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((l) => {
                const Icon = l.icon;
                return (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="relative flex items-center gap-2 rounded-lg border border-gray-100 p-3 text-sm font-medium text-gray-700 transition hover:border-primary hover:text-primary dark:border-gray-700 dark:text-gray-300"
                  >
                    <Icon size={15} className="shrink-0" />
                    <span className="leading-tight">{l.label}</span>
                    {l.badge && (
                      <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                        {l.badge > 9 ? "9+" : l.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
