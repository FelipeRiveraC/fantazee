import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomeLayout: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-gray-800 shadow-md">
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-white">
            Fantazee
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="text-base font-medium text-gray-300 hover:text-white transition">
                  Profile
                </Link>
                <Link to="/draft" className="text-base font-medium text-gray-300 hover:text-white transition">
                  Draft
                </Link>
                <Link to="/league/new" className="text-base font-medium text-gray-300 hover:text-white transition">
                  Create League
                </Link>
                <Link to="/draft/teams" className="text-base font-medium text-gray-300 hover:text-white transition">
                  My Draft Teams
                </Link>
                <button
                  onClick={logout}
                  className="text-base font-medium text-red-400 hover:text-red-500 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-base font-medium text-gray-300 hover:text-white transition">
                  Login
                </Link>
                <Link to="/register" className="text-base font-medium text-gray-300 hover:text-white transition">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-grow container mx-auto py-10 px-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Fantazee. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomeLayout;
