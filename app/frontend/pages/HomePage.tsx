import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/travels');
    } else {
      navigate('/register');
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-6 py-12">
        {/* Header */}
        <header className="bg-blue-600 text-white text-center py-6 mb-6 shadow-md rounded-lg">
          <h1 className="text-3xl font-bold">Welcome, {user?.email}</h1>
        </header>
        
        {/* Hero Section */}
        <section className="bg-white p-12 rounded-lg shadow-xl text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
            Welcome to ThumbsUP
          </h1>
          <p className="text-lg text-gray-500 mb-10">
            A platform to share rides, reduce your carbon footprint, and connect with others.
          </p>
          <button 
            onClick={handleGetStarted}
            className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            {user ? 'View Travels' : 'Get Started'}
          </button>
        </section>

        {/* Features Section */}
        <section className="mt-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-600 p-4 rounded-full text-3xl">
                  🚗
                </span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Find a Ride</h3>
              <p className="text-gray-600">
                Explore available carpooling options and connect with drivers in your area.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-600 p-4 rounded-full text-3xl">
                  🤝
                </span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Share Your Ride</h3>
              <p className="text-gray-600">
                Offer rides to others, reduce costs, and help the environment by sharing your journey.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-600 p-4 rounded-full text-3xl">
                  🌍
                </span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Reduce Your Impact</h3>
              <p className="text-gray-600">
                Join the movement to reduce traffic and emissions, making the world a greener place.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
