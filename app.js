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
    img: "https://picsum.photos/id/1076/1200/600",
    year: "2000",
    title: "Campeão Mundial",
    caption: "No Maracanã lotado, o Corinthians vence o Manchester United e conquista o primeiro Mundial de Clubes da FIFA."
  },
  {
    img: "https://picsum.photos/id/1067/1200/600",
    year: "2012",
    title: "Libertadores da América",
    caption: "Paolo Guerrero e Emerson Sheik são os heróis da conquista inédita da Libertadores contra o Boca Juniors."
  },
  {
    img: "https://picsum.photos/id/1040/1200/600",
    year: "2012",
    title: "Bi-campeão Mundial",
    caption: "Em Yokohama, Cássio defende o pênalti e o Corinthians derrota o Chelsea para ser bicampeão do mundo."
  },
  {
    img: "https://picsum.photos/id/1015/1200/600",
    year: "1977",
    title: "Democracia Corinthiana",
    caption: "Sócrates, Wladimir e Casagrande lideram o movimento que revolucionou o futebol brasileiro e o mundo do esporte."
  },
  {
    img: "https://picsum.photos/id/1031/1200/600",
    year: "2014",
    title: "Arena Corinthians",
    caption: "A Neo Química Arena abre suas portas e sedia a abertura da Copa do Mundo. O novo lar da Fiel Torcida."
  },
  {
    img: "https://picsum.photos/id/1018/1200/600",
    year: "1990",
    title: "Título Brasileiro",
    caption: "Após anos de espera, o Corinthians conquista o Campeonato Brasileiro e o povo corinthiano vai às ruas celebrar."
  },
  {
    img: "https://picsum.photos/id/1057/1200/600",
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
});