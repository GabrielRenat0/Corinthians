/* =========================================
   CORINTHIANS — app.js
   História, Timeline e Títulos
========================================= */

// ─── DATA ───────────────────────────────

const timelineData = [
  {
    year: "1910",
    title: "Fundação",
    text: "Em 1º de setembro de 1910, trabalhadores do bairro do Bom Retiro, em São Paulo, fundaram o Sport Club Corinthians Paulista. O clube nasceu do povo, inspirado no Corinthian FC inglês que visitava o Brasil na época."
  },
  {
    year: "1922",
    title: "Primeiro campeonato",
    text: "O Corinthians conquista seu primeiro título estadual em 1922, iniciando uma trajetória gloriosa no futebol paulistano e marcando o clube como força permanente no esporte nacional."
  },
  {
    year: "1939",
    title: "Invasão da Argentina",
    text: "O time realiza uma histórica turnê pela Argentina, vencendo partidas e ganhando respeito continental. A fama de campeão atravessa fronteiras e o escudo do Corinthians passa a ser reconhecido no continente."
  },
  {
    year: "1950",
    title: "Era Dourada",
    text: "Nas décadas de 40 e 50, o Corinthians domina o futebol paulista, acumulando campeonatos estaduais consecutivos e formando ídolos eternos para a Fiel Torcida."
  },
  {
    year: "1977",
    title: "Democracia Corinthiana",
    text: "Entre 1977 e 1984, o clube adota o modelo inovador de Democracia Corinthiana, onde jogadores, comissão técnica e funcionários participavam igualmente das decisões. Sócrates, Wladimir e Casagrande são os grandes nomes desse período revolucionário."
  },
  {
    year: "1990",
    title: "Título Brasileiro",
    text: "Em 1990, sob o comando de Neto, Tupãzinho e companhia, o Corinthians conquista o Campeonato Brasileiro, encerrando um jejum e mostrando que o povo que mais sofre é também o povo que mais se levanta."
  },
  {
    year: "1995",
    title: "Copa do Brasil",
    text: "O Timão conquista sua primeira Copa do Brasil, confirmando-se como potência nacional. A campanha empolgante unifica os 30 milhões de corinthianos no país inteiro."
  },
  {
    year: "2000",
    title: "Campeão Mundial",
    text: "Em dezembro de 2000, no estádio do Maracanã lotado, o Corinthians vence o Manchester United e o Vasco da Gama e ergue a taça do primeiro Mundial de Clubes da FIFA. O mundo conhece o gigante do futebol brasileiro."
  },
  {
    year: "2009",
    title: "Retorno à Série A",
    text: "Após uma queda para a Série B em 2007, o Corinthians retorna à elite com Ronaldo Fenômeno no elenco, em uma campanha épica que uniu toda a nação corinthiana e mostrou a força da Fiel."
  },
  {
    year: "2011",
    title: "Copa Libertadores",
    text: "O Timão conquista pela primeira vez a Libertadores da América, vencendo o Boca Juniors na decisão. Paolo Guerrero e Emerson Sheik são os heróis daquela noite histórica no Pacaembu."
  },
  {
    year: "2012",
    title: "Bi-campeão Mundial",
    text: "Em Yokohama, Japão, o Corinthians derrota o Chelsea de Didier Drogba e conquista seu segundo título Mundial. Cássio e Paolo Guerrero são ovacionados. O Brasil chora de alegria com os filhos do povo."
  },
  {
    year: "2015",
    title: "Arena Corinthians",
    text: "A Neo Química Arena, em Itaquera, se torna o novo lar do Corinthians. O estádio, que sediou a abertura da Copa do Mundo de 2014, é símbolo da grandeza do clube e recebe mais de 45 mil torcedores."
  },
  {
    year: "2023",
    title: "Novas Gerações",
    text: "O Corinthians segue construindo seu futuro com a forte base do Parque São Jorge, revelando talentos que levam a camisa com orgulho e mantendo viva a chama de mais de um século de paixão e glória."
  }
];

