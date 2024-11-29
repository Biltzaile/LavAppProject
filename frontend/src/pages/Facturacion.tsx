import { RegistroFactura } from '../components/facturacion/RegistroFactura';
import { Card, CardContent } from "@/components/ui/card"

export const Facturacion = () => {

  return (
    <Card className="h-full">
      <CardContent className="h-full p-6">
        <RegistroFactura />

        {/* Tabs Para uso futuro
        <Tabs defaultValue="registro" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="registro">Registrar Factura</TabsTrigger>
            <TabsTrigger value="consulta">Consultar Factura</TabsTrigger>
          </TabsList>
          <div className='flex-1 overflow-hidden'>
            <TabsContent className='h-full data-[state=active]:flex' value="registro">
              <RegistroFactura onFacturaCreada={setFacturaSeleccionada} />
            </TabsContent>
            <TabsContent value="consulta">
              <ConsultaFactura onFacturaSeleccionada={setFacturaSeleccionada} />
            </TabsContent>
          </div>
        </Tabs>
        */}
      </CardContent>
    </Card>
  );
};