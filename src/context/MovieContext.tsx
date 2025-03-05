import React, { createContext, useContext, ReactNode } from 'react';
import { Movie, Category, Screening } from '../types';
import { categories, screenings } from '../data/mockData';
import { fetchCategories, fetchMovies } from '../services/api';
import { useQuery } from '@tanstack/react-query';

interface MovieContextType {
  movies: Movie[];
  categories: Category[];
  screenings: Screening[];
  getMovieById: (id: number) => Movie | undefined;
  getCategoryById: (id: number) => Category | undefined;
  getScreeningById: (id: number) => Screening | undefined;
  getScreeningsForMovie: (movieId: number) => Screening[];
  getMoviesByCategory: (categoryId: number) => Movie[];
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: movies = [], isLoading, error } = useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });
  const { data: categories = [], isLoading: isCategoryLoading, error: errorCategory } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
  const getMovieById = (id: number): Movie | undefined => {
    return movies.find(movie => movie.id === id);
  };

  const getCategoryById = (id: number): Category | undefined => {
    return categories.find(category => category.id === id);
  };

  const getScreeningById = (id: number): Screening | undefined => {
    return screenings.find(screening => screening.id === id);
  };

  const getScreeningsForMovie = (movieId: number): Screening[] => {
    return screenings.filter(screening => screening.movieId === movieId);
  };

  const getMoviesByCategory = (categoryId: number): Movie[] => {
    return movies.filter(movie => movie.categoryId === categoryId);
  };

  return (
    <MovieContext.Provider value={{
      movies,
      categories,
      screenings,
      getMovieById,
      getCategoryById,
      getScreeningById,
      getScreeningsForMovie,
      getMoviesByCategory
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovie must be used within a MovieProvider');
  }
  return context;
};
