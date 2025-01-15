import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/league');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center">

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        {/* Hero Section */}
        <section className="text-center max-w-3xl">
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Fantazee
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Redefine the fantasy football experience with cutting-edge features and seamless gameplay.
          </p>
          <button 
            onClick={handleGetStarted}
            className="px-10 py-4 text-lg font-semibold rounded-lg bg-purple-600 hover:bg-purple-700 transition duration-300 shadow-md">
            {user ? 'Go to League' : 'Join Now'}
          </button>
        </section>

        {/* Features Section */}
        <section className="mt-20 w-full px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 text-3xl rounded-full mb-4">
                🏆
              </div>
              <h3 className="text-2xl font-semibold mb-3">Create a League</h3>
              <p className="text-gray-400">
                Set up a custom league and invite your friends for thrilling competition.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 text-3xl rounded-full mb-4">
                ✨
              </div>
              <h3 className="text-2xl font-semibold mb-3">Draft Your Team</h3>
              <p className="text-gray-400">
                Build a winning roster with our intuitive draft system and stay ahead of the game.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 text-3xl rounded-full mb-4">
                🏈
              </div>
              <h3 className="text-2xl font-semibold mb-3">Compete Weekly</h3>
              <p className="text-gray-400">
                Challenge others in weekly matchups and prove your fantasy football prowess.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
