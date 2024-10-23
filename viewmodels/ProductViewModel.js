import { useState, useEffect } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { getProducts } from '../services/ProductService';
import Product from '../models/ProductModel';

export default function useProductViewModel() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      const productList = data.map(item => new Product(item.idProducto, item.nombreProducto, item.precioVenta, item.fotografia));
      setProducts(productList);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Error al obtener productos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    const productInCart = cart.find(item => item.idProducto === product.idProducto);
    if (productInCart) {
      toast.show('Este producto ya está en el carrito.', {
        type: 'warning',
        text1: 'Producto Duplicado',
        text2: 'Ya has agregado este producto al carrito.',
        duration: 2000,
      });
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      setQuantities({ ...quantities, [product.idProducto]: 1 });
      toast.show('Producto agregado al carrito.', {
        type: 'success',
        text1: 'Producto Agregado',
        text2: 'El producto fue agregado al carrito exitosamente.',
        duration: 2000,
      });
    }
  };

  const handleRemoveFromCart = (idProducto) => {
    const newCart = cart.filter(item => item.idProducto !== idProducto);
    setCart(newCart);
    const newQuantities = { ...quantities };
    delete newQuantities[idProducto];
    setQuantities(newQuantities);

    toast.show('Producto eliminado del carrito.', {
      type: 'success',
      text1: 'Producto Eliminado',
      text2: 'El producto fue eliminado del carrito.',
      duration: 2000,
    });
  };

  const handleQuantityChange = (idProducto, value) => {
    const quantity = parseInt(value) || 1;
    setQuantities({ ...quantities, [idProducto]: quantity });
    setCart(cart.map(item => item.idProducto === idProducto ? { ...item, quantity } : item));
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.precioVenta * item.quantity, 0);
  };

  const calculateIVA = (subtotal) => {
    return subtotal * 0.16;
  };

  return {
    products,
    cart,
    quantities,
    loading,
    error,
    handleAddToCart,
    handleRemoveFromCart,
    handleQuantityChange,
    calculateSubtotal,
    calculateIVA,
  };
}
