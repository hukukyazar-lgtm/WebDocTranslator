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
    1: ["ELMA", "ARMUT", "MUZ", "ÇİLEK", "KİRAZ", "ÜZÜM", "PORTAKAL", "LİMON", "EKMEK", "PEYNİR", "ZEYTİN", "DOMATES", "SALATALIK", "SOĞAN", "PATATES", "HAVUÇ", "SÜT", "YUMURTA", "BAL", "ŞEKER", "TUZ", "SU", "ÇAY", "KAHVE", "MAKARNA"], // Kolay - 3-4 harf
    2: ["KARPUZ", "KAVUN", "ANANAS", "MANGO", "AVOKADO", "KİVİ", "NAR", "İNCİR", "KAYISI", "ŞEFTALİ", "ERİK", "CEVİZ", "FINDIK", "BADEM", "MISIR", "FASULYE", "MERCİMEK", "NOHUT", "BİBER", "PATLICAN", "ISPANAK", "KABAK", "MANTAR", "PİRİNÇ", "TAVUK"], // Orta - 4-5 harf
    3: ["HİNDİSTAN CEVİZİ", "PAPAYA", "GUAVA", "LİÇİ", "BÖĞÜRTLEN", "AHUDUDU", "YABAN MERSİNİ", "KUŞKONMAZ", "ENGİNAR", "BROKOLİ", "KEREVİZ", "TURP", "PANCAR", "BAMYA", "KARNABAHAR", "SARIMSAK", "ZENCEFİL", "TARÇIN", "KEKİK", "NANE", "SUSAM", "HAŞHAŞ", "KİNOA", "ROKA", "SOMON"]  // Zor - 5+ harf
  },
  Bilim: {
    1: ["ATOM", "HÜCRE", "GEZEGEN", "YILDIZ", "GÜNEŞ", "DÜNYA", "SU", "HAVA", "ATEŞ", "IŞIK", "SES", "ISI", "ENERJİ", "KUVVET", "MADDE", "UZAY", "BİLİM", "DENEY", "GÖZLEM", "TEORİ", "YASA", "RAKAM", "SAYI", "DOĞA", "CANLI"], // Kolay - 3-4 harf
    2: ["MOLEKÜL", "ELEMENT", "BİLEŞİK", "ASİT", "BAZ", "METAL", "MIKNATIS", "ELEKTRİK", "MANYETİZMA", "DALGA", "FREKANS", "GEN", "DNA", "VİRÜS", "BAKTERİ", "EVRİM", "FOTOSENTEZ", "SOLUNUM", "EKOSİSTEM", "FOSİL", "KRAL", "GALAKSİ", "ENZİM", "MİTOS", "HİPOTEZ"], // Orta - 4-5 harf
    3: ["KUANTUM", "GÖRELİLİK", "KARA DELİK", "SOLUCAN DELİĞİ", "BÜYÜK PATLAMA", "SÜPERNOVA", "NEBULA", "KOZMOS", "ASTRONOMİ", "BİYOLOJİ", "KİMYA", "FİZİK", "JEOLOJİ", "GENETİK", "NÖROBİLİM", "PSİKOLOJİ", "ANTROPOLOJİ", "ARKEOLOJİ", "EKOLOJİ", "METEOROLOJİ", "PLAZMA", "SİMBİYOZ", "TELESKOP", "MİKROSKOP", "PERİYODİK TABLO"]  // Zor - 5+ harf
  },
  Ülkeler: {
    1: ["TÜRKİYE", "ALMANYA", "FRANSA", "İTALYA", "İSPANYA", "İNGİLTERE", "RUSYA", "ÇİN", "JAPONYA", "AMERİKA", "KANADA", "BREZİLYA", "MISIR", "HİNDİSTAN", "YUNANİSTAN", "İRAN", "IRAK", "SURİYE", "AVUSTRALYA", "MEKSİKA", "HOLLANDA", "İSVİÇRE", "İSVEÇ", "NORVEÇ", "PORTEKİZ"], // Kolay - 3-4 harf
    2: ["FİNLANDİYA", "DANİMARKA", "POLONYA", "AVUSTURYA", "MACARİSTAN", "ÇEK CUMHURİYETİ", "BELÇİKA", "İRLANDA", "ROMANYA", "UKRAYNA", "KAZAKİSTAN", "ÖZBEKİSTAN", "AZERBAYCAN", "GÜRCİSTAN", "PAKİSTAN", "AFGANİSTAN", "ENDONEZYA", "MALEZYA", "TAYLAND", "VİETNAM", "FİLİPİNLER", "ARJANTİN", "ŞİLİ", "PERU", "KOLOMBİYA"], // Orta - 4-5 harf
    3: ["YENİ ZELANDA", "FİJİ", "KAMBOÇYA", "LAOS", "MYANMAR", "BANGLADEŞ", "NEPAL", "MOĞOLİSTAN", "KÜBA", "JAMAİKA", "VENEZUELA", "EKVADOR", "NİJERYA", "GANA", "KENYA", "ETİYOPYA", "GÜNEY AFRİKA", "TANZANYA", "CEZAYİR", "FAS", "LÜBNAN", "ÜRDÜN", "KATAR", "KUVEYT", "LÜKSEMBURG"]  // Zor - 5+ harf
  },
  Meslekler: {
    1: ["DOKTOR", "ÖĞRETMEN", "MÜHENDİS", "AVUKAT", "POLİS", "ASKER", "HEMŞİRE", "İTFAİYECİ", "AŞÇI", "GARSON", "ŞOFÖR", "TERZİ", "BERBER", "MANAV", "KASAP", "FIRINCI", "POSTACI", "MEMUR", "İŞÇİ", "ÇİFTÇİ", "PİLOT", "MİMAR", "HAKİM", "SAVCI", "ECZACI"], // Kolay - 3-4 harf
    2: ["DİŞ HEKİMİ", "VETERİNER", "PSİKOLOG", "YAZAR", "GAZETECİ", "RESSAM", "MÜZİSYEN", "AKTÖR", "YÖNETMEN", "SPORCU", "ANTRENÖR", "KAPTAN", "ASTRONOT", "BİLİM İNSANI", "ARKEOLOG", "TARİHÇİ", "EKONOMİST", "HEYKELTRAŞ", "TASARIMCI", "FOTOĞRAFÇI", "SEKRETER", "TEKNİSYEN", "MÜFETTİŞ", "REHBER", "DANIŞMAN"], // Orta - 4-5 harf
    3: ["GENETİK MÜHENDİSİ", "ASTROFİZİKÇİ", "KRİMİNOLOG", "EPİDEMİYOLOG", "SİSMOLOG", "OŞİNOGRAF", "METEOROLOG", "KÜRATÖR", "RESTORATÖR", "SİHİRBAZ", "JOKEY", "VANTROLOG", "DUBLÖR", "MUCİT", "GİRİŞİMCİ", "CEO", "ANALİST", "DENETÇİ", "KALİGRAF", "BESTECİ", "KOREOGRAF", "ANİMATÖR", "SANAT YÖNETMENİ", "HAVA TRAFİK KONTROLÖRÜ", "SİBER GÜVENLİK UZMANI"]  // Zor - 5+ harf
  },
  Şehirler: {
    1: ["İSTANBUL", "ANKARA", "İZMİR", "BURSA", "ADANA", "ANTALYA", "KONYA", "GAZİANTEP", "TRABZON", "ERZURUM", "VAN", "MARDİN", "KAYSERİ", "ESKİŞEHİR", "LONDRA", "PARİS", "ROMA", "BERLİN", "MOSKOVA", "PEKİN", "TOKYO", "NEW YORK", "KAHİRE", "ATİNA", "MADRİD"], // Kolay - 3-4 harf
    2: ["SYDNEY", "TORONTO", "LOS ANGELES", "DUBAİ", "BARSELONA", "AMSTERDAM", "VİYANA", "PRAG", "BUDAPEŞTE", "VARŞOVA", "KİEV", "STOKHOLM", "OSLO", "KOPENHAG", "HELSİNKİ", "LİZBON", "DUBLİN", "BRÜKSEL", "CENEVRE", "ZÜRİH", "SEUL", "SİNGAPUR", "BANGKOK", "RİO DE JANEİRO", "BUENOS AİRES"], // Orta - 4-5 harf
    3: ["KUDÜS", "MEKKE", "BAĞDAT", "ŞAM", "İSKENDERİYE", "KARTACA", "BABİL", "EFES", "TROYA", "MACHU PICCHU", "PETRA", "POMPEİ", "TİMBKTU", "KYOTO", "MARAKEŞ", "KATMANDU", "HAVANA", "REYKJAVİK", "FLORANSA", "VENEDİK", "EDİNBURG", "LİMA", "SEVİLLA", "ST. PETERSBURG", "KRAKOW"]  // Zor - 5+ harf
  },
  Markalar: {
    1: ["NIKE", "ADIDAS", "PUMA", "COCA-COLA", "PEPSI", "MCDONALD'S", "STARBUCKS", "APPLE", "SAMSUNG", "GOOGLE", "MICROSOFT", "AMAZON", "TOYOTA", "FORD", "BMW", "MERCEDES", "SONY", "LG", "IKEA", "ZARA", "LEGO", "NESCAFE", "LAYS", "MİGROS", "ARÇELİK"], // Kolay - 3-4 harf
    2: ["GUCCI", "PRADA", "CHANEL", "ROLEX", "FERRARI", "LAMBORGHINI", "PORSCHE", "TESLA", "INTEL", "NVIDIA", "IBM", "HP", "DELL", "CANON", "NIKON", "GILLETTE", "COLGATE", "LOREAL", "NESTLE", "DANONE", "PHILIPS", "BOSE", "RED BULL", "VESTEL", "BEKO"], // Orta - 4-5 harf
    3: ["HERMES", "BURBERRY", "CARTIER", "PATAGONIA", "LULULEMON", "UNDER ARMOUR", "SPACEX", "BOEING", "AIRBUS", "ORACLE", "SAP", "CISCO", "QUALCOMM", "ARM", "CAT", "JOHN DEERE", "ROLLS-ROYCE", "BREITLING", "TAG HEUER", "JEEP", "LAND ROVER", "HARLEY-DAVIDSON", "BIC", "FABER-CASTELL", "3M"]  // Zor - 5+ harf
  },
  "Spor Dalları": {
    1: ["FUTBOL", "BASKETBOL", "VOLEYBOL", "TENİS", "YÜZME", "ATLETİZM", "GÜREŞ", "BOKS", "HALTER", "CİMNASTİK", "MASA TENİSİ", "HENTBOL", "BİSİKLET", "KOŞU", "YÜRÜYÜŞ", "KAYAK", "BUZ PATENİ", "KARATE", "TEKVANDO", "JUDO", "ESKRİM", "OKÇULUK", "ATICILIK", "GOLF", "BİNİCİLİK"], // Kolay - 3-4 harf
    2: ["AMERİKAN FUTBOLU", "BEYZBOL", "KRİKET", "RAGBİ", "HOKEY", "SU TOPU", "KÜREK", "YELKEN", "SÖRF", "DALIŞ", "TIRMANIŞ", "DAĞCILIK", "POLO", "MODERN PENTATLON", "TRİATLON", "BİATLON", "KÖRİLİNG", "SKELETON", "BADMİNTON", "KANO", "BOCCE", "BİLARDO", "DART", "BOWLING", "MUAY THAİ"], // Orta - 4-5 harf
    3: ["SU ALTI HOKEYİ", "SEPPAK TAKRAW", "KABADDI", "JAI ALAI", "BOSSABALL", "ROLLER DERBY", "ULTIMATE FRİSBEE", "PARKOUR", "UÇURTMA SÖRFÜ", "YAMAÇ PARAŞÜTÜ", "BASE ATLAMA", "BUZ TIRMANIŞI", "KANYONİNG", "HELİ-KAYAK", "WİNGSUİT UÇUŞU", "SKATEBOARD", "BMX", "MOTOKROS", "F1", "RALLİ", "KİCKBOKS", "SQUASH", "RAFİNG", "TRİATLON", "SU KAYAĞI"]  // Zor - 5+ harf
  },
  Eşyalar: {
    1: ["MASA", "SANDALYE", "KOLTUK", "YATAK", "DOLAP", "KAPI", "PENCERE", "LAMBA", "AYNA", "HALI", "PERDE", "TABAK", "BARDAK", "KAŞIK", "ÇATAL", "BIÇAK", "TENCERE", "SAAT", "TELEFON", "BİLGİSAYAR", "TELEVİZYON", "KİTAP", "DEFTER", "KALEM", "GÖZLÜK"], // Kolay - 3-4 harf
    2: ["BUZDOLABI", "FIRIN", "MİKRODALGA", "ÜTÜ", "KULAKLIK", "HOPARLÖR", "YAZICI", "TARAYICI", "FOTOĞRAF MAKİNESİ", "KAMERA", "PİYANO", "GİTAR", "KEMAN", "BİSİKLET", "ÇADIR", "UYKU TULUMU", "MAT", "SIRT ÇANTASI", "VALİZ", "CÜZDAN", "ANAHTAR", "ŞEMSİYE", "MERDİVEN", "ÇEKİÇ", "TORNAVİDA"], // Orta - 4-5 harf
    3: ["TELESKOP", "MİKROSKOP", "DÜRBÜN", "PUSULA", "TERMOMETRE", "BAROMETRE", "KRONOMETRE", "PERGEL", "GÖNYE", "DAKTİLO", "GRAMOFON", "PROJEKTÖR", "DRONE", "AKILLI SAAT", "SANAL GERÇEKLİK GÖZLÜĞÜ", "3D YAZICI", "SEKSTANT", "METRONOM", "OSİLOSKOP", "DİNAMOMETRE", "AMFİ", "MİKSER", "MATKAP", "TESTERE", "MENGENE"]  // Zor - 5+ harf
  },
  "Film ve Dizi": {
    1: ["AVATAR", "TITANIC", "AVENGERS", "STAR WARS", "HARRY POTTER", "YÜZÜKLERİN EFENDİSİ", "KARAYİP KORSANLARI", "JURASSIC PARK", "ASLAN KRAL", "FORREST GUMP", "BABA", "KARA ŞÖVALYE", "MATRIX", "GLADYATÖR", "OYUNCAK HİKAYESİ", "BUZ DEVRİ", "SHREK", "HABABAM SINIFI", "TOSUN PAŞA", "SELVİ BOYLUM AL YAZMALIM", "EŞKIYA", "BABAM VE OĞLUM", "CANIM KARDEŞİM", "ÇÖPÇÜLER KRALI", "G.O.R.A."], // Kolay - 3-4 harf
    2: ["BAŞLANGIÇ", "PRESTİJ", "ZİNDAN ADASI", "AKIL OYUNLARI", "YEŞİL YOL", "ESRAETİN BEDELİ", "PARAZİT", "JOKER", "LA LA LAND", "WHIPLASH", "INTERSTELLAR", "DÖVÜŞ KULÜBÜ", "KUZULARIN SESSİZLİĞİ", "PİYANİST", "HAYAT GÜZELDİR", "AMELIE", "GLADYATÖR", "LEON", "V FOR VENDETTA", "REZERVUAR KÖPEKLERİ", "BİR ZAMANLAR ANADOLU'DA", "KIŞ UYKUSU", "MUHSİN BEY", "AĞIR ROMAN", "TABUTTA RÖVAŞATA"], // Orta - 4-5 harf
    3: ["2001: BİR UZAY DESTANI", "UCUZ ROMAN", "YEDİNCİ MÜHÜR", "STALKER", "SOLARIS", "BİSİKLET HIRSIZLARI", "TATLI HAYAT", "TAKSİ ŞOFÖRÜ", "KIZGIN BOĞA", "APOCALYPSE NOW", "BİR ZAMANLAR AMERİKA'DA", "GUGUK KUŞU", "BLADE RUNNER", "CINNET", "GELECEĞE DÖNÜŞ", "TERMINATOR 2", "ALIEN", "SCARFACE", "GOODFELLAS", "THE SHINING", "UZAK", "MASUMİYET", "KADER", "ÜÇ MAYMUN", "YOL"]  // Zor - 5+ harf
  }
};

export function getWordByDifficulty(category: string, difficulty: number, usedWords: string[] = []): string {
  const categoryWords = wordLists[category];
  if (!categoryWords) return '';
  
  const words = categoryWords[difficulty as keyof WordList] || [];
  const availableWords = words.filter(word => !usedWords.includes(word));
  
  if (availableWords.length === 0) {
    // If no unused words, return a random word from the category
    return words[Math.floor(Math.random() * words.length)] || '';
  }
  
  return availableWords[Math.floor(Math.random() * availableWords.length)] || '';
}