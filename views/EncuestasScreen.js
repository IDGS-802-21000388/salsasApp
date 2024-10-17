import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Linking,
  ScrollView,
} from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Modal from "react-native-modal";
import { getUsers } from "../services/UsuarioService";
import { getEncuestas } from "../services/EncuestaSatisfacionService";
import { getSaleDetailById } from "../services/DetalleVentaService";
import { getProducts } from "../services/ProductService";

const screenWidth = Dimensions.get("window").width;

function EncuestasScreen() {
  const data = [];
  const [encuestas, setEncuestas] = useState([]);
  const [filteredEncuestas, setFilteredEncuestas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const [topClients, setTopClients] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchEncuestas = async () => {
      try {
        setLoading(true);
        const encuestasData = await getEncuestas();
        setEncuestas(encuestasData);
        setFilteredEncuestas(encuestasData);
      } catch (error) {
        setError("Error al cargar las encuestas");
      } finally {
        setLoading(false);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const usuariosData = await getUsers();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Error al cargar usuarios", error);
      }
    };

    fetchEncuestas();
    fetchUsuarios();

    const interval = setInterval(() => {
      fetchEncuestas();
    }, 100000);

    return () => clearInterval(interval);
  }, []);

  const applyFilter = (type) => {
    let filteredData = encuestas;
    if (type === "day") {
      const today = new Date().toISOString().split("T")[0];
      filteredData = encuestas.filter(
        (encuesta) => encuesta.fechaEncuesta.split("T")[0] === today
      );
    } else if (type === "month") {
      const currentMonth = new Date().toISOString().split("-")[1];
      filteredData = encuestas.filter(
        (encuesta) => encuesta.fechaEncuesta.split("-")[1] === currentMonth
      );
    }
    setFilteredEncuestas(filteredData);
  };

  const handleShowTopClients = () => {
    const userCount = {};
    encuestas.forEach((encuesta) => {
      userCount[encuesta.idUsuario] = (userCount[encuesta.idUsuario] || 0) + 1;
    });
    const sortedUsers = Object.entries(userCount).sort((a, b) => b[1] - a[1]);
    setTopClients(sortedUsers.slice(0, 5));
    setModalVisible(true);
  };

  const handleViewDetails = async (idVenta) => {
    setLoadingDetails(true);
    try {
      const ventaDetails = await getSaleDetailById(idVenta);
      setSelectedVenta(ventaDetails);
      const allProducts = await getProducts();
      const purchasedProducts = allProducts.filter(
        (product) => ventaDetails.idProducto === product.idProducto
      );
      setProducts(purchasedProducts);
    } catch (error) {
      console.error("Error al cargar detalles de venta", error);
    } finally {
      setLoadingDetails(false);
      setDetailModalVisible(true);
    }
  };

  const sendEmail = async (email) => {
    if (!selectedVenta || products.length === 0) {
      console.error("No hay detalles de venta o productos disponibles para enviar.");
      return;
    }
  
    const subject = "Detalles de tu compra y encuesta de satisfacción";
    let body = "<p>Gracias por tu compra. Aquí tienes los detalles de tu venta:</p>";
  
    body += `<p><strong>Cantidad:</strong> ${selectedVenta.cantidad}</p>`;
    body += `<p><strong>Total:</strong> ${selectedVenta.subtotal}</p>`;
    
    body += "<p><strong>Productos:</strong></p><ul>";
    products.forEach((product) => {
      body += `<li>${product.nombreProducto}`;
      if (product.fotografia) {
        body += `<br/><img src="${product.fotografia}" width="100"/>`;
      } else {
        body += "<br/>No hay imagen disponible.";
      }
      body += `</li>`;
    });
    body += "</ul>";
  
    body += "<p>Puedes visitar nuestra página en el siguiente enlace:</p>";
    body += '<p><a href="https://www.tupagina.com">Visitar nuestra página</a></p>';
  
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': 're_hweJYdWb_FSohTFiABsi6aw8HdXcL8Rye', // Reemplaza con tu token real
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: "Acme <onboarding@resend.dev>",
          to: [email],
          subject: subject,
          html: body
        })
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Correo enviado exitosamente:", result);
      } else {
        console.log("Error al enviar el correo:", response.status, await response.text());
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };
  

  const chartData = {
    labels: ["Proceso", "Sabor", "Entrega", "Pres", "Faci"],
    datasets: [
      {
        data: [
          filteredEncuestas.reduce((acc, encuesta) => acc + encuesta.procesoCompra, -9),
          filteredEncuestas.reduce((acc, encuesta) => acc + encuesta.saborProducto, 0),
          filteredEncuestas.reduce((acc, encuesta) => acc + encuesta.entregaProducto, 0),
          filteredEncuestas.reduce((acc, encuesta) => acc + encuesta.presentacionProducto, 0),
          filteredEncuestas.reduce((acc, encuesta) => acc + encuesta.facilidadUsoPagina, 0),
        ],
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`      },
    ],
  };
  

  const classifySatisfaction = (encuesta) => {
    const ratings = [
      encuesta.procesoCompra,
      encuesta.saborProducto,
      encuesta.entregaProducto,
      encuesta.presentacionProducto,
      encuesta.facilidadUsoPagina,
    ];

    const count = { satisfecha: 0, neutra: 0, insatisfecha: 0 };

    ratings.forEach((rating) => {
      if (rating === 5) count.satisfecha++;
      else if (rating === 3) count.neutra++;
      else if (rating >= 1 && rating <= 2) count.insatisfecha++;
    });

    if (
      count.satisfecha > count.neutra &&
      count.satisfecha > count.insatisfecha
    ) {
      return "Satisfecho";
    } else if (
      count.neutra > count.satisfecha &&
      count.neutra > count.insatisfecha
    ) {
      return "Neutro";
    } else {
      return "Insatisfecho";
    }
  };

  const pieChartData = [
    {
      name: "Satisfechos",
      population: filteredEncuestas.filter(
        (encuesta) => classifySatisfaction(encuesta) === "Satisfecho"
      ).length,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Neutros",
      population: filteredEncuestas.filter(
        (encuesta) => classifySatisfaction(encuesta) === "Neutro"
      ).length,
      color: "rgba(255, 205, 86, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Insatisfechos",
      population: filteredEncuestas.filter(
        (encuesta) => classifySatisfaction(encuesta) === "Insatisfecho"
      ).length,
      color: "rgba(255, 99, 132, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>{error}</Text>;
  if (filteredEncuestas.length === 0)
    return <Text>No hay encuestas disponibles.</Text>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.filters}>
        <TouchableOpacity onPress={() => applyFilter("day")}>
          <Text style={styles.filterButton}>Filtrar por Día</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => applyFilter("month")}>
          <Text style={styles.filterButton}>Filtrar por Mes</Text>
        </TouchableOpacity>
      </View>

      <BarChart
  data={chartData}
  width={screenWidth - 20}
  height={230}
  fromZero={true} // Asegura que el eje Y empiece en 0
  chartConfig={{
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#980900",
    backgroundGradientTo: "#980900",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Color de las barras
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Color de las etiquetas
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "1",
      stroke: "#ffa726",
    },
  }}
  style={{
    marginVertical: 1,
    borderRadius: 10,
    marginRight: 1
  }}
/>

      <PieChart
        data={pieChartData}
        width={screenWidth - 30}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <TouchableOpacity style={styles.button} onPress={handleShowTopClients}>
        <Text style={styles.buttonText}>Ver Clientes que más contestaron</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Clientes más frecuentes:</Text>
          {topClients.map(([idUsuario, count], index) => {
            const usuario = usuarios.find(
              (user) => user.idUsuario === Number(idUsuario)
            );
            return (
              <View key={index} style={styles.clientCard}>
                <Text style={styles.clientName}>
                  Nombre: {usuario?.nombre || "No encontrado"}
                </Text>
                <Text>Correo: {usuario?.correo || "No encontrado"}</Text>
                <Text>Rol: {usuario?.rol || "No encontrado"}</Text>
                <TouchableOpacity
                  onPress={() => sendEmail(usuario?.correo)}
                  style={styles.emailButton}
                >
                  <Text style={styles.emailText}>📧 Enviar Email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleViewDetails(usuario.idUsuario)}
                  style={styles.detailButton}
                >
                  <Text style={styles.detailText}>👁️ Ver Detalles</Text>
                </TouchableOpacity>
              </View>
            );
          })}
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeModal}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

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
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  filterButton: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  clientCard: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  clientName: {
    fontWeight: "bold",
  },
  emailButton: {
    backgroundColor: "#28a745",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  detailButton: {
    backgroundColor: "#ffc107",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  emailText: {
    color: "white",
  },
  detailText: {
    color: "black",
  },
  closeModal: {
    color: "red",
    marginTop: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginTop: 10,
  },
});

export default EncuestasScreen;
