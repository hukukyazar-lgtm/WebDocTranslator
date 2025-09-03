import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';

interface CategoryDifficultyProgress {
  [category: string]: {
    [difficulty: string]: {
      correctCount: number;
      isUnlocked: boolean;
    };
  };
}

export function useCategoryDifficultyProgress() {
  const { isAuthenticated } = useAuth();

  const {
    data: progress,
    isLoading,
    error
  } = useQuery<CategoryDifficultyProgress>({
    queryKey: ['/api/category-difficulty-progress'],
    enabled: isAuthenticated,
    retry: false,
  });

  return {
    progress,
    isLoading,
    error,
    isAuthenticated,
  };
}