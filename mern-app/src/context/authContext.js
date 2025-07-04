import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, signup as apiSignup } from '../API/getapi';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuthStatus = () => {
      // Check if user data exists in localStorage
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await apiLogin(credentials);
      
      // Create user object
      const userData = {
        email: credentials.email,
        isAuthenticated: true,
        loginTime: new Date().toISOString()
      };
      
      // Save user data to state and localStorage
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return response;
    } catch (err) {
      setError(err.msg || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await apiSignup(userData);
      
      // Create user object
      const userInfo = {
        name: userData.name,
        email: userData.email,
        isAuthenticated: true,
        signupTime: new Date().toISOString()
      };
      
      // Save user data to state and localStorage
      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      
      return response;
    } catch (err) {
      setError(err.msg || 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setError('');
    localStorage.removeItem('user');
    // Clear any cookies if needed
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  // Clear error function
  const clearError = () => {
    setError('');
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return user && user.isAuthenticated;
  };

  // Get user info
  const getUserInfo = () => {
    return user;
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    clearError,
    isAuthenticated,
    getUserInfo
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
