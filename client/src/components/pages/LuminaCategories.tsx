import { memo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useGameStats } from '@/hooks/useGameStats';
import { useCategoryProgress } from '@/hooks/useCategoryProgress';

interface LuminaCategoriesProps {
  onGameStart: (category: string, difficulty: string) => void;
  onBack: () => void;
}

export const LuminaCategories = memo(({ onGameStart, onBack }: LuminaCategoriesProps) => {
  const { isAuthenticated } = useAuth();
  const { stats } = useGameStats();
  const { progress } = useCategoryProgress();
  
  // Yeni sistem: Önce zorluk, sonra kategori
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setSelectedCategory(null); // Kategori seçimini sıfırla
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const handleStartGame = () => {
    if (selectedDifficulty && selectedCategory) {
      onGameStart(selectedCategory, selectedDifficulty);
    }
  };

  const handleBackToDifficulty = () => {
    setSelectedDifficulty(null);
    setSelectedCategory(null);
  };
  const baseCategories = [
    { id: 1, name: "Hayvanlar", emoji: "🐾", color: "#059669, #047857", total: 100 },
    { id: 2, name: "Yiyecek", emoji: "🍎", color: "#dc2626, #b91c1c", total: 80 },
    { id: 3, name: "Bilim", emoji: "🔬", color: "#7c3aed, #6d28d9", total: 75 },
    { id: 4, name: "Ülkeler", emoji: "🌍", color: "#2563eb, #1d4ed8", total: 150 },
    { id: 5, name: "Meslekler", emoji: "👨‍💼", color: "#4338ca, #3730a3", total: 60 },
    { id: 6, name: "Şehirler", emoji: "🏙️", color: "#0891b2, #0e7490", total: 70 },
    { id: 7, name: "Spor Dalları", emoji: "⚽", color: "#ea580c, #c2410c", total: 60 },
    { id: 8, name: "Markalar", emoji: "🏷️", color: "#c026d3, #a21caf", total: 50 },
    { id: 9, name: "Filmler", emoji: "🎬", color: "#db2777, #be185d", total: 90 },
    { id: 10, name: "Eşyalar", emoji: "📱", color: "#374151, #1f2937", total: 80 }
  ];

  // Database verilerini kategorilerle birleştir
  const categories = baseCategories.map(category => ({
    ...category,
    completed: isAuthenticated && progress ? (progress.categories[category.name] || 0) : 0
  }));


  // Zorluk seviyeleri tanımı
  const difficulties = [
    { 
      id: 'kolay', 
      name: 'KOLAY', 
      emoji: '😊', 
      description: 'Başlangıç',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-gradient-to-br from-green-100 to-green-200',
      textColor: 'text-green-900',
      borderColor: 'border-green-500'
    },
    { 
      id: 'orta', 
      name: 'ORTA', 
      emoji: '😐', 
      description: 'Deneyimli',
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
      textColor: 'text-yellow-900',
      borderColor: 'border-yellow-500'
    },
    { 
      id: 'zor', 
      name: 'ZOR', 
      emoji: '😤', 
      description: 'Uzman',
      color: 'from-red-400 to-red-600',
      bgColor: 'bg-gradient-to-br from-red-100 to-red-200',
      textColor: 'text-red-900',
      borderColor: 'border-red-500'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Floating background elements - Ana sayfadan birebir */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-white/10 animate-float-slow"></div>
        <div className="absolute top-1/4 -right-16 w-32 h-32 rounded-full bg-yellow-300/20 animate-float-medium"></div>
        <div className="absolute bottom-1/4 -left-16 w-36 h-36 rounded-full bg-pink-300/15 animate-float-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-16 right-1/4 w-28 h-28 rounded-full bg-cyan-300/20 animate-float-medium" style={{ animationDelay: '2s' }}></div>
        
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 12 + 8}px`,
              height: `${Math.random() * 12 + 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-gentle ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen p-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Button 
            onClick={selectedDifficulty ? handleBackToDifficulty : onBack}
            variant="outline" className="p-2 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30">
            <ChevronLeft className="w-3 h-3" />
          </Button>
          <div className="text-center">
            <h1 className="text-xl font-black text-white">
              {selectedDifficulty ? `${difficulties.find(d => d.id === selectedDifficulty)?.name} - Kategoriler` : ''}
            </h1>
          </div>
          <div className="w-6"></div>
        </div>

        {/* Zorluk seçimi yoksa - Ana Sayfa Teması ile Zorluk Seçim Ekranı */}
        {!selectedDifficulty && (
          <div className="w-full max-w-md mx-auto space-y-4">
            {/* LUMINA Logo ve başlık - Ana sayfadan */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 rounded-full animate-pulse opacity-80"></div>
                <div className="absolute inset-2 bg-white rounded-full shadow-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-3xl font-black text-purple-600">L</div>
                </div>
              </div>
              <h1 className="text-4xl font-black text-white mb-3 tracking-wide">ZORLUK SEVİYESİ</h1>
            </div>

            {/* Zorluk butonları - Ana sayfa tarzı Card içinde Button */}
            <div className="space-y-4">
              {/* Kolay seviye */}
              <Card className="p-6 bg-white rounded-3xl shadow-2xl border-0">
                <Button 
                  onClick={() => handleDifficultySelect('kolay')}
                  className="w-full h-16 rounded-2xl font-bold text-white shadow-xl" 
                  style={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                  }}
                  data-testid="difficulty-kolay"
                >
                  <div className="text-2xl mr-3">😊</div>
                  <div>
                    <div className="text-lg font-black">KOLAY</div>
                    <div className="text-sm opacity-90">Başlangıç Seviyesi</div>
                  </div>
                </Button>
              </Card>

              {/* Orta seviye */}
              <Card className="p-6 bg-white rounded-3xl shadow-2xl border-0">
                <Button 
                  onClick={() => handleDifficultySelect('orta')}
                  className="w-full h-16 rounded-2xl font-bold text-white shadow-xl" 
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                  }}
                  data-testid="difficulty-orta"
                >
                  <div className="text-2xl mr-3">😐</div>
                  <div>
                    <div className="text-lg font-black">ORTA</div>
                    <div className="text-sm opacity-90">Deneyimli Seviye</div>
                  </div>
                </Button>
              </Card>

              {/* Zor seviye */}
              <Card className="p-6 bg-white rounded-3xl shadow-2xl border-0">
                <Button 
                  onClick={() => handleDifficultySelect('zor')}
                  className="w-full h-16 rounded-2xl font-bold text-white shadow-xl" 
                  style={{
                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
                  }}
                  data-testid="difficulty-zor"
                >
                  <div className="text-2xl mr-3">😤</div>
                  <div>
                    <div className="text-lg font-black">ZOR</div>
                    <div className="text-sm opacity-90">Uzman Seviye</div>
                  </div>
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* Zorluk seçildiyse - Ana Sayfa Teması ile Kategori Seçim Ekranı */}
        {selectedDifficulty && (
          <div className="w-full max-w-md mx-auto space-y-4">
            {/* LUMINA Logo - Zorluk sayfasındaki gibi */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 rounded-full animate-pulse opacity-80"></div>
                <div className="absolute inset-2 bg-white rounded-full shadow-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-3xl font-black text-purple-600">L</div>
                </div>
              </div>
              <h1 className="text-4xl font-black text-white mb-3 tracking-wide">KATEGORİLER</h1>
            </div>

            {/* Kategori grid - Ana sayfa tarzı 2x5 */}
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
              {categories.map((category, index) => (
                <Card key={category.id} className="p-3 bg-white/95 rounded-2xl shadow-xl border-0 h-32">
                  <Button 
                    onClick={() => handleCategorySelect(category.name)}
                    className={`w-full h-full rounded-xl font-bold text-white border-0 shadow-lg transition-all duration-300 ${
                      selectedCategory === category.name 
                        ? 'scale-105 shadow-2xl ring-2 ring-blue-400' 
                        : 'hover:scale-[1.02]'
                    }`}
                    style={{
                      background: selectedCategory === category.name 
                        ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)' 
                        : `linear-gradient(135deg, ${category.color})`
                    }}
                    data-testid={`category-${category.name}`}
                  >
                    <div className="flex flex-col items-center justify-center h-full p-2">
                      <div className="text-2xl mb-1">{category.emoji}</div>
                      <div className="text-xs font-black text-center leading-tight mb-1">{category.name}</div>
                      <div className="text-xs opacity-90">
                        %{Math.round((category.completed / category.total) * 100)}
                      </div>
                      {selectedCategory === category.name && (
                        <div className="text-xs opacity-90 mt-1">✓</div>
                      )}
                    </div>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}



        {/* Ana Sayfa Teması - Oyun Başlatma */}
        {selectedDifficulty && selectedCategory && (
          <div className="w-full max-w-md mx-auto space-y-4">
            {/* Seçim özeti - Ana sayfa tarzında basit */}
            <div className="text-center mb-4">
              <h3 className="text-2xl font-black text-white mb-1">HAZIR MISIN?</h3>
              <p className="text-white/80 font-semibold text-sm">
                {selectedCategory} • {difficulties.find(d => d.id === selectedDifficulty)?.name}
              </p>
            </div>
            
            {/* Ana Sayfa Buton Tarzında */}
            <Card className="p-6 bg-white rounded-3xl shadow-2xl border-0">
              <Button 
                onClick={handleStartGame}
                className="w-full h-20 rounded-2xl text-2xl font-black shadow-xl text-white" 
                style={{
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                }}
                data-testid="start-game-button"
              >
                <div className="text-3xl mr-4">🎮</div>
                OYUNA BAŞLA
              </Button>
            </Card>
          </div>
        )}

        {/* Stats moved to dedicated stats page */}
      </div>

      <style>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); opacity: 0.6; }
          50% { transform: translateY(-12px); opacity: 1; }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          75% { transform: translateY(-5px) translateX(-3px); }
        }
        
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.3); }
          50% { box-shadow: 0 0 40px rgba(255,255,255,0.6); }
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255,255,255,0.1);
        }
        
        .bg-gradient-conic {
          background: conic-gradient(from 0deg, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
});

LuminaCategories.displayName = 'LuminaCategories';