import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../context/ReservationContext';
import { useMovie } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, Users, AlertTriangle } from 'lucide-react';

const UserReservationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { userReservations, cancelReservation } = useReservation();
  const { getMovieById, getScreeningById } = useMovie();
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    navigate('/login', { state: { returnTo: '/reservations' } });
    return null;
  }
  
  const getReservationDetails = (reservation: typeof userReservations[0]) => {
    const screening = getScreeningById(reservation.screeningId);
    if (!screening) return null;
    
    const movie = getMovieById(screening.movieId);
    if (!movie) return null;
    
    const screeningDate = new Date(screening.datetime);
    
    return {
      movie,
      screening,
      formattedDate: screeningDate.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      formattedTime: screeningDate.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };
  
  const handleCancelReservation = (reservationId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      cancelReservation(reservationId);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mes réservations</h1>
      
      {userReservations.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-gray-600 mb-6">Vous n'avez pas encore de réservations.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md"
          >
            Découvrir les films
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {userReservations.map(reservation => {
            const details = getReservationDetails(reservation);
            if (!details) return null;
            
            const { movie, screening, formattedDate, formattedTime } = details;
            
            const statusColors = {
              pending: 'bg-yellow-100 text-yellow-800',
              confirmed: 'bg-green-100 text-green-800',
              cancelled: 'bg-red-100 text-red-800'
            };
            
            const statusLabels = {
              pending: 'En attente',
              confirmed: 'Confirmée',
              cancelled: 'Annulée'
            };
            
            return (
              <div key={reservation.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">{movie.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[reservation.status]}`}>
                      {statusLabels[reservation.status]}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="flex items-center text-gray-600 mb-3">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-3">
                        <Clock className="h-5 w-5 mr-2" />
                        <span>{formattedTime}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="h-5 w-5 mr-2" />
                        <span>Salle {screening.roomId}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-600 mb-2">Nombre de billets: <span className="font-medium">{reservation.numberOfTickets}</span></p>
                      <p className="text-gray-600 mb-4">Total payé: <span className="font-medium">{reservation.totalAmount.toFixed(2)} €</span></p>
                      
                      {reservation.status === 'pending' && (
                        <div className="bg-yellow-50 p-4 rounded-md flex items-start">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-yellow-700">
                            Votre réservation est en attente de confirmation. Vous recevrez un email dès qu'elle sera confirmée.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    {reservation.status === 'pending' && (
                      <button
                        onClick={() => handleCancelReservation(reservation.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
                      >
                        Annuler la réservation
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserReservationsPage;