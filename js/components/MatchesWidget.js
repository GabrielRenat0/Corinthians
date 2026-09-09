/**
 * @class MatchesWidget
 * @classdesc Central de Jogos do Brasileirão: exibe últimos resultados com placares e datas,
 * e próximos confrontos com horários.
 */

import { leagueData } from '../../data/league-data.js';

export class MatchesWidget {
  constructor(containerId) {
    this._container = document.getElementById(containerId);
    this._activeTab = 'recent'; // 'recent' | 'next'
  }

  init() {
    if (!this._container) return;
    this._render();
    this._bindEvents();
  }

  _bindEvents() {
    const tabRecent = this._container.querySelector('#tabRecentMatches');
    const tabNext = this._container.querySelector('#tabNextMatches');

    if (tabRecent && tabNext) {
      tabRecent.addEventListener('click', () => {
        this._activeTab = 'recent';
        this._render();
        this._bindEvents();
      });

      tabNext.addEventListener('click', () => {
        this._activeTab = 'next';
        this._render();
        this._bindEvents();
      });
    }
  }

  _render() {
    const isRecent = this._activeTab === 'recent';
    const matches = isRecent ? (leagueData.recentMatches || []) : (leagueData.nextMatches || []);
    const roundNumber = isRecent ? leagueData.round : leagueData.nextRound;

    const matchesHTML = matches.map(m => {
      const isCorinthians = m.homeTeam.id === 'corinthians' || m.awayTeam.id === 'corinthians';
      const isCruzeiro = m.homeTeam.id === 'cruzeiro' || m.awayTeam.id === 'cruzeiro';
      const isSpecial = isCorinthians || isCruzeiro;

      const hasScore = m.score.home !== null && m.score.away !== null;
      const scoreBadge = hasScore
        ? `<span class="match-score">${m.score.home} <span>×</span> ${m.score.away}</span>`
        : `<span class="match-vs">vs</span>`;

      return `
        <div class="match-card ${isSpecial ? 'match-card--highlight' : ''}">
          <div class="match-card__header">
            <span class="match-date">📅 ${m.weekday ? `${m.weekday}, ` : ''}${m.date}</span>
            <span class="match-time">${hasScore ? 'Encerrado' : `⏰ ${m.time}`}</span>
          </div>

          <div class="match-card__teams">
            <div class="match-team match-team--home ${isCorinthians && m.homeTeam.id === 'corinthians' ? 'match-team--cor' : ''}">
              ${m.homeTeam.crest ? `<img src="${m.homeTeam.crest}" alt="${m.homeTeam.name}" class="match-team__crest" />` : ''}
              <span class="match-team__name" title="${m.homeTeam.name}">${m.homeTeam.name}</span>
            </div>

            <div class="match-center">
              ${scoreBadge}
            </div>

            <div class="match-team match-team--away ${isCorinthians && m.awayTeam.id === 'corinthians' ? 'match-team--cor' : ''}">
              ${m.awayTeam.crest ? `<img src="${m.awayTeam.crest}" alt="${m.awayTeam.name}" class="match-team__crest" />` : ''}
              <span class="match-team__name" title="${m.awayTeam.name}">${m.awayTeam.name}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    this._container.innerHTML = `
      <div class="sidebar-card">
        <div class="sidebar-card__header">
          <div class="sidebar-card__icon">🗓️</div>
          <div>
            <h3>Central de Jogos</h3>
            <p>Placares e próximas partidas da Série A</p>
          </div>
        </div>

        <div class="matches-nav-tabs">
          <button id="tabRecentMatches" class="matches-tab-btn ${isRecent ? 'is-active' : ''}">
            Últimos (${leagueData.round}ª Rodada)
          </button>
          <button id="tabNextMatches" class="matches-tab-btn ${!isRecent ? 'is-active' : ''}">
            Próximos (${leagueData.nextRound}ª Rodada)
          </button>
        </div>

        <div class="matches-list">
          ${matchesHTML.length > 0 ? matchesHTML : '<p class="matches-empty">Nenhuma partida encontrada.</p>'}
        </div>
      </div>
    `;
  }
}
