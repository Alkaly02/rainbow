import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

interface LocationState {
  returnTo?: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { returnTo } = (location.state as LocationState) || {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    login(email, password, () => {navigate(returnTo || '/')});
  };

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-3 rounded-full">
            <LogIn className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Connexion</h1>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 border"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md mb-4"
          >
            Se connecter
          </button>
        </form>

        <p className="text-center text-gray-600">
          Vous n'avez pas de compte ?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-800">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
