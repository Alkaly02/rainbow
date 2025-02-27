import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const ReservationConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Réservation confirmée !</h1>
        
        <p className="text-lg text-gray-700 mb-8">
          Votre réservation a été effectuée avec succès. Vous recevrez un email de confirmation avec les détails de votre réservation.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <p className="text-gray-600 mb-2">
            Présentez-vous à la caisse du cinéma 30 minutes avant la séance avec votre numéro de réservation.
          </p>
          <p className="text-gray-600">
            Vous pouvez consulter vos réservations à tout moment dans votre espace personnel.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md"
          >
            Retour à l'accueil
          </button>
          
          <button
            onClick={() => navigate('/reservations')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-md"
          >
            Voir mes réservations
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationConfirmationPage;