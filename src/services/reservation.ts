import axios from "axios";
import { Reservation } from "../types";

export const createReservationService = async (reservationData:Reservation) => {
    const response = await axios.post('/api/reservations', reservationData);
    return response.data;
}
