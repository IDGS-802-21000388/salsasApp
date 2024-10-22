import { createAgenteVenta } from './AgentesVentaService';
import { API_BASE_URL } from '@env';

const BASE_URL = `${API_BASE_URL}/Usuarios`;

export const createUser = async (userData) => {
  try {
    console.log('userData', userData);

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Error creando el usuario');
    }

    const newUser = await response.json();
    const idCliente = newUser.idUsuario;

    await createAgenteVenta(idCliente);

    return newUser;
  } catch (error) {
    console.error('Error creando el usuario:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error obteniendo los usuarios');
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error obteniendo los usuarios:', error);
    throw error;
  }
};
