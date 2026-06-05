import Image from "next/image";
import { prisma } from "@/lib/prisma";
import SectionTitle from "../Common/SectionTitle";

const Brands = async () => {
  const partenaires = await prisma.partner.findMany({
    where: { isActive: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });

  if (partenaires.length === 0) return null;

  const items = [...partenaires, ...partenaires];

  return (
    <section className="pt-16">
      <div className="container">
        <SectionTitle
          title="Nos Partenaires & Bailleurs"
          paragraph="CESEPEF travaille avec les principaux bailleurs internationaux, agences onusiennes, États et institutions financières de développement."
          center
        />
      </div>

      <div className="relative overflow-hidden bg-gray-light py-8 dark:bg-gray-dark">
        {/* Fondus latéraux */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-linear-to-r from-gray-light to-transparent dark:from-gray-dark" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-linear-to-l from-gray-light to-transparent dark:from-gray-dark" />

        <div className="flex w-max animate-marquee items-center gap-10">
          {items.map((p, i) => (
            <div key={i} className="flex w-[140px] shrink-0 flex-col items-center gap-2">
              <div className="flex h-16 w-[120px] items-center justify-center overflow-hidden rounded-xs bg-white shadow-one dark:bg-gray-dark">
                {p.logo ? (
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={90}
                    height={40}
                    className="h-10 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                  />
                ) : (
                  <span className="px-2 text-center text-[11px] font-semibold leading-tight text-gray-400">
                    {p.name}
                  </span>
                )}
              </div>
              <span className="text-center text-xs font-medium text-body-color dark:text-body-color-dark">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
