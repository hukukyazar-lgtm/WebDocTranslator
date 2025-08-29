import { DailyGoal } from '@/lib/gameUtils';

interface DailyGoalsProps {
  goals: DailyGoal[];
}

export const DailyGoals = ({ goals }: DailyGoalsProps) => {
  return (
    <div className="space-y-3">
      <div className="text-center">
        <h3 className="text-lg font-bold text-white mb-2">📅 Günlük Hedefler</h3>
      </div>
      
      <div className="space-y-2">
        {goals.map((goal) => {
          const progress = Math.min((goal.current / goal.target) * 100, 100);
          
          return (
            <div 
              key={goal.id} 
              className="backdrop-blur-xl rounded-xl p-3 border border-white/20"
              style={{
                background: goal.completed 
                  ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.1))'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{goal.emoji}</span>
                  <span className="text-white font-semibold text-sm">
                    {goal.name}
                  </span>
                </div>
                <div className="text-right">
                  {goal.completed ? (
                    <span className="text-green-400 font-bold text-sm">✅ Tamamlandı!</span>
                  ) : (
                    <span className="text-white/80 text-sm font-medium">
                      {goal.current}/{goal.target}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${progress}%`,
                    background: goal.completed 
                      ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                      : 'linear-gradient(90deg, #3b82f6, #8b5cf6)'
                  }}
                />
                {goal.completed && (
                  <div className="absolute inset-0 bg-green-400/20 animate-pulse" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};