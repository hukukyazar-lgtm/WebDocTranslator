import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  ChevronLeft, 
  Volume2, 
  VolumeX, 
  Vibrate, 
  Moon, 
  Sun, 
  Globe, 
  HelpCircle, 
  Star, 
  LogOut,
  User,
  Bell
} from 'lucide-react';

interface CodyCrossSettingsProps {
  playerProfile: {
    name: string;
    gamesPlayed: number;
    successRate: number;
    bestStreak: number;
    totalScore: number;
  };
  onBack: () => void;
  onProfileUpdate: (profile: any) => void;
}

export const CodyCrossSettings = memo(({ playerProfile, onBack, onProfileUpdate }: CodyCrossSettingsProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/8"
            style={{
              width: `${Math.random() * 12 + 10}px`,
              height: `${Math.random() * 12 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-settings ${5 + Math.random() * 4}s ease-in-out infinite`,
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
            <h1 className="text-3xl font-black text-white">Ayarlar</h1>
            <p className="text-white/80 font-medium">Oyun tercihlerini düzenle</p>
          </div>
          <div className="w-12"></div>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          {/* Profile section */}
          <Card className="p-6 bg-white rounded-3xl shadow-xl border-0">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-gray-800">{playerProfile.name}</h3>
                <p className="text-gray-600 font-medium">Premium Üye</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm text-gray-700 font-semibold">{playerProfile.totalScore} puan</span>
                </div>
              </div>
            </div>
            <Button className="w-full h-12 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
              Profili Düzenle
            </Button>
          </Card>

          {/* Game Settings */}
          <Card className="p-6 bg-white rounded-3xl shadow-xl border-0">
            <h3 className="text-lg font-black text-gray-800 mb-4">Oyun Ayarları</h3>
            <div className="space-y-4">
              {/* Sound */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-semibold text-gray-800">Ses Efektleri</div>
                    <div className="text-sm text-gray-600">Oyun seslerini aç/kapat</div>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              {/* Music */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <VolumeX className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-semibold text-gray-800">Müzik</div>
                    <div className="text-sm text-gray-600">Arka plan müziği</div>
                  </div>
                </div>
                <Switch />
              </div>

              {/* Vibration */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Vibrate className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-semibold text-gray-800">Titreşim</div>
                    <div className="text-sm text-gray-600">Dokunmatik geri bildirim</div>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              {/* Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="font-semibold text-gray-800">Bildirimler</div>
                    <div className="text-sm text-gray-600">Günlük hatırlatıcılar</div>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          {/* Display Settings */}
          <Card className="p-6 bg-white rounded-3xl shadow-xl border-0">
            <h3 className="text-lg font-black text-gray-800 mb-4">Görünüm</h3>
            <div className="space-y-4">
              {/* Dark Mode */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-indigo-600" />
                  <div>
                    <div className="font-semibold text-gray-800">Karanlık Tema</div>
                    <div className="text-sm text-gray-600">Gece modu aktif</div>
                  </div>
                </div>
                <Switch />
              </div>

              {/* Language */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-cyan-600" />
                  <div>
                    <div className="font-semibold text-gray-800">Dil</div>
                    <div className="text-sm text-gray-600">Türkçe</div>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-semibold">
                  TR
                </Badge>
              </div>
            </div>
          </Card>

          {/* Game Progress */}
          <Card className="p-6 bg-white rounded-3xl shadow-xl border-0">
            <h3 className="text-lg font-black text-gray-800 mb-4">İstatistikler</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-black text-blue-600">{playerProfile.gamesPlayed}</div>
                <div className="text-sm text-gray-600 font-medium">Oyun</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-green-600">{playerProfile.successRate}%</div>
                <div className="text-sm text-gray-600 font-medium">Başarı</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-purple-600">{playerProfile.bestStreak}</div>
                <div className="text-sm text-gray-600 font-medium">En Yüksek Seri</div>
              </div>
            </div>
          </Card>

          {/* Other Settings */}
          <Card className="p-6 bg-white rounded-3xl shadow-xl border-0">
            <div className="space-y-4">
              <Button 
                onClick={() => console.log('Yardım ve Destek açıldı')}
                className="w-full h-12 rounded-xl font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 justify-start"
              >
                <HelpCircle className="w-5 h-5 mr-3" />
                Yardım ve Destek
              </Button>
              
              <Button 
                onClick={() => console.log('Uygulama değerlendirmesi açıldı')}
                className="w-full h-12 rounded-xl font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 justify-start"
              >
                <Star className="w-5 h-5 mr-3" />
                Uygulamayı Değerlendir
              </Button>
              
              <Button 
                onClick={() => console.log('Çıkış yapıldı')}
                className="w-full h-12 rounded-xl font-semibold bg-red-50 text-red-600 hover:bg-red-100 justify-start"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Çıkış Yap
              </Button>
            </div>
          </Card>

          {/* Version info */}
          <div className="text-center pt-4">
            <p className="text-white/60 text-sm font-medium">
              LUMINA v2.1.0 • © 2025
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-settings {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-10px) rotate(5deg); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
});

CodyCrossSettings.displayName = 'CodyCrossSettings';