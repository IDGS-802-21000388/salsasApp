import React from 'react';
import { FlatList, Image, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Box, Text, Button, VStack, Center } from 'native-base';
import useProductViewModel from '../viewmodels/ProductViewModel';

export default function ProductScreen() {
  const { products, isLoggedIn, loading, error } = useProductViewModel();

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      Alert.alert('Producto agregado al carrito');
    } else {
      Alert.alert('No has iniciado sesión', 'Inicia sesión para realizar el pago.');
    }
  };

  const renderProduct = ({ item }) => (
    <Box style={styles.productBox}>
      <Image source={{ uri: item.fotografia }} style={styles.productImage} alt={item.nombreProducto} />
      <Text style={styles.productName}>{item.nombreProducto}</Text>
      <Text style={styles.productPrice}>${item.precioVenta}</Text>
      <Button style={styles.addButton} onPress={() => handleAddToCart(item)}>
        Agregar al carrito
      </Button>
    </Box>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1} bg="#f7f5f2">
        {loading ? (
          <Center flex={1}>
            <Text>Cargando...</Text>
          </Center>
        ) : error ? (
          <Center flex={1}>
            <Text color="red.500">{error}</Text>
          </Center>
        ) : (
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.idProducto.toString()}
            contentContainerStyle={styles.productList}
          />
        )}
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  productList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  productBox: {
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
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#217765',
  },
  productPrice: {
    fontSize: 14,
    color: '#c31a23',
  },
  addButton: {
    backgroundColor: '#217765',
    marginTop: 10,
  },
});
