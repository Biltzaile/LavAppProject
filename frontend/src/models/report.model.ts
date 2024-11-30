export interface Reporte {
  factura: number;
  fecha: string;
  cliente: string;
  placa: string;
  medio_pago: "TR" | "TD" | "TC" | "EF";
  total: number;
  servicios: string[];
}

export interface ResumenVentas {
  total_ventas: number;
  total_servicios: number;
  ventas_por_medio_pago: {
    [key: string]: number;
  };
  servicios_mas_vendidos: {
    servicio: string;
    cantidad: number;
  }[];
}
