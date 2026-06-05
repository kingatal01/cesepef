"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPublications() {
  return prisma.publication.findMany({ orderBy: { createdAt: "desc" } });
}

export type PublicationFormData = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string;
  author: string;
  published: boolean;
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim().replace(/\s+/g, "-")
    .slice(0, 80);
}

export async function createPublication(data: PublicationFormData) {
  const slug = data.slug || generateSlug(data.title);
  await prisma.publication.create({
    data: { ...data, slug, publishedAt: data.published ? new Date() : null },
  });
  revalidatePath("/admin/publications");
  revalidatePath("/blog");
  revalidatePath("/");
}

export async function updatePublication(id: number, data: PublicationFormData) {
  const existing = await prisma.publication.findUnique({ where: { id } });
  await prisma.publication.update({
    where: { id },
    data: {
      ...data,
      publishedAt: data.published && !existing?.publishedAt ? new Date() : existing?.publishedAt ?? null,
    },
  });
  revalidatePath("/admin/publications");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath("/");
}

export async function deletePublication(id: number) {
  await prisma.publication.delete({ where: { id } });
  revalidatePath("/admin/publications");
  revalidatePath("/blog");
  revalidatePath("/");
}

export async function togglePublished(id: number, published: boolean) {
  await prisma.publication.update({
    where: { id },
    data: { published, publishedAt: published ? new Date() : null },
  });
  revalidatePath("/admin/publications");
  revalidatePath("/blog");
  revalidatePath("/");
}

export async function generateUniqueSlug(title: string): Promise<string> {
  let slug = generateSlug(title);
  const existing = await prisma.publication.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;
  return slug;
}
