export interface Player {
  id: string;
  api_id: number;
  name: string;
  photo_url: string;
  position: string;
  team: string;
  rating?: string;
  player_statistics?: PlayerStatistic[];
  created_at: string;
  updated_at: string;
}

export interface PlayerStatistic {
  id: string;
  player_id: string;
  match_id: string;
  games_minutes: number;
  games_number: number;
  games_position: string;
  games_rating: string;
  games_captain: boolean;
  games_substitute: boolean;
  shots_total: number;
  shots_on: number;
  goals_total: number;
  goals_conceded: number;
  goals_assists: number;
  goals_saves: number;
  passes_total: number;
  passes_key: number;
  passes_accuracy: string;
  tackles_total: number;
  tackles_blocks: number;
  tackles_interceptions: number;
  duels_total: number;
  duels_won: number;
  dribbles_attempts: number;
  dribbles_success: number;
  dribbles_past: number;
  fouls_drawn: number;
  fouls_committed: number;
  cards_yellow: number;
  cards_red: number;
  penalty_won: number;
  penalty_committed: number;
  penalty_scored: number;
  penalty_missed: number;
  penalty_saved: number;
  created_at: string;
  updated_at: string;
  match: {
    id: string;
    api_id: number;
    date: string;
    league: string;
    season: string;
  };
} 