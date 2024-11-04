import { createAgenteVenta } from './AgentesVentaService';
import { API_BASE_PRUEBA } from '@env';

const BASE_URL = `${API_BASE_PRUEBA}/Usuarios`;
//const BASE_URL = `http://10.16.15.98:7215/api/Usuarios`;
//const BASE_URL = `http://192.168.1.10:7215/api/Usuarios`;

export const createUser = async (userData) => {
  try {
    console.log('userData CREATE', userData);
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      console.log('RESPONSE OK', response);
      throw new Error('Error creando el usuario');
    }

    const newUser = await response.json();
    const idCliente = newUser.idUsuario;

    console.log('idCliente CREATE', idCliente);

    await createAgenteVenta(idCliente);

    return newUser;
  } catch (error) {
    console.error('Error creando el usuario catch:', error);
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
