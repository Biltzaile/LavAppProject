import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Toaster } from "../ui"
import { useAppStore, useAuthStore } from "@/contexts"
import { Home } from "lucide-react"
import { privateRoutes } from "@/routers/routes"

export const MainLayout = () => {
  const navigate = useNavigate()
  const { empresa: company } = useAppStore()

  const { user, logout } = useAuthStore()
  const location = useLocation()

  const getRouteTitle = () => {
    const path = location.pathname.slice(1) // Remove leading slash
    if (path === 'dashboard') {
      return `Dashboard ${user?.rol ? `- ${user.rol.charAt(0).toUpperCase() + user.rol.slice(1).toLowerCase()}` : ''}`
    }

    const currentRoute = privateRoutes.find(route => route.path === path)

    return (
      <div className="flex items-center gap-2">
        <Home className="cursor-pointer hover:opacity-80 flex items-center gap-1" size={"1.5rem"} strokeWidth={3} onClick={() => navigate('/dashboard')} />
        <span>{'/'}</span>
        <span>{currentRoute?.title ?? path}</span>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="flex flex-col h-full">
      <header className="grid grid-cols-4 items-center h-[10vh] bg-primary text-primary-foreground px-4 select-none">
        <div className="flex col-span-1 items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
          {
            company?.logo ?
              <img src={company?.logo} alt={company?.nombre} className="h-24 max-h-[7vh] w-auto" />
              :
              <h1 className="text-2xl font-black">{company?.nombre}</h1>
          }
        </div>
        <div className="flex col-span-2 items-center justify-center text-xl font-semibold">
          {getRouteTitle()}
        </div>
        <div className="flex items-center justify-end col-span-1">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-black">{(user?.nombre?.charAt(0) ?? '') + (user?.apellido?.charAt(0) ?? '')}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex justify-center h-[90vh] p-4">
        <Outlet />
      </main>
      <Toaster richColors theme="light" />
    </div>
  )
}