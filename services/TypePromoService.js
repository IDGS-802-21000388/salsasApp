import axios from 'axios';
import { API_BASE_URL } from '@env';

const API_URL = `${API_BASE_URL}/PromoPorTipo`;

// Enviar correos promocionales
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

// Obtener todos los registros de contactos
const getContactClient = async () => {
  try {
    const response = await axios.get(`${API_URL}/getContactClient`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener contactos filtrados por email
const getContactClientByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/getContactClientByEmail`, {
      params: { email }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  sendPromotionEmail,
  getContactClient,
  getContactClientByEmail
};
