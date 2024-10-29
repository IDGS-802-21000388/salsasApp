import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de tener esta importación
import { getAgentesVenta } from '../services/AgentesVentaService';

export const useAgentesVentaViewModel = () => {
  const [agentesVenta, setAgentesVenta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAgentesVenta();
  }, []);

  const fetchAgentesVenta = async () => {
    try {
      setLoading(true);
  
      // Obtener los datos del usuario desde AsyncStorage
      const userData = await AsyncStorage.getItem('user');
      const parsedData = JSON.parse(userData);
  
      // Ahora accede a la propiedad "user" dentro del objeto parseado
      const user = parsedData.user;  // Cambiado de parsedData a parsedData.user
  
      console.log('Datos del usuario:', user); // Verifica los datos del usuario
  
      // Obtener los agentes de ventas desde la API
      const agentes = await getAgentesVenta();
      console.log('Datos obtenidos de la API:', agentes); // Verifica los datos obtenidos
  
      let agentesFiltrados = [];
  
      if (user.rol === 'admin') {
        // Si el rol es 'admin', mostramos todos los agentes
        agentesFiltrados = agentes;
      } else if (user.rol === 'agente') {
        // Si el rol es 'agente', filtramos solo los datos del agente específico
        agentesFiltrados = agentes.filter(agente => agente.idUsuarioAgente === user.idUsuario);
      }
  
      setAgentesVenta(agentesFiltrados);
    } catch (err) {
      setError(err.message || 'Error fetching agentes de venta');
    } finally {
      setLoading(false);
    }
  };
  

  return {
    agentesVenta,
    loading,
    error,
  };
};

