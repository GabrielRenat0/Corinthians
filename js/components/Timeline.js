import { timelineData } from '../../data/timeline.js';

/**
 * @class Timeline
 * @classdesc Renderiza e anima a linha do tempo histórica do Corinthians.
 */
export class Timeline {
  /**
   * @param {string} containerId - ID do container no HTML
   */
  constructor(containerId) {
    this._container = document.getElementById(containerId);
  }

  /** Renderiza os itens e ativa o observer de animação */
  init() {
    this._render();
    this._observeItems();
  }

  // ── Privado ───────────────────────────────────────────────────────

  /** Cria e insere os elementos da timeline no DOM */
  _render() {
    if (!this._container) return;

    timelineData.forEach(item => {
      const el = document.createElement('div');
      el.className = 'timeline-item';
      el.innerHTML =
        '<div class="item-content">' +
          '<div class="item-year">'  + item.year  + '</div>' +
          '<div class="item-title">' + item.title + '</div>' +
          '<p class="item-text">'    + item.text  + '</p>'  +
        '</div>' +
        '<div class="item-dot"><span></span></div>' +
        '<div class="item-empty"></div>';
      this._container.appendChild(el);
    });
  }

  /** Usa IntersectionObserver para animar itens ao entrar na viewport */
  _observeItems() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    this._container.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
  }
}
