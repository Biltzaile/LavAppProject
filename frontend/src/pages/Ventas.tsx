import { useState, useEffect } from "react";
import { reportesService } from "@/api";
import { Reporte, ResumenVentas } from "@/models";
import { DataTableReportes } from "@/components/reportes/DataTableReportes";
import { DataFiltersReportes } from "@/components/reportes/DataFiltersReportes";
import { handleApiResponse } from "@/utils/api-utils";
import { DateRange } from "react-day-picker";

const getLastWeekRange = () => {
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  return {
    from: lastWeek,
    to: today
  };
};

export const Ventas = () => {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [resumen, setResumen] = useState<ResumenVentas | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(getLastWeekRange());
  const [categoriaFilter, setCategoriaFilter] = useState("Todos");
  const [metodoPagoFilter, setMetodoPagoFilter] = useState("Todos");

  const fetchReportes = async () => {
    const { success, data } = await handleApiResponse(
      () => reportesService.getReportesPorFecha(
        dateRange?.from?.toISOString().split('T')[0],
        dateRange?.to?.toISOString().split('T')[0]
      ),
      { showSuccessMessage: false }
    );

    if (success && data) {
      setReportes(data);
    }
  };

  useEffect(() => {
    fetchReportes();
  }, [dateRange]);

  return (
    <div className="container mx-auto py-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Reportes de Ventas</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Filtros</h2>
          <DataFiltersReportes
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            categoriaFilter={categoriaFilter}
            onCategoriaFilterChange={setCategoriaFilter}
            metodoPagoFilter={metodoPagoFilter}
            onMetodoPagoFilterChange={setMetodoPagoFilter}
          />
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Resultados</h2>
        <DataTableReportes data={reportes} />
      </div>
    </div>
  );
};