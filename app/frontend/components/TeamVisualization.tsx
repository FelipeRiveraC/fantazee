import React from 'react';
import { Formation, FORMATIONS, POSITION_MAP } from '../types/formations';

interface Player {
  id: string;
  name: string;
  position: string;
  photo?: string;
}

interface TeamVisualizationProps {
  players: Player[];
  formation?: Formation;
}

export const TeamVisualization: React.FC<TeamVisualizationProps> = ({ 
  players, 
  formation = '3-4-3' 
}) => {
  const formationPositions = FORMATIONS[formation].positions;
  const usedPlayerIds = new Set<string>();

  // Map players to their positions based on their role, ensuring each player is used only once
  const positionedPlayers = formationPositions.map(position => {
    const player = players.find(p => {
      const positionLabel = POSITION_MAP[p.position];
      return positionLabel === position.label && !usedPlayerIds.has(p.id);
    });

    if (player) {
      usedPlayerIds.add(player.id);
    }

    return {
      ...position,
      player: player || null
    };
  });

  return (
    <div className="relative w-full aspect-[2/3] bg-green-800 rounded-lg overflow-hidden">
      {/* Field markings */}
      <div className="absolute inset-0">
        <div className="absolute top-[33%] left-0 right-0 h-px bg-white opacity-50" />
        <div className="absolute top-[66%] left-0 right-0 h-px bg-white opacity-50" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-white opacity-50" />
        <div className="absolute bottom-[10%] left-1/2 w-[100px] h-[100px] -translate-x-1/2 border-2 border-white opacity-50 rounded-full" />
      </div>

      {/* Players */}
      <div className="absolute inset-0 grid grid-rows-4">
        {/* Attackers */}
        <div className="relative flex items-center justify-around px-8">
          {positionedPlayers
            .filter(pos => pos.label === 'FW')
            .map((position, idx) => (
              <PlayerMarker key={`fw-${idx}`} player={position.player} />
            ))}
        </div>

        {/* Midfielders */}
        <div className="relative flex items-center justify-around px-8">
          {positionedPlayers
            .filter(pos => pos.label === 'MF')
            .map((position, idx) => (
              <PlayerMarker key={`mf-${idx}`} player={position.player} />
            ))}
        </div>

        {/* Defenders */}
        <div className="relative flex items-center justify-around px-8">
          {positionedPlayers
            .filter(pos => pos.label === 'DF')
            .map((position, idx) => (
              <PlayerMarker key={`df-${idx}`} player={position.player} />
            ))}
        </div>

        {/* Goalkeeper */}
        <div className="relative flex items-center justify-center">
          {positionedPlayers
            .filter(pos => pos.label === 'GK')
            .map((position, idx) => (
              <PlayerMarker key={`gk-${idx}`} player={position.player} />
            ))}
        </div>
      </div>
    </div>
  );
};

const PlayerMarker: React.FC<{ player: Player | null }> = ({ player }) => {
  if (!player) return null;

  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center overflow-hidden">
        {player.photo && (
          <img 
            src={player.photo} 
            alt={player.name} 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <span className="mt-1 px-2 py-0.5 bg-black/50 rounded text-xs text-white">
        {player.name}
      </span>
    </div>
  );
}; 