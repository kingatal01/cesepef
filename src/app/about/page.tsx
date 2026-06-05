export const dynamic = "force-dynamic";
import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "À propos | CESEPEF — Cabinet d'Expertise Tchad",
  description:
    "Découvrez CESEPEF : son histoire, son positionnement, son équipe dirigeante, sa vision et ses valeurs. Cabinet d'expertise indépendant fondé en octobre 2021 à N'Djamena, Tchad.",
};

const AvatarPlaceholder = ({ initial }: { initial: string }) => (
  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-2xl font-bold text-primary">
    {initial}
  </div>
);

const AboutPage = async () => {
  const membres = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });

  const gouvernance = membres.filter((m) =>
    m.department?.toLowerCase().includes("direction") ||
    m.department?.toLowerCase().includes("gouvernance")
  );

  const chefs = membres.filter((m) =>
    m.role?.toLowerCase().includes("chef")
  );

  return (
    <>
      <Breadcrumb
        pageName="À propos de CESEPEF"
        description="CESEPEF — Cabinet d'Expertise de Suivi & Évaluation de Projets, d'Études et de Formations — est un bureau d'études et de conseil tchadien fondé en octobre 2021, réunissant des experts seniors pluridisciplinaires."
      />
      <AboutSectionOne />
      <AboutSectionTwo />

      {/* Section équipe */}
      <section className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl">
              Notre organisation & équipe
            </h2>
            <p className="mx-auto max-w-[600px] text-base text-body-color dark:text-body-color-dark">
              CESEPEF s&apos;appuie sur une organisation matricielle légère
              combinant un noyau permanent d&apos;experts seniors et un réseau
              étendu de consultants associés.
            </p>
          </div>

          {/* Gouvernance */}
          {gouvernance.length > 0 && (
            <div className="mb-12">
              <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
                Gouvernance
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {gouvernance.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-xs bg-white p-6 shadow-two dark:bg-gray-dark"
                  >
                    <div className="mb-4 h-16 w-16 overflow-hidden rounded-full ring-2 ring-primary/20">
                      {m.photo ? (
                        <Image
                          src={m.photo}
                          alt={m.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <AvatarPlaceholder initial={m.name.charAt(0)} />
                      )}
                    </div>
                    <h4 className="mb-1 text-base font-bold text-black dark:text-white">
                      {m.name}
                    </h4>
                    <p className="mb-2 text-sm font-semibold text-primary">
                      {m.role}
                    </p>
                    {m.bio && (
                      <p className="text-sm text-body-color dark:text-body-color-dark">
                        {m.bio}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chefs de département */}
          {chefs.length > 0 && (
            <div className="mb-12">
              <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
                Départements opérationnels
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {chefs.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-start gap-4 rounded-xs border border-body-color/10 p-6 dark:border-white/10"
                  >
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20">
                      {m.photo ? (
                        <Image
                          src={m.photo}
                          alt={m.name}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <AvatarPlaceholder initial={m.name.charAt(0)} />
                      )}
                    </div>
                    <div>
                      <h4 className="mb-0.5 text-lg font-bold text-black dark:text-white">
                        {m.department}
                      </h4>
                      <p className="mb-2 text-sm font-semibold text-primary">
                        Chef de département : {m.name}
                      </p>
                      {m.bio && (
                        <p className="text-sm text-body-color dark:text-body-color-dark">
                          {m.bio}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Identité juridique */}
          <div className="rounded-xs bg-gray-light p-8 dark:bg-gray-dark">
            <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
              Identité juridique & administrative
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Dénomination", value: "CESEPEF Sarl" },
                { label: "Statut juridique", value: "SARL pluripersonnelle" },
                { label: "Date de création", value: "20 octobre 2021" },
                { label: "NIF", value: "9031479" },
                { label: "Capital social", value: "1 000 000 FCFA" },
                { label: "Compte (NCB)", value: "32100050255 / ECOBANK" },
                { label: "Siège social", value: "N'Djamena, 7ᵉ Arrondissement" },
                { label: "Adresse postale", value: "BP 716, N'Djamena – Tchad" },
                { label: "Site internet", value: "www.cesepef.org" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-body-color dark:text-body-color-dark">
                    {item.label}
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
