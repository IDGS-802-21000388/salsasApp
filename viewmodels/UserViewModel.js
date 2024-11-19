import { useState } from 'react';
import { createUser } from '../services/UserService';
import { useToast } from 'react-native-toast-notifications';

const isValidEmail = (email) => {
  const [localPart, domainPart] = email.split('@');

  if (!localPart || !domainPart) return false;

  const localPartRegex = /^[a-zA-Z0-9._%+-]+$/;
  if (!localPartRegex.test(localPart)) return false;

  const domainPartRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return domainPartRegex.test(domainPart);
};

const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]{10,}$/;
  return phoneRegex.test(phone);
};

const isValidPostalCode = (code) => /^[0-9]{5}$/.test(code);

const hasInvalidCharacters = (text) => {
  const invalidCharRegex = /[^a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ .,/-]/;
  return invalidCharRegex.test(text);
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

  const resetFields = () => {
    setNombre('');
    setNombreUsuario('');
    setCorreo('');
    setContrasenia('');
    setTelefono('');
    setRol('');
    setEstado('');
    setMunicipio('');
    setCodigoPostal('');
    setColonia('');
    setCalle('');
    setNumExt('');
    setNumInt('');
    setReferencia('');
  };

  const handleCreateUser = async () => {
    const cleanedNombre = nombre.trim();
    const cleanedNombreUsuario = nombreUsuario.trim();
    const cleanedCorreo = correo.trim();
    const cleanedContrasenia = contrasenia.trim();
    const cleanedTelefono = telefono.trim();
    const cleanedEstado = estado.trim();
    const cleanedMunicipio = municipio.trim();
    const cleanedCodigoPostal = codigoPostal.trim();
    const cleanedNumExt = numExt.trim();
    const cleanedNumInt = numInt.trim();
    const cleanedCalle = calle.trim();
    const cleanedColonia = colonia.trim();
    const cleanedReferencia = referencia.trim();

    const fieldsToValidate = [
      { name: 'Nombre', value: cleanedNombre },
      { name: 'Nombre de Usuario', value: cleanedNombreUsuario },
      { name: 'Colonia', value: cleanedColonia },
      { name: 'Calle', value: cleanedCalle },
      { name: 'Referencia', value: cleanedReferencia },
    ];

    for (const field of fieldsToValidate) {
      if (hasInvalidCharacters(field.value)) {
        toast.show(`El campo "${field.name}" contiene caracteres no permitidos.`, {
          type: 'danger',
          text1: 'Validación de Seguridad',
          text2: `Por favor, elimina caracteres no válidos como #, comillas o símbolos no permitidos en "${field.name}".`,
        });
        return;
      }
    }

    if (
      !cleanedNombre ||
      !cleanedNombreUsuario ||
      !cleanedCorreo ||
      !cleanedContrasenia ||
      !cleanedTelefono ||
      !cleanedEstado ||
      !cleanedMunicipio ||
      !cleanedCodigoPostal ||
      !cleanedColonia ||
      !cleanedCalle ||
      !cleanedNumExt ||
      !rol
    ) {
      toast.show('Por favor, completa todos los campos requeridos.', {
        type: 'danger',
        text1: 'Campos Incompletos',
        text2: 'Todos los campos marcados como obligatorios deben ser llenados.',
      });
      return;
    }

    if (!isValidEmail(cleanedCorreo)) {
      toast.show('Correo inválido.', {
        type: 'danger',
        text1: 'Error de Validación',
        text2: 'El correo no debe contener acentos en la parte antes del @ y debe ser un formato válido.',
      });
      return;
    }

    if (!isValidPassword(cleanedContrasenia)) {
      toast.show('Contraseña insegura.', {
        type: 'danger',
        text1: 'Error de Validación',
        text2: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.',
      });
      return;
    }

    if (!isValidPhoneNumber(cleanedTelefono)) {
      toast.show('Teléfono inválido.', {
        type: 'danger',
        text1: 'Error de Validación',
        text2: 'El teléfono debe contener al menos 10 dígitos y solo números.',
      });
      return;
    }

    if (!isValidPostalCode(cleanedCodigoPostal)) {
      toast.show('Código postal inválido.', {
        type: 'danger',
        text1: 'Error de Validación',
        text2: 'El código postal debe tener 5 dígitos numéricos.',
      });
      return;
    }

    setIsLoading(true);

    const userData = {
      nombre: cleanedNombre,
      nombreUsuario: cleanedNombreUsuario,
      correo: cleanedCorreo,
      contrasenia: cleanedContrasenia,
      rol,
      estatus: 1,
      telefono: cleanedTelefono,
      intentos: 0,
      idUsuario: 0,
      dateLastToken: new Date().toISOString(),
      direccion: {
        idDireccion: 0,
        estado: cleanedEstado,
        municipio: cleanedMunicipio,
        codigoPostal: cleanedCodigoPostal,
        colonia: cleanedColonia,
        calle: cleanedCalle,
        numExt: cleanedNumExt,
        numInt: cleanedNumInt,
        referencia: cleanedReferencia,
      },
    };

    try {
      await createUser(userData);
      toast.show('Usuario creado exitosamente.', {
        type: 'success',
        text1: 'Éxito',
        text2: 'Usuario creado exitosamente.',
      });
      resetFields();
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
