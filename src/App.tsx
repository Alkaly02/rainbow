import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';
import { ReservationProvider } from './context/ReservationContext';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserReservationsPage from './pages/UserReservationsPage';
import ReservationConfirmationPage from './pages/ReservationConfirmationPage';
// import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MovieProvider>
          <ReservationProvider>
            <div className="min-h-screen bg-gray-100">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/movie/:id" element={<MovieDetailPage />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/reservations" element={<UserReservationsPage />} />
                  <Route path="/reservation-confirmation" element={<ReservationConfirmationPage />} />
                  {/* <Route path="/admin" element={<AdminPage />} /> */}
                </Routes>
              </main>
            </div>
          </ReservationProvider>
        </MovieProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
