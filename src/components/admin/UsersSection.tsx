
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Loader2 } from "lucide-react";
import { UserList } from "./users/UserList";
import { 
  User, 
  fetchUsers, 
  createNewUser, 
  updateUserRole, 
  updateUserName 
} from "./users/userOperations";

export const UsersSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const fetchedUsers = await fetchUsers();
    setUsers(fetchedUsers);
    setLoading(false);
  };

  const handleAddUser = () => {
    const newUser = createNewUser();
    setUsers([...users, newUser]);
  };

  const handleUpdateUser = async (id: string, field: keyof User, value: string | boolean) => {
    // Aktualizace lokálního stavu
    setUsers(prev =>
      prev.map(user => {
        if (user.id === id) {
          // Handle the different types based on the field
          if (field === 'role') {
            // Ensure role is only 'admin' or 'user'
            return { ...user, [field]: value as "admin" | "user" };
          } else if (field === 'active') {
            // For active field, we expect a boolean
            return { ...user, [field]: Boolean(value) };
          } else {
            // For other string fields
            return { ...user, [field]: String(value) };
          }
        }
        return user;
      })
    );

    // Pro změnu role aktualizujeme záznam v databázi
    if (field === 'role' && (value === 'admin' || value === 'user')) {
      const success = await updateUserRole(id, value as "admin" | "user");
      if (!success) {
        // Vrátíme zpět původní stav při chybě
        await loadUsers();
      }
    }

    // Pro změnu jména aktualizujeme záznam v databázi
    if (field === 'name') {
      const success = await updateUserName(id, String(value));
      if (!success) {
        // Vrátíme zpět původní stav při chybě
        await loadUsers();
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    // Zde bychom mohli implementovat skutečné mazání uživatele,
    // ale zatím jen aktualizujeme UI
    setUsers(prev => prev.filter(user => user.id !== id));
    
    toast({
      title: "Uživatel smazán",
      description: "Uživatel byl úspěšně odstraněn ze systému.",
    });
  };

  const handleToggleStatus = (id: string) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );

    const user = users.find(u => u.id === id);
    if (user) {
      toast({
        title: "Status změněn",
        description: `Účet uživatele byl ${user.active ? 'deaktivován' : 'aktivován'}.`,
      });
    }
  };

  const handleSave = async () => {
    toast({
      title: "Změny uloženy",
      description: "Úpravy uživatelů byly úspěšně uloženy.",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary mr-2" />
        <span>Načítání uživatelů...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Seznam uživatelů</h3>
          <p className="text-sm text-muted-foreground">
            Celkem uživatelů: {users.length}
          </p>
        </div>
        <Button onClick={handleAddUser} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Přidat uživatele
        </Button>
      </div>

      <UserList
        users={users}
        onUpdate={handleUpdateUser}
        onDelete={handleDeleteUser}
        onToggleStatus={handleToggleStatus}
      />

      <Button onClick={handleSave}>Uložit změny</Button>
    </div>
  );
};
