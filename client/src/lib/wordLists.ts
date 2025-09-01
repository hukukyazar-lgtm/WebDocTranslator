export interface WordList {
  1: string[];
  2: string[];
  3: string[];
  4: string[];
  5: string[];
}

export interface WordLists {
  [category: string]: WordList;
}

export const wordLists: WordLists = {
  Hayvanlar: {
    1: ["KEDİ", "AT", "IT", "SU", "EV"], // Çok kolay - 2-3 harf
    2: ["ASLAN", "KAPLAN", "ZEBRA", "PANDA", "ÇAKAL"], // Kolay - 4-5 harf
    3: ["MAYMUN", "KARTAL", "TAVUK", "BALINA", "YUNUS"], // Orta - 5-6 harf
    4: ["JAGUAR", "OKAPI", "ÇITA", "LEMUR", "TAPIR"], // Zor - 5-6 harf
    5: ["IGUANALAR", "RENKGARENK", "KAMELEONLAR", "FLAMINGOLAR", "TIMSAHLAR"] // Çok zor - 8+ harf
  },
  Yiyecek: {
    1: ["SU", "ET", "AŞ", "YAG"], // Çok kolay - 2-3 harf
    2: ["EKMEK", "ÇORBA", "SALAD", "KÖFTE", "KEBAB"], // Kolay - 4-5 harf
    3: ["BÖREK", "MANTİ", "DOLMA", "PASTA", "PIZZA"], // Orta - 5-6 harf
    4: ["SUSHİ", "RİSOTO", "LASANYA", "MAKARNA", "HAMBURGER"], // Zor - 6-9 harf
    5: ["CAPPUCCINO", "TIRAMISU", "BRUSCHETTA", "PROSCIUTTO", "BRUSCHETTA"] // Çok zor - 8+ harf
  },
  Bilim: {
    1: ["SU", "AŞ", "IK", "GÖK"], // Çok kolay - 2-3 harf
    2: ["ATOM", "GÜNEŞ", "YILDIZ", "LASER", "RADAR"], // Kolay - 4-5 harf
    3: ["ÇEKİM", "ENERJİ", "DALGA", "FOTON", "GAMMA"], // Orta - 5-6 harf
    4: ["KUANTUM", "PARÇACIK", "NÖTRON", "ELEKTRON", "PROTON"], // Zor - 6-8 harf
    5: ["BİYOTEKNOLOJİ", "NANOTEKNOLOJİ", "ASTROFIZIK", "TERMODINAMIK", "ELEKTROMAGNETİK"] // Çok zor - 9+ harf
  },
  Ülkeler: {
    1: ["TR", "US", "UK", "DE"], // Çok kolay - 2-3 harf
    2: ["TÜRKİYE", "İTALYA", "FRANSA", "JAPONYA", "ÇİN"], // Kolay - 4-7 harf
    3: ["ALMANYA", "İNGİLTERE", "RUSYA", "HİNDİSTAN", "YUNANISTAN"], // Orta - 5-10 harf
    4: ["BREZİLYA", "AVUSTRALYA", "ARJANTİN", "ENDONEZYA", "GÜNEY AFRIKA"], // Zor - 8-12 harf
    5: ["LÜKSEMBURG", "LİHTENŞTAYN", "SAN MARİNO", "VATİKAN", "MONTENEGRO"] // Çok zor - 8+ harf
  },
  Meslekler: {
    1: ["İŞ", "AŞ", "DIŞ"], // Çok kolay - 2-3 harf
    2: ["DOKTOR", "HEMŞİRE", "POLİS", "AŞÇI", "ÇİFTÇİ"], // Kolay - 4-7 harf
    3: ["AVUKAT", "HAKİM", "PİLOT", "ASKER", "İTFAİYECİ"], // Orta - 5-9 harf
    4: ["MİMAR", "MÜHENDİS", "ECZACI", "DİŞÇİ", "VETERİNER"], // Zor - 5-9 harf
    5: ["PSİKİYATRİST", "NEUROLOJİST", "DERMATOLOJİST", "KARDİYOLOJİST", "GASTROENTEROLOJİST"] // Çok zor - 10+ harf
  },
  Şehirler: {
    1: ["VAN", "MUŞ", "BİTLİS"], // Çok kolay - 3-5 harf
    2: ["ANKARA", "İZMİR", "BURSA", "KONYA", "ADANA"], // Kolay - 4-6 harf
    3: ["GAZİANTEP", "MERSİN", "ANTALYA", "DİYARBAKIR", "SAMSUN"], // Orta - 6-10 harf
    4: ["İSTANBUL", "ESKİŞEHİR", "DENİZLİ", "MANİSA", "AYDIN"], // Zor - 5-9 harf
    5: ["KAHRAMANMARAŞ", "ŞANLIURFA", "OSMANİYE", "HATAY", "AFYONKARAHISAR"] // Çok zor - 8+ harf
  },
  Markalar: {
    1: ["BMW", "KIA", "LG"], // Çok kolay - 2-3 harf
    2: ["APPLE", "NIKE", "FORD", "SONY", "SAMSUNG"], // Kolay - 4-7 harf
    3: ["GOOGLE", "ADIDAS", "MERCEDES", "PUMA", "ZARA"], // Orta - 4-8 harf
    4: ["AMAZON", "NETFLIX", "SPOTIFY", "YOUTUBE", "FACEBOOK"], // Zor - 6-8 harf
    5: ["LAMBORGHINI", "ROLLS-ROYCE", "MASERATI", "BULGARI", "PATEK PHILIPPE"] // Çok zor - 8+ harf
  },
  "Spor Dalları": {
    1: ["SUK", "BOK", "GYM"], // Çok kolay - 2-3 harf
    2: ["FUTBOL", "TENİS", "YÜZME", "KOŞU", "BOKS"], // Kolay - 4-6 harf
    3: ["GOLF", "YÜRÜYÜŞ", "BİSİKLET", "KÜREK", "GÜREŞ"], // Orta - 4-8 harf
    4: ["JİMNASTİK", "VOLEYBOL", "BASKETBOL", "HENTBOL", "BADMİNTON"], // Zor - 7-10 harf
    5: ["ESKRİM", "MODERN PENTATLON", "DEKATLON", "TRİATLON", "ORYANTIRING"] // Çok zor - 7+ harf
  },
  Eşyalar: {
    1: ["EV", "AT", "OT"], // Çok kolay - 2-3 harf
    2: ["MASA", "SAAT", "ÇANTA", "ŞAPKA", "ELDİVEN"], // Kolay - 4-7 harf
    3: ["GÖZLÜK", "AYAKKABI", "GÖMLEK", "PANTOLON", "CEKET"], // Orta - 5-8 harf
    4: ["SANDALET", "BİLGİSAYAR", "TELEFON", "TELEVİZYON", "RADYO"], // Zor - 5-10 harf
    5: ["LAPTOP", "YAZICI", "OYUN KONSOLU", "FOTOĞRAF MAKİNESİ", "KULAKLIGI"] // Çok zor - 6+ harf
  },
  Filmler: {
    1: ["UP", "IT", "E.T."], // Çok kolay - 2-3 harf
    2: ["AVATAR", "TİTANİK", "ŞREK", "NEMO", "FROZEN"], // Kolay - 4-7 harf
    3: ["CARS", "MOANA", "COCO", "TOYS", "MONSTERS"], // Orta - 4-8 harf
    4: ["İNCEPTİON", "MATRİX", "GLADİATÖR", "FORREST GUMP", "DARK KNİGHT"], // Zor - 6-12 harf
    5: ["İNTERSTELLAR", "PULP FİCTİON", "GODFATHER", "FİGHT CLUB", "GOODFELLAS"] // Çok zor - 8+ harf
  },
  Karışık: {
    1: ["EV", "AT", "SU", "IK"], // Çok kolay - 2-3 harf
    2: ["KEDİ", "KÖPEK", "ATLAR", "İNEK", "ELMA"], // Kolay - 4-5 harf
    3: ["FARE", "BALIK", "KUŞU", "SÜT", "YUMURTA"], // Orta - 4-7 harf
    4: ["TAVŞAN", "SİNCAP", "KEÇİ", "MAKARNA", "SALATA"], // Zor - 5-8 harf
    5: ["HİPOPOTAM", "ORANGUTAN", "ŞEMPANZELER", "SALATALAR", "PATLICANLAR"] // Çok zor - 8+ harf
  }
};

export const getWordByDifficulty = (category: string, difficulty: number): string => {
  const categoryWords = wordLists[category];
  if (!categoryWords) return "";
  
  const wordPool = (categoryWords as any)[difficulty];
  if (!wordPool || wordPool.length === 0) return "";
  
  return wordPool[Math.floor(Math.random() * wordPool.length)];
};