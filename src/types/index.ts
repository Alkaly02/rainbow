export interface User {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  password: string;
  isAdmin: boolean;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Movie {
  id: number;
  title: string;
  categoryId: number;
  duration: number; // in minutes
  description: string;
  imageUrl: string;
}

export interface Room {
  id: number;
  number: string;
  capacity: number;
}

export interface Screening {
  id: number;
  movieId: number;
  roomId: number;
  datetime: string;
  availableSeats: number;
}

export interface Reservation {
  id: number;
  userId: number;
  screeningId: number;
  numberOfTickets: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalAmount: number;
}

export interface Payment {
  id: number;
  reservationId: number;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
}