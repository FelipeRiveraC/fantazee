import React from 'react';
import { Formation, FORMATIONS } from '../types/formations';
import FormationPreview from './FormationPreview';

interface FormationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFormation: Formation;
  onFormationChange: (formation: Formation) => void;
}

export const FormationModal: React.FC<FormationModalProps> = ({
  isOpen,
  onClose,
  selectedFormation,
  onFormationChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Select Formation</h2>
        <div className="flex gap-4">
          {(Object.keys(FORMATIONS) as Formation[]).map((formationType) => (
            <FormationPreview
              key={formationType}
              formation={formationType}
              isSelected={selectedFormation === formationType}
              onSelect={onFormationChange}
            />
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}; 