import React from 'react';
import { TeamVisualization } from './TeamVisualization';
import { Formation } from '../types/formations';

interface Player {
  id: string;
  name: string;
  position: string;
  photo?: string;
}

interface TeamViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: {
    id: string;
    name: string;
    league: string;
    formation: string;
    players: Player[];
  } | null;
}

export const TeamViewModal: React.FC<TeamViewModalProps> = ({ isOpen, onClose, team }) => {
  if (!isOpen || !team) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg max-h-[90vh] w-full max-w-6xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">{team.name}</h2>
            <p className="text-gray-400">{team.league}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Formation View */}
            <div className="bg-gray-900 rounded-lg p-4 h-full">
              <h3 className="text-lg font-medium text-white mb-4">
                Formation: {team.formation}
              </h3>
              <div className="h-[calc(100vh-15rem)] relative">
                <TeamVisualization 
                  players={team.players} 
                  formation={team.formation as Formation}
                />
              </div>
            </div>

            {/* Squad List */}
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-4">Squad List</h3>
              <div className="grid grid-cols-1 gap-2 max-h-[60vh] overflow-y-auto pr-2">
                {/* Goalkeepers */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Goalkeepers</h4>
                  {team.players
                    .filter(player => player.position === 'Goalkeeper')
                    .map((player) => (
                      <PlayerCard key={player.id} player={player} />
                    ))}
                </div>

                {/* Defenders */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Defenders</h4>
                  {team.players
                    .filter(player => player.position === 'Defender')
                    .map((player) => (
                      <PlayerCard key={player.id} player={player} />
                    ))}
                </div>

                {/* Midfielders */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Midfielders</h4>
                  {team.players
                    .filter(player => player.position === 'Midfielder')
                    .map((player) => (
                      <PlayerCard key={player.id} player={player} />
                    ))}
                </div>

                {/* Attackers */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Attackers</h4>
                  {team.players
                    .filter(player => player.position === 'Attacker')
                    .map((player) => (
                      <PlayerCard key={player.id} player={player} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayerCard: React.FC<{ player: Player }> = ({ player }) => (
  <div className="flex items-center space-x-3 bg-gray-800 p-3 rounded">
    {player.photo && (
      <img 
        src={player.photo} 
        alt={player.name} 
        className="w-10 h-10 rounded-full object-cover"
      />
    )}
    <div>
      <p className="font-medium text-white">{player.name}</p>
      <p className="text-sm text-gray-400">{player.position}</p>
    </div>
  </div>
); 