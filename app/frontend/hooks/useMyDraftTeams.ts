import { useQuery } from '@tanstack/react-query';
import { getMyDraftTeams } from '../api/draftTeams';

export const useMyDraftTeams = () => {
  return useQuery({
    queryKey: ['myDraftTeams'],
    queryFn: getMyDraftTeams,
  });
}; 