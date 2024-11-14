import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Ajustes, Clientes, Dashboard, Facturacion, Login, Promociones, Servicios, Usuarios, Vehiculos, Ventas } from "@/pages";
import { MainLayout } from "@/components/Layouts";
import { useAuthStore } from "@/contexts";

const privateRoutes = [
  {
    path: "clientes",
    element: <Clientes />,
    roles: ["Administrador", "POS"]
  },
  {
    path: "vehiculos",
    element: <Vehiculos />,
    roles: ["Administrador", "POS"]
  },
  {
    path: "servicios",
    element: <Servicios />,
    roles: ["Administrador", "Soporte"]
  },
  {
    path: "usuarios",
    element: <Usuarios />,
    roles: ["Administrador", "Soporte"]
  },
  {
    path: "promociones",
    element: <Promociones />,
    roles: ["Administrador"]
  },
  {
    path: "ventas",
    element: <Ventas />,
    roles: ["Administrador"]
  },
  {
    path: "facturacion",
    element: <Facturacion />,
    roles: ["POS"]
  },
  {
    path: "ajustes",
    element: <Ajustes />,
    roles: ["Soporte"]
  },
];

export const MainRouter = () => {

  const user = useAuthStore((state) => state.user);

  const hasAccess = (allowedRoles: string[]): boolean => {
    return !!user && allowedRoles.includes(user.rol);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={user ? "/dashboard" : "/login"} replace />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <ProtectedRoute isAllowed={!!user} redirectTo={"/login"}><MainLayout /></ProtectedRoute>,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        ...privateRoutes.map(route => ({
          path: route.path,
          element: (
            <ProtectedRoute isAllowed={hasAccess(route.roles)} redirectTo={"/dashboard"}>
              {route.element}
            </ProtectedRoute>
          )
        }))
      ]
    }
  ])

  return <RouterProvider router={router} />;
};