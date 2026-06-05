export const dynamic = "force-dynamic";
import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Stats from "@/components/Stats";
import Map from "@/components/Map";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
// Video section commentée — aucun contenu vidéo institutionnel disponible à ce stade
// import Video from "@/components/Video";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CESEPEF — Cabinet d'Expertise en Suivi & Évaluation, Études et Formations | Tchad",
  description:
    "CESEPEF est un cabinet d'expertise indépendant basé à N'Djamena, spécialisé dans le suivi-évaluation, les études socio-économiques, la formation professionnelle et le conseil stratégique en Afrique centrale et au Sahel.",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Stats />
      <Features />
      {/* <Video /> — Section vidéo à activer lorsqu'une vidéo institutionnelle sera disponible */}
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Team />
      <Testimonials />
      <Pricing />
      <Blog />
      <Contact />
      <Map />
    </>
  );
}
