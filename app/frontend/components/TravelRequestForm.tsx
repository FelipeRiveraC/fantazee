// src/components/TravelRequestForm.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createTravelRequest } from '../api/travels';

const TravelRequestForm: React.FC = () => {
  const { id: travelId } = useParams<{ id: string }>();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (travelId) {
        await createTravelRequest(travelId, { message });
        setMessage('');
        alert('Travel request created successfully');
      }
    } catch (err) {
      setError('Failed to create travel request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-2xl font-semibold text-center text-indigo-700">Create Travel Request</h2>

      {error && <p className="text-red-600 text-center">{error}</p>}

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          rows={3}
          placeholder="Enter your request message"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
      >
        {loading ? 'Creating...' : 'Create Request'}
      </button>
    </form>
  );
};

export default TravelRequestForm;
