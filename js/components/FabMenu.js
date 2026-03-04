/**
 * @class FabMenu
 * @classdesc Botão flutuante de ação (FAB) com menu expansível.
 * Gerencia abertura/fechamento das opções e integração com os painéis.
 *
 * CONCEITO POO — Encapsulamento:
 *   - Estado _isOpen encapsulado
 *   - Fecha automaticamente ao clicar fora
 */
export class FabMenu {
  /**
   * @param {string} menuId   - ID do container do menu
   * @param {string} toggleId - ID do botão principal
   * @param {string} optionsId- ID do wrapper das opções
   */
  constructor(menuId, toggleId, optionsId) {
    this._menu    = document.getElementById(menuId);
    this._toggle  = document.getElementById(toggleId);
    this._options = document.getElementById(optionsId);
    this._isOpen  = false;
  }

  /** Ativa os eventos do menu */
  init() {
    if (!this._toggle) return;
    this._bindToggle();
    this._bindOptions();
    this._bindOutsideClick();
  }

  // ── Privado ───────────────────────────────────────────────────────

  /** Abre/fecha o menu ao clicar no botão principal */
  _bindToggle() {
    this._toggle.addEventListener('click', () => {
      this._isOpen = !this._isOpen;
      this._menu.classList.toggle('open', this._isOpen);
      this._toggle.setAttribute('aria-expanded', this._isOpen);
      this._options?.setAttribute('aria-hidden', !this._isOpen);
    });
  }

  /** Fecha o menu ao clicar em qualquer opção */
  _bindOptions() {
    document.querySelectorAll('.fab-option').forEach(btn => {
      btn.addEventListener('click', () => this._close());
    });
  }

  /** Fecha o menu ao clicar fora dele */
  _bindOutsideClick() {
    document.addEventListener('click', e => {
      if (this._isOpen && !this._menu.contains(e.target)) {
        this._close();
      }
    });
  }

  _close() {
    this._isOpen = false;
    this._menu.classList.remove('open');
    this._toggle.setAttribute('aria-expanded', 'false');
    this._options?.setAttribute('aria-hidden', 'true');
  }
}
