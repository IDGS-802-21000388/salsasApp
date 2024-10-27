import Swal from 'sweetalert2';

const AlertService = {
  success(message, title = 'Éxito') {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'small-alert',
      },
    });
  },

  error(message, title = 'Error') {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      customClass: {
        popup: 'small-alert',
      },
    });
  },

  confirm(message, title = '¿Estás seguro?') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'No, cancelar',
      customClass: {
        popup: 'small-alert',
      },
    });
  },

  info(message, title = 'Información') {
    Swal.fire({
      icon: 'info',
      title: title,
      text: message,
      customClass: {
        popup: 'small-alert',
      },
    });
  },

  warning(message, title = 'Advertencia') {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      showConfirmButton: true,
      confirmButtonText: 'Cerrar',
      customClass: {
        popup: 'small-alert',
      },
    });
  },
};

export default AlertService;
