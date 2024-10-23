import React, { useEffect, useState } from 'react';
import { Box, Text, Center, ScrollView, VStack, TextArea, Button } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import { getUsers } from '../services/UserService';
import { TouchableOpacity } from 'react-native';
import TypePromoService from '../services/TypePromoService'; 

const TypePromoScreen = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('todos');
  const [emailContent, setEmailContent] = useState('');
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
        setFilteredUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedRole && selectedRole !== 'todos') {
      setFilteredUsers(users.filter(user => user.rol === selectedRole));
    } else {
      setFilteredUsers(users);
    }
  }, [selectedRole, users]);

  const handleSelectUser = (email) => {
    setSelectedEmails((prevSelected) =>
      prevSelected.includes(email)
        ? prevSelected.filter((e) => e !== email)
        : [...prevSelected, email]
    );
  };

  const handleSelectAll = () => {
    setSelectedEmails(filteredUsers.map((user) => user.correo));
  };

  const handleDeselectAll = () => {
    setSelectedEmails([]);
  };

  const handleSendEmail = async () => {
    if (selectedEmails.length === 0) {
      setErrorMessage('Debe seleccionar al menos un correo.');
      return;
    }

    if (emailContent.trim() === '') {
      setErrorMessage('El contenido del correo no puede estar vacío.');
      return;
    }

    setErrorMessage('');

    try {
      const response = await TypePromoService.sendPromotionEmail(selectedEmails, emailContent);

      if (response.status === 200) {
        setErrorMessage('Correo enviado exitosamente.');
      } else {
        setErrorMessage('Hubo un problema al enviar el correo.');
      }
    } catch (error) {
      setErrorMessage('Error al enviar el correo: ' + error.message);
    }
  };

  return (
    <ScrollView flex={1} p={4} backgroundColor="#f7f5f2">
      <Center>
        <Text fontSize="2xl" color="#217765" mb={4}>
          PROMOCIONES POR TIPO
        </Text>
        <Box w="100%" mb={4}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedRole(value)}
            items={[
              { label: 'Todos', value: 'todos' },
              { label: 'Administrador', value: 'admin' },
              { label: 'Cliente', value: 'cliente' },
              { label: 'Hotel', value: 'hotel' },
              { label: 'Restaurante', value: 'restaurante' },
              { label: 'Empleado', value: 'empleado' },
            ]}
            placeholder={{ label: 'Seleccione un rol', value: 'todos' }}
          />
        </Box>
        <Box w="100%" h="300px" borderWidth={1} borderColor="#217765" borderRadius={8} overflow="hidden" mb={4}>
          <ScrollView nestedScrollEnabled>
            <VStack space={4} w="100%" p={4}>
              {filteredUsers.map((user) => (
                <TouchableOpacity key={user.idUsuario} onPress={() => handleSelectUser(user.correo)}>
                  <Box
                    p={4}
                    borderRadius={8}
                    borderColor={selectedEmails.includes(user.correo) ? "red.500" : "#217765"}
                    borderWidth={1}
                    backgroundColor="#fff"
                    shadow={2}
                  >
                    <Text fontSize="lg" fontWeight="bold" color="#217765">
                      {user.nombre}
                    </Text>
                    <Text color="#217765">Correo: {user.correo}</Text>
                    <Text color="#217765">Rol: {user.rol}</Text>
                    <Text color="#217765">Teléfono: {user.telefono}</Text>
                  </Box>
                </TouchableOpacity>
              ))}
            </VStack>
          </ScrollView>
          <Button onPress={handleSelectAll} mt={2} colorScheme="green">
            Seleccionar Todos
          </Button>
          <Button onPress={handleDeselectAll} mt={2} colorScheme="green">
            Deseleccionar Todos
          </Button>
        </Box>
        <Box w="100%" borderWidth={1} borderColor="#217765" borderRadius={8} p={4} mb={4}>
          <Text fontSize="lg" fontWeight="bold" color="#217765" mb={2}>
            Escribir Correo
          </Text>
          <TextArea
            h={150}
            placeholder="Escribe tu correo aquí..."
            value={emailContent}
            onChangeText={(text) => setEmailContent(text)}
            borderColor="#217765"
            borderWidth={1}
            borderRadius={8}
            backgroundColor="#fff"
          />
        </Box>
        {errorMessage ? (
          <Text color="red.500" mb={4}>
            {errorMessage}
          </Text>
        ) : null}
        <Button onPress={handleSendEmail} colorScheme="green" mb={4}>
          Enviar Correo
        </Button>
      </Center>
    </ScrollView>
  );
};

export default TypePromoScreen;