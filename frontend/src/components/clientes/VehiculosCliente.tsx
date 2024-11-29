
import { useState, useEffect } from "react";
import { Vehiculo } from "@/models";
import { Card, CardContent } from "@/components/ui/card";
import { DataTableVehiculos } from "../vehiculos/DataTableVehiculos";
import { useToast } from "@/components/ui/use-toast";

interface VehiculosClienteProps {
  documento: string;
}

export function VehiculosCliente({ documento }: VehiculosClienteProps) {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await fetch(`/api/vehiculos/cliente/${documento}`);
        if (!response.ok) throw new Error("Error al cargar los vehículos");
        const data = await response.json();
        setVehiculos(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar los vehículos del cliente",
        });
      }
    };

    fetchVehiculos();
  }, [documento]);

  return (
    <Card>
      <CardContent className="pt-4">
        <DataTableVehiculos
          data={vehiculos}
          onEdit={() => { }}
          onDelete={() => { }}
        />
      </CardContent>
    </Card>
  );
}