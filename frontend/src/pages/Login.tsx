import { LoginForm } from "@/components/login/LoginForm";
import { useAuthStore } from "@/contexts/authStore";
import { useNavigate } from "react-router-dom";
import { usuariosService } from "@/api/usuarios";
import { Toaster } from "@/components/ui";
import { toast } from "sonner";
import axios from "axios";

export const Login = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (usuario: string, password: string) => {
    try {
      const response = await usuariosService.login(usuario, password);
      login(response.data);
      navigate("/dashboard");
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error?.response?.data.message
        : "Error al iniciar sesión.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-screen w-full items-center justify-center px-4">
      <LoginForm onLogin={handleLogin} />
      <Toaster richColors theme="light" />
    </div>
  );
};