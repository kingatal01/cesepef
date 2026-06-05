#!/bin/bash
# ============================================================
#  CESEPEF — Script de préparation au déploiement
#  Exécuter en LOCAL avant d'uploader sur le serveur
#
#  Architecture cible sur le serveur :
#
#   /home/USER/
#   ├── public_html/        ← racine web (domaine www.cesepef.org)
#   │   └── .htaccess       ← délègue à Passenger
#   └── cesepef/            ← app Node.js (hors web root)
#       ├── app.js
#       ├── .next/
#       ├── prisma/
#       ├── node_modules/
#       └── .env.production
#
#  Usage : bash deploy.sh
# ============================================================

set -e

echo ""
echo "=========================================="
echo "  CESEPEF — Préparation du déploiement"
echo "=========================================="
echo ""

# --- 1. Build Next.js ----------------------------------------
echo "🔨 [1/4] Build Next.js (mode standalone)..."
npm run build

# --- 2. Copie des assets dans le bundle standalone -----------
echo "📁 [2/4] Copie des assets statiques..."
cp -r .next/static   .next/standalone/.next/static
cp -r public         .next/standalone/public

# --- 3. Package app (~/cesepef/) -----------------------------
echo "📦 [3/4] Préparation du package app (dossier cesepef/)..."
rm -rf deploy_app
mkdir -p deploy_app

cp app.js            deploy_app/
cp .nvmrc            deploy_app/
cp package.json      deploy_app/
cp package-lock.json deploy_app/
cp prisma.config.ts  deploy_app/
cp .env.production.example deploy_app/

# Bundle Next.js standalone
cp -r .next/standalone/. deploy_app/

# Migrations Prisma
mkdir -p deploy_app/prisma
cp prisma/schema.prisma          deploy_app/prisma/
cp prisma/seed.ts                deploy_app/prisma/
cp -r prisma/migrations          deploy_app/prisma/
mkdir -p deploy_app/prisma

# Dossiers uploads (vides — seront remplis via l'admin)
mkdir -p deploy_app/public/images/team
mkdir -p deploy_app/public/images/brands
mkdir -p deploy_app/public/images/blog
mkdir -p deploy_app/public/images/realisations

# --- 4. Package public_html (.htaccess uniquement) -----------
echo "🌐 [4/4] Préparation du package public_html..."
rm -rf deploy_public_html
mkdir deploy_public_html
cp .htaccess deploy_public_html/

echo ""
echo "✅ Packages générés :"
echo ""
echo "   deploy_app/         → uploader dans ~/cesepef/   (hors public_html)"
echo "   deploy_public_html/ → uploader dans ~/public_html/"
echo ""
echo "=========================================="
echo "  Étapes sur le serveur"
echo "=========================================="
echo ""
echo "  1. Uploader deploy_app/ dans ~/cesepef/"
echo "     (FTP ou cPanel File Manager)"
echo ""
echo "  2. Uploader deploy_public_html/.htaccess dans ~/public_html/"
echo ""
echo "  3. Créer le fichier de config :"
echo "     cp ~/cesepef/.env.production.example ~/cesepef/.env.production"
echo "     nano ~/cesepef/.env.production"
echo "     ↳ DATABASE_URL=\"file:/home/USER/cesepef/prisma/prod.db\""
echo "     ↳ NEXT_PUBLIC_SITE_URL=\"https://www.cesepef.org\""
echo ""
echo "  4. Dans cPanel → Node.js Apps → Create Application :"
echo "     ┌─────────────────────────────────────────────────┐"
echo "     │  Node.js version  : 20.x                        │"
echo "     │  Application mode : Production                  │"
echo "     │  Application root : /home/USER/cesepef          │"
echo "     │  Application URL  : /     ← racine du domaine   │"
echo "     │  Startup file     : app.js                      │"
echo "     └─────────────────────────────────────────────────┘"
echo ""
echo "  5. Dans le terminal cPanel (ou SSH) :"
echo "     cd ~/cesepef"
echo "     npx prisma migrate deploy"
echo ""
echo "  6. Redémarrer l'app dans cPanel → Node.js Apps"
echo ""
echo "🎉 Le site sera disponible sur https://www.cesepef.org"