const titlesData = [
  { count: 7,  name: "Campeonato Brasileiro", years: "1990 · 1998 · 1999 · 2005 · 2011 · 2015 · 2017" },
  { count: 31, name: "Campeonato Paulista",   years: "1914 · 1922 · 1929 ... · 2013 · 2017 · 2018 · 2019 · 2025 " },
  { count: 4,  name: "Copa do Brasil",         years: "1995 · 2002 · 2009 · 2025" },
  { count: 1,  name: "Copa Libertadores",      years: "2012" },
  { count: 2,  name: "Mundial de Clubes FIFA", years: "2000 · 2012" },
  { count: 1,  name: "Recopa Sul-Americana",   years: "2013" },
];

// ─── TIMELINE RENDERING ─────────────────

function renderTimeline() {
  const container = document.getElementById('timelineContainer');
  timelineData.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.innerHTML = `
      <div class="item-content">
        <div class="item-year">${item.year}</div>
        <div class="item-title">${item.title}</div>
        <p class="item-text">${item.text}</p>
      </div>
      <div class="item-dot"><span></span></div>
      <div class="item-empty"></div>
    `;
    container.appendChild(el);
  });
}

// ─── TITLES RENDERING ───────────────────

function renderTitles() {
  const grid = document.getElementById('titlesGrid');
  titlesData.forEach(t => {
    const card = document.createElement('div');
    card.className = 'title-card';
    card.innerHTML = `
      <div class="title-card__count">${t.count}</div>
      <div class="title-card__name">${t.name}</div>
      <div class="title-card__years">${t.years}</div>
    `;
    grid.appendChild(card);
  });
}

// ─── INTERSECTION OBSERVER ──────────────

function setupObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.timeline-item, .title-card').forEach(el => observer.observe(el));
}

// ─── COUNTER ANIMATION ──────────────────

function animateCounter(el, target, duration = 1800) {
  const isLarge = target >= 1000;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    if (isLarge) {
      el.textContent = (current / 1000000).toFixed(0) + 'M+';
    } else {
      el.textContent = current;
    }
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function setupStatCounters() {
  const statsEl = document.querySelector('.stats-bar');
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounter(document.getElementById('s1'), 7);
      animateCounter(document.getElementById('s2'), 1);
      animateCounter(document.getElementById('s3'), 2);
      animateCounter(document.getElementById('s4'), 35000000);
      observer.disconnect();
    }
  }, { threshold: 0.4 });
  observer.observe(statsEl);
}

// ─── CAROUSEL DATA ──────────────────────
/*
  Imagens via picsum.photos — serviço confiável sem restrição de hotlink.
  Substitua as URLs por fotos reais do Corinthians quando quiser.
  Cada ID do picsum é fixo, garantindo sempre a mesma foto.
*/
const carouselData = [
  {
    img: "https://images.unsplash.com/photo-1521731978332-9e9e714bdd20?w=1200&q=80",
    year: "2000",
    title: "Campeão Mundial",
    caption: "No Maracanã lotado, o Corinthians vence o Manchester United e conquista o primeiro Mundial de Clubes da FIFA."
  },
  {
    img: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1200&q=80",
    year: "2012",
    title: "Libertadores da América",
    caption: "Paolo Guerrero e Emerson Sheik são os heróis da conquista inédita da Libertadores contra o Boca Juniors."
  },
  {
    // URL original estava quebrada — substituída por foto de futebol do Unsplash
    img: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&q=80",
    year: "2012",
    title: "Bi-campeão Mundial",
    caption: "Em Yokohama, Cássio defende o pênalti e o Corinthians derrota o Chelsea para ser bicampeão do mundo."
  },
  {
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
    year: "1977",
    title: "Democracia Corinthiana",
    caption: "Sócrates, Wladimir e Casagrande lideram o movimento que revolucionou o futebol brasileiro e o mundo do esporte."
  },
  {
    img: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1200&q=80",
    year: "2014",
    title: "Arena Corinthians",
    caption: "A Neo Química Arena abre suas portas e sedia a abertura da Copa do Mundo. O novo lar da Fiel Torcida."
  },
  {
    img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=80",
    year: "1990",
    title: "Título Brasileiro",
    caption: "Após anos de espera, o Corinthians conquista o Campeonato Brasileiro e o povo corinthiano vai às ruas celebrar."
  },
  {
    img: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=1200&q=80",
    year: "2009",
    title: "Fenômeno na Fiel",
    caption: "Ronaldo Fenômeno veste a camisa do Corinthians e lidera o time de volta à Série A, unindo gerações de torcedores."
  },
];

// ─── CAROUSEL RENDERING ─────────────────

