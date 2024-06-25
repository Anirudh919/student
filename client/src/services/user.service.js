import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users/';

const getAllUsers = () => {
  return axios.get(API_URL, {
    headers: { 'x-access-token': localStorage.getItem('userToken') }
  });
};

const getUser = (id) => {
  return axios.get(API_URL + id, {
    headers: { 'x-access-token': localStorage.getItem('userToken') }
  });
};

const updateUser = (id, data) => {
  return axios.put(API_URL + id, data, {
    headers: { 'x-access-token': localStorage.getItem('userToken') }
  });
};

const deleteUser = (id) => {
  return axios.delete(API_URL + id, {
    headers: { 'x-access-token': localStorage.getItem('userToken') }
  });
};

export default {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
