import axios from 'axios';
import { API_BASE_URL } from '@env';

const API_URL_ENCUESTA = `${API_BASE_URL}/EncuestaSatisfaccion`;
//const API_URL_ENCUESTA = `http://10.16.15.98:7215/api/EncuestaSatisfaccion`;
//const API_URL_ENCUESTA = `http://192.168.1.10:7215/api/EncuestaSatisfaccion`;

export const getEncuestas = async () => {
  try {
    const response = await axios.get(API_URL_ENCUESTA);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching encuestas');
  }
};
export const getEncuestaById = async (id) => {
    try {
      const response = await axios.get(`${API_URL_ENCUESTA}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching encuesta');
    }
  };
  export const addEncuesta = async (encuesta) => {
    try {
      const response = await axios.post(API_URL_ENCUESTA, encuesta);
      return response.data;
    } catch (error) {
      throw new Error('Error adding encuesta');
    }
  };
  export const updateEncuesta = async (id, encuesta) => {
    try {
      const response = await axios.put(`${API_URL_ENCUESTA}/${id}`, encuesta);
      return response.data;
    } catch (error) {
      throw new Error('Error updating encuesta');
    }
  };
  export const deleteEncuesta = async (id) => {
    try {
      await axios.delete(`${API_URL_ENCUESTA}/${id}`);
    } catch (error) {
      throw new Error('Error deleting encuesta');
    }
  };
        