function renderCarousel() {
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  let current = 0;
  let startX = 0;
  let autoplayTimer;

  // Renderiza slides
  carouselData.forEach((item, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel__slide';
    slide.setAttribute('aria-hidden', i !== 0);
    slide.innerHTML = `
      <div class="carousel__img-wrap">
        <img src="${item.img}" alt="${item.title}" loading="lazy" draggable="false" />
        <div class="carousel__overlay"></div>
      </div>
      <div class="carousel__caption">
        <span class="carousel__year">${item.year}</span>
        <h3 class="carousel__title">${item.title}</h3>
        <p class="carousel__text">${item.caption}</p>
      </div>
    `;
    track.appendChild(slide);

    // Dot
    const dot = document.createElement('button');
    dot.className = 'carousel__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const slides = track.querySelectorAll('.carousel__slide');
  const dots = dotsContainer.querySelectorAll('.carousel__dot');
  const total = slides.length;

  function goTo(index) {
    slides[current].classList.remove('active');
    slides[current].setAttribute('aria-hidden', true);
    dots[current].classList.remove('active');

    current = (index + total) % total;

    slides[current].classList.add('active');
    slides[current].setAttribute('aria-hidden', false);
    dots[current].classList.add('active');

    track.style.transform = `translateX(-${current * 100}%)`;
    resetAutoplay();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // Inicia no slide 0
  goTo(0);

  // Botões de clique
  document.getElementById('carouselNext').addEventListener('click', next);
  document.getElementById('carouselPrev').addEventListener('click', prev);

  // Teclado (acessibilidade)
  document.getElementById('carousel').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft')  prev();
  });

  // Swipe por toque (somente mobile — sem drag de mouse)
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  });

  // Autoplay a cada 10 segundos — sem pausa ao hover
  function startAutoplay() {
    autoplayTimer = setInterval(next, 10000);
  }
  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  // Respeita prefers-reduced-motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    startAutoplay();
  }
}

// ─── SCROLL TO TIMELINE ─────────────────

function scrollToTimeline() {
  document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' });
}

// ─── INIT ────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderTimeline();
  renderTitles();
  renderCarousel();
  setupObserver();
  setupStatCounters();
  setupLineupPanel();
});

