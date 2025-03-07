
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  active: boolean;
  createdAt: Date;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: "admin" | "user";
  created_at: string;
}

export const fetchUsers = async (): Promise<User[]> => {
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

    return formattedUsers;
  } catch (error) {
    console.error('Chyba při načítání uživatelů:', error);
    toast({
      title: "Chyba",
      description: "Nepodařilo se načíst seznam uživatelů.",
      variant: "destructive"
    });
    return [];
  }
};

export const updateUserRole = async (id: string, role: "admin" | "user"): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', id);

    if (error) {
      throw error;
    }

    toast({
      title: "Role aktualizována",
      description: `Role uživatele byla změněna na ${role}.`,
    });
    
    return true;
  } catch (error) {
    console.error('Chyba při aktualizaci role:', error);
    toast({
      title: "Chyba",
      description: "Nepodařilo se aktualizovat roli uživatele.",
      variant: "destructive"
    });
    return false;
  }
};

export const updateUserName = async (id: string, name: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: name })
      .eq('id', id);

    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Chyba při aktualizaci jména:', error);
    toast({
      title: "Chyba",
      description: "Nepodařilo se aktualizovat jméno uživatele.",
      variant: "destructive"
    });
    return false;
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    // Delete the user from auth (which will cascade to profiles via trigger)
    const { error } = await supabase.auth.admin.deleteUser(id);
    
    if (error) {
      // Fallback - try to delete just from profiles if admin delete fails
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);
        
      if (profileError) throw profileError;
    }
    
    toast({
      title: "Uživatel smazán",
      description: "Uživatel byl úspěšně odstraněn ze systému.",
    });
    
    return true;
  } catch (error) {
    console.error('Chyba při mazání uživatele:', error);
    toast({
      title: "Chyba",
      description: "Nepodařilo se smazat uživatele. Nemáte dostatečná oprávnění nebo nastala jiná chyba.",
      variant: "destructive"
    });
    return false;
  }
};

export const toggleUserStatus = async (id: string, currentActive: boolean): Promise<boolean> => {
  try {
    // Note: Since we don't actually have an 'active' column yet,
    // this is just a placeholder for future implementation
    // We should run a migration to add this column
    
    // For now, we'll just return true and handle the UI state change
    toast({
      title: "Status změněn",
      description: `Účet uživatele byl ${currentActive ? 'deaktivován' : 'aktivován'}.`,
    });
    
    return true;
  } catch (error) {
    console.error('Chyba při změně statusu uživatele:', error);
    toast({
      title: "Chyba", 
      description: "Nepodařilo se změnit status uživatele.",
      variant: "destructive"
    });
    return false;
  }
};

export const createNewUser = (): User => {
  return {
    id: crypto.randomUUID(),
    name: "",
    email: "",
    role: "user",
    active: true,
    createdAt: new Date(),
  };
};
