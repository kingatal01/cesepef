import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import Map from "@/components/Map";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | CESEPEF — N'Djamena, Tchad",
  description:
    "Contactez CESEPEF pour vos projets d'évaluation, études, formations ou demandes de proposition technique. Notre équipe répond sous 48 heures ouvrées.",
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contactez-nous"
        description="Vous portez un projet, une étude, un programme — ou un appel d'offres ? Nous sommes à votre écoute. Notre équipe revient vers vous sous 48 heures ouvrées."
      />

      <Contact />
      <Map />
    </>
  );
};

export default ContactPage;
