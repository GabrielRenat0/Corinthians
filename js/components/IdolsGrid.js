import { idolsData } from '../../data/idols.js';

/**
 * @class IdolsGrid
 * @classdesc Renderiza o grid de lendas históricas com animação de entrada.
 *
 * CONCEITO POO — Responsabilidade única:
 *   - Só cuida dos cards de ídolos
 *   - Toda lógica de montagem de HTML isolada em _buildCard()
 */
export class IdolsGrid {
  /**
   * @param {string} gridId - ID do container no HTML
   */
  constructor(gridId) {
    this._grid = document.getElementById(gridId);
  }

  /** Renderiza cards e ativa observer de animação */
  init() {
    this._render();
    this._observeCards();
  }

  // ── Privado ───────────────────────────────────────────────────────

  _render() {
    if (!this._grid) return;

    idolsData.forEach((idol, i) => {
      const card = this._buildCard(idol, i);
      this._grid.appendChild(card);
    });
  }

  /**
   * Constrói o elemento DOM de um card de ídolo
   * @param {Object} idol - Dados do ídolo
   * @param {number} i    - Índice (para delay de animação)
   * @returns {HTMLElement}
   */
  _buildCard(idol, i) {
    // Decide o stat secundário: gols para jogadores de linha, pênaltis para Cássio
    const secondaryStat = idol.goals > 0
      ? '<div class="idol-stat"><span class="idol-stat__val">' + idol.goals + '</span><span class="idol-stat__lbl">gols</span></div>'
      : '<div class="idol-stat"><span class="idol-stat__val">32</span><span class="idol-stat__lbl">pênaltis def.</span></div>';

    const card = document.createElement('div');
    card.className = 'idol-card';
    card.style.animationDelay = (i * 0.08) + 's';

    card.innerHTML =
      '<div class="idol-card__bg" style="background:' + idol.color + '"></div>' +
      '<div class="idol-card__number">' + idol.number + '</div>' +
      '<div class="idol-card__avatar"><span>' + idol.initials + '</span></div>' +
      '<div class="idol-card__body">' +
        '<span class="idol-card__badge">'  + idol.badge    + '</span>' +
        '<h3 class="idol-card__name">'     + idol.name     + '</h3>'  +
        '<p class="idol-card__pos">'       + idol.position + ' · ' + idol.period + '</p>' +
        '<div class="idol-card__stats">' +
          '<div class="idol-stat">' +
            '<span class="idol-stat__val">' + idol.games + '</span>' +
            '<span class="idol-stat__lbl">jogos</span>' +
          '</div>' +
          secondaryStat +
        '</div>' +
        '<blockquote class="idol-card__quote">"' + idol.quote + '"</blockquote>' +
      '</div>';

    return card;
  }

  /** Anima cada card ao entrar na viewport */
  _observeCards() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    this._grid.querySelectorAll('.idol-card').forEach(el => observer.observe(el));
  }
}
