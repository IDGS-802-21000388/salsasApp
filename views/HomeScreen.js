import React from 'react';
import { Box, Text, Center } from 'native-base';

const HomeScreen = () => {
  return (
    <Box flex={1} p={4} backgroundColor="#f7f5f2">
      <Center>
        <Text fontSize="2xl" color="#217765">
          Bienvenido al Inicio
        </Text>
        <Text fontSize="lg" mt={4} color="#c31a23">
          Aquí puedes navegar entre los módulos de la aplicación.
        </Text>
      </Center>
    </Box>
  );
};

export default HomeScreen;
