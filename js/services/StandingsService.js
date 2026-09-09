/**
 * @class StandingsService
 * @classdesc Busca e gerencia os dados da tabela do Brasileirão Série A.
 * Utiliza a API football-data.org (com suporte a token) e mantém fallback sincronizado.
 */

import { standingsData } from '../../data/standings.js';

// Mapeamento visual e de navegação dos clubes do Brasileirão
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

export class StandingsService {

  constructor() {
    // Chave de autenticação da API football-data.org
    this._apiKey          = 'c8790ec04daf44cc9dcc4223b74945f0';
    this._competitionCode = 'BSA';
    this._baseUrl         = 'https://api.football-data.org/v4';
  }

  /**
   * Retorna os dados da tabela.
   * Tenta buscar ao vivo via API; se houver bloqueio de CORS pelo navegador ou erro de rede,
   * utiliza os dados sincronizados em data/standings.js.
   *
   * @returns {Promise<Object>}
   */
  async fetch() {
    if (this._apiKey) {
      try {
        const liveData = await this._fetchFromApi();
        console.info('[StandingsService] Tabela atualizada com sucesso via API ao vivo.');
        return liveData;
      } catch (err) {
        console.info('[StandingsService] Acesso direto à API indisponível no navegador (' + err.message + '). Carregando base sincronizada oficial.');
      }
    }
    return standingsData;
  }

  /**
   * Ordena os times pelo critério oficial da CBF:
   * pontos → vitórias → saldo de gols → gols marcados
   */
  sort(teams) {
    return [...teams].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.won    !== a.won)    return b.won    - a.won;
      const sgA = a.gf - a.ga, sgB = b.gf - b.ga;
      if (sgB !== sgA) return sgB - sgA;
      return b.gf - a.gf;
    });
  }

  // ── Métodos Privados ──────────────────────────────────────────

  async _fetchFromApi() {
    const url = `${this._baseUrl}/competitions/${this._competitionCode}/standings`;
    const res = await fetch(url, {
      headers: { 'X-Auth-Token': this._apiKey }
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const json = await res.json();
    return this._normalize(json);
  }

  /**
   * Converte o payload da football-data.org para a estrutura usada pelo frontend.
   */
  _normalize(json) {
    const standingsArr = json.standings || [];
    const totalStanding = standingsArr.find(s => s.type === 'TOTAL') || standingsArr[0] || {};
    const table = totalStanding.table || [];

    const teams = table.map((item, idx) => {
      const pos   = idx + 1;
      const team  = item.team || {};
      const sName = team.shortName || team.name || 'Time';
      const meta  = CLUB_META[sName] || CLUB_META[team.name] || {};

      return {
        id:      meta.id      || sName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name:    meta.name    || sName,
        short:   meta.short   || team.tla || sName.slice(0, 3).toUpperCase(),
        color:   meta.color   || '#333333',
        accent:  meta.accent  || '#FFFFFF',
        hasPage: meta.hasPage || false,
        pageUrl: meta.pageUrl || null,
        played:  item.playedGames ?? 0,
        won:     item.won         ?? 0,
        drawn:   item.draw        ?? 0,
        lost:    item.lost        ?? 0,
        gf:      item.goalsFor    ?? 0,
        ga:      item.goalsAgainst ?? 0,
        points:  item.points      ?? 0,
        zone:    this._zone(pos),
        form:    this._parseForm(item.form || ''),
      };
    });

    const matchday = json.season?.currentMatchday || (table[0] && table[0].playedGames) || 26;

    return {
      season:  '2026',
      league:  'Brasileirão Betano – Série A',
      round:   matchday,
      updated: new Date().toLocaleDateString('pt-BR'),
      source:  'football-data.org',
      teams,
    };
  }

  _zone(pos) {
    if (pos <= 4)  return 'libertadores-g';
    if (pos <= 6)  return 'libertadores-p';
    if (pos <= 12) return 'sulamericana';
    if (pos >= 17) return 'rebaixamento';
    return 'neutro';
  }

  _parseForm(str) {
    if (!str) return [];
    const cleaned = str.replace(/[,\s]/g, '');
    return cleaned.split('').slice(-5).map(c => {
      if (c === 'V' || c === 'W') return 'W';
      if (c === 'E' || c === 'D') return 'D';
      return 'L';
    });
  }
}
