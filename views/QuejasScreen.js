import React, { useState } from 'react';
import { View, Text, FlatList, Button, TextInput, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import useQuejasViewModel from '../viewmodels/QuejasViewModel';

const QuejasScreen = () => {
  const { quejas, loading, error, responderQueja } = useQuejasViewModel();
  const [respuesta, setRespuesta] = useState('');
  const [expandedQuejaId, setExpandedQuejaId] = useState(null);
  const [showUnresolved, setShowUnresolved] = useState(false);
  const [showResolved, setShowResolved] = useState(false);

  const unresolvedQuejas = quejas.filter((queja) => queja.estado !== 'Resuelta');
  const resolvedQuejas = quejas
    .filter((queja) => queja.estado === 'Resuelta')
    .sort((a, b) => new Date(b.fechaRespuesta) - new Date(a.fechaRespuesta));

  // Función para validar caracteres permitidos en la respuesta
  const isRespuestaValida = (text) => {
    const regex = /^[a-zA-Z0-9\s.,!?'-]*$/; // Permitir letras, números y algunos caracteres especiales
    return regex.test(text);
  };

  const handleResponder = (id) => {
    if (!respuesta) {
      Alert.alert('Error', 'La respuesta no puede estar vacía.');
      return;
    }
    if (!isRespuestaValida(respuesta)) {
      Alert.alert('Error', 'La respuesta contiene caracteres no permitidos.');
      return;
    }
    responderQueja(id, respuesta);
    setRespuesta('');
    setExpandedQuejaId(null);
  };

  const toggleExpand = (id) => {
    setExpandedQuejaId((prevId) => (prevId === id ? null : id));
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Quejas Nuevas: {unresolvedQuejas.length} | Quejas Atendidas: {resolvedQuejas.length}</Text>

      {/* Sección de Quejas Sin Resolver */}
      <TouchableOpacity onPress={() => setShowUnresolved(!showUnresolved)} style={styles.sectionHeader2}>
        <Text style={styles.sectionTitle}>Quejas Sin Atender</Text>
        <Text style={styles.expandButton}>{showUnresolved ? 'Contraer' : 'Expandir'}</Text>
      </TouchableOpacity>
      {showUnresolved && (
        unresolvedQuejas.length > 0 ? (
          <FlatList
            data={unresolvedQuejas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.unresolvedQuejaContainer}>
                <Text style={styles.quejaContent}>{item.contenido}</Text>
                <Text style={styles.quejaUser}>Usuario: {item.usuarioNombre}</Text>
                <Text style={styles.quejaEstado}>Estado: {item.estado}</Text>
                <Text style={styles.fechaRespuesta}>Fecha en que se realizó la queja: {item.fechaCreacion}</Text>

                {expandedQuejaId === item.id && (
                  <View style={styles.expandedSection}>
                    <Text style={styles.quejaEmail}>Correo del usuario: {item.usuarioCorreo}</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Escribe tu respuesta..."
                      value={respuesta}
                      onChangeText={setRespuesta}
                    />
                    <Button title="Enviar Respuesta" onPress={() => handleResponder(item.id)} />
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.noQuejasText}>No hay quejas nuevas.</Text>
        )
      )}

      {/* Sección de Quejas Resueltas */}
      <TouchableOpacity onPress={() => setShowResolved(!showResolved)} style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quejas Atendidas</Text>
        <Text style={styles.expandButton}>{showResolved ? 'Contraer' : 'Expandir'}</Text>
      </TouchableOpacity>
      {showResolved && (
        <FlatList
          data={resolvedQuejas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.resolvedQuejaContainer}>
              <Text style={styles.quejaContent}>{item.contenido}</Text>
              <Text style={styles.quejaUser}>Usuario: {item.usuarioNombre}</Text>
              <Text style={styles.quejaEstado}>Estado: {item.estado}</Text>
              <Text style={styles.fechaRespuesta}>Fecha en que se realizó la queja: {item.fechaCreacion}</Text>

              {expandedQuejaId === item.id && (
                <View style={styles.expandedSection}>
                  <Text style={styles.quejaEmail}>Correo: {item.usuarioCorreo}</Text>
                  <Text style={styles.quejaRespuesta}>Respuesta: {item.respuesta}</Text>
                  <Text style={styles.fechaRespuesta}>Fecha de Respuesta: {item.fechaRespuesta}</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Escribe otra respuesta..."
                    value={respuesta}
                    onChangeText={setRespuesta}
                  />
                  <Button title="Enviar Otra Respuesta" onPress={() => handleResponder(item.id)} />
                </View>
              )}
            </TouchableOpacity>
          )}
        />
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
  counterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff4d4f',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 8,
    marginVertical: 8,
  },
  sectionHeader2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: 'white', 
    backgroundColor: 'red',
    borderRadius: 8,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  expandButton: {
    fontSize: 14,
    color: 'white',
  },
  unresolvedQuejaContainer: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#ffbfaf',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  resolvedQuejaContainer: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#d4edda',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  expandedSection: {
    marginTop: 10,
    backgroundColor: '#e6f7ff',
    padding: 10,
    borderRadius: 8,
  },
  quejaUser: {
    fontSize: 14,
    color: '#333',
  },
  quejaContent: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  quejaEstado: {
    fontSize: 14,
    color: '#777',
  },
  quejaEmail: {
    fontSize: 12,
    color: '#555',
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
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  noQuejasText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default QuejasScreen;