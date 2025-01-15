import React, { useState } from 'react';
import { useLogin } from '../hooks/use-auth';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';


const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, status, isError, error } = useLogin();
  const { login: saveToken } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: (data) => {
          saveToken(data.token, data.user);
        },
      }
    );
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-xl space-y-8"
    >
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Sign In</h2>

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-semibold text-gray-600">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300 ease-in-out"
          placeholder="Enter your email"
        />
      </div>

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-semibold text-gray-600">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300 ease-in-out"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'pending'}
        className={`w-full py-3 text-lg font-medium text-white rounded-lg transition-colors duration-300 ${
          status === 'pending' ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700'
        } focus:outline-none focus:ring-4 focus:ring-indigo-500`}
      >
        {status === 'pending' ? 'Logging in...' : 'Login'}
      </button>

      {isError && (
        <div className="text-red-600 text-sm text-center mt-4">
          Error: {error?.message}
        </div>
      )}

      <p className="text-center text-gray-500 text-sm">
        Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline">Sign up</Link>
      </p>
    </form>
  );
};

export default LoginForm;
