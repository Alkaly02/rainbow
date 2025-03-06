import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Screening, Reservation, Payment } from '../types';
import { screenings, reservations, payments } from '../data/mockData';
import { useAuth } from './AuthContext';

interface ReservationContextType {
  selectedScreening: Screening | null;
  selectScreening: (screening: Screening) => void;
  ticketCount: number;
  setTicketCount: (count: number) => void;
  createReservation: () => Promise<boolean>;
  userReservations: Reservation[];
  allReservations: Reservation[];
  cancelReservation: (reservationId: number) => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(null);
  const [ticketCount, setTicketCount] = useState<number>(1);
  const { currentUser } = useAuth();


  const selectScreening = (screening: Screening) => {
    setSelectedScreening(screening);
    setTicketCount(1); // Reset ticket count when selecting a new screening
  };

  const createReservation = async (): Promise<boolean> => {
    if (!currentUser || !selectedScreening) return false;

    // Check if enough seats are available
    if (selectedScreening.available_seats < ticketCount) return false;

    // Calculate total amount (in a real app, this would come from a pricing service)
    const ticketPrice = 12.00; // Example price per ticket
    const totalAmount = ticketPrice * ticketCount;

    // Create new reservation
    const newReservation: Reservation = {
      id: reservations.length + 1,
      userId: currentUser.id,
      screeningId: selectedScreening.id,
      numberOfTickets: ticketCount,
      status: 'pending',
      totalAmount
    };

    // Simulate payment processing
    const paymentSuccess = await simulatePayment(newReservation);

    if (paymentSuccess) {
      // Update reservation status
      newReservation.status = 'confirmed';

      // Add to reservations array
      reservations.push(newReservation);

      // Update available seats
      const screeningIndex = screenings.findIndex(s => s.id === selectedScreening.id);
      if (screeningIndex !== -1) {
        screenings[screeningIndex].available_seats -= ticketCount;
      }

      return true;
    }

    return false;
  };

  const simulatePayment = async (reservation: Reservation): Promise<boolean> => {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create new payment record
    const newPayment: Payment = {
      id: payments.length + 1,
      reservationId: reservation.id,
      amount: reservation.totalAmount,
      status: 'completed'
    };

    // Add to payments array
    payments.push(newPayment);

    return true; // Always succeed in this mock implementation
  };

  const getUserReservations = (): Reservation[] => {
    if (!currentUser) return [];
    return reservations.filter(r => r.userId === currentUser.id);
  };

  const cancelReservation = (reservationId: number) => {
    const index = reservations.findIndex(r => r.id === reservationId);
    if (index !== -1) {
      // Only allow cancellation if status is pending
      if (reservations[index].status === 'pending') {
        reservations[index].status = 'cancelled';

        // Return tickets to available seats
        const screeningId = reservations[index].screeningId;
        const screeningIndex = screenings.findIndex(s => s.id === screeningId);
        if (screeningIndex !== -1) {
          screenings[screeningIndex].available_seats += reservations[index].numberOfTickets;
        }
      }
    }
  };

  return (
    <ReservationContext.Provider value={{
      selectedScreening,
      selectScreening,
      ticketCount,
      setTicketCount,
      createReservation,
      userReservations: getUserReservations(),
      allReservations: reservations,
      cancelReservation
    }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = (): ReservationContextType => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
};
