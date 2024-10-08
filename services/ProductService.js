import axios from 'axios';

const API_URL = 'http://192.168.1.65:7215/api/Producto';

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};
