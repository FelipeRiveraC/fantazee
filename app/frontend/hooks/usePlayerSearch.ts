import { useState, useEffect } from 'react';
import { searchPlayers } from '../api/players';
import type { Player } from '../types/players';

export const usePlayerSearch = (searchTerm: string) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchPlayersList = async () => {
      if (!searchTerm) {
        setPlayers([]);
        return;
      }

      try {
        setLoading(true);
        const response = await searchPlayers(searchTerm);
        console.log('Search Response:', response); // Debug log
        setPlayers(response.players || []);
      } catch (err) {
        console.error('Error searching players:', err); // Debug log
        setError('Error searching players');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(searchPlayersList, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  return { players, loading, error };
}; 