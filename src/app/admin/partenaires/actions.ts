"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPartners() {
  return prisma.partner.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }] });
}

export type PartnerFormData = {
  name: string;
  logo: string;
  website: string;
  category: string;
  isActive: boolean;
  order: number;
};

export async function createPartner(data: PartnerFormData) {
  await prisma.partner.create({ data });
  revalidatePath("/admin/partenaires");
  revalidatePath("/");
}

export async function updatePartner(id: number, data: PartnerFormData) {
  await prisma.partner.update({ where: { id }, data });
  revalidatePath("/admin/partenaires");
  revalidatePath("/");
}

export async function deletePartner(id: number) {
  await prisma.partner.delete({ where: { id } });
  revalidatePath("/admin/partenaires");
  revalidatePath("/");
}

export async function togglePartnerStatus(id: number, isActive: boolean) {
  await prisma.partner.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/partenaires");
  revalidatePath("/");
}
