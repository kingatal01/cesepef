import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.5" d="M20 38C29.9411 38 38 29.9411 38 20C38 10.0589 29.9411 2 20 2C10.0589 2 2 10.0589 2 20C2 29.9411 10.0589 38 20 38Z" />
        <path d="M20 6C20 6 12 14 12 22C12 26.4183 15.5817 30 20 30C24.4183 30 28 26.4183 28 22C28 14 20 6 20 6ZM20 26C17.7909 26 16 24.2091 16 22C16 19.7909 17.7909 18 20 18C22.2091 18 24 19.7909 24 22C24 24.2091 22.2091 26 20 26Z" />
      </svg>
    ),
    title: "Suivi & Évaluation (M&E / SERA)",
    paragraph:
      "Conception de cadres logiques, évaluations indépendantes (ex-ante, mi-parcours, finales) selon les six critères OCDE-CAD, études d'impact et systèmes SERA en temps réel via KoboToolbox et ODK.",
  },
  {
    id: 2,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.5" d="M36 4H4C2.89543 4 2 4.89543 2 6V34C2 35.1046 2.89543 36 4 36H36C37.1046 36 38 35.1046 38 34V6C38 4.89543 37.1046 4 36 4Z" />
        <path d="M8 12H32V14H8V12ZM8 18H24V20H8V18ZM8 24H28V26H8V24ZM30 18H32V26H30V18Z" />
      </svg>
    ),
    title: "Études & Recherches Appliquées",
    paragraph:
      "Études de faisabilité, diagnostics territoriaux, enquêtes ménages à grande échelle, études de filières, cartographie des parties prenantes et analyses de risques fondées sur des données fiables.",
  },
  {
    id: 3,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.5" d="M20 4C11.1634 4 4 11.1634 4 20C4 28.8366 11.1634 36 20 36C28.8366 36 36 28.8366 36 20C36 11.1634 28.8366 4 20 4Z" />
        <path d="M16 14L26 20L16 26V14Z" />
      </svg>
    ),
    title: "Formation & Renforcement de Capacités",
    paragraph:
      "Formations certifiantes en GAR, cadre logique, collecte mobile de données, analyse statistique (R, Stata, SPSS). Dispositifs sur mesure pour administrations, ONG, agences onusiennes, en présentiel ou e-learning.",
  },
  {
    id: 4,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.5" d="M34 8H6C4.89543 8 4 8.89543 4 10V30C4 31.1046 4.89543 32 6 32H34C35.1046 32 36 31.1046 36 30V10C36 8.89543 35.1046 8 34 8Z" />
        <path d="M12 16H28V18H12V16ZM12 22H22V24H12V22ZM26 20L32 26L26 32V20Z" />
      </svg>
    ),
    title: "Conseil & Assistance Technique",
    paragraph:
      "Plans stratégiques institutionnels, appui à la rédaction de propositions techniques pour appels d'offres, développement institutionnel des ONG, outils numériques sur mesure (tableaux de bord, plateformes SERA).",
  },
];
export default featuresData;
