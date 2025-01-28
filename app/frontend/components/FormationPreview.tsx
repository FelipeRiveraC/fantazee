import React from 'react';
import { Formation, FORMATIONS } from '../types/formations';

interface FormationPreviewProps {
  formation: Formation;
  isSelected: boolean;
  onSelect: (formation: Formation) => void;
}

const FormationPreview: React.FC<FormationPreviewProps> = ({ 
  formation, 
  isSelected, 
  onSelect 
}) => {
  return (
    <button
      onClick={() => onSelect(formation)}
      className={`relative w-32 h-40 p-2 rounded-lg transition-all ${
        isSelected ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
      }`}
    >
      <div className="text-center mb-2 font-bold">{formation}</div>
      <div className="relative w-full h-32 bg-green-900/50 rounded">
        {FORMATIONS[formation].positions.map((pos) => (
          <div
            key={pos.id}
            className="absolute w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: pos.top, left: pos.left }}
          />
        ))}
      </div>
    </button>
  );
};

export default FormationPreview; 