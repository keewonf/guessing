export type Challenge = {
  id: number;
  word: string;
  tips: string[];
};

export const WORDS: Challenge[] = [
  {
    id: 1,
    word: "Avenged",
    tips: ["Banda de Heavy metal", "Banda favorita da Larissa", "Sevenfold"],
  },
  {
    id: 2,
    word: "Ornitorrinco",
    tips: [
      "Sou um mamífero semiaquático nativo da Austrália.",
      "Sou uma raridade na natureza: um mamífero que bota ovos.",
      "Pareço uma mistura: tenho cauda de castor e bico de pato.",
    ],
  },
];
