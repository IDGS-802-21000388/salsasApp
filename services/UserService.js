import { createAgenteVenta } from './AgentesVentaService';
//import { API_BASE_URL } from '../env';

//const BASE_URL = `${API_BASE_URL}/Usuarios`;
const BASE_URL = `http://10.16.15.98:7215/api/Usuarios`;
//const BASE_URL = `http://192.168.1.10:7215/api/Usuarios`;

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
