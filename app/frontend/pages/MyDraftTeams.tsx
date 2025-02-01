import React from 'react';
import { DraftTeamsList } from '../components/DraftTeamsList';

export const MyDraftTeams: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Draft Teams</h1>
      <DraftTeamsList />
    </div>
  );
}; 