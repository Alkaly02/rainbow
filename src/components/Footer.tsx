import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Film className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">CinéTicket</span>
            </div>
            <p className="text-gray-400">
              Votre destination cinéma préférée pour des moments inoubliables.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white">
                  Connexion
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white">
                  Inscription
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2" />
                <span>01 23 45 67 89</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2" />
                <span>contact@cineticket.fr</span>
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-2" />
                <span>123 Avenue du Cinéma, Paris</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Horaires</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Lundi - Vendredi: 10h - 23h</li>
              <li>Samedi: 9h - 00h</li>
              <li>Dimanche: 10h - 22h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CinéTicket. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
