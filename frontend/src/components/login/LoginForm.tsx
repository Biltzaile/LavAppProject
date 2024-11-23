import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, HelpCircle } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";

const loginSchema = z.object({
  usuario: z.string().min(1, "Usuario es requerido"),
  clave: z.string().min(1, "Contraseña es requerida"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({ onLogin }: { onLogin: (usuario: string, clave: string) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usuario: "",
      clave: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    onLogin(data.usuario.toUpperCase(), data.clave);
  };

  return (
    <Card className="mx-auto lg:w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Bienvenido a LavApp</CardTitle>
        <CardTitle className="text-xl">Iniciar Sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="usuario"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Usuario</FormLabel>
                    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className="p-0 h-4 w-4"
                          onMouseEnter={() => setIsPopoverOpen(true)}
                        >
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent onMouseEnter={() => setIsPopoverOpen(true)}>
                        <div>
                          <h4 className="font-medium">Usuarios por defecto:</h4>
                          <ul className="text-sm list-none pl-2">
                            <li>POS</li>
                            <li>ADMINISTRADOR</li>
                            <li>SOPORTE</li>
                          </ul>
                          <h4 className="font-medium pt-2">Contraseña:</h4>
                          <p className="text-sm pl-2">123456</p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="ADMINISTRADOR"
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      value={field.value.toUpperCase()}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clave"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="123456"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
