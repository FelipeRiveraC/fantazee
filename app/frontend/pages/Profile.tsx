import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useGetUserById } from '../composables/use-get-user-by-id';
import type { User } from 'types/users';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const { data, isLoading, error } = useGetUserById(userId || '');

  if (!userId) {
    return <div className="flex items-center justify-center h-screen">Loading user information...</div>;
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg" role="alert">
          Error loading profile data: {error.message}
        </div>
      </div>
    );
  }

  const userData: User | undefined = data?.user;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-600">{userData?.email}</p>
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Name:</h2>
            <p className="text-gray-600">{userData?.name || 'N/A'}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">Username:</h2>
            <p className="text-gray-600">{userData?.name || 'N/A'}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">Joined on:</h2>
            <p className="text-gray-600">{userData?.createdAt || 'N/A'}</p>
          </div>
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800">Travel Evaluations:</h2>
          {userData?.travel_evaluations.length ? (
            <ul className="mt-4 space-y-4">
              {userData.travel_evaluations.map((evaluation) => (
                <li key={evaluation.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                  <p className="text-gray-800"><strong>Travel:</strong> {evaluation.travel_id}</p>
                  <p className="text-gray-600"><strong>Rating:</strong> {evaluation.rating} ⭐</p>
                  <p className="text-gray-600"><strong>Comment:</strong> {evaluation.comment}</p>
                  <p className="text-gray-500 text-sm"><strong>Evaluated On:</strong> {new Date(evaluation.created_at).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-4">No travel evaluations found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
