export interface ServicioFactura {
  id_servicio: string;
  nombre: string;
  valor: number;
  cantidad: number;
}

export interface Factura {
  numero_factura?: number;
  fecha: Date;
  placa: string;
  categoria: string;
  id_cliente: string;
  medio_pago: string;
  descuento: number;
  vlr_descuento: number;
  subtotal: number;
  total: number;
  servicios: ServicioFactura[];
}
