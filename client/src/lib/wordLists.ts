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
    1: ["KEDİS", "KÖPEK", "KUŞKU", "BALIK", "KOYUN"],
    2: ["ASLAN", "TIGER", "ZEBRA", "ÇİTAH", "PANDA"],
    3: ["YUNUS", "KARTAL", "ŞAHİN", "TAVUK", "ÇAKAL"],
    4: ["KOALA", "LEMUR", "TAPIR", "OKAPI", "QUOLL"],
    5: ["XERUS", "VARAN", "IGANA", "KANGO", "HIPPO"]
  },
  Yiyecek: {
    1: ["ELMAZ", "EKMEK", "SÜTTE", "YUMTA", "PASTA"],
    2: ["ÇORBA", "SALAT", "KÖFTE", "PİLAV", "KEBAP"],
    3: ["BÖREK", "MANTİ", "DOLMA", "PİZZA", "MAKRO"],
    4: ["SUSHİ", "RİSOT", "CAJUN", "TAPAS", "MANTI"],
    5: ["FONDU", "SAUTE", "FLABE", "BRULE", "QUİCH"]
  },
  Bilim: {
    1: ["ATOMU", "GÜNEŞ", "IŞIKS", "HAVAT", "TOPRA"],
    2: ["LASER", "RADAR", "VİRÜS", "BAKTR", "MANTR"],
    3: ["ÇEKİM", "ENERJ", "DALGA", "FOTON", "GAMMA"],
    4: ["QUARK", "BOZON", "PLAZM", "NÖTRO", "HİGGS"],
    5: ["MUONS", "TAUON", "GLUON", "KAONS", "MESON"]
  },
  Ülkeler: {
    1: ["TÜRKİ", "İTALY", "İRANS", "ÇİNLİ", "JAPON"],
    2: ["ALMAN", "FRANS", "RUSİA", "HİNDİ", "YUNAN"],
    3: ["BREZİ", "AVUST", "POLİS", "ÇEKİS", "MACAR"],
    4: ["ARJAN", "ENDON", "KOREY", "VİETN", "TAYLA"],
    5: ["KONGO", "GHANA", "BENİN", "TOGOS", "GABON"]
  },
  Meslekler: {
    1: ["DOKTR", "HEMŞİ", "POLİS", "AŞÇIS", "ÇİFTÇ"],
    2: ["AVUKA", "HAKİM", "PİLOT", "ASKER", "İTFAİ"],
    3: ["TAMİR", "ŞÖFÖR", "KAPI", "MÜHEN", "ECZAC"],
    4: ["DİŞÇİ", "VETERİ", "PSİKO", "GAZET", "EDİTÖ"],
    5: ["ASTRO", "ARKEO", "MİMAR", "JEOLO", "METEO"]
  },
  Şehirler: {
    1: ["ANKAR", "İZMİR", "BURSA", "KONYA", "ADANA"],
    2: ["GAZİA", "MERSİ", "ANTAL", "DİYAR", "SAMSU"],
    3: ["İSTAN", "ESKİŞ", "DENİZ", "MANİS", "AYDIN"],
    4: ["SAKAR", "ZONGU", "KASTA", "ÇORUM", "YOZGA"],
    5: ["KAHRA", "ŞANLI", "OSMAN", "HATAY", "ADİYA"]
  },
  Markalar: {
    1: ["APPLE", "NİKES", "FORDS", "SONYS", "HUAWE"],
    2: ["GOOGL", "ADİDA", "COCAC", "PEPSİ", "SAMSU"],
    3: ["MERCE", "BMWXX", "AUDİİ", "PUMAA", "ZARAR"],
    4: ["AMAZO", "NETFL", "SPOTİ", "YOUTU", "FACEB"],
    5: ["ARÇEL", "VESTE", "BEKOO", "THYXX", "PEGAS"]
  },
  "Spor Dalları": {
    1: ["FUTBO", "TENİS", "YÜZME", "KOŞUU", "BOKSS"],
    2: ["GOLFF", "YÜRÜY", "BİSİK", "KÜREK", "GÜREŞ"],
    3: ["JİMNA", "VOLEY", "BASKE", "HENTB", "BADMİ"],
    4: ["BİNİC", "OKÇUL", "YELKE", "SUKAY", "SQUAS"],
    5: ["ESKRİ", "CİRİT", "MODER", "DEKAT", "TRİAT"]
  },
  Eşyalar: {
    1: ["MASAA", "SAATS", "ÇANTA", "ŞAPKA", "ELDİV"],
    2: ["GÖZLÜ", "AYAKK", "GÖMLE", "PANTO", "CEKET"],
    3: ["SANDA", "BİLGİ", "TELEF", "TELEV", "RADYO"],
    4: ["LAPTO", "YAZIC", "OYUNK", "FOTOG", "KULAK"],
    5: ["BUZDO", "ÇAMAŞ", "BULAŞ", "MİKRO", "KLİMA"]
  },
  Filmler: {
    1: ["AVATA", "TİTAN", "ŞREKK", "NEMOO", "FROZE"],
    2: ["CARSS", "MOANA", "COCOO", "UPXXX", "TOYSS"],
    3: ["İNCEP", "MATRİ", "GLADİ", "FORRE", "DARKK"],
    4: ["İNTER", "PULPF", "GODFA", "FİGHT", "GOODF"],
    5: ["OYUNC", "KARAY", "YÜZÜK", "ESARE", "SİNEK"]
  },
  Karışık: {
    1: ["KEDİS", "KÖPEK", "ATLAR", "İNEKK", "ELMAA"],
    2: ["FAREE", "BALIK", "KUŞUU", "SÜTTE", "YUMUR"],
    3: ["TAVŞA", "SİNCA", "KEÇİL", "MAKAR", "SALAT"],
    4: ["GERGE", "ZEBRA", "DEVEE", "DONDU", "PİZZA"],
    5: ["HİPOP", "ORANG", "ŞEMPA", "SALAT", "PATLİ"]
  }
};

export const getWordByDifficulty = (category: string, difficulty: number): string => {
  const categoryWords = wordLists[category];
  if (!categoryWords) return "";
  
  const wordPool = (categoryWords as any)[difficulty];
  if (!wordPool || wordPool.length === 0) return "";
  
  return wordPool[Math.floor(Math.random() * wordPool.length)];
};