// ─── LINEUP DATA ─────────────────────────
const lineupData = {
  1990: {
    title: "Campeão Brasileiro 1990",
    coach: "Técnico: Nelsinho Baptista",
    formation: "4-4-2",
    context: "O título que encerrou um jejum de 10 anos no Brasileirão.",
    rows: [
      ["Ronaldo Giovanelli"],
      ["Betinho","Zé Maria","Índio","Gilson"],
      ["Tupãzinho","Neto","Amarildo","Edu Marangon"],
      ["Viola","Müller"]
    ],
    bench: ["Zé Carlos","Mauro Silva","Marcelinho","Luisinho","Rinaldo"]
  },
  1995: {
    title: "Copa do Brasil 1995",
    coach: "Técnico: Cuca",
    formation: "4-3-3",
    context: "Primeira Copa do Brasil da história do clube.",
    rows: [
      ["Ronaldo Giovanelli"],
      ["Cléber","Zé Maria","Índio","Roberto Carlos"],
      ["Djalminha","Neto","Souza"],
      ["Marcelinho Carioca","Viola","Palhinha"]
    ],
    bench: ["Guilherme","Betinho","Rinaldo","Luisinho","Edu"]
  },
  1998: {
    title: "Campeão Brasileiro 1998",
    coach: "Técnico: Oswaldo de Oliveira",
    formation: "4-4-2",
    context: "Bicampeonato em sequência com Marcelinho Carioca em grande fase.",
    rows: [
      ["Dida"],
      ["Rogério","Gamarra","Antônio Carlos","Silvinho"],
      ["Marcelinho Carioca","Souza","Rincón","Dinei"],
      ["Edilson","Lúcio Flávio"]
    ],
    bench: ["Guilherme","Anderson Pico","Rinaldo","Paulo Sérgio","Vampeta"]
  },
  1999: {
    title: "Tricampeão Brasileiro 1999",
    coach: "Técnico: Vanderlei Luxemburgo",
    formation: "4-3-3",
    context: "Tri consecutivo, com Vampeta e Edilson no auge.",
    rows: [
      ["Dida"],
      ["Rogério","Gamarra","Antônio Carlos","Silvinho"],
      ["Vampeta","Rincón","Warley"],
      ["Marcelinho Carioca","Edilson","Luizão"]
    ],
    bench: ["Guilherme","Anderson Pico","Souza","Paulo Sérgio","Lúcio Flávio"]
  },
  2000: {
    title: "Campeão Mundial 2000",
    coach: "Técnico: Oswaldo de Oliveira",
    formation: "4-4-2",
    context: "Venceu o primeiro Mundial de Clubes da FIFA, derrotando o Manchester United.",
    rows: [
      ["Dida"],
      ["Rogério","Gamarra","Antônio Carlos","Silvinho"],
      ["Vampeta","Rincón","Cocâo","Warley"],
      ["Edilson","Luizão"]
    ],
    bench: ["Guilherme","Anderson Pico","Dinei","Paulo Sérgio","Marcelinho"]
  },
  2002: {
    title: "Copa do Brasil 2002",
    coach: "Técnico: Paulo César Carpegiani",
    formation: "4-4-2",
    context: "Segunda Copa do Brasil com Tevita e Fabinho Capixaba em destaque.",
    rows: [
      ["Marcos"],
      ["Rogério","Antônio Carlos","Anderson Polga","Fábio Luciano"],
      ["Capixaba","Souza","Tevita","Ricardinho"],
      ["Deivid","Gil"]
    ],
    bench: ["Guilherme","Betão","Renato","Alessandro","Lúcio Flávio"]
  },
  2005: {
    title: "Campeão Brasileiro 2005",
    coach: "Técnico: Tite",
    formation: "4-2-3-1",
    context: "Tite inicia sua era vitoriosa no clube, dominando o Brasileirão.",
    rows: [
      ["Fábio Costa"],
      ["Alessandro","Betão","Gustavo","Fábio Luciano"],
      ["Souza","Carlos Alberto"],
      ["Roger","Tevita","Ricardinho"],
      ["Carlos Tevez"]
    ],
    bench: ["Guilherme","Anderson Polga","Edu Dracena","Wendell","Gil"]
  },
  2009: {
    title: "Retorno à Série A — 2009",
    coach: "Técnico: Mano Menezes",
    formation: "4-2-3-1",
    context: "Ronaldo Fenômeno lidera o acesso épico de volta à elite.",
    rows: [
      ["Júlio César"],
      ["Alessandro","Chicão","Leandro Castán","Fábio Santos"],
      ["Paulinho","Souza"],
      ["Jorge Henrique","Dentinho","Liedson"],
      ["Ronaldo"]
    ],
    bench: ["Felipe","Edu Dracena","Émerson","Elias","Willian"]
  },
  2011: {
    title: "Campeão Brasileiro 2011",
    coach: "Técnico: Tite",
    formation: "4-2-3-1",
    context: "Hexa Brasileiro com Tite, Paulinho e Romarinho brilhando.",
    rows: [
      ["Cássio"],
      ["Alessandro","Chicão","Leandro Castán","Fábio Santos"],
      ["Ralf","Paulinho"],
      ["Jorge Henrique","Willian","Romarinho"],
      ["Liedson"]
    ],
    bench: ["Felipe","Edu Dracena","Élton","Émerson","Dentinho"]
  },
  2012: {
    title: "Campeão da Libertadores e Mundial 2012",
    coach: "Técnico: Tite",
    formation: "4-2-3-1",
    context: "O ano mais glorioso da história: Libertadores e Mundial no mesmo ano.",
    rows: [
      ["Cássio"],
      ["Alessandro","Chicão","Leandro Castán","Fábio Santos"],
      ["Ralf","Paulinho"],
      ["Jorge Henrique","Willian","Emerson Sheik"],
      ["Paolo Guerrero"]
    ],
    bench: ["Felipe","Edu Dracena","Élton","Romarinho","Danilo"]
  },
  2015: {
    title: "Campeão Brasileiro 2015",
    coach: "Técnico: Tite",
    formation: "4-1-4-1",
    context: "Heptacampeonato Brasileiro com Renato Augusto e Jadson em grande fase.",
    rows: [
      ["Cássio"],
      ["Fagner","Gil","Balbuena","Fábio Santos"],
      ["Ralf"],
      ["Renato Augusto","Elias","Jadson","Malcom"],
      ["Lucca"]
    ],
    bench: ["Walter","Edu Dracena","Léo Príncipe","Guilherme Arana","Bruno Henrique"]
  },
  2017: {
    title: "Campeão Brasileiro 2017",
    coach: "Técnico: Fábio Carille",
    formation: "4-1-4-1",
    context: "Octacampeonato com Jadson e Romero brilhando sob o comando de Carille.",
    rows: [
      ["Cássio"],
      ["Fagner","Balbuena","Pablo","Guilherme Arana"],
      ["Gabriel"],
      ["Camacho","Rodriguinho","Jadson","Clayson"],
      ["Jô"]
    ],
    bench: ["Walter","Léo Príncipe","Maycon","Romero","Marlone"]
  },
  2023: {
    title: "Geração 2023",
    coach: "Técnico: Mano Menezes",
    formation: "4-2-3-1",
    context: "Jovens talentos como Yuri Alberto e Mateus Vital assumem protagonismo.",
    rows: [
      ["Cássio"],
      ["Fagner","Gil","Murillo","Fábio Santos"],
      ["Fausto Vera","Renato Augusto"],
      ["Giuliano","Mateus Vital","Romero"],
      ["Yuri Alberto"]
    ],
    bench: ["Carlos Miguel","Rafael Ramos","Adson","Du Queiroz","Wesley"]
  }
};

