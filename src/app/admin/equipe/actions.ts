"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTeamMembers() {
  return prisma.teamMember.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }] });
}

export async function createTeamMember(data: {
  name: string;
  role: string;
  department?: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  isActive: boolean;
  order: number;
}) {
  await prisma.teamMember.create({ data });
  revalidatePath("/admin/equipe");
}

export async function updateTeamMember(
  id: number,
  data: {
    name: string;
    role: string;
    department?: string;
    bio?: string;
    email?: string;
    linkedin?: string;
    isActive: boolean;
    order: number;
  }
) {
  await prisma.teamMember.update({ where: { id }, data });
  revalidatePath("/admin/equipe");
}

export async function deleteTeamMember(id: number) {
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/admin/equipe");
}

export async function toggleTeamMemberStatus(id: number, isActive: boolean) {
  await prisma.teamMember.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/equipe");
}
