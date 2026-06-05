"use client";

import { useState } from "react";
import Image from "next/image";
import type { Realisation } from "@prisma/client";
import { MapPin, Calendar, Building2, Trophy } from "lucide-react";

export default function RealisationsClient({ realisations }: { realisations: Realisation[] }) {
  const [activeFilter, setActiveFilter] = useState("Tous");

  const secteurs = ["Tous", ...Array.from(new Set(realisations.map((r) => r.sector).filter(Boolean) as string[]))];

  const filtered = activeFilter === "Tous"
    ? realisations
    : realisations.filter((r) => r.sector === activeFilter);

  return (
    <>
      {/* Filtres */}
      <div className="mb-12">
        <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">Filtrer par secteur</h3>
        <div className="flex flex-wrap gap-3">
          {secteurs.map((s) => (
            <button key={s} onClick={() => setActiveFilter(s)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeFilter === s
                  ? "bg-primary text-white"
                  : "border border-body-color/20 text-body-color hover:border-primary hover:text-primary dark:text-body-color-dark"
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grille missions */}
      {filtered.length === 0 ? (
        <div className="rounded-xs bg-primary/5 p-12 text-center dark:bg-white/5">
          <Trophy size={48} className="mx-auto mb-4 text-primary/30" strokeWidth={1.5} />
          <p className="text-body-color">Aucune mission dans ce secteur pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <div key={r.id} className="group overflow-hidden rounded-xs bg-white shadow-two transition hover:shadow-lg dark:bg-gray-dark">
              {/* Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-primary/10">
                {r.image ? (
                  <Image src={r.image} alt={r.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Trophy size={40} className="text-primary/20" strokeWidth={1.5} />
                  </div>
                )}
                {r.sector && (
                  <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                    {r.sector}
                  </span>
                )}
              </div>

              {/* Contenu */}
              <div className="p-6">
                <h3 className="mb-3 text-base font-bold leading-snug text-black dark:text-white">
                  {r.title}
                </h3>
                {r.description && (
                  <p className="mb-4 line-clamp-2 text-sm text-body-color dark:text-body-color-dark">
                    {r.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-3 text-xs text-body-color dark:text-body-color-dark">
                  {r.client && (
                    <span className="flex items-center gap-1">
                      <Building2 size={12} className="text-primary" /> {r.client}
                    </span>
                  )}
                  {r.country && (
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-primary" /> {r.country}
                    </span>
                  )}
                  {r.year && (
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-primary" /> {r.year}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
