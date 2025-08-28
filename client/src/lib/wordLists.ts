export interface WordList {
  easy: string[];
  medium: string[];
  hard: string[];
}

export interface WordLists {
  [category: string]: WordList;
}

export const wordLists: WordLists = {
  Hayvanlar: {
    easy: ["ASLAN", "KEDİ", "YILAN", "İNEK", "KOYUN"],
    medium: ["PENGUEN", "KANGURU", "ZÜRAFA", "MAYMUN"],
    hard: ["KAPLUMBAĞA", "TAVUSKUŞU", "TİMSAH"]
  },
  Yiyecek: {
    easy: ["ELMA", "EKMEK", "ÇİLEK", "PİZZA", "KEK"],
    medium: ["KARPUZ", "MAKARNA", "SALATA", "DONDURMA"],
    hard: ["ÇİKOLATA", "SALATALIK", "PATLICAN"]
  },
  Bilim: {
    easy: ["ATOM", "GÜNEŞ", "IŞIK", "ENERJİ"],
    medium: ["GALAKSİ", "MOLEKÜL", "GEZEGEN"],
    hard: ["TELESKOP", "GRAVİTASYON", "FOTOSENTEZ"]
  },
  Ülkeler: {
    easy: ["İTALYA", "MISIR", "KANADA", "İRAN"],
    medium: ["JAPONYA", "BREZİLYA", "TÜRKİYE"],
    hard: ["ARJANTİN", "ENDONEZYA", "AVUSTRALYA"]
  },
  Meslekler: {
    easy: ["AVUKAT", "HAKİM", "AŞÇI", "PİLOT"],
    medium: ["ÖĞRETMEN", "MÜHENDİS", "İTFAİYECİ"],
    hard: ["ASTRONOT", "ARKEOLOG", "MİMAR"]
  },
  Şehirler: {
    easy: ["RİZE", "VAN", "KARS", "SİVAS"],
    medium: ["ANKARA", "İZMİR", "ANTALYA", "TRABZEN"],
    hard: ["İSTANBUL", "DİYARBAKIR", "ERZURUM"]
  },
  Markalar: {
    easy: ["GOOGLE", "APPLE", "FORD", "LCW"],
    medium: ["MERCEDES", "SAMSUNG", "ADIDAS"],
    hard: ["ARÇELİK", "THY", "VESTEL"]
  },
  "Spor Dalları": {
    easy: ["FUTBOL", "TENİS", "YÜZME", "GOLF"],
    medium: ["BASKETBOL", "VOLEYBOL", "HENTBOL"],
    hard: ["BİNİCİLİK", "ESKRİM", "CİRİT"]
  },
  Eşyalar: {
    easy: ["MASA", "SAAT", "GÖZLÜK"],
    medium: ["SANDALYE", "BİLGİSAYAR", "TELEFON"],
    hard: ["TELEVİZYON", "BUZDOLABI", "ÇAMAŞIR MAKİNESİ"]
  },
  Filmler: {
    easy: ["AVATAR", "TITANIC", "INCEPTION"],
    medium: ["OYUNCAK HİKAYESİ", "KARAYİP KORSANLARI"],
    hard: ["YÜZÜKLERİN EFENDİSİ", "ESARETİN BEDELİ"]
  }
};

export const getWordByDifficulty = (category: string, difficulty: number): string => {
  const categoryWords = wordLists[category];
  if (!categoryWords) return "";
  
  let wordPool: string[];
  if (difficulty <= 2) {
    wordPool = categoryWords.easy;
  } else if (difficulty === 3) {
    wordPool = categoryWords.medium;
  } else {
    wordPool = categoryWords.hard;
  }
  
  return wordPool[Math.floor(Math.random() * wordPool.length)];
};
