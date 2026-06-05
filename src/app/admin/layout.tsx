export const dynamic = "force-dynamic";
import Sidebar from "@/components/Admin/Sidebar";
import { prisma } from "@/lib/prisma";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const unreadCount = await prisma.message.count({ where: { isRead: false } });

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar unreadMessages={unreadCount} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
