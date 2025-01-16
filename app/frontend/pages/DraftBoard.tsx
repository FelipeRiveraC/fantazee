import React, { useState } from 'react';

interface Player {
  id: number;
  name: string;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  team: string;
  goals: number;
  assists: number;
  rating: number;
}

// Jugadores "mock" con estadísticas
const mockPlayers: Player[] = [
  {
    id: 1,
    name: 'Erling Haaland',
    position: 'FW',
    team: 'Manchester City',
    goals: 28,
    assists: 5,
    rating: 9.5,
  },
  {
    id: 2,
    name: 'Marcus Rashford',
    position: 'FW',
    team: 'Manchester United',
    goals: 17,
    assists: 6,
    rating: 8.9,
  },
  {
    id: 3,
    name: 'Mohamed Salah',
    position: 'FW',
    team: 'Liverpool',
    goals: 19,
    assists: 7,
    rating: 8.7,
  },
  {
    id: 4,
    name: 'Heung-Min Son',
    position: 'FW',
    team: 'Tottenham',
    goals: 15,
    assists: 4,
    rating: 8.2,
  },
  {
    id: 5,
    name: 'Kevin De Bruyne',
    position: 'MF',
    team: 'Manchester City',
    goals: 9,
    assists: 12,
    rating: 9.0,
  },
  {
    id: 6,
    name: 'Bruno Fernandes',
    position: 'MF',
    team: 'Manchester United',
    goals: 10,
    assists: 8,
    rating: 8.6,
  },
  {
    id: 7,
    name: 'Declan Rice',
    position: 'MF',
    team: 'Arsenal',
    goals: 2,
    assists: 3,
    rating: 8.1,
  },
  {
    id: 8,
    name: 'Virgil van Dijk',
    position: 'DF',
    team: 'Liverpool',
    goals: 3,
    assists: 1,
    rating: 8.4,
  },
  {
    id: 9,
    name: 'Lisandro Martínez',
    position: 'DF',
    team: 'Manchester United',
    goals: 1,
    assists: 0,
    rating: 7.8,
  },
  {
    id: 10,
    name: 'John Stones',
    position: 'DF',
    team: 'Manchester City',
    goals: 2,
    assists: 1,
    rating: 7.9,
  },
  {
    id: 11,
    name: 'Ben Chilwell',
    position: 'DF',
    team: 'Chelsea',
    goals: 2,
    assists: 3,
    rating: 7.5,
  },
  {
    id: 12,
    name: 'Aaron Ramsdale',
    position: 'GK',
    team: 'Arsenal',
    goals: 0,
    assists: 0,
    rating: 8.0,
  },
  {
    id: 13,
    name: 'Alisson Becker',
    position: 'GK',
    team: 'Liverpool',
    goals: 0,
    assists: 1,
    rating: 8.3,
  },
];

// Formación 4-3-3 (media cancha, 11 posiciones)
type FormationPosition = {
  id: number;
  label: 'GK' | 'DF' | 'MF' | 'FW';
  playerId: number | null;
  top: string;
  left: string;
};

const initialFormation: FormationPosition[] = [
  // GK
  { id: 1, label: 'GK', playerId: null, top: '50%', left: '10%' },
  // Defensas (4)
  { id: 2, label: 'DF', playerId: null, top: '20%', left: '30%' },
  { id: 3, label: 'DF', playerId: null, top: '35%', left: '30%' },
  { id: 4, label: 'DF', playerId: null, top: '65%', left: '30%' },
  { id: 5, label: 'DF', playerId: null, top: '80%', left: '30%' },
  // Mediocampistas (3)
  { id: 6, label: 'MF', playerId: null, top: '30%', left: '50%' },
  { id: 7, label: 'MF', playerId: null, top: '50%', left: '50%' },
  { id: 8, label: 'MF', playerId: null, top: '70%', left: '50%' },
  // Delanteros (3)
  { id: 9, label: 'FW', playerId: null, top: '25%', left: '70%' },
  { id: 10, label: 'FW', playerId: null, top: '50%', left: '70%' },
  { id: 11, label: 'FW', playerId: null, top: '75%', left: '70%' },
];

