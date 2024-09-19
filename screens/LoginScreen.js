import React, { useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { NativeBaseProvider, Box, Input, Button, Text, VStack, Center, HStack, Link, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <NativeBaseProvider>
      <ImageBackground source={require('../assets/images/background-login.jpg')} style={styles.backgroundImage}>
        <Center flex={1} px="3">
          <Box style={styles.loginBox} safeArea p="2" py="8" w="90%" maxW="350">
            <VStack space={3} mt="5">
              <Input
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
                InputLeftElement={
                  <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
                }
              />
              <Input
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                type="password"
                autoCapitalize="none"
                secureTextEntry
                InputLeftElement={
                  <Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="muted.400" />
                }
              />
              <Button mt="5" onPress={handleLogin} colorScheme="primary">
                Login
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text fontSize="sm" color="coolGray.600">
                  Don't have an account?{' '}
                </Text>
                <Link
                  _text={{
                    color: 'primary.500',
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
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  loginBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
  },
});
