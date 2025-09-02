import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from './useAuth';

export interface UserStats {
  gamesPlayed: number;
  successRate: number;
  bestStreak: number;
  totalScore: number;
  averageGuessTime: number;
}

export interface GameSessionData {
  category: string;
  difficulty: string;
  word: string;
  isCorrect: boolean;
  score: number;
  guessTime: number;
}

export function useGameStats() {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Fetch user stats
  const {
    data: stats,
    isLoading,
    error
  } = useQuery<UserStats>({
    queryKey: ['/api/stats'],
    enabled: isAuthenticated,
    retry: false,
  });

  // Save game session mutation
  const saveGameSessionMutation = useMutation({
    mutationFn: async (sessionData: GameSessionData) => {
      const response = await apiRequest('POST', '/api/game-session', sessionData);
      return await response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch stats after saving a game session
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
  });

  // Get default stats for guests
  const getDefaultStats = (): UserStats => ({
    gamesPlayed: 0,
    successRate: 0,
    bestStreak: 0,
    totalScore: 0,
    averageGuessTime: 0,
  });

  return {
    stats: isAuthenticated ? stats : getDefaultStats(),
    isLoading: isAuthenticated ? isLoading : false,
    error: isAuthenticated ? error : null,
    saveGameSession: saveGameSessionMutation.mutateAsync,
    isSaving: saveGameSessionMutation.isPending,
    isAuthenticated,
  };
}