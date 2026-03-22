import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // We know from backend the token structure is sub (username), id, role
        // eslint-disable-next-line
        setUser({
          id: decoded.id,
          username: decoded.sub,
          role: decoded.role,
          token: token
        });
      } catch (err) {
        console.error('Invalid token', err);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await api.post('/auth/token', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    
    const decoded = jwtDecode(access_token);
    setUser({
      id: decoded.id,
      username: decoded.sub,
      role: decoded.role,
      token: access_token
    });
  };

  const register = async (userData) => {
      await api.post('/auth/', userData);
      // Wait for 201 Created and then log them in
      await login(userData.username, userData.password);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
