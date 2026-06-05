"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getRealisations() {
  return prisma.realisation.findMany({ orderBy: [{ order: "asc" }, { year: "desc" }] });
}

export type RealisationFormData = {
  title: string;
  description: string;
  client: string;
  sector: string;
  country: string;
  year: number | null;
  image: string;
  tags: string;
  isPublished: boolean;
  order: number;
};

export async function createRealisation(data: RealisationFormData) {
  await prisma.realisation.create({
    data: { ...data, tags: data.tags || null },
  });
  revalidatePath("/admin/realisations");
  revalidatePath("/realisations");
}

export async function updateRealisation(id: number, data: RealisationFormData) {
  await prisma.realisation.update({
    where: { id },
    data: { ...data, tags: data.tags || null },
  });
  revalidatePath("/admin/realisations");
  revalidatePath("/realisations");
}

export async function deleteRealisation(id: number) {
  await prisma.realisation.delete({ where: { id } });
  revalidatePath("/admin/realisations");
  revalidatePath("/realisations");
}

export async function togglePublished(id: number, isPublished: boolean) {
  await prisma.realisation.update({ where: { id }, data: { isPublished } });
  revalidatePath("/admin/realisations");
  revalidatePath("/realisations");
}
