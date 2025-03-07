import axios from "axios";
import { Reservation } from "../types";
import { API_URL } from "./api";

export const createReservationService = async (reservationData:Reservation) => {
    const response = await axios.post(API_URL +'/reservations', reservationData);
    return response.data;
}

// Fonction pour récupérer les réservations de l'utilisateur
export const fetchUserReservations = async (): Promise<Reservation[]> => {
  const token = localStorage.getItem('token'); // Récupérer le token JWT depuis le localStorage
  const response = await axios.get(API_URL + '/user/reservations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.reservations;
};
