import { User, Category, Movie, Room, Screening, Reservation, Payment } from '../types';

export const users: User[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    dateOfBirth: '1990-01-01',
    password: 'admin123',
    isAdmin: true
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    dateOfBirth: '1995-05-15',
    password: 'password123',
    isAdmin: false
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: 'Action',
    description: 'Action-packed movies with thrilling sequences'
  },
  {
    id: 2,
    name: 'Comedy',
    description: 'Funny movies to make you laugh'
  },
  {
    id: 3,
    name: 'Drama',
    description: 'Emotional and serious themes'
  },
  {
    id: 4,
    name: 'Science Fiction',
    description: 'Futuristic and speculative concepts'
  }
];

export const movies: Movie[] = [
  {
    id: 1,
    title: 'The Action Hero',
    categoryId: 1,
    duration: 120,
    description: 'An action-packed adventure with stunning visual effects.',
    image_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    title: 'Laugh Out Loud',
    categoryId: 2,
    duration: 95,
    description: 'A hilarious comedy that will keep you laughing throughout.',
    image_url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 3,
    title: 'Emotional Journey',
    categoryId: 3,
    duration: 135,
    description: 'A touching drama about family relationships and personal growth.',
    image_url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 4,
    title: 'Space Odyssey',
    categoryId: 4,
    duration: 150,
    description: 'An epic science fiction adventure set in the distant future.',
    image_url: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

export const rooms: Room[] = [
  {
    id: 1,
    number: 'A1',
    capacity: 100
  },
  {
    id: 2,
    number: 'A2',
    capacity: 80
  },
  {
    id: 3,
    number: 'B1',
    capacity: 120
  }
];

// Generate screenings for the next 7 days
export const generateScreenings = (): Screening[] => {
  const screenings: Screening[] = [];
  const today = new Date();

  for (let day = 0; day < 7; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day);

    // For each movie, create 3 screenings per day
    movies.forEach((movie, movieIndex) => {
      const times = ['10:00', '14:30', '19:00'];

      times.forEach((time, timeIndex) => {
        const [hours, minutes] = time.split(':').map(Number);
        const screeningDate = new Date(date);
        screeningDate.setHours(hours, minutes, 0, 0);

        screenings.push({
          id: day * 100 + movieIndex * 10 + timeIndex + 1,
          movieId: movie.id,
          roomId: (movieIndex % rooms.length) + 1,
          datetime: screeningDate.toISOString(),
          availableSeats: rooms[(movieIndex % rooms.length)].capacity - Math.floor(Math.random() * 30)
        });
      });
    });
  }

  return screenings;
};

export const screenings: Screening[] = generateScreenings();

export const reservations: Reservation[] = [
  {
    id: 1,
    userId: 2,
    screeningId: 1,
    numberOfTickets: 2,
    status: 'confirmed',
    totalAmount: 24.00
  }
];

export const payments: Payment[] = [
  {
    id: 1,
    reservationId: 1,
    amount: 24.00,
    status: 'completed'
  }
];
