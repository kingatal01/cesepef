"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="relative z-10 bg-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
              <div className="mb-12 max-w-[360px] lg:mb-16">
                <Link href="/" className="mb-8 inline-block">
                  <Image
                    src="/images/logo/logo-cesepef.jpg"
                    alt="CESEPEF"
                    width={160}
                    height={60}
                    className="h-auto max-h-[50px] w-auto"
                  />
                </Link>
                <p className="mb-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  Cabinet d&apos;Expertise de Suivi &amp; Évaluation de Projets,
                  d&apos;Études et de Formations.
                </p>
                <p className="mb-9 text-sm text-body-color dark:text-body-color-dark">
                  N&apos;Djamena, Tchad | Fondé en octobre 2021<br />
                  NIF : 9031479 | SARL pluripersonnelle
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://linkedin.com"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <svg width="18" height="16" viewBox="0 0 17 16" className="fill-current">
                      <path d="M15.2196 0H1.99991C1.37516 0 0.875366 0.497491 0.875366 1.11936V14.3029C0.875366 14.8999 1.37516 15.4222 1.99991 15.4222H15.1696C15.7943 15.4222 16.2941 14.9247 16.2941 14.3029V1.09448C16.3441 0.497491 15.8443 0 15.2196 0ZM5.44852 13.1089H3.17444V5.7709H5.44852V13.1089ZM4.29899 4.75104C3.54929 4.75104 2.97452 4.15405 2.97452 3.43269C2.97452 2.71133 3.57428 2.11434 4.29899 2.11434C5.02369 2.11434 5.62345 2.71133 5.62345 3.43269C5.62345 4.15405 5.07367 4.75104 4.29899 4.75104ZM14.07 13.1089H11.796V9.55183C11.796 8.7061 11.771 7.58674 10.5964 7.58674C9.39693 7.58674 9.222 8.53198 9.222 9.47721V13.1089H6.94792V5.7709H9.17202V6.79076H9.19701C9.52188 6.19377 10.2466 5.59678 11.3711 5.59678C13.6952 5.59678 14.12 7.08925 14.12 9.12897V13.1089H14.07Z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:info@cesepef.org"
                    aria-label="Email"
                    className="text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <svg width="18" height="14" viewBox="0 0 24 18" className="fill-current">
                      <path d="M21 0H3C1.35 0 0.015 1.35 0.015 3L0 15c0 1.65 1.35 3 3 3h18c1.65 0 3-1.35 3-3V3c0-1.65-1.35-3-3-3zm0 6l-9 5.625L3 6V3l9 5.625L21 3v3z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  Navigation
                </h2>
                <ul>
                  {[
                    { label: "Accueil", href: "/" },
                    { label: "À propos", href: "/about" },
                    { label: "Expertises", href: "/expertises" },
                    { label: "Services", href: "/services" },
                    { label: "Réalisations", href: "/realisations" },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  Ressources
                </h2>
                <ul>
                  {[
                    { label: "Publications", href: "/blog" },
                    { label: "Contact", href: "/contact" },
                    { label: "Politique de confidentialité", href: "/" },
                    { label: "Mentions légales", href: "/" },
                  ].map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-3/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  Contact rapide
                </h2>
                <p className="mb-3 text-sm text-body-color dark:text-body-color-dark">
                  <span className="font-semibold text-black dark:text-white">Email :</span>{" "}
                  <a href="mailto:info@cesepef.org" className="hover:text-primary">
                    info@cesepef.org
                  </a>
                </p>
                <p className="mb-3 text-sm text-body-color dark:text-body-color-dark">
                  <span className="font-semibold text-black dark:text-white">Propositions :</span>{" "}
                  <a href="mailto:propositions@cesepef.org" className="hover:text-primary">
                    propositions@cesepef.org
                  </a>
                </p>
                <p className="mb-3 text-sm text-body-color dark:text-body-color-dark">
                  <span className="font-semibold text-black dark:text-white">Tél :</span>{" "}
                  (+235) 66 38 64 14
                </p>
                <p className="text-sm text-body-color dark:text-body-color-dark">
                  <span className="font-semibold text-black dark:text-white">WhatsApp :</span>{" "}
                  +235 66 38 64 14
                </p>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-linear-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
          <div className="py-8">
            <p className="text-center text-base text-body-color dark:text-white">
              © {new Date().getFullYear()} CESEPEF — Cabinet d&apos;Expertise de Suivi &amp; Évaluation de Projets, d&apos;Études et de Formations. Tous droits réservés.
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-14 z-[-1]">
          <svg width="55" height="99" viewBox="0 0 55 99" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle opacity="0.8" cx="49.5" cy="49.5" r="49.5" fill="#959CB1" />
          </svg>
        </div>
      </footer>
    </>
  );
};

export default Footer;
