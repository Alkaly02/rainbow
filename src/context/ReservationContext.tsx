import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Screening, Reservation, Payment } from '../types';
import { screenings, reservations, payments } from '../data/mockData';
import { useAuth } from './AuthContext';
import { createReservationService } from '../services/reservation';
import { useMutation } from '@tanstack/react-query';

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
interface ReservationResponse {
  reservation: Reservation
}

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedScreening, setSelectedScreening] = useState<Screening | null>(null);
  const [ticketCount, setTicketCount] = useState<number>(1);
  const { currentUser } = useAuth();
  const reservationMutation = useMutation<ReservationResponse, Error, Reservation>({
      mutationFn: createReservationService,
      onSuccess: (data) => {
        console.log("Inscription réussie:", data);
      },
      onError: (error) => {
        alert("Une erreur est survenue")
        console.error("Erreur d'inscription:", error);
      },
    });


  const selectScreening = (screening: Screening) => {
    setSelectedScreening(screening);
    setTicketCount(1); // Reset ticket count when selecting a new screening
  };

  console.log({selectScreening});


  const createReservation = () => {
    if (!currentUser || !selectedScreening) return false;

    // Check if enough seats are available
    if (selectedScreening.available_seats < ticketCount) return false;

    // Calculate total amount (in a real app, this would come from a pricing service)
    const ticketPrice = 12.00; // Example price per ticket
    const totalAmount = ticketPrice * ticketCount;

    // Create new reservation
    // 'user_id','screening_id','number_of_tickets','status','total_amount'
    const newReservation: Reservation = {
      user_id: currentUser.id,
      screening_id: selectedScreening.id,
      number_of_tickets: ticketCount,
      // status: 'pending',
      total_amount: totalAmount
    };
    reservationMutation.mutateAsync(newReservation).then((res) => {
      alert("Nouvelle reservation ajoutee")
    }).catch((err) => {
      console.log("Error reservation", err);
      alert("Une alerte est survenue")
    })
    // Simulate payment processing
    // const paymentSuccess = await simulatePayment(newReservation);

    // TODO: remove this later
    // if () {
      // Update reservation status
      // newReservation.status = 'confirmed';

      // Add to reservations array
      // reservations.push(newReservation);

      // Update available seats
      // const screeningIndex = screenings.findIndex(s => s.id === selectedScreening.id);
      // if (screeningIndex !== -1) {
      //   screenings[screeningIndex].available_seats -= ticketCount;
      // }

      // return true;
    // }

    // return false;
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
