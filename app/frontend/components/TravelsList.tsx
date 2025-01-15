import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getTravels, deleteTravel } from '../api/travels';
import type { Travel } from 'types/travels';
import { useAuth } from '../context/AuthContext';

const TravelsList: React.FC = () => {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'my' | 'requested' | 'accepted'>('my');
  const [startDate, setStartDate] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [startDateQuery, setStartDateQuery] = useState<string>('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const formatDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchTravels = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          all: filter === 'all',
          requested: filter === 'requested',
          accepted: filter === 'accepted',
          start_date: startDateQuery ? formatDate(startDateQuery) : undefined,
          search: searchQuery || undefined,
        };
        const response = await getTravels(params);
        setTravels(response.travels);
      } catch (err) {
        setError('Failed to load travels');
      } finally {
        setLoading(false);
      }
    };
    fetchTravels();
  }, [filter, startDateQuery, searchQuery]);

  const handleDelete = async (id: string) => {
    try {
      await deleteTravel(id);
      setTravels((prevTravels) => prevTravels.filter((travel) => travel.id !== id));
    } catch (err) {
      setError('Failed to delete travel');
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/travels/${id}/edit`);
  };

  const handleRequest = (id: string) => {
    navigate(`/travels/${id}/request`);
  };

  const handleShow = (id: string) => {
    navigate(`/travels/${id}`);
  };

  const handleSearch = () => {
    setSearchQuery(search);
    setStartDateQuery(startDate);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600 text-lg">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">Your Travels</h2>

      {/* Tabs */}
      <div className="flex justify-center mb-6 gap-2">
        <button
          onClick={() => setFilter('my')}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform ${
            filter === 'my'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:-translate-y-1'
          }`}
        >
          My Travels
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform ${
            filter === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:-translate-y-1'
          }`}
        >
          Show All Travels
        </button>
        <button
          onClick={() => setFilter('requested')}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform ${
            filter === 'requested'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:-translate-y-1'
          }`}
        >
          Requested Travels
        </button>
        <button
          onClick={() => setFilter('accepted')}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform ${
            filter === 'accepted'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:-translate-y-1'
          }`}
        >
          Accepted Travels
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <div className="flex flex-wrap justify-center gap-2">
          {/* Date and Search Filters */}
          <div className="flex gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search travels..."
              className="px-4 py-2 rounded-lg border border-gray-300"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {travels.length === 0 ? (
        // Empty State
        <div className="text-center mt-16">
          <p className="text-gray-500 text-lg">
            {filter === 'my' && "You don't have any travels."}
            {filter === 'all' && "No travels available at the moment."}
            {filter === 'requested' && "You haven't requested any travels."}
            {filter === 'accepted' && "You don't have any accepted travels."}
          </p>
        </div>
      ) : (
        // Travel Cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {travels.map((travel) => (
            <div
              key={travel.id}
              className="p-6 bg-gradient-to-r from-indigo-500 to-indigo-700 shadow-lg rounded-2xl space-y-4 border border-gray-300 hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-bold text-white">{travel.name}</h3>
              <p className="text-gray-200 text-sm">{travel.description}</p>
              <h4 className="text-lg font-semibold text-white">
                Requests: {travel.travel_requests.length}
              </h4>
              <h4 className="text-lg font-semibold text-white">
                Host Rating: {
                  travel.owner_travel_evaluations.length > 0 
                    ? '⭐'.repeat(Math.round(travel.owner_travel_evaluations.reduce((sum, evaluation) => 
                        sum + evaluation.rating, 0) / travel.owner_travel_evaluations.length))
                    : 'Not rated yet'
                }
              </h4>

              <span
                className={`inline-block px-4 py-2 text-sm font-semibold rounded-full ${
                  travel.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : travel.status === 'in-progress'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-300 text-gray-800'
                }`}
              >
                {travel.status ? travel.status.charAt(0).toUpperCase() + travel.status.slice(1) : 'Unknown'}
              </span>

              {/* Buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                {travel.owner_email === user?.email && (
                  <>
                    <button
                      onClick={() => handleEdit(travel.id)}
                      className="flex-1 min-w-[100px] py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(travel.id)}
                      className="flex-1 min-w-[100px] py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                      Delete
                    </button>
                  </>
                )}
                {travel.owner_email !== user?.email && (
                  <button
                    onClick={() => handleRequest(travel.id)}
                    className="flex-1 min-w-[100px] py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                  >
                    Request
                  </button>
                )}
                <button
                  onClick={() => handleShow(travel.id)}
                  className="flex-1 min-w-[100px] py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  Show
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TravelsList;
