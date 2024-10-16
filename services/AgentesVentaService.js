import { API_BASE_URL } from '@env';

const API_URL = `${API_BASE_URL}/AgentesVenta`;

export const createAgenteVenta = async (idCliente) => {
  try {
    const idAgente = 10;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idAgente,
        idCliente,
      }),
    });

    if (!response.ok) {
      throw new Error('Error creando AgenteVenta');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creando AgenteVenta:', error);
    throw error;
  }
};
