
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, UserCog } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  active: boolean;
  createdAt: Date;
}

export const UsersSection = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Admin",
      email: "admin@umparkour.cz",
      role: "admin",
      active: true,
      createdAt: new Date(2024, 0, 1),
    },
    {
      id: "2",
      name: "Jan Novák",
      email: "jan@email.cz",
      role: "user",
      active: true,
      createdAt: new Date(),
    },
  ]);

  const handleAddUser = () => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name: "",
      email: "",
      role: "user",
      active: true,
      createdAt: new Date(),
    };
    setUsers([...users, newUser]);
  };

  const handleUpdateUser = (id: string, field: keyof User, value: string | boolean) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );
  };

  const handleDeleteUser = (id: string) => {
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

  const handleSave = () => {
    // TODO: Implementace ukládání do databáze
    toast({
      title: "Změny uloženy",
      description: "Úpravy uživatelů byly úspěšně uloženy.",
    });
  };

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

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 border rounded-lg space-y-4 hover:bg-accent/5 transition-colors"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Jméno</Label>
                <Input
                  value={user.name}
                  onChange={(e) => handleUpdateUser(user.id, "name", e.target.value)}
                  placeholder="Jméno uživatele"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={user.email}
                  onChange={(e) => handleUpdateUser(user.id, "email", e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label>Role:</Label>
                  <select
                    className="px-2 py-1 rounded-md border bg-background"
                    value={user.role}
                    onChange={(e) => handleUpdateUser(user.id, "role", e.target.value as "admin" | "user")}
                  >
                    <option value="user">Uživatel</option>
                    <option value="admin">Administrátor</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Label>Vytvořen:</Label>
                  <span className="text-sm text-muted-foreground">
                    {user.createdAt.toLocaleDateString("cs-CZ")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={user.active ? "outline" : "default"}
                  onClick={() => handleToggleStatus(user.id)}
                >
                  <UserCog className="w-4 h-4 mr-2" />
                  {user.active ? "Deaktivovat" : "Aktivovat"}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Smazat
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleSave}>Uložit změny</Button>
    </div>
  );
};
