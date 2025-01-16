import { useState, useEffect } from 'react';
import { getAccumulatedStatistics } from '../api/players';

export interface AccumulatedStats {
  total_matches: number;
  total_minutes: number;
  average_rating: number;
  goals_conceded: number;
  total_saves: number;
  total_passes: number;
  average_pass_accuracy: number;
  yellow_cards: number;
  red_cards: number;
  penalties_saved: number;
  clean_sheets: number;
}

export const useAccumulatedStatistics = (playerId: string) => {
  const [stats, setStats] = useState<AccumulatedStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await getAccumulatedStatistics(playerId);
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching statistics');
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    if (playerId) {
      fetchStats();
    }
  }, [playerId]);

  return { stats, loading, error };
}; 