import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerTodasCotizaciones, obtenerCotizacionesPorUsuario, cerrarCotizacion } from '../services/CotizacionService';

const CotizacionesScreen = () => {
  const [cotizacionesAbiertas, setCotizacionesAbiertas] = useState([]);
  const [cotizacionesCerradas, setCotizacionesCerradas] = useState([]);
  const [detallesVisibles, setDetallesVisibles] = useState({});

  const fetchCotizaciones = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const parsedUser = JSON.parse(user);
      const { rol, idUsuario } = parsedUser.user;

      let cotizaciones;
      if (rol === 'admin') {
        cotizaciones = await obtenerTodasCotizaciones();
      } else {
        cotizaciones = await obtenerCotizacionesPorUsuario(idUsuario);
      }

      const agrupadas = agruparCotizaciones(cotizaciones);

      const abiertas = agrupadas.filter(cot => cot.atendida === 0);
      const cerradas = agrupadas.filter(cot => cot.atendida === 1);

      setCotizacionesAbiertas(abiertas);
      setCotizacionesCerradas(cerradas);
    } catch (error) {
      console.error('Error al obtener cotizaciones:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCotizaciones();
    }, [])
  );

  const agruparCotizaciones = (cotizaciones) => {
    const agrupadas = {};

    cotizaciones.forEach(cot => {
      if (!agrupadas[cot.idCotizacion]) {
        agrupadas[cot.idCotizacion] = {
          ...cot,
          detalles: [],
        };
      }
      agrupadas[cot.idCotizacion].detalles.push({
        descripcion: cot.descripcion,
        cantidad: cot.cantidad,
        precioUnitario: cot.precioUnitario,
        totalDetalle: cot.totalDetalle,
      });
    });

    return Object.values(agrupadas);
  };

  const toggleDetalles = (idCotizacion) => {
    setDetallesVisibles(prevState => ({
      ...prevState,
      [idCotizacion]: !prevState[idCotizacion],
    }));
  };

  const handleCerrarCotizacion = async (idCotizacion) => {
    try {
      await cerrarCotizacion(idCotizacion);
      alert('Cotización cerrada correctamente');
      fetchCotizaciones();
    } catch (error) {
      console.error('Error al cerrar la cotización:', error);
    }
  };

  const renderCotizacion = (cotizacion) => (
    <View key={cotizacion.idCotizacion} style={styles.card}>
      <Text style={styles.cardTitle}>Cotización #{cotizacion.idCotizacion}</Text>
      <Text style={styles.cardText}>Email Cliente: {cotizacion.emailCliente}</Text>
      <Text style={styles.cardText}>Fecha Creación: {new Date(cotizacion.fechaCreacion).toLocaleDateString()}</Text>
      <Text style={styles.cardText}>Subtotal: ${cotizacion.subtotal.toFixed(2)}</Text>
      <Text style={styles.cardText}>IVA: ${cotizacion.iva.toFixed(2)}</Text>
      <Text style={styles.cardText}>Total Cotización: ${cotizacion.totalCotizacion.toFixed(2)}</Text>
      <Button title="Ver Detalles" onPress={() => toggleDetalles(cotizacion.idCotizacion)} />
      {detallesVisibles[cotizacion.idCotizacion] && (
        <View style={styles.detalles}>
          {cotizacion.detalles.map((detalle, index) => (
            <View key={index} style={styles.detalleItem}>
              <Text style={styles.detalleText}>Descripción: {detalle.descripcion}</Text>
              <Text style={styles.detalleText}>Cantidad: {detalle.cantidad}</Text>
              <Text style={styles.detalleText}>Precio Unitario: ${detalle.precioUnitario.toFixed(2)}</Text>
              <Text style={styles.detalleText}>Total Detalle: ${detalle.totalDetalle.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      )}
      {cotizacion.atendida === 0 && (
        <Button title="Cerrar Cotización" onPress={() => handleCerrarCotizacion(cotizacion.idCotizacion)} />
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cotizaciones Abiertas</Text>
        {cotizacionesAbiertas.map(renderCotizacion)}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cotizaciones Cerradas</Text>
        {cotizacionesCerradas.map(renderCotizacion)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f5f2',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#217765',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#217765',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  detalles: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  detalleItem: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detalleText: {
    fontSize: 14,
    color: '#555',
  },
});

export default CotizacionesScreen;