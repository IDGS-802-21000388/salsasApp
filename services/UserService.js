import { createAgenteVenta } from './AgentesVentaService';

const BASE_URL = 'http://192.168.1.68:7215/api/Usuarios';

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