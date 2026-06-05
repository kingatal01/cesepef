import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Comment concevoir un dispositif SERA performant pour votre projet",
    paragraph:
      "Guide pratique pour la conception d'un système de Suivi-Évaluation-Redevabilité-Apprentissage aligné sur les standards OCDE-CAD et les exigences des principaux bailleurs.",
    image: "/images/blog/blog-01.jpg",
    author: {
      name: "Équipe CESEPEF",
      image: "/images/blog/author-03.png",
      designation: "Département M&E",
    },
    tags: ["suivi-évaluation"],
    publishDate: "2025",
  },
  {
    id: 2,
    title: "Les critères OCDE-CAD expliqués : pertinence, efficacité, impact, durabilité",
    paragraph:
      "Comprendre et appliquer les six critères d'évaluation de l'OCDE-CAD dans vos évaluations de projets et programmes de développement.",
    image: "/images/blog/blog-02.jpg",
    author: {
      name: "Équipe CESEPEF",
      image: "/images/blog/author-02.png",
      designation: "Département Études",
    },
    tags: ["méthodologie"],
    publishDate: "2025",
  },
  {
    id: 3,
    title: "Collecte mobile de données avec KoboToolbox : guide de démarrage",
    paragraph:
      "Optimisez vos enquêtes de terrain grâce aux outils numériques de collecte de données. Ce guide couvre la configuration, le déploiement et l'analyse des données sous KoboToolbox.",
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "Équipe CESEPEF",
      image: "/images/blog/author-03.png",
      designation: "Département Formation",
    },
    tags: ["numérique"],
    publishDate: "2025",
  },
];
export default blogData;
