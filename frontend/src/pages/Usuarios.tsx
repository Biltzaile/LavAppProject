import { useEffect, useState } from "react";
import { User } from "@/models";
import { usuariosService } from "@/api/usuarios.service";
import { DataTableUsuarios } from "@/components/usuarios/DataTableUsuarios";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { UserDialog } from "@/components/usuarios/UserDialog";
import { useAuthStore } from "@/contexts";
import { handleApiResponse } from "@/utils/api-utils";

export const Usuarios = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const fetchUsers = async () => {
    const { success, data } = await handleApiResponse<User[]>(
      () => usuariosService.getUsuarios(),
      { showSuccessMessage: false }
    );

    if (success && data) {
      const loggedInUser = useAuthStore.getState().user;
      if (loggedInUser?.rol === "ADMINISTRADOR") {
        setUsers(data.filter((user: User) => user.rol === "POS"));
      } else {
        setUsers(data);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (userToDelete?.usuario !== undefined) {
      const { success } = await handleApiResponse(
        () => usuariosService.deleteUsuario(userToDelete.usuario)
      );
      if (success) {
        await fetchUsers();
        setUserToDelete(null);
        setDeleteDialog(false);
      }
    }
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setOpenDialog(true);
  };

  const handleSave = async () => {
    await fetchUsers();
    setOpenDialog(false);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Usuario
        </Button>
      </div>

      <DataTableUsuarios
        data={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          className="max-w-[90vw] max-h-[90vh] md:max-w-[600px]"
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? "Editar Usuario" : "Nuevo Usuario"}
            </DialogTitle>
          </DialogHeader>
          <UserDialog user={selectedUser} onSave={handleSave} onCancel={handleCancel} />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent className="max-w-[90vw] md:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Está seguro de eliminar al usuario <span className="font-medium">{userToDelete?.usuario}</span>? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};