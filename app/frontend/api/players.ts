import authedAxios from "./axios/authedAxios";
import type { Player } from '../types/players';

export interface PlayersResponse {
  players: Player[];
}

interface GetPlayersParams {
  query?: string;
}

export const getPlayers = async (params: GetPlayersParams = {}): Promise<PlayersResponse> => {
  const response = await authedAxios.get<Player[]>('/api/v1/players', {
    params,
  });
  console.log('Raw API Response:', response.data); // Debug log
  return { players: response.data }; // Wrap the array in an object
};

export const searchPlayers = async (query: string): Promise<PlayersResponse> => {
  const response = await authedAxios.get<Player[]>('/api/v1/players/search', {
    params: { query },
  });
  console.log('Raw Search Response:', response.data); // Debug log
  return { players: response.data }; // Wrap the array in an object
};

export const getAccumulatedStatistics = async (playerId: string) => {
  const response = await fetch(`/api/v1/players/${playerId}/accumulated_statistics`);
  if (!response.ok) {
    throw new Error('Failed to fetch accumulated statistics');
  }
  return response.json();
};
