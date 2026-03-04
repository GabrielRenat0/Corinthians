/**
 * @fileoverview Escalações históricas do Corinthians desde 1990.
 * As linhas (rows) vão de goleiro → ataque (índice 0 = GK).
 *
 * @typedef {Object} LineupEntry
 * @property {string}   title     - Título descritivo do time
 * @property {string}   coach     - Nome do técnico
 * @property {string}   formation - Formação tática (ex: "4-4-2")
 * @property {string}   context   - Contexto histórico
 * @property {string[][]} rows    - Linhas de jogadores [GK, DEF, MID, ..., ATK]
 * @property {string[]} bench     - Jogadores do banco
 */

export const lineupData = {
  1990: {
    title: "Campeão Brasileiro 1990",
    coach: "Técnico: Nelsinho Baptista",
    formation: "4-4-2",
    context: "O título que encerrou um jejum de 10 anos no Brasileirão.",
    rows: [
      ["Ronaldo Giovanelli"],
      ["Betinho", "Zé Maria", "Índio", "Gilson"],
      ["Tupãzinho", "Neto", "Amarildo", "Edu Marangon"],
      ["Viola", "Müller"]
    ],
    bench: ["Zé Carlos", "Mauro Silva", "Marcelinho", "Luisinho", "Rinaldo"]
  },
  1995: {
    title: "Copa do Brasil 1995",
    coach: "Técnico: Cuca",
    formation: "4-3-3",
    context: "Primeira Copa do Brasil da história do clube.",
    rows: [
      ["Ronaldo Giovanelli"],
      ["Cléber", "Zé Maria", "Índio", "Roberto Carlos"],
      ["Djalminha", "Neto", "Souza"],
      ["Marcelinho Carioca", "Viola", "Palhinha"]
    ],
    bench: ["Guilherme", "Betinho", "Rinaldo", "Luisinho", "Edu"]
  },
  1998: {
    title: "Campeão Brasileiro 1998",
    coach: "Técnico: Oswaldo de Oliveira",
    formation: "4-4-2",
    context: "Bicampeonato em sequência com Marcelinho Carioca em grande fase.",
    rows: [
      ["Dida"],
      ["Rogério", "Gamarra", "Antônio Carlos", "Silvinho"],
      ["Marcelinho Carioca", "Souza", "Rincón", "Dinei"],
      ["Edilson", "Lúcio Flávio"]
    ],
    bench: ["Guilherme", "Anderson Pico", "Rinaldo", "Paulo Sérgio", "Vampeta"]
  },
  1999: {
    title: "Tricampeão Brasileiro 1999",
    coach: "Técnico: Vanderlei Luxemburgo",
    formation: "4-3-3",
    context: "Tri consecutivo, com Vampeta e Edilson no auge.",
    rows: [
      ["Dida"],
      ["Rogério", "Gamarra", "Antônio Carlos", "Silvinho"],
      ["Vampeta", "Rincón", "Warley"],
      ["Marcelinho Carioca", "Edilson", "Luizão"]
    ],
    bench: ["Guilherme", "Anderson Pico", "Souza", "Paulo Sérgio", "Lúcio Flávio"]
  },
  2000: {
    title: "Campeão Mundial 2000",
    coach: "Técnico: Oswaldo de Oliveira",
    formation: "4-4-2",
    context: "Venceu o primeiro Mundial de Clubes da FIFA, derrotando o Manchester United.",
    rows: [
      ["Dida"],
      ["Rogério", "Gamarra", "Antônio Carlos", "Silvinho"],
      ["Vampeta", "Rincón", "Cocâo", "Warley"],
      ["Edilson", "Luizão"]
    ],
    bench: ["Guilherme", "Anderson Pico", "Dinei", "Paulo Sérgio", "Marcelinho"]
  },
  2002: {
    title: "Copa do Brasil 2002",
    coach: "Técnico: Paulo César Carpegiani",
    formation: "4-4-2",
    context: "Segunda Copa do Brasil com Tevita e Fabinho Capixaba em destaque.",
    rows: [
      ["Marcos"],
      ["Rogério", "Antônio Carlos", "Anderson Polga", "Fábio Luciano"],
      ["Capixaba", "Souza", "Tevita", "Ricardinho"],
      ["Deivid", "Gil"]
    ],
    bench: ["Guilherme", "Betão", "Renato", "Alessandro", "Lúcio Flávio"]
  },
  2005: {
    title: "Campeão Brasileiro 2005",
    coach: "Técnico: Tite",
    formation: "4-2-3-1",
    context: "Tite inicia sua era vitoriosa no clube, dominando o Brasileirão.",
    rows: [
      ["Fábio Costa"],
      ["Alessandro", "Betão", "Gustavo", "Fábio Luciano"],
      ["Souza", "Carlos Alberto"],
      ["Roger", "Tevita", "Ricardinho"],
      ["Carlos Tevez"]
    ],
    bench: ["Guilherme", "Anderson Polga", "Edu Dracena", "Wendell", "Gil"]
  },
  2009: {
    title: "Retorno à Série A — 2009",
    coach: "Técnico: Mano Menezes",
    formation: "4-2-3-1",
    context: "Ronaldo Fenômeno lidera o acesso épico de volta à elite.",
    rows: [
      ["Júlio César"],
      ["Alessandro", "Chicão", "Leandro Castán", "Fábio Santos"],
      ["Paulinho", "Souza"],
      ["Jorge Henrique", "Dentinho", "Liedson"],
      ["Ronaldo"]
    ],
    bench: ["Felipe", "Edu Dracena", "Émerson", "Elias", "Willian"]
  },
  2011: {
    title: "Campeão Brasileiro 2011",
    coach: "Técnico: Tite",
    formation: "4-2-3-1",
    context: "Hexa Brasileiro com Tite, Paulinho e Romarinho brilhando.",
    rows: [
      ["Cássio"],
      ["Alessandro", "Chicão", "Leandro Castán", "Fábio Santos"],
      ["Ralf", "Paulinho"],
      ["Jorge Henrique", "Willian", "Romarinho"],
      ["Liedson"]
    ],
    bench: ["Felipe", "Edu Dracena", "Élton", "Émerson", "Dentinho"]
  },
  2012: {
    title: "Campeão da Libertadores e Mundial 2012",
    coach: "Técnico: Tite",
    formation: "4-2-3-1",
    context: "O ano mais glorioso da história: Libertadores e Mundial no mesmo ano.",
    rows: [
      ["Cássio"],
      ["Alessandro", "Chicão", "Leandro Castán", "Fábio Santos"],
      ["Ralf", "Paulinho"],
      ["Jorge Henrique", "Willian", "Emerson Sheik"],
      ["Paolo Guerrero"]
    ],
    bench: ["Felipe", "Edu Dracena", "Élton", "Romarinho", "Danilo"]
  },
  2015: {
    title: "Campeão Brasileiro 2015",
    coach: "Técnico: Tite",
    formation: "4-1-4-1",
    context: "Heptacampeonato com Renato Augusto e Jadson em grande fase.",
    rows: [
      ["Cássio"],
      ["Fagner", "Gil", "Balbuena", "Fábio Santos"],
      ["Ralf"],
      ["Renato Augusto", "Elias", "Jadson", "Malcom"],
      ["Lucca"]
    ],
    bench: ["Walter", "Edu Dracena", "Léo Príncipe", "Guilherme Arana", "Bruno Henrique"]
  },
  2017: {
    title: "Campeão Brasileiro 2017",
    coach: "Técnico: Fábio Carille",
    formation: "4-1-4-1",
    context: "Octacampeonato com Jadson e Romero brilhando sob o comando de Carille.",
    rows: [
      ["Cássio"],
      ["Fagner", "Balbuena", "Pablo", "Guilherme Arana"],
      ["Gabriel"],
      ["Camacho", "Rodriguinho", "Jadson", "Clayson"],
      ["Jô"]
    ],
    bench: ["Walter", "Léo Príncipe", "Maycon", "Romero", "Marlone"]
  },
  2023: {
    title: "Geração 2023",
    coach: "Técnico: Mano Menezes",
    formation: "4-2-3-1",
    context: "Jovens talentos como Yuri Alberto e Mateus Vital assumem protagonismo.",
    rows: [
      ["Cássio"],
      ["Fagner", "Gil", "Murillo", "Fábio Santos"],
      ["Fausto Vera", "Renato Augusto"],
      ["Giuliano", "Mateus Vital", "Romero"],
      ["Yuri Alberto"]
    ],
    bench: ["Carlos Miguel", "Rafael Ramos", "Adson", "Du Queiroz", "Wesley"]
  },
  2025: {
    title: "Tetracampeão Copa do Brasil 2025",
    coach: "Técnico: Ramón Díaz / Dorival Júnior",
    formation: "4-4-2",
    context: "Venceu o Vasco por 2 a 1 no Maracanã. Yuri Alberto e Memphis marcaram.",
    rows: [
      ["Hugo Souza"],
      ["Matheuzinho", "André Ramalho", "Gustavo Henrique", "Matheus Bidu"],
      ["José Martínez", "Raniele", "Maycon", "Breno Bidon"],
      ["Memphis Depay", "Yuri Alberto"]
    ],
    bench: ["Matheus Donelli", "Fagner", "Cacá", "Hugo", "Carrillo", "Rodrigo Garro", "Pedro Raul"]
  }
};
