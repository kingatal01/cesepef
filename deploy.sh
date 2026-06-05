#!/bin/bash
# ============================================================
#  CESEPEF — Script de préparation au déploiement
#  Exécuter en LOCAL avant d'uploader sur le serveur
#
#  Usage : bash deploy.sh
# ============================================================

set -e

echo "🔨 [1/5] Build Next.js (mode standalone)..."
npm run build

echo "📁 [2/5] Copie des assets statiques dans le bundle standalone..."
# Next.js standalone ne copie pas automatiquement ces dossiers
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

echo "📦 [3/5] Préparation du dossier de déploiement..."
rm -rf deploy_package
mkdir deploy_package

# Fichiers racine nécessaires
cp app.js deploy_package/
cp .htaccess deploy_package/
cp .nvmrc deploy_package/
cp .env.production.example deploy_package/
cp package.json deploy_package/
cp package-lock.json deploy_package/
cp prisma.config.ts deploy_package/

# Bundle Next.js standalone (contient tout : server.js + node_modules allégés)
cp -r .next/standalone deploy_package/.next_standalone
# Renommer pour clarté sur le serveur
mv deploy_package/.next_standalone deploy_package/.next

# Migrations Prisma (pour créer la DB sur le serveur)
mkdir -p deploy_package/prisma
cp prisma/schema.prisma deploy_package/prisma/
cp prisma/seed.ts deploy_package/prisma/
cp -r prisma/migrations deploy_package/prisma/
cp prisma.config.ts deploy_package/

# Dossier uploads (vide, sera rempli par l'admin)
mkdir -p deploy_package/public/images/team
mkdir -p deploy_package/public/images/brands
mkdir -p deploy_package/public/images/blog
mkdir -p deploy_package/public/images/realisations

# Dossier prisma pour la DB de production
mkdir -p deploy_package/prisma

echo "✅ [4/5] Fichiers à uploader sur le serveur :"
echo ""
echo "   deploy_package/"
echo "   ├── app.js                ← point d'entrée Passenger"
echo "   ├── .htaccess             ← config Apache"
echo "   ├── .env.production.example → renommer en .env.production"
echo "   ├── .next/                ← bundle standalone Next.js"
echo "   ├── prisma/               ← schéma + migrations"
echo "   └── public/               ← assets uploadés"

echo ""
echo "📋 [5/5] Étapes sur le serveur (SSH ou Terminal cPanel) :"
echo ""
echo "   1. Uploader le contenu de deploy_package/ à la racine de votre app"
echo "   2. Copier .env.production.example → .env.production et remplir les valeurs"
echo "   3. Configurer DATABASE_URL avec le chemin absolu du serveur"
echo "   4. Exécuter les migrations :"
echo "      npx prisma migrate deploy"
echo "   5. (Optionnel) Seed initial :"
echo "      node -e \"require('./prisma/seed')\" "
echo "   6. Dans cPanel > Node.js Apps : pointer le fichier de démarrage sur app.js"
echo "   7. Redémarrer l'application Passenger"
echo ""
echo "🎉 Déploiement prêt !"
