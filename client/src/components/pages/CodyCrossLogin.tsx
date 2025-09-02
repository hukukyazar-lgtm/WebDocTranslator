import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useState } from 'react';

export const CodyCrossLogin = memo(() => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 animate-pulse"></div>
        <div className="absolute top-1/3 right-8 w-24 h-24 rounded-full bg-yellow-300/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-28 h-28 rounded-full bg-pink-300/15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-12 w-20 h-20 rounded-full bg-cyan-300/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 10 + 8}px`,
              height: `${Math.random() * 10 + 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `gentle-float ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Logo header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 rounded-full animate-pulse opacity-80"></div>
              <div className="absolute inset-3 bg-white rounded-full shadow-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-3xl font-black text-purple-600">L</div>
              </div>
            </div>
            <h1 className="text-4xl font-black text-white mb-2 tracking-wide">LUMINA</h1>
            <p className="text-white/80 font-semibold text-lg">Hoş Geldin!</p>
          </div>

          {/* Login card */}
          <Card className="p-8 bg-white rounded-3xl shadow-2xl border-0 mb-6">
            <div className="space-y-6">
              {/* Email field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  E-posta
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input 
                    type="email"
                    placeholder="ornek@email.com"
                    className="pl-12 h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 text-base"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Şifre
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-12 pr-12 h-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 text-base"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Login button */}
              <Button className="w-full h-14 rounded-2xl text-lg font-bold text-white shadow-xl" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}>
                <LogIn className="w-5 h-5 mr-3" />
                Giriş Yap
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">veya</span>
                </div>
              </div>

              {/* Social login */}
              <div className="space-y-3">
                <Button className="w-full h-12 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white">
                  <div className="w-5 h-5 mr-3 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-bold">G</span>
                  </div>
                  Google ile devam et
                </Button>
                
                <Button className="w-full h-12 rounded-xl font-semibold bg-gray-800 hover:bg-gray-900 text-white">
                  <div className="w-5 h-5 mr-3 bg-white rounded-full flex items-center justify-center">
                    <span className="text-gray-800 text-xs font-bold">A</span>
                  </div>
                  Apple ile devam et
                </Button>
              </div>
            </div>
          </Card>

          {/* Footer links */}
          <div className="text-center space-y-4">
            <button className="text-white/80 font-semibold hover:text-white transition-colors">
              Şifremi Unuttum
            </button>
            
            <div className="text-white/70">
              <span>Hesabın yok mu? </span>
              <button className="text-white font-semibold hover:text-yellow-300 transition-colors">
                Kayıt Ol
              </button>
            </div>
          </div>

          {/* Guest play option */}
          <div className="mt-8">
            <Card className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
              <Button className="w-full h-12 rounded-xl font-bold bg-transparent border-2 border-white/50 text-white hover:bg-white/10">
                Misafir Olarak Oyna
              </Button>
            </Card>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-8px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
});

CodyCrossLogin.displayName = 'CodyCrossLogin';