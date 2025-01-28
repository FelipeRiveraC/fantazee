import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDraftTeam, getDraftTeams, updateDraftTeam } from '../api/draftTeams';
import type { CreateDraftTeamRequest, UpdateDraftTeamRequest } from '../types/drafts';

export const useDraftTeams = () => {
  return useQuery({
    queryKey: ['draftTeams'],
    queryFn: getDraftTeams
  });
};

export const useCreateDraftTeam = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateDraftTeamRequest) => createDraftTeam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftTeams'] });
    }
  });
};

export const useUpdateDraftTeam = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDraftTeamRequest }) => 
      updateDraftTeam(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftTeams'] });
    }
  });
}; 