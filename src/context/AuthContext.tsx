import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { useMutation } from '@tanstack/react-query';
import { loginUser, registerUser } from '../services/auth';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (name: string, email: string, dateOfBirth: string, password: string, successCallback: () => void) => void;
}

export interface AuthData {
  email: string;
  password: string;
}

export interface RegisterData extends AuthData {
  name: string;
  date_of_birth: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
    // Mutation pour l'inscription
  const registerMutation = useMutation<AuthResponse, Error, RegisterData>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Inscription réussie:", data);
    },
    onError: (error) => {
      alert("Une erreur est survenue")
      console.error("Erreur d'inscription:", error);
    },
  });

  // Mutation pour la connexion
  const loginMutation = useMutation<AuthResponse, Error, AuthData>({
    mutationFn:loginUser,
    onSuccess: (data) => {
      console.log("Connexion réussie:", data);
    },
    onError: (error) => {
      alert("Une erreur est survenue")
      console.error("Erreur de connexion:", error);
    },
  });

  const login = (email: string, password: string) => {
    loginMutation.mutateAsync({ email, password }).then((res) => {
      console.log({res});
      // if (user) {
      //   setCurrentUser(user);
      //   return true;
      // }
      // return false;

    })
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = (name: string, email: string, password: string, dateOfBirth: string, successCallback: () => void) => {
    registerMutation.mutateAsync({ name, email, password, date_of_birth: dateOfBirth }).then((res) => {
      setCurrentUser(res.user)
      successCallback()
    })
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
