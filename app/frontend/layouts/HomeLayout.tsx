import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomeLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            ThumbsUP
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            {user ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition">
                  Profile
                </Link>
                <Link to="/travels" className="text-gray-700 hover:text-blue-600 transition">
                  Travels
                </Link>
                <Link to="/travels/new" className="text-gray-700 hover:text-blue-600 transition">
                  Create Travel
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">
                  Login
                </Link>
                <Link to="/register" className="text-gray-700 hover:text-blue-600 transition">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-grow container mx-auto p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
        <p className="text-sm">&copy; 2024 ThumbsUP. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomeLayout;
