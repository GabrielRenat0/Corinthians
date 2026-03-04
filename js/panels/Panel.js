/**
 * @class Panel
 * @classdesc Classe base abstrata para painéis laterais deslizantes.
 */
export class Panel {
  /**
   * @param {string} panelId   - ID do elemento <aside> no HTML
   * @param {string} fabId     - ID do botão que abre o painel
   * @param {string} closeId   - ID do botão de fechar (✕)
   * @param {string} overlayId - ID do overlay escuro de fundo
   */
  constructor(panelId, fabId, closeId, overlayId) {
    // Encapsulamento: elementos DOM são privados à instância
    this._panel   = document.getElementById(panelId);
    this._fab     = document.getElementById(fabId);
    this._close   = document.getElementById(closeId);
    this._overlay = document.getElementById(overlayId);

    if (!this._panel || !this._fab || !this._close) {
      console.warn(`Panel: elemento(s) não encontrados para panelId="${panelId}"`);
      return;
    }

    this._bindEvents();
  }

  // ── Métodos concretos (herdados pelas subclasses) ──────────────────

  /** Abre o painel */
  open() {
    this._panel.classList.add('open');
    this._overlay?.classList.add('open');
    this._panel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  /** Fecha o painel */
  close() {
    this._panel.classList.remove('open');
    this._overlay?.classList.remove('open');
    this._panel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /** Retorna se o painel está aberto */
  get isOpen() {
    return this._panel.classList.contains('open');
  }

  // ── Método abstrato (deve ser sobrescrito pela subclasse) ──────────

  /**
   * Renderiza o conteúdo interno do painel.
   * @abstract
   */
  render() {
    throw new Error(`Panel.render() deve ser implementado pela subclasse "${this.constructor.name}"`);
  }

  // ── Privado: registro de eventos ──────────────────────────────────

  _bindEvents() {
    this._fab.addEventListener('click',   () => this.open());
    this._close.addEventListener('click', () => this.close());
    this._overlay?.addEventListener('click', () => this.close());
  }
}
