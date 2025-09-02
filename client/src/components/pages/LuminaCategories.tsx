import { memo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Star } from 'lucide-react';

interface LuminaCategoriesProps {
  onGameStart: (category: string, difficulty: string) => void;
  onBack: () => void;
}

export const LuminaCategories = memo(({ onGameStart, onBack }: LuminaCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedDifficulty(null); // Reset difficulty when category changes
  };

  const handleDifficultySelect = (difficulty: string) => {
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
            <p className="text-white/80 font-medium">Favori konunu seç</p>
          </div>
          <div className="w-12"></div>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
          {categories.map((category) => {
            const progress = (category.completed / category.total) * 100;
            const isCompleted = category.completed === category.total;
            
            return (
              <Card 
                key={category.id} 
                className={`relative overflow-hidden border-0 shadow-xl rounded-3xl transition-all duration-200 transform cursor-pointer hover:scale-105 active:scale-95 ${
                  selectedCategory === category.name 
                    ? 'bg-gradient-to-br from-blue-50 to-purple-50 ring-4 ring-blue-400/50' 
                    : 'bg-white hover:shadow-2xl'
                }`}
                onClick={() => handleCategorySelect(category.name)}
                data-testid={`category-${category.name}`}
              >
                <div className="p-6">
                  {/* Category header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div 
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl shadow-lg`}
                      >
                        {category.emoji}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-gray-800">{category.name}</h3>
                        <p className="text-sm text-gray-600 font-medium">
                          {category.completed}/{category.total} tamamlandı
                        </p>
                      </div>
                    </div>
                    
                    {isCompleted && (
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      </div>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600 font-semibold">İlerleme</span>
                      <span className="text-gray-800 font-bold">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full bg-gradient-to-r ${category.color} transition-all duration-500`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Selection indicator */}
                  {selectedCategory === category.name && (
                    <div className="mt-2 text-center">
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1 rounded-full">
                        ✓ Seçildi
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Completion glow effect */}
                {isCompleted && (
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 via-transparent to-yellow-300/20 pointer-events-none"></div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Difficulty Selection */}
        {selectedCategory && (
          <div className="mt-6 max-w-md mx-auto">
            <Card className="p-6 bg-white/95 backdrop-blur-sm rounded-3xl border-0 shadow-2xl">
              <div className="text-center mb-4">
                <h3 className="text-xl font-black text-gray-800">Zorluk Seçin</h3>
                <p className="text-gray-600 font-medium">{selectedCategory} kategorisi için</p>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDifficultySelect("kolay");
                  }}
                  variant="outline"
                  size="sm"
                  className={`transition-all duration-200 transform active:scale-95 font-semibold px-3 py-2 rounded-xl ${
                    selectedDifficulty === "kolay"
                      ? 'bg-green-500 text-white border-green-500 shadow-lg scale-105'
                      : 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:text-green-900'
                  }`}
                  data-testid="difficulty-easy"
                >
                  Kolay
                </Button>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDifficultySelect("orta");
                  }}
                  variant="outline"
                  size="sm"
                  className={`transition-all duration-200 transform active:scale-95 font-semibold px-3 py-2 rounded-xl ${
                    selectedDifficulty === "orta"
                      ? 'bg-yellow-500 text-white border-yellow-500 shadow-lg scale-105'
                      : 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 hover:text-yellow-900'
                  }`}
                  data-testid="difficulty-medium"
                >
                  Orta
                </Button>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDifficultySelect("zor");
                  }}
                  variant="outline"
                  size="sm"
                  className={`transition-all duration-200 transform active:scale-95 font-semibold px-3 py-2 rounded-xl ${
                    selectedDifficulty === "zor"
                      ? 'bg-red-500 text-white border-red-500 shadow-lg scale-105'
                      : 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200 hover:text-red-900'
                  }`}
                  data-testid="difficulty-hard"
                >
                  Zor
                </Button>
              </div>
              
              {/* Start Game Button */}
              {selectedCategory && selectedDifficulty && (
                <Button 
                  onClick={handleStartGame}
                  className="w-full rounded-2xl font-black text-white shadow-xl border-0 py-3 text-lg transition-all duration-200 transform active:scale-95 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                  data-testid="start-game-button"
                >
                  🎮 Oyunu Başlat
                </Button>
              )}
            </Card>
          </div>
        )}

        {/* Bottom stats */}
        <div className="mt-8 text-center">
          <Card className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 max-w-sm mx-auto">
            <div className="flex items-center justify-around text-white">
              <div>
                <div className="text-2xl font-black">429</div>
                <div className="text-sm opacity-80">Toplam Kelime</div>
              </div>
              <div className="w-px h-8 bg-white/30"></div>
              <div>
                <div className="text-2xl font-black">67%</div>
                <div className="text-sm opacity-80">Genel İlerleme</div>
              </div>
              <div className="w-px h-8 bg-white/30"></div>
              <div>
                <div className="text-2xl font-black">12</div>
                <div className="text-sm opacity-80">Rozetler</div>
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