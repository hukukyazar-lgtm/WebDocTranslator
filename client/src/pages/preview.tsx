import { useState, useEffect } from 'react';
import { LuminaGameOver } from '@/components/LuminaGameOver';
import { Button } from '@/components/ui/button';

// Lumina style page components
import { LuminaMenu } from '@/components/pages/LuminaMenu';
import { LuminaGame } from '@/components/pages/LuminaGame';
import { LuminaLogin } from '@/components/pages/LuminaLogin';
import { LuminaSettings } from '@/components/pages/LuminaSettings';
import { LuminaCategories } from '@/components/pages/LuminaCategories';

export default function Preview() {
  const [currentPage, setCurrentPage] = useState<'menu' | 'game' | 'gameover' | 'login' | 'settings' | 'categories'>('menu');
  
  // Force component refresh
  useEffect(() => {
    console.log('Preview component mounted with Lumina pages');
  }, []);

  return (
    <div className="relative">
      {/* Page navigator */}
      <div className="fixed top-4 left-4 z-50">
        <div className="bg-white/20 backdrop-blur-lg rounded-xl p-3 shadow-2xl border border-blue-300/30">
          <div className="grid grid-cols-1 gap-2 min-w-[140px]">
            <Button 
              variant={currentPage === 'menu' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage('menu')}
              className="justify-start bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white border-blue-400 font-semibold text-xs"
            >
              🏠 Ana Menü
            </Button>
            <Button 
              variant={currentPage === 'categories' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage('categories')}
              className="justify-start bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white border-green-400 font-semibold text-xs"
            >
              📂 Kategoriler
            </Button>
            <Button 
              variant={currentPage === 'game' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage('game')}
              className="justify-start bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white border-purple-400 font-semibold text-xs"
            >
              🎮 Oyun
            </Button>
            <Button 
              variant={currentPage === 'gameover' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage('gameover')}
              className="justify-start bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white border-orange-400 font-semibold text-xs"
            >
              🎉 Sonuç
            </Button>
            <Button 
              variant={currentPage === 'login' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage('login')}
              className="justify-start bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white border-cyan-400 font-semibold text-xs"
            >
              🔐 Giriş
            </Button>
            <Button 
              variant={currentPage === 'settings' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage('settings')}
              className="justify-start bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-400 hover:to-slate-500 text-white border-gray-400 font-semibold text-xs"
            >
              ⚙️ Ayarlar
            </Button>
          </div>
        </div>
      </div>

      {/* Render selected page */}
      {currentPage === 'menu' && (
        <LuminaMenu 
          playerStats={{ gamesPlayed: 247, successRate: 89, bestStreak: 15 }}
          onStartGame={() => setCurrentPage('categories')}
          onSettings={() => setCurrentPage('settings')}
          onLogin={() => setCurrentPage('login')}
        />
      )}
      {currentPage === 'categories' && (
        <LuminaCategories 
          onCategorySelect={(cat, diff) => setCurrentPage('game')}
          onBack={() => setCurrentPage('menu')}
        />
      )}
      {currentPage === 'game' && (
        <LuminaGame 
          gameState={{
            currentWord: "KAPLAN",
            guessedWord: "K_P___",
            category: "Hayvanlar",
            difficulty: "Orta",
            timeLeft: 23,
            lives: 2,
            streak: 5,
            isSpinning: true,
            usedLetters: ['K', 'P', 'M']
          }}
          onKeyPress={(key) => console.log('Key pressed:', key)}
          onGameOver={(success, score) => setCurrentPage('gameover')}
          turkishKeyboard={[
            ['Q','W','E','R','T','Y','U','I','O','P','Ğ','Ü'],
            ['A','S','D','F','G','H','J','K','L','Ş','İ'],
            ['Z','X','C','V','B','N','M','Ö','Ç']
          ]}
        />
      )}
      {currentPage === 'gameover' && (
        <LuminaGameOver 
          gameSuccess={true}
          score={2450}
          word="KAPLAN"
          timeLeft={18}
          streak={7}
          category="Hayvanlar"
          onPlayAgain={() => setCurrentPage('game')}
          onMainMenu={() => setCurrentPage('menu')}
        />
      )}
      {currentPage === 'login' && (
        <LuminaLogin 
          onLogin={() => setCurrentPage('menu')}
          onBack={() => setCurrentPage('menu')}
          onGuestMode={() => setCurrentPage('menu')}
        />
      )}
      {currentPage === 'settings' && (
        <LuminaSettings 
          playerProfile={{
            name: 'Preview Oyuncusu',
            gamesPlayed: 247,
            successRate: 89,
            bestStreak: 15,
            totalScore: 1247
          }}
          onBack={() => setCurrentPage('menu')}
          onProfileUpdate={(profile) => console.log('Profile updated:', profile)}
        />
      )}
    </div>
  );
}