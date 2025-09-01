import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Crown, Users, Trophy, Settings, Zap, Play, X, Globe } from 'lucide-react';
import { GameStats } from '@/components/game/GameStats';
import { type Language, getTranslation } from '@/lib/translations';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage?: Language;
  onLanguageChange?: (language: Language) => void;
}

export function DashboardModal({ isOpen, onClose, selectedLanguage = 'tr', onLanguageChange }: DashboardModalProps) {
  const [selectedMode, setSelectedMode] = useState('single');
  const [showSettings, setShowSettings] = useState(false);

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
      title: getTranslation('dashboard', 'singlePlayer', selectedLanguage),
      description: getTranslation('dashboard', 'singlePlayerDesc', selectedLanguage),
      icon: <Crown className="h-6 w-6" />,
      available: true,
      path: '/category'
    },
    {
      id: 'duo',
      title: getTranslation('dashboard', 'twoPlayer', selectedLanguage),
      description: getTranslation('dashboard', 'twoPlayerDesc', selectedLanguage),
      icon: <Users className="h-6 w-6" />,
      available: false,
      path: '/game/duo'
    },
    {
      id: 'multiplayer',
      title: getTranslation('dashboard', 'multiplayer', selectedLanguage),
      description: getTranslation('dashboard', 'multiplayerDesc', selectedLanguage),
      icon: <Trophy className="h-6 w-6" />,
      available: false,
      path: '/game/multiplayer'
    }
  ];

  return (
    <>
      {/* Main Dashboard Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent 
          className="max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-xl border border-white/20 shadow-2xl p-0" 
          style={{
            background: 'linear-gradient(135deg, rgba(0, 220, 205, 0.15), rgba(255,255,255,0.05))'
          }}
        >
          <div className="sticky top-0 z-10 backdrop-blur-xl border-b border-white/20 p-4" style={{
            background: 'linear-gradient(135deg, rgba(0, 220, 205, 0.2), rgba(255,255,255,0.1))'
          }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">👁️</div>
                <div>
                  <h1 className="text-xl font-bold text-white">LUMINA Dashboard</h1>
                  <p className="text-sm text-white/80">WordSpin Pro Kontrol Paneli</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-white border-white/20 hover:bg-white/10 backdrop-blur-lg"
                  onClick={() => setShowSettings(true)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {getTranslation('dashboard', 'settings', selectedLanguage)}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-white border-white/20 hover:bg-white/10 backdrop-blur-lg"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Stats Card */}
            <Card className="backdrop-blur-lg border border-white/20 shadow-xl" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
            }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2 text-lg font-bold">
                  <Zap className="h-5 w-5 text-cyan-400" />
                  {getTranslation('dashboard', 'statistics', selectedLanguage)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
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
            <Card className="backdrop-blur-lg border border-white/20 shadow-xl" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
            }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2 text-lg font-bold">
                  <Play className="h-5 w-5 text-cyan-400" />
                  {getTranslation('dashboard', 'gameModes', selectedLanguage)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 grid grid-cols-1 md:grid-cols-3 gap-4">
                {gameModes.map((mode) => (
                  <Card 
                    key={mode.id}
                    className={`backdrop-blur-lg border border-white/20 transition-all duration-300 cursor-pointer shadow-lg ${
                      selectedMode === mode.id ? 'ring-2 ring-cyan-400/60 scale-105' : 'hover:scale-105'
                    } ${!mode.available ? 'opacity-60' : ''}`}
                    style={{
                      background: selectedMode === mode.id 
                        ? 'linear-gradient(135deg, rgba(0, 220, 205, 0.2), rgba(255,255,255,0.1))' 
                        : 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
                    }}
                    onClick={() => mode.available && setSelectedMode(mode.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="mb-3">
                        <div className="mx-auto w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg backdrop-blur-lg border border-cyan-400/30" style={{
                          background: 'linear-gradient(135deg, rgba(0, 220, 205, 0.3), rgba(184, 187, 217, 0.2))'
                        }}>
                          {mode.icon}
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{mode.title}</h3>
                      <p className="text-sm text-white/70 mb-3">{mode.description}</p>
                      
                      {mode.available ? (
                        <Link href={mode.path}>
                          <Button 
                            className="w-full text-white border-none shadow-lg backdrop-blur-lg font-bold"
                            style={{
                              background: 'linear-gradient(135deg, rgba(0, 220, 205, 0.4), rgba(184, 187, 217, 0.3))'
                            }}
                            size="sm"
                            onClick={onClose}
                          >
                            {getTranslation('dashboard', 'start', selectedLanguage)}
                          </Button>
                        </Link>
                      ) : (
                        <Badge variant="secondary" className="bg-white/20 text-white/80 backdrop-blur-lg">
                          {getTranslation('dashboard', 'comingSoon', selectedLanguage)}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="backdrop-blur-lg border border-white/20 shadow-xl" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
            }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2 text-lg font-bold">
                  <Trophy className="h-5 w-5 text-cyan-400" />
                  {getTranslation('dashboard', 'recentAchievements', selectedLanguage)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-center py-6">
                  <div className="text-3xl mb-2">🎯</div>
                  <p className="text-white/70">{getTranslation('dashboard', 'firstGameMessage', selectedLanguage)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
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
          <div className="space-y-6 text-white">
            {/* Language Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">{getTranslation('dashboard', 'languageSelection', selectedLanguage)}</h3>
              </div>
              <Select 
                value={selectedLanguage} 
                onValueChange={(value: Language) => onLanguageChange?.(value)}
              >
                <SelectTrigger className="w-full backdrop-blur-lg border border-white/30 text-white bg-white/10">
                  <SelectValue placeholder="Dil seçin" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-xl border border-white/20" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
                }}>
                  <SelectItem value="tr" className="text-white hover:bg-white/10">🇹🇷 Türkçe</SelectItem>
                  <SelectItem value="en" className="text-white hover:bg-white/10">🇺🇸 English</SelectItem>
                  <SelectItem value="es" className="text-white hover:bg-white/10">🇪🇸 Español</SelectItem>
                  <SelectItem value="fr" className="text-white hover:bg-white/10">🇫🇷 Français</SelectItem>
                  <SelectItem value="de" className="text-white hover:bg-white/10">🇩🇪 Deutsch</SelectItem>
                  <SelectItem value="it" className="text-white hover:bg-white/10">🇮🇹 Italiano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Game Settings */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-cyan-400" />
                {getTranslation('dashboard', 'gameSettings', selectedLanguage)}
              </h3>
              <div className="p-4 rounded-lg backdrop-blur-lg border border-white/20" style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
              }}>
                <p className="text-white/80 text-sm">{getTranslation('dashboard', 'gameSettingsDesc', selectedLanguage)}</p>
              </div>
            </div>

            <Button 
              onClick={() => setShowSettings(false)}
              className="w-full backdrop-blur-lg border border-cyan-400/50"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 220, 205, 0.4), rgba(184, 187, 217, 0.3))'
              }}
            >
              {getTranslation('dashboard', 'saveChanges', selectedLanguage)}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}