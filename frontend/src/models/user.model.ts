export type User = {
  id: string;
  nombre: string;
  apellido: string;
  usuario: string;
  rol: string;
} | null;

export type UserRegister = {
  id?: string;
  nombre: string;
  apellido: string;
  usuario: string;
  password: string;
  rol: string;
};
