export const dynamic = "force-dynamic";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import RealisationsClient from "./RealisationsClient";

export const metadata: Metadata = {
  title: "Réalisations | CESEPEF — Missions & Références",
  description: "Consultez les missions et références emblématiques de CESEPEF : évaluations, études, formations dans les secteurs santé, éducation, agriculture, gouvernance en Afrique centrale et au Sahel.",
};

export default async function RealisationsPage() {
  const realisations = await prisma.realisation.findMany({
    where: { isPublished: true },
    orderBy: [{ order: "asc" }, { year: "desc" }],
  });

  return (
    <>
      <Breadcrumb
        pageName="Nos Réalisations & Références"
        description="Une sélection de missions emblématiques reflétant la diversité de nos interventions, de nos secteurs et de nos partenaires."
      />

      <section className="py-16 md:py-20 lg:py-28">
        <div className="container">
          {realisations.length > 0 ? (
            <RealisationsClient realisations={realisations} />
          ) : (
            /* État vide — affiche le message de demande de références */
            <div className="rounded-xs bg-primary/5 p-12 text-center dark:bg-white/5">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <svg className="text-primary" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">Références disponibles sur demande</h3>
              <p className="mx-auto mb-8 max-w-[600px] text-base text-body-color dark:text-body-color-dark">
                Notre portefeuille de missions est documenté en détail — contexte, mandat, méthodologie, résultats — et transmis sur demande aux commanditaires potentiels.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/contact" className="rounded-xs bg-primary px-8 py-4 text-base font-semibold text-white transition hover:bg-primary/90">
                  Demander nos références
                </Link>
                <Link href="/contact" className="rounded-xs border border-primary px-8 py-4 text-base font-semibold text-primary transition hover:bg-primary hover:text-white">
                  Télécharger notre plaquette
                </Link>
              </div>
            </div>
          )}

          {/* Chiffres clés */}
          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { val: "50+", label: "Missions réalisées depuis 2021" },
              { val: "8+", label: "Pays couverts" },
              { val: "8", label: "Secteurs d'intervention" },
              { val: "60+", label: "Ans d'expérience cumulée de l'équipe" },
            ].map((s) => (
              <div key={s.label} className="rounded-xs bg-white p-6 text-center shadow-two dark:bg-gray-dark">
                <p className="mb-2 text-4xl font-extrabold text-primary">{s.val}</p>
                <p className="text-sm text-body-color dark:text-body-color-dark">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