const DraftBoard: React.FC = () => {
  const [formation, setFormation] = useState<FormationPosition[]>(initialFormation);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar jugadores por nombre
  const filteredPlayers = mockPlayers.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Saber si un jugador ya está drafteado
  const isPlayerDrafted = (playerId: number) =>
    formation.some((pos) => pos.playerId === playerId);

  // Draftear: Asignar jugador a la primera posición vacía de su rol
  const handleDraftPlayer = (playerId: number, playerPosition: string) => {
    if (isPlayerDrafted(playerId)) {
      alert('Este jugador ya está en tu formación.');
      return;
    }
    const positionIndex = formation.findIndex(
      (pos) => pos.label === playerPosition && pos.playerId === null
    );
    if (positionIndex === -1) {
      alert('No hay posiciones disponibles para este jugador.');
      return;
    }
    const updatedFormation = [...formation];
    updatedFormation[positionIndex].playerId = playerId;
    setFormation(updatedFormation);
  };

  // Quitar (desdraftear) jugador de su posición
  const handleUnDraftPlayer = (positionId: number) => {
    setFormation((prev) =>
      prev.map((pos) => (pos.id === positionId ? { ...pos, playerId: null } : pos))
    );
  };

  // Obtener jugador asignado a una posición
  const getPlayerById = (playerId: number | null) =>
    mockPlayers.find((p) => p.id === playerId);

  // Construir array de jugadores drafteados (para la tabla de detalle)
  const draftedPlayers = formation
    .map((pos) => {
      const player = getPlayerById(pos.playerId);
      if (!player) return null; // sin jugador asignado
      return {
        positionLabel: pos.label,
        ...player,
      };
    })
    .filter(Boolean) as Array<{ positionLabel: string } & Player>;

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Sección principal */}
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-start">
        
        {/* Sección Izquierda: Media Cancha */}
        <div className="md:w-2/3 flex justify-center">
          <div className="relative w-full h-[600px] max-w-[1200px]">
            {/* Césped */}
            <div className="absolute inset-0 bg-green-600 rounded-lg shadow-xl overflow-hidden" />

            {/* Bordes exteriores */}
            <div className="absolute inset-0 border-4 border-white rounded-lg pointer-events-none" />

            {/* Línea de gol (izquierda) */}
            <div className="absolute left-0 top-0 bottom-0 w-1 border-r-4 border-white pointer-events-none" />

            {/* Línea media (derecha) */}
            <div className="absolute right-0 top-0 bottom-0 w-1 border-r-4 border-white pointer-events-none" />

            {/* Área grande */}
            <div
              className="absolute border border-white pointer-events-none"
              style={{
                top: '25%',
                left: 0,
                width: '18%',
                height: '50%',
                marginLeft: '4px',
              }}
            />

            {/* Área pequeña */}
            <div
              className="absolute border border-white pointer-events-none"
              style={{
                top: '37.5%',
                left: 0,
                width: '9%',
                height: '25%',
                marginLeft: '4px',
              }}
            />

            {/* Punto penal */}
            <div
              className="absolute w-2 h-2 bg-white rounded-full pointer-events-none"
              style={{
                top: '50%',
                left: '14%',
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* Posiciones de la formación (4-3-3) */}
            {formation.map((pos) => {
              const assignedPlayer = getPlayerById(pos.playerId);
              return (
                <div
                  key={pos.id}
                  className="absolute flex flex-col items-center justify-center
                             w-16 h-16 rounded-full bg-gray-800 bg-opacity-80
                             border border-white text-center text-xs
                             shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                  style={{ top: pos.top, left: pos.left }}
                >
                  {/* La X para quitar jugador, arriba a la izquierda, si hay jugador */}
                  {assignedPlayer && (
                    <div
                      onClick={() => handleUnDraftPlayer(pos.id)}
                      className="absolute top-0 left-0 
                                 w-5 h-5 rounded-full bg-red-600 
                                 flex items-center justify-center 
                                 cursor-pointer
                                 transform -translate-x-1/4 -translate-y-1/4
                                 hover:bg-red-700 transition-colors"
                      title="Quitar jugador"
                    >
                      <span className="text-xs text-black font-bold">X</span>
                    </div>
                  )}
                  <span className="font-bold text-sm">{pos.label}</span>
                  <span className="text-xs mt-1">
                    {assignedPlayer ? assignedPlayer.name : 'Vacío'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sección Derecha: Lista de Jugadores */}
        <div className="md:w-1/3 flex flex-col">
          <h2 className="text-2xl font-bold mb-4 bg-clip-text">
            Draft de Jugadores
          </h2>

          {/* Buscador */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar jugador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white 
                         border border-gray-700 placeholder-gray-400
                         focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Lista + estadísticas */}
          <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
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
                    
                    {/* Botón: Draftear o Seleccionado */}
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

                  {/* Estadísticas */}
                  <div className="text-gray-300 text-sm pl-1">
                    <p>
                      <span className="font-bold">Goles:</span> {player.goals}
                    </p>
                    <p>
                      <span className="font-bold">Asistencias:</span> {player.assists}
                    </p>
                    <p>
                      <span className="font-bold">Calificación:</span> {player.rating}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sección inferior: Tabla de Detalle del Draft */}
      <section className="container mx-auto px-4 pb-8">
        <h2 className="text-2xl font-bold my-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-500">
          Detalle del Draft
        </h2>
        {draftedPlayers.length === 0 ? (
          <p className="text-gray-400">Aún no has drafteado a ningún jugador.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700 text-gray-200">
                <tr>
                  <th className="px-4 py-2">Posición</th>
                  <th className="px-4 py-2">Jugador</th>
                  <th className="px-4 py-2">Equipo</th>
                  <th className="px-4 py-2">Goles</th>
                  <th className="px-4 py-2">Asistencias</th>
                  <th className="px-4 py-2">Calificación</th>
                </tr>
              </thead>
              <tbody>
                {draftedPlayers.map((dp) => (
                  <tr key={dp.id} className="border-b border-gray-700">
                    <td className="px-4 py-2">{dp.positionLabel}</td>
                    <td className="px-4 py-2">{dp.name}</td>
                    <td className="px-4 py-2">{dp.team}</td>
                    <td className="px-4 py-2">{dp.goals}</td>
                    <td className="px-4 py-2">{dp.assists}</td>
                    <td className="px-4 py-2">{dp.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default DraftBoard;
