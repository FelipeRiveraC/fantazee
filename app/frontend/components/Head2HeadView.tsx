import React from 'react';
import { TeamVisualization } from './TeamVisualization';
import type { Formation } from '../types/formations';

interface Player {
  id: string;
  name: string;
  position: string;
  photo?: string;
  points?: number; // Mock points for this match
}

interface Team {
  id: string;
  name: string;
  formation: Formation;
  players: Player[];
}

interface Head2HeadViewProps {
  homeTeam: Team;
  awayTeam: Team;
}

export const Head2HeadView: React.FC<Head2HeadViewProps> = ({ homeTeam, awayTeam }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">{homeTeam.name}</h2>
          <p className="text-gray-400">Formation: {homeTeam.formation}</p>
        </div>
        <div className="text-center">
          <span className="text-3xl font-bold text-white">vs</span>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">{awayTeam.name}</h2>
          <p className="text-gray-400">Formation: {awayTeam.formation}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Home Team */}
        <div className="space-y-4">
          <div className="h-[400px] relative">
            <TeamVisualization
              players={homeTeam.players}
              formation={homeTeam.formation}
            />
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Player Points</h3>
            <div className="space-y-2">
              {homeTeam.players.map((player) => (
                <div key={player.id} className="flex justify-between items-center p-2 bg-gray-700 rounded">
                  <div className="flex items-center gap-2">
                    {player.photo && (
                      <img src={player.photo} alt="" className="w-8 h-8 rounded-full" />
                    )}
                    <span className="text-white">{player.name}</span>
                  </div>
                  <span className="text-green-400 font-semibold">{player.points || 0} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Away Team */}
        <div className="space-y-4">
          <div className="h-[400px] relative">
            <TeamVisualization
              players={awayTeam.players}
              formation={awayTeam.formation}
            />
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Player Points</h3>
            <div className="space-y-2">
              {awayTeam.players.map((player) => (
                <div key={player.id} className="flex justify-between items-center p-2 bg-gray-700 rounded">
                  <div className="flex items-center gap-2">
                    {player.photo && (
                      <img src={player.photo} alt="" className="w-8 h-8 rounded-full" />
                    )}
                    <span className="text-white">{player.name}</span>
                  </div>
                  <span className="text-green-400 font-semibold">{player.points || 0} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Total Points */}
      <div className="mt-6 flex justify-between items-center bg-gray-800 p-4 rounded-lg">
        <div className="text-center">
          <p className="text-lg text-white">Total Points</p>
          <p className="text-2xl font-bold text-green-400">
            {homeTeam.players.reduce((sum, player) => sum + (player.points || 0), 0)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-lg text-white">Total Points</p>
          <p className="text-2xl font-bold text-green-400">
            {awayTeam.players.reduce((sum, player) => sum + (player.points || 0), 0)}
          </p>
        </div>
      </div>
    </div>
  );
}; 