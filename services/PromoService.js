const sendEmail = async () => {
    try {
      const response = await fetch('http://localhost:7215/api/Email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toEmail: 'julian.rodriguez.villalobos@gmail.com',
          subject: '¡Oferta Especial!',
          htmlContent: '<h1>Aprovecha esta oferta</h1><p>Descripción de la oferta</p>',
        }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  };
  