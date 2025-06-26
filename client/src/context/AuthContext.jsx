// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getProfile } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const data = await getProfile(token);
          setUser(data);
        } catch (err) {
          console.error('Auth Error:', err);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = (userData, jwt) => {
    localStorage.setItem('token', jwt);
    setUser(userData);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ EXPORT useAuth
export const useAuth = () => useContext(AuthContext);