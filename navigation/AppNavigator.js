import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "../views/LoginScreen";
import HomeScreen from "../views/HomeScreen";
import UserScreen from "../views/UserScreen";
import { Ionicons } from "@expo/vector-icons";
import EncuestasScreen from "../views/EncuestasScreen";

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
            <Ionicons name="md-poll" size={24} color={color} />
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
