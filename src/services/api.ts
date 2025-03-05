import axios from 'axios';
import { User, Category, Movie, Room, Screening, Reservation, Payment } from '../types';

const API_URL = 'http://127.0.0.1:8000/api'; // Remplace par l'URL de ton API

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

export const fetchMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(`${API_URL}/movies`);
  return response.data;
};

export const fetchRooms = async (): Promise<Room[]> => {
  const response = await axios.get(`${API_URL}/rooms`);
  return response.data;
};

export const fetchScreenings = async (): Promise<Screening[]> => {
  const response = await axios.get(`${API_URL}/screenings`);
  return response.data;
};

export const fetchReservations = async (): Promise<Reservation[]> => {
  const response = await axios.get(`${API_URL}/reservations`);
  return response.data;
};

export const fetchPayments = async (): Promise<Payment[]> => {
  const response = await axios.get(`${API_URL}/payments`);
  return response.data;
};
