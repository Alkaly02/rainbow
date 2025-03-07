import axios from "axios";
import { Reservation } from "../types";
import { API_URL } from "./api";

export const createReservationService = async (reservationData:Reservation) => {
    const response = await axios.post(API_URL +'/reservations', reservationData);
    return response.data;
}
