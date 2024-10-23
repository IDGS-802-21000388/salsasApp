import axios from 'axios';
import { API_BASE_URL } from '@env';

const API_URL = `${API_BASE_URL}/Producto`;

export const getProducts = async () => {
  try {
    console.log('API_URLLL', API_URL);
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};
