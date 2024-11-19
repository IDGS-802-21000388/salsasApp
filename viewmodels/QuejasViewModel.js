// viewmodels/QuejasViewModel.js
import { useEffect, useState } from 'react';
import { QuejasService } from '../services/QuejasService';

const useQuejasViewModel = () => {
  const [quejas, setQuejas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuejas = async () => {
      try {
        const data = await QuejasService.obtenerQuejas();
        setQuejas(data);
      } catch (err) {
        setError('Error al cargar las quejas.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuejas();
  }, []);

  const responderQueja = async (id, respuesta) => {
    try {
      await QuejasService.responderQueja(id, respuesta);
      setQuejas((prevQuejas) =>
        prevQuejas.map((queja) =>
          queja.id === id ? { ...queja, estado: 'Resuelta', respuesta } : queja
        )
      );
    } catch (err) {
      console.error("Error responding to complaint:", err); // Mostrar detalles del error
      setError(err.message || 'Error al responder la queja.');
    }
  };

  return {
    quejas,
    loading,
    error,
    responderQueja,
  };
};

export default useQuejasViewModel;
