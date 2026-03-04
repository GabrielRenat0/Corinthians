/**
 * @class Navbar
 * @classdesc Barra de navegação fixa com comportamento de scroll inteligente.
 *
 * CONCEITO POO — Encapsulamento:
 *   - Todos os elementos DOM e o estado de scroll ficam privados
 *   - A classe expõe apenas o método init() publicamente
 */
export class Navbar {
  constructor() {
    this._navbar  = document.getElementById('navbar');
    this._burger  = document.getElementById('navBurger');
    this._mobile  = document.getElementById('navMobile');
    this._links   = document.querySelectorAll('.navbar__link');
    this._lastY   = 0;
    this._ticking = false;

    // IDs das seções monitoradas para link ativo
    this._sectionIds = ['hero', 'timeline', 'idols', 'titles', 'moments'];
  }

  /** Inicializa todos os comportamentos da navbar */
  init() {
    this._bindScroll();
    this._bindBurger();
    this._bindSectionObserver();
  }

  // ── Privado ───────────────────────────────────────────────────────

  /** Esconde/mostra a navbar conforme direção do scroll */
  _bindScroll() {
    window.addEventListener('scroll', () => {
      if (this._ticking) return;

      requestAnimationFrame(() => {
        const y = window.scrollY;

        if (y > this._lastY && y > 80) {
          this._navbar.classList.add('hidden');
        } else {
          this._navbar.classList.remove('hidden');
        }

        this._navbar.classList.toggle('scrolled', y > 60);
        this._lastY   = y;
        this._ticking = false;
      });

      this._ticking = true;
    });
  }

  /** Abre/fecha o menu mobile ao clicar no hambúrguer */
  _bindBurger() {
    if (!this._burger || !this._mobile) return;

    this._burger.addEventListener('click', () => {
      const isOpen = this._mobile.classList.toggle('open');
      this._burger.classList.toggle('open', isOpen);
    });

    // Fecha ao clicar em qualquer link
    document.querySelectorAll('.navbar__link, .navbar__mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        this._mobile.classList.remove('open');
        this._burger.classList.remove('open');
      });
    });
  }

  /** Marca o link ativo conforme a seção visível na tela */
  _bindSectionObserver() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          this._links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.3 });

    this._sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }
}
