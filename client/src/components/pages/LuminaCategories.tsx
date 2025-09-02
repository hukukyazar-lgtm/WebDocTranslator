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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryDifficulties, setCategoryDifficulties] = useState<Record<string, string>>({});

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    // Eğer bu kategori için zorluk seçimi yoksa, kolay olarak ayarla
    if (!categoryDifficulties[categoryName]) {
      setCategoryDifficulties(prev => ({
        ...prev,
        [categoryName]: 'kolay'
      }));
    }
  };

  const handleDifficultySelect = (difficulty: string, categoryName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCategory(categoryName);
    setCategoryDifficulties(prev => ({
      ...prev,
      [categoryName]: difficulty
    }));
  };

  const handleStartGame = () => {
    if (selectedCategory && categoryDifficulties[selectedCategory]) {
      onGameStart(selectedCategory, categoryDifficulties[selectedCategory]);
    }
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
              className={`relative overflow-hidden border-0 rounded-2xl transition-all duration-300 transform cursor-pointer hover:scale-105 ${
                selectedCategory === category.name
                  ? 'shadow-2xl scale-105 z-10' // Seçili kategori daha büyük ve önde
                  : categoryDifficulties[category.name] 
                  ? 'shadow-md'
                  : 'shadow-lg'
              } ${
                categoryDifficulties[category.name]
                  ? categoryDifficulties[category.name] === 'kolay' 
                    ? selectedCategory === category.name
                      ? 'bg-gradient-to-br from-green-200 to-green-300 text-green-900 border-4 border-green-500' // Daha parlak seçili
                      : 'bg-gradient-to-br from-green-100 to-green-200 text-green-800 border-2 border-green-400'
                    : categoryDifficulties[category.name] === 'orta'
                    ? selectedCategory === category.name
                      ? 'bg-gradient-to-br from-yellow-200 to-yellow-300 text-yellow-900 border-4 border-yellow-500'
                      : 'bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-800 border-2 border-yellow-400'
                    : selectedCategory === category.name
                    ? 'bg-gradient-to-br from-red-200 to-red-300 text-red-900 border-4 border-red-500'
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
                    className={`w-7 h-7 rounded-full text-sm transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl ring-2 ${
                      categoryDifficulties[category.name] === "kolay"
                        ? 'bg-green-200 ring-green-400 scale-110 active:scale-100'
                        : 'bg-white hover:bg-green-100 ring-green-300/50 hover:ring-green-400/80 active:scale-90'
                    }`}
                    title="Kolay"
                    data-testid={`difficulty-${category.name}-easy`}
                  >
                    😊
                  </button>
                  <button
                    onClick={(e) => handleDifficultySelect("orta", category.name, e)}
                    className={`w-7 h-7 rounded-full text-sm transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl ring-2 ${
                      categoryDifficulties[category.name] === "orta"
                        ? 'bg-yellow-200 ring-yellow-400 scale-110 active:scale-100'
                        : 'bg-white hover:bg-yellow-100 ring-yellow-300/50 hover:ring-yellow-400/80 active:scale-90'
                    }`}
                    title="Orta"
                    data-testid={`difficulty-${category.name}-medium`}
                  >
                    😐
                  </button>
                  <button
                    onClick={(e) => handleDifficultySelect("zor", category.name, e)}
                    className={`w-7 h-7 rounded-full text-sm transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl ring-2 ${
                      categoryDifficulties[category.name] === "zor"
                        ? 'bg-red-200 ring-red-400 scale-110 active:scale-100'
                        : 'bg-white hover:bg-red-100 ring-red-300/50 hover:ring-red-400/80 active:scale-90'
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
        {selectedCategory && categoryDifficulties[selectedCategory] && (
          <div className="max-w-md mx-auto mb-6">
            <div className="text-center mb-4">
              <h3 className="text-xl font-black text-white">{selectedCategory}</h3>
              <p className="text-white/80 font-medium">Zorluk: {categoryDifficulties[selectedCategory] === 'kolay' ? 'Kolay' : categoryDifficulties[selectedCategory] === 'orta' ? 'Orta' : 'Zor'}</p>
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