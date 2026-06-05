"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getServices() {
  return prisma.service.findMany({ orderBy: [{ order: "asc" }, { title: "asc" }] });
}

export type ServiceFormData = {
  title: string;
  description: string;
  cible: string;
  delai: string;
  livrables: string[];
  highlight: boolean;
  isActive: boolean;
  order: number;
};

export async function createService(data: ServiceFormData) {
  await prisma.service.create({
    data: { ...data, livrables: JSON.stringify(data.livrables) },
  });
  revalidatePath("/admin/services");
  revalidatePath("/services");
}

export async function updateService(id: number, data: ServiceFormData) {
  await prisma.service.update({
    where: { id },
    data: { ...data, livrables: JSON.stringify(data.livrables) },
  });
  revalidatePath("/admin/services");
  revalidatePath("/services");
}

export async function deleteService(id: number) {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/services");
}

export async function toggleServiceStatus(id: number, isActive: boolean) {
  await prisma.service.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/services");
  revalidatePath("/services");
}
