import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import Link from "next/link";
import { Check as CheckIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Nos Expertises | CESEPEF — Suivi & Évaluation, Études, Formation, Conseil",
  description:
    "Découvrez les quatre domaines d'expertise de CESEPEF : Suivi & Évaluation (M&E/SERA), Études & Recherches appliquées, Formation & Renforcement de capacités, Conseil & Assistance technique.",
};

const expertises = [
  {
    id: "me",
    num: "01",
    title: "Suivi & Évaluation (M&E / SERA)",
    desc: "Le suivi-évaluation est la colonne vertébrale de la performance de tout projet. CESEPEF conçoit, implante et opère des dispositifs complets de Suivi-Évaluation, Redevabilité et Apprentissage (SERA), depuis la définition des indicateurs jusqu'à l'évaluation d'impact ex-post. Nous travaillons indistinctement sur des projets de développement, des programmes humanitaires et des initiatives de gouvernance.",
    valeur: [
      "Conception de cadres logiques et de théories du changement robustes, défendables devant les bailleurs",
      "Évaluations indépendantes (ex-ante, mi-parcours, finales, ex-post) selon les six critères OCDE-CAD",
      "Études d'impact rigoureuses (méthodes contrefactuelles, quasi-expérimentales)",
      "Mise en place de systèmes de suivi en temps réel via KoboToolbox, ODK",
      "Triangulation systématique des données quantitatives et qualitatives",
    ],
    outils: ["KoboToolbox", "ODK", "CommCare", "R", "Stata", "SPSS", "Power BI"],
  },
  {
    id: "etudes",
    num: "02",
    title: "Études & Recherches Appliquées",
    desc: "Nous produisons des études socio-économiques, sectorielles, de faisabilité et de marché qui éclairent les décisions stratégiques. De la collecte de données primaires sur le terrain à la modélisation économique, nos études combinent méthodes statistiques, enquêtes qualitatives et analyse contextuelle approfondie.",
    valeur: [
      "Études de faisabilité technico-économique de projets et infrastructures",
      "Études de référence (baseline) et études d'impact environnemental et social (EIES)",
      "Diagnostics territoriaux et études de filières porteuses",
      "Enquêtes ménages, enquêtes établissements à grande échelle",
      "Études qualitatives : focus groups, entretiens semi-directifs, analyse de récits",
      "Cartographie des parties prenantes et analyse de risques",
    ],
    outils: ["R", "Stata", "SPSS", "Python", "ArcGIS", "QGIS", "Power BI", "Tableau"],
  },
  {
    id: "formation",
    num: "03",
    title: "Formation & Renforcement de Capacités",
    desc: "Une mission ne crée de l'impact durable que si elle laisse derrière elle des compétences renforcées. Nous concevons et déployons des dispositifs de formation sur mesure pour les administrations publiques, les ONG, les agences onusiennes et le secteur privé, en présentiel comme en e-learning.",
    valeur: [
      "Formations certifiantes en suivi-évaluation, GAR, cadre logique",
      "Formation en gestion de projets et de programmes (cycle de projet, planification, budgétisation)",
      "Formation en méthodologies de collecte et d'analyse de données",
      "Renforcement institutionnel des ONG (gouvernance, redevabilité, mobilisation de ressources)",
      "Coaching individualisé de cadres et chefs de projets",
      "Élaboration de modules e-learning et de guides méthodologiques",
    ],
    outils: ["Présentiel", "E-learning", "Hybride", "2 jours à 4 semaines"],
  },
  {
    id: "conseil",
    num: "04",
    title: "Conseil & Assistance Technique",
    desc: "Nous accompagnons les institutions publiques, les ONG et les entreprises dans la structuration de leurs interventions, la mobilisation de financements et la mise en conformité avec les standards internationaux. Notre conseil est résolument opérationnel : nous co-construisons avec nos clients des solutions actionnables.",
    valeur: [
      "Élaboration de plans stratégiques institutionnels et de cadres de performance",
      "Appui à la rédaction de propositions techniques et financières pour appels à projets",
      "Conseil en mobilisation de ressources et structuration de partenariats",
      "Développement institutionnel des ONG et associations",
      "Développement d'outils numériques sur mesure (tableaux de bord, plateformes SERA)",
      "Capitalisation et communication des résultats",
    ],
    outils: ["Plans stratégiques", "Propositions techniques", "Outils numériques"],
  },
];

const ExpertisesPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Nos Domaines d'Expertise"
        description="Quatre piliers structurent notre offre. Chacun mobilise des méthodologies éprouvées, des outils numériques modernes et une équipe d'experts dédiée."
      />

      <section className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="space-y-16">
            {expertises.map((exp, idx) => (
              <div
                key={exp.id}
                className={`-mx-4 flex flex-wrap items-start ${
                  idx % 2 === 1 ? "flex-row-reverse" : ""
                }`}
              >
                <div className="w-full px-4 lg:w-1/3">
                  <div className="sticky top-24">
                    <span className="mb-2 block text-6xl font-extrabold text-primary/10">
                      {exp.num}
                    </span>
                    <h2 className="mb-4 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                      {exp.title}
                    </h2>
                    <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                      {exp.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.outils.map((o) => (
                        <span
                          key={o}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                        >
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-full px-4 lg:w-2/3">
                  <div className="rounded-xs bg-white p-8 shadow-two dark:bg-gray-dark">
                    <h3 className="mb-6 text-xl font-bold text-black dark:text-white">
                      Notre valeur ajoutée
                    </h3>
                    <ul className="space-y-4">
                      {exp.valeur.map((v, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                            <CheckIcon size={11} strokeWidth={3} />
                          </span>
                          <span className="text-base text-body-color dark:text-body-color-dark">
                            {v}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 rounded-xs bg-primary p-10 text-center">
            <h3 className="mb-4 text-2xl font-bold text-white">
              Vous avez un projet ?
            </h3>
            <p className="mb-8 text-lg text-white/80">
              Contactez notre équipe pour discuter de votre besoin. Nous
              revenons vers vous sous 48 heures ouvrées.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-xs bg-white px-8 py-4 text-base font-semibold text-primary transition hover:bg-white/90"
            >
              Demander une proposition technique
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExpertisesPage;
