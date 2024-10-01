import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const useLoginViewModel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    if (email === 'jorge@correo.com' && password === '1234') {

      navigation.replace('AppTabs');
    } else {
      setError('Credenciales incorrectas');
    }
    setIsLoading(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    isLoading,
    error,
  };
};

export default useLoginViewModel;
