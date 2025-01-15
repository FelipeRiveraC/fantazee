// src/components/EditTravelForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getTravel, updateTravel } from '../api/travels';
import type { Travel } from 'types/travels';

const EditTravelForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Para redirigir después de la actualización

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const response = await getTravel(id!);
        setName(response.travel.name);
        setDescription(response.travel.description);
      } catch (err) {
        setError('Failed to load travel data');
      }
    };
    if (id) fetchTravel();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await updateTravel(id!, { name, description });
      setSuccessMessage('Travel updated successfully!');
      navigate('/travels'); // Redirige a la lista de viajes después de editar
    } catch (err) {
      setError('Failed to update travel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-xl space-y-8">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Edit Travel</h2>

      {successMessage && <p className="text-center text-green-600">{successMessage}</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-semibold text-gray-600">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300 ease-in-out"
          placeholder="Enter travel name"
          required
        />
      </div>

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-semibold text-gray-600">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300 ease-in-out"
          placeholder="Enter travel description"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 text-lg font-medium text-white rounded-lg transition-colors duration-300 ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700'
        } focus:outline-none focus:ring-4 focus:ring-indigo-500`}
      >
        {loading ? 'Updating...' : 'Update Travel'}
      </button>
      <button
        type="button"
        onClick={() => navigate('/travels')} // Redirige al listado al cancelar
        className="mt-4 w-full py-2 text-lg font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditTravelForm;
