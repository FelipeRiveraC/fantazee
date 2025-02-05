import React from 'react';

interface TeamDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  draftName: string;
  league: string;
  onDraftNameChange: (name: string) => void;
  onLeagueChange: (league: string) => void;
  onSave: () => void;
}

export const TeamDetailsModal: React.FC<TeamDetailsModalProps> = ({
  isOpen,
  onClose,
  draftName,
  league,
  onDraftNameChange,
  onLeagueChange,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Completa los Detalles del Equipo</h2>
        <input
          type="text"
          placeholder="Nombre del Equipo"
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
          value={draftName}
          onChange={(e) => onDraftNameChange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Liga"
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
          value={league}
          onChange={(e) => onLeagueChange(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={onSave}
            className="flex-1 bg-purple-600 text-white p-3 rounded font-bold hover:bg-purple-700 transition-colors"
          >
            Guardar Equipo
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 text-white p-3 rounded font-bold hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}; 