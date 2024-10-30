import React, { useState, useCallback } from 'react';
import { FlatList, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Box, Text, Button, VStack, HStack, Modal, Center, IconButton, Icon, Fab, Input, Select } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import useProductViewModel from '../viewmodels/ProductViewModel';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { API_BASE_PRUEBA } from '@env';

const API_URL = `${API_BASE_PRUEBA}/Ventum`;

export default function ProductScreen() {
  const { products, loading, error, cart, quantities, handleAddToCart, handleRemoveFromCart, handleQuantityChange, calculateSubtotal, calculateIVA } = useProductViewModel();
  const [showCart, setShowCart] = useState(false);
  const [showTestimonios, setShowTestimonios] = useState(false);
  const [testimonios, setTestimonios] = useState([]);
  const [discount, setDiscount] = useState('');
  const [discountType, setDiscountType] = useState('%');
  const [email, setEmail] = useState('');

  const route = useRoute();
  const [isProductScreenFocused, setIsProductScreenFocused] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (route.name === 'products') {
        setIsProductScreenFocused(true);
      } else {
        setIsProductScreenFocused(false);
      }
      return () => setIsProductScreenFocused(false);
    }, [route.name])
  );

  const fetchTestimonios = async (idProducto) => {
    try {
      const reviews = await getProductReviews(idProducto);
      setTestimonios(reviews);
      setShowTestimonios(true);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const calculateDiscountedTotal = () => {
    const subtotal = calculateSubtotal();
    let total = subtotal + calculateIVA(subtotal);
    
    if (discountType === '%' && discount !== '') {
      total -= (subtotal * parseFloat(discount)) / 100;
    } else if (discountType === '$' && discount !== '') {
      total -= parseFloat(discount);
    }
    return total > 0 ? total : 0;
  };

  const handleDiscountChange = (value) => {
    if (value === '') {
      setDiscount('');
    } else if (!isNaN(value)) {
      setDiscount(value);
    }
  };

  const handleSendCotizacion = async () => {
    try {
      const response = await fetch(`${API_URL}:7215/api/cotizacion/enviar-cotizacion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          items: cart.map(item => ({
            NombreProducto: item.nombreProducto,
            PrecioUnitario: item.precioVenta,
            Cantidad: item.quantity,
          })),
        }),
      });

      if (response.ok) {
        alert('Cotización enviada correctamente');
      } else {
        alert('Error al enviar la cotización');
      }
    } catch (error) {
      console.error('Error al enviar la cotización:', error);
    }
  };

  const renderProduct = ({ item }) => (
    <Box style={styles.productBox}>
      <Image source={{ uri: item.fotografia }} style={styles.productImage} alt={item.nombreProducto} />
      <Text style={styles.productName}>{item.nombreProducto}</Text>
      <Text style={styles.productPrice}>${item.precioVenta}</Text>
      <Button style={styles.addButton} onPress={() => handleAddToCart(item)}>
        <Text style={styles.buttonText}>Agregar al carrito</Text>
      </Button>
      <Button style={styles.testimonialButton} onPress={() => fetchTestimonios(item.idProducto)}>
        <Text style={styles.buttonText}>Ver Testimonios</Text>
      </Button>
    </Box>
  );

  const renderCalificacion = (calificacion) => {
    const estrellas = '⭐️'.repeat(calificacion);
    let emoji;

    if (calificacion === 5) emoji = '😃';
    else if (calificacion === 4) emoji = '😊';
    else if (calificacion === 3) emoji = '😐';
    else if (calificacion === 2) emoji = '😕';
    else emoji = '😞';

    return `${estrellas} ${emoji}`;
  };

  const renderTestimonio = ({ item }) => (
    <Box style={styles.testimonioBox}>
      <Text style={styles.testimonioComentario}>{item.comentario}</Text>
      <Text style={styles.testimonioCalificacion}>
        Calificación: {renderCalificacion(item.calificacion)}
      </Text>
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
        <HStack alignItems="center" justifyContent="space-between">
          <Input
            placeholder="Descuento"
            keyboardType="numeric"
            value={discount}
            onChangeText={handleDiscountChange}
            w="45%"
          />
          <Select
            selectedValue={discountType}
            minWidth="120"
            onValueChange={(value) => setDiscountType(value)}
          >
            <Select.Item label="%" value="%" />
            <Select.Item label="$" value="$" />
          </Select>
        </HStack>

        <Input
          placeholder="Ingresa el correo electrónico"
          value={email}
          onChangeText={setEmail}
          mt={4}
        />

        <Text style={styles.totalText}>Subtotal: ${calculateSubtotal()}</Text>
        <Text style={styles.totalText}>IVA (16%): ${calculateIVA(calculateSubtotal()).toFixed(2)}</Text>
        <Text style={styles.totalText}>Total con Descuento: ${calculateDiscountedTotal().toFixed(2)}</Text>
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

            {isProductScreenFocused && (
              <Fab
                position="absolute"
                bottom={70}
                right={5}
                size="lg"
                icon={<Icon color="white" as={Ionicons} name="cart-outline" size="lg" />}
                onPress={() => setShowCart(true)}
                backgroundColor="#217765"
                shadow={2}
              />
            )}

            <Modal isOpen={showCart} onClose={() => setShowCart(false)} size="lg">
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Carrito</Modal.Header>
                <Modal.Body>{renderCartItems()}</Modal.Body>
                <Modal.Footer>
                  <Button w="100%" onPress={handleSendCotizacion} backgroundColor="#217765">
                    <Text style={styles.buttonText}>Enviar Cotización</Text>
                  </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>

            <Modal isOpen={showTestimonios} onClose={() => setShowTestimonios(false)} size="lg">
              <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Testimonios</Modal.Header>
                <Modal.Body>
                  <FlatList
                    data={testimonios}
                    renderItem={renderTestimonio}
                    keyExtractor={(item) => item.idTestimonio.toString()}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button w="100%" onPress={() => setShowTestimonios(false)} backgroundColor="#217765">
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
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
  testimonioBox: { 
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  testimonioComentario: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  testimonioCalificacion: {
    fontSize: 14,
    color: '#555',
  },
  testimonialButton: {
    marginTop: 10,
    backgroundColor: '#217765',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
});
