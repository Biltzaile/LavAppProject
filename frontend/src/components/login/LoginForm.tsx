import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"

export function LoginForm({ onLogin }: { onLogin: (usuario: string, password: string) => void }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);  // Add this line

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(usuario, password);
  };

  return (
    <Card className="mx-auto lg:w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Bienvenido a LavApp</CardTitle>
        <CardTitle className="text-xl">Iniciar Sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="usuario">Usuario</Label>
            <Input
              id="usuario"
              type="text"
              placeholder="admin"
              required
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Contraseña</Label>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="123456"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
