import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTravel, updateTravelRequest, updateTravel, createTravelEvaluation, createTravelChatMessage } from '../api/travels';
import type { Travel, TravelEvaluationForm, TravelRequest, TravelChatMessage, Participant } from 'types/travels';
import { useAuth } from '../context/AuthContext';

interface TravelWithRequests extends Travel {
  travel_requests: TravelRequest[];
  travel_evaluations: TravelEvaluation[];
  travel_chat_messages: TravelChatMessage[];
  average_rating?: number;
  status: string;
  created_at: string;
  updated_at: string;
  owner_email: string;
  origin: string;
  destination: string;
  distance_km: number;
  start_date: string;
  end_date: string;
  estimated_budget: number;
  currency: string;
  max_participants: number;
  current_participants: number;
  travel_type: string;
  notes?: string;
  is_public: boolean;
  participants: Participant[];
}

const TravelShow: React.FC = () => {
  const { id: travelId } = useParams<{ id: string }>();
  const [travel, setTravel] = useState<TravelWithRequests | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [chatContent, setChatContent] = useState<string>('');
  const [chatLoading, setChatLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const response = await getTravel(travelId as string);
        setTravel(response.travel as TravelWithRequests);
        setLoading(false);
      } catch (err) {
        setError('Failed to load travel details');
        setLoading(false);
      }
    };
    fetchTravel();
  }, [travelId]);

  const userHasEvaluated = travel?.travel_evaluations.some(
    (evaluation) => evaluation.user_id === user?.id
  );

  const userHasAcceptedRequest = travel?.travel_requests.some(
    (request) => request.status === 'accepted' && request.user_id === user?.id
  );

  const isOwner = user?.email === travel?.owner_email;

  const handleEvaluationSubmit = async () => {
    if (!travel || !user) return;
  
    const evaluationData: TravelEvaluationForm = { rating, comment };
    setSubmitting(true);
  
    try {
      const response = await createTravelEvaluation(travelId as string, evaluationData);
  
      // Validamos la estructura de la respuesta
      if (!response || !response.evaluation) {
        throw new Error('Invalid API response');
      }
  
      // Actualizamos el estado local
      setTravel((prevTravel) => {
        if (!prevTravel) return null;
        return {
          ...prevTravel,
          travel_evaluations: [...prevTravel.travel_evaluations, response.evaluation],
        };
      });
  
      // Limpiar el formulario
      setRating(0);
      setComment('');
    } catch (err) {
      console.error('Failed to submit evaluation', err);
      alert('Failed to submit evaluation. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  

  const handleUpdateRequestStatus = async (requestId: string, status: string) => {
    if (!travel) return;

    try {
      await updateTravelRequest(travelId as string, requestId, { status });
      setTravel({
        ...travel,
        travel_requests: travel.travel_requests.map((request) =>
          request.id === requestId ? { ...request, status } : request
        ),
      });
    } catch (err) {
      console.error(`Failed to update request status to ${status}`, err);
    }
  };

  const handleArchiveTravel = async () => {
    if (!travel) return;

    try {
      const response = await updateTravel(travelId as string, { status: 'archived' });
      setTravel({ ...travel, status: response.travel.status });
    } catch (err) {
      console.error('Failed to archive travel', err);
    }
  };

  const handleChatSubmit = async () => {
    if (!chatContent.trim()) return;

    setChatLoading(true);
    try {
      const response = await createTravelChatMessage(travelId as string, { content: chatContent });
      setTravel((prevTravel) => {
        if (!prevTravel) return null;
        return {
          ...prevTravel,
          travel_chat_messages: [...prevTravel.travel_chat_messages, response.message],
        };
      });
      setChatContent('');
    } catch (err) {
      console.error('Failed to send chat message', err);
    } finally {
      setChatLoading(false);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  if (loading) {
    return <p>Loading travel details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!travel) {
    return <p>No travel details available</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      {travel.status === 'archived' && (
        <div className="p-4 mb-6 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
          <strong>Travel Completed:</strong> This travel has concluded. No further actions can be taken.
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-4xl font-bold text-center text-indigo-700">{travel.name}</h2>
        <p className="text-center text-sm text-gray-500">{travel.description}</p>
      </div>

      {/* General Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">Travel Information</h3>
          <p><strong>Owner:</strong> {travel.owner_email}</p>
          <p><strong>Status:</strong> {travel.status}</p>
          <p><strong>Public:</strong> {travel.is_public ? 'Yes' : 'No'}</p>
          <p><strong>Type:</strong> {travel.travel_type}</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">Travel Details</h3>
          <p><strong>Origin:</strong> {travel.origin}</p>
          <p><strong>Destination:</strong> {travel.destination}</p>
          <p><strong>Start Date:</strong> {new Date(travel.start_date).toLocaleString()}</p>
          <p><strong>End Date:</strong> {new Date(travel.end_date).toLocaleString()}</p>
        </div>
      </div>

      {/* Archive Button */}
      {user?.email === travel.owner_email && travel.status !== 'archived' && (
        <div className="mt-8 text-center">
          <button
            onClick={handleArchiveTravel}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Mark as Archived
          </button>
        </div>
      )}

      {/* Requests Section */}
      {user?.email === travel.owner_email && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-indigo-600">Travel Requests</h3>
          {travel.travel_requests.filter(request => request.status === 'pending').length > 0 ? (
            <ul className="mt-4 space-y-4">
              {travel.travel_requests.filter(request => request.status === 'pending').map((request) => (
                <li key={request.id} className="p-4 bg-gray-100 rounded shadow-md">
                  <p><strong>User ID:</strong> {request.user_id}</p>
                  <p><strong>Message:</strong> {request.message}</p>
                  <p><strong>Status:</strong> {request.status}</p>
                  <p className="text-gray-500 text-sm">
                    Created at: {new Date(request.created_at).toLocaleString()}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleUpdateRequestStatus(request.id, 'accepted')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleUpdateRequestStatus(request.id, 'rejected')}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-500">No pending travel requests available.</p>
          )}
        </div>
      )}

      {/* Evaluations Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-indigo-600">Evaluations</h3>
        {travel.travel_evaluations.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {travel.travel_evaluations.map((evaluation) => (
              <li key={evaluation.id} className="p-4 bg-gray-100 rounded shadow-md">
                <p><strong>Rating:</strong> {evaluation.rating} ⭐</p>
                <p><strong>Comment:</strong> {evaluation.comment}</p>
                <p className="text-gray-500 text-sm">
                  By: {evaluation.user_name} at {new Date(evaluation.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-gray-500">No evaluations available yet.</p>
        )}

        {/* Evaluation Form */}
        {user?.email === travel.owner_email ? (
          <p className="text-gray-500 mt-4">
            As the owner of this travel, you cannot leave an evaluation.
          </p>
        ) : travel.status !== 'archived' ? (
          <p className="text-gray-500 mt-4">
            You cannot leave an evaluation until the travel is archived.
          </p>
        ) : userHasEvaluated ? (
          <p className="text-gray-500 mt-4">
            You have already submitted an evaluation for this travel.
          </p>
        ) : travel.travel_requests.some(
            (request) => request.status === 'accepted' && request.user_id === user?.id
          ) ? (
            <>
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Rating (1-5)</label>
                <input
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  min={1}
                  max={5}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                onClick={handleEvaluationSubmit}
                disabled={submitting || rating < 1 || rating > 5}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Submit Evaluation
              </button>
            </>
          ) : (
            <p className="text-gray-500 mt-4">
              You must have an accepted travel request to leave an evaluation.
            </p>
          )}
      </div>

       {/* Participants Section */}
       <div className="mt-8">
        <h3 className="text-2xl font-semibold text-indigo-600">Participants</h3>
        {travel.participants.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {travel.participants.map((participant) => (
              <li key={participant.id} className="p-2 bg-gray-100 rounded shadow-sm">
                <p><strong>Name:</strong> {participant.name}</p>
                <p><strong>Email:</strong> {participant.email}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-gray-500">No participants have been accepted yet.</p>
        )}
      </div>

      {/* Chat Section */}
      {(userHasAcceptedRequest || (user?.email === travel.owner_email)) && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg">
          <div className="p-4 flex justify-between items-center bg-indigo-600 text-white rounded-t-lg cursor-pointer" onClick={toggleChat}>
            <h3 className="text-xl font-semibold">Travel Chat</h3>
            <button className="text-white">{isChatOpen ? '−' : '+'}</button>
          </div>
          {isChatOpen && (
            <div className="p-4">
              <div className="mt-4 max-h-64 overflow-y-auto space-y-4">
                {travel?.travel_chat_messages.map((message) => (
                  <div key={message.id} className="p-2 bg-gray-100 rounded shadow-sm">
                    <p><strong>{message.sender_name}:</strong> {message.content}</p>
                    <p className="text-gray-500 text-xs">{new Date(message.created_at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <textarea
                  value={chatContent}
                  onChange={(e) => setChatContent(e.target.value)}
                  rows={2}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Type your message here..."
                />
                <button
                  onClick={handleChatSubmit}
                  disabled={chatLoading}
                  className="mt-2 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Send Message
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>

  );
};

export default TravelShow;
