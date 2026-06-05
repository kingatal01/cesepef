import { Inter } from "next/font/google";
import { Providers } from "./providers";
import LayoutContent from "./layout-content";
import "../styles/index.css";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CESEPEF — Cabinet d'Expertise Tchad",
  description: "Cabinet d'Expertise de Suivi & Évaluation de Projets, d'Études et de Formations. N'Djamena, Tchad.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="fr">
      <head />
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <LayoutContent>{children}</LayoutContent>
        </Providers>
      </body>
    </html>
  );
}
