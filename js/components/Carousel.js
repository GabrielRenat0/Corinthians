import { carouselData } from '../../data/carousel.js';

/**
 * @class Carousel
 * @classdesc Carrossel de grandes momentos com autoplay, swipe e teclado.
 *
 * CONCEITO POO — Encapsulamento:
 *   - Estado interno (_current, _timer) nunca exposto externamente
 *   - Métodos públicos: init()
 *   - Métodos privados: _render(), _goTo(), _next(), _prev(), etc.
 */
export class Carousel {
  /**
   * @param {string} trackId  - ID da faixa de slides
   * @param {string} dotsId   - ID do container de dots
   * @param {string} prevId   - ID do botão "anterior"
   * @param {string} nextId   - ID do botão "próximo"
   * @param {string} wrapperId- ID do wrapper externo (para keydown)
   */
  constructor(trackId, dotsId, prevId, nextId, wrapperId) {
    this._track   = document.getElementById(trackId);
    this._dotsEl  = document.getElementById(dotsId);
    this._prevBtn = document.getElementById(prevId);
    this._nextBtn = document.getElementById(nextId);
    this._wrapper = document.getElementById(wrapperId);

    this._current = 0;
    this._startX  = 0;
    this._timer   = null;
    this._slides  = [];
    this._dots    = [];
  }

  /** Renderiza slides, ativa controles e inicia autoplay */
  init() {
    this._render();
    this._bindControls();
    this._bindTouch();
    this._bindKeyboard();
    this._goTo(0);

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this._startAutoplay();
    }
  }

  // ── Privado ───────────────────────────────────────────────────────

  /** Cria slides e dots no DOM */
  _render() {
    carouselData.forEach((item, i) => {
      // Slide
      const slide = document.createElement('div');
      slide.className = 'carousel__slide';
      slide.setAttribute('aria-hidden', i !== 0);
      slide.innerHTML =
        '<div class="carousel__img-wrap">' +
          '<img src="' + item.img + '" alt="' + item.title + '" loading="lazy" draggable="false"/>' +
          '<div class="carousel__overlay"></div>' +
        '</div>' +
        '<div class="carousel__caption">' +
          '<span class="carousel__year">'  + item.year    + '</span>' +
          '<h3 class="carousel__title">'   + item.title   + '</h3>' +
          '<p class="carousel__text">'     + item.caption + '</p>'  +
        '</div>';
      this._track.appendChild(slide);
      this._slides.push(slide);

      // Dot
      const dot = document.createElement('button');
      dot.className = 'carousel__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', () => this._goTo(i));
      this._dotsEl.appendChild(dot);
      this._dots.push(dot);
    });
  }

  /**
   * Navega para um slide específico
   * @param {number} index
   */
  _goTo(index) {
    const total = this._slides.length;

    this._slides[this._current].classList.remove('active');
    this._slides[this._current].setAttribute('aria-hidden', 'true');
    this._dots[this._current].classList.remove('active');

    this._current = (index + total) % total;

    this._slides[this._current].classList.add('active');
    this._slides[this._current].setAttribute('aria-hidden', 'false');
    this._dots[this._current].classList.add('active');

    this._track.style.transform = 'translateX(-' + (this._current * 100) + '%)';
    this._resetAutoplay();
  }

  _next() { this._goTo(this._current + 1); }
  _prev() { this._goTo(this._current - 1); }

  /** Registra eventos dos botões prev/next */
  _bindControls() {
    this._prevBtn?.addEventListener('click', () => this._prev());
    this._nextBtn?.addEventListener('click', () => this._next());
  }

  /** Swipe por toque (mobile) */
  _bindTouch() {
    this._track.addEventListener('touchstart', e => {
      this._startX = e.touches[0].clientX;
    }, { passive: true });

    this._track.addEventListener('touchend', e => {
      const diff = this._startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) diff > 0 ? this._next() : this._prev();
    });
  }

  /** Navegação por teclado (acessibilidade) */
  _bindKeyboard() {
    this._wrapper?.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') this._next();
      if (e.key === 'ArrowLeft')  this._prev();
    });
  }

  _startAutoplay() {
    this._timer = setInterval(() => this._next(), 10000);
  }

  _resetAutoplay() {
    clearInterval(this._timer);
    this._startAutoplay();
  }
}
