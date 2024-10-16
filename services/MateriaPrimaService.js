import axios from 'axios';
import { API_BASE_URL } from '@env';

const API_URL = `${API_BASE_URL}/MateriaPrima`;

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};
