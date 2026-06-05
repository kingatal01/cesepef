/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mode standalone : bundle autonome pour hébergement mutualisé
  output: "standalone",

  images: {
    // Autoriser les images locales uploadées
    localPatterns: [
      { pathname: "/images/**" },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },

  // Variables d'environnement exposées côté client
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
};

module.exports = nextConfig;
