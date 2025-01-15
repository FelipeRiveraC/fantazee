import React, { useState } from 'react';
import { createTravel } from '../api/travels';
import type { TravelCreateForm } from 'types/travels';

const CreateTravelForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState<number | ''>('');
  const [currency, setCurrency] = useState('');
  const [maxPassengers, setMaxPassengers] = useState<number | ''>('');
  const [travelType, setTravelType] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const newTravel: TravelCreateForm = {
      name,
      description,
      origin,
      destination,
      start_date: startDate,
      end_date: endDate,
      estimated_budget: estimatedBudget || undefined,
      currency,
      max_participants: maxPassengers || undefined,
      travel_type: travelType,
      is_public: isPublic,
    };

    try {
      await createTravel(newTravel);
      setSuccessMessage('Ride created successfully!');
      setName('');
      setDescription('');
      setOrigin('');
      setDestination('');
      setStartDate('');
      setEndDate('');
      setEstimatedBudget('');
      setCurrency('');
      setMaxPassengers('');
      setTravelType('');
      setIsPublic(false);
    } catch (err) {
      setError('Failed to create ride');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-xl space-y-8"
    >
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Create a New Ride</h2>

      {successMessage && <p className="text-center text-green-600">{successMessage}</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-semibold text-gray-600">Ride Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300 ease-in-out"
          placeholder="Enter ride name"
          required
        />
      </div>

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-semibold text-gray-600">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300 ease-in-out"
          placeholder="Enter ride description"
          required
        />
      </div>

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-semibold text-gray-600">Pickup Location</label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300 ease-in-out"
          placeholder="Enter pickup location"
        />
      </div>

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-semibold text-gray-600">Drop-off Location</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300 ease-in-out"
          placeholder="Enter drop-off location"
        />
      </div>

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-semibold text-gray-600">Pickup Time</label>
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300 ease-in-out"
        />
      </div>

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-semibold text-gray-600">Drop-off Time</label>
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300 ease-in-out"
        />
      </div>

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-semibold text-gray-600">Estimated Cost</label>
        <input
          type="number"
          value={estimatedBudget}
          onChange={(e) => setEstimatedBudget(Number(e.target.value))}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300 ease-in-out"
          placeholder="Enter estimated cost"
        />
      </div>

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-semibold text-gray-600">Currency</label>
        <input
          type="text"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300 ease-in-out"
          placeholder="Enter currency (e.g., USD, CLP)"
        />
      </div>

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-semibold text-gray-600">Maximum Passengers</label>
        <input
          type="number"
          value={maxPassengers}
          onChange={(e) => setMaxPassengers(Number(e.target.value))}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300 ease-in-out"
          placeholder="Enter maximum passengers"
        />
      </div>

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-semibold text-gray-600">Ride Type</label>
        <select
          value={travelType}
          onChange={(e) => setTravelType(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300 ease-in-out"
        >
          <option value="">Select type</option>
          <option value="business">Business</option>
          <option value="leisure">Leisure</option>
          <option value="adventure">Adventure</option>
          <option value="cultural">Cultural</option>
        </select>
      </div>

      <div className="flex items-center space-x-3">
        <label className="text-sm font-semibold text-gray-600">Public</label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="h-5 w-5 border border-gray-300 rounded focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300 ease-in-out"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 text-lg font-medium text-white rounded-lg transition-colors duration-300 ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700'
        } focus:outline-none focus:ring-4 focus:ring-indigo-500`}
      >
        {loading ? 'Creating...' : 'Create Ride'}
      </button>
    </form>
  );
};

export default CreateTravelForm;
