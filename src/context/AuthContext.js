import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Start with null to show a loading state
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const storedUserData = await AsyncStorage.getItem('userData');

        if (token && storedUserData) {
          setUserData(JSON.parse(storedUserData));
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Failed to check authentication:', error);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (userData) => {
    try {
      setUserData(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Failed to set user data:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      setUserData(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Failed to remove user data:', error);
    }
  };

  if (isLoggedIn === null) {
    // Show a loading indicator or splash screen
    return null;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, setUserData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
