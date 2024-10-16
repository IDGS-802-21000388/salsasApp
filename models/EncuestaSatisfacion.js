class EncuestaSatisfaccion {
    constructor(
      idEncuesta,
      idUsuario,
      idVenta,
      procesoCompra,
      saborProducto,
      entregaProducto,
      presentacionProducto,
      facilidadUsoPagina,
      fechaEncuesta = new Date(),
      usuario = null,
      venta = null
    ) {
      this.idEncuesta = idEncuesta ?? 0;
      this.idUsuario = idUsuario ?? 0;
      this.idVenta = idVenta ?? 0;
      this.procesoCompra = procesoCompra ?? 0;
      this.saborProducto = saborProducto ?? 0;
      this.entregaProducto = entregaProducto ?? 0;
      this.presentacionProducto = presentacionProducto ?? 0;
      this.facilidadUsoPagina = facilidadUsoPagina ?? 0;
      this.fechaEncuesta = fechaEncuesta ?? new Date();
      this.usuario = usuario;
      this.venta = venta;
    }
  }
  
  export default EncuestaSatisfaccion;
  