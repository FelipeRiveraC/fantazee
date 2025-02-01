import authedAxios from './axios/authedAxios';
import { CreateDraftTeamRequest, DraftTeam, UpdateDraftTeamRequest } from '../types/drafts';

export const createDraftTeam = async (data: CreateDraftTeamRequest): Promise<DraftTeam> => {
  const response = await authedAxios.post('/api/v1/draft_teams', { draft_team: data });
  return response.data;
};

export const updateDraftTeam = async (id: string, data: UpdateDraftTeamRequest): Promise<DraftTeam> => {
  const response = await authedAxios.patch(`/api/v1/draft_teams/${id}`, { draft_team: data });
  return response.data;
};

export const getDraftTeams = async (): Promise<DraftTeam[]> => {
  const response = await authedAxios.get('/api/v1/draft_teams');
  return response.data;
};

export const getMyDraftTeams = async () => {
  const response = await authedAxios.get('/api/v1/draft_teams/my_teams');
  return response.data;
}; 