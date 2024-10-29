// services/QuejasService.js
import axios from 'axios';

const API_BASE_URL = 'http://10.16.14.112:7215/api';

export const QuejasService = {
  obtenerQuejas: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Quejas`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener las quejas');
    }
  },

  responderQueja: async (id, respuesta) => {
    try {
      console.log("Attempting to respond to complaint with ID:", id);
      console.log("Response message:", respuesta);
      const response = await axios.post(
        `${API_BASE_URL}/Quejas/${id}/respuesta`,
        respuesta, // Asegúrate de que `respuesta` sea un string puro aquí
        {
          headers: {
            'Content-Type': 'application/json', // El backend espera JSON
          },
        }
      );
      console.log("Response status:", response.status);
    } catch (error) {
      console.error("Error in responderQueja:", error);
      throw new Error('Error al responder la queja');
    }
  },
};

