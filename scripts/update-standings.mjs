/**
 * Script para atualizar data/standings.js e data/league-data.js
 * diretamente da API football-data.org.
 * Execute com: npm run update-standings
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const standingsPath = path.resolve(__dirname, '../data/standings.js');
const leagueDataPath = path.resolve(__dirname, '../data/league-data.js');

const API_KEY = 'c8790ec04daf44cc9dcc4223b74945f0';
const BASE_URL = 'https://api.football-data.org/v4';
const COMPETITION = 'BSA';

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

async function apiFetch(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'X-Auth-Token': API_KEY }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} em ${endpoint}`);
  return res.json();
}

async function syncAll() {
  console.log('🔄 Sincronizando dados completos do Brasileirão Série A 2026...');

  // 1. Tabela de Classificação
  console.log('📊 1/3 Buscando tabela de classificação...');
  const standingsJson = await apiFetch(`/competitions/${COMPETITION}/standings`);
  const table = standingsJson.standings[0].table;
  const currentMatchday = standingsJson.season.currentMatchday || 26;

  const teams = table.map((item, idx) => {
    const pos = idx + 1;
    const sName = item.team.shortName || item.team.name;
    const meta = CLUB_META[sName] || CLUB_META[item.team.name] || {};

    return {
      id: meta.id || sName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: meta.name || sName,
      short: meta.short || item.team.tla || sName.slice(0, 3).toUpperCase(),
      crest: item.team.crest || null,
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

  const standingsData = {
    season: '2026',
    league: 'Brasileirão Betano – Série A',
    round: currentMatchday,
    updated: new Date().toLocaleDateString('pt-BR'),
    source: 'football-data.org',
    teams
  };

  fs.writeFileSync(standingsPath, `export const standingsData = ${JSON.stringify(standingsData, null, 2)};\n`, 'utf-8');
  console.log('✅ data/standings.js salvo com sucesso.');

  // 2. Artilharia e Estatísticas
  console.log('⚽ 2/3 Buscando artilheiros e estatísticas...');
  const scorersJson = await apiFetch(`/competitions/${COMPETITION}/scorers`);
  const scorersList = (scorersJson.scorers || []).map(s => {
    const tName = s.team.shortName || s.team.name;
    const meta = CLUB_META[tName] || CLUB_META[s.team.name] || {};
    return {
      player: s.player.name,
      team: meta.name || tName,
      teamId: meta.id || null,
      crest: s.team.crest || null,
      goals: s.goals,
      assists: s.assists || 0,
      playedMatches: s.playedMatches,
      penalties: s.penalties || 0
    };
  });

  // Melhores defesas (calculadas a partir da tabela)
  const bestDefenses = [...teams]
    .sort((a, b) => a.ga - b.ga)
    .slice(0, 5)
    .map(t => ({
      name: t.name,
      id: t.id,
      crest: t.crest,
      ga: t.ga,
      played: t.played,
      average: (t.ga / (t.played || 1)).toFixed(2)
    }));

  // Melhores ataques
  const bestAttacks = [...teams]
    .sort((a, b) => b.gf - a.gf)
    .slice(0, 5)
    .map(t => ({
      name: t.name,
      id: t.id,
      crest: t.crest,
      gf: t.gf,
      played: t.played,
      average: (t.gf / (t.played || 1)).toFixed(2)
    }));

  // 3. Jogos Recentes e Próximos Jogos
  console.log('📅 3/3 Buscando rodada atual e próxima rodada...');
  const recentMatchday = currentMatchday;
  const nextMatchday = currentMatchday + 1;

  const [recentMatchesJson, nextMatchesJson] = await Promise.all([
    apiFetch(`/competitions/${COMPETITION}/matches?matchday=${recentMatchday}`),
    apiFetch(`/competitions/${COMPETITION}/matches?matchday=${nextMatchday}`)
  ]);

  function normalizeMatch(m) {
    const homeName = m.homeTeam.shortName || m.homeTeam.name;
    const awayName = m.awayTeam.shortName || m.awayTeam.name;
    const homeMeta = CLUB_META[homeName] || CLUB_META[m.homeTeam.name] || {};
    const awayMeta = CLUB_META[awayName] || CLUB_META[m.awayTeam.name] || {};

    const dateObj = new Date(m.utcDate);
    const dateFormatted = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    const timeFormatted = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const weekdayFormatted = dateObj.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');

    return {
      id: m.id,
      status: m.status, // FINISHED, TIMED, IN_PLAY, etc.
      matchday: m.matchday,
      date: dateFormatted,
      time: timeFormatted,
      weekday: weekdayFormatted,
      homeTeam: {
        id: homeMeta.id || null,
        name: homeMeta.name || homeName,
        short: homeMeta.short || m.homeTeam.tla || homeName.slice(0, 3).toUpperCase(),
        crest: m.homeTeam.crest || null
      },
      awayTeam: {
        id: awayMeta.id || null,
        name: awayMeta.name || awayName,
        short: awayMeta.short || m.awayTeam.tla || awayName.slice(0, 3).toUpperCase(),
        crest: m.awayTeam.crest || null
      },
      score: {
        home: m.score?.fullTime?.home ?? null,
        away: m.score?.fullTime?.away ?? null
      }
    };
  }

  const leagueData = {
    round: currentMatchday,
    nextRound: nextMatchday,
    updated: new Date().toLocaleDateString('pt-BR'),
    scorers: scorersList,
    assists: [...scorersList].filter(s => s.assists > 0).sort((a, b) => b.assists - a.assists),
    bestDefenses,
    bestAttacks,
    recentMatches: (recentMatchesJson.matches || []).map(normalizeMatch),
    nextMatches: (nextMatchesJson.matches || []).map(normalizeMatch)
  };

  fs.writeFileSync(leagueDataPath, `export const leagueData = ${JSON.stringify(leagueData, null, 2)};\n`, 'utf-8');
  console.log('✅ data/league-data.js salvo com sucesso.');
  console.log(`🎉 Concluído com sucesso! Rodada ${currentMatchday} e ${nextMatchday} sincronizadas.`);
}

syncAll().catch(err => {
  console.error('❌ Erro na sincronização:', err);
  process.exit(1);
});
