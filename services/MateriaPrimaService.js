import axios from 'axios';

const API_URL = 'https://localhost:7215/api/MateriaPrima';

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};
