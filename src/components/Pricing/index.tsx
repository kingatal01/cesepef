import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SectionTitle from "../Common/SectionTitle";

const CheckIcon = ({ highlight }: { highlight: boolean }) => (
  <svg
    className={`shrink-0 ${highlight ? "text-white" : "text-primary"}`}
    width="14" height="11" viewBox="0 0 16 13" fill="currentColor"
  >
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

function parseLivrables(raw: string | null): string[] {
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

const Pricing = async () => {
  let allServices = [];
  try {
    allServices = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { title: "asc" }],
    });
  } catch { return null; }

  if (allServices.length === 0) return null;

  // Dernier service affiché en bannière pleine largeur si order élevé
  const mainServices = allServices.slice(0, -1);
  const lastService = allServices[allServices.length - 1];
  const showBanner = allServices.length > 1;

  return (
    <section id="services" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Nos Offres de Services"
          paragraph="Des offres modulaires et adaptables, conçues pour répondre précisément aux besoins de nos clients. Chaque offre est livrée avec un cahier des charges clair, un calendrier précis et des indicateurs de performance contractuels."
          center
          width="760px"
        />

        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {(showBanner ? mainServices : allServices).map((offre) => {
            const livrables = parseLivrables(offre.livrables);
            return (
              <div
                key={offre.id}
                className={`relative overflow-hidden rounded-xs p-8 shadow-two transition-transform duration-300 ${
                  offre.highlight
                    ? "scale-105 bg-primary text-white shadow-lg ring-2 ring-primary/30 lg:-my-4"
                    : "bg-white hover:scale-[1.02] dark:bg-gray-dark"
                }`}
              >
                {offre.highlight && (
                  <span className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                    Populaire
                  </span>
                )}
                <h3 className={`mb-2 text-xl font-bold ${offre.highlight ? "text-white" : "text-black dark:text-white"}`}>
                  {offre.title}
                </h3>
                {offre.cible && (
                  <p className={`mb-4 text-sm font-medium ${offre.highlight ? "text-white/80" : "text-primary"}`}>
                    Pour : {offre.cible}
                  </p>
                )}
                <p className={`mb-6 text-sm leading-relaxed ${offre.highlight ? "text-white/90" : "text-body-color dark:text-body-color-dark"}`}>
                  {offre.description}
                </p>
                {livrables.length > 0 && (
                  <ul className="mb-6 space-y-2">
                    {livrables.map((l, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckIcon highlight={offre.highlight} />
                        <span className={offre.highlight ? "text-white/90" : "text-body-color dark:text-body-color-dark"}>
                          {l}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {offre.delai && (
                  <div className={`mb-6 text-xs font-medium ${offre.highlight ? "text-white/70" : "text-body-color"}`}>
                    Délai indicatif : {offre.delai}
                  </div>
                )}
                <Link
                  href="/contact"
                  className={`block w-full rounded-xs py-3 text-center text-sm font-semibold transition ${
                    offre.highlight
                      ? "bg-white text-primary hover:bg-white/90"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  Demander un devis
                </Link>
              </div>
            );
          })}
        </div>

        {/* Dernière offre en bannière pleine largeur */}
        {showBanner && (
          <div className="mt-10 rounded-xs bg-gray-light p-8 dark:bg-gray-dark">
            <div className="-mx-4 flex flex-wrap items-center">
              <div className="w-full px-4 lg:w-2/3">
                <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
                  {lastService.title}
                </h3>
                {lastService.cible && (
                  <p className="mb-1 text-sm font-medium text-primary">
                    Pour : {lastService.cible}
                  </p>
                )}
                <p className="text-body-color dark:text-body-color-dark">
                  {lastService.description}
                </p>
              </div>
              <div className="w-full px-4 lg:w-1/3">
                <Link
                  href="/contact"
                  className="mt-4 block w-full rounded-xs bg-primary py-4 text-center text-base font-semibold text-white transition hover:bg-primary/90 lg:mt-0"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 z-[-1]">
        <svg width="239" height="601" viewBox="0 0 239 601" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect opacity="0.3" x="-184.451" y="600.973" width="196" height="541.607" rx="2" transform="rotate(-128.7 -184.451 600.973)" fill="url(#paint0_linear_93:235)" />
          <rect opacity="0.3" x="-188.201" y="385.272" width="59.7544" height="541.607" rx="2" transform="rotate(-128.7 -188.201 385.272)" fill="url(#paint1_linear_93:235)" />
          <defs>
            <linearGradient id="paint0_linear_93:235" x1="-90.1184" y1="420.414" x2="-90.1184" y2="1131.65" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4A6CF7" /><stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint1_linear_93:235" x1="-159.441" y1="204.714" x2="-159.441" y2="915.952" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4A6CF7" /><stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Pricing;
