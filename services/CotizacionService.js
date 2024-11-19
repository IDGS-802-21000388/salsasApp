import axios from 'axios';
import { API_BASE_PRUEBA } from '@env';

const API_URL_COTIZACION = `${API_BASE_PRUEBA}/Cotizacion`;

export const obtenerTodasCotizaciones = async () => {
  try {
    const response = await axios.get(`${API_URL_COTIZACION}/obtener-todas`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener todas las cotizaciones:', error);
    throw error;
  }
};

export const obtenerCotizacionesPorUsuario = async (idUsuario) => {
  try {
    const response = await axios.get(`${API_URL_COTIZACION}/obtener-por-usuario/${idUsuario}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener cotizaciones para el usuario ${idUsuario}:`, error);
    throw error;
  }
};

export const cerrarCotizacion = async (idCotizacion) => {
  try {
    const response = await axios.put(`${API_URL_COTIZACION}/actualizar-atendida/${idCotizacion}`);
    return response.data;
  } catch (error) {
    console.error(`Error al cerrar la cotización ${idCotizacion}:`, error);
    throw error;
  }
};