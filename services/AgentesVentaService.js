import { API_BASE_PRUEBA } from '@env';

const API_URL = `${API_BASE_PRUEBA}/AgentesVenta`;
//const API_URL = `http://10.16.15.98:7215/api/AgentesVenta`;
//const API_URL = `http://192.168.1.6:7215/api/AgentesVenta`;

// Servicio para crear un nuevo AgenteVenta
export const createAgenteVenta = async (idCliente) => {
  try {
    const UserData = await AsyncStorage.getItem('user');
    const parsedData = JSON.parse(UserData);
    const user = parsedData.user;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idUsuario: user.idUsuario,
        idCliente: idCliente,
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

// Servicio para obtener todos los AgentesVenta
export const getAgentesVenta = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Error obteniendo AgentesVenta');
    }

    return await response.json();
  } catch (error) {
    console.error('Error obteniendo AgentesVenta:', error);
    throw error;
  }
};

// Servicio para obtener un AgenteVenta por ID
export const getAgenteVentaById = async (idAgentesVenta) => {
  try {
    const response = await fetch(`${API_URL}/${idAgentesVenta}`);

    if (!response.ok) {
      throw new Error('Error obteniendo AgenteVenta');
    }

    return await response.json();
  } catch (error) {
    console.error('Error obteniendo AgenteVenta:', error);
    throw error;
  }
};

// Servicio para eliminar un AgenteVenta
export const deleteAgenteVenta = async (idAgentesVenta) => {
  try {
    const response = await fetch(`${API_URL}/${idAgentesVenta}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error eliminando AgenteVenta');
    }

    return true;
  } catch (error) {
    console.error('Error eliminando AgenteVenta:', error);
    throw error;
  }
};

export const updateAgenteVenta = async (idAgentesVenta, idAgente, idCliente) => {
  try {
    const response = await fetch(`${API_URL}/${idAgentesVenta}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idAgente,
        idCliente,
      }),
    });

    if (!response.ok) {
      throw new Error('Error actualizando AgenteVenta');
    }

    return await response.json();
  } catch (error) {
    console.error('Error actualizando AgenteVenta:', error);
    throw error;
  }
};
