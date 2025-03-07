import axios from "axios";
import { API_URL } from "./api";
import { AuthData, AuthResponse, RegisterData } from "../context/AuthContext";

// Requête pour l'inscription
export const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Requête pour la connexion
export const loginUser = async (loginData: AuthData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login`, loginData);
  return response.data;
};
