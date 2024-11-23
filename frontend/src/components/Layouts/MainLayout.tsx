import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Toaster } from "../ui"
import { useAppStore, useAuthStore } from "@/contexts"
import { Home } from "lucide-react"

export const MainLayout = () => {
  const navigate = useNavigate()
  const { empresa: company } = useAppStore()

  const { user, logout } = useAuthStore()
  const location = useLocation()

  const getRouteTitle = () => {
    const path = location.pathname.slice(1) // Remove leading slash
    if (path === 'dashboard') {
      return `Dashboard ${user?.rol ? `- ${user.rol}` : ''}`
    }
    return (
      <div className="flex items-center gap-2">
        <span
          className="cursor-pointer hover:opacity-80 flex items-center gap-1"
          onClick={() => navigate('/dashboard')}
        >
          <Home size={"1.5rem"} strokeWidth={3} />
          Dashboard
        </span>
        <span>{'>'}</span>
        <span>{path.charAt(0).toUpperCase() + path.slice(1)}</span>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center bg-primary text-primary-foreground p-4 select-none">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
          {
            company?.logo ?
              <img src={company?.logo} alt={company?.nombre} className="h-8 w-auto" />
              :
              <h1 className="text-2xl font-black">{company?.nombre}</h1>
          }
        </div>
        <div className="text-xl font-semibold">
          {getRouteTitle()}
        </div>
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
      </header>
      <main className="flex justify-center items-center h-full p-4 select-none">
        <Outlet />
      </main>
      <Toaster richColors theme="light" />
    </div>
  )
}