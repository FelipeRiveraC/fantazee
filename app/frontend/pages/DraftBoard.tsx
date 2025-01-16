import React, { useState } from 'react';
import { getPlayers, searchPlayers } from '../api/players';
import type { Player } from '../types/players';
import { usePlayers } from '../hooks/usePlayers';
import { usePlayerSearch } from '../hooks/usePlayerSearch';
import { useAccumulatedStatistics } from '../hooks/useAccumulatedStatistics';

interface FormationPosition {
  id: number;
  label: 'GK' | 'DF' | 'MF' | 'FW';
  playerId: string | null;
  top: string;
  left: string;
}

const initialFormation: FormationPosition[] = [
  // GK
  { id: 1, label: 'GK', playerId: null, top: '50%', left: '10%' },
  // Defensas (4)
  { id: 2, label: 'DF', playerId: null, top: '20%', left: '25%' },
  { id: 3, label: 'DF', playerId: null, top: '40%', left: '25%' },
  { id: 4, label: 'DF', playerId: null, top: '60%', left: '25%' },
  { id: 5, label: 'DF', playerId: null, top: '80%', left: '25%' },
  // Mediocampistas (3)
  { id: 6, label: 'MF', playerId: null, top: '35%', left: '45%' },
  { id: 7, label: 'MF', playerId: null, top: '50%', left: '45%' },
  { id: 8, label: 'MF', playerId: null, top: '65%', left: '45%' },
  // Delanteros (3)
  { id: 9, label: 'FW', playerId: null, top: '30%', left: '65%' },
  { id: 10, label: 'FW', playerId: null, top: '50%', left: '65%' },
  { id: 11, label: 'FW', playerId: null, top: '70%', left: '65%' },
];

const DraftBoard: React.FC = () => {
  const [formation, setFormation] = useState<FormationPosition[]>(initialFormation);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use our custom hooks
  const { players: initialPlayers = [], loading: initialLoading, error: initialError } = usePlayers();
  const { players: searchedPlayers = [], loading: searchLoading, error: searchError } = usePlayerSearch(searchTerm);

  // Combine the players based on search term
  const players = searchTerm ? searchedPlayers : initialPlayers;
  const loading = initialLoading || searchLoading;
  const error = searchError || initialError;

  // Filter players by name (this is now done client-side for better UX)
  const filteredPlayers = players?.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Saber si un jugador ya está drafteado
  const isPlayerDrafted = (playerId: string) =>
    formation.some((pos) => pos.playerId === playerId);

  // Draftear: Asignar jugador a la primera posición vacía de su rol
  const handleDraftPlayer = (playerId: string, playerPosition: string) => {
    if (isPlayerDrafted(playerId)) {
      alert('Este jugador ya está en tu formación.');
      return;
    }
    
    // Convert API position to formation position
    const positionMap: { [key: string]: 'GK' | 'DF' | 'MF' | 'FW' } = {
      'Goalkeeper': 'GK',
      'Defender': 'DF',
      'Midfielder': 'MF',
      'Attacker': 'FW'
    };
    
    const formationPosition = positionMap[playerPosition];
    
    const positionIndex = formation.findIndex(
      (pos) => pos.label === formationPosition && pos.playerId === null
    );
    
    if (positionIndex === -1) {
      alert('No hay posiciones disponibles para este jugador.');
      return;
    }
    
    const updatedFormation = [...formation];
    updatedFormation[positionIndex].playerId = playerId;
    setFormation(updatedFormation);
  };

  // Get player by ID helper
  const getPlayerById = (playerId: string | null) =>
    players.find((p) => p.id === playerId);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="flex gap-4 h-[calc(100vh-2rem)]">
        {/* Soccer Field */}
        <div className="w-2/3 relative bg-green-800 rounded-lg aspect-[4/3] border-2 border-white/20">
          {/* Field Lines */}
          <div className="absolute inset-0">
            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            {/* Center Line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0 border-l-2 border-white/20 transform -translate-x-1/2" />
            {/* Penalty Areas */}
            <div className="absolute top-1/4 left-0 w-1/6 h-1/2 border-2 border-l-0 border-white/20" />
            <div className="absolute top-1/4 right-0 w-1/6 h-1/2 border-2 border-r-0 border-white/20" />
            {/* Goal Areas */}
            <div className="absolute top-[35%] left-0 w-[8%] h-[30%] border-2 border-l-0 border-white/20" />
            <div className="absolute top-[35%] right-0 w-[8%] h-[30%] border-2 border-r-0 border-white/20" />
          </div>

          {/* Player Positions */}
          {formation.map((pos) => {
            const player = pos.playerId ? getPlayerById(pos.playerId) : null;
            return (
              <div
                key={pos.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: pos.top, left: pos.left }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center relative
                             ${player ? 'bg-purple-600' : 'bg-gray-800'}`}>
                  {player ? (
                    <>
                      <img
                        src={player.photo}
                        alt={player.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <button
                        onClick={() => {
                          const updatedFormation = formation.map(p => 
                            p.id === pos.id ? { ...p, playerId: null } : p
                          );
                          setFormation(updatedFormation);
                        }}
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 
                                 text-white text-xs flex items-center justify-center
                                 hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <span className="text-white font-bold">{pos.label}</span>
                  )}
                </div>
                {player && (
                  <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 
                               text-xs text-white text-center whitespace-nowrap">
                    {player.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Player List */}
        <div className="w-1/3 flex flex-col">
          <input
            type="text"
            placeholder="Buscar jugador..."
            className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {loading ? (
            <div className="text-center py-4">
              <p>Loading players...</p>
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">
              <p>{error}</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {filteredPlayers.map((player) => {
                const drafted = isPlayerDrafted(player.id);
                return (
                  <div
                    key={player.id}
                    className="bg-gray-800 rounded-lg p-4 flex flex-col gap-2 
                             hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-gray-400 text-sm">
                          {player.position} - {player.team}
                        </p>
                      </div>
                      
                      {drafted ? (
                        <button
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg 
                                    text-sm font-semibold cursor-not-allowed"
                          title="Jugador ya drafteado"
                          disabled
                        >
                          ✅
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDraftPlayer(player.id, player.position)}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700
                                    text-white rounded-lg text-sm font-semibold
                                    transition-colors"
                        >
                          Draftear
                        </button>
                      )}
                    </div>

                    {/* Player Statistics */}
                    {!drafted && (
                      <AccumulatedStats playerId={player.id} />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AccumulatedStats: React.FC<{ playerId: string }> = ({ playerId }) => {
  const { stats, loading, error } = useAccumulatedStatistics(playerId);

  if (loading) return <div className="text-sm text-gray-400">Loading stats...</div>;
  if (error) return null;
  if (!stats) return null;

  return (
    <div className="text-sm text-gray-300 grid grid-cols-2 gap-2 mt-2">
      <p>Partidos: {stats.total_matches}</p>
      <p>Rating Prom: {stats.average_rating}</p>
      <p>Minutos Tot: {stats.total_minutes}</p>
      {stats.total_saves > 0 ? (
        <>
          <p>Atajadas: {stats.total_saves}</p>
          <p>Valla Invicta: {stats.clean_sheets}</p>
        </>
      ) : (
        <>
          <p>Pases Precisión: {stats.average_pass_accuracy}%</p>
          <p>Tarjetas: {stats.yellow_cards}A/{stats.red_cards}R</p>
        </>
      )}
    </div>
  );
};

export default DraftBoard;
