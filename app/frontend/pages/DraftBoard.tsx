import React, { useState } from 'react';
import { getPlayers, searchPlayers } from '../api/players';
import type { Player } from '../types/players';
import { usePlayers } from '../hooks/usePlayers';
import { usePlayerSearch } from '../hooks/usePlayerSearch';
import { useAccumulatedStatistics } from '../hooks/useAccumulatedStatistics';
import { useCreateDraftTeam } from '../hooks/useDraftTeams';
import { 
  Formation, 
  FormationPosition, 
  FORMATIONS, 
  POSITION_MAP 
} from '../types/formations';

const DraftBoard: React.FC = () => {
  const [selectedFormation, setSelectedFormation] = useState<Formation>('3-4-3');
  const [formation, setFormation] = useState<FormationPosition[]>(FORMATIONS['3-4-3'].positions);
  const [searchTerm, setSearchTerm] = useState('');
  const [draftName, setDraftName] = useState('');
  const [league, setLeague] = useState('');
  
  // Use our custom hooks
  const { players: initialPlayers = [], loading: initialLoading, error: initialError } = usePlayers();
  const { players: searchedPlayers = [], loading: searchLoading, error: searchError } = usePlayerSearch(searchTerm);

  const createDraftTeam = useCreateDraftTeam();

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

  const handleFormationChange = (newFormation: Formation) => {
    setSelectedFormation(newFormation);
    setFormation(FORMATIONS[newFormation].positions);
  };

  const validateFormation = (playerId: string, playerPosition: string) => {
    const formationConfig = FORMATIONS[selectedFormation];
    const currentPlayers = formation.filter(pos => pos.playerId !== null);
    
    // Special case for goalkeeper
    if (playerPosition === 'Goalkeeper') {
      const hasGoalkeeper = currentPlayers.some(p => p.label === 'GK');
      return !hasGoalkeeper; // Allow only one goalkeeper
    }

    const formationLabel = POSITION_MAP[playerPosition];
    const currentPositionCount = currentPlayers.filter(p => 
      p.label === formationLabel
    ).length;

    const maxForPosition = {
      'DF': formationConfig.defenders,
      'MF': formationConfig.midfielders,
      'FW': formationConfig.attackers
    }[formationLabel];

    return currentPositionCount < maxForPosition;
  };

  const handleDraftPlayer = (playerId: string, playerPosition: string) => {
    if (isPlayerDrafted(playerId)) {
      alert('Este jugador ya está en tu formación.');
      return;
    }
    
    const formationPosition = POSITION_MAP[playerPosition];
    
    if (!validateFormation(playerId, playerPosition)) {
      if (playerPosition === 'Goalkeeper') {
        alert('Ya tienes un portero en tu formación.');
      } else {
        alert(`Ya tienes el máximo de jugadores permitidos para esta posición en la formación ${selectedFormation}`);
      }
      return;
    }
    
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

  const handleSaveDraft = async () => {
    if (!draftName || !league) {
      alert('Por favor ingresa un nombre y liga para tu equipo');
      return;
    }

    const playerIds = formation
      .filter(pos => pos.playerId !== null)
      .map(pos => pos.playerId as string);

    if (playerIds.length === 0) {
      alert('Debes seleccionar al menos un jugador para tu equipo');
      return;
    }

    try {
      await createDraftTeam.mutateAsync({
        name: draftName,
        league,
        players: playerIds
      });
      setDraftName('');
      setLeague('');
      setFormation(FORMATIONS['3-4-3'].positions);
      alert('Equipo creado exitosamente!');
    } catch (error) {
      alert('Error al crear el equipo');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="flex gap-4 h-[calc(100vh-2rem)]">
        {/* Formation Selector */}
        <div className="mb-4">
          <select
            value={selectedFormation}
            onChange={(e) => handleFormationChange(e.target.value as Formation)}
            className="w-full p-2 rounded bg-gray-800 text-white"
          >
            <option value="3-4-3">3-4-3</option>
            <option value="4-4-2">4-4-2</option>
          </select>
        </div>

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
        
        {/* Draft Team Form */}
        <div className="mt-4 bg-gray-800 p-4 rounded-lg">
          <input
            type="text"
            placeholder="Nombre del Equipo"
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Liga"
            className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
            value={league}
            onChange={(e) => setLeague(e.target.value)}
          />
          <button
            onClick={handleSaveDraft}
            className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition-colors"
          >
            Guardar Equipo
          </button>
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
