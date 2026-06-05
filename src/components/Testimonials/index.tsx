import SectionTitle from "../Common/SectionTitle";

const avantages = [
  {
    num: "01",
    title: "Expertise nationale alignée sur les standards internationaux",
    desc: "Notre équipe combine une connaissance fine du contexte tchadien et sahélien avec une maîtrise des cadres méthodologiques OCDE-CAD, GAR, ISO 20252. Nos livrables passent sans friction les exigences de qualité des principaux bailleurs.",
  },
  {
    num: "02",
    title: "Véritable indépendance d'analyse",
    desc: "Cabinet privé indépendant, sans conflit d'intérêt avec les opérateurs des projets que nous évaluons. Cette indépendance est notre actif le plus précieux ; elle garantit la valeur et la défendabilité de nos conclusions.",
  },
  {
    num: "03",
    title: "Mobilisation rapide sur la zone Afrique centrale & Sahel",
    desc: "Réseau d'enquêteurs et de superviseurs déjà déployés et formés dans plusieurs régions du Tchad et des pays voisins. Nous démarrons une collecte terrain en quelques jours, là où d'autres prennent des semaines.",
  },
  {
    num: "04",
    title: "Approche résolument numérique et data-driven",
    desc: "Collecte mobile (KoboToolbox, ODK, CommCare), analyses statistiques avancées (R, Stata, SPSS, Python), tableaux de bord interactifs (Power BI, Tableau), géoréférencement systématique. Nous livrons des données exploitables, pas seulement des PDF.",
  },
  {
    num: "05",
    title: "Rigueur méthodologique documentée",
    desc: "Chaque mission s'appuie sur un protocole méthodologique écrit, validé par le conseil scientifique avant remise au client. Nos plans d'enquête, guides d'entretien et protocoles d'analyse sont reproductibles et auditables.",
  },
  {
    num: "06",
    title: "Équipe pluridisciplinaire de seniors expérimentés",
    desc: "Plus de 60 années d'expérience cumulée au sein de l'équipe dirigeante, capitalisées dans des institutions de référence : Banque mondiale, BAD, Système des Nations Unies, GIZ, AFD, BIT.",
  },
  {
    num: "07",
    title: "Recommandations actionnables garanties",
    desc: "Nous refusons les recommandations creuses ou irréalistes. Chaque recommandation est argumentée, hiérarchisée par priorité, chiffrée lorsque pertinent et associée à un porteur potentiel. Nos clients utilisent réellement ce que nous produisons.",
  },
];

const Testimonials = () => {
  return (
    <section className="dark:bg-bg-color-dark bg-gray-light relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Pourquoi choisir CESEPEF ?"
          paragraph="Dans un marché de plus en plus concurrentiel, CESEPEF se distingue par sept avantages compétitifs forts qui en font un partenaire de confiance pour les commanditaires les plus exigeants."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {avantages.slice(0, 6).map((a) => (
            <div
              key={a.num}
              className="rounded-xs bg-white p-8 shadow-two dark:bg-gray-dark dark:shadow-three"
            >
              <span className="mb-4 inline-block text-4xl font-extrabold text-primary/20">
                {a.num}
              </span>
              <h3 className="mb-3 text-lg font-bold text-black dark:text-white">
                {a.title}
              </h3>
              <p className="text-base text-body-color dark:text-body-color-dark">
                {a.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="rounded-xs bg-primary p-8 shadow-two">
            <span className="mb-4 inline-block text-4xl font-extrabold text-white/30">
              {avantages[6].num}
            </span>
            <h3 className="mb-3 text-xl font-bold text-white">
              {avantages[6].title}
            </h3>
            <p className="text-base text-white/80">{avantages[6].desc}</p>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-5 z-[-1]">
        <svg width="238" height="531" viewBox="0 0 238 531" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect opacity="0.3" x="422.819" y="-70.8145" width="196" height="541.607" rx="2" transform="rotate(51.2997 422.819 -70.8145)" fill="url(#paint0_linear_83:2)" />
          <rect opacity="0.3" x="426.568" y="144.886" width="59.7544" height="541.607" rx="2" transform="rotate(51.2997 426.568 144.886)" fill="url(#paint1_linear_83:2)" />
          <defs>
            <linearGradient id="paint0_linear_83:2" x1="517.152" y1="-251.373" x2="517.152" y2="459.865" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint1_linear_83:2" x1="455.327" y1="-35.673" x2="455.327" y2="675.565" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Testimonials;
