export interface DraftTeam {
  id: string;
  name: string;
  league: string;
  players: string[];
}

export interface CreateDraftTeamRequest {
  name: string;
  league: string;
  players: string[];
  formation: string;
}

export interface UpdateDraftTeamRequest {
  name?: string;
  league?: string;
  players?: string[];
  formation?: string;
} 