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
  onRemovePlayer?: (playerId: string) => void;
}

export const TeamVisualization: React.FC<TeamVisualizationProps> = ({ 
  players, 
  formation = '3-4-3',
  onRemovePlayer 
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
    <div className="absolute inset-0 bg-green-800 rounded-lg overflow-hidden">
      {/* Field markings */}
      <div className="absolute inset-0">
        {/* Outer border */}
        <div className="absolute inset-2 border-2 border-white opacity-50" />
        
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white opacity-50 rounded-full">
          {/* Center circle lines */}
          <div className="absolute inset-0 rotate-90">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white opacity-50" />
          </div>
        </div>
        
        {/* Center line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white opacity-50 rotate-90" />
        
        {/* Penalty areas */}
        <div className="absolute top-2 left-[15%] right-[15%] h-[25%] border-2 border-white opacity-50" />
        <div className="absolute bottom-2 left-[15%] right-[15%] h-[25%] border-2 border-white opacity-50" />
        
        {/* Goal areas */}
        <div className="absolute top-2 left-[30%] right-[30%] h-[12%] border-2 border-white opacity-50" />
        <div className="absolute bottom-2 left-[30%] right-[30%] h-[12%] border-2 border-white opacity-50" />
        
        {/* Penalty spots */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-2 h-2 bg-white opacity-50 rounded-full" />
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-2 h-2 bg-white opacity-50 rounded-full" />
      </div>

      {/* Players grid */}
      <div className="absolute inset-0 grid grid-rows-4">
        {/* Attackers */}
        <div className="relative flex items-center justify-around px-12">
          {positionedPlayers
            .filter(pos => pos.label === 'FW')
            .map((position, idx) => (
              <PlayerMarker 
                key={`fw-${idx}`} 
                player={position.player} 
                onRemove={onRemovePlayer}
              />
            ))}
        </div>

        {/* Midfielders */}
        <div className="relative flex items-center justify-around px-12">
          {positionedPlayers
            .filter(pos => pos.label === 'MF')
            .map((position, idx) => (
              <PlayerMarker 
                key={`mf-${idx}`} 
                player={position.player} 
                onRemove={onRemovePlayer}
              />
            ))}
        </div>

        {/* Defenders */}
        <div className="relative flex items-center justify-around px-12">
          {positionedPlayers
            .filter(pos => pos.label === 'DF')
            .map((position, idx) => (
              <PlayerMarker 
                key={`df-${idx}`} 
                player={position.player} 
                onRemove={onRemovePlayer}
              />
            ))}
        </div>

        {/* Goalkeeper */}
        <div className="relative flex items-center justify-center">
          {positionedPlayers
            .filter(pos => pos.label === 'GK')
            .map((position, idx) => (
              <PlayerMarker 
                key={`gk-${idx}`} 
                player={position.player} 
                onRemove={onRemovePlayer}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

interface PlayerMarkerProps {
  player: Player | null;
  onRemove?: (playerId: string) => void;
}

const PlayerMarker: React.FC<PlayerMarkerProps> = ({ player, onRemove }) => {
  return (
    <div className="flex flex-col items-center group">
      <div className={`relative w-12 h-12 rounded-full flex items-center justify-center overflow-visible border-2 
        ${player ? 'bg-purple-600 border-white' : 'bg-gray-700 border-gray-600'}`}>
        {player && onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(player.id);
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 
                     rounded-full text-white font-bold text-base flex items-center 
                     justify-center opacity-0 group-hover:opacity-100 transition-opacity 
                     shadow-md z-20"
          >
            ×
          </button>
        )}
        <div className="w-full h-full rounded-full overflow-hidden">
          {player ? (
            player.photo ? (
              <img 
                src={player.photo} 
                alt={player.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-sm font-bold">
                {player.name.substring(0, 2)}
              </span>
            )
          ) : (
            <span className="text-gray-400 text-xs"/>
          )}
        </div>
      </div>
      {player && (
        <span className="mt-1 px-2 py-0.5 bg-black/50 rounded text-xs text-white whitespace-nowrap">
          {player.name}
        </span>
      )}
    </div>
  );
}; 