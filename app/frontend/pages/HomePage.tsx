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

            {/* Feature 4 */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 text-3xl rounded-full mb-4">
                📈
              </div>
              <h3 className="text-2xl font-semibold mb-3">Real-Time Stats</h3>
              <p className="text-gray-400">
                Stay updated with real-time player statistics and performance insights.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-400 to-blue-500 text-3xl rounded-full mb-4">
                🌟
              </div>
              <h3 className="text-2xl font-semibold mb-3">Achievements & Rewards</h3>
              <p className="text-gray-400">
                Earn badges and rewards as you progress through the fantasy season.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 text-3xl rounded-full mb-4">
                🛠️
              </div>
              <h3 className="text-2xl font-semibold mb-3">Customizable Settings</h3>
              <p className="text-gray-400">
                Tailor your league settings to fit your group’s unique preferences and rules.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-20 w-full px-6">
          <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <p className="text-gray-300 mb-4">
                "Fantazee has completely revolutionized how I play fantasy football. The interface is smooth, and the features are unmatched!"
              </p>
              <h4 className="text-lg font-semibold">- Alex T.</h4>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <p className="text-gray-300 mb-4">
                "I love the rewards system! Competing has never been so exciting. Highly recommended."
              </p>
              <h4 className="text-lg font-semibold">- Jamie R.</h4>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <p className="text-gray-300 mb-4">
                "The draft system is incredibly intuitive and makes setting up a league super easy. 10/10!"
              </p>
              <h4 className="text-lg font-semibold">- Chris W.</h4>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-20 text-center">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Ready to Join the Action?
          </h2>
          <button 
            onClick={handleGetStarted}
            className="px-10 py-4 text-lg font-semibold rounded-lg bg-green-600 hover:bg-green-700 transition duration-300 shadow-md">
            Get Started Today
          </button>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
