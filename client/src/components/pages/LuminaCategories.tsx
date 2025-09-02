import { memo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useGameStats } from '@/hooks/useGameStats';

interface LuminaCategoriesProps {
  onGameStart: (category: string, difficulty: string) => void;
  onBack: () => void;
}

export const LuminaCategories = memo(({ onGameStart, onBack }: LuminaCategoriesProps) => {
  const { isAuthenticated } = useAuth();
  const { stats } = useGameStats();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>('kolay'); // Varsayılan olarak kolay seçili

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    // Kolay seviye seçili kalsın, sıfırlanmasın
    if (!selectedDifficulty) {
      setSelectedDifficulty('kolay');
    }
  };

  const handleDifficultySelect = (difficulty: string, categoryName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCategory(categoryName);
    setSelectedDifficulty(difficulty);
  };

  const handleStartGame = () => {
    if (selectedCategory && selectedDifficulty) {
      onGameStart(selectedCategory, selectedDifficulty);
    }
  };
  const categories = [
    { id: 1, name: "Hayvanlar", emoji: "🐾", color: "from-green-400 to-blue-500", completed: 85, total: 100 },
    { id: 2, name: "Yiyecek", emoji: "🍎", color: "from-red-400 to-pink-500", completed: 67, total: 80 },
    { id: 3, name: "Bilim", emoji: "🔬", color: "from-purple-400 to-indigo-500", completed: 42, total: 75 },
    { id: 4, name: "Ülkeler", emoji: "🌍", color: "from-blue-400 to-cyan-500", completed: 123, total: 150 },
    { id: 5, name: "Meslekler", emoji: "👨‍💼", color: "from-indigo-400 to-blue-500", completed: 34, total: 60 },
    { id: 6, name: "Şehirler", emoji: "🏙️", color: "from-teal-400 to-cyan-500", completed: 45, total: 70 },
    { id: 7, name: "Spor Dalları", emoji: "⚽", color: "from-orange-400 to-red-500", completed: 34, total: 60 },
    { id: 8, name: "Markalar", emoji: "🏷️", color: "from-purple-400 to-pink-500", completed: 28, total: 50 },
    { id: 9, name: "Filmler", emoji: "🎬", color: "from-pink-400 to-purple-500", completed: 78, total: 90 },
    { id: 10, name: "Eşyalar", emoji: "📱", color: "from-gray-400 to-blue-500", completed: 56, total: 80 }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 16 + 12}px`,
              height: `${Math.random() * 16 + 12}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-gentle ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={onBack}
            variant="outline" className="p-3 rounded-full bg-white/20 border-white/30 text-white hover:bg-white/30">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-black text-white">Kategoriler</h1>
            <p className="text-white/80 font-medium">Kategori kartlarındaki K/O/Z butonlarına tıkla</p>
          </div>
          <div className="w-12"></div>
        </div>

        {/* Categories grid - with embedded difficulty */}
        <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto mb-6">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className={`relative overflow-hidden border-0 shadow-lg rounded-2xl transition-all duration-300 transform cursor-pointer hover:scale-105 active:scale-95 ${
                selectedCategory === category.name && selectedDifficulty
                  ? selectedDifficulty === 'kolay' 
                    ? 'bg-gradient-to-br from-green-100 to-green-200 text-green-800 border-2 border-green-400' 
                    : selectedDifficulty === 'orta'
                    ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-800 border-2 border-yellow-400'
                    : 'bg-gradient-to-br from-red-100 to-red-200 text-red-800 border-2 border-red-400'
                  : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
              }`}
              onClick={() => handleCategorySelect(category.name)}
              data-testid={`category-${category.name}`}
            >
              <div className="p-4 text-center relative">
                <div className="text-3xl mb-2">{category.emoji}</div>
                <div className="font-black text-sm mb-3">{category.name}</div>
                
                {/* Zorluk butonları - sağ üstten alta dikey */}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  <button
                    onClick={(e) => handleDifficultySelect("kolay", category.name, e)}
                    className={`w-7 h-7 rounded-full text-sm transition-all duration-200 transform hover:scale-110 active:scale-90 shadow-lg hover:shadow-xl ring-2 ${
                      selectedCategory === category.name && selectedDifficulty === "kolay"
                        ? 'bg-green-200 ring-green-400 scale-110'
                        : 'bg-white hover:bg-green-100 active:bg-green-200 ring-green-300/50 hover:ring-green-400/80'
                    }`}
                    title="Kolay"
                    data-testid={`difficulty-${category.name}-easy`}
                  >
                    😊
                  </button>
                  <button
                    onClick={(e) => handleDifficultySelect("orta", category.name, e)}
                    className={`w-7 h-7 rounded-full text-sm transition-all duration-200 transform hover:scale-110 active:scale-90 shadow-lg hover:shadow-xl ring-2 ${
                      selectedCategory === category.name && selectedDifficulty === "orta"
                        ? 'bg-yellow-200 ring-yellow-400 scale-110'
                        : 'bg-white hover:bg-yellow-100 active:bg-yellow-200 ring-yellow-300/50 hover:ring-yellow-400/80'
                    }`}
                    title="Orta"
                    data-testid={`difficulty-${category.name}-medium`}
                  >
                    😐
                  </button>
                  <button
                    onClick={(e) => handleDifficultySelect("zor", category.name, e)}
                    className={`w-7 h-7 rounded-full text-sm transition-all duration-200 transform hover:scale-110 active:scale-90 shadow-lg hover:shadow-xl ring-2 ${
                      selectedCategory === category.name && selectedDifficulty === "zor"
                        ? 'bg-red-200 ring-red-400 scale-110'
                        : 'bg-white hover:bg-red-100 active:bg-red-200 ring-red-300/50 hover:ring-red-400/80'
                    }`}
                    title="Zor"
                    data-testid={`difficulty-${category.name}-hard`}
                  >
                    😤
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>



        {/* Oyna Butonu - sadece kategori ve zorluk seçildiğinde göster */}
        {selectedCategory && selectedDifficulty && (
          <div className="max-w-md mx-auto mb-6">
            <div className="text-center mb-4">
              <h3 className="text-xl font-black text-white">{selectedCategory}</h3>
              <p className="text-white/80 font-medium">Zorluk: {selectedDifficulty === 'kolay' ? 'Kolay' : selectedDifficulty === 'orta' ? 'Orta' : 'Zor'}</p>
            </div>
            
            <button
              onClick={handleStartGame}
              className="w-full rounded-2xl font-black text-white shadow-xl border-0 py-4 text-lg transition-all duration-300 transform active:scale-95 hover:scale-105 animate-pulse hover:animate-none"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
              data-testid="start-game-button"
            >
              🚀 Oyunu Başlat
            </button>
          </div>
        )}

        {/* Bottom stats - Useful player information */}
        <div className="mt-8 text-center">
          <Card className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 max-w-sm mx-auto">
            <div className="flex items-center justify-around text-white">
              <div>
                {isAuthenticated && stats ? (
                  <>
                    <div className="text-lg font-black">Seviye {Math.floor(stats.totalScore / 500) + 1}</div>
                    <div className="text-xs opacity-80">{stats.totalScore % 500}/500 puan</div>
                  </>
                ) : (
                  <>
                    <div className="text-lg font-black">Seviye 1</div>
                    <div className="text-xs opacity-80">0/500 puan</div>
                  </>
                )}
              </div>
              <div className="w-px h-8 bg-white/30"></div>
              <div>
                {isAuthenticated && stats ? (
                  <>
                    <div className="text-lg font-black">{Math.floor(stats.gamesPlayed / 10)}/10</div>
                    <div className="text-xs opacity-80">Tamamlanan</div>
                  </>
                ) : (
                  <>
                    <div className="text-lg font-black">0/10</div>
                    <div className="text-xs opacity-80">Tamamlanan</div>
                  </>
                )}
              </div>
              <div className="w-px h-8 bg-white/30"></div>
              <div>
                {isAuthenticated && stats && stats.gamesPlayed > 0 ? (
                  <>
                    <div className="text-lg font-black">Hayvanlar</div>
                    <div className="text-xs opacity-80">Son oyun</div>
                  </>
                ) : (
                  <>
                    <div className="text-lg font-black">-</div>
                    <div className="text-xs opacity-80">Son oyun</div>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); opacity: 0.6; }
          50% { transform: translateY(-12px); opacity: 1; }
        }
      `}</style>
    </div>
  );
});

LuminaCategories.displayName = 'LuminaCategories';