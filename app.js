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


// ─── IDOLS DATA ──────────────────────────
const idolsData = [
  {
    name: "Sócrates",
    position: "Meia",
    period: "1978 – 1984",
    number: "8",
    games: 297,
    goals: 172,
    quote: "Vencer não é o mais importante. O mais importante é ser digno da vitória.",
    color: "#1a3a1a",
    initials: "DR",
    badge: "Democracia Corinthiana"
  },
  {
    name: "Marcelinho Carioca",
    position: "Meia-atacante",
    period: "1994 – 2001 · 2006",
    number: "10",
    games: 433,
    goals: 206,
    quote: "O Corinthians é minha vida. Aqui eu nasci para o futebol.",
    color: "#1a1a2e",
    initials: "MC",
    badge: "Ídolo da Fiel"
  },
  {
    name: "Ronaldo Fenômeno",
    position: "Centroavante",
    period: "2009 – 2011",
    number: "9",
    games: 69,
    goals: 35,
    quote: "Escolhi o Corinthians porque queria ganhar. E ganhamos.",
    color: "#1f1a00",
    initials: "R9",
    badge: "O Fenômeno"
  },
  {
    name: "Cássio",
    position: "Goleiro",
    period: "2012 – 2023",
    number: "12",
    games: 712,
    goals: 0,
    quote: "Esse clube me deu tudo. Dei minha vida por essa camisa.",
    color: "#1a0a0a",
    initials: "CA",
    badge: "Maior Goleiro da História"
  },
  {
    name: "Paolo Guerrero",
    position: "Centroavante",
    period: "2012 – 2015",
    number: "9",
    games: 174,
    goals: 100,
    quote: "No Corinthians aprendi o que é ser campeão de verdade.",
    color: "#1a0d00",
    initials: "PG",
    badge: "Herói da Libertadores"
  },
  {
    name: "Rivellino",
    position: "Meia",
    period: "1965 – 1974",
    number: "10",
    games: 473,
    goals: 133,
    quote: "O Corinthians é o maior clube do mundo. E eu tive a honra de jogar aqui.",
    color: "#0a1a2a",
    initials: "RI",
    badge: "Gênio do Futebol"
  },
  {
    name: "Wladimir",
    position: "Lateral-esquerdo",
    period: "1972 – 1985 · 1987",
    number: "6",
    games: 806,
    goals: 23,
    quote: "Democracia Corinthiana foi a experiência mais bonita que vivi no esporte.",
    color: "#001a1a",
    initials: "WL",
    badge: "Recordista de Jogos"
  },
  {
    name: "Jadson",
    position: "Meia",
    period: "2014 – 2022",
    number: "10",
    games: 358,
    goals: 72,
    quote: "A Fiel me deu amor que não recebi em nenhum outro lugar.",
    color: "#1a1500",
    initials: "JD",
    badge: "Maestro do Timão"
  }
];

