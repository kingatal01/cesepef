import SectionTitle from "../Common/SectionTitle";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {
  const List = ({ text }: { text: string }) => (
    <p className="text-body-color mb-5 flex items-center text-lg font-medium">
      <span className="bg-primary/10 text-primary mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <SectionTitle
                title="Cabinet d'expertise indépendant basé à N'Djamena"
                paragraph="CESEPEF — Cabinet d'Expertise de Suivi & Évaluation de Projets, d'Études et de Formations — est un bureau d'études et de conseil de droit tchadien, fondé en octobre 2021. Notre raison d'être : combler le déficit d'expertise indépendante, rigoureuse et contextualisée en matière de suivi-évaluation, d'études et de renforcement des capacités."
                mb="44px"
              />

              <div className="mb-12 max-w-[570px] lg:mb-0" data-wow-delay=".15s">
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Expertise nationale reconnue" />
                    <List text="Standards OCDE-CAD & GAR" />
                    <List text="Indépendance d'analyse" />
                  </div>
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="8+ pays d'intervention" />
                    <List text="Approche numérique & data" />
                    <List text="Livrables actionnables" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="rounded-xs bg-primary/5 p-10 dark:bg-white/5">
                <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
                  Notre positionnement
                </h3>
                <div className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold text-primary">
                    Ancrage national — Tchad
                  </h4>
                  <p className="text-base text-body-color dark:text-body-color-dark">
                    Connaissance fine du contexte politique, administratif et
                    socio-économique tchadien, indispensable pour des analyses
                    pertinentes et des recommandations applicables.
                  </p>
                </div>
                <div className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold text-primary">
                    Couverture régionale — Afrique centrale & Sahel
                  </h4>
                  <p className="text-base text-body-color dark:text-body-color-dark">
                    Interventions démontrées au Mali, Niger, Burkina Faso,
                    Sénégal, Côte d&apos;Ivoire, Cameroun, RCA, à travers un
                    réseau d&apos;experts associés.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 text-lg font-semibold text-primary">
                    Standards internationaux
                  </h4>
                  <p className="text-base text-body-color dark:text-body-color-dark">
                    Alignement systématique sur les méthodologies OCDE-CAD,
                    gestion axée sur les résultats (GAR), cadres logiques et
                    théories du changement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
