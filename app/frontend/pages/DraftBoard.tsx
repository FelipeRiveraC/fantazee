import React, { useState } from 'react';

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
import FormationPreview from '../components/FormationPreview';
import { FormationModal } from '../components/FormationModal';
import { TeamDetailsModal } from '../components/TeamDetailsModal';
import { TeamVisualization } from '../components/TeamVisualization';

const DraftBoard: React.FC = () => {
  const [selectedFormation, setSelectedFormation] = useState<Formation>('3-4-3');
  const [formation, setFormation] = useState<FormationPosition[]>(FORMATIONS['3-4-3'].positions);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTeamDetailsModal, setShowTeamDetailsModal] = useState(false);
  const [showFormationModal, setShowFormationModal] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [league, setLeague] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<'All' | 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker'>('All');

  // Use our custom hooks
  const { players: initialPlayers = [], loading: initialLoading, error: initialError } = usePlayers();
  const { players: searchedPlayers = [], loading: searchLoading, error: searchError } = usePlayerSearch(searchTerm);

  const createDraftTeam = useCreateDraftTeam();

  // Combine the players based on search term
  const players = searchTerm ? searchedPlayers : initialPlayers;
  const loading = initialLoading || searchLoading;
  const error = searchError || initialError;

  // Updated filter to include position filtering
  const filteredPlayers = players?.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition === 'All' || player.position === selectedPosition;
    return matchesSearch && matchesPosition;
  }) || [];

  // Saber si un jugador ya está drafteado
  const isPlayerDrafted = (playerId: string) =>
    formation.some((pos) => pos.playerId === playerId);

  const handleFormationChange = (newFormation: Formation) => {
    if (formation.some(pos => pos.playerId !== null)) {
      if (!confirm('Changing formation will reset your current team. Continue?')) {
        return;
      }
    }
    setSelectedFormation(newFormation);
    setFormation(FORMATIONS[newFormation].positions);
    setShowFormationModal(false);
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
      'GK': formationConfig.goalkeepers,
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

const getPlayerById = (playerId: string | null) =>
  initialPlayers.find((p) => p.id === playerId);

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
      
      // Clear the form and formation
      setDraftName('');
      setLeague('');
      setFormation(FORMATIONS[selectedFormation].positions.map(pos => ({
        ...pos,
        playerId: null
      })));
      setShowTeamDetailsModal(false);
      alert('Equipo creado exitosamente!');
    } catch (error) {
      alert('Error al crear el equipo');
    }
  };

  const handleFormationComplete = () => {
    const filledPositions = formation.filter(pos => pos.playerId !== null);
    if (filledPositions.length !== 11) {
      alert('Debes seleccionar 11 jugadores para completar tu formación');
      return;
    }
    setShowTeamDetailsModal(true);
  };

  const handleClearFormation = () => {
    if (confirm('¿Estás seguro de que quieres limpiar la formación actual?')) {
      // Reset to empty formation with the same structure
      const emptyFormation = FORMATIONS[selectedFormation].positions.map(pos => ({
        ...pos,
        playerId: null
      }));
      setFormation(emptyFormation);
    }
  };

  const handleRemovePlayer = (playerId: string) => {
    const updatedFormation = formation.map(pos => ({
      ...pos,
      playerId: pos.playerId === playerId ? null : pos.playerId
    }));
    setFormation(updatedFormation);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
        {/* Left side with formation */}
        <div className="w-full md:w-2/3">
          <div className="flex justify-between mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setShowFormationModal(true)}
                className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
              >
                Formation: {selectedFormation}
              </button>
              <button
                onClick={handleClearFormation}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Clear Formation
              </button>
            </div>
            <button
              onClick={handleFormationComplete}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Complete Team
            </button>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="aspect-[4/3] md:aspect-[3/2] relative">
              <TeamVisualization
                players={formation
                  .filter(pos => pos.playerId !== null)
                  .map(pos => getPlayerById(pos.playerId)!)
                }
                formation={selectedFormation}
                onRemovePlayer={handleRemovePlayer}
              />
            </div>
          </div>
        </div>

        {/* Right side with player search and list */}
        <div className="w-full md:w-1/3 flex flex-col h-full">
          <input
            type="text"
            placeholder="Buscar jugador..."
            className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <PlayerFilter
            selectedPosition={selectedPosition}
            onPositionChange={setSelectedPosition}
          />

          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="h-[calc(100vh-16rem)] overflow-y-auto">
              <PlayerList
                players={filteredPlayers}
                isPlayerDrafted={isPlayerDrafted}
                onDraftPlayer={handleDraftPlayer}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        </div>

        <FormationModal
          isOpen={showFormationModal}
          onClose={() => setShowFormationModal(false)}
          selectedFormation={selectedFormation}
          onFormationChange={handleFormationChange}
        />

        <TeamDetailsModal
          isOpen={showTeamDetailsModal}
          onClose={() => setShowTeamDetailsModal(false)}
          draftName={draftName}
          league={league}
          onDraftNameChange={setDraftName}
          onLeagueChange={setLeague}
          onSave={handleSaveDraft}
        />
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

interface PlayerFilterProps {
  selectedPosition: 'All' | 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker';
  onPositionChange: (position: 'All' | 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker') => void;
}

const PlayerFilter: React.FC<PlayerFilterProps> = ({ selectedPosition, onPositionChange }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-400">Filter by position:</span>
      <select
        value={selectedPosition}
        onChange={(e) =>
          onPositionChange(e.target.value as 'All' | 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker')
        }
        className="bg-gray-800 text-white p-2 rounded"
      >
        <option value="All">All</option>
        <option value="Goalkeeper">Goalkeeper</option>
        <option value="Defender">Defender</option>
        <option value="Midfielder">Midfielder</option>
        <option value="Attacker">Attacker</option>
      </select>
    </div>
  );
};

const PlayerList: React.FC<{ 
  players: Player[]; 
  isPlayerDrafted: (playerId: string) => boolean; 
  onDraftPlayer: (playerId: string, playerPosition: string) => void; 
  loading: boolean; 
  error: string | null 
}> = ({ players, isPlayerDrafted, onDraftPlayer, loading, error }) => {
  if (loading) return <div className="text-center py-4">Loading players...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="space-y-4 p-4">
      {players.map((player) => {
        const drafted = isPlayerDrafted(player.id);
        return (
          <div
            key={player.id}
            className="bg-gray-700 rounded-lg p-4 flex flex-col gap-2 
                     hover:bg-gray-600 transition-colors"
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
                  onClick={() => onDraftPlayer(player.id, player.position)}
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
  );
};

export default DraftBoard;
