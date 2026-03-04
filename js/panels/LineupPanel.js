import { Panel }      from './Panel.js';
import { lineupData } from '../../data/lineups.js';

/**
 * @class LineupPanel
 * @extends Panel
 * @classdesc Painel lateral de escalações históricas.
 */
export class LineupPanel extends Panel {
  /**
   * @param {string} overlayId - ID do overlay compartilhado
   */
  constructor(overlayId) {
    // Chama o construtor da classe pai (Panel)
    super('lineupPanel', 'lineupFab', 'lineupClose', overlayId);

    // Estado interno encapsulado
    this._activeYear = 2012;
    this._years      = Object.keys(lineupData).map(Number).sort((a, b) => a - b);

    // Referências aos elementos internos do painel
    this._yearsEl = document.getElementById('lineupYears');
    this._metaEl  = document.getElementById('lineupMeta');
    this._fieldEl = document.getElementById('lineupField');
    this._benchEl = document.getElementById('lineupBench');

    this.render();
  }

  // ── Polimorfismo: sobrescreve Panel.render() ──────────────────────

  /** Renderiza o seletor de anos e a escalação inicial */
  render() {
    this._renderYearButtons();
    this._renderLineup(this._activeYear);
  }

  // ── Métodos privados ──────────────────────────────────────────────

  /** Cria os botões de seleção de ano */
  _renderYearButtons() {
    if (!this._yearsEl) return;
    this._yearsEl.innerHTML = '';

    this._years.forEach(year => {
      const btn = document.createElement('button');
      btn.className   = 'lineup-year-btn' + (year === this._activeYear ? ' active' : '');
      btn.textContent = year;
      btn.addEventListener('click', () => this._selectYear(year));
      this._yearsEl.appendChild(btn);
    });
  }

  /**
   * Seleciona um ano e re-renderiza a escalação
   * @param {number} year - Ano a ser exibido
   */
  _selectYear(year) {
    this._activeYear = year;

    // Atualiza estado visual dos botões
    this._yearsEl.querySelectorAll('.lineup-year-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.textContent) === year);
    });

    // Scroll suave para o botão ativo
    const activeBtn = this._yearsEl.querySelector('.lineup-year-btn.active');
    activeBtn?.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });

    this._renderLineup(year);
  }

  /**
   * Renderiza meta-informações, campo e banco para um ano
   * @param {number} year
   */
  _renderLineup(year) {
    const data = lineupData[year];
    if (!data) return;

    this._renderMeta(data);
    this._renderField(data.rows);
    this._renderBench(data.bench);
  }

  /**
   * Renderiza título, técnico e contexto histórico
   * @param {Object} data - Dados da escalação
   */
  _renderMeta(data) {
    if (!this._metaEl) return;
    this._metaEl.innerHTML =
      '<h3 class="lp-title">' + data.title + '</h3>' +
      '<p class="lp-coach">' + data.coach + ' &nbsp;·&nbsp; <span>' + data.formation + '</span></p>' +
      '<p class="lp-context">' + data.context + '</p>';
  }

  /**
   * Renderiza o campo visual com jogadores posicionados por linha
   * As linhas chegam como [GK, DEF, MID, ATK] e são invertidas para
   * exibir o ataque no topo do campo (visualmente mais natural).
   * @param {string[][]} rows
   */
  _renderField(rows) {
    if (!this._fieldEl) return;
    this._fieldEl.innerHTML = '';

    // Inverte: campo mostra ATK no topo, GK na base
    [...rows].reverse().forEach(row => {
      const rowEl = document.createElement('div');
      rowEl.className = 'lp-row';

      row.forEach(name => {
        const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('');
        const player   = document.createElement('div');
        player.className = 'lp-player';
        player.innerHTML =
          '<div class="lp-player__circle">' + initials + '</div>' +
          '<span class="lp-player__name">' + name + '</span>';
        rowEl.appendChild(player);
      });

      this._fieldEl.appendChild(rowEl);
    });
  }

  /**
   * Renderiza a lista do banco de reservas
   * @param {string[]} bench
   */
  _renderBench(bench) {
    if (!this._benchEl) return;
    const players = bench.map(n => '<span class="lp-bench-player">' + n + '</span>').join('');
    this._benchEl.innerHTML =
      '<p class="lp-bench-title">Banco de reservas</p>' +
      '<div class="lp-bench-list">' + players + '</div>';
  }
}
