import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';

interface CategoryProgress {
  categories: { [category: string]: number };
  lastGame?: { category: string; word: string; date: string };
}

export function useCategoryProgress() {
  const { isAuthenticated } = useAuth();

  const {
    data: progress,
    isLoading,
    error
  } = useQuery<CategoryProgress>({
    queryKey: ['/api/category-progress'],
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