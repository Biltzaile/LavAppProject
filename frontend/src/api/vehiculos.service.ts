import { api } from "./axios";
import { Vehiculo } from "@/models";

export const vehiculosService = {
  getVehiculos: ({
    placa,
    documento,
  }: {
    placa?: string;
    documento?: string;
  }) =>
    api.get("/vehiculos", {
      params: { ...(placa && { placa }), ...(documento && { documento }) },
    }),

  createVehiculo: (vehiculo: Vehiculo) => api.post("/vehiculos", vehiculo),

  updateVehiculo: (vehiculo: Vehiculo) => api.put("/vehiculos", vehiculo),

  deleteVehiculo: (placa: string) =>
    api.delete("/vehiculos", { params: { placa } }),
};
