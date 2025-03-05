import React, { useState } from 'react';
import { useMovie } from '../context/MovieContext';
import { Link } from 'react-router-dom';
import { Clock, Calendar } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Category, Movie } from '../types';
import { fetchCategories, fetchMovies } from '../services/api';

const HomePage: React.FC = () => {
  const { getCategoryById } = useMovie();
  const { data: movies = [], isLoading: isMovieLoading, error } = useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });
  const { data: categories = [], isLoading: isCategoryLoading, error: errorCategory } = useQuery<Category[]>({
      queryKey: ['categories'],
      queryFn: fetchCategories,
  });
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  console.log({ movies, selectedCategory });


  const filteredMovies = selectedCategory
    ? movies.filter(movie => movie.category.id === selectedCategory)
    : movies;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Films à l'affiche</h1>

      {/* Category filter */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-700 mb-3">Filtrer par catégorie</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === null
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Tous
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Movie list */}
      {isMovieLoading ? <p>En cours de chargement</p> : filteredMovies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun film ne correspond à cette catégorie.</p>
        </div>
      ) :
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {
            filteredMovies.map(movie => (
              <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <img
                  src={movie.image_url}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{movie.title}</h3>
                  <p className="text-sm text-indigo-600 mb-2">
                    {movie.category.name}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{movie.duration} minutes</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{movie.description}</p>
                  <Link
                    to={`/movie/${movie.id}`}
                    className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    Voir les séances
                  </Link>
                </div>
              </div>
          ))
          }
        </div>
      }
    </div>
  );
};

export default HomePage;
