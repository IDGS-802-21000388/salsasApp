import { useState } from 'react';
import { createUser } from '../services/UserService';
import { useToast } from 'react-native-toast-notifications';

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]{10,}$/;
  return phoneRegex.test(phone);
};

const isValidPostalCode = (code) => {
  return /^[0-9]{5}$/.test(code);
};

const useUserViewModel = () => {
    const toast = useToast();
  const [nombre, setNombre] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rol, setRol] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [estado, setEstado] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [colonia, setColonia] = useState('');
  const [calle, setCalle] = useState('');
  const [numExt, setNumExt] = useState('');
  const [numInt, setNumInt] = useState('');
  const [referencia, setReferencia] = useState('');

  const handleCreateUser = async () => {
    const trimmedCorreo = correo.trim();
    const trimmedContrasenia = contrasenia.trim();
    const trimmedNombre = nombre.trim();
    const trimmedNombreUsuario = nombreUsuario.trim();
    const trimmedTelefono = telefono.trim();
    const trimmedEstado = estado.trim();
    const trimmedMunicipio = municipio.trim();
    const trimmedCodigoPostal = codigoPostal.trim();
    const trimmedColonia = colonia.trim();
    const trimmedCalle = calle.trim();
    const trimmedNumExt = numExt.trim();
    const trimmedNumInt = numInt.trim();
    const trimmedReferencia = referencia.trim();

    if (
      !trimmedNombre ||
      !trimmedNombreUsuario ||
      !trimmedCorreo ||
      !trimmedContrasenia ||
      !trimmedTelefono ||
      !trimmedEstado ||
      !trimmedMunicipio ||
      !trimmedCodigoPostal ||
      !trimmedColonia ||
      !trimmedCalle ||
      !trimmedNumExt ||
      !rol
    ) {
      toast.show('Por favor, completa todos los campos requeridos.', {
        type: 'danger',
        text1: 'Campos Incompletos',
        text2: 'Todos los campos marcados como obligatorios deben ser llenados.',
      });
      return;
    }

    if (!isValidEmail(trimmedCorreo)) {
      toast.show('Correo inválido.', {
        type: 'danger',
        text1: 'Error de Validación',
        text2: 'Por favor, ingresa un correo electrónico válido.',
      });
      return;
    }

    if (!isValidPassword(trimmedContrasenia)) {
      toast.show('Contraseña insegura.', {
        type: 'danger',
        text1: 'Error de Validación',
        text2: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.',
      });
      return;
    }

    if (!isValidPhoneNumber(trimmedTelefono)) {
      toast.show('Teléfono inválido.', {
        type: 'danger',
        text1: 'Error de Validación',
        text2: 'El teléfono debe contener al menos 10 dígitos y solo números.',
      });
      return;
    }

    if (!isValidPostalCode(trimmedCodigoPostal)) {
      toast.show('Código postal inválido.', {
        type: 'danger',
        text1: 'Error de Validación',
        text2: 'El código postal debe tener 5 dígitos numéricos.',
      });
      return;
    }

    setIsLoading(true);

    const userData = {
      nombre: trimmedNombre,
      nombreUsuario: trimmedNombreUsuario,
      correo: trimmedCorreo,
      contrasenia: trimmedContrasenia,
      rol,
      estatus: 1,
      telefono: trimmedTelefono,
      direccion: {
        estado: trimmedEstado,
        municipio: trimmedMunicipio,
        codigoPostal: trimmedCodigoPostal,
        colonia: trimmedColonia,
        calle: trimmedCalle,
        numExt: trimmedNumExt,
        numInt: trimmedNumInt,
        referencia: trimmedReferencia,
      },
      intentos: 0,
    };

    try {
      await createUser(userData);
      toast.show('Usuario creado exitosamente.', {
        type: 'success',
        text1: 'Éxito',
        text2: 'Usuario creado exitosamente.',
      });
    } catch (e) {
      toast.show('No se pudo crear el usuario.', {
        type: 'danger',
        text1: 'Error de Creación',
        text2: 'No se pudo crear el usuario.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    nombre,
    setNombre,
    nombreUsuario,
    setNombreUsuario,
    correo,
    setCorreo,
    contrasenia,
    setContrasenia,
    telefono,
    setTelefono,
    rol,
    setRol,
    estado,
    setEstado,
    municipio,
    setMunicipio,
    codigoPostal,
    setCodigoPostal,
    colonia,
    setColonia,
    calle,
    setCalle,
    numExt,
    setNumExt,
    numInt,
    setNumInt,
    referencia,
    setReferencia,
    handleCreateUser,
    isLoading,
  };
};

export default useUserViewModel;
