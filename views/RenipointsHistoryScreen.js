import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { Box, Text, VStack, Heading, Center } from 'native-base';

const RenipointsHistoryScreen = () => {

  const [history] = useState([
    {
      id: 1,
      cliente: 'Juan Pérez',
      puntosCanjeados: 150,
      fecha: '2024-10-22',
      totalDescontado: 45.00,
    },
    {
      id: 2,
      cliente: 'María López',
      puntosCanjeados: 200,
      fecha: '2024-10-21',
      totalDescontado: 60.00,
    },
    {
      id: 3,
      cliente: 'Carlos García',
      puntosCanjeados: 100,
      fecha: '2024-10-20',
      totalDescontado: 30.00,
    },
  ]);

  const renderHistoryItem = ({ item }) => (
    <Box style={styles.historyBox}>
      <Text style={styles.clienteName}>{item.cliente}</Text>
      <Text style={styles.details}>
        Puntos Canjeados: {item.puntosCanjeados}
      </Text>
      <Text style={styles.details}>Total Descontado: ${item.totalDescontado}</Text>
      <Text style={styles.details}>Fecha: {item.fecha}</Text>
    </Box>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1} bg="#f7f7f7" p={4}>
        <Center>
          <Heading color="#217765" size="lg" mb={4}>
            Historial de Canje de Renipoints
          </Heading>
        </Center>
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.historyList}
        />
      </VStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  historyList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  historyBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  clienteName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#217765',
  },
  details: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
});

export default RenipointsHistoryScreen;