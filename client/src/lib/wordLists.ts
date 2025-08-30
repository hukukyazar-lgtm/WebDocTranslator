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
    1: ["KEDİ", "KÖPEK", "AT", "İNEK", "KOYUN"],
    2: ["FARE", "BALIK", "KUŞU", "KELEBEK", "KARINCA", "YILAN", "ASLAN", "KAPLAN", "AYIQ"],
    3: ["TAVŞAN", "SINCAP", "KEÇI", "PENGUEN", "KANGURU", "ZÜRAFA", "MAYMUN", "FİL"],
    4: ["GERGEDAN", "ZEBRA", "DEVE", "BALINA", "YUNUS", "TİMSAH", "KÖPEKBALIQ", "KARTAL", "PAPAĞAN"],
    5: ["HIPOPOTAM", "ORANGUTAN", "ŞEMPANZE", "GORILLA", "ANTİLOP", "JAGUAR", "ÇITA", "KROKODIL", "IGUANA"]
  },
  Yiyecek: {
    1: ["ELMA", "EKMEK", "ÇİLEK", "KEK", "SU"],
    2: ["SÜT", "YUMURTA", "PEYNIR", "ET", "TAVUK", "BALIK", "PİRİNÇ"],
    3: ["MAKARNA", "SALATA", "DOMATES", "SOĞAN", "PATATES", "HAVUÇ", "BİBER", "KARPUZ"],
    4: ["DONDURMA", "PİZZA", "HAMBURGER", "KÖFTE", "PİLAV", "BÖREK", "MANTI", "DOLMA", "KEBAP"],
    5: ["SALATALIK", "PATLICAN", "BROKOLI", "KARNABAHAR", "ISPANAK", "ROKA", "SEMIZOTU", "MAYDANOZ"]
  },
  Bilim: {
    1: ["ATOM", "GÜNEŞ", "IŞIK", "ENERJİ", "SU"],
    2: ["HAVA", "TOPRAK", "ATEŞ", "YAĞMuR", "KAR", "BUZ", "SIS"],
    3: ["BULUT", "YILDIZ", "AY", "DÜNYA", "MARS", "VENUS", "GALAKSİ", "MOLEKÜL"],
    4: ["GEZEGEN", "ELEKTRON", "PROTON", "NÖTRON", "ELEMENT", "KARBON", "OKSİJEN", "HİDROJEN"],
    5: ["TELESKOP", "GRAVİTASYON", "FOTOSENTEZ", "MİTOKONDRİ", "RİBOZOM", "KROMOZOM", "DNA", "RNA"]
  },
  Ülkeler: {
    1: ["İTALYA", "MISIR", "KANADA", "İRAN", "RUSYA"],
    2: ["ÇİN", "JAPONYA", "HİNDİSTAN", "YUNANISTAN", "BULGARISTAN", "SURİYE", "LÜBNAN"],
    3: ["TÜRKİYE", "ALMANYA", "FRANSA", "İNGİLTERE", "İSPANYA", "PORTEKİZ", "HOLLANDA"],
    4: ["BREZİLYA", "AVUSTURYA", "POLONYA", "ÇEKYA", "MACARISTAN", "ROMANYA", "UKRAİNA"],
    5: ["ARJANTİN", "ENDONEZYA", "AVUSTRALYA", "YENİ ZELANDA", "GÜNEY AFRİKA", "VENEZuELA"]
  },
  Meslekler: {
    1: ["DOKTOR", "HEMŞİRE", "ÖĞrETMEN", "POLİS", "AŞÇI"],
    2: ["AVUKAT", "HAKİM", "PİLOT", "ASKER", "İTFAİYECİ", "KASAP", "BERBER"],
    3: ["TAMIRCI", "ŞOFÖR", "KAPICI", "MÜHENDİS", "TEKNISYEN", "LABORANT", "ECZACI"],
    4: ["DİŞÇİ", "VETERINER", "PSİKOLOG", "JOURNALİST", "EDİTÖR", "FOTOĞRAFÇI", "MÜZİSYEN"],
    5: ["ASTRONOT", "ARKEOLOG", "MİMAR", "JEOLOG", "METEOROLOJİST", "ANTROPOLOJİST", "PSİKİATRİST"]
  },
  Şehirler: {
    1: ["ANKARA", "İZMİR", "BURSA", "KONYA", "ADANA"],
    2: ["GAZİANTEP", "MERSİN", "ANTALYA", "DİYARBAKIR", "SAMSUN", "MALATYA"],
    3: ["İSTANBUL", "ESKİŞEHİR", "DENİZLİ", "MANİSA", "AYDIN", "MUĞLA", "AMASYA"],
    4: ["SAKARYA", "ZONGULDAK", "KASTAMONU", "ÇORUM", "YOZGAT", "NEVŞEHİR", "KIRŞEHİR"],
    5: ["KAHRAMANmaraŞ", "ŞANLIURFA", "OSMANİYE", "HATAY", "ADIYAMAN", "BATMAN"]
  },
  Markalar: {
    1: ["APPLE", "NIKE", "FORD", "SONY", "LG"],
    2: ["GOOGLE", "ADIDAS", "COCA COLA", "PEPSI", "SAMSUNG", "INTEL", "AMD"],
    3: ["MERCEDES", "BMW", "AUDI", "PUMA", "ZARA", "H&M", "IKEA", "MICROSOFT"],
    4: ["AMAZON", "NETFLIX", "SPOTIFY", "YOUTUBE", "FACEBOOK", "INSTAGRAM", "TESLA"],
    5: ["ARÇELİK", "VESTEL", "BEKO", "THY", "PEGASUS", "GARANTI", "AKBANK"]
  },
  "Spor Dalları": {
    1: ["FUTBOL", "TENİS", "YÜZME", "KOŞU", "BOKS"],
    2: ["GOLF", "YÜRÜYÜŞ", "BİSİKLET", "KÜREK", "GÜREŞ", "ATLETİZM"],
    3: ["JİMNASTİK", "VOLEYBOL", "BASKETBOL", "HENTBOL", "BADMINTON", "PİNG PONG"],
    4: ["BİNİCİLİK", "OKÇULUK", "YELKEN", "SU KAYAĞI", "SQUASH", "RAGBI"],
    5: ["ESKRİM", "CİRİT", "MODERN PENTATLON", "DEKaTLON", "TRİATLON", "IRONMAN"]
  },
  Eşyalar: {
    1: ["MASA", "SAAT", "ÇANTA", "ŞAPKA", "ELDIVEN"],
    2: ["GÖZLÜK", "AYAKKABI", "GÖMLEK", "PANTOLON", "CEKET", "ÇORAP"],
    3: ["SANDALYE", "BİLGİSAYAR", "TELEFON", "TELEVİZYON", "RADYO", "TABLET"],
    4: ["LAPTOP", "YAZICI", "OYUN KONSOLU", "FOTOĞRAF MAKİNESİ", "KULAKULIK", "MİKROFON"],
    5: ["BUZDOLABI", "ÇAMAŞIR MAKİNESİ", "BULAŞIK MAKİNESİ", "MIKRODALGA", "KLİMA"]
  },
  Filmler: {
    1: ["AVATAR", "TITANIC", "ŞREK", "NEMO", "FROZEN"],
    2: ["CARS", "MOANA", "COCO", "UP", "TOY STORY", "MONSTERS"],
    3: ["INCEPTION", "THE MATRIX", "GLADIATOR", "FORREST GUMP", "DARK KNIGHT"],
    4: ["INTERSTELLAR", "PULP FICTION", "THE GODFATHER", "FIGHT CLUB", "GOODFELLAS"],
    5: ["OYUNCAK HİKAYESİ", "KARAYİP KORSANLARI", "YÜZÜKLERİN EFENDİSİ", "ESARETİN BEDELİ"]
  }
};

export const getWordByDifficulty = (category: string, difficulty: number): string => {
  const categoryWords = wordLists[category];
  if (!categoryWords) return "";
  
  const wordPool = (categoryWords as any)[difficulty];
  if (!wordPool || wordPool.length === 0) return "";
  
  return wordPool[Math.floor(Math.random() * wordPool.length)];
};