import { titlesData } from '../../data/titles.js';

/**
 * @class TitlesGrid
 * @classdesc Renderiza o grid de conquistas do clube com animação de entrada.
 */
export class TitlesGrid {
  /**
   * @param {string} gridId - ID do elemento grid no HTML
   */
  constructor(gridId) {
    this._grid = document.getElementById(gridId);
  }

  /** Renderiza os cards e ativa o observer */
  init() {
    this._render();
    this._observeCards();
  }

  // ── Privado ───────────────────────────────────────────────────────

  _render() {
    if (!this._grid) return;

    titlesData.forEach(t => {
      const card = document.createElement('div');
      card.className = 'title-card';
      card.innerHTML =
        '<div class="title-card__count">' + t.count + '</div>' +
        '<div class="title-card__name">'  + t.name  + '</div>' +
        '<div class="title-card__years">' + t.years + '</div>';
      this._grid.appendChild(card);
    });
  }

  _observeCards() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    this._grid.querySelectorAll('.title-card').forEach(el => observer.observe(el));
  }
}
