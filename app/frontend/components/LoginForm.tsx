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
      className="max-w-md mx-auto bg-gray-800 text-white p-8 rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-3xl font-extrabold text-center mb-6">Sign In</h2>

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-semibold">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          placeholder="Enter your email"
        />
      </div>

      <div className="flex flex-col space-y-3">
        <label className="text-sm font-semibold">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'pending'}
        className={`w-full py-3 rounded-lg font-medium text-white transition duration-300 ${
          status === 'pending'
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
        }`}
      >
        {status === 'pending' ? 'Logging in...' : 'Login'}
      </button>

      {isError && (
        <div className="text-red-500 text-sm text-center mt-4">
          Error: {error?.message}
        </div>
      )}

      <p className="text-center text-gray-400 text-sm">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-400 hover:underline">Sign up</Link>
      </p>
    </form>
  );
};

export default LoginForm;
