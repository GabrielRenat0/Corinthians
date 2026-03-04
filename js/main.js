/**
 * @fileoverview Ponto de entrada da aplicação.
 *
 * CONCEITO POO — Abstração:
 *   Este arquivo não sabe COMO cada componente funciona por dentro.
 *   Ele apenas instancia e chama init() — o contrato público de cada classe.
 *
 * Hierarquia de classes:
 *
 *   Panel (base abstrata)
 *   ├── LineupPanel   (herda open/close, sobrescreve render)
 *   └── StatsPanel    (herda open/close, sobrescreve render)
 *
 *   Componentes independentes:
 *   ├── Navbar
 *   ├── Timeline
 *   ├── TitlesGrid
 *   ├── Carousel
 *   ├── IdolsGrid
 *   ├── StatCounter
 *   └── FabMenu
 */

import { Navbar      } from './components/Navbar.js';
import { Timeline    } from './components/Timeline.js';
import { TitlesGrid  } from './components/TitlesGrid.js';
import { Carousel    } from './components/Carousel.js';
import { IdolsGrid   } from './components/IdolsGrid.js';
import { StatCounter } from './components/StatCounter.js';
import { FabMenu     } from './components/FabMenu.js';
import { LineupPanel } from './panels/LineupPanel.js';
import { StatsPanel  } from './panels/StatsPanel.js';

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar ────────────────────────────────────────────────────────
  const navbar = new Navbar();
  navbar.init();

  // ── Linha do tempo ────────────────────────────────────────────────
  const timeline = new Timeline('timelineContainer');
  timeline.init();

  // ── Grid de conquistas ────────────────────────────────────────────
  const titlesGrid = new TitlesGrid('titlesGrid');
  titlesGrid.init();

  // ── Carrossel de grandes momentos ─────────────────────────────────
  const carousel = new Carousel(
    'carouselTrack',  // track
    'carouselDots',   // dots
    'carouselPrev',   // botão anterior
    'carouselNext',   // botão próximo
    'carousel'        // wrapper (keydown)
  );
  carousel.init();

  // ── Grid de ídolos ────────────────────────────────────────────────
  const idolsGrid = new IdolsGrid('idolsGrid');
  idolsGrid.init();

  // ── Contadores animados da barra de stats ─────────────────────────
  const statCounter = new StatCounter('.stats-bar', [
    { id: 's1', target: 7        },  // Brasileiros
    { id: 's2', target: 1        },  // Libertadores
    { id: 's3', target: 2        },  // Mundiais
    { id: 's4', target: 35000000 },  // Torcedores
  ]);
  statCounter.init();

  // ── Painéis laterais (herdam de Panel) ───────────────────────────
  // O overlay é compartilhado entre os dois painéis
  const OVERLAY_ID = 'lineupOverlay';

  const lineupPanel = new LineupPanel(OVERLAY_ID);
  const statsPanel  = new StatsPanel(OVERLAY_ID);

  // ── FAB Menu (botão flutuante de ação) ───────────────────────────
  const fabMenu = new FabMenu('fabMenu', 'fabToggle', 'fabOptions');
  fabMenu.init();

  // ── Handler global de Escape ──────────────────────────────────────
  // Centralizado aqui pois afeta múltiplos painéis
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (lineupPanel.isOpen) lineupPanel.close();
    else if (statsPanel.isOpen) statsPanel.close();
  });

  // ── Scroll suave do CTA do hero ──────────────────────────────────
  // Exposto globalmente pois é chamado via onclick no HTML
  window.scrollToTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  };

});
