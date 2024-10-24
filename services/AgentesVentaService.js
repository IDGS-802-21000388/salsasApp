import { API_BASE_URL } from '@env';

const API_URL = `${API_BASE_URL}/AgentesVenta`;
//const API_URL = `http://10.16.15.98:7215/api/AgentesVenta`;
//const API_URL = `http://192.168.1.10:7215/api/AgentesVenta`;

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
