/**
 * @class StatCounter
 * @classdesc Anima contadores numéricos quando entram na viewport.
 *
 * CONCEITO POO — Encapsulamento + Responsabilidade única:
 *   - Cada instância gerencia UMA barra de stats
 *   - A animação de números é encapsulada em _animateCounter()
 *   - O gatilho de IntersectionObserver é separado em _observe()
 */
export class StatCounter {
  /**
   * @param {string} barSelector - Seletor CSS da barra de estatísticas
   * @param {Array<{id: string, target: number}>} counters - Lista de contadores
   */
  constructor(barSelector, counters) {
    this._bar      = document.querySelector(barSelector);
    this._counters = counters;
  }

  /** Ativa o observer que dispara a animação */
  init() {
    if (!this._bar) return;
    this._observe();
  }

  // ── Privado ───────────────────────────────────────────────────────

  /** Observa a barra; quando visível, anima todos os contadores */
  _observe() {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this._counters.forEach(({ id, target }) => {
          const el = document.getElementById(id);
          if (el) this._animateCounter(el, target);
        });
        observer.disconnect();
      }
    }, { threshold: 0.4 });

    observer.observe(this._bar);
  }

  /**
   * Anima um elemento de 0 até o valor alvo
   * @param {HTMLElement} el     - Elemento cujo textContent será animado
   * @param {number}      target - Valor final
   * @param {number}      duration - Duração em ms (padrão: 1800)
   */
  _animateCounter(el, target, duration = 1800) {
    const isMillions = target >= 1_000_000;
    const start      = performance.now();

    const update = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cúbico
      const current  = Math.round(eased * target);

      el.textContent = isMillions
        ? Math.round(current / 1_000_000) + 'M+'
        : current;

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }
}
