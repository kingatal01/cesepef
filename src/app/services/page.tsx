import Breadcrumb from "@/components/Common/Breadcrumb";
import Pricing from "@/components/Pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Services | CESEPEF — Offres commerciales",
  description:
    "Découvrez les 7 offres de services de CESEPEF : Évaluation 360°, Système SERA clé en main, Étude baseline, Étude sectorielle, Formations certifiantes, Assistance technique aux appels à projets, Diagnostic territorial.",
};

const ServicesPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Nos Services & Offres"
        description="Des offres modulaires et adaptables, conçues pour répondre précisément aux besoins de nos clients. Chaque offre est livrée avec un cahier des charges clair, un calendrier précis et des indicateurs de performance contractuels."
      />
      <Pricing />
    </>
  );
};

export default ServicesPage;