// ─── LINEUP PANEL ────────────────────────
function setupLineupPanel() {
  const fab      = document.getElementById('lineupFab');
  const panel    = document.getElementById('lineupPanel');
  const overlay  = document.getElementById('lineupOverlay');
  const closeBtn = document.getElementById('lineupClose');
  const yearsEl  = document.getElementById('lineupYears');
  const metaEl   = document.getElementById('lineupMeta');
  const fieldEl  = document.getElementById('lineupField');
  const benchEl  = document.getElementById('lineupBench');

  const years = Object.keys(lineupData).map(Number).sort((a,b) => a-b);
  let activeYear = 2012;

  years.forEach(y => {
    const btn = document.createElement('button');
    btn.className = 'lineup-year-btn' + (y === activeYear ? ' active' : '');
    btn.textContent = y;
    btn.addEventListener('click', () => selectYear(y));
    yearsEl.appendChild(btn);
  });

  function selectYear(year) {
    activeYear = year;
    const data = lineupData[year];
    yearsEl.querySelectorAll('.lineup-year-btn').forEach(b => {
      b.classList.toggle('active', parseInt(b.textContent) === year);
    });
    const activeBtn = yearsEl.querySelector('.lineup-year-btn.active');
    if (activeBtn) activeBtn.scrollIntoView({ inline:'center', behavior:'smooth', block:'nearest' });

    metaEl.innerHTML = `
      <h3 class="lp-title">${data.title}</h3>
      <p class="lp-coach">${data.coach} &nbsp;·&nbsp; <span>${data.formation}</span></p>
      <p class="lp-context">${data.context}</p>
    `;

    fieldEl.innerHTML = '';
    [...data.rows].reverse().forEach(row => {
      const rowEl = document.createElement('div');
      rowEl.className = 'lp-row';
      row.forEach(name => {
        const p = document.createElement('div');
        p.className = 'lp-player';
        const initials = name.split(' ').map(w=>w[0]).slice(0,2).join('');
        p.innerHTML = `<div class="lp-player__circle">${initials}</div><span class="lp-player__name">${name}</span>`;
        rowEl.appendChild(p);
      });
      fieldEl.appendChild(rowEl);
    });

    benchEl.innerHTML = `
      <p class="lp-bench-title">Banco de reservas</p>
      <div class="lp-bench-list">${data.bench.map(n=>`<span class="lp-bench-player">${n}</span>`).join('')}</div>
    `;
  }

  selectYear(activeYear);

  function openPanel() {
    panel.classList.add('open');
    overlay.classList.add('open');
    panel.setAttribute('aria-hidden', false);
    document.body.style.overflow = 'hidden';
  }
  function closePanel() {
    panel.classList.remove('open');
    overlay.classList.remove('open');
    panel.setAttribute('aria-hidden', true);
    document.body.style.overflow = '';
  }

  fab.addEventListener('click', openPanel);
  closeBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });
}