// LoginViewModel.js
import { useState } from 'react';
import { LoginService } from '../services/LoginServicee'; // Ajusta la ruta según tu estructura

const useLoginViewModel = (navigation) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null); // Reinicia el error antes de la llamada

    try {
      const result = await LoginService(email, password);
      console.log('Login exitoso:', result);

      // Navegar a la pantalla AppTabs después de un inicio de sesión exitoso
      navigation.navigate('AppTabs');
    } catch (err) {
      setError('Error en el inicio de sesión. Verifica tus credenciales.');
      console.error('Error en login:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, handleLogin, isLoading, error };
};

export default useLoginViewModel;
