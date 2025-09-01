import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Crown, Users, Trophy, Settings, Zap, Play } from 'lucide-react';
import { GameStats } from '@/components/game/GameStats';

export function Dashboard() {
  const [selectedMode, setSelectedMode] = useState('single');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const stats = {
    totalGamesPlayed: 0,
    totalCorrectGuesses: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalScore: 0,
    averageGuessTime: 0,
    categoryExpertise: {},
    achievements: [],
    dailyGoals: [],
    lastPlayedDate: new Date().toDateString()
  };

  const gameModes = [
    {
      id: 'single',
      title: 'Tek Kişilik',
      description: 'Klasik WordSpin Pro deneyimi',
      icon: <Crown className="h-8 w-8" />,
      available: true,
      path: '/category'
    },
    {
      id: 'duo',
      title: 'İki Kişilik',
      description: 'Arkadaşınla yarış!',
      icon: <Users className="h-8 w-8" />,
      available: false,
      path: '/game/duo'
    },
    {
      id: 'multiplayer',
      title: 'Çoklu Oyuncu',
      description: 'Online turnuvalar',
      icon: <Trophy className="h-8 w-8" />,
      available: false,
      path: '/game/multiplayer'
    }
  ];

  return (
    <div className="h-screen overflow-hidden" style={{
      background: 'linear-gradient(135deg, #00dccd 0%, #f8bbd9 50%, #e91e63 100%)'
    }}>
      {/* LUMINA Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-2xl sm:text-3xl">👁️</div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-white">LUMINA</h1>
            <p className="text-xs sm:text-sm text-white/80">WordSpin Pro</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-white border-white/20 text-xs sm:text-sm hover:bg-white/10 transition-colors backdrop-blur-lg"
          onClick={handleSettingsClick}
        >
          <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Ayarlar</span>
          <span className="sm:hidden">⚙️</span>
        </Button>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 space-y-3 sm:space-y-4 pb-6">
        {/* Stats Card - LUMINA Style */}
        <Card className="backdrop-blur-xl border border-white/20 shadow-2xl" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
        }}>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-sm font-bold">
              <Zap className="h-4 w-4 text-cyan-400" />
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

        {/* Game Modes - LUMINA Style */}
        <Card className="backdrop-blur-xl border border-white/20 shadow-2xl" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
        }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center gap-2 text-sm font-bold">
              <Play className="h-4 w-4 text-cyan-400" />
              Oyun Modları
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {gameModes.map((mode) => (
              <Card 
                key={mode.id}
                className={`backdrop-blur-lg border border-white/20 transition-all duration-300 cursor-pointer shadow-xl ${
                  selectedMode === mode.id ? 'ring-2 ring-cyan-400/60 scale-105' : 'hover:scale-105'
                } ${!mode.available ? 'opacity-60' : ''}`}
                style={{
                  background: selectedMode === mode.id 
                    ? 'linear-gradient(135deg, rgba(0, 220, 205, 0.2), rgba(255,255,255,0.1))' 
                    : 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
                }}
                onClick={() => mode.available && setSelectedMode(mode.id)}
              >
                <CardContent className="p-3 sm:p-6 text-center">
                  <div className="mb-2 sm:mb-4">
                    <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-white shadow-xl backdrop-blur-lg border border-cyan-400/30" style={{
                      background: 'linear-gradient(135deg, rgba(0, 220, 205, 0.3), rgba(184, 187, 217, 0.2))'
                    }}>
                      {mode.icon}
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2">{mode.title}</h3>
                  <p className="text-xs sm:text-sm text-white/70 mb-2 sm:mb-4">{mode.description}</p>
                  
                  {mode.available ? (
                    <Link href={mode.path}>
                      <Button 
                        className="w-full text-white border-none shadow-xl backdrop-blur-lg border border-cyan-400/50 font-bold"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0, 220, 205, 0.4), rgba(184, 187, 217, 0.3))'
                        }}
                        size="sm"
                      >
                        🎮 Başla
                      </Button>
                    </Link>
                  ) : (
                    <Badge variant="secondary" className="bg-white/20 text-white/80 backdrop-blur-lg border border-white/30">
                      Yakında
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Achievements - LUMINA Style */}
        <Card className="backdrop-blur-xl border border-white/20 shadow-2xl" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
        }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center gap-2 text-sm font-bold">
              <Trophy className="h-4 w-4 text-cyan-400" />
              Son Başarımlar
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-3">
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-white/70 text-sm">İlk oyununuzu oynayarak başarımları açabilirsiniz!</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Modal - LUMINA Style */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="backdrop-blur-xl border border-white/20 shadow-2xl" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
        }}>
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2 font-bold">
              <div className="text-2xl">👁️</div>
              LUMINA - Ayarlar
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-white">
            <div className="text-center py-4">
              <p className="text-white/80">Ayarlar yakında eklenecek...</p>
            </div>
            <Button 
              onClick={() => setShowSettings(false)}
              className="w-full backdrop-blur-lg border border-cyan-400/50"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 220, 205, 0.4), rgba(184, 187, 217, 0.3))'
              }}
            >
              Kapat
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}