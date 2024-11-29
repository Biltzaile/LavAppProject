import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MEDIOS_PAGO, MEDIOS_PAGO_LABELS } from "@/constants/receipt.constants";
import { useEffect, useState } from "react";
import { FacturaCreada } from "@/models";
import { MedioPago } from '../../constants/receipt.constants';
import { PaymentDialog } from "./PaymentDialog";
import { facturacionService } from "@/api/facturacion.service";
import { handleApiResponse } from "@/utils/api-utils";

interface PaymentSectionProps {
  form: UseFormReturn<FacturaCreada>;
  resetForm: () => void;
}

export function PaymentSection({ form, resetForm }: PaymentSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSave = async () => {
    const formData = form.getValues();
    const cleanedServices = formData.servicios.map(({ precio_variable, ...service }) => service);

    const facturaToSave = {
      ...formData,
      servicios: cleanedServices,
      fecha: new Date().toISOString(),
    };

    const { success } = await handleApiResponse(
      () => facturacionService.createFactura(facturaToSave),
      { showSuccessMessage: true, showErrorMessage: true }
    );

    // if (success) {
    //   resetForm();
    // }
  };

  const handleDialogAction = (action: 'save' | 'cancel') => {
    switch (action) {
      case 'save':
        handleSave();
        break;
      case 'cancel':
        setDialogOpen(false);
        break;
    }
  };

  useEffect(() => {
    const subscription = form.watch((_value, { name }) => {
      // Solo recalcular cuando cambian los servicios o el descuento
      if (name === "servicios" || name === "descuento") {
        const servicios = form.getValues("servicios");
        const descuentoPorcentaje = form.getValues("descuento") || 0;

        // Calcular subtotal
        const subtotal = servicios.reduce((acc, servicio) => {
          return acc + (servicio.valor * servicio.cantidad);
        }, 0);

        // Calcular valor del descuento
        const vlr_descuento = Math.round(subtotal * (descuentoPorcentaje / 100));

        // Calcular total
        const total = subtotal - vlr_descuento;

        // Actualizar valores en el formulario
        form.setValue("subtotal", subtotal);
        form.setValue("vlr_descuento", vlr_descuento);
        form.setValue("total", total);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const subtotal = form.watch("subtotal");
  const descuento = form.watch("descuento");
  const vlr_descuento = form.watch("vlr_descuento");
  const total = form.watch("total");

  return (
    <>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Descuento ({descuento}%):</span>
          <span>-${vlr_descuento.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>${total.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex items-center">
        <label className="text-sm font-medium w-1/2">Medio de Pago</label>
        <Select
          onValueChange={(value) => form.setValue("medio_pago", value as MedioPago)}
          defaultValue={form.getValues("medio_pago")}
        >
          <SelectTrigger className="w-1/2">
            <SelectValue placeholder="Seleccione medio de pago" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(MEDIOS_PAGO).map(([_key, value]) => (
              <SelectItem key={value} value={value}>
                {MEDIOS_PAGO_LABELS[value]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        <Button variant="outline" onClick={resetForm}>
          Cancelar
        </Button>
        <Button onClick={() => setDialogOpen(true)}>
          Guardar Factura
        </Button>
        <PaymentDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onAction={handleDialogAction}
        />
      </div>
    </>
  );
}