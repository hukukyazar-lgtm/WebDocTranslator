export interface WordList {
  1: string[];
  2: string[];
  3: string[];
}

export interface WordLists {
  [category: string]: WordList;
}

export const wordLists: WordLists = {
  Hayvanlar: {
    1: [], // Kolay - 3-4 harf  
    2: [], // Orta - 4-5 harf
    3: []  // Zor - 5+ harf
  },
  Yiyecek: {
    1: [], // Kolay - 3-4 harf
    2: [], // Orta - 4-5 harf
    3: []  // Zor - 5+ harf
  },
  Bilim: {
    1: [], // Kolay - 3-4 harf
    2: [], // Orta - 4-5 harf
    3: []  // Zor - 5+ harf
  },
  Ülkeler: {
    1: [], // Kolay - 3-4 harf
    2: [], // Orta - 4-5 harf
    3: []  // Zor - 5+ harf
  },
  Meslekler: {
    1: [], // Kolay - 3-4 harf
    2: [], // Orta - 4-5 harf
    3: []  // Zor - 5+ harf
  },
  Şehirler: {
    1: [], // Kolay - 3-4 harf
    2: [], // Orta - 4-5 harf
    3: []  // Zor - 5+ harf
  },
  Markalar: {
    1: [], // Kolay - 3-4 harf
    2: [], // Orta - 4-5 harf
    3: []  // Zor - 5+ harf
  },
  "Spor Dalları": {
    1: [], // Kolay - 3-4 harf
    2: [], // Orta - 4-5 harf
    3: []  // Zor - 5+ harf
  },
  Eşyalar: {
    1: [], // Kolay - 3-4 harf
    2: [], // Orta - 4-5 harf
    3: []  // Zor - 5+ harf
  },
  "Film ve Dizi": {
    1: [], // Kolay - 3-4 harf
    2: [], // Orta - 4-5 harf
    3: []  // Zor - 5+ harf
  }
};

export function getWordByDifficulty(category: string, difficulty: number): string[] {
  const categoryWords = wordLists[category];
  if (!categoryWords) return [];
  return categoryWords[difficulty as keyof WordList] || [];
}