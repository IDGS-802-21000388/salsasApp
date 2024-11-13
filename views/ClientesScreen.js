import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { getUsers } from "../services/UsuarioService";
import { getSaleDetailById } from "../services/DetalleVentaService";
import { getProducts } from "../services/ProductService";
import { getEncuestasByUserId } from "../services/EncuestaSatisfacionService";
import { API_SERVICE_EMAIL } from '@env';

function ClientesScreen() {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [products, setProducts] = useState([]);
  const [encuestas, setEncuestas] = useState([]);
  const [detailsViewed, setDetailsViewed] = useState({});

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuariosData = await getUsers();
        setUsuarios(usuariosData);
        setFilteredUsuarios(usuariosData);
      } catch (error) {
        console.error("Error al cargar usuarios", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleSearch = (text) => {
    const filteredText = text.replace(/[^a-zA-Z\s]/g, "");
    setSearchText(filteredText);

    const filteredUsuarios = usuarios.filter((usuario) => 
      usuario.nombre.toLowerCase().includes(filteredText.toLowerCase()) ||
      usuario.correo.toLowerCase().includes(filteredText.toLowerCase()) ||
      usuario.rol.toLowerCase().includes(filteredText.toLowerCase())
    );

    setFilteredUsuarios(filteredUsuarios);
  };

  const handleViewDetails = async (idVenta, idUsuario) => {
    setLoadingDetails(true);
    try {
      const ventaDetails = await getSaleDetailById(idVenta);
      setSelectedVenta(ventaDetails);
      const allProducts = await getProducts();
      const purchasedProducts = allProducts.filter(
        (product) => ventaDetails.idProducto === product.idProducto
      );
      setProducts(purchasedProducts);
      
      setDetailsViewed((prev) => ({ ...prev, [idUsuario]: true }));
    } catch (error) {
      console.error("Error al cargar detalles de venta", error);
    } finally {
      setLoadingDetails(false);
      setDetailModalVisible(true);
    }
  };

  const handleSendEmail = async (email, userId) => {
    
    if (!selectedVenta || products.length === 0) {
      console.error("No hay datos disponibles para la compra.");
      return;
    }
  
    try {
      const encuestasData = await getEncuestasByUserId(userId);
      setEncuestas(encuestasData);  
      const lastEncuesta = getLastEncuesta(encuestasData);      
      const compra = {
        cantidad: selectedVenta.cantidad,
        total: selectedVenta.subtotal,
        productos: products.map(product => ({
          nombreProducto: product.nombreProducto,
          fotografia: product.fotografia
        })),
        encuesta: lastEncuesta
      };
  
      await sendEmail(email, compra);
    } catch (error) {
      console.error("Error al obtener encuestas", error);
      Alert.alert("Error", "No se pudo obtener las encuestas del cliente.");
    }
  };
  
  const getLastEncuesta = (encuestas) => {
    if (!encuestas || encuestas.length === 0) return null;
  
    encuestas.sort((a, b) => new Date(b.fechaEncuesta) - new Date(a.fechaEncuesta));
  
    return encuestas[0];
  };
  
  const sendEmail = async (email, compra) => {
    if (!email) {
      Alert.alert("Error", "No se proporcionó un correo electrónico.");
      return;
    }

    if (!compra || !compra.cantidad || !compra.total || !compra.productos) {
      Alert.alert("Error", "Información de la compra incompleta.");
      return;
    }

    const templateParams = {
      email,
      cantidad: compra.cantidad,
      total: compra.total,
      productos: compra.productos,
      procesoCompra: compra.encuesta.procesoCompra,
      saborProducto: compra.encuesta.saborProducto,
      recomendacion: compra.encuesta.recomendacion,
      entregaProducto: compra.encuesta.entregaProducto,
      presentacionProducto: compra.encuesta.presentacionProducto,
      facilidadUsoPagina: compra.encuesta.facilidadUsoPagina,
    };

    try {
      const response = await fetch(`${API_SERVICE_EMAIL}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(templateParams),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el correo");
      }

      Alert.alert("Correo enviado", "El correo se ha enviado correctamente.");
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al enviar el correo.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lista de Clientes</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre, correo o rol"
        value={searchText}
        onChangeText={handleSearch}
      />

      {filteredUsuarios.map((usuario, index) => (
        <View key={index} style={styles.clientCard}>
          <Text style={styles.clientName}>Nombre: {usuario?.nombre || "No encontrado"}</Text>
          <Text>Correo: {usuario?.correo || "No encontrado"}</Text>
          <Text>Rol: {usuario?.rol || "No encontrado"}</Text>
          {detailsViewed[usuario.idUsuario] && (
            <TouchableOpacity
              onPress={() => handleSendEmail(usuario?.correo, usuario.idUsuario)}
              style={styles.emailButton}
            >
              <Text style={styles.emailText}>📧 Enviar Email</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => handleViewDetails(usuario.idUsuario, usuario.idUsuario)}
            style={styles.detailButton}
          >
            <Text style={styles.detailText}>👁️ Ver Detalles</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Modal isVisible={isDetailModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Detalles de la Venta:</Text>
          {loadingDetails ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : selectedVenta ? (
            <View>
              <Text>Cantidad: {selectedVenta.cantidad}</Text>
              <Text>Total: {selectedVenta.subtotal}</Text>

              {products.length > 0 && (
                <View>
                  <Text>Productos:</Text>
                  {products.map((product, index) => (
                    <View key={index}>
                      <Text>{product.nombreProducto}</Text>
                      {product.fotografia ? (
                        <Image
                          source={{ uri: product.fotografia }}
                          style={styles.productImage}
                        />
                      ) : (
                        <Text>No hay imagen disponible.</Text>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <Text>No se encontraron detalles.</Text>
          )}
          <TouchableOpacity onPress={() => setDetailModalVisible(false)}>
            <Text style={styles.closeModal}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  clientCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  clientName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emailButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
  },
  emailText: {
    color: "#fff",
    fontWeight: "bold",
  },
  detailButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
  },
  detailText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  closeModal: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
});

export default ClientesScreen;
