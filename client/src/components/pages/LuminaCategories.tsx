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
              {selectedDifficulty ? `${difficulties.find(d => d.id === selectedDifficulty)?.name} - Kategoriler` : 'Zorluk Seviyesi'}
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
              <p className="text-xl text-white/80 font-semibold">Hangi seviyede yarışmak istiyorsun?</p>
            </div>

            {/* Zorluk kartları - Ana sayfa buton tarzında */}
            <div className="space-y-4">
              {/* Kolay seviye */}
              <Card className="p-4 bg-white/95 rounded-2xl shadow-xl border-0">
                <Button 
                  onClick={() => handleDifficultySelect('kolay')}
                  className="w-full h-16 rounded-xl font-bold text-white border-0 shadow-lg" 
                  style={{
                    background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)'
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
              <Card className="p-4 bg-white/95 rounded-2xl shadow-xl border-0">
                <Button 
                  onClick={() => handleDifficultySelect('orta')}
                  className="w-full h-16 rounded-xl font-bold text-white border-0 shadow-lg" 
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
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
              <Card className="p-4 bg-white/95 rounded-2xl shadow-xl border-0">
                <Button 
                  onClick={() => handleDifficultySelect('zor')}
                  className="w-full h-16 rounded-xl font-bold text-white border-0 shadow-lg" 
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
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

        {/* Zorluk seçildiyse - LUMINA Gaming Style Kategori Seçim Ekranı */}
        {selectedDifficulty && (
          <div className="space-y-6 max-w-lg mx-auto">
            {/* Seçilen zorluk bilgisi */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-xl">
                <div className="text-3xl mr-3">{difficulties.find(d => d.id === selectedDifficulty)?.emoji}</div>
                <div>
                  <div className="font-black text-white text-lg">
                    {difficulties.find(d => d.id === selectedDifficulty)?.name}
                  </div>
                  <div className="text-white/80 text-sm">
                    {difficulties.find(d => d.id === selectedDifficulty)?.description} Seviye
                  </div>
                </div>
              </div>
            </div>

            {/* Kategori grid'i - LUMINA tarzı */}
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category, index) => {
                const difficultyData = difficulties.find(d => d.id === selectedDifficulty);
                return (
                  <Card 
                    key={category.id} 
                    className={`group relative overflow-hidden border-0 rounded-2xl transition-all duration-500 transform cursor-pointer hover:scale-110 active:scale-95 ${
                      selectedCategory === category.name
                        ? 'shadow-3xl scale-110 z-20 ring-4 ring-white/50'
                        : 'shadow-xl hover:shadow-2xl'
                    }`}
                    style={{
                      background: selectedCategory === category.name 
                        ? `linear-gradient(135deg, ${difficultyData?.color.replace('from-', '').replace('to-', ', ')})`
                        : `linear-gradient(135deg, ${category.color})`,
                      animationDelay: `${index * 50}ms`
                    }}
                    onClick={() => handleCategorySelect(category.name)}
                    data-testid={`category-${category.name}`}
                  >
                    {/* Spinning efekt arkaplan */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0 bg-gradient-conic from-white/30 via-transparent to-white/30 animate-spin" style={{animationDuration: '8s'}}></div>
                    </div>
                    
                    {/* Parlama efekti */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    
                    <div className="relative z-10 p-4 text-center text-white">
                      <div className="text-3xl mb-2 group-hover:animate-pulse">{category.emoji}</div>
                      <div className="font-black text-sm mb-2 drop-shadow-md">{category.name}</div>
                      
                      {/* İlerleme çemberi - LUMINA tarzı */}
                      <div className="relative w-12 h-12 mx-auto mb-2">
                        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.915 15.915 0 0 1 0 31.83 a 15.915 15.915 0 0 1 0 -31.83"
                            fill="none"
                            stroke="rgba(255,255,255,0.3)"
                            strokeWidth="2"
                          />
                          <path
                            d="M18 2.0845 a 15.915 15.915 0 0 1 0 31.83 a 15.915 15.915 0 0 1 0 -31.83"
                            fill="none"
                            stroke="rgba(255,255,255,0.9)"
                            strokeWidth="2"
                            strokeDasharray={`${(category.completed / category.total) * 100}, 100`}
                            className="transition-all duration-500"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            {Math.round((category.completed / category.total) * 100)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-xs font-medium text-white/90">
                        {category.completed}/{category.total} tamamlandı
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}



        {/* LUMINA Gaming Style - Oyun Başlatma */}
        {selectedDifficulty && selectedCategory && (
          <div className="max-w-md mx-auto space-y-6">
            {/* Seçim özeti - Gaming Style */}
            <div className="text-center">
              <div className="inline-block relative">
                <div className="absolute inset-0 bg-gradient-conic from-blue-400 via-purple-500 to-blue-400 rounded-3xl blur-md opacity-60 animate-spin" style={{animationDuration: '3s'}}></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/30">
                  <div className="text-4xl mb-3">
                    {categories.find(c => c.name === selectedCategory)?.emoji}
                  </div>
                  <h3 className="text-xl font-black text-white mb-1">{selectedCategory}</h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-lg">{difficulties.find(d => d.id === selectedDifficulty)?.emoji}</div>
                    <p className="text-white/90 font-bold text-sm">
                      {difficulties.find(d => d.id === selectedDifficulty)?.name}
                    </p>
                  </div>
                  
                  {/* Kelime sayısı bilgisi */}
                  <div className="text-white/70 text-xs font-medium">
                    {categories.find(c => c.name === selectedCategory)?.total} kelime hazır
                  </div>
                </div>
              </div>
            </div>
            
            {/* Epic Gaming Button */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-2xl blur-lg opacity-70 animate-pulse"></div>
              <button
                onClick={handleStartGame}
                className="relative w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-2xl font-black text-white shadow-2xl border-4 border-white/30 py-4 text-lg transition-all duration-300 transform active:scale-95 hover:scale-105 hover:shadow-3xl group overflow-hidden"
                data-testid="start-game-button"
              >
                {/* Button parlama efekti */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <span className="text-2xl animate-bounce">🎮</span>
                  <span>OYUNA BAŞLA</span>
                  <span className="text-2xl animate-bounce" style={{animationDelay: '0.2s'}}>⚡</span>
                </div>
              </button>
            </div>
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