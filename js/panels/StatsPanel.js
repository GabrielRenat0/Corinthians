import { Panel }     from './Panel.js';
import { statsData } from '../../data/stats.js';

/**
 * @class StatsPanel
 * @extends Panel
 * @classdesc Painel lateral de estatísticas históricas com abas.
 */
export class StatsPanel extends Panel {
  /**
   * @param {string} overlayId - ID do overlay compartilhado
   */
  constructor(overlayId) {
    super('statsPanel', 'statsFab', 'statsClose', overlayId);

    // Estado interno encapsulado
    this._activeTab = 'scorers';

    // Elementos internos do painel
    this._tabs    = document.querySelectorAll('.stats-tab');
    this._content = document.getElementById('statsPanelContent');

    this.render();
    this._bindTabEvents();
  }

  // ── Polimorfismo: sobrescreve Panel.render() ──────────────────────

  /** Renderiza a aba atualmente ativa */
  render() {
    this._renderTab(this._activeTab);
  }

  // ── Métodos privados ──────────────────────────────────────────────

  /** Registra eventos de clique nas abas */
  _bindTabEvents() {
    this._tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this._tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this._activeTab = tab.dataset.tab;
        this._renderTab(this._activeTab);
      });
    });
  }

  /**
   * Renderiza o conteúdo de uma categoria de estatística
   * @param {string} tabKey - Chave da categoria (scorers | assists | games | saves)
   */
  _renderTab(tabKey) {
    if (!this._content) return;

    const data = statsData[tabKey];
    const max  = data.items[0].value;

    const itemsHTML = data.items.map((item, i) => {
      const pct   = Math.round((item.value / max) * 100);
      const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1) + 'º';

      return (
        '<div class="sp-item">' +
          '<div class="sp-item__top">' +
            '<span class="sp-rank">' + medal + '</span>' +
            '<span class="sp-name">' + item.name + '</span>' +
            '<span class="sp-value">' + item.value + ' <small>' + data.unit + '</small></span>' +
          '</div>' +
          '<div class="sp-item__detail">' + item.detail + '</div>' +
          '<div class="sp-bar-wrap"><div class="sp-bar" style="width:' + pct + '%"></div></div>' +
        '</div>'
      );
    }).join('');

    this._content.innerHTML =
      '<div class="sp-header">' +
        '<span class="sp-icon">' + data.icon + '</span>' +
        '<div>' +
          '<h3 class="sp-title">' + data.title + '</h3>' +
          '<p class="sp-sub">' + data.subtitle + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="sp-list">' + itemsHTML + '</div>';
  }
}
