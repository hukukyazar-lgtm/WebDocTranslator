import { useEffect, useState } from 'react';
import { Achievement } from '@/lib/gameUtils';

interface AchievementNotificationProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const AchievementNotification = ({ achievement, onClose }: AchievementNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out animation
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div 
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className="backdrop-blur-xl rounded-xl p-4 border border-yellow-400/30 shadow-2xl max-w-sm">
        <div 
          className="text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.2))',
            borderRadius: '12px',
            padding: '16px'
          }}
        >
          <div className="text-4xl mb-2 animate-bounce-soft">
            {achievement.emoji}
          </div>
          <div className="text-yellow-400 font-bold text-lg mb-1">
            Başarım Kazandın! 🎉
          </div>
          <div className="text-white font-semibold text-base mb-1">
            {achievement.name}
          </div>
          <div className="text-white/80 text-sm">
            {achievement.description}
          </div>
        </div>
        
        {/* Confetti effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce-soft"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: '1.5s'
              }}
            >
              🎊
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};