// screens/QuejasScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, Button, TextInput, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import useQuejasViewModel from '../viewmodels/QuejasViewModel';

const QuejasScreen = () => {
  const { quejas, loading, error, responderQueja } = useQuejasViewModel();
  const [respuesta, setRespuesta] = useState('');
  const [selectedQuejaId, setSelectedQuejaId] = useState(null);

  const handleResponder = (id) => {
    if (!respuesta) {
      Alert.alert('Error', 'La respuesta no puede estar vacía.');
      return;
    }
    responderQueja(id, respuesta);
    setRespuesta('');
    setSelectedQuejaId(null);
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={quejas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.quejaContainer}>
            <Text style={styles.quejaContent}>{item.contenido}</Text>
            <Text style={styles.quejaEstado}>Estado: {item.estado}</Text>
            {item.respuesta && (
              <View>
                <Text style={styles.quejaRespuesta}>Respuesta: {item.respuesta}</Text>
                <Text style={styles.fechaRespuesta}>Fecha de Respuesta: {item.fechaRespuesta}</Text>
              </View>
            )}
            {item.respuesta ? (
              <Button title="Enviar otra respuesta" onPress={() => setSelectedQuejaId(item.id)} />
            ) : (
              <Button title="Responder" onPress={() => setSelectedQuejaId(item.id)} />
            )}
          </View>
        )}
      />
      {selectedQuejaId && (
        <View style={styles.respuestaContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Escribe tu respuesta..."
            value={respuesta}
            onChangeText={setRespuesta}
          />
          <Button title="Enviar Respuesta" onPress={() => handleResponder(selectedQuejaId)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f8',
  },
  quejaContainer: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  quejaContent: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  quejaEstado: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  quejaRespuesta: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  fechaRespuesta: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  respuestaContainer: {
    flexDirection: 'column',
    padding: 16,
    backgroundColor: '#e6f7ff',
    borderRadius: 8,
  },
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
});

export default QuejasScreen;
