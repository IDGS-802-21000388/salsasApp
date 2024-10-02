import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.11:7215/api/Login';

// Servicio de autenticación
export const LoginService = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            correo: email,
            contrasenia: password,
          }),
        });

        if (!response.ok) {
          console.error('Response not OK', response.status, response.statusText);
          throw new Error('Error en login');
        }

        const data = await response.json();
        await AsyncStorage.setItem('user', JSON.stringify(data)); // Guarda el objeto completo

        return data;
    } catch (error) {
        console.error('Error en login (catch):', error.message);
        throw error;
    }
};

// Servicio para cerrar sesión
const logout = async () => {
  await AsyncStorage.removeItem('user');
};
