import AsyncStorage from '@react-native-async-storage/async-storage';
//import { API_BASE_URL } from '../env';

//const API_URL = `${API_BASE_URL}/Login/login`;
const API_URL = `http://10.16.15.98:7215/api/Login/login`;
//const API_URL = `http://192.168.1.10:7215/api/Login/login`;

export const LoginService = async (email, password) => {
    try {
        const response = await fetch(API_URL, {
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
        await AsyncStorage.setItem('user', JSON.stringify(data));

        return data;
    } catch (error) {
        console.error('Error en login (catch):', error.message);
        throw error;
    }
};

export const logout = async () => {
  await AsyncStorage.removeItem('user');
};
