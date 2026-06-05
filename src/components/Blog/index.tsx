import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SectionTitle from "../Common/SectionTitle";

const Blog = async () => {
  let articles = [];
  try {
    articles = await prisma.publication.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });
  } catch { return null; }

  if (articles.length === 0) return null;

  return (
    <section id="blog" className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Blog"
          paragraph="Notes méthodologiques, analyses sectorielles et ressources pratiques pour les professionnels du suivi-évaluation et du développement en Afrique centrale et au Sahel."
          center
        />
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => {
            const tag = article.tags
              ? (() => { try { return JSON.parse(article.tags!)[0]; } catch { return article.tags!.split(",")[0].trim(); } })()
              : article.category;
            return (
              <div key={article.id} className="group relative overflow-hidden rounded-xs bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark">
                <Link href={`/blog/${article.slug}`} className="relative block aspect-[37/22] w-full overflow-hidden">
                  {tag && (
                    <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
                      {tag}
                    </span>
                  )}
                  {article.coverImage ? (
                    <Image src={article.coverImage} alt={article.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/10">
                      <span className="text-4xl font-bold text-primary/20">{article.title.charAt(0)}</span>
                    </div>
                  )}
                </Link>
                <div className="p-6 sm:p-8">
                  <h3>
                    <Link href={`/blog/${article.slug}`}
                      className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mb-6 border-b border-body-color/10 pb-6 text-base font-medium text-body-color dark:border-white/10">
                    {article.excerpt ?? article.content.slice(0, 120) + "…"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-body-color dark:text-body-color-dark">
                      {article.author}
                    </span>
                    <span className="text-xs text-body-color dark:text-body-color-dark">
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link href="/blog"
            className="inline-flex items-center gap-2 rounded-xs border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
            Voir toutes les publications →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
