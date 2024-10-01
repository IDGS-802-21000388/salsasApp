import React, { useState } from 'react';
import { FlatList, Text, TextInput, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Box, Button, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const MateriaPrimaScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const data = [
    {
      id: '1',
      nombreMateria: 'Harina',
      precioCompra: 50,
      cantidadExistentes: 100,
      tipoMedida: 'kg',
      nombreProveedor: 'Proveedor A',
      fechaVencimiento: '2024-10-01',
      estatus: true,
    },
    {
      id: '2',
      nombreMateria: 'Azúcar',
      precioCompra: 70,
      cantidadExistentes: 50,
      tipoMedida: 'kg',
      nombreProveedor: 'Proveedor B',
      fechaVencimiento: '2024-11-15',
      estatus: false,
    },
    {
      id: '3',
      nombreMateria: 'Sal',
      precioCompra: 20,
      cantidadExistentes: 200,
      tipoMedida: 'kg',
      nombreProveedor: 'Proveedor C',
      fechaVencimiento: '2025-01-20',
      estatus: true,
    },
  ];

  const filteredData = data.filter(item =>
    item.nombreMateria.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función de ejemplo para eliminar una materia prima
  const eliminarMateriaPrima = (id) => {
    Alert.alert('Eliminar', '¿Deseas eliminar esta Materia Prima?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: () => alert(`Materia Prima ${id} eliminada`) }
    ]);
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Materias Primas</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
        </View>

        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Box borderBottomWidth="1" p="4" mb="2" style={styles.box}>
              <Text style={styles.itemTitle}>{item.nombreMateria}</Text>
              <Text>Precio Compra: ${item.precioCompra}</Text>
              <Text>Cantidad: {item.cantidadExistentes} {item.tipoMedida}</Text>
              <Text>Proveedor: {item.nombreProveedor}</Text>
              <Text>Fecha Vencimiento: {item.fechaVencimiento}</Text>
              <Text style={item.estatus ? styles.active : styles.inactive}>
                {item.estatus ? 'Activo' : 'Inactivo'}
              </Text>

              {/* Botones de Editar, Eliminar y Registrar Merma */}
              <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={() => alert('Editar Materia Prima')}>
                  <Ionicons name="pencil" size={24} color="#217765" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={() => eliminarMateriaPrima(item.id)}>
                  <Ionicons name="trash" size={24} color="#c31a23" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={() => alert('Registrar Merma')}>
                  <Ionicons name="document" size={24} color="#ffcc00" />
                </TouchableOpacity>
              </View>
            </Box>
          )}
        />

        {/* Botón flotante para añadir nueva materia prima */}
        <TouchableOpacity style={styles.addButton} onPress={() => alert('Añadir Materia Prima')}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  box: {
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  active: {
    color: 'green',
    fontWeight: 'bold',
  },
  inactive: {
    color: 'red',
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
    marginRight: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#217765',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default MateriaPrimaScreen;
