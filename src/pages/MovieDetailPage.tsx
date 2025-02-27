import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovie } from '../context/MovieContext';
import { useReservation } from '../context/ReservationContext';
import { useAuth } from '../context/AuthContext';
import { Clock, Calendar, Users } from 'lucide-react';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = parseInt(id || '0', 10);
  const navigate = useNavigate();
  const { getMovieById, getCategoryById, getScreeningsForMovie } = useMovie();
  const { selectScreening } = useReservation();
  const { currentUser } = useAuth();
  
  const movie = getMovieById(movieId);
  const category = movie ? getCategoryById(movie.categoryId) : undefined;
  const screenings = getScreeningsForMovie(movieId);
  
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  if (!movie) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Film non trouvé</h1>
        <p className="text-gray-600 mb-6">Le film que vous recherchez n'existe pas.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }
  
  // Group screenings by date
  const screeningsByDate = screenings.reduce<Record<string, typeof screenings>>((acc, screening) => {
    const date = new Date(screening.datetime).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(screening);
    return acc;
  }, {});
  
  const dates = Object.keys(screeningsByDate);
  
  // If no date is selected, select the first one
  if (dates.length > 0 && !selectedDate) {
    setSelectedDate(dates[0]);
  }
  
  const filteredScreenings = selectedDate ? screeningsByDate[selectedDate] : [];
  
  const handleScreeningSelect = (screening: typeof screenings[0]) => {
    selectScreening(screening);
    navigate('/booking');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img 
              src={movie.imageUrl} 
              alt={movie.title} 
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{movie.title}</h1>
            <p className="text-indigo-600 font-medium mb-4">{category?.name}</p>
            
            <div className="flex items-center text-gray-600 mb-4">
              <Clock className="h-5 w-5 mr-2" />
              <span>{movie.duration} minutes</span>
            </div>
            
            <p className="text-gray-700 mb-6">{movie.description}</p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Séances disponibles</h2>
            
            {dates.length > 0 ? (
              <>
                {/* Date selector */}
                <div className="mb-6">
                  <div className="flex overflow-x-auto pb-2 space-x-2">
                    {dates.map(date => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`px-4 py-2 rounded-md whitespace-nowrap ${
                          selectedDate === date
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {new Date(date).toLocaleDateString('fr-FR', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short'
                        })}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Screenings for selected date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredScreenings.map(screening => {
                    const screeningTime = new Date(screening.datetime).toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                    
                    return (
                      <div 
                        key={screening.id} 
                        className="border border-gray-200 rounded-md p-4 hover:border-indigo-300 hover:shadow-md transition-all"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg font-medium">{screeningTime}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            screening.availableSeats > 10
                              ? 'bg-green-100 text-green-800'
                              : screening.availableSeats > 0
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {screening.availableSeats > 0 
                              ? `${screening.availableSeats} places disponibles` 
                              : 'Complet'}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <Users className="h-4 w-4 mr-1" />
                          <span>Salle {screening.roomId}</span>
                        </div>
                        <button
                          onClick={() => handleScreeningSelect(screening)}
                          disabled={screening.availableSeats === 0}
                          className={`w-full py-2 px-4 rounded-md text-center ${
                            screening.availableSeats > 0
                              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {screening.availableSeats > 0 ? 'Réserver' : 'Complet'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="text-gray-500">Aucune séance disponible pour ce film.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;