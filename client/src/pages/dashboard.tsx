import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GameStats } from '@/components/game/GameStats';
import { GameStats as GameStatsType, Achievement, getDefaultAchievements, getDefaultDailyGoals } from '@/lib/gameUtils';
import { Crown, Users, Zap, Trophy, Play, Settings } from 'lucide-react';

export function Dashboard() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  
  // Use defaults for now - later we can get from local storage or API
  const stats = {
    totalGamesPlayed: 0,
    totalCorrectGuesses: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalScore: 0,
    averageGuessTime: 0,
    categoryExpertise: {},
    achievements: getDefaultAchievements(),
    dailyGoals: getDefaultDailyGoals(),
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
      path: '/game'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl">👁️</div>
          <div>
            <h1 className="text-2xl font-bold text-white">LUMINA</h1>
            <p className="text-sm text-white/60">WordSpin Pro</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="text-white border-white/20">
          <Settings className="h-4 w-4 mr-2" />
          Ayarlar
        </Button>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Game Stats */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5" />
              İstatistikleriniz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <GameStats
              score={stats.totalScore}
              streak={stats.currentStreak}
              correctGuesses={stats.totalCorrectGuesses}
              averageTime={stats.averageGuessTime}
              language="tr"
            />
          </CardContent>
        </Card>

        {/* Game Modes */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Play className="h-5 w-5" />
              Oyun Modları
            </CardTitle>
            <CardDescription className="text-white/60">
              Oyun deneyiminizi seçin
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            {gameModes.map((mode) => (
              <Card 
                key={mode.id}
                className={`bg-white/5 border-white/20 transition-all duration-300 cursor-pointer ${
                  selectedMode === mode.id ? 'ring-2 ring-white/40 scale-105' : 'hover:scale-105'
                } ${!mode.available ? 'opacity-60' : ''}`}
                onClick={() => mode.available && setSelectedMode(mode.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${mode.color} mb-4`}>
                    <div className="text-white">
                      {mode.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{mode.title}</h3>
                  <p className="text-sm text-white/60 mb-4">{mode.description}</p>
                  
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

        {/* Recent Achievements */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Son Başarımlar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {stats.achievements
                .filter((achievement: Achievement) => achievement.unlocked)
                .slice(0, 4)
                .map((achievement: Achievement, index: number) => (
                  <div 
                    key={achievement.id}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="text-2xl">{achievement.emoji}</div>
                    <div>
                      <h4 className="font-semibold text-white">{achievement.name}</h4>
                      <p className="text-sm text-white/60">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              
              {stats.achievements.filter((a: Achievement) => a.unlocked).length === 0 && (
                <div className="text-center text-white/60 py-8 col-span-2">
                  <Trophy className="h-12 w-12 mx-auto mb-2 opacity-40" />
                  <p>Henüz başarım kazanmadınız. Oyuna başlayın!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}