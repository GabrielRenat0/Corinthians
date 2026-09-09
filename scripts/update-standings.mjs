/**
 * Script para atualizar data/standings.js diretamente da API football-data.org.
 * Execute com: node scripts/update-standings.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetPath = path.resolve(__dirname, '../data/standings.js');

const API_KEY = 'c8790ec04daf44cc9dcc4223b74945f0';
const URL = 'https://api.football-data.org/v4/competitions/BSA/standings';

const CLUB_META = {
  'Flamengo':      { id: 'flamengo',    name: 'Flamengo',            short: 'FLA', color: '#CC0000', accent: '#111111', hasPage: false, pageUrl: null },
  'Palmeiras':     { id: 'palmeiras',   name: 'Palmeiras',           short: 'PAL', color: '#006437', accent: '#FFDF00', hasPage: false, pageUrl: null },
  'Paranaense':    { id: 'athletico',   name: 'Athletico-PR',        short: 'CAP', color: '#CC0000', accent: '#111111', hasPage: false, pageUrl: null },
  'Fluminense':    { id: 'fluminense',  name: 'Fluminense',          short: 'FLU', color: '#8B0000', accent: '#6DBE45', hasPage: false, pageUrl: null },
  'Bahia':         { id: 'bahia',       name: 'Bahia',               short: 'BAH', color: '#003DA5', accent: '#E4032E', hasPage: false, pageUrl: null },
  'Cruzeiro':      { id: 'cruzeiro',    name: 'Cruzeiro',            short: 'CRU', color: '#003DA5', accent: '#FFFF00', hasPage: true,  pageUrl: 'cruzeiro.html' },
  'Coritiba':      { id: 'coritiba',    name: 'Coritiba',            short: 'CBB', color: '#006400', accent: '#FFFFFF', hasPage: false, pageUrl: null },
  'Mineiro':       { id: 'atletico-mg', name: 'Atlético-MG',         short: 'ATL', color: '#111111', accent: '#FFFFFF', hasPage: false, pageUrl: null },
  'Bragantino':    { id: 'red-bull',    name: 'Red Bull Bragantino', short: 'RBB', color: '#CC0000', accent: '#FFFF00', hasPage: false, pageUrl: null },
  'São Paulo':     { id: 'sao-paulo',   name: 'São Paulo',           short: 'SAO', color: '#CC0000', accent: '#FFFFFF', hasPage: false, pageUrl: null },
  'Vitória':       { id: 'vitoria',     name: 'Vitória',             short: 'VIT', color: '#CC0000', accent: '#111111', hasPage: false, pageUrl: null },
  'Corinthians':   { id: 'corinthians', name: 'Corinthians',         short: 'COR', color: '#111111', accent: '#FFFFFF', hasPage: true,  pageUrl: 'corinthians.html' },
  'Santos':        { id: 'santos',      name: 'Santos',              short: 'SAN', color: '#111111', accent: '#FFFFFF', hasPage: false, pageUrl: null },
  'Botafogo':      { id: 'botafogo',    name: 'Botafogo',            short: 'BOT', color: '#1a1a1a', accent: '#FFFFFF', hasPage: false, pageUrl: null },
  'Grêmio':        { id: 'gremio',      name: 'Grêmio',              short: 'GRE', color: '#1B3F7C', accent: '#AECEF0', hasPage: false, pageUrl: null },
  'Mirassol':      { id: 'mirassol',    name: 'Mirassol',            short: 'MIR', color: '#DAA520', accent: '#111111', hasPage: false, pageUrl: null },
  'Vasco da Gama': { id: 'vasco',       name: 'Vasco',               short: 'VAS', color: '#111111', accent: '#FFFFFF', hasPage: false, pageUrl: null },
  'Internacional': { id: 'internacional', name: 'Internacional',     short: 'INT', color: '#CC0000', accent: '#FFFF00', hasPage: false, pageUrl: null },
  'Clube do Remo': { id: 'remo',        name: 'Remo',                short: 'REM', color: '#003DA5', accent: '#FFFFFF', hasPage: false, pageUrl: null },
  'Chapecoense':   { id: 'chapecoense', name: 'Chapecoense',         short: 'CHA', color: '#006633', accent: '#FFFFFF', hasPage: false, pageUrl: null }
};

function getZone(pos) {
  if (pos <= 4)  return 'libertadores-g';
  if (pos <= 6)  return 'libertadores-p';
  if (pos <= 12) return 'sulamericana';
  if (pos >= 17) return 'rebaixamento';
  return 'neutro';
}

async function update() {
  console.log('Buscando classificação atualizada da API football-data.org...');
  const res = await fetch(URL, {
    headers: { 'X-Auth-Token': API_KEY }
  });

  if (!res.ok) {
    throw new Error(`Falha na API: HTTP ${res.status}`);
  }

  const json = await res.json();
  const table = json.standings[0].table;
  const matchday = json.season.currentMatchday || 26;

  const teams = table.map((item, idx) => {
    const pos = idx + 1;
    const sName = item.team.shortName || item.team.name;
    const meta = CLUB_META[sName] || CLUB_META[item.team.name] || {};

    return {
      id: meta.id || sName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: meta.name || sName,
      short: meta.short || item.team.tla || sName.slice(0, 3).toUpperCase(),
      color: meta.color || '#333333',
      accent: meta.accent || '#FFFFFF',
      hasPage: meta.hasPage || false,
      pageUrl: meta.pageUrl || null,
      played: item.playedGames,
      won: item.won,
      drawn: item.draw,
      lost: item.lost,
      gf: item.goalsFor,
      ga: item.goalsAgainst,
      points: item.points,
      zone: getZone(pos),
      form: []
    };
  });

  const output = `export const standingsData = ${JSON.stringify({
    season: '2026',
    league: 'Brasileirão Betano – Série A',
    round: matchday,
    updated: new Date().toLocaleDateString('pt-BR'),
    source: 'football-data.org (Sincronizado via API)',
    teams
  }, null, 2)};\n`;

  fs.writeFileSync(targetPath, output, 'utf-8');
  console.log(`✅ Sucesso! Tabela atualizada na ${matchday}ª rodada em ${targetPath}`);
}

update().catch(err => {
  console.error('❌ Erro ao atualizar tabela:', err.message);
  process.exit(1);
});
