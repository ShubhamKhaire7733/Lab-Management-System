import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = (): User | null => {
  const token = getToken();
  if (!token) return null;
  
  try {
    return jwtDecode(token);
  } catch {
    removeToken();
    return null;
  }
};