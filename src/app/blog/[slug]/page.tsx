export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { Pen, CalendarDays, Tag, ChevronRight, ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.publication.findUnique({ where: { slug } });
  if (!article) return { title: "Article introuvable | CESEPEF" };
  return {
    title: `${article.title} | CESEPEF`,
    description: article.excerpt ?? article.content.slice(0, 160),
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await prisma.publication.findUnique({ where: { slug, published: true } });
  if (!article) notFound();

  const tags: string[] = article.tags
    ? (() => {
        try { return JSON.parse(article.tags!); }
        catch { return article.tags!.split(",").map((t) => t.trim()).filter(Boolean); }
      })()
    : [];

  // Articles connexes
  const related = await prisma.publication.findMany({
    where: { published: true, id: { not: article.id }, category: article.category ?? undefined },
    take: 2,
    orderBy: { publishedAt: "desc" },
  });

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          {/* Fil d'ariane */}
          <div className="mb-8 flex items-center gap-1.5 text-sm text-body-color">
            <Link href="/" className="hover:text-primary">Accueil</Link>
            <ChevronRight size={14} className="shrink-0 text-gray-300" />
            <Link href="/blog" className="hover:text-primary">Publications</Link>
            <ChevronRight size={14} className="shrink-0 text-gray-300" />
            <span className="truncate text-black dark:text-white">{article.title}</span>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary capitalize">{t}</span>
              ))}
            </div>
          )}

          {/* Titre */}
          <h1 className="mb-6 text-3xl font-bold text-black dark:text-white sm:text-4xl">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-body-color/10 pb-6 dark:border-white/10">
            <span className="flex items-center gap-1.5 text-sm text-body-color">
              <Pen size={14} className="text-primary" />
              <strong>{article.author}</strong>
            </span>
            {article.publishedAt && (
              <span className="flex items-center gap-1.5 text-sm text-body-color">
                <CalendarDays size={14} className="text-primary" />
                {new Date(article.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            )}
            {article.category && (
              <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                <Tag size={11} />
                {article.category}
              </span>
            )}
          </div>

          {/* Image de couverture */}
          {article.coverImage && (
            <div className="relative mb-10 aspect-[16/7] w-full overflow-hidden rounded-xs">
              <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
            </div>
          )}

          {/* Contenu */}
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            {article.content.split("\n").map((line, i) =>
              line.trim() === "" ? <br key={i} /> : <p key={i}>{line}</p>
            )}
          </div>

          {/* Retour */}
          <div className="mt-12 border-t border-body-color/10 pt-8 dark:border-white/10">
            <Link href="/blog"
              className="inline-flex items-center gap-2 rounded-xs bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90">
              <ArrowLeft size={15} /> Retour aux publications
            </Link>
          </div>
        </div>

        {/* Articles connexes */}
        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-3xl">
            <h2 className="mb-6 text-xl font-bold text-black dark:text-white">Articles connexes</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`}
                  className="group flex gap-4 rounded-xs bg-white p-4 shadow-one hover:shadow-two dark:bg-gray-dark">
                  {r.coverImage && (
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded">
                      <Image src={r.coverImage} alt={r.title} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-black group-hover:text-primary dark:text-white line-clamp-2">{r.title}</p>
                    {r.publishedAt && <p className="mt-1 text-xs text-body-color">{new Date(r.publishedAt).toLocaleDateString("fr-FR")}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
