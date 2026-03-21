import { Navbar      } from './components/Navbar.js';
import { Timeline    } from './components/Timeline.js';
import { TitlesGrid  } from './components/TitlesGrid.js';
import { Carousel    } from './components/Carousel.js';
import { IdolsGrid   } from './components/IdolsGrid.js';
import { StatCounter } from './components/StatCounter.js';
import { FabMenu     } from './components/FabMenu.js';
import { LineupPanel } from './panels/LineupPanel.js';
import { StatsPanel  } from './panels/StatsPanel.js';

// Dados do Cruzeiro
import { cruzeirTimelineData }                                        from '../data/cruzeiro-timeline.js';
import { cruzeirTitlesData, cruzeirIdolsData,
         cruzeirLineupsData, cruzeirStatsData } from '../data/cruzeiro-data.js';

// Sobrescreve os módulos de dados antes de instanciar os componentes
// (técnica de injeção: os componentes lêem de variáveis globais temporárias)

// ─── Monkey-patch dos módulos de dados ───────────────────────────────────────
// Como os componentes já importam seus próprios dados, a forma mais simples
// sem alterar a arquitetura é estender as classes existentes com override.

import { timelineData } from '../data/timeline.js';
import { titlesData   } from '../data/titles.js';
import { idolsData    } from '../data/idols.js';
import { lineupData   } from '../data/lineups.js';
import { statsData    } from '../data/stats.js';

// Substitui os arrays no módulo importado em runtime
timelineData.splice(0, timelineData.length, ...cruzeirTimelineData);
titlesData.splice(0,   titlesData.length,   ...cruzeirTitlesData);
idolsData.splice(0,    idolsData.length,    ...cruzeirIdolsData);
Object.keys(lineupData).forEach(k => delete lineupData[k]);
Object.assign(lineupData, cruzeirLineupsData);
Object.keys(statsData).forEach(k => delete statsData[k]);
Object.assign(statsData, cruzeirStatsData);

// ─── Inicialização ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  new Navbar().init();

  new Timeline('timelineContainer').init();

  new TitlesGrid('titlesGrid').init();

  new Carousel('carouselTrack','carouselDots','carouselPrev','carouselNext','carousel').init();

  new IdolsGrid('idolsGrid').init();

  new StatCounter('.stats-bar', [
    { id: 's1', target: 4        },  // Brasileiros
    { id: 's2', target: 2        },  // Libertadores
    { id: 's3', target: 6        },  // Copas do Brasil
    { id: 's4', target: 20000000 },  // Torcedores
  ]).init();

  const OVERLAY_ID  = 'lineupOverlay';
  const lineupPanel = new LineupPanel(OVERLAY_ID);
  const statsPanel  = new StatsPanel(OVERLAY_ID);

  new FabMenu('fabMenu','fabToggle','fabOptions').init();

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (lineupPanel.isOpen) lineupPanel.close();
    else if (statsPanel.isOpen) statsPanel.close();
  });

  window.scrollToTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  };
});