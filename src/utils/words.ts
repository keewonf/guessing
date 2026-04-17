export type Challenge = {
  id: number;
  word: string;
  tips: string[];
  trivia: string;
};

export const WORDS: Challenge[] = [
  {
    id: 1,
    word: "Avenged",
    tips: ["Banda de Heavy metal", "Banda favorita da Larissa", "Sevenfold"],
    trivia:
      "Somos a banda que provou que metalheads também podem ser cinéfilos e filósofos!",
  },
  {
    id: 2,
    word: "Ornitorrinco",
    tips: [
      "Sou um mamífero semiaquático nativo da Austrália.",
      "Sou uma raridade na natureza: um mamífero que bota ovos.",
      "Pareço uma mistura: tenho cauda de castor e bico de pato.",
    ],
    trivia:
      "Meu bico detecta campos elétricos. Sou basicamente um animal com GPS!",
  },
  {
    id: 3,
    word: "Hamburguer",
    tips: [
      "Sou um dos lanches de consumo rápido mais populares do mundo inteiro.",
      "Sou montado em camadas e meu acompanhamento mais clássico são as batatas fritas.",
      "Sou um sanduíche feito tradicionalmente com pão, carne redonda, queijo e salada.",
    ],
    trivia: "O Tato vai me mandar um hoje!",
  },
];
