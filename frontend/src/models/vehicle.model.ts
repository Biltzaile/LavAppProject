export interface Vehiculo {
  placa: string;
  documento_cliente: string;
  categoria: "Moto" | "Auto" | "Cuatrimoto";
  segmento: string;
  marca: string;
  linea: string;
  modelo: number;
  cilindrada: number;
  grupo: number;
}

export const SegmentosPorCategoria = {
  Moto: ["Scooter", "Deportiva", "Enduro", "Naked", "Motocross", "Otro"],
  Auto: ["Sedan", "Coupe", "SUV", "Deportivo", "Van", "Pickup"],
  Cuatrimoto: ["Cuatrimoto"],
} as const;
