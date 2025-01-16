import { useState, useEffect } from 'react';
import { getPlayers } from '../api/players';
import type { Player } from '../types/players';

export const usePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await getPlayers({});
        console.log('API Response:', response); // Debug log
        setPlayers(response.players || []);
      } catch (err) {
        console.error('Error fetching players:', err); // Debug log
        setError('Error fetching players');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return { players, loading, error };
}; 