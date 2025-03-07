export interface User {
  id: number;
  name: string;
  email: string;
  date_of_birth: string;
  is_admin: boolean;
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
  price: number;
  description: string;
  image_url: string;
  category: Category,
  screenings?: Screening[]
}

export interface Room {
  id: number;
  number: string;
  capacity: number;
}

export interface Screening {
  id: number;
  movie_id: number;
  roomId: number;
  datetime: string;
  available_seats: number;
  room: Room
}

export interface Reservation {
  id?: number;
  user_id: number;
  screening_id: number;
  number_of_tickets: number;
  status?: 'pending' | 'confirmed' | 'cancelled';
  total_amount: number;
}

export interface Payment {
  id: number;
  reservationId: number;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
}
