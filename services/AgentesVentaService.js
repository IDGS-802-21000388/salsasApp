const API_URL = 'http://192.168.1.68:7215/api/AgentesVenta';

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
