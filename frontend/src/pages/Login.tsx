import { LoginForm } from "@/components/LoginForm";
import { Button } from "@/components/ui";
import { useAuthStore } from "@/contexts/authStore";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    const testUser = {
      id: "1",
      nombre: "Miguel",
      apellido: "Lopez",
      usuario: "testuser",
      rol: "Administrador",
    };

    login(testUser);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col gap-4 h-screen w-full items-center justify-center px-4">
      <LoginForm />
      <Button onClick={handleLogin}>
        Login as Test User
      </Button>
    </div>
  );
};