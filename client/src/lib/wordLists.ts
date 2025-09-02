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
    1: ["KEDİ", "AT", "İT", "SÜ", "EV", "EL", "YÜZ", "BAŞ", "GÖZ", "DİL", "BUZ", "DAL", "TOP", "TAŞ", "ARA", "KUŞ", "BAL", "SUT", "DAĞ", "DEN", "ORK", "DOL", "BOZ", "GEL", "GİT", "VER", "AL", "YAP", "OL", "DUR", "BIR", "İKİ", "ÜÇ", "YER", "SEN", "BEN", "HAK", "CAN", "DİN", "VAR", "YOK", "BOY", "KIZ", "ÇOK", "AZ", "IYİ", "ILK", "İÇ", "DIŞ"], // Kolay - 2-3 harf  
    2: ["ASLAN", "KAPLAN", "ZEBRA", "PANDA", "ÇAKAL", "KÖPEK", "KOYUN", "KEÇI", "İNEK", "DOMUZKUŞU", "KARTAL", "BALINA", "YUNUS", "FARE", "TAVUK", "ÖRDEK", "TAVŞAN", "PAPAĞAN", "ŞAHIN", "BALIK", "GÜVERCIN", "KUŞ", "YILAN", "KEDI", "KÖPEK", "HAMSTER", "ÇAKAL", "TILKI", "AYAK", "KUZU", "BUZAĞI", "TAVUK", "HOROZ", "HINDI", "LEYLEK", "KARTAL", "ŞAHIN", "BAYKUŞ", "KARGA", "SERÇ", "DOĞAN", "GEYIK", "KAPLAN", "PANDA", "AYAKLI", "BALINA", "YUNUS"], // Orta - 4-5 harf
    3: ["MAYMUN", "KARTAL", "TAVUK", "BALINA", "YUNUS", "EJDER", "ASLAN", "KAPLAN", "ZEBRA", "ÇITA", "LEOPAR", "JAGUAR", "PİTBUL", "GOLDEN", "HUSKY", "POODLE", "BULLDOĞ", "BEAGLE", "BOXER", "POINTER", "SETTER", "SPANIEL", "TERRIER", "MASTIFF", "CHOW", "DANE", "PINSCHER", "ROTTWEILER", "DOBERMAN", "GERMAN", "SHEPHERD", "COLLIE", "BORDER", "AUSSIE", "HEELER", "CORGI", "DALMATION", "PITBULL", "AKBASH", "KANGAL", "MALAKLISI", "COBAN", "KOPEGI", "SİBAS", "AKITA"], // Zor - 5-6 harf
    4: ["JAGUAR", "OKAPI", "ÇITA", "LEMUR", "TAPIR", "FLAMINGO", "KAMELEON", "IGUANA", "SALAMANDER", "KERTENKELE", "SCORPION", "PENGUEN", "ORANGUTAN", "GORILLA", "ŞEMPANZE", "BABOON", "MANDRILL", "LEMUR", "LORIS", "TARSIER", "MARMOSET", "TAMARIN", "HOWLER", "SPIDER", "WOOLLY", "CAPUCHIN", "MACAQUE", "GIBBON", "LANGUR", "PROBOSCIS", "COLOBUS", "VERVET", "GUENON", "DRILL", "GELADA", "PATAS", "MANGABEY", "CERCOPITHECUS"], // Çok zor - 7-8 harf
    5: ["IGUANALAR", "FLAMINGOLAR", "TIMSAHLAR", "KAMELEONLAR", "RHINOCEROS", "HIPPOPOTAMUS", "ORANGUTANLAR", "ŞEMPANZELER", "GORILLALAR", "BABOONLAR", "MANDRILLLAR", "LEMURLAR", "MARMOSETLER", "CAPUCHINLAR", "MACAQUELER", "GIBBONLAR", "LANGURLAR", "PROBOSCISLER", "COLOBUSLAR", "VERVETLER", "GUENONLAR", "DRILLLAR", "GELADALAR", "PATASLAR", "MANGABEYLER", "CERCOPITHECUSLAR", "CHIMPANZELER", "BONOBOLARI", "ORANGUTANLARI", "GORILLALAR", "BABOONLAR", "LEMURLARI", "MARMOZETLER", "TAMARINLER", "HOWLERLAR", "SPIDERLAR", "WOOLLYLER", "CAPUÇINLER", "MAKAKLAR", "GIBBONLAR", "LANGURLAR", "PROBOSCISLER", "KOLOBUSLAR", "VERVETLER", "GUENONLAR", "DRILLLAR", "GELADALAR", "PATASLAR", "MANGABEYLER"] // En zor - 8+ harf
  },
  Yiyecek: {
    1: ["SU", "ET", "AŞ", "YAĞ", "SÜT", "BAL", "TUZ", "EK", "YE", "İÇ", "TAM", "KEK", "NAN", "ÇAY", "MAT", "SUP", "OT", "BAT", "TOP", "TAŞ", "ARA", "VER", "GEL", "GİT", "YAP", "OL", "AL", "YE", "İÇ", "BUL", "GÖR", "DUY", "KOŞ", "YÜR", "OTU", "KAL", "BEK", "ÇIK", "GIR", "YAT", "UYU", "UYA", "ÇAL", "OKU", "YAZ", "ÇIZ", "SAY", "DIN", "SÖY"], // Kolay - 2-3 harf
    2: ["EKMEK", "ÇORBA", "SALATA", "KÖFTE", "KEBAP", "PILAV", "MAKARNA", "PATATES", "SOĞAN", "DOMATES", "BİBER", "MARUL", "HAVUÇ", "LAHANA", "ISPANAK", "BROKOLI", "KARNABAHAR", "PATLICAN", "KABAK", "SALATALIK", "TURP", "PANCAR", "KEREVIZ", "MAYDANOZ", "DEREOTU", "FESLEĞEN", "ROKA", "SEMIZOTU", "NOHUT", "FASÜLYE", "MERCIMEK", "BULGUR", "ARPA", "MISIR", "PİRİNÇ", "BUĞDAY", "YAP", "UN", "ŞEKER", "TERE", "ELMA", "ARMUT", "MEYV", "MAND", "ERIK", "VIŞNE", "ÇILE", "ÇIM"], // Orta - 4-5 harf
    3: ["BÖREK", "MANTİ", "DOLMA", "PASTA", "PİZZA", "LAHMACUN", "PİDE", "DÖNER", "ŞİŞ", "ADANA", "URFA", "ANTEP", "MARAŞ", "İSKENDER", "TAVUK", "ETLİ", "SEBZE", "KARIŞIK", "PEYNİR", "KAŞAR", "BEYAZ", "TUL", "ÇEDAR", "MOZZA", "GOUDA", "BRIE", "ROQUEFORT", "CAMEMBERT", "EMMENTAL", "GRUYERE", "PARMESAN", "FETA", "RICOTTA", "MASCARPONE", "COTTAGE", "CREAM", "TAZE", "YOĞURT", "KEFIR", "AYRAN", "CACIK", "HAYDARI", "ACUKA", "SALÇA", "REÇEL", "MARMELAT", "BAL", "PEKMEZ"], // Zor - 5-6 harf
    4: ["SUSHİ", "RİSOTO", "LAZANYA", "MAKARNA", "HAMBURGER", "CHEESEBURGER", "HOTDOG", "SANDWICH", "TOST", "PANINI", "WRAP", "BURRITO", "TACO", "QUESADILLA", "NACHOS", "GUACAMOLE", "SALSA", "HUMMUS", "FALAFEL", "SHAWARMA", "GYROS", "MOUSSAKA", "SOUVLAKI", "TZATZIKI", "BAKLAVA", "KUNEFE", "KÜNEFE", "GAZİANTEP", "ANTEPLI", "MARAŞLI", "URFALI", "ADANALI", "TRABZON", "RİZELI", "ARTVIN", "BATUM", "GÜRCÜ", "ABHAZ", "ÇERKEZ", "LAZI", "HEMŞİN", "KARADENIZ", "EGE", "AKDENIZ"], // Çok zor - 7-8 harf
    5: ["CAPPUCCİNO", "TİRAMİSU", "BRUSCHETTA", "PROSCİUTTO", "MOZZARELLA", "PARMIGIANO", "CARBONARA", "BOLOGNESE", "ARRABBIATA", "PUTTANESCA", "ALFREDO", "QUATTRO", "MARGHERITA", "NAPOLETANA", "MARINARA", "PEPPERONI", "HAWAIIAN", "VEGETARIAN", "SUPREME", "MEDITERRANEAN", "CALIFORNIA", "CHICAGO", "NEWYORK", "SICILIAN", "DETROIT", "PHILADELPHIA", "BOSTON", "BUFFALO", "TENNESSEE", "CAROLINA", "GEORGIA", "FLORIDA", "TEXAS", "ARIZONA", "COLORADO", "OREGON", "WASHINGTON", "ALASKA", "HAWAII", "PUERTO", "VIRGIN", "GUAM", "SAMOA", "MARIANAS", "MARSHALL", "MICRONESIA", "PALAU", "KIRIBATI", "NAURU"] // En zor - 8+ harf
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
    1: ["BMW", "KIA", "LG", "HP", "3M", "AMD", "IBM", "SAP", "GM", "GE", "AT", "BP", "UPS", "DHL", "FED", "GAP", "H&M", "C&A", "MAC", "YSL", "CK", "D&G", "LV", "GU", "TH", "RL", "MK", "KC", "VS", "WWE", "NBA", "NFL", "MLB", "NHL", "UFC", "FIFA", "UEFA", "IOC", "WHO", "UN", "EU", "US", "UK", "CN", "JP", "KR", "IN", "BR", "RU", "CA"], // Kolay - 2-3 harf
    2: ["APPLE", "NIKE", "FORD", "SONY", "SAMSUNG", "GOOGLE", "META", "TESLA", "ORACLE", "CISCO", "INTEL", "ADOBE", "PAYPAL", "EBAY", "ZOOM", "SLACK", "UBER", "LYFT", "AIRBNB", "SHOPIFY", "SPOTIFY", "NETFLIX", "DISNEY", "WARNER", "UNIVERSAL", "PARAMOUNT", "LIONSGATE", "MIRAMAX", "DREAMWORKS", "PIXAR", "MARVEL", "STARWARS", "POKEMON", "NINTENDO", "PLAYSTATION", "XBOX", "STEAM", "EPIC", "RIOT", "BLIZZARD", "ACTIVISION", "UBISOFT", "ELECTRONIC", "ROCKSTAR", "BETHESDA", "VALVE", "SQUARE", "CAPCOM", "KONAMI", "SEGA"], // Orta - 4-7 harf
    3: ["GOOGLE", "ADIDAS", "MERCEDES", "PUMA", "ZARA", "VERSACE", "ARMANI", "GUCCI", "PRADA", "CHANEL", "DIOR", "HERMES", "BALENCIAGA", "GIVENCHY", "VALENTINO", "DOLCE", "GABBANA", "BURBERRY", "LOUIS", "VUITTON", "CARTIER", "TIFFANY", "ROLEX", "OMEGA", "PATEK", "PHILIPPE", "VACHERON", "CONSTANTIN", "AUDEMARS", "PIGUET", "JAEGER", "LECOULTRE", "BREGUET", "BLANCPAIN", "CHOPARD", "BULGARI", "MONTBLANC", "HERMÈS", "CHRISTIAN", "LOUBOUTIN", "JIMMY", "CHOO", "MANOLO", "BLAHNIK", "SALVATORE", "FERRAGAMO", "TOD'S", "BOTTEGA", "VENETA", "FENDI"], // Zor - 5-8 harf
    4: ["AMAZON", "NETFLIX", "SPOTIFY", "YOUTUBE", "FACEBOOK", "INSTAGRAM", "WHATSAPP", "TELEGRAM", "SNAPCHAT", "TIKTOK", "TWITTER", "LINKEDIN", "PINTEREST", "REDDIT", "DISCORD", "TWITCH", "CLUBHOUSE", "SIGNAL", "VIBER", "WECHAT", "LINE", "KAKAO", "SKYPE", "TEAMS", "DROPBOX", "ONEDRIVE", "GOOGLEDRIVE", "ICLOUD", "AMAZON", "ALIBABA", "TENCENT", "BAIDU", "BYTEDANCE", "XIAOMI", "HUAWEI", "OPPO", "VIVO", "ONEPLUS", "REALME", "HONOR", "REDMI", "POCO", "BLACK", "SHARK", "ASUS", "ACER", "LENOVO", "DELL", "HEWLETT", "PACKARD"], // Çok zor - 7-9 harf
    5: ["LAMBORGHİNİ", "ROLLS-ROYCE", "MASERATİ", "BULGARİ", "PATEK PHİLİPPE", "VACHERON CONSTANTİN", "AUDEMARS PİGUET", "JAEGER-LECOULTRE", "A. LANGE & SÖHNE", "F.P. JOURNE", "RİCHARD MİLLE", "HUBLOT", "FRANCK MULLER", "JACOB & CO", "URWERK", "MB&F", "GREUBEL FORSEY", "ROMAIN JEROME", "DEWITT", "CHRISTOPHE CLARET", "BOVET", "KARI VOUTILAINEN", "PHILIPPE DUFOUR", "ROGER DUBUIS", "CORUM", "BELL & ROSS", "PANERAI", "GRAHAM", "MAURICE LACROIX", "FREDERIQUE CONSTANT", "ALPINA", "UNION GLASHÜTTE", "NOMOS GLASHÜTTE", "GLASHÜTTE ORIGINAL", "MORITZ GROSSMANN", "TUTIMA", "STOWA", "LACO", "ARCHIMEDE", "SINN", "DAMASKO", "MUHLE GLASHUTTE", "JUNGHANS", "BRAUN", "MEISTERSINGER", "BENZINGER", "HANHART", "CHRONOSWISS", "ETERNA", "ORIS"] // En zor - 10+ harf
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