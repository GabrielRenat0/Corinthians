/**
 * @class StandingsService
 * @classdesc Busca a tabela do Brasileirão na api-futebol.com.br
 */

import { standingsData } from '../../data/standings.js';

export class StandingsService {

  constructor() {
    // ── Configuração ─────────────────────────────────────────────
    // Troque para 'api' quando tiver chave de produção
    this._mode           = 'static';        // 'api' | 'static'
    this._apiKey         = 'test_a8c37778328495ac24c5d0d3c3923b';
    this._campeonatoId   = 10;              // ID do Brasileirão Série A
    this._baseUrl        = 'https://api.api-futebol.com.br/v1';
    // ─────────────────────────────────────────────────────────────
  }

  /**
   * Retorna os dados da tabela.
   * Em modo 'api': chama a api-futebol.com.br e normaliza a resposta.
   * Em modo 'static': retorna os dados locais (standings.js).
   *
   * @returns {Promise<Object>} Objeto com { season, league, round, updated, teams[] }
   */
  async fetch() {
    if (this._mode === 'api') {
      return this._fetchFromApi();
    }
    return Promise.resolve(standingsData);
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

  // ── Privado ───────────────────────────────────────────────────

  async _fetchFromApi() {
    const url = this._baseUrl + '/campeonatos/' + this._campeonatoId + '/tabela';
    const res = await fetch(url, {
      headers: { Authorization: 'Bearer ' + this._apiKey }
    });

    if (!res.ok) throw new Error('API Futebol: erro ' + res.status);

    const raw = await res.json();
    return this._normalize(raw);
  }

  /**
   * Mapeia a resposta da api-futebol.com.br para o formato interno.
   * Os campos da API ficam documentados aqui — fácil de ajustar.
   *
   * @param {Object[]} raw - Array de classificação retornado pela API
   * @returns {Object}
   */
  _normalize(raw) {
    // A API retorna um array de objetos de classificação
    const tabela = Array.isArray(raw) ? raw : (raw.tabela || raw.classificacao || []);

    // Mapa de times que têm página dedicada no site
    const pageMap = {
      'Corinthians': { id: 'corinthians', pageUrl: 'corinthians.html' },
    };

    const teams = tabela.map(item => {
      const nome    = item.time?.nome_popular || item.time?.nome || 'Time';
      const pageDef = pageMap[nome] || {};

      return {
        id:      pageDef.id    || this._slug(nome),
        name:    nome,
        short:   (item.time?.sigla || nome.slice(0, 3)).toUpperCase(),
        color:   '#' + (item.time?.escudo_cor || '333333'),
        accent:  '#FFFFFF',
        hasPage: !!pageDef.pageUrl,
        pageUrl: pageDef.pageUrl || null,
        played:  item.jogos       ?? 0,
        won:     item.vitorias    ?? 0,
        drawn:   item.empates     ?? 0,
        lost:    item.derrotas    ?? 0,
        gf:      item.gols_pro    ?? 0,
        ga:      item.gols_contra ?? 0,
        points:  item.pontos      ?? 0,
        zone:    this._zone(item.posicao ?? 99),
        form:    this._parseForm(item.ultimos_jogos || ''),
      };
    });

    return {
      season:  '2026',
      league:  'Brasileirão Série A',
      round:   tabela[0]?.rodada ?? '—',
      updated: new Date().toLocaleDateString('pt-BR'),
      source:  'api-futebol.com.br',
      teams,
    };
  }

  /** Converte posição na tabela para zona de classificação */
  _zone(pos) {
    if (pos <= 4)  return 'libertadores-g';
    if (pos <= 6)  return 'libertadores-p';
    if (pos <= 12) return 'sulamericana';
    if (pos >= 17) return 'rebaixamento';
    return 'neutro';
  }

  /** Converte string de forma "VVEDV" em array ['W','W','D','W','L'] */
  _parseForm(str) {
    return str.split('').slice(-5).map(c => {
      if (c === 'V' || c === 'W') return 'W';
      if (c === 'E' || c === 'D') return 'D';
      return 'L';
    });
  }

  /** Gera slug a partir do nome do time */
  _slug(name) {
    return name.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
}
