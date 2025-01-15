import React, { useState } from 'react';
import { useCreateUser } from '../composables/use-create-user';
import type { UserCreateForm } from 'types/users';

const Register: React.FC = () => {
  const { mutate: createUser, status, error, isSuccess } = useCreateUser();
  const isLoading = status === 'pending';
  const [formData, setFormData] = useState<UserCreateForm>({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUser(formData);
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-800 text-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Create an Account</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-medium text-white transition duration-300 ${
            isLoading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Account'}
        </button>

        {error && <p className="text-red-400 mt-4 text-center">Error: {error.message}</p>}
        {isSuccess && <p className="text-green-400 mt-4 text-center">User created successfully!</p>}
      </form>
    </div>
  );
};

export default Register;
