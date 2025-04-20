import { createContext, useContext, useEffect, useState } from 'react';
import API from '../axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get('auth/');
      setUser(data);
    } catch (error) {
      setUser(null);
    // console.error('Profile error:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
