import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../context/ReservationContext';
import { useMovie } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';
import { Clock, Calendar, Users, CreditCard } from 'lucide-react';
import { formatDate } from '../utils/dates';


const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedScreening, ticketCount, setTicketCount, createReservation } = useReservation();
  const { getMovieById } = useMovie();
  const { currentUser } = useAuth();

  console.log({selectedScreening});


  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  if (!selectedScreening) {
    navigate('/');
    return null;
  }

  const movie = getMovieById(selectedScreening.movie_id);

  if (!movie) {
    navigate('/');
    return null;
  }

  const screeningDate = new Date(formatDate(selectedScreening.datetime));
  const formattedDate = screeningDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const formattedTime = screeningDate.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  console.log({movie});


  const ticketPrice = movie?.price ? Number(movie.price) : 0; // Example price per ticket
  const totalPrice = ticketPrice * ticketCount;

  const handleTicketCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value, 10);
    setTicketCount(count);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      navigate('/login', { state: { returnTo: '/booking' } });
      return;
    }

    setIsProcessing(true);

    try {
      const success = await createReservation();

      if (success) {
        navigate('/reservation-confirmation');
      } else {
        alert('La réservation a échoué. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Reservation error:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Réservation de billets</h1>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{movie.title}</h2>

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
                <span>Salle {selectedScreening.roomId}</span>
              </div>
            </div>

            <div>
              <p className="text-gray-600 mb-2">Places disponibles: <span className="font-medium">{selectedScreening.available_seats}</span></p>
              <p className="text-gray-600 mb-4">Prix par billet: <span className="font-medium">{ticketPrice.toFixed(2)} €</span></p>

              <div className="mb-4">
                <label htmlFor="ticketCount" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de billets
                </label>
                <select
                  id="ticketCount"
                  value={ticketCount}
                  onChange={handleTicketCountChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  disabled={isProcessing}
                >
                  {Array.from({ length: Math.min(10, selectedScreening.available_seats) }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-indigo-50 p-4 rounded-md">
                <p className="text-gray-700">Total à payer: <span className="font-bold text-lg">{totalPrice.toFixed(2)} €</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!currentUser ? (
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <p className="text-gray-700 mb-4">Vous devez être connecté pour finaliser votre réservation.</p>
          <button
            onClick={() => navigate('/login', { state: { returnTo: '/booking' } })}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md mr-4"
          >
            Se connecter
          </button>
          <button
            onClick={() => navigate('/register', { state: { returnTo: '/booking' } })}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-md"
          >
            S'inscrire
          </button>
        </div>
      ) : (
          // ! Informations de paiement
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Informations de paiement
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro de carte
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                    disabled={isProcessing}
                  />
                </div>

                <div>
                  <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                    Titulaire de la carte
                  </label>
                  <input
                    type="text"
                    id="cardHolder"
                    name="cardHolder"
                    value={paymentDetails.cardHolder}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                    disabled={isProcessing}
                  />
                </div>

                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Date d'expiration
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={paymentDetails.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/AA"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                    disabled={isProcessing}
                  />
                </div>

                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                    disabled={isProcessing}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-8">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md"
                  disabled={isProcessing}
                >
                  Retour
                </button>

                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md flex items-center"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      Payer {totalPrice.toFixed(2)} €
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
