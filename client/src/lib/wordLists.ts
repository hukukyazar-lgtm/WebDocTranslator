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
    easy: ["KEDİ", "KÖPEK", "AT", "İNEK", "KOYUN", "KEDI", "FARE", "BALIK", "KUŞU", "KELEBEK", "KARINCA", "YILAN", "ASLAN", "KAPLAN", "AYIQ", "TAVŞAN", "SINCAP", "ÇAL", "KEÇI"],
    medium: ["PENGUEN", "KANGURU", "ZÜRAFA", "MAYMUN", "FİL", "GERGEDAN", "ZEBRA", "DEVE", "BALINA", "YUNUS", "TİMSAH", "KÖPEKBALIQ", "KARTAL", "PAPAĞAN", "FLAMINGO", "TAVUSKUŞU", "KAPLUMBAĞA", "KURT", "PANDA", "KOALA", "LEOPAR", "YABANİ DOMUZU"],
    hard: ["HIPOPOTAM", "ORANGUTAN", "ŞEMPANZE", "GORILLA", "ANTİLOP", "JAGUAR", "ÇITA", "KROKODIL", "IGUANA", "SALAMANDER", "KAMELEON", "BOA", "KOBRA", "ÇINGENE KARTAL", "BALİKÇIL", "PELİKAN", "ALBATROS", "KOLIBRI", "ARMADİLLO", "TAPIR", "OKAPI", "KUDU", "GAZELLE"]
  },
  Yiyecek: {
    easy: ["ELMA", "EKMEK", "ÇİLEK", "KEK", "SU", "SÜT", "YUMURTA", "PEYNIR", "ET", "TAVUK", "BALIK", "PİRİNÇ", "MAKARNA", "SALATA", "DOMATES", "SOĞAN", "PATATES", "HAVUÇ", "BİBER"],
    medium: ["KARPUZ", "MAKARNA", "SALATA", "DONDURMA", "PİZZA", "HAMBURGER", "KÖFTE", "PİLAV", "BÖREK", "MANTI", "DOLMA", "KEBAP", "LAHMACUN", "PİDE", "BAKLAVA", "KÜNEFE", "SÜTLAÇ", "HELVA", "LOKUM", "ÇİKOLATA", "BİSKÜVİ", "PASTA"],
    hard: ["SALATALIK", "PATLICAN", "BROKOLI", "KARNABAHAR", "ISPANAK", "ROKA", "SEMIZOTU", "MAYDANOZ", "DEREOTU", "NANE", "FESLEĞEN", "KEKIK", "REYHAN", "KORIANDER", "TARÇIN", "KARABIBER", "ZENCEFİL", "SAFRAN", "SUMAK", "KIMYON", "ÇÖREKOTu", "KAPARI", "BAHARAT"]
  },
  Bilim: {
    easy: ["ATOM", "GÜNEŞ", "IŞIK", "ENERJİ", "SU", "HAVA", "TOPRAK", "ATEŞ", "YEL", "YAĞMuR", "KAR", "BUZ", "SIS", "BULUT", "YILDIZ", "AY", "DÜNYA", "MARS", "VENUS"],
    medium: ["GALAKSİ", "MOLEKÜL", "GEZEGEN", "ELEKTRON", "PROTON", "NÖTRON", "ELEMENT", "KARBON", "OKSİJEN", "HİDROJEN", "MAGNETİZMA", "ELEKTRİK", "RADYASYON", "LASER", "PRIZMA", "SPEKTRUM", "FREKANS", "DALGA", "TİTREŞİM", "YANSIMA", "KIRILMA", "ABSORPSIYON"],
    hard: ["TELESKOP", "GRAVİTASYON", "FOTOSENTEZ", "MİTOKONDRİ", "RİBOZOM", "KROMOZOM", "DNA", "RNA", "ENZİM", "HORMON", "ANTİBİYOTİK", "BAKTERI", "VİRÜS", "MANTAR", "PARAZIT", "IMMÜN SİSTEM", "ANTİKOR", "AŞILAMA", "MUTAsyon", "EVOLÜsYON", "FOSİL", "JEOLOJİ", "SİSMOLOJİ"]
  },
  Ülkeler: {
    easy: ["İTALYA", "MISIR", "KANADA", "İRAN", "IRAK", "RUSYA", "ÇİN", "JAPONYA", "HİNDİSTAN", "YUNANISTAN", "BULGARISTAN", "SURİYE", "LÜBNAN", "ÜRDÜN", "ARABISTAN", "YEMEN", "SUDAN", "LİBYA", "TuNUS"],
    medium: ["BREZİLYA", "TÜRKİYE", "ALMANYA", "FRANSA", "İNGİLTERE", "İSPANYA", "PORTEKİZ", "HOLLANDA", "BELÇİKA", "İSVİÇRE", "AVUSTURYA", "POLONYA", "ÇEKYA", "MACARISTAN", "ROMANYA", "UKRAİNA", "FİNLANDİYA", "İSVEÇ", "NORVEÇ", "DANİMARKA", "İRLANDA", "İZLANDA"],
    hard: ["ARJANTİN", "ENDONEZYA", "AVUSTRALYA", "YENİ ZELANDA", "GÜNEY AFRİKA", "VENEZuELA", "KOLOMBİYA", "EKVADOR", "PERU", "ŞİLİ", "URUGUAY", "PARAGUAY", "BOLİVYA", "GUyANA", "SURİNAM", "GANA", "NİJERYA", "KENYA", "TANZANYA", "MOZAMBIQUE", "ZIMBABVE", "BOTSVANA", "NAMİBYA"]
  },
  Meslekler: {
    easy: ["AVUKAT", "HAKİM", "AŞÇI", "PİLOT", "DOKTOR", "HEMŞİRE", "ÖĞrETMEN", "POLİS", "ASKER", "İTFAİYECİ", "KASAP", "BERBER", "TAMIRCI", "ŞOFÖR", "KAPICI", "TEMIZLIK", "BAHÇIVAN", "İNŞAAT", "KOMISAR"],
    medium: ["MÜHENDİS", "TEKNISYEN", "LABORANT", "ECZACI", "DİŞÇİ", "VETERINER", "PSİKOLOG", "SOSyOLOG", "JOURNALİST", "EDİTÖR", "FOTOĞRAFÇI", "RESİM SANATI", "MÜZİSYEN", "OYUNCU", "YÖNETMEN", "SENARIST", "ÇEVIRMEN", "TURİST", "GÜVENLIK", "KORUMA", "ŞIRKET", "MALİYE"],
    hard: ["ASTRONOT", "ARKEOLOG", "MİMAR", "JEOLOG", "METEOROLOJİST", "ANTROPOLOJİST", "FİLOZOF", "SOSYOLOG", "PSİKİATRİST", "NEUROLOJİST", "KARDİOLOJİST", "ANESTEZI", "CERRAHI", "ORTOPEDİST", "OFTALMOLOJİST", "DERMATOLOJİST", "RADyOLOJİST", "PATOLOJI", "LABORATUVAR", "MİKROBİYOLOG", "BİYOKİMYA", "GENETİK", "HİSTOLOJİST"]
  },
  Şehirler: {
    easy: ["RİZE", "VAN", "KARS", "SİVAS", "ANKARA", "İZMİR", "BURSA", "KONYA", "ADANA", "GAZİANTEP", "MERSİN", "ANTALYA", "DİYARBAKIR", "SAMSUN", "MALATYA", "ERZİNCAN", "ERZURUM", "TRABZON", "KOCAELI"],
    medium: ["İSTANBUL", "ESKİŞEHİR", "DENİZLİ", "MANİSA", "AYDIN", "MUĞLA", "AMASYA", "SAKARYA", "ZONGULDAK", "KASTAMONU", "ÇORUM", "TOKİ", "YOZGAT", "NEVŞEHİR", "KIRŞEHİR", "AKSARAY", "NİĞDE", "KAYSERİ", "KÜTAHYA", "AFYONKARAHİSAR", "UŞAK", "BURDUR"],
    hard: ["KAHRAMANmaraŞ", "ŞANLIURFA", "KiLIS", "OSMANİYE", "HATAY", "ADIYAMAN", "BATMAN", "SIRNAK", "HAKKARİ", "MUŞ", "BİNGÖL", "TUNCELİ", "ELAZİĞ", "ARDAHAN", "IĞDIR", "ARTVİN", "BAYBURT", "GİRESUN", "ORDU", "GÜMÜŞHANE", "SİNOP", "ÇANKIRI", "BARTIN"]
  },
  Markalar: {
    easy: ["GOOGLE", "APPLE", "FORD", "LCW", "NIKE", "ADIDAS", "COCA COLA", "PEPSI", "SAMSUNG", "LG", "SONY", "INTEL", "AMD", "HP", "DELL", "LENOVO", "HUAWEI", "XIAOMI", "OPPO"],
    medium: ["MERCEDES", "BMW", "AUDI", "PUMA", "ZARA", "H&M", "IKEA", "MICROSOFT", "AMAZON", "NETFLIX", "SPOTIFY", "YOUTUBE", "FACEBOOK", "INSTAGRAM", "TWITTER", "LINKEDIN", "TESLA", "UBER", "AIRBNB", "PAYPAL", "VISA", "MASTERCARD"],
    hard: ["ARÇELİK", "VESTEL", "BEKO", "THY", "PEGASUS", "GARANTI", "AKBANK", "İŞ BANKASI", "YAPIKRED", "HALKBANK", "ZİRAAT", "VAKIFBANK", "FINANSBANK", "DENİZBANK", "QNB FİNANSBANK", "ALBARAKA", "KUVEYT TÜRK", "EMLAK KATILIM", "ZİRAAT KATILIM", "VAKIF KATILIM", "TÜRKİYE SİGORTA", "AXA", "ALLIANZ"]
  },
  "Spor Dalları": {
    easy: ["FUTBOL", "TENİS", "YÜZME", "GOLF", "KOŞU", "YÜRÜYÜŞ", "BİSİKLET", "KÜREK", "GÜREŞ", "BOKS", "ATLETİZM", "JİMNASTİK", "VOLEYBOL", "BASKETBOL", "HENTBOL", "BADMINTON", "PİNG PONG", "KAYAK", "SNOWBOARD"],
    medium: ["BİNİCİLİK", "OKÇULUK", "YELKEN", "SU KAYAĞI", "TENİS", "SQUASH", "RAGBI", "AMERİKAN FUTBOLU", "BEYZbol", "KRIKET", "HOKEİ", "CURLING", "BOWLING", "BİLARDO", "SNOOKER", "DART", "SATRANÇ", "GO", "POKER", "BRİDGE", "TAVLA", "OKEY"],
    hard: ["ESKRİM", "CİRİT", "MODERN PENTATLON", "DEKaTLON", "HEPtATLON", "MARATHON", "TRİATLON", "IRONMAN", "SUMO GÜREŞ", "JUDO", "KARAte", "TAEKWONDO", "AIKIDO", "MUAy THAİ", "KICK BOKS", "KAPOEIRA", "KRAV MAGA", "JIU JİTSU", "SAVATE", "KYOKUSHIN", "SHOTOKAN", "GOJU RYU", "KEMPO"]
  },
  Eşyalar: {
    easy: ["MASA", "SAAT", "GÖZLÜK", "ÇANTA", "AYAKKABI", "GÖMLEK", "PANTOLON", "CEKET", "ŞAPKA", "ELDIVEN", "ÇORAP", "İÇ ÇAMAŞIRI", "KEMER", "KOLYE", "KÜPE", "YÜZÜK", "BİLEZİK", "SAAT", "ÇANTA"],
    medium: ["SANDALYE", "BİLGİSAYAR", "TELEFON", "TELEVİZYON", "RADYO", "FOTOĞRAF MAKİNESİ", "VİDEO KAMERA", "OYUN KONSOLU", "TABLET", "LAPTOP", "YAZICI", "SCANNER", "FAKS", "FOTOKOPI", "PROJEKTÖr", "HOPARLÖr", "KULAKULIK", "MİKROFON", "KLAVYE", "MOUSE", "MOUSE PAD", "WEB CAM"],
    hard: ["BUZDOLABI", "ÇAMAŞIR MAKİNESİ", "BULAŞIK MAKİNESİ", "FIRIN", "MIKRODALGA", "BLENDEr", "ROBOT", "KAHVE MAKİNESİ", "ÇAYCI", "TOST MAKİNESİ", "KETÇUPCu", "WAFFLE MAKİNESİ", "BARBEKÜ", "IZGARA", "DONDURURCU", "SÜPÜRGE", "HALI yIKAMA", "ÜTÜ", "ÜTÜ MASASI", "ASPIATOR", "KLİMA", "KOMBI", "TERMOSİFON"]
  },
  Filmler: {
    easy: ["AVATAR", "TITANIC", "ŞREK", "NEMO", "WALL-E", "TOY STORY", "CARS", "FROZEN", "MOANA", "COCO", "UP", "INSIDE OUT", "MONSTERS", "BRAVE", "RATATOUILLE", "THE INCREDIBLES", "FINDING DORY", "ZOOTOPIA", "BIG HERO 6"],
    medium: ["INCEPTION", "INTERSTELLAR", "THE MATRIX", "GLADIATOR", "FORREST GUMP", "THE SHAWSHANK", "PULP FICTION", "THE GODFATHER", "DARK KNIGHT", "FIGHT CLUB", "GOODFELLAS", "SCARFACE", "CASINO", "HEAT", "SEVEN", "ZODIAC", "MEMENTO", "PRESTIGE", "DUNKIRK", "TENET", "BLADE RUNNER", "ALIEN"],
    hard: ["OYUNCAK HİKAYESİ", "KARAYİP KORSANLARI", "YÜZÜKLERİN EFENDİSİ", "ESARETİN BEDELİ", "SCHINDLER'S LIST", "THE DEPARTED", "GOODWILL HUNTING", "A BEAUTIFUL MIND", "RAIN MAN", "ONE FLEW OVER", "APOCALYPSE NOW", "TAXI DRIVER", "RAGING BULL", "MEAN STREETS", "KING OF COMEDY", "THE AVIATOR", "GANGS OF NEW YORK", "THE WOLF OF WALL STREET", "CATCH ME IF YOU CAN", "SAVING PRIVATE RYAN", "JURASSIC PARK", "E.T.", "JAWS"]
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