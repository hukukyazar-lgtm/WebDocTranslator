import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Settings, Trophy, User, HelpCircle } from 'lucide-react';

export const CodyCrossMenu = memo(() => {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Floating background elements */}
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

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        {/* Header with logo */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 rounded-full animate-pulse opacity-80"></div>
            <div className="absolute inset-3 bg-white rounded-full shadow-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-black text-purple-600">L</div>
            </div>
          </div>
          <h1 className="text-5xl font-black text-white mb-4 tracking-wide">LUMINA</h1>
          <p className="text-xl text-white/80 font-semibold">Kelime Oyunu</p>
        </div>

        {/* Main menu cards */}
        <div className="w-full max-w-md space-y-4">
          {/* Play button - main action */}
          <Card className="p-6 bg-white rounded-3xl shadow-2xl border-0">
            <Button className="w-full h-20 rounded-2xl text-2xl font-black shadow-xl text-white" style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
            }}>
              <Play className="w-8 h-8 mr-4" />
              OYNA
            </Button>
          </Card>

          {/* Secondary menu options */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-white/95 rounded-2xl shadow-xl border-0">
              <Button className="w-full h-16 rounded-xl font-bold text-white border-0 shadow-lg" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}>
                <Trophy className="w-6 h-6 mb-1" />
                <div className="text-sm">Başarımlar</div>
              </Button>
            </Card>

            <Card className="p-4 bg-white/95 rounded-2xl shadow-xl border-0">
              <Button className="w-full h-16 rounded-xl font-bold text-white border-0 shadow-lg" style={{
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
              }}>
                <User className="w-6 h-6 mb-1" />
                <div className="text-sm">Profil</div>
              </Button>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-white/95 rounded-2xl shadow-xl border-0">
              <Button className="w-full h-16 rounded-xl font-bold text-white border-0 shadow-lg" style={{
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
              }}>
                <Settings className="w-6 h-6 mb-1" />
                <div className="text-sm">Ayarlar</div>
              </Button>
            </Card>

            <Card className="p-4 bg-white/95 rounded-2xl shadow-xl border-0">
              <Button className="w-full h-16 rounded-xl font-bold text-white border-0 shadow-lg" style={{
                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
              }}>
                <HelpCircle className="w-6 h-6 mb-1" />
                <div className="text-sm text-orange-800">Yardım</div>
              </Button>
            </Card>
          </div>
        </div>

        {/* Player stats preview */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-white/80">
            <div>
              <div className="text-2xl font-black text-white">247</div>
              <div className="text-sm">Oynanmış</div>
            </div>
            <div className="w-px h-8 bg-white/30"></div>
            <div>
              <div className="text-2xl font-black text-white">89%</div>
              <div className="text-sm">Başarı</div>
            </div>
            <div className="w-px h-8 bg-white/30"></div>
            <div>
              <div className="text-2xl font-black text-white">15</div>
              <div className="text-sm">En Yüksek Seri</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); opacity: 0.5; }
          50% { transform: translateY(-10px); opacity: 1; }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
});

CodyCrossMenu.displayName = 'CodyCrossMenu';