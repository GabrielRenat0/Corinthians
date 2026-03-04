import { StandingsService } from '../services/StandingsService.js';

export class StandingsTable {
  constructor(containerId) {
    this._container = document.getElementById(containerId);
    this._service   = new StandingsService();
  }

  async init() {
    this._showLoading();
    try {
      const data = await this._service.fetch();
      this._render(data);
    } catch (e) {
      this._container.innerHTML = '<p style="color:#888;padding:2rem">Erro ao carregar tabela.</p>';
    }
  }

  _showLoading() {
    this._container.innerHTML =
      '<div class="standings-loading">' +
        '<div class="standings-loading__spinner"></div>' +
        '<p>Carregando tabela...</p>' +
      '</div>';
  }

  _render(data) {
    const zoneColors = {
      'libertadores-g': '#1a9e3f',
      'libertadores-p': '#5bc27a',
      'sulamericana':   '#e07c00',
      'neutro':         'transparent',
      'rebaixamento':   '#cc2222',
    };
    const zoneLabels = {
      'libertadores-g': 'Libertadores (Grupos)',
      'libertadores-p': 'Libertadores (Preliminar)',
      'sulamericana':   'Sul-Americana',
      'rebaixamento':   'Rebaixamento',
    };

    let lastZone = '';
    const rows = data.teams.map((team, i) => {
      const pos        = i + 1;
      const sg         = team.gf - team.ga;
      const sgStr      = sg > 0 ? '+' + sg : String(sg);
      const zoneColor  = zoneColors[team.zone] || 'transparent';
      const zoneLabel  = zoneLabels[team.zone]  || '';
      const separator  = team.zone !== lastZone && i > 0;
      lastZone = team.zone;

      // Coluna 1 — bolinha de zona
      const zoneDot = team.zone !== 'neutro'
        ? '<span class="zone-dot" style="background:' + zoneColor + '" title="' + zoneLabel + '"></span>'
        : '<span class="zone-dot zone-dot--empty"></span>';

      // Coluna 3 — círculo com inicial (coluna própria, sempre 44px)
      const circle =
        '<span class="team-circle" style="background:' + team.color + ';color:' + team.accent + '">' +
          team.short[0] +
        '</span>';

      // Coluna 4 — nome (link se tiver página)
      const nameCell = team.hasPage
        ? '<a href="' + team.pageUrl + '" class="team-name-link">' +
            team.name +
            '<svg class="team-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg>' +
          '</a>'
        : '<span class="team-name-text">' + team.name + '</span>';

      // Forma
      const formHTML = team.form.map(r =>
        '<span class="form-badge form-badge--' + r.toLowerCase() + '">' + r + '</span>'
      ).join('');

      const trClass = [
        'standings-row',
        team.id === 'corinthians' ? 'standings-row--highlight' : '',
        separator ? 'standings-row--zone-break' : '',
      ].filter(Boolean).join(' ');

      return (
        '<tr class="' + trClass + '">' +
          '<td class="col-zone">'   + zoneDot       + '</td>' +
          '<td class="col-pos">'    + pos            + '</td>' +
          '<td class="col-circle">' + circle         + '</td>' +
          '<td class="col-team">'   + nameCell       + '</td>' +
          '<td class="col-num">'    + team.played    + '</td>' +
          '<td class="col-num">'    + team.won       + '</td>' +
          '<td class="col-num">'    + team.drawn     + '</td>' +
          '<td class="col-num">'    + team.lost      + '</td>' +
          '<td class="col-num">'    + team.gf        + '</td>' +
          '<td class="col-num">'    + team.ga        + '</td>' +
          '<td class="col-num col-sg">' + sgStr      + '</td>' +
          '<td class="col-pts">'    + team.points    + '</td>' +
          '<td class="col-form">'   + formHTML       + '</td>' +
        '</tr>'
      );
    }).join('');

    this._container.innerHTML =
      '<div class="standings-meta">' +
        '<span class="standings-round">🗓 ' + data.round + 'ª Rodada</span>' +
        '<span class="standings-updated">Atualizado em ' + data.updated + '</span>' +
      '</div>' +
      '<div class="standings-table-wrap">' +
        '<table class="standings-table">' +
          '<thead><tr>' +
            '<th class="col-zone"></th>' +
            '<th class="col-pos">#</th>' +
            '<th class="col-circle"></th>' +
            '<th class="col-team">Clube</th>' +
            '<th class="col-num" title="Jogos">J</th>' +
            '<th class="col-num" title="Vitórias">V</th>' +
            '<th class="col-num" title="Empates">E</th>' +
            '<th class="col-num" title="Derrotas">D</th>' +
            '<th class="col-num" title="Gols Pró">GP</th>' +
            '<th class="col-num" title="Gols Contra">GC</th>' +
            '<th class="col-num col-sg" title="Saldo de Gols">SG</th>' +
            '<th class="col-pts" title="Pontos">PTS</th>' +
            '<th class="col-form">Forma</th>' +
          '</tr></thead>' +
          '<tbody>' + rows + '</tbody>' +
        '</table>' +
      '</div>' +
      '<div class="standings-legend">' +
        '<span><i class="legend-dot" style="background:#1a9e3f"></i>Libertadores (Grupos)</span>' +
        '<span><i class="legend-dot" style="background:#5bc27a"></i>Libertadores (Preliminar)</span>' +
        '<span><i class="legend-dot" style="background:#e07c00"></i>Sul-Americana</span>' +
        '<span><i class="legend-dot" style="background:#cc2222"></i>Rebaixamento</span>' +
      '</div>';
  }
}
