'use strict';

/**
 * app.js — Point d'entrée Passenger (Phusion)
 * Charge le .env manuellement puis démarre le serveur Next.js standalone
 */

const path = require('path');
const fs   = require('fs');

// Charger .env manuellement (sans dépendance dotenv)
const envFile = path.join(__dirname, '.env');
if (fs.existsSync(envFile)) {
  const lines = fs.readFileSync(envFile, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
}

process.env.NODE_ENV = 'production';

// Passenger fournit PORT — le standalone Next.js l'utilise directement
const port = process.env.PORT || '3000';
process.env.PORT = port;
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

// Démarrer le serveur Next.js standalone
require(path.join(__dirname, '.next', 'standalone', 'server.js'));
