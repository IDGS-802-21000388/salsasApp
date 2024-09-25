import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Box, Input, Button, Text, VStack, Center, HStack, Link, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import useLoginViewModel from '../viewmodels/LoginViewModel';

export default function LoginScreen() {
  const { email, setEmail, password, setPassword, handleLogin, isLoading, error } = useLoginViewModel();

  return (
    <ImageBackground source={require('../assets/images/background-login.jpg')} style={styles.backgroundImage}>
      <Center flex={1} px="3">
        <Box style={styles.loginBox} safeArea p="2" py="8" w="90%" maxW="350" shadow={5}>
          <Text fontSize="2xl" fontWeight="bold" color="white" mb="5" textAlign="center">
            Login
          </Text>
          <VStack space={6} mt="5">
            <Input
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={6} ml="2" color="white" />}
              variant="rounded"
              placeholderTextColor="white"
              fontSize="md"
              color="white"
              _focus={{
                borderColor: 'white',
              }}
            />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={6} ml="2" color="white" />}
              variant="rounded"
              placeholderTextColor="white"
              fontSize="md"
              color="white"
              _focus={{
                borderColor: 'white',
              }}
            />
            {error && <Text color="red.500" textAlign="center">{error}</Text>}
            <Button mt="5" onPress={handleLogin} isLoading={isLoading} borderRadius="full" backgroundColor="#FFFFFF" _text={{ color: "#000000" }}>
              Login
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text fontSize="sm" color="white">Don't have an account? </Text>
              <Link
                _text={{
                  color: '#FFFFFF',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}
                href="#"
              >
                Register
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  loginBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
