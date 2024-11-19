import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAgentesVentaViewModel } from '../viewmodels/AgentesVentasViewModel';

const groupAgentesConClientes = (agentes) => {
  const grouped = {};

  agentes.forEach(({ idAgentesVenta, nombreAgente, nombreCliente, correoCliente, telefonoCliente, direccionCliente }) => {
    if (!grouped[nombreAgente]) {
      grouped[nombreAgente] = {
        nombreAgente,
        clientes: [],
      };
    }
    grouped[nombreAgente].clientes.push({ 
      idAgentesVenta, 
      nombreCliente, 
      correoCliente, 
      telefonoCliente, 
      direccionCliente 
    });
  });

  return Object.values(grouped);
};

const AgentesVentaScreen = () => {
  const { agentesVenta, loading, error, fetchAgentesVenta } = useAgentesVentaViewModel();
  const groupedAgentes = groupAgentesConClientes(agentesVenta);

  const [selectedClient, setSelectedClient] = useState(null);

  const handleClientPress = (cliente) => {
    if (selectedClient && selectedClient.idAgentesVenta === cliente.idAgentesVenta) {
      setSelectedClient(null);
    } else {
      setSelectedClient(cliente);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAgentesVenta(); // Llama a la función para recargar datos al enfocar la pantalla
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.agentContainer}>
      <Text style={styles.agentName}>Agente: {item.nombreAgente}</Text>
      {item.clientes.map(cliente => (
        <View key={cliente.idAgentesVenta}>
          <TouchableOpacity 
            style={styles.clientButton}
            onPress={() => handleClientPress(cliente)}
          >
            <Text style={styles.clientName}>Cliente: {cliente.nombreCliente}</Text>
          </TouchableOpacity>

          {selectedClient && selectedClient.idAgentesVenta === cliente.idAgentesVenta && (
            <View style={styles.details}>
              <Text style={styles.detailText}>Correo: {cliente.correoCliente}</Text>
              <Text style={styles.detailText}>Teléfono: {cliente.telefonoCliente}</Text>
              <Text style={styles.detailText}>Dirección: {cliente.direccionCliente}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes registrados por agente</Text>
      <FlatList
        data={groupedAgentes}
        keyExtractor={(item) => item.nombreAgente}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay registros para mostrar.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  agentContainer: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  agentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  clientButton: {
    backgroundColor: '#217765', 
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc', 
    marginVertical: 5,
  },
  clientName: {
    color: "white", 
    fontSize: 16,
  },
  details: {
    backgroundColor: '#e9ecef',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  detailText: {
    color: '#555',
    fontSize: 14,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 20,
  },
});

export default AgentesVentaScreen;
