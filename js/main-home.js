/**
 * @fileoverview Ponto de entrada da Home Page.
 */

import { StandingsTable } from './components/StandingsTable.js';
import { LeagueStats } from './components/LeagueStats.js';
import { MatchesWidget } from './components/MatchesWidget.js';

document.addEventListener('DOMContentLoaded', () => {

  // Tabela do Brasileirão 2026
  const table = new StandingsTable('standingsContainer');
  table.init();

  // Coluna de Estatísticas (Artilharia, Garçons, Defesas)
  const stats = new LeagueStats('statsContainer');
  stats.init();

  // Coluna de Partidas (Últimos Jogos e Próximas Rodadas)
  const matches = new MatchesWidget('matchesContainer');
  matches.init();

});
