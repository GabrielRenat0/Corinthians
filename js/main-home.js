/**
 * @fileoverview Ponto de entrada da Home Page.
 */

import { StandingsTable } from './components/StandingsTable.js';

document.addEventListener('DOMContentLoaded', () => {

  // Tabela do Brasileirão 2026
  const table = new StandingsTable('standingsContainer');
  table.init();

});
