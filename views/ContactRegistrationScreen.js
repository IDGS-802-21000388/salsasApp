import React, { useEffect, useState } from 'react';
import { Box, Text, Center, ScrollView, VStack, Input, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
import TypePromoService from '../services/TypePromoService';

const ContactRegistrationScreen = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateQuery, setDateQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await TypePromoService.getContactClient();
        setUsers(usersData);
        setFilteredUsers(usersData); // Show all users initially
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const filterUsers = () => {
      let filtered = users;

      if (searchQuery.trim() !== '') {
        filtered = filtered.filter(user =>
          user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (dateQuery.trim() !== '') {
        filtered = filtered.filter(user =>
          formatDate(user.fechaCreacion).includes(dateQuery)
        );
      }

      setFilteredUsers(filtered);
    };

    filterUsers();
  }, [searchQuery, dateQuery, users]);

  const handleSelectUser = async (email) => {
    try {
      const userData = await TypePromoService.getContactClientByEmail(email);
      setSelectedUser(email);
      setUserDetails(userData[0]); // Assuming the API returns an array with one object
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <ScrollView flex={1} p={4} backgroundColor="#f7f5f2">
      <Center>
        <Text fontSize="2xl" color="#217765" mb={4}>
          REGISTRO DE CONTACTO
        </Text>
        <Box w="100%" mb={4}>
          <Input
            placeholder="Buscar usuario..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            borderColor="#217765"
            borderWidth={1}
            borderRadius={8}
            backgroundColor="#fff"
            mb={4}
          />
          <Input
            placeholder="Buscar por fecha (dd/mm/aaaa)..."
            value={dateQuery}
            onChangeText={setDateQuery}
            borderColor="#217765"
            borderWidth={1}
            borderRadius={8}
            backgroundColor="#fff"
          />
        </Box>
        <Box w="100%" h="300px" borderWidth={1} borderColor="#217765" borderRadius={8} overflow="hidden" mb={4}>
          <ScrollView nestedScrollEnabled>
            <VStack space={4} w="100%" p={4}>
              {filteredUsers.map((user) => (
                <TouchableOpacity key={user.id} onPress={() => handleSelectUser(user.email)}>
                  <Box
                    p={4}
                    borderRadius={8}
                    borderColor={selectedUser === user.email ? "red.500" : "#217765"}
                    borderWidth={1}
                    backgroundColor="#fff"
                    shadow={2}
                  >
                    <Text fontSize="lg" fontWeight="bold" color="#217765">
                      {user.email}
                    </Text>
                    <Text color="#217765">Mensaje: {user.mensaje}</Text>
                    <Text color="#217765">Fecha de Creación: {new Date(user.fechaCreacion).toLocaleDateString()}</Text>
                  </Box>
                </TouchableOpacity>
              ))}
            </VStack>
          </ScrollView>
        </Box>
        {userDetails && (
          <Box w="100%" borderWidth={1} borderColor="#217765" borderRadius={8} p={4} mb={4}>
            <Text fontSize="lg" fontWeight="bold" color="#217765" mb={2}>
              Detalles del Usuario
            </Text>
            <Text color="#217765">Email: {userDetails.email}</Text>
            <Text color="#217765">Mensaje: {userDetails.mensaje}</Text>
            <Text color="#217765">Fecha de Creación: {new Date(userDetails.fechaCreacion).toLocaleDateString()}</Text>
          </Box>
        )}
      </Center>
    </ScrollView>
  );
};

export default ContactRegistrationScreen;


