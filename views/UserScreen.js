import { useEffect, useState } from 'react';
import { Box, Input, Button, Text, VStack, FormControl, Center, ScrollView } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
import mexicoStates from '../assets/mexico-states.json';
import useUserViewModel from '../viewmodels/UserViewModel';

const UserScreen = () => {
  const {
    nombre,
    setNombre,
    nombreUsuario,
    setNombreUsuario,
    correo,
    setCorreo,
    contrasenia,
    setContrasenia,
    telefono,
    setTelefono,
    rol,
    setRol,
    estado,
    setEstado,
    municipio,
    setMunicipio,
    codigoPostal,
    setCodigoPostal,
    colonia,
    setColonia,
    calle,
    setCalle,
    numExt,
    setNumExt,
    numInt,
    setNumInt,
    referencia,
    setReferencia,
    handleCreateUser,
    isLoading,
  } = useUserViewModel();

  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    if (estado) {
      setMunicipios(mexicoStates[estado]);
    }
  }, [estado]);

  return (
    <ScrollView flex={1} px="3">
      <Center>
        <Box
          safeArea
          p="4"
          py="8"
          w="95%"
          maxW="400"
          bg="#f7f5f2"
          borderRadius={12}
          shadow={2}
          mt={5}
        >
          <Box
            bg="#217765"
            p={4}
            borderRadius={12}
            alignItems="center"
            mb={5}
          >
            <Text fontSize="3xl" fontWeight="bold" color="#f7f5f2">
              Registrar Usuario
            </Text>
          </Box>

          <VStack space={5} mt="3">
            <FormControl isRequired>
              <FormControl.Label>
                <MaterialIcons name="person" size={20} color="#217765" /> Nombre
              </FormControl.Label>
              <Input
                value={nombre}
                onChangeText={(text) => setNombre(text)}
                placeholder="Nombre completo"
                maxLength={50}
                borderColor="#217765"
                borderRadius={8}
                _focus={{ borderColor: '#c31a23' }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label>
                <MaterialIcons name="person-outline" size={20} color="#217765" /> Nombre de Usuario
              </FormControl.Label>
              <Input
                value={nombreUsuario}
                onChangeText={(text) => setNombreUsuario(text.trim())}
                placeholder="Nombre de usuario"
                maxLength={15}
                borderColor="#217765"
                borderRadius={8}
                _focus={{ borderColor: '#c31a23' }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label>
                <MaterialIcons name="email" size={20} color="#217765" /> Correo
              </FormControl.Label>
              <Input
                value={correo}
                onChangeText={(text) => setCorreo(text.trim())}
                placeholder="Correo electrónico"
                maxLength={50}
                keyboardType="email-address"
                borderColor="#217765"
                borderRadius={8}
                _focus={{ borderColor: '#c31a23' }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label>
                <MaterialIcons name="lock" size={20} color="#217765" /> Contraseña
              </FormControl.Label>
              <Input
                value={contrasenia}
                onChangeText={(text) => setContrasenia(text.trim())}
                placeholder="Contraseña"
                maxLength={20}
                secureTextEntry
                borderColor="#217765"
                borderRadius={8}
                _focus={{ borderColor: '#c31a23' }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label>
                <MaterialIcons name="phone" size={20} color="#217765" /> Teléfono
              </FormControl.Label>
              <Input
                value={telefono}
                onChangeText={(text) => setTelefono(text.trim())}
                placeholder="Teléfono"
                maxLength={10}
                keyboardType="phone-pad"
                borderColor="#217765"
                borderRadius={8}
                _focus={{ borderColor: '#c31a23' }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label>Rol</FormControl.Label>
              <RNPickerSelect
                onValueChange={(value) => setRol(value)}
                items={[
                  { label: 'Administrador', value: 'admin' },
                  { label: 'Cliente', value: 'cliente' },
                  { label: 'Hotel', value: 'hotel' },
                  { label: 'Restaurante', value: 'restaurante' },
                  { label: 'Empleado', value: 'empleado' },
                  { label: 'Repartidor', value: 'repartidor' },
                ]}
                placeholder={{ label: 'Seleccione un rol', value: null }}
              />
            </FormControl>

            <Text fontSize="xl" fontWeight="bold" color="#217765" mt="5">
              Dirección
            </Text>

            <FormControl isRequired>
              <FormControl.Label>Estado</FormControl.Label>
              <RNPickerSelect
                onValueChange={(value) => setEstado(value)}
                items={Object.keys(mexicoStates).map((state) => ({
                  label: state,
                  value: state,
                }))}
                placeholder={{ label: 'Seleccione un estado', value: null }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label>Municipio</FormControl.Label>
              <RNPickerSelect
                onValueChange={(value) => setMunicipio(value)}
                items={municipios.map((municipio) => ({
                  label: municipio,
                  value: municipio,
                }))}
                placeholder={{ label: 'Seleccione un municipio', value: null }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label>Código Postal</FormControl.Label>
              <Input
                value={codigoPostal}
                onChangeText={(text) => setCodigoPostal(text.trim())}
                placeholder="Código Postal"
                maxLength={5}
                keyboardType="numeric"
                borderColor="#217765"
                borderRadius={8}
                _focus={{ borderColor: '#c31a23' }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label>Colonia</FormControl.Label>
              <Input
                value={colonia}
                onChangeText={(text) => setColonia(text)}
                placeholder="Colonia"
                maxLength={50}
                borderColor="#217765"
                borderRadius={8}
                _focus={{ borderColor: '#c31a23' }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label>Calle</FormControl.Label>
              <Input
                value={calle}
                onChangeText={(text) => setCalle(text)}
                placeholder="Calle"
                maxLength={50}
                borderColor="#217765"
                borderRadius={8}
                _focus={{ borderColor: '#c31a23' }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label>Número Exterior</FormControl.Label>
              <Input
                value={numExt}
                onChangeText={(text) => setNumExt(text.trim())}
                placeholder="Número Exterior"
                maxLength={10}
                keyboardType="numeric"
                borderColor="#217765"
                borderRadius={8}
                _focus={{ borderColor: '#c31a23' }}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Número Interior</FormControl.Label>
              <Input
                value={numInt}
                onChangeText={(text) => setNumInt(text.trim())}
                placeholder="Número Interior (Opcional)"
                maxLength={10}
                borderColor="#217765"
                borderRadius={8}
                _focus={{ borderColor: '#c31a23' }}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Referencia</FormControl.Label>
              <Input
                value={referencia}
                onChangeText={(text) => setReferencia(text)}
                placeholder="Referencia (Opcional)"
                maxLength={50}
                borderColor="#217765"
                borderRadius={8}
                _focus={{ borderColor: '#c31a23' }}
              />
            </FormControl>

            <Button
              mt="5"
              onPress={handleCreateUser}
              isLoading={isLoading}
              backgroundColor="#217765"
              _pressed={{ bg: '#e4007c' }}
              borderRadius={8}
              _text={{ color: "#f7f5f2", fontWeight: "bold" }}
            >
              Crear Usuario
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default UserScreen;