// ─── IDOLS RENDERING ─────────────────────
function renderIdols() {
  const grid = document.getElementById('idolsGrid');

  idolsData.forEach((idol, i) => {
    const card = document.createElement('div');
    card.className = 'idol-card';
    card.style.animationDelay = (i * 0.08) + 's';

    const goalsHTML = idol.goals > 0
      ? '<div class="idol-stat"><span class="idol-stat__val">' + idol.goals + '</span><span class="idol-stat__lbl">gols</span></div>'
      : '<div class="idol-stat"><span class="idol-stat__val">32</span><span class="idol-stat__lbl">pênaltis def.</span></div>';

    card.innerHTML =
      '<div class="idol-card__bg" style="background:' + idol.color + '"></div>' +
      '<div class="idol-card__number">' + idol.number + '</div>' +
      '<div class="idol-card__avatar"><span>' + idol.initials + '</span></div>' +
      '<div class="idol-card__body">' +
        '<span class="idol-card__badge">' + idol.badge + '</span>' +
        '<h3 class="idol-card__name">' + idol.name + '</h3>' +
        '<p class="idol-card__pos">' + idol.position + ' · ' + idol.period + '</p>' +
        '<div class="idol-card__stats">' +
          '<div class="idol-stat">' +
            '<span class="idol-stat__val">' + idol.games + '</span>' +
            '<span class="idol-stat__lbl">jogos</span>' +
          '</div>' +
          goalsHTML +
        '</div>' +
        '<blockquote class="idol-card__quote">"' + idol.quote + '"</blockquote>' +
      '</div>';

    grid.appendChild(card);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.idol-card').forEach(el => observer.observe(el));
}

// ─── NAVBAR ──────────────────────────────
function setupNavbar() {
  const navbar  = document.getElementById('navbar');
  const burger  = document.getElementById('navBurger');
  const mobile  = document.getElementById('navMobile');
  const links   = document.querySelectorAll('.navbar__link, .navbar__mobile-link');
  let lastY     = 0;
  let ticking   = false;

  // Scroll: mostra/esconde + classe scrolled
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        // Esconde ao rolar para baixo, mostra ao rolar para cima
        if (y > lastY && y > 80) {
          navbar.classList.add('hidden');
        } else {
          navbar.classList.remove('hidden');
        }
        // Fundo sólido após sair do hero
        navbar.classList.toggle('scrolled', y > 60);
        lastY = y;
        ticking = false;
      });
      ticking = true;
    }
  });

  // Burger mobile
  burger.addEventListener('click', () => {
    const isOpen = mobile.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
  });

  // Fecha mobile ao clicar em link
  links.forEach(link => {
    link.addEventListener('click', () => {
      mobile.classList.remove('open');
      burger.classList.remove('open');
    });
  });

  // Link ativo ao rolar
  const sections = ['hero','timeline','idols','titles','moments'];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll('.navbar__link').forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTimeline();
  renderTitles();
  renderCarousel();
  setupObserver();
  setupStatCounters();
  setupLineupPanel();
  setupStatsPanel();
  setupFabMenu();
  renderIdols();
  setupNavbar();
  setupGlobalEscape();
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
  },
  2025: {
    title: "Tetracampeão Copa do Brasil 2025",
    coach: "Técnico: Ramón Díaz / Dorival Júnior",
    formation: "4-4-2",
    context: "Venceu o Vasco por 2 a 1 no Maracanã (21/12/2025). Yuri Alberto e Memphis marcaram. Tetracampeonato da Copa do Brasil — 1995, 2002, 2009 e 2025.",
    rows: [
      ["Hugo Souza"],
      ["Matheuzinho","André Ramalho","Gustavo Henrique","Matheus Bidu"],
      ["José Martínez","Raniele","Maycon","Breno Bidon"],
      ["Memphis Depay","Yuri Alberto"]
    ],
    bench: ["Matheus Donelli","Fagner","Cacá","Hugo","Carrillo","Rodrigo Garro","Pedro Raul"]
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
}


// ─── STATS DATA ──────────────────────────
const statsData = {
  scorers: {
    title: "Top 10 Artilheiros",
    subtitle: "Gols marcados na história do clube",
    unit: "gols",
    icon: "⚽",
    items: [
      { name: "Cláudio Christóvam", value: 306, detail: "1945–1957" },
      { name: "Baltazar",           value: 270, detail: "1945–1957" },
      { name: "Teleco",             value: 257, detail: "1934–1944" },
      { name: "Neco",               value: 242, detail: "1913–1930" },
      { name: "Marcelinho Carioca", value: 206, detail: "1994–2001 · 2006" },
      { name: "Servílio",           value: 200, detail: "1930–1948" },
      { name: "Luizinho",           value: 175, detail: "1946–1960" },
      { name: "Sócrates",           value: 172, detail: "1978–1984" },
      { name: "Flávio Minuano",     value: 170, detail: "1964–1969" },
      { name: "Paulo Pisaneschi",   value: 147, detail: "1954–1960" }
    ]
  },
  assists: {
    title: "Top 10 Assistentes",
    subtitle: "Assistências registradas na história do clube",
    unit: "assistências",
    icon: "🎯",
    items: [
      { name: "Marcelinho Carioca", value: 192, detail: "433 jogos · 1994–2001 · 2006" },
      { name: "Cláudio Christóvam", value: 191, detail: "1945–1957 (estimado)" },
      { name: "Servílio",           value: 118, detail: "1930–1948" },
      { name: "Teleco",             value: 110, detail: "1934–1944 (estimado)" },
      { name: "Jadson",             value:  98, detail: "2014–2022" },
      { name: "Rivellino",          value:  87, detail: "1965–1974" },
      { name: "Sócrates",           value:  82, detail: "1978–1984" },
      { name: "Fagner",             value:  72, detail: "2006–2007 · 2014–atual" },
      { name: "Willian",            value:  58, detail: "2011–2013" },
      { name: "Paulinho",           value:  54, detail: "2010–2013 · 2019–2022" }
    ]
  },
  games: {
    title: "Top 10 com Mais Jogos",
    subtitle: "Partidas disputadas com a camisa alvinegra",
    unit: "jogos",
    icon: "👕",
    items: [
      { name: "Wladimir",           value: 806, detail: "Lateral-esq · 1972–1985 · 1987" },
      { name: "Cássio",             value: 712, detail: "Goleiro · 2012–2023" },
      { name: "Luizinho",           value: 608, detail: "Meia · 1946–1960" },
      { name: "Ronaldo Giovanelli", value: 602, detail: "Goleiro · 1982–1995" },
      { name: "Zé Maria",           value: 598, detail: "Lateral-dir · 1970–1983" },
      { name: "Biro-Biro",          value: 589, detail: "Volante · 1978–1988" },
      { name: "Fagner",             value: 576, detail: "Lateral-dir · 2006–atual" },
      { name: "Vaguinho",           value: 551, detail: "Ponta-dir · 1971–1980" },
      { name: "Cláudio Christóvam", value: 551, detail: "Ponta · 1945–1957" },
      { name: "Olavo",              value: 508, detail: "Zagueiro · 1952–1961" }
    ]
  },
  saves: {
    title: "Top 10 Pegadores de Pênaltis",
    subtitle: "Cobranças defendidas na história do clube · Atualizado fev/2026",
    unit: "pênaltis",
    icon: "🧤",
    items: [
      { name: "Cássio",             value: 32, detail: "712 jogos · 2012–2023" },
      { name: "Ronaldo Giovanelli", value: 27, detail: "602 jogos · 1982–1995" },
      { name: "Hugo Souza",         value: 14, detail: "102 jogos · 2024–atual" },
      { name: "Gylmar",             value: 11, detail: "397 jogos · 1952–1963" },
      { name: "Dida",               value:  7, detail: "95 jogos · 1997–2000" },
      { name: "Cabeção",            value:  6, detail: "326 jogos · 1958–1970" },
      { name: "Fábio Costa",        value:  5, detail: "118 jogos · 2003–2009" },
      { name: "Júlio César",        value:  4, detail: "140 jogos · 2014–2016" },
      { name: "Carlos Miguel",      value:  3, detail: "2022–2024" },
      { name: "Marcos",             value:  2, detail: "Passagem 2001–2002" }
    ]
  }
};

