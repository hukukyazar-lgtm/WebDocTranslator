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
    1: ["KEDİ", "KÖPEK", "AT", "KUŞ", "BALIK", "İNEK", "KOYUN", "TAVUK", "FARE", "ARI", "HOROZ", "ÖRDEK", "KEÇİ", "EŞEK", "DOMUZ", "TAVŞAN", "SİNCAP", "KELEBEK", "KARINCA", "SİNEK", "KURBAĞA", "ÖRÜMCEK", "CİVCİV", "HİNDİ", "KAZ"], // Kolay - 3-4 harf  
    2: ["ASLAN", "KAPLAN", "FİL", "AYI", "KURT", "YILAN", "MAYMUN", "KARTAL", "ZEBRA", "TİLKİ", "GEYİK", "CEYLAN", "FOK", "YUNUS", "BALİNA", "KİRPİ", "DEVE", "BAYKUŞ", "PAPAĞAN", "YARASA", "ÇITA", "GORİL", "PANTER", "KUNDUZ", "KÖSTEBEK"], // Orta - 4-5 harf
    3: ["ZÜRAFA", "TİMSAH", "KANGURU", "GERGEDAN", "PENGUEN", "BUKELEMUN", "LEOPAR", "SU AYGIRI", "AKBABA", "ORANGUTAN", "İGUANA", "KOALA", "PANDA", "FLAMİNGO", "PELİKAN", "VAŞAK", "ANTİLOP", "HIPOPOTAM", "TAPİR", "OKAPİ", "VATOZ", "MÜREKKEP BALIĞI", "KOMODO EJDERİ", "KARINCANCI", "DENİZATI"]  // Zor - 5+ harf
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