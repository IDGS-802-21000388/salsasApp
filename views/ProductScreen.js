import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Box, Text, Button, VStack, HStack, Input, Center, IconButton, Icon, Modal, Fab } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import useProductViewModel from '../viewmodels/ProductViewModel';

export default function ProductScreen() {
  const { products, loading, error, cart, quantities, handleAddToCart, handleRemoveFromCart, handleQuantityChange, calculateSubtotal, calculateIVA } = useProductViewModel();
  const [showCart, setShowCart] = useState(false);

  const renderProduct = ({ item }) => (
    <Box style={styles.productBox}>
      <Image source={{ uri: item.fotografia }} style={styles.productImage} alt={item.nombreProducto} />
      <Text style={styles.productName}>{item.nombreProducto}</Text>
      <Text style={styles.productPrice}>${item.precioVenta}</Text>
      <Button style={styles.addButton} onPress={() => handleAddToCart(item)}>
        <Text style={styles.buttonText}>Agregar al carrito</Text>
      </Button>
    </Box>
  );

  const renderCartItems = () => (
    <ScrollView>
      {cart.map((item) => (
        <Box key={item.idProducto} style={styles.cartItemBox}>
          <Text style={styles.cartItemName}>{item.nombreProducto}</Text>
          <HStack justifyContent="space-between" alignItems="center">
            <Input
              keyboardType="numeric"
              value={quantities[item.idProducto]?.toString()}
              onChangeText={(value) => handleQuantityChange(item.idProducto, value)}
              style={styles.quantityInput}
              w="20%"
            />
            <Text style={styles.cartItemPrice}>${item.precioVenta * item.quantity}</Text>
            {/* Botón para eliminar el producto */}
            <IconButton
              icon={<Icon as={Ionicons} name="close-circle-outline" />}
              onPress={() => handleRemoveFromCart(item.idProducto)}
              size="lg"
              _icon={{ color: "red.500" }} 
            />
          </HStack>
        </Box>
      ))}
      <Box style={styles.totalBox}>
        <Text style={styles.totalText}>Subtotal: ${calculateSubtotal()}</Text>
        <Text style={styles.totalText}>IVA (16%): ${calculateIVA(calculateSubtotal()).toFixed(2)}</Text>
        <Text style={styles.totalText}>Total: ${(calculateSubtotal() + calculateIVA(calculateSubtotal())).toFixed(2)}</Text>
      </Box>
    </ScrollView>
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
          <>
            <FlatList
              data={products}
              renderItem={renderProduct}
              keyExtractor={(item) => item.idProducto.toString()}
              contentContainerStyle={styles.productList}
            />

            {/* FAB para mostrar el carrito */}
            <Fab
              position="absolute"
              bottom={70}
              right={5}
              size="lg"
              icon={<Icon color="white" as={Ionicons} name="cart-outline" size="lg" />}
              onPress={() => setShowCart(true)}
              backgroundColor="#217765"
              shadow={2} // Añadimos una pequeña sombra para darle más relevancia
            />

            {/* Modal del carrito */}
            <Modal isOpen={showCart} onClose={() => setShowCart(false)} size="lg">
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Carrito</Modal.Header>
                <Modal.Body>{renderCartItems()}</Modal.Body>
                <Modal.Footer>
                  <Button w="100%" onPress={() => setShowCart(false)} backgroundColor="#217765">
                    <Text style={styles.buttonText}>Cerrar</Text>
                  </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </>
        )}
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  productList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  productBox: {
    backgroundColor: '#fff',
    padding: 20, // Espaciado más amplio para mayor estética
    borderRadius: 12, // Esquinas más redondeadas
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,  // Sombra más sutil para Android
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
    color: '#217765',
  },
  productPrice: {
    fontSize: 16,
    color: '#c31a23',
  },
  addButton: {
    backgroundColor: '#217765',
    marginTop: 12,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
  cartItemBox: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: '500',
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  cartItemPrice: {
    fontSize: 18,
    color: '#217765',
  },
  totalBox: {
    padding: 10,
    backgroundColor: '#f7f5f2',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right',
    color: '#217765',
  },
});
