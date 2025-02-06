import React, { useState } from 'react';
import { useMyDraftTeams } from '../hooks/useMyDraftTeams';
import { Link } from 'react-router-dom';
import { TeamViewModal } from './TeamViewModal';
import { TeamVisualization } from './TeamVisualization';

export const DraftTeamsList: React.FC = () => {
  const { data: teams, isLoading, error } = useMyDraftTeams();
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error loading teams</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams?.map((team) => (
          <div key={team.id} className="bg-gray-800 rounded-lg p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold">{team.name}</h2>
                <p className="text-gray-400">{team.league}</p>
                <p className="text-gray-400">Formation: {team.formation}</p>
                <p className="mt-2">Players: {team.players.length}/11</p>
              </div>
            </div>

            <div className="h-[400px] relative mb-4">
              <TeamVisualization
                players={team.players}
                formation={team.formation as Formation}
              />
            </div>

            <button
              onClick={() => {
                setSelectedTeam(team);
                setIsModalOpen(true);
              }}
              className="w-full bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition-colors"
            >
              View Formation
            </button>
          </div>
        ))}
      </div>

      <TeamViewModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTeam(null);
        }}
        team={selectedTeam}
      />
    </>
  );
}; 