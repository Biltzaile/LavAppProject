import { api } from "@/api";
import { UserRegister } from "@/models";

export const usuariosService = {
  getUsuarios: (id?: string) =>
    api.get("/usuarios", { params: { ...(id && { id }) } }),

  createUsuario: (usuario: UserRegister) => api.post("/usuarios", usuario),

  updateUsuario: (usuario: UserRegister) => api.put("/usuarios", usuario),

  deleteUsuario: (id: string) => api.delete("/usuarios", { params: { id } }),

  login: (usuario: string, clave: string) =>
    api.post("/usuarios/login", { usuario, clave }),
};
