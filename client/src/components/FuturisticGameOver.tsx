import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Home, Share2, Sparkles } from 'lucide-react';
import luminaLogo from '@/assets/lumina-logo.png';

// Futuristic cyber-punk style with neon and holographic effects
export const FuturisticGameOver = memo(() => {
  const gameResult = {
    isWin: true,
    score: 2450,
    timeRemaining: 18,
    streak: 7,
    category: "Hayvanlar",
    difficulty: "Orta",
    correctWord: "KAPLAN",
    totalTime: 30,
    attempts: 3
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Cyber grid background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
      </div>

      {/* Neon lines and energy flows */}
      <div className="absolute inset-0">
        {/* Horizontal energy lines */}
        <div className="absolute top-1/4 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 animate-pulse"></div>
        <div className="absolute top-3/4 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Vertical energy lines */}
        <div className="absolute left-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-pink-400 to-transparent opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute right-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent opacity-60 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Floating holographic particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-holo ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{
                background: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'][Math.floor(Math.random() * 4)],
                boxShadow: `0 0 10px currentColor`,
                opacity: 0.6
              }}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {/* Holographic game over panel */}
          <div className="relative">
            {/* Outer holographic border */}
            <div 
              className="absolute -inset-1 rounded-3xl opacity-75"
              style={{
                background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ff00)',
                filter: 'blur(1px)',
                animation: 'holo-border 3s linear infinite'
              }}
            />
            
            {/* Main panel */}
            <div 
              className="relative p-8 rounded-3xl border border-cyan-400/50"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(0, 0, 0, 0.9) 0%, 
                    rgba(0, 20, 40, 0.8) 50%, 
                    rgba(0, 0, 0, 0.9) 100%
                  )
                `,
                backdropFilter: 'blur(20px)',
                boxShadow: `
                  inset 0 1px 0 rgba(0, 255, 255, 0.2),
                  0 0 50px rgba(0, 255, 255, 0.3),
                  0 0 100px rgba(255, 0, 255, 0.2)
                `
              }}
            >
              {/* Header with holographic logo */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-6">
                  {/* Holographic glow rings */}
                  <div className="absolute inset-0 w-20 h-20 rounded-full border border-cyan-400/30 animate-ping"></div>
                  <div className="absolute inset-2 w-16 h-16 rounded-full border border-purple-400/30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  
                  <div className="relative w-16 h-16 mx-auto">
                    <img 
                      src={luminaLogo} 
                      alt="LUMINA" 
                      className="w-full h-full object-contain relative z-10"
                      style={{
                        filter: `
                          drop-shadow(0 0 20px #00ffff)
                          drop-shadow(0 0 40px #ff00ff)
                          hue-rotate(180deg)
                        `
                      }}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  {/* Glitchy title effect */}
                  <h1 
                    className="text-3xl font-black mb-4 tracking-wider relative"
                    style={{
                      background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      animation: 'text-glitch 2s infinite'
                    }}
                  >
                    {gameResult.isWin ? 'MISSION COMPLETE' : 'MISSION FAILED'}
                  </h1>
                  
                  {/* Animated status */}
                  <div className="text-6xl mb-4 animate-bounce">
                    {gameResult.isWin ? '⚡' : '💀'}
                  </div>
                  
                  <p className="text-xl text-cyan-300 font-mono tracking-wide">
                    TARGET: <span className="text-yellow-400">{gameResult.correctWord}</span>
                  </p>
                </div>
              </div>

              {/* Cyber stats display */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "SCORE", value: gameResult.score, color: "#00ffff", unit: "PTS" },
                  { label: "STREAK", value: gameResult.streak, color: "#ff00ff", unit: "HIT" },
                  { label: "TIME", value: gameResult.timeRemaining, color: "#ffff00", unit: "SEC" },
                  { label: "TRIES", value: gameResult.attempts, color: "#00ff00", unit: "ATT" }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className="relative p-4 rounded-xl border font-mono"
                    style={{
                      borderColor: `${stat.color}50`,
                      background: `linear-gradient(135deg, ${stat.color}10, transparent)`,
                      boxShadow: `inset 0 0 20px ${stat.color}20`
                    }}
                  >
                    <div className="text-xs text-gray-400 mb-1 tracking-wider">{stat.label}</div>
                    <div 
                      className="text-3xl font-black mb-1"
                      style={{ 
                        color: stat.color,
                        textShadow: `0 0 10px ${stat.color}`
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500">{stat.unit}</div>
                  </div>
                ))}
              </div>

              {/* Mission details */}
              <div className="space-y-3 mb-8 font-mono">
                <div className="flex justify-between border-b border-cyan-400/20 pb-2">
                  <span className="text-gray-400">CATEGORY</span>
                  <span className="text-cyan-400">🐾 {gameResult.category}</span>
                </div>
                <div className="flex justify-between border-b border-cyan-400/20 pb-2">
                  <span className="text-gray-400">DIFFICULTY</span>
                  <span className="text-yellow-400">⚡ {gameResult.difficulty}</span>
                </div>
              </div>

              {/* Cyber action buttons */}
              <div className="space-y-4">
                {/* Primary mission button */}
                <Button 
                  className="w-full h-14 rounded-xl text-lg font-bold font-mono tracking-wider border-0 relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(45deg, #00ffff, #0080ff)',
                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <RotateCcw className="w-5 h-5 mr-3" />
                  RETRY MISSION
                </Button>
                
                {/* Secondary actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline"
                    className="h-12 rounded-xl font-mono font-semibold tracking-wide"
                    style={{
                      borderColor: '#ff00ff50',
                      color: '#ff00ff',
                      background: 'linear-gradient(135deg, rgba(255, 0, 255, 0.1), transparent)',
                      boxShadow: 'inset 0 0 20px rgba(255, 0, 255, 0.1)'
                    }}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    HUB
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="h-12 rounded-xl font-mono font-semibold tracking-wide"
                    style={{
                      borderColor: '#ffff0050',
                      color: '#ffff00',
                      background: 'linear-gradient(135deg, rgba(255, 255, 0, 0.1), transparent)',
                      boxShadow: 'inset 0 0 20px rgba(255, 255, 0, 0.1)'
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    SHARE
                  </Button>
                </div>
              </div>

              {/* Achievement unlock */}
              {gameResult.isWin && gameResult.streak >= 5 && (
                <div 
                  className="mt-6 p-4 rounded-xl border relative overflow-hidden font-mono"
                  style={{
                    borderColor: '#ffd70050',
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), transparent)',
                    boxShadow: 'inset 0 0 30px rgba(255, 215, 0, 0.2)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
                        boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
                      }}
                    >
                      <Sparkles className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <div className="font-bold text-yellow-400 tracking-wide">ACHIEVEMENT UNLOCKED</div>
                      <div className="text-yellow-300/80 text-sm">STREAK_MASTER_5 - Elite Accuracy</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes float-holo {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 1; }
        }
        @keyframes holo-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes text-glitch {
          0%, 100% { text-shadow: 0 0 5px currentColor; }
          25% { text-shadow: -2px 0 5px #ff00ff, 2px 0 5px #00ffff; }
          50% { text-shadow: 2px 0 5px #ff00ff, -2px 0 5px #00ffff; }
          75% { text-shadow: 0 0 5px currentColor; }
        }
      `}</style>
    </div>
  );
});

FuturisticGameOver.displayName = 'FuturisticGameOver';