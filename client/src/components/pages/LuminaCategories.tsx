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
    { id: 1, name: "Hayvanlar", emoji: "🐾", color: "from-green-400 to-blue-500", total: 100 },
    { id: 2, name: "Yiyecek", emoji: "🍎", color: "from-red-400 to-pink-500", total: 80 },
    { id: 3, name: "Bilim", emoji: "🔬", color: "from-purple-400 to-indigo-500", total: 75 },
    { id: 4, name: "Ülkeler", emoji: "🌍", color: "from-blue-400 to-cyan-500", total: 150 },
    { id: 5, name: "Meslekler", emoji: "👨‍💼", color: "from-indigo-400 to-blue-500", total: 60 },
    { id: 6, name: "Şehirler", emoji: "🏙️", color: "from-teal-400 to-cyan-500", total: 70 },
    { id: 7, name: "Spor Dalları", emoji: "⚽", color: "from-orange-400 to-red-500", total: 60 },
    { id: 8, name: "Markalar", emoji: "🏷️", color: "from-purple-400 to-pink-500", total: 50 },
    { id: 9, name: "Filmler", emoji: "🎬", color: "from-pink-400 to-purple-500", total: 90 },
    { id: 10, name: "Eşyalar", emoji: "📱", color: "from-gray-400 to-blue-500", total: 80 }
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
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 8 + 6}px`,
              height: `${Math.random() * 8 + 6}px`,
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
              {selectedDifficulty ? `${difficulties.find(d => d.id === selectedDifficulty)?.name} - Kategoriler` : 'Zorluk Seviyesi'}
            </h1>
          </div>
          <div className="w-6"></div>
        </div>

        {/* Zorluk seçimi yoksa - Zorluk seçim ekranı */}
        {!selectedDifficulty && (
          <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto mb-3">
            {difficulties.map((difficulty) => (
              <Card 
                key={difficulty.id} 
                className={`overflow-hidden border-0 rounded-2xl transition-all duration-300 transform cursor-pointer hover:scale-105 shadow-lg hover:shadow-xl ${difficulty.bgColor} ${difficulty.textColor} border-2 ${difficulty.borderColor}`}
                onClick={() => handleDifficultySelect(difficulty.id)}
                data-testid={`difficulty-${difficulty.id}`}
              >
                <div className="p-4 text-center">
                  <div className="text-4xl mb-2">{difficulty.emoji}</div>
                  <div className="font-black text-lg mb-1">{difficulty.name}</div>
                  <div className="font-medium text-sm opacity-80">{difficulty.description}</div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Zorluk seçildiyse - Kategori seçim ekranı */}
        {selectedDifficulty && (
          <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto mb-3">
            {categories.map((category) => {
              const difficultyData = difficulties.find(d => d.id === selectedDifficulty);
              return (
                <Card 
                  key={category.id} 
                  className={`relative overflow-hidden border-0 rounded-2xl transition-all duration-300 transform cursor-pointer hover:scale-105 ${
                    selectedCategory === category.name
                      ? `shadow-2xl scale-105 z-10 ${difficultyData?.bgColor} ${difficultyData?.textColor} border-4 ${difficultyData?.borderColor}`
                      : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-lg'
                  }`}
                  onClick={() => handleCategorySelect(category.name)}
                  data-testid={`category-${category.name}`}
                >
                  <div className="p-2 text-center">
                    <div className="text-xl mb-1">{category.emoji}</div>
                    <div className="font-black text-xs mb-1">{category.name}</div>
                    {/* İlerleme göstergesi - küçük */}
                    <div className="text-xs opacity-60">
                      {category.completed}/{category.total}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}



        {/* Oyna Butonu - sadece zorluk ve kategori seçildiğinde göster */}
        {selectedDifficulty && selectedCategory && (
          <div className="max-w-xs mx-auto mb-3">
            <div className="text-center mb-2">
              <h3 className="text-lg font-black text-white">{selectedCategory}</h3>
              <p className="text-white/80 font-medium text-sm">
                Zorluk: {difficulties.find(d => d.id === selectedDifficulty)?.name}
              </p>
            </div>
            
            <button
              onClick={handleStartGame}
              className="w-full rounded-xl font-black text-white shadow-lg border-0 py-2 text-base transition-all duration-300 transform active:scale-95 hover:scale-105 animate-pulse hover:animate-none"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
              data-testid="start-game-button"
            >
              🚀 Oyunu Başlat
            </button>
          </div>
        )}

        {/* Stats moved to dedicated stats page */}
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