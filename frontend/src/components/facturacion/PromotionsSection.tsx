import { useCallback, useEffect, useState } from "react";
import { parseISO, isWithinInterval, startOfDay, endOfDay, isBefore } from "date-fns";
import { promocionesService } from "@/api/promociones.service";
import { Promocion } from "@/models/promo.model";
import { handleApiResponse } from "@/utils/api-utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UseFormSetValue } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FacturaCreada } from "@/models";

interface PromotionsSectionProps {
  setValue: UseFormSetValue<FacturaCreada>;
}

export function PromotionsSection({ setValue }: PromotionsSectionProps) {
  const [promociones, setPromociones] = useState<Promocion[]>([]);

  const adjustUTCDate = (dateStr: string | null, isEndDate: boolean = false) => {
    if (!dateStr) return undefined;
    const date = parseISO(dateStr);
    return isEndDate ? endOfDay(date) : startOfDay(date);
  };


  const isPromocionActiva = useCallback((promocion: Promocion) => {
    const now = new Date();
    const fechaInicio = promocion.fecha_inicio ? adjustUTCDate(promocion.fecha_inicio) : null;
    const fechaFin = promocion.fecha_fin ? adjustUTCDate(promocion.fecha_fin, true) : null;

    if (!fechaInicio && !fechaFin) return promocion.estado;

    if (fechaInicio && !fechaFin) {
      return promocion.estado && !isBefore(now, startOfDay(fechaInicio));
    }

    if (fechaInicio && fechaFin) {
      return promocion.estado && isWithinInterval(now, { start: fechaInicio, end: fechaFin });
    }

    return false;
  }, []);

  useEffect(() => {
    const fetchPromociones = async () => {
      const { success, data } = await handleApiResponse<Promocion[]>(
        () => promocionesService.getPromociones(),
        { showSuccessMessage: false }
      );

      if (success && data) {
        const promocionesActivas = data
          .filter(isPromocionActiva)
          .sort((a, b) => a.porcentaje - b.porcentaje);

        setPromociones(promocionesActivas);
        if (promocionesActivas.length > 0) {
          setValue("descuento", promocionesActivas[0].porcentaje);
        }
      }
    };

    fetchPromociones();
  }, [setValue, isPromocionActiva]);

  const handlePromocionChange = (value: string) => {
    const promocion = promociones.find(p => p.id_promocion === parseInt(value));
    setValue("descuento", promocion?.porcentaje || 0);
  };

  if (promociones.length === 0) {
    return <p className="text-muted-foreground">No hay promociones activas</p>;
  }

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Promociones Disponibles</h3>
      <ScrollArea className="h-[calc(100vh-30rem)] pr-4">
        <RadioGroup
          defaultValue={promociones[0].id_promocion?.toString()}
          onValueChange={handlePromocionChange}
          className="flex flex-col gap-2"
        >
          {promociones.map((promocion) => (
            <div key={promocion.id_promocion} className="flex items-center space-x-0">
              <RadioGroupItem
                value={promocion.id_promocion?.toString() || ""}
                id={`promo-${promocion.id_promocion}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`promo-${promocion.id_promocion}`}
                className="flex w-full items-center justify-between px-4 py-2 text-sm border rounded-md cursor-pointer peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:border-primary/50 hover:bg-muted"
              >
                <span className="font-medium">{promocion.descripcion}</span>
                <span className="text-muted-foreground">{promocion.porcentaje}% descuento</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </ScrollArea>
    </div>
  );
}