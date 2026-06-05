"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getMessages() {
  return prisma.message.findMany({ orderBy: { createdAt: "desc" } });
}

export async function markAsRead(id: number) {
  await prisma.message.update({ where: { id }, data: { isRead: true } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin/dashboard");
}

export async function markAllAsRead() {
  await prisma.message.updateMany({ where: { isRead: false }, data: { isRead: true } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin/dashboard");
}

export async function toggleStar(id: number, isStarred: boolean) {
  await prisma.message.update({ where: { id }, data: { isStarred } });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: number) {
  await prisma.message.delete({ where: { id } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin/dashboard");
}
