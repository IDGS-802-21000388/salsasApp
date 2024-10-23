import axios from 'axios';
//import { API_BASE_URL } from '../env';

//const API_URL = `${API_BASE_URL}/MateriaPrima`;
const API_URL = `http://10.16.15.98:7215/api/MateriaPrima`;
//const API_URL = `http://192.168.1.10:7215/api/MateriaPrima`;

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};
