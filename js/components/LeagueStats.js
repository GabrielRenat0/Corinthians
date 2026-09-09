/**
 * @class LeagueStats
 * @classdesc Renderiza o painel de estatísticas do Brasileirão (artilharia, assistências, defesas).
 */

import { leagueData } from '../../data/league-data.js';

export class LeagueStats {
  constructor(containerId) {
    this._container = document.getElementById(containerId);
  }

  init() {
    if (!this._container) return;
    this._render(leagueData);
  }

  _render(data) {
    const scorers = data.scorers || [];
    const assists = data.assists || [];
    const defenses = data.bestDefenses || [];

    const topScorer = scorers[0] || {};
    const topAssist = assists[0] || {};
    const bestDefense = defenses[0] || {};

    const scorersHTML = scorers.slice(0, 5).map((s, idx) => `
      <div class="stat-player-row">
        <span class="stat-player-rank">${idx + 1}</span>
        ${s.crest ? `<img src="${s.crest}" alt="${s.team}" class="stat-team-crest" />` : ''}
        <div class="stat-player-info">
          <span class="stat-player-name">${s.player}</span>
          <span class="stat-player-team">${s.team} · ${s.playedMatches}j</span>
        </div>
        <span class="stat-player-metric"><strong>${s.goals}</strong> <em>gols</em></span>
      </div>
    `).join('');

    const assistsHTML = assists.slice(0, 5).map((s, idx) => `
      <div class="stat-player-row">
        <span class="stat-player-rank">${idx + 1}</span>
        ${s.crest ? `<img src="${s.crest}" alt="${s.team}" class="stat-team-crest" />` : ''}
        <div class="stat-player-info">
          <span class="stat-player-name">${s.player}</span>
          <span class="stat-player-team">${s.team}</span>
        </div>
        <span class="stat-player-metric"><strong>${s.assists}</strong> <em>ast</em></span>
      </div>
    `).join('');

    const defenseHTML = defenses.slice(0, 4).map((d, idx) => `
      <div class="stat-player-row">
        <span class="stat-player-rank">${idx + 1}</span>
        ${d.crest ? `<img src="${d.crest}" alt="${d.name}" class="stat-team-crest" />` : ''}
        <div class="stat-player-info">
          <span class="stat-player-name">${d.name}</span>
          <span class="stat-player-team">${d.played} jogos · média ${d.average}</span>
        </div>
        <span class="stat-player-metric"><strong>${d.ga}</strong> <em>gols</em></span>
      </div>
    `).join('');

    this._container.innerHTML = `
      <div class="sidebar-card">
        <div class="sidebar-card__header">
          <div class="sidebar-card__icon">⚽</div>
          <div>
            <h3>Artilharia</h3>
            <p>Principais goleadores do campeonato</p>
          </div>
        </div>

        <div class="stat-highlight-card">
          <div class="stat-highlight-crest">
            ${topScorer.crest ? `<img src="${topScorer.crest}" alt="${topScorer.team}" />` : ''}
          </div>
          <div class="stat-highlight-info">
            <span class="stat-highlight-label">LÍDER DE GOLS</span>
            <strong class="stat-highlight-name">${topScorer.player || '—'}</strong>
            <span class="stat-highlight-team">${topScorer.team || '—'}</span>
          </div>
          <div class="stat-highlight-num">
            <span>${topScorer.goals || 0}</span>
            <small>gols</small>
          </div>
        </div>

        <div class="stat-list">
          ${scorersHTML}
        </div>
      </div>

      <div class="sidebar-card">
        <div class="sidebar-card__header">
          <div class="sidebar-card__icon">🎯</div>
          <div>
            <h3>Garçons</h3>
            <p>Líderes em assistências</p>
          </div>
        </div>

        <div class="stat-list">
          ${assistsHTML}
        </div>
      </div>

      <div class="sidebar-card">
        <div class="sidebar-card__header">
          <div class="sidebar-card__icon">🛡️</div>
          <div>
            <h3>Paredão</h3>
            <p>Menos gols sofridos na Série A</p>
          </div>
        </div>

        <div class="stat-list">
          ${defenseHTML}
        </div>
      </div>
    `;
  }
}
