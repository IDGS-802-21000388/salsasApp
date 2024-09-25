import { useState } from 'react';

export default function useLoginViewModel() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    setIsLoading(true);
    setError(null);

    const validEmail = 'jorge';
    const validPassword = 'jorge1234';

    if (email === validEmail && password === validPassword) {
      alert('Login successful');
    } else {
      setError('Invalid credentials');
    }
    setIsLoading(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin,
  };
}
