export interface ServicioFactura {
  id_servicio: number;
  descripcion: string;
  valor: number;
  cantidad: number;
  precio_variable?: boolean | null;
}

export interface Factura {
  numero_factura?: number;
  fecha: string;
  placa: string;
  categoria: string;
  grupo: number;
  id_cliente: string;
  medio_pago: string;
  descuento: number;
  vlr_descuento: number;
  subtotal: number;
  total: number;
  servicios: ServicioFactura[];
}

export interface FacturaCreada {
  placa: string;
  id_cliente: string;
  categoria: string;
  grupo: number;
  medio_pago: "TR" | "EF" | "TD" | "TC";
  descuento: number;
  vlr_descuento: number;
  subtotal: number;
  total: number;
  servicios: {
    id_servicio: number;
    descripcion: string;
    valor: number;
    cantidad: number;
    precio_variable?: boolean | null;
  }[];
  fecha?: string;
}
