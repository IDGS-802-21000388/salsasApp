import axios from 'axios';
import { API_BASE_URL } from '@env';

const API_URL_USERS = `${API_BASE_URL}/Usuarios`;
//const API_URL_USERS = `http://10.16.15.98:7215/api/Usuarios`;
//const API_URL_USERS = `http://192.168.1.10:7215/api/Usuarios`;

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL_USERS);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL_USERS}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user');
  }
};

export const addUser = async (user) => {
  try {
    const response = await axios.post(API_URL_USERS, user);
    return response.data;
  } catch (error) {
    throw new Error('Error adding user');
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await axios.put(`${API_URL_USERS}/${id}`, user);
    return response.data;
  } catch (error) {
    throw new Error('Error updating user');
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL_USERS}/${id}`);
  } catch (error) {
    throw new Error('Error deleting user');
  }
};
