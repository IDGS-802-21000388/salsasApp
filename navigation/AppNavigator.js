
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../views/LoginScreen';
import HomeScreen from '../views/HomeScreen';
import UserScreen from '../views/UserScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'CreateUser') {
            iconName = 'person-add-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#217765',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#f7f5f2' },
        headerStyle: { backgroundColor: '#f7f5f2' },
        headerTintColor: '#217765',
      })}
    >
      {/* Pantalla de Inicio */}
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      {/* Pantalla para crear usuarios */}
      <Tab.Screen name="CreateUser" component={UserScreen} options={{ title: 'Registrar Usuario' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Stack de autenticación */}
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* Stack con las tabs principales */}
      <Stack.Screen name="AppTabs" component={AppTabsNavigator} />
    </Stack.Navigator>
  );
}
