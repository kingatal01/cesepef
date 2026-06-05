/**
 * app.js — Point d'entrée Passenger pour hébergement mutualisé
 *
 * Passenger (cPanel / Phusion) démarre ce fichier avec Node.js.
 * Il doit écouter sur process.env.PORT (assigné par Passenger).
 *
 * Déploiement :
 *   1. npm install --production
 *   2. npm run build:prod   (build + copie des assets standalone)
 *   3. Passenger redémarre automatiquement
 */

'use strict';

process.env.NODE_ENV = 'production';

const path   = require('path');
const http   = require('http');
const { parse } = require('url');

// Charger les variables d'environnement depuis .env.production
require('dotenv').config({ path: path.join(__dirname, '.env.production') });

const port     = parseInt(process.env.PORT || '3000', 10);
const hostname = process.env.HOSTNAME || '0.0.0.0';

// Next.js standalone — le serveur généré par `next build` avec output: 'standalone'
// Le fichier server.js est dans .next/standalone/
const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');

// On surcharge le port et hostname avant le require
process.env.PORT     = String(port);
process.env.HOSTNAME = hostname;

require(standaloneServer);

console.log(`[CESEPEF] Serveur démarré sur le port ${port}`);
