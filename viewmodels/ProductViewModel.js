import { useState, useEffect } from 'react';
import { getProducts } from '../services/ProductService';
import Product from '../models/ProductModel';

export default function useProductViewModel() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return {
    products,
    isLoggedIn,
    loading,
    error,
    handleLogin,
  };
}
