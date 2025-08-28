import { memo } from 'react';
import { formatTime } from '@/lib/gameUtils';

interface GameStatsProps {
  score: number;
  streak: number;
  correctGuesses: number;
  averageTime: number;
}

export const GameStats = memo(({ score, streak, correctGuesses, averageTime }: GameStatsProps) => {
  const stats = [
    { 
      value: score, 
      label: "💎 Toplam Puan", 
      color: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
      icon: "💎",
      testId: "stat-score"
    },
    { 
      value: streak, 
      label: "🔥 Seri", 
      color: "linear-gradient(45deg, #f59e0b, #ef4444)",
      icon: "🔥",
      testId: "stat-streak"
    },
    { 
      value: correctGuesses, 
      label: "✅ Doğru", 
      color: "linear-gradient(45deg, #10b981, #059669)",
      icon: "✅",
      testId: "stat-correct"
    },
    { 
      value: formatTime(averageTime), 
      label: "⚡ Ortalama", 
      color: "linear-gradient(45deg, #8b5cf6, #a855f7)",
      icon: "⚡",
      testId: "stat-avg-time"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center group hover:scale-105 transition-all duration-300 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
            animationDelay: `${0.4 + index * 0.1}s`
          }}
        >
          <div className="space-y-3">
            <div className="text-4xl animate-bounce-soft group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <div 
              className="text-3xl font-black animate-pulse-glow"
              style={{ 
                background: stat.color,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 0 20px rgba(255,255,255,0.5)'
              }}
              data-testid={stat.testId}
            >
              {stat.value}
            </div>
            <div className="text-sm font-bold text-white/80">
              {stat.label.split(' ')[1]}
            </div>
          </div>
          <div 
            className="h-1 rounded-full mt-4 opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ background: stat.color }}
          />
        </div>
      ))}
    </div>
  );
});

GameStats.displayName = 'GameStats';
