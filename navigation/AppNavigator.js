import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import LoginScreen from '../views/LoginScreen';
import HomeScreen from '../views/HomeScreen';
import UserScreen from '../views/UserScreen';
import EncuestasScreen from "../views/EncuestasScreen";
import TypePromoScreen from '../views/TypePromoScreen';
import ProductScreen from '../views/ProductScreen';
import ContactRegistrationScreen from '../views/ContactRegistrationScreen'; // Import the new screen
import { Ionicons } from '@expo/vector-icons';
import RenipointsHistoryScreen from '../views/RenipointsHistoryScreen';
import ComparacionScreen from '../views/ComparacionScreen';
import AgentesVentaScreen from '../views/AgentesVentaScreen'; // Importa el componente de Agentes de Venta
import ClientesScreen from '../views/ClientesScreen';
import QuejasScreen from '../views/QuejasScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#f7f5f2" },
        headerTintColor: "#217765",
        drawerStyle: { backgroundColor: "#f7f5f2" },
        drawerActiveTintColor: "#217765",
        drawerInactiveTintColor: "gray",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Inicio",
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Encuestas"
        component={EncuestasScreen}
        options={{
          title: "Encuestas",
          drawerIcon: ({ color }) => (
            <Ionicons name="stats-chart-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="CreateUser"
        component={UserScreen}
        options={{
          title: "Registrar Usuario",
          drawerIcon: ({ color }) => (
            <Ionicons name="person-add-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="products" 
        component={ProductScreen} 
        options={{
          title: 'Cotización de Productos',
          drawerIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="TypePromoScreen" 
        component={TypePromoScreen} 
        options={{
          title: 'Promociones por Tipo',
          drawerIcon: ({ color }) => (
            <Ionicons name="megaphone-outline" size={24} color={color} /> // Updated icon
          ),
        }}
      />
      <Drawer.Screen 
        name="ReniPointsScreen" 
        component={RenipointsHistoryScreen} 
        options={{
          title: 'Historial de Renipoints',
          drawerIcon: ({ color }) => (
            <Ionicons name="bag" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Comparacion" 
        component={ComparacionScreen} 
        options={{
          title: 'Informe de Ventas', 
          drawerIcon: ({ color }) => (
            <Ionicons name="bar-chart-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="AgentesVenta" 
        component={AgentesVentaScreen} 
        options={{
          title: 'Agentes de Venta',
          drawerIcon: ({ color }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
        }}
      />

    <Drawer.Screen 
        name="ClientesScreen" 
        component={ClientesScreen} 
        options={{
          title: 'Historial de Ventas',
          drawerIcon: ({ color }) => (
            <Ionicons name="receipt-outline" size={24} color={color} />
          ),
        }}
      />

      <Drawer.Screen 
        name="ContactRegistration" 
        component={ContactRegistrationScreen} 
        options={{
          title: 'Registro de Contacto', 
          drawerIcon: ({ color }) => (
            <Ionicons name="contacts-outline" size={24} color={color} /> // New screen with appropriate icon
          ),
        }}
      />
      <Drawer.Screen 
        name="Quejas" 
        component={QuejasScreen} 
        options={{
          title: 'Quejas', 
          drawerIcon: ({ color }) => (
            <Ionicons name="bar-chart-outline" size={24} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppDrawer"
        component={DrawerNavigator}
        options={{
          headerShown: false,
          title: "Salsas App",
          headerStyle: { backgroundColor: "#f7f5f2" },
          headerTintColor: "#217765",
        }}
      />
    </Stack.Navigator>
  );
}