const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Notre vision
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Devenir le cabinet d&apos;expertise de référence en Afrique
                  centrale et au Sahel pour le suivi-évaluation, les études
                  stratégiques et le renforcement des capacités, reconnu pour la
                  rigueur de ses méthodes, l&apos;indépendance de ses analyses
                  et la valeur qu&apos;il crée pour les décideurs et les
                  populations.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Notre mission
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Accompagner les gouvernements, les bailleurs internationaux,
                  les agences onusiennes, les ONG et les acteurs privés dans la
                  conception, le pilotage et l&apos;évaluation de projets à
                  fort impact. Notre mission ultime : transformer la donnée en
                  décision, et la décision en impact mesurable pour les
                  populations.
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Nos secteurs d&apos;intervention
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Santé, éducation, agriculture, sécurité alimentaire,
                  environnement, emploi & formation professionnelle, gouvernance,
                  action humanitaire.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="rounded-xs bg-primary/5 p-10 dark:bg-white/5">
              <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
                Nos valeurs fondatrices
              </h3>
              {[
                {
                  title: "Rigueur méthodologique",
                  desc: "Standards OCDE-CAD, GAR, ISO 20252 — protocoles transparents et reproductibles.",
                },
                {
                  title: "Indépendance",
                  desc: "Évaluations conduites en toute indépendance vis-à-vis des opérateurs des projets.",
                },
                {
                  title: "Intégrité & éthique",
                  desc: "Confidentialité, protection des données, consentement éclairé — principes non négociables.",
                },
                {
                  title: "Excellence du livrable",
                  desc: "Chaque rapport soumis à un contrôle qualité interne avant remise au client.",
                },
                {
                  title: "Ancrage local & terrain",
                  desc: "Maîtrise des langues, codes culturels et réalités opérationnelles des zones d'intervention.",
                },
                {
                  title: "Innovation & numérique",
                  desc: "KoboToolbox, ODK, R, Stata, SPSS, Power BI — des données plus rapides, fiables et utiles.",
                },
              ].map((val, idx) => (
                <div key={idx} className="mb-4 flex items-start">
                  <span className="bg-primary/10 text-primary mr-3 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-black dark:text-white">
                      {val.title} :{" "}
                    </span>
                    <span className="text-body-color dark:text-body-color-dark">
                      {val.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
