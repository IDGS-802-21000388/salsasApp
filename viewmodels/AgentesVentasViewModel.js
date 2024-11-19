import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
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
  
      const userData = await AsyncStorage.getItem('user');
      const parsedData = JSON.parse(userData);
  
      const user = parsedData.user;  
      console.log('Datos del usuario:', user); 
  
      const agentes = await getAgentesVenta();
      console.log('Datos obtenidos de la API:', agentes); 
  
      let agentesFiltrados = [];
  
      if (user.rol === 'admin') {
        agentesFiltrados = agentes;
      } else if (user.rol === 'agente') {
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
    fetchAgentesVenta, 
  };
};


