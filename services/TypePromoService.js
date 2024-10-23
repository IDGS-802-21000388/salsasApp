import axios from 'axios';
import { API_BASE_URL } from '@env';

const API_URL = `${API_BASE_URL}/PromoPorTipo`;

const sendPromotionEmail = async (emails, mensaje) => {
  try {
    const response = await axios.post(`${API_URL}/enviar-promocion`, {
      emails,
      mensaje
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  sendPromotionEmail
};