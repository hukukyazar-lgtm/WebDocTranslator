import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Star } from 'lucide-react';

interface CodyCrossCategoriesProps {
  onCategorySelect: (category: string, difficulty: string) => void;
  onBack: () => void;
}

export const CodyCrossCategories = memo(({ onCategorySelect, onBack }: CodyCrossCategoriesProps) => {
  const categories = [
    { id: 1, name: "Hayvanlar", emoji: "🐾", color: "from-green-400 to-blue-500", completed: 85, total: 100 },
    { id: 2, name: "Yiyecekler", emoji: "🍎", color: "from-red-400 to-pink-500", completed: 67, total: 80 },
    { id: 3, name: "Bilim", emoji: "🔬", color: "from-purple-400 to-indigo-500", completed: 42, total: 75 },
    { id: 4, name: "Ülkeler", emoji: "🌍", color: "from-blue-400 to-cyan-500", completed: 123, total: 150 },
    { id: 5, name: "Spor", emoji: "⚽", color: "from-orange-400 to-red-500", completed: 34, total: 60 },
    { id: 6, name: "Müzik", emoji: "🎵", color: "from-pink-400 to-purple-500", completed: 78, total: 90 },
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
              <Card key={category.id} className="relative overflow-hidden border-0 shadow-xl rounded-3xl bg-white">
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

                  {/* Difficulty badges */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge className="bg-green-100 text-green-800 border-green-200">Kolay</Badge>
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Orta</Badge>
                      <Badge className="bg-red-100 text-red-800 border-red-200">Zor</Badge>
                    </div>
                    
                    <Button 
                      onClick={() => onCategorySelect(category.name, "3")}
                      className="rounded-xl font-bold text-white shadow-lg border-0"
                      style={{
                        background: `linear-gradient(135deg, ${category.color.split(' ')[1]}, ${category.color.split(' ')[3]})`
                      }}
                    >
                      Oyna
                    </Button>
                  </div>
                </div>

                {/* Completion glow effect */}
                {isCompleted && (
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 via-transparent to-yellow-300/20 pointer-events-none"></div>
                )}
              </Card>
            );
          })}
        </div>

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

CodyCrossCategories.displayName = 'CodyCrossCategories';