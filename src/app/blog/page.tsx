import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | CESEPEF",
  description: "Notes méthodologiques, analyses sectorielles et ressources pratiques de CESEPEF.",
};

export default async function BlogPage() {
  const articles = await prisma.publication.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <Breadcrumb
        pageName="Blog"
        description="Notes méthodologiques, analyses sectorielles et ressources pratiques pour les professionnels du suivi-évaluation et du développement en Afrique centrale et au Sahel."
      />
      <section className="py-16 md:py-20 lg:py-28">
        <div className="container">
          {articles.length === 0 ? (
            <p className="text-center text-body-color">Aucune publication pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
              {articles.map((article) => {
                const tag = article.tags
                  ? (() => { try { return JSON.parse(article.tags!)[0]; } catch { return article.tags!.split(",")[0].trim(); } })()
                  : article.category;
                return (
                  <div key={article.id} className="group relative overflow-hidden rounded-xs bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark">
                    <Link href={`/blog/${article.slug}`} className="relative block aspect-[37/22] w-full overflow-hidden">
                      {tag && (
                        <span className="absolute right-6 top-6 z-20 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
                          {tag}
                        </span>
                      )}
                      {article.coverImage ? (
                        <Image src={article.coverImage} alt={article.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-primary/10">
                          <span className="text-5xl font-bold text-primary/20">{article.title.charAt(0)}</span>
                        </div>
                      )}
                    </Link>
                    <div className="p-6 sm:p-8">
                      <h3>
                        <Link href={`/blog/${article.slug}`}
                          className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white sm:text-2xl">
                          {article.title}
                        </Link>
                      </h3>
                      <p className="mb-6 border-b border-body-color/10 pb-6 text-base text-body-color dark:border-white/10">
                        {article.excerpt ?? article.content.slice(0, 120) + "…"}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-body-color">{article.author}</span>
                        <span className="text-xs text-body-color">
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
          )}
        </div>
      </section>
    </>
  );
}
