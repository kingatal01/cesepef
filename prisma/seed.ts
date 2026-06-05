import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Admin
  await prisma.adminUser.upsert({
    where: { email: "admin@cesepef.org" },
    update: {},
    create: {
      email: "admin@cesepef.org",
      password: await bcrypt.hash("Cesepef2024!", 10),
      name: "ADOUMBEYE Amine",
    },
  });

  // Équipe
  const team = [
    { name: "ADOUMBEYE Amine", role: "Gérant / Expert principal", department: "Direction / Gouvernance", order: 1 },
    { name: "DEYAM MANDEYE Blandine", role: "Associée-cofondatrice", department: "Direction / Gouvernance", order: 2 },
    { name: "NDOFETE Timothée", role: "Associé-cofondateur", department: "Direction / Gouvernance", order: 3 },
    { name: "DINGUAMADJI Japhet", role: "Associé-cofondateur", department: "Direction / Gouvernance", order: 4 },
    { name: "Honoré AÏGONGUÉ", role: "Chef de département", department: "Suivi & Évaluation", order: 5 },
    { name: "ALYO MBAINAIKOU Ghislain", role: "Chef de département", department: "Études & Recherches", order: 6 },
    { name: "MBAIADOUM NGARGUINEM Rodrigue", role: "Chef de département", department: "Formation", order: 7 },
    { name: "MASTOG Ngarmadji", role: "Chef de département", department: "Conseil & Projets", order: 8 },
  ];
  for (const m of team) {
    await prisma.teamMember.upsert({
      where: { id: m.order },
      update: {},
      create: m,
    });
  }

  // Services
  const services = [
    {
      title: "Évaluation 360°",
      description: "Évaluation indépendante alignée OCDE-CAD, défendable auprès des financeurs et utile pour les décisions de prolongation, de mise à l'échelle ou de réorientation.",
      cible: "Bailleurs, agences d'exécution, ONG",
      delai: "8 à 16 semaines",
      livrables: JSON.stringify(["Rapport principal d'évaluation","Note de synthèse exécutive (8 pages)","Base de données nettoyée","Atelier de restitution"]),
      order: 1,
    },
    {
      title: "Système SERA clé en main",
      description: "Système de suivi-évaluation-redevabilité-apprentissage opérationnel avec indicateurs SMART, outils mobiles, tableaux de bord et équipe formée.",
      cible: "Projets en démarrage, ONG",
      delai: "6 à 12 semaines",
      livrables: JSON.stringify(["Manuel SERA & base d'indicateurs","Formulaires KoboToolbox configurés","Tableau de bord Power BI","Formation initiale de l'équipe"]),
      highlight: true,
      order: 2,
    },
    {
      title: "Étude de référence (Baseline)",
      description: "Valeurs de départ fiables sur tous les indicateurs clés, servant de référence pour les évaluations futures et la redevabilité auprès des bailleurs.",
      cible: "Projets exigeant une mesure ex-ante",
      delai: "10 à 16 semaines",
      livrables: JSON.stringify(["Rapport baseline complet","Base de données","Fiches d'indicateurs","Matrice d'évaluation"]),
      order: 3,
    },
    {
      title: "Étude sectorielle ou de filière",
      description: "Compréhension en profondeur d'un secteur ou d'une filière, identification des opportunités et goulots d'étranglement, recommandations stratégiques fondées.",
      cible: "Ministères, bailleurs, fondations, entreprises",
      delai: "10 à 20 semaines",
      livrables: JSON.stringify(["Rapport d'étude approfondi","Cartographie des acteurs","Analyse de la chaîne de valeur","Recommandations priorisées"]),
      order: 4,
    },
    {
      title: "Formations certifiantes & sur mesure",
      description: "Équipes opérationnellement compétentes, capables de piloter projets et systèmes SERA de manière autonome. Présentiel, en ligne ou hybride.",
      cible: "ONG, administrations, agences onusiennes",
      delai: "2 jours à 4 semaines",
      livrables: JSON.stringify(["GAR & cadre logique","Collecte mobile de données","Analyse statistique R/Stata/SPSS","Gestion du cycle de projet"]),
      order: 5,
    },
    {
      title: "Assistance technique aux appels à projets",
      description: "Maximiser les chances de remporter un financement grâce à une proposition conforme aux exigences du bailleur, méthodologiquement solide et financièrement réaliste.",
      cible: "ONG, consortiums, opérateurs privés",
      delai: "Sur délai bailleur",
      livrables: JSON.stringify(["Proposition technique complète","Proposition financière","CVs structurés","Annexes méthodologiques"]),
      order: 6,
    },
    {
      title: "Diagnostic territorial & développement local",
      description: "Diagnostic complet d'un territoire (économie, social, environnement, gouvernance) et plan d'action priorisé pour son développement.",
      cible: "Collectivités locales, agences de développement",
      delai: "Variable",
      livrables: JSON.stringify(["Diagnostic territorial complet","Plan d'action priorisé","Cartographie des ressources","Atelier de validation"]),
      order: 7,
    },
  ];
  for (const s of services) {
    await prisma.service.upsert({
      where: { id: s.order },
      update: {},
      create: s,
    });
  }

  // Partenaires
  const partners = [
    { name: "Banque Mondiale", category: "Multilatéral", order: 1 },
    { name: "Banque Africaine de Développement", category: "Multilatéral", order: 2 },
    { name: "Union Européenne", category: "Bilatéral", order: 3 },
    { name: "AFD — Agence Française de Développement", category: "Bilatéral", order: 4 },
    { name: "GIZ", category: "Bilatéral", order: 5 },
    { name: "UNICEF", category: "Nations Unies", order: 6 },
    { name: "PNUD", category: "Nations Unies", order: 7 },
    { name: "PAM", category: "Nations Unies", order: 8 },
  ];
  for (const p of partners) {
    await prisma.partner.upsert({
      where: { id: p.order },
      update: {},
      create: p,
    });
  }

  // Paramètres site
  const settings = [
    { key: "site_name", value: "CESEPEF Sarl", label: "Nom du site", group: "general" },
    { key: "site_email", value: "info@cesepef.org", label: "Email principal", group: "contact" },
    { key: "site_phone1", value: "+235 66 38 64 14", label: "Téléphone 1", group: "contact" },
    { key: "site_phone2", value: "+235 68 82 62 43", label: "Téléphone 2", group: "contact" },
    { key: "site_address", value: "7ᵉ Arrondissement, Quartier Abéna, axe Hôtel Mirande, N'Djamena, Tchad", label: "Adresse", group: "contact" },
    { key: "site_nif", value: "9031479", label: "NIF", group: "legal" },
    { key: "site_capital", value: "1 000 000 FCFA", label: "Capital social", group: "legal" },
  ];
  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  console.log("✅ Seed terminé avec succès");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
