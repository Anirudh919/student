import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const register = (name, email, phone, role, password) => {
  return axios.post(API_URL + 'register', {
    name,
    email,
    phone,
    role,
    password,
  });
};

const login = (email, password) => {
  return axios.post(API_URL + 'login', {
    email,
    password,
  });
};

const logout = () => {
  return axios.post(API_URL + 'logout');
};

export default {
  register,
  login,
  logout,
};