// ─── STATS PANEL ─────────────────────────
function setupStatsPanel() {
  const fab        = document.getElementById('statsFab');
  const panel      = document.getElementById('statsPanel');
  const overlay    = document.getElementById('lineupOverlay');
  const closeBtn   = document.getElementById('statsClose');
  const tabs       = document.querySelectorAll('.stats-tab');
  const content    = document.getElementById('statsPanelContent');
  let activeTab    = 'scorers';

  function renderTab(tabKey) {
    const data = statsData[tabKey];
    const max  = data.items[0].value;

    content.innerHTML = `
      <div class="sp-header">
        <span class="sp-icon">${data.icon}</span>
        <div>
          <h3 class="sp-title">${data.title}</h3>
          <p class="sp-sub">${data.subtitle}</p>
        </div>
      </div>
      <div class="sp-list">
        ${data.items.map((item, i) => {
          const pct = Math.round((item.value / max) * 100);
          const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}º`;
          return `
          <div class="sp-item">
            <div class="sp-item__top">
              <span class="sp-rank">${medal}</span>
              <span class="sp-name">${item.name}</span>
              <span class="sp-value">${item.value} <small>${data.unit}</small></span>
            </div>
            <div class="sp-item__detail">${item.detail}</div>
            <div class="sp-bar-wrap">
              <div class="sp-bar" style="width:${pct}%"></div>
            </div>
          </div>`;
        }).join('')}
      </div>
    `;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.dataset.tab;
      renderTab(activeTab);
    });
  });

  renderTab(activeTab);

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
}

// ─── GLOBAL ESC HANDLER ──────────────────
function setupGlobalEscape() {
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const lineupPanel = document.getElementById('lineupPanel');
    const statsPanel  = document.getElementById('statsPanel');
    const overlay     = document.getElementById('lineupOverlay');
    if (lineupPanel.classList.contains('open')) {
      lineupPanel.classList.remove('open');
      overlay.classList.remove('open');
      lineupPanel.setAttribute('aria-hidden', true);
      document.body.style.overflow = '';
    } else if (statsPanel.classList.contains('open')) {
      statsPanel.classList.remove('open');
      overlay.classList.remove('open');
      statsPanel.setAttribute('aria-hidden', true);
      document.body.style.overflow = '';
    }
  });
}

// ─── FAB MENU TOGGLE ─────────────────────
function setupFabMenu() {
  const toggle  = document.getElementById('fabToggle');
  const menu    = document.getElementById('fabMenu');
  const options = document.getElementById('fabOptions');

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    options.setAttribute('aria-hidden', !isOpen);
  });

  // Fecha o menu ao clicar em qualquer opção
  document.querySelectorAll('.fab-option').forEach(btn => {
    btn.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });
}