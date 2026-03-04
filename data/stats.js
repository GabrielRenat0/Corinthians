/**
 * @fileoverview Estatísticas históricas dos jogadores do Corinthians.
 * Atualizado até fevereiro de 2026.
 *
 * @typedef {Object} StatItem
 * @property {string} name   - Nome do jogador
 * @property {number} value  - Valor da estatística
 * @property {string} detail - Período/contexto
 *
 * @typedef {Object} StatCategory
 * @property {string}     title    - Título do ranking
 * @property {string}     subtitle - Subtítulo descritivo
 * @property {string}     unit     - Unidade (gols, jogos, etc.)
 * @property {string}     icon     - Emoji representativo
 * @property {StatItem[]} items    - Lista dos top 10
 */

export const statsData = {
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
    subtitle: "Cobranças defendidas · Atualizado fev/2026",
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
