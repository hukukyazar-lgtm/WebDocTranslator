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
    1: ["ARI", "KUŞ", "KAZ", "KEDİ", "FARE", "EŞEK", "KEÇİ", "İNEK", "KOYUN", "TAVUK", "ÖRDEK", "KÖPEK", "HOROZ", "DOMUZ", "SİNEK", "BALIK", "HİNDİ", "TAVŞAN", "SİNCAP", "CİVCİV", "KELEBEK", "KARINCA", "KURBAĞA", "ÖRÜMCEK"], // Kolay - 3-8 harf  
    2: ["AYI", "FİL", "FOK", "ASLAN", "ÇITA", "KURT", "DEVE", "YILAN", "ZEBRA", "TİLKİ", "GEYİK", "GORİL", "YUNUS", "KİRPİ", "KAPLAN", "MAYMUN", "KARTAL", "CEYLAN", "BAYKUŞ", "YARASA", "KUNDUZ", "PANTER", "BALİNA", "PAPAĞAN", "KÖSTEBEK"], // Orta - 3-8 harf
    3: ["KOALA", "PANDA", "TAPİR", "OKAPİ", "VATOZ", "VAŞAK", "ZÜRAFA", "TİMSAH", "LEOPAR", "AKBABA", "İGUANA", "PENGUEN", "ANTİLOP", "KANGURU", "PELİKAN", "DENİZATI", "FLAMİNGO", "GERGEDAN", "SU AYGIRI", "BUKELEMUN", "HIPOPOTAM", "ORANGUTAN", "KARINCANCI", "KOMODO EJDERİ", "MÜREKKEP BALIĞI"]  // Zor - 5-16 harf
  },
  Yiyecek: {
    1: ["BAL", "TUZ", "ÇAY", "MUZ", "SÜT", "ELMA", "ARMUT", "ÜZÜM", "EKMEK", "SOĞAN", "KİRAZ", "LİMON", "ÇİLEK", "HAVUÇ", "KAHVE", "ŞEKER", "PEYNİR", "ZEYTİN", "DOMATES", "PATATES", "YUMURTA", "MAKARNA", "PORTAKAL", "SALATALIK"], // Kolay - 3-10 harf
    2: ["NAR", "KAVUN", "KİVİ", "ERİK", "NOHUT", "MISIR", "KABAK", "TAVUK", "BİBER", "BADEM", "CEVİZ", "FINDIK", "MANGO", "KAYISI", "İNCİR", "KARPUZ", "ANANAS", "MANTAR", "PİRİNÇ", "ISPANAK", "FASULYE", "AVOKADO", "ŞEFTALİ", "PATLICAN", "MERCİMEK"], // Orta - 3-9 harf
    3: ["ROKA", "TURP", "NANE", "LİÇİ", "BAMYA", "SUSAM", "KİNOA", "SOMON", "GUAVA", "PANCAR", "PAPAYA", "TARÇIN", "KEKİK", "AHUDUDU", "HAŞHAŞ", "ENGİNAR", "BROKOLİ", "KEREVİZ", "ZENCEFİL", "SARIMSAK", "KUŞKONMAZ", "BÖĞÜRTLEN", "KARNABAHAR", "YABAN MERSİNİ", "HİNDİSTAN CEVİZİ"]  // Zor - 4-16 harf
  },
  Bilim: {
    1: ["GEN", "DNA", "BAZ", "ATOM", "HAVA", "YASA", "SAYI", "UZAY", "ATEŞ", "IŞIK", "CANLI", "DENEY", "DOĞA", "KRAL", "RAKAM", "ASİT", "BİLİM", "DALGA", "FOSİL", "GÜNEŞ", "HÜCRE", "TEORİ", "PLAZMA"], // Kolay - 3-6 harf
    2: ["ISI", "YASA", "METAL", "ENZİM", "MİTOS", "MADDE", "KUVVET", "DÜNYA", "YILDIZ", "ENERJİ", "ELEMENT", "GÖZLEM", "FREKANS", "GALAKSİ", "VİRÜS", "GEZEGEN", "EVRİM", "SOLUNUM", "HİPOTEZ", "MOLEKÜL", "BAKTERİ", "MIKNATIS", "BİLEŞİK", "ELEKTRİK", "FOTOSENTEZ"], // Orta - 3-11 harf
    3: ["FİZİK", "KİMYA", "NEBULA", "PLAZMA", "KOZMOS", "KUANTUM", "GENETİK", "JEOLOJİ", "EKOLOJİ", "SİMBİYOZ", "TELESKOP", "ASTRONOMİ", "BİYOLOJİ", "MİKROSKOP", "SÜPERNOVA", "EKOSİSTEM", "NÖROBİLİM", "PSİKOLOJİ", "KARA DELİK", "GÖRELİLİK", "ARKEOLOJİ", "MANYETİZMA", "METEOROLOJİ", "ANTROPOLOJİ", "PERİYODİK TABLO"]  // Zor - 5-15 harf
  },
  Ülkeler: {
    1: ["ÇİN", "İRAN", "IRAK", "MISIR", "RUSYA", "FRANSA", "İTALYA", "KANADA", "İSVEÇ", "SURİYE", "NORVEÇ", "JAPONYA", "ALMANYA", "İSPANYA", "AMERİKA", "TÜRKİYE", "İSVİÇRE", "MEKSİKA", "HOLLANDA", "BREZİLYA", "PORTEKİZ", "İNGİLTERE", "AVUSTRALYA", "HİNDİSTAN", "YUNANİSTAN"], // Kolay - 3-10 harf
    2: ["PERU", "LAOS", "GANA", "KATAR", "NEPAL", "KÜBA", "ŞİLİ", "ROMANYA", "TAYLAND", "POLONYA", "VİETNAM", "BELÇİKA", "İRLANDA", "UKRAYNA", "MALEZYA", "EKVADOR", "KUVEYT", "ENDONEZYA", "FİLİPİNLER", "AVUSTURYA", "ARJANTİN", "KOLOMBİYA", "PAKİSTAN", "AFGANİSTAN", "DANİMARKA"], // Orta - 4-11 harf
    3: ["KENYA", "FAS", "FİJİ", "MYANMAR", "JAMAİKA", "LÜBNAN", "ÜRDÜN", "VENEZUELA", "NİJERYA", "TANZANYA", "ETİYOPYA", "CEZAYİR", "NEPAL", "MOĞOLİSTAN", "KAMBOÇYA", "BANGLADEŞ", "VENEZUELA", "GÜNEY AFRİKA", "LÜKSEMBURG", "GÜRCİSTAN", "AZERBAYCAN", "KAZAKİSTAN", "ÖZBEKİSTAN", "MACARİSTAN", "FİNLANDİYA"]  // Zor - 5-11 harf
  },
  Meslekler: {
    1: ["AŞÇİ", "ASKER", "HAKİM", "KASAP", "MANAV", "MEMUR", "SAVCI", "TERZİ", "YAZAR", "AKTÖR", "GARSON", "PİLOT", "POLİS", "ŞOFÖR", "AVUKAT", "BERBER", "DOKTOR", "ECZACI", "İŞÇİ", "MİMAR", "REHBER", "RESSAM", "SPORCU", "ÇİFTÇİ", "FIRINCI"], // Kolay - 4-8 harf
    2: ["KAPTAN", "ANTRENÖR", "ARKEOLOG", "DİŞ HEKİMİ", "DANIŞMAN", "GAZETECİ", "HEMŞİRE", "MÜZİSYEN", "POSTACI", "PSİKOLOG", "SEKRETER", "TARİHÇİ", "ASTRONOT", "TASARIMCI", "VETERİNER", "YÖNETMEN", "ÖĞRETMEN", "RESSAM", "FOTOĞRAFÇI", "MÜHENDİS", "TEKNİSYEN", "EKONOMİST", "MÜFETTİŞ", "HEYKELTRAŞ", "İTFAİYECİ"], // Orta - 6-11 harf
    3: ["CEO", "MUCİT", "JOKEY", "DUBLÖR", "KÜRATÖR", "KALİGRAF", "ANALİST", "BESTECİ", "DENETÇİ", "METEOROLOG", "SİHİRBAZ", "SİSMOLOG", "VETERİNER", "KRİMİNOLOG", "OŞİNOGRAF", "VANTROLOG", "ANİMATÖR", "KOREOGRAF", "RESTORATÖR", "GİRİŞİMCİ", "ASTROFİZİKÇİ", "EPİDEMİYOLOG", "GENETİK MÜHENDİSİ", "SANAT YÖNETMENİ", "SİBER GÜVENLİK UZMAN"]  // Zor - 3-22 harf
  },
  Şehirler: {
    1: ["VAN", "ROMA", "OSLO", "SEUL", "TOKYO", "PRAG", "BURSA", "KONYA", "ADANA", "ATİNA", "MADRİD", "ANKARA", "BERLİN", "İZMİR", "LONDRA", "PARİS", "PEKİN", "MARDİN", "DUBAİ", "ANTALYA", "MOSKOVA", "SYDNEY", "ZÜRİH", "TORONTO", "ESKİŞEHİR"], // Kolay - 3-10 harf
    2: ["KİEV", "LİMA", "EFES", "PETRA", "KYOTO", "HAVANA", "TROYA", "MEKKE", "BABİL", "KUDÜS", "ŞAM", "LİZBON", "DUBLİN", "CENEVRE", "VİYANA", "BANGKOK", "KRAKOW", "POMPEİ", "TRABZON", "ERZURUM", "KAHİRE", "KAYSERİ", "GAZİANTEP", "İSTANBUL", "MARAKEŞ"], // Orta - 3-9 harf
    3: ["KARTACA", "SEVİLLA", "TİMBKTU", "KATMANDU", "FLORANSA", "VENEDİK", "STOKHOLM", "VARŞOVA", "ERZURUM", "BUDAPEŞTE", "İSKENDERİYE", "HELSİNKİ", "KOPENHAG", "AMSTERDAM", "EDİNBURG", "BARSELONA", "REYKJAVİK", "SİNGAPUR", "BUENOS AİRES", "LOS ANGELES", "RİO DE JANEİRO", "MACHU PICCHU", "ST. PETERSBURG", "BRÜKSEL", "NEW YORK"]  // Zor - 7-15 harf
  },
  Markalar: {
    1: ["BMW", "NIKE", "PUMA", "FORD", "SONY", "JEEP", "IKEA", "ZARA", "LEGO", "LAYS", "BOSE", "BEKO", "APPLE", "GUCCI", "PRADA", "TESLA", "INTEL", "ROLEX", "CANON", "CHANEL", "AMAZON", "TOYOTA", "NESTLE", "MİGROS", "PHILIPS"], // Kolay - 3-7 harf
    2: ["DELL", "BOSE", "BEKO", "APPLE", "CHANEL", "ROLEX", "AMAZON", "TOYOTA", "CANON", "NIKON", "ADIDAS", "SPACEX", "BOEING", "HERMES", "ORACLE", "PEPSI", "CISCO", "VESTEL", "AIRBUS", "DANONE", "GOOGLE", "LOREAL", "COLGATE", "PORSCHE", "FERRARI"], // Orta - 4-8 harf
    3: ["CARTIER", "SAMSUNG", "GILLETTE", "NESCAFE", "NVIDIA", "QUALCOMM", "RED BULL", "TAG HEUER", "MERCEDES", "STARBUCKS", "LULULEMON", "BURBERRY", "ARÇELİK", "COCA-COLA", "PATAGONIA", "BREITLING", "MICROSOFT", "JOHN DEERE", "LAND ROVER", "ROLLS-ROYCE", "FABER-CASTELL", "UNDER ARMOUR", "MCDONALD'S", "LAMBORGHINI", "HARLEY-DAVIDSON"]  // Zor - 6-16 harf
  },
  "Spor Dalları": {
    1: ["BOKS", "GOLF", "JUDO", "KANO", "KOŞU", "POLO", "SÖRF", "DART", "HOKEY", "KAYAK", "KÜREK", "YELKEN", "GÜREŞ", "HALTER", "RUGBY", "TENİS", "YÜZME", "BOCCE", "FUTBOL", "KRİKET", "BEYZBOL", "SQUASH", "BOWLING", "VOLEY", "ESKRİM"], // Kolay - 3-7 harf
    2: ["DALIŞ", "KARATE", "RALLİ", "OKÇULUK", "RAGBI", "ATICILIK", "HENTBOL", "RAFTING", "SU TOPU", "YÜRÜYÜŞ", "BİSİKLET", "PARKOUR", "TRİATLON", "BİATLON", "SKELETON", "TEKVANDO", "BILARDO", "MOTOKROS", "KİCKBOKS", "ESKRİM", "DAĞCILIK", "BASKETBOL", "VOLEYBOL", "TIRANIŞ", "CİMNASTİK"], // Orta - 5-10 harf
    3: ["JAI ALAI", "KABADDI", "MUAY THAİ", "KÖRİLİNG", "BOSSABALL", "ATLETİZM", "BADMİNTON", "KANYONİNG", "SU KAYAĞI", "BUZ PATENİ", "SKATEBOARD", "BİNİCİLİK", "MASA TENİSİ", "HELİ-KAYAK", "BASE ATLAMA", "ROLLER DERBY", "SEPPAK TAKRAW", "UÇURTMA SÖRFÜ", "BUZ TIRMANIŞI", "YAMAÇ PARAŞÜTÜ", "ULTIMATE FRİSBEE", "WİNGSUİT UÇUŞU", "SU ALTI HOKEYİ", "AMERİKAN FUTBOLU", "MODERN PENTATLON"]  // Zor - 8-17 harf
  },
  Eşyalar: {
    1: ["MAT", "ÜTÜ", "KAPI", "HALI", "SAAT", "MASA", "YATAK", "DOLAP", "AYNA", "LAMBA", "PERDE", "KALEM", "KİTAP", "TABAK", "ÇATAL", "BIÇAK", "VALİZ", "DRONE", "GÖNYE", "MATKAP", "TESTERE", "BARDAK", "KAŞIK", "DEFTER", "CÜZDAN"], // Kolay - 3-7 harf
    2: ["FIRIN", "MENGENE", "PUSULA", "ANAHTAR", "ÇEKİÇ", "AMFİ", "GİTAR", "KEMAN", "ÇADIR", "PİYANO", "MİKSER", "KAMERA", "GÖZLÜK", "KOLLTUK", "TELEFON", "TENCERE", "YAZICI", "PERGEL", "GRAMOFON", "DAKTİLO", "DİNAMOMETRE", "SEKSTANT", "TELESKOP", "MİKROSKOP", "PROJEKTÖR"], // Orta - 5-12 harf
    3: ["DÜRBÜN", "METRONOM", "SANDALYE", "HOPARLÖR", "KULAKLIK", "PENCERE", "TARAYICI", "MERDİVEN", "ŞEMSİYE", "BAROMETRE", "TERMOMETRE", "TORNAVİDA", "OSİLOSKOP", "AKILLI SAAT", "3D YAZICI", "BİLGİSAYAR", "TELEVİZYON", "BUZDOLABI", "MİKRODALGA", "KRONOMETRE", "UYKU TULUMU", "SIRT ÇANTASI", "FOTOĞRAF MAKİNESİ", "SANAL GERÇEKLİK GÖZLÜĞÜ", "BİSİKLET"]  // Zor - 6-22 harf
  },
  "Filmler": {
    1: ["HULK", "NEMO", "COCO", "DARK", "JAWS", "OZARK", "FARGO", "ROCKY", "ALIEN", "BONES", "HOUSE", "SUITS", "RAMBO", "SHREK", "MOANA", "BRAVE", "DEXTER", "LUPIN", "AVATAR", "BATMAN", "MATRIX", "FROZEN", "VIKINGS", "FRIENDS", "NARCOS"], // Kolay - 4-7 harf
    2: ["MATRIX", "FROZEN", "VIKINGS", "FRIENDS", "NARCOS", "WALL-E", "TANGLED", "ALADDIN", "TITANIC", "MAD MEN", "THE WIRE", "EUPHORIA", "THE BOYS", "SUPERMAN", "HOMELAND", "THE CROWN", "SHERLOCK", "WESTWORLD", "INCEPTION", "SUCCESSION", "TOY STORY", "SQUID GAME", "TERMINATOR", "MONEY HEIST", "BRIDGERTON"], // Orta - 6-12 harf
    3: ["THE OFFICE", "PRISON BREAK", "BREAKING BAD", "THE WITCHER", "THE SOPRANOS", "FINDING NEMO", "PEAKY BLINDERS", "BLACK MIRROR", "STRANGER THINGS", "TRUE DETECTIVE", "BETTER CALL SAUL", "HOUSE OF CARDS", "THE MANDALORIAN", "GREY'S ANATOMY", "GAME OF THRONES", "SEX AND THE CITY", "THE WALKING DEAD", "13 REASONS WHY", "TWO AND A HALF MEN", "DESPERATE HOUSEWIVES", "THE BIG BANG THEORY", "HOW I MET YOUR MOTHER", "ORANGE IS THE NEW BLACK"]  // Zor - 10-23 harf
  }
};

export function getWordByDifficulty(category: string, difficulty: number, usedWords: string[] = []): string {
  const categoryWords = wordLists[category];
  if (!categoryWords) return '';
  
  const words = categoryWords[difficulty as keyof WordList] || [];
  const availableWords = words.filter(word => !usedWords.includes(word));
  
  if (availableWords.length === 0) {
    // If no unused words, restart from the beginning of the category
    return words[0] || '';
  }
  
  // Return the first available word (they are already sorted by letter count)
  return availableWords[0] || '';
}