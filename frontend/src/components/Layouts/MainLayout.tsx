import { Outlet, useLocation } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui"
import { useAppStore, useAuthStore } from "@/contexts"

export const MainLayout = () => {

  const { empresa: company } = useAppStore()

  const { user, logout } = useAuthStore()
  const location = useLocation()

  const getRouteTitle = () => {
    const path = location.pathname.slice(1) // Remove leading slash
    if (path === 'dashboard') {
      return `Dashboard ${user?.rol ? `- ${user.rol}` : ''}`
    }
    return path.charAt(0).toUpperCase() + path.slice(1) // Capitalize first letter
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center bg-primary text-primary-foreground p-4">
        {/* 
          - logo or company name from appStore
          - Title of the page
            - Dashboard (if on /dashboard) + role name from authStore
          - Avatar + submenu with logout button
        */}
        <div className="flex items-center">
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
      <main className="flex justify-center items-center h-full p-4">
        <Outlet />
      </main>
    </div>
  )
}