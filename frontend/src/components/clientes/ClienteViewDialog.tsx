
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cliente } from "@/models";
import { Card, CardContent } from "@/components/ui/card";

interface ClienteViewDialogProps {
  cliente: Cliente | null;
}

export function ClienteViewDialog({ cliente }: ClienteViewDialogProps) {
  if (!cliente) return null;

  return (
    <Tabs defaultValue="info" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="info">Información del Cliente</TabsTrigger>
        <TabsTrigger value="vehicles">Vehículos</TabsTrigger>
      </TabsList>
      <TabsContent value="info">
        <Card>
          <CardContent className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Documento</label>
                <p>{cliente.documento}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Nombre Completo</label>
                <p>{cliente.nombre} {cliente.apellido}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Teléfono</label>
                <p>{cliente.telefono}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <p>{cliente.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="vehicles">
        <Card>
          <CardContent className="pt-4">
            <p className="text-muted-foreground">Lista de vehículos pendiente...</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}