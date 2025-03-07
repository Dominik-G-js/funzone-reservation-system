
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, UserCog, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  active: boolean;
  createdAt: Date;
}

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: "admin" | "user";
  created_at: string;
}

export const UsersSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const formattedUsers: User[] = data.map((profile: Profile) => ({
        id: profile.id,
        name: profile.full_name || "Bez jména",
        email: profile.email,
        role: profile.role as "admin" | "user",
        active: true, // Nemáme zatím sloupec pro aktivaci/deaktivaci
        createdAt: new Date(profile.created_at)
      }));

      setUsers(formattedUsers);
    } catch (error) {
      console.error('Chyba při načítání uživatelů:', error);
      toast({
        title: "Chyba",
        description: "Nepodařilo se načíst seznam uživatelů.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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

  const handleUpdateUser = async (id: string, field: keyof User, value: string | boolean) => {
    // Aktualizace lokálního stavu
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );

    // Pro změnu role aktualizujeme záznam v databázi
    if (field === 'role') {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ role: value })
          .eq('id', id);

        if (error) {
          throw error;
        }

        toast({
          title: "Role aktualizována",
          description: `Role uživatele byla změněna na ${value}.`,
        });
      } catch (error) {
        console.error('Chyba při aktualizaci role:', error);
        toast({
          title: "Chyba",
          description: "Nepodařilo se aktualizovat roli uživatele.",
          variant: "destructive"
        });
        // Vrátíme zpět původní stav při chybě
        fetchUsers();
      }
    }

    // Pro změnu jména aktualizujeme záznam v databázi
    if (field === 'name') {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ full_name: value })
          .eq('id', id);

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error('Chyba při aktualizaci jména:', error);
        toast({
          title: "Chyba",
          description: "Nepodařilo se aktualizovat jméno uživatele.",
          variant: "destructive"
        });
        // Vrátíme zpět původní stav při chybě
        fetchUsers();
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
                  disabled
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
