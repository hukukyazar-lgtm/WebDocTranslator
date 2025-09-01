import { useState, useEffect, memo } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GameStats } from '@/components/game/GameStats';
import { GameStats as GameStatsType, Achievement, getDefaultAchievements, getDefaultDailyGoals } from '@/lib/gameUtils';
import { Crown, Users, Zap, Trophy, Play, Settings } from 'lucide-react';

export const Dashboard = memo(() => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  
  const handleSettingsClick = () => {
    setShowSettings(true);
  };
  
  const handleCloseSettings = () => {
    setShowSettings(false);
  };
  
  // Prevent body scrolling on dashboard
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);
  
  // Use defaults for now - optimized for performance
  const stats = {
    totalGamesPlayed: 0,
    totalCorrectGuesses: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalScore: 0,
    averageGuessTime: 0,
    categoryExpertise: {},
    achievements: [], // Empty for faster load
    dailyGoals: [], // Empty for faster load
    lastPlayedDate: new Date().toDateString()
  };

  const gameModes = [
    {
      id: 'single',
      title: 'Tek Kişilik',
      description: 'Klasik WordSpin Pro deneyimi',
      icon: <Crown className="h-8 w-8" />,
      color: 'from-blue-500 to-purple-600',
      available: true,
      path: '/category'
    },
    {
      id: 'duo',
      title: 'İki Kişilik',
      description: 'Arkadaşınla yarış!',
      icon: <Users className="h-8 w-8" />,
      color: 'from-green-500 to-blue-500',
      available: false, // Coming soon
      path: '/game/duo'
    },
    {
      id: 'multiplayer',
      title: 'Çoklu Oyuncu',
      description: 'Online turnuvalar',
      icon: <Trophy className="h-8 w-8" />,
      color: 'from-orange-500 to-red-500',
      available: false, // Coming soon
      path: '/game/multiplayer'
    }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Header - Mobil uyumlu */}
      <div className="flex items-center justify-between p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-2xl sm:text-3xl">👁️</div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-white">LUMINA</h1>
            <p className="text-xs sm:text-sm text-white/60">WordSpin Pro</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-white border-white/20 text-xs sm:text-sm hover:bg-white/10 transition-colors"
          onClick={handleSettingsClick}
        >
          <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Ayarlar</span>
          <span className="sm:hidden">⚙️</span>
        </Button>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 space-y-3 sm:space-y-4 pb-6">
        {/* Game Stats - Kompakt */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4" />
              İstatistikleriniz
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-3 sm:pb-4">
            <GameStats
              score={stats.totalScore}
              streak={stats.currentStreak}
              correctGuesses={stats.totalCorrectGuesses}
              averageTime={stats.averageGuessTime}
              language="tr"
            />
          </CardContent>
        </Card>

        {/* Game Modes - Kompakt */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center gap-2 text-sm">
              <Play className="h-4 w-4" />
              Oyun Modları
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {gameModes.map((mode) => (
              <Card 
                key={mode.id}
                className={`bg-white/5 border-white/20 transition-all duration-300 cursor-pointer ${
                  selectedMode === mode.id ? 'ring-2 ring-white/40 scale-105' : 'hover:scale-105'
                } ${!mode.available ? 'opacity-60' : ''}`}
                onClick={() => mode.available && setSelectedMode(mode.id)}
              >
                <CardContent className="p-3 sm:p-6 text-center">
                  {mode.id === 'single' ? (
                    <>
                      <div className={`inline-flex p-2 sm:p-4 rounded-full bg-gradient-to-r ${mode.color} mb-2 sm:mb-4`}>
                        <div className="text-white text-sm sm:text-base">
                          {mode.icon}
                        </div>
                      </div>
                      <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2">{mode.title}</h3>
                      <p className="text-xs sm:text-sm text-white/60 mb-2 sm:mb-4">{mode.description}</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2">{mode.title}</h3>
                      <p className="text-xs sm:text-sm text-white/60 mb-2 sm:mb-4">{mode.description}</p>
                    </>
                  )}
                  
                  {mode.available ? (
                    <Link href={mode.path}>
                      <Button 
                        className={`w-full bg-gradient-to-r ${mode.color} text-white border-none hover:opacity-90`}
                        size="sm"
                      >
                        Başla
                      </Button>
                    </Link>
                  ) : (
                    <Badge variant="secondary" className="bg-white/20 text-white/80">
                      Yakında
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Recent Achievements - Kompakt */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center gap-2 text-sm">
              <Trophy className="h-4 w-4" />
              Son Başarımlar
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {stats.achievements
                .filter((achievement: Achievement) => achievement.unlocked)
                .slice(0, 4)
                .map((achievement: Achievement, index: number) => (
                  <div 
                    key={achievement.id}
                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="text-lg sm:text-2xl flex-shrink-0">{achievement.emoji}</div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-white text-xs sm:text-sm truncate">{achievement.name}</h4>
                      <p className="text-xs text-white/60 line-clamp-2">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              
              {stats.achievements.filter((a: Achievement) => a.unlocked).length === 0 && (
                <div className="text-center text-white/60 py-4 sm:py-8 col-span-full">
                  <Trophy className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 opacity-40" />
                  <p className="text-xs sm:text-sm">Henüz başarım kazanmadınız. Oyuna başlayın!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={handleCloseSettings}></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-md animate-scale-in">
            <div className="backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
            }}>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">👁️</div>
                  <div>
                    <h2 className="text-xl font-bold text-white">LUMINA Ayarları</h2>
                    <p className="text-sm text-white/60">WordSpin Pro</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseSettings}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Settings Content */}
              <div className="space-y-4">
                {/* Tema */}
                <div className="backdrop-blur-lg rounded-xl p-4 border border-white/20" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
                }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-lg">🎨</div>
                      <div>
                        <h3 className="font-semibold text-white">Koyu Tema</h3>
                        <p className="text-xs text-white/60">Göz dostu karanlık mod</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30">
                      Aktif
                    </div>
                  </div>
                </div>

                {/* Dil */}
                <div className="backdrop-blur-lg rounded-xl p-4 border border-white/20" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
                }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-lg">🇹🇷</div>
                      <div>
                        <h3 className="font-semibold text-white">Türkçe</h3>
                        <p className="text-xs text-white/60">Varsayılan oyun dili</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full border border-blue-500/30">
                      Seçili
                    </div>
                  </div>
                </div>

                {/* Performans */}
                <div className="backdrop-blur-lg rounded-xl p-4 border border-white/20" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
                }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-lg">⚡</div>
                      <div>
                        <h3 className="font-semibold text-white">Yüksek Performans</h3>
                        <p className="text-xs text-white/60">Optimize edilmiş animasyonlar</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full border border-yellow-500/30">
                      Açık
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="text-center">
                  <p className="text-xs text-white/60">
                    LUMINA WordSpin Pro v2025.1
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    💎 Premium Türkçe Kelime Oyunu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

Dashboard.displayName = 'Dashboard';