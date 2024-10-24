import axios from 'axios';
//import { API_BASE_URL } from '../env';

//const API_URL = `${API_BASE_URL}/Producto`;
const API_URL = `http://10.16.15.98:7215/api/Producto`;
//const API_URL = `http://192.168.1.10:7215/api/Producto`;

export const getProducts = async () => {
  try {
    console.log('API_URLLL', API_URL);
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};
