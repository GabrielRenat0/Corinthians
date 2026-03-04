/**
 * @fileoverview Ponto de entrada da Home Page.
 *
 * Instancia apenas os componentes necessários para a home:
 * - StandingsTable (tabela do Brasileirão)
 *
 * Arquitetura preparada para crescer:
 * - Adicionar página do São Paulo? new StandingsTable() já existe.
 * - Ligar a API real? Mude só StandingsService.js.
 */

import { StandingsTable } from './components/StandingsTable.js';

document.addEventListener('DOMContentLoaded', () => {

  // Tabela do Brasileirão 2026
  const table = new StandingsTable('standingsContainer');
  table.init();

});
