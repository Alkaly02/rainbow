import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Film, User, UserPlus, LogIn, LogOut, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Film className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">CinéTicket</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-indigo-600">
              Films
            </Link>
            {currentUser && (
              <Link to="/reservations" className="px-3 py-2 rounded-md hover:bg-indigo-600">
                Mes Réservations
              </Link>
            )}
            {currentUser?.isAdmin && (
              <Link to="/admin" className="px-3 py-2 rounded-md hover:bg-indigo-600">
                Administration
              </Link>
            )}
            
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">{currentUser.name}</span>
                <button
                  onClick={logout}
                  className="flex items-center px-3 py-2 rounded-md bg-indigo-800 hover:bg-indigo-900"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="flex items-center px-3 py-2 rounded-md hover:bg-indigo-600"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-3 py-2 rounded-md bg-indigo-800 hover:bg-indigo-900"
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Inscription
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-800 pb-3 px-4">
          <div className="flex flex-col space-y-2 pt-2">
            <Link
              to="/"
              className="px-3 py-2 rounded-md hover:bg-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Films
            </Link>
            {currentUser && (
              <Link
                to="/reservations"
                className="px-3 py-2 rounded-md hover:bg-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Mes Réservations
              </Link>
            )}
            {currentUser?.isAdmin && (
              <Link
                to="/admin"
                className="px-3 py-2 rounded-md hover:bg-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Administration
              </Link>
            )}
            
            {currentUser ? (
              <>
                <div className="px-3 py-2 text-sm">{currentUser.name}</div>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center px-3 py-2 rounded-md bg-indigo-900 hover:bg-indigo-950"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-3 py-2 rounded-md hover:bg-indigo-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-3 py-2 rounded-md bg-indigo-900 hover:bg-indigo-950"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;