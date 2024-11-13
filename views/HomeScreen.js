import React from 'react';
import { Box, Text, Center, Pressable, Icon, FlatList, Image } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const logoUri = require('../assets/logo_Salsa_Reni-removebg.png');

const modules = [
  { name: "Encuestas", icon: "stats-chart-outline", route: "Encuestas" },
  { name: "Registrar Usuario", icon: "person-add-outline", route: "CreateUser" },
  { name: "Cotización de Productos", icon: "cart-outline", route: "products" },
  { name: "Promociones por Tipo", icon: "megaphone-outline", route: "TypePromoScreen" },
  { name: "Informe de Ventas", icon: "bar-chart-outline", route: "Comparacion" },
  { name: "Agentes de Venta", icon: "people-outline", route: "AgentesVenta" },
  { name: "Historial de Ventas", icon: "receipt-outline", route: "ClientesScreen" },
  { name: "Registro de Contacto", icon: "person-circle-outline", route: "ContactRegistration" },
  { name: "Quejas", icon: "alert-circle-outline", route: "Quejas" },
];

const HomeScreen = ({ navigation }) => {
  return (
    <Box flex={1} p={4} backgroundColor="#f7f5f2">
      
      <Center mb={6}>
        <Image source={logoUri} alt="Logo Salsas Reni" size="xl" resizeMode="contain" mb={4} />
        <Text fontSize="2xl" color="#217765" fontWeight="bold">
          Bienvenido a Salsas Reni CRM
        </Text>
        <Text fontSize="lg" mt={2} color="#c31a23">
          Selecciona un módulo para continuar
        </Text>
      </Center>

      <FlatList
        data={modules}
        numColumns={2}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate(item.route)}
            flex={1}
            m={2}
            p={4}
            borderRadius="lg"
            bgColor="#ffffff"
            shadow={3}
            alignItems="center"
          >
            <Icon as={Ionicons} name={item.icon} size="xl" color="#217765" mb={2} />
            <Text fontSize="md" color="#217765" textAlign="center" fontWeight="bold">
              {item.name}
            </Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.route}
      />
    </Box>
  );
};

export default HomeScreen;
