/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from './firebase-config';
import CryptoJS from 'crypto-js'



interface User {
  uid: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const secretKey = import.meta.env.VITE_APP_SECRET_KEY;


  // Define your fallback user data using useMemo
  const defaultUser: User = useMemo(() => ({ uid: 'Dummy User' }), []);

  const [currentUser, setCurrentUser] = useState<User>(defaultUser); // Initialize currentUser with defaultUser

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus) {
      const decryptedBytes = CryptoJS.AES.decrypt(authStatus, secretKey);
      const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
      const isAuthenticatedValue = decryptedData === 'true'; // Convert to boolean
      setIsAuthenticated(isAuthenticatedValue); // Use the decrypted data
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({ uid: user.uid });
      } else {
        setCurrentUser(defaultUser); // Set currentUser to defaultUser when user is not authenticated
      }
    });

    return () => unsubscribe();
  }, [defaultUser]); // Make sure to include defaultUser in the dependency array

  const login = () => {
    const originalData = 'true';
    const encryptedData = CryptoJS.AES.encrypt(originalData, secretKey).toString();
    localStorage.setItem('isAuthenticated', encryptedData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(defaultUser); // Reset currentUser to defaultUser on logout
    localStorage.removeItem('isAuthenticated');
  };

  const authContextValue: AuthContextType = {
    isAuthenticated,
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!isLoading && children} {/* Render children only if not loading */}
    </AuthContext.Provider>
  );
};
