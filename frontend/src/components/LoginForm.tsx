import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"

export function LoginForm() {
  return (
    <Card className="mx-auto lg:w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Bienvenido a LavApp</CardTitle>
        <CardTitle className="text-xl">Iniciar Sesión</CardTitle>
        {/* <CardDescription>
          Ingresa usuario y contraseña para acceder a la plataforma
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="usuario">Usuario</Label>
            <Input
              id="usuario"
              type="text"
              placeholder="Usuario"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Contraseña</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
